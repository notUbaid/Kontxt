---
title: Checkout Implementation
slug: checkout
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Checkout Implementation

The checkout page is where e-commerce engineering meets financial liability. 

If your homepage breaks, you lose traffic. If your checkout page breaks, you lose money. At production scale, building a custom checkout from scratch requires orchestrating Address Validation, Shipping Calculations, Tax Compliance, and PCI-compliant Payment processing—all in a sequence that must not fail.

For 90% of stores, you should use a Hosted Checkout (like Shopify Checkout Extensibility). If you *must* build a custom checkout (headless), you must follow strict state management rules.

---

## 1. The Checkout State Machine

A checkout flow is a strict, unidirectional state machine. A user cannot calculate shipping rates until they provide a valid address. They cannot calculate taxes until the shipping rate is applied.

**The Implementation Sequence:**
1. **State: `COLLECTING_ADDRESS`**
   - The user inputs their address.
   - You MUST run this through an Address Validation API (e.g., Lob, Google Places, SmartyStreets). A typo in the zip code will cause the shipping carrier to return the package, costing you margin.
2. **State: `CALCULATING_SHIPPING`**
   - Send the validated address and the cart's Dimensional Weight (DIM) to a shipping broker (e.g., EasyPost, Shippo).
   - Display the shipping options (e.g., Standard vs. Overnight).
3. **State: `CALCULATING_TAX`**
   - Send the cart total + selected shipping cost + validated address to the Tax API (e.g., TaxJar, Stripe Tax).
   - *Crucial Rule:* Shipping costs are taxable in some jurisdictions, but not others. The Tax API handles this, but only if you pass the shipping cost in the payload.
4. **State: `READY_FOR_PAYMENT`**
   - The server calculates the absolute final total.
   - The server generates the `PaymentIntent` via the Payment Gateway.

---

## 2. Server-Side Price Enforcement

The most common security vulnerability in custom checkouts is trusting the client's math.

**The Exploit:**
1. User adds a $1,000 laptop to their cart.
2. The React checkout page says `Total: $1000`.
3. User opens Chrome DevTools and intercepts the API call to your backend: `POST /api/payment-intent { amount: 10 }`
4. If your backend blindly creates a `PaymentIntent` for $0.10, the payment succeeds, the webhook fires, and your warehouse ships a $1,000 laptop for a dime.

**The Implementation:**
When the user clicks "Proceed to Payment", your backend must completely ignore the total sent from the frontend.
The backend must fetch the cart from Redis, query the database for the exact product prices, query the Tax API, and calculate the final amount securely on the server before calling Stripe.

---

## 3. Graceful Degradation (API Failures)

Checkout relies on external APIs (Tax, Shipping, Payments). External APIs go down.

- **If the Tax API fails:** Do you block the sale? No. You log a critical error to Sentry, charge 0% tax, and complete the sale. Your business will absorb the $3 tax liability to save the $100 sale. (Configure this fallback in your code).
- **If the Shipping API fails:** Do not show an endless loading spinner. Catch the error after 3 seconds and fallback to a hardcoded "Standard Shipping: $5.00" rate to save the conversion.
- **If the Payment API fails:** You cannot fallback here. You must display a clear, reassuring error message to the user ("Our payment provider is experiencing a delay. Your card has not been charged. Please try again in 5 minutes.")

---

## 4. Securing the Card Input (PCI Compliance)

If your servers touch raw credit card numbers, you are subject to PCI-DSS Level 1 compliance, which requires massive annual security audits.

**The Implementation:**
Use **Hosted Fields** (e.g., Stripe Elements, Braintree Hosted Fields). 
- You build the React UI around the inputs, but the actual `<input>` field where the user types their card number is an `iframe` securely hosted by Stripe.
- The raw card data goes directly from the user's browser to Stripe's servers.
- Stripe returns a secure `token` to your frontend, which you then pass to your backend to finalize the charge.

---

## AI Prompt — Implement Your Checkout API

```prompt
I am implementing a custom headless checkout flow for a production e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js + React Hook Form]
- Backend: [e.g., Node.js]
- APIs: [e.g., Stripe, Shippo, TaxJar]

Act as a Principal Checkout Engineer:
1. Write the precise sequence of API calls (Node.js/TypeScript) required to transition a checkout from `Address Entered` to `Payment Intent Generated`.
2. Demonstrate how to implement a 3-second timeout and fallback logic for the Shipping API (Shippo) so the checkout does not crash if the API is offline.
3. Write the server-side logic that securely calculates the final transaction amount (Cart + Shipping + Tax) while explicitly ignoring any totals passed from the frontend.
4. Explain how to securely integrate Stripe Elements into the React frontend to maintain PCI compliance.
```

---

## Checkout Implementation Checklist

- [ ] Address Validation API implemented to prevent shipping undeliverables
- [ ] Strict server-side price recalculation enforced before generating PaymentIntents
- [ ] Graceful degradation (timeouts and fallbacks) implemented for Tax and Shipping APIs
- [ ] Credit card inputs isolated via secure iframes (e.g., Stripe Elements) to bypass PCI liability
- [ ] Tax calculation payload verified to include shipping costs (required by many jurisdictions)
