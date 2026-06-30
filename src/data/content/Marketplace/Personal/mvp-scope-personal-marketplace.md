---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 25-30 min
filename: mvp-scope-personal-marketplace.md
---

# MVP Scope

Every decision in Phase 0 — competitors, fundamentals, type, supply, demand, liquidity, bootstrap plan, revenue model — converges here. This module turns all of it into a concrete, written scope for what you're actually going to build first. Everything after this is Phase 1 onward: design and architecture against this scope, not against the full vision in your head.

This is the module most likely to be rushed, and the one most worth slowing down for. An honest MVP scope is what keeps a personal project finishable.

---

## What MVP Actually Means for a Marketplace

Recall from Marketplace Fundamentals: a marketplace MVP isn't "the smallest version of every feature." It's the smallest version where **both sides can complete the core exchange at least once.** A polished seller flow with no way for a buyer to find or contact them isn't an MVP — it's an unfinished half.

> **Decision:** Your MVP must include, at minimum: a way for supply to list, a way for demand to discover, and a way for the two to actually connect (message, book, or transact). Cutting any of these three isn't scoping down — it's removing the thing that makes it a marketplace.

---

## The Three-Column Scoping Exercise

For every feature you're considering, sort it into one of three columns. Be ruthless — most ideas belong in column three, not column one.

| MVP (build now) | Fast follow (after MVP works) | Not yet (revisit after real users) |
|---|---|---|
| Core listing creation | Saved searches | Advanced analytics |
| Basic search/browse | Email notifications | Referral programs |
| Messaging between buyer/seller | Reviews and ratings | Dispute resolution system |
| Auth (signup/login) | Listing edit history | Admin moderation tools |

> **Tip:** A useful test for any feature: "would the marketplace be unable to demonstrate its core value without this?" If a feature can wait until after you have 10 real transactions, it belongs in fast-follow or not-yet, not MVP.

---

## Building Your MVP List From Earlier Phase 0 Modules

Don't brainstorm features from scratch — derive them directly from decisions you've already made:

- **From Marketplace Type**: your goods/services and pricing choices determine your listing fields (inventory? availability calendar? fixed price field?)
- **From Supply Side**: the top 1-2 seller needs you identified become required MVP features (e.g., "low listing friction" → a short, simple listing form, not a multi-step wizard)
- **From Demand Side**: the top 1-2 buyer needs you identified become required MVP features (e.g., "confidence in quality" → photos and descriptions are non-negotiable, even at MVP)
- **From Marketplace Liquidity**: your target listing count tells you whether you need pagination/advanced search yet, or if a simple list view is enough at that scale
- **From Revenue Model**: if you chose "no monetization yet" or the off-platform middle path, payment processing is explicitly *not* in MVP scope

> **Decision:** If a proposed MVP feature doesn't trace back to a need identified in an earlier Phase 0 module, question why it's there. Features that exist because they "seem like what a marketplace should have" are exactly what bloats a personal project past finishable.

---

## Trust & Safety: The Minimum That's Actually Required at MVP

You don't need a full dispute resolution system or fraud detection at MVP (those belong later — Phase 4's Fraud Prevention and Abuse Detection, or Phase 1's dedicated Trust & Safety Planning module, going deeper than this overview). But some baseline is non-negotiable even at MVP scale:

- A way to report a problem (even just an email address or simple form) — not solving disputes, just having an escape hatch
- Basic identity signal (real name or verified email, not full ID verification) — enough that transactions don't feel completely anonymous

> **Warning:** Don't skip trust entirely because "it's just an MVP with a few users I personally know." The moment a stranger (not someone in your personal network) uses the platform, even informal trust signals matter. This doesn't mean build a full system — it means don't ship with zero safety net.

---

## Writing Your MVP Scope Document

This becomes the reference document for Phase 1 and Phase 2 — write it concretely enough that you could hand it to someone else and they'd understand what you're building.

```markdown
## MVP Scope: [Marketplace Name]

### Core Loop
[One paragraph: how a seller lists something and a buyer finds and
connects with them, start to finish]

### MVP Features (build now)
- [Feature]: [why it's required, tracing to an earlier Phase 0 decision]
- [Feature]: [why it's required]
...

### Explicitly Out of Scope for MVP
- [Feature]: [why it's deferred, and to which later phase]
...

### Liquidity Target Before Public Launch
[Your number from the Marketplace Liquidity module]

### Revenue Model at MVP
[Your decision from the Revenue Model module]
```

> **Best Practice:** Keep the "explicitly out of scope" section visible, not just the in-scope list. Naming what you're *not* building yet is what prevents scope creep three weeks in, when a feature starts to feel necessary again.

---

## A Realistic Personal-Project MVP Feature Set

If you're still unsure how small is small enough, here's a concrete floor for almost any marketplace type:

1. Sign up / log in
2. Create a listing (title, description, price, one image, category)
3. Browse/search listings (keyword + category filter is enough)
4. View a single listing's detail page
5. Message the seller from a listing
6. View your own listings (basic "my listings" page)

That's it. Reviews, payments, notifications, admin tools, analytics — all of it comes after this loop works and you have real people using it.

---

## AI Prompts You Can Use

**Prompt 1 — Sort your feature ideas into the three columns:**

```
Here's my marketplace concept and a list of features I've been
considering: [paste your idea + feature list]. My marketplace type is
[from Marketplace Type], my top supply-side need is [from Supply Side],
and my top demand-side need is [from Demand Side]. Sort these into MVP,
fast-follow, and not-yet, and justify each MVP inclusion by tracing it
to one of those needs.
```

**Prompt 2 — Pressure-test for scope creep:**

```
Here's my MVP scope document: [paste it]. Be skeptical: which of these
"MVP" features could actually be deferred to fast-follow without
breaking the core loop of a seller listing something and a buyer finding
and contacting them? I want this list as small as possible while still
being a real, complete marketplace.
```

---

## Validating What AI Generates

- [ ] **Don't accept an MVP list that's still too large** — AI tends to be generous with feature inclusion when asked to scope something; if the list is longer than 6-8 items, push back and ask specifically what could be cut
- [ ] **Verify every MVP feature traces to a real need you documented earlier**, not a plausible-sounding addition — if you can't point to which Phase 0 module justified it, cut it
- [ ] **Confirm trust/safety baseline wasn't entirely cut** — AI sometimes drops the "report a problem" / basic identity signal items when aggressively minimizing scope; these stay even at minimum viable scope

---

## Implementation Checklist

- [ ] Core loop written as a single clear paragraph
- [ ] MVP feature list complete, each item traced to a specific need from an earlier Phase 0 module
- [ ] "Explicitly out of scope" list written and visible, not just implied
- [ ] Basic trust/safety minimum included (report mechanism, identity signal) even at MVP
- [ ] Full MVP Scope document saved somewhere you'll reference through Phase 1 and Phase 2

---

## Phase 0 Complete

You now have a documented foundation: who you're competing with, what success means, the mechanics you're relying on, exactly who's on each side, your liquidity target, your bootstrap plan, your revenue model, and a concrete MVP scope. Every later phase builds directly on this — Phase 1 starts turning this into an actual product design.

## What's Next

Next: **PRD** — formalizing this scope into a product requirements document that drives wireframes, design, and architecture decisions through the rest of the build.
