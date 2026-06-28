---
title: Security
slug: security
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# Security

Security is not a checklist you complete before launch. It is a set of defaults you build into every layer of your application from the beginning.

Most production breaches don't exploit zero-days. They exploit missing headers, unsanitized inputs, overprivileged tokens, and misconfigured infrastructure — all things you control today.

---

## The Threat Model

Before hardening anything, know what you are defending against:

| Threat | Attack Vector | Your Defense |
|---|---|---|
| Injection (SQL, NoSQL, command) | Unsanitized user input reaching an interpreter | Parameterized queries, input validation |
| Broken authentication | Weak tokens, missing expiry, no rate limiting | Short-lived JWTs, refresh tokens, rate limits |
| Broken access control | Missing authorization checks | Row-level policies, explicit permission checks |
| Security misconfiguration | Default settings, exposed internals | Secure headers, env hygiene, least privilege |
| Sensitive data exposure | Logging PII, leaking stack traces | Redaction, structured error responses |
| Cross-Site Scripting (XSS) | Injecting scripts via user content | CSP headers, output encoding |
| Cross-Site Request Forgery (CSRF) | Forged requests from malicious sites | SameSite cookies, CSRF tokens |
| Rate limiting / DoS | Unlimited requests exhausting resources | Rate limits, request size limits |
| Dependency vulnerabilities | Compromised packages | Dependency auditing, lockfiles |

---

## Part 1: HTTP Security Headers

Headers are the fastest security win available. One middleware, applied globally, closes multiple attack vectors.

```bash
npm install helmet
```

```typescript
// server.ts
import helmet from 'helmet';

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'nonce-{NONCE}'"], // Use nonces for inline scripts
        styleSrc: ["'self'", "'unsafe-inline'"],  // Tighten if possible
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", process.env.API_URL!],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],               // Prevents clickjacking
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'same-origin' },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,                          // Remove X-Powered-By: Express
    hsts: {
      maxAge: 31536000,                           // 1 year
      includeSubDomains: true,
      preload: true,
    },
    ieNoOpen: true,
    noSniff: true,                                // Prevent MIME sniffing
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true,
  })
);
```

> **What each header does:**
> - `HSTS`: Forces HTTPS — browser won't allow HTTP connections
> - `X-Frame-Options: DENY`: Prevents your pages from being embedded in iframes (clickjacking)
> - `X-Content-Type-Options: nosniff`: Stops browsers guessing MIME types (XSS vector)
> - `CSP`: Whitelists what scripts, styles, and resources the browser can load
> - `Referrer-Policy`: Controls what URL is sent in the `Referer` header

---

## Part 2: Input Validation

Validation is your first line of defense. Every piece of data entering your application from the outside must be validated before it reaches your business logic or database.

```bash
npm install zod
```

```typescript
// schemas/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email().max(254).toLowerCase().trim(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number'),
  name: z.string().min(1).max(100).trim(),
  role: z.enum(['user', 'admin']).default('user'),
});

export const updateUserSchema = createUserSchema
  .partial()
  .omit({ role: true }); // Users cannot change their own role

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

```typescript
// middleware/validate.ts
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from '../lib/errors';

export function validate(schema: AnyZodObject) {
  return async (req, _res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new ValidationError('Invalid request data', {
          fields: err.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };
}
```

```typescript
// routes/users.ts
router.post('/users', validate(createUserSchema), asyncHandler(createUser));
router.patch('/users/:id', validate(updateUserSchema), asyncHandler(updateUser));
```

> ⚠️ **Never trust client-sent role or permission fields.** Validate and strip them at the schema layer. Role assignment must come from your server-side authorization logic only.

---

## Part 3: Rate Limiting

Every public endpoint needs rate limiting. Without it, a single script can exhaust your database, API quota, or email provider.

```bash
npm install express-rate-limit rate-limit-redis
```

```typescript
// lib/rateLimiter.ts
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redis } from './redis';

function createLimiter(options: {
  windowMs: number;
  max: number;
  message: string;
  keyPrefix?: string;
}) {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true,  // Return rate limit info in RateLimit-* headers
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMIT_EXCEEDED', message: options.message } },
    store: new RedisStore({
      prefix: `rl:${options.keyPrefix ?? 'default'}:`,
      sendCommand: (...args) => redis.call(...args),
    }),
    keyGenerator: (req) => req.ip ?? 'unknown',
  });
}

