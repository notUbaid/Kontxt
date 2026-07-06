---
title: Endpoint Planning
slug: endpoint-planning
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 20 min
---

# Endpoint Planning

Resources are nouns. Endpoints are what a caller actually types into a request. This module turns your resource model into the concrete list of routes and methods you'll implement — the artifact you'll paste directly into your first backend AI prompt in Phase 3.

Done well, this list makes implementation almost mechanical. Done poorly, you'll be renaming routes and second-guessing methods mid-build, which is expensive after callers — even just your own frontend or test scripts — start depending on them.

## Standard CRUD Mapping

Most resources need some subset of these five operations. Start here before inventing anything custom.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/resources` | List resources |
| `GET` | `/resources/{id}` | Fetch one resource |
| `POST` | `/resources` | Create a resource |
| `PATCH` | `/resources/{id}` | Partially update a resource |
| `DELETE` | `/resources/{id}` | Delete a resource |

Not every resource needs all five. A read-only resource like `Forecast` might only need the two `GET` routes. Don't add `POST`/`PATCH`/`DELETE` just because the table exists — only add what a real use case requires.

> **Tip:** Use `PATCH` for partial updates, not `PUT`. `PUT` implies replacing the entire resource, which is rarely what callers actually want and forces them to send fields they're not changing.

## When You Need Something Beyond CRUD

Some actions aren't naturally a resource update — "send a test webhook," "regenerate an API key." Resist the urge to force these into a verb-shaped URL like `/regenerateKey`. Instead, model the action as a sub-resource or a specific, clearly-named endpoint:

```
POST /api-keys/{id}/regenerate
POST /webhooks/{id}/test
```

This keeps the noun-based convention intact while still expressing an action clearly. It reads naturally and stays consistent with the rest of your API.

## Build the Full List

For each resource from the previous module, list every endpoint it needs, tied back to a specific use case:

```
Resource: [name]
- [METHOD] [path] — [what it does] — serves use case: [which one]
- [METHOD] [path] — [what it does] — serves use case: [which one]
```

If an endpoint doesn't map to a use case, it's speculative — cut it or move it to your Phase 0 "Later" bucket.

## Decide Response Shape at the Same Time

You don't need full schemas yet (that's next module), but decide now: does `GET /resources` return a flat array, or an object with pagination metadata (`{ data: [...], next_cursor: ... }`)? Decide once, apply everywhere. Inconsistent list-response shapes across endpoints is one of the fastest ways to make an API feel unprofessional.

- [ ] Every list endpoint returns the same wrapper shape
- [ ] Every single-resource endpoint returns the same shape

## Personal Mode: Ship the CRUD You Need, Skip the Rest

A personal API rarely needs bulk operations (`POST /resources/batch`), complex filtering DSLs, or GraphQL-style field selection. These are real patterns used at scale — and real distractions before you've shipped a working v1. Add them later if you genuinely hit the limitation, not preemptively.

## AI Prompt: Complete the Endpoint List

```
My resources and their relationships: "[paste from API Resources]"
My core use cases: "[paste from MVP Scope]"

Generate a full endpoint list:
1. For each resource, list only the CRUD operations actually needed by my use cases — don't add operations "for completeness."
2. Flag any use case that isn't fully covered by the endpoints listed.
3. Suggest naming for any non-CRUD actions (like "regenerate" or "test") using the sub-resource action pattern, not verb-based URLs.

Output as a clean list: METHOD, path, purpose, which use case it serves.
```

## Before You Continue

- [ ] Every endpoint is tied to a specific use case
- [ ] Non-CRUD actions use the `/resource/{id}/action` pattern, not verbs in the path
- [ ] List and single-resource responses use one consistent shape across the whole API

When all three are checked, move to **Request Design**.
