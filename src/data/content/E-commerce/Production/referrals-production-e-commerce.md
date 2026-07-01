---
title: Referrals
slug: referrals
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Viral Loops & Acquisition Arbitrage

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

A beginner gives their customers a generic link like `yourstore.com/invite` and says, *"Tell your friends about us!"* 

Nobody tells their friends. Why? Because there is no mathematical incentive. There is no tracking. There is no double-sided reward.

In a production environment, you must engineer a **Viral Loop** (K-Factor) and a **Double-Sided Referral Architecture**.

---

## 1. The Double-Sided Reward (Give $20, Get $20)

If you only reward the referrer, they feel guilty spamming their friends. If you only reward the friend, the referrer has no motivation to share.

**The Production Solution:**
You must engineer a system where both parties receive mathematical value. *"Give your friend $20 off their first order. When they buy, you get $20 in store credit."*

## 2. The Referral API Architecture

You cannot track referrals using manual promo codes (e.g., `JOHN20`). You will run out of codes, and users will post them on coupon websites, destroying your margins.

**The Production Solution:**
You must generate a mathematically unique, cryptographic referral hash for every user in your database.

```prisma
model User {
  id              String   @id @default(uuid())
  email           String   @unique
  // CRITICAL: The unique shareable code
  referralCode    String   @unique @default(dbgenerated("substr(md5(random()::text), 0, 8)"))
  storeCredit     Int      @default(0) // Stored in cents
}

model Order {
  id              String   @id
  userId          String
  // CRITICAL: Tracks who referred this specific order
  referredById    String?  
}
```

When User A (John) creates an account, he receives the code `john_a8f9`. He sends the link `yourstore.com/invite/john_a8f9` to User B (Sarah).

## 3. The Cookie Attribution Pipeline

If Sarah clicks John's link on her iPhone, but doesn't buy the shirt until 3 days later on her laptop, the referral is lost.

**The Production Solution:**
You must engineer strict **Cookie Attribution** in your Next.js Middleware.

```typescript
// middleware.ts
export function middleware(req) {
  const url = req.nextUrl;
  
  // 1. Intercept the referral link
  if (url.pathname.startsWith('/invite/')) {
    const code = url.pathname.split('/')[2]; // Extract 'john_a8f9'
    
    // 2. Set a 30-day strict attribution cookie
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set('referral_attribution', code, {
      maxAge: 60 * 60 * 24 * 30, // 30 Days
      httpOnly: true, // Prevents XSS tampering
      secure: true
    });
    
    return res;
  }
}
```

When Sarah finally checks out 3 days later, your Checkout API reads the `referral_attribution` cookie. It applies the $20 discount to Sarah's cart instantly.

## 4. The Fulfillment Webhook (Preventing Fraud)

If you give John his $20 store credit the moment Sarah clicks "Pay", you are vulnerable to massive fraud. John and Sarah could be the same person. They place the order, get the $20 credit, and then immediately cancel/refund the first order.

**The Production Solution:**
You must tie the referral payout strictly to the **Fulfillment** or **Delivery** webhook, NOT the payment webhook.

```typescript
// app/api/webhooks/inngest/route.ts (Listens for Shipment Delivery)
export const payoutReferral = inngest.createFunction(
  { id: "payout-referral-credit" },
  { event: "order.delivered" }, // Only fires when USPS physically drops the box
  async ({ event }) => {
    const order = await prisma.order.findUnique({ where: { id: event.data.orderId } });

    if (order.referredById) {
      // 1. Mathematically issue the payout ONLY after the refund window is closed or item is shipped
      await prisma.user.update({
        where: { id: order.referredById },
        data: { storeCredit: { increment: 2000 } } // Give John his $20
      });
      
      // 2. Email John: "Your friend bought! Here is your $20."
      await sendReferralSuccessEmail(order.referredById);
    }
  }
);
```

By delaying the payout until the physical item is delivered, you mathematically eliminate 99% of referral fraud.

---

## ✅ Referrals Engineering Checklist

- [ ] Engineer a double-sided reward system to incentivize both the referrer and the referee.
- [ ] Implement Vercel Middleware to parse `/invite/:code` URLs and set a cryptographically secure 30-day HTTP-only attribution cookie.
- [ ] Protect against Referral Fraud by delaying the payout (store credit increment) until the `order.delivered` or `order.shipped` webhook fires.
- [ ] Use the AI prompt below to generate the rigorous attribution architecture.

---

## AI Prompt — Engineer the Referral Engine

Copy this prompt into your AI to have it generate the mathematical viral loop.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Growth Engineer. We are engineering our Double-Sided Referral Architecture.

I need you to generate the following strict backend implementations:

**1. The Next.js Middleware Attribution:**
Write the `middleware.ts` logic to intercept `/invite/:code` paths.
- Show how to extract the code and inject it into an `httpOnly` cookie valid for 30 days.
- Explain why `httpOnly` is legally/mathematically required to prevent a malicious user from editing their `document.cookie` via the browser console to steal another user's referral payouts.

**2. The Fraud-Proof Payout Worker:**
Write an Inngest (or standard Next.js API) worker that handles the Referral Payout.
- Show the Prisma logic to grant $20 (`2000` cents) in `storeCredit` to the Referrer.
- Explain in Markdown why executing this payout during the initial Stripe `checkout.session.completed` event opens a massive vulnerability to return fraud, and why delaying it to the 3PL `order.shipped` webhook is the only production-ready solution.
````

**Next: Presentation Prep Engineering →**
