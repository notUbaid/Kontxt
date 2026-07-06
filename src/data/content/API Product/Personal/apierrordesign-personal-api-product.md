---
title: Error Design
slug: error-design
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Error Design

A caller's first real impression of your API's quality usually isn't a successful response — it's the first error they hit while integrating, because everyone hits one. A clear, consistent error tells them exactly what to fix. A vague one sends them to your docs, then to guessing, then to giving up.

This module designs that experience deliberately, before you've written a single error message under the pressure of a failing test.

## Use Real HTTP Status Codes

Don't return `200` with an error buried in the body — it breaks every standard HTTP client, monitoring tool, and caller expectation. Use status codes to carry real meaning:

| Code | Means | Example |
|---|---|---|
| `400` | Bad request — caller sent malformed or invalid data | Missing required field |
| `401` | Unauthenticated — no valid credentials at all | Missing or malformed API key |
| `403` | Authenticated, but not allowed | Valid key, wrong permissions |
| `404` | Resource doesn't exist | Bad ID in the path |
| `409` | Conflict with current state | Duplicate resource creation |
| `422` | Well-formed but semantically invalid | Valid JSON, but `threshold` is negative |
| `429` | Rate limited | Too many requests |
| `500` | Something broke on your end | Unhandled server error |

Getting this right means callers can branch on status code alone, before even parsing the body — critical for anyone writing retry logic or error handling against your API.

## Error Body Shape: Consistent, Everywhere

Just like your success response envelope, decide one error shape and never deviate:

```json
{
  "error": {
    "code": "invalid_threshold",
    "message": "threshold must be greater than 0",
    "field": "threshold"
  }
}
```

`code` is machine-readable — a caller's code should be able to branch on it. `message` is human-readable — for the developer reading logs, not necessarily for end users. `field`, when relevant, tells them exactly which input caused the problem, saving a debugging round-trip.

> **Tip:** Prefix error codes by category (`auth_missing_key`, `validation_invalid_threshold`) rather than generic ones (`error_1`, `bad_request`). Specific codes let callers write precise handling; generic ones force them back to reading your docs every time.

## What NOT to Put in Error Messages

- **Stack traces or internal file paths** — a real security leak, not just an aesthetic issue.
- **Database or infrastructure details** — "unique constraint violation on table subscriptions" tells a caller nothing useful and reveals your internals.
- **Vague catch-alls** for everything — "something went wrong" as your only 400 response teaches callers nothing about what to fix.

> **Warning:** Never let an unhandled exception reach the caller as a raw stack trace, even in a personal project you're the only one testing. The habit of always returning a clean, structured error — even for cases you didn't anticipate — is what separates code that's ready for someone else to call from code that only works when you're the one running it.

## Personal Mode: Cover the Errors You'll Actually Hit

You don't need to enumerate every conceivable error state before writing any code. Design the shape and status code conventions now (this module), then implement handling for real errors as you hit them in Phase 3 — validation failures, missing resources, auth failures. That's realistic coverage for a personal MVP; exhaustive edge-case handling can wait until you've seen which edge cases actually occur.

## AI Prompt: Design the Error Catalog

```
Here are my API's endpoints and their required fields: "[paste from Request Design]"

Generate an error catalog:
1. List the realistic error cases for each endpoint (missing fields, invalid values, not-found, auth failures).
2. For each, give the correct HTTP status code and a specific error code (category_specific_reason format).
3. Flag any case where I might be tempted to return 200 with an error in the body instead of a real status code.
```

## Before You Continue

- [ ] Every error uses a real, meaningful HTTP status code
- [ ] Error bodies follow one consistent shape across the entire API
- [ ] No error response can leak stack traces, file paths, or internal infrastructure details

When all three are checked, move to **API Standards**.
