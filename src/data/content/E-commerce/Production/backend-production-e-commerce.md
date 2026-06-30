---
title: Backend
slug: backend
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 30–45 min
---

# Backend

The backend is the contract between your database and your frontend. Get the structure right and every feature you build from here is fast to add, easy to debug, and safe to change. Get it wrong and every new feature fights the last one.

This module covers API structure, request handling patterns, validation, auth middleware, and the conventions that keep a solo project maintainable.

---

## Framework Choice

For a personal e-commerce project in the modern TypeScript ecosystem, you have two realistic options:

| | Next.js API Routes / Route Handlers | Express / Fastify (separate server) |
|---|---|---|
| Setup cost | Zero — already in your project | Separate repo or monorepo config |
| Deployment | Vercel, Railway, Render — trivial | Requires separate service deploy |
| Type safety | Excellent with TypeScript | Excellent with TypeScript |
| Performance | Sufficient for personal scale | Marginally faster at high load |
| Best for | Full-stack Next.js projects | API-only backends, microservices |

**Recommendation: Next.js Route Handlers** (App Router) unless you have a specific reason to separate your backend. A separate Express server adds operational complexity that a personal project doesn't need.

This module uses Next.js App Router conventions. Patterns are transferable to Express with minimal adaptation.

---

## API Structure

Organise routes by resource, not by action. Every route file owns one resource.

```
app/
└── api/
    ├── products/
    │   ├── route.ts              GET /api/products (list)
    │   └── [id]/
    │       └── route.ts          GET /api/products/:id
    ├── cart/
    │   ├── route.ts              GET, DELETE /api/cart
    │   └── items/
    │       ├── route.ts          POST /api/cart/items
    │       └── [id]/
    │           └── route.ts      PATCH, DELETE /api/cart/items/:id
    ├── checkout/
    │   ├── validate/route.ts
    │   └── payment-intent/route.ts
    ├── orders/
    │   ├── route.ts              GET /api/orders
    │   └── [id]/
    │       └── route.ts          GET /api/orders/:id
    ├── account/
    │   ├── profile/route.ts
    │   └── addresses/
    │       ├── route.ts
    │       └── [id]/route.ts
    ├── admin/
    │   ├── products/route.ts
    │   ├── orders/route.ts
    │   └── analytics/route.ts
    └── webhooks/
        └── stripe/route.ts
```

The `/admin` prefix is your gate for all privileged operations. Every route inside it requires `role === ADMIN` verification.

---

## Request Validation

Never trust incoming data. Validate every request body and query parameter before it touches your database.

**Use Zod.** It is the standard validation library for TypeScript projects. It validates at runtime and generates TypeScript types simultaneously.

```ts
// lib/validations/cart.ts
import { z } from 'zod'

export const AddToCartSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1).max(99),
})

export type AddToCartInput = z.infer<typeof AddToCartSchema>
```

```ts
// app/api/cart/items/route.ts
import { AddToCartSchema } from '@/lib/validations/cart'

export async function POST(req: Request) {
  const body = await req.json()
  const result = AddToCartSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: 'Invalid request', details: result.error.flatten() },
      { status: 400 }
    )
  }

  const { productId, variantId, quantity } = result.data
  // proceed safely
}
```

Define schemas alongside your routes. Every route that accepts a body has a schema. No exceptions.

---

## Authentication Middleware

Every protected route needs to verify the caller's identity. Do not repeat this logic inline in every handler.

```ts
// lib/auth.ts
import { getServerSession } from 'next-auth' // or your auth provider equivalent
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export async function requireAuth(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new AuthError('Unauthorized')
  }
  return session.user
}

export async function requireAdmin(req: Request) {
  const user = await requireAuth(req)
  if (user.role !== 'ADMIN') {
    throw new AuthError('Forbidden')
  }
  return user
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}
```

```ts
// Usage in a protected route
export async function GET(req: Request) {
  try {
    const user = await requireAuth(req)
    const orders = await db.order.findMany({ where: { userId: user.id } })
    return Response.json(orders)
  } catch (e) {
    if (e instanceof AuthError) {
      return Response.json({ error: e.message }, { status: 401 })
    }
    throw e
  }
}
```

---

## Error Handling

Consistent error responses make frontend handling predictable and debugging faster.

**Standard error shape:**

```ts
// lib/api-response.ts

export function apiError(message: string, status: number, details?: unknown) {
  return Response.json({ error: message, details }, { status })
}

export function apiSuccess<T>(data: T, status = 200) {
  return Response.json(data, { status })
}
```

**Standard HTTP status codes for your routes:**

| Situation | Status |
|---|---|
| Success | 200 |
| Created | 201 |
| Bad request / validation failed | 400 |
| Unauthenticated | 401 |
| Authenticated but not permitted | 403 |
| Resource not found | 404 |
| Conflict (duplicate, out of stock) | 409 |
| Server error | 500 |

Never return 200 for an error. Never return 500 for a validation failure. Status codes are documentation — use them correctly.

---

## Route Anatomy

Every route handler follows the same structure. Consistency matters more than cleverness.

