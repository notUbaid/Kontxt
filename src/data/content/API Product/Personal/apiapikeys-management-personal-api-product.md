---
title: API Keys Management
slug: api-keys-management
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# API Keys Management

Session-based authentication works for your API's own frontend. It does not work for the developers who will consume your API from scripts, servers, and other backends — there's no browser to hold a cookie. API keys are how you authenticate machine-to-machine traffic, and how you'll eventually meter and bill usage.

This module builds the key lifecycle: generation, storage, verification, scoping, and revocation. Get this wrong and you either leak every user's key in a database breach, or lock yourself out of ever adding permission levels later.

---

## The One Rule That Matters Most

> **Never store API keys in plaintext.**
> A database breach should not hand an attacker working credentials for every user's account. This is non-negotiable even for a personal project — "it's just a side project" is not a reason to skip the one practice that prevents a total credential leak.

Treat API keys exactly like passwords: hash them before storage, verify by hashing the incoming key and comparing.

---

## Key Design: The Stripe Pattern

Copy the format the industry has already converged on. Stripe, GitHub, and OpenAI all structure keys the same way, and it's worth understanding why before you build your own.

```
myapp_live_dummykeydonotusetest1234
│  │    └── random secret (32+ bytes, base62/hex encoded)
│  └────── environment (live / test)
└───────── key type (sk = secret key)
```

| Component | Purpose |
|---|---|
| **Prefix** (`myapp_live_`) | Lets you identify key type and environment at a glance — in logs, in error messages, in secret-scanning tools |
| **Random secret** | The actual credential. Cryptographically random, never guessable |
| **Full key shown once** | User copies it at creation time; you never display it again |

> **Decision card — What to store**
> Store the **hash** of the full key plus the **prefix + last 4 characters** in plaintext. The prefix/suffix lets you show `myapp_live_...zdp7dc` in the user's dashboard so they can identify which key is which — without ever being able to reconstruct the working credential from your database.

---

## Implementation: Generation

```typescript
// lib/api-keys.ts
import crypto from "crypto";

const KEY_PREFIX = "myapp_live_";

export function generateApiKey() {
  const secret = crypto.randomBytes(24).toString("base64url"); // ~32 chars
  const fullKey = `${KEY_PREFIX}${secret}`;
  const hash = crypto.createHash("sha256").update(fullKey).digest("hex");
  const lastFour = secret.slice(-4);

  return { fullKey, hash, lastFour };
  // fullKey: shown to the user ONCE, never stored
  // hash: stored in the database
  // lastFour: stored in plaintext for display purposes
}
```

```typescript
// route: POST /api-keys
router.post("/api-keys", authenticate, async (req, res) => {
  const { fullKey, hash, lastFour } = generateApiKey();

  await db.apiKey.create({
    data: {
      userId: req.user.id,
      hash,
      lastFour,
      prefix: "sk_live_",
      name: req.body.name ?? "Unnamed key",
      scopes: req.body.scopes ?? ["read"],
    },
  });

  // This is the ONLY response that ever contains the full key
  res.status(201).json({ apiKey: fullKey, warning: "This key will not be shown again." });
});
```

---

## Implementation: Verification Middleware

```typescript
// middleware/authenticate-api-key.ts
import crypto from "crypto";

export async function authenticateApiKey(req, res, next) {
  const header = req.headers.authorization; // "Bearer sk_live_..."
  const fullKey = header?.replace("Bearer ", "");

  if (!fullKey?.startsWith("sk_live_")) {
    return res.status(401).json({ error: "Missing or malformed API key" });
  }

  const hash = crypto.createHash("sha256").update(fullKey).digest("hex");
  const apiKey = await db.apiKey.findUnique({ where: { hash } });

  if (!apiKey || apiKey.revokedAt) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  await db.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  req.apiKey = apiKey;
  req.user = { id: apiKey.userId };
  next();
}
```

> **Tip — hashing algorithm choice**
> SHA-256 is correct here, not bcrypt/argon2. Password hashing algorithms are deliberately slow to resist brute-forcing a low-entropy human password. API keys are already high-entropy random strings — a fast cryptographic hash is appropriate and keeps every authenticated request fast.

