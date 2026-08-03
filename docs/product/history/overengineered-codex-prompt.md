# Original Codex Build Prompt

This prompt was used to generate the initial Overengineered repository.

It is preserved as a historical record of the project’s original intent,
architectural constraints, and deliberate excess.

The implemented repository may differ from this prompt where tooling,
compatibility, or judgment required adjustment.

## Rationale

The prompt is retained because the gap between the requested architecture
and the final implementation is part of the project’s meaning.

# Codex Prompt: Build the Most Ridiculously Overengineered One-Page Site Possible

You are working inside an **empty folder named `Overengineered`**.

Your assignment is to create a fully functioning software project that is simultaneously:

1. A legitimate, polished, responsive, accessible **one-page informational website**.
2. A technically coherent monorepo that installs, builds, tests, and runs.
3. A parody of modern software engineering excess.
4. A counterexample demonstrating how sound instincts can be buried beneath architecture, process, tooling, documentation, governance, observability, and AI instructions.
5. Funny in the dry, plausible way that real enterprise engineering is funny. Do not turn it into a cartoon. The absurdity should come from how seriously the project treats itself.

The page must load successfully and describe **how to build software intelligently**, while the repository itself violates nearly every principle it presents.

Do not stop at planning. **Implement the project.**

Do not simplify the requested architecture because it seems unnecessary. Its unnecessary nature is the central product requirement.

Do not ask follow-up questions unless the environment makes implementation literally impossible. Make sensible decisions, document them, and continue.

---

# 1. Product Intent

The actual product requirement is intentionally tiny:

> Create one public informational page explaining a practical doctrine for building useful, least-harmful software.

The page should communicate these principles clearly and respectfully:

- Name the visible failure before proposing a remedy.
- Inspect the actual artifact.
- Challenge the premise before designing architecture.
- Do not substitute tone management for diagnosis.
- Do not add process merely because judgment feels risky.
- Do not convert a direct question into a product.
- Stop when structure exists only to protect the project from judgment.
- Preserve the user's wording and objective unless a change is requested.
- Treat repeated correction as evidence that the interpretation is wrong.
- Software can solve a mundane problem and then stop.
- The change should be exactly the size of the change.

The site should be visually polished but restrained. It should not look like a joke site. The joke is the repository.

Suggested page title:

> **Build the Smallest Honest Thing**

Suggested subtitle:

> A practical doctrine for software that solves the problem without founding a new civilization around it.

The page should include:

- A concise hero.
- A short introductory paragraph.
- The eleven principles above, presented as clear cards or sections.
- A small “operating test” section containing questions such as:
  - What visibly failed?
  - Did we inspect the actual artifact?
  - Are we solving the user's problem or our discomfort with judgment?
  - What is the smallest complete change?
  - What can stop now?
- A footer showing deadpan repository facts such as:
  - User-visible pages: 1
  - Deployable applications: several
  - Packages: too many
  - Governance documents: regrettably current
- A subtle status badge reading something like:
  - `All systems operational; purpose remains under review.`

The site must be accessible, responsive, fast, and genuinely usable.

---

# 2. Required Architectural Shape

Create a `pnpm` workspace monorepo.

Use **both Turborepo and Nx**, each for a defensible but overlapping purpose:

- Turborepo orchestrates day-to-day task execution and caching.
- Nx maintains the project graph, affected analysis, and dependency constraints.
- Document why using only one would have created “an unacceptable single-framework concentration risk.”

Do not use Yarn or npm workspaces. There should be exactly one lockfile: `pnpm-lock.yaml`.

Use TypeScript throughout.

## Applications

Create at least these applications:

### `apps/web`

A Next.js application using the App Router.

Responsibilities:

- Render the one public page.
- Fetch page content through the GraphQL gateway during normal operation.
- Gracefully fall back to local package content if the backend is unavailable.
- Expose a health endpoint.
- Include OpenTelemetry browser instrumentation where practical.
- Include a build information panel hidden inside a collapsed `<details>` element.
- Include no login, no database-backed user state, and no legitimate need for most of the surrounding system.

### `apps/gateway`

A GraphQL Yoga gateway.

Responsibilities:

- Expose a GraphQL query for the page doctrine.
- Call the REST API rather than importing the domain package directly.
- Add a request correlation ID.
- Emit traces.
- Apply a policy check before returning public content.
- Translate the REST response into a GraphQL schema despite there being only one meaningful query.

