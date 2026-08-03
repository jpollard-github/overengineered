import { createApi } from "./app";
import { initializeTelemetry } from "@overengineered/observability";
import { parseApiConfig } from "@overengineered/runtime-config";
initializeTelemetry("api");
const config = parseApiConfig(process.env);
const app = await createApi();
await app.listen({ port: config.API_PORT, host: "0.0.0.0" });
