---
title: Database Architecture
slug: database-architecture
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# Database Architecture

Your database schema is the hardest thing to change after launch. UI can be redesigned in a day. A bad schema requires a migration, a backfill, and careful coordination to fix — at any scale.

Get this right before you write application code. The schema drives everything: your API shape, your query patterns, your performance characteristics, your access control model.

---

## Think in Entities, Not Tables

Before writing SQL or Prisma schema, map your domain in plain language.

Ask: **what are the core things my application manages?**

For a typical SaaS:
- Users (who uses the app)
- Organizations / Teams (who owns data)
- The primary resource (projects, documents, campaigns — whatever your app is for)
- Relationships between them

Draw this on paper or a whiteboard first. Tables are an implementation detail. Entities and their relationships are the design.

---

## Multi-Tenancy: The Decision That Shapes Everything

If your app serves multiple organizations or teams, you have a multi-tenancy problem. Decide your isolation model before writing a single table.

### Option 1: Row-Level Isolation (Recommended for most SaaS)
All tenants share the same database and tables. Every table has an `organization_id` column. Access control is enforced at the query level.

```
users → organization_members → organizations
                                      ↓
                              projects (organization_id)
                                      ↓
                              tasks (project_id)
```

**Pros:** Simple to implement, easy to query across tenants for analytics, cheap.
**Cons:** A bug in access control leaks data across tenants. Requires Row Level Security (RLS) or careful query discipline.

### Option 2: Schema-Per-Tenant
Each organization gets its own PostgreSQL schema. Tables are identical, just namespaced.

**Pros:** Stronger data isolation.
**Cons:** Complex migrations (must run against every tenant schema), harder to query across tenants, more infrastructure overhead.

### Option 3: Database-Per-Tenant
Each organization gets its own database.

**Pros:** Maximum isolation, can scale independently.
**Cons:** Extremely complex to operate. Only justified for enterprise customers with contractual data isolation requirements.

**For most production web apps: Row-Level Isolation with Supabase RLS.**

---

## Core Schema Patterns

### Users and Authentication

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatarUrl     String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  memberships   OrganizationMember[]
  sessions      Session[]

  @@map("users")
}
```

**Don't store passwords.** Your auth provider (Supabase Auth, Auth.js) manages credentials. Your `users` table stores profile data and references the auth provider's user ID.

If using Supabase Auth, your `users` table references `auth.users`:
```prisma
model User {
  id        String  @id // matches auth.users.id
  email     String  @unique
  // ...
}
```

### Organizations and Membership

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(FREE)
  createdAt DateTime @default(now())

  members   OrganizationMember[]
  projects  Project[]

  @@map("organizations")
}

model OrganizationMember {
  id             String       @id @default(cuid())
  userId         String
  organizationId String
  role           MemberRole   @default(MEMBER)
  joinedAt       DateTime     @default(now())

  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
  @@map("organization_members")
}

enum MemberRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}
```

### The Primary Resource

Whatever your app manages — projects, documents, campaigns — it needs:

```prisma
model Project {
  id             String      @id @default(cuid())
  organizationId String
  createdById    String
  name           String
  description    String?
  status         ProjectStatus @default(ACTIVE)
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  createdBy    User         @relation(fields: [createdById], references: [id])

  @@index([organizationId])  // ← Critical: always index your tenant FK
  @@map("projects")
}

enum ProjectStatus {
  ACTIVE
  ARCHIVED
  DELETED
}
```

---

## ID Strategy

**Use `cuid()` or `uuid()` for primary keys. Never auto-incrementing integers for user-facing IDs.**

| Type | Pros | Cons |
|---|---|---|
| `cuid()` | URL-safe, shorter than UUID, sortable | Not standard |
| `uuid()` | Standard, widely supported | Longer, not sortable by default |
| `int @default(autoincrement())` | Simple, fast | Exposes record count, enumerable by users |

Auto-incrementing integers let users guess other users' IDs by incrementing the URL. `/project/1`, `/project/2`, `/project/3` — even with proper auth, this is an information leak.

---

## Indexes: The Most Common Performance Mistake

**Every foreign key should have an index.** Without it, queries that filter or join on that column do a full table scan.

```prisma
model Task {
  id        String @id @default(cuid())
  projectId String
  // ...

  @@index([projectId])      // ← Required
  @@index([projectId, status]) // ← Composite for common query patterns
}
```

**Rules for indexing:**
- Always index foreign keys
- Index columns you frequently filter on (`WHERE status = 'active'`)
- Index columns you frequently sort on (`ORDER BY createdAt DESC`)
- Composite indexes follow column order — `[projectId, status]` accelerates `WHERE projectId = X AND status = Y` but not `WHERE status = Y` alone
- Don't over-index — each index slows down writes

