---
title: Security
slug: security
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 35–50 min
---

# Security

Security is not a phase. It's not a checklist you run through before launch. It's a set of decisions baked into your architecture, your defaults, and your code review habits.

The goal of this module is not to make you paranoid. It's to help you understand your actual attack surface — and close the gaps that matter before someone else finds them.

Most SaaS security incidents don't come from sophisticated zero-days. They come from missing authorization checks, exposed credentials, and unvalidated inputs. These are preventable.

---

## Your Attack Surface

Before hardening anything, map what you're defending.

```
External attack surface:
  ├── Authentication endpoints (login, signup, password reset, OAuth)
  ├── API endpoints (every route that reads or writes data)
  ├── File upload endpoints
  ├── Webhook receivers
  ├── Admin panel
  └── Third-party integrations (OAuth callbacks, API keys)

Internal attack surface:
  ├── Database (connection strings, access controls)
  ├── Environment variables (API keys, secrets)
  ├── CI/CD pipeline (access to production secrets)
  ├── Cloud storage (bucket permissions)
  └── Team access (who can access what)
```

Work through this list for your own product. For each surface, ask: "What happens if an attacker controls this?"

---

## Authentication Hardening

Your auth system is the front door. Most attacks start here.

### Password Security

```typescript
// Use bcrypt or argon2 — never SHA/MD5/plain
import { hash, verify } from '@node-rs/argon2';

// Hashing on signup
const passwordHash = await hash(password, {
  memoryCost: 65536,    // 64MB
  timeCost: 3,
  parallelism: 4,
});

// Verifying on login
const isValid = await verify(storedHash, password);
```

**Never log passwords.** Not in error handlers, not in request logging middleware, not in debug output. Add a sanitization filter to your logger that redacts `password`, `token`, `secret`, `key` fields.

### Brute Force Protection

```typescript
// Rate limit login attempts per IP and per email
// Use a sliding window — not a fixed counter that resets on the hour

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,                    // 10 attempts per window
  keyGenerator: (req) => `${req.ip}:${req.body.email}`, // per IP + email pair
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many login attempts. Try again in 15 minutes.',
    });
  },
});

app.post('/api/auth/login', loginRateLimiter, loginHandler);
```

### Session Security

```typescript
// JWT configuration
const token = jwt.sign(
  { userId: user.id, organizationId: user.organizationId },
  process.env.JWT_SECRET!,
  {
    expiresIn: '7d',
    issuer: 'yourapp.com',
    audience: 'yourapp.com',
  }
);

// Cookie configuration — if using cookies
res.cookie('session', token, {
  httpOnly: true,       // inaccessible to JavaScript — prevents XSS token theft
  secure: true,         // HTTPS only
  sameSite: 'lax',      // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
});
```

**Always set `httpOnly` and `secure` on session cookies.** `httpOnly` means JavaScript can't read the cookie — the single most important XSS mitigation.

### Password Reset Security

```typescript
// Secure token generation
const resetToken = crypto.randomBytes(32).toString('hex');
const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

// Store the hash, send the plaintext token in the email
await db.passwordResetToken.create({
  data: {
    tokenHash,          // what's stored in DB
    userId: user.id,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    used: false,
  },
});

// Send resetToken (not tokenHash) in the email URL
// On reset: hash the incoming token, compare against stored hash
```

**Never store plaintext reset tokens.** If your database is breached, stored tokens must not be usable. Store the hash, send the raw token.

---

## Authorization: The Critical Layer

Authorization bugs are the most common source of data breaches in SaaS. One missing check and users can read each other's data.

### Enforce at the Data Layer, Not Just the Route Layer

```typescript
//  Checking at the route level only — bypassable
app.get('/api/documents/:id', authMiddleware, async (req, res) => {
  const doc = await db.document.findUnique({ where: { id: req.params.id } });
  // If you forget the org check here, any authenticated user can read any document
  if (doc.organizationId !== req.user.organizationId) return res.status(403)...
  res.json(doc);
});

//  Scoping at the query level — always correct
app.get('/api/documents/:id', authMiddleware, async (req, res) => {
  const doc = await db.document.findFirst({
    where: {
      id: req.params.id,
      organizationId: req.user.organizationId,  // scope is part of the query
    },
  });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});
```

