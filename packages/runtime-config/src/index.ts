import { z } from "zod";
const port = z.coerce.number().int().positive();
export const observabilityConfigSchema = z.object({
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
});
export const apiConfigSchema = observabilityConfigSchema.extend({
  API_PORT: port.default(4001),
  OVERENGINEERED_PUBLIC_CONTENT_KILL_SWITCH: z.enum(["true", "false"]).default("false"),
});
export const gatewayConfigSchema = observabilityConfigSchema.extend({
  GATEWAY_PORT: port.default(4000),
  API_URL: z.string().url().default("http://localhost:4001"),
});
export const webConfigSchema = z.object({
  GATEWAY_URL: z.string().url().default("http://localhost:4000/graphql"),
  ENABLE_DOCTRINAL_FALLBACK: z.enum(["true", "false"]).default("true"),
});
export const workerConfigSchema = observabilityConfigSchema.extend({
  REDIS_URL: z.string().url().optional(),
});
export const parseApiConfig = (env: Record<string, string | undefined>) =>
  apiConfigSchema.parse(env);
export const parseGatewayConfig = (env: Record<string, string | undefined>) =>
  gatewayConfigSchema.parse(env);
export const parseWebConfig = (env: Record<string, string | undefined>) =>
  webConfigSchema.parse(env);
export const parseWorkerConfig = (env: Record<string, string | undefined>) =>
  workerConfigSchema.parse(env);
