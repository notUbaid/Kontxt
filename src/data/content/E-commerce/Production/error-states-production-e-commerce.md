---
title: Error States
slug: error-states
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Error States

In production e-commerce, errors are guaranteed. The Stripe API will timeout. The 3PL will run out of stock during a checkout sequence. The user will type a letter into the ZIP code field.

If your UI handles these errors gracefully, the user will try again. If your UI crashes, freezes, or throws a cryptic `500 Server Error`, the user will abandon their cart forever. Engineering robust Error States is the most critical defensive measure in front-end development.

---

## 1. Checkout Validation (The Inline Rule)

The checkout form is where 80% of data-entry errors occur. 

**The Anti-Pattern:** A user fills out a 15-field form, clicks "Submit", the page reloads, and a generic red banner at the top says "Please correct your errors." The user has no idea which field failed.

**The Production Standard:**
Implement strict, real-time Inline Validation (using a library like `React Hook Form` and `Zod`).
- As the user types their credit card, the UI instantly verifies the Luhn algorithm. If invalid, the specific input field border turns red and a helper text appears *immediately below it*: "Invalid Card Number."
- **Focus Management:** If a user clicks "Submit" and there is a hidden error, the browser must programmatically scroll the user up to the exact field that failed and apply `:focus` to it.

---

## 2. API Failure (Graceful Degradation)

If your external Product Recommendation API (e.g., Algolia Recommend) goes down, it should not crash the Product Detail Page (PDP).

**The Implementation:**
Use **Error Boundaries** in React and **Graceful Degradation** logic.
- Wrap the `<RelatedProducts />` component in a React Error Boundary.
- If the Algolia API returns a `503 Service Unavailable`, the Error Boundary catches the exception.
- Instead of showing a crash screen, the component silently fails and hides itself. The user can still buy the main product, completely unaware that a secondary system is currently broken.

---

## 3. The "Out of Stock" Cart Collision

This is the most complex edge case in e-commerce.
1. User A and User B both have the last 1 pair of shoes in their cart.
2. User A clicks "Pay" 500ms before User B. User A gets the shoes.
3. User B clicks "Pay". The database rejects the transaction.

**The UX Implementation:**
You cannot just show a generic "Error." You must explain exactly what happened.
- The UI must intercept the `409 Conflict` from the backend API.
- The UI must render a specific Modal: "We're sorry! Another customer just purchased the last pair of [Product Name] while it was in your cart. We have removed it from your total. Do you wish to proceed with the rest of your order?"
- If you do not explain this clearly, User B will assume your payment gateway is broken and will not attempt to buy the other items in their cart.

---

## AI Prompt — Architect Your Error Handling

```prompt
I am engineering the Error State and validation architecture for a production e-commerce checkout flow.

Tech Stack:
- Frontend: [e.g., Next.js, React Hook Form, Zod]
- Backend API: [e.g., Node.js / Stripe]

Act as a Principal UI/UX Engineer:
1. Provide a TypeScript Zod schema for validating a standard US Shipping Address and Credit Card (Luhn check), and explain how React Hook Form uses this to trigger inline error messages instantly.
2. Draft the specific React Error Boundary implementation required to wrap a non-critical component (like a Reviews Widget) so that a third-party API outage does not crash the entire Product Detail Page.
3. Outline the UX flow and exact error messaging required to handle an "Out of Stock Collision" (where an item sells out while sitting in the user's cart before they click pay).
```

---

## Error States Checklist

- [ ] Strict Inline Validation (Zod + React Hook Form) implemented for all checkout and account creation inputs
- [ ] Programmatic Focus Management implemented to automatically scroll users to the exact field that caused a submission error
- [ ] React Error Boundaries deployed around all non-critical components (Reviews, Cross-sells) for graceful degradation during API outages
- [ ] Complex edge-case messaging engineered for "Out of Stock Cart Collisions" to salvage partial orders
