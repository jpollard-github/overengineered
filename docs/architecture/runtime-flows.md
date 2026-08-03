# Runtime Flows

## Purpose

Document normal delivery and controlled doctrinal continuity.

```mermaid
sequenceDiagram
  actor Reader
  Reader->>Web: GET /
  Web->>Gateway: DoctrinePage query
  Gateway->>API: GET /v1/doctrine
  API->>Domain: execute
  Domain->>Policy: evaluate public classification
  Domain->>Content: load doctrine
  API-->>Gateway: validated REST response
  Gateway-->>Web: GraphQL mapping
  Web-->>Reader: rendered page
```

```mermaid
sequenceDiagram
  actor Reader
  Reader->>Web: GET /
  Web-xGateway: query unavailable
  Web->>Content: controlled continuity load
  Content-->>Web: canonical local doctrine
  Web-->>Reader: rendered page
```

## Scope

Read-only page delivery.

## Non-goals

No database state participates.

## Operational impact

Gateway failure increments fallback telemetry without blocking reading.

## Failure modes

The system explaining simplicity may become unavailable due to its complexity.

## Rationale

The doctrine must remain readable when its architecture develops an opinion.
