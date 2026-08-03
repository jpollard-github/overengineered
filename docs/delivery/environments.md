# Environments

## Purpose

Define local, development, staging, production, and executive-demo intent.

## Scope

Configuration variation without user data.

## Non-goals

Environments do not create distinct audiences.

## Operational impact

Helm values and Kustomize overlays express parallel opinions.

## Failure modes

Executive demo may outscale production.

## Rationale

Environmental nuance must remain representable even when content does not vary.
