---
title: Validation
slug: validation
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 20–30 min
---

# Validation

Validation is not a single step. It's a layered defense.

Client-side validation is UX. Server-side validation is security. Database constraints are the last line. Each layer catches different failures. Remove any one of them and your application has a gap that will eventually be exploited or produce corrupt data.

This module covers how to build a validation system that's consistent, reusable, and impossible to bypass.

---

## The Validation Stack

```
┌─────────────────────────────────────────┐
│         Client (React Hook Form)        │  ← UX: immediate feedback
│         Zod schema + zodResolver        │  ← Same schema as server
├─────────────────────────────────────────┤
│         Server (API Route Handler)      │  ← Security: always runs
│         Zod schema.safeParse()          │  ← Never trust client input
├─────────────────────────────────────────┤
│         Business Logic Layer            │  ← Semantic: "does this make sense?"
│         Manual checks after parse       │  ← Email unique, user owns resource
├─────────────────────────────────────────┤
│         Database (Prisma + PostgreSQL)  │  ← Integrity: enforced at storage
│         @unique, NOT NULL, FK checks    │  ← Final safety net
└─────────────────────────────────────────┘
```

Each layer has a different job. None replaces the others.

---

## Schema-First Validation with Zod

One schema. Used everywhere. The schema is the source of truth for both types and validation logic.

```typescript
// schemas/post.ts
import { z } from 'zod'

// Base shape — shared across create and update
const postBase = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be under 200 characters')
    .trim(),

  content: z
    .string()
    .min(1, 'Content is required')
    .max(50_000, 'Content is too long'),

  tags: z
    .array(z.string().min(1).max(50))
    .max(10, 'Maximum 10 tags')
    .default([]),

  published: z.boolean().default(false),
})

// Create — all required fields present
export const createPostSchema = postBase

// Update — all fields optional (PATCH semantics)
export const updatePostSchema = postBase.partial().refine(
  data => Object.keys(data).length > 0,
  'At least one field must be provided'
)

// Query parameters — coerce string params to correct types
export const postQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  published: z
    .enum(['true', 'false'])
    .transform(v => v === 'true')
    .optional(),
  tag: z.string().optional(),
  search: z.string().max(200).optional(),
})

// Inferred types — no duplication
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PostQuery = z.infer<typeof postQuerySchema>
```

---

## Server-Side Validation Pattern

Every route handler that accepts input follows this exact structure.

```typescript
// app/api/posts/route.ts
import { createPostSchema } from '@/schemas/post'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function POST(req: NextRequest) {
  // 1. Parse body safely — never throw on bad input
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorResponse('INVALID_JSON', 'Request body must be valid JSON', 400)
  }

  // 2. Validate shape and types
  const result = createPostSchema.safeParse(body)
  if (!result.success) {
    return errorResponse(
      'VALIDATION_ERROR',
      'Invalid request data',
      422,
      result.error.flatten().fieldErrors
    )
  }

  // 3. result.data is now fully typed and safe to use
  const { title, content, tags, published } = result.data

  // 4. Business logic validation (things Zod can't check)
  const slugCandidate = slugify(title)
  const existingPost = await db.post.findUnique({ where: { slug: slugCandidate } })
  if (existingPost) {
    return errorResponse('CONFLICT', 'A post with this title already exists', 409)
  }

  // 5. Operate
  const post = await db.post.create({
    data: { title, slug: slugCandidate, content, tags, published, authorId: session.userId },
  })

  return successResponse(post, undefined, 201)
}
```

**The sequence is always:** parse JSON → validate schema → check business rules → operate. Never skip steps. Never reorder.

---

## Validation Error Response Shape

Consistent error shapes let your frontend handle errors generically rather than per-endpoint.

```typescript
// lib/api-response.ts

// Field errors — from Zod flatten()
// { title: ["Title is required"], content: ["Content is too long"] }
type FieldErrors = Record<string, string[]>

type ValidationErrorBody = {
  error: {
    code: 'VALIDATION_ERROR'
    message: string
    details: FieldErrors
  }
}

// On the client — map field errors back to React Hook Form
const { mutate } = useMutation({
  mutationFn: createPost,
  onError: (error: ValidationErrorBody) => {
    if (error.error.code === 'VALIDATION_ERROR' && error.error.details) {
      Object.entries(error.error.details).forEach(([field, messages]) => {
        form.setError(field as keyof CreatePostInput, {
          message: messages[0],
        })
      })
    } else {
      form.setError('root', { message: error.error.message })
    }
  },
})
```

