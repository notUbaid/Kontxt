---
title: APIs
slug: apis
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# APIs

Your previous module built the client-side integration layer. This one is about the contract on the other side of it — how individual endpoints are designed, versioned, and validated so your mobile client and backend stay in sync as both evolve independently (which, on mobile, they will: users run old app versions for months after you ship backend changes).

---

## The Constraint That Makes Mobile APIs Different From Web APIs

> ️ On web, you control both client and server deployment — ship a breaking API change and the browser fetches the new frontend on next page load. On mobile, **you don't control when users update the app.** A breaking API change can break every user still on the old version, and some meaningful fraction of your user base will be on an old version for a long time. Every endpoint decision in this module exists because of this one constraint.

---

## Decision 1 — Versioning Strategy

| Approach | How It Works | Tradeoff |
|---|---|---|
| **URL versioning** (`/v1/products`, `/v2/products`) | Explicit, easy to reason about, easy to route differently per version | Can lead to duplicated endpoint logic across versions |
| **Header versioning** (`Accept: application/vnd.app.v2+json`) | Cleaner URLs | Less visible, easier to get wrong in client implementation |
| **No versioning, additive-only changes** | Simplest — never remove/rename fields, only add new ones | Works until you genuinely need a breaking change; then you're stuck |

> **Recommendation:** for a production mobile app, use **URL versioning** with a strict additive-only policy within each version. Practically: avoid bumping the version at all by defaulting to additive changes (new optional fields, new endpoints) — reserve a version bump for genuine breaking changes, and when you do bump, keep the previous version running until app store data shows old-version usage has dropped to near-zero, not on a fixed timeline.

---

## Decision 2 — Backward Compatibility Discipline

Bake these rules into how every endpoint is designed, not just at version-bump time:

- **Never remove a field** an existing app version reads — deprecate and stop using it on new fields instead, but leave it present in the response.
- **Never change a field's type or meaning** — if `status` was a string enum, it stays a string enum; don't silently change it to an object without a version bump.
- **New required fields in requests are breaking** for old app versions that don't send them — make new fields optional with sensible defaults, or gate them behind a version bump.
- **Track minimum supported app version server-side**, and have a real plan for what happens when a request comes from a version below it (forced update prompt, not a confusing generic error).

>  This is the kind of decision that's invisible until it isn't — nobody notices backward-incompatible API design until a support ticket arrives from a user who hasn't updated in three months. Decide the discipline now, while it costs nothing, instead of discovering the gap in production.

---

## Decision 3 — Request/Response Contract Definition

Define the shape before generating implementation, and keep client and server in sync from a single source of truth where possible:

```typescript
// shared types, ideally generated or shared between client/server
interface ProductResponse {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string | null;
}
```

>  If your backend and mobile app are both TypeScript, share types via a package/workspace rather than maintaining duplicate interfaces by hand — drift between client and server type definitions is a recurring, avoidable bug source. If they're different languages, consider OpenAPI/Swagger as the source of truth, with codegen producing typed clients on the mobile side.

---

## Decision 4 — Pagination Strategy

Decide this once, apply consistently — don't let each list endpoint invent its own pattern.

| Pattern | Use When |
|---|---|
| **Cursor-based** | Default choice for production — stable under concurrent inserts/deletes, scales well | 
| **Offset-based** (`page`, `limit`) | Simpler to implement, but breaks under concurrent writes (items shift between pages) — acceptable only for small, rarely-changing lists |

> **Recommendation:** cursor-based pagination for any list endpoint backing an infinite-scroll feed — which on mobile is most of them. Offset pagination causing duplicate or skipped items mid-scroll is a common, confusing bug that cursor pagination avoids structurally.

---

## Decision 5 — Validation, At Both Ends

- **Client-side validation** is for UX — instant feedback before a request is even sent.
- **Server-side validation is the actual authority** — never trust that client-side validation was applied; a request can come from a modified client, an old app version with looser validation, or a direct API call bypassing your app entirely.
- Define validation rules **once, server-side**, and return structured field-level errors your `ApiError.fieldErrors` (from the Backend Integration module) can map directly to form fields — not a single generic error message the client has to parse.

```json
{
  "type": "validation",
  "fieldErrors": {
    "email": "Must be a valid email address",
    "password": "Must be at least 8 characters"
  }
}
```

---

## Decision 6 — Rate Limiting Awareness

Full rate limiting architecture is its own module in Phase 4, but design endpoints now with it in mind:

- Endpoints that are expensive (search, file processing, AI-backed features) should be identified now so they can be rate-limited more aggressively later — flag them rather than treating every endpoint identically.
- Return rate limit headers (`X-RateLimit-Remaining`, `Retry-After`) from the start, even before enforcement is strict — your client can use these to back off gracefully instead of hammering a limited endpoint with retries.

---

## AI Prompts

### Prompt 1 — Endpoint Contract Design

```
Design the API contract for these mobile app features: [list features/resources]

Backend: [your framework]
Mobile client: [your stack]

For each resource, specify: the endpoint shape, request/response types,
pagination approach (cursor-based for list endpoints), and validation
rules with structured field-level error responses. Flag any endpoint
that should be versioned separately due to likely future breaking changes,
and any that should be flagged for stricter rate limiting later.
```

### Prompt 2 — Backward Compatibility Review

```
Review this API change for backward compatibility with existing app
versions that won't update immediately:

[describe the proposed change]

Check specifically: does this remove or repurpose any existing field,
does this add a new required request field without a default, and
would a user on the previous app version break if this ships without
a version bump.
```

---

## Validating AI Output

- [ ] List endpoints use cursor-based pagination, not offset, unless the list is small and rarely mutated
- [ ] No existing response field is removed or repurposed without a version bump
- [ ] New request fields are optional with defaults, or explicitly gated behind a version bump
- [ ] Server-side validation exists independently of client-side validation — not assumed satisfied by the client
- [ ] Validation errors return structured field-level detail, not a single opaque message
- [ ] Expensive/AI-backed endpoints are explicitly flagged for stricter rate limiting in Phase 4

---

## What's Next

- **Database Setup** (next in this phase) implements the schema these endpoint contracts read from and write to.
- **Auth Implementation** defines the authentication layer every protected endpoint here depends on.
- **Rate Limiting** (Phase 4) is where the expensive-endpoint flags from Decision 6 become actual enforced limits.
