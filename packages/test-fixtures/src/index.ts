import { doctrine } from "@overengineered/content";
import { defaultFlags } from "@overengineered/feature-flags";
export const doctrineFixture = (overrides = {}) => ({ ...doctrine, ...overrides });
export const apiDoctrineResponseFixture = doctrineFixture;
export const allowedPolicyDecisionFixture = {
  allowed: true,
  reasonCode: "PUBLIC_CLASSIFICATION_ALLOWED",
  evaluatedAt: "2026-01-01T00:00:00.000Z",
  classification: "public" as const,
  killSwitchActive: false,
};
export const featureFlagsFixture = (overrides = {}) => ({ ...defaultFlags, ...overrides });
