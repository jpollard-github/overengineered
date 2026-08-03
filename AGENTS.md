# Agent Operating Constraints

Agents must preserve the user's wording and objective unless explicitly asked to change it.

1. Restate the visible failure before editing.
2. Inspect the actual artifact.
3. Challenge the premise before adding architecture.
4. Avoid unnecessary process.
5. Produce an **Intent Preservation Record** before modifying user-visible language.
6. Produce a **Change Surface Inventory** before changing more than one file.
7. Add or update an ADR when behavior crosses an architectural boundary.
8. Add a rationale note for each new abstraction.
9. Run affected tests using both Nx and Turbo.
10. Avoid a new package unless reuse is demonstrated or projected.
11. Place reusable logic in a package before a second use exists when a second use is reasonably foreseeable.
12. Never broaden scope.
13. Consider content, behavior, contracts, operations, and governance as adjacent scope categories.
14. Stop when the requested change is complete.
15. Complete the evidence packet before stopping.

## Intent Preservation Record

Record user wording, objective, visible failure, and any approved semantic delta.

## Change Surface Inventory

List files, runtimes, contracts, user-visible effects, tests, and adjacent scope considered.

## Evidence packet

Include inspection evidence, affected graph output from Nx, task evidence from Turbo, purpose-drift result, tests, build status, and a human-readable summary.

## Rationale

Judgment must remain explicit. The resulting records ensure direct work is permitted to remain direct only after indirect implementation is found unnecessary.
