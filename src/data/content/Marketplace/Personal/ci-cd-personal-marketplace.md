---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# CI/CD

Right now, shipping a change probably means: push code, manually check it didn't break, deploy, hope. That works until it doesn't — usually right when you're tired, rushing before a demo, or shipping a fix late at night. CI/CD replaces "hope" with a repeatable, automated check that runs the same way every single time.

For a personal project, this isn't about building enterprise deployment pipelines. It's about removing the two most common ways solo developers break their own production app: forgetting to run tests, and deploying broken code because a manual step got skipped under pressure.

---

## CI vs. CD: Two Different Jobs

> **🔑 Core distinction:** Continuous Integration (CI) checks that your code is correct *before* it merges — tests, linting, type checks. Continuous Deployment (CD) takes correct code and actually ships it. You can have one without the other, but a marketplace benefits from both.

| | Runs when | Catches |
|---|---|---|
| **CI** | Every push / pull request | Broken tests, type errors, lint failures — before code reaches main |
| **CD** | After CI passes on main | Nothing new — it's the *shipping* step, not a check |

---

## Decision: How Much Automation

> **🧩 Decision Card — CI/CD Scope**
>
> **Option A: CI only — tests run automatically, you deploy manually**
> Catches broken code before merge, keeps deploy as a deliberate action you control.
>
> **Option B: Full CI/CD — tests run, then automatic deploy on merge to main**
> Fastest iteration loop, removes a manual step entirely — but means a passing test suite is the *only* gate before production.
>
> **For Personal Mode: start with Option A**, especially while your test coverage (next module) is still thin. Move to Option B once you trust your test suite to actually catch the things that matter — automatic deployment is only as safe as the tests gating it.

---

## A Minimal, Real CI Pipeline

This is enough for a personal marketplace project — not a starting point you need to heavily expand later, just a correct baseline.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/postgres

      - run: npm run lint
      - run: npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/postgres
```

> **✅ Validation Checklist**
> - [ ] Does CI run on every pull request, not just pushes to `main`? (Catching issues before merge is the entire point)
> - [ ] Does it spin up a real test database, not mock the database layer entirely? (Marketplace bugs — constraint violations, missing indexes — often only show up against a real database)
> - [ ] Does a failing test or lint check actually block the merge, via branch protection rules — or does CI just run and get ignored?

> **⚠️ Warning:** Setting up CI without enabling branch protection ("require status checks to pass before merging" in GitHub settings) means CI runs, fails, and you merge anyway under deadline pressure. The automation only protects you if it can actually block you.

---

## What Belongs in CI for a Marketplace Specifically

Beyond generic tests and linting, a few marketplace-specific checks are worth automating because they catch the exact mistakes covered earlier in this phase:

> **✅ Validation Checklist**
> - [ ] **Migration check** — does `prisma migrate deploy` (or equivalent) run cleanly against a fresh database? Catches broken migrations before they hit production
> - [ ] **Type checking** — if using TypeScript, does `tsc --noEmit` run as a separate step? Catches type errors that tests might not exercise
> - [ ] **Secret scanning** — is there a check (many CI providers offer this built-in) preventing an accidentally committed `.env` file or API key from ever reaching `main`?

---

## Deployment: Keep It Boring

Once CI passes, deployment itself should be the least interesting part of your workflow. Most modern hosting platforms (Render, Railway, Vercel, Fly.io) handle CD automatically once connected to your repo — you often don't need to write deployment automation yourself.

> **🔑 Rule of thumb:** if your hosting platform already deploys on push to `main`, you have CD. Your job is making sure CI gates that push, not building a separate deployment pipeline from scratch.

---

## Environment Variables and Secrets

CI needs access to things like `DATABASE_URL` and API keys, but never the same way your local `.env` file does.

> **✅ Validation Checklist**
> - [ ] Are secrets stored in your CI provider's encrypted secrets store (e.g. GitHub Actions secrets), never committed to the repo or hardcoded in the workflow file?
> - [ ] Does CI use a separate test database/API keys, not production credentials? (A bug in a test run should never be able to touch real production data)
> - [ ] Is `.env` actually in `.gitignore`? (Worth re-confirming — this is exactly the kind of thing that gets accidentally reverted during a merge)

---

## AI Prompt: Generate a CI Pipeline

> **📋 Copy Prompt**
>
> ```
> Generate a GitHub Actions CI workflow for my marketplace project.
> Stack: [YOUR STACK — e.g. Node.js, Express, Prisma, PostgreSQL, TypeScript].
>
> Requirements:
> 1. Run on every pull request and push to main
> 2. Spin up a real Postgres service container, not a mocked database
> 3. Run migrations against the test database before tests execute
> 4. Run: install deps, lint, type check (if TypeScript), test suite — in that order,
>    failing fast on the first failing step
> 5. Use GitHub Actions secrets for DATABASE_URL and any API keys, never hardcoded values
> 6. Cache node_modules/npm cache to keep the pipeline fast
>
> package.json scripts:
> [PASTE YOUR package.json scripts SECTION]
> ```
>
> **Why this prompt works:** specifying "fail fast on the first failing step, in that order" gives you faster feedback (a lint error shows up in seconds, not after a 2-minute test run) — a detail AI won't prioritize unless asked, even though it meaningfully affects how usable the pipeline feels day-to-day.

---

## Validating AI Output

> **🚩 Common Hallucination:** AI-generated CI workflows sometimes mock or skip the database entirely to "simplify" the pipeline, which means migration errors and database-constraint bugs (like the unique constraints from your Messaging and Reviews modules) never get caught by CI at all. Confirm the workflow spins up a real database service and actually runs migrations against it — a green CI badge is meaningless if it isn't testing against real database behavior.

---

## Token Efficiency Tip

CI workflow files are short and largely boilerplate once correct for your stack — you won't need to regenerate this often. When you do add a new check (e.g. a new test category), ask AI to add just that step to your existing workflow file rather than regenerating the whole pipeline from scratch.

---

## What You've Decided

By the end of this module you should have:

- A CI pipeline that runs on every pull request against a real test database
- Branch protection actually enforcing that CI must pass before merge
- Marketplace-specific checks: migration validation, type checking, secret scanning
- Secrets stored properly in your CI provider, never committed
- A deployment step that's boring by design — CI gates it, your hosting platform handles it

**Next:** Fraud Prevention — protecting transactions and listings from bad actors at the business-logic level.
