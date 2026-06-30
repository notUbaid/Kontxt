---
title: User Architecture
slug: user-architecture
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# User Architecture

## From "User Model" to "User Architecture"

Authentication gave you a way to identify a user. This module is about everything *around* that identity — how a single account represents potentially two different roles, how profile data is structured, and how that structure supports every trust mechanism you've already designed. This is the User entity from your Architecture Fundamentals map, fully specified.

Get this wrong and the symptom shows up everywhere else: messy permission checks in Authorization, awkward profile pages, trust signals that don't actually exist as queryable fields when you need them.

---

## Structuring the Dual-Role User

If you chose single-account dual-role in Authentication, here's where that decision becomes a real schema. The naive approach — a single `role` field set to "buyer" or "seller" — breaks the moment a user is both, which your own Phase 1 planning assumed would be common.

| Approach | How It Works | Recommendation |
|---|---|---|
| Single `role` enum field | One value: buyer or seller | Avoid — doesn't support users who are both |
| Boolean flags (`is_seller`, `is_buyer`) | Independent true/false fields | Workable, simple |
| Separate `SellerProfile` relation | A User optionally has an attached SellerProfile | Better — keeps seller-specific fields (payout info, listing stats) out of the core User table |

> ✅ **Best practice for personal mode:** Use a `SellerProfile` relation, created the first time a user lists something. Every user starts as a buyer by default (just a User record); the moment they create their first listing, a linked SellerProfile is created. This keeps your core User table clean and means seller-specific data (payout details, seller-specific trust fields) doesn't bloat every account that never sells anything.

---

## What Belongs on the Core User Record vs. the Seller Profile

| Core User Record | Seller Profile (linked, optional) |
|---|---|
| Identity (email, auth ID) | Payout/Stripe Connect account ID |
| Display name, profile photo | Seller-specific bio or store description |
| Account status (active/suspended/banned) | Seller rating (if using seller-reviewed model) |
| Join date | Listing count, response time stats |
| Verification status (email confirmed, etc.) | — |

> 💡 **Tip:** Account status and verification belong on the core User record, not the seller profile, because they apply to behavior as a buyer too — a banned user shouldn't be able to buy, message, or browse just because the ban logic only lived on their seller profile.

---

## Profile Completeness as a Structural Field, Not a Calculation You Run Every Time

Your Buyer Journey module identified profile completeness as a trust signal buyers actually use. Don't calculate this on the fly by checking five fields every time a profile loads — store it.

| Approach | Trade-off |
|---|---|
| Calculate completeness on every page load | Simple but wasteful, and inconsistent if your "what counts" logic changes later |
| Store a `profile_complete` boolean, update on profile edit | Slightly more setup, but fast reads and consistent definition |

This matters more than it looks: profile completeness will be checked constantly — every listing page, every search result showing a seller badge. A stored field you update on write is cheap; a recalculation on every read adds up.

---

## Where Trust & Safety Enforcement Actually Lives

This is the direct implementation of your enforcement ladder from Trust & Safety Planning. Don't treat "banning a user" as a special, separate system — it should be a state on the User record you already built.

```
Account status values: active → suspended → banned
```

- **Active**: full access per their role
- **Suspended**: temporary — can browse, cannot list, message, or transact; should include a reason and an end date or manual-review flag
- **Banned**: permanent — cannot log in to take action, though historical data (past transactions, reviews) should be preserved, not deleted

> ⚠️ **Common mistake:** Deleting a user's account on ban instead of changing their status. Deleting breaks every transaction, review, and message they were ever part of — other users' order history shouldn't disappear because someone got banned. Status change preserves data integrity; deletion destroys it.

---

## AI Prompt: Designing Your User Schema

```
I'm building a personal-scale marketplace for [your niche] using
[your chosen stack].

Role model: single account, dual-role via optional SellerProfile
Trust signals needed on profile: [from your Buyer Journey module]
Account statuses: active, suspended, banned

Generate:
1. A User schema with the fields above, structured cleanly
2. A SellerProfile schema, linked optionally to User, containing only
   seller-specific fields
3. The logic for when a SellerProfile gets created (first listing)
4. A stored `profile_complete` field with the specific fields that
   should trigger it to recalculate

Keep account status and verification on the core User table, not the
seller profile — explain in one line why, so I can sanity check it
matches my reasoning.
```

---

## Common Mistake: Modeling for Roles You Decided Against

> ⚠️ If you chose single-account dual-role in Authentication, don't also build separate buyer and seller authentication flows "just in case." That decision is made — building both models simultaneously doubles your schema complexity for a flexibility you explicitly decided you don't need. Revisit Authentication if you're second-guessing this, but don't hedge by building both.

---

## What You Should Walk Away With

1. A finalized User schema with identity, status, and trust-signal fields
2. A SellerProfile relation, created on first listing, holding seller-specific data only
3. A stored profile completeness field, not a runtime calculation
4. Account status values that directly implement your Trust & Safety enforcement ladder

This schema is now the foundation for Authorization (next), where you'll define exactly what each account status and role combination is allowed to do.
