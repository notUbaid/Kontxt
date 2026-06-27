---
title: Backend Architecture
slug: backend-architecture
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Backend Architecture

You already decided in Tech Stack Selection that this is a monolith. This module decides how that monolith is organized internally — so it stays maintainable as you add features, instead of turning into one giant file where every route does database queries, business logic, and response formatting all at once.

---

## Decision 1: Layered Structure

> **Decision Card — Three Layers, Every Feature**
> Every feature should be split across three layers, regardless of how small it feels right now:
- **Route/Controller** — parses the request, calls a service, returns a response. No business logic here.
- **Service** — contains the actual business logic. Framework-agnostic, testable in isolation.
- **Data Access** — talks to the database. Nothing else should query the database directly.

This isn't ceremony for its own sake — it's what makes business logic testable without spinning up an HTTP server, and what stops a database schema change from rippling through every route that happens to query that table directly.

> ️ **Warning**
> The most common backend architecture failure in AI-assisted projects is the "fat controller" — a route handler that validates input, queries the database, applies business rules, and formats the response all inline. It works for the first feature. By the tenth feature, with no consistent pattern, every route looks different and bugs hide in the inconsistency.

---

## Decision 2: Organize by Domain, Not by Layer

Within those three layers, group code by feature/domain (invoices, workspaces, billing) rather than dumping everything into one global `services/` folder:

```
/src
  /invoices
    invoice.routes.ts
    invoice.service.ts
    invoice.repository.ts
  /workspaces
    workspace.routes.ts
    workspace.service.ts
    workspace.repository.ts
  /shared
    middleware/
    errors/
    config/
```

This is the backend equivalent of the feature-based folder structure you chose in Frontend Architecture — and it's what allows you to later extract a domain into its own service, if you ever genuinely need to, without untangling it from everything else first.

---

## Decision 3: Request Lifecycle & Middleware Order

> **Decision Card — Fixed Middleware Order**
> Define this order once, apply it everywhere, never per-route:
> 1. Logging (capture every request)
> 2. Authentication (who is this user)
> 3. Tenant/workspace scoping (which workspace are they acting in, and do they belong to it)
> 4. Rate limiting
> 5. Input validation (reject malformed requests before they reach business logic)
> 6. Route handler

> ️ **Warning**
> Authentication and tenant scoping must happen in middleware, applied consistently — never as a check duplicated (or forgotten) inside individual route handlers. A route that forgets the tenant check is a data leak between customers, and it's far easier to audit one middleware function than every route in the codebase.

---

## Decision 4: Centralized Error Handling

Every API needs one consistent error response shape and one place that produces it — not try/catch blocks scattered per route with slightly different JSON shapes.

| Error type | Response |
|---|---|
| Validation error | 400, with field-level details the frontend can map to form errors |
| Auth/permission error | 401 (not authenticated) or 403 (authenticated, not permitted) — these are different and should stay different |
| Not found | 404, generic message (don't leak whether a resource exists for another tenant) |
| Unexpected/server error | 500, generic message to the client, full details logged server-side |

>  **Best Practice**
> Define one custom error class hierarchy (`ValidationError`, `NotFoundError`, `ForbiddenError`) that services throw, and one centralized error-handling middleware that converts them to the right HTTP response. Services should never know about HTTP status codes — that's the controller layer's job.

---

## Decision 5: Background Job Architecture

For anything async (from your System Architecture Diagram's queue box):

- [ ] Jobs are **idempotent** — running the same job twice (due to a retry) produces the same result, not duplicate side effects (e.g., duplicate emails, double charges)
- [ ] Jobs have a defined retry policy with backoff, not infinite immediate retries
- [ ] Failed jobs are logged somewhere visible, not silently dropped

> ️ **Warning**
> Idempotency is the most-skipped concept in beginner background job design. If a "send welcome email" job retries after a transient failure and isn't idempotent, your user gets two welcome emails. If a "charge customer" job isn't idempotent, this becomes a billing incident, not a UX annoyance.

---

## Common AI Mistakes to Watch For

- **Generates fat controllers** with logic, queries, and formatting all inline — explicitly request the three-layer split.
- **Duplicates auth/tenant checks per route** instead of centralizing in middleware — flag this every time it appears.
- **Inconsistent error response shapes** across different generated endpoints — define the shape once and reference it in every prompt.
- **Skips idempotency in background jobs** entirely unless explicitly asked.
- **Couples business logic directly to your ORM/database client** throughout the service layer instead of going through a repository/data-access layer — makes future schema or ORM changes far more invasive.

---

## AI Prompt: Scaffold a Backend Feature

```prompt
Generate the backend implementation for the [feature name] feature in a production SaaS, following this architecture strictly:

- Three layers: route/controller (no business logic), service (business logic, no HTTP knowledge), repository (database access only)
- Organize files by domain: /src/[feature]/[feature].routes.ts, .service.ts, .repository.ts
- Apply existing middleware order: logging → auth → tenant scoping → rate limiting → validation → handler (assume these already exist; just call into them)
- Throw custom error classes (ValidationError, NotFoundError, ForbiddenError) from the service layer; do not return HTTP status codes from the service
- If this feature involves a background job, make it idempotent and state explicitly how

Feature requirements: [describe the feature]

Flag anything where you had to guess at a missing architectural decision rather than inventing one silently.
```

---

## Validate Before You Move On

- [ ] Every route follows controller → service → repository, with no business logic in controllers
- [ ] Code is organized by domain/feature, not by technical layer at the top level
- [ ] Auth and tenant scoping happen in middleware, applied consistently — not per-route
- [ ] One error response shape exists across the entire API
- [ ] Any background job is idempotent and has a defined retry policy
- [ ] Services never reference HTTP concepts (status codes, request/response objects)

> [!TIP]
> This layered structure and error-class hierarchy should be defined once, early, and referenced in every subsequent backend prompt — pasting the pattern once per session is far cheaper than letting AI reinvent the structure per feature.

---

**Next:** Database Schema — design the data layer this backend talks to.
