---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# CI/CD

Every module before this one produced something valuable — tests, security checks, performance fixes — that only protects you if it actually runs before code reaches production. Without CI/CD, "run the tests" is a step you have to remember to do manually, which means eventually you won't, right before the change that needed it most.

CI/CD makes the checks non-optional: every push runs them automatically, and only code that passes gets deployed.

---

## What CI/CD Actually Buys You Here

| Without it | With it |
|---|---|
| Tests run when you remember to run them | Tests run on every push, no exceptions |
| A broken deploy is caught by users | A broken deploy is caught before it ships |
| Manual deploy steps, easy to fumble | Consistent, repeatable deploy process |
| No record of what changed between deploys | Every deploy tied to a specific commit/PR |

---

## Pipeline Structure

```
Push/PR → Lint & Type Check → Tests → Build → Deploy (on merge to main)
```

Each stage should fail fast — if linting fails, don't waste time running the full test suite.

---

## Implementation: GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        ports: ["6379:6379"]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test_db

      - name: Test
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
```

> **Tip — spin up real dependencies in CI, not mocks**
> The `postgres` and `redis` services above give CI a real database and Redis instance, matching the integration test setup from the Testing module. Testing against real services in CI catches the same class of bugs mocks would hide — the whole point of integration tests is defeated if CI mocks what your tests were designed to exercise for real.

---

## Deployment: Keep It Simple

> **Decision card — Recommended for Personal mode**
> Use a platform with git-based deploys (Railway, Render, Fly.io, or Vercel for edge-friendly APIs) rather than hand-rolling deployment scripts or managing your own servers. These platforms deploy automatically on push to `main`, handle TLS, and give you rollback with a UI click. Building your own deploy pipeline is solving an infrastructure problem you don't need to solve at this stage.

```yaml
# Most platforms: connect the GitHub repo, no separate deploy job needed.
# If you need an explicit deploy step (e.g., deploying via CLI):

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: npx railway up --service api
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

> **Warning — `needs: test` is what makes this safe**
> Without the `needs: test` dependency, the deploy job would run regardless of whether tests passed. This one line is what turns "CI and CD happen to be in the same file" into an actual gate — broken code physically cannot reach production through this pipeline.

---

## Running Migrations Safely

Migrations deploying automatically alongside code is convenient and risky — a migration that locks a large table can cause a production outage timed exactly with your deploy.

```yaml
      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.PRODUCTION_DATABASE_URL }}
```

> **Decision card — migration safety at personal scale**
> At personal-project data volumes, automatic migrations on deploy are fine. Once a table has enough rows that an `ALTER TABLE` could take more than a few seconds, review the migration manually before merging — a blocking schema change on a large table can hold locks long enough to cause visible downtime, and that risk doesn't announce itself in a small test database.

---

## Secrets in CI

Never put real secrets in the workflow file itself — use your CI provider's encrypted secrets store.

```yaml
env:
  DATABASE_URL: ${{ secrets.PRODUCTION_DATABASE_URL }}
  SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
  WEBHOOK_SIGNING_SECRET: ${{ secrets.WEBHOOK_SIGNING_SECRET }}
```

> **Warning — test and production secrets should be different values**
> Using the same database or Redis instance for both CI tests and production is how a bad test run wipes real data. Use genuinely separate credentials — CI's `DATABASE_URL` should point to the ephemeral service container above, never to production, even by accident through a misconfigured default.

---

## Branch Protection

Configure your repository so `main` can't be pushed to directly and requires the CI check to pass — this is what actually enforces everything above rather than making it merely available.

```
GitHub → Settings → Branches → Branch protection rule for `main`:
 Require status checks to pass before merging
    test
 Require branches to be up to date before merging
```

Even working solo, this prevents the specific failure mode of pushing directly to `main` in a hurry and skipping CI entirely — the rule applies to you too, which is the point.

---

## Rollback Strategy

Know how you'll revert *before* you need to, not while a production incident is happening.

```bash
# Fastest rollback: your platform's dashboard usually has a
# one-click "redeploy previous version" button — know where it is
# before you need it under pressure.

# Git-level rollback if needed:
git revert <bad-commit-sha>
git push origin main  # triggers a new CI run and deploy of the revert
```

> **Tip — a database migration in the bad deploy complicates rollback**
> Rolling back code is easy. Rolling back a database migration that ran alongside it is not — some migrations aren't safely reversible (a dropped column can't un-drop with its data intact). This is another reason to review risky migrations manually rather than letting every schema change auto-deploy without a second look.

---

## AI Prompt: Generate the CI Workflow

```
Generate a GitHub Actions workflow for a [framework] API with
[Postgres via Prisma / your ORM] and Redis.

Requirements:
- Runs on every PR and push to main
- Spins up real Postgres and Redis service containers (not mocks)
- Steps: install, typecheck, lint, run migrations against the test
  database, run tests
- A separate deploy job that only runs on push to main, only if the
  test job succeeds (explicit needs: dependency)
- All secrets referenced via ${{ secrets.NAME }}, none hardcoded
- Deploy step for [Railway/Render/Fly.io — specify your platform]

[paste package.json scripts section]
```

---

## Validating AI Output

- **Confirm the deploy job has `needs: test`** (or equivalent) — this is the single line that makes the pipeline a real gate rather than two unrelated jobs that happen to share a file.
- **Confirm test services (Postgres/Redis) are genuinely spun up in CI**, not skipped in favor of mocking — check the generated workflow includes `services:` blocks matching your actual test setup.
- **Confirm no secret values are hardcoded**, even placeholder-looking ones that might get forgotten and left in.
- **Verify the workflow file itself doesn't leak the wrong environment** — e.g., confirm CI's `DATABASE_URL` genuinely points at the ephemeral service, not accidentally at a shared/production value pulled from secrets.

---

## Common Mistakes

- Deploy job missing the dependency on the test job passing, silently deploying broken code.
- Mocking database/Redis in CI when integration tests need the real thing.
- Same secrets used for both CI test runs and production, risking accidental data loss.
- No branch protection, so CI exists but nothing actually requires it to pass.
- Large migrations auto-deploying without review, causing lock-related downtime.

---

## Validation Checklist

- [ ] CI runs on every PR and push to main, not just manually triggered
- [ ] Tests run against real Postgres/Redis service containers, matching local integration test setup
- [ ] Deploy job explicitly depends on the test job passing
- [ ] Secrets are stored in the CI provider's encrypted store, never in the workflow file
- [ ] CI and production use separate database/Redis credentials
- [ ] Branch protection requires the CI check before merging to main
- [ ] You know exactly how you'd roll back a bad deploy, including one with a migration, before you need to

---

## Phase 4 Complete

Your API is now secured, performant, cached appropriately, observable, load-tested, and automatically deployed with tests gating every release. The next phase — **Developer Experience** — turns all of this into a documentation and integration experience that makes developers want to build on your API.
