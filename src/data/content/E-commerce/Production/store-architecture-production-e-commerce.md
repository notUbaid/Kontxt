---
title: Store Architecture
slug: store-architecture
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Enterprise Store Architecture Topology

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

When beginners build a store, they think linearly: *The user clicks "Pay", the server charges the card, the server updates the database, the server sends an email, the server shows the success page.* 

In a massive production environment, a linear architecture is a death trap. If the email API (like SendGrid) crashes or times out for 10 seconds, the entire checkout process freezes, the user panics, and the payment fails. 

As an AI-Assisted Architect, you must command your AI to build an **Event-Driven, Edge-Cached Topology**. The frontend must be lightning fast, and backend mutations must be safely decoupled.

---

## 1. The Edge Computing Topology

In modern headless e-commerce, the physical distance between your user and your server dictates latency. You must instruct your AI to route traffic across three specific tiers.

| Tier | Function | What lives here |
|---|---|---|
| **Tier 1: CDN Cache** | Serves 90% of traffic. Anonymous users browsing products never hit a server; they get pre-compiled HTML from a server 5 miles from their house. | Next.js ISR pages (Home, PLPs, PDPs). |
| **Tier 2: Edge Middleware** | Intercepts requests in sub-10ms. Modifies the request before it reaches the cache (e.g., reading IP for currency injection). | Vercel Edge Functions, Cloudflare Workers. |
| **Tier 3: Origin Serverless** | The heavy lifter. ONLY used when the user mutates state (Logs in, Adds to Cart, Checks out). | Next.js API Routes (`/api/checkout`). |

**The Golden Rule:** Never mutate state on the Edge; never fetch static data from the Origin.

## 2. The Asynchronous Event Bus

To fix the "linear death trap" mentioned above, we use an **Event-Driven Architecture (EDA)**. You will instruct your AI to implement an Event Bus (using tools like Inngest, Kafka, or AWS SQS).

**How it works in Production:**
1. **The Core Mutation:** The user clicks "Pay". The Commerce API captures the payment and decrements inventory. It instantly returns a `200 OK` to the frontend. The user is happy.
2. **The Event Bus:** In the background, the server fires an `order.created` webhook to the Event Bus.
3. **Asynchronous Workers:** Independent background workers listen to the bus and process the side-effects:
   - Worker A sends the receipt email.
   - Worker B routes the order to the warehouse.
   - Worker C updates the data warehouse.

If the email API goes down, Worker A simply retries in 5 minutes. The user is unaffected, and the transaction is secure.

## 3. Global State Management (Zustand)

Because the backend is distributed, the Next.js frontend must act as the primary brain for the active user session.

You cannot rely on simple React Context, as it triggers unnecessary re-renders that slow down the browser. You must instruct your AI to utilize atomic, subscription-based global state managers like **Zustand**.

The Cart state (items, quantities) must be persisted instantly to `localStorage`. In the background, the UI silently pings the backend (using SWR) to validate the cart (checking if an item sold out while they were away).

---

## ✅ Store Architecture Checklist

- [ ] Memorize the 3 Tiers of Edge Topology (CDN, Middleware, Origin).
- [ ] Enforce the "No Synchronous Side-Effects" rule for the main checkout API.
- [ ] Choose an Event Bus provider (Inngest is highly recommended for Next.js serverless environments).
- [ ] Use the AI prompt below to generate the exact backend worker architecture.

---

## AI Prompt — Architect the Event-Driven Backend

Copy this prompt into your AI to have it design the complex, asynchronous background worker infrastructure that protects your checkout flow.

````prompt
I am building a production-grade headless e-commerce store with Next.js. I need you to act as my Principal Backend Architect. We must eliminate linear, synchronous side-effects from our checkout flow.

We will use an Asynchronous Event Bus (e.g., Inngest or Vercel Background Jobs).

**Generate the following architectural code and configurations:**

1. **The Core Mutation API:**
Write the Next.js API route (`/api/checkout/success`) that captures the payment intent. Show exactly how it fires an `order.created` event to the Event Bus and immediately returns a `200 OK` to the client WITHOUT waiting for emails or 3PL routing.

2. **The Background Workers:**
Write the code for two separate background workers listening to the `order.created` event:
- **Worker A (Email):** Sends the order confirmation email via Resend/SendGrid. Include exponential backoff retry logic if the API fails.
- **Worker B (Logistics):** Formats the payload and routes it to the 3PL API (e.g., ShipBob) for fulfillment.

3. **Global State Hydration:**
Write the Zustand store configuration that persists the cart to `localStorage`, and demonstrate how to use SWR to silently revalidate that cart state against the backend on window focus.
````

**Next: Design Systems →**
