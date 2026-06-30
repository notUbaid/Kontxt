---
title: Chicken & Egg Strategy
slug: chicken-and-egg-strategy
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 25-30 min
filename: chicken-and-egg-strategy-personal-marketplace.md
---

# Chicken & Egg Strategy

You know your liquidity target. Now the plan to actually get there from zero — the question every marketplace faces before it exists: buyers won't come without sellers, sellers won't bother without buyers. This module is where that gets solved on paper, before you've built anything, because solving it in code is impossible — it's solved through sequencing and manual effort.

This is arguably the most important module in Phase 0 for a solo builder. Get this plan wrong and a technically perfect marketplace still launches to silence.

---

## The Core Insight: You Solve One Side First, Manually

Every successful marketplace bootstrap follows the same shape: pick one side, get it to a believable minimum *before* opening the doors to the other side, usually through effort that doesn't scale (you, personally, doing things by hand).

> **Decision:** Decide now which side you're solving first. Revisit your Supply Side and Demand Side modules — whichever side you identified as easier to acquire is almost always the one to seed first.

---

## The Two Standard Strategies

### Strategy 1: Seed Supply First (Most Common)

Recruit enough sellers manually to hit your liquidity target *before* any buyers see the platform. Only then start bringing in buyers, who arrive to a marketplace that already looks alive.

**Works well when:** supply is identifiable and reachable (a specific community of potential sellers exists), and listings don't expire quickly.

**How to execute it:**
- Personally reach out to the specific people/communities identified in your Supply Side module
- Make the ask small: "would you list 1-2 things to help me test this" is an easier yes than "join my new platform"
- Consider listing a few things yourself, clearly representative of real use, if your niche allows it

### Strategy 2: Fake the Other Side (Used Carefully)

Some marketplaces manually fulfill demand themselves early on, acting as the "supply" behind the scenes while learning what real supply needs to look like, then gradually hand off to real sellers.

**Works well when:** you personally can act as a stand-in for one side credibly (you fulfill a few service requests yourself, or manually source a few items to list).

> **Warning:** This only works if you're transparent with early users about the platform being new and small — never claim full automation or scale that doesn't exist. The goal is learning what real supply or demand needs, not deceiving early users.

---

## Why "Seed Supply First" Usually Wins for Solo Builders

Recruiting sellers manually scales with your own effort — you can directly message 20 people. Recruiting buyers manually is harder because buying often requires the *product to already look credible*, which it can't yet without supply.

> **Decision:** Unless your specific niche clearly favors solving demand first (rare, but possible if your demand side is small, identifiable, and supply is genuinely abundant once asked), default to seeding supply first. This is the strategy most marketplace bootstrapping case studies converge on for good reason.

---

## The "Single Player Mode" Pattern

Some successful marketplaces launched by being useful to one side even before the other side existed — giving sellers (or buyers) a reason to use the product alone, so the platform has activity and content even at zero liquidity.

Example patterns:
- A tool sellers want regardless of buyer volume (an easy way to track their own inventory or bookings)
- Content/listings that are useful to browse even before transactions are possible (browsable catalog value)

> **Tip:** This isn't required for every marketplace, but worth a moment of thought: is there any reason your supply side would use part of your platform even with zero buyers present? If yes, that's a powerful early retention lever — they're not waiting on you, they're already getting value.

---

## Your Manual, Unscalable Launch Plan

Write this out concretely — it should read like a to-do list, not a strategy. The whole point of this stage is that it doesn't scale; it's you, doing specific things, by hand.

```
Week 1-2: Reach out personally to [specific people/community] to get
first [X] listings. Method: [DM, in-person ask, post in community].

Week 2-3: Once [X] listings exist, invite [specific people/community]
as first buyers. Method: [same channel, or different one].

Week 3-4: Personally check in with first transactions — ask what worked,
what didn't, fix the most painful issue before recruiting more of either side.
```

> **Decision:** Resist the urge to build automated growth features (referral systems, SEO, viral loops) before this manual phase has actually worked once. Phase 6's Growth modules cover scaling strategies — they assume a working core loop already exists. Building growth tooling before liquidity exists is solving a problem you don't have yet.

---

## Common Bootstrapping Mistakes

- **Opening to everyone at once** — without sequencing, you risk a buyer's first visit being to an empty marketplace, which they won't forgive on a second visit
- **Waiting for "enough" supply before launching to anyone** — there's no perfect number; launch to a small trusted group once you hit your liquidity target from the previous module, then iterate
- **Treating early users like a public launch** — be explicit with your first 10-20 users that this is early and you want their honest feedback; this framing makes a thin early experience feel like participation, not disappointment

---

## AI Prompts You Can Use

**Prompt 1 — Build a concrete week-by-week bootstrap plan:**

```
My marketplace's supply side is [from your Supply Side module], demand
side is [from your Demand Side module], and my liquidity target is
[X listings from your Liquidity module]. Write a realistic 4-week,
week-by-week plan for me, as a solo builder with no budget, to manually
reach that liquidity target. Be specific about outreach methods, not
generic ("post on social media").
```

**Prompt 2 — Check if "single player mode" applies to my idea:**

```
Here's my marketplace: [describe it, including supply and demand sides].
Is there a way my supply side (or demand side) could get value from part
of the platform even before the other side exists? Suggest a specific
feature if one makes sense, or tell me honestly if this pattern doesn't
fit my niche.
```

---

## Validating What AI Generates

- [ ] **Reject any suggested outreach method you can't actually execute** — "partner with influencers" or "run a launch campaign" isn't realistic for a solo project with no budget; insist on direct, personal, zero-cost methods
- [ ] **Confirm the week-by-week plan's numbers are grounded in your actual liquidity target**, not a generic "get 100 users" goal disconnected from what you defined earlier
- [ ] **Be skeptical of a "single player mode" feature suggestion that's actually a significant build effort** — it should be small and quick, or it's not worth doing before you have any users at all

---

## Implementation Checklist

- [ ] Decided which side to seed first (supply or demand), with reasoning tied back to earlier modules
- [ ] Considered whether "single player mode" value applies to your idea
- [ ] Written a concrete, week-by-week manual outreach plan using real channels you identified earlier
- [ ] Plan explicitly avoids building automated growth tooling before the manual approach is proven once

---

## What's Next

Next: **Revenue Model** — now that you have a plan to reach liquidity, deciding how (and whether) your marketplace will make money once it does.