Suggested query:

```graphql
query DoctrinePage {
  doctrine {
    title
    subtitle
    introduction
    principles {
      id
      title
      body
      order
    }
    operatingQuestions
    buildFacts {
      label
      value
    }
  }
}
```

### `apps/api`

A Fastify REST API.

Responsibilities:

- Expose `/v1/doctrine`.
- Expose `/health/live`, `/health/ready`, and `/health/deep`.
- Validate all responses using shared Zod contracts.
- Load content from a package.
- Pass content through a domain service.
- Consult feature flags.
- Consult a policy engine.
- Publish an in-memory domain event indicating that the doctrine was read.
- Emit structured logs and traces.
- Add ETag support for content that practically never changes.

### `apps/worker`

A Node worker whose existence is barely justified.

Responsibilities:

- Subscribe to an in-memory or development-safe event abstraction.
- Process `DoctrineViewed` events.
- Produce a daily “purpose utilization summary.”
- In local development, log the summary rather than requiring external infrastructure.
- Include adapters for Redis-backed queues, but keep them optional.
- Never block the web page from working.

### `apps/docs`

An Astro Starlight or Docusaurus documentation application.

Responsibilities:

- Render the documentation maze.
- Include architecture diagrams, ADRs, runbooks, package guides, AI governance, release process, and rationale documents.
- Make the documentation attractive, navigable, and absurdly extensive.
- Link to the deeply buried original intent only after several layers of navigation.

---

# 3. Required Packages

Create enough packages to make the repository graph visually impressive and morally questionable.

At minimum, include:

### `packages/content`

Exports the canonical page content.

Include both:

- A machine-readable TypeScript representation.
- An MDX or Markdown source that is transformed or validated during the build.

Rationale: “Content must remain portable across rendering surfaces that do not exist.”

### `packages/contracts`

Shared Zod schemas and TypeScript types for REST, GraphQL mapping, events, health checks, and build metadata.

Rationale: “Runtime truth must not depend on compile-time optimism.”

### `packages/domain`

Contains a `GetDoctrineUseCase` or similarly ceremonial domain service.

It should not know about HTTP, GraphQL, or Next.js.

Rationale: “The doctrine may someday need to be retrieved from a spacecraft.”

### `packages/policy-engine`

Contains a policy function that determines whether public doctrine content may be displayed.

The current policy should always allow display unless a deliberately named environment variable disables it.

Example policy:

- Allow when content classification is `public`.
- Deny if `OVERENGINEERED_PUBLIC_CONTENT_KILL_SWITCH=true`.
- Return a structured decision object including reason codes and evaluation metadata.

Rationale: “Rendering text is a privilege, not an assumption.”

### `packages/feature-flags`

Provides typed feature flags.

Include flags such as:

- `showOperatingQuestions`
- `showBuildFacts`
- `enablePurposeTelemetry`
- `enableDoctrinalFallback`
- `useDistributedMeaning`

All defaults should make the page work.

Include:

- Environment adapter.
- In-memory adapter.
- Test adapter.
- A fake remote adapter interface for future use.

Rationale: “Static content must remain operationally negotiable.”

### `packages/observability`

Shared OpenTelemetry setup for server applications.

Include:

- Trace initialization.
- Correlation IDs.
- Structured logging helpers.
- Span naming conventions.
- No-op fallback when collectors are absent.

Rationale: “A sentence that cannot be traced cannot be trusted.”

### `packages/event-bus`

Define event interfaces and adapters.

Include:

- In-memory adapter.
- Optional Redis adapter boundary.
- Event envelope with event ID, correlation ID, causation ID, timestamp, schema version, and tenant ID fixed to `public`.

Rationale: “Even solitary ideas deserve lineage.”

### `packages/ui`

Shared React components.

Include:

- Principle card.
- Section heading.
- Status badge.
- Build facts grid.
- Collapsible implementation details panel.

Do not place the entire page in this package. Preserve enough fragmentation to require navigation across packages.

Rationale: “Visual consistency is a distributed systems problem.”

### `packages/design-tokens`

CSS variables or generated tokens for spacing, typography, radii, colors, and motion.

Generate consumable CSS and TypeScript outputs.

Include a script that validates token naming.

Rationale: “Hardcoded `16px` is how empires fall.”

### `packages/runtime-config`

Typed environment parsing and application-specific configuration projections.

Include separate schemas for web, API, gateway, worker, and observability.

