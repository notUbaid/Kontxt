---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# MVP Scope

This is the last module in Phase 0. Everything you've done so far — the problem, the workflow, the pain points, the requirements, the build decision — comes together here into one artifact: a written boundary for what version 1 actually includes.

This document is what you'll hand to Phase 1 (Product Design). Treat it as a contract with your future self.

---

## What "MVP" Actually Means Here

MVP doesn't mean "bad version of the full idea." It means: the smallest thing that fully solves your top pain point, and nothing else. A good MVP is not incomplete — it's complete for a narrower job.

> **Rule of thumb**
> If your MVP doesn't fully solve your #1 pain point, it's scoped wrong — cut something else, not the core fix. If it solves the #1 pain point *and* three others, it's also scoped wrong — you're building v2 before finishing v1.

---

## Build Your MVP From What You Already Have

You don't need new thinking here — you need to assemble decisions you've already made.

**Pull from Problem Definition:**
> Your one-sentence problem. This is the thing your MVP must solve. Nothing else is required to be "solved" in version 1.

**Pull from Existing Pain Points:**
> Your #1 ranked pain point (and possibly #2, if tightly related). Everything else you scored goes on the deferred list.

**Pull from Requirements Gathering:**
> Your "must have" requirements only. Every "nice to have" is deferred, no exceptions, no matter how small it seems.

**Pull from Automation Opportunities:**
> The requirements that survived the automation check — the ones that genuinely need a custom interface.

**Pull from Build vs. Buy:**
> Confirmation that building custom is the right call for this specific set of requirements.

---

## Write the MVP Definition

Fill this out directly — it becomes the actual scope document.

```
## MVP Definition

**Solves:** [your one-sentence problem]

**Included (must-have, custom-built):**
- [requirement 1]
- [requirement 2]
- [requirement 3]

**Explicitly excluded from v1 (deferred):**
- [nice-to-have or lower-ranked pain point]
- [nice-to-have or lower-ranked pain point]

**Success looks like:**
[one sentence describing how you'll know this actually worked,
once you've used it for a few weeks]
```

**Worked example:**

> **Solves:** I lose track of which clients haven't paid and find out too late to follow up politely.
>
> **Included:**
- Store invoice: client name, amount, due date
- Flag invoices overdue by 7+ days
- Mark an invoice as paid
- Check status in under 30 seconds, works on my phone
>
> **Explicitly excluded from v1:**
- Auto-detecting repeat clients
- Exporting monthly PDF summaries
- Sending follow-up emails automatically
>
> **Success looks like:** After 4 weeks, I haven't missed a follow-up on any invoice overdue by more than 7 days.

---

## The Cut List Is Not a Graveyard

Everything you exclude here isn't rejected — it's sequenced. Keep the deferred list visible; it becomes real input for Phase 6 (Process Improvements), once your MVP is actually in use and you know which deferred items you genuinely miss versus which ones you never think about again.

> **Tip callout**
> Some deferred items will turn out to be unnecessary once you're using the real tool. You can't know which ones in advance — that's exactly why they're deferred instead of cut permanently.

---

## Sanity Check Before You Move to Design

- Does the MVP fully solve the one-sentence problem, with nothing missing?
- Is every included item traceable back to a "must have" requirement?
- Could you realistically build this in your first few real work sessions?
- Is there anything included "just in case" that isn't tied to the core problem? Cut it.

If you answered "no" to the third question, your scope is still too large — go back through the excluded list and defer more aggressively. It's far easier to expand a shipped MVP than to finish a bloated one.

---

## Using AI to Pressure-Test Your Scope

> **Copy this prompt**
> ```
> Here's my MVP definition for a personal internal tool:
>
> [paste your MVP Definition block]
>
> Review it critically:
> 1. Does the "included" list fully solve the stated problem, or is
>    something load-bearing missing?
> 2. Is anything in "included" actually not necessary to solve the
>    problem — should it move to excluded?
> 3. Realistically, could one person build this "included" list in a
>    few focused sessions? If not, what's the smallest cut that would
>    make that true?
>
> Be direct — I'd rather cut too much now than abandon this halfway
> through building.
> ```

---

## Phase 0 Complete

You now have a written MVP definition, fully traceable back through every decision in this phase: the real problem, the real workflow, the ranked pain points, the concrete requirements, and a deliberate build decision.

This document is what Phase 1 (Product Design) will turn into actual screens, flows, and a data model. Nothing here was busywork — every module fed directly into this scope.
