# CI Pipeline

## Purpose

Show how a page change becomes a validated evidence district.

```mermaid
flowchart TD
  Change --> Discovery[Workspace discovery]
  Discovery --> Nx[Nx affected analysis]
  Discovery --> Turbo[Turbo execution plan]
  Nx --> Source[Format, lint, typecheck]
  Turbo --> Tests[Unit, contract, integration, component]
  Tests --> Browser[E2E, accessibility, visual, Lighthouse]
  Source --> Supply[Licenses, secrets, SBOM, vulnerability scan]
  Browser --> Infrastructure[Terraform, Helm, Kustomize, policy]
  Supply --> Purpose[Purpose drift check]
  Infrastructure --> Evidence[Evidence package]
  Purpose --> Evidence
```

## Scope

Pull-request validation and reusable assurance.

## Non-goals

The pipeline does not decide whether a change should exist.

## Operational impact

Basic validation avoids paid services and guards publishing behind explicit conditions.

## Failure modes

Every check may pass while the requested change remains too large.

## Rationale

Evidence should be available from multiple interpretive authorities before one page is permitted to change.
