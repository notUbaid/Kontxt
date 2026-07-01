---
title: Loading States
slug: loading-states
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Loading States & Perceived Performance

**Estimated Time:** 25 Minutes

A beginner looks at a slow website and says, *"Let's add a spinning wheel so they know it's loading."*

A Principal Architect looks at a slow website and says, *"Let's manipulate human psychology so they don't even realize it's loading."*

In a mass-production headless environment, true performance is measured by Core Web Vitals (like Time to First Byte). But **Perceived Performance**—how fast the site *feels* to the human brain—is managed entirely through Loading States. 

As an AI-Assisted Architect, you must completely ban the use of generic full-page "Spinners" and instruct your AI to engineer predictive, optimistic UIs.

---

## 1. Skeleton Loaders (Layout Stability)

If you use a spinning wheel while fetching data, the DOM (Document Object Model) is empty. When the data finally arrives, the entire page jumps as images and text are suddenly injected. This causes severe Cumulative Layout Shift (CLS).

**The Production Solution:**
You must instruct your AI to use **Skeleton Loaders**. 
If a product grid is fetching 12 items, the AI must instantly render 12 grey, pulsating rectangles that perfectly match the dimensions of the final product cards. 
- The user's brain perceives the site as "ready."
- The layout is mathematically locked in place, so when the real data arrives, it swaps seamlessly with zero layout shift.

In Next.js, this is achieved effortlessly using the `loading.tsx` file in the App Router.

## 2. Optimistic UI Mutations (The Magic Trick)

When a user clicks "Add to Cart", a beginner's app will show a spinner on the button, wait 500ms for the Shopify API to respond, and then update the cart icon from `0` to `1`. 

That 500ms delay makes the site feel sluggish.

**The Production Solution:**
You must instruct your AI to implement an **Optimistic UI Mutation**.
When the user clicks the button, the Next.js frontend instantly updates the cart icon from `0` to `1` on the screen, assuming the API call will succeed. It feels instantaneous.
- In the background, the actual network request is sent. 
- If the request succeeds, nothing changes (the UI is already correct).
- If the request fails (e.g., the item sold out), the UI instantly reverts back to `0` and fires a Toast Error: *"Sorry, this item just sold out!"*

By predicting the success, you engineer a 0ms perceived latency.

## 3. Pre-Fetching on Hover

Why wait for a user to click a link before you start loading the data?

You must instruct your AI to leverage Next.js `<Link prefetch={true}>` and SWR's `preload` capabilities. When the user's cursor simply *hovers* over the "Mens Apparel" category link, the frontend silently fires the API request in the background. 

By the time their finger clicks the mouse 300 milliseconds later, the data is already in the cache, and the page transition is instant.

---

## ✅ Loading States Checklist

- [ ] Ban the use of full-page loading spinners; commit entirely to Skeleton Loaders.
- [ ] Understand the psychological power of Optimistic UI mutations for adding items to the cart.
- [ ] Ensure pre-fetching is enabled on all critical navigation links to achieve near-zero latency page transitions.
- [ ] Use the AI prompt below to generate the exact Next.js loading architectures.

---

## AI Prompt — Architect Perceived Performance

Copy this prompt into your AI to have it generate the complex state management required to make your store feel instantaneous.

````prompt
I am building a production-grade headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Architect. We are engineering our Loading States to maximize "Perceived Performance."

Full-page loading spinners are strictly forbidden.

I need you to generate the following architectural implementations:

**1. The Next.js Skeleton Router (`loading.tsx`):**
Write the Next.js `loading.tsx` file for our main Product Listing Page (PLP). It must render a CSS Grid of `<SkeletonCard />` components that perfectly match the dimensions of our actual product cards to ensure zero Cumulative Layout Shift (CLS) while the server fetches the Algolia index.

**2. The Optimistic UI Cart Mutation:**
Write the client-side submit handler for the "Add to Cart" button. You MUST use an Optimistic UI pattern. 
- Show exactly how we update the global Zustand cart state to visually add the item instantly (0ms latency).
- Show how the background `fetch` to the Commerce Engine (e.g., Shopify) is executed.
- Show the rollback logic: If the `fetch` fails (e.g., 500 Error), how does the code revert the Zustand state and trigger a global error Toast?

**3. Intent-Driven Pre-fetching:**
Explain the exact Next.js `<Link>` configuration and SWR pre-fetching techniques we must use to begin downloading a Product Detail Page (PDP) the moment a user's cursor hovers over the link on desktop.
````

**Next: Cart Architecture →**
