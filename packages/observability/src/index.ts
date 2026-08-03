import { randomUUID } from "node:crypto";
import { context, trace, SpanStatusCode } from "@opentelemetry/api";
import pino from "pino";
export const logger = pino({ name: "doctrine-delivery", level: process.env.LOG_LEVEL ?? "info" });
export const spanNames = {
  apiDoctrine: "api.doctrine.get",
  gatewayDoctrine: "gateway.doctrine.query",
  domainGet: "domain.doctrine.get",
  policyEvaluate: "policy.public.evaluate",
  contentLoad: "content.doctrine.load",
  eventPublish: "event.doctrine-viewed.publish",
  workerProcess: "worker.doctrine-viewed.process",
} as const;
export const correlationId = (value?: string) => value?.trim() || randomUUID();
export async function withSpan<T>(name: string, operation: () => Promise<T> | T): Promise<T> {
  const tracer = trace.getTracer("@overengineered/observability");
  return tracer.startActiveSpan(name, async (span) => {
    try {
      return await context.with(trace.setSpan(context.active(), span), operation);
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw error;
    } finally {
      span.end();
    }
  });
}
export function initializeTelemetry(serviceName: string) {
  logger.info(
    { serviceName, exporter: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "noop" },
    "telemetry initialized",
  );
  return {
    serviceName,
    mode: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ? "exporting" : "noop",
  } as const;
}
export const metrics = {
  doctrineRequestsTotal: 0,
  principlesRenderedTotal: 0,
  policyEvaluationsTotal: 0,
  fallbackActivationsTotal: 0,
  architectureUnits: 23,
  userVisiblePages: 1,
  complexityToPageRatio: 23,
};
