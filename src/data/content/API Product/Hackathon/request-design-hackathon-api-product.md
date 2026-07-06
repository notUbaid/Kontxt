---
title: Request Design
slug: request-design
phase: Phase 1
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Request Design

Your route table says *where* callers send data. This module decides *what* they send — the exact shape of every request body, query parameter, and path parameter. This is the contract your target developer (Phase 0) has to read and trust in under five minutes.

---

## Pick a Naming Convention and Never Switch

JSON APIs split roughly between `camelCase` (common in JS-native ecosystems) and `snake_case` (used by Stripe, GitHub, Twilio). Neither is objectively correct — but switching between them mid-API is an instant signal of an unplanned design.

> **Decision Card — Choose one now**
- `camelCase` → natural fit if your target developer is JS/TS-heavy
- `snake_case` → natural fit if you're matching an existing ecosystem convention (e.g. integrating alongside Stripe-style tools)
>
> Whichever you pick, apply it to every field, in every request and response, for the rest of the build.

---

## Design Each Core Loop Request

For every **core loop** endpoint from your route table, define the request shape. Skip this for nice-to-have endpoints unless you have time left over.

> **Example — `POST /transcripts`**
> ```json
> {
>   "rawText": "string, required",
>   "meetingTitle": "string, optional",
>   "language": "string, optional, defaults to 'en'"
> }
> ```

Notice the pattern: every field states its type, whether it's required, and what happens if it's omitted. That's the minimum a caller needs to integrate without guessing.

---

## Required vs. Optional: Be Deliberate

> **Warning — "Everything optional" is not flexibility, it's a missing design decision.**
> If a field is optional, you must also decide its default behavior. "Optional, defaults to nothing happens" is a real answer — but it has to be a decision you made, not a gap you left for your future self to discover while debugging.

A quick test: for each field, ask *what does my API do if this is missing?* If you don't have an answer, the field isn't designed yet.

---

## Query Parameters: Only What You'll Actually Use

For collection `GET` endpoints, query parameters (filtering, pagination, sorting) are tempting to over-design. In hackathon mode, default to nothing unless your demo specifically needs it.

| Pattern | Build it if... |
|---|---|
| `?limit=10` | Your demo dataset is large enough that an unbounded list looks broken |
| `?status=pending` | Filtering is part of the story you're telling, not just "nice to have" |
| `?sort=createdAt` | Skip unless explicitly required — almost never worth the time |

> **Tip — A hardcoded reasonable default beats a configurable parameter you won't have time to test.**
> `GET /transcripts` returning the most recent 20 items, no parameters needed, is a perfectly good hackathon-scope answer.

---

## Don't Design Requests Around Your Database

A common beginner mistake: shaping the request body to match internal table columns instead of what's natural for the caller to send. Your target developer doesn't know your schema and shouldn't need to.

- **Bad:** requiring `userId`, `transcriptStatusEnum`, and `processingFlagsBitmask` in the request body because that's how your table is structured.
- **Good:** requiring only `rawText` — everything else is something your server derives or sets internally.

If a field only makes sense to your database, it doesn't belong in the request body at all.

---

## Design Requests With AI

> **Copy Prompt — Request Schema Design**
> ```
> My locked route table: [paste core loop routes]
> My locked resources and fields: [paste resource list from API Resources module]
> Naming convention: [camelCase / snake_case]
>
> For each core loop POST/PATCH route, define the request body:
- field name, type, required or optional
- for optional fields, the default behavior if omitted
- flag any field that looks like an internal implementation detail
>   rather than something a real caller would naturally provide
>
> Keep field counts minimal — only what's needed for the endpoint to work.
> ```

> **Tip — Reuse your resource field list instead of re-describing your data model.**
> You already defined rough fields per resource in the API Resources module. Pasting that list directly avoids the AI re-guessing field names that might not match what you locked in earlier.

---

## Validate the Output

- Check every "required" field is actually required by your core loop — AI sometimes marks fields required out of caution rather than necessity.
- Check default behaviors for optional fields are explicit, not implied.
- If AI proposes fields like `userId` or status enums in the request body, confirm those aren't actually internal — if they are, move them server-side instead.

---

## Lock Your Request Schemas

- [ ] Naming convention chosen and applied consistently
- [ ] Every core loop request has typed, labeled fields
- [ ] Every optional field has an explicit default behavior
- [ ] No internal/database-only fields exposed in request bodies
- [ ] Query parameters limited to what the demo actually needs

---

## What's Next

**Response Design** — define exactly what your API sends back, including error shapes, so callers never have to guess what a result means.
