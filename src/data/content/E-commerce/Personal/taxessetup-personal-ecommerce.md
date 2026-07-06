---
title: Taxes Setup
slug: taxes-setup
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Taxes Setup

Shipping made sure orders physically arrive correctly. Taxes make sure the amount you charge and remit is legally correct. This is the least glamorous module in the entire curriculum, and also one of the few where a mistake can create real, ongoing liability rather than just a bad customer experience.

Tax law varies significantly by location and changes over time. This module gives you the structural understanding and the right questions to ask — it is not a substitute for checking your specific local/state/national requirements, and for anything beyond a true hobby-scale store, a brief consultation with an accountant is worth the cost.

---

## Where This Fits

This connects to your Checkout and Payment architecture — tax is calculated and added at the same point shipping is, and the total charged must match what you're legally required to collect.

---

## Why This Matters for a Store Specifically

> **️ Warning:** Sales tax obligations are typically based on *where your customer is*, not just where your business is located, once you sell across multiple regions. Many beginners assume "I'm not registered for tax anywhere, so I don't need to charge it" — this assumption can be incorrect even for small stores, depending on your jurisdiction's specific thresholds and rules.

This isn't about scaring you into inaction — most personal stores, especially early on, have very manageable tax obligations. It's about not finding out the requirement existed only after a year of unremitted tax has accumulated.

---

## What You're Building Today

- Understanding of which jurisdictions you may need to collect tax for, based on where you and your customers are
- Correct tax calculation at checkout, reflecting real, current rates
- A clear record-keeping setup so tax collected is trackable and remittable
- Tax-inclusive or tax-exclusive pricing decided deliberately, not by accident

You're **not** becoming a tax expert or building custom tax-calculation logic from scratch. Using a proper tax calculation service and understanding the basics well enough to configure it correctly is the right scope here.

---

## The Core Questions to Answer First

| Question | Why It Matters |
|---|---|
| Where is your business legally located/registered? | Usually your baseline tax obligation |
| Where are your customers located? | May create additional obligations as you scale, depending on jurisdiction |
| Have you registered for a sales tax permit/VAT number where required? | Required before legally collecting tax in most jurisdictions |
| Are your products tax-exempt in any category (in some regions, certain goods are)? | Affects what rate applies, if any |

> ** Tip:** Most jurisdictions require you to register for a tax permit *before* you start collecting tax, not after. Don't add tax collection to checkout before confirming you're actually registered where required — collecting tax you're not registered to collect creates its own problem.

---

## Choosing Your Approach

| Approach | Accuracy | Effort | Best For |
|---|---|---|---|
| Manual flat-rate tax field | Low — doesn't reflect real, varying rates | Low | Not recommended beyond initial prototyping |
| **Payment provider's built-in tax tool (e.g., Stripe Tax)** | High — calculates real, current rates by location | Low-Medium | Most personal stores (recommended) |
| Dedicated tax service (TaxJar, Avalara) | High | Medium | Stores with more complex, multi-jurisdiction needs |

> ** Best Practice:** If you're already using a payment provider like Stripe, check whether it has a built-in tax calculation product before adding a separate service — it often integrates with the checkout flow you've already built, with far less configuration than a standalone tax tool.

---

## Implementation

**Copy Prompt:**

```
Help me integrate accurate sales tax calculation into my e-commerce
checkout, built with [your framework] and [your payment provider].

My business is located in [your location]. I currently [do / do not]
have a tax registration there.

Help me:
1. Understand what [Stripe Tax / your provider's tax tool] needs to
   calculate accurate, current tax rates at checkout
2. Confirm tax is calculated based on the customer's shipping address,
   not my business address, unless that's incorrect for my situation
3. Make sure tax-inclusive vs tax-exclusive pricing is handled
   consistently across product pages, cart, and checkout — the
   displayed price should never silently change at the last step
4. Set up basic record-keeping so I can see total tax collected over
   a given period for filing purposes
```

> **️ Warning:** Don't let a product's displayed price differ from what's actually charged due to tax being silently added only at the final checkout step with no warning. If your pricing is tax-exclusive, say so clearly near the price — an unexpected total at the last step is a well-documented cause of checkout abandonment.

---

## Tax-Inclusive vs Tax-Exclusive Pricing

- **Tax-exclusive** (common in the US): displayed price excludes tax, added at checkout based on location
- **Tax-inclusive** (common in many other regions, e.g., VAT-based systems): displayed price already includes tax

> **️ Common Mistake:** Mixing the two — showing a price that looks tax-inclusive but isn't, or vice versa — creates a pricing display that's misleading regardless of intent. Decide explicitly which model your store uses based on your region's norms, and apply it consistently everywhere a price is shown.

---

## Common Mistakes

- Assuming no tax registration means no tax obligation, without actually checking jurisdiction-specific thresholds
- Hardcoding a single flat tax rate that doesn't reflect real, location-based variation
- Calculating tax based on business location instead of customer location where the latter is what's legally required
- Adding tax only at the final checkout step with no earlier indication, creating last-minute price surprises
- No record-keeping of tax collected, making filing at tax time a manual reconstruction project instead of a quick export

---

## Validation Checklist

- [ ] You've confirmed, for your actual jurisdiction(s), whether and where tax registration is required — not assumed
- [ ] Tax calculation uses a real rate service, not a hardcoded flat percentage
- [ ] Tax is calculated based on the correct location (customer's, in most jurisdictions) for your situation
- [ ] Pricing display (tax-inclusive or exclusive) is consistent across product pages, cart, and checkout
- [ ] You can export or view total tax collected for a given period

---

## AI Review Prompt

```
Review my tax setup for an e-commerce store. Based on this:

Business location: [location]
Tax registration status: [registered / not yet / unsure]
Tax tool used: [Stripe Tax / other / none yet]
Pricing model: [tax-inclusive / tax-exclusive]

Check for:
1. Any mismatch between my pricing model and how it's actually
   displayed across the store
2. Whether tax is calculated by the correct location for my situation
3. Any obvious gap between my described setup and a real, working tax
   collection system

Flag clearly if this is a question I should confirm with an accountant
rather than resolve through code alone.
```

---

## What Comes Next

Pricing and tax are accurate and compliant. Next: **Legal Documents** — the remaining store-specific policies (beyond Privacy Policy and Terms of Service) that round out your legal readiness.
