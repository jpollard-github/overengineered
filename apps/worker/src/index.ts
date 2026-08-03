import type { EventEnvelope } from "@overengineered/contracts";
import { InMemoryEventBus, type RedisQueueAdapter } from "@overengineered/event-bus";
import { initializeTelemetry, logger, spanNames, withSpan } from "@overengineered/observability";
initializeTelemetry("worker");
export class OptionalRedisDoctrineQueue implements RedisQueueAdapter {
  async connect(url: string) {
    logger.info(
      { urlConfigured: Boolean(url) },
      "optional Redis queue boundary connected conceptually",
    );
  }
  async enqueue(event: EventEnvelope) {
    void event;
    throw new Error(
      "Redis adapter is optional and intentionally unprovisioned in local development",
    );
  }
  async close() {}
}
const bus = new InMemoryEventBus();
let views = 0;
let principles = 0;
bus.subscribe(async (event) =>
  withSpan(spanNames.workerProcess, () => {
    views += 1;
    principles += event.payload.principleCount;
    logger.info({ eventId: event.eventId, views, principles }, "DoctrineViewed processed");
  }),
);
export const purposeUtilizationSummary = () => ({
  day: new Date().toISOString().slice(0, 10),
  doctrineViews: views,
  principlesDelivered: principles,
  purposeUtilization: views === 0 ? "theoretical" : "observed",
});
const report = () => logger.info(purposeUtilizationSummary(), "daily purpose utilization summary");
report();
setInterval(report, 24 * 60 * 60 * 1000).unref();