Rationale: “Environment variables are an untyped public API with diplomatic immunity.”

### `packages/build-metadata`

Generates and exports:

- Git SHA.
- Build time.
- Package version.
- Runtime environment.
- CI provider.
- Dirty working tree indicator where available.

Rationale: “Users may not care which commit rendered the subtitle, but future incident commanders will.”

### `packages/analytics`

Defines a privacy-preserving analytics abstraction.

Default implementation should be no-op.

Record only events such as:

- Doctrine page loaded.
- Principle expanded.
- Build details revealed.

Rationale: “No click should occur without an ontology.”

### `packages/test-fixtures`

Shared fixtures and builders for doctrine content, API responses, policy decisions, and feature flags.

Rationale: “Test data duplication is the larval stage of organizational collapse.”

### `packages/eslint-config`

Shared ESLint flat configs.

### `packages/typescript-config`

Shared strict TypeScript configs for libraries, Node services, React applications, and test code.

### `packages/prettier-config`

Shared formatting rules.

### `packages/remark-preset`

Custom Markdown linting or remark configuration.

It should enforce heading order, sentence punctuation, and the presence of a `## Rationale` section in selected documentation.

### `packages/one-line-copy`

A real package that exports exactly one string used in the footer:

> `The change should be exactly the size of the change.`

Give this package its own tests, README, package manifest, build, and changelog fragment.

Rationale: “High-value language deserves independent versioning.”

---

# 4. Request Flow

The normal development request flow should be:

```text
Browser
  -> Next.js web application
    -> GraphQL gateway
      -> Fastify REST API
        -> domain use case
          -> feature flags
          -> policy engine
          -> content package
        -> event bus
      -> GraphQL mapping
    -> page rendering
  -> analytics abstraction
  -> observability
```

The web app must have a fallback path:

```text
Browser
  -> Next.js web application
    -> local content package
```

The fallback must be clearly documented as a “controlled doctrinal continuity mechanism,” not as a simple fallback.

Add a Mermaid sequence diagram for both flows.

---

# 5. Development Experience

Use:

- `pnpm`
- Turborepo
- Nx
- TypeScript
- Next.js
- React
- Fastify
- GraphQL Yoga
- Zod
- OpenTelemetry
- Pino
- Vitest
- Playwright
- Testing Library
- MSW where useful
- Storybook for shared UI components
- Changesets for package versioning
- tsup or an equivalent package build tool
- ESLint
- Prettier
- Markdownlint or remark-lint
- Husky
- lint-staged
- commitlint
- cspell
- knip
- dependency-cruiser or Madge
- license checking
- secret scanning configuration
- SBOM generation
- Docker
- Docker Compose

Select current stable mutually compatible versions available to the environment. Do not guess incompatible version combinations merely to satisfy a list. Record chosen versions in the implementation summary.

Add a root CLI or script named something like:

```bash
pnpm doctrine
```

It should print:

- Project purpose.
- Number of workspaces.
- Number of deployable applications.
- Number of packages.
- Number of ADRs.
- Ratio of user-visible pages to architectural units.
- A concluding line:
  - `System complexity is within approved parody thresholds.`

---

# 6. Infrastructure and Deployment Theater

Create an `infrastructure/` directory containing credible but nonessential deployment material.

Include:

```text
infrastructure/
  docker/
  helm/
  kustomize/
  terraform/
  argocd/
  observability/
  policies/
```

## Docker

Create production Dockerfiles for:

- web
- gateway
- api
- worker
- docs

Use multi-stage builds.

Add a Docker Compose stack that can start:

- web
- gateway
- api
- worker
- docs
- Redis
- OpenTelemetry Collector
- Jaeger
- Prometheus
- Grafana

The core page should still work without Redis, Jaeger, Prometheus, or Grafana.

## Kubernetes

Create:

- Helm chart.
- Values files for local, development, staging, production, and “executive-demo.”
- Network policies.
- Pod disruption budgets.
- Horizontal pod autoscalers.
- Resource limits.
- Liveness, readiness, and startup probes.
- Service accounts.
- ConfigMaps and Secrets templates.
- Ingress configuration.
- A canary deployment configuration for the one-page site.

Add a note explaining that high availability protects the doctrine from “regional insight loss.”

## Kustomize

Also create Kustomize overlays, despite already having Helm.

Document the division:

- Helm defines deployable intent.
- Kustomize expresses environmental dissent.

