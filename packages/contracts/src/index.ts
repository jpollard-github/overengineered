import { z } from "zod";

export const PrincipleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  order: z.number().int().positive(),
});
export const BuildFactSchema = z.object({ label: z.string(), value: z.string() });
export const DoctrineSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  introduction: z.string(),
  principles: z.array(PrincipleSchema).length(11),
  operatingQuestions: z.array(z.string()),
  buildFacts: z.array(BuildFactSchema),
  status: z.string(),
});
export type Doctrine = z.infer<typeof DoctrineSchema>;
export type Principle = z.infer<typeof PrincipleSchema>;
export type BuildFact = z.infer<typeof BuildFactSchema>;

export const PolicyDecisionSchema = z.object({
  allowed: z.boolean(),
  reasonCode: z.string(),
  evaluatedAt: z.string().datetime(),
  classification: z.literal("public"),
  killSwitchActive: z.boolean(),
});
export type PolicyDecision = z.infer<typeof PolicyDecisionSchema>;

export const EventEnvelopeSchema = z.object({
  eventId: z.string().uuid(),
  eventType: z.literal("DoctrineViewed"),
  correlationId: z.string(),
  causationId: z.string().optional(),
  occurredAt: z.string().datetime(),
  schemaVersion: z.literal("1.0"),
  tenantId: z.literal("public"),
  payload: z.object({ principleCount: z.number().int() }),
});
export type EventEnvelope = z.infer<typeof EventEnvelopeSchema>;

export const BuildMetadataSchema = z.object({
  gitSha: z.string(),
  buildTime: z.string(),
  packageVersion: z.string(),
  runtimeEnvironment: z.string(),
  ciProvider: z.string(),
  dirty: z.boolean(),
});
export type BuildMetadata = z.infer<typeof BuildMetadataSchema>;

export const HealthSchema = z.object({
  status: z.enum(["healthy", "unhealthy"]),
  service: z.string(),
  checks: z
    .record(
      z.string(),
      z.object({ status: z.enum(["ok", "degraded", "failed"]), detail: z.string().optional() }),
    )
    .optional(),
  purpose: z.object({ status: z.literal("degraded"), reason: z.string() }).optional(),
});
export type Health = z.infer<typeof HealthSchema>;
