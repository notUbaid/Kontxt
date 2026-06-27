---
title: MVP Features
slug: mvp-features
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# MVP Features

Feature Prioritization gave you a scored, sequenced list. This module turns that list into a locked, specific scope document — the single source of truth for what you're building first.

This is not another round of brainstorming or evaluation. This is commitment.

The MVP scope document is what you hand to an AI coding tool, a co-founder, or yourself on day one of development. It has to be precise enough that someone could build from it without asking you questions.

---

## What MVP Actually Means

Minimum Viable Product is one of the most misused terms in product development.

It does not mean:

- The smallest possible thing you can ship
- A prototype or mockup
- A product with known bugs you plan to fix later
- A product missing features you promised users

It means the **smallest complete product that delivers your core value proposition to your target user, end to end, reliably.**

Every word matters.

**Smallest** — ruthless scope control. Nothing that isn't necessary.

**Complete** — the full user journey is covered. No dead ends.

**Delivers your core value proposition** — not a partial version of it. The outcome you promised.

**To your target user** — not to everyone. To the specific person you defined.

**End to end** — from first login to achieved outcome. Fully functional.

**Reliably** — it works. Not "works most of the time." Not "works if you know the trick."

If your MVP doesn't meet all six criteria, it's not an MVP. It's a beta at best, a prototype at worst.

---

## From Priority List to Scope Document

Your Feature Prioritization output is an input here, not an output. You're converting a ranked list into a structured scope.

The scope document has four sections:

### Section 1 — Core User Journey

Write out the exact sequence of steps a user takes from account creation to achieved outcome, using only your v1 features. This is the narrative that holds the scope together.

Be concrete. Name the screens, the actions, and the outputs.

**Example:**

```
1. User signs up with email and password
2. User is prompted to connect their [data source]
3. System imports and processes initial data (~30 seconds)
4. User lands on the main dashboard showing [core metric]
5. User drills into [specific view] to investigate
6. User creates an [output artifact] and shares it
7. User receives a weekly email digest with [key insight]
```

If you can't write this without ambiguity, your scope isn't tight enough yet.

---

### Section 2 — Feature Specifications

For each feature in your v1 list, write a one-paragraph specification. Not a design document — a scope boundary. It defines what the feature does and, critically, what it does not do in v1.

**Format:**

```
Feature: [Name]
Scope: [What it does in v1 — specific and bounded]
Out of scope for v1: [What it explicitly does not do yet]
Acceptance criteria: [How you know it works correctly]
```

**Example:**

```
Feature: CSV Import
Scope: User can upload a CSV file with up to 10,000 rows.
       System validates the file, maps columns to the expected
       schema, and shows a preview before confirming import.
       Errors surface inline with row-level detail.
Out of scope for v1: Real-time sync, API-based import,
                     Excel/Google Sheets direct connection,
                     scheduled imports.
Acceptance criteria: A valid CSV imports successfully in under
                     10 seconds. An invalid CSV surfaces a
                     specific, actionable error message.
                     No data is written on failed import.
```

The "out of scope for v1" field is as important as the scope itself. It prevents scope creep during development and creates a ready-made v2 backlog.

---

### Section 3 — Table Stakes Checklist

These ship in v1 without exception. List them explicitly so they don't get dropped during development under time pressure.

Common production SaaS table stakes:

- [ ] Email and password authentication
- [ ] Password reset via email
- [ ] Email verification on signup
- [ ] Secure session management (logout, session expiry)
- [ ] HTTPS enforced everywhere
- [ ] Basic account settings (name, email, password change)
- [ ] Account deletion with data removal
- [ ] Responsive layout (functional on mobile, optimized for desktop)
- [ ] Meaningful error messages (no raw stack traces to users)
- [ ] Empty states for all data-dependent views

Add any table stakes specific to your product category (e.g., payment SaaS needs refund capability; multi-user SaaS needs basic role separation).

---

### Section 4 — Explicit Exclusions

List every feature from your brainstorm that is **not** in v1, and why. This section exists for one reason: to stop you from adding things back in during development when you're tempted.

