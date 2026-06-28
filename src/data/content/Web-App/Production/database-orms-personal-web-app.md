---
title: Database ORMs
slug: database-orms
phase: Phase 3
mode: personal
projectType: web-app
estimatedTime: 30–45 min
---

# Database ORMs

An ORM sits between your service layer and your database. It lets you write TypeScript instead of SQL and catches a class of errors at compile time instead of at 2am in production.

For a personal web app, the right ORM isn't the most powerful one — it's the one that generates readable code, has excellent TypeScript support, and doesn't punish you for being a solo developer.

---

## The Honest Trade-off

| | ORM | Raw SQL |
|---|---|---|
| **Speed to build** | Fast | Slow |
| **Type safety** | Strong | Requires extra setup |
| **Complex queries** | Can get awkward | Full control |
| **AI code gen quality** | Excellent | Good |
| **Learning curve** | Low | Medium |
| **Debugging** | Inspect generated SQL | What you write is what runs |

**For a personal project:** Use an ORM. The productivity gain is real. You can drop to raw SQL for the 5% of queries that need it.

---

## The Two Worth Knowing

### Prisma

The default choice for TypeScript projects. Auto-generates a type-safe client from your schema file. The developer experience is the best in class.

```prisma
// schema.prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```typescript
// type-safe, autocompleted
const posts = await db.post.findMany({
  where: { authorId: userId, published: true },
  select: { id: true, title: true, createdAt: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
})
```

**Use Prisma when:** You're starting fresh, using Next.js, or want the best AI code generation support.

---

### Drizzle

Newer. Lighter. SQL-first — the queries look like SQL, which means fewer surprises. Has no query engine to manage; it's just TypeScript that compiles to SQL.

```typescript
// schema.ts
export const posts = pgTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  authorId: text('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
})

// query
const posts = await db
  .select({ id: posts.id, title: posts.title })
  .from(posts)
  .where(eq(posts.authorId, userId))
  .orderBy(desc(posts.createdAt))
  .limit(10)
```

**Use Drizzle when:** You're comfortable with SQL, want a lighter footprint, or are running on edge runtimes (Cloudflare Workers, Vercel Edge).

---

## Setting Up Prisma (Step by Step)

```bash
npm install prisma @prisma/client
npx prisma init
```

This creates `prisma/schema.prisma` and adds `DATABASE_URL` to your `.env`.

**Configure your database URL:**

```env
# .env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

**Write your schema, then push it:**

```bash
# During development — fast iteration, no migration files
npx prisma db push

# For production — generates tracked migration files
npx prisma migrate dev --name add_posts_table
```

> [!TIP]
> Use `db push` while your schema is still evolving. Switch to `migrate dev` once you have real data you care about.

---

## Writing Queries That Don't Hurt You Later

### Always use `select`

```typescript
// BAD — returns everything including password hashes, internal flags
const user = await db.user.findUnique({ where: { id } })

// GOOD — returns exactly what you need
const user = await db.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true }
})
```

AI-generated code almost never uses `select` by default. Add it manually.

---

### Fetching related data

```typescript
// One query — not N+1
const posts = await db.post.findMany({
  where: { published: true },
  include: {
    author: {
      select: { name: true, avatarUrl: true }  // don't include the whole user
    },
    _count: { select: { comments: true } }
  }
})
```

> [!WARNING]
> **The N+1 problem:** Fetching 10 posts then making 10 separate queries to get each author is a classic beginner mistake. Use `include` to fetch everything in one query.

---

### Pagination

```typescript
// Offset pagination — simple, works for most personal projects
async function getPosts(page: number, pageSize = 20) {
  const [posts, total] = await db.$transaction([
    db.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    }),
    db.post.count()
  ])

  return { posts, total, pages: Math.ceil(total / pageSize) }
}
```

Cursor pagination is more performant at scale, but offset is fine for personal projects until you have tens of thousands of rows.

---

