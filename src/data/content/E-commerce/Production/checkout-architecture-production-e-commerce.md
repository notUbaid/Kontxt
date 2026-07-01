---
title: Checkout Architecture
slug: checkout-architecture
phase: Phase 2 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 25-35 min
---

# Single-Page Checkout (SPA) Architecture

**Estimated Time:** 30 Minutes

Beginners build a checkout flow like a 2005 website: Page 1 (Cart) -> Load -> Page 2 (Shipping) -> Load -> Page 3 (Payment) -> Load. 

In a modern production environment, every time the browser reloads, you lose a mathematical percentage of your customers to network stutters, distractions, or impatience. 

As an AI-Assisted Architect, if you are opting to build a custom API checkout (instead of using Shopify's hosted checkout), you must instruct your AI to engineer a **Single-Page Application (SPA) Checkout**. The entire process must happen within a single React component, relying on background API mutations to create a frictionless, app-like experience.

---

## 1. The SPA State Machine

If all checkout steps happen on one page, the React component must manage complex states: `IDLE`, `VALIDATING`, `FETCHING_RATES`, `PROCESSING_PAYMENT`, `SUCCESS`, `ERROR`.

If you let your AI manage this with 15 different `useState` boolean flags (`isShippingLoading`, `isPaymentLoading`, `isError`), the code will become an unreadable, buggy mess.

**The Production Solution:**
You must instruct your AI to use a **Finite State Machine (FSM)** pattern within a `useReducer` or Zustand. 
At any given moment, the checkout can only be in *one* explicitly defined state. If it is in the `PROCESSING_PAYMENT` state, it is mathematically impossible for the user to edit their shipping address, preventing catastrophic race conditions.

## 2. Dynamic Shipping Rate Injection

When a user types their Zip Code, the frontend must instantly fetch the available shipping rates (e.g., UPS Ground $5, FedEx Overnight $15) without reloading the page.

**The Production Solution:**
You must instruct your AI to debounce the Zip Code input. 
- When the user types "90210", the frontend waits 500ms, then silently sends a background request (via SWR or React Query) to your Next.js `/api/shipping` route. 
- The API pings the courier, returns the rates, and instantly injects them into the React UI as selectable radio buttons.
- Selecting a radio button instantly updates the global cart subtotal via React state.

## 3. Idempotent Payment Capture

The moment the user clicks "Pay" is the most dangerous millisecond in your architecture. If they are on a subway, and their 4G connection stutters, their browser might send the "Charge Card" request twice.

**The Production Solution:**
You MUST enforce **Idempotency**.
Instruct your AI to generate a unique UUID (Idempotency Key) the moment the checkout component mounts. 
When the final `fetch` request is sent to capture the payment, this UUID is included in the headers. If Stripe or Shopify receives the same UUID twice, they will recognize it as a network error, safely ignore the second request, and return the original success receipt. This mathematically prevents double-charges.

---

## ✅ Checkout Architecture Checklist

- [ ] Consolidate the entire checkout flow into a single React component (SPA) to prevent browser reloads.
- [ ] Enforce a Finite State Machine (`useReducer` or Zustand) to manage the complex checkout states safely.
- [ ] Debounce the shipping rate API calls to prevent rate-limiting when users type their zip codes.
- [ ] **MANDATORY:** Enforce Idempotency Keys on the final payment mutation to prevent double-charging users.

---

## AI Prompt — Architect the SPA Checkout

Copy this prompt into your AI to have it generate the highly secure, state-managed code required for a flawless custom checkout.

````prompt
I am building a headless e-commerce store with Next.js. I need you to act as my Principal Checkout Architect. We are building a custom Single-Page Application (SPA) Checkout flow.

This must be a zero-reload, highly fault-tolerant React component.

I need you to generate the following architectural implementations:

**1. The Finite State Machine (FSM):**
Write the TypeScript `useReducer` logic (or Zustand store) that manages the checkout state. Define the strict states (`ENTERING_INFO`, `FETCHING_RATES`, `PROCESSING_PAYMENT`, `SUCCESS`, `ERROR`). Explain how this FSM prevents race conditions (e.g., disabling address inputs while payment is processing).

**2. Debounced Shipping Rate Fetcher:**
Write the React client logic that listens to the `zipCode` input. Implement a 500ms debounce. Show the background `fetch` request that pings our `/api/shipping` route, and show how the returned array of rates (e.g., Standard vs Expedited) updates the FSM state to display radio buttons.

**3. The Idempotent Payment Mutation:**
Write the final `handlePaymentSubmit` function. 
- Show how to generate a unique UUID `Idempotency-Key` and pass it in the Headers.
- Show the `try/catch` block that handles network timeouts gracefully, ensuring the button returns to an active state with an Error Toast, rather than freezing the app permanently.
````

**Next: Payment Architecture →**
