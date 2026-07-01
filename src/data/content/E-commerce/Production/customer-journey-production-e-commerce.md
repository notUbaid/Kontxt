---
title: Customer Journey
slug: customer-journey
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Algorithmic Customer Journeys

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

A beginner designs a customer journey like a static map: *Homepage -> Category Page -> Product Page -> Cart -> Checkout.* 

In a mass-production headless environment, assuming every customer follows a single linear path will destroy your conversion rates. Customers arrive from hundreds of different entry points (TikTok ads, Google Shopping, email newsletters). If a user clicks a highly targeted Instagram ad for a specific red shoe, forcing them through your generic homepage is a massive point of friction.

As an AI-Assisted Architect, you must instruct your AI to build **Dynamic Routing and State Injection**. The journey must adapt algorithmically to the user's specific entry vector.

---

## 1. The "Cold Start" Entry Vector

If a user arrives via a generic Google Search to your Homepage, you have zero data on their intent. This is a "Cold Start."

**The Production Solution:**
You must instruct your AI to implement **Edge-Level Personalization**. 
1. The Next.js Edge Middleware intercepts the request.
2. It reads the user's Geo-IP (e.g., detecting they are in Miami, Florida).
3. The AI must inject this Geo-data into the static HTML. Instead of showing winter coats, the Homepage instantly re-arranges its Algolia search query to prioritize "Summer Swimwear." 

By engineering the journey at the Edge, the user feels like the store was built specifically for them, without sacrificing cache speeds.

## 2. The "High-Intent" Entry Vector (Bypassing the Funnel)

If a user clicks a Google Shopping ad, they have incredibly high intent. They already saw the price and the image on Google. They want to buy.

Do not force them into a long, drawn-out funnel.

**The Production Solution:**
You must instruct your AI to build **Deep Linking and URL Parameter State Injection**.
- If the ad link is `domain.com/products/red-shoe?variant=size10&action=buy_now`
- The Next.js router must parse the `action=buy_now` parameter.
- The React code must instantly hydrate the Cart Zustand store, add the item, and automatically slide open the Cart Drawer (or redirect straight to Checkout) the millisecond the page loads. 
- You have algorithmically eliminated three clicks from the journey.

## 3. The "Cart Abandonment" Re-Entry Vector

When a user abandons a cart and returns three days later via an email reminder, their state must be perfectly preserved.

**The Production Solution:**
You must command your AI to use **Remote State Synchronization**. 
When the user clicked "Add to Cart" three days ago, the frontend sent a background mutation to your Commerce Engine (e.g., Shopify API) to save the cart ID to their email/session. When they click the email link, the URL contains a secure hash of their Cart ID. The frontend instantly fetches the remote cart and restores their session exactly as they left it.

---

## ✅ Customer Journey Checklist

- [ ] Stop thinking of the journey as a linear path; treat it as a matrix of entry vectors.
- [ ] Understand how URL parameters (`?action=buy`) can be used to programmatically skip steps in the funnel.
- [ ] Ensure Cart IDs are synchronized with the backend to enable seamless cross-device cart recovery.
- [ ] Use the AI prompt below to generate the state-injection routing logic.

---

## AI Prompt — Architect Dynamic Journey Routing

Copy this prompt into your AI to have it generate the intelligent routing logic required to manipulate the customer journey programmatically.

````prompt
I am building a production-grade headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Architect. We are engineering dynamic, algorithmic customer journeys based on entry vectors.

I need you to generate the following architectural implementations:

**1. URL Parameter State Injection:**
Write a Next.js Client Component (e.g., `<JourneyInterceptor />`) that runs on the Product Detail Page (PDP). It must use `useSearchParams` to check for `?action=buy_now` or `?apply_discount=10OFF`. Show exactly how it triggers a mutation in our global Zustand cart store to instantly add the item and open the cart drawer on load, skipping the manual "Add to Cart" click.

**2. Geo-Targeted Cold Start (Edge Middleware):**
Write the Next.js `middleware.ts` logic to detect the user's `x-vercel-ip-city` or `country`. Show how to inject this data securely so our Hero component can dynamically request localized "Trending" products from Algolia, without breaking our static ISR cache.

**3. Cart Recovery Hydration:**
Explain the architectural flow for handling a "Cart Recovery" email link. If the URL is `domain.com/recover?cartId=123xyz`, write the SWR or React Query fetch logic that securely hydrates the local Zustand store with the remote cart data from our Commerce Engine.
````

**Next: Wireframes →**
