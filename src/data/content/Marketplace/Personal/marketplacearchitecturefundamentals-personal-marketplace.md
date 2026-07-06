---
title: Architecture Fundamentals
slug: architecture-fundamentals
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Architecture Fundamentals

## Why This Module Exists Between Decisions and Implementation

You've made several decisions already — stack, auth model, review model. This module is the pause before you go further: it gives you the mental model for *how a marketplace's pieces fit together*, so the next several modules (User Architecture, Authorization, Listing System, Payments) feel like one coherent system instead of a list of disconnected features.

Skip this and you'll still be able to build each piece individually. But you'll likely miss how they depend on each other — and those dependencies are exactly where solo builders get stuck mid-Phase-3, realizing a feature they built two weeks ago needs to be restructured.

---

## The Five Core Entities of Any Marketplace

Almost everything you build maps back to one of these. Knowing this map now means every later module is "where does this fit," not "what is this."

| Entity | What It Represents | Depends On |
|---|---|---|
| **User** | A person (buyer, seller, or both) | Nothing — this is your root entity |
| **Listing** | Something a seller is offering | User (seller) |
| **Transaction** | A completed or in-progress exchange | User (buyer + seller) + Listing |
| **Review** | Trust signal tied to a transaction | Transaction |
| **Message** | Communication between two users | User (sender + recipient), often Listing |

>  **Tip:** Notice the dependency order: User → Listing → Transaction → Review. This is also roughly the order you should build your database schema in. Building Reviews before Transactions exist, for example, leaves you with no real data to attach reviews to — exactly the trap flagged in the Reviews & Ratings module.

---

## The One Architectural Truth Specific to Marketplaces

> ️ **Every other app type has one "side." A marketplace has two.** In a normal app, a user does things to their own data. In a marketplace, every transaction involves two different users' data interacting — a buyer's payment touching a seller's payout, a buyer's message reaching a seller's inbox, a buyer's review affecting a seller's reputation. This is why authorization (next-but-one module) is harder here than in a typical CRUD app: almost every permission check has to ask "is this user *one of the two parties* to this specific record," not just "does this user own this record."

---

## State Machines: The Concept That Prevents the Most Bugs

A listing isn't just "exists" or "doesn't exist." It moves through states, and a huge share of marketplace bugs come from not modeling those states explicitly.

| Entity | Example States |
|---|---|
| Listing | Draft → Pending approval → Active → Sold/Completed → Removed |
| Transaction | Initiated → Payment held → Completed → Refunded/Disputed |
| User account | Active → Suspended → Banned |

>  **Best practice:** Model these as an explicit status field with a defined, limited set of allowed values — not a collection of boolean flags (`is_sold`, `is_removed`, `is_pending` as separate columns). Boolean flags can contradict each other (`is_sold = true` and `is_removed = false` at the same time, which shouldn't be possible). A single status field makes invalid states structurally impossible.

This single decision — status field vs. scattered booleans — is one of the most common sources of "how did this listing end up in a weird state" bugs in marketplace projects. Decide it now, consistently, across all three entities above.

---

## How Your Phase 1 Decisions Become Phase 2 Structure

This is the payoff of the planning work you already did. Each Phase 1 decision maps directly to an architectural requirement:

| Phase 1 Decision | Phase 2 Architecture Requirement |
|---|---|
| Buyer Journey trust signals | Profile fields on User entity |
| Seller Journey friction map | Required vs. optional Listing fields |
| Marketplace Policies approval model | Listing status must include a "pending approval" state |
| Trust & Safety reporting flow | A report/flag relationship between Users and Listings |
| Trust & Safety enforcement ladder | Account status field on User, with suspended/banned states |

> ️ **Common mistake:** Treating Phase 1 as "done" once the documents are written, then designing Phase 2 architecture from scratch as if those decisions don't constrain it. Every module from here forward should be checked against your Phase 1 decisions, not designed independently of them.

---

## Monolith First — and Why That's Not a Compromise

For a solo builder, a single, well-organized codebase (a "modular monolith") beats microservices in every dimension that matters at your scale: deployability, debuggability, and development speed. Microservices solve organizational problems (multiple teams stepping on each other) that you don't have as a team of one.

| You Have | You Need |
|---|---|
| One developer | One deployable unit |
| No team coordination overhead | No service-to-service complexity |
| Fast iteration needs | Fast local development, not distributed systems |

>  Organize your monolith by *domain* (users/, listings/, transactions/, reviews/), not by technical layer alone. This gives you the organizational clarity of microservices without any of the operational cost — and makes a future split easier if you ever actually need one.

---

## AI Prompt: Reviewing Your Architecture Before You Build

```
I'm building a personal-scale marketplace for [your niche].

Here are my Phase 1 decisions:
- Trust signals needed: [from Buyer Journey]
- Listing approval model: [from Marketplace Policies]
- Enforcement mechanisms: [from Trust & Safety]
- Review model: [from Reviews & Ratings]

I'm planning these core entities: User, Listing, Transaction, Review,
Message — organized as a modular monolith using [your stack].

Review this plan and tell me:
1. Does my entity list correctly capture every Phase 1 decision above,
   or is something missing structurally?
2. Where should I use an explicit status field vs. separate booleans,
   specifically for Listing and Transaction?
3. Is there a dependency ordering issue in how I'm planning to build
   this — anything that needs something else to exist first?
```

---

## What You Should Walk Away With

1. A clear mental map of your five core entities and how they depend on each other
2. A decision to use explicit status fields, not scattered booleans, for Listing/Transaction/User states
3. A confirmed monolith-first approach, organized by domain
4. Verification that your Phase 1 decisions are represented somewhere in this entity map — not lost

The next modules — User Architecture, Authorization, Listing System — implement this map piece by piece. Refer back to it whenever a later decision feels disconnected from the whole.
