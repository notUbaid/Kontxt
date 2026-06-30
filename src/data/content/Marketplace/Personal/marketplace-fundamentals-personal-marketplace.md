---
title: Marketplace Fundamentals
slug: marketplace-fundamentals
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 25-30 min
filename: marketplace-fundamentals-personal-marketplace.md
---

# Marketplace Fundamentals

You've researched competitors and defined what success looks like. Now the underlying mechanics — the concepts that every later decision in this track (type, liquidity, revenue, architecture) depends on. Get these right conceptually now, and every later module is faster. Skip them, and you'll be making architecture decisions in Phase 2 without the vocabulary to reason about them.

This is the one genuinely conceptual module in Phase 0. No code, no AI prompts to generate artifacts — just the mental model.

---

## What Makes Something a Marketplace (and Not Just an App)

A marketplace has two distinct user types who need each other but don't know each other yet, and the product's entire job is closing that gap. This is structurally different from a normal app, where one type of user gets value directly from the product.

| Regular app | Marketplace |
|---|---|
| Notes app: you write, you read | Etsy: sellers list, buyers discover |
| Value comes from the product itself | Value comes from the *other side* being present |
| Works fine with one user | Useless with only one side present |

> **Decision:** This distinction matters because it changes what "MVP" means. A notes app MVP needs working notes. A marketplace MVP needs *both sides functioning together* — a beautiful seller experience with zero buyers, or vice versa, isn't an MVP. It's half a product.

---

## The Three Forces Every Marketplace Has to Manage

**1. Trust** — strangers transacting with strangers. Every marketplace decision (reviews, verification, payment escrow, dispute resolution) exists to make this safer than it would be without the platform.

**2. Matching** — connecting the right buyer to the right seller out of everyone available. Search, filters, and recommendations all exist to solve this.

**3. Liquidity** — having enough of both sides, active enough, that matches actually happen at a reasonable rate. A marketplace with trust and matching solved but only 3 sellers total still doesn't work.

> **Tip:** When you're stuck on a product decision later in this track, ask which of these three forces it's actually serving. If it's not clearly serving trust, matching, or liquidity, it's probably not essential for an early version.

---

## Take Rate: How Marketplaces Usually Make Money

Most marketplaces earn a percentage of each transaction (a "take rate") rather than charging a flat subscription. This isn't the only model — you'll fully evaluate options in the Revenue Model topic later in this phase — but understanding it now helps frame every other decision.

A take rate aligns your incentives with your users': you only earn when the marketplace actually works (a transaction completes). This is part of why "successful matches," from the Success Metrics module, is the metric that matters most — it's usually also the metric tied to revenue.

---

## One-Sided vs. Two-Sided Effort

Not every marketplace requires equal effort to acquire both sides. Knowing which side is harder to get shapes your entire early strategy — and you'll build directly on this in the Chicken & Egg Strategy module later in this phase.

- **Supply-constrained**: hard to find sellers, buyers are everywhere once supply exists (e.g., a marketplace for a rare skill or niche handmade good)
- **Demand-constrained**: sellers are easy to find, but convincing buyers to trust a new platform is hard (e.g., a marketplace competing with an established trusted alternative)

> **Decision:** Figure out honestly which side is harder for *your specific niche* before moving forward. Most early marketplace mistakes come from treating both sides as equally easy to acquire, then being surprised when one side never shows up.

---

## Network Effects: Why Marketplaces Compound (Eventually)

Each additional seller makes the marketplace more valuable to buyers (more selection), and each additional buyer makes it more valuable to sellers (more potential sales). This compounding is why successful marketplaces become hard to compete with over time — but also why early marketplaces feel slow and unimpressive before the effect kicks in.

> **Warning:** Don't expect network effects to save a weak early product. They only kick in once you already have some baseline liquidity. Before that point, growth has to come from manual effort — you personally recruiting the first sellers, not the product "naturally" growing.

---

## Horizontal vs. Vertical Marketplaces

- **Horizontal**: broad category, many types of items (general classifieds, eBay-style)
- **Vertical**: narrow, specific niche, deep specialization (a marketplace for only vintage cameras, or only local tutoring)

> **Decision:** For a solo-built personal project, vertical beats horizontal almost every time. A narrow niche is easier to seed with initial supply, easier to build trust within, and easier to market to ("the marketplace for X" is a much clearer pitch than "a marketplace for anything"). You'll formalize this choice in the next module, Marketplace Type.

---

## How These Concepts Connect to What's Next

Everything in the rest of Phase 0 is really just applying these fundamentals to your specific idea:

- **Marketplace Type** → applying horizontal/vertical and structural patterns to your niche
- **Supply Side / Demand Side** → figuring out who's on each side and what they need
- **Marketplace Liquidity** → deciding how much activity is "enough" to call it working
- **Chicken & Egg Strategy** → solving the one-sided bootstrapping problem for your specific case
- **Revenue Model** → choosing how you'll capture value once trust, matching, and liquidity exist

---

## AI Prompts You Can Use

**Prompt 1 — Identify your hardest side:**

```
I'm building a marketplace for [your niche]. Supply side is [who sells],
demand side is [who buys]. Based on the trust, matching, and liquidity
framework, which side is likely harder to acquire first, and why?
What's the specific risk if I get this wrong?
```

**Prompt 2 — Classify your marketplace honestly:**

```
Here's my marketplace idea: [describe it]. Is this more horizontal or
vertical as currently scoped? If it's too horizontal for a solo-built
personal project, suggest 2-3 ways to narrow it into a vertical that's
still worth building.
```

---

## Validating What AI Generates

- [ ] **Don't accept "both sides are equally hard" as an answer** — push back if AI gives a noncommittal answer; one side is almost always harder for any specific niche, and you need a real answer to plan around
- [ ] **Check that a suggested narrower vertical is actually narrower**, not just renamed — "marketplace for handmade goods" narrowed to "marketplace for handmade jewelry" is a real narrowing; "marketplace for crafts" is not meaningfully different

---

## Implementation Checklist

- [ ] Can explain, in your own words, why a marketplace is structurally different from a regular app
- [ ] Identified which side (supply or demand) is likely harder to acquire for your specific niche
- [ ] Have an initial instinct on horizontal vs. vertical for your idea (you'll confirm this next)
- [ ] Understand take rate as a concept, even though you haven't chosen a revenue model yet

---

## What's Next

Next: **Marketplace Type** — turning these fundamentals into a concrete structural decision about what kind of marketplace you're actually building.
