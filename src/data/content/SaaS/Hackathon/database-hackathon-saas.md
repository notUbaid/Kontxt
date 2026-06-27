# Phase 3 · Database

🕒 **Estimated Time:** 20 Minutes

---

> **Mode: Hackathon** — Your schema is designed. Now wire it up, seed it with data, and never think about it again.

This phase is execution, not design. Schema decisions belong in Phase 2. If you're making table changes here, stop — fix the schema first or you'll be migrating mid-build.

---

## The Phase 3 Database Principle

> The database should be invisible when it's working. Your goal is: connection confirmed, tables created, seed data loaded, queries tested — all before writing a single API route.

If your first query runs against real data before you write your first feature, you're in good shape.

---

## Step 1 · Spin up your database

### Supabase (recommended)

1. Go to [supabase.com](https://supabase.com) → New project
2. Pick a region close to your deployment (Vercel defaults to `us-east-1`)
3. Save the database password — you won't see it again
4. Wait ~2 minutes for provisioning

Grab these from Project Settings → API:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[password]@db.xxxx.supabase.co:5432/postgres
```

> `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. Server-side only. Never expose to the browser.

---

### PlanetScale / Neon (alternative)

If you're not using Supabase Auth, Neon is the fastest serverless Postgres alternative.

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## Step 2 · Run your migrations

Three ways to get your schema into the database. Pick one and don't mix them.

---

### Option A — Supabase SQL Editor (fastest for hackathons)

Paste your `CREATE TABLE` statements directly into the Supabase SQL Editor and run. No migration tooling, no CLI, no config files. This is the right call for a 48-hour build.

```sql
-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text UNIQUE NOT NULL,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        text NOT NULL,
  description text,
  status      text NOT NULL DEFAULT 'active',
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Index every foreign key you'll query by
CREATE INDEX ON projects(user_id);
CREATE INDEX ON projects(status);
```

---

### Option B — Prisma (if your team knows it)

Good if you want type-safe queries. Adds 20–30 minutes of setup. Only use it if someone on the team has done it before.

```bash
npm install prisma @prisma/client
npx prisma init
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now()) @map("created_at")
  projects  Project[]

  @@map("users")
}

model Project {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  name        String
  description String?
  status      String   @default("active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("projects")
}
```

```bash
npx prisma db push        # push schema to DB (no migration files)
npx prisma generate       # generate type-safe client
```

Use `db push` not `migrate dev` in a hackathon. Faster, no migration history to manage.

---

### Option C — Drizzle ORM (modern alternative to Prisma)

Lighter than Prisma, SQL-first, excellent TypeScript types. Use if your team prefers it.

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

```ts
// db/schema.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id:        uuid('id').primaryKey().defaultRandom(),
  email:     text('email').unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const projects = pgTable('projects', {
  id:          uuid('id').primaryKey().defaultRandom(),
  userId:      uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name:        text('name').notNull(),
  description: text('description'),
  status:      text('status').notNull().default('active'),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow(),
})
```

```bash
npx drizzle-kit push     # push schema directly to DB
```

---

## Step 3 · Seed your database with demo data

Empty databases make weak demos. Judges need to see your product working with real-looking data the moment they open it.

**Target:** 3–5 realistic users, 10–20 records per main entity, enough variety to show filtering, search, and different states.

---

### Seed script pattern (works with any ORM)

```ts
// scripts/seed.ts
import { db } from '../lib/db'

async function seed() {
  console.log('Seeding...')

  // Clear existing data (safe for development only)
  await db.delete(projects)
  await db.delete(users)

  // Create users
  const [alice, bob, carol] = await db.insert(users).values([
    { email: 'alice@example.com' },
    { email: 'bob@example.com' },
    { email: 'carol@example.com' },
  ]).returning()

  // Create projects with variety
  await db.insert(projects).values([
    { userId: alice.id, name: 'Launch campaign',    status: 'active',    description: 'Q1 product launch' },
    { userId: alice.id, name: 'Onboarding redesign', status: 'active',   description: 'Improve day-1 activation' },
    { userId: alice.id, name: 'API v2',              status: 'archived', description: 'Completed migration' },
    { userId: bob.id,   name: 'Data pipeline',       status: 'active',   description: 'ETL for analytics' },
    { userId: bob.id,   name: 'Auth refactor',       status: 'active',   description: 'Move to Clerk' },
    { userId: carol.id, name: 'Mobile app',          status: 'active',   description: 'iOS prototype' },
  ])

  console.log('Done.')
}

seed().catch(console.error)
```

```bash
npx tsx scripts/seed.ts
```

---

### Supabase SQL seed (fastest — paste directly into SQL Editor)

```sql
-- Seed users
INSERT INTO users (email) VALUES
  ('alice@example.com'),
  ('bob@example.com'),
  ('carol@example.com');

-- Seed projects (reference user IDs from above)
INSERT INTO projects (user_id, name, description, status)
SELECT
  u.id,
  p.name,
  p.description,
  p.status
FROM users u
CROSS JOIN (VALUES
  ('Launch campaign',     'Q1 product launch',        'active'),
  ('Onboarding redesign', 'Improve day-1 activation', 'active'),
  ('API v2',              'Completed migration',       'archived')
) AS p(name, description, status)
WHERE u.email = 'alice@example.com';
```

---

### AI prompt for seed data

```prompt
Generate realistic seed data SQL for this schema:

[paste your schema]

Requirements:
- 3 users with realistic names and emails
- 10–15 records in each main entity table
- Include variety: different statuses, different created_at dates (spread over last 30 days)
- Data should tell a coherent story — not random lorem ipsum
- Output: INSERT statements only, in dependency order (parents before children)
```

---

## Step 4 · Write and test your core queries

Before building any API route, test every query you'll need in the database UI. Catching a bad query here takes 30 seconds. Catching it inside an API route during a demo takes 10 minutes.

---

### Query patterns you'll use most

**Fetch all records for a user:**
```sql
SELECT * FROM projects
WHERE user_id = 'uuid-here'
ORDER BY created_at DESC;
```

**Fetch with a join (e.g. project + owner name):**
```sql
SELECT
  p.*,
  u.email as owner_email
FROM projects p
JOIN users u ON u.id = p.user_id
WHERE p.user_id = 'uuid-here'
ORDER BY p.created_at DESC;
```

**Fetch with filter + pagination:**
```sql
SELECT * FROM projects
WHERE user_id = 'uuid-here'
  AND status = 'active'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

**Count per status (for a dashboard stat):**
```sql
SELECT status, COUNT(*) as count
FROM projects
WHERE user_id = 'uuid-here'
GROUP BY status;
```

**Upsert (insert or update):**
```sql
INSERT INTO projects (id, user_id, name, status)
VALUES (gen_random_uuid(), 'uuid-here', 'New project', 'active')
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name, updated_at = now();
```

---

### Supabase JS client patterns

```ts
import { createClient } from '@/lib/supabase/server'

// Fetch all (with RLS — only returns user's own rows)
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false })

