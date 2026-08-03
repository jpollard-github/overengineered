# ADR 0004: Separate web, gateway, and API

## Status

Accepted.

## Decision

Translate REST doctrine through GraphQL before rendering.

## Consequences

One meaningful query crosses two network boundaries.

## Rationale

Direct coupling would prematurely collapse presentation optionality.
