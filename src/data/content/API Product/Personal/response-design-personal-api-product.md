---
title: Response Design
slug: response-design
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# Response Design

Request Design decided what comes in. Response Design decides what goes out — and this is the part callers actually build their applications around. A caller integrates with your API by reading real responses and writing code against their shape. Change that shape casually later and you break every integration silently.

This is the module where your API stops being routes on paper and starts being a real contract.

## The Envelope: Wrap Consistently, Everywhere

Decide once whether responses are wrapped in a consistent structure, and apply it to every single endpoint — no exceptions for "simple" ones.

```json
{
  "data": { ... },
  "meta": { ... }
}
```

For lists, `meta` typically carries pagination info. For single resources, it can be omitted or left empty — but the `data` wrapper itself should never disappear, even for a single object. A caller who writes `response.data` should never have to special-case one endpoint that returns the object directly.

> **Tip:** Some well-regarded APIs skip the wrapper entirely and return raw objects. Either choice is fine — what's not fine is mixing both approaches across your own API.

## Every Field, Precisely

Just like Request Design, specify exact response shapes now, not during implementation:

```
GET /subscriptions/{id}

Response 200:
{
  "data": {
    "id": string,
    "city": string,
    "threshold": number,
    "units": "metric" | "imperial",
    "created_at": string (ISO 8601)
  }
}
```

Decide explicitly: does this response include fields the caller didn't ask for but might need (like `created_at`)? Include what's genuinely useful; exclude what's just because the database has that column. A response is a contract, not a database dump.

## What NOT to Return

- **Internal IDs from other systems** — if you're wrapping a third-party API, don't leak their internal identifiers unless a caller genuinely needs them.
- **Sensitive fields by default** — anything security- or privacy-relevant should require explicit opt-in, never be included "in case it's useful."
- **Null-heavy objects** — if a field is almost always empty, question whether it belongs in the default response at all, versus an optional expanded view.

> **Warning:** Never let your response shape directly mirror your database schema. Database columns change for storage reasons; your response shape should only change for API-contract reasons. Coupling them means every internal refactor risks becoming a breaking change for callers.

## Pagination, Decided Now

If any endpoint returns a list that could grow, decide the pagination style now — retrofitting it later is a breaking change.

| Style | How it works | Best for |
|---|---|---|
| **Offset-based** (`?page=2&limit=20`) | Simple, familiar | Small, stable datasets |
| **Cursor-based** (`?cursor=abc123`) | Stable even as data changes underneath | Anything growing or frequently updated |

For a personal project, offset-based is usually enough — cursor-based solves a scale problem you likely don't have yet. Pick based on your actual data, not on what sounds more advanced.

## Personal Mode: Resist Building a "Flexible" Response System

Field selection (`?fields=id,city`), nested expansion (`?expand=subscription.webhooks`), and GraphQL-style querying are real, valuable patterns — at a scale and caller-diversity you likely don't have yet. Return a complete, well-designed fixed shape per endpoint. Add flexibility only when a specific use case demands it.

## AI Prompt: Validate the Response Shape

```
Here's a response I'm designing:

Endpoint: [METHOD] [path]
Draft response: [paste your JSON draft]

Review it:
1. Does this leak any field that looks like an internal implementation detail rather than something a caller needs?
2. Is the shape consistent with a wrapped-envelope style (data/meta), or is this endpoint doing something different from the rest of my API?
3. If this is a list endpoint, is pagination info present and consistent with how I'd paginate elsewhere?
```

## Before You Continue

- [ ] Every response uses the same envelope structure, no exceptions
- [ ] I've decided pagination style before implementing any list endpoint
- [ ] No response includes internal-only fields or raw database structure

When all three are checked, move to **Error Design**.
