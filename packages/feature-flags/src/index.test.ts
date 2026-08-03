import { describe, expect, it } from "vitest";
import { EnvironmentFlagAdapter } from "./index";
describe("flags", () => {
  it("defaults to a working page", () =>
    expect(new EnvironmentFlagAdapter({}).resolve().enableDoctrinalFallback).toBe(true));
});
