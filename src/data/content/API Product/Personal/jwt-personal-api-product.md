---
title: JWT
slug: jwt
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 10–15 min
---

# JWT

A JWT (JSON Web Token) is a self-contained, signed token that carries claims — like "this is caller X, valid until time Y" — without requiring a database lookup to verify. It solves a real performance problem at real scale. For your API, built with simple hashed API keys per **Authentication Architecture**, it solves a problem you don't currently have. This module exists to make that a confirmed decision, not an accidental gap.

## What a JWT Actually Is

```
header.payload.signature

header:  { "alg": "HS256", "typ": "JWT" }
payload: { "sub": "caller_123", "exp": 1719849600 }
signature: HMAC-SHA256(header + payload, your_secret_key)
```

Anyone can *read* the payload (it's just base64-encoded JSON, not encrypted) — the signature is what proves it wasn't tampered with. A server verifies a JWT by checking the signature against its secret key, with no database round-trip required.

## Why This Doesn't Fit Your API Keys

Your API keys are already the right tool for your actual requirement — long-lived, caller-managed credentials for server-to-server API access. JWTs solve a different problem: they shine when you need **stateless, short-lived, frequently-verified** tokens, typically in scenarios like:

| Scenario | Why JWT fits there | Why it doesn't fit your API keys |
|---|---|---|
| User sessions in a web app, verified on every page load | Avoids a database hit on every single request | Your API keys are already a single indexed lookup — not a bottleneck at personal-project scale |
| Microservices verifying a token issued by a separate auth service | No shared database between services | You have one service, one database — nothing to avoid coordinating with |
| Very short-lived tokens (minutes), issued frequently | Stateless verification suits high-frequency reissuance | Your API keys are meant to be long-lived and caller-managed, not reissued constantly |

> **Tip:** If your authentication lookup is a single indexed database query — which yours is, per Authentication Architecture — you don't have the performance problem JWTs exist to solve. Adding them would trade a simple, revocable system for a more complex one, for no actual benefit.

## The Real Cost: Revocation Gets Hard

This is the most important tradeoff to understand, and it's the main reason JWTs would work against you here: a JWT is valid until it expires, *by design*, independent of any database check. Revoking one early — the exact capability you committed to for API keys in Phase 1 — requires extra infrastructure (a denylist you check on every request, which brings back the database lookup you were trying to avoid in the first place, defeating the point).

Your hashed API keys, by contrast, are trivially revocable — a single `revoked_at` write, checked on the one lookup you're already doing. That's a strictly better fit for a caller-facing API where instant revocation matters more than avoiding one indexed query.

## Where JWTs Might Still Show Up in Your Project

Even without using them for your core API authentication, you might reasonably use JWTs for a narrow, specific purpose — like a short-lived, single-use token for a password reset link or an email verification flow, if your MVP has one. That's a legitimate, scoped use case distinct from your main authentication system, and doesn't conflict with anything decided in **Authentication Architecture**.

- [ ] Confirm: is there a genuinely short-lived, single-purpose token need anywhere in my MVP (email verification, magic links)?
- [ ] If yes, that's a reasonable, narrow use for a JWT — separate from your main API key system
- [ ] If no, JWTs have no place in this project's MVP

## Personal Mode: This Is a "Know It, Skip It" Module

Understanding why JWTs don't fit here is more valuable than implementing them would be. Adding JWT-based auth alongside your API key system without a real reason is added complexity — two authentication systems to maintain, reason about, and secure — for a benefit (stateless verification) you don't need at this scale.

## AI Prompt: Confirm the Non-Fit

```
My authentication setup: hashed API keys, single indexed database lookup per request (from Authentication Architecture)
My scale: personal project, [rough expected request volume]

1. Confirm whether this request volume would actually benefit meaningfully from JWT's stateless verification, or whether the database lookup is already fast enough.
2. Is there any narrow, specific flow in my MVP (email verification, password reset, magic link) that would genuinely benefit from a short-lived JWT, separate from my main auth system?
```

## Before You Continue

- [ ] I understand JWTs trade easy revocation for stateless verification
- [ ] I understand my current authentication setup doesn't have the performance problem JWTs solve
- [ ] I've confirmed whether any narrow, separate use case (like email verification) could reasonably use one

When all three are checked, move to **Service Accounts**.
