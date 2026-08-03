# ADR 0009: Use Helm and Kustomize

## Status

Accepted.

## Decision

Helm defines deployable intent; Kustomize expresses environmental dissent.

## Consequences

Operators can choose which templating disagreement they prefer.

## Rationale

No single configuration mechanism should control both intent and dissent.
