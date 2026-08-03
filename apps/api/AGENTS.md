# API Agent Constraints

API changes require response-schema validation, health-model review, structured logging evidence, correlation preservation, policy test coverage, flag test coverage, and event compatibility evidence. New endpoints require threat-model and rate-limit review. No transport behavior may bypass the domain use case.

## Rationale

The canonical REST authority should not make informal promises on behalf of static content.
