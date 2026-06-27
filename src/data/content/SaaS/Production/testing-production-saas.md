---
title: Testing
slug: testing
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Testing

Testing is not about coverage percentages. It's about confidence — specifically, the confidence to ship changes without manually clicking through your entire app before every deploy.

A good test suite makes refactoring safe, catches regressions before users do, and documents how your system is supposed to behave. A bad test suite is expensive to maintain and gives false confidence.

This module teaches you which tests to write, which to skip, and how to build a suite that actually earns its keep.

---

## The Testing Pyramid

```
         /\
        /  \
       / E2E \        ← Few. Slow. High confidence on critical paths.
      /--------\
     / Integration\   ← Some. Test real boundaries (DB, APIs, queues).
    /--------------\
   /   Unit Tests   \ ← Many. Fast. Test pure logic in isolation.
  /------------------\
```

Most SaaS products get this wrong in two directions:

- **Too many unit tests on trivial code** — testing that a getter returns a value wastes time and breaks on refactors
- **Only E2E tests** — slow, brittle, hard to debug, and meaningless for edge cases

The goal is maximum confidence for minimum maintenance cost. That usually means: **a lot of integration tests, selective unit tests, and a handful of E2E tests on your most critical user flows.**

---

## What to Test (and What to Skip)

### Test These

| What | Why |
|---|---|
| Business logic with branching conditions | High value, high risk of regression |
| Authorization checks | Security — one missed check is a data breach |
| Data transformations | Easy to get subtly wrong, hard to spot visually |
| API endpoints (happy path + error cases) | Your contract with the frontend |
| Webhook handlers | External services won't tell you when your handler breaks |
| Payment flows | Revenue-critical, can't manually test every edge case |
| Background jobs | They fail silently without tests |

### Skip These

| What | Why |
|---|---|
| Trivial getters and setters | No logic to test |
| Framework internals | You're testing someone else's code |
| UI pixel accuracy | Brittle and rarely catches real bugs |
| Third-party API responses | Mock them; don't test Stripe's API |
| Code that changes every sprint | Tests become maintenance drag |

---

## Integration Tests: Your Highest ROI Tests

Integration tests hit your real database, test real SQL queries, and verify your actual business logic end-to-end — without a browser. They're fast enough to run in CI (typically 2–10 minutes for a full suite) and catch the class of bugs that unit tests miss entirely.

### Setting Up the Test Database

```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './tests/setup/global-setup.ts',
  globalTeardown: './tests/setup/global-teardown.ts',
  setupFilesAfterFramework: ['./tests/setup/setup-each.ts'],
};
```

```typescript
// tests/setup/global-setup.ts
import { execSync } from 'child_process';

export default async function globalSetup() {
  // Use a separate test database — never run tests against production or dev DB
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  execSync('npx prisma migrate deploy');
}
```

```typescript
// tests/setup/setup-each.ts
import { db } from '../../lib/db';

beforeEach(async () => {
  // Truncate all tables before each test — deterministic starting state
  await db.$executeRaw`TRUNCATE TABLE users, organizations, documents CASCADE`;
});

afterAll(async () => {
  await db.$disconnect();
});
```

**Always use a separate test database.** Never run tests against your development database — parallel test runs will corrupt each other's data.

### Writing Integration Tests

```typescript
// tests/api/documents.test.ts
import { createTestUser, createTestOrg } from '../factories';
import { makeRequest } from '../helpers/request';

describe('POST /api/documents', () => {
  it('creates a document for authenticated user', async () => {
    const { org, user, token } = await createTestOrg();

    const res = await makeRequest(token)
      .post('/api/documents')
      .send({ title: 'Q4 Strategy', body: 'Content here' });

    expect(res.status).toBe(201);
    expect(res.body.document.title).toBe('Q4 Strategy');
    expect(res.body.document.organizationId).toBe(org.id);
  });

  it('returns 401 for unauthenticated requests', async () => {
    const res = await makeRequest()
      .post('/api/documents')
      .send({ title: 'Test' });

    expect(res.status).toBe(401);
  });

  it('cannot create document in another organization', async () => {
    const { token } = await createTestOrg();
    const { org: otherOrg } = await createTestOrg();

    const res = await makeRequest(token)
      .post('/api/documents')
      .send({ title: 'Test', organizationId: otherOrg.id }); // trying to write to another org

    // Should either 403, or silently scope to the user's own org
    expect([403, 201]).toContain(res.status);
    if (res.status === 201) {
      expect(res.body.document.organizationId).not.toBe(otherOrg.id);
    }
  });
});
```

