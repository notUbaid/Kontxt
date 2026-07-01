---
title: Retention
slug: retention
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Subscriptions & Recurring Revenue Architecture

**Estimated Time:** 60 Minutes

A beginner spends $50 on Facebook ads to acquire a single customer. The customer buys a $40 bag of coffee. The beginner loses $10 on the transaction and assumes e-commerce is a scam.

In a production environment, you do not optimize for the first sale. You optimize for **Lifetime Value (LTV)**. If that customer buys that $40 bag of coffee every month for 2 years, they are worth $960. You gladly spend $50 to acquire $960.

In Phase 6, you must engineer a mathematical **Recurring Billing Engine (Subscriptions)**, implement **Dunning Management**, and architect a **Customer Portal**.

---

## 1. The Stripe Billing Architecture (Subscriptions)

You must never store credit card numbers and attempt to run a `cron` job that manually creates a charge every 30 days. This violates PCI compliance, and if your server goes down, you lose the monthly revenue.

**The Production Solution:**
You must use **Stripe Billing** (or specialized tools like Skio/Recharge). Stripe's servers manage the calendar, handle leap years, and automatically execute the charge.

When a customer checks out, you create a Stripe `Subscription` instead of a one-time `PaymentIntent`.

```typescript
// app/api/checkout/subscribe/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const { customerId, priceId } = await req.json();

  // 1. Create the Subscription on Stripe's mathematical clock
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  // 2. Return the Client Secret so the frontend can securely collect the credit card
  const invoice = subscription.latest_invoice as Stripe.Invoice;
  const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

  return NextResponse.json({
    subscriptionId: subscription.id,
    clientSecret: paymentIntent.client_secret,
  });
}
```

By offloading the recurring logic to Stripe, your Next.js application simply waits for Webhooks to know when a payment succeeds.

## 2. Webhook State Machine (Fulfillment)

When Stripe charges the customer on Day 30, it sends a webhook to your Next.js server. 
You must intercept this webhook and mathematically insert a new `Order` into your database, triggering the warehouse to ship the new bag of coffee.

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    
    // Check if this invoice belongs to a subscription
    if (invoice.subscription) {
      // 1. Mathematically generate a new Order for the warehouse
      await prisma.order.create({
        data: {
          userId: invoice.customer as string,
          stripeInvoiceId: invoice.id,
          totalAmount: invoice.amount_paid,
          status: 'PROCESSING', // Triggers the Inngest 3PL Worker!
          // ...
        }
      });
      
      // 2. Log the retention success
      logger.info({ event: 'SUBSCRIPTION_RENEWAL', invoiceId: invoice.id });
    }
  }
}
```

## 3. Dunning Management (Involuntary Churn)

What happens on Month 4 when the customer's credit card expires? The Stripe charge fails.

A beginner loses the customer forever (Involuntary Churn).
A production system uses **Dunning Management**.

**The Production Solution:**
When Stripe fails to charge the card, it emits an `invoice.payment_failed` webhook. 
Your Next.js server catches this webhook and triggers a sophisticated retry schedule.

1. **Day 0:** Stripe declines. Next.js emails the user: *"Your card expired. Please update it."*
2. **Day 3:** Stripe automatically retries the charge. If it fails, Next.js emails them again.
3. **Day 7:** Stripe retries. If it fails, Stripe mathematically cancels the subscription. Next.js updates the database to `status: CANCELLED`.

## 4. The Self-Service Customer Portal

If a customer wants to skip a month, swap their coffee flavor, or cancel their subscription, they will email you. If you have 10,000 subscribers, you will need to hire 5 full-time support reps just to handle cancellations.

**The Production Solution:**
You must generate a **Stripe Customer Portal** session.

```typescript
// app/api/account/portal/route.ts
const session = await stripe.billingPortal.sessions.create({
  customer: user.stripeCustomerId,
  return_url: 'https://yourstore.com/account',
});
// Redirect the user to this secure URL.
```

Stripe provides a hosted, fully-secure UI where the user can update their credit card, pause their subscription, or cancel it entirely. This reduces your customer support overhead to absolute zero.

---

## ✅ Retention Engineering Checklist

- [ ] Ban manual cron-job recurring billing. Architect Stripe Subscriptions to offload the calendar logic to Stripe's servers.
- [ ] Engineer an `invoice.payment_succeeded` webhook handler to automatically generate new Database Orders for the warehouse every month.
- [ ] Configure strict Dunning Management (Smart Retries) in Stripe to combat Involuntary Churn (expired credit cards).
- [ ] Implement the Stripe Customer Portal to allow 100% self-service subscription management, eliminating support tickets.
- [ ] Use the AI prompt below to generate the rigorous subscription architecture.

---

## AI Prompt — Engineer the Retention Engine

Copy this prompt into your AI to have it generate the mathematical subscription layer.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Growth Engineer. We are engineering our Subscription (Stripe Billing) architecture.

I need you to generate the following strict backend implementations:

**1. The Subscription Checkout Route:**
Write the Next.js API Route (`/api/checkout/subscribe`).
- It must create a `stripe.subscriptions.create` object, rather than a standard PaymentIntent.
- Expand the `latest_invoice.payment_intent` to return the `clientSecret` to the React frontend.
- Explain in Markdown why we must use `payment_behavior: 'default_incomplete'` to enforce Strong Customer Authentication (3DS) on the very first payment.

**2. The Renewal Webhook Handler:**
Write the exact `invoice.payment_succeeded` switch-case block inside our Stripe Webhook handler.
- Show the Prisma query to mathematically generate a new `Order` row so our Inngest warehouse worker knows to ship a new physical product.

**3. The Dunning Configuration Protocol:**
Provide a Markdown checklist detailing exactly how to configure the "Smart Retries" schedule inside the Stripe Dashboard (Settings > Billing > Subscriptions and emails). Explain why waiting 3 days between retries is mathematically optimal for capturing delayed bank funds.
````

**Next: Growth Analytics Engineering →**
