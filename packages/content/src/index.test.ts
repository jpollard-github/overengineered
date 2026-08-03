import { describe, expect, it } from "vitest";
import { DoctrineSchema } from "@overengineered/contracts";
import { doctrine } from "./index";
describe("doctrine content", () => {
  it("contains exactly eleven valid principles", () => {
    expect(DoctrineSchema.parse(doctrine).principles).toHaveLength(11);
  });
});
