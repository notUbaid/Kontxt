---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# CI/CD

Every time you deploy manually, you introduce risk. The steps you remember to do, the environment variables you remember to set, the tests you remember to run — all of it depends on you being thorough, alert, and not in a hurry. That's not a reliable system.

CI/CD is the practice of automating everything between "code is written" and "code is in production." Done well, it makes deploying boring — a non-event that happens tens of times a day without drama. Done badly, it's a fragile set of scripts that fails at the worst possible moments.

---

## CI vs CD — The Distinction

**Continuous Integration (CI)**
Every code change is automatically built and tested. You know within minutes whether a change breaks anything. The goal is fast feedback.

**Continuous Delivery (CD)**
Every change that passes CI is automatically deployable to production. Deployment may still require a manual trigger.

**Continuous Deployment**
Every change that passes CI is automatically deployed to production. No human approval. The most aggressive form — only appropriate when test coverage and confidence are high.

Most SaaS teams operate somewhere between Continuous Delivery and Continuous Deployment. The important thing is that the pipeline is the only path to production.

---

## The Pipeline — What It Does

A good CI/CD pipeline enforces a consistent quality gate on every change.

```
Developer pushes code
        ↓
Install dependencies
        ↓
Lint + type check          ← Fast feedback on obvious errors
        ↓
Run test suite             ← Unit, integration, critical paths
        ↓
Build application          ← Catch build-time errors
        ↓
Security scan              ← Dependency vulnerabilities
        ↓
Deploy to staging          ← Real environment validation
        ↓
Run smoke tests            ← Verify staging is functional
        ↓
Deploy to production       ← Automated or manual trigger
        ↓
Post-deploy verification   ← Health check, smoke test
```

If any step fails, the pipeline stops. The change does not reach production.

---

## Tool Selection

| Tool | Best For |
|---|---|
| **GitHub Actions** | GitHub repos. Tight integration, generous free tier, large ecosystem of actions. Default choice. |
| **GitLab CI** | GitLab repos. Built-in, powerful, self-hostable. |
| **CircleCI** | Complex pipelines, fast parallelism, Docker-first. |
| **Buildkite** | Large teams, self-hosted agents, high customisation. |
| **Railway / Render / Vercel** | Built-in deployment pipelines for simple stacks. |

> **For most SaaS on GitHub:** GitHub Actions. It's free for public repos, has thousands of pre-built actions, and integrates directly with pull requests, environments, and secrets. No separate tool to manage.

---

## A Production GitHub Actions Pipeline

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "20"

jobs:
  # ── CI ─────────────────────────────────────────────
  test:
    name: Test
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci                        # ci = exact lockfile install

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
          NODE_ENV: test

  # ── Security ────────────────────────────────────────
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Audit dependencies
        run: npm audit --audit-level=high   # Fail on high/critical CVEs only

      - name: Scan for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}

  # ── Deploy Staging ──────────────────────────────────
  deploy-staging:
    name: Deploy to Staging
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: staging

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to staging
        run: |
          # Your deploy command here
          # e.g. vercel deploy --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

      - name: Run staging smoke tests
        run: npm run test:smoke
        env:
          BASE_URL: ${{ vars.STAGING_URL }}

  # ── Deploy Production ────────────────────────────────
  deploy-production:
    name: Deploy to Production
    needs: [deploy-staging]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production       # Requires manual approval if configured

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production
        run: |
          # Your production deploy command
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

      - name: Post-deploy health check
        run: |
          curl --fail --retry 3 --retry-delay 10 \
            ${{ vars.PRODUCTION_URL }}/api/health
```

---

## Environments

A disciplined environment strategy prevents production surprises.

```
Local         → Developer's machine. Fast iteration.
Preview       → Per-pull-request deploy. Review before merging.
Staging       → Mirrors production. Final validation gate.
Production    → Live. Real users. Real data.
```

Each environment should have:
- Its own set of secrets and environment variables
- Its own database (staging must never touch production data)
- Its own external service credentials (use Stripe test mode in staging)

### GitHub Environments

GitHub Actions Environments let you protect production deployments with required reviewers and deployment rules.

```
Settings → Environments → production
   Required reviewers: [list approvers]
   Wait timer: 0 minutes
   Deployment branches: main only
   Secrets scoped to this environment only
