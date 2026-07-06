---
title: Response Design
slug: response-design
phase: Phase 1
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Response Design

Requests are what callers send you. Responses are what you promise back — and that promise needs to hold for every endpoint, every time, including when something goes wrong. Inconsistent responses are one of the fastest ways to make a working API feel broken in a live demo.

---

## Status Codes: The Quick Reference

| Code | Use for |
|---|---|
| `200` | Successful `GET` or `PATCH` |
| `201` | Successful `POST` that created a resource |
| `204` | Successful `DELETE` (no body returned) |
| `400` | Malformed request (bad JSON, wrong types) |
| `401` | Missing or invalid auth |
| `404` | Resource doesn't exist |
| `422` | Well-formed request, but fails validation (e.g. missing required field) |
| `429` | Rate limit exceeded |
| `500` | Something broke on your end |

> **Warning — Returning `200` with an error message in the body is a common, costly mistake.**
> If a request fails, the status code must say so. A caller (especially an AI agent calling your API) checks the status code programmatically — a `200` with `{"error": "not found"}` buried in the body will be silently treated as success and cause confusing downstream failures.

---

## Pick One Response Envelope

> **Decision Card — Wrapped or raw?**
- **Wrapped:** `{ "data": {...} }` — easier to add metadata later (pagination, request IDs)
- **Raw:** `{...}` directly — slightly simpler for callers, harder to extend later
>
> Either is fine. What's not fine is mixing them — one endpoint returning a raw object and another wrapping it in `data` is the kind of inconsistency that makes an API feel unfinished.

For a hackathon build, **raw is usually faster to ship** and perfectly defensible — don't add a wrapper "for scalability" you won't actually use in the demo.

---

## Design a Consistent Error Shape

Every error response, across every endpoint, should follow the same structure. This matters more than almost any other response decision.

> **Example — Consistent error envelope**
> ```json
> {
>   "error": {
>     "code": "VALIDATION_ERROR",
>     "message": "rawText is required",
>     "field": "rawText"
>   }
> }
> ```

A consistent shape means a caller writes **one** error handler for your entire API instead of one per endpoint. This is especially important if your target developer (Phase 0) is an AI agent — deterministic, predictable error shapes are what make agentic tool-calling reliable.

---

## Don't Leak Internal Fields

> **Warning — Response design is a security decision, not just a formatting one.**
> Returning your full database row by default is a common shortcut that exposes internal IDs, processing flags, or — worse — other users' data accidentally joined in. Explicitly list what each response includes. If a field isn't on that list, it doesn't go in the response, full stop.

This is a five-minute decision now versus a real vulnerability later — don't skip it because "it's just a hackathon."

---

## Handle Async States Explicitly

If any part of your core loop involves processing time (like transcript analysis), your response design needs to account for it — this is the kind of gap that stalls a live demo if it's not planned.

> **Quick Reference — Async response pattern**
> `POST /transcripts` returns `202 Accepted` with a `status: "processing"` field and the resource ID immediately. The caller then polls `GET /transcripts/:id` until `status` becomes `"complete"`. Design this now, even if the actual processing logic comes in Phase 3.

---

## Design Responses With AI

> **Copy Prompt — Response Schema Design**
> ```
> My locked route table: [paste core loop routes]
> My locked request schemas: [paste from the previous module]
> Response envelope choice: [raw / wrapped in "data"]
>
> For each core loop route, define:
- the success response shape (status code + fields included)
- explicitly state which fields are excluded for security reasons
- the error response shape, using one consistent error envelope
>   across all endpoints
- if any route involves processing time, design the status field
>   and polling pattern
>
> Flag any endpoint where I'm at risk of leaking internal-only fields.
> ```

> **Tip — Build on what you've already locked instead of re-deriving it.**
> Your route table and request schemas from the last two modules give AI everything it needs to design matching responses. Re-explaining your whole API from scratch here wastes tokens on context it already effectively has.

---

## Validate the Output

- Confirm every error response across every endpoint uses the *exact same* shape — even one inconsistent endpoint undermines the whole contract.
- Check the success response field list against your resource's actual fields (from API Resources) — flag anything that looks like an internal column rather than something your target developer needs.
- If your core loop has any processing delay, confirm the async pattern is fully specified, not just mentioned.

---

## Lock Your Response Schemas

- [ ] Status codes assigned per endpoint, including error cases
- [ ] One consistent error envelope used everywhere
- [ ] Response envelope choice (raw vs. wrapped) applied consistently
- [ ] Internal-only fields explicitly excluded from every response
- [ ] Async/processing states designed if your core loop needs them

---

## What's Next

**Authentication Strategy** — decide exactly how callers prove who they are, matched to the target developer you locked in Phase 0.
