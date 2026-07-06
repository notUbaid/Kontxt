---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# MVP Scope

This is the last decision in Phase 0, and the one that breaks the most teams. Not because it's hard — because it's easy to skip and "figure out as you go." Teams that skip explicit scoping don't run out of skill. They run out of time, mid-build, with three half-finished endpoints and no demo.

You're about to convert your problem, purpose, and target developer into an exact, finite list of endpoints. Nothing vague survives this module.

---

## MVP Doesn't Mean What You Think Here

In a hackathon, "MVP" isn't "smallest product someone would pay for." It's narrower: **the smallest set of endpoints that lets you run the full demo, live, without faking anything.**

> **Tip — Work backward from the demo, not forward from features.**
> Picture the exact sequence of API calls you'll make on stage. Every endpoint in that sequence is in scope. Every endpoint not in that sequence is cut, no matter how easy it'd be to add.

---

## Find Your Core Loop

The core loop is the single request → response journey that proves your purpose statement is real. Usually it's 2–4 endpoints, not 10.

Example, for a transcript-to-action-items API:

1. `POST /transcripts` — submit a raw transcript
2. `GET /transcripts/:id/actions` — get back structured action items

That's a complete, demoable loop. Everything else — user accounts, history, editing, deletion — is a later concern.

---

## Sort Everything Into Three Buckets

> **Decision Matrix — Endpoint Triage**

| Bucket | Definition | Example |
|---|---|---|
| **Core loop** | Required for the demo to work end-to-end | Submit input, get structured output |
| **Nice-to-have** | Improves the demo but isn't required to prove the idea | Listing past results, basic filtering |
| **Cut entirely** | Doesn't change whether the demo proves the idea | Auth roles, pagination, soft deletes, webhooks |

Build the core loop bucket first, completely, before touching anything in nice-to-have. If you run out of time, nice-to-have items simply don't exist — that's the system working correctly, not a failure.

> **Warning — "Just one more endpoint" is how teams run out of time.**
> Each additional endpoint isn't just build time — it's also testing time, error-handling time, and docs time in Phase 5 and Phase 6. A 6th endpoint can cost more total time than the first 5 combined.

---

## Budget Your Endpoints

As a hackathon-scale reference point:

| Remaining build time | Realistic endpoint count |
|---|---|
| Under 6 hours | 2–3 endpoints |
| 6–12 hours | 3–5 endpoints |
| 12–24 hours | 5–7 endpoints |

Going over these numbers doesn't make your API more impressive — it makes each endpoint less polished, and polish is what judges actually notice (see the Welcome module).

---

## Time-Box From the Deadline Backward

Don't count forward from "now." Count backward from submission:

1. Reserve the **final 10–15%** of total time for demo prep, pitch, and submission (Phase 6).
2. Reserve a fixed block for testing and error handling (Phase 3) — this is not optional, it's where demos break live.
3. Whatever's left is your actual build time for the core loop.

If that remaining number feels tight against your endpoint list, cut endpoints now — not at hour 10 when it's a panic decision.

---

## Cut Ruthlessly With AI

Use AI as the bad cop here. You're too attached to your own feature ideas to cut them objectively.

> **Copy Prompt — Ruthless MVP Cut**
> ```
> My API's purpose: "[paste purpose statement]"
> Target caller: "[paste target developer summary]"
> Remaining build time: [X hours]
>
> Here's my full feature/endpoint wishlist:
> [list everything you're considering]
>
> Cut this down to the smallest set of endpoints that still proves the
> purpose statement end-to-end in a live demo. For each endpoint I should
> cut, say why. For each one I should keep, say why it's essential —
> not just "useful."
>
> Also flag anything missing that's required to make the kept endpoints
> actually work (e.g. error handling, a required field I haven't considered).
> ```

> **Tip — This prompt deserves your full context, the previous ones didn't.**
> Unlike the wording-only prompts in earlier modules, scope-cutting needs your purpose, caller, and time budget together — cutting decisions without that context produces generic advice.

---

## Validate the Output

- If AI keeps everything "because it's all valuable," push back — ask it to rank by demo necessity, not general usefulness.
- If it cuts something that's actually part of your core loop (the thing that proves your purpose statement), keep it regardless of the suggestion.
- Take the "missing pieces" flag seriously — beginners reliably forget basic error handling and required-field validation, and both are visible the instant a judge tries an edge case.

---

## Lock Your MVP Scope

Write the final, numbered list. This is what gets built — nothing more, nothing implied.

- [ ] Core loop endpoints listed explicitly (method + path)
- [ ] Each endpoint traces directly back to the purpose statement
- [ ] Nice-to-have list written down and set aside, not discarded
- [ ] Endpoint count matches your remaining time budget
- [ ] Time reserved for testing and demo prep, not just building

---

## What's Next

Phase 0 is complete. You now have a locked problem, purpose, target developer, and MVP scope — the decisions every later phase builds on.

**API Resources** (Phase 1) — turn your locked endpoint list into properly modeled resources, the foundation of your API's design.