```

With this configured, every production deployment requires approval from a team member. The pipeline cannot skip this step.

---

## Secrets Management in CI

Never hardcode secrets. Never commit them. Use your CI platform's secret management.

```
GitHub Actions → Settings → Secrets and variables → Actions

Repository secrets (available to all workflows):
  VERCEL_TOKEN
  SENTRY_AUTH_TOKEN
  SLACK_WEBHOOK_URL

Environment secrets (scoped to staging or production):
  DATABASE_URL
  STRIPE_SECRET_KEY
  OPENAI_API_KEY
```

Access in workflow:
```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
```

Secrets are masked in logs automatically. They never appear in plain text in workflow output.

---

## Database Migrations in CI/CD

Migrations are the most dangerous part of any deployment. A bad migration can corrupt data or take your database offline.

### Safe Migration Strategy

```
Rule 1: Never run destructive migrations automatically
         Drop column, drop table, rename column → manual review required

Rule 2: Migrations run before new code deploys
         New code may depend on new schema. Old code must be compatible
         with the new schema too (expand/contract pattern).

Rule 3: Every migration must be reversible
         Write a down migration for everything.

Rule 4: Test migrations on a copy of production data in staging
         A migration that works on 100 rows may fail on 10 million.
```

### Expand/Contract Pattern

```
Phase 1 — Expand (safe to deploy):
  Add new column with nullable or default value
  Old code ignores it. New code can write to it.

Phase 2 — Migrate (background job):
  Backfill data into the new column
  Verify completeness before continuing

Phase 3 — Contract (deploy after verification):
  Make column NOT NULL if needed
  Remove old column in a separate, later migration
```

Never combine schema changes and data migrations in a single deploy.

---

## Pull Request Previews

For frontend-heavy SaaS, preview deployments on every PR are invaluable.

```yaml
# Vercel handles this automatically when connected to GitHub
# For manual setup:

- name: Deploy PR preview
  if: github.event_name == 'pull_request'
  run: vercel deploy --token=${{ secrets.VERCEL_TOKEN }}
  id: deploy

- name: Comment preview URL on PR
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: `Preview deployed: ${{ steps.deploy.outputs.url }}`
      })
```

Reviewers can click a link in the PR and see the exact change running live. This catches UI regressions that code review misses.

---

## Health Checks

Every deployment should end with a verification that the system is actually running.

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    checks: {
      database: "unknown",
      redis: "unknown"
    }
  }

  try {
    await db.$queryRaw`SELECT 1`
    checks.checks.database = "ok"
  } catch {
    checks.checks.database = "error"
    checks.status = "degraded"
  }

  try {
    await redis.ping()
    checks.checks.redis = "ok"
  } catch {
    checks.checks.redis = "error"
    checks.status = "degraded"
  }

  const statusCode = checks.status === "ok" ? 200 : 503
  return Response.json(checks, { status: statusCode })
}
```

Your pipeline's post-deploy step hits `/api/health` and fails the deployment if the response is not `200`. This catches configuration errors before they affect users.

---

## Rollback Strategy

Deployments fail. Have a documented rollback path before you need it.

### Instant Rollback (Vercel / Netlify / Railway)

Most modern platforms keep previous deployment artifacts and can instantly promote them.

```
Vercel Dashboard → Deployments → [Previous deploy] → Promote to Production
Time to rollback: ~30 seconds
```

### Git-Based Rollback

```bash
# Revert the last commit and push
git revert HEAD --no-edit
git push origin main

# Or reset to a specific known-good commit
git reset --hard <commit-sha>
git push --force-with-lease origin main
```

> Force push to main requires temporarily disabling branch protection. Have this process documented before you're in an incident.

### What Rollback Cannot Fix

