export type FeatureFlags = {
  showOperatingQuestions: boolean;
  showBuildFacts: boolean;
  enablePurposeTelemetry: boolean;
  enableDoctrinalFallback: boolean;
  useDistributedMeaning: boolean;
};
export const defaultFlags: FeatureFlags = {
  showOperatingQuestions: true,
  showBuildFacts: true,
  enablePurposeTelemetry: true,
  enableDoctrinalFallback: true,
  useDistributedMeaning: false,
};
export interface FeatureFlagAdapter {
  resolve(): FeatureFlags | Promise<FeatureFlags>;
}
export class EnvironmentFlagAdapter implements FeatureFlagAdapter {
  constructor(private readonly env = process.env) {}
  resolve(): FeatureFlags {
    return {
      ...defaultFlags,
      showOperatingQuestions: this.env.SHOW_OPERATING_QUESTIONS !== "false",
      showBuildFacts: this.env.SHOW_BUILD_FACTS !== "false",
      enablePurposeTelemetry: this.env.ENABLE_PURPOSE_TELEMETRY !== "false",
      enableDoctrinalFallback: this.env.ENABLE_DOCTRINAL_FALLBACK !== "false",
      useDistributedMeaning: this.env.USE_DISTRIBUTED_MEANING === "true",
    };
  }
}
export class InMemoryFlagAdapter implements FeatureFlagAdapter {
  constructor(private readonly flags = defaultFlags) {}
  resolve() {
    return this.flags;
  }
}
export class TestFlagAdapter extends InMemoryFlagAdapter {}
export interface RemoteFlagAdapter extends FeatureFlagAdapter {
  readonly provider: "future-remote-provider";
}
