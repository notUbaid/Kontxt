---
title: Seller Onboarding
slug: seller-onboarding
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Seller Onboarding (Supply Side)

## The Friction vs. Compliance Tradeoff

In a personal project, a seller signs up, types a username, and starts selling. In a production marketplace, allowing unverified sellers to immediately accept money is a recipe for catastrophic fraud and money laundering.

However, if you make a seller upload their passport and tax forms before they can even look at the dashboard, 90% of them will bounce. You must architect a **Progressive Onboarding** flow that balances legal compliance (KYC/KYB) with a frictionless user experience.

---

## Progressive Onboarding

Do not front-load all the friction.

**The Production Flow:**
1. **Account Creation (Low Friction):** Email and password. The seller can immediately access the dashboard and create Draft listings. They can see the value of the platform.
2. **Storefront Setup (Medium Friction):** To publish a listing, they must provide a valid phone number (SMS verification) and connect a payout method.
3. **Identity Verification (High Friction):** When their lifetime sales cross a threshold (e.g., $500), their payouts are paused until they complete full KYC (Know Your Customer) or KYB (Know Your Business).

---

## KYC / KYB (Know Your Customer)

Financial regulators require you to verify the identity of the people receiving money on your platform to prevent money laundering and terrorism financing.

**The Production Standard:**
Do not build identity verification yourself. Do not ask users to email you photos of their driver's license (this is a massive security liability).
* Integrate **Stripe Connect Onboarding** or **Stripe Identity**.
* The user is redirected to a secure Stripe-hosted flow where they upload their government ID and take a live selfie. Stripe uses machine learning to verify the document and returns a webhook (`identity.verification_session.verified`) to your backend.

---

## Tax Compliance (1099-K)

If a seller in the US generates more than a certain threshold (e.g., $600/year, though laws fluctuate), the IRS requires you (the marketplace) to issue them a **Form 1099-K**.

**The Production Requirement:**
You must collect the seller's Social Security Number (SSN) or Employer Identification Number (EIN) during the KYC phase. Again, rely on your payment processor (Stripe Connect) to collect, encrypt, and file these tax forms on your behalf. Never store SSNs in your Postgres database.

---

## The First-Listing Quality Gate

If a new seller publishes 50 low-quality, blurry, or spammy listings on day one, it degrades the buyer experience.

**The Production Strategy:**
Implement a **New Seller Sandbox**.
1. When a new seller publishes their first 3 listings, the listings do not immediately go live.
2. Their status is set to `PENDING_REVIEW`.
3. The Trust & Safety team (or an automated AI model) reviews the listings for quality, prohibited items, and clear photography.
4. Once approved, the seller "graduates" and future listings go live instantly.

---

## Do's and Don'ts of Production Seller Onboarding

- **DO use clear progress indicators.** If onboarding takes 5 steps, show a progress bar. Allow sellers to save their progress and return later.
- **DON'T ask for bank details immediately.** Let the seller feel the dopamine hit of creating their storefront before asking them to find their routing number.
- **DO provide listing templates.** Sellers stare at blank screens. Provide auto-fill templates, AI-assisted description generators, and clear photo guidelines (e.g., "Use a plain white background") directly in the listing creation flow.
- **DON'T assume sellers know how to price.** Integrate a pricing suggestion engine based on historical sales data to help new sellers price competitively on day one.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Stripe Connect Progressive Onboarding:**

````prompt
Act as a Payments Engineer. Write a Next.js Server Action that checks a seller's Stripe Connect `account.capabilities`. If `transfers` are `inactive` or `pending`, generate an `account_onboarding` Stripe Account Link URL and redirect the seller to it. Ensure the `return_url` brings them exactly back to the listing they were trying to publish, preserving their state.
````

> [!TIP]
> **Prompt 2 — AI Listing Generator:**

````prompt
Write a Node.js utility function that takes a raw, messy string of product specs (e.g., "iphone 13 pro max blue 128gb minor scratch on back no charger") and sends it to the OpenAI API. Instruct the AI to return a clean, structured JSON object containing an SEO-optimized `title`, a professional `description`, and a suggested `price_range` based on the condition.
````

---

## Validating What AI Generates

- **Check for state loss:** If AI generates an onboarding flow that bounces the user to Stripe and back, ensure it doesn't wipe out the form data they were filling out before the redirect. LocalStorage or database draft saves are mandatory here.
- **Verify PII handling:** If AI writes a form to collect an SSN and saves it to Prisma, reject it immediately. Tax IDs must go directly to the payment processor.

---

## Implementation Checklist

- [ ] Architected a Progressive Onboarding flow that defers high-friction steps (bank linking) until absolutely necessary.
- [ ] Integrated Stripe Connect / Identity to handle KYC/KYB compliance and document verification securely.
- [ ] Ensured the platform is prepared to collect and file 1099-K tax forms for high-volume sellers via the payment processor.
- [ ] Implemented a "New Seller Sandbox" requiring manual review of a seller's first listings to enforce quality standards.
- [ ] Added AI-assisted listing generators or templates to reduce the "blank page" friction for new supply.

---

## What's Next

Next: **Buyer Onboarding** — The supply side is verified and compliant. Next, we will focus on the demand side, ensuring buyers can discover, trust, and purchase items with absolute minimum friction.