A rollback reverts code. It does not revert database migrations. This is why destructive migrations are irreversible — you can't "un-drop" a column by reverting a deploy.

Always run migrations on the expand/contract pattern. A code rollback should never require a schema rollback.

---

## Pipeline Performance

Slow pipelines get ignored or bypassed. Target under 5 minutes for CI, under 10 minutes for full pipeline.

```
Speed improvements:
   Cache node_modules between runs (actions/cache)
   Run lint and tests in parallel jobs
   Only run full test suite on main, smoke tests on PRs
   Skip unchanged paths (paths-ignore in workflow triggers)
   Use faster runners if budget allows

Signs your pipeline is too slow:
  → Developers push and immediately switch tasks
  → PRs sit unmerged waiting for CI
  → Pipeline is regularly manually cancelled and re-run
```

---

## AI Prompt — Pipeline Design

<copy-prompt>
You are a Staff Engineer helping design a CI/CD pipeline for a production SaaS application.

My setup:
- Stack: [YOUR STACK]
- Hosting: [WHERE YOU DEPLOY — Vercel, Railway, AWS, etc.]
- Version control: [GitHub / GitLab]
- Database: [DATABASE + MIGRATION TOOL]
- Team size: [SOLO / 2-5 / LARGER]
- Current deploy process: [HOW YOU DEPLOY TODAY]
- Test coverage: [WHAT TESTS EXIST]

Design a complete CI/CD pipeline including:
1. The full workflow file for my stack and hosting provider
2. Environment strategy (local / staging / production)
3. How to handle database migrations safely in the pipeline
4. Secret management approach
5. Rollback procedure for failed deploys
6. How to keep the pipeline fast (under 5 minutes for CI)
7. What to add as test coverage grows

Include the actual workflow YAML I can use immediately.
</copy-prompt>

---

## CI/CD Checklist

- [ ] All code changes go through the pipeline — no direct production deploys
- [ ] Pipeline runs on every push to main and every pull request
- [ ] Type checking runs in CI
- [ ] Linting runs in CI
- [ ] Test suite runs in CI with a real database
- [ ] Dependency security audit runs in CI
- [ ] Secret scanning runs in CI (no committed credentials)
- [ ] Staging environment exists and mirrors production configuration
- [ ] Production deploy requires staging to pass first
- [ ] GitHub Environments configured with protection rules for production
- [ ] All secrets stored in CI secret management — not in code
- [ ] Database migrations run before new code deploys
- [ ] No destructive migrations run automatically without review
- [ ] Post-deploy health check runs after every production deployment
- [ ] Health check endpoint returns database and Redis status
- [ ] Rollback procedure documented and tested
- [ ] PR preview deployments configured (if applicable)
- [ ] Pipeline completes in under 10 minutes
- [ ] Failed pipeline blocks merge / deployment automatically
- [ ] Team knows how to read pipeline output and diagnose failures

---

## Common Mistakes

> **Mistake: No staging environment**
> Deploying straight from CI to production means production is your test environment. One bad migration or misconfiguration hits real users immediately.

> **Mistake: Running migrations automatically in the pipeline without safeguards**
> A migration that drops a column runs on production before anyone reviews it. Always gate destructive migrations behind manual approval.

> **Mistake: Committing secrets to test that the pipeline works**
> Secrets committed to a repo — even briefly — should be considered compromised. Rotate them immediately and store them properly going forward.

> **Mistake: A pipeline so slow nobody waits for it**
> If CI takes 20 minutes, engineers push and switch tasks. When it fails, context has been lost. Keep it fast or people will work around it.

> **Mistake: No health check after deploy**
> The deploy command exits 0, the pipeline reports success, but the application crashes on startup due to a missing environment variable. A health check catches this within seconds.

> **Mistake: No documented rollback process**
> During an incident is not the time to figure out how to roll back. Have the steps written down, tested, and accessible to anyone on the team.

---

## Next

With CI/CD automating your path to production, the next topic is **Infrastructure** — the servers, networks, and cloud services that your application actually runs on.
