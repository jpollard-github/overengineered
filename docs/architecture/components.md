# Components and Packages

## Purpose

Show internal responsibilities and their approved dependencies.

```mermaid
flowchart TD
  Web --> UI --> Contracts
  Web --> Content --> Contracts
  Gateway --> Contracts
  API --> Domain --> Flags
  Domain --> Policy
  API --> Content
  API --> EventBus --> Contracts
  API --> Observability
  Worker --> EventBus
```

## Scope

Packages participating in normal delivery.

## Non-goals

Tooling packages are omitted to preserve page width.

## Operational impact

Dependency rules are checked by Nx and policy scripts.

## Failure modes

Shared packages can transform a local edit into a graph event.

## Rationale

Visual consistency is a distributed systems problem.