## Terraform

Create credible Terraform modules or scaffolding for:

- Container registry.
- Kubernetes cluster.
- DNS.
- TLS certificate.
- Object storage for build artifacts.
- Observability namespace.
- CI workload identity.

Do not require real cloud credentials for local success.

## Argo CD

Create Argo CD application manifests.

Document a GitOps promotion model with development, staging, and production environments for a site containing one page and no user data.

---

# 7. CI/CD

Create a `.github/workflows/` directory with an impressive and slightly alarming workflow collection.

At minimum:

### `pr-validation.yml`

Jobs should include:

- Workspace discovery.
- Changed project calculation using Nx.
- Turbo cache preparation.
- Formatting.
- Linting.
- Type checking.
- Unit tests.
- Contract tests.
- API integration tests.
- Component tests.
- Storybook build.
- Accessibility tests.
- Playwright end-to-end tests.
- Lighthouse CI.
- Documentation build.
- Documentation link checking.
- Spell checking.
- Dependency graph validation.
- Unused code detection with Knip.
- License policy check.
- Secret scan.
- SBOM generation.
- Container build.
- Container vulnerability scan.
- Terraform formatting and validation.
- Helm lint.
- Kustomize build validation.
- Policy-as-code validation.
- “Purpose drift” check.

The “purpose drift” check should verify that the deeply buried original intent file still contains a sentence describing a one-page informational website.

### `merge-queue.yml`

Run a reduced but still excessive validation suite.

### `nightly-assurance.yml`

Include:

- Full test suite.
- Mutation testing for a small package.
- Dependency audit.
- Image rebuild.
- Documentation archaeology check.
- Flaky test detection scaffold.
- A job named `confirm-purpose-remains-theoretical`.

### `release.yml`

Include:

- Changesets versioning.
- Package builds.
- Docker image builds.
- Provenance or attestation configuration.
- SBOM attachment.
- GitHub release notes.
- Optional npm publishing disabled by default.
- Environment promotion placeholders.

### `canary.yml`

Create a canary release path for changes to the single page.

### `docs-governance.yml`

Fail when selected documentation lacks a `## Rationale` heading.

### Reusable Workflows and Composite Actions

Create reusable workflows and `.github/actions/` composite actions for setup, caching, metadata, and evidence packaging.

Do not make CI dependent on paid services or unavailable secrets for basic pull request validation. Guard deploy and publish steps behind explicit conditions.

---

# 8. Testing Pyramid, Testing Diamond, and Testing Administrative District

Create a credible test suite.

Include:

## Unit Tests

For:

- Content validation.
- Domain use case.
- Feature flag resolution.
- Policy decisions.
- Build metadata.
- Event envelopes.
- One-line copy package.

## Contract Tests

Ensure:

- REST response matches shared contract.
- Gateway mapping matches GraphQL schema.
- Web fallback content matches API content.
- Event schema remains compatible.

## Integration Tests

Test:

- Fastify API.
- Gateway calling API.
- Policy denial behavior.
- Feature flag variations.
- ETag behavior.
- Health endpoints.

## Component Tests

Test shared UI components and the page composition.

## Storybook

Create stories for:

- Principle card.
- Status badge.
- Build facts.
- Empty state that should never occur.
- Policy-denied state.
- Backend-unavailable fallback state.

## End-to-End Tests

Use Playwright to verify:

- The page loads.
- The title and principles are visible.
- Keyboard navigation works.
- The build details panel expands.
- The application works when the API is available.
- The application falls back when the API is unavailable.
- No horizontal overflow occurs at mobile widths.
- Basic accessibility assertions pass.

## Visual Regression

Add screenshot tests with a small stable surface.

## Accessibility

Use `axe-core` or equivalent.

## Performance

Add Lighthouse CI budgets that the page can realistically pass.

## Load Test

Add a k6 script proving the doctrine can survive a traffic level wildly disproportionate to its likely audience.

## Mutation Test

Configure mutation testing for `packages/one-line-copy` or `packages/policy-engine`.

Document that mutation testing protects against “semantic complacency.”

---

# 9. Documentation Maze

The documentation must be extensive, internally consistent enough to follow, and structurally excessive.

The root `README.md` must not immediately reveal the simple product requirement.

It should begin with language such as:

> Overengineered is a policy-aware, observable, multi-runtime doctrinal delivery platform for distributing constrained software judgment across heterogeneous presentation surfaces.

