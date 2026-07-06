---
title: Database Architecture
slug: database-architecture
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 20 min
---

# Database Architecture

Your resource map from **API Resources** is about to become a real schema. This is the step where a design mistake is most expensive to fix later — migrating a live database's structure is harder than changing an endpoint's response shape, because it risks real data, not just a contract. Get the shape right now.

## From Resource Map to Schema

Each resource becomes a table. Each relationship from your resource map becomes a foreign key. This translation is mostly mechanical if your resource map was done properly in Phase 1:

```
Resource Map (from API Resources):
Subscription (1) ──has many──> Webhook Event (many)

Becomes:

subscriptions
  id (PK)
  owner_id (FK, indexed — see Authorization Strategy)
  city
  threshold
  units
  created_at

webhook_events
  id (PK)
  subscription_id (FK → subscriptions.id, indexed)
  payload
  delivered_at
```

Every foreign key that represents an ownership relationship (like `owner_id`) needs an index — this is what makes your **Authorization Strategy** ownership checks fast instead of scanning full tables as your data grows.

## Naming Conventions: Match Your API Standards, Deliberately Diverge Where It Matters

Your database naming doesn't have to mirror your API's response field names exactly, and often shouldn't — this is the boundary you established in **Response Design** ("never let your response shape directly mirror your database schema"). Common convention: `snake_case` for database columns regardless of what casing your API responses use, since most SQL databases are case-insensitive by default and snake_case avoids quoting headaches.

- [ ] Table names: plural, snake_case (`subscriptions`, `webhook_events`)
- [ ] Every table has a primary key, consistent type across all tables (all UUID, or all auto-incrementing integers — pick one)
- [ ] Every foreign key is named `{referenced_table_singular}_id`

## IDs: Decide the Type Here, Not in Code

This connects directly to a decision you made in **API Standards** — your database ID type and your API's public ID format don't have to match, but the relationship needs to be deliberate:

| Database ID | Public API ID | Why |
|---|---|---|
| Auto-incrementing integer | Same integer, exposed directly | Simplest, but leaks record count/growth rate to callers |
| UUID | Same UUID, exposed directly | No leakage, but longer, less readable in logs |
| Auto-incrementing integer (internal) | Prefixed string like `sub_1a2b3c` (public) | Best of both — efficient internally, clean and non-guessable externally |

The third pattern — internal integer, public prefixed string — is what Stripe and similar APIs use, and it's worth adopting even for a personal project: it prevents callers from guessing adjacent IDs (a real security concern connected to the authorization risks covered in **Authorization Strategy**) while keeping your database efficient.

## Timestamps: Non-Negotiable on Every Table

Every table gets `created_at`, and `updated_at` where records are ever modified. This isn't optional polish — you'll need this for debugging, for `Usage Tracking` in this phase, and for basic operational sanity. Add it now; retrofitting timestamps onto a table with existing untimestamped data is a genuinely annoying migration.

## Constraints Belong in the Database, Not Just the API

Your **Request Design** module specified constraints like "`threshold` must be > 0." Enforce that at the database level too, not only in your API's validation layer:

```sql
ALTER TABLE subscriptions ADD CONSTRAINT threshold_positive CHECK (threshold > 0);
```

> **Warning:** Validation only in application code means a bug in your code, or a direct database write (during debugging, a migration script, an admin tool) can silently insert invalid data. Database constraints are your last line of defense — cheap to add now, and they catch mistakes your application logic didn't anticipate.

## Personal Mode: Don't Over-Normalize

Textbook database design pushes toward maximum normalization — every repeated value in its own table. For a personal project, some deliberate denormalization is fine if it keeps your schema simple and matches how you'll actually query it. Normalize where it prevents real data inconsistency (like a `city` name typo'd two different ways); don't normalize reflexively for every field.

## AI Prompt: Generate the Schema

```
My resource map: "[paste from API Resources]"
My field specs: "[paste from Request Design / Response Design]"

Generate a database schema:
1. One table per resource, snake_case naming, with appropriate columns and types
2. Foreign keys for every relationship, with indexes on any column used for ownership checks
3. Database-level constraints matching the validation rules I specified in Request Design
4. created_at/updated_at on every table

Output as SQL DDL or Prisma schema, matching [your chosen ORM/database from Tech Stack Selection].
```

## Before You Continue

- [ ] Every resource has a corresponding table with consistent ID typing
- [ ] Foreign keys used for ownership checks are indexed
- [ ] Constraints from Request Design are enforced at the database level, not just in application code

When all three are checked, move to **Authentication Architecture**.
