---
title: Inventory
slug: inventory
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Inventory Synchronization & Allocation

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

In Phase 2, you architected the theory behind inventory allocation (preventing overselling). Now, in Phase 3, we write the code.

If a beginner builds an e-commerce store, they fetch the inventory count once when the page loads. If the page says "1 Left in Stock", User A and User B both see it. If they both click "Checkout" at the same time, the beginner's Next.js API simply runs `UPDATE inventory SET count = count - 1`. 

Because they didn't use mathematically sound concurrency controls, both checkouts succeed. The database drops to `-1`. You have just oversold your inventory. User B's credit card is charged, but you have no product to ship them.

As an AI-Assisted Architect, you must engineer **Pessimistic Locking**, **Real-Time Edge Validation**, and **Webhook Deduplication**.

---

## 1. Pessimistic Locking (The Concurrency Fix)

You cannot trust basic math operations in a distributed system where multiple users interact with the same database row simultaneously.

**The Production Solution:**
When your Next.js route begins the checkout process, it must tell PostgreSQL to "Lock" the inventory row. 
If User A's checkout function grabs the lock, User B's checkout function must *pause and wait* until User A finishes.

```typescript
// app/api/checkout/capture/route.ts
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { productId, quantity } = await req.json();

  try {
    // 1. Begin a Transaction. Either everything succeeds, or everything rolls back.
    const order = await prisma.$transaction(async (tx) => {
      
      // 2. PESSIMISTIC LOCK: Fetch the inventory, but lock the row so no one else can read it.
      // This mathematically prevents race conditions.
      const inventory = await tx.$queryRaw`
        SELECT count FROM "Inventory" 
        WHERE "productId" = ${productId} 
        FOR UPDATE
      `;

      if (inventory[0].count < quantity) {
        throw new Error('Insufficient Stock');
      }

      // 3. Decrement the stock safely
      await tx.inventory.update({
        where: { productId },
        data: { count: { decrement: quantity } }
      });

      // 4. Create the Order
      return await tx.order.create({ /* ... */ });
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    // If it fails, the transaction rolls back, and the lock is released instantly.
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
}
```

By using `FOR UPDATE` in SQL (which Prisma supports via raw queries or specific extensions), you mathematically eliminate the possibility of overselling.

---

## 2. Real-Time Edge Validation (SWR Polling)

If a product is highly anticipated (e.g., a sneaker drop), the user might sit on the Product Page for 10 minutes. If you fetched the inventory count statically during Build Time (`getStaticProps`), the user thinks the item is in stock when it sold out 9 minutes ago.

**The Production Solution:**
You must use **SWR Polling** inside your Client Component.

```tsx
'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export function AddToCartButton({ productId }: { productId: string }) {
  // 1. Poll the Edge Network every 5 seconds (5000ms) for real-time inventory
  const { data, isLoading } = useSWR(`/api/inventory/${productId}`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true, // Instantly check stock if they switch tabs and come back
  });

  if (isLoading) return <Button disabled>Loading...</Button>;
  
  // 2. If it sold out while they were looking at the screen, immediately disable the button
  if (data?.stockCount === 0) {
    return <Button variant="destructive" disabled>Sold Out</Button>;
  }

  return <Button>Add to Cart</Button>;
}
```

Because your `/api/inventory` route should be deployed to the **Vercel Edge Network**, polling it every 5 seconds takes 10ms and costs practically nothing. The user's screen will instantly update to "Sold Out" the millisecond the last item is purchased by someone else.

---

## 3. Webhook Deduplication (Shopify Sync)

If your main inventory source of truth is Shopify (because you use a 3PL Warehouse that updates Shopify directly), Shopify will send a Webhook to your Next.js application whenever the inventory changes (`inventory_levels/update`).

However, webhook delivery is "At Least Once", not "Exactly Once". 
If the internet stutters, Shopify might send the *exact same webhook* three times. If your code blindly processes it three times, your database becomes corrupted.

**The Production Solution:**
You must use the `x-shopify-webhook-id` header to deduplicate requests.

```mermaid
graph TD
    A[Shopify Webhook Arrives] --> B{Does Webhook ID exist in Redis?}
    B -->|Yes| C[Return 200 OK - Drop Request]
    B -->|No| D[Save Webhook ID to Redis (Expires in 24h)]
    D --> E[Process Inventory Update safely]
```

---

##  Inventory Engineering Checklist

- [ ] Implement `FOR UPDATE` Pessimistic Locking in your PostgreSQL transactions to prevent checkout race conditions.
- [ ] Implement SWR Polling (`refreshInterval`) on the Product Page to ensure real-time "Sold Out" button states.
- [ ] Implement Redis-backed Webhook Deduplication to prevent corrupted inventory counts from Shopify API retries.
- [ ] Use the AI prompt below to generate the rigorous concurrency code.

---

## AI Prompt — Engineer the Inventory System

Copy this prompt into your AI to have it generate the mathematical concurrency systems for your inventory.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Backend Engineer. We are engineering our Inventory Concurrency and Validation layer.

I need you to generate the following rigorous engineering implementations:

**1. The Pessimistic Lock Transaction:**
Write a Next.js Server Action (`captureOrder.ts`) that uses Prisma to decrement inventory and create an order. 
- You MUST use Prisma's interactive transaction (`$transaction`).
- You MUST use `$queryRaw` to execute a `SELECT ... FOR UPDATE` lock on the inventory row.
- Show the exact `catch` block logic that detects the "Insufficient Stock" throw, cleanly rolls back the transaction, and returns a 409 Conflict status.

**2. The Edge Network SWR Poller:**
Write the React Client Component `<StockIndicator productId={id} />`. 
- Use `useSWR` configured with `refreshInterval: 5000` to ping the edge API.
- Use Tailwind to render a flashing red dot and "Only 2 left!" text if the returned stock is less than 5.
- If the stock is 0, render a disabled "Sold Out" badge.

**3. The Redis Webhook Deduplicator:**
Write a utility function `isDuplicateWebhook(webhookId: string)` using Upstash Redis (`@upstash/redis`). Show how to use the Redis `SET` command with the `NX` (Not Exists) and `EX` (Expire in 24h) flags to mathematically guarantee a Shopify webhook is only processed once, even if Shopify fires it three times simultaneously.
````

**Next: Cart Engineering →**
