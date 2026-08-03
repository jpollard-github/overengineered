# Canary Policy

## Purpose

Limit blast radius for changes to the single page.

## Scope

Progressive traffic percentages and rollback triggers.

## Non-goals

The canary does not assess whether architecture was warranted.

## Operational impact

Policy denial, latency, and fallback rates halt promotion.

## Failure modes

Tiny audiences may make statistical confidence theoretical.

## Rationale

One page can still be wrong gradually.
