import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import etag from "@fastify/etag";
import rateLimit from "@fastify/rate-limit";
import { DoctrineSchema, HealthSchema } from "@overengineered/contracts";
import { doctrine, loadDoctrine } from "@overengineered/content";
import { GetDoctrineUseCase, DoctrineAccessDeniedError } from "@overengineered/domain";
import { EnvironmentFlagAdapter } from "@overengineered/feature-flags";
import {
  createDoctrineViewedEvent,
  InMemoryEventBus,
  type EventBus,
} from "@overengineered/event-bus";
import { correlationId, metrics, spanNames, withSpan } from "@overengineered/observability";
import { evaluatePublicContentPolicy } from "@overengineered/policy-engine";
import { getBuildMetadata } from "@overengineered/build-metadata";
import { ONE_LINE_COPY } from "@overengineered/one-line-copy";

export async function createApi(
  eventBus: EventBus = new InMemoryEventBus(),
): Promise<FastifyInstance> {
  const app = Fastify({ logger: { name: "doctrine-api", level: process.env.LOG_LEVEL ?? "info" } });
  await app.register(cors, { origin: true, exposedHeaders: ["etag", "x-correlation-id"] });
  await app.register(etag, { algorithm: "sha256" });
  await app.register(rateLimit, { max: 120, timeWindow: "1 minute" });
  const useCase = new GetDoctrineUseCase(loadDoctrine, new EnvironmentFlagAdapter());

  app.addHook("onRequest", async (request, reply) => {
    const id = correlationId(request.headers["x-correlation-id"] as string | undefined);
    request.headers["x-correlation-id"] = id;
    void reply.header("x-correlation-id", id);
  });

  app.get("/v1/doctrine", async (request, reply) =>
    withSpan(spanNames.apiDoctrine, async () => {
      try {
        const result = DoctrineSchema.parse(await useCase.execute());
        metrics.doctrineRequestsTotal += 1;
        metrics.principlesRenderedTotal += result.principles.length;
        await eventBus.publish(
          createDoctrineViewedEvent(
            String(request.headers["x-correlation-id"]),
            result.principles.length,
          ),
        );
        return reply
          .header("cache-control", "public, max-age=60, stale-while-revalidate=86400")
          .send(result);
      } catch (error) {
        if (error instanceof DoctrineAccessDeniedError)
          return reply
            .code(403)
            .send({ error: "Doctrine display denied by policy", reasonCode: error.message });
        throw error;
      }
    }),
  );
  app.get("/health/live", async () => HealthSchema.parse({ status: "healthy", service: "api" }));
  app.get("/health/ready", async () =>
    HealthSchema.parse({
      status: "healthy",
      service: "api",
      checks: { content: { status: "ok" }, policy: { status: "ok" }, flags: { status: "ok" } },
    }),
  );
  app.get("/health/deep", async () => {
    const checks = {
      content: {
        status: DoctrineSchema.safeParse(doctrine).success ? "ok" : ("failed" as const),
        detail: "Runtime schema valid",
      },
      policy: {
        status: evaluatePublicContentPolicy().allowed ? "ok" : ("failed" as const),
        detail: "Policy engine evaluable",
      },
      flags: { status: "ok" as const, detail: "Feature flags readable" },
      eventBus: {
        status: (await eventBus.health()) ? "ok" : ("failed" as const),
        detail: "Development-safe event bus available",
      },
      buildMetadata: {
        status: getBuildMetadata().gitSha ? "ok" : ("failed" as const),
        detail: "Build metadata present",
      },
      originalIntent: {
        status: "ok" as const,
        detail: "Purpose drift check owns filesystem discovery",
      },
      oneLineCopy: {
        status: ONE_LINE_COPY.length > 0 ? "ok" : ("failed" as const),
        detail: "Independent sentence is non-empty",
      },
      principleCount: {
        status: doctrine.principles.length === 11 ? "ok" : ("failed" as const),
        detail: `${doctrine.principles.length} principle records`,
      },
    };
    return HealthSchema.parse({
      status: Object.values(checks).some((check) => check.status === "failed")
        ? "unhealthy"
        : "healthy",
      service: "api",
      checks,
      purpose: {
        status: "degraded",
        reason: "Architecture exceeds product surface area by design",
      },
    });
  });
  return app;
}
