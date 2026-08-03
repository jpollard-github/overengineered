import { afterEach, describe, expect, it, vi } from "vitest";
import { doctrine as localDoctrine } from "@overengineered/content";
import { getDoctrine } from "./doctrine-adapter";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("doctrine adapter", () => {
  it("returns canonical local doctrine without requesting the gateway in local mode", async () => {
    vi.stubEnv("DOCTRINE_SOURCE", "local");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await getDoctrine();

    expect(result).toEqual({ doctrine: localDoctrine, source: "local-continuity" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