---

## Advanced Zod Patterns

### Cross-field validation

```typescript
const passwordResetSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // attach error to this field
  })

// Multiple refinements
const eventSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    maxAttendees: z.number().int().positive(),
    minAttendees: z.number().int().positive(),
  })
  .refine(data => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
  .refine(data => data.maxAttendees >= data.minAttendees, {
    message: 'Max attendees must be >= min attendees',
    path: ['maxAttendees'],
  })
```

### Discriminated unions

```typescript
// Different validation based on a type field
const notificationSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('email'),
    emailAddress: z.string().email(),
    subject: z.string().min(1),
  }),
  z.object({
    type: z.literal('sms'),
    phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number'),
  }),
  z.object({
    type: z.literal('push'),
    deviceToken: z.string().min(1),
    title: z.string().max(50),
  }),
])
```

### Transformations

```typescript
const userInputSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, _ and - allowed')
    .transform(v => v.toLowerCase()),
  bio: z.string().max(280).trim().optional(),
  website: z
    .string()
    .url()
    .transform(url => (url.startsWith('http') ? url : `https://${url}`))
    .optional(),
})
// After parse, email and username are guaranteed lowercase
```

### File validation

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(f => f.size <= MAX_FILE_SIZE, 'File must be under 5MB')
    .refine(f => ACCEPTED_IMAGE_TYPES.includes(f.type), 'Only JPEG, PNG, WebP, and GIF allowed'),
  alt: z.string().max(200).optional(),
})
```

---

## Query Parameter Validation

URL query params are always strings. Zod's `coerce` handles conversion.

```typescript
// schemas/common.ts
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export const sortSchema = z.object({
  sortBy: z.enum(['createdAt', 'updatedAt', 'title']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
})

// Compose schemas
export const postListQuerySchema = paginationSchema.merge(sortSchema).extend({
  search: z.string().max(200).trim().optional(),
  published: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
})

// Usage in route handler
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(new URL(req.url).searchParams)
  const query = postListQuerySchema.safeParse(params)

  if (!query.success) {
    return errorResponse('INVALID_QUERY', 'Invalid query parameters', 400)
  }

  const { page, limit, sortBy, order, search, published } = query.data
  // All values are typed correctly — page is number, published is boolean
}
```

---

## Business Logic Validation Layer

After schema validation passes, check semantic rules that depend on application state.

```typescript
// lib/validations/post.ts — business logic validators
import { db } from '@/lib/db'
import type { CreatePostInput } from '@/schemas/post'

export async function validatePostCreation(
  input: CreatePostInput,
  authorId: string
): Promise<{ valid: true } | { valid: false; code: string; message: string; field?: string }> {
  // Check slug uniqueness
  const slug = slugify(input.title)
  const exists = await db.post.findUnique({ where: { slug }, select: { id: true } })
  if (exists) {
    return { valid: false, code: 'CONFLICT', message: 'A post with this title already exists', field: 'title' }
  }

  // Check rate limit — max 10 posts per day
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const postsToday = await db.post.count({
    where: { authorId, createdAt: { gte: today } },
  })
  if (postsToday >= 10) {
    return { valid: false, code: 'RATE_LIMITED', message: 'You can create at most 10 posts per day' }
  }

  return { valid: true }
}

// In route handler
const validation = await validatePostCreation(result.data, session.userId)
if (!validation.valid) {
  return errorResponse(
    validation.code,
    validation.message,
    validation.code === 'CONFLICT' ? 409 : 429
  )
}
```

---

## Database-Level Constraints

The final layer. These enforce integrity even if application code has bugs.

```prisma
model User {
  email     String   @unique        // unique constraint
  username  String   @unique
  role      Role     @default(MEMBER)
  age       Int?     // nullable = optional
  score     Int      @default(0)    // NOT NULL with default
}

model Post {
  authorId  String
  author    User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  // Foreign key constraint — authorId must reference valid user
  // onDelete: Cascade — post deleted when user deleted

  @@unique([authorId, slug]) // composite unique constraint
}
```

**Handle Prisma constraint errors gracefully:**

```typescript
import { Prisma } from '@prisma/client'

try {
  await db.user.create({ data: { email, username } })
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      const field = (error.meta?.target as string[])?.[0]
      return errorResponse('CONFLICT', `${field} already in use`, 409)
    }
  }
  throw error // re-throw unexpected errors
}
```

