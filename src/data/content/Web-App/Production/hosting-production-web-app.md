---
title: Hosting
slug: hosting
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 20–25 min
---

# Hosting

Hosting is where your software meets the real world. The wrong choice adds operational overhead that compounds every week. The right choice disappears into the background and lets you focus on building.

For a production web app, the goal is not the cheapest option or the most powerful option — it's the one that gives your team the fastest path from code to deployed, with the least maintenance burden at your current scale.

---

## The Hosting Decision Tree

```
Is your app built with Next.js?
│
├── Yes → Vercel (default, optimal)
│         ├── Zero config for Next.js
│         ├── Preview deployments on every PR
│         ├── Edge network globally
│         └── First-class App Router support
│
└── No → What does your backend look like?
          │
          ├── Node.js / Python API → Railway or Render
          ├── Containerized (Docker) → Fly.io or Cloud Run
          └── Static site only → Cloudflare Pages or Netlify
```

This module focuses on Vercel + supporting infrastructure, the correct default for a Next.js production web app.

---

## Vercel: What You Get

Vercel is not just a CDN. Understand what it actually does so you can use it correctly.

| Feature | What it means for you |
|---|---|
| **Edge Network** | Your app runs close to users globally — no config required |
| **Preview Deployments** | Every PR gets a unique URL. Share with stakeholders before merging. |
| **Automatic HTTPS** | SSL certificates provisioned and renewed automatically |
| **Zero-downtime deploys** | Traffic shifts to the new deployment atomically |
| **Serverless Functions** | Route Handlers run as isolated serverless functions per request |
| **Edge Middleware** | Middleware runs at the CDN layer before hitting your server |
| **Cron Jobs** | Scheduled functions without a separate job runner |
| **Analytics** | Real user performance data (Web Vitals) built in |

**The tradeoff:** Vercel's serverless model means your Route Handlers are stateless and short-lived. You cannot hold WebSocket connections or long-running processes in a Route Handler. For those, use Supabase Realtime, Liveblocks, or a separate service.

---

## Environment Strategy

Every production app needs at minimum three environments:

| Environment | Purpose | Deployment trigger |
|---|---|---|
| **Local** | Development on your machine | Manual |
| **Preview** | Review PRs, test features before merge | Automatic on every PR |
| **Production** | Live app, real users | Automatic on merge to `main` |

Some teams add **staging** between preview and production — a persistent environment that mirrors production config. Add staging when: you have multiple engineers committing frequently and need a stable shared environment for QA before production.

### Environment Variables Per Environment

Never use production credentials in development. Never use development credentials in production.

```
Environment     | DATABASE_URL          | Variables from
─────────────────────────────────────────────────────────
Local           | local postgres        | .env.local (git-ignored)
Preview         | staging DB or preview | Vercel Dashboard → Preview vars
Production      | production DB         | Vercel Dashboard → Production vars
```

In Vercel, environment variables are scoped:
- **All environments** — shared values (non-secret feature flags)
- **Production only** — production secrets (live Stripe key, production DB)
- **Preview only** — staging credentials (test Stripe key, staging DB)
- **Development only** — pulled into `.env.local` via `vercel env pull`

---

## Custom Domain Setup

```
1. Purchase domain → Cloudflare (recommended registrar + DNS)
2. Add domain in Vercel Dashboard → Settings → Domains
3. Vercel provides DNS records (A record or CNAME)
4. Add records in Cloudflare DNS panel
5. Set Cloudflare proxy to "DNS only" (grey cloud) for the root domain
   — Vercel manages SSL; Cloudflare proxy can interfere
6. SSL certificate provisioned automatically by Vercel
```

**Why Cloudflare as registrar/DNS?**
Free DDoS protection, fast DNS propagation, free DNS management, and a straightforward interface. You can use any registrar, but Cloudflare simplifies the setup.

**Subdomain strategy:**

| Subdomain | Use |
|---|---|
| `app.yourdomain.com` | The web application |
| `api.yourdomain.com` | Separate API (if applicable) |
| `www.yourdomain.com` | Redirect to `app.` or root |
| `docs.yourdomain.com` | Documentation (if applicable) |

---

## Database Hosting

Your Next.js app on Vercel still needs a database somewhere. Vercel does not host databases.

| Option | Best for | Notes |
|---|---|---|
| **Supabase** | Full stack (auth + DB + storage) | Free tier, managed PostgreSQL, built-in connection pooling |
| **Neon** | Serverless PostgreSQL | Scales to zero, branch-per-PR databases, good Vercel integration |
| **PlanetScale** | MySQL, large teams | Branching model, no foreign keys |
| **Railway** | Simple managed Postgres | Good DX, straightforward pricing |

