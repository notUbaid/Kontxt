---
title: Database ORM
slug: database-orm
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# Database ORM

Your database is the only part of your application that persists state permanently. Every other layer is replaceable. This one isn't.

Prisma is the standard ORM for TypeScript full-stack applications. It gives you type-safe queries, auto-generated types from your schema, and a migration system that tracks every change to your database structure. This module covers how to use it correctly in production.

---

## Why Prisma

```
Raw SQL          → Type-safe only if you write types manually. Error-prone.
Drizzle          → Lighter, SQL-first, excellent for edge. Less mature ecosystem.
Prisma           → Schema-first, excellent DX, mature, best-in-class type inference.
TypeORM          → Decorator-based, less ergonomic with modern TypeScript.
```

For a production Next.js app with PostgreSQL or MySQL: Prisma is the correct default. The schema definition language is readable, migrations are reliable, and the generated client is the best TypeScript database experience available.

---

## Setup

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
```

```typescript
// lib/db.ts — singleton client, required in Next.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

> ⚠️ **Warning:** Without the singleton pattern above, Next.js hot reload creates a new `PrismaClient` instance on every file change. You'll exhaust your database connection pool within minutes in development.

---

## Schema Design

The schema is the authoritative definition of your data model. Design it deliberately — migrations are cheap, but bad data models compound.

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
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatar    String?
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  posts     Post[]
  comments  Comment[]
  sessions  Session[]

  @@index([email])
}

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  authorId    String
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments    Comment[]
  tags        Tag[]

  @@index([authorId])
  @@index([published, publishedAt(sort: Desc)])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  authorId  String
  author    User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  postId    String
  post      Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@index([postId])
  @@index([authorId])
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
}

enum Role {
  MEMBER
  ADMIN
}
```

---

## Schema Design Principles

**IDs:** Use `cuid()` or `uuid()` over auto-increment integers. They're non-sequential (harder to enumerate), safe to generate client-side, and work across distributed systems.

**Timestamps:** Every model gets `createdAt` and `updatedAt`. `@updatedAt` is maintained automatically by Prisma.

**Soft deletes:** For anything users might want to recover, add `deletedAt DateTime?` instead of hard-deleting. Filter it out in queries with a global middleware or explicit `where: { deletedAt: null }`.

**Indexes:** Add `@@index` on every foreign key and every field you filter or sort by in queries. Missing indexes cause full table scans that become catastrophic at scale.

**onDelete:** Define behavior explicitly. `Cascade` deletes children when parent is deleted. `Restrict` prevents deletion if children exist. `SetNull` nullifies the foreign key. The default (`NoAction`) does nothing — usually wrong.

---

## Migrations

```bash
# Create a migration after changing schema.prisma
npx prisma migrate dev --name add_post_tags

# Apply pending migrations in production
npx prisma migrate deploy

# View current database state
npx prisma studio

# Reset development database (destructive)
npx prisma migrate reset
```

**Never edit migration files after they've been applied.** If you need to change something, create a new migration. Migration files are your database's history — altering history breaks reproducibility.

**In CI/CD:** Run `prisma migrate deploy` (not `dev`) before starting your application. `migrate dev` is for local development only — it can drop and recreate your database.

---

## Type-Safe Queries

Prisma generates types from your schema. Every query is fully typed — no casting, no guessing.

```typescript
import { db } from '@/lib/db'
import type { Prisma } from '@prisma/client'

