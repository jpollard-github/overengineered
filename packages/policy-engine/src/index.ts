import type { PolicyDecision } from "@overengineered/contracts";
export function evaluatePublicContentPolicy(
  env: Record<string, string | undefined> = process.env,
): PolicyDecision {
  const killSwitchActive = env.OVERENGINEERED_PUBLIC_CONTENT_KILL_SWITCH === "true";
  return {
    allowed: !killSwitchActive,
    reasonCode: killSwitchActive
      ? "PUBLIC_CONTENT_KILL_SWITCH_ACTIVE"
      : "PUBLIC_CLASSIFICATION_ALLOWED",
    evaluatedAt: new Date().toISOString(),
    classification: "public",
    killSwitchActive,
  };
}