```ts
export async function POST(req: Request) {
  try {
    // 1. Auth check (if required)
    const user = await requireAuth(req)

    // 2. Parse and validate input
    const body = await req.json()
    const result = SomeSchema.safeParse(body)
    if (!result.success) {
      return apiError('Invalid request', 400, result.error.flatten())
    }

    // 3. Business logic
    const { productId, quantity } = result.data

    const product = await db.product.findUnique({ where: { id: productId } })
    if (!product || !product.isActive) {
      return apiError('Product not found', 404)
    }

    if (product.stock < quantity) {
      return apiError('Insufficient stock', 409)
    }

    // 4. Database write
    const item = await db.cartItem.create({ data: { ... } })

    // 5. Return
    return apiSuccess(item, 201)

  } catch (e) {
    if (e instanceof AuthError) return apiError(e.message, 401)
    console.error(e)
    return apiError('Internal server error', 500)
  }
}
```

This pattern: auth → validate → check → write → respond. Apply it to every route. When you come back to a route six weeks later, you'll thank yourself.

---

## Ownership Verification

Every route that reads or modifies a resource scoped to a user must verify ownership. This is the IDOR fix from Cart Architecture — applied universally.

```ts
// Fetching an order — always scope to the requesting user
const order = await db.order.findFirst({
  where: {
    id: params.id,
    userId: user.id     // ← never skip this
  }
})

if (!order) return apiError('Order not found', 404)
// 404 — not 403 — don't reveal that the resource exists but belongs to someone else
```

Return 404, not 403, when ownership fails. Returning 403 confirms the resource exists. 404 reveals nothing.

---

## Key Routes to Build First

Build these in order. Each depends on the previous.

**1. Products — read only**
```
GET /api/products          → list with filters (category, search, price range)
GET /api/products/:slug    → single product with variants and images
```
No auth required. These are your store's public surface.

**2. Cart**
```
GET    /api/cart            → fetch or create cart for session/user
POST   /api/cart/items      → add item (validate stock)
PATCH  /api/cart/items/:id  → update quantity (validate stock)
DELETE /api/cart/items/:id  → remove item (verify ownership)
```

**3. Checkout**
```
POST /api/checkout/validate          → recompute totals server-side
POST /api/checkout/payment-intent    → create Stripe PaymentIntent
POST /api/webhooks/stripe            → handle Stripe events, create orders
```

**4. Orders**
```
GET /api/orders       → authenticated user's order history
GET /api/orders/:id   → single order detail (verify ownership)
```

**5. Account**
```
GET   /api/account/profile          → user profile
PATCH /api/account/profile          → update name
GET   /api/account/addresses        → saved addresses
POST  /api/account/addresses        → add address
PATCH /api/account/addresses/:id    → update address
DELETE /api/account/addresses/:id   → delete address
```

**6. Admin**
```
GET   /api/admin/products           → product list with stock
POST  /api/admin/products           → create product
PATCH /api/admin/products/:id       → update product
GET   /api/admin/orders             → all orders with filters
PATCH /api/admin/orders/:id/status  → update order status, add tracking
GET   /api/admin/analytics          → revenue and order metrics
```

---

## Query Patterns to Know

**Pagination — use cursor-based for large lists:**

```ts
const products = await db.product.findMany({
  take: 24,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: 'desc' },
  where: { isActive: true }
})
```

**Avoid N+1 queries — always use `include` or `select`:**

```ts
// Bad — triggers N queries for N products
const products = await db.product.findMany()
for (const p of products) {
  const images = await db.productImage.findMany({ where: { productId: p.id } })
}

// Good — single query
const products = await db.product.findMany({
  include: {
    images: { orderBy: { position: 'asc' }, take: 1 },
    variants: { where: { isActive: true } }
  }
})
```

**Transactions for multi-step writes:**

```ts
await db.$transaction(async (tx) => {
  // All or nothing
  await tx.order.create({ ... })
  await tx.cartItem.deleteMany({ where: { cartId } })
  await tx.cart.update({ where: { id: cartId }, data: { status: 'CONVERTED' } })
})
```

---

## AI Prompt: Backend Architecture Review

```
You are a senior backend engineer reviewing an API layer for a personal e-commerce project.

FRAMEWORK: [Next.js Route Handlers / Express / Fastify]
ORM: [Prisma / Drizzle]
AUTH: [NextAuth / Clerk / Supabase Auth]

ROUTE LIST:
[paste your full list of planned routes with HTTP methods]

VALIDATION APPROACH:
[describe how you're validating request bodies]

ERROR HANDLING:
[describe your error response shape and how errors propagate]

AUTH MIDDLEWARE:
[paste or describe your auth and admin guard implementation]

Review for:
1. Missing ownership verification on user-scoped routes
2. Routes returning wrong HTTP status codes
3. N+1 query risks in list endpoints
4. Missing validation on any route that accepts a body
5. Admin routes that aren't properly guarded
6. Anything a solo developer would ship and regret

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] All routes that accept a body have a Zod schema
- [ ] `safeParse` used — not `parse` — so validation errors are caught gracefully
- [ ] Auth middleware extracts user from session, not from request body
- [ ] Admin routes verified with `role === ADMIN` server-side
- [ ] All user-scoped queries include `userId` in the where clause
- [ ] 404 returned when ownership fails — not 403
- [ ] Consistent error shape across all routes
- [ ] HTTP status codes semantically correct (201 for create, 409 for conflict, etc.)
- [ ] No N+1 queries — `include` used for related data
- [ ] Multi-step writes wrapped in `db.$transaction`
- [ ] Webhook route verifies Stripe signature before processing
- [ ] Stripe secret key accessed only server-side, never returned to client

---

## What to Build Next

**Frontend** — with a working, validated API, you're ready to build the UI layer that calls it. The frontend module covers component structure, data fetching patterns, cart state management, and the conventions that keep your UI in sync with your backend.

---

> **Filename:** `backend-personal-e-commerce.md`