---

## Soft Deletes vs. Hard Deletes

Hard delete removes the row. Soft delete marks it as deleted.

```prisma
// Soft delete pattern
model Project {
  // ...
  deletedAt DateTime? // null = active, timestamp = deleted
}
```

**Use soft deletes when:**
- Users might want to recover deleted data
- Other records reference this record (deletion would break references)
- You need an audit trail

**Use hard deletes when:**
- Data is truly transient (logs, sessions, temp files)
- Privacy regulations require actual deletion (GDPR right to erasure)

If you use soft deletes, every query must filter `WHERE deletedAt IS NULL`. Prisma middleware can enforce this automatically.

---

## Migrations

**Every schema change must be a migration. Never manually edit a production database.**

```bash
# Create a migration from schema changes
npx prisma migrate dev --name add-project-status

# Apply migrations in production
npx prisma migrate deploy
```

**Migration discipline:**
- Migrations are committed to version control alongside the code that needs them
- Migrations are applied before deploying the code that depends on them
- Never delete migration files
- Make migrations backward-compatible where possible — add columns before removing old ones (blue-green deployment safety)

---

## Row Level Security (Supabase)

If using Supabase, enable Row Level Security on every table and write explicit policies. RLS is your last line of defense against data leaks.

```sql
-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users can only see projects in their organization
CREATE POLICY "org_members_see_projects"
ON projects FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM organization_members
    WHERE user_id = auth.uid()
  )
);
```

**Test RLS policies explicitly.** Write a test that logs in as User A and attempts to access User B's data. This test should fail at the database level, not just the application level.

---

## What Belongs in the Database vs. Elsewhere

| Store in PostgreSQL | Store elsewhere |
|---|---|
| User profiles, memberships, roles | User passwords (auth provider) |
| Application records (projects, tasks) | Binary files (Supabase Storage, R2) |
| Billing state (plan, subscription ID) | Full billing history (Stripe) |
| Audit logs | High-volume event logs (time-series DB) |
| Feature flags (simple) | Search indexes (Typesense, Algolia) |
| Settings / preferences (JSON column) | Session data (Redis) |

---

## Implementation Checklist

- [ ] Multi-tenancy model is decided and documented
- [ ] Users table references auth provider ID correctly
- [ ] Organization / membership model includes roles
- [ ] Primary keys use cuid() or uuid(), not auto-increment integers
- [ ] Every foreign key column has an index
- [ ] Soft delete pattern chosen for resources users might want to recover
- [ ] RLS policies written and tested for every table (if using Supabase)
- [ ] Migration workflow is set up (`prisma migrate dev` locally, `migrate deploy` in CI)
- [ ] `.env.example` includes `DATABASE_URL` placeholder
- [ ] No sensitive data (passwords, raw payment details) stored in your database

---

## AI Prompt — Schema Generation

```prompt
You are a Staff Engineer designing a PostgreSQL database schema using Prisma for a production SaaS web application.

My app: [describe in 2–3 sentences]
Multi-tenancy model: [row-level isolation / single-tenant]
Core entities: [list 4–8 entities — e.g. User, Organization, Project, Task, Comment, Attachment]
Auth provider: [Supabase Auth / Auth.js / Clerk]

Generate a complete Prisma schema with:
1. All models with appropriate field types, defaults, and relations
2. Enums for status fields and role fields
3. Indexes on every foreign key and commonly filtered columns
4. Timestamps (createdAt, updatedAt) on every model
5. cuid() primary keys throughout
6. Cascade delete rules that make sense for the data model
7. A brief comment above each model explaining what it represents

Then list:
- Any N+1 query risks in the expected query patterns
- Any missing indexes for obvious query patterns
- Any fields that should have unique constraints
- Any soft-delete candidates
```

---

## Common Schema Mistakes

**No index on foreign keys**
Every `projectId`, `userId`, `organizationId` without an index will cause slow queries as data grows. Add indexes from day one.

**Storing derived data**
Don't store `taskCount` on a project. Compute it with `COUNT()`. Stored derived data goes stale and requires synchronization logic.

**Overusing JSON columns**
A JSON column is tempting for flexible data. It's also unindexable, unvalidated, and a maintenance problem. Use structured columns. Reserve JSON for genuinely unstructured, schema-free data.

**Missing `updatedAt`**
Add `updatedAt @updatedAt` to every model that represents a business entity. You will need it for cache invalidation, sync logic, and debugging.

**Mixing auth and profile data**
Keep authentication (credentials, sessions, tokens) in your auth provider. Keep profile data (name, avatar, preferences) in your `users` table. Don't duplicate what the auth provider manages.
