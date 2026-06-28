---
title: Backend Engineering
slug: backend-engineering
phase: Phase 3
mode: personal
projectType: web-app
estimatedTime: 45–60 min
---

# Backend Engineering

Your backend is the contract between your UI and your data. Get this wrong and you'll be untangling spaghetti for months. Get it right and everything else — auth, caching, features — slots in cleanly.

This module covers how to structure a backend that's maintainable for a solo developer, plays well with AI code generation, and doesn't collapse under real-world usage.

---

## What You're Actually Building

Most personal web apps need the same core backend shape:

```
Client (Browser)
    ↓ HTTP requests
API Layer (Routes / Controllers)
    ↓ business logic
Service Layer (functions that do the actual work)
    ↓ data access
Database Layer (ORM / queries)
    ↓
Database
```

AI tools generate code at the route level. Your job is to keep the layers clean so AI-generated additions don't become tangled knots.

---

## Choose Your Backend Approach

> [!DECISION]
> Pick one pattern now. Mixing them creates confusion.

| Approach | Best For | Trade-off |
|---|---|---|
| **Full-stack framework** (Next.js API Routes, Nuxt, SvelteKit) | Same repo as frontend, simple deploys | Less separation, can get messy |
| **Dedicated API server** (Express, Fastify, Hono) | Clear separation, reusable | Two repos / two deploys to manage |
| **BaaS** (Supabase, Firebase, Pocketbase) | Fast setup, minimal code | Less control, vendor dependency |

**Solo personal project recommendation:** Full-stack framework first. You're one person. Don't manage two deployment pipelines until you need to.

---

## Project Structure That Scales

Bad structure is the #1 reason personal projects become unworkable. This layout works for Next.js but the principles apply everywhere.

```
/src
  /app
    /api
      /users
        route.ts         ← HTTP handler only (thin)
      /posts
        route.ts
  /services
    users.service.ts     ← business logic lives here
    posts.service.ts
  /lib
    db.ts                ← single database client instance
    auth.ts              ← auth helpers
  /types
    index.ts             ← shared TypeScript types
```

**The rule:** Routes should do almost nothing. They receive a request, call a service, return a response. Logic belongs in services.

> [!TIP]
> When you prompt AI to add a new feature, give it your folder structure. It will generate code that fits your pattern instead of inventing a new one.

---

## Route Design

Every route you create becomes a surface area you have to maintain, secure, and test. Keep them minimal.

**A well-structured route handler:**

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPost, getUserPosts } from '@/services/posts.service'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const posts = await getUserPosts(user.id)
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const post = await createPost(user.id, body)
  return NextResponse.json(post, { status: 201 })
}
```

The route handler is doing exactly three things: authenticate, delegate, respond. Nothing else.

---

## Service Layer

This is where your actual application logic lives. Services are plain functions that take inputs and return outputs.

```typescript
// services/posts.service.ts
import { db } from '@/lib/db'
import { CreatePostInput } from '@/types'

export async function getUserPosts(userId: string) {
  return db.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createPost(userId: string, input: CreatePostInput) {
  // validate
  if (!input.title?.trim()) throw new Error('Title is required')

  // create
  return db.post.create({
    data: {
      title: input.title,
      content: input.content,
      authorId: userId
    }
  })
}
```

**Why this matters:** When you need to reuse logic — say, creating a post from a scheduled job AND from an API call — you import the service. You never copy-paste route logic.

---

## Input Validation

Never trust data from the client. Validate at the service layer before touching the database.

**Use Zod for validation:**

```typescript
import { z } from 'zod'

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
})

export async function createPost(userId: string, input: unknown) {
  const validated = CreatePostSchema.parse(input) // throws on invalid input
  
  return db.post.create({
    data: { ...validated, authorId: userId }
  })
}
```

> [!WARNING]
> AI-generated code frequently omits input validation. Always check this. An unvalidated string going into your database is a vulnerability.

---

## Error Handling

Inconsistent error handling makes debugging miserable. Pick a pattern and use it everywhere.

**Option 1 — Throw and catch at the route level:**

```typescript
// lib/api.ts
export function withErrorHandling(handler: Function) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
      }
      console.error(error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}

