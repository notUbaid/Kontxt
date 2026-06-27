---
title: Database
slug: database
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Database

Database Schema (Phase 2) decided the shape of your data. This module is about implementing that schema correctly — setting up your ORM, connection handling, migrations workflow, and the patterns that prevent the most common production database bugs: N+1 queries and partial writes from missing transactions.

---

## Decision 1: ORM / Query Layer

| Option | Tradeoff |
|---|---|
| Prisma | Excellent developer experience, strong typing, large ecosystem; adds an abstraction layer over raw SQL |
| Drizzle | Lighter weight, closer to SQL, strong typing, less "magic" | 
| Raw SQL with a query builder (Kysely) | Maximum control and performance visibility; more manual work for relations and migrations |

> ✅ **Best Practice**
> For most production SaaS teams, **Prisma or Drizzle** are the standard choice — both give you type safety against your actual schema, which catches a large class of bugs (typos in column names, wrong types) at compile time rather than at runtime in production.

---

## Decision 2: Connection Pooling

> ⚠️ **Warning**
> **Database connections are a finite resource**, and this matters more than beginners expect — especially on serverless hosting, where every function invocation can open a new connection. Without pooling, a traffic spike can exhaust your database's connection limit and start rejecting connections, including from parts of your app that were working fine seconds earlier.

- [ ] Use a connection pooler (PgBouncer, or your managed Postgres provider's built-in pooling — Supabase, Neon, and RDS Proxy all offer this) rather than connecting directly to Postgres from every server instance/function
- [ ] Set explicit pool size limits matching your database's actual connection capacity, not an arbitrary default

---

## Decision 3: Migrations in Practice

You decided to use a migration tool in Database Schema. Now apply the workflow:

> **Decision Card — Migration Workflow**
> 1. Write the migration locally, review the generated SQL — don't blindly trust auto-generated migrations, especially for anything destructive (dropping/renaming columns)
> 2. Run it against a local or staging database first
> 3. Only after verifying it works as expected, run it against production
> 4. Never hand-edit a production database schema outside this workflow, even for "a quick fix"

> ⚠️ **Warning**
> Renaming or dropping a column is the most common migration danger — if your application code deploys *after* the migration runs (or vice versa), there's a window where running code doesn't match the schema. For anything destructive, prefer a two-step approach: add the new column, migrate code to use it, then remove the old column in a separate, later migration.

---

## Decision 4: Seed Data

- [ ] A deterministic seed script for local development — consistent, realistic-looking test data, not empty tables
- [ ] **Never use real production data for local development or testing**, even anonymized, unless you have a deliberate, reviewed anonymization process — customer data shouldn't end up on developer laptops
- [ ] Seed script covers enough variety to exercise your multi-tenant model (multiple workspaces, multiple roles) so you're not accidentally testing only the single-tenant happy path

---

## Decision 5: Preventing N+1 Queries

> ⚠️ **Warning**
> The N+1 query problem — fetching a list, then querying again for each item's related data in a loop — is the single most common ORM performance bug, and it's invisible at small scale (10 rows: 11 queries, barely noticeable) and serious at real scale (10,000 rows: 10,001 queries).

- [ ] Use your ORM's eager-loading/`include` features to fetch related data in one query, not in a loop
- [ ] When reviewing AI-generated database code, specifically check any loop that contains a database call inside it — that's the N+1 pattern

---

## Decision 6: Transactions for Multi-Step Writes

> ✅ **Best Practice**
> Any operation that writes to multiple tables as one logical action (e.g., creating a workspace *and* its owner membership record) must happen inside a **database transaction**. If the second write fails after the first succeeds, without a transaction you're left with a workspace that has no owner — a partial, inconsistent state that's hard to recover from automatically.

---

## Common AI Mistakes to Watch For

- **Generates a loop with a database query inside it** — the N+1 pattern. Always check.
- **Writes multi-step operations without a transaction** — ask explicitly whenever more than one table is written to as part of one logical action.
- **Auto-generates destructive migrations** (drop column, rename) without flagging the risk or suggesting a safer two-step approach.
- **Assumes a direct database connection** with no pooling consideration, especially relevant if you're on serverless hosting.
- **Suggests seeding with "realistic" data that's actually scraped or copied from somewhere it shouldn't be** — always generate synthetic seed data.

---

## AI Prompt: Implement Database Setup

```
Set up the database layer for a production SaaS using [Prisma / Drizzle — your choice] against the schema from Database Schema.

Implement:
1. Connection setup using a connection pooler appropriate for [your hosting choice — note if serverless].
2. A seed script creating synthetic data: at least 2 workspaces, each with an owner, an admin, and a member, plus sample [core resource] records.
3. The repository-layer functions for [list 1-2 features] from Backend Architecture, using eager loading to avoid N+1 queries for any relation fetched in a list.
4. Any function that writes to more than one table (e.g., creating a workspace and its owner membership) wrapped in a transaction — show explicitly where the transaction boundary is.

Flag any place a migration would be destructive (column drop/rename) and suggest the safer two-step alternative.
```

---

## Validate Before You Move On

- [ ] Connection pooling is configured, sized appropriately for your hosting model
- [ ] Every migration has been reviewed (not just auto-generated and run blindly), especially destructive ones
- [ ] A seed script exists with synthetic, multi-tenant test data
- [ ] No loop in your codebase contains a database query that should be a single eager-loaded fetch
- [ ] Every multi-table write is wrapped in a transaction
- [ ] Local development never touches real production/customer data

> 💡 **Tip**
> Run your seed script regularly during development, not just once — it should be quick and repeatable so you're always testing against realistic, multi-tenant data instead of a hand-edited local database that's drifted from what production will actually look like.

---

**Next:** Auth — implement the authentication flows decided in Phase 2.
