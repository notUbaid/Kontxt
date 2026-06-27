# Deployment

**Estimated Time:** 25–35 min

---

Deployment is not the finish line. It is where your assumptions meet reality.

This module gets your SaaS live on a real domain, with the right infrastructure, deployed in a way you can maintain and iterate on alone.

---

## Choose Your Deployment Target First

Your stack determines your options. Pick the right host before configuring anything.

| Stack | Recommended host | Why |
|---|---|---|
| **Next.js** | Vercel | Built by the Next.js team, zero config, edge network |
| **Next.js (self-control)** | Railway, Render | More control, predictable pricing at scale |
| **Express / Fastify** | Railway, Render, Fly.io | Long-running servers, not serverless |
| **FastAPI / Python** | Railway, Render, Fly.io | Container-based, straightforward |
| **Full-stack monolith** | Railway | One service, one bill, simple ops |

> **Recommendation for personal SaaS on Next.js: Vercel.** Zero configuration, automatic preview deployments, global CDN, built-in analytics, and the best Next.js support that exists. The free tier covers most personal projects indefinitely.

> **Watch out:** Vercel's serverless model doesn't support long-running connections (WebSockets, persistent background jobs). If your SaaS needs those, use Railway instead.

---

## Pre-Deployment Checklist

Do not deploy until every item here is confirmed.

**Code:**
- [ ] All `console.log` debug statements removed from production paths
- [ ] No hardcoded URLs pointing to `localhost`
- [ ] No API keys or secrets in source code
- [ ] `.env` is in `.gitignore` — confirm with `git status`
- [ ] `npm run build` passes locally without errors or warnings
- [ ] TypeScript strict mode passes with zero errors

**Environment:**
- [ ] All production environment variables documented
- [ ] Database connection string points to production DB (not dev)
- [ ] Stripe keys are live keys (not test) — or explicitly test if still in development
- [ ] Auth provider configured with production callback URLs
- [ ] Email provider domain verified (from the Emails module)

**Database:**
- [ ] All migrations applied to production database
- [ ] Production database accessible from deployment environment
- [ ] Connection pooling configured (critical for serverless)

---

## Connection Pooling (Critical for Serverless)

If you're deploying to Vercel or any serverless platform, each function invocation opens a new database connection. Under load, this exhausts your connection limit and crashes your app.

**The fix: a connection pooler between your app and database.**

| Database | Pooler | How |
|---|---|---|
| **Neon** | Built-in pooled connection string | Use the pooled URL in production |
| **Supabase** | Supavisor (built-in) | Use port 6543 connection string |
| **PlanetScale** | Serverless driver | Replace Prisma adapter |
| **Railway / other** | PgBouncer | Add as a separate service |

**Neon example — two connection strings:**

```bash
# .env.production
# Direct connection — use for migrations only
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname"

# Pooled connection — use for all queries
DATABASE_URL_POOLED="postgresql://user:pass@ep-xxx.neon.tech/dbname?pgbouncer=true&connection_limit=1"
```

```typescript
// lib/db.ts — use pooled in production
export const db = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL,
})
```

> Skipping connection pooling on a serverless deployment is the single most common reason a personal SaaS crashes under its first traffic spike.

---

## Deploying to Vercel

### Initial Setup

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts. Vercel detects Next.js automatically and configures the build.

Or connect via the Vercel dashboard:
1. Import your GitHub repository
2. Vercel builds on every push to `main`

### Environment Variables

In Vercel dashboard → Project → Settings → Environment Variables.

Add every variable from your `.env`. Set the correct environment for each:

| Variable | Development | Preview | Production |
|---|---|---|---|
| `DATABASE_URL` | Local DB | Staging DB | Production DB |
| `STRIPE_SECRET_KEY` | Test key | Test key | Live key |
| `NEXT_PUBLIC_APP_URL` | localhost:3000 | Preview URL | yourdomain.com |

> Never put a live Stripe key in Preview environments. A preview deployment is shared in PRs — anyone with the URL can trigger real charges.

### Preview Deployments

Every push to a non-main branch gets its own URL automatically.

Use preview deployments to:
- Test features before merging
- Share work-in-progress with yourself or a beta tester
- Run against a staging database (configure a separate `DATABASE_URL` for Preview)

---

## Custom Domain

A custom domain is not optional. `your-app.vercel.app` does not look like a real product.

**In Vercel:**
1. Project → Settings → Domains
2. Add your domain (e.g. `yourdomain.com` and `www.yourdomain.com`)
3. Vercel provides DNS records to add at your registrar

**DNS records to add:**

```
Type    Name    Value
A       @       76.76.21.21        (Vercel's IP)
CNAME   www     cname.vercel-dns.com
```

SSL is automatic. Vercel provisions a certificate via Let's Encrypt within minutes of DNS propagation.