---

## Scoping Keys: Read vs Write

Even in Personal mode, build scopes now — retrofitting them after users have live integrations is painful, and it's a small addition on top of the schema you already have.

| Scope | Allows |
|---|---|
| `read` | GET requests only |
| `write` | GET, POST, PUT, PATCH, DELETE |

```typescript
export function requireScope(scope: "read" | "write") {
  return (req, res, next) => {
    if (!req.apiKey.scopes.includes(scope)) {
      return res.status(403).json({ error: `This key lacks the '${scope}' scope` });
    }
    next();
  };
}

router.delete("/projects/:id", authenticateApiKey, requireScope("write"), deleteProjectHandler);
```

> **Warning — scope check order**
> Scope checks run *after* ownership checks from the Authorization Implementation module, never instead of them. A `write`-scoped key still must not be able to write to another user's resources. Scopes limit *what kind* of action a key can perform; ownership limits *whose data* it can act on. You need both.

---

## Revocation

Users must be able to instantly kill a leaked key. Soft-delete, don't hard-delete — you want an audit trail.

```typescript
router.delete("/api-keys/:id", authenticate, async (req, res) => {
  const key = await db.apiKey.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!key) return res.status(404).json({ error: "Not found" });

  await db.apiKey.update({
    where: { id: key.id },
    data: { revokedAt: new Date() },
  });
  res.status(204).send();
});
```

Revoked keys stay in the verification lookup path (checked via `apiKey.revokedAt`) so a revoked key fails immediately rather than silently continuing to work.

---

## AI Prompt: Generate the Key Lifecycle

```
I'm implementing API key authentication for a [framework] API with [database/ORM].

Requirements:
- Keys formatted as: sk_live_<32-char random secret>
- Store only a SHA-256 hash of the full key, never the plaintext
- Store the last 4 characters separately in plaintext for display
- Full key returned to the user exactly once, at creation
- Support scopes: "read" and "write"
- Support revocation (soft delete with revokedAt timestamp)
- Verification middleware that hashes the incoming key and looks up
  by hash, rejecting revoked keys

Generate: the schema, the generation function, the verification
middleware, and the create/revoke routes.
```

---

## AI Prompt: Security Review

```
Review this API key implementation for security issues:

[paste your key generation, storage, and verification code]

Specifically check:
1. Is the full key ever stored in plaintext, logged, or included in
   error messages/stack traces?
2. Is the key compared using a lookup-by-hash, or does any code path
   compare raw key strings (timing-attack risk)?
3. Are revoked keys actually rejected at verification time, not just
   marked in the database?
4. Can a key's scope be escalated by manipulating the request body
   rather than through a dedicated, authenticated endpoint?
```

---

## Common Mistakes

- **Storing the full key "just in case."** There is no legitimate reason to reconstruct a key after issuance. If a user loses it, they generate a new one.
- **Logging the Authorization header.** Request logging middleware often logs headers by default — explicitly strip `Authorization` before logging.
- **No `lastUsedAt` tracking.** Without it, users can't tell which of their keys are safe to revoke because they're unused.
- **Comparing keys with `===` after fetching by a partial match.** Always hash-and-lookup; never fetch a candidate row first and compare in application code.

---

## Validation Checklist

- [ ] Full API key is never written to the database, logs, or error responses
- [ ] Only a SHA-256 hash (plus prefix/last-4 for display) is stored
- [ ] Verification looks up by hash, not by decrypting or comparing raw values
- [ ] Revoked keys are rejected at the verification middleware, not just flagged in the UI
- [ ] Scopes are enforced in addition to, not instead of, ownership checks
- [ ] `Authorization` header is excluded from any request logging
- [ ] `lastUsedAt` updates on successful verification so users can audit key activity

---

## What's Next

With authenticated, scoped API keys in place, the next module — **Rate Limiting** — uses the key/user identity established here to enforce request limits per key, which is also where usage-based billing eventually hooks in.