// Different limits for different sensitivity levels
export const rateLimiters = {
  // Strict: auth endpoints
  auth: createLimiter({
    windowMs: 15 * 60 * 1000,  // 15 min
    max: 10,
    message: 'Too many attempts. Try again in 15 minutes.',
    keyPrefix: 'auth',
  }),

  // Moderate: mutation endpoints
  api: createLimiter({
    windowMs: 60 * 1000,        // 1 min
    max: 60,
    message: 'Too many requests. Slow down.',
    keyPrefix: 'api',
  }),

  // Generous: read endpoints
  read: createLimiter({
    windowMs: 60 * 1000,        // 1 min
    max: 200,
    message: 'Too many requests.',
    keyPrefix: 'read',
  }),

  // Tight: password reset, email verification
  sensitive: createLimiter({
    windowMs: 60 * 60 * 1000,  // 1 hour
    max: 5,
    message: 'Too many attempts. Try again in 1 hour.',
    keyPrefix: 'sensitive',
  }),
};
```

```typescript
// Apply to routes
router.post('/auth/login', rateLimiters.auth, asyncHandler(login));
router.post('/auth/register', rateLimiters.auth, asyncHandler(register));
router.post('/auth/forgot-password', rateLimiters.sensitive, asyncHandler(forgotPassword));
router.get('/products', rateLimiters.read, asyncHandler(getProducts));
router.post('/orders', rateLimiters.api, asyncHandler(createOrder));
```

---

## Part 4: SQL Injection Prevention

If you use an ORM like Prisma, you're protected by default — it uses parameterized queries internally. But raw queries are still a risk.

```typescript
// ❌ SQL injection vulnerability
const users = await prisma.$queryRaw(
  `SELECT * FROM users WHERE email = '${email}'`
);

// ✅ Safe — Prisma uses tagged template literals as parameterized queries
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${email}
`;

// ✅ Also safe — ORM query builder
const users = await prisma.user.findMany({
  where: { email },
});
```

> **Rule:** Never interpolate user input directly into SQL strings. Use tagged template literals for raw queries, or use the ORM's query builder.

---

## Part 5: Authentication Hardening

### JWT Best Practices

```typescript
// lib/tokens.ts
import jwt from 'jsonwebtoken';
import { AuthenticationError } from './errors';

const ACCESS_TOKEN_TTL = '15m';   // Short-lived
const REFRESH_TOKEN_TTL = '7d';   // Long-lived, rotated on use

export function signAccessToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: ACCESS_TOKEN_TTL,
    issuer: process.env.APP_URL,
    audience: 'api',
  });
}

export function signRefreshToken(payload: { userId: string; tokenFamily: string }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_TOKEN_TTL,
    issuer: process.env.APP_URL,
    audience: 'refresh',
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!, {
      issuer: process.env.APP_URL,
      audience: 'api',
    }) as { userId: string; role: string };
  } catch {
    throw new AuthenticationError('Invalid or expired token');
  }
}
```

> **Why 15-minute access tokens?** A stolen access token is only valid for 15 minutes. Refresh tokens are long-lived but stored server-side, allowing instant revocation via logout.

### Refresh Token Rotation

```typescript
// services/authService.ts

export async function refreshTokens(refreshToken: string) {
  let payload: { userId: string; tokenFamily: string };

  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as typeof payload;
  } catch {
    throw new AuthenticationError('Invalid refresh token');
  }

  // Check token family exists and matches (detect reuse attacks)
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken || storedToken.userId !== payload.userId) {
    // Possible token theft — invalidate entire family
    await prisma.refreshToken.deleteMany({
      where: { family: payload.tokenFamily },
    });
    throw new AuthenticationError('Refresh token reuse detected');
  }

  // Rotate: delete old, issue new
  await prisma.refreshToken.delete({ where: { token: refreshToken } });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: payload.userId } });
  const newAccessToken = signAccessToken({ userId: user.id, role: user.role });
  const newRefreshToken = signRefreshToken({ userId: user.id, tokenFamily: payload.tokenFamily });

  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: user.id,
      family: payload.tokenFamily,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
```

---

## Part 6: Password Security

```typescript
// lib/password.ts
import argon2 from 'argon2';

// Argon2id is the current best practice (winner of Password Hashing Competition)
const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64MB
  timeCost: 3,
  parallelism: 4,
};

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return argon2.verify(hash, password);
}
```

> **Why Argon2 over bcrypt?** Argon2id is memory-hard, making GPU/ASIC brute-force attacks significantly more expensive. It's the OWASP-recommended default for new applications. If you're on a constrained environment, bcrypt with cost factor 12+ is still acceptable.

---

## Part 7: CORS Configuration

```typescript
// lib/cors.ts
import cors from 'cors';

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  credentials: true,              // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  exposedHeaders: ['X-Request-ID', 'RateLimit-Limit', 'RateLimit-Remaining'],
  maxAge: 86400,                  // Cache preflight for 24h
});
```

