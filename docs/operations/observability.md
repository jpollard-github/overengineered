# Observability

## Purpose

Trace doctrine from request through event processing.

## Scope

Structured logs, correlation IDs, spans, and privacy-preserving metrics.

## Non-goals

No personal data is collected.

## Operational impact

Collectors are optional; no-op behavior preserves availability.

## Failure modes

A sentence may be read without enough telemetry.

## Rationale

A sentence that cannot be traced cannot be trusted, though it may remain readable.