```
Feature                  | Reason Excluded
─────────────────────────|─────────────────────────────────────
Team collaboration       | Targeting solo users first; validate
                         | single-player value before multi-player
API access               | No developer users in initial ICP
Advanced analytics       | Need data volume before analytics matter
Mobile app               | Desktop-first; validate retention first
Custom branding          | Premature; no paying users yet
Zapier integration       | Build core value first; integrations
                         | add complexity without proving core
```

If anyone — including yourself — asks "why don't we just add X?", this section is your answer.

---

## The Scope Integrity Test

Before finalizing your MVP scope, run it through these four checks:

**1. The stranger test**
Could someone who wasn't in any of your planning sessions read this document and build exactly the product you have in mind? If not, it's underspecified.

**2. The completeness test**
Walk the core user journey using only Section 2 features. Does every step have coverage? Is there any moment where the user would hit a dead end or an unbuilt screen?

**3. The promise test**
Read your value proposition, then read your MVP scope. Does the scope, as written, actually deliver that promise? Not approximately — actually. If your value prop says "in 10 minutes," does your onboarding flow make that possible?

**4. The creep test**
Count your features. If you're above 15, run each one through the prioritization filter again. Something that felt necessary in the list often becomes clearly deferrable when written out as a full specification.

---

## Use AI to Validate the Scope

```prompt
I've defined the MVP scope for my SaaS product. Please review it.

Value Proposition: [paste yours]
Target User: [describe]

Core User Journey:
[paste Section 1]

Feature Specifications:
[paste Section 2 — abbreviated is fine]

Explicit Exclusions:
[paste Section 4]

Review this scope and tell me:

1. Is there any step in the core user journey that isn't covered
   by a specified feature? Where would a user get stuck?
2. Are there any features in scope that could be deferred without
   breaking the core journey?
3. Are there any obvious table stakes missing that would prevent
   a user from trusting or completing signup?
4. Does this scope, as defined, actually deliver the value
   proposition I stated — or does it deliver a partial version?
5. What is the single highest-risk assumption embedded in this scope?

Be specific. Reference the journey steps and feature names I've provided.
```

---

## How This Document Gets Used

The MVP scope document is the handoff artifact from Phase 0 to Phase 1. Everything that follows references it:

| Phase 1 Deliverable | How It Uses the MVP Scope |
|---|---|
| PRD | Expands each feature spec into full requirements |
| User Flows | Traces the core user journey into screen-by-screen flows |
| Information Architecture | Structures navigation around the scoped features |
| Wireframes | Designs only the scoped screens |

Don't start Phase 1 without a locked MVP scope. Designing undefined features wastes time. Building undefined features wastes everything.

---

## One Final Check

Read your MVP scope, then answer honestly:

> *If I shipped exactly this — nothing more, nothing less — would my target user be able to get the full outcome I promised them?*

If yes — you have an MVP scope. Lock it and move forward.

If no — something is missing. Find it, add it, and run the scope integrity test again.

If you're not sure — your value proposition or target user definition isn't specific enough. Go back and sharpen those before proceeding.

---

## Validation Checklist

- [ ] I've written the core user journey as a concrete, step-by-step sequence
- [ ] Every feature has a written specification with scope boundaries and acceptance criteria
- [ ] I have an explicit "out of scope for v1" entry for every feature
- [ ] All relevant table stakes features are listed and confirmed for v1
- [ ] I have an explicit exclusions list with documented reasons
- [ ] The scope passes all four integrity tests
- [ ] The scope has been reviewed with the AI prompt and updated accordingly
- [ ] A user following only this scope can get the full outcome I promised

---

## Quick Reference

```
MVP Definition
────────────────────────────────────────────────
Smallest complete product that delivers your core
value proposition to your target user, end to end,
reliably.

Scope Document Structure
────────────────────────────────────────────────
Section 1  →  Core user journey (step by step)
Section 2  →  Feature specs (scope + exclusions + criteria)
Section 3  →  Table stakes checklist
Section 4  →  Explicit exclusions with reasons

Scope Integrity Tests
────────────────────────────────────────────────
Stranger test    →  Could someone else build from this?
Completeness test →  No dead ends in the journey?
Promise test     →  Does scope deliver the value prop?
Creep test       →  Under 15 features? If not, cut more.

Feature Spec Format
────────────────────────────────────────────────
Feature:              Name
Scope:                What it does in v1
Out of scope for v1:  What it explicitly defers
Acceptance criteria:  How you know it works
```