// Fetch with filter
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false })
  .limit(20)

// Fetch single record
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .single()

// Fetch with related data (join)
const { data } = await supabase
  .from('projects')
  .select('*, users(email)')
  .eq('id', projectId)
  .single()

// Insert
const { data, error } = await supabase
  .from('projects')
  .insert({ user_id: userId, name, description })
  .select()
  .single()

// Update
const { error } = await supabase
  .from('projects')
  .update({ name, updated_at: new Date().toISOString() })
  .eq('id', projectId)

// Delete
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId)
```

---

### Prisma query patterns

```ts
import { prisma } from '@/lib/prisma'

// Fetch all for user
const projects = await prisma.project.findMany({
  where: { userId },
  orderBy: { createdAt: 'desc' },
})

// Fetch with relation
const project = await prisma.project.findUnique({
  where: { id: projectId },
  include: { user: true },
})

// Create
const project = await prisma.project.create({
  data: { userId, name, description },
})

// Update
const project = await prisma.project.update({
  where: { id: projectId },
  data: { name, updatedAt: new Date() },
})

// Delete
await prisma.project.delete({ where: { id: projectId } })

// Count per status
const counts = await prisma.project.groupBy({
  by: ['status'],
  where: { userId },
  _count: true,
})
```

---

## Step 5 · Indexes — add the three you'll always need

Bad indexes = slow queries on demo day. Good indexes = instant results even on a cold DB.

Add indexes immediately after creating your tables. These three cover 90% of hackathon query patterns:

```sql
-- 1. Every foreign key you filter by
CREATE INDEX ON projects(user_id);
CREATE INDEX ON memberships(org_id);
CREATE INDEX ON memberships(user_id);

-- 2. Status/state columns you filter by
CREATE INDEX ON projects(status);
CREATE INDEX ON orders(status);

-- 3. Email lookups
CREATE UNIQUE INDEX ON users(email);  -- already created by UNIQUE constraint
```

**You do NOT need indexes on:**
- Primary keys (indexed automatically)
- Columns you never filter by
- Tables with fewer than 10,000 rows (hackathon scale — skip it)

---

## Step 6 · Database validation checklist

Run this before writing your first API route.

- [ ] Database is provisioned and accessible (not timing out)
- [ ] All tables created with correct column types and constraints
- [ ] Foreign key constraints verified (try inserting a row with an invalid FK — it should fail)
- [ ] Connection works from local environment (`.env.local` set correctly)
- [ ] Connection works from deployed environment (env vars set in Vercel/Railway)
- [ ] Seed data loaded — at least 10 rows in your main entity table
- [ ] RLS enabled and tested if using Supabase (try querying without auth — should return nothing)
- [ ] Core queries tested in database UI before building API routes
- [ ] Indexes added on foreign keys and status columns
- [ ] Service role key is NOT in any client-side code or committed to git

---

## Step 7 · Common database mistakes in hackathons

| Mistake | Consequence | Fix |
|---|---|---|
| Schema changes after API routes are written | Cascading breakage across queries and types | Finalize schema before Phase 3 |
| No seed data | Demo shows empty states, judges can't evaluate | Seed 10–20 rows before demoing |
| Querying in client components | Exposes DB credentials, bypasses RLS | All DB queries in server components or API routes |
| No error handling on queries | Silent failures during demos | Always destructure `{ data, error }` and check error |
| Using `.single()` when 0 rows is valid | Throws instead of returning null | Use `.maybeSingle()` for optional records |
| Forgetting `await` on async queries | Returns Promise object instead of data | TypeScript catches this — enable strict mode |
| Seeding with identical `created_at` | Ordering looks broken, dashboard stats are flat | Spread timestamps: `now() - interval '1 day' * i` |

---

## Quick reference — Supabase vs Prisma vs Drizzle

| | Supabase client | Prisma | Drizzle |
|---|---|---|---|
| Setup time | 5 min | 25 min | 20 min |
| Type safety | Partial (generated types) | Full | Full |
| Query style | Method chaining | Object API | SQL-like |
| RLS support | Native | Manual | Manual |
| Real-time | Built-in | No | No |
| Best for | Supabase projects | Teams who know it | SQL-comfortable devs |

---

## What comes next

**Phase 3 · Backend** — your database is live and seeded. Now build the API routes that sit between your database and your frontend. Every route will query the tables you just validated.
