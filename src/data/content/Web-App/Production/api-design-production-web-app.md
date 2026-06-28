---
title: API Design
slug: api-design
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# API Design

Your API is a contract. Every endpoint you ship is a promise to every client that consumes it.

Break that contract — rename a field, change a response shape, remove an endpoint — and you break your frontend, your mobile app, and any third-party integrations simultaneously. Design it right the first time.

---

## First Decision: REST vs tRPC

This choice affects your entire development workflow. Make it deliberately.

| | REST | tRPC |
|---|---|---|
| **Type safety** | Manual (Zod schemas shared) | Automatic end-to-end |
| **Client codegen** | Required or manual | Zero — types inferred automatically |
| **Third-party consumers** | ✅ Standard, any language | ❌ TypeScript/JS only |
| **Learning curve** | Low | Low–Medium |
| **Next.js integration** | Route Handlers | Route Handlers + tRPC adapter |
| **Best for** | Public APIs, mobile clients, multi-consumer | Internal full-stack TypeScript apps |

**Decision rule:**
- Building a public API or serving non-TypeScript clients → **REST**
- Internal full-stack Next.js app, TypeScript everywhere → **tRPC**
- Not sure → **REST with Zod** — it's the safer default

This module covers REST. tRPC follows the same design principles with better ergonomics for TypeScript monorepos.

---

## URL Design

URLs identify resources. They are nouns, not verbs. Actions are expressed by HTTP methods.

```
✅ Correct — resource-based
GET    /api/posts              → list posts
POST   /api/posts              → create post
GET    /api/posts/:id          → get post
PATCH  /api/posts/:id          → update post
DELETE /api/posts/:id          → delete post
GET    /api/posts/:id/comments → list post's comments
POST   /api/posts/:id/comments → create comment on post

❌ Wrong — verb-based (RPC style leaking into REST)
GET  /api/getPosts
POST /api/createPost
POST /api/deletePost
POST /api/updatePostTitle
```

**Nesting rule:** Go one level deep maximum. `/api/posts/:id/comments` is fine. `/api/users/:id/posts/:postId/comments/:commentId` is not — flatten it to `/api/comments/:id`.

---

## HTTP Methods and Status Codes

Use them correctly. Clients and infrastructure (CDNs, proxies, browsers) interpret these semantically.

```
Methods:
GET     → Read. Safe, idempotent. Can be cached.
POST    → Create. Not idempotent.
PUT     → Replace entire resource. Idempotent.
PATCH   → Partial update. Idempotent.
DELETE  → Delete. Idempotent.

Status codes:
200 OK              → Success with response body
201 Created         → Resource created (POST success)
204 No Content      → Success without response body (DELETE)
400 Bad Request     → Invalid request (validation failure)
401 Unauthorized    → Not authenticated
403 Forbidden       → Authenticated but not allowed
404 Not Found       → Resource doesn't exist
409 Conflict        → Resource already exists, state conflict
422 Unprocessable   → Validation errors (preferred over 400 for schema failures)
429 Too Many Req.   → Rate limited
500 Internal Error  → Server error (never expose details)
```

> ⚠️ **Warning:** Never return `200 OK` with `{ success: false }` in the body. HTTP status codes exist for a reason. Return the correct code and let clients branch on it.

---

## Response Shape

Consistency across all endpoints is more important than any particular shape. Pick one and enforce it everywhere.

```typescript
// Standardized response envelope
// lib/api-response.ts

type ApiSuccess<T> = {
  data: T
  meta?: {
    total?: number
    page?: number
    limit?: number
    hasMore?: boolean
  }
}

type ApiError = {
  error: {
    code: string       // machine-readable, stable identifier
    message: string    // human-readable, for display
    details?: Record<string, string[]>  // field-level validation errors
  }
}

// Helper functions
export function successResponse<T>(data: T, meta?: ApiSuccess<T>['meta'], status = 200) {
  return NextResponse.json({ data, meta }, { status })
}

export function errorResponse(code: string, message: string, status: number, details?: Record<string, string[]>) {
  return NextResponse.json({ error: { code, message, details } }, { status })
}
```

