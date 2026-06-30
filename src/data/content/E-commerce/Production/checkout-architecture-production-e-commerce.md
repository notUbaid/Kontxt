---
title: Checkout Architecture
slug: checkout-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Checkout Architecture

The checkout is the most critical funnel in your entire business. Every millisecond of latency, every confusing error message, and every failed API call here translates directly into lost revenue.

At production scale, you do not build a checkout from scratch. The security, compliance (PCI), tax liability, and address validation edge cases are too complex. Checkout architecture is about integrating best-in-class APIs securely and ensuring the system fails gracefully under heavy load.

---

## The Three Checkout Patterns

### 1. Hosted Platform Checkout (e.g., Shopify Checkout)
The user is redirected to a platform-hosted domain (e.g., `checkout.shopify.com`) to complete the purchase.
- **Pros:** Zero PCI liability. Guaranteed uptime. Supports all modern payment methods (Apple Pay, Shop Pay) out of the box. 
- **Cons:** You lose control over the exact UI, though enterprise tiers (Shopify Plus via Checkout Extensibility) allow deep customization.
- **Verdict:** The gold standard for 90% of production stores. It is nearly impossible to out-engineer Shopify's checkout conversion rate.

### 2. API-Driven Hosted Elements (e.g., Stripe Elements)
The user stays on your domain. You build the UI, but the credit card fields are secure iframes securely hosted by the payment provider.
- **Pros:** Total control over the UX and branding. Keeps the user on your domain.
- **Cons:** You must build the address collection, shipping rate calculation, and tax logic yourself before initializing the payment intent.
- **Verdict:** Necessary if you are building a fully custom headless store (e.g., Medusa) or have deeply unique B2B checkout flows.

### 3. Fully Custom PCI-Compliant Checkout
You collect raw credit card numbers on your own servers and pass them to payment gateways.
- **Verdict:** **Never do this.** Unless you are Amazon or Walmart, the $50k+ annual cost of PCI Level 1 compliance and the catastrophic risk of a data breach make this an unjustifiable architectural decision.

---

## The Checkout Workflow Architecture

A production checkout is a sequence of API calls that must execute in a specific order. If you use a custom UI (Pattern 2), your backend must orchestrate this flow.

### Step 1: Address Validation
A typo in a shipping address costs you money in returned packages and reshipping fees.
- **Action:** Intercept the user's shipping address input and pass it through a validation API (e.g., Google Places Autocomplete or Lob Address Verification).
- **Rule:** Never calculate shipping rates until the address is definitively validated.

### Step 2: Shipping Rate Calculation
Shipping is rarely a flat fee at scale.
- **Action:** Send the validated address, alongside the total weight and dimensional volume of the cart (from your Product schema), to a shipping broker API (e.g., EasyPost or Shippo).
- **Rule:** Always cache fallback flat-rates. If the Shippo API goes down, you must still allow the customer to checkout.

### Step 3: Tax Calculation (Economic Nexus)
Tax is dynamically calculated based on the destination address and the origin warehouse.
- **Action:** Send the cart total and addresses to a tax engine (e.g., TaxJar, Avalara, or Stripe Tax).
- **Rule:** Tax APIs are notoriously slow. Call them asynchronously in the background as the user types their address, so the final total is ready when they reach the payment step.

### Step 4: Payment Intent & Inventory Lock
The moment the user enters the payment screen.
- **Action:** Lock the inventory (Hard Allocation) in the database for 5 minutes. Generate a secure `PaymentIntent` via your payment gateway.
- **Rule:** The `amount` passed to the PaymentIntent MUST be calculated server-side. Never pass the cart total from the frontend to the payment API.

---

## Split Fulfillments

At production scale, carts often contain items with different fulfillment requirements.

**Example:** A cart contains a digital PDF guide, a physical t-shirt (in stock), and a physical mug (backordered).
- **The Architecture:** The checkout must group these items into separate **Fulfillment Orders**. The UI must communicate to the user that the digital item arrives instantly, the shirt arrives in 3 days, and the mug arrives in 3 weeks. 
- **The Code:** This requires your backend to assign unique `fulfillment_group_ids` to the line items before passing the payload to the Order Management System.

---

## Error Handling & Graceful Degradation

A production checkout must survive third-party outages.

- **If the Tax API is down:** Do you block the sale, or swallow the tax liability and allow the sale? (Standard business logic: swallow the tax and complete the sale, logging the error).
- **If the Shipping API is down:** Fall back to a predefined flat rate.
- **If the Payment Gateway is down:** Display a clear, reassuring error message. Do not clear the user's cart. Alert the engineering team immediately.

---

## AI Prompt — Architect Your Checkout Flow

```prompt
I am architecting the checkout flow for a production e-commerce store.

Business Requirements:
- Platform: [e.g., Headless Shopify / Custom Next.js + Stripe]
- Shipping Model: [e.g., Dynamic carrier rates / Flat rate / Free over $X]
- Tax Requirements: [e.g., US Multi-state / EU VAT / Domestic only]
- Complex Fulfillments: [e.g., Mixed physical and digital goods / Pre-orders]

Act as a Principal E-Commerce Architect:
1. Define the exact sequence of API calls required from the moment the user clicks "Checkout" to the moment the Order is finalized.
2. Outline the failure modes for the Address Validation, Shipping, and Tax APIs, and provide the graceful degradation strategy for each.
3. If my cart contains a backordered item and an in-stock item, how should the checkout UI and backend payload handle the split fulfillment?
4. Write the security constraints required to ensure the final payment amount cannot be manipulated by the client.
5. Provide the architecture for securing the checkout against card-testing bot attacks.
```

---

## Checkout Architecture Checklist

- [ ] Checkout pattern selected (Hosted Platform vs API-Driven Elements) and PCI compliance verified
- [ ] Address validation API integrated to prevent shipping failures
- [ ] Shipping rate calculation logic defined (with static flat-rate fallbacks configured)
- [ ] Tax calculation API integrated with asynchronous loading to protect conversion rates
- [ ] Server-side price recalculation strictly enforced before PaymentIntent creation
- [ ] Graceful degradation strategies mapped for all third-party dependencies (Tax, Shipping, Fraud)
- [ ] Split fulfillment grouping logic handled for mixed carts (e.g., digital + physical, or backordered + in-stock)
