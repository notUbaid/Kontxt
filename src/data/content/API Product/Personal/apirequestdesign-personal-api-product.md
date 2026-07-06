---
title: Request Design
slug: request-design
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# Request Design

Your endpoint list says what routes exist. Request Design says exactly what a caller sends to each one — field names, types, required vs. optional, and where each piece of data lives (path, query string, or body). This is the difference between an endpoint list and something you can actually implement without guessing.

Get this wrong and callers hit confusing validation errors. Get it inconsistent across endpoints and every integration takes longer than it should, because nothing behaves the way the last endpoint taught them to expect.

## Where Data Belongs

Three places, three purposes. Mixing them up is one of the most common beginner API mistakes.

| Location | Use for | Example |
|---|---|---|
| **Path parameter** | Identifying a specific resource | `/subscriptions/{id}` |
| **Query parameter** | Filtering, sorting, pagination on `GET` requests | `/forecasts?city=austin&units=metric` |
| **Request body** | The actual data being created or updated | `POST /subscriptions` with `{ "city": "austin", "threshold": 5 }` |

> **Warning:** Never accept a resource ID in the body when it's already in the path (`PATCH /subscriptions/{id}` with an `id` field in the body too). It creates ambiguity — what happens if they don't match? Pick one source of truth: the path.

## Specify Every Field, Now

For each endpoint that accepts input, write the exact shape. Don't leave this for implementation time — deciding field names while writing code means deciding them under time pressure, which is how inconsistency creeps in.

```
POST /subscriptions

Body:
{
  "city": string, required,
  "threshold": number, required, must be > 0,
  "units": "metric" | "imperial", optional, default "metric"
}
```

Every field needs three things decided now: **type**, **required or optional**, and **any constraint** (range, format, allowed values). "I'll validate it properly later" is how APIs end up accepting garbage data that breaks something three endpoints downstream.

## Naming Consistency Matters More Than Any Single Choice

`camelCase` vs `snake_case` for field names is genuinely a coin flip — but only if you flip it once. An API where some endpoints use `userId` and others use `user_id` looks like it was built by two people who never talked to each other, because from the caller's side, that's indistinguishable from actually being broken.

- [ ] Pick one casing convention for all field names, everywhere
- [ ] Pick one date/time format (ISO 8601 — `2026-07-01T14:30:00Z` — unless you have a specific reason not to) and use it everywhere
- [ ] Decide now whether IDs are integers, UUIDs, or prefixed strings (like Stripe's `sub_1a2b3c`) — this affects your database schema in Phase 2

## Required vs. Optional: Default to Strict

It's tempting to make fields optional "just in case" a caller doesn't have that data yet. Resist this. Optional fields you actually need push validation logic and null-checking into every place that reads them. If your use case genuinely requires a field to build the response, make it required — and give a clear error when it's missing, rather than silently guessing a default.

## Personal Mode: Don't Design a Query Language

Full filtering DSLs (`?filter[status][gte]=5`) are a real pattern at scale, and a genuine waste of time on a personal MVP. If a use case needs filtering, add the specific query parameters it needs (`?status=active`) — nothing more general than what you can point to a real use case for.

## AI Prompt: Fill In the Request Spec

```
Here's one of my endpoints: [METHOD] [path] — [purpose]
It needs to accept: [rough description of what data it needs, in plain English]

Write a precise request spec:
1. Full field list with type, required/optional, and any constraints
2. Confirm each field belongs in path, query, or body — and flag if I've put anything in the wrong place
3. Point out any field that's marked optional but is actually required by the endpoint's purpose
```

Run this once per endpoint that accepts input — it's a small, focused prompt, which keeps the AI's answer accurate and keeps your token usage low compared to asking for your entire API's request specs in one giant prompt.

## Before You Continue

- [ ] Every endpoint that accepts input has a full field spec: type, required/optional, constraints
- [ ] Field naming, date format, and ID format are consistent across the whole API
- [ ] No resource ID appears in both the path and the body for the same endpoint

When all three are checked, move to **Response Design**.
