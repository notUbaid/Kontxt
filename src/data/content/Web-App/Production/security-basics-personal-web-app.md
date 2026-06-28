---
title: Security Basics
slug: security-basics
phase: Phase 4
mode: personal
projectType: web-app
estimatedTime: 30–40 min
---

# Security Basics

You don't need to become a security engineer. You need to not make the mistakes that get personal projects breached, scraped, or abused.

Most attacks against personal web apps are opportunistic. Automated scanners probe for known vulnerabilities. Fix the common ones and you're not a soft target.

This module covers the minimum security posture for a shipped personal project.

---

## The Threat Model

Before hardening anything, understand what you're actually protecting against.

| Threat | Likelihood | Impact | Fix |
|---|---|---|---|
| Exposed secrets in Git | Medium | Critical | `.gitignore`, secret scanning |
| Unauthenticated access to private routes | High | High | Auth middleware |
| SQL injection | Medium | Critical | Parameterised queries (Prisma does this) |
| Cross-site scripting (XSS) | Medium | High | React escapes by default; avoid `dangerouslySetInnerHTML` |
| Broken access control | High | High | Scope every query to the logged-in user |
| Credential stuffing on auth routes | High | Medium | Rate limiting |
| Exposed internal error details | Medium | Medium | Never send stack traces to clients |

Fix these in order of impact. Don't spend time on low-probability, low-impact threats while ignoring broken access control.

---

## Secrets Management

The most common way personal projects get compromised is committed secrets.

**Audit your Git history right now:**

```bash
# Search for common secret patterns in your entire git history
git log --all --full-history -- "*.env*"
git grep -i "api_key\|secret\|password\|token" $(git rev-list --all)
```

If you find secrets in your history, they are compromised. Rotate them immediately, then clean the history.

**Rules that prevent this:**

```bash
# .gitignore — these must be present
.env
.env.local
.env.*.local
.env.production
```

**Verify before every commit:**

```bash
# Add to your workflow — takes 2 seconds
git diff --staged | grep -i "secret\|api_key\|password\|token"
```

> [!WARNING]
> A secret committed to a private repo is still a secret at risk. Private repos get made public accidentally. Former collaborators retain access to cloned copies. Treat every committed secret as compromised and rotate it.

---

## Authentication Middleware

Every route that requires a logged-in user must check authentication. Not most routes. Every route.

```typescript
// middleware.ts — runs before every matched request
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token  // must have a valid session token
    }
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/posts/:path*',
    '/api/user/:path*',
    // list every private path
  ]
}
```

Middleware runs at the edge before your route handler. It's the right place to enforce auth globally rather than checking it manually in every route.

> [!WARNING]
> AI-generated route handlers frequently forget authentication checks. After generating any API route, verify it checks auth before doing anything else. An unauthenticated route is a public endpoint.

---

## Broken Access Control

The most common vulnerability in personal web apps. A logged-in user requests another user's data — and gets it.

```typescript
// BROKEN — fetches post by ID with no ownership check
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const post = await db.post.findUnique({ where: { id: params.id } })
  return NextResponse.json(post)  // returns ANY user's post
}

// FIXED — scopes the query to the authenticated user
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await db.post.findUnique({
    where: {
      id: params.id,
      authorId: user.id  // ← ownership enforced at the database level
    }
  })

  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}
```

The fix is always the same: scope every database query to the authenticated user. Not in a separate check after the query — in the query itself, so the database enforces it.

---

## Input Validation

Never trust data from the client. Validate everything that comes in from a request.

```typescript
import { z } from 'zod'

const UpdateProfileSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal('')),
})

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const result = UpdateProfileSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  // result.data is now type-safe and validated
  await updateUserProfile(user.id, result.data)
}
```

Zod's `.safeParse()` never throws. It returns `{ success: true, data }` or `{ success: false, error }`. Use it at the API boundary.

---

## Rate Limiting

