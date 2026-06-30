---
title: PRD
slug: prd
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 25–35 min
---

# Product Requirements Document

A PRD is not a corporate formality. It is the single document that prevents you from building the wrong thing.

Without it, design decisions are made by instinct. Development priorities shift based on what feels interesting. Scope expands invisibly. Features get built that nobody needed.

With it, every decision in Phase 1 through Phase 3 has a reference point. When you're three weeks into development and tempted to add a feature, the PRD tells you whether it's in scope or not.

---

## What a Personal Store PRD Is Not

It is not:
- A 40-page enterprise requirements document
- A list of every possible feature
- A contract that can never change
- A design specification

It is:
- A compressed, precise record of what you are building and why
- The input document for all design and architecture work
- A scope boundary you can point to when scope creep appears
- A tool for communicating intent to AI clearly and consistently

---

## PRD Structure for a Personal E-Commerce Store

A personal store PRD has six sections. Nothing more is needed.

---

### Section 1 — Store Overview

One paragraph. Answers: what is this store, who is it for, and what problem does it solve for the customer.

**Format:**
> [Store name] is a [product type] store for [target customer]. It solves [customer problem or desire] by offering [core value proposition]. The store launches with [catalog scope] and is built for [personal / side business / intended scale].

This paragraph gets pasted into every AI conversation in Phase 2 and 3. Write it to be reused.

---

### Section 2 — Goals and Non-Goals

Explicit scope boundary. Prevents arguments with yourself at 2am.

**Goals (what this store will do at launch):**
- Accept orders for [product type] online
- Process payments via [payment provider]
- Send order confirmation to customers automatically
- Allow customers to browse [catalog size] products
- Ship domestically to [regions]

**Non-Goals (explicitly out of scope for MVP):**
- Customer accounts and saved addresses
- Product reviews and ratings
- Discount codes
- International shipping
- Mobile app
- [Add your own]

Non-goals are not permanent decisions. They are deliberate deferrals. Naming them prevents them from silently re-entering scope.

---

### Section 3 — User Stories

User stories define what the store does from the customer's perspective. Write only the stories that correspond to Bucket 1 features from your MVP Scope module.

**Format:** As a [user type], I want to [action] so that [outcome].

**Core stories for a personal e-commerce store:**

| # | User Story | Priority |
|---|---|---|
| 1 | As a visitor, I want to browse all products so I can find what I'm looking for | Must Have |
| 2 | As a visitor, I want to view a product's details, images, and variants so I can make a purchase decision | Must Have |
| 3 | As a visitor, I want to add products to a cart so I can purchase multiple items together | Must Have |
| 4 | As a visitor, I want to checkout as a guest so I don't need to create an account to buy | Must Have |
| 5 | As a visitor, I want to pay securely with a card so my transaction is safe | Must Have |
| 6 | As a buyer, I want to receive an order confirmation email so I have proof of purchase | Must Have |
| 7 | As a buyer, I want to see my order total including shipping before I pay | Must Have |
| 8 | As the store owner, I want to see all incoming orders so I know what to fulfill | Must Have |
| 9 | As the store owner, I want inventory to decrement automatically when an order is placed | Must Have |
| 10 | As a visitor, I want to understand who makes these products so I can trust the store | Should Have |

Add store-specific stories for any unique features your business definition requires.

---

### Section 4 — Technical Constraints

Decisions already made that all future work must respect.

| Constraint | Decision | Reason |
|---|---|---|
| Pricing | All amounts stored as integers (paise/cents) | Floating-point precision |
| Inventory | Reserve on checkout start | Simplest approach for personal store |
| Authentication | Guest checkout only at launch | Reduces scope, accounts deferred |
| Payment | [Razorpay / Stripe / other] | [Reason: regional support / pricing / familiarity] |
| Shipping | Flat-rate domestic only | Simplest at launch |
| Data | Variant model from day one | Future-proofing catalog |
| Order records | Immutable after creation | Data integrity |
| Platform | [Custom build / Shopify] | [Reason from Phase 2 decision] |

---

### Section 5 — Success Criteria

How you'll know the store is working. Pull from your Success Metrics module.

| Metric | Target | Timeframe |
|---|---|---|
| Conversion rate | ≥ 1.5% | First 90 days |
| Cart abandonment rate | ≤ 80% | First 90 days |
| Order confirmation email delivery | 100% | Always |
| Page load time (product page) | < 2.5s on mobile | Always |
| Checkout completion rate | ≥ 60% of initiated checkouts | First 90 days |

---

### Section 6 — Open Questions

Decisions not yet made that will be resolved in Phase 2.

Track them here so they don't become invisible assumptions baked into the design.

Examples:
- Will I use a headless CMS for product content or manage directly in the database?
- Will product images be stored on Cloudflare R2 or Supabase Storage?
- Will I use an ORM or write raw SQL?
- What email provider will handle transactional emails?
- Will I need a separate admin UI or will the database + basic dashboard suffice?

---

## ✅ PRD Checklist

- [ ] Section 1: Store overview paragraph is written and reusable as AI context
- [ ] Section 2: Goals and Non-Goals are explicitly listed — no ambiguity
- [ ] Section 3: User stories cover all Bucket 1 features from MVP Scope
- [ ] Section 4: All technical constraints from Phase 0 are documented
- [ ] Section 5: Success criteria are specific and measurable
- [ ] Section 6: Open questions are captured, not buried in assumptions
- [ ] The PRD fits in a single document I can paste into an AI conversation

---

## AI Prompt — Generate Your PRD Draft

Use this with all your Phase 0 outputs available. The more context you provide, the less you'll need to revise.

```
I am building a personal e-commerce store. Help me draft a PRD.

Store context:
- What I sell: [specific description]
- Target customer: [description]
- Differentiator: [why they buy from me]
- Catalog at launch: [number and type of products]
- Variant dimensions: [e.g. size and color, or none]
- Payment provider: [Razorpay / Stripe / other]
- Shipping: [flat-rate domestic / free above threshold / real-time]
- Platform: [custom build / Shopify]
- Guest checkout only: [yes / no]

Features in scope at launch: [list from MVP Scope Bucket 1]
Features explicitly out of scope: [list from MVP Scope Bucket 2 and 3]

Success metrics: [from Success Metrics module]

Generate a complete PRD using these six sections:
1. Store Overview (one reusable paragraph)
2. Goals and Non-Goals
3. User Stories (prioritized, Must Have / Should Have / Won't Have)
4. Technical Constraints
5. Success Criteria
6. Open Questions

Keep it concise. This document will be referenced throughout development.
```

---

## How the PRD Gets Used

Every significant decision in Phase 1 (design) and Phase 2 (architecture) should be traceable to this document.

When a design question arises — "should we add a wishlist button to the product page?" — check the PRD. If wishlist is a Non-Goal, the answer is no. No discussion required.

When an AI generates an architecture recommendation that includes a feature you didn't ask for, the PRD is the filter. If it's not in scope, it doesn't get built.

The PRD is not a ceiling on what you can eventually build. It is a floor that guarantees you ship.

**Next: Information Architecture →**
