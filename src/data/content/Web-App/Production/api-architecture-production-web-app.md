---
title: API Architecture
slug: api-architecture
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# API Architecture

Your API is the contract between your frontend and your data. Every decision here — how routes are structured, how errors are formatted, how auth is enforced — compounds across every feature you build.

A well-designed API is predictable. A developer (or an AI coding tool) who understands one endpoint can correctly guess how every other endpoint works. That consistency is worth more than any individual design choice.

---

## First Decision: Do You Need a Separate API?

In a Next.js App Router application, you have three ways to move data:

| Pattern | When to use |
|---|---|
| **Server Components** | Reading data at render time — no API needed |
| **Server Actions** | Mutations triggered by user interaction |
| **Route Handlers** | External services, webhooks, public APIs, streaming |

**Most features in a Next.js app don't need Route Handlers at all.**

A common mistake is building REST endpoints for everything out of habit, then calling them from client components — adding a network round-trip that a Server Component or Server Action would eliminate.

```
Do you need an HTTP endpoint?
│
├── Will an external service call this? (webhooks, third-party integrations)
│   └── Yes → Route Handler
│
├── Is this a streaming response? (AI output, file download)
│   └── Yes → Route Handler
│
├── Are you building a public API for other developers?
│   └── Yes → Route Handler
│
├── Is this a mutation triggered by a user action?
│   └── Yes → Server Action (preferred) or Route Handler
│
└── Is this reading data for a page?
    └── Yes → Server Component — no API needed
```

---

## Server Actions (Primary Mutation Pattern)

Server Actions are TypeScript functions that run on the server, called directly from client components. No `fetch`, no endpoint, no serialization boilerplate.

```ts
// features/projects/actions.ts
'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { requireSession } from '@/lib/auth'
import { can, getMemberRole } from '@/lib/permissions'
import { revalidatePath } from 'next/cache'

const CreateProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
})

export async function createProject(input: z.infer<typeof CreateProjectSchema>) {
  // 1. Auth
  const session = await requireSession()

  // 2. Authorization
  const role = await getMemberRole(session.user.id, session.user.organizationId)
  if (!role || !can(role, 'project', 'create')) {
    throw new Error('Insufficient permissions')
  }

  // 3. Validate
  const data = CreateProjectSchema.parse(input)

  // 4. Act
  const project = await db.project.create({
    data: {
      ...data,
      organizationId: session.user.organizationId,
      createdById: session.user.id,
    }
  })

  // 5. Invalidate cache
  revalidatePath('/dashboard')

  return project
}
```

Every Server Action follows this pattern: **auth → authorize → validate → act → revalidate.**

---

## Route Handler Structure (When You Need HTTP Endpoints)

When you do need Route Handlers, be consistent.

```ts
// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireSession } from '@/lib/auth'
import { getProjects } from '@/features/projects/queries'

export async function GET(request: NextRequest) {
  try {
    const session = await requireSession()

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') ?? '1')

    const projects = await getProjects({
      organizationId: session.user.organizationId,
      page,
    })

    return NextResponse.json({ data: projects })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession()
    const body = await request.json()

    const project = await createProject(body) // reuse Server Action logic

    return NextResponse.json({ data: project }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
```

---

## Consistent Error Responses

Define one error format and use it everywhere. Clients should never have to guess the shape of an error.

```ts
// lib/api-errors.ts
export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error(error) // log before sanitizing

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: { message: error.message, code: error.code } },
      { status: error.statusCode }
    )
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: { message: 'Validation failed', issues: error.issues } },
      { status: 400 }
    )
  }

  // Never leak internal error details to clients
  return NextResponse.json(
    { error: { message: 'An unexpected error occurred' } },
    { status: 500 }
  )
}
```

**Error response shape — always the same:**
```json
{
  "error": {
    "message": "Human-readable description",
    "code": "MACHINE_READABLE_CODE",
    "issues": [] // optional, for validation errors
  }
}
```

**Success response shape — always the same:**
```json
{
  "data": { ... },
  "meta": { "page": 1, "total": 42 } // optional, for paginated responses
}
```

---

## URL Design

If you are building Route Handlers, follow REST conventions consistently.

### Resource Naming

```
 Plural nouns:    /api/projects       /api/users        /api/organizations
 Verbs in URLs:   /api/getProjects    /api/createUser   /api/deleteOrg
 Mixed casing:    /api/myProjects     /api/My_Projects
```