// SELECT with relations
const post = await db.post.findUnique({
  where: { id: postId },
  include: {
    author: {
      select: { id: true, name: true, avatar: true }, // only fetch needed fields
    },
    comments: {
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
    tags: true,
  },
})
// post is fully typed — post.author.name is a string, not any

// CREATE
const newPost = await db.post.create({
  data: {
    title: 'My Post',
    slug: 'my-post',
    content: '...',
    author: { connect: { id: userId } },
    tags: {
      connectOrCreate: tags.map(tag => ({
        where: { name: tag },
        create: { name: tag },
      })),
    },
  },
})

// UPDATE
const updated = await db.post.update({
  where: { id: postId },
  data: {
    title: newTitle,
    publishedAt: new Date(),
    published: true,
  },
})

// DELETE
await db.post.delete({ where: { id: postId } })

// UPSERT — create or update
const tag = await db.tag.upsert({
  where: { name: tagName },
  update: {},
  create: { name: tagName },
})
```

---

## Select vs Include

The most important performance decision in Prisma queries.

```typescript
// ❌ include fetches entire related model — often returns far more than you need
const posts = await db.post.findMany({
  include: { author: true }, // fetches all 20 user fields
})

// ✅ select fetches only what you need
const posts = await db.post.findMany({
  select: {
    id: true,
    title: true,
    slug: true,
    publishedAt: true,
    author: {
      select: { id: true, name: true, avatar: true },
    },
  },
})
```

**Rule:** Default to `select`. Only use `include` when you genuinely need all fields of a relation. The difference in payload size and query performance is significant at scale.

---

## Reusable Select Fragments

Avoid repeating the same select shapes across your codebase.

```typescript
// lib/selects.ts
export const postCardSelect = {
  id: true,
  title: true,
  slug: true,
  publishedAt: true,
  author: {
    select: { id: true, name: true, avatar: true },
  },
  _count: { select: { comments: true } },
} satisfies Prisma.PostSelect

export const userPublicSelect = {
  id: true,
  name: true,
  avatar: true,
  createdAt: true,
} satisfies Prisma.UserSelect

// Usage
const posts = await db.post.findMany({
  select: postCardSelect,
  where: { published: true },
})

// Type inference from select
type PostCard = Prisma.PostGetPayload<{ select: typeof postCardSelect }>
```

---

## Transactions

When multiple database operations must succeed or fail together, use a transaction.

```typescript
// Interactive transaction — full Prisma client available
const result = await db.$transaction(async (tx) => {
  // All operations use `tx`, not `db`
  const post = await tx.post.create({
    data: { title, slug, content, authorId: userId },
  })

  await tx.user.update({
    where: { id: userId },
    data: { postCount: { increment: 1 } },
  })

  await tx.activity.create({
    data: { userId, type: 'POST_CREATED', targetId: post.id },
  })

  return post
})
// If any operation throws, all are rolled back automatically
```

```typescript
// Batch transaction — sequential operations, slightly faster
await db.$transaction([
  db.post.update({ where: { id }, data: { published: true } }),
  db.user.update({ where: { id: authorId }, data: { publishedCount: { increment: 1 } } }),
])
```

**Use transactions whenever:** creating a resource and updating a counter, transferring between accounts, or any multi-step operation where partial completion leaves your data in an inconsistent state.

---

## Pagination Queries

```typescript
// Offset pagination
async function getPostsPage(page: number, limit: number = 20) {
  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: { published: true },
      select: postCardSelect,
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    db.post.count({ where: { published: true } }),
  ])

  return {
    posts,
    total,
    pages: Math.ceil(total / limit),
    hasMore: skip + posts.length < total,
  }
}

// Cursor pagination
async function getPostsCursor(cursor?: string, limit: number = 20) {
  const posts = await db.post.findMany({
    where: { published: true },
    select: postCardSelect,
    orderBy: { publishedAt: 'desc' },
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  })

  const hasMore = posts.length > limit
  return {
    posts: hasMore ? posts.slice(0, limit) : posts,
    nextCursor: hasMore ? posts[limit - 1].id : null,
    hasMore,
  }
}
```

---

## Soft Deletes

```typescript
// Add to any model that needs recovery
model Post {
  // ...existing fields
  deletedAt DateTime?

  @@index([deletedAt])
}

// Global middleware to filter deleted records automatically
// lib/db.ts
export const db = new PrismaClient().$extends({
  query: {
    post: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null }
        return query(args)
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deletedAt: null }
        return query(args)
      },
      async findUnique({ args, query }) {
        // findUnique doesn't support deletedAt filter — use findFirst instead
        return query(args)
      },
    },
  },
})

