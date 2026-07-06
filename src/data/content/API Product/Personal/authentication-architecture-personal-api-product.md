---
title: Authentication Architecture
slug: authentication-architecture
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# Authentication Architecture

**Authentication Strategy** in Phase 1 decided *what* mechanism you're using — API keys. This module decides *how it's actually built*: where keys are stored, how they're verified on every request, and how that verification stays fast as your API grows. This is architecture, not implementation — you're deciding the shape here; you'll write the actual code in **Authentication Implementation**, Phase 3.

## Never Store Raw API Keys

This is the single most important rule in this module. Store a hash of the key, exactly like you would a password — never the plaintext key itself.

```
On key generation:
  raw_key = "sk_live_" + cryptographically_random_string(32)
  stored_hash = hash(raw_key)  // e.g. SHA-256 is sufficient for API keys (unlike passwords, no need for slow hashing like bcrypt — API keys are high-entropy already)

  Show raw_key to the caller ONCE, at creation time.
  Store only stored_hash in your database.
```

> **Warning:** If your database is ever compromised and you stored raw keys, every single caller's credentials are immediately exposed. If you stored hashes, the attacker gets nothing usable. This is a five-minute decision now that prevents a catastrophic breach later — there's no valid reason to skip it, even for a personal project.

## The Verification Flow, Per Request

Every incoming request needs this exact sequence, and it should live in one reusable piece of middleware — not duplicated per endpoint:

```
1. Extract key from Authorization header ("Bearer sk_live_...")
2. If missing → 401, error code auth_missing_key
3. Hash the extracted key
4. Look up the hash in your database
5. If no match → 401, error code auth_invalid_key
6. If match, attach the associated caller/owner_id to the request context
7. Continue to rate limiting → authorization → validation → business logic
```

Step 6 is what makes your **Authorization Strategy** ownership checks possible downstream — every handler after this point can trust `request.callerId` without re-verifying anything.

## Schema for Key Storage

Connects directly to **Database Architecture** — add this table now if you haven't already:

```
api_keys
  id (PK)
  owner_id (FK, indexed)
  key_hash (indexed — this is your lookup path on every request)
  key_prefix (first few chars of raw key, stored in plaintext, for display: "sk_live_4f8a...")
  created_at
  revoked_at (nullable — null means active)
```

`key_prefix` matters for usability: it lets a caller identify which key is which in a dashboard or list without you ever storing or re-displaying the full raw key after creation.

## Revocation Needs to Be Instant

Because you committed to revocability in **Authentication Strategy**, make sure the architecture supports it cleanly: revoking a key means setting `revoked_at`, and your lookup query in step 4 above must check `WHERE key_hash = ? AND revoked_at IS NULL`. A revoked key should fail authentication on the very next request — no caching layer or delay that leaves a revoked key valid for even a few minutes.

- [ ] Revocation is a single database write, not a multi-step process
- [ ] Your key lookup always excludes revoked keys, with no exceptions in any code path

## Performance: One Query, Indexed

Authentication runs on every single request — it needs to be fast. As long as `key_hash` is indexed (not a full table scan), a lookup is a fast, single-row query even at real scale. Don't reach for caching this lookup (like in Redis) preemptively — a properly indexed database query is fast enough for a personal API's traffic, and adding a cache here means a second place revocation has to propagate to correctly.

## Personal Mode: This Is Worth Building Correctly, Not Just Quickly

Unlike some other architecture decisions in this phase, authentication isn't somewhere to cut corners for speed. A leaked, unrevoked, plaintext-stored API key is a real security incident even on a personal project — especially if that project is ever connected to anything with real consequences (billing, personal data, third-party accounts). The five extra minutes to hash keys properly is worth it every time.

## AI Prompt: Review the Architecture

```
Here's my planned authentication architecture:

Key format: [paste from Authentication Strategy]
Storage: hash of key, not raw key
Verification flow: [paste the 7-step flow above, filled in for my stack]

Review this:
1. Confirm the hashing approach is appropriate for API keys specifically (not passwords).
2. Check the verification flow for any step where a bug could let an invalid or revoked key through.
3. Suggest the exact database index needed for the key lookup to stay fast.
```

## Before You Continue

- [ ] I store only hashed API keys, never raw keys, after creation
- [ ] My verification flow is a single reusable middleware, not duplicated per endpoint
- [ ] Revocation immediately invalidates a key on the very next request, with no caching delay

When all three are checked, move to **Authorization Architecture**.
