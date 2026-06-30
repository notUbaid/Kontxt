---
title: CI/CD Implementation
slug: ci-cd
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# CI/CD Implementation

Continuous Integration and Continuous Deployment (CI/CD) is the safety net that prevents broken code from reaching your customers. 

In e-commerce, if a developer accidentally introduces a bug that breaks the checkout button, and that code is deployed directly to production, the business loses money immediately. A rigorous CI/CD pipeline ensures that every code change is automatically built, tested, and previewed before it ever touches live traffic.

---

## 1. The CI Pipeline (Automated Testing)

Continuous Integration (CI) runs automatically every time a developer pushes code to a Pull Request (PR). 

**The Implementation:**
Use a tool like **GitHub Actions** or **GitLab CI**.
When a PR is opened, the pipeline must execute the following gates. If any gate fails, the PR cannot be merged into `main`.
1. **Linting & Formatting:** Enforce ESLint and Prettier. (Prevents syntax errors).
2. **Type Checking:** Run `tsc --noEmit`. (Ensures strict TypeScript compliance).
3. **Unit & Integration Tests:** Run Vitest/Jest. (Verifies tax math, webhook idempotency).
4. **End-to-End (E2E) Tests:** Run Playwright. (A headless browser navigates the site, adds to cart, and checks out using a Stripe test card. This is the ultimate critical path test).

---

## 2. Preview Environments (The QA Phase)

Merchandising and QA teams must be able to test features visually before they go live.

**The Implementation:**
If you use platforms like **Vercel** or **Netlify**, this is built-in.
- When a PR is opened, the platform automatically builds the branch and generates a unique URL (e.g., `pr-123.yourstore.com`).
- The developer shares this URL with the QA team.
- The QA team can verify the new banner design or the new promotion logic on a live URL without affecting the production database (ensure preview environments point to a Staging Database, never Production).

---

## 3. Blue/Green Deployments (Zero-Downtime)

When you merge code to `main`, the deployment to production must be instantaneous and invisible to users. 

**The Anti-Pattern:** Taking down the server, uploading new files, and restarting Node.js. If a user is mid-checkout during those 30 seconds, their payment will fail.

**The Production Pattern (Blue/Green):**
1. The server infrastructure spins up the new version of the code (the "Green" environment) behind the scenes.
2. The current version (the "Blue" environment) continues serving live traffic.
3. The load balancer runs a quick health check on the Green environment.
4. If healthy, the load balancer instantly switches traffic to the Green environment. The transition takes 0 milliseconds.
5. If the new code contains a critical bug, you can instantly rollback by switching the load balancer back to the Blue environment.

---

## 4. Database Migrations in CI/CD

Deploying code is easy. Deploying database changes without downtime is incredibly hard.

If your PR renames a column from `userId` to `customer_id`, and you deploy the code before the database migration finishes running, the live app will crash.

**The Safe Migration Pattern (Expand & Contract):**
Never rename or drop columns in a single deployment.
- *Deployment 1 (Expand):* Add the new `customer_id` column. Update the code to write to *both* columns, but continue reading from `userId`.
- *Background Task:* Run a script to backfill old data from `userId` to `customer_id`.
- *Deployment 2 (Transition):* Update the code to read from `customer_id`.
- *Deployment 3 (Contract):* Drop the old `userId` column.

---

## AI Prompt — Architect Your CI/CD Pipeline

```prompt
I am building the CI/CD pipeline for a production e-commerce store.

Tech Stack:
- Repository: [e.g., GitHub]
- Hosting: [e.g., Vercel / AWS ECS]
- Database: [e.g., Postgres + Prisma]
- Testing: [e.g., Playwright + Jest]

Act as a Principal DevOps Engineer:
1. Write the exact `.github/workflows/ci.yml` file required to run ESLint, TypeScript compilation, Jest unit tests, and Playwright E2E tests on every Pull Request.
2. Explain the strategy for managing environment variables (Secrets) securely across Preview (Staging) and Production deployments.
3. Provide a strict policy for deploying database schema changes (Prisma migrations) in a Zero-Downtime CI/CD environment using the "Expand and Contract" pattern.
4. Outline the Rollback procedure if a critical bug is discovered 5 minutes after a deployment reaches the `main` branch.
```

---

## CI/CD Checklist

- [ ] Automated CI pipeline (GitHub Actions) configured to block PR merges on test failure
- [ ] E2E tests (Playwright) executed on every PR to verify the critical checkout path
- [ ] Preview/Staging environments automatically generated for PRs to allow visual QA
- [ ] Zero-Downtime deployments (Blue/Green or Edge) configured for the `main` branch
- [ ] Strict "Expand and Contract" pattern adopted for all database migrations to prevent lock-ups
- [ ] Instant rollback mechanism tested and documented for emergency recoveries
