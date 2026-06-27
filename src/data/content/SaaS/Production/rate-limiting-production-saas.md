---
title: Rate Limiting
slug: rate-limiting
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Rate Limiting

Your API is public-facing. Without rate limiting, a single misconfigured client, a scraper, a bot, or a malicious actor can exhaust your database connections, inflate your AI costs, trigger Stripe abuse flags, or take your service down entirely — often by accident.

Rate limiting is not about distrust. It's about protecting your system from volume it was never designed to handle, regardless of intent.

---

## What Rate Limiting Protects

| Threat | Without Rate Limiting |
|---|---|
| Credential stuffing | Thousands of login attempts per second |
| AI endpoint abuse | One user burns $500 of OpenAI credits |
| Scraping | Entire database exported via API pagination |
| Accidental loops | Bug in client hammers your server |
| DDoS amplification | Expensive endpoints overwhelmed |
| Free tier abuse | One user consumes resources meant for thousands |

Every SaaS has at least one endpoint that's expensive to serve. Rate limiting is what keeps one user's behaviour from becoming your infrastructure problem.

---

## Rate Limiting Strategies

Choose the right algorithm for the right use case. They have meaningfully different behaviour.

### Fixed Window
Counts requests in a fixed time window (e.g. 100 requests per minute, reset at :00).

```
Simple. Fast. Predictable.
Weakness: allows 2x burst at window boundary (100 at :59, 100 at :00).
Use for: general API limits, dashboard endpoints.
```

### Sliding Window
Counts requests in a rolling window relative to the current time.

```
Smoother. More accurate.
Slightly more expensive to compute.
Use for: endpoints where burst spikes are a real concern.
```

### Token Bucket
Users accumulate tokens over time and spend one per request. Burst is allowed up to bucket capacity.

```
Most flexible. Allows natural bursts.
Requires more state.
Use for: APIs where bursty-but-bounded behaviour is acceptable.
```

### Leaky Bucket
Requests queue and process at a fixed rate. Excess is dropped.

```
Smoothest throughput. No burst.
Use for: webhooks, outbound email sending, rate-limited third-party APIs.
```

> **For most SaaS endpoints:** sliding window. It's the right balance of accuracy and cost. Use token bucket when you want to reward infrequent users with burst capacity.

---

## Where to Apply Rate Limiting

Rate limiting is not one rule applied everywhere. Different endpoints have different risk profiles.

### Tier 1 — Critical (apply immediately)

```
POST /auth/login              → 5 requests / 15 min per IP
POST /auth/register           → 3 requests / hour per IP
POST /auth/forgot-password    → 3 requests / hour per IP
POST /auth/verify-otp         → 5 requests / 15 min per IP
```

These are your highest-abuse-risk endpoints. A brute-force attack starts here.

### Tier 2 — Expensive (apply before launch)

```
POST /api/ai/*                → per-user, per plan tier
POST /api/export/*            → 10 requests / hour per user
GET  /api/search              → 60 requests / min per user
POST /api/webhooks/send       → plan-based
```

Expensive to serve. Abuse here directly costs you money.

### Tier 3 — General API (apply at scale)

```
All authenticated endpoints   → 1000 requests / min per user
All unauthenticated endpoints → 100 requests / min per IP
```

Catch-all protection. Prevents runaway clients from overwhelming the system.

---

## Implementation

### Redis-Backed Rate Limiting (Recommended)

Redis is the standard backing store for rate limiting. It's fast, atomic, and works across multiple server instances.

```typescript
// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
})

// Define limiters per use case
export const limiters = {
  // Auth endpoints — strict
  login: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "rl:login"
  }),

  // General API — per authenticated user
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
    analytics: true,
    prefix: "rl:api"
  }),

  // AI endpoints — expensive, plan-gated separately
  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.tokenBucket(20, "1 m", 20),
    analytics: true,
    prefix: "rl:ai"
  })
}
```

