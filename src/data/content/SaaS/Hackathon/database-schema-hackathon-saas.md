# Phase 2 · Database Schema

🕒 **Estimated Time:** 20 Minutes

---

> **Mode: Hackathon** — Design your schema before writing a single query. AI generates significantly better code when it has a clear schema to reason about.

The biggest time sink in hackathons isn't writing code — it's rewriting it because the schema was wrong. Spend 20 minutes here and save 3 hours later.

---

## The Hackathon Schema Principle

> A schema is a contract. Every table, column, and relationship you define here shapes every query, every API, and every UI component you'll build. Get it wrong early and you pay for it everywhere.

Schema decisions that are easy to change: column names, default values, adding new columns.

Schema decisions that are painful to change mid-hackathon: table structure, relationships, primary key types, and whether you used UUIDs or integers.

---

## Step 1 · Core patterns for SaaS schemas

Almost every SaaS schema is a variation of the same three patterns. Pick the one closest to your product.

---

### Pattern A — Single-tenant SaaS (one user, their data)

The simplest pattern. Every resource belongs to a user.

```sql
users
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  email       text UNIQUE NOT NULL
  created_at  timestamptz DEFAULT now()

[resource]                        -- e.g. projects, documents, entries
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
  [fields]
  created_at  timestamptz DEFAULT now()
  updated_at  timestamptz DEFAULT now()
```

**When to use:** personal productivity tools, solo dashboards, simple AI tools, note-taking apps.

---

### Pattern B — Multi-tenant SaaS (teams / workspaces)

Users belong to organizations. Resources belong to organizations, not users.

```sql
users
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  email       text UNIQUE NOT NULL
  created_at  timestamptz DEFAULT now()

organizations
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  name        text NOT NULL
  slug        text UNIQUE NOT NULL
  created_at  timestamptz DEFAULT now()

memberships                        -- join table: who belongs to which org
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
  org_id      uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
  role        text NOT NULL DEFAULT 'member'  -- 'owner', 'admin', 'member'
  created_at  timestamptz DEFAULT now()
  UNIQUE(user_id, org_id)

[resource]
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  org_id      uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
  created_by  uuid REFERENCES users(id)
  [fields]
  created_at  timestamptz DEFAULT now()
```

**When to use:** team tools, project management, shared workspaces, B2B SaaS.

---

### Pattern C — Marketplace / two-sided

Two actor types (buyers and sellers, or requesters and providers). One `users` table with a `role` field, or two separate profile tables.

```sql
users
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  email       text UNIQUE NOT NULL
  role        text NOT NULL DEFAULT 'buyer'  -- 'buyer' | 'seller' | 'admin'
  created_at  timestamptz DEFAULT now()

profiles                           -- extended info per user type
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id     uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE
  display_name text
  bio         text
  avatar_url  text

listings                           -- the thing being offered
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  seller_id   uuid NOT NULL REFERENCES users(id)
  title       text NOT NULL
  description text
  price_cents integer NOT NULL
  status      text DEFAULT 'active'  -- 'active' | 'sold' | 'archived'
  created_at  timestamptz DEFAULT now()

transactions
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  listing_id  uuid NOT NULL REFERENCES listings(id)
  buyer_id    uuid NOT NULL REFERENCES users(id)
  seller_id   uuid NOT NULL REFERENCES users(id)
  amount_cents integer NOT NULL
  status      text DEFAULT 'pending'  -- 'pending' | 'completed' | 'refunded'
  created_at  timestamptz DEFAULT now()
```

**When to use:** freelance platforms, product marketplaces, booking tools, service exchanges.

---

## Step 2 · Universal schema rules for hackathons

Follow these on every table, no exceptions.

---

### Always use UUIDs, never auto-increment integers

```sql
-- Do this
id  uuid PRIMARY KEY DEFAULT gen_random_uuid()

-- Not this
id  serial PRIMARY KEY
```

**Why:** integers expose row counts, are sequential (easy to enumerate), and cause pain when merging data across environments. UUID generation is free in Postgres.

---

### Always add `created_at` — add `updated_at` when content changes

```sql
created_at  timestamptz DEFAULT now()
updated_at  timestamptz DEFAULT now()  -- only on tables where rows are edited
```

Judges will ask "when was this created?" and "show me recent activity." You want these columns.

---

### Use `ON DELETE CASCADE` on foreign keys for owned resources

```sql
-- Resource is destroyed when its owner is destroyed
user_id  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE

-- Transaction should survive even if listing is deleted
listing_id  uuid NOT NULL REFERENCES listings(id) ON DELETE RESTRICT
```

Think: "if I delete the parent, what should happen to children?" Cascade for owned data. Restrict for financial records.

---

### Store money in cents (integers), never floats

```sql
price_cents   integer NOT NULL   -- 999 = $9.99
amount_cents  integer NOT NULL
```

Floating point math is wrong for money. `0.1 + 0.2 ≠ 0.3` in every language. Divide by 100 only at display time.

---

### Use `text` not `varchar(n)` in Postgres

```sql
-- Do this
title  text NOT NULL

-- Not this
title  varchar(255) NOT NULL
```

