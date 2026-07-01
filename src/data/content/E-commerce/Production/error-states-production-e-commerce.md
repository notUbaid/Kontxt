---
title: Error States
slug: error-states
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Global Error State Topography

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

Beginners assume that if they write good code, errors won't happen. 

In a decoupled, headless production environment, errors are a mathematical certainty. Your Next.js frontend relies on a Shopify backend, an Algolia search index, a Stripe payment gateway, and a SendGrid email API. If *any* of those third-party services experience an outage, your UI will break.

If a beginner's site encounters a Stripe timeout, the whole screen goes white, the browser console flashes red, and the user thinks they were just scammed out of $100. 

As an AI-Assisted Architect, you must instruct your AI to build **Fault-Tolerant Error Boundaries**. The user must never see a broken screen.

---

## 1. Next.js Error Boundaries (`error.tsx`)

In the Next.js App Router, you can isolate failures so they don't crash the entire page.

If the "Product Reviews" API goes down and throws a 500 Error, the entire Product Detail Page (PDP) should not crash. 
You must instruct your AI to wrap the `<ReviewsWidget />` in a React `ErrorBoundary` (or Next.js `error.tsx` file for specific routes). 

If the fetch fails, only that specific widget crashes. The AI will render a localized fallback UI (e.g., *"Reviews temporarily unavailable"*), while the rest of the page (the Add to Cart button, the images, the description) continues functioning perfectly.

## 2. Mutational Error Handling (The Checkout)

When a user clicks "Pay", they are executing a **Mutation**. This is the most dangerous moment in e-commerce.

If the Stripe API times out, you cannot simply show a generic *"Something went wrong"* popup. The user will panic, refresh the page, and try to pay again, resulting in a duplicate charge.

**The Production Solution:**
You must instruct your AI to implement highly specific, state-aware error handling for the checkout mutation:
1. **Disable the Button:** The instant the user clicks "Pay", the button MUST be mathematically disabled (`disabled={isSubmitting}`) to prevent double-clicks.
2. **Specific Feedback:** If the API returns a `402 Payment Required` (card declined), the UI must highlight the exact field (e.g., the CVC code) that failed.
3. **Idempotency Keys:** The AI must generate a unique UUID for the transaction. If the user's internet drops and their browser sends the checkout request twice, Stripe will recognize the duplicate UUID and only charge them once.

## 3. Global Toast Notifications

For non-critical background errors (e.g., a user clicks a "Wishlist" button but they are offline), you do not want to interrupt their shopping experience with a massive modal.

You must instruct your AI to use a **Global Toast System** (like Sonner or React Hot Toast). The UI will gracefully slide a small notification into the corner of the screen: *"Failed to add to wishlist. Please check your connection."*

---

## ✅ Error States Checklist

- [ ] Enforce the use of Next.js `error.tsx` and React Error Boundaries to prevent full-page crashes.
- [ ] Understand the concept of Idempotency Keys to prevent duplicate charges during checkout network failures.
- [ ] Implement a Global Toast system for non-critical, background errors.
- [ ] Use the AI prompt below to generate the fault-tolerant error boundaries.

---

## AI Prompt — Architect Fault-Tolerant Error Boundaries

Copy this prompt into your AI to have it generate the complex, fault-tolerant infrastructure required to protect your users from third-party API outages.

````prompt
I am building a production-grade headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Architect. We are engineering our Global Error State Topography.

Third-party APIs will fail. We must build fault-tolerant boundaries so the user never sees a white screen or a generic crash.

I need you to generate the following architectural implementations:

**1. The Localized Error Boundary (`error.tsx`):**
Write the Next.js `error.tsx` component. Explain exactly how this file works in the App Router to catch errors within specific nested layouts (e.g., catching a failed CMS fetch on the Product Page) while allowing the global navigation and footer to remain interactive. Include a "Try Again" button that utilizes the `reset()` function.

**2. The Idempotent Checkout Mutation:**
Write the client-side submit handler function for our Checkout form. 
- You MUST include `isSubmitting` state to disable the button instantly.
- You MUST generate a unique `Idempotency-Key` (UUID) in the headers of the fetch request to prevent duplicate charges if the network stutters.
- Show how to parse a `402` or `500` error response and display it safely to the user without crashing the app.

**3. The Global Toast System:**
Show the exact configuration for integrating a toast library (e.g., `sonner`) into the root `layout.tsx` for handling non-fatal background errors gracefully.
````

**Next: Loading States →**
