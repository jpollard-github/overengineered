import { execFileSync } from "node:child_process";
import type { BuildMetadata } from "@overengineered/contracts";
const git = (args: string[], fallback: string) => {
  try {
    return (
      execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim() ||
      fallback
    );
  } catch {
    return fallback;
  }
};
export function getBuildMetadata(env = process.env): BuildMetadata {
  return {
    gitSha: env.GIT_SHA ?? git(["rev-parse", "--short", "HEAD"], "development"),
    buildTime: env.BUILD_TIME ?? new Date().toISOString(),
    packageVersion: env.npm_package_version ?? "1.0.0",
    runtimeEnvironment: env.NODE_ENV ?? "development",
    ciProvider: env.GITHUB_ACTIONS ? "github-actions" : "local",
    dirty: git(["status", "--porcelain"], "").length > 0,
  };
}
