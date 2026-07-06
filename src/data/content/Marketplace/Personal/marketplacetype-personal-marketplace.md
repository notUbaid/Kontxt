---
title: Marketplace Type
slug: marketplace-type
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
filename: marketplace-type-personal-marketplace.md
---

# Marketplace Type

Fundamentals gave you the vocabulary. Now make a concrete decision: what structural type of marketplace are you actually building? This isn't naming-for-naming's-sake — the type you pick determines your data model in Phase 2, your trust mechanisms in Phase 1, and how you'll bootstrap supply later in this phase.

Get specific here. "A marketplace for X" isn't a type. The structure underneath it is.

---

## The Core Structural Dimensions

Every marketplace can be classified along a few independent dimensions. Your specific marketplace is a combination of these — pick one option per row.

| Dimension | Option A | Option B |
|---|---|---|
| **What's exchanged** | Goods (physical or digital items) | Services (time, skill, labor) |
| **Ownership transfer** | Permanent (buyer keeps it) | Temporary (rental, booking) |
| **Geography** | Local (in-person handoff/service) | Remote (works anywhere) |
| **Pricing** | Fixed price set by seller | Dynamic (bidding, quotes, negotiation) |
| **Scope** | Vertical (one niche) | Horizontal (many categories) |

> **Decision:** Write down your answer to all five rows before continuing. Each one has direct, specific consequences covered below — this isn't an abstract exercise.

---

## Why Goods vs. Services Changes Everything Downstream

This is the single highest-impact decision on this list.

**Goods marketplaces** need: inventory/stock concepts, shipping or pickup logistics, condition descriptions, possibly returns. A listing represents a physical (or digital) thing that exists independent of any specific transaction.

**Services marketplaces** need: availability/scheduling, duration, possibly location radius, and trust mechanisms weighted more toward the *person* than the *item* (since you're trusting a person's skill or time, not inspecting a static object). A listing often represents a *capability*, not a fixed thing.

> **Tip:** If your idea mixes both (e.g., "marketplace for handmade furniture, with custom commission requests"), that's fine — but know that you're building two listing types with different data shapes, not one. Decide if your MVP needs both on day one, or if one can come later.

---

## Why Geography Matters More Than It Seems

A **local** marketplace (in-person handoff, on-site services) needs location data, distance-based search, and usually weaker trust requirements per-transaction (you're meeting in person, which is itself a trust signal) but stronger safety considerations (you're meeting a stranger in person).

A **remote** marketplace removes geography constraints entirely but raises the trust bar — there's no in-person accountability, so reviews, verification, or payment protection have to work harder.

> **Decision:** If your marketplace is local, plan for location/maps in Phase 1 wireframes now, not as an afterthought in Phase 3. Retrofitting location-based search after the data model is built without it is a real rework cost.

---

## Fixed Price vs. Dynamic Pricing: Pick the Simpler One Unless You Have a Reason Not To

Dynamic pricing (bidding, auctions, custom quotes) is significantly more complex to build than fixed pricing — it needs state management for offers, expiration logic, and a negotiation UI. For a personal project, this complexity is rarely worth it unless dynamic pricing is the *entire point* of your idea (an auction site, a quote-request service marketplace).

> **Warning:** Don't add bidding or negotiation "because real marketplaces have it." Most successful niche marketplaces use simple fixed pricing. Add dynamic pricing only if your specific niche genuinely doesn't work without it (e.g., freelance services where every job is different enough that fixed pricing doesn't make sense).

---

## Common Marketplace Type Patterns

These aren't the only shapes a marketplace can take, but most real marketplaces map closely to one:

| Pattern | Example | Listing represents |
|---|---|---|
| Classifieds-style goods | Used items, local sales | A specific physical item |
| Booking-style services | Tutoring, local services, equipment rental | A slot of time or availability |
| Commission/request-style | Custom work, freelance gigs | A request, fulfilled by an offer |
| Subscription-style access | Recurring access to something (less common for personal projects) | Ongoing access, not a single transaction |

> **Decision:** If your idea doesn't cleanly map to one of these, it's worth a second look — not because it's wrong, but because novel marketplace shapes are usually harder to design trust and matching for, which is more risk for a first solo build.

---

## Writing Your Marketplace Type Statement

Combine your five dimension answers into one sentence you'll reuse across Phase 1 and Phase 2:

```
[Niche] is a [vertical/horizontal], [local/remote] marketplace where
[supply side] offer [goods/services] to [demand side], priced
[fixed/dynamic], with [permanent/temporary] exchange.
```

Example: *"PetSit is a vertical, local marketplace where pet owners book temporary pet-sitting services from verified local sitters, priced at fixed hourly rates."*

This sentence becomes a quick reference for every later decision — when you're unsure whether a feature belongs in your MVP, check it against this sentence first.

---

## AI Prompts You Can Use

**Prompt 1 — Classify your idea across all five dimensions:**

```
Here's my marketplace idea: [describe it]. Classify it across these five
dimensions: goods vs. services, permanent vs. temporary exchange, local
vs. remote, fixed vs. dynamic pricing, vertical vs. horizontal scope.
If any dimension is ambiguous or mixed in my description, flag it and
ask me to clarify rather than guessing.
```

**Prompt 2 — Stress-test for hidden complexity:**

```
Here's my marketplace type statement: "[paste your sentence]". Are there
any of these five dimensions where I've picked the more complex option
(dynamic pricing, mixed goods/services, both local and remote) without
realizing it adds real build complexity? Be specific about what extra
work each complex choice creates.
```

---

## Validating What AI Generates

- **Don't accept a classification that avoids picking a side** — if your idea is genuinely ambiguous on a dimension, that's useful information about your idea, not a reason to leave it unresolved
- **Verify any complexity warning is specific**, not generic — "dynamic pricing is complex" should come with what specifically gets harder (state management, expiration logic, UI), not just a vague caution

---

## Implementation Checklist

- [ ] All five dimensions answered explicitly (goods/services, permanent/temporary, local/remote, fixed/dynamic, vertical/horizontal)
- [ ] Marketplace type statement written in the single-sentence format above
- [ ] If mixing goods and services, decided whether both are needed for MVP or one comes later
- [ ] If local, noted that location/maps needs to be in Phase 1 wireframes
- [ ] Confirmed fixed pricing is sufficient, or have a specific reason dynamic pricing is core to the idea

---

## What's Next

Next: **Supply Side** — defining exactly who's offering goods or services on your marketplace, and what they actually need from the platform to participate.
