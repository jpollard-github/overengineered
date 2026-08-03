import { describe, expect, it, vi } from "vitest";
import { createDoctrineViewedEvent, InMemoryEventBus } from "./index";
describe("event lineage", () => {
  it("publishes a versioned public envelope", async () => {
    const bus = new InMemoryEventBus();
    const handler = vi.fn();
    bus.subscribe(handler);
    await bus.publish(createDoctrineViewedEvent("correlation", 11));
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ tenantId: "public", schemaVersion: "1.0" }),
    );
  });
});