When the scope is part of the query, forgetting to check it returns `null` (404) instead of the wrong record. Make tenant scoping structural, not manual.

### Insecure Direct Object Reference (IDOR)

IDOR is when a user changes an ID in a URL to access someone else's resource. It's the #1 authorization bug in web apps.

```
GET /api/invoices/1234   → user sees their invoice
GET /api/invoices/1235   → user sees someone else's invoice ← IDOR
```

**The fix:** Always include the authenticated user's scope in every database query. The example above shows this. Run this audit on every endpoint:

> For every route that accepts an ID parameter — am I scoping the query to the current user's organization?

### Principle of Least Privilege for Roles

```typescript
// Define what each role can do explicitly
const PERMISSIONS = {
  viewer: ['document:read', 'comment:read'],
  editor: ['document:read', 'document:write', 'comment:read', 'comment:write'],
  admin: ['document:read', 'document:write', 'document:delete',
          'comment:read', 'comment:write', 'member:invite', 'billing:manage'],
} as const;

function can(user: User, permission: Permission): boolean {
  return PERMISSIONS[user.role]?.includes(permission) ?? false;
}

// Usage in route handlers
if (!can(req.user, 'document:delete')) {
  return res.status(403).json({ error: 'Insufficient permissions' });
}
```

---

## Input Validation

Never trust user input. Validate at the boundary — where data enters your system.

```typescript
import { z } from 'zod';

const createDocumentSchema = z.object({
  title: z.string().min(1).max(255).trim(),
  body: z.string().max(100_000).optional(),
  status: z.enum(['draft', 'published']),
  // Never accept organizationId from the client — take it from the auth token
});

app.post('/api/documents', authMiddleware, async (req, res) => {
  const result = createDocumentSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input', details: result.error.flatten() });
  }

  const doc = await db.document.create({
    data: {
      ...result.data,
      organizationId: req.user.organizationId, // from auth, not from client
      createdBy: req.user.id,
    },
  });

  res.status(201).json({ document: doc });
});
```

**Fields that should never come from client input:**
- `organizationId` — always from the auth token
- `userId` — always from the auth token
- `role` — always from the database
- `createdAt`, `updatedAt` — always set by the server
- `isAdmin`, `isPaid` — always from the database

---

## Secrets Management

### Environment Variable Rules

```bash
# .env.example — committed to git, values are placeholders
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secret-here-minimum-32-chars
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
POSTHOG_KEY=phc_...

# .env — never committed to git
# Add to .gitignore immediately
```

```bash
# .gitignore
.env
.env.local
.env.production
*.pem
*.key
```

**Run this check now:**

```bash
# Check if any secrets are in your git history
git log --all --full-history -- .env
git grep -i "sk_live\|whsec_\|password\|secret" $(git log --pretty=format:'%H')
```

If secrets are in your git history, rotate them immediately. The history is permanent — removing the file doesn't remove the secret from history.

### In Production

Use your platform's secret management:

| Platform | Secret management |
|---|---|
| **Vercel** | Environment Variables (encrypted at rest) |
| **Railway** | Service Variables |
| **AWS** | Secrets Manager or Parameter Store |
| **Fly.io** | `fly secrets set KEY=value` |
| **Self-hosted** | HashiCorp Vault or Doppler |

Never hardcode secrets in your codebase. Never put secrets in Docker images. Never log the full value of environment variables on startup.

---

## HTTP Security Headers

These take 10 minutes to add and close entire classes of browser-based attacks.

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // tighten this if possible
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.yourapp.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,       // 1 year
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));
```

Verify your headers at [securityheaders.com](https://securityheaders.com) after deploying.

---

## Dependency Security

Your dependencies are part of your attack surface. A compromised npm package affects every app that uses it.

```bash
# Run before every release
npm audit

# Auto-fix low-severity issues
npm audit fix

# Check for known vulnerabilities using a dedicated tool
npx snyk test
```

Set up automated dependency updates:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5
```