### Applying in Middleware (Next.js)

```typescript
// middleware.ts
import { limiters } from "@/lib/ratelimit"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown"
  const path = req.nextUrl.pathname

  // Auth endpoints — rate limit by IP
  if (path.startsWith("/api/auth/login")) {
    const { success, limit, remaining, reset } = await limiters.login.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString()
          }
        }
      )
    }
  }

  return NextResponse.next()
}
```

### Applying in Route Handlers

```typescript
// app/api/ai/generate/route.ts
import { limiters } from "@/lib/ratelimit"
import { getSession } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  // Rate limit by user ID — not IP (authenticated endpoint)
  const { success, remaining } = await limiters.ai.limit(session.user.id)

  if (!success) {
    return Response.json(
      { error: "AI rate limit reached. Try again shortly." },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": "0" }
      }
    )
  }

  // Continue with AI call...
}
```

---

## Rate Limit Keys — What to Limit By

The key you choose determines what the limit applies to.

| Key | Use When |
|---|---|
| IP address | Unauthenticated endpoints, auth endpoints |
| User ID | Authenticated endpoints |
| Tenant ID | Multi-tenant: share limit across org members |
| API key | External API consumers |
| `${userId}:${endpoint}` | Per-user per-endpoint limits |
| `${tenantId}:ai` | AI usage shared across an org |

> **Never use IP alone for authenticated endpoints.** Corporate NATs can put hundreds of users behind one IP. You'd rate limit an entire enterprise client.

---

## Plan-Based Rate Limits

In SaaS, rate limits are often a monetization lever. Free users get 10 AI requests/day. Pro users get 500. Enterprise is unlimited.

```typescript
const PLAN_LIMITS = {
  free:       { ai: 10,  exports: 2,   apiPerMin: 60  },
  pro:        { ai: 200, exports: 50,  apiPerMin: 500 },
  enterprise: { ai: -1,  exports: -1,  apiPerMin: -1  }  // -1 = unlimited
} as const

async function checkAiLimit(userId: string, plan: keyof typeof PLAN_LIMITS) {
  const limit = PLAN_LIMITS[plan].ai
  if (limit === -1) return { allowed: true }  // Unlimited

  const { success, remaining } = await new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(limit, "24 h"),
    prefix: `rl:ai:${plan}`
  }).limit(userId)

  return { allowed: success, remaining }
}
```

Surface this in your UI. Users should see how many AI requests they have left. Hitting a silent limit and seeing nothing happen is a frustrating experience that generates support tickets.

---

## Responding to Rate Limits Correctly

The HTTP status code for rate limiting is `429 Too Many Requests`. Always include these headers:

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1719532800
Retry-After: 47
Content-Type: application/json

