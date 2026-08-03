import { afterAll, describe, expect, it } from "vitest";
import { createApi } from "../../apps/api/src/app";
const app = await createApi();
afterAll(() => app.close());
describe("API integration", () => {
  it("serves three healthy levels", async () => {
    for (const level of ["live", "ready", "deep"]) {
      const response = await app.inject(`/health/${level}`);
      expect(response.statusCode).toBe(200);
    }
  });
  it("returns the same ETag for unchanged doctrine", async () => {
    const first = await app.inject("/v1/doctrine");
    const second = await app.inject({
      url: "/v1/doctrine",
      headers: { "if-none-match": String(first.headers.etag) },
    });
    expect(second.statusCode).toBe(304);
  });
});
