---
title: Authentication Strategy
slug: authentication-strategy
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Authentication Strategy

Authentication answers one question: *who is calling?* It's easy to treat this as a Phase 2 implementation detail, but the *strategy* — which mechanism, issued how, revoked how — is a design decision that shapes your resource model, your rate limiting, and your database schema. Decide it here; implement it in Phase 2 and 3 with nothing left to figure out.

## Match the Mechanism to Your Caller

You already profiled your primary caller in **Target Developers**. That profile should drive this choice directly.

| Mechanism | Best for | Caller experience |
|---|---|---|
| **API key** (header, e.g. `Authorization: Bearer sk_live_...`) | Server-to-server calls, personal projects, most indie/hobbyist callers | Simple — generate a key, paste it, done |
| **OAuth 2.0** | Apps acting on behalf of another user (e.g. "connect your account") | More setup, but necessary if callers need per-user permissions |
| **JWT** | When you need to embed claims (permissions, expiry) without a database lookup per request | More complex to implement correctly; easy to get expiry/refresh wrong |

For nearly every personal API product, **API keys are the right choice**. OAuth solves a problem — third-party apps acting on behalf of an end user — that most personal projects don't have. Don't add OAuth's complexity for a problem you don't have yet; you'll design it properly in **OAuth** (Phase 2) if and when a real use case needs it.

> **Tip:** If you're unsure whether you need OAuth, you almost certainly don't. OAuth exists for cases like "let a user connect their Google Calendar to my app." If your API doesn't act on behalf of someone else's account at a third-party service, a simple API key covers you.

## Design the Key Lifecycle Now

An API key isn't just a random string — it has a lifecycle you need to decide on before Phase 2 implementation:

```
Key format: [prefix]_[environment]_[random string]
Example: sk_live_4f8a2b91c3d0

- Prefix identifies it's yours at a glance (helps in logs, support requests)
- Environment (live/test) lets callers safely test without touching real data
- Random portion: cryptographically random, sufficient length (32+ chars)
```

- [ ] **Issued how:** generated on signup, or requested via a dashboard/endpoint?
- [ ] **Revocable:** can a caller regenerate or revoke their key without contacting you?
- [ ] **Scoped or not:** does every key have full access, or can callers create restricted keys?

For a personal MVP, one key per caller with full access is a completely reasonable starting point — scoped permissions (**Authorization Architecture**, Phase 2) is a separate, deferrable concern.

## Where the Key Lives in a Request

Always the `Authorization` header, never a query parameter:

```
Authorization: Bearer sk_live_4f8a2b91c3d0
```

> **Warning:** Never accept an API key as a query parameter (`?api_key=...`). URLs get logged by proxies, browser history, and analytics tools — a key in a URL is a key that leaks. Headers aren't logged by default the same way.

## What Happens on Missing or Invalid Auth

This connects directly to **Error Design** — be consistent with what you already decided:

- No key at all → `401`, error code like `auth_missing_key`
- Invalid or revoked key → `401`, error code like `auth_invalid_key`
- Valid key, insufficient permission → `403` (this becomes relevant once you add scoping)

## Personal Mode: Skip What You Don't Need Yet

- Skip OAuth unless you have a specific, real use case for acting on behalf of another account.
- Skip key rotation policies and expiry — a personal project's keys can be long-lived; add rotation if you ever see real abuse.
- Do build revocation from day one — the ability to invalidate a leaked key is cheap to build now and painful to add after a key has actually leaked.

## AI Prompt: Confirm the Approach Fits

```
My API's primary caller: "[paste from Target Developers]"
My use cases: "[paste from MVP Scope]"

1. Given this, is a simple API key sufficient, or is there a use case here that actually requires OAuth?
2. Suggest a key format (prefix + environment + random string) that fits my API's name and purpose.
3. What's the minimum key lifecycle features (issue, revoke, scope) I need for my MVP specifically — not a general best-practices list?
```

## Before You Continue

- [ ] I've chosen API key auth (or a specific, justified reason for something else)
- [ ] I know my key format and where it lives in requests (header, never query param)
- [ ] I know how a caller revokes a compromised key

When all three are checked, move to **Authorization Strategy**.
