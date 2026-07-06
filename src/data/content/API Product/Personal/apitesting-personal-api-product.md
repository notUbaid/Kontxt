---
title: Testing
slug: testing
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# Testing

You've now built authentication, authorization, API keys, rate limiting, background jobs, queues, webhooks, and an SDK. Each one has a specific way it can silently break — and for an API product, "silently break" means other people's integrations breaking without warning, not just a bug you catch yourself.

This module is about testing *strategically*, not exhaustively. As a solo developer, 100% coverage is a trap that burns hours on low-risk code. The goal is confident coverage of the places where a bug costs the most.

---

## Where to Spend Your Testing Budget

| Area | Risk if untested | Priority |
|---|---|---|
| Authorization (ownership checks) | Data leak between users (BOLA) | Highest |
| API key verification | Auth bypass | Highest |
| Webhook signature verification | Forged events accepted | Highest |
| Rate limiting | Abuse, cost overrun | High |
| Core resource CRUD | Broken core functionality | High |
| Background job idempotency | Duplicate side effects on retry | High |
| Response formatting/edge cases | Confusing but non-dangerous bugs | Medium |
| SDK wrapper logic | Bad developer experience | Medium |

> **Decision card — Recommended for Personal mode**
> Write integration tests for everything in the "Highest" row before you write anything else. These are the tests that catch the bugs that actually hurt someone — not the ones that just fail a CI badge. Skip unit-testing trivial pass-through code; it's not where your risk lives.

---

## Test Types, and Which You Actually Need

| Type | What it verifies | Use for |
|---|---|---|
| **Unit** | A single function in isolation | Pure logic: signature verification, price calculations, validation rules |
| **Integration** | A full request through real middleware to a real (test) database | Auth, authorization, CRUD endpoints — most of your test suite should live here |
| **Contract** | The SDK's expectations match the API's actual responses | Catching drift between API changes and SDK before users hit it |

For an API product, **integration tests carry most of the weight** — the value you're shipping is HTTP behavior, and unit tests alone can't catch a route that forgot to apply the authorization middleware.

---

## Implementation: Integration Test Setup

```typescript
// tests/setup.ts
import { beforeEach, afterAll } from "vitest";
import { db } from "../src/db";

beforeEach(async () => {
  // Reset to known state before every test — never assume order
  await db.$transaction([
    db.order.deleteMany(),
    db.apiKey.deleteMany(),
    db.user.deleteMany(),
  ]);
});

afterAll(async () => {
  await db.$disconnect();
});
```

> **Tip — use a real test database, not mocks, for integration tests**
> Mocking your ORM in integration tests means you're testing that your mocks behave as configured, not that your queries actually work. Use a real (disposable, local or CI-only) database — this is the only way to catch the authorization query mistakes covered in earlier modules.

---

## Testing Authorization (Highest Priority)

This is the test that would have caught the BOLA vulnerability class discussed in the Authorization Implementation module. Write it for every resource.

