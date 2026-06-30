---
title: Database
slug: database
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 25–30 min
---

# Database

## Turning Five Modules of Decisions Into One Schema

You haven't been avoiding database design — you've been doing it incrementally, across User Architecture, Listing System, Payments Architecture, Messaging System, and Dispute Resolution. This module consolidates those into one coherent, migration-ready schema, and catches the inconsistencies that only show up when you see everything together.

This is implementation, not new design. If you find yourself making a genuinely new architectural decision here, that's a signal to pause and check whether an earlier module actually resolved it.

---

## The Full Entity List, Consolidated

| Entity | Defined In | Key Relationships |
|---|---|---|
| User | User Architecture | Root entity |
| SellerProfile | User Architecture | Belongs to User (optional, created on first listing) |
| Listing | Listing System | Belongs to User (seller) |
| Transaction | Payments Architecture | References buyer (User), seller (User), Listing |
| Thread | Messaging System | References Listing, buyer (User), seller (User) |
| Message | Messaging System | Belongs to Thread, sender (User) |
| Review | Reviews & Ratings | References Transaction, reviewer (User), reviewee (User) |

> 💡 **Tip:** This table is your literal entity-relationship diagram in words. Before writing migrations, draw this out visually — even a rough sketch — and check it against every "depends on" arrow from your Architecture Fundamentals module. A consolidated schema is where missing foreign keys get caught cheaply, before they're caught by a production bug.

---

## Status Fields: Verify the Discipline Held

Architecture Fundamentals argued for explicit status fields over scattered booleans. Across five modules of design, verify that discipline was actually applied consistently — this is exactly the kind of thing that drifts when decisions are made in separate sessions.

- [ ] Listing: single `status` field (Draft, Pending Approval, Active, Sold/Completed, Rejected, Removed) — not separate booleans
- [ ] Transaction: single `status` field (Initiated, Payment Held, Completed, Disputed, Resolved-*) — not separate booleans
- [ ] User: single `account_status` field (Active, Suspended, Banned) — not separate booleans

> ⚠️ **Common mistake:** Discovering at this stage that one entity quietly became boolean-based while you were focused on a different module's logic. Fix this now, in the schema, before any code is written against it — migrating away from booleans after the application layer exists is significantly more painful.

---

## Foreign Keys and Referential Integrity

Every "soft delete, not hard delete" decision from earlier modules depends on your database actually enforcing referential integrity, not just your application code remembering to behave correctly.

| Relationship | Constraint |
|---|---|
| Listing.seller_id → User.id | Required, never null |
| Transaction.listing_id → Listing.id | Required — a transaction always references a real listing |
| Transaction.buyer_id, seller_id → User.id | Both required |
| Review.transaction_id → Transaction.id | Required — enforces the "must have transacted" rule from Reviews & Ratings |
| Message.thread_id → Thread.id | Required |

> ✅ **Best practice:** Enforce these as actual database-level foreign key constraints, not just application-level checks. Application code has bugs; database constraints don't have exceptions. This is your last line of defense against the exact orphaned-record problems that "soft delete" was designed to prevent.

---

## Indexes: Consolidate What Each Module Already Specified

You already decided most of these individually. This is the checklist that confirms none were missed in implementation.

- [ ] Listing: full-text index on title+description, standard index on category, status, price (per Search Architecture)
- [ ] Transaction: index on buyer_id, seller_id, status (for "my transactions" queries and the disputed-past-48h check)
- [ ] Thread: index on buyer_id, seller_id (for "my conversations" queries)
- [ ] User: unique index on email/identity field

---

## Migrations: Write Them as You Go, Not All at Once

> ⚠️ Don't write one giant initial migration covering every entity and call it done. Build incrementally — User and auth first (matching your build order from Auth Implementation), then Listing, then Transaction, and so on. This mirrors your actual development order and means each migration is small enough to actually review before running it against real data.

---

## AI Prompt: Generating the Consolidated Schema

```
I'm implementing the database for a personal-scale marketplace using
[your stack/ORM].

Here are my entities and their key decisions from earlier planning:
- User: [paste fields from User Architecture]
- SellerProfile: [paste fields]
- Listing: [paste fields and status values from Listing System]
- Transaction: [paste fields and status values from Payments Architecture]
- Thread/Message: [paste fields from Messaging System]
- Review: [paste fields from Reviews & Ratings]

Generate migration files for these entities, in dependency order
(User first, then entities that reference it). For each entity:
1. Use a single status field where I specified a state machine, not
   separate booleans
2. Add foreign key constraints with appropriate required/nullable
   rules
3. Add the indexes I've specified for search and common queries

Flag any inconsistency you notice across these entities — e.g. a
status that's only sometimes explicit, a missing foreign key.
```

---

## Common Mistake: Skipping the Consolidation Step Entirely

> ⚠️ Going straight from individual module decisions to scattered migrations, written as each feature is built in isolation, is how cross-entity inconsistencies survive into production. The five minutes spent reviewing the consolidated table above, before writing any migration, is the cheapest bug prevention in this entire phase.

---

## What You Should Walk Away With

1. A consolidated schema covering all seven core entities, with relationships explicit
2. Confirmed explicit status fields (not booleans) across Listing, Transaction, and User
3. Database-level foreign key constraints, not just application-level checks
4. Indexes matching every decision made in Search Architecture and elsewhere
5. Migrations written in dependency order, matching your actual build sequence

Backend, next, is where this schema gets wrapped in the actual API logic — authorization checks, business rules, and the endpoints your Frontend will call.
