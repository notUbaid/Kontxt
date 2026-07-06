---
title: Rate Limiting
slug: rate-limiting
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# Rate Limiting

Without rate limiting, one misbehaving script — a bug in someone's integration, a retry loop with no backoff, or a scraper — can take your entire API down for every other user. Rate limiting isn't a "scale later" concern. It's the difference between one bad actor causing a bad day for them, or a bad day for everyone.

It also becomes your enforcement mechanism for pricing tiers the moment you decide to charge for the API.

---

## The Core Decision: Algorithm

| Algorithm | How it works | Trade-off |
|---|---|---|
| **Fixed window** | Count requests per fixed time block (e.g., per minute) | Simple, but allows a burst at window boundaries (2x limit possible) |
| **Sliding window** | Counts requests in a rolling time frame | Smooths out boundary bursts, slightly more computation |
| **Token bucket** | Bucket refills at a steady rate; each request costs a token | Allows short bursts while enforcing a long-term average — closest to how most APIs actually want to behave |

> **Decision card — Recommended for Personal mode**
> Use **token bucket**. It's the standard behind Stripe's and GitHub's public rate limiters, it's well-supported by existing libraries (don't write this from scratch), and it naturally supports the "allow small bursts, cap sustained load" behavior developers expect from a well-built API.

---

## Where to Store Counters

| Option | Fits when |
|---|---|
| **In-memory** | Single server instance, personal project, no horizontal scaling planned soon |
| **Redis** | Multiple instances/serverless functions need to share one count |

> [!TIP]
> > Start in-memory. It's zero infrastructure and correct for a solo-built API running on a single instance. Switch to Redis only when you actually deploy multiple instances — premature Redis setup is infrastructure you'll maintain for a problem you don't have yet. The library recommended below supports both with the same interface, so switching later is a config change, not a rewrite.

---

## Implementation

Don't hand-roll token bucket math. Use a maintained library — this is a solved problem with subtle edge cases (clock drift, concurrent requests) that aren't worth re-debugging yourself.

```typescript
// lib/rate-limit.ts
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiters = {
  read: new RateLimiterMemory({ points: 100, duration: 60 }),  // 100 req/min
  write: new RateLimiterMemory({ points: 20, duration: 60 }),  // 20 req/min
};

export async function checkRateLimit(key: string, type: "read" | "write") {
  try {
    const result = await limiters[type].consume(key);
    return { allowed: true, remaining: result.remainingPoints, resetMs: result.msBeforeNext };
  } catch (rejection) {
    return { allowed: false, remaining: 0, resetMs: rejection.msBeforeNext };
  }
}
```

```typescript
// middleware/rate-limit.ts
export async function rateLimit(req, res, next) {
  // Key by API key if present, otherwise by IP — never rate-limit
  // unauthenticated traffic more leniently than authenticated traffic
  const identifier = req.apiKey?.id ?? req.ip;
  const type = req.method === "GET" ? "read" : "write";

  const { allowed, remaining, resetMs } = await checkRateLimit(identifier, type);

  res.set({
    "X-RateLimit-Limit": type === "read" ? "100" : "20",
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetMs / 1000)),
  });

  if (!allowed) {
    res.set("Retry-After", String(Math.ceil(resetMs / 1000)));
    return res.status(429).json({ error: "Rate limit exceeded. Try again shortly." });
  }
  next();
}
```

> **Warning — always expose rate limit headers**
> `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` let well-behaved clients back off before they get a 429 at all. Omitting them is one of the most common developer-experience complaints about hand-built APIs — developers integrating with you have to guess your limits instead of reading them.

---

## What to Key Limits By

Rate limit **per API key**, not per IP, whenever the request is authenticated. IP-based limiting punishes every user behind a shared IP (offices, VPNs, cloud NAT) for one bad actor, and does nothing to stop a single user with multiple IPs.

```
Authenticated request  → key by req.apiKey.id
Unauthenticated request → key by req.ip (stricter limit)
```

---

## Tiering Limits (Set Up Now, Enforce Later)

Even without billing built yet, structure your limiter so tiers are a config lookup, not a rewrite:

```typescript
const TIER_LIMITS = {
  free:       { read: 100, write: 20 },
  pro:        { read: 1000, write: 200 },
};

function getLimitsForKey(apiKey) {
  return TIER_LIMITS[apiKey.tier ?? "free"];
}
```

This costs almost nothing to add now and saves you from refactoring every route when you add a paid tier later — a change you'll likely make once your API has real users.

---

## AI Prompt: Implement Rate Limiting

```
I'm adding rate limiting to a [framework] API using [in-memory /
Redis] storage.

Requirements:
- Token bucket algorithm via a maintained library (not hand-rolled)
- Separate limits for read (GET) vs write (POST/PUT/PATCH/DELETE)
  requests
- Key by authenticated API key ID when present, otherwise by IP
- Return standard headers on every response: X-RateLimit-Limit,
  X-RateLimit-Remaining, X-RateLimit-Reset
- On limit exceeded, return 429 with a Retry-After header
- Structure limits so they can later vary by a "tier" field on the
  API key without changing the middleware logic

Generate the middleware and show how to apply it to a route.
```

---

## Validating AI Output

AI-generated rate limiters commonly get these wrong — check for them specifically:

- **Missing headers on the success path.** It's common for generated code to only set rate-limit headers in the 429 branch. Clients need them on every response to self-throttle proactively.
- **IP-only keying even when auth is available.** Confirm the code prefers `apiKey.id` over `req.ip` when the request is authenticated.
- **No distinction between read and write limits.** A single shared bucket lets a burst of cheap GETs starve out legitimate writes.
- **In-memory store assumed to work across serverless invocations.** If you're deploying to serverless functions, in-memory state doesn't persist between invocations — verify the generated code matches your actual deployment target.

---

## Common Mistakes

- Rate limiting only the expensive endpoints and leaving cheap ones (like health checks or lookups) unlimited — those get abused precisely because they're unprotected.
- Setting limits so tight that normal, well-behaved usage trips them. Base your initial numbers on realistic expected usage, not guesswork, and expect to tune them after real traffic.
- Not rate limiting the login/API-key-creation endpoints themselves — these are prime targets for brute-force and deserve stricter limits than general API traffic.

---

## Validation Checklist

- [ ] Rate limit headers (`Limit`, `Remaining`, `Reset`) are present on every response, not just 429s
- [ ] 429 responses include `Retry-After`
- [ ] Authenticated requests are keyed by API key, not IP
- [ ] Read and write limits are configured separately
- [ ] Auth-adjacent endpoints (login, key creation) have their own, stricter limits
- [ ] Limits are structured as config, not hardcoded per-route, so tiering is a future config change

---

## What's Next

With traffic protected, the next module — **Background Jobs** — covers moving slow or unreliable work (emails, webhooks, third-party calls) off the request/response cycle so your rate-limited endpoints stay fast.
