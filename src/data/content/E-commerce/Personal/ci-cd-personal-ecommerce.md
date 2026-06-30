---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# CI/CD

Right now, shipping a change probably means editing code and pushing to a branch your host auto-deploys. That's fine until the day you push something broken straight to your live store — wrong env variable, a typo in checkout logic, a migration that doesn't match production data. CI/CD is what catches that *before* a customer does.

---

## Where This Fits

You're wrapping a process around everything you've built — not adding a feature, but adding a safety check between "I wrote this" and "customers are using this."

---

## Why This Matters for a Store Specifically

A broken deploy on a personal blog means a typo is visible for an hour. A broken deploy on a store can mean:

- Checkout silently failing — no errors, just lost sales you may not notice for hours
- A database migration that doesn't match what's actually in production, corrupting or losing order data
- An exposed environment variable (API key, payment secret) pushed by accident in a config change

> **⚠️ Warning:** "I tested it locally and it worked" is not the same guarantee for a store as it is for most side projects, because the cost of a silent checkout failure is direct, measurable lost revenue — even at personal scale.

---

## What You're Building Today

- An automated check that runs on every push: does the app actually build?
- A basic automated test for your most critical path — checkout completing successfully
- A required step before deploy: tests pass, build succeeds
- A staging environment (or at minimum, preview deployments) so you see changes before they hit real customers
- Environment variables managed through your host's secrets system, never committed to git

You're **not** building a full test suite with 100% coverage, blue-green deployments, or canary releases. That's real infrastructure for real scale. For a personal store, "it builds, the critical path is tested, and I can preview before going live" is the right bar.

---

## Choosing Your Approach

| Tool | What It Does | Cost |
|---|---|---|
| **GitHub Actions** | Runs build + tests on every push, blocks merge if failing | Free for personal repos |
| Vercel/Netlify Preview Deployments | Auto-creates a live preview URL per pull request | Included on most hosting plans |
| Host's built-in CI (e.g., Vercel build checks) | Confirms the production build succeeds before going live | Included |

For a personal store, **GitHub Actions + your host's preview deployments** covers everything you need without adding a new platform to manage.

---

## The Pipeline You're Building

```
Push code
   │
   ▼
GitHub Actions runs
   │
   ├─ Install dependencies
   ├─ Run build
   ├─ Run tests (especially checkout flow)
   │
   ▼
Pass? ──No──→ Block merge, fix before continuing
   │
  Yes
   ▼
Merge to main
   │
   ▼
Host auto-deploys to production
```

Preview deployments fit *before* the merge — every pull request gets its own live URL, so you can click through checkout on the actual deployed version before it ever reaches main.

---

## Implementation

**Copy Prompt:**

```
I'm setting up CI/CD for a personal e-commerce store built with
[your framework], hosted on [your host], using GitHub for version
control.

Set up a GitHub Actions workflow that, on every push and pull request:
1. Installs dependencies and runs the build — fails the workflow if
   the build doesn't succeed
2. Runs the test suite, especially any tests covering checkout
3. Blocks merging to main if either step fails

Also confirm whether [your host] already provides preview deployments
for pull requests, and if not, show me how to enable that — I want to
be able to click through a real checkout flow on a preview URL before
anything reaches production.
```

> **💡 Tip:** If you don't have a test for checkout yet, that's the one test worth writing before anything else in this module. Ask AI for a single end-to-end test that adds an item to cart, goes through checkout with test payment details, and confirms an order is created — that one test catches the failure mode that actually costs you money.

---

## Environment Variables: The Part Most Often Done Wrong

- [ ] Secrets (payment keys, database URLs) are set in your host's environment variable settings, never hardcoded or committed to git
- [ ] `.env` files are in `.gitignore` from day one
- [ ] Production and preview/staging use *different* payment provider keys — test keys for previews, live keys only for production
- [ ] If a secret was ever accidentally committed, it's been rotated (changed), not just deleted from the latest commit — git history still holds it otherwise

> **⚠️ Warning:** Using live payment keys in a preview/staging environment means test transactions during development can charge real cards. Always confirm preview deployments use test-mode payment keys.

---

## Common Mistakes

- Treating "the build succeeded" as proof the app works — a build can succeed while checkout is completely broken
- No test at all on the checkout path, so CI passes while the one flow that makes money is silently failing
- Committing a `.env` file once, "just to test," and forgetting it's now in git history permanently
- Using the same payment keys across preview and production, risking real charges from test runs
- Skipping preview deployments and testing changes directly against production "just this once"

---

## Validation Checklist

- [ ] Push a deliberately broken change (e.g., a syntax error) and confirm the CI workflow catches it and blocks merge
- [ ] Confirm a pull request generates a working preview URL you can click through
- [ ] Run a full test checkout on a preview deployment using test payment details — confirm it completes and creates an order
- [ ] Confirm `.env` is git-ignored and no secrets appear in your repository's history
- [ ] Confirm production and preview environments use different payment provider keys

---

## AI Review Prompt

```
Review my CI/CD setup for a personal e-commerce store. Check:

1. Does the pipeline actually test the checkout flow, or only confirm
   the app builds?
2. Are production and preview/staging environments using separate
   payment provider keys?
3. Is there any chance secrets have been committed to git history,
   even if removed from the latest commit?
4. Would a broken checkout flow actually be caught before reaching
   production, based on what's currently automated?

Flag anything that would let a broken checkout ship without being
caught first.
```

---

## What Comes Next

Shipping changes is now a checked, repeatable process instead of a leap of faith. Next: **Payment Security** — hardening the part of your store that handles money directly, beyond the rate limits and tests already in place.
