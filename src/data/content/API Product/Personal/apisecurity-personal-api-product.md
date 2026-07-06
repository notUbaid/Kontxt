---
title: Security
slug: security
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 30-40 min
---

# Security

Phase 3 built authentication, authorization, signed webhooks, and hashed API keys — real security work, done as part of building the features, not bolted on after. This module is the **consolidation pass**: the things that don't belong to any single feature, but that an attacker will check regardless of what your API does.

This is not a compliance checklist. It's the practical minimum that a solo-built, publicly reachable API needs before you'd feel comfortable putting real users' data behind it.

---

## The OWASP API Security Top 10 — Where You Already Stand

| Risk | Covered in an earlier module? |
|---|---|
| Broken Object Level Authorization |  Authorization Implementation |
| Broken Authentication |  Authentication Implementation, API Keys Management |
| Broken Object Property Level Authorization (mass assignment) | Partially — formalized below |
| Unrestricted Resource Consumption |  Rate Limiting |
| Broken Function Level Authorization |  Authorization Implementation (scopes) |
| Server Side Request Forgery |  Webhooks |
| Security Misconfiguration | Addressed below |
| Injection | Addressed below |
| Improper Inventory Management | Addressed in Phase 5 (OpenAPI spec) |
| Unsafe Consumption of APIs | Relevant if you call third-party APIs — addressed below |

You've already closed most of the list by building features correctly the first time. This module closes the remaining gaps.

---

## Input Validation

Every route that accepts a body, query param, or path param needs schema validation before that data touches your business logic or database. Don't hand-check fields — use a schema library so validation is declarative and consistent.

```typescript
// schemas/order.ts
import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(z.object({
    sku: z.string().min(1).max(64),
    quantity: z.number().int().positive().max(1000),
  })).min(1).max(100),
  notes: z.string().max(500).optional(),
});
```

```typescript
router.post("/orders", authenticate, async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
  }
  // parsed.data is now typed and safe to use
});
```

> **Tip — validation is also your first defense against resource exhaustion**
> Notice the `.max(100)` on the items array and `.max(1000)` on quantity. Without upper bounds, a request with 500,000 line items is technically "valid" and can degrade your database or exhaust memory. Every array and numeric field should have a realistic upper bound, not just a type check.

---

## Preventing Mass Assignment

A request body being valid doesn't mean every field in it should be trusted. This is the gap in the OWASP list above that's easy to introduce accidentally with an ORM.

```typescript
// VULNERABLE — spreads the whole body into the update
await db.user.update({ where: { id: req.user.id }, data: req.body });
// A request body of { "name": "...", "role": "admin" } silently
// grants admin — even though the route was only meant to update name

// SAFE — explicitly allow-list fields
const { name, bio } = req.body;
await db.user.update({ where: { id: req.user.id }, data: { name, bio } });
```

> **Warning — this applies even where you have Zod validation**
> A Zod schema that includes a `role` field because you were validating an admin route elsewhere, reused carelessly on a user-facing route, reopens this exact hole. Validation schemas should be scoped per-route, matching exactly what that route is meant to accept — not shared broadly for convenience.

---

## Injection Prevention

If you're using an ORM (Prisma, Drizzle) with parameterized queries throughout — which every previous module's code examples have used — you're largely protected from SQL injection by default. The risk reappears the moment you drop to raw queries.

```typescript
// DANGEROUS — string concatenation into raw SQL
await db.$queryRawUnsafe(`SELECT * FROM orders WHERE id = '${req.params.id}'`);

// SAFE — parameterized, even in raw query form
await db.$queryRaw`SELECT * FROM orders WHERE id = ${req.params.id}`;
```

> **Decision card**
> Avoid raw queries entirely unless your ORM genuinely can't express what you need. If you must use one, use the tagged-template parameterized form your ORM provides — never string interpolation or concatenation, even for values you believe are "safe" (IDs, enums). "I control this value" is exactly the assumption that breaks later when the code gets reused somewhere the value isn't controlled.

---

## Secrets Management

```bash
# .env — NEVER committed
DATABASE_URL=postgres://...
WEBHOOK_SIGNING_SECRET=...
```

```bash
# .gitignore — verify this line exists
.env
```

> **Warning — check your git history, not just your current `.gitignore`**
> Adding `.env` to `.gitignore` today doesn't remove a secret you committed last month. Run `git log --all --full-history -- .env` to check. If a secret was ever committed, rotate it — removing it from history doesn't guarantee it wasn't already scraped by an automated bot; public GitHub repos are scanned for leaked credentials within minutes of a push.