Without rate limiting, your auth routes and expensive endpoints are vulnerable to brute force and abuse. Upstash is the simplest solution — free tier, Redis-backed, works in serverless.

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const authRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),  // 5 attempts per 15 minutes
  analytics: true,
})

export const apiRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),  // 100 requests per minute
})
```

```typescript
// app/api/auth/[...nextauth]/route.ts or your sign-in route
import { authRatelimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await authRatelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429 }
    )
  }

  // proceed with auth logic
}
```

Apply rate limiting to: sign-in, sign-up, password reset, and any endpoint that sends emails or does expensive computation.

---

## HTTP Security Headers

Security headers tell browsers how to handle your content. Next.js makes them easy to set globally.

```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // tighten this if possible
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https:",
    ].join('; ')
  }
]

module.exports = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    }
  ]
}
```

> [!TIP]
> Check your headers at [securityheaders.com](https://securityheaders.com) after deploying. It gives you a letter grade and specific fixes.

---

## Error Handling in Production

Never send internal error details to the client. Stack traces reveal your file structure, library versions, and sometimes data.

```typescript
// BAD — leaks implementation details
try {
  await riskyOperation()
} catch (error) {
  return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
}

// GOOD — generic message to client, full details to your logs
try {
  await riskyOperation()
} catch (error) {
  console.error('[API Error]', error)  // full error in server logs only
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
}
```

In development, you want verbose errors. In production, you want generic messages to clients and detailed logs to you.

```typescript
// lib/errors.ts
export function handleApiError(error: unknown): NextResponse {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Log with full context for debugging
  console.error('[Unhandled API Error]', {
    error,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

---

## Security Audit Checklist

Before sharing your app publicly, verify every item:

**Secrets**
- [ ] `.env` files are in `.gitignore`
- [ ] No secrets exist in Git history
- [ ] All secrets are stored in Vercel environment variables
- [ ] No API keys or credentials hardcoded in source files

**Authentication & Authorisation**
- [ ] Middleware protects all private routes
- [ ] Every API route checks authentication before doing anything
- [ ] Every database query scopes results to the authenticated user
- [ ] Session tokens use httpOnly cookies (NextAuth does this by default)

**Input Handling**
- [ ] All API route inputs validated with Zod before use
- [ ] No raw SQL string concatenation
- [ ] File uploads (if any) validate type and size before processing

**Client**
- [ ] No `dangerouslySetInnerHTML` with user-controlled content
- [ ] Auth tokens not stored in localStorage
- [ ] Sensitive data not logged to the browser console

**Infrastructure**
- [ ] Rate limiting on auth and expensive routes
- [ ] Security headers configured
- [ ] Error messages show generic text to users, full detail in server logs only
- [ ] Database connection uses SSL

---

## Prompt: Security Review

```
Copy Prompt
```

```
Review this Next.js API route for security vulnerabilities.

[paste your route handler code]

My setup:
- Next.js App Router
- Prisma ORM
- Auth via [NextAuth / Clerk / other]
- Input validation via Zod

Check for:
1. Missing or bypassable authentication
2. Broken access control (can a user access another user's data?)
3. Missing input validation or insufficient constraints
4. Sensitive data returned to the client that shouldn't be
5. SQL injection risk (raw queries, string interpolation)
6. Missing rate limiting on sensitive operations
7. Error messages that reveal implementation details

For each issue found:
- Rate severity: Critical / High / Medium / Low
- Explain the attack vector
- Show the fixed code

If the route is secure, confirm it and explain why.
```

---

## What Comes Next

Your app is live and defended against the most common attacks on personal projects.

**Phase 5 — Growth Lite** covers what happens after you ship:

- **Analytics** — understanding who uses your app and how
- **Launch Checklist** — the final checklist before you share widely
- **Presentation Prep** — if you're showing this to anyone
- **Pitch Deck** — if you're taking it further

Security isn't a phase you complete. It's a habit you build. Reviewing new AI-generated routes against the checklist above takes two minutes and prevents the mistakes that take hours to clean up.
