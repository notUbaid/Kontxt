---
title: Rate Limiting Strategy
slug: rate-limiting-strategy
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 10–15 min
---

# Rate Limiting Strategy

You already committed to a rate limit number back in **Monetization Strategy** — this module turns that number into an actual strategy: how it's measured, how it's communicated, and what happens when someone hits it. Without this, "rate limited" means nothing concrete to either you or your callers.

Rate limiting isn't just a business lever. On a personal project it's primarily a defensive one — the thing standing between a bug in your own test script (or someone else's) and a hosting bill you didn't expect.

## Pick a Limiting Algorithm

You don't need to build something sophisticated. Pick the simplest one that does the job.

| Algorithm | How it works | Good for |
|---|---|---|
| **Fixed window** | X requests per fixed time block (e.g. per calendar minute) | Simplest to implement; slight edge-case burst risk at window boundaries |
| **Sliding window** | X requests per rolling time period | More accurate, marginally more complex |
| **Token bucket** | Requests consume tokens that refill over time, allowing bursts | Best when you want to allow occasional bursts without raising the sustained limit |

For a personal API, **fixed window** is almost always sufficient. The boundary edge case it has (a caller could theoretically send 2x their limit right at a window transition) rarely matters at personal-project scale. Don't reach for token bucket complexity to solve a problem you don't have.

## Always Return Rate Limit Headers

This is the single highest-leverage thing you can do here — and it costs almost nothing to implement:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1719849600
```

Every response — successful or not — should carry these. A caller who can see their remaining quota builds around it gracefully. A caller who finds out by getting a `429` builds fragile, surprised code, and usually blames your API for being unpredictable rather than blaming their own missing header check.

> **Tip:** This one design choice does more for perceived API quality than almost anything else in this phase. It's the difference between an API that feels professionally built and one that feels like a weekend project — even when both have identical actual functionality.

## What Happens at the Limit

Already partially decided in **Error Design** — confirm it's consistent here:

- Status code: `429 Too Many Requests`
- Include a `Retry-After` header (seconds until they can try again) — don't make the caller guess or poll
- Error body follows your standard error shape, with a code like `rate_limit_exceeded`

## Scope the Limit Correctly

Decide what the limit applies *per* — this matters more than the exact number:

- [ ] **Per API key** — the standard default; each caller's key has its own quota
- [ ] **Per IP** — useful as an additional layer against unauthenticated abuse (e.g. hammering your signup endpoint), but not a substitute for per-key limits on authenticated routes
- [ ] **Per endpoint** — some endpoints (expensive ones, like anything triggering external API calls) may warrant a stricter limit than simple reads

Most personal APIs need only per-key limiting on authenticated routes, plus a basic per-IP limit on any public/unauthenticated endpoint (like signup) to prevent abuse before a key even exists.

## Personal Mode: A Generous, Simple Limit Beats a Precise, Complex One

You don't need tiered limits, burst allowances, or different limits per plan — that's **Pricing Evolution** territory for Phase 6, once you have real usage data to base it on. Pick one number, generous enough that legitimate use never hits it, strict enough that a runaway script can't run up real costs. Revisit it once you have actual traffic to look at.

## AI Prompt: Sanity-Check Your Limit Number

```
My API's use cases: "[paste from MVP Scope]"
My planned rate limit: [X requests per Y time period]

1. For a typical legitimate integration using this API as intended, would this limit ever realistically be hit? If so, is that intentional?
2. Is this limit strict enough to meaningfully protect against a runaway script or basic abuse?
3. Suggest the rate limit header values I should return, and confirm the 429 response should include Retry-After.
```

## Before You Continue

- [ ] I've picked a limiting algorithm (fixed window, for most personal projects)
- [ ] Every response will include rate limit headers, not just error responses
- [ ] I know what the limit applies per (key, IP, or both) for each relevant endpoint

When all three are checked, move to **SDK Strategy**.