```typescript
// tests/authorization.test.ts
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { createTestUser, createTestOrder } from "./helpers";

describe("Order authorization", () => {
  it("prevents a user from reading another user's order", async () => {
    const owner = await createTestUser();
    const attacker = await createTestUser();
    const order = await createTestOrder({ userId: owner.id });

    const res = await request(app)
      .get(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${attacker.apiKey}`);

    expect(res.status).toBe(404); // not 403 — see Authorization module
  });

  it("prevents a user from deleting another user's order", async () => {
    const owner = await createTestUser();
    const attacker = await createTestUser();
    const order = await createTestOrder({ userId: owner.id });

    const res = await request(app)
      .delete(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${attacker.apiKey}`);

    expect(res.status).toBe(404);

    const stillExists = await db.order.findUnique({ where: { id: order.id } });
    expect(stillExists).not.toBeNull();
  });
});
```

> **Warning — write this test for every resource, not just one**
> It's tempting to write this once for `orders` and assume the pattern holds everywhere. It doesn't — authorization bugs are per-endpoint, and a missing check on `invoices` won't be caught by a passing test on `orders`. If you have a resource, it needs this test.

---

## Testing API Keys

```typescript
describe("API key verification", () => {
  it("rejects a revoked key", async () => {
    const { apiKey, fullKey } = await createTestApiKey();
    await db.apiKey.update({ where: { id: apiKey.id }, data: { revokedAt: new Date() } });

    const res = await request(app).get("/orders").set("Authorization", `Bearer ${fullKey}`);
    expect(res.status).toBe(401);
  });

  it("rejects a write request from a read-only scoped key", async () => {
    const { fullKey } = await createTestApiKey({ scopes: ["read"] });

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${fullKey}`)
      .send({ items: [] });

    expect(res.status).toBe(403);
  });
});
```

---

## Testing Webhook Signature Verification

```typescript
describe("Webhook signing", () => {
  it("produces a signature that verifies correctly", () => {
    const payload = JSON.stringify({ type: "order.created" });
    const secret = "test_secret";

    const signature = signPayload(payload, secret);
    expect(verifyWebhook(payload, signature, secret)).toBe(true);
  });

  it("rejects a tampered payload", () => {
    const payload = JSON.stringify({ type: "order.created" });
    const secret = "test_secret";
    const signature = signPayload(payload, secret);

    const tampered = JSON.stringify({ type: "order.cancelled" });
    expect(verifyWebhook(tampered, signature, secret)).toBe(false);
  });
});
```

---

## Testing Background Job Idempotency

```typescript
describe("Order fulfillment job", () => {
  it("running the job twice does not create duplicate shipments", async () => {
    const order = await createTestOrder();

    await fulfillOrder(order.id);
    await fulfillOrder(order.id); // simulate a retry

    const shipments = await db.shipment.findMany({ where: { orderId: order.id } });
    expect(shipments).toHaveLength(1);
  });
});
```

This directly tests the idempotency guarantee from the Background Jobs module — don't skip it, since a retried job is not a hypothetical, it's the expected behavior of any queue.

---

## Contract Testing: Catching SDK Drift

A minimal but high-value check: run the actual SDK against a running instance of your API in CI, so a breaking API change fails the build instead of failing silently in a user's integration.

```typescript
describe("SDK contract", () => {
  it("orders.create matches the actual API response shape", async () => {
    const client = new MyApiClient({ apiKey: testApiKey, baseUrl: testServerUrl });
    const order = await client.orders.create({ items: [{ sku: "TEST", qty: 1 }] });

    expect(order).toMatchObject({
      id: expect.any(String),
      status: expect.any(String),
    });
  });
});
```

---

## AI Prompt: Generate Test Coverage for a Module

Run this per feature area, not once for the whole API — a focused prompt with the actual route code produces far more accurate tests than a broad one.

```
Write integration tests for this route using [Vitest/Jest] and
supertest:

[paste route handler + relevant middleware]

Cover:
1. The happy path
2. Unauthorized access (no/invalid API key) → expect 401
3. Authorization failure (valid key, wrong owner) → expect 404
4. [Any scope/rate-limit requirements specific to this route]
5. Validation failure on malformed input → expect 400

Use existing test helpers: createTestUser, createTestApiKey,
createTestOrder (assume these exist in tests/helpers.ts).
```

---

## Validating AI-Generated Tests

- **Confirm the authorization test actually uses two different users**, not the same user twice — a surprisingly common generated-test mistake that makes the test pass without testing anything.
- **Confirm assertions check status codes AND that no side effect occurred** (e.g., the delete test above verifies the record still exists, not just that the response was 404).
- **Confirm tests don't depend on execution order** — each test should set up its own data and not assume a previous test ran first.
- **Watch for tests that only cover the happy path.** If the prompt's five categories above aren't all present, ask for the missing ones explicitly.

---

## Common Mistakes

- Testing only the happy path and skipping authorization/negative cases — the highest-risk tests are the ones most often skipped.
- Mocking the database in integration tests, which hides real query bugs.
- Not resetting test data between tests, causing order-dependent flakiness.
- Writing one authorization test and assuming it covers every resource.

---

## Validation Checklist

- [ ] Every resource has an authorization test proving one user cannot access another's data
- [ ] API key verification is tested for revoked keys and insufficient scope
- [ ] Webhook signature verification has both a valid-signature and tampered-payload test
- [ ] At least one background job has an explicit idempotency test (run twice, assert no duplicate)
- [ ] Integration tests run against a real test database, not mocks
- [ ] Tests reset state between runs and don't depend on execution order
- [ ] SDK has at least a basic contract test against the live API shape

---

## What's Next

With confidence in your core logic, the next module — **Documentation** — turns everything you've built into the reference material developers will actually read while integrating.
