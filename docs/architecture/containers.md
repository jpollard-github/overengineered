# Containers

## Purpose

Assign runtime custody.

```mermaid
flowchart LR
  B[Browser] --> W[Next.js web]
  W --> G[GraphQL Yoga gateway]
  G --> A[Fastify API]
  A --> D[Domain packages]
  A -. event .-> K[Worker]
  Docs[Astro docs] -. explains .-> W
```

## Scope

Five deployable applications.

## Non-goals

This diagram does not justify five deployable applications.

## Operational impact

Failures are isolated; comprehension is distributed.

## Failure modes

Translation may fail while the content remains correct.

## Rationale

Presentation requirements may evolve independently from canonical doctrine transport.
