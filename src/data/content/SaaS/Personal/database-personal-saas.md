# Database

**Estimated Time:** 25–35 min

---

Your database outlives your code.

You'll rewrite your frontend. You'll swap your backend framework. You'll change your API structure. Your database schema from day one will still be running three years later — carrying production data you can't just delete and restart.

Get the foundation right now.

---

## The Core Decision: What Kind of Database?

For personal SaaS, this is almost always already answered.

| Type | When to use |
|---|---|
| **Relational (SQL)** | Structured data, relationships between entities, anything with users + accounts + billing |
| **Document (NoSQL)** | Flexible/unstructured data, content that varies wildly per record |
| **Vector** | AI semantic search on top of another database |

> **For SaaS: use a relational database.** Users, subscriptions, workspaces, permissions — these are inherently relational. NoSQL makes joins painful and data integrity your problem instead of the database's.

---

## Provider Choice

| Provider | Free tier | Best for |
|---|---|---|
| **Supabase** | Generous, includes auth + storage | Full Supabase stack, quick setup |
| **Neon** | Always-free tier, serverless Postgres | Vercel/serverless deployments |
| **PlanetScale** | MySQL-compatible, branching | Teams, schema branching workflow |
| **Railway** | Simple, cheap | Personal projects, non-serverless |
| **Turso** | SQLite at the edge, ultra-cheap | Edge deployments, low traffic |

All of these are Postgres (or Postgres-compatible) except Turso.

> **Recommendation:** **Neon** if deploying on Vercel (serverless-native, connection pooling built in). **Supabase** if you want a full backend-in-a-box. Either is excellent for personal SaaS.

---

## ORM Choice

You should use an ORM. Writing raw SQL for every query in a solo project is a time sink with no meaningful benefit.

| ORM | Language | Best for |
|---|---|---|
| **Prisma** | TypeScript/JS | Best DX, excellent type safety, most popular |
| **Drizzle** | TypeScript/JS | Lightweight, SQL-like syntax, faster than Prisma |
| **SQLAlchemy** | Python | FastAPI / Python backends |
| **Django ORM** | Python | Django projects only |

> **Recommendation:** **Prisma** for JS/TS. Schema-first, auto-generated types, migrations built in. Drizzle if you want something closer to raw SQL with types.

---

## Schema Design Fundamentals

### Every table needs these fields

```
id          — primary key (cuid2 or uuid, not auto-increment integer)
created_at  — timestamp, set automatically on insert
updated_at  — timestamp, updated automatically on every change
```

Why `cuid2` or `uuid` over integer IDs:
- Safe to expose in URLs (no enumeration attack: `/users/1`, `/users/2`)
- Works across distributed systems without collision
- Doesn't leak record count to users

---

### The Multi-Tenancy Question

Every SaaS has a concept of "who does this data belong to?"

The two most common models:

**User-level isolation** — data belongs to a single user

```
posts
  id
  user_id   ← every row tied to one user
  title
  content
  created_at
```

**Workspace/Organization-level isolation** — data belongs to a team

```
workspaces
  id
  name
  created_at

workspace_members
  workspace_id
  user_id
  role          ← owner, admin, member

posts
  id
  workspace_id  ← data belongs to workspace, not user directly
  created_by    ← which user created it
  title
  content
  created_at
```

> Decide this now. It affects every table you design. Switching from user-level to workspace-level six months in means migrating every table and rewriting every query.

If your SaaS will ever have teams or multiple users sharing data → design for workspaces from day one.

---

### Relationships

Three types. Know when you need each.

**One-to-many** — one user has many posts

```
users (1) → posts (many)
posts.user_id references users.id
```

**Many-to-many** — users belong to many workspaces, workspaces have many users

```
users (many)  workspaces (many)
Needs a junction table: workspace_members
  workspace_id
  user_id
  role
  joined_at
```

**One-to-one** — user has one profile

```
users (1) → profiles (1)
profiles.user_id references users.id (unique constraint)
```

>  Many-to-many relationships always need a junction table. Never store arrays of IDs in a column. That's the NoSQL instinct creeping in — fight it.

---

## Soft Deletes

Most SaaS apps should not hard-delete records.

Hard delete: `DELETE FROM posts WHERE id = ?` — gone forever.

Soft delete: add a `deleted_at` column. Set it to the current timestamp instead of deleting the row.

```
posts
  id
  deleted_at    ← null = active, timestamp = deleted
```

Why:
- Users can restore accidentally deleted data
- Audit trails stay intact
- Foreign key references don't break
- GDPR compliance is simpler (you control what "deleted" means)

**Tradeoff:** Every query must filter `WHERE deleted_at IS NULL`. Your ORM can handle this with a default scope — set it up once.

---

## Indexes

An index makes reads fast. Without them, your database scans every row.

