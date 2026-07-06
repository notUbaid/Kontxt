---
title: PRD
slug: prd
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 25-35 min
filename: prd-personal-marketplace.md
---

# PRD

Phase 0 gave you scattered decisions across nine modules. This module consolidates them into one living document — your Product Requirements Document — that you (and any AI tool you work with) will reference for the rest of this build. Everything from here forward, including every AI prompt in later modules, gets shorter and more accurate because this document exists.

For a solo builder, a PRD isn't corporate process. It's the difference between re-explaining your project to an AI tool from scratch every session, and pasting one document that gives it full context instantly.

---

## Why This Matters More for AI-Assisted Building Than Traditional Solo Dev

When you're the only person on a team, you used to be able to keep everything "in your head." Working with AI tools changes that — every new conversation starts with zero context unless you give it some. A solid PRD is the single highest-leverage artifact you'll create for keeping AI tools useful throughout this build.

> **Decision:** Treat your PRD as a living document you paste into new AI conversations, not a one-time deliverable you write and forget. Update it as decisions evolve in later phases.

---

## What Goes In, and Where It Comes From

Your PRD isn't new thinking — it's organizing decisions you've already made in Phase 0. Pull directly from each module:

| PRD Section | Source module |
|---|---|
| Problem statement | Competitor Analysis (the gap you found) |
| Target users (supply + demand) | Supply Side, Demand Side |
| Core loop | MVP Scope |
| Feature list | MVP Scope |
| Success criteria | Success Metrics |
| Marketplace mechanics | Marketplace Type, Marketplace Liquidity |
| Monetization | Revenue Model |
| Go-to-market | Chicken & Egg Strategy |

If you've genuinely completed Phase 0, writing this document should take 20-30 minutes of consolidation, not new thinking. If it's taking much longer, that's a signal an earlier module deserves another pass first.

---

## The PRD Template

```markdown
# [Marketplace Name] — Product Requirements Document

## Problem
[1-2 sentences: what's broken or missing today, from Competitor Analysis]

## Solution
[Your marketplace type statement from Marketplace Type module]

## Users

### Supply Side
[From Supply Side module: who, current alternative, top needs]

### Demand Side
[From Demand Side module: who, current alternative, top needs]

## Core Loop
[The single paragraph from MVP Scope describing list → discover → connect]

## MVP Features
[The feature list from MVP Scope, with the "explicitly out of scope" list too]

## Success Criteria
[Your three metrics from Success Metrics: supply, demand, successful matches]
[Your liquidity target from Marketplace Liquidity]

## Monetization
[Decision from Revenue Model, including reasoning]

## Launch Strategy
[Summary of your bootstrap plan from Chicken & Egg Strategy]

## Out of Scope (Explicitly)
[Anything firmly decided against, to prevent relitigating later]
```

> **Tip:** Keep this to 1-2 pages. A PRD that's too long stops being something you (or an AI tool) can actually hold in working context. Density over length — same principle as everything else in this track.

---

## Using This PRD With AI Tools Going Forward

Once written, this document becomes the first thing you paste into any new AI conversation about this project — wireframing, architecture decisions, even debugging later. This single habit saves enormous token waste and prevents an AI tool from suggesting something that contradicts a decision you already made deliberately.

> **Decision:** When a later module's AI prompt says "paste your PRD" or references decisions "from earlier," this document is what that refers to. Keep it accessible (a pinned file, a doc you can quickly copy from) for the rest of the build.

---

## Common PRD Mistakes for Solo Builders

- **Writing it before Phase 0 is actually done** — a PRD written from incomplete thinking just formalizes the gaps; finish Phase 0 honestly first
- **Making it a wishlist instead of a scope document** — if a feature isn't in your MVP Scope module's list, it doesn't belong in this PRD's feature section either
- **Treating it as immutable** — it's fine to update it as Phase 1 and Phase 2 surface new information, as long as updates are deliberate, not scope creep sneaking back in

---

## AI Prompts You Can Use

**Prompt 1 — Consolidate Phase 0 outputs into a PRD draft:**

```
Here are my Phase 0 decisions: [paste your notes/answers from Competitor
Analysis, Success Metrics, Marketplace Type, Supply Side, Demand Side,
Marketplace Liquidity, Chicken & Egg Strategy, Revenue Model, and MVP
Scope]. Consolidate these into a 1-2 page PRD using this structure:
[paste the template above]. Don't add new features or scope — only
organize what I've already decided.
```

**Prompt 2 — Check for internal consistency:**

```
Here's my PRD: [paste it]. Check for contradictions — for example, a
feature listed as MVP that conflicts with my stated "out of scope" list,
or a success metric that doesn't connect to my core loop. Flag anything
inconsistent, don't rewrite my decisions.
```

---

## Validating What AI Generates

- **Confirm no new features were added during consolidation** — explicitly check the MVP feature list against your original MVP Scope module; AI sometimes "helpfully" adds features while organizing
- **Verify the problem statement still matches your actual competitor research**, not a more dramatic or generic version AI may default toward
- **Read the full consolidated document yourself, start to finish** — a PRD you haven't personally read in full isn't one you can rely on as a reference later

---

## Implementation Checklist

- [ ] All Phase 0 module decisions consolidated into the PRD template
- [ ] Document kept to 1-2 pages
- [ ] Feature list matches MVP Scope module exactly, no additions
- [ ] Document saved somewhere easily copy-pasteable into future AI conversations
- [ ] Read the full document once, start to finish, to confirm it's internally consistent

---

## What's Next

Next: **User Flows** — mapping the specific screen-by-screen paths your buyer and seller personas take through the core loop you just documented.