{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Try again in 47 seconds.",
  "retryAfter": 47
}
```

`Retry-After` is a standard header. Well-behaved API clients and SDKs will respect it automatically. Include it every time.

---

## Edge vs Application Rate Limiting

You can rate limit at two layers. Both have a role.

| Layer | Tool | Strength |
|---|---|---|
| **Edge / CDN** | Cloudflare, Vercel Edge, AWS WAF | Stops traffic before it hits your server. Cheapest protection. |
| **Application** | Your code + Redis | Plan-aware, user-aware, business-logic aware. |

Edge rate limiting catches volumetric attacks and bot floods. Application rate limiting enforces business rules. Use both.

```
Cloudflare → Block IPs sending >1000 req/min (volumetric)
Application → Enforce per-user, per-plan AI limits
```

Setting up a basic Cloudflare rate limiting rule costs nothing and takes 5 minutes. Do it.

---

## Distributed Systems Consideration

If you run multiple server instances, in-memory rate limiting breaks. Two requests hit two servers — both pass, neither knows about the other.

**Always use a centralised store (Redis) for rate limiting in production.** Local memory rate limiting is only valid for single-instance deployments.

Upstash Redis is the simplest managed solution: serverless, pay-per-request, no connection pooling issues.

---

## Monitoring Rate Limit Events

Rate limiting without observability is a black box. Log rate limit hits and watch for patterns.

```typescript
if (!success) {
  logger.warn("rate_limit.exceeded", {
    key: identifier,
    endpoint: req.nextUrl.pathname,
    limit,
    ip: req.ip,
    userId: session?.user.id
  })

  // If the same user hits rate limits repeatedly across many endpoints
  // in a short window, that's a signal worth alerting on
}
```

Look for:
- Single IPs hitting auth limits repeatedly → credential stuffing
- Single users exhausting AI limits daily → potential upgrade or abuse
- Spikes in 429s on a specific endpoint → client bug or scraper

---

## AI Prompt — Rate Limiting Design

Use this to get a tailored rate limiting plan for your specific API surface.

<copy-prompt>
You are a Staff Engineer helping design rate limiting for a production SaaS application.

My application:
- Type: [SAAS DESCRIPTION]
- Stack: [YOUR STACK]
- Auth: [AUTH METHOD]
- Plans: [FREE / PRO / ENTERPRISE — with what limits]
- Most expensive endpoints: [LIST YOUR AI / EXPORT / SEARCH ENDPOINTS]
- Current infrastructure: [SERVERLESS / CONTAINERS / VMS]
- Redis available: [YES / NO]

Design a complete rate limiting strategy including:
1. Which endpoints need rate limiting and at what thresholds
2. What key to rate limit by (IP / user / tenant) for each endpoint
3. Which algorithm to use and why for each tier
4. How plan-based limits should work
5. What to log and monitor
6. Edge vs application layer split

Be specific with numbers. Explain the reasoning behind each threshold.
</copy-prompt>

---

## Rate Limiting Checklist

- [ ] Redis (or equivalent) configured as rate limit backing store
- [ ] Auth endpoints rate limited by IP (login, register, password reset, OTP)
- [ ] AI endpoints rate limited by user ID and plan tier
- [ ] Export / bulk endpoints rate limited
- [ ] General API catch-all limit in place
- [ ] All 429 responses include `Retry-After` header
- [ ] Rate limit errors return `429` (not `400` or `403`)
- [ ] Plan-based limits implemented and enforced server-side
- [ ] Remaining quota surfaced in the UI for key features (AI, exports)
- [ ] Rate limit events logged with user ID and endpoint
- [ ] Cloudflare (or CDN) edge rule in place for volumetric protection
- [ ] Distributed-safe implementation (no in-memory limits in multi-instance deploy)
- [ ] Rate limit behaviour tested in staging
- [ ] Tested: hitting the limit returns correct response and headers
- [ ] Tested: limit resets correctly after window expires

---

## Common Mistakes

> **Mistake: Rate limiting only by IP on authenticated endpoints**
> Corporate users share IPs. You'll rate limit a paying enterprise customer's entire team based on one user's behaviour.

> **Mistake: Using in-memory rate limiting on a multi-instance deployment**
> Each instance has its own counter. Rate limits are never actually enforced. Always use Redis.

> **Mistake: Not including `Retry-After`**
> Clients that respect the header will back off automatically. Without it, they retry immediately, making the problem worse.

> **Mistake: Setting limits too low initially**
> You'll rate limit legitimate users and generate support tickets. Start generous, tighten based on observed traffic patterns.

> **Mistake: Silent rate limiting**
> User hits a limit, nothing happens in the UI, they think the feature is broken. Always communicate limits and remaining quota.

> **Mistake: Applying the same limit to all endpoints**
> `GET /api/profile` and `POST /api/ai/generate` are not the same. One is cheap, one calls an external LLM. They need different limits.

---

## Next

With rate limiting protecting your API, the next topic is **Caching** — reducing database load, improving response times, and making expensive operations affordable at scale.
