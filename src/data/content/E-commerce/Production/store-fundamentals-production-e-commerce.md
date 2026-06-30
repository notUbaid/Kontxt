---
title: Store Fundamentals
slug: store-fundamentals
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Store Fundamentals

In production e-commerce, the "Fundamentals" are the strict architectural constraints that govern how data moves between the customer, the warehouse, and the bank. 

If you violate these fundamentals—for instance, by treating a shopping cart as a persistent database record rather than an ephemeral state machine—your infrastructure will eventually buckle under scale, leading to overselling inventory or massive data corruption.

---

## 1. The Headless Commerce Architecture

At production scale, a monolithic platform (where Shopify controls both your database and your frontend UI) limits your engineering velocity and your page performance.

**The Production Standard (Headless):**
You must decouple the frontend from the backend.
- **Frontend (The Glass):** A React-based framework like Next.js or Remix, hosted at the Edge (e.g., Vercel). This provides sub-second page loads, Custom UI configurators, and complete control over Core Web Vitals.
- **Backend (The Engine):** A headless commerce API (e.g., MedusaJS, Swell, Commerce.js, or Shopify Plus via Storefront API). This handles the heavy lifting of PCI compliance, Tax calculations, and Inventory deduction.
- **The Bridge:** The frontend communicates with the backend exclusively via strict GraphQL or REST APIs.

---

## 2. The Golden Rule of Inventory

The most critical fundamental in e-commerce is: **Do Not Sell What You Do Not Have.** 
Overselling destroys customer trust, incurs chargeback fees, and breaks your fulfillment pipeline.

**The Implementation Constraints:**
1. **Source of Truth:** Your commerce database (e.g., Postgres or Shopify) is the absolute source of truth for inventory. The frontend UI must never cache inventory numbers for longer than a few minutes.
2. **Atomic Operations:** When a user checks out, the inventory deduction must be atomic. If two users try to buy the last pair of shoes at the exact same millisecond, the database must use row-level locks or transactional boundaries to guarantee one succeeds and one fails gracefully.
3. **Available to Promise (ATP):** Your database must track physical stock minus pending orders. If you have 10 shirts, and 2 are sitting in unfulfilled orders, your ATP is 8. The frontend must only ever see the number 8.

---

## 3. The Anatomy of an Order State Machine

An order is not a static document. It is a living entity that moves through a strict State Machine.

**The Critical States:**
- `CREATED`: The user hit the checkout page, but no payment has been made.
- `AUTHORIZED`: The credit card was validated and a hold was placed, but funds are not captured.
- `CAPTURED / PAID`: Funds have successfully transferred. The order is now legally binding.
- `FULFILLING`: The payload has been sent to the 3PL (Warehouse) via Webhook.
- `SHIPPED`: The 3PL replied with a tracking number.
- `REFUNDED`: The transaction was fully or partially reversed.

If your code allows an order to jump from `CREATED` directly to `FULFILLING` without hitting the `PAID` state, you will ship free products and bankrupt the business.

---

## AI Prompt — Validate Your Fundamentals

```prompt
I am establishing the fundamental architectural constraints for a production e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js App Router]
- Commerce API: [e.g., Shopify Plus / MedusaJS]
- Database: [e.g., Postgres]

Act as a Principal E-Commerce Architect:
1. Diagram the data flow for a "Headless" architecture, explaining exactly how the Next.js frontend fetches product data securely from the Commerce API without exposing sensitive admin tokens.
2. Write the SQL transaction or Prisma logic required to execute an Atomic Inventory Deduction for a high-traffic flash sale, ensuring we never oversell the last item.
3. Define the strict State Machine for an Order lifecycle, explicitly detailing the API triggers that move the order from `PAID` to `FULFILLING` to `SHIPPED`.
```

---

## Store Fundamentals Checklist

- [ ] Headless Architecture evaluated and selected to guarantee high-performance frontend metrics (Core Web Vitals)
- [ ] Atomic inventory deduction mechanisms documented to prevent overselling during high-traffic events
- [ ] Available to Promise (ATP) logic clearly defined vs raw physical warehouse stock
- [ ] Order State Machine explicitly mapped out (from `CREATED` to `SHIPPED` to `REFUNDED`)
- [ ] Safeguards implemented to prevent any order from entering the `FULFILLING` state before `PAID` is verified
