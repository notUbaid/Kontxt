---
title: Database Schema
slug: database-schema
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 30–40 min
---

# Database Schema

Your schema is the hardest thing to change once you have real customer data in production. A bad API design can be deprecated and replaced. A bad schema means a migration with downtime risk, data backfills, and a window where bugs are easy to introduce. Spend real attention here.

---

## Decision 1: Multi-Tenancy Model

This is the most consequential decision in this module — it determines how isolated your customers' data is from each other.

| Model | How it works | Tradeoff |
|---|---|---|
| Shared schema, `tenant_id` column | One set of tables, every row tagged with a `workspace_id`/`tenant_id` | Simplest to build and migrate; isolation depends entirely on disciplined query filtering |
| Schema-per-tenant | Same database, separate schema per tenant | Better isolation; migrations must run per schema, gets unwieldy past a moderate number of tenants |
| Database-per-tenant | Fully separate database per tenant | Strongest isolation; highest operational overhead — not worth it until you have specific compliance requirements demanding it |

>  **Best Practice**
> Default to **shared schema with a `workspace_id` column on every tenant-scoped table**. It's the standard, proven approach for the vast majority of production SaaS. Reserve stronger isolation models for when a specific enterprise customer's compliance requirement actually demands it — don't pre-build for a requirement you don't have yet.

> [!WARNING]
> If you choose shared schema, **every single query against a tenant-scoped table must filter by `workspace_id`**, with no exceptions. This should be enforced at the data-access layer from Backend Architecture, not left to developer discipline per query — one missed filter is a cross-tenant data leak.

---

## Decision 2: Primary Keys

> **Decision Card**
> Use **UUIDs or ULIDs**, not auto-incrementing integers, for any ID that will ever appear in a URL or API response. This connects directly back to the Information Architecture decision to avoid sequential IDs in routes — enumeration attacks exploit predictable integer IDs.

| Type | Tradeoff |
|---|---|
| UUID v4 | Fully random, no information leakage, but not naturally sortable by creation time |
| ULID | Sortable by creation time (useful for default ordering), still effectively unguessable | 
| Auto-increment integer | Fast and simple, but predictable and leaks row counts/creation order — avoid for anything externally exposed |

---

## Decision 3: Standard Columns

Apply these consistently across every table, not decided per-table:

- [ ] `id` (UUID/ULID primary key)
- [ ] `created_at`, `updated_at` timestamps on every table
- [ ] `workspace_id` (or equivalent tenant key) on every tenant-scoped table, indexed
- [ ] A soft-delete strategy decision: `deleted_at` nullable timestamp, or hard deletes — pick one and apply consistently

> [!TIP]
> **Soft deletes** (`deleted_at`) are usually worth the small added complexity in production SaaS — they let you recover from accidental deletions and preserve referential integrity for historical records (e.g., an invoice referencing a since-"deleted" customer). Hard deletes are fine for genuinely disposable data (e.g., expired sessions).

---

## Decision 4: Money & Sensitive Values

> [!WARNING]
> **Never store currency amounts as floating-point numbers.** Floating-point rounding errors compound and will eventually produce incorrect charges. Store money as **integer cents** (e.g., `amount_cents: 1999` for $19.99) or a fixed-precision `decimal` type. This is a well-known, well-documented production mistake — verify any AI-generated schema doesn't default to `float` or `double` for money.

---

## Decision 5: Indexing Strategy

You don't need to index everything upfront, but these are non-negotiable:

- [ ] Every foreign key column is indexed (most ORMs don't do this automatically)
- [ ] `workspace_id` is indexed on every tenant-scoped table (it's in nearly every query's `WHERE` clause)
- [ ] Columns used in frequent filtering or sorting (e.g., `created_at` for default ordering) are indexed

> [!WARNING]
> Missing an index on a foreign key or tenant column is invisible at MVP scale (a handful of rows) and becomes a real performance problem the moment you have real data volume. This is cheap to get right now and expensive to discover later via a slow-query alert in production.

---

## Decision 6: Migrations

>  **Best Practice**
> Use a migration tool tied to your ORM/stack (Prisma Migrate, Drizzle Kit, Rails migrations, etc.) from the very first table. Never hand-edit a production schema directly. Every schema change should be a reviewable, versioned file — this is what lets you roll back, replicate the schema in a new environment, and know exactly what changed and when.

---

## Common AI Mistakes to Watch For

- **Forgets `workspace_id` on a tenant-scoped table** — check every table against your tenancy decision.
- **Uses auto-increment integers** for IDs by default — explicitly require UUID/ULID.
- **Stores money as float/double** — always check generated schemas for this.
- **Skips indexes on foreign keys** — most ORM-generated migrations don't add these automatically; verify.
- **Over-normalizes prematurely** — splits data into many small tables before you have a concrete query pattern that needs it, adding join complexity for no current benefit.

---

## AI Prompt: Generate Your Schema

```
Design a database schema for a production SaaS with these entities: [list your core entities, e.g., workspaces, users, workspace_members, invoices].

Requirements:
- Multi-tenancy model: shared schema with workspace_id on every tenant-scoped table
- Primary keys: UUID or ULID, not auto-increment integers
- Every table includes created_at and updated_at
- Soft deletes via a nullable deleted_at column on [list which tables need this]
- Any monetary value stored as integer cents, never float
- Index every foreign key and every workspace_id column explicitly — list the indexes you're creating
- Output as [your ORM's schema syntax, e.g., Prisma schema / Drizzle schema / SQL DDL]

For each table, briefly state which queries it's expected to support, so I can verify the indexes match real access patterns.
```

---

## Validate Before You Move On

- [ ] Every tenant-scoped table has a `workspace_id` column, and it's indexed
- [ ] No externally-exposed ID is a sequential integer
- [ ] Money fields use integer cents or fixed-precision decimal — never float
- [ ] Every foreign key has a corresponding index
- [ ] `created_at`/`updated_at` exist on every table
- [ ] Soft-delete strategy is applied consistently, not ad-hoc per table
- [ ] The schema is managed through a migration tool from the first commit

> [!TIP]
> This schema becomes the shared vocabulary for every future prompt — API Design, Backend implementation, and Testing should all reference these exact table and column names rather than re-describing your data model each time.

---

**Next:** API Design — define how this data is exposed and mutated over the network.
