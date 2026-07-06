---
title: API Keys
slug: api-keys
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# API Keys

**Authentication Architecture** covered how keys are verified on incoming requests. This module covers the other half of their lifecycle: how they're generated, presented to the caller, and managed afterward. This is the part of your system callers actually interact with directly — get the experience right, and it's one less reason for a caller to give up during integration.

## Generation: Cryptographically Random, Every Time

Never generate a key from anything predictable — a UUID library alone isn't necessarily sufficient depending on version; use your language's cryptographic random source explicitly.

```
// Node.js example
const crypto = require('crypto');
const rawKey = `sk_live_${crypto.randomBytes(24).toString('hex')}`;
```

48 hex characters from `randomBytes(24)` gives you well over enough entropy that guessing a valid key is computationally infeasible. Don't shorten this for "cleaner" looking keys — length here is a real security property, not cosmetic.

## The One-Time Reveal

This is the most important UX rule for API keys, and it's also a security property: **show the raw key exactly once, at creation time, and never again.**

```
Response to POST /api-keys (only immediately after creation):
{
  "data": {
    "id": "key_9f8e7d",
    "key": "sk_live_4f8a2b91c3d0e5f6...",   ← only present in THIS response
    "prefix": "sk_live_4f8a...",
    "created_at": "2026-07-01T14:30:00Z"
  }
}

Response to GET /api-keys (any time after):
{
  "data": {
    "id": "key_9f8e7d",
    "prefix": "sk_live_4f8a...",    ← full key never returned again
    "created_at": "2026-07-01T14:30:00Z"
  }
}
```

> **Warning:** If your `GET /api-keys` endpoint can ever return a full raw key after the initial creation, you've broken the entire security model from **Authentication Architecture** — it means you're storing the raw key somewhere retrievable, which defeats the purpose of hashing it. Make sure your database schema physically cannot produce a raw key on lookup, since you never stored one.

## Environments: Test Keys Matter More Than They Seem

Even for a personal project, a `sk_test_...` key that hits real endpoints but is clearly marked as non-production gives callers (including yourself, during your own integration testing) a way to safely experiment without touching real data or hitting real rate limits meant for production use.

- [ ] Key prefix distinguishes environment (`sk_live_` vs `sk_test_`)
- [ ] Your application logic can branch on this prefix if test/live need different behavior (e.g., test keys never trigger real webhook deliveries)

For a genuinely small personal project, this might be one environment only — that's a reasonable simplification. Just be deliberate about skipping it, not accidentally without noticing.

## Revocation and Rotation, From the Caller's Side

Connects to the revocation architecture from **Authentication Architecture** — this is how a caller actually triggers it:

```
DELETE /api-keys/{id}   → sets revoked_at, immediately invalidates the key
POST /api-keys          → generates a new key, doesn't touch existing ones
```

Deliberately keep these separate operations rather than a single "rotate" endpoint that does both atomically — a caller might want a new key issued before revoking the old one, to avoid a gap where they have no valid key at all mid-rotation.

> **Tip:** Encourage — through your docs, not enforcement — callers to generate a new key and switch to it before revoking the old one, rather than revoking first and scrambling to regenerate. A brief overlap where both keys work is safer than a forced gap.

## Personal Mode: One Key Per Caller Is a Fine Default

You don't need to support multiple simultaneous keys per caller, key naming/labeling, or granular scoping for an MVP — those are real features worth adding once you have actual callers requesting them (or once you're managing multiple keys yourself across environments). Start with the simplest version: each caller has keys they can create, list (prefix only), and revoke.

## AI Prompt: Review the Key Lifecycle Endpoints

```
Here's my planned API key management endpoints: [paste your POST/GET/DELETE /api-keys specs]

1. Confirm the raw key is only ever present in the creation response, never in any list or get response afterward.
2. Confirm my generation approach uses a cryptographically secure random source with sufficient length.
3. Check that revoke and create-new are separate operations, not a single combined rotate action.
```

## Before You Continue

- [ ] Raw keys are generated with a cryptographic random source, sufficient length
- [ ] The raw key is returned exactly once, at creation, and never retrievable afterward
- [ ] Revocation and new-key-creation are separate, independently callable operations

When all three are checked, move to **OAuth**.
