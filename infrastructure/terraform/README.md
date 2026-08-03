# Terraform

## Purpose

Model registry, cluster, DNS, TLS, artifact storage, observability namespace, and CI workload identity boundaries.

## Scope

Provider-neutral scaffolding only.

## Non-goals

Local validation does not require cloud credentials or create resources.

## Operational impact

`provision_real_resources` defaults to false.

## Failure modes

Scaffolding can appear more complete than provider implementation.

## Rationale

Deployment intent should be reviewable before it becomes billable.
