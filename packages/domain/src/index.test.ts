import { describe, expect, it } from "vitest";
import { InMemoryFlagAdapter, defaultFlags } from "@overengineered/feature-flags";
import { GetDoctrineUseCase } from "./index";
import type { Doctrine } from "@overengineered/contracts";
const fixture = {
  title: "t",
  subtitle: "s",
  introduction: "i",
  principles: Array.from({ length: 11 }, (_, i) => ({
    id: String(i),
    title: "t",
    body: "b",
    order: i + 1,
  })),
  operatingQuestions: ["q"],
  buildFacts: [{ label: "l", value: "v" }],
  status: "s",
} satisfies Doctrine;
describe("GetDoctrineUseCase", () => {
  it("returns approved doctrine", async () =>
    expect(
      (
        await new GetDoctrineUseCase(() => fixture, new InMemoryFlagAdapter(defaultFlags)).execute(
          {},
        )
      ).principles,
    ).toHaveLength(11));
});