### Transactions

When two database operations must both succeed or both fail, use a transaction.

```typescript
// Creating a post and updating a counter atomically
async function publishPost(postId: string, authorId: string) {
  return db.$transaction(async (tx) => {
    const post = await tx.post.update({
      where: { id: postId, authorId },  // scoped to this author
      data: { published: true }
    })

    await tx.user.update({
      where: { id: authorId },
      data: { publishedCount: { increment: 1 } }
    })

    return post
  })
}
```

If either operation fails, both roll back automatically.

---

## Schema Design Principles

A few decisions now save hours of migrations later.

**Use `cuid()` or `uuid()` for IDs, not auto-increment integers:**

```prisma
id String @id @default(cuid())
```

Integer IDs leak record counts (`/posts/1847` tells competitors how many posts you have). String IDs are also easier to work with across distributed systems.

**Always add timestamps:**

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

You will want these. Everyone wants these. Add them to every model.

**Soft deletes for anything important:**

```prisma
deletedAt DateTime?
```

```typescript
// query always filters soft-deleted records
const posts = await db.post.findMany({
  where: { deletedAt: null }
})
```

Permanent deletes are permanent. Soft deletes let you recover mistakes.

---

## Prompt: Design a Schema

```
Copy Prompt
```

```
I'm building a [brief description of your app] using Prisma with PostgreSQL.

Here are the core entities in my app:
[list your main data types, e.g. User, Post, Comment, Tag]

Here's what users can do:
[list the key actions, e.g. users create posts, posts have tags, users can comment]

Generate a Prisma schema for these models.

Requirements:
- Use cuid() for all IDs
- Add createdAt and updatedAt to every model
- Add deletedAt (DateTime?) to any model where soft-delete makes sense
- Use meaningful relation names
- Add @@index for any field that will be frequently queried (userId, status, etc.)
- Add comments explaining non-obvious design decisions

Do not generate:
- Migration files
- Seed files
- Application code
- Documentation

Only output the schema.prisma content.
```

---

## Validating AI-Generated Schema

AI is good at schema generation but makes consistent mistakes. Check every generated schema for:

- [ ] Every model has an `id` field with `@id`
- [ ] Every model has `createdAt` and `updatedAt`
- [ ] Foreign keys have corresponding `@relation` definitions on both sides
- [ ] Fields that will be queried frequently have `@@index`
- [ ] No fields that should be optional are marked required (and vice versa)
- [ ] Enum values are defined for any status/type fields
- [ ] Cascade behavior is specified on relations (`onDelete: Cascade` where appropriate)

---

## Inspecting What Your ORM Is Doing

When queries are slow or returning unexpected results, see the actual SQL:

```typescript
// Prisma — log all queries in development
const db = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error']
})
```

You'll see the exact SQL in your terminal. This is how you catch N+1 problems and unintentional full-table scans before they matter.

---

## When You Need Raw SQL

For complex aggregations, full-text search, or anything the ORM can't express cleanly:

```typescript
// Prisma raw query — still parameterised, still safe
const result = await db.$queryRaw<{ count: bigint }[]>`
  SELECT COUNT(*) as count
  FROM posts
  WHERE to_tsvector('english', title || ' ' || content) @@ plainto_tsquery(${searchTerm})
  AND deleted_at IS NULL
`
```

> [!WARNING]
> Never concatenate user input into a raw SQL string. Use parameterised queries (`$queryRaw` with template literals in Prisma, or `sql` tagged template in Drizzle). SQL injection is still the most common vulnerability in web apps.

---

## What Comes Next

Your schema is your data contract. With this in place:

- **Data Fetching** — how your frontend requests data from these service functions
- **Authentication** — scoping every query to the logged-in user
- **Performance** — which queries to index, and when to cache

Keep your schema close to the problem domain. Resist the urge to over-normalise early. A slightly denormalised schema you actually understand is better than a perfectly normalised one you don't.
