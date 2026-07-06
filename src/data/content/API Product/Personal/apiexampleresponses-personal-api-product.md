---
title: Example Responses
slug: example-responses
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Example Responses

A request example shows a developer how to ask. A response example shows them what to expect back — and, more importantly, what to check for before they trust the data. Missing or fake-looking response examples are one of the most common reasons developers write defensive, over-cautious integration code: when they can't see the real shape of your data, they guess, and they guess conservatively.

This module pairs every request from the previous module with realistic success and error responses.

---

## Anatomy of a Good Example Response

- **Full envelope** — if your API wraps data (`{ "data": {...}, "meta": {...} }`), show the whole envelope, not just the inner object. Developers copy what they see.
- **Realistic values** — IDs that look like your real ID format (`item_8f2k1x`, not `1` or `abc`), timestamps in your actual format, nested objects fully populated.
- **Relevant headers** — if rate limits, pagination cursors, or request IDs live in headers, show them. A response body alone hides half the contract.
- **No internal fields** — anything your backend returns but shouldn't be relied upon publicly (`internal_notes`, `_debug`, soft-delete flags) must not appear in published examples, even if your API technically returns it today.

> **️ Warning:** If your example response and your actual API response drift apart, developers build against the example — then get surprised in production by fields it didn't mention. Regenerate examples from a real (sanitized) API call, don't hand-type them from memory of the schema.

---

## Success Response

```json
// 201 Created — POST /v1/items
{
  "data": {
    "id": "item_8f2k1x9r",
    "name": "Wireless Mouse",
    "price_cents": 2999,
    "sku": "MOUSE-WL-01",
    "created_at": "2026-06-14T09:12:03Z",
    "updated_at": "2026-06-14T09:12:03Z"
  },
  "meta": {
    "request_id": "req_3n8x7q2p"
  }
}
```

```text
HTTP/1.1 201 Created
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 97
X-RateLimit-Reset: 1750000000
```

Showing the rate limit headers here does more DX work than a paragraph explaining your rate limit policy — developers now know exactly where to look at runtime.

---

## Error Responses

Show every distinct error shape your API produces, using the same envelope structure every time. Consistency here is what makes error handling in client code simple instead of a pile of special cases.

```json
// 400 Bad Request — validation error
{
  "error": {
    "code": "validation_error",
    "message": "price_cents must be a positive integer",
    "field": "price_cents",
    "request_id": "req_9k2m1x8p"
  }
}
```

```json
// 401 Unauthorized
{
  "error": {
    "code": "invalid_api_key",
    "message": "The API key provided is invalid or has been revoked",
    "request_id": "req_1p8x3n2q"
  }
}
```

```json
// 429 Too Many Requests
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Retry after the time in Retry-After header.",
    "request_id": "req_7q3n8k1x"
  }
}
```

> ** Best Practice:** Every error response uses the exact same top-level shape (`error.code`, `error.message`, `error.request_id`). A developer who's handled one of your errors correctly should be able to handle all of them with the same code path.

---

## Quick Reference: Status Codes to Document

| Code | When It Appears | Show an Example? |
|---|---|---|
| 200 / 201 | Successful read/create | Always |
| 400 | Validation failure | Always |
| 401 | Missing/invalid API key | Always |
| 403 | Valid key, insufficient permissions | If your API has permission scopes |
| 404 | Resource doesn't exist | Always |
| 429 | Rate limit exceeded | Always |
| 500 | Server error | Briefly — mention `request_id` is the important field for support |

---

## AI Prompt

**Prompt: Generate response examples from your schema**

```text
Here is the response schema for one endpoint from my OpenAPI spec: [paste schema].

Generate example responses for this endpoint:
1. A successful response with realistic field values matching this ID format: [describe your ID format, e.g. "item_" followed by 8 random alphanumeric characters]
2. A 400 validation error using this error envelope: { "error": { "code", "message", "field", "request_id" } }
3. A 404 not found error using the same envelope

Requirements:
- Do not include any field not defined in the schema
- Do not include internal-only fields even if present in the schema — list them separately as "excluded from public examples" if you find any
- Timestamps in ISO 8601 UTC

Output only the JSON examples, no explanation.
```

---

## Validation Checklist

- [ ] Every example response uses the real envelope structure, not a simplified version
- [ ] Success and every relevant error code (400/401/404/429 at minimum) have an example
- [ ] All error examples share one consistent shape
- [ ] IDs, timestamps, and nested objects look like real data, not placeholders
- [ ] Relevant headers (rate limit, pagination, request ID) are shown alongside the body
- [ ] No internal-only fields appear in any published example

---

## Common Mistakes

> **️ Warning:** Documenting only the success response. Developers write error handling from your error examples, not from your prose — if the example isn't there, they'll write a generic `catch` block and move on, which means your specific error codes go unused.

> **️ Warning:** Inconsistent error shapes between endpoints (`error.message` here, `message` there, `errors: []` somewhere else). This is usually a sign the underlying error design (Phase 1) wasn't enforced consistently across the codebase — worth a pass over your actual error handlers, not just the docs.

> **️ Warning:** Using sequential or obviously fake IDs (`1`, `2`, `test123`). Developers infer things from ID formats — sequential integers imply enumerable/guessable IDs, which raises unnecessary security questions about an API that may not actually work that way.

---

## Security Note

Never generate example responses by copying real production or staging data, even redacted. It's easy to miss one field. Generate fabricated data that matches your schema and ID format exactly — it's safer and, done well, indistinguishable from the real thing in documentation.

---

## Implementation Checklist

- [ ] Success example added for every public endpoint
- [ ] 400, 401, 404, and 429 error examples added using one shared envelope
- [ ] Relevant response headers documented alongside each example
- [ ] Internal-only fields confirmed excluded from every example
- [ ] Examples generated from schema/sanitized real calls, not hand-typed from memory

---

## What's Next

Next in Phase 5: **Quick Start Guide** — assembling the fastest possible path from "I found your API" to "I made a successful call."