Dependabot opens PRs for dependency updates automatically. Your CI tests them. You merge the green ones. This is the minimum viable dependency hygiene.

---

## AI Prompt — Security Audit

Use this after completing your core API and before going to production.

```prompt
You are a senior application security engineer performing a threat model review for a SaaS product.

Product context:
[Describe your product — what data it stores and who can access it]

Authentication approach:
[JWT / sessions / OAuth — and how you store tokens]

Authorization model:
[Multi-tenant? What roles exist? How is tenant isolation enforced?]

Key API endpoints (list your most sensitive ones):
[e.g. POST /api/documents, DELETE /api/organizations/:id, GET /api/admin/users]

Third-party services with access to your data:
[Stripe, PostHog, Slack, etc.]

Please:
1. Identify the 3 most likely attack vectors given this architecture
2. Write 2 specific IDOR test cases I should verify manually
3. Flag any authorization assumptions I might be making incorrectly
4. Suggest what a malicious user would try first after creating a free account
5. Tell me the one change with the highest security ROI right now

Be specific and adversarial in your thinking.
```

---

## Security Checklist

### Authentication

- [ ] Passwords hashed with bcrypt or argon2 (not SHA/MD5)
- [ ] Login rate limited per IP and per email
- [ ] Session tokens are short-lived (≤7 days) and rotated on privilege change
- [ ] Session cookies set with `httpOnly`, `secure`, `sameSite`
- [ ] Password reset tokens stored as hashes, expire within 1 hour, single-use
- [ ] No sensitive values logged anywhere in the auth flow

### Authorization

- [ ] Every DB query scoped by `organizationId` from the auth token
- [ ] IDOR audit completed — every ID-accepting endpoint tested cross-tenant
- [ ] Role permissions defined and enforced at the handler level
- [ ] Admin endpoints require a separate admin flag (not a regular role)
- [ ] 404 returned (not 403) when a resource doesn't belong to the user

### Input & Output

- [ ] All user input validated with a schema library (Zod / Joi / Yup)
- [ ] `organizationId`, `userId`, `role` never accepted from client body
- [ ] SQL queries use parameterized statements (ORM handles this — verify)
- [ ] File uploads validated for type (magic bytes) and size
- [ ] Error responses never leak stack traces or internal details in production

### Secrets & Config

- [ ] `.env` in `.gitignore`
- [ ] Git history checked for accidentally committed secrets
- [ ] Production secrets stored in platform secret management (not `.env` files)
- [ ] All third-party API keys scoped to minimum required permissions
- [ ] Database connection uses a user with minimum required privileges

### Infrastructure

- [ ] HTTPS enforced everywhere (HTTP redirects to HTTPS)
- [ ] Security headers set (CSP, HSTS, X-Frame-Options)
- [ ] Cloud storage buckets private by default
- [ ] Database not publicly accessible (in a private VPC or with IP allowlist)
- [ ] `npm audit` passing with no high/critical vulnerabilities
- [ ] Dependabot or equivalent configured for automated dependency updates

---

## Common Mistakes

> **️ Checking authorization at the route layer only**
> A missing check in one handler exposes the resource. Scope at the query level — it's structural, not manual.

> **️ Returning 403 for cross-tenant resources**
> A 403 tells an attacker the resource exists. A 404 reveals nothing. Return 404 when a user requests a resource outside their organization.

> **️ Trusting the client for organizationId**
> If your API accepts `organizationId` from the request body, any authenticated user can write data into any organization. Always derive scope from the auth token.

> **️ Secrets in git history**
> Deleting a file doesn't remove it from git history. If a secret was committed, rotate it immediately regardless of whether the file was later deleted.

> **️ Skipping the security headers**
> CSP, HSTS, and X-Frame-Options close entire classes of browser attacks. Adding `helmet` takes 5 minutes. Not adding it leaves low-hanging fruit for attackers.

---

## What's Next

Security is hardened. Before moving to the next module, confirm:

- You've run the IDOR audit on every endpoint that accepts an ID parameter
- Git history is clean of secrets
- `npm audit` reports no high or critical vulnerabilities
- Security headers are verified via securityheaders.com

Next up: **Performance Optimization**
