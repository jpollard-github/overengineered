import { describe, expect, it } from "vitest";
import { ONE_LINE_COPY } from "./index";
describe("independently versioned sentence", () => {
  it("remains one non-empty line", () => {
    expect(ONE_LINE_COPY).not.toContain("\n");
    expect(ONE_LINE_COPY.length).toBeGreaterThan(0);
  });
});
