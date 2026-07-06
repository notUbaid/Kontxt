---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# MVP Scope (Production)

Every decision in Phase 0—your constrained Node, your Go-To-Market strategy, your Supply/Demand personas, and your Revenue Model—converges here. 

In a production environment, an MVP (Minimum Viable Product) does not mean a "broken prototype." It means a highly polished, structurally complete system that solves exactly one core workflow perfectly. 

This module forces you to ruthlessly cut scope. If you do not constrain your MVP now, your engineering timeline will stretch from 6 weeks to 6 months, and you will run out of capital before reaching liquidity.

---

## The Production MVP Mandate

A production marketplace MVP must achieve exactly three things. If it fails at any of these, it is not an MVP:

1. **Supply Ingestion:** The constrained side can create an account and list inventory/availability with minimal friction.
2. **Demand Discovery:** The demand side can search, filter, and discover that inventory reliably.
3. **The Secure Handshake:** The two parties can securely transact (via escrow, messaging, or booking) with a baseline level of manufactured trust.

> [!WARNING]
> Your MVP must include payment infrastructure and analytics telemetry from day one. You cannot bolt Stripe Connect or PostHog onto a messy codebase in month three. If your platform cannot capture funds or measure user retention, you are flying blind.

---

## The Three-Column Scoping Matrix

For every feature request, map it to one of three columns. In production, engineering time is your most expensive resource. Be ruthless.

| MVP (The Core Loop) | Fast Follow (Post-Liquidity) | V2 (Scale & Optimization) |
|---|---|---|
| Stripe Connect (Escrow & KYC) | Complex Dispute Resolution Center | Machine Learning Search Ranking |
| PostHog / Mixpanel Telemetry | Advanced Seller Analytics Dashboard | Native iOS/Android Apps |
| Core Listing CRUD (Create/Read/Update/Delete) | Bulk CSV Inventory Uploads | Dynamic Pricing / Bidding Engine |
| Single-Player SaaS Wedge (For Supply) | In-App Push Notifications | Multi-Language Localization |
| Basic Keyword & Category Search | Geospatial Map Search (Unless Local) | Algorithmic Fraud Detection |

> [!TIP]
> The ultimate test for an MVP feature: "If I remove this feature, does the core transaction still mathematically work?" If the answer is yes, move it to Fast Follow.

---

## Minimum Viable Trust (MVT)

You do not need an AI-powered fraud detection system for your MVP. But you cannot launch to the public with zero trust infrastructure.

Your MVP scope must include the **Minimum Viable Trust**:
- **Identity:** All sellers must pass a basic Stripe Identity or Checkr background check.
- **Financial Safety:** All funds must be held in Escrow until the service is fulfilled.
- **The Escape Hatch:** A simple "Report this User" button that flags an admin account in your database.

---

## Writing the Architectural Scope Document

This document will serve as the source of truth for Phase 1 (Design) and Phase 2 (Architecture). If a feature is not in this document, it does not get designed or coded.

```text
## Production MVP Scope: [Marketplace Name]

### The Core Loop
[One precise paragraph: How a seller lists inventory, how a buyer discovers it, and how the financial transaction is routed via Escrow.]

### The Single-Player Wedge
[What tool are you giving the supply side to use immediately?]

### Non-Negotiable Infrastructure (MVP)
- [Feature]: [Why it is technically required based on Phase 0 decisions]
- [Feature]: [Why it is technically required]

### Explicitly Out of Scope (The Graveyard)
- [Feature]: [Why we are deferring this until post-liquidity]
- [Feature]: [Why we are deferring this]
```

> [!DECISION]
> The "Explicitly Out of Scope" list is the most important part of this document. Write down the features you love the most, but acknowledge they are not required to validate the core loop. When scope creep happens in Week 4, refer back to this list.

---

## AI Prompts for Ruthless Pruning

> [!TIP]
> **Prompt 1 — The Scope Butcher:**

````prompt
Here is my proposed MVP feature list for a [Take Rate / Subscription] marketplace: [Paste List]. Act as a ruthless, highly experienced Engineering Manager. Categorize these features into MVP, Fast Follow, and V2. For every feature you remove from the MVP list, explain exactly how I can manually "concierge" or fake that feature for the first 100 transactions without writing code.
````

> [!TIP]
> **Prompt 2 — Telemetry & Trust Integration:**

````prompt
Based on a production MVP for [Your Niche], outline the minimum viable infrastructure I need to build for two things: 1) Trust (KYC and Escrow logic via Stripe Connect), and 2) Telemetry (Tracking the core funnel via PostHog). Keep the scope strictly constrained to what is required to legally operate and measure the first 100 transactions.
````

---

## Validating AI Output

- **Beware of "SaaS Bloat":** AI will often suggest building notifications, complex dashboards, and user settings pages. Reject them. A user does not need a "Change Password" flow in v1 if you use Magic Links or OAuth.
- **Ensure the core loop is unbroken:** When pruning features, ensure the AI did not accidentally remove a feature required to actually execute the transaction.

---

## Checklist: Locking the Scope

## Checklist:
- [ ] Mapped all proposed features into the Three-Column Matrix.
- [ ] Defined the Minimum Viable Trust (MVT) required to launch.
- [ ] Drafted the formal Architectural Scope Document.
- [ ] Explicitly documented at least 3 major features that are OUT of scope for the MVP.
- [ ] Verified that basic Telemetry (analytics) and Payment routing are included in the MVP.

---

## Phase 0 Complete

You have successfully defined the physics of your production marketplace. You know your constraints, your economics, your users, and your exact technical scope.

## What's Next

Next: **Phase 1: Product Requirements Document (PRD)** — We will translate this abstract scope into a rigid, highly technical PRD that will serve as the master blueprint for your engineering sprints.
