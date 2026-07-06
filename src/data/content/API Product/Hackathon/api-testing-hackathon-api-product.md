---
title: API Testing
slug: api-testing
phase: Phase 4
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# API Testing

Phase 3's testing module confirmed your code works. This one confirms something different: **does your API work for someone who has never seen your code and only has your docs?** That's exactly the position every judge, mentor, and external developer will be in — and it's a perspective you can't get by testing your own code with full context in your head.

---

## Test as a Stranger, Not as the Builder

> **Decision Card — The test that actually matters now**
> Open your docs (locked in API Documentation Strategy) in one window. Open Postman or a terminal in another. Try to make a successful request using *only* what's written in your docs — no peeking at your code, no relying on memory of how you built it.

If you get stuck, confused, or guess wrong about a field name, that's exactly what an outside developer will hit. Fix the docs, not just your own understanding.

---

## Verify Responses Match What You Documented

Beyond status codes, check the actual response shape against your locked schemas field by field — this catches "schema drift," where implementation quietly diverged from design somewhere in Phase 3.

> **Warning — A field that's renamed, missing, or differently typed than documented breaks every integration silently.**
> If your docs say `actionItems` but your actual response returns `actions`, nothing crashes — callers following your docs just get `undefined` and have no idea why. This is one of the easiest things to miss because *you* know the real field name, so it never looks wrong to you.

---

## A Light Concurrency Check

You don't need formal load testing, but a basic check is worth the five minutes:

> **Tip — Fire 5-10 requests at your core loop in quick succession and confirm nothing breaks.**
> This isn't about proving you can handle scale — it's about catching anything that only fails under slight concurrency (a race condition, a rate limit set too aggressively, a connection pool issue) before a room full of judges all try your API within the same minute.

---

## Let AI Be the Stranger

This is the highest-value exercise in this module: a fresh AI conversation, with zero knowledge of your actual code, given only your docs.

> **Copy Prompt — Cold Documentation Test**
> ```
> Here is my API's documentation: [paste your README/docs, nothing else —
> no code, no internal context]
>
> You are a developer encountering this API for the first time. Try to
> figure out how to make a successful request to the core endpoint(s).
> Report:
- any point where the docs are ambiguous or you'd have to guess
- any field name, type, or example that seems unclear or missing
- what you'd expect to happen vs. what the docs actually tell you
> ```

> **Tip — Run this in a brand-new conversation, not one that already has your project's context.**
> If the same conversation that helped you build the API also reviews the docs, it implicitly fills gaps using context a real outside developer won't have. A fresh conversation with only the docs pasted in is what actually simulates a stranger's experience.

---

## Validate the Output

- Take every point of confusion seriously, even ones that feel obvious to you — "obvious to the builder" is exactly the blind spot this exercise exists to catch.
- Cross-check any flagged ambiguity against your actual locked response schema — if AI guessed wrong about a field, that's a documentation gap, not an AI error.
- Don't dismiss feedback because "a real developer would just check the code" — judges typically won't, and your docs need to stand alone.

---

## Lock Your API Testing Pass

- [ ] Successfully made a real request using only your docs, no code reference
- [ ] Response shapes verified field-by-field against documented schemas
- [ ] Basic concurrency check run against your deployed core loop
- [ ] Cold AI documentation review completed, with flagged issues fixed

---

## What's Next

**Deployment Checklist** — the final verification pass before your submission URL is locked in.
