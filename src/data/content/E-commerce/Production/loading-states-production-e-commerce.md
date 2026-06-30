---
title: Loading States
slug: loading-states
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 15–25 min
---

# Loading States

In e-commerce, perception of speed is often more important than actual speed. If a user clicks "Add to Cart" and the UI freezes for 800ms while the backend API processes the request, the user assumes the site is broken and will frantically click the button 5 more times. 

Production Loading States are engineered to manage user anxiety and prevent catastrophic edge cases (like double-charging a credit card).

---

## 1. Optimistic UI (The Instant Cart)

You cannot wait for the database to confirm a standard action before updating the UI.

**The Implementation:**
When a user clicks "Add to Cart", implement **Optimistic Updates** (using a data-fetching library like React Query or SWR).
1. The user clicks "Add to Cart".
2. The UI instantly updates the Cart counter from `0` to `1` and opens the Cart Drawer.
3. In the background, the API request is sent to Redis/Postgres.
4. If the API succeeds (99% of the time), the UI remains as is. If the API fails (e.g., item out of stock), the UI rolls back the cart counter to `0` and displays an Error Toast.

This makes the site feel 100x faster than traditional server-rendered architectures.

---

## 2. Skeleton Screens vs Spinners

A full-page loading spinner is a massive UX failure. It tells the user: "I have no idea what is about to load, please wait."

**The Production Standard:**
Use **Skeleton Screens**.
- When navigating to a Category page, do not show a spinning circle.
- Instantly render the layout structure (Header, Sidebar, and a grid of gray boxes where the Product Cards will eventually appear).
- This creates the psychological illusion that the page has already loaded, and only the specific data is missing. It reduces perceived latency by up to 30%.

---

## 3. The Payment Gateway "Lock"

Optimistic UI is strictly banned for payments. You cannot tell a user their order succeeded before Stripe actually captures the funds.

**The Engineering Constraint:**
When a user clicks "Submit Order", the UI must enter a locked, definitive loading state.
- **Visual Feedback:** The button text must change from "Pay $100" to a spinning indicator with the text "Processing Securely...".
- **The Lock:** The button MUST be dynamically disabled (`<button disabled={isProcessing}>`) the exact millisecond it is clicked. This prevents the user from double-clicking the button during the 2 seconds it takes Stripe to process the API request, which would otherwise result in a double-charge.

---

## AI Prompt — Architect Your Loading UX

```prompt
I am engineering the loading states and perceived performance architecture for a production e-commerce application.

Tech Stack:
- Frontend: [e.g., Next.js, React Query]
- Cart API: [e.g., Redis]
- Payments: [e.g., Stripe]

Act as a Principal Frontend Engineer:
1. Explain the exact mechanism of an Optimistic Update in React Query. How do we instantly update the Cart UI when a user clicks "Add to Cart" while simultaneously managing a rollback if the Redis API request fails?
2. Design the Skeleton Screen architecture for a Product Category page. Why is this mathematically superior to a full-page loading spinner in reducing bounce rates?
3. Detail the strict React state management required for the "Submit Order" button to ensure the button is instantly disabled on click, preventing double-charge API collisions during the Stripe latency window.
```

---

## Loading States Checklist

- [ ] Optimistic UI Updates implemented for low-risk actions (Add to Cart, Wishlist toggles) to make the site feel instantaneous
- [ ] Skeleton Screens integrated for all heavy data-fetching routes (Category grids, Search results) instead of full-page spinners
- [ ] Strict Button-Locking state management enforced on the Checkout "Submit" button to prevent double-charging
- [ ] Clear micro-copy ("Processing Securely...") engineered into payment loading states to reduce user anxiety
