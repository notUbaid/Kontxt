---
title: Database Setup
slug: database-setup
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# Database Setup

Phase 2 chose your database engine and sketched your schema. This module is where that becomes a real, migration-managed schema with the indexes, constraints, and seed data your app actually runs against — set up in a way that survives the schema changing fifty more times before launch.

---

## Decision 1 — Migrations From Day One

> ⚠️ Never hand-edit a production (or shared dev/staging) database schema directly. Every schema change — even early in development — should go through a migration file, checked into version control. The cost of skipping this feels small on day one and becomes a real problem the first time two contributors (or you and an AI session) make conflicting schema assumptions, or the first time you need to reproduce the schema on a new environment.

Use your ORM/framework's migration tooling (Prisma Migrate, Drizzle Kit, Rails-style migrations, etc.) — don't hand-write raw SQL migrations unless your stack doesn't provide tooling for it.

```bash
# Example shape, tooling-agnostic
migrations/
  20260315120000_create_users.sql
  20260316093000_add_index_users_email.sql
  20260318140500_add_orders_table.sql
```

Each migration should be small and single-purpose — one logical change per file. Large, multi-table migrations are harder to review and harder to roll back cleanly if something's wrong.

---

## Decision 2 — Indexing Strategy

Indexes aren't an optimization to defer — design them alongside the schema, based on the query patterns your API endpoints (previous module) actually need.

| Index On | Why |
|---|---|
| Foreign keys (`user_id`, `order_id`, etc.) | Almost always queried/joined on — missing FK indexes is the most common cause of slow queries that "worked fine in testing" |
| Columns used in `WHERE` clauses on large tables | Direct query performance |
| Columns used for cursor pagination (the Decision 4 pattern from the APIs module) | Cursor pagination requires an efficient sort+filter, which needs a matching index |
| Unique constraints (email, username, slugs) | Both data integrity and free query performance |

> 💡 **Don't index everything reflexively** — every index has a write-cost (slower inserts/updates) and storage cost. Index based on actual query patterns from your API design, not speculatively on every column. If you're unsure, start with foreign keys and uniqueness constraints; add others once you see real query patterns from testing or early usage.

---

## Decision 3 — Constraints as the Real Validation Layer

Your APIs module decided server-side validation is the authority. The database is the layer underneath that — the last line of defense if application-level validation has a bug.

```sql
ALTER TABLE orders ADD CONSTRAINT positive_total CHECK (total >= 0);
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE order_items ADD CONSTRAINT fk_order
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
```

> ⚠️ **Decide your `ON DELETE` behavior explicitly for every foreign key**, don't accept whatever your ORM defaults to without checking. `CASCADE` (delete children automatically), `RESTRICT` (block deletion if children exist), and `SET NULL` (orphan the reference) have very different implications — a default `CASCADE` on a relationship that should `RESTRICT` can silently delete data you needed to keep.

---

## Decision 4 — Soft Delete vs Hard Delete

Decide per table, not globally — this should have been flagged conceptually in your Database module in Phase 2; now it gets implemented as an actual column/pattern.

| Approach | Use When |
|---|---|
| **Hard delete** | Data with no compliance/audit need, and no risk of accidental permanent loss mattering (e.g. a draft a user explicitly discards) |
| **Soft delete** (`deleted_at` timestamp) | User-generated content, financial records, anything with audit/recovery requirements, anything connected to other records that shouldn't break |

> 💡 If you choose soft delete for a table, every query against it needs a `WHERE deleted_at IS NULL` filter — bake this into your ORM's default scope/middleware rather than remembering to add it manually to every query. A missed filter on one query path is exactly how "deleted" data quietly reappears in production.

---

## Decision 5 — Seed Data for Development

Set up reproducible seed data now — this saves real time across the rest of Phase 3, since every screen you build needs realistic data to develop against.

```typescript
// seed.ts — run against local/dev DB only, never production
await db.user.createMany({ data: generateTestUsers(50) });
await db.product.createMany({ data: generateTestProducts(200) });
```

> ⚠️ Make seed scripts explicitly environment-gated — add a hard check that refuses to run against anything that looks like a production connection string. A seed script accidentally run against production is a real, recoverable-but-painful incident category.

---

## Decision 6 — Connection Management

Mobile apps generate bursty, high-concurrency connection patterns (many devices, intermittent connectivity causing retry storms). Decide this at setup, not after a connection-pool-exhaustion incident:

- Use connection pooling (PgBouncer for Postgres, or your platform's managed pooling if using a serverless/edge database) — don't let your backend open a raw connection per request under load.
- If your backend runs on serverless/edge compute, confirm your database supports the connection patterns that implies (cold starts opening many short-lived connections) — this is a common mismatch that surfaces only under real traffic, not local development.

---

## AI Prompts

### Prompt 1 — Schema + Migration Generation

```
Generate the database schema and initial migration for a production
mobile app with these entities: [list your core entities/relationships
from Phase 2's Database module]

Database: [Postgres/MySQL/etc.]
ORM: [Prisma/Drizzle/etc.]

For each table, specify: appropriate indexes based on these query
patterns [list expected queries from your APIs module], explicit
ON DELETE behavior for every foreign key, and which tables need soft
delete vs hard delete with justification.
```

### Prompt 2 — Schema Review

```
Review this database schema for production readiness:

[paste your schema/migration files]

Check for: missing indexes on foreign keys, foreign keys with unexamined
default ON DELETE behavior, missing unique constraints on fields that
need them, and any soft-delete tables where the default query scope
doesn't filter deleted_at.
```

---

## Validating AI Output

- [ ] Every schema change is a tracked migration file, not a direct/manual schema edit
- [ ] Every foreign key has an explicitly chosen `ON DELETE` behavior, not an unexamined default
- [ ] Foreign keys and frequently-filtered columns have indexes
- [ ] Soft-delete tables have a default query scope that filters `deleted_at`, applied consistently
- [ ] Seed scripts are environment-gated against accidentally running on production
- [ ] Connection pooling is configured appropriately for the backend's deployment model

---

## What's Next

- **Auth Implementation** (next in this phase) builds the user/session tables and logic on top of this schema.
- **Offline Features** will need to reconcile locally-cached data against this schema's structure — keeping field names/types consistent matters more once offline sync is in play.
- **Performance Optimization** (Phase 4) will revisit indexing based on real query performance data once the app has actual usage.