```typescript
// Usage in route handler
// app/api/posts/route.ts
export async function GET(req: NextRequest) {
  const posts = await db.post.findMany({ take: 20 })
  const total = await db.post.count()

  return successResponse(posts, { total, hasMore: total > 20 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = createPostSchema.safeParse(body)

  if (!result.success) {
    return errorResponse(
      'VALIDATION_ERROR',
      'Invalid request data',
      422,
      result.error.flatten().fieldErrors
    )
  }

  const post = await db.post.create({ data: result.data })
  return successResponse(post, undefined, 201)
}
```

---

## Route Handler Structure

Next.js App Router route handlers live in `app/api/`.

```typescript
// app/api/posts/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { updatePostSchema } from '@/schemas/post'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/posts/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: { author: { select: { id: true, name: true, avatar: true } } },
  })

  if (!post) {
    return errorResponse('NOT_FOUND', 'Post not found', 404)
  }

  return successResponse(post)
}

// PATCH /api/posts/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) return errorResponse('UNAUTHORIZED', 'Authentication required', 401)

  const post = await db.post.findUnique({ where: { id: params.id } })
  if (!post) return errorResponse('NOT_FOUND', 'Post not found', 404)
  if (post.authorId !== session.userId) {
    return errorResponse('FORBIDDEN', 'You cannot edit this post', 403)
  }

  const body = await req.json()
  const result = updatePostSchema.safeParse(body)
  if (!result.success) {
    return errorResponse('VALIDATION_ERROR', 'Invalid data', 422, result.error.flatten().fieldErrors)
  }

  const updated = await db.post.update({
    where: { id: params.id },
    data: result.data,
  })

  return successResponse(updated)
}

// DELETE /api/posts/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) return errorResponse('UNAUTHORIZED', 'Authentication required', 401)

  const post = await db.post.findUnique({ where: { id: params.id } })
  if (!post) return errorResponse('NOT_FOUND', 'Post not found', 404)
  if (post.authorId !== session.userId) {
    return errorResponse('FORBIDDEN', 'You cannot delete this post', 403)
  }

  await db.post.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}
```

---

## Input Validation

Every endpoint that accepts input must validate it on the server. Always. No exceptions.

```typescript
// schemas/post.ts
import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(50_000),
  tags: z.array(z.string()).max(10).optional(),
  published: z.boolean().default(false),
})

export const updatePostSchema = createPostSchema.partial() // all fields optional for PATCH

export const postQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  tag: z.string().optional(),
  published: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
})
```

```typescript
// Parsing query parameters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = postQuerySchema.safeParse(Object.fromEntries(searchParams))

  if (!query.success) {
    return errorResponse('VALIDATION_ERROR', 'Invalid query parameters', 400)
  }

  const { page, limit, tag, published } = query.data
  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: { ...(tag && { tags: { has: tag } }), ...(published !== undefined && { published }) },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    db.post.count(),
  ])

  return successResponse(posts, { total, page, limit, hasMore: skip + posts.length < total })
}
```

---

## Authentication in Route Handlers

Every protected endpoint follows the same pattern: authenticate first, authorize second, then operate.

```typescript
// lib/auth.ts — reusable session helper
export async function requireSession(req: NextRequest) {
  const session = await getSession(req)
  if (!session) {
    throw new AuthError('Authentication required')
  }
  return session
}

// Middleware-level auth for entire route groups
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    const session = await getSession(req)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
```

---

## Pagination Patterns

Two approaches. Choose based on your use case.

```typescript
// Offset pagination — simple, works with sorting and jumping to pages
// Use for: admin tables, search results, anything with page numbers
{
  data: [...],
  meta: { total: 1420, page: 3, limit: 20, hasMore: true }
}

// Cursor pagination — stable, efficient for large datasets
// Use for: feeds, timelines, infinite scroll
{
  data: [...],
  meta: { nextCursor: "clx7abc123", hasMore: true }
}
```

```typescript
// Cursor-based implementation
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get('cursor')
  const limit = 20

  const posts = await db.post.findMany({
    take: limit + 1, // fetch one extra to determine hasMore
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1, // skip the cursor itself
    }),
    orderBy: { createdAt: 'desc' },
  })

  const hasMore = posts.length > limit
  const data = hasMore ? posts.slice(0, limit) : posts
  const nextCursor = hasMore ? data[data.length - 1].id : null

  return successResponse(data, { nextCursor, hasMore })
}
```

