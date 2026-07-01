---
title: Loyalty Programs
slug: loyalty-programs
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# VIP Tiering & Point Economics

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner installs a free "Loyalty Points" plugin. They give customers 1 point for every $1 spent. They allow customers to redeem 100 points for a $10 discount. 

The beginner just mathematically gave away 10% of their gross revenue. If their profit margin was only 15%, they just bankrupted their entire business by giving away their margin in fake internet points.

In a production environment, Loyalty Programs are not about generosity. They are a strict **Economic Engine** designed to lock customers into your ecosystem, increase switching costs, and protect your margins.

---

## 1. The Point Economy Mathematics

You must engineer the exact exchange rate of your Point Economy to ensure it drives Lifetime Value (LTV) without eroding your Net Margin.

**The Production Solution:**
The industry standard formula is a **1% to 3% Value Back** system.

- **Earning Rule:** 1 Point per $1 spent.
- **Redemption Rule:** 100 Points = $1.00 Discount (This is a 1% return).

If a customer spends $500, they earn 500 Points. They can redeem those points for a $5 discount on their next order. You secured $500 in revenue, and it only cost you $5 (a 1% margin hit) to guarantee they return to your store instead of going to Amazon.

```typescript
// lib/loyaltyEconomics.ts

export const LOYALTY_CONSTANTS = {
  POINTS_PER_DOLLAR_SPENT: 1,
  POINTS_TO_USD_RATIO: 100, // 100 points = $1.00
};

export function calculatePointsEarned(cartTotalUsd: number): number {
  return Math.floor(cartTotalUsd * LOYALTY_CONSTANTS.POINTS_PER_DOLLAR_SPENT);
}

export function calculateUsdDiscount(pointsToRedeem: number): number {
  // Mathematically prevents fractional cents
  return Math.floor(pointsToRedeem / LOYALTY_CONSTANTS.POINTS_TO_USD_RATIO); 
}
```

## 2. Gamification: The VIP Tier Architecture

Points alone are boring. To truly drive retention, you must engineer psychological **Gamification** via VIP Tiers (e.g., Bronze, Silver, Gold).

If a customer is $10 away from unlocking the "Gold Tier" (which grants them free shipping for life), they will mathematically purchase a $15 item they don't even need just to unlock the status.

**The Production Solution:**
Your Prisma database must track `lifetimeSpend` to automatically calculate the user's tier.

```prisma
model User {
  id              String   @id @default(uuid())
  email           String   @unique
  pointsBalance   Int      @default(0)
  // CRITICAL: We track lifetime spend independently of points, 
  // because points can go down (when redeemed), but tiers only go up.
  lifetimeSpend   Float    @default(0.00) 
  tier            VipTier  @default(BRONZE)
}

enum VipTier {
  BRONZE  // $0 - $199
  SILVER  // $200 - $499
  GOLD    // $500+
}
```

When an order succeeds, your Next.js API updates the `lifetimeSpend` and mathematically promotes the user if they cross the threshold.

```typescript
// app/api/webhooks/stripe/route.ts (Order Success logic)
const newLifetimeSpend = user.lifetimeSpend + orderTotal;

let newTier = 'BRONZE';
if (newLifetimeSpend >= 500) newTier = 'GOLD';
else if (newLifetimeSpend >= 200) newTier = 'SILVER';

await prisma.user.update({
  where: { id: user.id },
  data: {
    lifetimeSpend: newLifetimeSpend,
    tier: newTier as VipTier,
    pointsBalance: { increment: calculatePointsEarned(orderTotal) }
  }
});
```

## 3. The Liability Trap (Point Expiration)

From an accounting perspective, unredeemed points are a **Financial Liability** on your balance sheet. If you have 10,000 customers holding $50,000 worth of points, and they all decide to redeem them on Black Friday, your cash flow will collapse.

**The Production Solution:**
You must legally enforce an expiration policy (e.g., "Points expire after 12 months of inactivity"). 

You must write a Next.js Cron Job that scans the database every night. If a user has not made a purchase in 365 days, the cron job mathematically deletes their point balance, instantly wiping the financial liability off your books.

---

## ✅ Loyalty Engineering Checklist

- [ ] Execute strict point economics. Enforce a 1% to 3% value-back ratio to protect Net Margins.
- [ ] Architect a VIP Tier database schema that relies on `lifetimeSpend` rather than `pointsBalance`, ensuring customers don't lose their VIP status when they spend their points.
- [ ] Implement a Next.js Cron Job to mathematically expire unused points after 12 months, protecting your corporate balance sheet from catastrophic liabilities.
- [ ] Use the AI prompt below to generate the rigorous VIP architecture.

---

## AI Prompt — Engineer the Loyalty Engine

Copy this prompt into your AI to have it generate the mathematical point system.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Growth Engineer. We are engineering our VIP Loyalty Point Economy.

I need you to generate the following strict architectural implementations:

**1. The Point Redemption API:**
Write the Next.js API Route (`/api/checkout/redeem-points`).
- It must receive the `pointsToRedeem` from the frontend.
- Query Prisma to verify the user mathematically has enough points in their `pointsBalance`.
- Calculate the exact USD discount (assume 100 points = $1.00).
- Update the Prisma `User` record to decrement the points using an atomic transaction (`decrement: pointsToRedeem`).
- Generate a dynamic Stripe Coupon object on the fly for the exact USD discount amount, and return the Stripe Coupon ID to the frontend to apply to the checkout.

**2. The Liability Expiration Cron:**
Write a mock Vercel Cron Job (`/api/cron/expire-points`).
- Show the Prisma query to find all users whose `lastPurchaseDate` is strictly greater than 365 days ago, AND who have a `pointsBalance > 0`.
- Execute a bulk update to set their `pointsBalance` to 0.
- Explain in Markdown why carrying infinite point balances is an accounting liability that can destroy cash flow during Q4 sales events.
````

**Next: Viral Referral Engineering →**
