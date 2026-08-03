import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApi } from "./app";
const app = await createApi();
beforeAll(() => app.ready());
afterAll(() => app.close());
describe("REST doctrine transport", () => {
  it("returns valid doctrine with ETag", async () => {
    const response = await app.inject({ method: "GET", url: "/v1/doctrine" });
    expect(response.statusCode).toBe(200);
    expect(response.headers.etag).toBeTruthy();
    expect(response.json().principles).toHaveLength(11);
  });
  it("reports purpose degradation without failing health", async () => {
    const response = await app.inject({ method: "GET", url: "/health/deep" });
    expect(response.json()).toMatchObject({ status: "healthy", purpose: { status: "degraded" } });
  });
});
