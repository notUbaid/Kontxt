---
title: PRD
slug: prd
phase: Phase 1
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: prd-hackathon-marketplace.md
---

# PRD

You've scoped what you're building. This module turns that scope into a document your team can actually build from — so you're not re-deciding the same things at 2am when someone asks "wait, does the buyer need an account before browsing?"

A hackathon PRD is not a 10-page product spec. It's the minimum written artifact that prevents your team from disagreeing about scope mid-build.

---

## Why Bother With a PRD in a Hackathon

> **Reframe:** The PRD's real job isn't documentation — it's conflict prevention. Without one, two teammates will independently make different assumptions about how the core loop works, discover the mismatch six hours before submission, and lose time reconciling instead of building.

A hackathon PRD should take 20-30 minutes to write and should be short enough that everyone on your team actually reads the whole thing.

---

## What Goes In (And What Doesn't)

| Include | Skip |
|---|---|
| The one-sentence definition from MVP Scope | Market sizing, competitive analysis |
| The Must Build / Fake It / Cut Entirely lists | Long-term roadmap, future phases |
| Both user journeys, at a high level | Detailed wireframes (next module covers this) |
| Core loop, step by step | Edge case handling beyond the obvious |
| Tech stack decision (if already made) | Full data model — sketch it, don't formalize it here |

> **Best Practice:** If a section doesn't directly answer "what are we building and in what order," cut it. A hackathon PRD that takes longer to write than to read has failed its purpose.

---

## The Structure

### 1. One-Line Definition
Copy directly from MVP Scope. Don't rewrite it — consistency across documents matters more than novelty.

### 2. The Core Loop
The exact sequence from MVP Scope, written as numbered steps. This becomes your literal build order in Phase 3.

### 3. Two Journeys, Side by Side

This is the part unique to marketplace PRDs — a single-sided product never needs this structure.

| Step | Buyer sees | Seller sees |
|---|---|---|
| 1 | Browse/search listings | Create a listing |
| 2 | View listing detail | (waits for interest) |
| 3 | Initiate transaction | Sees transaction notification |
| 4 | Confirmation | Confirmation |

> **Tip:** Writing these side by side, not as two separate sections, makes it immediately visible where the journeys connect — and where they don't yet. A gap in this table is a gap in your actual build plan.

### 4. Must Build / Fake It / Cut Entirely
Paste directly from the previous module. This is the part of the PRD your team will reference most during actual building — keep it visible and unambiguous.

### 5. Definition of Done
One sentence per Must Build item, stating exactly what "working" means. This single section prevents the most common late-hackathon argument: "I think it's done" vs. "it's not actually done."

**Example:** "Listing creation is done when a seller can submit a form with title, price, and image, and it immediately appears in the buyer's browse view without a page refresh."

---

## Common PRD Mistakes in Marketplace Hackathons

| Mistake | Why it happens | Fix |
|---|---|---|
| Only documenting the seller side | Sellers feel like "the build," buyers feel like "just a list page" | Force the side-by-side journey table — it makes the gap visible |
| Vague Definition of Done | "Listings work" isn't testable | Write it as a specific, observable behavior |
| PRD written by one person, never reviewed by the team | Time pressure | Even a 5-minute team read-through catches mismatched assumptions before they cost build time |
| Including features already cut in MVP Scope | Old ideas linger in early drafts | Cross-check directly against your Cut Entirely list before finalizing |

---

## Using AI Effectively Here

Use AI to convert your MVP Scope decisions into this structure quickly — not to invent new scope, which the previous module already locked down.

**📋 Copy this prompt:**

```
I've already scoped my marketplace hackathon project. Here's what I have:

One-sentence definition: [paste from MVP Scope]
Core loop: [paste the loop steps]
Must Build (Real): [paste list]
Fake It: [paste list]
Cut Entirely: [paste list]

Generate a PRD with these sections only: One-Line Definition, Core Loop (numbered), Buyer/Seller Journey table (side by side, showing where they connect), Must Build/Fake It/Cut Entirely (reformatted from what I gave you), and a Definition of Done (one specific, testable sentence per Must Build item).

Do not add new features, sections, or scope beyond what I've given you — this should be a structuring exercise, not a brainstorm.
```

This prompt explicitly forbids scope expansion, which matters — without that constraint, AI will often "helpfully" suggest additional features or sections that undo the scoping discipline from the previous module.

---

## Validating the Output

- [ ] Does the one-sentence definition match MVP Scope exactly, with no drift?
- [ ] Does the buyer/seller journey table show a clear connection point, not two disconnected lists?
- [ ] Is every Must Build item paired with a specific, testable Definition of Done?
- [ ] Does the Must Build/Fake It/Cut Entirely section match the previous module exactly — no new features snuck back in?
- [ ] Could a teammate who wasn't in the scoping conversation read this and know exactly what to build?

> **Warning:** If AI added anything not present in your MVP Scope output — a new feature, an extra journey step, a "nice to have" section — cut it before sharing this with your team. Scope creep at the PRD stage is exactly as costly as scope creep anywhere else, just earlier.

---

## Before You Continue

- [ ] PRD written, 1-2 pages, readable in under 5 minutes
- [ ] Buyer and seller journeys shown side by side with a visible connection point
- [ ] Every Must Build item has a specific, testable Definition of Done
- [ ] Whole team has actually read it — not just the person who wrote it
- [ ] No scope beyond what MVP Scope already decided

**Next up:** Buyer Journey — going one level deeper on the buyer side specifically, before doing the same for sellers.
