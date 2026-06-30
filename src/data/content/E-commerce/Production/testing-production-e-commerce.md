---
title: Testing
slug: testing
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 25-30 min
---

# Testing

You're handling real payments now. A bug that's annoying in a to-do app is expensive in a store — a broken checkout means lost money, a broken inventory sync means overselling, a broken discount code means giving away free products. This module is about testing the parts of your store where bugs actually cost something, and skipping the parts where they don't.

---

## The Personal-Project Testing Trap

Most beginners do one of two things, both wrong:

1. **Test nothing** — ship and hope, find out from angry customers
2. **Test everything** — chase 100% coverage on a solo project, burn weeks on tests for a button color

Neither is right. The goal is **targeted testing**: cover the paths where a bug costs you money or trust, skip exhaustive coverage everywhere else.

> **Reframe:** You're not trying to prove your code is correct. You're trying to make sure the few things that would actually hurt you — wrong charges, lost orders, broken checkout — can't silently break without you knowing.

---

## Decision: What Actually Needs Tests?

<table>
<tr><th>Area</th><th>Test it?</th><th>Why</th></tr>
<tr><td>Checkout & payment flow</td><td><strong>Yes — critical</strong></td><td>Bugs here cost real money and trust</td></tr>
<tr><td>Cart logic (totals, quantities, discounts)</td><td><strong>Yes — critical</strong></td><td>Wrong math = wrong charges</td></tr>
<tr><td>Inventory updates after purchase</td><td><strong>Yes — critical</strong></td><td>Bugs here cause overselling</td></tr>
<tr><td>Order status transitions</td><td>Yes — important</td><td>Customers and you both rely on accurate status</td></tr>
<tr><td>Auth (signup/login)</td><td>Yes — important</td><td>Security-adjacent, worth covering</td></tr>
<tr><td>Product display/filtering UI</td><td>Light/manual testing</td><td>Visual bugs are easy to spot manually</td></tr>
<tr><td>Admin dashboard UI</td><td>Manual testing</td><td>You're the only user — you'll notice if it breaks</td></tr>
<tr><td>Marketing pages, static content</td><td>No automated tests needed</td><td>Low risk, low complexity</td></tr>
</table>

---

## The Three Layers (And How Much of Each You Need)

```
        ╱╲
       ╱  ╲      E2E Tests
      ╱----╲     Few. Slow. Test the full purchase journey.
     ╱      ╲
    ╱--------╲   Integration Tests  
   ╱          ╲  Some. Test API routes + DB together.
  ╱------------╲
 ╱              ╲ Unit Tests
╱----------------╲ Most. Fast. Test pure logic (cart math, etc).
```

This is the standard testing pyramid — but for a personal store, weight it even more toward the bottom. You don't need dozens of E2E tests. You need a handful that cover the purchase journey, and solid unit tests around money-related logic.

---

## Layer 1: Unit Tests — Cart & Pricing Logic

This is your highest-value testing investment. Cart and pricing math is pure logic (no database, no network), fast to test, and exactly where silent bugs cost you money.

**What to unit test:**
- Cart subtotal calculation
- Discount/coupon application
- Tax calculation
- Shipping cost calculation
- Total calculation (subtotal + tax + shipping - discount)
- Quantity limits / stock validation logic

```javascript
// Example using Vitest
import { describe, it, expect } from 'vitest';
import { calculateCartTotal } from '../lib/cart';

describe('calculateCartTotal', () => {
  it('calculates subtotal correctly for multiple items', () => {
    const items = [
      { price: 25.00, quantity: 2 },
      { price: 10.00, quantity: 1 },
    ];
    expect(calculateCartTotal(items).subtotal).toBe(60.00);
  });

  it('applies percentage discount correctly', () => {
    const items = [{ price: 100.00, quantity: 1 }];
    const result = calculateCartTotal(items, { type: 'percent', value: 10 });
    expect(result.total).toBe(90.00);
  });

  it('does not apply discount below zero', () => {
    const items = [{ price: 5.00, quantity: 1 }];
    const result = calculateCartTotal(items, { type: 'flat', value: 50 });
    expect(result.total).toBe(0);
  });

  it('handles empty cart without error', () => {
    expect(calculateCartTotal([]).total).toBe(0);
  });
});
```

> **Why this matters more than it seems:** A coupon bug that lets totals go negative, or a tax calculation that's off by a rounding error, won't show up in a quick manual click-through — you'll only notice when a customer either complains or you reconcile your Stripe payouts and the numbers don't add up.

---

## Layer 2: Integration Tests — API Routes + Database

Test that your backend logic correctly talks to your database for the flows that change state.

**Priority integration tests:**
- Creating an order correctly decrements inventory
- Placing an order with insufficient stock is rejected
- Order status updates correctly when a webhook fires
- Duplicate webhook events don't create duplicate orders (idempotency)

```javascript
// Example: testing inventory decrement on order creation
describe('POST /api/orders', () => {
  it('decrements product stock when an order is placed', async () => {
    const product = await createTestProduct({ stock: 5 });
    await createTestOrder({ productId: product.id, quantity: 2 });

    const updated = await getProduct(product.id);
    expect(updated.stock).toBe(3);
  });

  it('rejects an order if requested quantity exceeds stock', async () => {
    const product = await createTestProduct({ stock: 1 });
    const response = await createTestOrder({ productId: product.id, quantity: 5 });

    expect(response.status).toBe(400);
  });

  it('does not double-process the same Stripe webhook event', async () => {
    const event = createTestWebhookEvent({ type: 'checkout.session.completed' });
    await processWebhook(event);
    await processWebhook(event); // same event, sent twice

    const orders = await getOrdersByPaymentIntent(event.payment_intent);
    expect(orders.length).toBe(1);
  });
});
```

