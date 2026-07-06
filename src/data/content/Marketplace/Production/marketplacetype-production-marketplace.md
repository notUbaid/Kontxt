---
title: Marketplace Type
slug: marketplace-type
phase: Phase 0
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Marketplace Type

Fundamentals gave you the economic vocabulary. Now you must make concrete structural decisions. In a production environment, your "Marketplace Type" is not a marketing label—it is the literal blueprint for your database schema, your state machines, and your API design. 

If you get this wrong, you will spend months fighting your own architecture, trying to force a booking system into an e-commerce inventory schema.

---

## The Core Structural Dimensions

Every production marketplace is a specific permutation of five structural dimensions. You must lock in your coordinates on this matrix before writing a single line of data modeling.

| Dimension | Option A | Option B |
|---|---|---|
| **The Core Asset** | Goods (Physical/Digital items) | Services (Time, Skill, Labor) |
| **Transfer Mechanism** | Permanent (Purchase/Ownership) | Temporary (Rental, Booking, Subscription) |
| **Geospatial Constraint** | Local (In-person handoff or service) | Remote (Global, purely digital fulfillment) |
| **Pricing Engine** | Fixed (Pre-set by supply) | Dynamic (Bidding, Quotes, Negotiation) |
| **Category Scope** | Vertical (Hyper-specialized niche) | Horizontal (Broad, multi-category) |

> [!DECISION]
> Do not proceed until you have selected exactly one option per row. "We do both" is the fastest way to bloat your MVP and fail. You must pick a primary dominant structural path for your initial launch.

---

## The Core Asset: Inventory vs. Availability

This is the single highest-impact architectural decision you will make. It completely alters your database constraints.

**Goods Marketplaces (Inventory):**
You are managing discrete items. Your database must handle SKU counts, out-of-stock states, shopping carts, shipping logistics integrations, and return workflows. A listing represents a static object that exists independently of the transaction.

**Services Marketplaces (Availability):**
You are managing time. Your database must handle complex calendar availability, timezone conversions, overlapping booking prevention (race conditions), and recurring slots. A listing represents a *capability* bound to a human's schedule.

> [!WARNING]
> Do not attempt to build a unified table that handles both physical goods and hourly services. They require entirely different normalization strategies. If you must support both, build them as parallel systems.

---

## Geography: The Indexing Strategy

A **Local** marketplace requires geospatial infrastructure immediately. You cannot use standard text search; you must use PostGIS (if using PostgreSQL) or a specialized search engine (like Algolia or Typesense) that supports radius-based querying (e.g., `ST_DWithin`). Local marketplaces also demand in-person trust mechanisms (e.g., background checks, QR code handoffs).

A **Remote** marketplace removes the database complexity of geospatial querying but drastically raises the bar for digital trust. You must build robust dispute resolution, digital escrow holding, and identity verification.

---

## Pricing Engine: State Machines vs. Simple Transactions

**Fixed Pricing** requires a straightforward transactional flow: `Checkout -> Payment Captured -> Order Fulfilled`.

**Dynamic Pricing** (Bidding, Custom Quotes, Negotiation) requires a complex State Machine. You must track the lifecycle of an offer (`Draft -> Submitted -> Countered -> Accepted -> Expired`). This requires chron-jobs or background workers to handle expirations and real-time WebSockets to notify users of counter-offers.

> [!TIP]
> Always default to Fixed Pricing for your v1 unless Dynamic Pricing is the fundamental premise of your business model (e.g., an auction house or a freelance RFP platform). Dynamic pricing adds months of engineering overhead to achieve edge-case stability.

---

## Writing Your Structural Blueprint

Combine your five decisions into a definitive technical mandate. You will use this exact sentence to align your engineering decisions in Phase 2.

```text
[Niche] is a [vertical/horizontal], [local/remote] marketplace where 
[supply side] offer [goods/services] to [demand side], utilizing 
[fixed/dynamic] pricing for a [permanent/temporary] transfer of value.
```

**Example:** 
*"PetSit is a vertical, local marketplace where verified pet owners offer temporary pet-sitting services to travelers, utilizing fixed pricing for a temporary transfer of value."*

If a feature request (e.g., "Let's add a bidding system for sitters") contradicts this blueprint, reject the feature.

---

## AI Prompts for Architectural Validation

> [!TIP]
> **Prompt 1 — Schema Stress Test:**

````prompt
Here is my marketplace structural blueprint: "[Paste your sentence]".
Based strictly on these five dimensions, outline the 3 most complex database architecture challenges I will face (e.g., handling double-booking race conditions for services, or PostGIS radius queries for local). Do not give me code yet, just identify the specific architectural bottlenecks I must plan for.
````

> [!TIP]
> **Prompt 2 — Feature Scope Pruning:**

````prompt
Review my structural blueprint: "[Paste your sentence]". I am considering adding [Proposed Feature]. Does this feature fundamentally violate or complicate my chosen structural dimensions? Act as a strict technical lead and explain why this feature will introduce unnecessary technical debt for a v1 launch.
````

---

## Validating AI Output

- **Ensure precise database concepts:** If AI warns about "database complexity," demand to know exactly what kind. Is it timezone mapping? Is it transactional locking?
- **Check for state machine awareness:** If you selected Dynamic pricing, ensure the AI's feedback acknowledges the need for background jobs (for offer expiry) and complex state transitions.

---

## Checklist: Structural Mandate

## Checklist:
- [ ] Locked in a decision for all five structural dimensions.
- [ ] Written the definitive Structural Blueprint sentence.
- [ ] Identified whether your core data model relies on Inventory Logic (Goods) or Availability Logic (Services).
- [ ] Confirmed whether your search infrastructure requires Geospatial (local) indexing.
- [ ] If using Dynamic Pricing, acknowledged the need for a State Machine architecture.

---

## What's Next

Next: **Supply Side** — We take this structural blueprint and apply it to your most critical users: the Supply side. We will define exactly how you will onboard them, verify them, and integrate them into your database.
