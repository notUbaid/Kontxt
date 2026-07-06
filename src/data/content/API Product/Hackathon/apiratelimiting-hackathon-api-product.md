---
title: Rate Limiting
slug: rate-limiting
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 8-12 min
---

# Rate Limiting

This is a small module with one outsized risk: if your API calls anything that costs money internally — a paid LLM API, a third-party data service — rate limiting isn't a nice-to-have. It's the difference between a hackathon demo and a surprise bill.

---

## Why This Matters Even at Hackathon Scale

> **Warning — An unprotected endpoint in front of a paid API is a real financial risk, not a theoretical one.**
> If your core loop calls something like an LLM API internally, a public demo URL with no rate limiting means anyone who finds it — a bot, a curious judge, an automated scanner — can run up usage on your account. This is worth 15 minutes of protection regardless of how little time is left.

Beyond cost protection, basic rate limiting is also one of those details — like consistent error shapes — that signals engineering maturity to anyone reviewing your API closely.

---

## Keep the Implementation Simple

> **Decision Card — In-memory is fine for a hackathon, with one caveat**
> A simple in-memory counter (via a library, not hand-rolled) is sufficient if you're running on a traditional server with one instance. If you're on serverless, in-memory state resets on every cold start and **won't actually limit anything reliably** — you'd need a shared store (like Redis) for it to work correctly there.

For most hackathon builds on a traditional server (Express on Railway/Render), use an existing library (e.g. `express-rate-limit`) rather than building a rate limiter from scratch — this is solved territory, and your time is better spent elsewhere.

---

## What to Limit By

| Your situation | Limit by |
|---|---|
| Endpoints protected by API key auth | Per API key |
| Endpoints intentionally left open for your demo app (from Authentication Implementation) | Per IP address |

---

## Set Limits With Headroom, Not Paranoia

> **Tip — Test your rate limit against your own demo script before you trust it.**
> A limit set too aggressively will rate-limit *you*, live, in front of judges — which is a worse outcome than having no rate limiting at all. Run through your full demo sequence multiple times in a row and set your limit comfortably above that volume.

A reasonable hackathon-scale default: generous enough that your demo, plus a judge trying it themselves a few times, never gets close to the limit — tight enough that automated abuse gets stopped quickly.

---

## Return the Right Response

A rate-limited request should return `429`, using your locked error shape, plus standard headers that tell the caller how to behave:

> **Quick Reference — Rate limit response**
> ```
> Status: 429
> Headers:
>   X-RateLimit-Limit: 100
>   X-RateLimit-Remaining: 0
>   Retry-After: 60
> Body: { "error": { "code": "RATE_LIMITED", "message": "Too many requests, retry after 60s" } }
> ```

These headers are a small, cheap detail that any developer integrating your API will recognize immediately — it's the same pattern used by Stripe, GitHub, and most major APIs.

---

## Implement With AI

> **Copy Prompt — Rate Limiting Middleware**
> ```
> My stack: [from Tech Stack Selection]
> Deployment target: [traditional server / serverless]
> My locked error response shape: [paste]
> Limit by: [API key / IP address]
>
> Implement rate limiting middleware using an existing library, not a
> custom implementation. Return 429 with my exact error shape and
> standard rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining,
> Retry-After). If I'm on serverless, tell me directly whether in-memory
> limiting will actually work reliably, or if I need a shared store.
> ```

> **Tip — Explicitly ask about the serverless caveat rather than assuming it's handled.**
> This is the kind of limitation that's easy for AI to gloss over if not asked directly — and easy for you to discover too late if you assume an in-memory solution "just works" everywhere.

---

## Validate the Output

- Confirm it's using an established library, not hand-rolled counting logic that's harder to trust under time pressure.
- If you're on serverless, confirm the AI's answer about whether in-memory limiting actually works — if it doesn't, decide explicitly whether to add a shared store or accept the gap for hackathon scope.
- Run your full demo sequence against the live limit and confirm you don't trip it yourself.

---

## Lock Your Rate Limiting

- [ ] Implemented with an established library, not custom logic
- [ ] Limit value tested against your own full demo sequence, with headroom
- [ ] 429 response uses your locked error shape, with standard headers
- [ ] Serverless in-memory limitation acknowledged and addressed if relevant
- [ ] Any internally-called paid API is protected from runaway usage

---

## What's Next

**Testing** — verify your core loop actually works end-to-end, including the edge cases that tend to surface live, in front of judges.
