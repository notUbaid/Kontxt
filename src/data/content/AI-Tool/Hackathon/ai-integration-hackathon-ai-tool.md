---
title: AI Integration
slug: ai-integration
phase: Phase 3
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# AI Integration

Every individual piece has been built and tested separately: the prompt, the structured output validation, the retrieval layer if you have one, the backend endpoint, the frontend states. This module is the integration check — confirming the full pipeline works as one connected system, not as a collection of pieces that each passed their own isolated test.

---

## The Core Idea: Pieces That Each Work Don't Guarantee a System That Works

This is the most common place a hackathon AI tool fails despite every individual component having been verified: the prompt was tested directly against sample input, the endpoint was tested with a mocked request, the frontend was tested against a mocked response — but the full path, real user input flowing through the real frontend, real backend, real model call, real response back to the real frontend, was never run start to finish until the actual demo.

> ** Warning**
> "I tested the prompt and I tested the endpoint and I tested the frontend" is not the same claim as "I tested the whole thing together." Run the complete, real path — actual user action in the actual UI, all the way through to the actual rendered result — multiple times before considering your AI tool done.

---

## Step 1: Run the Full Path End-to-End, Multiple Times

Not a code review. Not checking that each piece individually looks correct. Actually use the app the way a judge would: open it, provide real input through the real interface, and watch the real result appear.

**Decision Card — What Counts as a Real Integration Test**

| This Counts | This Doesn't Count |
|---|---|
| Opening the deployed app, typing/uploading real input, watching the result render | Reading through the code and confirming each function looks correct |
| Using your actual planned demo input, multiple times, through the real UI | Testing the prompt directly via the model API's playground/console |
| Triggering the empty and error states through real UI actions (bad input, temporarily broken key) | Assuming the error UI works because you built it and it compiled |

---

## Step 2: Check Timing Across the Full Path, Not Just the Model Call Alone

Your Model Selection module measured raw model latency. The full integrated path adds network round-trips, any retrieval step, validation, and rendering — the total time a user actually experiences is the sum of all of it, not just the model call in isolation.

> ** Tip**
> Time the full path from the moment a user clicks submit to the moment the result is visibly rendered, using a stopwatch during a real test run — not the model API's reported latency alone. If this total feels meaningfully slower than your earlier model-only measurement, that gap tells you where additional overhead (retrieval, validation, network) is coming from, and whether your Streaming UX plan needs to account for it.

---

## Step 3: Confirm State Transitions Actually Match What You Designed

Walk through your AI Interaction Flows state map one more time, but now against the real running app: does idle → submitting → in-flight → success/empty/error actually happen in that order, visibly, with no state skipped or stuck? This is the final check that all your earlier planning modules actually landed correctly in the real implementation.

**Best Practice Card — Integration Walkthrough Checklist**

```
Using the real, deployed app:
1. Confirm idle state looks correct on first load
2. Submit real input, confirm in-flight state appears immediately
3. Confirm success state renders your actual wow moment correctly
4. Repeat with input designed to produce an empty result — confirm
   the empty state, not a success state with nothing in it
5. Temporarily break something (bad API key, malformed input) to
   force an error — confirm the error state, not a crash or silent
   failure
6. Re-enable the correct configuration and confirm success works
   again afterward
```

---

## Using AI to Diagnose Integration-Specific Failures

When something fails only in the full integrated path but worked in isolated testing, the cause is usually at a seam between pieces — exactly the kind of cross-cutting bug AI can help localize quickly if you give it visibility into both sides of that seam.

**Prompt: Integration Failure Diagnosis**

```
This works when I test [piece A] in isolation, and works when I test
[piece B] in isolation, but fails when used together through the
real app.

Piece A (e.g., frontend request): [paste the actual request being sent]
Piece B (e.g., backend expectation): [paste what the backend expects]
Actual observed failure: [describe exactly what happens]

Identify the mismatch between what's actually being sent and what's
actually expected at this specific seam — don't re-diagnose either
piece individually, focus only on where they connect.
```

> ** Why this prompt works**
> Explicitly framing the question around the seam between two already-individually-verified pieces focuses the model's diagnosis exactly where integration bugs actually live — a mismatched field name, an unexpected data shape, a missing header — rather than re-litigating logic that's already confirmed correct in isolation. This is a more targeted, faster diagnosis than a generic "why doesn't this work" prompt that would require the model to re-derive context you already have.

**Token efficiency note:** Reach for this diagnostic prompt only after you've confirmed each individual piece actually does work in isolation — using it before that just means debugging two problems at once instead of one. Isolate first, integrate-debug second.

---

## Validating Full Integration Before Moving to Demo Prep

- [ ] The complete path has been run, start to finish, through the real deployed app, multiple times
- [ ] Total experienced latency (not just raw model latency) has been measured with a stopwatch on a real run
- [ ] All three response states have been triggered through real UI interaction and confirmed correct
- [ ] At least one integration failure (if any occurred) was traced to a specific seam between two pieces, not left as an unexplained intermittent issue

---

## What's Next

Move to **Streaming UX** — now that the full pipeline is confirmed working, this module addresses the specific experience of waiting for a model response, making that wait feel intentional rather than like dead time.