### Test Factories

Don't repeat setup code. Build factories that create realistic test data with sensible defaults.

```typescript
// tests/factories/index.ts
import { db } from '../../lib/db';
import { createSession } from '../../lib/auth';
import { hashPassword } from '../../lib/crypto';

export async function createTestOrg(overrides = {}) {
  const org = await db.organization.create({
    data: {
      name: 'Test Organization',
      plan: 'pro',
      ...overrides,
    },
  });

  const user = await db.user.create({
    data: {
      email: `user-${crypto.randomUUID()}@test.com`,
      passwordHash: await hashPassword('test-password'),
      organizationId: org.id,
      role: 'admin',
    },
  });

  const token = await createSession(user.id);

  return { org, user, token };
}

export async function createTestDocument(organizationId: string, overrides = {}) {
  return db.document.create({
    data: {
      title: 'Test Document',
      body: 'Test content',
      organizationId,
      status: 'draft',
      ...overrides,
    },
  });
}
```

---

## Unit Tests: Use Selectively

Unit tests shine on pure functions with complex logic. Don't write them for everything.

```typescript
// lib/billing/proration.ts — complex pure logic worth testing
export function calculateProration(
  currentPlan: Plan,
  newPlan: Plan,
  daysRemainingInCycle: number,
  cycleDays: number
): number {
  const dailyCurrentRate = currentPlan.monthlyPrice / cycleDays;
  const dailyNewRate = newPlan.monthlyPrice / cycleDays;
  const credit = dailyCurrentRate * daysRemainingInCycle;
  const charge = dailyNewRate * daysRemainingInCycle;
  return Math.max(0, charge - credit);
}
```

```typescript
// tests/unit/billing/proration.test.ts
import { calculateProration } from '../../../lib/billing/proration';

describe('calculateProration', () => {
  it('charges the difference when upgrading mid-cycle', () => {
    const result = calculateProration(
      { monthlyPrice: 29 },
      { monthlyPrice: 99 },
      15, // days remaining
      30  // cycle length
    );
    expect(result).toBeCloseTo(35); // (99-29) / 30 * 15
  });

  it('returns 0 when downgrading (no refund on downgrade)', () => {
    const result = calculateProration(
      { monthlyPrice: 99 },
      { monthlyPrice: 29 },
      15,
      30
    );
    expect(result).toBe(0);
  });

  it('handles upgrade on the last day of the cycle', () => {
    const result = calculateProration(
      { monthlyPrice: 29 },
      { monthlyPrice: 99 },
      1,
      30
    );
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(5); // small charge for 1 remaining day
  });
});
```

---

## Authorization Tests: Non-Negotiable

Every access control check needs a test that verifies it actually blocks unauthorized access. This is the category of test most teams skip and most security incidents trace back to.

```typescript
describe('Authorization', () => {
  describe('Document access', () => {
    it('user cannot read documents from another organization', async () => {
      const { org: orgA, token: tokenA } = await createTestOrg();
      const { org: orgB } = await createTestOrg();
      const doc = await createTestDocument(orgB.id);

      const res = await makeRequest(tokenA).get(`/api/documents/${doc.id}`);
      expect(res.status).toBe(404); // 404, not 403 — don't confirm resource exists
    });

    it('user cannot update documents from another organization', async () => {
      const { token: tokenA } = await createTestOrg();
      const { org: orgB } = await createTestOrg();
      const doc = await createTestDocument(orgB.id);

      const res = await makeRequest(tokenA)
        .patch(`/api/documents/${doc.id}`)
        .send({ title: 'Hacked' });

      expect(res.status).toBe(404);

      // Verify the document wasn't actually modified
      const unchanged = await db.document.findUnique({ where: { id: doc.id } });
      expect(unchanged?.title).not.toBe('Hacked');
    });
  });
});
```

**Return 404, not 403, when a user requests a resource that belongs to another tenant.** 403 confirms the resource exists. 404 reveals nothing. This is standard security practice.

---

## E2E Tests: Critical Paths Only

E2E tests run a real browser against a running app. They're slow (30s–5min per test) and brittle. Use them sparingly, only for flows where a failure would be catastrophic.

**The three E2E flows every SaaS should cover:**

1. Sign up → complete onboarding → perform first core action
2. Upgrade from free to paid plan
3. Invite a team member → they accept → they can access the product