**Always index:**
- Foreign keys (`user_id`, `workspace_id`)
- Columns you filter by frequently (`status`, `email`, `slug`)
- Columns you sort by (`created_at`)

**Don't blindly index everything:**
- Indexes slow down writes
- Indexes use storage
- Only index columns your queries actually use

> Prisma adds indexes via `@@index([column])` in your schema. Add them when you define the table, not when queries start getting slow.

---

## Migrations

A migration is a versioned, reproducible change to your schema.

Never edit your database directly in production. Always:

1. Write a migration file
2. Test it locally
3. Apply it to staging
4. Apply it to production

Prisma handles this with `prisma migrate dev` (local) and `prisma migrate deploy` (production).

**Safe migrations vs dangerous ones:**

| Safe | Dangerous |
|---|---|
| Adding a new table | Dropping a table |
| Adding a nullable column | Dropping a column |
| Adding an index | Renaming a column |
| Adding a new enum value | Changing a column type |

> Renaming a column is one of the most dangerous operations. Your old code references the old name. Your new code references the new name. There's a window where both are running. The safe pattern: add the new column, migrate data, deprecate the old column, drop it later.

---

## Schema Design Prompt

```prompt
You are a senior database architect helping me design a PostgreSQL schema for my SaaS.
My SaaS: [what your app does in 2–3 sentences]
Core features:
[list features from your PRD]
Multi-tenancy model: [user-level / workspace-level / both]
Auth provider: [Clerk / Auth.js / Supabase Auth / other]
ORM: [Prisma / Drizzle / other]
Please generate:
1. A complete list of tables with all columns, types, and constraints
2. All relationships clearly labeled (one-to-many, many-to-many)
3. Junction tables for any many-to-many relationships
4. Recommended indexes per table
5. Which tables should have soft delete (`deleted_at`)
6. Any normalization issues or design concerns to flag
Output as a structured schema description in Markdown. No SQL or Prisma schema code yet — decisions and structure only.
```

---

## Validating the AI Output

When your AI generates a schema, review against:

- [ ] Every table has `id`, `created_at`, `updated_at`
- [ ] IDs are `cuid2` or `uuid` — not integers
- [ ] Every foreign key is present and named clearly
- [ ] No arrays of IDs stored in a column
- [ ] Many-to-many relationships have junction tables
- [ ] Columns you'll filter by have indexes
- [ ] Sensitive fields identified (will they need encryption?)
- [ ] Soft delete columns present on appropriate tables
- [ ] No storing file contents — only URLs/keys to object storage

Common AI schema mistakes:
- Auto-increment integer IDs (exposes record count)
- Missing `updated_at` on mutable tables
- Skipping junction tables (suggesting `tags TEXT[]` instead of a `post_tags` table)
- Over-normalizing simple data (creates joins you'll never need)
- Under-indexing foreign keys

---

## Seeding

Your database needs realistic fake data to develop against.

A seed file creates:
- Test users
- Sample workspaces
- Example records per feature

In Prisma: `prisma/seed.ts` — runs with `prisma db seed`.

Write your seed file before you write your first query. Developing against an empty database is slow and hides bugs.

---

## Sensitive Data

Identify now which fields need special treatment:

| Data type | Handling |
|---|---|
| Passwords | Never store — your auth provider handles this |
| API keys / secrets | Encrypt at rest, never log |
| Personal data (email, name) | Consider encryption for GDPR-sensitive deployments |
| Payment info | Never store — Stripe handles this |

> If you're using Clerk, Auth.js, or Supabase Auth — you don't store passwords. Ever. Your `users` table stores a reference to the auth provider's user ID, not credentials.

---

## Backups

Your provider handles automated backups. Verify before going live:

- [ ] Supabase: daily backups on free tier (7-day retention on Pro)
- [ ] Neon: point-in-time restore on paid tier
- [ ] Neon free tier: no PITR — export manually or use a script

For a personal SaaS: know what your backup window is. If you're on a free tier with no automatic backups, set up a weekly `pg_dump` to your object storage.

---

## Architecture Checklist

Before moving to development:

- [ ] Database provider chosen and account created
- [ ] ORM chosen
- [ ] Multi-tenancy model decided (user-level vs workspace)
- [ ] Core tables identified with all columns
- [ ] Relationships mapped
- [ ] Indexes planned
- [ ] Soft delete decision made per table
- [ ] Sensitive fields identified
- [ ] Backup strategy confirmed
- [ ] Seed strategy planned

---

## What to Build Next

Phase 2 Architecture is complete. You've made decisions on:
- Tech Stack
- Auth
- Database ← you are here
- APIs
- Storage

Next is **Phase 3 — Development**. You'll turn every architecture decision into working code — starting with your actual database migrations and seed data.