// usage
export const POST = withErrorHandling(async (req: NextRequest) => {
  // your handler - throw freely
})
```

**Option 2 — Result pattern (no exceptions):**

```typescript
type Result<T> = { ok: true; data: T } | { ok: false; error: string }

export async function createPost(userId: string, input: unknown): Promise<Result<Post>> {
  const parsed = CreatePostSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'Invalid input' }

  try {
    const post = await db.post.create({ data: { ...parsed.data, authorId: userId } })
    return { ok: true, data: post }
  } catch {
    return { ok: false, error: 'Failed to create post' }
  }
}
```

Pick one. Use it everywhere.

---

## The Database Client

Your database connection should be a singleton. Never create a new client per request.

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

The `globalThis` trick prevents Next.js hot-reload from creating dozens of database connections in development.

---

## API Security Basics

> [!WARNING]
> These are not optional. They apply to every backend, including personal projects.

**Authentication on every protected route.** Don't assume routes are private by default. Explicitly check.

**Never expose sensitive fields:**
```typescript
// BAD — returns password hash, internal IDs, etc.
return db.user.findUnique({ where: { id } })

// GOOD — select only what the client needs
return db.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true, createdAt: true }
})
```

**Rate limiting.** Even personal projects get abused. Add basic rate limiting to auth routes and expensive operations. Upstash + `@upstash/ratelimit` is free and takes 10 minutes.

**Environment variables.** No secrets in code. No exceptions.

---

## Prompt: Generate a Service

Use this when adding a new feature. It produces code that fits your existing architecture.

```
Copy Prompt
```

```
I'm building a [personal/web app] with this backend structure:

- Next.js App Router API routes
- Services in /src/services/
- Database client in /src/lib/db.ts (Prisma)
- Zod for validation
- Types in /src/types/index.ts
- Auth via [your auth method, e.g. NextAuth / Clerk]

Generate a service and route for [feature description].

Requirements:
- Route handler should only: authenticate, call service, return response
- All logic goes in the service file
- Validate all inputs with Zod before touching the database
- Use select: {} in all Prisma queries to avoid exposing sensitive fields
- Handle errors with try/catch and return appropriate HTTP status codes
- Export TypeScript types for all inputs and outputs

Only generate these files:
- /src/services/[feature].service.ts
- /src/app/api/[route]/route.ts

Do not generate tests, migrations, or documentation.
```

---

## Validating AI-Generated Backend Code

AI makes predictable mistakes on backend code. Check every generated file for these:

**Validation checklist:**

- [ ] Are all route inputs validated before being used?
- [ ] Does every protected route check authentication before doing anything else?
- [ ] Are database queries using `select` to avoid over-fetching sensitive data?
- [ ] Is the database client imported from a shared singleton, not instantiated locally?
- [ ] Are errors handled — no unhandled promise rejections?
- [ ] Are environment variables used for all secrets?
- [ ] Does the service layer contain the logic, or did AI put everything in the route?
- [ ] Does any query use raw SQL strings? If yes, are they parameterised?

---

## When to Split Into a Separate API

You started with a full-stack framework. Here's when to move backend logic to a separate server:

| Signal | What It Means |
|---|---|
| Your API is being consumed by mobile apps | Shared API makes sense |
| Build times are getting long | Frontend and backend have different change rates |
| You want to deploy them independently | Separate services |
| Other developers need API-only access | Clean boundary needed |

For a personal project, this is not a day-one decision.

---

## What Comes Next

With your backend structure in place:

- **Database ORMs** — how to write queries that don't break when your schema changes
- **Data Fetching** — how the frontend talks to this backend cleanly
- **Authentication** — wiring your auth layer into every protected route

Your backend is the part of your app you'll interact with for the entire lifetime of the project. The time spent structuring it correctly now pays back every time you add a feature.
