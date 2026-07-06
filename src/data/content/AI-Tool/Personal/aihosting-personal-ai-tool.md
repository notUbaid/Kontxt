---
title: Hosting
slug: hosting
phase: Phase 4
mode: personal
projectType: ai-tool
estimatedTime: 15–20 min
---

# Hosting

A personal AI tool that only runs on your laptop isn't a tool — it's a prototype. Hosting puts it on a real URL, keeps it running when your laptop is closed, and makes it accessible to the people you built it for.

For a personal project, the right hosting decision is the one you can set up in an afternoon and forget about. You are not optimising for scale. You are optimising for reliability, simplicity, and low ongoing maintenance.

---

## What Your AI Tool Needs From Hosting

Before picking a platform, understand what you're actually deploying.

```
Most personal AI tools require:
   A server that runs your API routes (Next.js, Express, FastAPI)
   Environment variable support (API keys must never be in code)
   HTTPS out of the box (required for browser APIs)
   A custom domain (optional but professional)
   Automatic deploys when you push code

Some AI tools additionally need:
  → Persistent background processes (long-running jobs)
  → WebSocket support (real-time features beyond streaming)
  → A database (covered separately)
  → File storage (S3 or equivalent)
```

Streaming AI responses work on all modern hosting platforms — this is not a differentiator. What matters is the overall fit with your stack.

---

## Platform Comparison

| Platform | Best For | Free Tier | Complexity |
|---|---|---|---|
| **Vercel** | Next.js, React, serverless API routes | Generous | Very low |
| **Railway** | Any stack, long-running servers, databases | $5 credit/month | Low |
| **Render** | Docker containers, background workers | Limited free | Low |
| **Fly.io** | Docker, global edge, WebSockets | Small free allowance | Medium |
| **Cloudflare Pages** | Static + edge functions, ultra-fast CDN | Very generous | Low |
| **Netlify** | Static sites, serverless functions | Generous | Very low |

> **For most personal AI tools built with Next.js:** Vercel. It requires zero configuration, deploys on every `git push`, handles environment variables cleanly, and has a free tier sufficient for personal projects. The only reason to choose differently is if you need persistent connections, background workers, or a co-located database.

---

## Vercel — The Default Choice

### Deploy in Four Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. From your project root
vercel

# 3. Follow prompts — link to your GitHub repo
# 4. Set environment variables
vercel env add ANTHROPIC_API_KEY
```

Or connect via the Vercel dashboard:
1. Import your GitHub repository
2. Vercel detects Next.js automatically
3. Add environment variables under Settings → Environment Variables
4. Every push to `main` triggers a production deploy

### Environment Variables in Vercel

```
Dashboard → Project → Settings → Environment Variables

Add each secret:
  ANTHROPIC_API_KEY       → Production, Preview, Development
  DATABASE_URL            → Production only (if applicable)
  NEXTAUTH_SECRET         → Production, Preview
  NEXTAUTH_URL            → Set to your production domain for Production

Never add ANTHROPIC_API_KEY as a NEXT_PUBLIC_ variable.
NEXT_PUBLIC_ prefix exposes variables to the browser bundle.
```

### Vercel's Constraints for AI Tools

```
Function execution timeout:
  Hobby (free): 10 seconds
  Pro: 60 seconds
  Enterprise: 300 seconds

Streaming responses bypass this limit for the duration of the stream.
A 30-second AI response will complete on the Hobby tier as long as
streaming is active — the timeout applies to non-streaming requests.

If you hit timeouts on non-streaming routes: upgrade to Pro ($20/month)
or move that route to Railway.
```

---

## Railway — When You Need More

Railway is the right choice when Vercel's serverless model doesn't fit — persistent WebSocket connections, background job workers, or a co-located PostgreSQL or Redis instance.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### What Railway Handles That Vercel Doesn't

```
 Long-running server processes (no 10-second timeout)
 WebSocket connections that persist
 Background job workers running continuously
 PostgreSQL, MySQL, Redis as managed add-ons in the same project
 Cron jobs via Railway's built-in scheduler
```

For a personal project where you want everything in one place — API, database, and background worker — Railway is the most friction-free option.

---

## Custom Domain

A custom domain makes your tool feel real and is easier to share than a `*.vercel.app` URL.

### On Vercel

```
Dashboard → Project → Settings → Domains → Add Domain

Enter your domain: yourtool.com
Vercel provides DNS records to add to your domain registrar.

Recommended registrars:
  → Namecheap (~$10/year for .com)
  → Cloudflare Registrar (at-cost pricing, best DNS management)
  → Porkbun (competitive pricing)

After adding DNS records, Vercel provisions SSL automatically.
Usually live within 5 minutes.
```

### Subdomain for Personal Projects

If you already have a personal domain, a subdomain is free and instant.

```
tool.yourname.com
ai.yourname.com
yourprojectname.yourname.com
```

Add a CNAME record pointing to `cname.vercel-dns.com` and you're done.

---

## Environment Configuration

The same application needs different configuration in development vs production. Structure this cleanly from the start.

```bash
# .env.local — your machine, never committed
ANTHROPIC_API_KEY=sk-ant-your-dev-key
DATABASE_URL=postgresql://localhost:5432/myapp_dev
NEXTAUTH_SECRET=any-random-string-for-local-dev
NEXTAUTH_URL=http://localhost:3000

