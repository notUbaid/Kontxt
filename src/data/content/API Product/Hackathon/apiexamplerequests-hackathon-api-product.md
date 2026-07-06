---
title: Example Requests
slug: example-requests
phase: Phase 5
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Example Requests

A judge or a fellow developer evaluating your API will copy your example, change one value, and run it. If that example is wrong, malformed, or doesn't match what your code actually accepts, the trust is gone in one request.

## The Decision You're Actually Making

You already built the Postman collection — this is about the **written** examples that live in your README, docs, or pitch deck. The question is: *what's the minimum set of examples that lets someone use every core feature without reading your source code?*

Not every endpoint needs a full writeup. Prioritize ruthlessly.

## What Deserves a Written Example

| Always show | Show if time allows | Skip |
|---|---|---|
| Auth — how to attach a key/token | Pagination on list endpoints | Every query parameter combination |
| Create (POST) for your core resource | Filtering/sorting options | Admin-only or internal routes |
| Read (GET) for your core resource | Bulk operations | Deprecated/legacy routes |
| One realistic error response | Optional fields | Every possible error code |

> ** Tip:** Three excellent examples beat twelve mediocre ones. A judge skimming your README in 90 seconds reads the first three and forms their entire opinion of your API's quality from those.

## Anatomy of a Good Example

Every example needs all four parts together — never split across paragraphs:

1. **What it does** — one sentence, plain language
2. **The request** — exact method, URL, headers, body
3. **The response** — exact status code and body shape
4. **One realistic value** — not `"string"` or `"foo"`, an actual plausible value

```bash
# Create a task
curl -X POST https://your-api.com/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title": "Review pull request #42", "dueDate": "2026-07-05"}'
```

```json
// 201 Created
{
  "id": "tsk_8f3a2b",
  "title": "Review pull request #42",
  "dueDate": "2026-07-05",
  "completed": false,
  "createdAt": "2026-07-01T09:12:00Z"
}
```

> ** Best Practice:** Use realistic values everywhere — real-sounding titles, valid date formats, plausible IDs. Generic placeholders (`"string"`, `"test123"`) make a reader guess at the actual shape and constraints of your data instead of seeing them directly.

## Always Include One Error Example

Most API docs only show the happy path. Showing one realistic failure builds more credibility than another success case.

```json
// 400 Bad Request
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "dueDate must be a valid ISO 8601 date"
  }
}
```

> **️ Warning:** If your error response shape is inconsistent across endpoints (some return `{ error: "..." }`, others `{ message: "..." }`), fix that before writing examples — don't document the inconsistency, eliminate it. It's a five-minute fix that prevents an obvious red flag during code review.

## Generate Examples with AI — Then Verify Every One

**Prompt — Generate Example Requests from Code**
```
For each endpoint in this router file, generate:
1. A one-sentence description of what it does
2. A curl example with realistic (not placeholder) values
3. The exact success response shape, matching the actual return statements in the code
4. One realistic error response for the most likely failure case

Base every field name and type strictly on this code — do not invent 
fields that don't exist in the implementation.
```

> **️ Warning:** AI will confidently invent fields, wrong status codes, or response shapes that don't match your actual implementation if given only a vague description. Always generate examples from the real route code, then run each one yourself before publishing — an unverified AI-generated example is worse than no example, because it actively misleads.

> ** Token Efficiency:** Generate examples in the same conversation where you already discussed the routes, rather than starting fresh and re-explaining the API shape — reusing context here costs far fewer tokens than re-establishing it.

## Validate Before You Publish

- [ ] Copy each example exactly as written and run it — no edits
- [ ] Confirm response field names match your code exactly (case-sensitive)
- [ ] Confirm status codes match what your code actually returns
- [ ] Check that example IDs/values look realistic, not like leftover test data

## Common Mistakes

- Example response copied from an early draft of the API, now outdated
- Placeholder values (`"foo"`, `"123"`) that don't show the real data shape
- Only happy-path examples — no indication of what failure looks like
- Auth header format that doesn't match what the middleware actually expects

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| Auth example | Pagination example | Every parameter variant |
| Core resource CRUD examples | Filtering example | Internal route examples |
| One error example | Bulk operation example | Deprecated route examples |
| Realistic values throughout | Rate-limit response example | Every status code documented |

## What's Next

With requests documented, the next module covers writing the example *responses* in full — including how to represent nested data, lists, and pagination so a developer knows exactly what shape to expect back.
