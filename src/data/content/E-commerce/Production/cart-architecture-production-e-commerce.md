---
title: Cart Architecture
slug: cart-architecture
phase: Phase 2 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Asynchronous Cart Architecture

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

A beginner builds a shopping cart by saving the selected items in a browser Cookie or local state. When the user clicks "Checkout", the frontend sends the Cookie to the server to process the payment.

In a production environment, trusting the client's browser with the cart state is a massive security vulnerability. If the price is stored in a cookie, a malicious user can open Chrome DevTools, change the price of a TV from `$1000` to `$1`, and checkout. 

As an AI-Assisted Architect, you must instruct your AI to build a **Server-Authoritative Cart**. The browser is merely a dumb terminal that displays whatever the server allows it to display.

---

## 1. The Server-Authoritative Cart Mutation

When a user clicks "Add to Cart", the Next.js frontend does NOT calculate the new total. 

**The Production Solution:**
1. The Next.js frontend sends a mutation (via GraphQL or REST) to the Commerce Engine (Shopify/Swell) passing only the `Variant ID` and the `Quantity`.
2. The Commerce Engine securely calculates the new subtotal, applies active discounts, and verifies inventory.
3. The Commerce Engine returns a unique `cartId` and the mathematically verified subtotal to the frontend.
4. The frontend saves the `cartId` in `localStorage` or an `HttpOnly` cookie.

This guarantees that no user can ever hack the price, because the frontend has zero authority over the math.

## 2. Optimistic UI (Hiding the Latency)

The Server-Authoritative model is secure, but it is slow. It takes ~300ms to ping the Commerce Engine and get the new total back. If the user clicks "Add to Cart" and nothing happens for 300ms, they will click it again, accidentally adding two items.

**The Production Solution:**
You must instruct your AI to implement **Optimistic UI with Zustand**.
- The instant the user clicks the button, the Zustand global state updates the UI locally, making the Cart Icon instantly jump from `0` to `1`. 
- In the background, the secure server mutation happens.
- If the server rejects it (e.g., item sold out), the Zustand state instantly rolls back to `0` and fires an Error Toast.

This achieves mathematically perfect security while maintaining a 0ms perceived latency for the user.

## 3. Background Cart Hydration (SWR)

When a user opens your website in a new tab, the cart must instantly reflect their previous session.

Do not let your AI execute a blocking Server-Side Render (SSR) to fetch the cart. This destroys edge caching.

**The Production Solution:**
The page loads instantly from the Edge Cache (showing an empty cart or a Skeleton). Next.js immediately reads the `cartId` from `localStorage` and uses **SWR** to ping the Commerce API in the background. The real cart slides into place within milliseconds. 

---

## ✅ Cart Architecture Checklist

- [ ] Enforce the Server-Authoritative rule: The frontend never calculates totals or prices.
- [ ] Implement Optimistic UI using Zustand to hide network latency from the user.
- [ ] Ensure cart state is hydrated purely on the client-side (via SWR) to protect the static ISR HTML cache.
- [ ] Use the AI prompt below to generate the exact Zustand and GraphQL architecture.

---

## AI Prompt — Architect the Optimistic Cart

Copy this prompt into your AI to have it generate the highly complex, secure cart mutation architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Architect. We are building the Asynchronous Cart Architecture.

The cart must be Server-Authoritative (secure) but utilize Optimistic UI (0ms perceived latency).

I need you to generate the following architectural code:

**1. The Zustand Optimistic Store:**
Write a Zustand store (`useCartStore.ts`) that manages the local UI state. Include an `addOptimisticItem` action that instantly updates the UI, and a `rollbackCart` action in case the server mutation fails.

**2. The Server-Authoritative Mutation:**
Write the Client-Side handler for the "Add to Cart" button. 
- Show exactly how it calls `addOptimisticItem` first.
- Show the `fetch` request that sends the `variantId` to our Commerce Backend (e.g., Shopify Storefront API `cartLinesAdd`).
- Show the `try/catch` block that either commits the server's verified subtotal to Zustand upon success, or triggers the `rollbackCart` action and a Toast notification if the server throws an error (e.g., out of stock).

**3. SWR Background Hydration:**
Explain how we use SWR in a global `<CartProvider />` component to silently ping the Commerce Backend on `window.focus` to ensure the local Zustand cart is always perfectly in sync with the server.
````

**Next: Checkout Architecture →**
