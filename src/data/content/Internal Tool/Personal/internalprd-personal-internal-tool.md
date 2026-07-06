---
title: PRD
slug: prd
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 20–25 min
---

# PRD

You're entering Phase 1: Product Design. Everything from Phase 0 — the problem, the workflow, the ranked pain points, the MVP scope — now gets consolidated into a single document: a Product Requirements Document (PRD).

For a solo personal project, a PRD isn't bureaucracy. It's the reference you'll return to every time you're deep in code and can't remember why you made a decision three weeks ago.

---

## Why Bother With a PRD for a Solo Project

You might be thinking: "It's just me. Why write a formal document?" Here's the actual reason — not process for its own sake:

> **The real function of a PRD**
> When you're mid-build and AI suggests adding a feature that "would be easy to add," the PRD is what lets you answer "does this belong in v1?" in five seconds instead of re-litigating scope every time. Without it, scope creep happens one small "sure, why not" at a time.

A second reason: every AI prompt you write in Phase 3 (Development) will go faster and produce better code when you can paste in a clear PRD section instead of re-explaining context from memory each time.

---

## What Goes Into a Personal-Mode PRD

Keep this lean. A personal internal tool PRD is one page, not twenty. Each section pulls directly from a Phase 0 module — you're assembling, not inventing.

```
# [Tool Name] — PRD

## Problem
[Your one-sentence problem definition]

## Who This Is For
[You — and anyone else who'll actually use it, if applicable]

## Success Criteria
[From MVP Scope: "Success looks like..."]

## In Scope (v1)
[Your MVP "included" list]

## Explicitly Out of Scope (v1)
[Your MVP "excluded" list]

## Core User Flow
[The main path through the tool, in plain language]

## Key Business Rules
[Any decision points from your process map that the tool must encode]

## Constraints
[Non-functional requirements: speed, device, data handling]
```

---

## The Core User Flow Deserves Real Thought

This is the one section that's genuinely new writing, not a copy from Phase 0. Describe, in plain sentences, what actually happens when you use the tool — from opening it to completing the task that solves your pain point.

**Worked example:**

> I open the tool on my phone. I see a list of invoices, sorted with overdue ones at the top, visually flagged. I tap an invoice to see details. When a client pays, I tap "Mark Paid" and it moves out of the overdue list. Adding a new invoice takes under 30 seconds: client name, amount, due date.

This paragraph, more than any bullet list, is what will guide your wireframes in the next module. If you can't write it clearly yet, that's a sign your MVP scope needs another look before moving forward.

---

## Key Business Rules Need to Be Explicit, Not Implied

Pull these directly from the decision points in your Phase 0 process map. Write them as unambiguous statements — the kind a piece of code (or an AI generating code) could implement without guessing.

| Vague | PRD-ready |
|---|---|
| "Flag late invoices" | "An invoice is 'overdue' if today's date is more than 7 days past its due date and it's not marked paid" |
| "Handle repeat clients differently" | *(Deferred — not in v1. Removed from PRD entirely.)* |

If a rule is genuinely ambiguous in your head, resolve it now. Leaving it vague means either you or an AI tool will invent an answer during implementation — and it may not match what you actually meant.

---

## Constraints: Keep Them Honest

Don't inflate constraints to sound more "production-grade" than this project needs. A personal tool checked once a day doesn't need sub-second load times or 99.9% uptime commitments — write the constraint that's actually true for how you'll use it.

> **Example**
> "Must load in under 3 seconds on mobile" is a real, useful constraint. "Must handle 10,000 concurrent users" is not — unless you specifically want to practice building for that scale, in which case, say so explicitly and treat it as a deliberate learning goal, not a real requirement.

---

## Using AI to Draft and Tighten the PRD

> **Copy this prompt**
> ```
> Help me turn these Phase 0 notes into a tight, one-page PRD:
>
> Problem: [paste]
> MVP included: [paste]
> MVP excluded: [paste]
> Process map decision points: [paste]
>
> Structure it as: Problem, Who This Is For, Success Criteria,
> In Scope, Out of Scope, Core User Flow, Key Business Rules,
> Constraints.
>
> Write the Core User Flow as a clear narrative paragraph, not bullets.
> Write Key Business Rules as unambiguous, implementable statements —
> flag any rule from my notes that's still vague and needs a decision
> from me before it can go in.
> ```

> **Validation warning**
> Read the "Key Business Rules" section AI generates carefully. It's easy for AI to smooth over an ambiguity you hadn't actually resolved by picking a reasonable-sounding default. If a rule appears in the draft that you don't remember deciding, that's a flag to double-check it's actually what you meant.

---

## What You Should Have Now

- A one-page PRD covering all seven sections above
- A Core User Flow paragraph you could read aloud and have make sense
- Every business rule stated unambiguously enough to implement directly
- Constraints that reflect how you'll actually use the tool, not aspirational scale

Keep this PRD open as you move into the next module — User Flows — where the Core User Flow paragraph gets broken down into the actual screen-by-screen path a user takes.