```typescript
// tests/e2e/signup.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test('user can sign up and complete onboarding', async ({ page }) => {
  await page.goto('/signup');

  await page.fill('[name=email]', `test-${Date.now()}@example.com`);
  await page.fill('[name=password]', 'SecurePassword123!');
  await page.click('[type=submit]');

  // Onboarding
  await expect(page).toHaveURL(/\/onboarding/);
  await page.fill('[name=orgName]', 'My Test Company');
  await page.click('text=Continue');

  // First core action
  await expect(page).toHaveURL(/\/dashboard/);
  await page.click('text=Create your first document');
  await page.fill('[name=title]', 'My First Document');
  await page.click('text=Save');

  await expect(page.locator('text=My First Document')).toBeVisible();
});
```

---

## CI Integration

Tests that don't run automatically don't get fixed. Wire your test suite into CI from day one.

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s

    env:
      TEST_DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      JWT_SECRET: test-secret-not-for-production

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ env.TEST_DATABASE_URL }}
      - run: npm test -- --coverage
      - run: npm run test:e2e
        if: github.ref == 'refs/heads/main'  # E2E only on main — too slow for every PR
```

Block merges on test failures. A green CI is your deploy confidence signal.

---

## AI Prompt — Test Coverage Audit

Use this when you've written your core API and want to find gaps.

```
You are a senior QA engineer reviewing the test coverage for a SaaS product.

Product context:
[Describe your product and its core features]

My current test setup:
[Testing framework, test database approach, what's already tested]

Core API endpoints:
[List your main endpoints and their purpose]

Authorization model:
[How does tenant isolation work? What roles exist?]

Please:
1. List the 5 highest-risk areas that are most likely to cause data leaks or bugs if untested
2. Write 3 specific test cases I'm probably missing for my authorization model
3. Identify which of my endpoints most need integration tests vs unit tests
4. Flag any common edge cases specific to SaaS (multi-tenancy, billing, invitations) I should add
5. Tell me one area where I'm probably over-testing relative to risk

Output as a prioritized list — highest risk first.
```

---

## Implementation Checklist

### Setup

- [ ] Separate test database configured (`TEST_DATABASE_URL`)
- [ ] Database reset between tests (truncate or transactions)
- [ ] Test factories for core entities (user, org, core domain objects)
- [ ] CI pipeline runs tests on every PR
- [ ] Merges blocked when tests fail

### Integration Tests

- [ ] Happy path for every core API endpoint
- [ ] 401 response for unauthenticated requests
- [ ] 403/404 for cross-tenant access attempts
- [ ] Error cases for invalid input
- [ ] Webhook handler tests with valid and invalid signatures
- [ ] Background job tests with real DB writes

### Unit Tests

- [ ] Proration and billing calculation logic
- [ ] Permission/role checking functions
- [ ] Data transformation functions
- [ ] Validation schemas

### E2E Tests

- [ ] Signup → onboarding → first core action
- [ ] Free → paid upgrade flow
- [ ] Team member invitation flow
- [ ] E2E tests run in CI on merge to main

### Authorization (Critical)

- [ ] Every resource endpoint tested for cross-tenant access
- [ ] Role-based access tested (viewer cannot perform admin actions)
- [ ] Soft-deleted or suspended resources inaccessible
- [ ] Admin endpoints inaccessible to regular users

---

## Common Mistakes

> **⚠️ Testing against your development database**
> Parallel test runs corrupt each other's data. A test cleanup job deletes data you were working with. Always use `TEST_DATABASE_URL`.

> **⚠️ Mocking your database in integration tests**
> Mocking Prisma or your ORM means you're not testing your actual queries. You'll miss N+1 problems, missing indexes, and type mismatches. Use a real test database.

> **⚠️ Skipping authorization tests**
> "We'll add those later" is how multi-tenancy data leaks happen. Authorization tests are not optional — they're your security regression suite.

> **⚠️ High coverage on low-risk code**
> 95% coverage that includes getters, setters, and framework glue tells you nothing. Coverage on business logic, auth, and data boundaries is what matters.

> **⚠️ E2E tests for everything**
> E2E tests that cover 50 scenarios take 30 minutes to run. Nobody waits 30 minutes before merging a typo fix. Keep your E2E suite to the 3–5 critical paths that justify the cost.

---

## What's Next

Your test suite is in place and running in CI. Before moving on, confirm:

- Every core API endpoint has at least one integration test
- Cross-tenant access is explicitly tested and blocked
- CI blocks merges on test failure
- Your E2E suite covers signup and the upgrade flow

Next up: **Documentation**