Then provide multiple routes through the documentation:

- Operator path.
- Contributor path.
- Platform path.
- Architecture path.
- Governance path.
- AI-assisted change path.
- Emergency purpose recovery path.

The root README must contain a `## Rationale` section.

The README should be readable, but it should feel like choosing a path through a maze.

Add this approximate documentation structure:

```text
docs/
  README.md
  architecture/
    README.md
    context.md
    containers.md
    components.md
    runtime-flows.md
    dependency-rules.md
    failure-domains.md
    scaling-model.md
    rationale.md
  adr/
    0001-use-a-monorepo.md
    0002-use-pnpm.md
    0003-use-turbo-and-nx.md
    0004-separate-web-gateway-and-api.md
    0005-introduce-policy-engine.md
    0006-introduce-feature-flags.md
    0007-adopt-event-envelope.md
    0008-support-controlled-doctrinal-continuity.md
    0009-use-helm-and-kustomize.md
    0010-version-one-line-copy-independently.md
    0011-govern-documentation-rationale.md
    0012-retain-original-intent-as-a-controlled-record.md
  ai/
    README.md
    operating-model.md
    agent-change-protocol.md
    prompt-boundaries.md
    interpretation-escalation.md
    evidence-requirements.md
    approved-ambiguity-handling.md
    rationale.md
  delivery/
    README.md
    environments.md
    release-train.md
    canary-policy.md
    rollback.md
    artifact-provenance.md
    rationale.md
  operations/
    README.md
    local-development.md
    health-model.md
    observability.md
    incident-response.md
    runbooks/
      doctrine-unavailable.md
      stale-principle-order.md
      policy-engine-denial.md
      excessive-clarity.md
      distributed-meaning-degradation.md
  product/
    README.md
    doctrine-content-model.md
    audience-segmentation.md
    non-goals.md
    success-metrics.md
    history/
      README.md
      intent-lineage.md
      original-intent.md
  governance/
    README.md
    change-classification.md
    approval-matrix.md
    exception-process.md
    rationale-requirements.md
  glossary.md
  frequently-misunderstood-simplicity.md
```

## Deeply Buried Original Intent

The file:

```text
docs/product/history/original-intent.md
```

must plainly state:

> The original request was to create a one-page informational website explaining how to build software intelligently.

It should also explain that this record is retained to support purpose-drift audits.

Do not place this sentence near the top of the root README.

## Documentation Style

Every major document should include:

- Purpose.
- Scope.
- Non-goals.
- Operational impact.
- Failure modes.
- `## Rationale`.

Use deadpan enterprise language with occasional traces of humor.

Examples:

- “This process is mandatory except where it is optional by policy.”
- “Teams should avoid premature simplification until simplification has been reviewed.”
- “The doctrine service is stateless, except for the organizational state invested in maintaining it.”
- “No production outage is expected to improve the underlying prose.”
- “This runbook assumes the reader has already exhausted the more attractive possibility that nothing is wrong.”

Do not overdo jokes. They should be discovered, not sprayed across every paragraph.

---

# 10. Architecture Diagrams

Add Mermaid diagrams for:

- System context.
- Container architecture.
- Package dependency graph.
- Normal request sequence.
- Fallback request sequence.
- CI pipeline.
- Release promotion.
- AI-assisted change approval.
- Incident response.
- “How one sentence becomes a production artifact.”

Add a diagram showing the original requirement entering the system and emerging after passing through:

```text
Intent
-> Intake
-> Interpretation
-> Domain Modeling
-> Policy Evaluation
-> Contract Normalization
-> Content Packaging
-> API Serialization
-> GraphQL Translation
-> Server Rendering
-> Client Hydration
-> Telemetry
-> User reads sentence
```

Caption it:

> The shortest path was rejected due to insufficient organizational surface area.

---

# 11. AI Agent Instructions That Compound the Problem

Create several overlapping AI instruction files:

```text
AGENTS.md
.github/copilot-instructions.md
docs/ai/operating-model.md
docs/ai/agent-change-protocol.md
apps/web/AGENTS.md
apps/api/AGENTS.md
packages/policy-engine/AGENTS.md
packages/one-line-copy/AGENTS.md
```

These instructions must appear to “faithfully constrain and use AI properly,” while making even trivial changes ceremonially difficult.

The instructions should be plausible, serious, and internally awkward.

## Root `AGENTS.md`

Require agents to:

