---
title: Backend
slug: backend
phase: Phase 3
mode: personal
projectType: saas
estimatedTime: 30–40 min
---

# Backend

Your backend is the enforcer.

The frontend can lie. The user can manipulate requests. The browser can be bypassed entirely. Your backend is the only part of your system you actually control — and it must behave correctly regardless of what hits it.

This module turns your Phase 2 architecture decisions into a working backend.

---

## What Your Backend Is Responsible For

Before writing a single route, be clear on what the backend owns:

- **All business logic** — rules, calculations, state transitions
- **All data access** — no frontend talks directly to your database
- **All validation** — never trust client input
- **All authorization** — never trust client claims about identity
- **All secrets** — API keys, service credentials, never exposed to browser

If any of these leak to the frontend, you have a security problem.

---

## Project Structure

Structure your backend before writing code. Consistent structure is what makes a solo project maintainable six months later.

### Next.js API Routes (App Router)

```
app/
  api/
    users/
      route.ts          ← GET /api/users, POST /api/users
      [id]/
        route.ts        ← GET /api/users/:id, PATCH, DELETE
    workspaces/
      route.ts
      [id]/
        route.ts
        members/
          route.ts
    webhooks/
      stripe/
        route.ts
lib/
  db.ts                 ← Prisma client singleton
  auth.ts               ← Auth helper (get current user)
  validations/
    user.ts             ← Zod schemas per resource
    workspace.ts
services/
  stripe.ts             ← Stripe logic
  email.ts              ← Email sending
  storage.ts            ← File upload/delete helpers
```

### Express / Fastify

```
src/
  routes/
    users.ts
    workspaces.ts
    webhooks.ts
  controllers/
    users.controller.ts
    workspaces.controller.ts
  middleware/
    auth.ts             ← Verify session, attach user
    validate.ts         ← Zod request validation
    error.ts            ← Global error handler
  services/
    stripe.ts
    email.ts
    storage.ts
  lib/
    db.ts               ← Prisma/DB client
  app.ts
  server.ts
```

> Pick one structure and commit. The exact pattern matters less than consistency. Every new route should feel like it belongs.

---

## The Request Lifecycle

Every API request should flow through the same stages:

```
Incoming request
      ↓
Auth middleware        ← Is there a valid session?
      ↓
Input validation      ← Is the request body valid?
      ↓
Authorization check   ← Does this user own this resource?
      ↓
Business logic        ← Do the actual work
      ↓
Database operation    ← Read or write
      ↓
Response              ← Consistent shape, correct status code
```

If any stage fails, stop and return the appropriate error. Never skip stages.

---

## Authentication Middleware

You should have one function that gets the current user — and you call it at the start of every protected route.

```typescript
// lib/auth.ts — example with Clerk
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function getCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null

  return db.user.findUnique({
    where: { clerkId: userId }
  })
}

// In a route handler
export async function GET(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return Response.json({ error: { code: "UNAUTHORIZED", message: "Login required." } }, { status: 401 })
  }

  // continue...
}
```

Never repeat this logic inline. One function, called everywhere.

---

## Input Validation

Use a schema validation library. Never manually check `if (req.body.email)`.

**Zod** is the standard for TypeScript backends.

```typescript
// lib/validations/workspace.ts
import { z } from "zod"

export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
})

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>
```

```typescript
// In your route
const body = await req.json()
const result = createWorkspaceSchema.safeParse(body)

if (!result.success) {
  return Response.json(
    { error: { code: "VALIDATION_ERROR", issues: result.error.issues } },
    { status: 422 }
  )
}

const { name, slug } = result.data  // fully typed
```

Define schemas once. Reuse them across routes, tests, and documentation.

---

## Authorization: The Check Most Beginners Skip

Authentication answers: *who are you?*
Authorization answers: *are you allowed to do this?*

```typescript
// ❌ Only checks authentication
const user = await getCurrentUser()
if (!user) return unauthorized()

const workspace = await db.workspace.findUnique({ where: { id: params.id } })
await db.workspace.delete({ where: { id: params.id } })  // anyone logged in can delete anything

// ✅ Checks authentication AND authorization
const user = await getCurrentUser()
if (!user) return unauthorized()

const workspace = await db.workspace.findUnique({ where: { id: params.id } })
if (!workspace) return notFound()
if (workspace.ownerId !== user.id) return forbidden()  // ← this is authorization

await db.workspace.delete({ where: { id: params.id } })
```

Write a helper per resource:

```typescript
// lib/auth.ts
export async function assertWorkspaceOwner(workspaceId: string, userId: string) {
  const workspace = await db.workspace.findUnique({ where: { id: workspaceId } })
  if (!workspace) throw new NotFoundError("Workspace not found.")
  if (workspace.ownerId !== userId) throw new ForbiddenError("Not allowed.")
  return workspace
}
```

---

## Error Handling

Handle errors in one place. Don't scatter `try/catch` blocks in every route.