---

## Rate Limiting

Every public or authenticated API endpoint needs rate limiting. Without it, a single user can exhaust your database or trigger enormous bills.

```typescript
// lib/rate-limit.ts using Upstash Redis (edge-compatible)
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
  return { success, limit, remaining, reset }
}

// In route handler
export async function POST(req: NextRequest) {
  const session = await getSession()
  const identifier = session?.userId ?? req.ip ?? 'anonymous'

  const { success, remaining } = await checkRateLimit(identifier)
  if (!success) {
    return errorResponse('RATE_LIMITED', 'Too many requests', 429)
  }

  // proceed...
}
```

---

## API Folder Structure

```
app/api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── signup/route.ts
├── posts/
│   ├── route.ts              → GET /api/posts, POST /api/posts
│   └── [id]/
│       ├── route.ts          → GET, PATCH, DELETE /api/posts/:id
│       └── comments/
│           └── route.ts      → GET, POST /api/posts/:id/comments
├── users/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
└── webhooks/
    └── stripe/route.ts

lib/
├── api-response.ts           → successResponse, errorResponse helpers
├── rate-limit.ts             → rate limiter
└── auth.ts                   → getSession, requireSession
```

---

## AI Prompt: API Design Review

```
You are a senior backend engineer reviewing a REST API design for a production Next.js 14 application.

My application: [describe your app]

Here are my planned API endpoints:
[list each endpoint: METHOD /path — description]

Here is a sample route handler:
[paste one of your route handlers]

Review and:
1. Identify any URL design issues (verbs in URLs, poor nesting, inconsistent naming)
2. Flag incorrect HTTP method or status code usage
3. Audit the response shape for consistency issues
4. Identify missing authentication or authorization checks
5. Flag any input validation gaps
6. Identify endpoints that need rate limiting
7. Suggest any missing endpoints implied by my data model

Output a corrected endpoint list and a refactored version of the sample route handler.
```

---

## Implementation Checklist

- [ ] URLs are noun-based, nested maximum one level deep
- [ ] Correct HTTP methods used (PATCH for partial updates, not POST)
- [ ] Consistent response envelope across all endpoints
- [ ] Machine-readable error codes alongside human-readable messages
- [ ] Every endpoint validates input with Zod before touching the database
- [ ] Authentication checked before any data access
- [ ] Authorization checked after authentication (ownership, role)
- [ ] 401 returned when unauthenticated, 403 when unauthorized (not both as 401)
- [ ] Rate limiting on all public and write endpoints
- [ ] Pagination on all list endpoints (no unbounded queries)
- [ ] No raw database errors exposed in 500 responses

---

## Common Mistakes

**Verbs in URLs.**
`/api/createPost` is an RPC endpoint pretending to be REST. It bypasses HTTP method semantics, breaks caching, and confuses every HTTP-aware tool in your stack.

**Returning 200 for errors.**
`{ success: false, error: "Not found" }` with status `200` means every client must parse the body to detect failure. HTTP status codes exist so clients — and infrastructure — can handle errors without reading the body.

**No server-side input validation.**
Client validation is UX. Server validation is security. A user who knows your API endpoint can send anything. Validate everything. Always.

**Unbounded list queries.**
`db.post.findMany()` with no `take` limit will eventually return 50,000 rows and crash your server or time out. Every list endpoint gets a `limit` parameter with a server-enforced maximum.

**Exposing internal error details in 500 responses.**
Stack traces, database error messages, and internal paths reveal your system architecture to attackers. Log the full error server-side. Return only a generic message to the client.

---

## Quick Reference

```
List resources?           → GET /api/resources
Create resource?          → POST /api/resources (201)
Get one resource?         → GET /api/resources/:id
Partial update?           → PATCH /api/resources/:id
Full replace?             → PUT /api/resources/:id
Delete?                   → DELETE /api/resources/:id (204)
Not authenticated?        → 401
Not authorized?           → 403
Validation failure?       → 422 with field errors
Not found?                → 404
Rate limited?             → 429
```

---

## What's Next

**Database ORM** — your API handlers are making raw database calls. The next module covers Prisma: schema design, type-safe queries, migrations, relations, and patterns that keep your data layer clean and maintainable.
