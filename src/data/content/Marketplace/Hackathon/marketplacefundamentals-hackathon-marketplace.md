---
title: Marketplace Fundamentals
slug: marketplace-fundamentals
phase: Phase 0
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: marketplace-fundamentals-hackathon-marketplace.md
---

# Marketplace Fundamentals

Before you pick a marketplace type or scope an MVP, you need the small set of mechanics that every marketplace — Airbnb, Etsy, Uber, a campus textbook swap — is built from. Get these wrong and no amount of UI polish saves the demo.

---

## The Core Mechanic: Matching Supply and Demand

Every marketplace, regardless of category, solves the same problem: connecting someone who has something with someone who wants it, and making that connection trustworthy enough that both sides act.

Four mechanics make this work. Miss any one and the marketplace doesn't actually function as a marketplace — it's just a list.

| Mechanic | What it does | Why it's non-negotiable |
|---|---|---|
| **Listing** | Sellers describe what they're offering | Without this, there's no supply to discover |
| **Discovery** | Buyers find relevant listings | Without this, supply exists but nobody finds it |
| **Connection** | Buyer and seller can communicate or transact | Without this, discovery happens but nothing closes |
| **Trust signal** | Some evidence the other side is legitimate | Without this, users hesitate and the loop stalls |

> **Reframe:** Your entire build, across every phase ahead, is in service of making these four mechanics work convincingly. Everything else — design polish, animations, extra features — only matters once these four are solid.

---

## Decision 1: Two-Sided vs. Multi-Sided

| Type | Structure | Example | Complexity |
|---|---|---|---|
| Two-sided | One buyer type, one seller type | Etsy (shoppers, makers) | Lower — build for this in a hackathon |
| Multi-sided | Multiple distinct user types interacting | Uber (riders, drivers, plus sometimes restaurants) | Higher — avoid unless your concept genuinely requires it |

> **Best Practice:** Default to two-sided. Multi-sided marketplaces multiply your buyer-journey and seller-journey work in the next phase, and judges rarely reward complexity they have to be told about rather than complexity they can see. If your idea feels like it needs three user types, look for a way to collapse it to two before moving on.

---

## Decision 2: What Gets Exchanged

This shapes almost every later technical decision, especially what you'll fake vs. build in Phase 2.

| Exchange type | Examples | Key implication |
|---|---|---|
| Goods | Physical or digital products | Needs listings with images, pricing, inventory state |
| Services | Bookings, gigs, consultations | Needs scheduling/availability, not just a static listing |
| Space | Rentals, venues | Needs availability calendars and date-range logic |
| Attention/Content | Creator marketplaces, content licensing | Needs discovery/ranking more than transaction logic |

> **Tip:** Pick the exchange type that lets you fake the hardest part most convincingly within your time budget. Goods are usually the easiest to demo well — static listings, clear pricing, no real-time availability logic required. Services and space involve scheduling complexity that's genuinely hard to fake convincingly in a weekend.

---

## The Trust Problem

Trust is the part beginners underestimate most. In a real marketplace, trust is built through reviews, verification, payment protection, and dispute resolution — all things you won't fully build in a hackathon.

> **Warning:** Don't ignore trust signals just because you can't build the real systems behind them. A listing with a star rating, a "verified seller" badge, or a response-time indicator makes the marketplace *feel* trustworthy even when the underlying system is simplified or mocked. An identical listing with zero trust signals feels hollow, even if the core transaction logic is identical. This is one of the highest-leverage, lowest-effort additions to your demo.

You'll go deeper on faking this convincingly in Demo Marketplace Data later in this track — for now, just hold the principle: **trust signals are a UI/data decision, not a backend engineering problem**, and that makes them cheap to include even under a tight deadline.

---

## The Cold Start Problem

Every real marketplace faces this: it's worthless with zero listings, and nobody lists when there are zero buyers. Real companies solve this with months of manual seeding (Airbnb famously hand-recruited early hosts).

You don't need to solve cold start for real — but you do need to understand it, because it directly explains *why* later phases include explicit modules for faking transactions and seeding demo data. You're not avoiding the cold start problem by faking data; you're simulating what a marketplace looks like *after* it's already solved that problem, because that's the version worth demoing.

---

## Using AI Effectively Here

Use AI to pressure-test your specific marketplace concept against these fundamentals before you commit to a direction in the next module.

** Copy this prompt:**

```
I'm scoping a marketplace concept for a hackathon: [describe your idea in 2-3 sentences].

Evaluate it against these fundamentals:
1. Is this naturally two-sided, or am I forcing a multi-sided structure that adds unnecessary complexity?
2. What's actually being exchanged — goods, services, space, or attention/content — and what does that imply for how hard the core transaction will be to demo convincingly?
3. What trust signals would feel natural for this specific concept, that I could fake with static data rather than build for real?
4. Where's my hardest-to-fake mechanic, and is there a simpler version of this idea that keeps the core appeal but avoids that complexity?

Be direct about scope risk — I have limited hackathon time and need to know now if this concept is too ambitious.
```

This prompt works because it asks AI to evaluate against a fixed framework instead of brainstorming open-endedly — open-ended brainstorming at this stage produces more ideas, not better decisions.

---

## Validating the Output

- Does your concept clearly identify one buyer type and one seller type, not an ambiguous multi-sided structure?
- Have you identified what's actually being exchanged, and does that match something you can demo convincingly in your time budget?
- Have you identified at least one trust signal you can fake with static data?
- Do you understand why later phases include explicit "fake this" modules, rather than treating that as a shortcut you should feel bad about?

---

## Before You Continue

- Two-sided structure confirmed (or a deliberate, justified exception)
- Exchange type identified, with its complexity implications understood
- At least one trust signal idea noted for later use
- Cold-start problem understood as the reason demo data will matter later, not skipped over

**Next up:** Marketplace Type — narrowing your concept into a specific, well-scoped category before you write a single PRD line.