```bash
# .env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

> ⚠️ **Never set `origin: '*'` with `credentials: true`.** Browsers block this combination — but more importantly, it would allow any site to make authenticated requests on behalf of your users.

---

## Part 8: Environment & Secret Hygiene

### What Must Never Be in Code

```bash
# ❌ Never hardcode
const secret = 'my-super-secret-key';
const dbUrl = 'postgresql://admin:password@localhost:5432/mydb';

# ✅ Always from environment
const secret = process.env.JWT_ACCESS_SECRET!;
const dbUrl = process.env.DATABASE_URL!;
```

### Validate Environment at Startup

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ALLOWED_ORIGINS: z.string(),
  APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

```typescript
// server.ts — import env first, before anything else
import './lib/env'; // Throws immediately if required env vars are missing
```

> **Why validate at startup?** Missing env vars cause cryptic runtime errors deep in request handling. Fail fast at boot so you know immediately what's missing — before serving any traffic.

### Secret Rotation Checklist

- [ ] JWT secrets are at least 256 bits (32+ random characters)
- [ ] Separate secrets for access and refresh tokens
- [ ] Database credentials are not the same as app credentials
- [ ] API keys for third-party services are scoped to minimum permissions
- [ ] `.env` is in `.gitignore` — verified with `git status`
- [ ] Secrets stored in a secrets manager (AWS Secrets Manager, Doppler, Vault) in production

---

## Part 9: Request Size Limits

```typescript
// server.ts
app.use(express.json({ limit: '1mb' }));          // API payloads
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// For file uploads — handle separately with multer limits
import multer from 'multer';

export const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5,                    // Max 5 files per request
    fields: 20,                  // Max 20 non-file fields
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ValidationError(`File type ${file.mimetype} not allowed`));
    }
  },
});
```

---

## Part 10: Dependency Security

```bash
# Audit on every install
npm audit

# Fix automatically where safe
npm audit fix

# Check for known vulnerabilities in CI
npx better-npm-audit audit --level high

# Keep dependencies updated
npx npm-check-updates -u
```

Add to CI pipeline:

```yaml
# .github/workflows/security.yml
- name: Security audit
  run: npm audit --audit-level=high
```

> A compromised dependency (supply chain attack) can bypass every application-level security control you have. Keep dependencies minimal, up-to-date, and audited in CI.

---

## Security Implementation Checklist

- [ ] Helmet middleware applied globally with CSP configured
- [ ] All inputs validated with Zod before reaching business logic
- [ ] Rate limiting applied — strict on auth, moderate on mutations, generous on reads
- [ ] Raw SQL uses parameterized queries / tagged template literals only
- [ ] JWT access tokens expire in 15 minutes or less
- [ ] Refresh token rotation with reuse detection implemented
- [ ] Passwords hashed with Argon2id (or bcrypt cost ≥ 12)
- [ ] CORS explicitly allowlisted — no wildcard with credentials
- [ ] Environment variables validated at startup with Zod
- [ ] `.env` confirmed absent from git history
- [ ] Request body size limits set
- [ ] File upload MIME type and size validation in place
- [ ] `npm audit` passing at high severity level in CI
- [ ] No secrets, tokens, or PII in application logs

---

## AI Prompt: Security Audit

```
You are a senior application security engineer reviewing a production Node.js/Express API.

Stack: Node.js, Express, Prisma, PostgreSQL, Redis, JWT authentication

Here is my security configuration:
[paste: helmet setup]
[paste: rate limiter config]
[paste: CORS config]
[paste: one auth route handler]
[paste: one database query with user input]

Audit for:
1. Missing or misconfigured security headers
2. Input validation gaps that could allow injection
3. Authentication weaknesses (token lifetime, storage, rotation)
4. Authorization gaps (routes accessible without proper checks)
5. Information leakage in error responses or logs
6. Rate limiting gaps on sensitive endpoints

Return OWASP Top 10 findings only. No general advice. Reference specific lines or functions.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| No Helmet middleware | XSS, clickjacking, MIME attacks | Apply Helmet globally before routes |
| Validating only on frontend | Bypass with curl or Postman | Always validate on the server |
| Long-lived JWTs (24h+) | Stolen token valid for hours | 15-minute access tokens + refresh rotation |
| bcrypt with cost < 10 | Brute-forceable in minutes | Use Argon2id or bcrypt cost ≥ 12 |
| `CORS origin: '*'` with cookies | Cross-site authenticated requests | Explicit origin allowlist |
| No rate limiting on login | Credential stuffing at scale | 10 attempts per 15 min per IP |
| User input in raw SQL strings | SQL injection, full DB compromise | Parameterized queries only |
| Secrets committed to git | Permanent credential exposure | Rotate immediately, use secrets manager |
| No request size limit | Payload DoS attack | Set limits on `express.json()` |

---

## Next: Phase 5 — Quality Assurance →

Backend engineering is complete. Phase 5 covers Code Quality, Testing, and Observability — the systems that keep production healthy after launch.
