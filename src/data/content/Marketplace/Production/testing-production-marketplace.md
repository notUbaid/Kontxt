---
title: Testing
slug: testing
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Testing (Quality Assurance)

## Why Manual Testing Fails at Scale

In a personal project, you can click through your app before deploying to make sure the "Buy" button works. In a production marketplace, a single code change to your User schema can silently break the Stripe webhook listener, the search index synchronizer, and the dispute mediation dashboard all at once.

You must build an automated testing pipeline that mathematically proves your financial logic, authorization rules, and state machines are intact on every Git commit.

---

## The Production Testing Pyramid

You cannot write End-to-End (E2E) tests for every possible scenario; they are too slow and brittle. You must layer your tests.

| Layer | Tooling | What to Test |
|---|---|---|
| **Unit Tests** | Vitest, Jest | Pure business logic: Platform fee math, Zod schema validation, Regex leakage filters. Runs in milliseconds. |
| **Integration Tests** | Supertest, Testcontainers | API endpoints interacting with a real (ephemeral) Postgres database. Tests RLS policies and Database transactions. |
| **End-to-End (E2E)** | Playwright, Cypress | The "Golden Path." A headless browser signs up, lists an item, searches for it, and buys it using a Stripe Test Card. |
| **Load Testing** | k6, Artillery | Firing 1,000 concurrent requests at your search endpoint to ensure your database and Algolia sync don't crash under stress. |

---

## The "Golden Path" E2E Test

If you only write one test for your entire marketplace, it must be this. 

You must write a Playwright script that executes the core marketplace loop from end-to-end. If this test fails, your CI/CD pipeline must block the deployment immediately.

**The Script:**
1. Browser 1 (Seller): Signs up, completes Express Onboarding (mocked), and publishes a Listing.
2. API (Admin): Approves the Listing.
3. Browser 2 (Buyer): Searches for the listing, clicks it, and enters a Stripe Test Card (e.g., `4242 4242...`).
4. API (Stripe Webhook): Mocks the `payment_intent.succeeded` event.
5. Browser 1 (Seller): Verifies the Dashboard shows the Escrow funds as "Held".

> [!CAUTION]
> Never test against your production database or live Stripe keys. Your E2E tests must run against an ephemeral database spun up in Docker (Testcontainers) and use Stripe's strict test-mode keys.

---

## Testing Financial Logic (Mocking vs. Real)

Do not mock your database when testing financial logic. 
If you write a Unit Test that says `mockDb.transactions.create.mockResolvedValue(true)`, you are testing your mock, not your database. You will miss database-level constraints (like `price >= 0` or Foreign Key violations).

Use **Integration Tests** with a real, isolated Postgres instance (spun up via Docker in your CI pipeline) to test your Checkout and Webhook services.

---

## Do's and Don'ts of Production Testing

- **DO test the failure paths.** Do not just test that a valid card works. Write E2E tests that input a declined card, or an expired card, and verify the UI shows the correct graceful error message without crashing.
- **DON'T write E2E tests for CSS.** Playwright tests should assert that the "Submit Order" button exists and is clickable, not that its background color is `#ff0000`. Visual regression testing is a separate, lower-priority concern.
- **DO automate tests in CI/CD.** A test suite that must be run manually on a developer's laptop is useless. Configure GitHub Actions to run your Vitest and Playwright suites automatically on every Pull Request.
- **DON'T test third-party APIs directly.** Do not actually hit the real SendGrid API in your tests to see if an email sends. Mock the `sendEmail` utility, and assert that it was called with the correct parameters.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Playwright E2E Golden Path:**

````prompt
Act as a Senior QA Engineer. I am using Playwright. Write the End-to-End test script for the "Golden Path" of my marketplace. It should launch a browser context, log in as a buyer, navigate to `/listing/123`, click "Checkout", fill in the Stripe Elements test card (`4242...`), submit the form, and assert that the UI redirects to `/order/success` and displays a specific confirmation message.
````

> [!TIP]
> **Prompt 2 — Integration Testing with Supertest:**

````prompt
I am using Node.js and Jest/Supertest. Write an Integration Test for my `POST /api/webhooks/stripe` endpoint. The test must generate a mock Stripe `payment_intent.succeeded` payload, sign it using the `stripe.webhooks.generateTestHeaderString` utility, send it to the endpoint, and assert that the database's `Transaction` table is updated to `status: 'PAID'`.
````

---

## Validating What AI Generates

- **Check for brittle selectors:** If the AI writes a Playwright test targeting `page.click('div > span > .btn-red')`, request a rewrite using semantic, resilient selectors like `page.getByRole('button', { name: 'Checkout' })` or `data-testid`.
- **Verify mocking logic:** Ensure that third-party side-effects (Emails, Algolia syncs) are properly mocked in Unit and Integration tests so they do not exhaust external API quotas during CI runs.

---

## Implementation Checklist

- [ ] Implemented Unit Tests (Vitest/Jest) for critical business logic (fee math, authorization guards).
- [ ] Built Integration Tests hitting an ephemeral test database for API route validation.
- [ ] Scripted the "Golden Path" End-to-End test using Playwright or Cypress.
- [ ] Configured GitHub Actions (or equivalent CI/CD) to run the test suite on every PR, blocking merges on failure.
- [ ] Verified that Stripe test-mode keys and mocks are strictly isolated from production environments.

---

## What's Next

Next: **Documentation** — Code is read far more often than it is written. We will establish the production standard for documenting API endpoints, database schemas, and developer onboarding procedures so your engineering team can scale without bottlenecks.
