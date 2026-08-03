import { describe, expect, it } from "vitest";
import { evaluatePublicContentPolicy } from "./index";
describe("public content policy", () => {
  it("allows public content by default", () =>
    expect(evaluatePublicContentPolicy({}).allowed).toBe(true));
  it("honors the ceremonially named kill switch", () =>
    expect(
      evaluatePublicContentPolicy({ OVERENGINEERED_PUBLIC_CONTENT_KILL_SWITCH: "true" }).reasonCode,
    ).toBe("PUBLIC_CONTENT_KILL_SWITCH_ACTIVE"));
});
