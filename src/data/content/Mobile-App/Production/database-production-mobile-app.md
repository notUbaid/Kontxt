---
title: Database
slug: database
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 35–50 min
---

# Database

Your database is the only part of your system that cannot be easily replaced.

Frontend frameworks change. Backend languages change. Infrastructure moves. But the shape of your data — your tables, your relationships, your constraints — accumulates years of decisions that are expensive to undo. Getting the foundation right now costs hours. Getting it wrong costs months.

This module covers the database decisions that matter most for a production mobile app, and the patterns that prevent the most common and costly mistakes.

---

## Choosing Your Database

Most mobile apps should use PostgreSQL. This is not a controversial opinion — it is the industry default for good reasons.

| Database | When to Use It |
|---|---|
| **PostgreSQL** | Default choice. Relational, ACID-compliant, excellent JSON support, scales well. |
| **Firestore** | Document-shaped data, strong realtime requirements, already on Firebase. |
| **SQLite (on-device)** | Local-first apps, offline-first architecture, used alongside a server DB. |
| **Redis** | Caching, sessions, rate limiting, pub/sub — always alongside a primary DB, never instead of one. |

If you are on Supabase, you are on PostgreSQL. If you are on Firebase, you are on Firestore. If you built a custom backend, use PostgreSQL.

Do not use MongoDB for a new production mobile app unless you have a specific, well-reasoned requirement. The flexibility of a schema-less database is a liability when your data actually has structure — and most app data does.

---

## Schema Design Principles

### 1. Name things consistently

Pick a convention and apply it everywhere. The standard for PostgreSQL:

```sql
-- Tables: plural snake_case
users
posts
push_tokens
subscription_plans

-- Columns: snake_case
created_at
updated_at
user_id
stripe_customer_id

-- Primary keys: always "id"
-- Foreign keys: [table_singular]_id
user_id, post_id, plan_id
```

Inconsistent naming creates friction for every engineer who touches the codebase for the life of the product.

### 2. Every table needs these columns

```sql
CREATE TABLE posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- your columns
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  is_deleted  BOOLEAN NOT NULL DEFAULT FALSE  -- soft delete
);
```

- **`id` as UUID** — no sequential ID leakage, safe to expose in URLs
- **`created_at` and `updated_at`** — required for debugging, sorting, and sync
- **`updated_at` auto-update** via trigger:

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 3. Soft deletes over hard deletes

Hard deletes are irreversible and break foreign key references. Soft deletes preserve history and allow recovery.

```sql
-- Soft delete pattern
ALTER TABLE posts ADD COLUMN deleted_at TIMESTAMPTZ;

-- "Delete"
UPDATE posts SET deleted_at = NOW() WHERE id = $1;

-- Query (always filter deleted records)
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Or with is_deleted boolean (simpler to query):
UPDATE posts SET is_deleted = TRUE WHERE id = $1;
SELECT * FROM posts WHERE is_deleted = FALSE;
```

Add an index on your soft-delete column — every query filters by it:

```sql
CREATE INDEX idx_posts_not_deleted ON posts (id) WHERE is_deleted = FALSE;
```

### 4. Constraints at the database level

Never rely solely on application-level validation. The database is the last line of defence.

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);
```

---

## Mobile-Specific Schema Patterns

### Push tokens

One user, multiple devices, multiple platforms:

```sql
CREATE TABLE push_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       TEXT NOT NULL UNIQUE,
  platform    TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_push_tokens_user_id ON push_tokens (user_id);
```

### App versions and minimum version enforcement

```sql
CREATE TABLE app_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  version         TEXT NOT NULL,           -- e.g. "2.1.0"
  min_version     TEXT NOT NULL,           -- minimum supported version
  force_update    BOOLEAN NOT NULL DEFAULT FALSE,
  release_notes   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### User settings and preferences

Store as JSONB for flexibility — preferences evolve over time:

```sql
CREATE TABLE user_settings (
  user_id       UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  notifications JSONB NOT NULL DEFAULT '{"push": true, "email": true, "marketing": false}',
  preferences   JSONB NOT NULL DEFAULT '{}',
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Query specific fields:
```sql
SELECT notifications->>'push' AS push_enabled
FROM user_settings
WHERE user_id = $1;
```

### Sync timestamp for offline support

If your app supports offline mode, every synced table needs a server-side timestamp clients can use to fetch only changed records:

```sql
-- Client sends its last sync time, server returns only changed records
SELECT * FROM posts
WHERE user_id = $1
  AND updated_at > $2  -- $2 is the client's last sync timestamp
  AND is_deleted = FALSE
ORDER BY updated_at ASC;
```

---

## Indexing Strategy

Missing indexes are the most common cause of slow mobile APIs. A query that runs in 2ms on a 100-row table runs in 4 seconds on a 1M-row table without an index.

### Always index

```sql
-- Foreign keys (JOIN performance)
CREATE INDEX idx_posts_user_id ON posts (user_id);
CREATE INDEX idx_comments_post_id ON comments (post_id);

-- Columns in WHERE clauses
CREATE INDEX idx_posts_created_at ON posts (created_at DESC);
CREATE INDEX idx_users_email ON users (email);

-- Soft delete columns (partial index — only non-deleted rows)
CREATE INDEX idx_posts_active ON posts (user_id, created_at DESC)
  WHERE is_deleted = FALSE;

