---
title: Deployment
slug: deployment
phase: Phase 4
mode: personal
projectType: web-app
estimatedTime: 30–45 min
---

# Deployment

Deployment is the moment your project becomes real. It's also where most personal projects stall — not because deployment is hard, but because there are too many options and no clear reason to pick one over another.

This module cuts through that. You'll pick a platform, configure it correctly, and ship.

---

## Pick Your Platform

For a personal Next.js web app, the decision is straightforward.

| Platform | Best For | Free Tier | Complexity |
|---|---|---|---|
| **Vercel** | Next.js apps | Generous | Very low |
| **Railway** | Full-stack with a database | Limited | Low |
| **Render** | Backend services, Docker | Limited | Low |
| **Fly.io** | Custom servers, global edge | Limited | Medium |
| **Cloudflare Pages** | Static + edge functions | Very generous | Low |

**Recommendation for a personal Next.js app: Vercel.**

It's built by the same team as Next.js. Deployments are one command or one Git push. Preview deployments for every branch. Edge network built in. The free tier covers most personal projects indefinitely.

Use Railway or Render if you need a dedicated database server or a long-running background process that Vercel's serverless model doesn't support.

---

## Before You Deploy

These must be done before your first production deployment. Not after.

**Environment variables inventory:**

```bash
# .env.local (never commit this file)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Go through every `process.env.*` in your codebase. List them. Every single one needs to exist in your deployment platform's environment variables before you go live.

**`.gitignore` check:**

```bash
# Confirm these are ignored
cat .gitignore | grep -E "\.env"
```

If `.env` or `.env.local` are not in your `.gitignore`, stop. Add them. A committed secret is a compromised secret, even in a private repo.

**Production build passes locally:**

```bash
npm run build
```

Fix every error and warning before deploying. TypeScript errors that pass in dev will fail in production builds.

---

## Deploying to Vercel

**Option 1 — CLI (fastest):**

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts. Vercel detects Next.js automatically.

**Option 2 — Git integration (recommended for ongoing projects):**

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variables (see below)
5. Deploy

Every subsequent `git push` to `main` triggers a production deployment automatically.

**Adding environment variables in Vercel:**

Project → Settings → Environment Variables

Add each variable from your `.env.local`. Set scope:
- `Production` — live site
- `Preview` — branch deployments
- `Development` — `vercel env pull` to your local machine

> [!WARNING]
> `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` must be updated to your production domain. Leaving them as `localhost` breaks auth redirects in production.

---

## Domain Setup

Vercel gives you a free `*.vercel.app` subdomain immediately. For a custom domain:

1. Buy a domain (Cloudflare Registrar is cheapest with no markup)
2. Vercel → Project → Settings → Domains → Add domain
3. Follow the DNS instructions (usually an A record or CNAME)
4. SSL is provisioned automatically

DNS propagation takes a few minutes to a few hours.

**Update environment variables after adding your domain:**

```bash
# In Vercel environment variables — Production scope
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Redeploy after changing environment variables.

---

## Database in Production

Your local database doesn't follow you to production. You need a hosted database.

| Provider | Free Tier | Best For |
|---|---|---|
| **Neon** | Generous (PostgreSQL) | Serverless, Vercel integration |
| **Supabase** | Generous (PostgreSQL) | PostgreSQL + auth + storage |
| **PlanetScale** | Limited (MySQL) | Branching schema workflow |
| **Railway** | Limited | Simple hosted Postgres |

**Neon is the easiest pairing with Vercel + Prisma:**

1. Create a Neon account → New project
2. Copy the connection string
3. Add to Vercel as `DATABASE_URL` (Production scope)
4. Run migrations against production:

```bash
# Pull production env vars locally
vercel env pull .env.production.local

# Run migrations against production database
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

> [!WARNING]
> Never run `prisma db push` in production. It can drop data. Use `prisma migrate deploy` which only applies tracked migration files — never destructive changes without an explicit migration.

---

## Running Migrations Safely

The safest migration workflow for a personal project:

```bash
# 1. Create migration locally
npx prisma migrate dev --name describe_the_change

# 2. Review the generated SQL
cat prisma/migrations/[timestamp]_describe_the_change/migration.sql

# 3. Deploy app code first if the migration is additive (new columns, new tables)
git push  # triggers Vercel deployment

# 4. Apply migration to production
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

For destructive changes (dropping columns, renaming fields):
- Add the new column/table
- Deploy code that writes to both old and new
- Migrate data
- Deploy code that only uses the new
- Drop the old column in a separate migration

This is called an expand-contract migration. It sounds like overkill for a personal project. It saves you from data loss when you forget a query still references the old column.

---

## Preview Deployments

One of Vercel's most useful features. Every pull request or branch push gets its own live URL.

```
main branch         → yourdomain.com
feature/new-posts   → new-posts-abc123.vercel.app
fix/auth-redirect   → fix-auth-xyz456.vercel.app
```

This means you can test changes on a real deployment before merging. No more "works on my machine."

To use a separate preview database (recommended):
- Create a second Neon branch or Supabase project
- Add `DATABASE_URL` with `Preview` scope in Vercel pointing to it
- Preview deployments hit the preview database, production deployments hit the production database

---

## Deployment Checklist

Run through this before sharing your URL with anyone:

**Environment**
- [ ] All environment variables set in Vercel for Production scope
- [ ] `NEXTAUTH_URL` points to production domain (not localhost)
- [ ] `.env` files are in `.gitignore`
- [ ] No secrets hardcoded in source code

**Build**
- [ ] `npm run build` passes locally with zero errors
- [ ] No TypeScript errors suppressed with `@ts-ignore`
- [ ] No `console.log` statements left in production code

**Database**
- [ ] Production database is hosted (not local)
- [ ] `prisma migrate deploy` run against production database
- [ ] Database connection string uses SSL (`?sslmode=require` for Postgres)

**Domain**
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (HTTPS working)
- [ ] Domain-dependent environment variables updated and redeployed

**Smoke test**
- [ ] Sign up flow works end-to-end
- [ ] Sign in flow works end-to-end
- [ ] Core user action (create, read, update, delete) works
- [ ] App works on mobile viewport
- [ ] 404 page renders correctly

---

## Prompt: Deployment Debugging

```
Copy Prompt
```

```
My Next.js app deployed to Vercel but something is broken in production that works locally.

Here is the error from Vercel's function logs:
[paste the error]

Here is the relevant code:
[paste the code]

My setup:
- Next.js App Router
- Prisma with [PostgreSQL / other]
- Auth via [NextAuth / Clerk / other]
- Environment: [list the env vars you have set, not their values]

Help me diagnose why this works locally but fails in production. Check for:
- Environment variable issues
- Database connection problems
- SSR vs client-side execution
- Serverless function cold start issues
- File system access (not available in serverless)
- Hardcoded localhost URLs

Suggest the most likely cause first.
```

---

## What Comes Next

Your app is live. Someone could visit it right now.

That means it's also reachable by people who want to break it.

**Security Basics** is the final step in Phase 4 — the minimum security posture every shipped personal web app needs before you share the URL publicly.