**DNS propagation takes 5 minutes to 48 hours.** Check status at [whatsmydns.net](https://www.whatsmydns.net).

---

## Environment Variable Validation on Boot

From the Backend module — confirm this is in place before deploying:

```typescript
// lib/env.ts
import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

If a variable is missing, your app fails immediately at startup with a clear error instead of silently misbehaving mid-request.

---

## Running Migrations on Deploy

Never run migrations manually in production. Automate them.

**Vercel — add a build command:**

In `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

`prisma migrate deploy` applies all pending migrations without prompting. Safe for automated environments.

> `prisma migrate deploy` ≠ `prisma migrate dev`. The `dev` command creates new migrations. The `deploy` command applies existing ones. Always use `deploy` in CI/CD.

---

## CI/CD with GitHub Actions

For more control than Vercel's built-in CI, or for non-Vercel deployments:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

This gates every deployment on a passing type check and build. Broken code does not reach production.

---

## Post-Deployment Verification

After every production deployment, verify these manually:

```
 Home page loads
 Sign up flow works end-to-end
 Login flow works
 Core feature works (create the main object your app manages)
 Stripe checkout completes (use a test card in test mode, live card in production)
 Webhook received and processed (check Stripe dashboard → Webhooks → recent events)
 Email sent (trigger a welcome or invite email, verify it arrives)
 No errors in Vercel's Function Logs
```

This takes 5 minutes and catches 90% of deployment regressions before users hit them.

---

## Rollback

Vercel keeps every deployment. If something breaks in production:

1. Vercel dashboard → Deployments
2. Find the last working deployment
3. Click the three-dot menu → **Promote to Production**

Instant rollback. No redeployment needed.

For Railway or other providers, rollback means reverting your Git commit and pushing — trigger a new deployment from the previous commit.

> ️ Database migrations cannot be automatically rolled back. If a migration breaks production, you need a down migration written manually. This is why dangerous migrations (dropping columns, renaming) need extra care. Deploy the code change before the schema change, not simultaneously.

---

## Monitoring

You need to know when your app breaks before users tell you.

**Minimum viable monitoring:**

| What | Tool | Free tier |
|---|---|---|
| **Uptime** | BetterStack, UptimeRobot | Yes |
| **Error tracking** | Sentry | 5K errors/month free |
| **Function logs** | Vercel built-in | Yes |
| **Performance** | Vercel Speed Insights | Yes |

**Sentry setup — 5 minutes:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Sentry captures every unhandled error, groups them by fingerprint, and alerts you by email. You'll know about crashes before users report them.

**UptimeRobot:**
- Add a monitor for `https://yourdomain.com`
- Check every 5 minutes
- Alert by email if down
- Free forever for up to 50 monitors

---

## Staging Environment

A staging environment is a copy of production that you break safely.

For a personal SaaS, a lightweight staging setup:

```
Production:  main branch → yourdomain.com      → production DB
Staging:     staging branch → staging.yourdomain.com → staging DB
```

In Vercel: add `staging.yourdomain.com` as a domain and assign it to your `staging` branch.

You don't need staging on day one. Add it when you find yourself afraid to deploy to production — that fear is the signal.

---

## Deployment Prompt

```prompt
You are a senior DevOps engineer helping me configure a production deployment for my SaaS.
Stack: [Next.js / Express / FastAPI]
Hosting: [Vercel / Railway / Render / Fly.io]
Database: [Neon / Supabase / PlanetScale / Railway PostgreSQL]
ORM: [Prisma / Drizzle]
Auth: [Clerk / Auth.js / Supabase Auth]
Please generate:
1. Complete deployment checklist specific to my stack
2. Environment variable list with correct scoping (dev / preview / production)
3. Database connection pooling configuration for my provider
4. Build command with migration step
5. GitHub Actions workflow for CI/CD
6. Post-deployment verification steps
7. Rollback procedure for my hosting provider
8. Minimum monitoring setup I should have on day one
```

---

## Full Deployment Checklist

**Before deploying:**
- [ ] `npm run build` passes locally
- [ ] TypeScript zero errors
- [ ] No secrets in source code
- [ ] `.env` in `.gitignore`
- [ ] All production env vars added to hosting dashboard
- [ ] Database pointing to production instance
- [ ] Connection pooling configured for serverless
- [ ] Auth provider callback URLs updated to production domain
- [ ] Stripe webhook endpoint updated to production URL
- [ ] Email provider domain verified

**Deployment:**
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Migrations run on deploy (automated)
- [ ] Environment variable validation on boot

**After deploying:**
- [ ] Signup flow works
- [ ] Login flow works
- [ ] Core feature works
- [ ] Stripe checkout completes
- [ ] Webhook received
- [ ] Email delivered
- [ ] No errors in function logs
- [ ] Uptime monitor configured
- [ ] Error tracking (Sentry) active

---

## What to Build Next

Your SaaS is live. Real URL. Real SSL. Real users can sign up.

Next: **Security Basics** — the last layer before you start growing. The things that protect your users and your reputation once real traffic arrives.
