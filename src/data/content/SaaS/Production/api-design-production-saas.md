---
title: API Design
slug: api-design
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# API Design

Your API is a contract. Once a frontend, a mobile app, or a customer's integration depends on a shape, changing it is a breaking change — not a refactor. Decide these conventions now, consistently, rather than letting each endpoint's shape drift based on whoever (or whichever AI session) built it.

---

## Decision 1: API Style

| Style | Best for |
|---|---|
| REST | Most production SaaS — well-understood, maps naturally to your resource hierarchy from Information Architecture |
| RPC-style (e.g., `/actions/sendInvoice`) | Actions that don't map cleanly to CRUD on a resource (e.g., "send", "approve", "archive") |
| GraphQL | Apps with genuinely complex, varied client data needs (e.g., multiple client types needing different shapes of the same data) — adds real complexity; don't choose it by default |

>  **Best Practice**
> Default to **REST**, with a small set of RPC-style action endpoints for operations that aren't naturally CRUD (`POST /invoices/:id/send` rather than trying to force "sending" into a PATCH). Reach for GraphQL only when you have a concrete reason REST doesn't fit — it solves an over-fetching problem you likely don't have yet at MVP stage.

---

## Decision 2: Resource Naming & Structure

> **Decision Card — Naming Conventions**
- Plural nouns for collections: `/invoices`, not `/invoice`
- Nesting reflects ownership, not arbitrary grouping: `/workspaces/:id/invoices`, not `/invoices?workspace=:id` (use query params for filtering, not for required scoping)
- Consistent casing: `snake_case` or `camelCase` for JSON fields — pick one, apply everywhere

This should mirror the resource hierarchy you already defined in Information Architecture — your API and your frontend routes should describe the same mental model of your data.

---

## Decision 3: Response Shape Consistency

Every endpoint should return a predictable shape, so frontend code (and AI generating frontend code) doesn't need to special-case each response.

```json
{
  "data": { /* resource or array of resources */ },
  "meta": { /* pagination info, if applicable */ }
}
```

Errors follow the centralized shape you defined in Backend Architecture — don't let error responses drift into a different format than success responses.

> [!WARNING]
> Inconsistent response shapes across endpoints (sometimes a bare array, sometimes a wrapped object, sometimes including pagination metadata and sometimes not) is one of the most common sources of frontend bugs in AI-assisted projects, because each endpoint gets generated somewhat independently unless you enforce the shape explicitly every time.

---

## Decision 4: Pagination

| Approach | Use when |
|---|---|
| Cursor-based | Default choice for production SaaS — stable under concurrent inserts/deletes, scales well |
| Offset-based (`?page=2&limit=20`) | Acceptable for small, rarely-changing datasets where simplicity matters more than scale |

> [!WARNING]
> Never ship a list endpoint with no pagination at all "for now." It works fine with 10 test rows and becomes a serious performance and payload-size problem the moment a real customer has thousands of records. Decide pagination at design time, not as a retrofit after a slow-endpoint incident.

---

## Decision 5: Idempotency for Mutations

>  **Best Practice**
> For any `POST` endpoint that creates a side effect that's expensive or dangerous to duplicate (charging a card, sending an invoice), support an **idempotency key** — the client sends a unique key with the request, and the server ensures the same key doesn't trigger the action twice, even if the client retries due to a network timeout. This is standard practice for payment-adjacent endpoints across the industry.

---

## Decision 6: Versioning

Decide your approach before you need it, even if you don't version on day one:

- **URL versioning** (`/v1/invoices`) — simplest, most visible, easiest for API consumers to understand
- **Header-based versioning** — cleaner URLs, less discoverable

> [!TIP]
> For most SaaS APIs, especially if you expect third-party integrations or a public API eventually, **URL versioning starting at `/v1`** from day one costs nothing now and avoids an awkward migration later when you need to introduce a breaking change.

---

## Decision 7: Documentation

>  **Best Practice**
> Generate an OpenAPI (Swagger) spec from your route definitions where your framework supports it, rather than hand-writing documentation that drifts out of sync with the actual code. This also becomes machine-readable context you can hand directly to AI tools for frontend integration work, instead of re-describing every endpoint by hand.

---

## Common AI Mistakes to Watch For

- **Inconsistent response shapes across endpoints** in the same generation session — explicitly require the same envelope every time.
- **No pagination on list endpoints** unless you ask for it explicitly.
- **Leaks internal-only fields** (e.g., internal flags, other tenants' references) in response payloads — review every response shape against what the client actually needs.
- **No idempotency handling on payment-adjacent endpoints** unless explicitly requested.
- **Mixes RPC-style and REST inconsistently** — e.g., sometimes `PATCH /invoices/:id` with a status field, sometimes a dedicated `/send` action for the same kind of operation. Pick one pattern per operation type and stay consistent.

---

## AI Prompt: Design Your API Endpoints

```
Design REST API endpoints for the following resources in a production SaaS, following these conventions strictly:

- Resource naming: plural nouns, nesting reflects ownership (e.g., /workspaces/:id/invoices)
- Response envelope: { "data": ..., "meta": ... } for all success responses
- Error shape: [paste your centralized error format from Backend Architecture]
- Pagination: cursor-based, applied to every list endpoint
- Versioning: prefixed with /v1
- Idempotency key support on any endpoint with a side effect that shouldn't be duplicated

Resources: [list resources from your Database Schema]
Actions that aren't plain CRUD: [list any, e.g., "send invoice", "archive workspace"]

For each endpoint, specify: method, path, request body shape, response shape, and required permission level. Flag any field in a response that might leak data across tenants or expose internal-only information.
```

---

## Validate Before You Move On

- [ ] Every endpoint follows the same response envelope, including errors
- [ ] Every list endpoint has pagination — no exceptions "for now"
- [ ] Resource naming and nesting mirror your actual data ownership model
- [ ] Payment-adjacent or otherwise dangerous-to-duplicate mutations support idempotency keys
- [ ] API is versioned, even if you only have `/v1` today
- [ ] No response payload includes fields the client doesn't need or shouldn't see
- [ ] An OpenAPI spec exists (generated, not hand-maintained) once routes are implemented

> [!TIP]
> Keep this endpoint list as your API contract reference — it's what you'll paste into Frontend Architecture-aligned data-fetching code and into Authentication/Authorization prompts next, instead of re-describing your API surface each time.

---

**Next:** Authentication — decide how requests to these endpoints prove who's making them.