Use a secret scanning tool before every push if you're working in a public repo — GitHub's built-in secret scanning (free on public repos) catches most common credential patterns automatically.

---

## Security Headers

A few headers cost nothing to add and close off common attack classes:

```typescript
import helmet from "helmet";
app.use(helmet());
```

| Header (set by `helmet`) | Protects against |
|---|---|
| `Strict-Transport-Security` | Downgrade attacks to plain HTTP |
| `X-Content-Type-Options: nosniff` | MIME-sniffing based attacks |
| `X-Frame-Options` | Clickjacking (less relevant for pure APIs, harmless to include) |

For an API with no browser-rendered pages, most of `helmet`'s defaults are still safe and worth keeping — the cost is zero, and it's one line.

---

## CORS Configuration

If your API is called directly from browser-based JavaScript (not just server-to-server), configure CORS explicitly — never wildcard it for authenticated endpoints.

```typescript
import cors from "cors";

app.use(cors({
  origin: (origin, callback) => {
    const allowed = ["https://yourapp.com", "https://app.yourapp.com"];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
```

> **Warning — `origin: "*"` with `credentials: true` is invalid and dangerous**
> Browsers reject this combination, but developers sometimes work around it in ways that reintroduce the risk. If your API uses cookies or credentialed requests, the allowed-origins list must be explicit — a wildcard here would let any website make authenticated requests on behalf of a logged-in user.

---

## Enforcing HTTPS

Most hosting platforms (Vercel, Railway, Render, Fly.io) terminate TLS for you automatically — verify it's actually enforced, not just available:

```typescript
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https" && process.env.NODE_ENV === "production") {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});
```

API keys and tokens sent over plain HTTP are trivially interceptable on shared networks — this isn't optional for anything handling credentials.

---

## Consuming Third-Party APIs Safely

If your API calls out to other services (payment providers, enrichment APIs), treat their responses as untrusted input too:

- Validate response shape before using it (a schema, same as for incoming requests)
- Set explicit timeouts — a hanging third-party call shouldn't hang your request indefinitely
- Never forward a third-party error response directly to your users — it may leak internal details about your integration

```typescript
const res = await fetch(thirdPartyUrl, { signal: AbortSignal.timeout(5000) });
```

---

## AI Prompt: Security Audit Pass

Run this against your codebase once core features are built, before shipping to real users.

```
Perform a security review of this API codebase focused on:

1. Mass assignment — any route that spreads req.body directly into a
   database write without an explicit allow-list
2. Missing input validation — any route accepting a body/query/params
   without schema validation, or validation missing upper bounds on
   arrays/numbers
3. Raw SQL usage — any string concatenation or interpolation into
   database queries instead of parameterized queries
4. Hardcoded secrets or credentials anywhere in the codebase
5. Missing timeout/error handling on any outbound fetch to a
   third-party service

[paste relevant route files, or describe the directory structure and
ask for a file-by-file review]

For each finding, state the file, the specific risk, and the fix.
```

---

## Validating AI Output

- **Confirm the audit actually checked for mass assignment**, not just SQL injection and auth — it's the most commonly missed category in generic "security review" prompts.
- **Verify claimed fixes don't just add validation without also allow-listing fields** — a Zod schema that includes `role` doesn't stop mass assignment if the handler still spreads the parsed object wholesale.
- **Re-check any "no issues found" result manually on at least your auth-adjacent routes** — AI security reviews are a strong first pass, not a substitute for your own read-through of the highest-risk code.

---

## Common Mistakes

- Trusting Zod/schema validation alone to prevent mass assignment — validation confirms shape, not that every valid field *should* be writable by this caller.
- Adding `.gitignore` for secrets after one has already been committed, without rotating it.
- CORS configured with a wildcard "to make development easier" and never tightened before shipping.
- No timeout on third-party API calls, so one slow dependency can hang your whole request pipeline.

---

## Validation Checklist

- [ ] Every route validates input with a schema, including upper bounds on arrays and numeric fields
- [ ] No route spreads a raw request body directly into a database write
- [ ] No raw SQL uses string concatenation or interpolation
- [ ] `.env` is git-ignored, and git history has been checked for any previously committed secrets
- [ ] `helmet` (or equivalent) is applied for baseline security headers
- [ ] CORS allow-list is explicit, not wildcarded, on any endpoint that accepts credentials
- [ ] HTTPS is enforced in production
- [ ] Outbound calls to third-party APIs have explicit timeouts

---

## What's Next

With the security baseline in place, the next module — **Performance Optimization** — covers query optimization, N+1 prevention, and response time budgets before you introduce caching.
