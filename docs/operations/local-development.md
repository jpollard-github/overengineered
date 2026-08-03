# Local Development

## Purpose

Run the minimum useful stack.

## Scope

`pnpm dev` starts web, gateway, API, and worker; docs run separately.

## Non-goals

Redis, Jaeger, Prometheus, and Grafana are optional.

## Operational impact

The page falls back locally when service dependencies are absent.

## Failure modes

Port conflicts can make distributed meaning temporarily unavailable.

## Rationale

Core guidance must work before the observability stack has formed an opinion.
