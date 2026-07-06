---
title: AI Failure States
slug: ai-failure-states
phase: Phase 3
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# AI Failure States

This module has been referenced throughout the entire AI Tool curriculum — the PRD's fallback decision, the backend's error status, the frontend's distinct error UI. This is where all of that planning gets pulled together into a complete, deliberately tested failure-handling system, treated with the seriousness it deserves given how visible failure is in a live demo specifically.

---

## The Core Idea: In a Live Demo, Failure Handling Is Not Optional Polish — It's Core Functionality

For a regular web app, a rare error state might genuinely never occur during a 3-minute demo. For an AI tool, model calls have real, non-trivial failure rates — timeouts, rate limits, malformed output, occasionally just a poor-quality response. Across enough live demo attempts (including your own rehearsals, and any judge who wants to try it themselves), you will very likely encounter at least one of these. How your tool handles that moment is now part of what's being judged, not an unfortunate accident outside the demo's scope.

> [!WARNING]
> An unhandled failure — a raw error message, a frozen UI, a console error visible if anyone's watching dev tools, a crash — is far more damaging to a judge's impression than almost any other single thing that could go wrong. A graceful, designed failure state, by contrast, can actually read as a sign of careful engineering. The difference between these two outcomes is entirely something you control in advance.

---

## Step 1: Enumerate the Actual Failure Modes You're Likely to Hit

Be specific rather than generic. "Something could go wrong" doesn't help you design for it — knowing the actual likely causes does.

**Decision Card — Real AI Tool Failure Modes**

| Failure Mode | Likely Cause | Where You Already Planned for This |
|---|---|---|
| Model call times out | Network issue, provider latency spike, slow input | Backend's centralized call logic should have a timeout |
| Rate limit hit | Too many calls in quick succession (e.g., judge re-trying right after your demo run) | Checked in Model Selection — confirm a graceful response, not a raw API error |
| Malformed/invalid structured output | Model drifted from requested format despite prompt instructions | Validation + retry logic from Structured Outputs |
| Empty/no useful result | Genuinely nothing to extract/generate from this input | Distinct "empty" state, not an error — from AI Interaction Flows |
| Retrieval returns irrelevant context (if using RAG) | Poor match between query and stored chunks | Diagnosable per the RAG module's retrieval-vs-generation distinction |
| Output is technically valid but low-quality/wrong | Inherent model variance, even with a good prompt | Mitigated by prompt hardening, but never fully eliminated — needs a graceful "this doesn't look right" path too |

---

## Step 2: Make Sure Every Failure Mode Maps to a Specific, Tested User-Facing Message

Generic "Something went wrong, please try again" is an acceptable fallback for truly unexpected failures, but the failure modes you can anticipate (timeout, rate limit, empty result) deserve more specific messaging — it's more reassuring and more useful to the person experiencing it.

**Best Practice Card — Specific Failure Messaging**

```
 One generic message for everything: "Error occurred"

 Specific where you can be:
   Timeout: "This is taking longer than expected — try again?"
   Rate limit: "Too many requests right now — give it a moment
              and try again"
   Empty result: "Didn't find anything in that input — try adding
              more detail" (this isn't really a failure, frame it
              accordingly per AI Interaction Flows)
   Genuinely unexpected: "Something went wrong on our end — try
              again, or try a different input"
```

---

## Step 3: Actually Rehearse Triggering Each Failure Mode

This is the step most teams skip, and it's the one that actually matters. Don't just write the error-handling code — deliberately trigger each failure mode at least once, on your real deployed app, and confirm the experience is what you intended. Temporarily use an invalid API key to test the failure path. Send an input you know produces an empty result. If you can simulate a timeout (e.g., artificially delaying a response), do that too.

> [!TIP]
> Treat triggering each failure state deliberately as part of your demo rehearsal, not a separate quality-assurance step you might skip if you run out of time. If a judge sees your tool handle an unexpected hiccup smoothly and visibly, that can leave as strong an impression as a flawless run — it demonstrates the tool (and the team) is robust, not just lucky.

---

## Using AI to Pressure-Test Your Failure Coverage

AI is useful here for a final systematic check: given everything you've built, what failure modes might you have missed, and does your current handling actually cover the realistic range.

**Prompt: Failure Coverage Review**

```
Here's my AI feature's full flow: [summarize input, model call,
validation, retry, frontend states — or paste relevant pieces from
earlier modules]

Here's my current failure handling: [describe what happens for
timeout, rate limit, validation failure, empty result]

1. Identify any realistic failure mode in this specific pipeline
   that isn't currently handled, or that falls back to a generic
   message when a more specific one would be more reassuring.
2. For my live hackathon demo specifically, rank these by how likely
   they are to actually occur during a few minutes of real usage —
   don't list theoretical edge cases that are very unlikely to
   surface in a short demo window.
```

> ** Why this prompt works**
> Asking for a likelihood ranking specific to "a few minutes of real usage," rather than a comprehensive theoretical list, keeps the output focused on what's actually worth your remaining build time — the same hackathon-scoped discipline applied throughout this curriculum, now turned specifically toward failure coverage. Requesting identification of generic-fallback cases that could be more specific directly extends Step 2's messaging quality goal, catching places where you might have under-specified a known, anticipatable failure.

**Token efficiency note:** Run this review once your core failure handling is already built, as a final check before demo rehearsal — not as a way to generate your failure-handling design from scratch. The earlier modules already did the design work; this prompt is a coverage audit, not a first draft.

---

## Validating Failure Handling Before Your Final Rehearsal

- [ ] Every failure mode in the decision card above has been deliberately triggered at least once on the real deployed app
- [ ] Each anticipatable failure mode has a specific message, not a generic catch-all, where that's been reasonably achievable
- [ ] No failure path results in a raw error, frozen UI, or silent nothing — confirmed by actually watching it happen, not by reading the code
- [ ] You've personally seen what happens if a judge tries unexpected input, and you're not worried about what they'd see

---

## What's Next

With Phase 3 complete, move to **Phase 5**, starting with **Pitch Deck** — translating everything you've built and hardened into the actual presentation you'll give at submission.
