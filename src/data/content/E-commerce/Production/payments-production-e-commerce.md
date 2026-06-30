---
title: Payments Implementation
slug: payments
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Payments Implementation

Implementing payments in production is entirely about handling edge cases. The "happy path" (a user enters a valid card and pays) takes 10 minutes to code. The unhappy paths (3D Secure redirects, network timeouts, fraud blocks, webhook duplication, and insufficient funds) take weeks to bulletproof.

If your payment implementation is fragile, you will face two catastrophic scenarios:
1. **The Double Charge:** You charge a customer twice for one order. This destroys trust and triggers chargebacks.
2. **The Free Product (Unpaid Fulfillment):** A user tricks your client-side code into triggering a success state without actually paying.

---

## 1. The Server-Side Source of Truth

**Rule #1 of E-Commerce Payments: Never trust the client.**

The frontend should only be responsible for securely collecting the credit card details (via a hosted iframe like Stripe Elements) and returning a token to your server.

**The Implementation Flow:**
1. User clicks "Checkout".
2. **Backend:** Calculates the exact final price (Items + Validated Shipping + Validated Tax).
3. **Backend:** Creates a `PaymentIntent` via the Stripe/Adyen API with the exact amount, passing an Idempotency Key (e.g., the Cart UUID).
4. **Backend:** Returns the `client_secret` to the frontend.
5. **Frontend:** Uses the `client_secret` to render the Stripe Elements UI.
6. **Frontend:** User submits payment. Stripe processes the card directly (PCI compliance maintained).
7. **Stripe Backend:** Fires a `payment_intent.succeeded` webhook to your server.
8. **Your Backend (Webhook Handler):** Creates the Order in the database and triggers fulfillment.

> [!CAUTION]
> Never, ever create an Order in your database based on a frontend `stripe.confirmCardPayment().then(success)` callback. A malicious user can mock the frontend API to trigger the success callback without actually paying. Orders must ONLY be created via authenticated server-side webhooks.

---

## 2. Webhook Resilience & Idempotency

Stripe and other payment processors guarantee "at-least-once" delivery of webhooks. This means your backend *will* occasionally receive the same `payment_intent.succeeded` event twice.

Your webhook handler must be strictly idempotent.

```typescript
// Production Webhook Handler
export async function handleStripeWebhook(req: Request) {
  const event = verifySignature(req);
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntentId = event.data.object.id;
    
    // 1. Check if we already processed this payment
    const existingOrder = await db.order.findUnique({ 
      where: { transactionId: paymentIntentId } 
    });
    
    if (existingOrder) {
      // 2. We already processed this. Return 200 OK immediately to satisfy Stripe.
      return new Response("Already processed", { status: 200 });
    }
    
    // 3. Process new order...
    await createOrderTransaction(event.data);
  }
  
  return new Response("OK", { status: 200 });
}
```

---

## 3. Handling 3D Secure (SCA)

If you have customers in Europe, your implementation must handle Strong Customer Authentication (SCA).

When the user submits the payment, the card issuer may require a 3D Secure challenge (e.g., a push notification to their banking app).
- In Stripe Elements, `stripe.confirmCardPayment` will automatically handle the iframe redirect for this challenge.
- **The Risk:** The user might complete the challenge in their banking app, but close your checkout tab before the redirect finishes. 
- **The Solution:** Because your backend relies strictly on the `payment_intent.succeeded` webhook (which fires regardless of whether the user keeps the tab open), the order will still be processed safely.

---

## 4. Fraud Prevention & Rate Limiting

At production scale, botnets will find your checkout endpoint and use it to test stolen credit cards. 
If 5,000 stolen cards are tested on your site, your payment processor will flag you for fraud and shut down your account.

**Implementation Requirements:**
1. **Rate Limiting:** Implement an edge rate-limiter (e.g., Upstash) on the endpoint that creates the `PaymentIntent`. Restrict it to 5 requests per minute per IP.
2. **Fraud Tooling:** Enable Stripe Radar (or equivalent). Configure rules to automatically block transactions with mismatched billing ZIP codes or high-risk IP addresses.
3. **CAPTCHA:** If rate limits are triggered, force the checkout to display a CAPTCHA (e.g., Turnstile) before generating new PaymentIntents.

---

## AI Prompt — Architect Your Payments Implementation

```prompt
I am implementing the payment processing layer for a production e-commerce store.

Tech Stack:
- Framework: [e.g., Next.js App Router]
- Database: [e.g., Postgres + Prisma]
- Payment Gateway: [e.g., Stripe]

Act as a Principal Payments Engineer:
1. Write the strict, production-ready TypeScript code for my Stripe Webhook handler. Ensure it includes Signature Verification, Idempotency checks to prevent double-orders, and robust error logging.
2. Provide the frontend implementation for securely collecting payment details using [Stripe Elements] and handling the response, including 3D Secure (SCA) flows.
3. Write the server-side code to generate the `PaymentIntent`. Explicitly demonstrate how the final amount must be calculated purely server-side, ignoring any cart totals passed from the client.
4. Define the exact edge-caching and rate-limiting middleware required to protect my checkout endpoint from card-testing botnets.
```

---

## Payments Implementation Checklist

- [ ] Frontend strictly decoupled from payment logic (No client-side Order creation)
- [ ] Server-side price calculation enforced before `PaymentIntent` creation
- [ ] Webhook signature verification implemented
- [ ] Idempotency checks implemented in webhook handlers to prevent duplicate orders
- [ ] Edge rate-limiting deployed on checkout endpoints to prevent card testing
- [ ] 3D Secure (SCA) flows tested and verified for European customers
