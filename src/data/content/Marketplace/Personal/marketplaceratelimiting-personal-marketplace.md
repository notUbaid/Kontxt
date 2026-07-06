---
title: Rate Limiting
slug: rate-limiting
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Rate Limiting

You added basic rate limits on login, listing creation, and messaging back in the Security module — enough to block the most obvious abuse. This module makes that systematic: a deliberate rate-limiting strategy across your whole API, not just the three endpoints that felt urgent at the time.

The goal isn't to rate-limit everything equally. It's to match the limit to what each endpoint is actually worth to an attacker.

---

## Rate Limiting Is Risk-Based, Not Uniform

> ** Core rule:** the right limit for an endpoint depends on what abusing it gets the attacker, not on a single global number. A search endpoint and a checkout endpoint have completely different abuse profiles.

| Endpoint type | Abuse scenario | Suggested limit |
|---|---|---|
| Login | Credential stuffing | 5 attempts / 15 min per IP+account |
| Listing creation | Spam/scraper flooding | 10 / hour per account |
| Messaging (send) | Harassment, spam | 20 / min per thread |
| Checkout/order creation | Payment fraud testing, inventory abuse | 5 / min per account |
| Search/browse (`GET`) | Scraping, but low individual cost | 100 / min per IP |
| Review submission | Already constrained by one-per-order | Low risk, light limit still useful |
| Password reset request | Email bombing a target user | 3 / hour per email |

This table is a starting point, not a rulebook — the right numbers depend on your real usage patterns. The reasoning behind each row matters more than the specific number.

---

## Decision: Where to Enforce Limits

> ** Decision Card — Rate Limit Layer**
>
> **Option A: In-memory, per-process** (e.g. `express-rate-limit` with default memory store)
> Zero extra infrastructure, works great for a single-server personal project. Resets if the server restarts, and doesn't share state across multiple server instances.
>
> **Option B: Shared store** (e.g. Redis-backed rate limiting)
> Correct for multi-instance deployments, meaningfully more setup.
>
> **For Personal Mode: use Option A.** If you're running a single server instance — which most personal projects are — in-memory rate limiting is correct, not a shortcut. Don't add Redis purely for rate limiting until you actually scale to multiple instances.

```js
import rateLimit from "express-rate-limit";

const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.user?.id ?? req.ip, // per-account when known, else per-IP
  message: { error: "Too many checkout attempts, please slow down" },
});

router.post("/orders", requireAuth, checkoutLimiter, createOrder);
```

---

## Per-Account vs. Per-IP: Choose Deliberately

This distinction trips people up constantly, and the wrong choice either fails to stop abuse or breaks legitimate shared-network users.

> ** Validation Checklist**
- [ ] Does login limiting key on IP (since the account isn't authenticated yet)?
- [ ] Does listing creation / checkout key on account ID, not IP? (Multiple legitimate users on the same network — office, university, shared NAT — shouldn't share one limit)
- [ ] For unauthenticated endpoints (public search), is IP-based limiting generous enough to not break normal browsing, but tight enough to deter scraping?

---

## Response Behavior: Don't Just Block Silently

> **️ Warning:** Returning a bare `429` with no explanation, or worse, silently dropping the request, makes debugging "why isn't this working" miserable for legitimate users who hit a limit accidentally (e.g. a buyer double-clicking "send message" a few times). Always return a clear error and, where practical, a `Retry-After` header.

```js
const messageLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => `${req.user.id}:${req.params.threadId}`,
  handler: (req, res) => {
    res.status(429).json({
      error: "You're sending messages too quickly. Please wait a moment.",
    });
  },
});
```

---

## Rate Limiting Isn't a Substitute for Authorization

> ** Common Hallucination:** AI sometimes suggests rate limiting as a fix for what's actually an authorization gap — e.g. "rate limit the listing edit endpoint to prevent abuse" when the real issue is that endpoint doesn't check ownership at all. Rate limiting slows down abuse of a properly-secured endpoint; it does nothing to fix a missing authorization check. If an endpoint lets anyone edit anyone's listing, no rate limit fixes that — go back to your Authorization Rules middleware.

---

## AI Prompt: Apply Rate Limiting Systematically

> ** Copy Prompt**
>
> ```
> Add rate limiting across my marketplace API. I already have basic limits on login,
> listing creation, and messaging — extend this systematically to the rest of the app.
> Stack: [YOUR STACK — e.g. Node.js/Express, express-rate-limit].
>
> For each endpoint below, suggest an appropriate limit and whether it should key on
> IP or account ID, with a one-sentence justification based on the abuse scenario:
- POST /orders (checkout)
- GET /listings (search/browse)
- POST /listings/:id/review
- POST /auth/password-reset-request
- PATCH /listings/:id/status
>
> Use express-rate-limit with custom keyGenerator functions. Return clear 429 error
> messages, not silent drops. Don't suggest Redis — single-server in-memory limiting
> is correct for this project's scale.
>
> Existing routes:
> [PASTE YOUR ROUTE FILES]
> ```
>
> **Why this prompt works:** asking for a justification per endpoint, not just a number, forces AI to reason about the actual abuse scenario instead of pattern-matching a generic "add rate limiting" response — which tends to apply the same arbitrary limit everywhere regardless of risk.

---

## Validating AI Output

> ** Validation Checklist**
- [ ] Does each limit's `keyGenerator` match the IP-vs-account decision appropriate for that endpoint? (Login → IP; checkout → account)
- [ ] Are the suggested numbers actually justified, or just copy-pasted defaults across every route?
- [ ] Does the response include a clear error message, not a bare status code?
- [ ] Did AI suggest rate limiting as a workaround for a missing authorization check anywhere? (Reject that suggestion — fix the auth gap instead)

---

## Token Efficiency Tip

You don't need AI to re-derive rate limiting theory each time — once you have a working pattern (the `keyGenerator` + `handler` shape above), future prompts only need "apply the same rate-limiting pattern to this new endpoint, with a limit appropriate for [abuse scenario]." Paste the existing limiter as an example rather than re-explaining the whole concept.

---

## What You've Decided

By the end of this module you should have:

- Risk-based limits across checkout, search, reviews, and password reset — not just the three endpoints from Security
- A deliberate IP-vs-account key choice per endpoint, justified by its abuse scenario
- Clear, non-silent error responses when a limit is hit
- Confirmation that no rate limit is papering over a missing authorization check
- In-memory limiting appropriate for your single-server deployment

**Next:** Caching — speeding up repeated reads without introducing staleness bugs.
