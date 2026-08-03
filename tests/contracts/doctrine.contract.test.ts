import { describe, expect, it } from "vitest";
import { doctrine } from "@overengineered/content";
import { DoctrineSchema, EventEnvelopeSchema } from "@overengineered/contracts";
import { createDoctrineViewedEvent } from "@overengineered/event-bus";
describe("cross-runtime contracts", () => {
  it("keeps fallback and API content runtime-valid", () =>
    expect(DoctrineSchema.parse(doctrine)).toEqual(doctrine));
  it("keeps DoctrineViewed compatible", () =>
    expect(EventEnvelopeSchema.parse(createDoctrineViewedEvent("contract", 11)).schemaVersion).toBe(
      "1.0",
    ));
});
