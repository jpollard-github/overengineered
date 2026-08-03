import { describe, expect, it } from "vitest";
import { getBuildMetadata } from "./index";
describe("build metadata", () => {
  it("describes the runtime without requiring CI", () =>
    expect(
      getBuildMetadata({ NODE_ENV: "test", GIT_SHA: "abc", BUILD_TIME: "2026-01-01T00:00:00.000Z" })
        .runtimeEnvironment,
    ).toBe("test"));
});
