---
title: Checkout Architecture
slug: checkout-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Checkout Architecture

Checkout is where browsers become buyers. It's also where most e-commerce bugs are catastrophic: double charges, lost orders, payment succeeding but cart not clearing, stock going negative.

The stakes are real. Engineer this carefully.

---

## The Fundamental Rule

**Never trust the client for anything financial.**

The browser sends you a cart. The browser sends you a total. The browser sends you a shipping option.

Ignore all of it.

Recompute everything server-side before charging a single rupee:

- Recalculate line item prices from your database
- Revalidate stock for every item
- Recalculate shipping from your rules
- Recalculate taxes
- Recompute the total

If client total ≠ server total, reject the request. Always.

---

## Checkout as a State Machine

Checkout is not a form. It is a series of states with valid transitions.

```
cart_review
    ↓
address_collection
    ↓
shipping_selection
    ↓
payment_initiated      ← payment intent created here
    ↓
payment_processing     ← user completes payment with provider
    ↓
order_created          ← atomic: stock decremented, order written
    ↓
confirmation
```

Each state transition happens server-side and is persisted. If a user drops off and returns, they resume from their last valid state — they do not restart.

---

## The Payment Intent Pattern

The most important architectural decision in checkout: **never collect payment details yourself.**

Use Stripe (or Razorpay for India) and let them handle card data. You never see card numbers. Your server creates a **payment intent** — an instruction to charge a specific amount to a specific customer — and your frontend completes it with the provider's hosted UI.

```
Client requests checkout
    ↓
Server validates cart (prices, stock, totals)
    ↓
Server creates Payment Intent with verified total
    ↓
Server returns client_secret to browser
    ↓
Browser uses client_secret + Stripe.js to collect card
    ↓
Stripe processes payment
    ↓
Stripe sends webhook → your server
    ↓
Your server creates order (stock decrement, cart clear, email)
```

### Why the webhook matters

Do **not** create the order when the browser redirects back to your success page. The browser redirect can fail. The user can close the tab. Network errors happen.

Create the order in your **webhook handler**. Webhooks are server-to-server. They are reliable. The browser's success redirect is only for showing a confirmation UI — the real work is already done.

---

## The Idempotency Problem

Payment webhooks can fire more than once. Stripe retries failed webhook deliveries. Your handler will receive the same `payment_intent.succeeded` event multiple times.

If your handler creates an order on every event, users get double-charged or double-fulfilled.

The fix: idempotency keys.

```js
// On receiving webhook:
const existing = await db.orders.findFirst({
  where: { paymentIntentId: event.data.object.id }
})

if (existing) {
  return res.status(200).json({ received: true }) // already processed
}

// Safe to create order now
await db.orders.create({ ... paymentIntentId: event.data.object.id ... })
```

Store the `paymentIntentId` on every order. Check before acting. This is not optional.

---

## Order Creation Must Be Atomic

When an order is created, several things must happen together or not at all:

1. Order record written
2. OrderItems records written
3. Stock decremented for each item
4. Cart marked `converted`
5. Confirmation email queued

If step 3 fails after step 1 succeeds, you have an order with no stock decrement. Inventory is now wrong.

Wrap this in a database transaction:

```js
await db.$transaction(async (tx) => {
  const order = await tx.orders.create({ ... })
  await tx.orderItems.createMany({ ... })
  
  for (const item of cartItems) {
    await tx.products.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } }
    })
  }

  await tx.carts.update({
    where: { id: cartId },
    data: { status: 'converted' }
  })
})

// Queue email AFTER transaction commits
await emailQueue.add('order-confirmation', { orderId: order.id })
```

Queue the email after the transaction. If the transaction fails and rolls back, you don't want a confirmation email going out for an order that doesn't exist.

---

## Data Model

