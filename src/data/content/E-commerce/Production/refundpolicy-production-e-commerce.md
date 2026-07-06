---
title: Refund Policy
slug: refund-policy
phase: Phase 5 Store Launch
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Idempotent Refund Operations & Policy

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner writes a generous "100% Money Back Guarantee - No Questions Asked" policy, and implements a basic `/api/admin/refund` route that calls the Stripe Refund API.

A disgruntled customer clicks the "Request Refund" button three times in rapid succession. The beginner's API executes the Stripe refund three times. The customer originally paid $100, but the beginner just refunded them $300. The beginner's bank account goes negative, and the business collapses.

In a production environment, your Refund Policy is not just a customer service document. It is a strict operational boundary that must be protected by **Idempotency Keys** and **Audit Trails**.

---

## 1. Idempotent API Architecture

As explored in the Payments module, any API route that moves money must be mathematically idempotent. If an API request is duplicated (due to a double-click or a network retry), the server must guarantee that the action only happens exactly once.

**The Production Solution:**
When your Admin Dashboard triggers a refund, it must pass a unique `Idempotency-Key` (usually the `order.id` + `-refund`).

```typescript
// app/api/admin/refund/route.ts
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { orderId, amount, reason } = await req.json();

  try {
    // 1. Mathematically prevent double-refunds using Stripe's Idempotency
    const refund = await stripe.refunds.create({
      payment_intent: 'pi_12345',
      amount: amount, // e.g., 10000 for $100.00
      reason: 'requested_by_customer',
    }, {
      idempotencyKey: `refund_${orderId}` // If Stripe sees this key twice, it ignores the second request!
    });

    // 2. Log the refund in the immutable Audit Trail
    await prisma.auditLog.create({
      data: {
        action: 'ISSUE_REFUND',
        orderId: orderId,
        adminId: 'admin_123',
        amount: amount,
        stripeRefundId: refund.id,
        reason: reason
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

This guarantees that a rogue junior admin or a browser glitch cannot drain your corporate bank account via duplicate API calls.

## 2. Policy Enforcements (The 30-Day Window)

If your policy states "Refunds within 30 days," you cannot rely on human customer service agents to manually check the calendar. Humans make mistakes and approve refunds on day 45.

**The Production Solution:**
Your Refund API route must mathematically enforce the legal policy.

```typescript
// Inside the /api/admin/refund route...

const order = await prisma.order.findUnique({ where: { id: orderId } });

// Calculate the exact milliseconds since the order was placed
const daysSinceOrder = (Date.now() - order.createdAt.getTime()) / (1000 * 60 * 60 * 24);

if (daysSinceOrder > 30) {
  // The API mathematically rejects the refund. The admin physically cannot bypass this.
  return NextResponse.json(
    { error: "Policy Violation: Order is past the 30-day refund window." }, 
    { status: 403 }
  );
}
```

By encoding your legal policy directly into the Node.js business logic, you eliminate human error and prevent margin decay.

## 3. The Front-Facing Policy Document

Your public `/policies/refund` page must explicitly define the mathematical rules of your Next.js backend to prevent customer disputes (chargebacks):
1. **The Window:** Exactly how many days the customer has (e.g., 30 days from delivery).
2. **The Condition:** Must be unwashed, unworn, and in original packaging.
3. **The Timeline:** State explicitly that Stripe takes "5-10 business days" to return the funds to their bank. This prevents customers from issuing a chargeback on Day 2 because they think you scammed them.

---

##  Refund Policy Engineering Checklist

- [ ] Engineer strict Idempotency Keys (`refund_${orderId}`) into all Stripe Refund API calls to mathematically prevent double-refunds.
- [ ] Encode your legal time windows (e.g., 30 days) directly into the Next.js API route logic to physically block policy violations by human admins.
- [ ] Maintain an immutable PostgreSQL Audit Log of every refund issued, including the `adminId` and the exact `reason`.
- [ ] Use the AI prompt below to generate the rigorous refund architecture.

---

## AI Prompt — Engineer the Refund Architecture

Copy this prompt into your AI to have it generate the mathematical refund pipeline.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Payment Engineer. We are engineering our Refund API and Idempotency controls.

I need you to generate the following strict backend implementations:

**1. The Strict Refund Route Handler:**
Write the Next.js API Route (`/api/admin/refund`).
- It must read the `orderId` and `amount`.
- Show the Prisma query that mathematically calculates if `createdAt` is strictly less than 30 days ago. If false, throw a 403 Forbidden.
- Show the exact `stripe.refunds.create` call. 
- You MUST explicitly include the `idempotencyKey` parameter. Explain in Markdown why this is the only way to prevent a double-click from draining the corporate bank account.

**2. The Audit Log Transaction:**
Expand the API route to use a Prisma Transaction.
- If the Stripe refund succeeds, the transaction must update the `Order` status to `REFUNDED`.
- Simultaneously, it must create a row in an `AdminAuditLog` table containing the exact Stripe `refund.id`, preventing untraceable financial movements.
````

**Next: Return Policy & RMA Engineering →**