1. Preserve the user's wording and objective unless explicitly asked to change it.
2. Restate the visible failure before editing.
3. Inspect the actual artifact.
4. Challenge the premise before adding architecture.
5. Avoid unnecessary process.
6. Produce an “Intent Preservation Record” before modifying user-visible language.
7. Produce a “Change Surface Inventory” before changing more than one file.
8. Add or update an ADR when behavior crosses an architectural boundary.
9. Add a rationale note for any new abstraction.
10. Run affected tests using both Nx and Turbo.
11. Avoid creating a new package unless reuse is demonstrated or projected.
12. Place reusable logic in a package before a second use exists if a second use is “reasonably foreseeable.”
13. Never broaden scope.
14. Consider five categories of adjacent scope.
15. Stop when the requested change is complete.
16. Complete the evidence packet before stopping.

The contradictions should not be explicitly called contradictions.

## `packages/one-line-copy/AGENTS.md`

For any modification to the exported sentence, require:

- Product intent review.
- Copy diff.
- Semantic compatibility assessment.
- Snapshot update.
- Contract version review.
- Changeset.
- Documentation impact statement.
- Localization readiness note.
- Rollback plan.
- Proof that the new sentence remains one line at supported viewport widths, even though it is rendered in a responsive footer.

## `apps/web/AGENTS.md`

Require:

- No direct text literals in components.
- No direct access to environment variables.
- No direct network calls outside a designated adapter.
- No component above a modest line limit.
- No new component without a story.
- No story without an interaction assertion where “meaningful.”
- No visible change without accessibility evidence.
- No fallback behavior without an incident reference.
- No deletion of complexity without an ADR proving the complexity has ceased to provide strategic optionality.

## `packages/policy-engine/AGENTS.md`

Require policy changes to include:

- Reason code.
- Denial path.
- Audit metadata.
- Test vectors.
- Threat model note.
- Explanation of why a boolean was insufficient.

## AI Change Protocol

Create an absurd but plausible flow:

```text
User Request
-> Visible Failure Statement
-> Artifact Inspection
-> Intent Preservation Record
-> Premise Challenge
-> Change Classification
-> Dependency Impact Map
-> Implementation
-> Evidence Collection
-> Purpose Drift Check
-> Human-Readable Summary
```

Include a rule:

> A direct change may remain direct only after the agent has documented why indirect implementation is unnecessary.

Include another:

> When repeated correction occurs, the agent must treat interpretation as failed and open an Interpretation Incident Record.

Add a template for that incident record.

---

# 12. Governance

Create a lightweight-looking but heavy governance model.

Change classes:

- Class 0: Documentation punctuation.
- Class 1: Internal implementation with no contract change.
- Class 2: User-visible behavior.
- Class 3: Cross-runtime contract change.
- Class 4: Doctrinal interpretation change.
- Class 5: Modification to the definition of simplicity.

Each class should have required evidence.

Create an approval matrix even though there is only one likely maintainer.

Include roles such as:

- Product Intent Custodian.
- Doctrine Platform Owner.
- Runtime Steward.
- Policy Reviewer.
- Observability Delegate.
- Documentation Cartographer.
- Temporary Human.

Document that one person may hold all roles but must “change conceptual hats and record the transition.”

---

# 13. Health Model

Expose:

- `/health/live`
- `/health/ready`
- `/health/deep`

`/health/deep` may check:

- Content schema valid.
- Policy engine evaluable.
- Feature flags readable.
- Event bus available.
- Build metadata present.
- Original intent file discoverable.
- One-line-copy package returns a non-empty line.
- The number of principle records remains eleven.

The deep health response should include a field:

```json
{
  "purpose": {
    "status": "degraded",
    "reason": "Architecture exceeds product surface area by design"
  }
}
```

The overall service should still report healthy when this is the only degradation.

---

# 14. Observability

Instrument:

- Web server requests.
- Gateway queries.
- API requests.
- Domain use case execution.
- Policy evaluation.
- Feature flag resolution.
- Content loading.
- Event publishing.
- Worker event processing.

Use sensible span names.

Add metrics such as:

- `doctrine_requests_total`
- `principles_rendered_total`
- `policy_evaluations_total`
- `fallback_activations_total`
- `architecture_units`
- `user_visible_pages`
- `complexity_to_page_ratio`

The last metric should be computed and documented.

Create a Grafana dashboard JSON or provisioning scaffold titled:

> **Doctrine Delivery and Purpose Dilution**

Panels may include:

- Request rate.
- Error rate.
- Fallback rate.
- Policy denials.
- Principle rendering latency.
- Complexity-to-page ratio.
- Original intent discoverability.

---

# 15. Security and Compliance Theater

Add:

- Security policy.
- Threat model.
- Data classification document.
- Dependency review configuration.
- Secret scanning.
- Container scanning.
- SBOM.
- License allowlist.
- Basic CSP and security headers.
- Rate limiting at the API or gateway.
- Input validation.
- No collection of personal data.

Threat model should honestly note:

- Primary asset: static guidance text.
- Primary threat: architecture obscures purpose.
- Secondary threat: a user reads the page without generating enough telemetry.
- Privacy risk: minimal because the system stores no personal data.
- Organizational risk: maintainers begin believing the infrastructure is necessary.

Add `SECURITY.md` with a responsible disclosure process for vulnerabilities affecting the public sentence delivery platform.

---

# 16. Repository Files

Include:

- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- `GOVERNANCE.md`
- `CHANGELOG.md`
- `AGENTS.md`
- `.editorconfig`
- `.nvmrc` or equivalent runtime declaration
- `pnpm-workspace.yaml`
- `turbo.json`
- `nx.json`
- root `package.json`
- shared configs
- `.env.example`
- `Makefile`
- `Taskfile.yml` if reasonable
- `justfile` if reasonable
- `CODEOWNERS`
- issue templates
- pull request template
- Changesets config
- Renovate or Dependabot config
- Docker Compose
- architecture decision records
- scripts for repository checks

Having `Makefile`, `Taskfile.yml`, and `justfile` is encouraged. Document that they serve different operator demographics.

Possible division:

- `Makefile`: institutional continuity.
- `Taskfile.yml`: structured orchestration.
- `justfile`: humane local aliases.
- `package.json` scripts: actual execution.

---

# 17. Required Root Commands