`varchar(n)` in Postgres has no performance benefit over `text`. The length constraint just creates migration pain when users hit it.

---

### Use `timestamptz`, not `timestamp`

`timestamptz` stores UTC and handles timezone conversion automatically. `timestamp` stores a naive datetime with no timezone — subtle bugs when your server and user are in different timezones.

---

## Step 3 · Status fields — use text enums, not booleans

Booleans (`is_published`, `is_active`) almost always grow into a status field within hours.

```sql
-- Avoid this
is_published  boolean DEFAULT false
is_active     boolean DEFAULT true

-- Do this instead
status  text NOT NULL DEFAULT 'draft'
-- valid values: 'draft' | 'published' | 'archived'
```prompt

When the hackathon brief changes and you need a third state, you'll thank yourself.

---

## Step 4 · AI prompts for schema generation

### Schema generation prompt

Use this after you have your PRD and user flows. The more context you give, the better the output.

```
Generate a Postgres schema for a [describe your SaaS in 1 sentence].

Users can: [list 3-5 core user actions from your MVP features]

Requirements:
- Use UUIDs for all primary keys (gen_random_uuid())
- Use timestamptz for all timestamps
- Add created_at to every table, updated_at only where rows are edited
- Store all monetary values as integer cents
- Use text not varchar
- Add ON DELETE CASCADE for owned resources, ON DELETE RESTRICT for records

Output:
- CREATE TABLE statements only (no indexes, no RLS yet)
- A short comment above each table explaining what it stores
- A list of the 3 relationships I should add indexes on
```prompt

---

### Schema review prompt

Run this after AI generates your schema, before writing any queries.

```
Review this Postgres schema for a hackathon SaaS MVP:

[paste your schema]

Check for:
1. Missing foreign key constraints
2. Columns that should be NOT NULL but aren't
3. Status/state fields that are boolean but should be text enums
4. Any relationship that will cause N+1 query problems
5. Anything that will make it hard to add auth row-level security later

Return: a numbered list of issues only. No praise. No rewriting unless I ask.
```prompt

---

### Supabase RLS prompt (if using Supabase Auth)

```
Generate Supabase Row Level Security policies for this schema:

[paste your schema]

My auth setup:
- auth.uid() returns the logged-in user's UUID
- Users should only read and write their own data
- [any additional rules, e.g. "org members can read all org resources"]

Output: SQL ALTER TABLE and CREATE POLICY statements only.
```

---

## Step 5 · ERD — core SaaS tables

A minimal reference for the most common SaaS table relationships.

```
users
  id (PK)
  email
  created_at
     |
     | 1:many (owned resources)
     |
[resource]         memberships (join)        organizations
  id (PK)            user_id (FK) ─────────── id (PK)
  user_id (FK)       org_id  (FK)             name
  ...fields          role                     slug
  created_at         created_at               created_at
```

---

## Step 6 · What NOT to add in a hackathon schema

These feel important but will eat your time and won't impress judges.

| Skip this | Reason |
|---|---|
| Soft deletes (`deleted_at`) | Add complexity to every query. Hard delete is fine for demos. |
| Audit log tables | No time to populate them meaningfully. |
| Normalization beyond 3NF | Premature. Denormalize if a query gets slow. |
| Full-text search columns | Use Postgres `tsvector` only if search is a core feature. |
| Composite primary keys | UUIDs everywhere, always. Composites cause ORM pain. |
| Versioning / history tables | Not needed for an MVP demo. |
| Partitioning | You won't have enough data. Ever. In a hackathon. |

---

## Step 7 · Pre-coding schema checklist

Run through this before writing your first query or API route.

- [ ] Every table has a `uuid` primary key with `DEFAULT gen_random_uuid()`
- [ ] Every table has `created_at timestamptz DEFAULT now()`
- [ ] Every foreign key has an explicit `ON DELETE` action defined
- [ ] No floats used for money — integer cents only
- [ ] All state/status fields are `text` not `boolean`
- [ ] Schema has been reviewed by AI using the review prompt above
- [ ] At least one end-to-end query tested in the Supabase/database UI before coding
- [ ] You know which 2-3 columns will need indexes (foreign keys, status, email)

---

## Quick reference — column type cheat sheet

| Data | Type to use | Notes |
|---|---|---|
| Primary key | `uuid DEFAULT gen_random_uuid()` | Always |
| Foreign key | `uuid NOT NULL REFERENCES table(id)` | Add `ON DELETE` action |
| Short text | `text NOT NULL` | Not `varchar` |
| Long text | `text` | Same type, nullable if optional |
| Money | `integer NOT NULL` | Cents. Divide at display time. |
| Timestamps | `timestamptz DEFAULT now()` | Not `timestamp` |
| Status/state | `text NOT NULL DEFAULT 'value'` | Not `boolean` |
| True/false | `boolean DEFAULT false` | Only when it's truly binary forever |
| JSON blob | `jsonb` | For flexible/dynamic fields only |
| Email | `text UNIQUE NOT NULL` | Add unique constraint |

---

## What comes next

**Phase 2 · Auth (optional)** — wire up Clerk or Supabase Auth. Do this before writing any protected API routes — retrofitting auth is one of the most painful mid-hackathon refactors.