```
Order
├── id (uuid)
├── orderNumber (human-readable, e.g. "ORD-1042")
├── userId or guestEmail
├── paymentIntentId (unique — used for idempotency)
├── status (pending | paid | fulfilled | cancelled | refunded)
├── currency
├── subtotal
├── shippingCost
├── taxAmount
├── totalAmount
├── shippingAddressId (foreign key)
├── createdAt
└── updatedAt

OrderItem
├── id
├── orderId (foreign key)
├── productId (foreign key)
├── variantId (nullable)
├── productName (snapshot — product name at time of purchase)
├── quantity
├── unitPrice (snapshot)
├── totalPrice

Address
├── id
├── userId (nullable — guest orders have no user)
├── fullName
├── line1, line2
├── city, state, postalCode, country
├── phone
```

### Snapshot product names and prices on OrderItems

Products get renamed. Prices change. Variants get discontinued. Your order history must always reflect what the customer actually purchased — not what the product looks like today. Always copy name and price into the order at creation time.

---

## Guest Checkout

Requiring account creation before purchase kills conversion. Support guest checkout.

```
Guest enters email at checkout
    ↓
No account? Create a lightweight guest record (email only)
    ↓
Order is linked to email, not a userId
    ↓
Post-purchase: "Create an account to track your order" CTA
    ↓
If they create account: link historical orders by email
```

Guest checkout is not optional for a real store. It is a significant portion of your revenue.

---

## API Surface

```
POST   /api/checkout/validate          → server validates cart, returns computed totals
POST   /api/checkout/payment-intent    → creates Stripe PaymentIntent, returns client_secret
POST   /api/checkout/address           → saves shipping address, returns shipping options
POST   /api/webhooks/stripe            → receives Stripe events, creates orders
GET    /api/orders/:id                 → fetch order confirmation details
```

Keep your webhook route separate from your main API. It must verify Stripe's signature on every request:

```js
const sig = req.headers['stripe-signature']
const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
```

If signature verification fails, return 400 and log it. Never process unsigned webhook events.

---

## Common Mistakes

**Creating the order in the success redirect handler**
The redirect is not reliable. Use webhooks.

**Not verifying prices server-side**
A user can modify the request. Always recompute totals.

**Forgetting the idempotency check**
Webhooks retry. You will process the same event twice without this check.

**Decrementing stock outside a transaction**
A failure mid-way leaves your inventory in an inconsistent state.

**Storing raw card data anywhere**
Even in logs. Never. Use Stripe.js and let Stripe own card collection entirely.

**Using `Math.round()` on currency**
Use integer arithmetic. Store all money in the smallest unit (paise, cents). Never use floats for money.

---

## AI Prompt: Checkout Flow Review

```
You are a senior backend engineer reviewing a checkout architecture for a personal e-commerce project.

Here is my checkout design:

PAYMENT FLOW:
[describe your PaymentIntent creation and webhook handling]

ORDER CREATION:
[paste your order creation logic or pseudocode]

DATA MODEL:
[paste your Order and OrderItem schema]

GUEST CHECKOUT:
[describe how you handle unauthenticated buyers]

Review for:
1. Race conditions and atomicity problems
2. Idempotency gaps (double-processing risks)
3. Missing server-side validation
4. Schema issues (missing snapshots, wrong types, missing fields)
5. Security vulnerabilities (unsigned webhooks, price trust, IDOR)
6. What a first-time builder would most likely get wrong here

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] Prices, stock, and totals recomputed server-side before payment intent creation
- [ ] PaymentIntent created before payment is collected (never after)
- [ ] Order created in webhook handler, not in success redirect
- [ ] Webhook signature verified on every Stripe request
- [ ] Idempotency check on `paymentIntentId` before creating order
- [ ] Order creation wrapped in a database transaction
- [ ] Stock decremented inside the same transaction as order creation
- [ ] Confirmation email queued after transaction commits, not inside it
- [ ] Product name and price snapshotted on OrderItems
- [ ] Money stored as integers (paise/cents), not floats
- [ ] Guest checkout supported (email-linked orders)
- [ ] `orderNumber` is human-readable for customer support

---

## What to Build Next

With checkout designed, your architecture phase for core commerce is complete.

**Payment Architecture** — goes deeper on Stripe configuration: webhook reliability, refund flows, partial captures, and handling failed payments gracefully.

---

> **Filename:** `checkout-architecture-personal-e-commerce.md`
