---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# CI/CD (Continuous Integration & Deployment)

## Automating Confidence

In a personal project, deploying means running `npm run build` and hoping the server doesn't crash. In a production marketplace, deploying a broken checkout flow on a Friday afternoon can cost thousands of dollars in lost GMV before you even realize it is broken.

Production requires a strict, automated pipeline. **No code reaches production unless a machine verifies it.**

---

## The CI Pipeline (The Quality Gate)

Continuous Integration (CI) is the pipeline that runs on every Pull Request. For a marketplace, it must prevent three specific disasters: Type errors, Migration locks, and Business Logic failures.

**The Production CI Workflow (GitHub Actions):**
1. **Static Analysis:** Runs ESLint, Prettier, and `tsc --noEmit`. Fails if there are TypeScript errors.
2. **Secret Scanning:** Scans the diff using tools like `trufflehog` to ensure no one committed a Stripe Secret Key.
3. **Database Migration Validation:** Spins up a temporary Postgres container (Shadow DB) and runs `prisma migrate deploy`. If a migration attempts to `DROP` a column or creates a table lock without `CONCURRENTLY`, the CI fails.
4. **Unit & Integration Tests:** Runs Vitest/Jest for fast logic tests, and Supertest against the temporary database to verify API routes.
5. **E2E Tests:** Runs Playwright scripts verifying the "Golden Path" (Search -> Add to Cart -> Checkout).

---

## Zero-Downtime Deployments (Blue/Green)

When CI passes and you merge to `main`, the deployment (CD) begins. 
If your deployment script involves turning off the server, copying files, and restarting Node.js, your buyers will see a `502 Bad Gateway` error for 30 seconds.

**The Production Standard:**
You must implement **Blue/Green** or **Rolling** deployments.
* **Vercel / Next.js:** Handled automatically. The new build is spun up on isolated Edge nodes. Once it passes health checks, traffic is instantly routed to the new build with zero dropped requests.
* **AWS / Docker:** ECS or Kubernetes spins up the new containers (Green). The Load Balancer slowly bleeds traffic to them. Only when they report `200 OK` on `/health` does it terminate the old containers (Blue).

---

## Automated Rollbacks

Even with perfect CI, bugs make it to production (e.g., misconfigured environment variables).

**The Production Defense:**
Your CD pipeline must include a **Post-Deploy Smoke Test**.
After the deployment finishes, the pipeline runs a lightweight Playwright test against the live production URL. If the checkout page returns a `500` error, the pipeline automatically triggers a **Rollback**, instantly reverting the Load Balancer/CDN traffic back to the previous stable release.

---

## Do's and Don'ts of Production CI/CD

- **DO enforce Branch Protection.** Go to your GitHub repository settings and mandate that "Status checks must pass before merging." Never allow a developer to bypass CI by force-pushing to `main`.
- **DON'T store secrets in GitHub plaintext.** Use GitHub Secrets. Better yet, use OIDC (OpenID Connect) to allow GitHub Actions to securely assume an IAM role in AWS without storing long-lived access keys at all.
- **DO fail fast.** Order your CI jobs by speed. Linting takes 5 seconds, E2E tests take 5 minutes. If linting fails, cancel the E2E tests immediately to save CI compute minutes.
- **DON'T run expensive E2E tests on every tiny commit.** Configure GitHub Actions to run Playwright only when specific paths change (e.g., `src/app/**`) or when a PR is marked "Ready for Review."

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Full CI Pipeline Configuration:**

````prompt
Act as a DevOps Engineer. Write a GitHub Actions YAML file for a Next.js and Prisma marketplace. It must run on PRs to `main`. The pipeline should use `actions/cache` for `node_modules`, spin up a Postgres service container, run Prisma migrations against it, and execute `npm run lint`, `npm run test` (Vitest), and `npx playwright test`. Ensure the jobs are parallelized where appropriate, but fail fast to save compute time.
````

> [!TIP]
> **Prompt 2 — Migration Safety Check:**

````prompt
Write a bash script for a CI pipeline that analyzes a newly generated SQL migration file. The script must use `grep` to scan for dangerous keywords like `DROP TABLE`, `DROP COLUMN`, or `ALTER TABLE ... ADD COLUMN` without a `DEFAULT` constraint. If any of these are found, the script should exit with code 1 and echo a warning that this migration will cause production downtime or data loss.
````

---

## Validating What AI Generates

- **Check for missing database services:** If AI generates a CI script that runs `prisma migrate deploy` but forgets to include a `services` block to spin up a Dockerized Postgres database for the runner, reject it. The CI will fail instantly.
- **Verify Caching Logic:** Ensure the AI uses `actions/setup-node` with the `cache: 'npm'` parameter. Running `npm install` from scratch on every CI run will add 2-3 minutes to your pipeline and frustrate your team.

---

## Implementation Checklist

- [ ] Configured GitHub Actions (or GitLab CI) to run on every Pull Request targeting `main`.
- [ ] Enforced strict Branch Protection rules, requiring all CI checks to pass before merging.
- [ ] Included Database Migration validation against a shadow database in the CI pipeline.
- [ ] Automated end-to-end (Playwright) testing of the Golden Path as a mandatory pre-merge check.
- [ ] Ensured the CD platform (Vercel/AWS) is configured for Zero-Downtime deployments and automated rollbacks on failure.

---

## What's Next

Next: **Fraud Prevention** — The infrastructure is now automated and secure. Next, we must secure the business logic itself. We will architect systems to detect stolen credit cards, prevent promo code abuse, and automatically block high-risk transactions before they hit the payment gateway.
