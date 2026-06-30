---
title: Authentication Implementation
slug: authentication-implementation
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Authentication Implementation

You decided on API key auth in Phase 1. This module builds the actual middleware — and resolves one practical problem that catches teams off guard: what happens when your *own demo app* needs to call a protected endpoint from the browser.

---

## How Many Keys Do You Actually Need?

> **Decision Card — Single key vs. key table**
> - **Single static key** (stored in an environment variable) — correct if you're the only real caller: your demo app and your own testing. Fastest to build, nothing to manage.
> - **Key table in your database** — only needed if your demo specifically involves multiple distinct callers with different keys (e.g. showing per-caller rate limits as a feature).

For most hackathon API products, a single static key is the right call. Don't build key issuance and management infrastructure for a capability your demo won't actually show.

---

## Implement the Middleware

> **Example — API key middleware (Express-style)**
> ```js
> function requireApiKey(req, res, next) {
>   const authHeader = req.headers['authorization'];
>   const key = authHeader?.replace('Bearer ', '');
>
>   if (!key || key !== process.env.API_KEY) {
>     return res.status(401).json({
>       error: { code: 'UNAUTHORIZED', message: 'Invalid or missing API key' },
>     });
>   }
>   next();
> }
> ```

This matches your locked error shape from Response Design and your locked header convention from Authentication Strategy — no new decisions here, just implementation.

---

## A Subtle Security Detail Worth Getting Right

> **Tip — Use a constant-time comparison if you're checking against a key stored in your database.**
> A simple `===` comparison can theoretically leak timing information about how much of the key matched. For a single static key compared against an environment variable, this risk is negligible and `===` is fine. If you move to a key table, use your language's constant-time comparison function (e.g. Node's `crypto.timingSafeEqual`) instead.

---

## The Problem Almost Every Team Hits: Your Demo App Needs a Key Too

If your demo app is a browser-based client calling your protected API directly, the API key has to live somewhere in that page's code — which means anyone viewing the page source can see it.

> **Warning — A key embedded in client-side JavaScript is visible to anyone, by design.**
> This isn't a hackathon shortcut you accidentally took — it's how browsers fundamentally work. Don't try to "hide" it with obfuscation; that doesn't actually protect it.

You have two reasonable options:

| Option | When to use it |
|---|---|
| **Leave the demo-facing core loop endpoints unauthenticated**, document this explicitly | Fastest, fine for a hackathon demo — be upfront about it if asked, don't pretend otherwise |
| **Add a tiny proxy endpoint** in your own backend that holds the key server-side and forwards the request | Use if your demo specifically needs to show auth working end-to-end as part of the pitch |

> **Tip — Most hackathon judges care that you understand this trade-off, not that you've eliminated it.**
> Being able to explain "the demo app's core endpoints are open for live testing; the API itself supports key auth for real integrations" is a stronger answer than silently exposing a key and hoping nobody checks.

---

## Apply Middleware Consistently

Go back to your route files. Every protected route needs `requireApiKey` (or your framework's equivalent) applied — and it needs to run *before* the route handler, per the middleware order you locked in the Routing module.

> **Warning — A protected route that forgot to apply the middleware fails silently, not loudly.**
> It doesn't error — it just works without auth, which you might not notice until someone points it out. Check every protected route in your table explicitly; don't assume registering the middleware once at the top automatically applies everywhere, depending on your framework's behavior.

---

## Implement Auth With AI

> **Copy Prompt — Auth Middleware Implementation**
> ```
> My stack: [from Tech Stack Selection]
> My locked auth strategy: [paste — API key, header format]
> My locked error response shape: [paste]
> Key storage: [single static key in env var / key table]
>
> Implement the auth middleware:
> - extract the key from the Authorization header
> - validate it against [env var / database], return 401 with my exact
>   error shape if invalid or missing
> - show me exactly which of my routes need this applied
> ```

> **Tip — Ask explicitly which routes need it.**
> This forces a check against your actual route table rather than leaving "which routes are protected" as an assumption you might get wrong.

---

## Validate the Output

- Test with no key, an invalid key, and a valid key — confirm `401` for the first two, success for the third.
- Confirm the key is never logged anywhere, including in error messages — a logged key is a leaked key.
- Check every protected route in your locked route table actually has the middleware applied, by testing each one directly, not by assuming.
- If your demo app calls protected endpoints from the browser, confirm you've made a deliberate choice about the key-exposure trade-off above, not an accidental one.

---

## Lock Your Auth Implementation

- [ ] Middleware implemented, matching your locked header format and error shape
- [ ] Every protected route tested individually for correct 401 behavior
- [ ] Key never appears in logs or error messages
- [ ] Demo app's key-handling approach deliberately chosen, not accidental

---

## What's Next

**Rate Limiting** — add a basic safeguard against abuse, sized appropriately for a hackathon demo rather than a production system.
