---
title: Authentication Implementation
slug: authentication-implementation
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 20 min
---

# Authentication Implementation

**Authentication Architecture** designed the verification flow and key storage approach. This module turns it into working middleware — the first real piece of code your API depends on, and the one worth building carefully and testing in isolation before anything else touches it.

## Build It as Standalone Middleware First

Don't write authentication logic inline in your first endpoint handler. Build it as isolated middleware, test it against known-good and known-bad keys directly, and only then wire it into routes.

```
// Pseudocode structure — adapt to your framework
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: { code: 'auth_missing_key', message: 'API key required' }
    });
  }

  const rawKey = authHeader.slice(7);
  const keyHash = hash(rawKey);

  const record = await db.apiKeys.findFirst({
    where: { key_hash: keyHash, revoked_at: null }
  });

  if (!record) {
    return res.status(401).json({
      error: { code: 'auth_invalid_key', message: 'Invalid or revoked API key' }
    });
  }

  req.callerId = record.owner_id;
  next();
}
```

This matches the seven-step flow from **Authentication Architecture** exactly — implementation here is translation, not new design.

## Test This in Isolation, Before Building Any Real Endpoint

Write a minimal test route that does nothing but require authentication, and confirm all the cases work correctly before building anything else on top of it:

- [ ] Request with no `Authorization` header → `401`, `auth_missing_key`
- [ ] Request with a malformed header (not `Bearer ...`) → `401`, `auth_missing_key`
- [ ] Request with a well-formed but non-existent key → `401`, `auth_invalid_key`
- [ ] Request with a valid, active key → passes through, `req.callerId` is correctly set
- [ ] Request with a valid but revoked key → `401`, `auth_invalid_key` (not a different error — revoked keys should look identical to invalid ones to the caller)

> **Tip:** Test the revoked-key case explicitly, not just "valid" and "doesn't exist." It's easy to implement a lookup that correctly rejects nonexistent keys but forgets to filter out revoked ones — and that bug won't surface until you actually test it, since a revoked key still exists in the database.

## Wire the Key Generation Endpoint Alongside This

Implementation order matters here — you need a working key generation endpoint to actually get a test key to authenticate with:

```
POST /v1/api-keys → generates key (per API Keys module), returns raw key once, stores hash
```

Build and test this first, generate a real key through it, then use that key to test your authentication middleware above — end to end, not with a manually-inserted database row that skips your actual generation logic.

## Common Implementation Mistakes to Check For

- **Timing attacks on key comparison** — if you're comparing hashes manually rather than relying on a database equality lookup, use a constant-time comparison function, not a standard string equality check, to avoid leaking information through response timing. (A database `WHERE` lookup on an indexed hash column is not vulnerable to this — this only matters if you're comparing values manually in application code.)
- **Logging the raw key anywhere** — check your request logging setup from **Monitoring Architecture** doesn't accidentally log the full `Authorization` header, which would put raw keys in your logs.
- **Case sensitivity mismatches** — if your key includes any case-sensitive portion, make sure your hashing and lookup treat it consistently; don't lowercase a key before hashing if the original wasn't guaranteed lowercase.

> **Warning:** Check this now, specifically: does your logging middleware (from Monitoring Architecture) log request headers? If so, explicitly exclude or redact the `Authorization` header. This is one of the most common ways real API keys end up leaked — not through a breach, but through a logging system that was never told not to capture them.

## Personal Mode: This Is the One Module Worth Extra Care

Nearly everything else in this phase can be iterated on quickly with AI assistance and corrected if wrong. Authentication is the exception — get it right the first time, test it thoroughly in isolation, and don't move forward until every case above passes. A bug here doesn't just break a feature; it's a potential security incident.

## AI Prompt: Generate and Review the Middleware

```
My key storage schema: "[paste from Authentication Architecture / API Keys]"
My framework: [from Tech Stack Selection]

1. Implement the authentication middleware matching the 7-step verification flow from Authentication Architecture.
2. Write tests for all 5 cases: missing header, malformed header, invalid key, valid key, revoked key.
3. Check my logging setup (paste config) for any risk of logging the raw Authorization header.
```

## Before You Continue

- [ ] Authentication middleware is built and tested in isolation, all 5 cases passing
- [ ] I generated a real key through my actual key-generation endpoint to test with, not a manually-inserted row
- [ ] I've confirmed the raw key is never logged anywhere in my system

When all three are checked, move to **Authorization Implementation**.
