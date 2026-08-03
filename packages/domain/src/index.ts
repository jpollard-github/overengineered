import type { Doctrine } from "@overengineered/contracts";
import type { FeatureFlagAdapter } from "@overengineered/feature-flags";
import { evaluatePublicContentPolicy } from "@overengineered/policy-engine";
export class DoctrineAccessDeniedError extends Error {}
export class GetDoctrineUseCase {
  constructor(
    private readonly load: () => Doctrine,
    private readonly flags: FeatureFlagAdapter,
  ) {}
  async execute(env: Record<string, string | undefined> = process.env): Promise<Doctrine> {
    const decision = evaluatePublicContentPolicy(env);
    if (!decision.allowed) throw new DoctrineAccessDeniedError(decision.reasonCode);
    const flags = await this.flags.resolve();
    const content = this.load();
    return {
      ...content,
      operatingQuestions: flags.showOperatingQuestions ? content.operatingQuestions : [],
      buildFacts: flags.showBuildFacts ? content.buildFacts : [],
    };
  }
}
