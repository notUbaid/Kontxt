---
title: Listing System
slug: listing-system
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Listing System

## The Entity Your Entire Marketplace Revolves Around

Every other entity in your Architecture Fundamentals map either creates a Listing (User → SellerProfile), references one (Transaction, Message), or evaluates one (Review). Get the Listing schema right and most of the rest of your app has a stable foundation to build against. Get it wrong, and you'll be running database migrations every time a new requirement surfaces.

This module turns the friction map from your Seller Journey module and the approval model from Marketplace Policies into an actual schema and state machine.

---

## The Listing State Machine, Fully Specified

Your Architecture Fundamentals module argued for explicit status fields over scattered booleans. Here's that principle applied concretely.

```
Draft → Pending Approval → Active → Sold/Completed
                ↓                        ↓
            Rejected                  Removed
```

| Status | Meaning | Who Can See It |
|---|---|---|
| Draft | Seller is still filling it out, not submitted | Seller only |
| Pending Approval | Submitted, awaiting your manual review (per your Phase 1 approval model) | Seller + You |
| Active | Live, visible to buyers | Everyone |
| Sold/Completed | Transaction finished | Everyone (often shown differently, e.g. "sold") |
| Rejected | You declined it during review | Seller + You, with a reason |
| Removed | Taken down after being active (policy violation, seller choice) | Seller + You, with a reason |

> ⚠️ **Common mistake:** Allowing a listing to skip straight from Draft to Active, bypassing Pending Approval. If you decided on pre-approval in Marketplace Policies, this transition needs to be enforced in code — not just assumed because the UI doesn't expose a shortcut. Authorization, from the previous module, is exactly where this gets enforced: only your admin action can move a listing from Pending Approval to Active.

---

## Schema: What a Listing Actually Needs

This maps directly to the friction table from Seller Journey — required fields stay minimal, optional fields are added based on real buyer questions, not guessed in advance.

| Field | Required? | Source of This Decision |
|---|---|---|
| Title | Yes | Core listing info — minimal required set |
| Description | Yes | Core listing info |
| Price | Yes | Core listing info |
| Category | Yes | From a short list you define manually (per Seller Journey) |
| Photos (at least one) | Yes | Buyer Journey identified photos as a credibility signal |
| Seller ID (FK) | Yes (system-set) | Links to User Architecture |
| Status | Yes (system-managed) | The state machine above |
| Condition/availability specifics | No, start optional | Add only once buyers keep asking — per Seller Journey guidance |
| Created/updated timestamps | Yes | Needed for sorting, and for the "join date"-style trust signals |

> 💡 **Tip:** Resist adding fields because they "seem useful." Every required field is friction your Seller Journey module told you to minimize. Add optional fields reactively, based on actual buyer messages asking sellers questions — that data doesn't exist yet until you have real listings, so don't pre-guess it.

---

## Categories: Manual List, Not User-Generated

> ✅ **Best practice:** Define a fixed, short list of categories yourself rather than letting sellers type free-text categories. Free-text categories fragment immediately ("Electronics" vs "electronics" vs "Tech") and break search/filtering before you've even launched. A manually curated list of 5-15 categories, specific to your niche, is both easier to build and easier for buyers to browse.

---

## Photos: Storage Strategy Decided Now Saves Pain Later

Your Cost Estimation module flagged image storage/bandwidth as one of the two costs that actually bite personal-mode builders. The decisions here directly control that cost.

| Decision | Recommendation |
|---|---|
| Where photos are stored | Your chosen object storage (from Tech Stack Selection), never your database |
| Image compression | Compress/resize on upload, before storage — don't store original phone-camera resolution |
| Max photos per listing | Set a reasonable cap (e.g. 5-8) — unlimited photos invites unlimited storage cost |
| Required vs optional photo count | At least 1 required, per the credibility signal from Buyer Journey |

---

## Soft Delete, Not Hard Delete

When a listing is removed (by seller choice or moderation), don't delete the database row. This connects to the same principle from User Architecture: deleting breaks referential integrity for any Transaction, Message, or Review that references this listing.

```
Removed listings: status = "Removed", row stays in the database
```

A removed listing should disappear from buyer-facing search and browse, but remain queryable for transaction history, dispute resolution, and your own moderation records.

---

## AI Prompt: Designing Your Listing Schema and State Machine

```
I'm building a personal-scale marketplace for [your niche] using
[your chosen stack].

Approval model: [pre-approval / post-moderation, from Marketplace Policies]
Categories I'm starting with: [your list, or "not yet decided"]
Required fields from my friction map: [from Seller Journey]
Max photos per listing: [your number]

Generate:
1. A Listing schema with the fields above, using an explicit status
   field (not booleans) for the state machine: Draft, Pending Approval,
   Active, Sold/Completed, Rejected, Removed
2. The valid state transitions only — flag any transition that
   should NOT be allowed (e.g. Draft directly to Active)
3. Confirm photos should reference [my object storage choice], not be
   stored as binary data in the database

Keep this to what a solo developer ships at launch — flag clearly
which fields I should treat as deferred/optional rather than required.
```

---

## Common Mistake: Building Search Before the Listing Schema Is Stable

> ⚠️ It's tempting to jump straight into search/filtering once a basic listing form exists. Don't — your category list, required fields, and status values are exactly what search will filter and index against. Changing the Listing schema after search is built means rebuilding search too. Finalize this module fully before starting Search Architecture.

---

## What You Should Walk Away With

1. A finalized Listing schema with required and explicitly-deferred fields
2. A complete status state machine with enforced valid transitions
3. A fixed, manually-curated category list
4. A photo storage strategy with compression and a sane per-listing cap
5. Confirmation that listing removal uses soft delete, not hard delete

This schema is now a dependency for Search Architecture, Payments Architecture, and Messaging System — all three reference Listing directly. Treat changes to this schema as expensive from this point forward.
