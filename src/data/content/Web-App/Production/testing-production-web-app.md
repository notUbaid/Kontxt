---
title: Testing
slug: testing
phase: Phase 5
mode: production
projectType: web-app
estimatedTime: 35–45 min
---

# Testing

Tests are not proof that your code works. They are a safety net that lets you change code confidently — and a forcing function that improves your architecture.

A codebase with no tests is one you are afraid to touch. A codebase with good tests is one you can refactor, upgrade dependencies, and onboard new developers into without fear.

---

## The Testing Philosophy

Most teams write too many unit tests and too few integration tests. This is backwards.

```
                    ▲
                   /|\
                  / | \  E2E Tests
                 /  |  \  (few, high confidence, slow)
                /   |   \
               /    |    \
              / Integration \
             /    Tests      \
            /  (most of your  \
           /   test budget)    \
          /____________________\
         /                      \
        /     Unit Tests         \
       /  (pure functions, utils) \
      /____________________________\
```

**The practical split for a production web app:**
- **Unit tests**: Pure functions, data transformers, utility logic — anything with no I/O
- **Integration tests**: API routes with a real database — your primary test investment
- **E2E tests**: Critical user journeys only (signup, checkout, core feature)

> Testing against a real database in integration tests is not slow — it is accurate. Mocking your ORM means you are testing your mock, not your code.

---

## Toolchain

| Tool | Role |
|---|---|
| **Vitest** | Test runner — fast, TypeScript-native, Jest-compatible API |
| **Supertest** | HTTP layer testing — makes real requests against your Express app |
| **Testcontainers** | Spins up a real Postgres/Redis container for tests |
| **@faker-js/faker** | Generates realistic test data |
| **msw** | Mocks external HTTP APIs at the network level |

```bash
npm install -D vitest @vitest/coverage-v8 supertest testcontainers @faker-js/faker msw
npm install -D @types/supertest
```

---

