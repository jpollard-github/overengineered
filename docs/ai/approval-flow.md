# AI-Assisted Change Approval

## Purpose

Map evidence and conceptual hats to assisted-change approval.

```mermaid
sequenceDiagram
  actor User
  participant Agent
  participant Custodian as Product Intent Custodian
  participant Steward as Runtime Steward
  participant Human as Temporary Human
  User->>Agent: Request change
  Agent->>Agent: Inspect artifact and preserve intent
  Agent->>Custodian: Intent record and semantic delta
  Custodian-->>Agent: Meaning acknowledged
  Agent->>Steward: Dependency map and affected evidence
  Steward-->>Agent: Runtime boundary acknowledged
  Agent->>Human: Evidence packet and purpose drift result
  Human-->>User: Human-readable summary
```

## Scope

Class 2 through 5 assisted changes.

## Non-goals

Sequential acknowledgment does not create multiple humans.

## Operational impact

One maintainer may hold all roles but records conceptual hat transitions.

## Failure modes

The same person may disagree with themself asynchronously.

## Rationale

Automated assistance should preserve accountability even when accountability occupies one chair.