// Soft delete instead of hard delete
await db.post.update({
  where: { id: postId },
  data: { deletedAt: new Date() },
})
```

---

## Query Performance

```typescript
// ❌ N+1 query — fetches each author in a separate query
const posts = await db.post.findMany()
const postsWithAuthors = await Promise.all(
  posts.map(post => db.user.findUnique({ where: { id: post.authorId } }))
)

// ✅ Single query with include/select
const posts = await db.post.findMany({
  select: { ...postCardSelect, author: { select: userPublicSelect } },
})

// ❌ Counting with findMany
const posts = await db.post.findMany({ where: { authorId } })
const count = posts.length // loads all records to count them

// ✅ Dedicated count query
const count = await db.post.count({ where: { authorId } })

// ❌ Loading entire record to check existence
const user = await db.user.findUnique({ where: { email } })
if (user) { /* ... */ }

// ✅ Existence check without loading
const exists = await db.user.findUnique({
  where: { email },
  select: { id: true }, // minimal payload
})
```

---

## AI Prompt: Schema Review

```
You are a senior backend engineer and database architect reviewing a Prisma schema for a production PostgreSQL application.

Application type: [describe your app]
Expected scale: [approximate users and records at launch and at 1 year]

Here is my current schema:
[paste your schema.prisma]

Review and:
1. Identify missing indexes on foreign keys and frequently-queried fields
2. Flag any models missing createdAt/updatedAt
3. Identify incorrect or missing onDelete behaviors on relations
4. Suggest where soft deletes would be appropriate
5. Flag any fields that should have unique constraints
6. Identify N+1 query risks based on the relation structure
7. Suggest any schema normalization improvements

Output a corrected schema with comments explaining each change.
```

---

## Implementation Checklist

- [ ] Prisma singleton pattern used in `lib/db.ts` — no multiple instances
- [ ] Every model has `id`, `createdAt`, `updatedAt`
- [ ] IDs use `cuid()` or `uuid()` — not auto-increment integers
- [ ] `onDelete` behavior explicitly defined on all relations
- [ ] `@@index` on all foreign keys and frequently-filtered fields
- [ ] `select` used instead of `include` for list queries
- [ ] Reusable select fragments defined in `lib/selects.ts`
- [ ] Multi-step operations wrapped in `$transaction`
- [ ] All list queries have `take` limits — no unbounded queries
- [ ] `prisma migrate deploy` runs before app start in CI/CD
- [ ] Migration files committed to version control
- [ ] `prisma studio` never used as the only way to inspect data in production

---

## Common Mistakes

**Multiple PrismaClient instances.**
Each instance opens its own connection pool. In development with hot reload you'll hit connection limits in minutes. Use the singleton pattern.

**No indexes on foreign keys.**
Prisma does not add indexes on foreign key columns automatically. A query filtering by `authorId` does a full table scan without it. Add `@@index([authorId])` manually.

**Using `include` everywhere.**
`include: { author: true }` fetches all 20 fields of the User model even if you only need the name. Use `select` with explicit fields. The difference becomes meaningful at scale.

**Sequential awaits for independent queries.**
`await db.post.findMany()` followed by `await db.post.count()` runs them sequentially. Wrap them in `Promise.all` — they're independent and can run in parallel.

**Editing migration files after applying them.**
The migration history is a contract. Editing it breaks `prisma migrate deploy` for every environment that has already applied the original. Create a new migration instead.

---

## Quick Reference

```
Fetch one record?              → findUnique / findFirst
Fetch many?                    → findMany (always add take)
Create?                        → create
Update?                        → update / updateMany
Create or update?              → upsert
Delete?                        → delete / deleteMany (or soft delete)
Check existence?               → findUnique with select: { id: true }
Multiple ops atomic?           → $transaction
Fetch only needed fields?      → select (not include)
Count records?                 → count (not findMany + .length)
```

---

## What's Next

**Validation** — your API receives input, Prisma stores it, but the layer between them — server-side validation, sanitization, and error normalization — needs its own treatment. The next module covers building a validation layer that's consistent, reusable, and impossible to bypass.
