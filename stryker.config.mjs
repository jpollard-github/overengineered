export default {
  mutate: ["packages/policy-engine/src/index.ts"],
  testRunner: "vitest",
  reporters: ["clear-text", "progress"],
  thresholds: { high: 90, low: 70, break: 60 },
};
