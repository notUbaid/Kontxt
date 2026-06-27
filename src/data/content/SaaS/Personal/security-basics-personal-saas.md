---
title: Security Basics
slug: security-basics
phase: Phase 4
mode: personal
projectType: saas
estimatedTime: 25–30 min
---

# Security Basics

Security is not a feature you add at the end.

Most breaches don't come from sophisticated attacks. They come from missing input validation, exposed secrets, skipped authorization checks, and defaults nobody changed. The fundamentals in this module close the vast majority of real attack surface for a personal SaaS.

---

## The Threat Model for a Personal SaaS

Know what you're actually defending against.

| Threat | Likelihood | Impact |
|---|---|---|
| Exposed API keys in source code | High | Critical |
| Missing authorization checks | High | Critical |
| SQL injection via unsanitized input | Medium (Prisma protects you) | Critical |
| Cross-Site Scripting (XSS) | Medium | High |
| Brute force on auth endpoints | Medium | High |
| Dependency vulnerabilities | Medium | Medium |
| Cross-Site Request Forgery (CSRF) | Low (same-site cookies help) | Medium |
| DDoS | Low for personal SaaS | High |

Focus here. Not on TLS configuration, perfect forward secrecy, or HSMs. Those are real things — not what you need to worry about today.

---

## Secrets Management

Covered in the Backend and Deployment modules. Verify it held.

**Hard rules:**
- [ ] No API keys, passwords, or tokens in source code
- [ ] `.env` in `.gitignore` — confirm with `git log -- .env` (should return nothing)
- [ ] Different secret values per environment (dev ≠ production)
- [ ] Secrets rotated if accidentally committed — a `git revert` does not help; the key is in the history

```bash
# Check if .env was ever committed
git log --all --full-history -- .env

# If it appears — the key is compromised. Rotate it immediately.
```

> If a secret was ever committed to a public repo, assume it was scraped within minutes. Bots scan GitHub continuously for exposed keys. Rotate first, investigate second.

---

## Authorization — The Most Skipped Check

Every data-modifying route must verify the requesting user owns or has permission to act on the resource.

```typescript
// ❌ Authenticated but not authorized
// Any logged-in user can delete any workspace by guessing an ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()

  await db.workspace.delete({ where: { id: params.id } })
  return Response.json({ success: true })
}

// ✅ Authenticated AND authorized
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) return unauthorized()

  const workspace = await db.workspace.findUnique({ where: { id: params.id } })
  if (!workspace) return notFound()
  if (workspace.ownerId !== user.id) return forbidden()   // ← the missing check

  await db.workspace.delete({ where: { id: params.id } })
  return Response.json({ success: true })
}
```

This is called an **Insecure Direct Object Reference (IDOR)**. It's one of the most common vulnerabilities in web apps. The attacker doesn't need to hack anything — they just change the ID in the URL.

**Audit every route that accepts a resource ID as a parameter.**

---

## Input Validation

From the Backend module — confirm Zod validation is on every route that accepts input.

Beyond schema validation, additional rules:

**String length limits everywhere:**

```typescript
const schema = z.object({
  name: z.string().min(1).max(100),       // never unbounded
  bio: z.string().max(500).optional(),
  url: z.string().url().max(2048),
})
```

**Reject unexpected fields:**

```typescript
// Zod strips unknown keys by default in .parse()
// But explicitly is better
const schema = z.object({ name: z.string() }).strict()  // throws on extra fields
```

**Never use raw user input in:**
- File paths (`path.join(__dirname, userInput)` → path traversal)
- Shell commands (`exec(userInput)` → remote code execution)
- Dynamic `require()` or `import()`

Prisma protects you from SQL injection by using parameterized queries. Raw SQL via `db.$queryRaw` is vulnerable if you interpolate user input — use tagged template literals:

```typescript
// ✅ Safe — parameterized
const result = await db.$queryRaw`SELECT * FROM users WHERE email = ${email}`

// ❌ Vulnerable — string interpolation
const result = await db.$queryRawUnsafe(`SELECT * FROM users WHERE email = '${email}'`)
```

---

## HTTP Security Headers

Headers your server should send on every response. They cost nothing and close several attack vectors.

Add these to your `next.config.js`:

```javascript
// next.config.js
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",         // prevent clickjacking
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",            // prevent MIME sniffing
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",   // tighten after launch
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.stripe.com https://app.posthog.com",
    ].join("; "),
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}
```