> **Critical concept — Webhook idempotency:** Payment providers (Stripe included) can and do send the same webhook event more than once. If your handler isn't idempotent, a retried webhook can create duplicate orders or double-decrement inventory. This is one of the most common production bugs in e-commerce apps built quickly. Test for it explicitly.

---

## Layer 3: End-to-End Tests — The Purchase Journey

A small number of E2E tests that simulate a real customer, browser and all. Use a tool like **Playwright**.

**The E2E tests actually worth writing:**
1. Browse → add to cart → checkout → complete payment (happy path)
2. Apply a valid discount code → total updates correctly
3. Attempt checkout with an out-of-stock item → blocked with a clear message
4. Failed payment (use Stripe's test card for declines) → user sees an error, isn't charged, isn't shown a false success page

That's typically enough. You don't need E2E coverage of every page — just the path where money changes hands.

```javascript
// Example using Playwright
import { test, expect } from '@playwright/test';

test('customer can complete a purchase end-to-end', async ({ page }) => {
  await page.goto('/products/sample-product');
  await page.click('text=Add to Cart');
  await page.click('text=Checkout');

  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="cardNumber"]', '4242424242424242'); // Stripe test card
  await page.fill('[name="expiry"]', '12/30');
  await page.fill('[name="cvc"]', '123');
  await page.click('text=Place Order');

  await expect(page.locator('text=Order Confirmed')).toBeVisible();
});

test('declined card shows error, not false success', async ({ page }) => {
  await page.goto('/products/sample-product');
  await page.click('text=Add to Cart');
  await page.click('text=Checkout');

  await page.fill('[name="cardNumber"]', '4000000000000002'); // Stripe decline test card
  await page.click('text=Place Order');

  await expect(page.locator('text=Payment failed')).toBeVisible();
  await expect(page.locator('text=Order Confirmed')).not.toBeVisible();
});
```

> **Tip:** Stripe provides a full set of test card numbers for simulating declines, insufficient funds, expired cards, and fraud flags. Use them. Never test payment flows against your own real card.

---

## AI Prompt: Generate a Test Suite

```
I'm building tests for the critical paths of a personal e-commerce store using [Vitest/Jest + Playwright].

Stack: [your stack]

Generate tests for these specific areas, in priority order:
1. Unit tests for cart total calculation (subtotal, discount, tax, shipping) — including edge cases like empty cart, discount exceeding total, zero quantity
2. Integration tests for order creation: stock decrement, rejection on insufficient stock, webhook idempotency (same event processed twice should not duplicate the order)
3. One E2E test for the full happy-path purchase journey
4. One E2E test for a declined payment, verifying no false success state is shown

My relevant code:
[paste your cart logic, order creation endpoint, and webhook handler]

Use realistic test data. Flag any edge cases in my existing code that you notice aren't currently handled.
```

> **Token efficiency tip:** Ask AI to generate tests in priority order and stop after the highest-value ones if you're short on time. A complete test suite for your cart logic is worth more than partial coverage spread thin across everything.

---

## Validating AI-Generated Tests

Tests are code too — and AI-generated tests have a specific failure mode worth watching for: **tests that pass but don't actually test anything meaningful.**

- [ ] Does the test actually assert something specific, or just check that no error was thrown?
- [ ] Are edge cases covered (empty cart, zero stock, negative discount, duplicate webhook) or only the happy path?
- [ ] Do tests use isolated test data, or could they pollute your real database?
- [ ] Would this test actually fail if you reintroduced the bug it's supposed to catch? (Mentally break the code and check.)
- [ ] Are payment tests using Stripe's official test card numbers, not made-up ones?

> **Common AI mistake:** AI sometimes writes tests that check `expect(response.status).not.toBe(500)` instead of asserting the actual expected behavior. This technically passes but proves almost nothing. Push back and ask for specific value assertions.

---

## What "Good Enough" Looks Like Here

You are not shipping a payments company. A reasonable bar for a personal store:

- Cart/pricing logic: well-covered with unit tests
- Order creation + webhook handling: covered with integration tests, including idempotency
- One full happy-path E2E test, one failure-path E2E test
- Everything else: tested manually before launch, then as you go

If you hit that bar, you're in better shape than most production e-commerce side projects.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Visual regression testing (screenshot diffing)
- Load/performance testing
- Cross-browser E2E test matrices (test in one browser; Playwright supports more later if needed)
- 100% code coverage targets
- Mutation testing
- Testing third-party library internals (trust Stripe's SDK works — test your usage of it)

---

## Implementation Checklist

- [ ] Vitest (or Jest) installed and configured
- [ ] Unit tests written for cart subtotal, discount, tax, shipping, and total calculation
- [ ] Edge cases tested: empty cart, discount exceeding total, zero/negative quantity
- [ ] Integration test: order creation decrements stock correctly
- [ ] Integration test: order rejected when stock is insufficient
- [ ] Integration test: duplicate webhook event does not create duplicate order
- [ ] Playwright installed and configured
- [ ] E2E test: full happy-path purchase using Stripe test card
- [ ] E2E test: declined payment shows error, not false success
- [ ] All tests passing in CI (or at minimum, run before every deploy)

---

## What's Next

With your critical paths protected by tests, it's time to write down how your store actually works — for future-you, and for AI tools that need context — that's **Documentation**, next in this phase.
