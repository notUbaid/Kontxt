---
title: Rate Limiting
slug: rate-limiting
phase: Phase 4
mode: production
projectType: ecommerce
estimatedTime: 15-20 min
---

# Rate Limiting

Your store now has working accounts, checkout, and payments. Rate limiting is what stops a single bad actor — human or bot — from hammering those endpoints faster than a real customer ever would.

This isn't a "nice to have" for a personal project. Some of what it prevents (card testing fraud, in particular) targets small, unprotected stores specifically *because* they're unprotected.

---

## Where This Fits

You're applying rate limits to endpoints you already built: login, checkout, payment submission, password reset, coupon codes. This module doesn't add features — it adds guardrails to the ones you have.

A later module, **Fraud Prevention**, covers store-specific fraud patterns in more depth. Rate limiting is your first, cheapest line of defense — get it in place now rather than waiting.

---

## Why This Matters for a Store Specifically

Generic "prevent abuse" advice undersells the real risk here:

- **Card testing** — fraudsters run stolen card numbers through small, low-traffic checkout pages because they're less likely to be monitored than large retailers. A checkout endpoint with no rate limit is an attractive target regardless of your store's size.
- **Login brute-forcing** — automated tools try common password lists against your `/login` endpoint. Without a limit, this is cheap and easy to run at scale.
- **Coupon code guessing** — if discount codes are short or predictable, an unprotected "apply coupon" endpoint can be brute-forced.
- **Search/API scraping** — competitors or bots can hit your search or product API repeatedly, inflating your hosting costs for no real traffic value.

> **💡 Tip:** Payment and checkout endpoints deserve the tightest limits in your entire store. A login brute-force attempt is annoying; unmonitored card testing can get your payment processor account flagged or suspended.

---

## What You're Building Today

- Rate limits on auth endpoints (login, signup, password reset)
- Rate limits on checkout/payment submission
- Rate limits on coupon code application
- A sensible (loose) limit on search, to control cost without annoying real users
- Clear, non-technical error messages when a limit is hit

You're **not** building a custom fraud-scoring system, IP reputation database, or CAPTCHA infrastructure. Those belong in the Fraud Prevention module, and most are overkill until you have real traffic to justify them.

---

## Choosing Your Approach

| Approach | Works on Serverless? | Cost | Best For |
|---|---|---|---|
| In-memory counter | No — resets per instance, unreliable | Free | Single long-running server only |
| **Upstash Redis (rate limit SDK)** | Yes | Free tier covers personal-scale traffic | Most personal stores (recommended) |
| Cloudflare Rate Limiting | Yes | Free tier available | Stores already proxied through Cloudflare |
| Vercel Firewall rules | Yes | Included on some plans | Stores deployed on Vercel wanting infra-level limits |

> **⚠️ Warning:** If you're deployed on a serverless platform (Vercel, Netlify, most modern hosts), an in-memory counter does not work reliably — each request can hit a different server instance with its own separate counter. You need a shared store like Redis. This is the single most common mistake in beginner rate-limiting implementations.

For a personal store, **Upstash Redis** is the right default: it's built for serverless, has a generous free tier, and the official SDK handles the sliding-window logic for you.

---

## Where to Apply Limits

| Endpoint | Suggested Limit | Why |
|---|---|---|
| Login | 5 attempts / 15 min per IP+email | Stops brute-force without locking out real typos |
| Signup | 5 / hour per IP | Slows fake-account creation |
| Password reset request | 3 / hour per email | Prevents email-bombing a target address |
| Checkout / payment submit | 5 / 10 min per session+IP | Card testing requires many rapid attempts — this blocks the pattern |
| Apply coupon code | 10 / hour per session | Stops brute-forcing short discount codes |
| Search | 60 / min per IP | Loose — protects cost, not meant to block real users |

These numbers are starting points, not rules. Adjust based on your store's real traffic once you have it — but don't ship with no limit at all "for now." Card testing bots don't wait for you to get around to it.

