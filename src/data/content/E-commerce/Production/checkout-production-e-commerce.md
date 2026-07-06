---
title: Checkout
slug: checkout
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Secure Checkout Operations

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

The checkout is the most critical chokepoint of your business. If a user tries to checkout and the address form fails validation, or the tax calculation times out, they will close the tab. You have spent money on Facebook ads to acquire them, and you just lost the conversion at the 99% mark.

In Phase 3, you must engineer a **Multi-Stage Progressive Checkout**, implement strict **Address Validation (CASS)**, and decouple **Dynamic Tax Calculations**.

---

## 1. Progressive vs. SPA Checkout

A beginner builds a checkout by rendering all 50 inputs (Email, Shipping, Billing, Credit Card) on a single massive scrolling page. This causes cognitive overload, and users abandon the cart.

**The Production Solution:**
You must engineer a **Progressive (Multi-Step) Checkout** as a Single Page Application (SPA). 

```mermaid
graph LR
    A[Step 1: Identity] -->|Valid Email| B[Step 2: Shipping]
    B -->|Valid Address| C[Step 3: Shipping Rate]
    C -->|Selects Rate| D[Step 4: Payment iFrame]
```

By hiding the payment frame until the user has successfully entered a valid shipping address, you prevent the Stripe API from throwing Zip Code validation errors.

Furthermore, this must be an SPA. If you use standard HTML links (`<a href="/checkout/step-2">`) to move between steps, the page fully reloads, taking 2-3 seconds. By using React State (`const [step, setStep] = useState(1)`), the transition takes 0 milliseconds.

## 2. Strict Address Validation (CASS)

If a user accidentally types "123 Main Stret" instead of "Street", and you send that raw string to FedEx, FedEx will charge you a $15 "Address Correction Fee" on your invoice. If this happens 100 times a month, you lose $1,500 of profit.

**The Production Solution:**
You must implement a CASS-certified (Coding Accuracy Support System) address validation API like **Lob** or **Shippo** during Step 2 of the checkout.

```typescript
// lib/addressValidation.ts
import { z } from 'zod';

export async function validateAddress(address: unknown) {
  // 1. Zod mathematically guarantees the shape
  const parsed = AddressSchema.parse(address);

  // 2. Shippo API verifies the address actually physically exists
  const response = await fetch('https://api.goshippo.com/addresses/', {
    method: 'POST',
    headers: { Authorization: `ShippoToken ${process.env.SHIPPO_KEY}` },
    body: JSON.stringify({ ...parsed, validate: true })
  });

  const data = await response.json();
  if (!data.validation_results.is_valid) {
    throw new Error('This address could not be verified by the USPS.');
  }

  return data; // Returns the cleaned, standardized address
}
```

If the API detects a typo, your frontend UI must instantly halt the checkout and display an error: "Did you mean: 123 Main Street?"

## 3. Decoupled Tax Calculation

Calculating US Sales Tax manually is illegal and mathematically impossible (there are over 11,000 tax jurisdictions in the US, and they change monthly).

You must use an API like **Stripe Tax** or **TaxJar**. However, if you execute the Tax API call *while* the user clicks "Pay", the checkout will take 3-4 seconds, causing the user to click the button twice and trigger a double-charge.

**The Production Solution:**
You must calculate tax in the background the exact millisecond the user finishes typing their Zip Code in Step 2. By the time they reach Step 4 (Payment), the tax is already calculated, cached in Next.js, and added to the total. The final "Pay" click takes < 500ms.

---

##  Checkout Engineering Checklist

- [ ] Architect the checkout UI as a Multi-Step Single Page Application to reduce cognitive overload and eliminate page load times.
- [ ] Enforce CASS-certified Address Validation via API to prevent carrier correction fees.
- [ ] Pre-calculate Sales Tax in the background using Stripe Tax the moment the Zip Code is provided.
- [ ] Use the AI prompt below to generate the progressive checkout component.

---

## AI Prompt — Engineer the Progressive Checkout

Copy this prompt into your AI to have it write the highly optimized checkout flow.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal UX and Frontend Engineer. We are engineering our Multi-Step Checkout SPA.

I need you to generate the following strict React implementations:

**1. The Progressive SPA Component:**
Write the main `<CheckoutFlow />` Client Component.
- It must use `useState` to manage the active step (`1: Identity`, `2: Shipping`, `3: Payment`).
- Use `framer-motion` to write a slick, 300ms sliding animation when transitioning between steps.
- Show how the "Continue to Payment" button is disabled until the internal form state (e.g., React Hook Form) validates the shipping address completely.

**2. The Address Validation Action:**
Write a Next.js Server Action (`validateShippingAddress.ts`).
- It must accept a raw address object from the frontend.
- Provide the Zod schema used to validate the payload structure.
- Write a mock `fetch` call to the Shippo/Lob address validation API. Show the exact `catch` block that returns a user-friendly error to the frontend if the API flags the address as physically undeliverable.

**3. The Background Tax Calculator:**
Write a `useEffect` hook inside the `<ShippingForm />` component. Show how it listens to the `zipCode` input field. If the zip code reaches 5 characters (valid US length), it must instantly execute a background fetch to `/api/tax/calculate` so the tax is fully resolved before the user even clicks "Next Step".
````

**Next: Orders Engineering →**