### Route Patterns

```
GET    /api/projects              → list projects
POST   /api/projects              → create project
GET    /api/projects/:id          → get single project
PATCH  /api/projects/:id          → partial update
PUT    /api/projects/:id          → full replace (rarely needed)
DELETE /api/projects/:id          → delete project

GET    /api/projects/:id/members  → list project members
POST   /api/projects/:id/members  → add member to project
```

### Actions That Aren't CRUD

Not everything maps neatly to CRUD. For actions, use a verb as a sub-resource:

```
POST /api/projects/:id/archive
POST /api/projects/:id/publish
POST /api/invitations/:id/accept
POST /api/subscriptions/:id/cancel
```

This is cleaner than `PATCH /api/projects/:id` with `{ status: 'archived' }` buried in the body, and more honest about what the endpoint does.

---

## Webhooks

Webhooks are HTTP endpoints that external services call. They require special handling.

```ts
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.text() // raw body needed for signature verification
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    // Invalid signature — reject immediately
    return new Response('Invalid signature', { status: 400 })
  }

  // Process event
  switch (event.type) {
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object)
      break
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object)
      break
  }

  return new Response(null, { status: 200 })
}
```

**Webhook requirements:**
- Always verify the signature before processing
- Return 200 quickly — do heavy processing asynchronously
- Make handlers idempotent (the same event may be delivered more than once)
- Log every received webhook event before processing

---

## Pagination

Never return unbounded lists. Define your pagination strategy before you have data.

**Offset pagination** (simple, common):
```ts
GET /api/projects?page=2&limit=20

// Response
{
  "data": [...],
  "meta": { "page": 2, "limit": 20, "total": 143, "totalPages": 8 }
}
```

**Cursor pagination** (better for real-time data, large datasets):
```ts
GET /api/projects?cursor=cuid_xyz&limit=20

// Response
{
  "data": [...],
  "meta": { "nextCursor": "cuid_abc", "hasMore": true }
}
```

Use cursor pagination when: the dataset changes frequently (items are inserted or deleted between pages), or you expect to paginate deep into large datasets. Use offset pagination for simpler cases.

---

## Rate Limiting

Every public-facing endpoint needs rate limiting. Without it, a single bad actor can exhaust your database or AI API budget.

```ts
// lib/rate-limit.ts using Upstash Redis
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10s'), // 10 requests per 10 seconds
})

// In a Route Handler
const identifier = session.user.id // rate limit per user, not per IP
const { success, limit, remaining, reset } = await rateLimiter.limit(identifier)

if (!success) {
  return NextResponse.json(
    { error: { message: 'Too many requests', code: 'RATE_LIMITED' } },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      }
    }
  )
}
```

Apply stricter limits to expensive operations: AI endpoints, file uploads, email sending.

---

## Implementation Checklist

- [ ] Server Actions used for mutations (not Route Handlers by default)
- [ ] Server Components used for data fetching at render time (no fetch() calls in useEffect for initial data)
- [ ] Route Handlers only exist for external-facing endpoints (webhooks, public API)
- [ ] Consistent error response shape across all endpoints
- [ ] Consistent success response shape (`{ data: ... }`)
- [ ] Every Route Handler has try/catch with `handleApiError`
- [ ] Auth validated inside every Server Action and Route Handler (not just middleware)
- [ ] Webhook endpoints verify provider signatures before processing
- [ ] All list endpoints are paginated — no unbounded queries
- [ ] Rate limiting applied to expensive or public endpoints

---

## AI Prompt — API Design Review

```prompt
You are a Staff Engineer reviewing the API design for a production Next.js web application.

My app: [describe in 2–3 sentences]
Stack: Next.js 14 App Router, TypeScript, Supabase, Prisma

Core user flows requiring data operations:
[list 5–8 operations — e.g. "Create project", "Invite team member", "Upload file", "Subscribe to plan"]

For each operation, recommend:
1. Server Action vs Route Handler — with reasoning
2. The exact function/endpoint signature
3. Required auth and authorization checks
4. Input validation requirements (Zod schema outline)
5. Cache invalidation needed after the operation

Then review my overall API design for:
- Inconsistencies in response shape
- Missing rate limiting candidates
- Any operations that should be async/background instead of synchronous
- Security gaps in the proposed design
```