**Consistent error response shape:**

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number
  ) {
    super(message)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found.") {
    super("NOT_FOUND", message, 404)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Not allowed.") {
    super("FORBIDDEN", message, 403)
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input.") {
    super("VALIDATION_ERROR", message, 422)
  }
}
```

```typescript
// Global handler in middleware or route wrapper
export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return Response.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status }
    )
  }

  console.error("Unhandled error:", error)
  return Response.json(
    { error: { code: "INTERNAL_ERROR", message: "Something went wrong." } },
    { status: 500 }
  )
}
```

Frontend developers thank you for consistent error shapes. You are also a frontend developer, so this is self-care.

---

## Service Layer

Don't put business logic in route handlers. Route handlers should be thin.

```typescript
// ❌ Fat route handler
export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()

  const body = await req.json()
  // ... validation ...
  // ... check subscription limits ...
  // ... create workspace ...
  // ... send welcome email ...
  // ... create default settings ...
  // ... log analytics event ...

  return Response.json(workspace, { status: 201 })
}

// ✅ Thin route handler, logic in service
export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()

  const body = await req.json()
  const result = createWorkspaceSchema.safeParse(body)
  if (!result.success) return validationError(result.error)

  const workspace = await WorkspaceService.create(user.id, result.data)
  return Response.json(workspace, { status: 201 })
}
```

Services are pure functions that handle one business operation. They're easy to test, easy to reuse, easy to read.

---

## Environment Variables

Backend secrets live in `.env`. Never commit `.env` to git.

```bash
# .env
DATABASE_URL="postgresql://..."
CLERK_SECRET_KEY="sk_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
```

```bash
# .env.example — commit this, no real values
DATABASE_URL=""
CLERK_SECRET_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
RESEND_API_KEY=""
```

Validate all environment variables at startup — fail fast if something is missing:

```typescript
// lib/env.ts
import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
```

If a required variable is missing, your app crashes on startup with a clear message — not silently mid-request.

---

## Backend Implementation Prompt

```prompt
You are a senior backend engineer helping me implement clean API routes for my SaaS.
My SaaS: [what your app does]
Backend framework: [Next.js App Router / Express / Fastify]
ORM: [Prisma / Drizzle]
Auth provider: [Clerk / Auth.js / Supabase Auth]
Language: [TypeScript / JavaScript / Python]
I need you to implement the following route:
[method] [path] — [what it does]
Business rules:
- [list the rules this route must enforce]
Database tables involved:
[paste relevant Prisma schema or table definitions]
Please generate:
1. Full route handler (auth, validation, authorization, logic, response)
2. Zod schema for request validation
3. Any service functions extracted from the handler
4. Error cases handled with correct status codes
5. Call out any security considerations
Follow these conventions:
- Consistent error shape: `{ error: { code, message } }`
- Use status codes correctly
- No business logic in the route handler itself
```

---

## Validating AI-Generated Backend Code

Before using any AI-generated route:

- [ ] Auth check is first — before any DB call
- [ ] Authorization check happens — not just authentication
- [ ] Input is validated with a schema — not manual `if` checks
- [ ] Error responses use correct HTTP status codes
- [ ] No raw database errors leak to the response (they expose schema info)
- [ ] Secrets are read from `process.env` — not hardcoded
- [ ] No `console.log` of sensitive data (user objects, tokens)
- [ ] Response shape matches your defined error format

Common AI mistakes:
- Skipping authorization (checking auth but not ownership)
- Returning 200 with an error in the body
- Leaking Prisma error messages directly to the client
- Putting all logic in the route handler instead of services
- Missing input validation on PATCH/DELETE routes

---

## Testing Your Routes

You don't need a full test suite for a personal project. You need confidence the routes work.

Minimum viable approach:

1. **Manual testing with a REST client** — Bruno or Insomnia (not Postman — it's bloated now)
2. **Test the unhappy paths** — what happens with missing fields, wrong user, nonexistent resource
3. **Write one integration test per critical route** — login flow, subscription creation, data deletion

Unhappy paths to test for every route:
- [ ] No auth token → expect 401
- [ ] Valid token, wrong user's resource → expect 403
- [ ] Missing required field → expect 422
- [ ] Resource doesn't exist → expect 404
- [ ] Valid request → expect correct 2xx

---

## Performance Basics

For a personal SaaS, you don't need to optimize early. But avoid these by default:

**N+1 queries** — the most common backend performance bug

```typescript
// ❌ N+1: one query per workspace member
const members = await db.workspaceMember.findMany({ where: { workspaceId } })
for (const member of members) {
  const user = await db.user.findUnique({ where: { id: member.userId } })  // N queries
}

// ✅ One query with include
const members = await db.workspaceMember.findMany({
  where: { workspaceId },
  include: { user: true }  // single JOIN
})
```

**Selecting too much data**

```typescript
// ❌ Returns every column including sensitive ones
const user = await db.user.findUnique({ where: { id } })

// ✅ Select only what you need
const user = await db.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true }
})
```

These two patterns alone prevent the most common backend performance issues.

---

## Implementation Checklist

Before moving to frontend:

- [ ] Project structure created and consistent
- [ ] Prisma client singleton set up (`lib/db.ts`)
- [ ] Auth helper created (`getCurrentUser`)
- [ ] Custom error classes defined
- [ ] Global error handler wired up
- [ ] Zod schemas created per resource
- [ ] `.env` and `.env.example` files created
- [ ] Env validation on startup
- [ ] All core routes implemented (reference your API route map from Phase 2)
- [ ] Each route tested for auth, authorization, validation, happy path, unhappy paths
- [ ] No business logic in route handlers — services layer exists
- [ ] No raw DB errors leaking to responses

---

## What to Build Next

Your backend is running. Routes are tested. Data flows correctly.

Next: **Frontend** — building the UI that calls these routes, handles loading/error states, and delivers the experience your users actually see.
