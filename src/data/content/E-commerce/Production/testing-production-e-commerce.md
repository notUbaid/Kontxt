---
title: Testing
slug: testing
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Automated Quality Assurance (QA)

**Estimated Time:** 60 Minutes

A beginner tests their e-commerce store by manually clicking the "Add to Cart" button on their laptop, typing in a fake credit card, and saying, *"Looks good to me."* 

Then they deploy to production. An hour later, a customer on an iPhone 12 using Safari tries to buy a product, but a CSS bug obscures the checkout button. The store makes zero money that day.

In a mass-production environment, human testing is a mathematical failure. You cannot manually test 50 different edge cases across 4 different browsers every time you push a line of code.

As an AI-Assisted Architect, you must engineer an **Automated E2E (End-to-End) Testing Pipeline** using Playwright or Cypress. Your CI/CD pipeline must mathematically prove the checkout works before the code is allowed to deploy.

---

## 1. End-to-End (E2E) Checkout Simulation

E2E testing is not unit testing. We don't care if a random helper function returns `true`. We care if a robot can successfully navigate the website and give us money.

**The Production Solution:**
You must use **Playwright**. It spins up actual Chromium, WebKit (Safari), and Firefox browsers in the cloud. It mimics a human cursor, clicks the buttons, and fills out the forms.

```typescript
// tests/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('Critical User Journey: Add to Cart and Checkout', async ({ page }) => {
  // 1. Navigate to a product page
  await page.goto('/products/black-t-shirt');

  // 2. Expect the Add to Cart button to be visible and click it
  const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  await expect(addToCartBtn).toBeVisible();
  await addToCartBtn.click();

  // 3. Verify the Optimistic UI updated the cart icon to '1' instantly
  const cartBadge = page.getByTestId('cart-badge-count');
  await expect(cartBadge).toHaveText('1');

  // 4. Navigate to checkout and fill out the shipping form
  await page.goto('/checkout');
  await page.getByLabel('Email Address').fill('test@example.com');
  await page.getByLabel('Shipping Address').fill('123 Main St');

  // 5. Verify the Fallback Shipping Rate ($8.00) appeared
  await expect(page.getByText('Standard Shipping - $8.00')).toBeVisible();
});
```

If you accidentally delete the "Add to Cart" button in a future update, Playwright will fail the test, block the Vercel deployment, and save your business.

## 2. API Mocking (Preventing Stripe Spam)

If your automated test clicks "Pay" 500 times a day, two bad things happen:
1. You pollute your actual Stripe test-mode dashboard with thousands of fake charges.
2. If the Stripe API is down for 5 minutes, your tests fail, and you cannot deploy your code (even if your code is perfect).

**The Production Solution:**
You must implement **Network Interception (Mocking)**. 
Playwright can intercept the network request your frontend makes to Stripe and instantly return a fake `200 Success` JSON payload, without ever actually pinging the internet.

```typescript
test('Checkout handles successful payment mock', async ({ page }) => {
  // Intercept the API call to our Next.js backend
  await page.route('**/api/checkout/capture', route => {
    // FAKE the response!
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, receipt: 'rec_123' }),
    });
  });

  await page.getByRole('button', { name: 'Submit Payment' }).click();
  // Verify the frontend correctly redirected to the Thank You page based on the mock
  await expect(page).toHaveURL('/thank-you?receipt=rec_123');
});
```

## 3. Visual Regression Testing

Sometimes the code works perfectly, but a Tailwind CSS update causes the Product Image to stretch to 4000px wide, breaking the visual layout. E2E tests won't catch this because the "Add to Cart" button is technically still in the DOM.

**The Production Solution:**
Playwright supports **Visual Regression Testing**. 
During the test, it takes a screenshot of the Cart Drawer. It compares that screenshot pixel-by-pixel to a "Golden Master" screenshot you took yesterday. If more than 1% of the pixels differ (because the layout broke), the test fails.

---

## ✅ Testing Engineering Checklist

- [ ] Abandon manual testing for critical revenue paths. Mandate Playwright E2E testing.
- [ ] Write a script that tests the "Critical User Journey" (Search -> Add to Cart -> Checkout).
- [ ] Implement Network Mocking in your tests so you do not spam third-party APIs like Stripe or Shopify.
- [ ] Implement Visual Regression snapshots for critical UI components like the Cart Drawer.

---

## AI Prompt — Engineer the Playwright Pipeline

Copy this prompt into your AI to have it generate the rigorous testing suite for your Next.js application.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal QA Automation Engineer. We are engineering our Playwright E2E Testing Pipeline.

I need you to generate the following testing implementations:

**1. The Critical Revenue Path Test:**
Write a Playwright test (`checkout.spec.ts`) that navigates to `/products/shoes`, clicks a `<button>` with the exact text "Add to Cart", verifies the Zustand cart drawer slides open, and clicks "Proceed to Checkout". 

**2. The Stripe API Network Mock:**
Within that same test, show exactly how to use `page.route` to intercept the POST request to `/api/create-payment-intent`. Demonstrate how to fulfill the route with a mock `clientSecret` so the test can complete the frontend logic without ever actually pinging the Stripe servers.

**3. Visual Regression Configuration:**
Write the Playwright configuration (`playwright.config.ts`) required to run tests across 3 separate browser engines (Chromium, Firefox, WebKit). Show the code required inside a test block to take a visual snapshot (`expect(page).toHaveScreenshot()`) of the Product Detail Page to guarantee our CSS never breaks unexpectedly.
````

**Next: Documentation & CI/CD →**
