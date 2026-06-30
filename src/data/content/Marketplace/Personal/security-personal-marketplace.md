---
title: Security
slug: security
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Security

You've already built most of your security posture without calling it that — authorization checks, server-side validation, input sanitization. This module fills the remaining gaps: the categories of vulnerability that don't show up until someone deliberately tries to break your app, rather than just use it.

Marketplaces are an above-average target. They hold payment intent, personal messages, and real transactions — even a personal project handling test data can have real user accounts, real emails, and real passwords if you don't isolate it properly.

---

## The Marketplace-Specific Threat Model

Generic web security advice ("use HTTPS", "hash passwords") applies, but won't catch what's specific to marketplaces. Focus your limited time here:

| Threat | Where it lives | Already covered? |
|---|---|---|
| IDOR (accessing others' resources via ID guessing) | Listings, threads, orders, reviews | ✅ Authorization Rules |
| Price/amount tampering | Checkout, order creation | Covered in Payments module |
| Mass listing scraping | Search/browse endpoints | This module |
| Account takeover via weak session handling | Auth | This module |
| Stored XSS via listing descriptions/messages | Listings, Messaging | Partially — revisit below |
| Fake/spam listings at scale | Listing creation | This module |

---

## Stored XSS: The Gap Most Beginners Leave Open

You sanitized message bodies in the Messaging module. Listing descriptions need the same treatment — and it's commonly forgotten because "it's just a product description."

> **⚠️ Warning:** Any field a user controls that another user later *views* is a stored XSS risk: listing title, description, review comments, seller bio. If you render these as raw HTML anywhere, a malicious seller can inject a script that runs in every buyer's browser who views their listing.

```js
import sanitizeHtml from "sanitize-html";

function cleanUserContent(input) {
  return sanitizeHtml(input, {
    allowedTags: [], // plain text only — marketplaces rarely need rich text in descriptions
    allowedAttributes: {},
  });
}
```

> **🔑 Rule of thumb:** sanitize on write (before storing), and your renderer should still escape on output by default (React does this automatically — never use `dangerouslySetInnerHTML` on user content).

---

## Decision: Session Strategy

> **🧩 Decision Card — Session Handling**
>
> **Option A: JWT in localStorage**
> Simple to implement, but vulnerable to XSS-based token theft — if any XSS gap exists anywhere in your app, an attacker can steal the token directly from JS-accessible storage.
>
> **Option B: HTTP-only cookie session**
> Slightly more setup (CSRF protection needed), but the session token is inaccessible to JavaScript entirely — meaningfully reduces the impact of any XSS you might have missed.
>
> **For Personal Mode: use Option B.** The setup cost is small (most frameworks have built-in support), and it removes an entire attack category as a single decision rather than something you have to get right in every component that touches the token.

---

## Rate Limiting Where It Actually Matters

Full rate limiting infrastructure comes in a later module — but two endpoints need basic protection now, because they're the most commonly abused in marketplaces specifically:

> **✅ Validation Checklist**
> - [ ] Login endpoint — limit failed attempts per IP/account to prevent credential stuffing
> - [ ] Listing creation — limit listings created per account per hour to prevent spam/scraper-bot flooding
> - [ ] Message sending — limit per thread per minute to prevent harassment via message flooding
> - [ ] Review submission — already constrained by one-per-order, but verify the order-completion check can't be raced (two simultaneous requests both passing the check before either writes)

```js
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, try again later" },
});

router.post("/auth/login", loginLimiter, loginHandler);
```

---

## Listing Scraping: A Marketplace-Specific Concern

Your `GET /listings` endpoint is public by design — but public doesn't mean unlimited. Without basic protections, a competitor or bot can scrape your entire catalog (and seller contact patterns) in minutes.

- Cap page size (e.g. max 50 results per request) — don't let `?limit=10000` through
- Don't expose seller email/phone directly in listing responses — route contact through your messaging system instead
- Consider basic bot detection (request pattern, missing standard headers) if scraping becomes a real problem — don't over-engineer this preemptively for a personal project

---

## AI Prompt: Security Review of Existing Code

> **📋 Copy Prompt**
>
> ```
> Review this code for marketplace-specific security issues. I'm building a personal
> project, so flag real risks but don't suggest enterprise-grade infrastructure
> (no need for WAFs, SOC2 controls, etc.).
>
> Specifically check for:
> 1. IDOR — any endpoint that uses an ID from the request without verifying ownership/participation
> 2. Stored XSS — any user-controlled field that gets rendered elsewhere without sanitization
> 3. Price/amount tampering — any value trusted from the client that should be server-computed
> 4. Missing rate limits on auth, listing creation, or messaging endpoints
> 5. Session/token handling — is the session readable by client-side JavaScript?
>
> Code:
> [PASTE YOUR CODE]
>
> For each issue found: explain the exploit scenario in one sentence, then show the fix.
> ```
>
> **Why this prompt works:** "explain the exploit scenario in one sentence" forces AI to justify each flag with a concrete attack path instead of generically listing best practices — which makes it much easier for you to judge whether a flagged issue is actually relevant to your app or a generic checklist item.

---

## Validating AI Security Reviews

> **🚩 Common Hallucination:** AI security reviews often flag *theoretical* issues (e.g. "consider adding 2FA," "consider a WAF") at the same severity as *real* exploitable bugs in your actual code (e.g. an endpoint with no ownership check). Don't treat the output as a flat priority list — triage it yourself: anything that lets one user access or modify another user's data is critical; anything that's general hardening advice is optional for a personal project.

> **✅ Validation Checklist**
> - [ ] For every flagged issue, can you describe the exact request an attacker would send to exploit it?
> - [ ] Does the fix actually address the root cause, or just patch the specific example shown?
> - [ ] Did the review check write endpoints (`POST`/`PUT`/`PATCH`/`DELETE`), not just `GET`?

---

## Token Efficiency Tip

Run the security review prompt per-feature (listings, messaging, auth) rather than pasting your entire codebase at once. A focused review catches more — a giant prompt encourages AI to skim and produce generic output. Keep each review in its own conversation so findings don't get diluted across unrelated code.

---

## What You've Decided

By the end of this module you should have:

- Sanitization on every user-controlled field that's rendered elsewhere (listings, reviews, messages)
- HTTP-only cookie sessions instead of client-readable tokens
- Basic rate limits on login, listing creation, and messaging
- Pagination caps and contact-info protection on public listing endpoints
- A working method for triaging AI-flagged security issues by actual exploitability

**Next:** Performance Optimization — making your marketplace fast as real data and usage grow.
