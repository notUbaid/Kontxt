---
title: Fraud Prevention
slug: fraud-prevention
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Fraud Prevention & Card Testing Defense

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner wakes up to an email from Stripe: *"Your account has been terminated due to excessive fraud."* 

What happened? A hacker bought a list of 10,000 stolen credit cards on the dark web. They don't know which cards are active. They wrote a bot to visit your beginner store and attempt to buy a $1 sticker 10,000 times. If the charge goes through, they know the card works. 

Stripe charges you 30 cents for every failed attempt. You just lost $3,000 in authorization fees overnight, and Stripe banned you for enabling a "Card Testing" attack.

In Phase 4, you must engineer a mathematical fortress against fraud using **Velocity Checks**, **Stripe Radar Rules**, and **Device Fingerprinting**.

---

## 1. Velocity Checks (The Mathematical Defense)

A normal human might fail to enter their credit card correctly two times. They will never fail 50 times in one minute.

**The Production Solution:**
In addition to the global Rate Limiting we engineered earlier, you must implement a strict **Payment Velocity Check** in Redis.

```typescript
// app/api/checkout/route.ts
import { redis } from '@/lib/redis';

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for");
  
  // 1. Check how many FAILED payments this IP has made today
  const failedAttempts = await redis.get(`failed_payments_${ip}`);

  // 2. Mathematically block them if they fail 5 times
  if (failedAttempts && parseInt(failedAttempts) > 5) {
    // Write to security audit log
    logger.warn({ event: 'CARD_TESTING_BLOCKED', ip });
    
    // Return a fake 200 OK so the bot doesn't know it's blocked, 
    // slowing down their attack vectors.
    return NextResponse.json({ error: "Card declined by issuer." });
  }

  try {
    const charge = await stripe.charges.create({ ... });
  } catch (error) {
    if (error.code === 'card_declined') {
      // 3. Increment the failure count for this IP
      await redis.incr(`failed_payments_${ip}`);
      await redis.expire(`failed_payments_${ip}`, 86400); // Reset after 24h
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
```

This prevents the bot from spamming the Stripe API, protecting your authorization fee metrics and keeping your account in good standing.

## 2. Stripe Radar Rules

Stripe has an AI fraud detection system called Radar. It knows if a credit card was just used successfully in Tokyo 5 minutes ago, and is now being used on your site from an IP address in London.

**The Production Solution:**
You must go into your Stripe Dashboard and configure custom Radar Rules to mathematically block high-risk transactions before they even hit the bank.

**Example Rules to write:**
- `Block if :risk_level: = 'highest'`
- `Block if :card_country: != :ip_country:` (Blocks a Russian IP using an American credit card)
- `Review if :amount_in_usd: > 1000` (Flags high-value orders for manual human review)

If a transaction is flagged for `Review`, Stripe will authorize the funds but will NOT capture them. The order state in your database remains `FRAUD_HOLD`. You manually review it, and if it looks legit, you click "Capture" in Stripe.

## 3. AVS and CVC Enforcement

The Address Verification System (AVS) checks if the Zip Code the user typed matches the Zip Code registered with the bank.

**The Production Solution:**
You must configure Stripe to strictly decline any charge where the CVC (the 3 digits on the back) or the AVS Zip Code fails, even if the bank approved the charge. Fraudsters often have stolen card numbers, but they rarely have the correct physical zip code.

---

##  Fraud Engineering Checklist

- [ ] Engineer a strict Redis Velocity Check to mathematically block IP addresses that fail more than 5 payments, defeating Card Testing botnets.
- [ ] Configure custom Stripe Radar rules to block transactions where the IP country does not match the Card Issuing country.
- [ ] Enforce strict CVC and AVS (Zip Code) matching to block stolen numbers.
- [ ] Use the AI prompt below to generate the rigorous fraud defense mechanisms.

---

## AI Prompt — Engineer the Fraud Defenses

Copy this prompt into your AI to have it generate the mathematical fraud fortress.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Fraud Prevention Engineer. We are engineering our Card Testing and Radar defenses.

I need you to generate the following strict security implementations:

**1. The Redis Velocity Enforcer:**
Write a Next.js Server Action (`executePayment.ts`). 
- It must connect to Upstash Redis.
- Show the exact logic to read a key like `card_declines:${ipAddress}`.
- If the value is > 3, use a `fakeDelay(2000)` to slow the bot down (Tarpitting), and then return a generic error.
- Show the `catch` block on the Stripe API call that increments this Redis key only when the specific error code is `card_declined`.

**2. The Radar Webhook Processor:**
Write the `/api/webhooks/stripe` route handler segment that listens for the `review.opened` event (triggered when Stripe Radar flags a payment for manual review).
- Show how it updates our PostgreSQL database order status to `FRAUD_HOLD`.
- Show how it triggers a high-priority Slack alert to the operations team with the order details and the Radar risk score.

**3. Radar Rule Architecture:**
Provide a Markdown list of the 5 exact Stripe Radar Rules (using Stripe's syntax, e.g., `:risk_level:`) I should configure in my dashboard to automatically block proxies, VPNs, and mismatched geographic origins.
````

**Next: Scalability Engineering →**