**Connection pooling is required for serverless.** Serverless functions open a new database connection per invocation. Without a connection pooler (PgBouncer, Supabase's built-in pooler), you'll exhaust database connections under moderate load.

Supabase includes a connection pooler at `db.[project].supabase.co:6543`. Use this URL (not the direct connection) in your `DATABASE_URL` on Vercel.

```bash
# .env.example
# Use the pooler URL for Vercel (port 6543, not 5432)
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:6543/postgres?pgbouncer=true

# Direct URL for Prisma migrations only (migrations can't use pooler)
DIRECT_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

---

## Vercel Configuration

```json
// vercel.json — only needed for advanced config
{
  "regions": ["bom1"],          // Mumbai — closest to India
  "functions": {
    "app/api/**": {
      "maxDuration": 30          // seconds; default 10s on Hobby, 300s on Pro
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

**Region selection matters.** Vercel defaults to `iad1` (US East). If your users and database are in another region, set the region to minimize latency. A serverless function in the US hitting a database in Mumbai adds ~200ms per request.

Co-locate your Vercel functions with your database region.

---

## File Storage

Vercel's filesystem is ephemeral — files written during a function invocation are gone after. Never write files to disk in a serverless environment.

| Use case | Solution |
|---|---|
| User-uploaded files | Supabase Storage or Cloudflare R2 |
| Generated PDFs, exports | Generate → stream directly, or store in S3/R2 |
| Profile images, avatars | Supabase Storage (with image transformations) |
| Static assets (icons, fonts) | `public/` directory (served by Vercel CDN) |

---

## Monitoring Your Deployment

Hosting is not "deploy and forget." Define what you'll watch.

| Signal | Tool | What to watch |
|---|---|---|
| Error rate | Sentry | New errors, error spikes after deploys |
| Performance | Vercel Analytics | Core Web Vitals, p75/p95 response times |
| Uptime | Better Uptime or UptimeRobot | Endpoint availability, SSL expiry |
| Database | Supabase Dashboard | Slow queries, connection count, storage usage |
| Costs | Vercel + Supabase dashboards | Function invocations, bandwidth, DB compute |

Set up Sentry before launch. The first production error you can't reproduce locally will tell you why.

---

## Deployment Checklist

- [ ] Vercel project linked to GitHub repository
- [ ] Production branch set to `main` (or your primary branch)
- [ ] All environment variables added to Vercel Dashboard (not just `.env.local`)
- [ ] Custom domain configured and SSL verified
- [ ] Database connection pooler URL used in `DATABASE_URL`
- [ ] `DIRECT_URL` set separately for Prisma migrations
- [ ] Vercel region matches database region
- [ ] `vercel.json` configured if any non-default function durations are needed
- [ ] Sentry DSN added as environment variable
- [ ] Uptime monitoring configured for at least the root URL and a critical API endpoint
- [ ] Preview deployments tested — confirm environment variables are correct for preview environment

---

## Scaling Considerations

You don't need to solve scale before you have users. But know the levers.

| Bottleneck | Signal | Solution |
|---|---|---|
| Slow pages | High TTFB in Vercel Analytics | Add caching, move to SSG where possible, optimize queries |
| DB connection exhaustion | Supabase connection errors | Increase pooler limits, optimize query count |
| Function timeouts | 504 errors in Vercel logs | Offload heavy work to background jobs |
| High Vercel costs | Function invocation count | Cache aggressively, move static content to SSG |
| Cold start latency | Slow first-request after inactivity | Vercel Pro reduces cold starts; move to Edge Runtime for ultra-low latency |

Most apps never hit these limits before finding product-market fit. Build simply, measure, then optimize what the data tells you to.

---

## AI Prompt — Hosting Configuration Review

```prompt
You are a Staff Engineer reviewing the hosting configuration for a production Next.js web application deploying to Vercel with Supabase.

My app: [describe in 2–3 sentences]
Expected traffic at launch: [e.g. "~500 MAU, B2B SaaS"]
Primary user geography: [e.g. India, US, EU]
Supabase region: [e.g. ap-south-1 Mumbai]

Review the following and identify any gaps or misconfigurations:

Environment variables defined: [list your env var names without values]
Vercel region: [your setting]
Database URL type: [pooler or direct]
File storage: [your approach]
Background jobs: [your approach or "none yet"]

Flag:
1. Any environment variables likely missing for a production launch
2. Region mismatches causing unnecessary latency
3. Serverless-incompatible patterns (filesystem writes, persistent connections)
4. Missing monitoring or alerting
5. Cost risks at the described traffic level
```
