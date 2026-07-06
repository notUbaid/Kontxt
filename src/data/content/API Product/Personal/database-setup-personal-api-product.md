---
title: Database Setup
slug: database-setup
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# Database Setup

**Database Architecture** designed your schema on paper. This module turns it into a real, running database — with the tooling in place to change that schema safely as your project evolves, instead of hand-editing tables and losing track of what changed.

## Migrations, Not Manual Schema Edits — From the First Table

The single most important habit to establish here: every schema change goes through a migration file, checked into your project, never a manual edit run directly against your database. This matters even for a solo personal project, for one specific reason — it's the only reliable way to recreate your exact schema if you ever need to (a new environment, a teammate joining later, recovering from a mistake).

```
With an ORM like Prisma:
  1. Edit your schema file (schema.prisma)
  2. Run the migration generator — it creates a versioned migration file
  3. Apply it to your database
  4. Commit both the schema file and the migration file to git
```

> **Warning:** Manually running `ALTER TABLE` directly against your database, without a corresponding migration file, means your schema and your codebase silently drift apart. Six months from now, you won't remember which one is correct — and neither will an AI tool trying to help you debug a mismatch.

## Seed Data: Build It Alongside Your Schema

You'll need realistic test data to actually exercise your API during implementation — don't wait until you're debugging a specific issue to create it ad hoc.

```
seed.js (or equivalent):
  - Create 2-3 sample owners (test callers)
  - Create sample resources for each, covering normal cases
  - Include at least one edge case (e.g., a subscription with a boundary threshold value)
```

> **Tip:** Include an edge case in your seed data deliberately — an empty list, a maximum-length string, a boundary numeric value. Testing only against "happy path" seed data means your first encounter with an edge case is a real caller hitting it, not you catching it in development.

## Connection Handling: Don't Reinvent This

Use your framework/ORM's built-in connection pooling rather than managing raw database connections yourself. Connection management bugs (leaked connections, exhausted pools) are a classic source of mysterious "works fine, then randomly fails under load" issues — and they're already solved correctly by mature tooling. Don't write custom connection logic for a personal API product; there's no benefit to match the real risk.

- [ ] Using your ORM/framework's standard connection pooling, not custom connection code
- [ ] Database credentials are in environment variables, never hardcoded or committed to git

> **Warning:** A database connection string committed to your git history — even in a personal, private repository — is a real credential leak risk the moment that repository is ever made public, forked, or shared. Use environment variables and a `.gitignore`'d `.env` file from the very first commit, not "before launch."

## Verify the Schema Matches Your Design, Not Just That It Runs

After running your initial migration, don't just confirm the database accepted it — cross-check it against what you actually specified in **Database Architecture**:

- [ ] Every table from your resource map exists, with correct column types
- [ ] Foreign keys are present and correctly indexed (check this explicitly — a missing index here won't cause an error, just a silent performance problem later)
- [ ] Constraints (like your `threshold > 0` check) are actually enforced — test by attempting to insert invalid data and confirming it's rejected

## Personal Mode: A Local or Free-Tier Hosted Database Is Enough

You don't need a production-grade managed database cluster for building and testing. A local Postgres instance (or SQLite, if that's what you chose) for development, with a free-tier hosted instance for your actual deployed API, is entirely sufficient — matching what you already decided in **Tech Stack Selection** and **Cost Estimation**.

## AI Prompt: Generate Migration and Seed Files

```
My finalized schema: "[paste from Database Architecture]"
My ORM/framework: [from Tech Stack Selection]

1. Generate the initial migration file(s) for this schema.
2. Generate a seed script creating 2-3 realistic sample records per resource, including at least one deliberate edge case per resource.
3. Confirm all foreign keys used for ownership checks have appropriate indexes.
```

## Before You Continue

- [ ] My schema is applied through a versioned migration, not a manual edit
- [ ] I have seed data including at least one edge case, ready to use during implementation
- [ ] Database credentials live in environment variables, never committed to git

When all three are checked, move to **Authentication Implementation**.
