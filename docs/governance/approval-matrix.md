# Approval Matrix

## Purpose

Map conceptual roles to change classes.

| Role                       | 0   | 1   | 2   | 3   | 4   | 5   |
| -------------------------- | --- | --- | --- | --- | --- | --- |
| Product Intent Custodian   | I   | I   | A   | A   | A   | A   |
| Doctrine Platform Owner    | I   | A   | A   | A   | C   | A   |
| Runtime Steward            | I   | A   | C   | A   | C   | A   |
| Policy Reviewer            | I   | I   | C   | A   | A   | A   |
| Observability Delegate     | I   | C   | C   | C   | C   | A   |
| Documentation Cartographer | A   | C   | C   | C   | A   | A   |
| Temporary Human            | A   | A   | A   | A   | A   | A   |

## Scope

`A` acknowledges; `C` consults; `I` is informed.

## Non-goals

The matrix does not create additional people.

## Operational impact

Conceptual hat changes must be noted.

## Failure modes

One maintainer may schedule a meeting with themself.

## Rationale

Role clarity remains useful even when all roles share a chair.
