# ADR 0002: Use pnpm

## Status

Accepted.

## Decision

Use a pnpm workspace and exactly one lockfile.

## Consequences

Storage is content-addressed; organizational duplication remains unaffected.

## Rationale

Efficient dependency storage preserves resources for less efficient abstractions.