## Part 1: Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()], // Respects your path aliases
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/migrations/**',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
      },
    },
    // Run tests sequentially to avoid DB conflicts
    pool: 'forks',
    poolOptions: {
      forks: { singleFork: true },
    },
  },
});
```

```json
// package.json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## Part 2: Test Database Setup

The most important infrastructure decision in your test suite. Use a real database.

```typescript
// src/tests/setup.ts
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { afterAll, beforeAll } from 'vitest';

let container: Awaited<ReturnType<typeof PostgreSqlContainer.prototype.start>>;

beforeAll(async () => {
  // Spin up isolated Postgres container for tests
  container = await new PostgreSqlContainer('postgres:16-alpine')
    .withDatabase('testdb')
    .withUsername('test')
    .withPassword('test')
    .start();

  const connectionUri = container.getConnectionUri();
  process.env.DATABASE_URL = connectionUri;

  // Run migrations against test DB
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: connectionUri },
  });
}, 60_000); // Allow 60s for container startup

afterAll(async () => {
  await container?.stop();
});
```

> **Why Testcontainers over an in-memory SQLite?** SQLite has different SQL semantics than Postgres. Unique constraint behavior, JSON operators, and full-text search all differ. If you're running Postgres in production, test against Postgres. Testcontainers makes this trivial.

---

### Database Helpers

```typescript
// src/tests/helpers/db.ts
import { PrismaClient } from '@prisma/client';
import { afterEach } from 'vitest';

export const testDb = new PrismaClient();

// Clean all tables between tests — order matters for FK constraints
export async function cleanDatabase() {
  const tableNames = [
    'RefreshToken',
    'OrderItem',
    'Order',
    'Product',
    'User',
  ];

  await testDb.$transaction(
    tableNames.map((table) =>
      testDb.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`)
    )
  );
}

// Register cleanup in each test file that uses the DB
export function useCleanDatabase() {
  afterEach(async () => {
    await cleanDatabase();
  });
}
```

---

### Test Factories

Factories generate realistic, type-safe test data. Never hardcode test fixtures.

```typescript
// src/tests/factories/user.factory.ts
import { faker } from '@faker-js/faker';
import { testDb } from '../helpers/db';
import { hashPassword } from '@lib/password';
import type { User } from '@prisma/client';

type UserOverrides = Partial<{
  email: string;
  name: string;
  role: 'user' | 'admin';
  password: string;
}>;

export async function createUser(overrides: UserOverrides = {}): Promise<User> {
  const password = overrides.password ?? 'Test1234!';

  return testDb.user.create({
    data: {
      email: overrides.email ?? faker.internet.email(),
      name: overrides.name ?? faker.person.fullName(),
      role: overrides.role ?? 'user',
      passwordHash: await hashPassword(password),
    },
  });
}

export async function createAdmin(overrides: UserOverrides = {}): Promise<User> {
  return createUser({ ...overrides, role: 'admin' });
}
```

```typescript
// src/tests/factories/product.factory.ts
import { faker } from '@faker-js/faker';
import { testDb } from '../helpers/db';

export async function createProduct(overrides = {}) {
  return testDb.product.create({
    data: {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      stock: faker.number.int({ min: 0, max: 100 }),
      ...overrides,
    },
  });
}
```

---

## Part 3: Integration Tests (API Routes)

This is your primary test investment. Test the full request/response cycle.

```typescript
// src/tests/helpers/app.ts
import { createApp } from '@/app'; // Your Express app factory
import type { Express } from 'express';
import request from 'supertest';
import { signAccessToken } from '@lib/tokens';

export function getTestApp(): Express {
  return createApp();
}

export function authedRequest(app: Express, userId: string, role = 'user') {
  const token = signAccessToken({ userId, role });
  return {
    get: (url: string) => request(app).get(url).set('Authorization', `Bearer ${token}`),
    post: (url: string) => request(app).post(url).set('Authorization', `Bearer ${token}`),
    patch: (url: string) => request(app).patch(url).set('Authorization', `Bearer ${token}`),
    delete: (url: string) => request(app).delete(url).set('Authorization', `Bearer ${token}`),
  };
}
```

```typescript
// src/tests/api/products.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import { getTestApp, authedRequest } from '../helpers/app';
import { createUser, createAdmin } from '../factories/user.factory';
import { createProduct } from '../factories/product.factory';
import { useCleanDatabase } from '../helpers/db';

describe('GET /products/:id', () => {
  const app = getTestApp();
  useCleanDatabase();

  it('returns product for authenticated user', async () => {
    const user = await createUser();
    const product = await createProduct({ name: 'Widget Pro', price: 29.99 });

    const res = await authedRequest(app, user.id)
      .get(`/products/${product.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: product.id,
      name: 'Widget Pro',
      price: 29.99,
    });
  });

  it('returns 404 for non-existent product', async () => {
    const user = await createUser();

    const res = await authedRequest(app, user.id)
      .get('/products/non-existent-id');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('returns 401 for unauthenticated request', async () => {
    const product = await createProduct();

    const res = await request(app).get(`/products/${product.id}`);

    expect(res.status).toBe(401);
  });
});

describe('POST /products', () => {
  const app = getTestApp();
  useCleanDatabase();

  it('creates product for admin', async () => {
    const admin = await createAdmin();

    const res = await authedRequest(app, admin.id, 'admin')
      .post('/products')
      .send({ name: 'New Widget', price: 49.99, stock: 10 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'New Widget', price: 49.99 });
  });

  it('returns 403 for non-admin user', async () => {
    const user = await createUser();

    const res = await authedRequest(app, user.id)
      .post('/products')
      .send({ name: 'New Widget', price: 49.99, stock: 10 });

    expect(res.status).toBe(403);
  });

  it('returns 400 for invalid payload', async () => {
    const admin = await createAdmin();

    const res = await authedRequest(app, admin.id, 'admin')
      .post('/products')
      .send({ name: '', price: -10 }); // Invalid

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

> **Test the unhappy paths.** Most developers test the happy path and ship. Authorization failures, validation errors, and 404s are equally important — they are the paths attackers explore first.

---

## Part 4: Unit Tests

Reserve unit tests for pure logic. Do not mock your database for unit tests — write integration tests instead.

```typescript
// src/lib/pricing.ts
export function calculateDiscount(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }
  return parseFloat((price * (1 - discountPercent / 100)).toFixed(2));
}

export function applyTieredPricing(quantity: number, unitPrice: number): number {
  if (quantity >= 100) return unitPrice * 0.8;
  if (quantity >= 50) return unitPrice * 0.9;
  if (quantity >= 10) return unitPrice * 0.95;
  return unitPrice;
}
```

```typescript
// src/lib/pricing.test.ts
import { describe, it, expect } from 'vitest';
import { calculateDiscount, applyTieredPricing } from './pricing';

describe('calculateDiscount', () => {
  it('applies percentage correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(80);
    expect(calculateDiscount(49.99, 10)).toBe(44.99);
  });

  it('throws on invalid discount', () => {
    expect(() => calculateDiscount(100, -1)).toThrow();
    expect(() => calculateDiscount(100, 101)).toThrow();
  });

  it('handles 0% and 100% edge cases', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
    expect(calculateDiscount(100, 100)).toBe(0);
  });
});

describe('applyTieredPricing', () => {
  it.each([
    [1, 10, 10],       // No discount
    [10, 10, 9.5],     // 5% at 10+
    [50, 10, 9],       // 10% at 50+
    [100, 10, 8],      // 20% at 100+
  ])('quantity %i at price %i → %f', (qty, price, expected) => {
    expect(applyTieredPricing(qty, price)).toBe(expected);
  });
});
```

---

## Part 5: Mocking External Services

Never call real external APIs in tests. Mock at the network level with MSW.

```typescript
// src/tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Stripe
  http.post('https://api.stripe.com/v1/payment_intents', () => {
    return HttpResponse.json({
      id: 'pi_test_123',
      status: 'succeeded',
      amount: 5000,
    });
  }),

  // Mock email provider
  http.post('https://api.resend.com/emails', () => {
    return HttpResponse.json({ id: 'email_test_123' });
  }),
];
```

```typescript
// src/tests/setup.ts
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { afterAll, afterEach, beforeAll } from 'vitest';

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

```typescript
// Override handlers per test
it('handles Stripe failure gracefully', async () => {
  server.use(
    http.post('https://api.stripe.com/v1/payment_intents', () => {
      return HttpResponse.json({ error: { message: 'Card declined' } }, { status: 402 });
    })
  );

  const res = await authedRequest(app, user.id)
    .post('/checkout')
    .send({ amount: 5000 });

  expect(res.status).toBe(402);
  expect(res.body.error.code).toBe('PAYMENT_FAILED');
});
```

> **`onUnhandledRequest: 'error'`** causes tests to fail if your code makes an unexpected external API call. This prevents real API calls from slipping through in tests — and alerts you when your code does something unexpected.

---

## Part 6: Testing Error Handling

Your error handler is one of the most important pieces of middleware. Test it explicitly.

```typescript
// src/tests/api/errors.test.ts
describe('Error handling', () => {
  const app = getTestApp();

  it('returns structured error on validation failure', async () => {
    const user = await createUser();

    const res = await authedRequest(app, user.id)
      .post('/users/profile')
      .send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      error: {
        code: 'VALIDATION_ERROR',
        message: expect.any(String),
        requestId: expect.any(String),
      },
    });
  });

  it('never exposes stack traces in production', async () => {
    process.env.NODE_ENV = 'production';

    const res = await request(app).get('/route-that-throws-unexpectedly');

    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('at '); // No stack trace
    expect(res.body.error.message).toBe('An unexpected error occurred');

    process.env.NODE_ENV = 'test';
  });
});
```

---

## Part 7: CI Test Pipeline

```yaml
# .github/workflows/test.yml
name: Test

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info
          fail_ci_if_error: false
```

> Testcontainers pulls Docker images automatically on GitHub Actions — no additional setup needed. The runner has Docker available by default.

---

## What to Test: Priority Order

When you have limited time, test in this order:

1. **Authentication routes** — login, register, token refresh, logout
2. **Authorization** — that users cannot access other users' data, that non-admins cannot perform admin actions
3. **Core business logic** — whatever your app fundamentally does (orders, payments, bookings)
4. **Input validation** — that malformed inputs return 400, not 500
5. **Error handling** — that errors return structured responses, not stack traces
6. **Pure utility functions** — transformers, calculators, formatters

---

## Implementation Checklist

- [ ] Vitest configured with TypeScript path alias support
- [ ] Testcontainers setup running real Postgres in tests
- [ ] Database cleaned between each test with `afterEach`
- [ ] Factories created for all major entities using Faker
- [ ] Integration tests cover happy path, auth failures, and validation errors
- [ ] MSW configured for all external API calls
- [ ] `onUnhandledRequest: 'error'` set to catch unexpected external calls
- [ ] Unit tests cover pure functions and business logic utilities
- [ ] Coverage thresholds set in Vitest config (70% lines minimum)
- [ ] CI pipeline runs tests and uploads coverage report
- [ ] Error handler tested explicitly for structure and information leakage

---

## AI Prompt: Test Coverage Gap Analysis

```prompt
You are a senior engineer reviewing test coverage for a production Node.js/Express API.

Here is my route file:
[paste route file]

Here is my service file:
[paste service file]

Here are my existing tests:
[paste test file]

Identify:
1. Routes with no test coverage
2. Error paths that are not tested (404, 403, 400, 500)
3. Authorization scenarios missing from tests
4. Edge cases in the business logic that are not covered
5. External API calls that are not mocked

Return a list of specific test cases I should add, with the describe/it block structure ready to fill in.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Mocking Prisma instead of using real DB | Tests pass, production fails | Use Testcontainers |
| Only testing happy path | Auth bugs ship to production | Always test 401, 403, 400 |
| Shared state between tests | Flaky, order-dependent tests | `cleanDatabase()` in `afterEach` |
| Real external API calls in tests | Slow, flaky, costs money | Mock with MSW |
| 100% coverage as the goal | Tests that test nothing meaningful | Test behavior, not coverage |
| Hardcoded test data | Brittle tests that fail on schema changes | Use factories with Faker |
| No CI test gate | Broken code merges to main | Run tests on every PR |

---

## Next: Observability →

Tests tell you your code works before deployment. Observability tells you what is happening after.