# .env.example — committed to repo, placeholder values only
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_SECRET=generate_with_openssl_rand_-base64_32
NEXTAUTH_URL=https://yourdomain.com
```

```gitignore
# .gitignore — must include these
.env
.env.local
.env.production
.env*.local
```

The `.env.example` file tells collaborators (or future you) exactly what variables are needed without exposing real values.

---

## Deployment Workflow

Set up a workflow that makes deploying safe and automatic.

```
Development workflow:
  1. Work locally with .env.local
  2. Push to a feature branch
  3. Vercel creates a preview URL for that branch
  4. Test on preview URL
  5. Merge to main
  6. Vercel automatically deploys to production

This gives you:
  → A preview of every change before it goes live
  → Instant rollback (promote any previous deployment)
  → No manual deployment steps
```

### Verify Before Going Live

```bash
# Check your production build locally before pushing
npm run build
npm run start

# Verify environment variables are loaded correctly
# Check the /api/health route or equivalent
curl http://localhost:3000/api/health
```

---

## Monitoring — Know When It's Down

For a personal project, lightweight uptime monitoring is sufficient and free.

```
Options:
  UptimeRobot   → Free tier monitors every 5 minutes. Email alert on downtime.
  Better Uptime → Free tier, faster alerts, status page included.
  Vercel        → Shows function error rates in the dashboard (not proactive).

Setup takes 5 minutes:
  1. Create account at UptimeRobot
  2. Add monitor: HTTP(s) → your production URL
  3. Set alert email
  4. Done

You'll get an email if your tool goes offline.
```

A health check endpoint makes monitoring meaningful.

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString()
  })
}
```

Point your uptime monitor at `/api/health`. A 200 response means the application is running. Anything else triggers an alert.

---

## Rollback

When a deployment breaks something, you need to be back to working in under a minute.

```
Vercel:
  Dashboard → Deployments → [Previous working deployment] → ⋯ → Promote to Production
  Time to rollback: ~30 seconds

Railway:
  Dashboard → Deployments → [Previous deployment] → Rollback
  Time to rollback: ~1–2 minutes
```

This is why automatic deployments on every push are safe — you can always go back.

---

## Costs

For a personal project with modest usage, hosting is nearly free.

```
Vercel Hobby (free):
  → 100GB bandwidth/month
  → 100 serverless function invocations/day limit on some features
  → Sufficient for personal use with a small number of users

Vercel Pro ($20/month):
  → Needed if you exceed Hobby limits or need 60s function timeout
  → Worth it if you're sharing with more than a handful of people

Railway (~$5–10/month):
  → Based on actual resource usage
  → Predictable for personal projects
  → Includes database hosting

Custom domain: $10–15/year
Uptime monitoring: Free (UptimeRobot free tier)

Total for a solid personal AI tool setup: $0–25/month
```

The AI API costs (covered in Cost Controls) will almost certainly exceed your hosting costs.

---

## Pre-Launch Deployment Checklist

Run through this before sharing your URL with anyone.

- [ ] Application deploys successfully from main branch
- [ ] All environment variables set in production (not just locally)
- [ ] ANTHROPIC_API_KEY set as a server-side variable (not NEXT_PUBLIC_)
- [ ] Production URL loads without errors
- [ ] AI chat works end-to-end on the production URL
- [ ] Authentication works on production (if applicable)
- [ ] NEXTAUTH_URL set to production domain (if using NextAuth)
- [ ] Custom domain configured and SSL certificate active
- [ ] `.env` files confirmed absent from version control
- [ ] `.env.example` committed with placeholder values
- [ ] Uptime monitoring configured with alert email
- [ ] Health check endpoint accessible at `/api/health`
- [ ] Rollback path confirmed (previous deployment visible in dashboard)
- [ ] Spend limit set at AI provider (see Cost Controls module)

---

## Common Mistakes

> **Mistake: Setting environment variables as NEXT_PUBLIC_**
> Any variable prefixed `NEXT_PUBLIC_` is embedded in the JavaScript bundle sent to every browser. Your API key becomes public. Never prefix secrets with `NEXT_PUBLIC_`.

> **Mistake: Forgetting to set environment variables in production**
> It works locally, you deploy, it breaks. The most common cause is an environment variable that exists in `.env.local` but wasn't added to the hosting platform. Go through every variable in `.env.local` and verify it's in your production settings.

> **Mistake: No uptime monitoring**
> Your tool goes down at 2am. You find out when a friend messages you the next day. A free uptime monitor takes 5 minutes to set up and emails you within 5 minutes of any outage.

> **Mistake: Deploying directly to production without testing**
> Vercel preview deployments exist for this reason. Merge to main only after verifying the change on the preview URL. This takes 60 extra seconds and prevents most production breaks.

> **Mistake: Not committing .env.example**
> Six months later you set up on a new machine and have no idea what environment variables your own app needs. The `.env.example` file is the documentation. Always commit it.

---

## Next

With your AI tool deployed and accessible, the final topic in Phase 4 is **User Documentation** — making sure the people you share it with can actually use it without asking you for help.
