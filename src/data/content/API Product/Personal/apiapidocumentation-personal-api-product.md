---
title: API Documentation
slug: api-documentation
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# API Documentation

The Phase 3 Documentation module was for you — setup instructions, env vars, internal notes. This is for everyone else. Public API documentation is the actual product interface for a huge share of your users: many developers will judge your entire API's quality from your docs before writing a single line of integration code.

This module covers structure and writing quality. The next few modules build the specific pieces this one organizes: the OpenAPI spec, a Postman collection, an interactive playground, and your SDK's own docs.

---

## What Developers Actually Need, in Order

Developers integrating with a new API move through a predictable sequence. Structure your docs to match it, not around your internal architecture.

```
1. "What does this API do, and is it right for my use case?"
2. "How do I authenticate?"
3. "Show me a request that works, right now, copy-pasteable"
4. "What are all the endpoints and their exact parameters?"
5. "What happens when something goes wrong?"
6. "How do I do [specific thing I actually need]?"
```

> **Decision card**
> Structure your docs as: **Getting Started** (steps 1–3) → **Guides** (step 6, task-oriented) → **API Reference** (step 4, exhaustive) → **Errors** (step 5, reference). Most API docs fail by leading with the exhaustive reference — a wall of every endpoint before the reader has successfully made a single request. Get them to one working request first.

---

## Documentation Site Tooling

| Tool | Fits when |
|---|---|
| **Mintlify** | Fastest to a polished result, free tier is generous, generates nav from markdown + OpenAPI |
| **Docusaurus** | More customizable, you want full control, comfortable with React |
| **Redocly / Readme.com** | Strong OpenAPI-driven reference pages, less flexible for narrative guides |

> **Decision card — Recommended for Personal mode**
> Use **Mintlify**. It reads your OpenAPI spec (built in the next module) to auto-generate reference pages, so you write guides once in markdown and get the endpoint reference essentially for free. This avoids the common trap of hand-writing reference docs that drift out of sync with your actual API within weeks.

---

## Getting Started: The Page That Matters Most

This single page determines whether a developer evaluating your API in the first five minutes decides to keep going. It should contain a request they can copy, paste, and run with zero modification beyond their own key.

```markdown
# Getting Started

## 1. Get an API key

Sign up and generate a key from [dashboard link]. Keys look like
`sk_live_...` — see [Authentication](/authentication) for details.

## 2. Make your first request

\`\`\`bash
curl https://api.example.com/v1/orders \
  -H "Authorization: Bearer sk_live_your_key_here"
\`\`\`

\`\`\`json
{
  "data": [],
  "nextCursor": null
}
\`\`\`

## 3. Next steps

- [Authentication](/authentication) — scopes, key rotation
- [Creating your first order](/guides/create-order)
- [Full API reference](/reference)
```

> **Tip — the example must actually work as written**
> Test every code sample in your getting-started page by literally copy-pasting it and running it, not by eyeballing it for correctness. A broken first example is the single fastest way to lose a developer's trust in your entire API — if this doesn't work, why would they believe anything else does?

---

## Writing Style for API Docs

| Do | Don't |
|---|---|
| "Send a `POST` request to `/orders` with the fields below." | "In order to create a new order resource, one must first construct a request..." |
| Show the request and response together | Describe the response in prose without an example |
| Lead with the code sample, explain after if needed | Lead with a paragraph of explanation before any code |
| Document what happens on failure right next to the success case | Bury error handling in a separate "errors" page with no cross-links |

API docs are reference material a developer returns to repeatedly while coding, not a narrative someone reads start to finish once. Optimize for scanning and copy-paste, not for flowing prose.

---

## Documenting an Endpoint

Every endpoint page should answer the same fixed set of questions, in the same order, so developers learn the pattern once and can scan any endpoint quickly after.

```markdown
## Create an order

`POST /v1/orders`

Creates a new order for the authenticated user.

**Authentication:** API key with `write` scope required.

### Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `items` | array | Yes | 1–100 items, see Item object below |
| `notes` | string | No | Max 500 characters |

### Example request

\`\`\`bash
curl -X POST https://api.example.com/v1/orders \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{"items": [{"sku": "ABC123", "quantity": 2}]}'
\`\`\`

### Example response — 201 Created

\`\`\`json
{
  "id": "ord_8f2a1c3d",
  "status": "pending",
  "items": [{"sku": "ABC123", "quantity": 2}]
}
\`\`\`

### Errors

| Status | Code | Meaning |
|---|---|---|
| 400 | `validation_error` | Request body failed schema validation |
| 401 | `unauthorized` | Missing or invalid API key |
| 403 | `insufficient_scope` | Key lacks `write` scope |
```

> **Warning — document errors next to the endpoint, not just in a global error reference**
> A global error reference page is useful, but a developer debugging a failed `POST /orders` call wants to see *that endpoint's* possible errors immediately, not go hunting through a separate page guessing which of forty error codes applies to this specific request.

---

## Keeping Docs in Sync With Code

Documentation that drifts from actual behavior is worse than no documentation — it actively misleads. This is the recurring failure mode of hand-maintained API docs.

> **Decision card — docs-as-code**
> Keep documentation source files in the same repository as your API code, reviewed in the same pull requests as the endpoint changes that affect them. A PR that adds a field to an endpoint should include the doc update in the same diff — not "I'll update the docs later," which is how drift happens. Since your reference pages generate from the OpenAPI spec (next module), keeping that spec accurate is most of this battle already.

---

## AI Prompt: Draft an Endpoint Doc Page

```
Write API documentation for this endpoint, following this structure:
endpoint + method, one-sentence description, auth requirements,
request body table (field/type/required/description), a working curl
example, an example success response, and an error table covering
the specific failure modes this endpoint can return.

[paste the route handler code, including validation schema and
authorization/scope checks]

Match the writing style: direct, code-first, scannable. No narrative
paragraphs explaining REST concepts.
```

---

## Validating AI Output

- **Actually run every generated code sample.** AI-generated curl examples frequently have subtly wrong field names, missing required headers, or a response shape that doesn't match your real API — verify against your actual running API, not just visually.
- **Cross-check the error table against your route's real code**, including the middleware chain (auth, scope checks, validation) — not just the happy-path handler. A generated doc that misses a 429 from your rate limiter, or a 403 from a scope check, will send developers debugging in the wrong direction.
- **Confirm field types and required/optional status match your actual Zod schema exactly** — a documented-but-wrong "required" flag causes real integration bugs on the consuming end.

---

## Common Mistakes

- Leading with an exhaustive endpoint reference instead of a working getting-started example.
- Code samples that were never actually tested against the real API.
- Error documentation that's global and disconnected from the specific endpoint that returns it.
- Docs updated in a separate, later PR (or never) instead of the same PR as the code change.
- Writing in third-person passive voice ("the resource is created") instead of direct instruction ("send a POST request to create the resource").

---

## Validation Checklist

- [ ] Getting Started has one copy-pasteable example that has actually been tested end-to-end
- [ ] Docs are organized: Getting Started → Guides → Reference → Errors, in that order of discoverability
- [ ] Every endpoint page shows a real request and real response together, not description alone
- [ ] Errors are documented per-endpoint, not only in a disconnected global reference
- [ ] Documentation source lives in the same repo as the code, updated in the same PRs
- [ ] Field requirement/type documentation matches your actual validation schemas exactly

---

## What's Next

The next module — **OpenAPI Specification** — builds the machine-readable spec that generates your reference pages automatically, keeping the endpoint tables in this module's structure accurate without hand-maintaining them.
