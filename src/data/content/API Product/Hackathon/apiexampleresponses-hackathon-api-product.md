---
title: Example Responses
slug: example-responses
phase: Phase 5
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Example Responses

A request example shows someone what to send. A response example shows them what to expect back — and that's what they actually write code against. If your response examples are vague or incomplete, every developer who integrates your API guesses at field types, and guesses are where bugs come from.

## The Decision You're Actually Making

This isn't "show what comes back." It's: **what does a developer need to see to write correct code against this response on the first try** — without trial and error against your live API?

That means showing real structure: nesting, arrays, pagination, nulls — not just one flat happy-path object.

## What a Complete Response Example Needs

| Element | Why it matters |
|---|---|
| Exact field names, exact casing | Developers copy-paste field names directly into code |
| Real data types (string vs number vs boolean) | Wrong type in an example causes wrong type in their parser |
| Nested objects shown in full, at least once | Flattened examples hide structure they'll actually receive |
| `null` shown where a field can legitimately be null | Otherwise they don't handle it, and it breaks in production |
| The actual HTTP status code | `200` vs `201` vs `204` changes how clients should behave |

> ** Best Practice:** If a field can be `null` or absent, show one example where it is. A developer who never sees that case won't defensively check for it, and their integration breaks the first time your API legitimately returns it.

## Lists Need Pagination Shown, Not Just Items

A single-item example doesn't teach someone how to page through 500 results. Show the wrapper shape explicitly:

```json
// 200 OK — GET /v1/tasks?page=1&limit=20
{
  "data": [
    {
      "id": "tsk_8f3a2b",
      "title": "Review pull request #42",
      "completed": false
    },
    {
      "id": "tsk_9d1c4e",
      "title": "Update API documentation",
      "completed": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 47,
    "hasMore": true
  }
}
```

> ** Tip:** Showing `hasMore: true` with `total: 47` against a `limit: 20` teaches the pagination math implicitly — no separate paragraph explaining how paging works is needed.

## Show One Response Per Status Code Your API Actually Returns

| Status | When | Show it? |
|---|---|---|
| 200 / 201 | Success | Always |
| 400 | Validation failure | Always |
| 401 / 403 | Auth failure | Always, if auth exists |
| 404 | Resource not found | Always |
| 429 | Rate limited | If you implemented rate limiting |
| 500 | Server error | Skip — don't document a bug as a feature |

> **️ Warning:** Don't include a `500` example. Documenting a server error as expected behavior signals you expect your API to crash — it undermines confidence rather than building it. If it happens, fix it; don't normalize it in your docs.

## Generate Responses with AI — Anchored to Real Code

**Prompt — Generate Response Examples from Implementation**
```
For each endpoint below, generate the exact JSON response shape based 
strictly on what this code returns — not what a typical API "usually" 
returns. Include:
1. The success response with realistic values
2. One example showing a nullable field actually as null
3. The 400/401/404 error responses this specific code path can produce

If a status code or field isn't handled in this code, do not invent it.

[paste route handler code]
```

> **️ Warning:** This is the highest-risk place for AI hallucination in your whole docs set — it will generate "typical REST API" responses that don't match your actual code. Every field name, every status code, every error shape must be checked directly against your implementation, not assumed correct because it looks idiomatic.

> ** Token Efficiency:** Paste the handler function, not the whole file. The response shape is determined by a handful of lines (the `res.json(...)` or `return` statements) — surrounding middleware and imports add tokens without adding accuracy.

## Validate Before You Publish

- [ ] Call the real endpoint and diff the actual response against your written example, field by field
- [ ] Confirm every nullable field has at least one example showing `null`
- [ ] Confirm pagination math in the example is internally consistent (`total`, `limit`, `hasMore` actually agree)
- [ ] Remove any field shown in an example that the code doesn't currently return

## Common Mistakes

- Example shows a flat object, but the real API wraps it in `{ data: ... }`
- Field marked as a string in the example, but the code actually returns a number
- No nullable field ever shown as `null` — developer doesn't defensively check, it breaks later
- List endpoint example shows only items, no pagination metadata

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| One success response per endpoint | Every field documented individually | 500 error examples |
| 400/401/404 examples | Rate-limit header examples | Examples for unimplemented features |
| One nullable field shown as null | Multiple pagination page examples | Internal-only response fields |
| Pagination wrapper shown in full | Webhook payload examples | Theoretical future response shapes |

## What's Next

With requests and responses fully documented, the next module pulls everything together into a Quick Start Guide — the single page that takes a new developer from zero to their first successful API call.