-- Status columns used in filtering
CREATE INDEX idx_orders_status ON orders (status)
  WHERE status IN ('pending', 'processing');
```

### Composite indexes

When you always filter by two columns together, a composite index is more efficient than two separate indexes:

```sql
-- If you always query: WHERE user_id = $1 AND created_at > $2
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);
```

### Verify your indexes are being used

```sql
EXPLAIN ANALYZE
SELECT * FROM posts
WHERE user_id = 'some-uuid'
  AND is_deleted = FALSE
ORDER BY created_at DESC
LIMIT 20;
```

Look for `Index Scan` in the output. `Seq Scan` on a large table means you have a missing index.

---

## Migrations

Every schema change must go through a migration. No direct database edits in production.

### With Prisma

```bash
# Create and apply a migration
npx prisma migrate dev --name add_push_tokens_table

# Apply migrations in production (CI/CD)
npx prisma migrate deploy
```

```prisma
// schema.prisma
model PushToken {
  id         String   @id @default(uuid())
  userId     String
  token      String   @unique
  platform   String
  createdAt  DateTime @default(now())
  lastUsedAt DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("push_tokens")
}
```

### Migration rules

- **Never edit a migration file after it has been applied.** Create a new migration to fix a mistake.
- **Every migration must be reversible** — or explicitly documented as irreversible.
- **Run migrations in staging before production.** If a migration breaks staging, it will break production.
- **Add new nullable columns, then backfill, then add constraints.** Never add a NOT NULL column to a large table in a single migration — it will lock the table.

```sql
-- Safe way to add a NOT NULL column to a large table
-- Step 1: Add nullable (no lock)
ALTER TABLE posts ADD COLUMN category TEXT;

-- Step 2: Backfill (run in batches if large table)
UPDATE posts SET category = 'general' WHERE category IS NULL;

-- Step 3: Add constraint (after backfill)
ALTER TABLE posts ALTER COLUMN category SET NOT NULL;
ALTER TABLE posts ALTER COLUMN category SET DEFAULT 'general';
```

---

## Backups

A production database without tested backups is not a production database.

### Automated backups

| Provider | Backup Included |
|---|---|
| Supabase | Daily backups on Pro plan. Point-in-time recovery on higher tiers. |
| Railway | Daily backups on paid plans. |
| Render | Daily backups on paid plans. |
| Neon | Branching + point-in-time recovery built in. |
| Self-managed | You are responsible — configure `pg_dump` on a schedule. |

### Test your backups

A backup you have never restored is a guess. Once per quarter:

```bash
# Restore a backup to a test database
pg_restore --clean --no-acl --no-owner \
  -d postgresql://localhost/myapp_backup_test \
  backup.dump

# Verify the restore
psql postgresql://localhost/myapp_backup_test \
  -c "SELECT COUNT(*) FROM users;"
```

---

## AI Prompt — Schema Review

```
You are a senior database engineer reviewing a PostgreSQL schema for a production mobile app.

My app: [one-sentence description]
Expected users at launch: [number]
Expected scale in 12 months: [DAU estimate]

Core entities and relationships:
[Describe your main tables and how they relate — e.g. "Users have many Posts.
Posts have many Comments. Users can follow other Users."]

My current schema:
[Paste your CREATE TABLE statements or Prisma schema]

Review my schema and identify:

1. Missing constraints or validation at the database level
2. Missing indexes for my likely query patterns — describe the queries you expect
   and which indexes would serve them
3. Columns that should be added to every table (created_at, updated_at, soft delete)
4. Any N+1 query traps in my relationship design
5. Any normalisation issues — over or under-normalised for my use case
6. Mobile-specific considerations: sync timestamps, push tokens, app version tracking

For each issue, provide the exact SQL or Prisma schema change.
```

---

## Validation Checklist

**Schema foundations**
- [ ] Consistent naming convention applied to all tables and columns
- [ ] Every table has `id` (UUID), `created_at`, and `updated_at`
- [ ] `updated_at` auto-updates via trigger or ORM hook
- [ ] Soft delete pattern implemented on all tables with user-generated content
- [ ] NOT NULL constraints on all required columns
- [ ] Unique constraints on columns that must be unique (email, username, tokens)
- [ ] CHECK constraints on columns with restricted values

**Mobile-specific tables**
- [ ] `push_tokens` table exists with user_id, token, platform, last_used_at
- [ ] User settings stored in a dedicated table or JSONB column
- [ ] Sync timestamp strategy defined for any offline-capable tables

**Indexes**
- [ ] All foreign key columns have indexes
- [ ] Columns used in WHERE clauses and ORDER BY have indexes
- [ ] Soft-delete columns use partial indexes
- [ ] `EXPLAIN ANALYZE` run on the 3 most frequent query patterns

**Migrations**
- [ ] ORM or migration tool configured (Prisma, Flyway, or raw SQL migrations)
- [ ] Migration files committed to version control
- [ ] Migrations tested on staging before production
- [ ] No direct schema edits planned for production — all changes go through migrations

**Backups**
- [ ] Automated daily backups confirmed on hosting provider
- [ ] Backup retention period meets your requirements (minimum 7 days)
- [ ] Restore process has been tested at least once
- [ ] Point-in-time recovery available or planned for production tier