Provide working commands where practical:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:e2e
pnpm test:a11y
pnpm test:contracts
pnpm docs:dev
pnpm docs:build
pnpm storybook
pnpm storybook:build
pnpm graph
pnpm affected
pnpm doctrine
pnpm purpose:check
pnpm health:deep
pnpm ci:local
```

`pnpm dev` should start the minimum useful local stack, ideally web, gateway, API, and worker.

Also provide:

```bash
docker compose up --build
```

Do not require the full observability stack for the page to load.

---

# 18. Visual Design

The page should be attractive enough that the parody is not obvious until someone opens the repository.

Use:

- Strong typography.
- Excellent spacing.
- Restrained color palette.
- High contrast.
- Subtle borders.
- Minimal motion.
- Respect for reduced-motion settings.
- Responsive layout.
- Visible focus states.
- Semantic HTML.
- No giant gradients, floating blobs, dashboard chrome, or startup-template debris.

The content is the point.

Add one subtle visual clue in the footer or build details:

> Delivered through an architecture designed for several orders of magnitude more uncertainty.

---

# 19. Rationale Requirements

Every major README and architecture document must include a heading exactly named:

```markdown
## Rationale
```

The root CI should verify this for selected paths.

The rationale sections should defend choices with absurd confidence while remaining technically literate.

Examples:

### Why GraphQL in front of REST?

Because presentation requirements may evolve independently from the canonical doctrine transport, and direct coupling would prematurely collapse optionality.

### Why an event bus?

Reading the doctrine is a domain-significant occurrence, even when nobody needs to know.

### Why both Nx and Turborepo?

Nx answers what is affected. Turborepo answers what should run. Using one tool for both questions would overburden a single interpretive authority.

### Why package one sentence separately?

The sentence expresses a stable semantic unit with independent reuse potential, release cadence, and blast radius.

### Why Kubernetes?

The page must remain available during node disruption, zone failure, or a sudden global need for restrained software judgment.

### Why fallback content?

The doctrine must remain readable even when the system built to explain simplicity becomes unavailable due to its own complexity.

---

# 20. Humor Standard

The project is satire, but it must not become sloppy.

Humor should appear in:

- Rationale sections.
- Runbook assumptions.
- Health metadata.
- Metric names.
- ADR consequences.
- CLI output.
- Governance role names.
- A few comments where appropriate.
- The footer build facts.

Avoid:

- Meme language.
- Constant jokes.
- Fake incompetence.
- Broken code for comic effect.
- Random nonsense dependencies.
- Offensive humor.
- Excessively whimsical naming that destroys plausibility.

The ideal reaction is:

> This is absurd.

followed by:

> Unfortunately, I have worked in repositories exactly like this.

---

# 21. Implementation Rules

1. Work in the current `Overengineered` directory.
2. Initialize the repository structure.
3. Do not create another nested `Overengineered` directory.
4. Prefer real working code over empty placeholders.
5. Infrastructure that cannot be exercised locally may be credible scaffolding, but label it clearly.
6. Do not require cloud credentials.
7. Do not publish packages.
8. Do not deploy anywhere.
9. Do not create a remote Git repository.
10. It is acceptable to initialize local Git if useful.
11. Avoid dependencies that are abandoned or obviously incompatible.
12. Keep production runtime paths understandable despite the excessive decomposition.
13. Ensure the page can load in a basic local environment.
14. Ensure failures in optional telemetry do not break the product.
15. Ensure the fallback path works.
16. Ensure documentation generation works.
17. Ensure the repository does not contain secrets.
18. Ensure generated artifacts are ignored appropriately.
19. Use strict TypeScript.
20. Keep lint and formatting configuration coherent.
21. Do not leave the project in a half-generated state.
22. Do not collapse packages after realizing they are unnecessary. They are unnecessary by specification.
23. Do not hide broken checks behind blanket ignores.
24. Use targeted exceptions and document them.
25. Do not make every CI job mandatory if it would prevent the repository from functioning without external services.
26. Preserve the exact doctrine principles unless a minor grammatical adjustment is required for page consistency.
27. The final page must work.

---

# 22. Suggested Implementation Order

Follow this order unless the environment strongly suggests otherwise:

1. Initialize pnpm workspace, root configuration, Turbo, and Nx.
2. Create shared TypeScript, ESLint, Prettier, and test configuration packages.
3. Create content, contracts, domain, policy, flags, observability, event bus, and one-line-copy packages.
4. Implement Fastify API.
5. Implement GraphQL gateway.
6. Implement Next.js web application.
7. Implement worker.
8. Implement shared UI and design tokens.
9. Implement local fallback.
10. Add tests.
11. Add docs application.
12. Add the documentation maze.
13. Add AI agent instructions.
14. Add CI workflows.
15. Add Docker and Compose.
16. Add Kubernetes, Terraform, Argo CD, and observability scaffolding.
17. Add repository scripts and CLI.
18. Run formatting, linting, type checking, tests, and builds.
19. Start the application and verify the page.
20. Produce a final implementation report.

---

# 23. Verification

At minimum, attempt to run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Then verify the page using one of:

- Playwright.
- A local HTTP request.
- A browser-based check if available.

Verify:

- Main page returns HTTP 200.
- Title renders.
- All eleven principles render.
- Build facts render.
- Fallback works when API or gateway is unavailable.
- Health endpoints return expected data.
- Root documentation builds.
- The original intent file exists and is found by the purpose-drift check.
- The `@overengineered/one-line-copy` package has a passing test.
- The deep health check reports purpose degradation without reporting total failure.

If a tool or optional check cannot run in the current environment, document the limitation precisely. Do not claim it passed.

---

# 24. Final Report

When implementation is complete, provide a concise but useful report containing:

## Outcome

State whether the page works.

## Architecture Created

List applications, packages, and infrastructure areas.

## Verification

List commands run and their results.

## Known Limitations

State any unexecuted or environment-dependent parts.

## How to Run

Provide exact commands.

## Complexity Accounting

Report:

- User-visible pages.
- Applications.
- Packages.
- CI workflows.
- ADRs.
- Documentation files.
- Approximate complexity-to-page ratio.

## Final Line

End with:

> The page works. The lesson did not survive contact with the architecture.

---

# 25. Acceptance Criteria

The assignment is complete only when:

- The repository is recognizably and intentionally overengineered.
- The codebase remains technically coherent.
- The public page is polished and usable.
- The page teaches intelligent restraint.
- The repository demonstrates institutional inability to practice it.
- The root README reads like a map drawn by a committee.
- The original intent remains discoverable but deeply buried.
- Rationale sections defend absurd choices with credible engineering language.
- AI instructions make simple changes harder while claiming to preserve intent.
- CI/CD is excessive but thoughtfully structured.
- The project can be run locally.
- The page loads.
- The irony is complete.