Verify headers are set correctly after deployment: [securityheaders.com](https://securityheaders.com).

---

## Rate Limiting

Auth endpoints without rate limiting invite brute force attacks.

**Minimum: rate limit these routes:**

| Route | Limit |
|---|---|
| `POST /api/auth/login` | 5 attempts per 15 minutes per IP |
| `POST /api/auth/signup` | 10 per hour per IP |
| `POST /api/auth/reset-password` | 3 per hour per email |
| Any AI-powered route | Per user, based on your cost tolerance |

**With Upstash Redis + `@upstash/ratelimit`:**

```typescript
// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export const authRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
})
```

```typescript
// In your route
const identifier = req.headers.get("x-forwarded-for") ?? "anonymous"
const { success } = await authRatelimit.limit(identifier)

if (!success) {
  return Response.json(
    { error: { code: "RATE_LIMITED", message: "Too many attempts. Try again in 15 minutes." } },
    { status: 429 }
  )
}
```

> If you're using Clerk, Auth.js, or Supabase Auth — your auth provider handles rate limiting on their endpoints automatically. You still need rate limiting on your own API routes.

---

## Dependency Vulnerabilities

Your `node_modules` is code you didn't write and can't fully audit. Vulnerabilities appear constantly.

**Run this before every production deployment:**

```bash
npm audit
```

**Fix automatically where safe:**

```bash
npm audit fix
```

For critical vulnerabilities with no automatic fix:
1. Check if an updated version exists
2. Check if a workaround exists
3. Consider removing the dependency if unused

**Enable Dependabot** in your GitHub repo:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

Dependabot opens PRs automatically when dependencies have security updates. Review and merge weekly.

---

## Data Privacy

**Minimum viable data practices:**

Only collect what you need. Ask before you collect anything you don't need.

```typescript
// ❌ Storing what you don't need
const user = await db.user.create({
  data: {
    email,
    name,
    ipAddress,        // why? do you need this?
    browserAgent,     // why?
    location,         // why?
    referralSource,   // maybe useful — but justify it
  }
})

// ✅ Only what your product requires
const user = await db.user.create({
  data: { email, name }
})
```

**Right to deletion:** If a user deletes their account, what happens to their data?

Define this before it's asked:
- Hard delete user record and all associated data
- Or anonymize (null out PII fields, keep aggregate records)

```typescript
// services/user.service.ts
export async function deleteAccount(userId: string) {
  // Delete in correct order to avoid FK constraint violations
  await db.workspaceMember.deleteMany({ where: { userId } })
  await db.workspace.deleteMany({ where: { ownerId: userId } })
  await db.session.deleteMany({ where: { userId } })
  await db.user.delete({ where: { id: userId } })

  // Delete files from object storage
  await deleteUserFiles(userId)

  // Cancel Stripe subscription
  await cancelSubscription(userId)
}
```

Write and test this function before launch. GDPR gives users the right to request deletion — you need to be able to fulfill it.

---

## HTTPS and Cookies

**HTTPS:** Vercel and most modern hosts provision SSL automatically. Verify it's active and HTTP redirects to HTTPS.

**Cookies (if managing sessions manually):**

```typescript
// Secure cookie defaults — use all three
res.cookie("session", token, {
  httpOnly: true,     // JS cannot read this cookie
  secure: true,       // HTTPS only
  sameSite: "lax",    // CSRF protection
  maxAge: 60 * 60 * 24 * 7,  // 7 days
})
```

If using Clerk or Auth.js, cookie security is handled for you. Verify their defaults haven't been overridden.

---

## Security Audit Prompt

```prompt
You are a security engineer performing a pre-launch security review of my SaaS.

My stack: [Next.js / Express / Prisma / PostgreSQL]
Auth provider: [Clerk / Auth.js / Supabase Auth]
Hosting: [Vercel / Railway]

Here are my core API routes:
[paste your route list from Phase 2 API design]

Here is my Prisma schema:
[paste schema]

Please:
1. Identify any routes that are missing authorization checks (IDOR risks)
2. Flag any inputs that need additional validation beyond schema checks
3. Identify any routes that need rate limiting I haven't mentioned
4. Check for any data returned in API responses that shouldn't be exposed
5. Flag any data retention or privacy concerns in my schema
6. Recommend the 3 highest-priority fixes if I can only do 3 things
```

---

## Security Checklist

**Secrets:**
- [ ] No secrets in source code
- [ ] `.env` never committed (check git log)
- [ ] Different keys per environment
- [ ] Rotation plan if a key is ever exposed

**Authorization:**
- [ ] Every route that accepts a resource ID checks ownership
- [ ] Admin routes have role checks, not just auth checks
- [ ] Authorization logic in service layer, not scattered in routes

**Input:**
- [ ] Zod schema on every POST/PATCH/PUT route
- [ ] String lengths bounded
- [ ] No user input in file paths, shell commands, or dynamic imports
- [ ] No `$queryRawUnsafe` with interpolated user input

**Headers:**
- [ ] Security headers configured in `next.config.js`
- [ ] Verified at securityheaders.com after deployment

**Rate limiting:**
- [ ] Auth endpoints rate limited
- [ ] AI-powered endpoints rate limited per user

**Dependencies:**
- [ ] `npm audit` run before deployment
- [ ] Dependabot enabled

**Privacy:**
- [ ] Only necessary data collected
- [ ] Account deletion function written and tested
- [ ] Privacy policy published

**HTTPS / Cookies:**
- [ ] HTTPS active, HTTP redirects to HTTPS
- [ ] Cookies use `httpOnly`, `secure`, `sameSite`

---

## What to Build Next

Phase 4 — Production Lite is complete.

Your SaaS is live, fast, backed up, deployed correctly, and secured against the most common attacks.

Next is **Phase 5 — Growth Lite**: gathering feedback, planning your roadmap, SEO, and preparing to present what you've built.
