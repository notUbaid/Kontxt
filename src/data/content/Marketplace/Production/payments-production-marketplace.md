---
title: Payments
slug: payments
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Payments (Frontend Integration)

## The Client-Side Execution of Money Routing

In Phase 2 (Payments Architecture), you defined the Escrow flow, Idempotency, and Webhook ingestion on the backend. This module covers the frontend implementation: capturing the buyer's credit card, navigating 3D Secure authentication, and onboarding sellers into Stripe Connect.

If your frontend payment flow is janky, buyers will abandon their carts. If your seller onboarding flow is confusing, you will have no supply. 

---

## Capturing the Payment (Stripe Elements)

In production, you never build your own credit card input forms. Doing so makes you subject to the highest level of PCI Compliance audits (SAQ D). You must use Stripe Elements (or Apple Pay / Google Pay overlays).

**The Secure Checkout Flow:**
1. The buyer clicks "Checkout".
2. Your frontend calls `POST /api/checkout/intent`, passing the `listing_id`.
3. The backend calculates the total, creates a `PaymentIntent` with Stripe (setting `capture_method: 'manual'` for Escrow), and returns a `client_secret`.
4. The frontend initializes Stripe Elements using that `client_secret`.
5. The buyer enters their card details into the Stripe-hosted iframe.
6. The frontend calls `stripe.confirmCardPayment(clientSecret)`.

---

## Handling 3D Secure (SCA Compliance)

In Europe (and increasingly in the US), Strong Customer Authentication (SCA) requires buyers to verify high-risk transactions with their bank via a popup or text message (3D Secure).

If your frontend code assumes `stripe.confirmCardPayment()` always returns a simple "Success" or "Error", you will lose European buyers.

> [!IMPORTANT]
> The `confirmCardPayment` function can return a status of `requires_action`. When this happens, Stripe Elements will automatically render a modal asking the user to authenticate with their bank. Your UI must remain in a "Loading" state until this process completes. Do not close the checkout modal prematurely.

---

## Seller Onboarding (Account Links API)

You must onboard Sellers into Stripe Connect before they can list an item. This ensures they have passed KYC (Know Your Customer) checks and can legally receive payouts.

**The Onboarding Workflow:**
1. The seller clicks "Set up Payouts".
2. The frontend calls your backend.
3. The backend calls the Stripe Account Links API and returns a specialized URL.
4. The frontend redirects the seller to Stripe's hosted onboarding flow.
5. The seller completes KYC and is redirected back to your `return_url`.
6. **Critical:** The frontend MUST poll the backend (or rely on a webhook) to verify the seller's `charges_enabled` status is true before letting them publish a listing.

---

## Do's and Don'ts of Production Payment UIs

- **DO NOT show a "Payment Successful" screen based solely on a frontend response.** A malicious user can spoof the frontend `success` payload. The frontend should show "Processing..." and poll your backend to check if the Webhook has confirmed the database state is `PAID`.
- **DO show transparent fee breakdowns.** Buyers and Sellers must see exactly what they are paying. "Subtotal: $100. Platform Fee: $5. Total: $105." Hidden fees destroy marketplace trust.
- **DON'T block the main thread during checkout.** Wrap your payment submission buttons in a strict `isLoading` state. If a user double-clicks the "Pay" button, your UI should disable the button immediately to prevent double charges (while your backend idempotency keys act as the ultimate failsafe).
- **DO offer localized payment methods.** Use Stripe's Payment Element to automatically surface iDEAL for Dutch users, Bancontact for Belgian users, or Klarna for "Buy Now, Pay Later" financing.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Stripe Elements Checkout UI:**

````prompt
Act as a Senior React Engineer. I am using Next.js and `@stripe/react-stripe-js`. Write the `CheckoutForm` component. It must receive a `clientSecret` as a prop, mount the `PaymentElement`, handle the form submission with `stripe.confirmCardPayment()`, explicitly manage the `requires_action` 3D Secure state, and disable the submit button while processing to prevent double-clicks.
````

> [!TIP]
> **Prompt 2 — Connect Onboarding Redirect Flow:**

````prompt
I am building the Seller Onboarding flow using Stripe Connect Express. Write the React component that calls my backend to generate an Account Link, handles the `window.location.href` redirect to Stripe, and manages the UI state when the user returns to the `return_url` (showing a loading spinner while polling the backend for verification).
````

---

## Validating What AI Generates

- **Check for PCI Compliance:** If the AI writes standard `<input type="text">` fields for the credit card number, reject the code immediately. It MUST use the Stripe `CardElement` or `PaymentElement`.
- **Verify Asynchronous Handling:** Ensure the AI's checkout submission handler uses `await` correctly and catches all Stripe-specific error codes (e.g., `card_declined`, `expired_card`) to display human-readable messages to the buyer.

---

## Implementation Checklist

- [ ] Integrated the `@stripe/react-stripe-js` SDK on the frontend.
- [ ] Built the Checkout flow utilizing `PaymentIntent` client secrets.
- [ ] Handled 3D Secure (`requires_action`) flows gracefully in the UI.
- [ ] Implemented the Seller Connect Onboarding redirect and return flow.
- [ ] Ensured the checkout success page relies on backend webhook confirmation, not just frontend callbacks.

---

## What's Next

Next: **Notifications** — With transactions flowing, buyers and sellers need to know what is happening. We will architect the real-time, email, and push notification systems that keep users engaged and informed throughout the transaction lifecycle.