---

## Implementation

**Copy Prompt:**

```
I'm adding rate limiting to a personal e-commerce store built with
[your framework] deployed on [your host]. I want to use Upstash Redis
with a sliding-window algorithm.

Apply these limits:
- Login: 5 attempts per 15 min, keyed by IP + email
- Signup: 5 per hour, keyed by IP
- Password reset request: 3 per hour, keyed by email
- Checkout/payment submission: 5 per 10 min, keyed by session ID + IP
- Coupon code application: 10 per hour, keyed by session ID
- Search: 60 per minute, keyed by IP

For each, return a clear 429 response with a user-facing message that
doesn't reveal the exact limit logic (avoid wording like "rate limited
by IP" — say something like "Too many attempts, please try again in a
few minutes").

Show me the reusable rate-limit utility first, then how to apply it to
one endpoint as an example I can replicate.
```

> **💡 Tip:** Ask for one example endpoint, not all six implemented at once. Apply the pattern yourself to the remaining five — it's mechanical once you've seen it done correctly, and you'll burn far fewer tokens than asking AI to touch every route file in one pass.

---

## Why Keying Matters

A rate limit is only as good as what it's keyed on:

- **IP alone** is weak — many real users share IPs (offices, mobile carriers, VPNs), and attackers rotate IPs easily.
- **Email/session alone** is weak — an attacker can generate many sessions or try many emails.
- **IP + email/session combined** is the practical sweet spot for a personal store: cheap to implement, hard enough to route around that it stops casual abuse.

Don't chase perfect protection here. The goal is raising the cost of abuse above what's worth it for someone targeting a small store — not building bank-grade fraud infrastructure.

---

## Common Mistakes

- Rate limiting login but not signup — bots create fake accounts to get around login limits entirely
- Using in-memory counters on a serverless deploy, which silently do nothing under real load
- Setting checkout limits so tight that a real customer fixing a typo'd card number gets locked out — test your own limits before shipping them
- Returning a 429 with a message that explains exactly what triggered it ("IP rate limit exceeded") — this helps attackers tune around your defense
- Forgetting to rate limit password reset *requests*, which leaves email-bombing wide open even if login itself is protected

---

## Security Checklist

- [ ] Checkout/payment endpoint has the tightest limit in the store
- [ ] Limits are keyed on a combination (IP + email/session), not a single signal
- [ ] Rate limit storage works correctly on your actual deployment target (test on serverless, not just locally)
- [ ] 429 error messages are user-friendly and don't leak implementation details
- [ ] Password reset *requests* are limited, not just reset *attempts*
- [ ] Signup is limited as tightly as login — both are abuse vectors

---

## Validation Checklist

Before moving to Caching:

- [ ] Manually trigger the login limit (6 rapid wrong attempts) and confirm the 6th is blocked with a clear message
- [ ] Confirm a real login still works normally after waiting out the window
- [ ] Trigger the checkout limit and confirm it blocks rapid resubmission without breaking a normal, single checkout attempt
- [ ] Test on your actual deployed environment, not just `localhost` — serverless rate limiting bugs often only show up in production

---

## AI Review Prompt

```
Review this rate-limiting implementation for an e-commerce store. Check:

1. Does the storage mechanism actually work on a serverless/multi-instance
   deployment, or will it silently fail under real load?
2. Is the checkout/payment endpoint the most tightly limited route?
3. Could any limit be bypassed by an attacker who simply varies one part
   of the key (e.g., rotating email while keeping IP constant)?
4. Do any error messages leak details that would help an attacker tune
   around the limit?

Flag anything that would pass casual testing but fail under a real
abuse attempt.
```

---

## What Comes Next

With abuse-prone endpoints protected, the next step is making the *legitimate* traffic fast. Next: **Caching** — deciding what to cache, for how long, and how to avoid serving stale prices or stock counts.