Common Prisma error codes:
- `P2002` — Unique constraint violation
- `P2003` — Foreign key constraint failure
- `P2025` — Record not found (on update/delete)

---

## Reusable Validation Middleware

For endpoints with identical validation patterns, extract into composable helpers.

```typescript
// lib/with-validation.ts
import { ZodSchema } from 'zod'
import { NextRequest } from 'next/server'

export async function parseBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ data: T } | { error: Response }> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return {
      error: errorResponse('INVALID_JSON', 'Request body must be valid JSON', 400),
    }
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return {
      error: errorResponse('VALIDATION_ERROR', 'Invalid request data', 422, result.error.flatten().fieldErrors),
    }
  }

  return { data: result.data }
}

export function parseQuery<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): { data: T } | { error: Response } {
  const params = Object.fromEntries(new URL(req.url).searchParams)
  const result = schema.safeParse(params)

  if (!result.success) {
    return {
      error: errorResponse('INVALID_QUERY', 'Invalid query parameters', 400),
    }
  }

  return { data: result.data }
}

// Usage
export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, createPostSchema)
  if ('error' in parsed) return parsed.error

  const { data } = parsed // fully typed
  // proceed...
}
```

---

## AI Prompt: Validation Schema Design

```prompt
You are a senior backend engineer helping design a validation layer for a production Next.js API.

My application: [describe your app]

Here are the operations I need to validate:
[list each operation and its input fields, e.g., "Create User: email, password, username, optional bio, optional avatar URL"]

For each operation, generate:
1. A Zod schema with appropriate constraints and clear error messages
2. Any cross-field refinements needed
3. The inferred TypeScript type
4. Business logic validation checks that must happen after schema validation (things Zod cannot check, like uniqueness)
5. The relevant Prisma schema constraints that enforce integrity at the database level

Flag any fields where client-supplied values should be sanitized or transformed before storage.
```

---

## Implementation Checklist

- [ ] Zod schemas defined in `/schemas` — one file per domain
- [ ] Schemas shared between client (React Hook Form) and server (API routes)
- [ ] TypeScript types inferred from schemas — no separate type definitions
- [ ] `safeParse` used everywhere — never `parse` (which throws)
- [ ] JSON body wrapped in try/catch before schema validation
- [ ] Query parameters validated with `z.coerce` for type conversion
- [ ] Business logic checks run after schema validation passes
- [ ] Prisma constraint errors caught and mapped to user-friendly responses
- [ ] Validation error responses include field-level details for client mapping
- [ ] `parseBody` / `parseQuery` helpers extracted to avoid repetition

---

## Common Mistakes

**Using `schema.parse()` instead of `safeParse()`.**
`parse()` throws a `ZodError` on failure. In a route handler, an uncaught throw becomes a 500 error and your client receives no useful information. Always use `safeParse()` and handle the failure case explicitly.

**Only validating on the client.**
A user with curl, Postman, or a script can call your API directly. Client validation is entirely skipped. Server validation is non-negotiable.

**Not catching Prisma constraint errors.**
Your database will reject malformed data even if your validation layer misses it — but the raw Prisma error will become a 500 response. Catch `PrismaClientKnownRequestError` and map it to a sensible API response.

**Skipping `.trim()` on string inputs.**
A username of `"  admin  "` passes most string validations but is stored with leading/trailing spaces. Users can't log in. Use `.trim()` on all string inputs where whitespace is not meaningful.

**Different schemas on client and server.**
The client validates one shape, the server validates a different one. The client passes, the server rejects. Or worse — the server accepts data the client never validated. One schema, two enforcement points.

---

## Quick Reference

```
Schema validation (shape)?        → Zod safeParse
Cross-field rules?                → .refine()
Type field branching?             → z.discriminatedUnion
String params → numbers?          → z.coerce.number()
Transform after parse?            → .transform()
Business rules (uniqueness)?      → Manual checks after safeParse
Database integrity?               → Prisma @unique, onDelete, NOT NULL
DB constraint errors?             → Prisma.PrismaClientKnownRequestError P2002
Field errors to client?           → error.flatten().fieldErrors
```

---

## What's Next

**Error Handling** — validation produces errors, but production applications have many other failure modes: network failures, database timeouts, third-party API errors, unexpected exceptions. The next module covers building a centralized error handling layer that's consistent, observable, and never exposes internal details to clients.
