---
title: Database
slug: database
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 25-35 min
---

# Database

Phase 2 gave you a schema on paper. This module turns it into a real, running database — and gets it right the first time, because internal tools are notoriously bad at surviving a schema rewrite once real data exists in them.

By the end, you'll have a provisioned database, your tables created via migrations (not manual clicks), and a way to verify the AI didn't quietly get something wrong.

---

## The One Rule That Matters Most

**Every schema change goes through a migration file. Never through a dashboard click.**

This is the single highest-leverage habit for a solo internal tool. Dashboard edits feel faster today and cost you later — no history, no rollback, no way to reproduce your database if you switch machines or a hosting provider melts down.

> ️ **Warning:** It's tempting to add a column via your provider's web UI "just this once." That one column is the first thing you'll forget when you try to recreate the database six months from now.

---

## Choosing Your Migration Approach

For a personal internal tool, you want the lightest tool that still gives you version-controlled, repeatable schema changes.

| Approach | Best for | Personal-mode verdict |
|---|---|---|
| ORM migrations (Prisma, Drizzle) | TypeScript/JS stacks |  Recommended default — schema-as-code, type-safe queries |
| Raw SQL migration files | Any stack, full control |  Fine if you're comfortable with SQL directly |
| Provider's built-in migration tool | Supabase CLI, etc. |  Good if it's already part of your hosting choice |
| Manual dashboard changes | Nothing |  Avoid — no history, not reproducible |

If you haven't picked one yet, **Drizzle** or **Prisma** paired with Postgres (Supabase/Neon) is the most common, well-supported combination for solo builders right now — good docs, strong AI tooling support, minimal boilerplate.

---

## From Schema to Migration: The Workflow

1. Take your Phase 2 schema design (tables, columns, relationships)
2. Write it as your ORM's schema file (or raw SQL)
3. Generate a migration from that schema file
4. Review the generated SQL before applying it
5. Apply the migration to your database
6. Commit the migration file to version control

Step 4 is the one people skip. Don't.

---

## AI Prompt: Generate Your Initial Schema

Use this once, with your full Phase 2 schema design as input — not a vague description.

```
I'm building an internal tool database using [Postgres / your DB] with [Prisma / Drizzle / raw SQL].

Here is my schema design from planning:
[paste your Phase 2 database schema — tables, fields, relationships]

Generate the migration/schema file. Requirements:
- Use appropriate types for each field (not everything as text/string)
- Add NOT NULL constraints where a field is genuinely required
- Add foreign key constraints for every relationship
- Add indexes on foreign keys and any field I'll filter/sort by frequently
- Add created_at and updated_at timestamps on every table
- Use UUIDs for primary keys unless I specify otherwise
- Flag any part of my schema design that looks like it will cause problems at query time
```

**Why the last line matters:** this is where the AI catches things you didn't think to ask about — a missing many-to-many join table, a field that should be an enum instead of free text, a relationship that will require an expensive join on every query.

---

## Validating the Generated Schema

AI-generated schemas are usually structurally correct but commonly wrong in ways that don't show up until you have real data. Check for these specifically:

-  **Every foreign key has an index.** Missing FK indexes are the most common performance mistake in generated schemas — queries will work fine with 10 rows and slow down at 10,000.
-  **Nullable fields are actually optional in real life.** If a field is marked nullable "to be safe," decide deliberately — nullable fields push validation logic into your application code instead of your database.
-  **Enums are used for fixed value sets** (status, role, type fields) instead of free-text strings. Free text invites typos that silently break filters later.
-  **Cascade behavior on deletes is intentional**, not default. Ask: if I delete this parent row, should related rows delete too, be blocked, or be orphaned? The AI will pick a default — check it matches what you actually want.
-  **No table is missing `created_at`.** For an internal tool, you will eventually need to answer "when was this added" — retrofitting it is painful.

>  **Tip:** Open the raw SQL the migration generates, not just the schema file. The schema file shows intent; the SQL shows what actually gets created. They occasionally diverge in subtle ways with ORMs.

---

## Seed Data: Don't Skip This

An empty database makes every subsequent module (CRUD, forms, tables) harder to build and test, because you're staring at blank screens instead of realistic data.

Write a seed script that inserts:
- A handful of realistic rows per table (5–10, not 2)
- At least one edge case per table (a null optional field, a long text value, a boundary date)
- Enough related data to test your actual relationships — if Orders belong to Users, seed a User with multiple Orders, not one each

```
Generate a seed script for my schema that inserts realistic sample data:
[paste schema]

Include:
- 5-10 rows per table with realistic, varied values (not "Test 1", "Test 2")
- At least one row per table that exercises an edge case (empty optional field, long text, boundary date)
- Relationships that reflect real usage — e.g. some records with many related rows, some with none
```

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Editing the schema directly in the database dashboard | No history, can't reproduce, easy to forget what changed |
| Using `text` for everything instead of proper types | Loses validation, sorting, and storage efficiency |
| No indexes beyond the primary key | Fine at low volume, silently slow as data grows |
| Skipping seed data | Every later module gets harder to build and test without realistic data |
| Not committing migration files to git | Database state becomes undocumented and unreproducible |

---

## Before You Move On — Checklist

- [ ] Migrations are generated from a schema file, not written by hand in the dashboard
- [ ] Every foreign key has a corresponding index
- [ ] Enum-like fields use actual enums, not free text
- [ ] Delete/cascade behavior was reviewed, not left as AI default
- [ ] Migration files are committed to version control
- [ ] Seed script exists and produces realistic, varied data
- [ ] I've inspected the raw generated SQL, not just the ORM schema file

---

## What's Next

With a real, migrated, seeded database in place, you're ready to build the operations that actually read and write to it — starting with CRUD.
