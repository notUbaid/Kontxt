---
title: CI/CD
slug: ci-cd
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 20–30 min
---

# CI/CD

CI/CD is the pipeline that takes code from your laptop to production reliably, automatically, and with confidence.

Without it: deployments are manual, errors are caught by users, and "it works on my machine" is a real excuse. With it: every push is validated, every merge is deployable, and production is always in a known state.

This is not optional for a production web app. It's the difference between engineering and hoping.

---

## What CI/CD Actually Means

**Continuous Integration (CI):** Every code push runs automated checks — type checking, linting, tests — and fails loudly if something breaks. Merging to `main` is always safe.

**Continuous Deployment (CD):** Every merge to `main` automatically deploys to production. No manual steps. No deployment ceremonies.

The goal: the time between writing code and users having it should be measured in minutes, not days.

---

## Your Pipeline on Vercel + GitHub

For a Next.js app on Vercel, 80% of CD is already handled:

| Event | What happens automatically |
|---|---|
| Push to any branch | Vercel builds a preview deployment |
| Open a PR | Preview URL posted as a PR comment |
| Merge to `main` | Vercel deploys to production |

What Vercel doesn't do: run your tests, type checks, or linting before deploying. That's GitHub Actions.

---

## GitHub Actions: The CI Layer

Create `.github/workflows/ci.yml`. This runs on every push and PR.

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Type Check, Lint, Test
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test -- --passWithNoTests
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

**What each step catches:**

| Step | What it prevents |
|---|---|
| `tsc --noEmit` | TypeScript errors that would crash at runtime |
| `lint` | Code style violations, common antipatterns |
| `test` | Regressions in business logic |
| `build` | Build-time errors (missing env vars, import issues) |

A build that passes CI is a build that can be deployed. A build that fails CI is blocked before it reaches users.

---

## Branch Strategy

Simple and effective for a small team:

```
main ─────────────────────────────── production
       ↑ merge via PR
feature/[name] ──── PR ──────────── preview deployment
       ↑ branch from main
```

**Rules:**
- Nobody pushes directly to `main`
- Every change goes through a PR
- PRs require CI to pass before merging
- Merging to `main` deploys to production automatically

For a solo developer: branch protection on `main` still matters. It forces the CI pipeline to run before deployment, catching mistakes before users see them.

---

## Branch Protection Rules

Configure in GitHub → Settings → Branches → Add rule for `main`:

```
 Require a pull request before merging
 Require status checks to pass before merging
   → Add: "Type Check, Lint, Test" (your CI job name)
 Require branches to be up to date before merging
 Do not allow bypassing the above settings
```

This makes it physically impossible to deploy broken code to production by accident.

---

## Database Migrations in CI/CD

Migrations need to run before the new code that depends on them goes live. The deployment order must be:

```
1. Run prisma migrate deploy (applies pending migrations)
2. Deploy new application code
```

Never the reverse. Code that references a column that doesn't exist yet will crash immediately.

### Option A: Vercel Build Step (Simple)

```json
// package.json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

This runs migrations as part of every Vercel build. Works for most apps. Requires `DIRECT_URL` (not pooler URL) in Vercel environment variables.

### Option B: GitHub Actions Pre-Deploy Job (More Control)

```yaml
jobs:
  migrate:
    name: Run Migrations
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DIRECT_URL: ${{ secrets.DIRECT_URL }}

  deploy:
    name: Deploy
    needs: migrate    # ← only runs after migrate succeeds
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy
        run: curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}
```

Use Option B when: migrations are risky (dropping columns, large backfills) and you want them separated from the Vercel build.

---

## Environment Variables in GitHub Actions

CI needs environment variables to run tests and builds. Store them as GitHub Secrets.

```
GitHub → Repository → Settings → Secrets and variables → Actions
```

Add each secret individually. Never commit secrets to the repository, even in CI config files.

Reference them in your workflow:
```yaml
env:
  DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
```

**Separate test credentials from production credentials.** CI should never touch the production database.

---

## Deployment Previews as a Quality Gate

Vercel preview deployments are more useful than most teams realize.

Every PR gets a unique URL:
```
https://my-app-git-feature-auth-redesign-username.vercel.app
```

Use previews for:
- Manual QA before merging
- Stakeholder review without needing local setup
- Testing against real preview environment variables
- Sharing work-in-progress with designers or PMs

Configure Vercel to post the preview URL as a PR comment automatically — it does this by default when connected to GitHub.

---

## Rollback Strategy

Deployments go wrong. Know how to recover before it happens.

**Instant rollback on Vercel:**
```
Vercel Dashboard → Deployments → [previous deployment] → Promote to Production
```

This is a one-click operation that takes ~30 seconds. The previous build is already built and cached — no rebuild required.

**What rollback does not fix:** Database migrations that already ran. If a migration added a column, rolling back the code doesn't remove the column. This is why migrations must be backward-compatible:

```
 Safe: Add a nullable column (old code ignores it)
 Safe: Add a new table
 Risky: Remove a column (rolled-back code tries to read it)
 Risky: Rename a column (old code uses the old name)
```

For risky migrations: expand then contract. Add the new column, deploy code that uses both, backfill, then remove the old column in a subsequent deploy.

---

## CI/CD Checklist

- [ ] `.github/workflows/ci.yml` created and committed
- [ ] CI runs: type check, lint, tests, build
- [ ] Branch protection enabled on `main` requiring CI to pass
- [ ] No direct pushes to `main`
- [ ] GitHub Secrets added for all CI environment variables
- [ ] Test credentials are separate from production credentials
- [ ] Migration strategy chosen (build step or separate job)
- [ ] `DIRECT_URL` set in Vercel for Prisma migrations (not pooler URL)
- [ ] Rollback procedure documented and tested (at least manually verified once)
- [ ] Preview deployment URLs are shared with stakeholders before merging

---

## AI Prompt — CI/CD Pipeline Generation

```prompt
You are a Staff Engineer setting up a CI/CD pipeline for a production Next.js web application.

My stack:
- Framework: Next.js 14 App Router
- Language: TypeScript
- Database: PostgreSQL via Prisma + Supabase
- Hosting: Vercel
- Testing: [your test framework, e.g. Vitest / Jest / none yet]
- Repository: GitHub

Generate:
1. A complete GitHub Actions CI workflow (.github/workflows/ci.yml) that runs:
   - TypeScript type checking
   - ESLint
   - Tests (with --passWithNoTests flag)
   - Next.js production build
   On: all PRs targeting main, and all pushes to main

2. The branch protection rules I should configure in GitHub Settings

3. The migration strategy for Prisma — build step or separate job, with reasoning for my setup

4. The list of GitHub Secrets I need to create, with a description of what each should contain

5. A rollback runbook: step-by-step instructions for rolling back a bad production deployment

Flag any gaps in this pipeline for a production launch.
```

---

## What Good CI/CD Feels Like

When your CI/CD pipeline is working correctly:

- A broken type causes a red check on the PR — caught before review
- A reviewer clicks the preview URL and sees the actual change running
- Merging the PR automatically deploys to production in ~3 minutes
- A bad deployment is rolled back in under a minute with no code changes
- The team ships multiple times per day without fear

The investment is a few hours of setup. The return is every deployment for the lifetime of the product.
