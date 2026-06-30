---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 15–25 min
---

# Demo Script

A technical demo for a production e-commerce store is not a screen-share of you slowly clicking through a website. It is a orchestrated performance designed to prove that the architecture is robust, secure, and capable of handling complex edge cases at scale.

If you only demo the "Happy Path" (a user buys a shirt and it works), stakeholders will assume it is a toy app. You must demo the "Hard Paths."

---

## 1. The "Happy Path" (Speed & UX)

Start with the core purchasing loop, but frame it entirely around engineering achievements.

**The Script Flow:**
1. **The PDP:** "Notice how this Product page loaded instantly. We are fetching real-time Postgres inventory data, but we are serving the HTML from the Edge CDN. We achieve a 1.2-second Largest Contentful Paint (LCP)."
2. **The Cart:** Add an item to the cart. "Here, the Cart Flyout opens. This data is hitting a Redis in-memory cache, not the primary database, ensuring sub-50ms response times even under heavy load."
3. **The Checkout:** "We implemented Stripe Digital Wallets. With one click of Apple Pay, we bypass the 15-field checkout form entirely, reducing cart abandonment by 20%."

---

## 2. The "Hard Path" (Financial Logic)

This is where you prove the system is production-ready to the Finance and Operations teams.

**The Script Flow:**
1. **Tax Math:** "Let's look at the backend calculation for this order. We are passing the destination ZIP code to the Tax API. Notice how the tax is applied to the Item, but *not* to the Shipping Cost, because this specific state exempts shipping from sales tax."
2. **Idempotency (The Double-Click Test):** "Now, I am going to intentionally mash the 'Submit Order' button 5 times rapidly to simulate a network stutter." *(Do it)*. "Notice that only one charge went through. Our backend enforces Idempotency Keys on all Stripe requests, guaranteeing we never accidentally double-charge a customer."

---

## 3. The "Admin Path" (Operations)

Stakeholders need to see that the business can actually be operated by non-engineers.

**The Script Flow:**
1. **The Refund (Proration):** Log into the Admin Dashboard. "Customer Service needs to process a partial refund for this order which used a 20% discount code." Click refund on a single item. "Notice that the backend automatically prorates the discount and calculates the exact fraction of tax to return. Customer Service cannot make a mathematical error here."
2. **The Feature Flag:** "Marketing wants to turn on the new 'Free Shipping Banner'." Go to the LaunchDarkly/Edge Config dashboard. Toggle the flag. Refresh the live site. "The banner is live instantly, globally, without requiring an engineering deployment or server restart."

---

## AI Prompt — Generate Your Technical Demo Script

```prompt
I am preparing a 10-minute live technical demo of a production e-commerce architecture for senior leadership.

Tech Stack:
- Infrastructure: [e.g., Next.js Edge / Redis]
- Integrations: [e.g., Stripe, TaxJar, LaunchDarkly]

Act as a Principal Developer Advocate:
1. Draft a 2-minute script demonstrating the speed of the Edge caching and Redis cart implementation, highlighting the specific latency metrics stakeholders care about.
2. Outline a 3-minute script demonstrating the "Idempotency Test," explaining exactly how the backend prevents double-charging during a simulated network failure at checkout.
3. Write a 3-minute script showcasing the Admin Dashboard, specifically demoing how a Customer Support agent executes a complex partial refund with automated tax proration, proving operational safety.
```

---

## Demo Script Checklist

- [ ] "Happy Path" script defined, emphasizing Edge speed, Redis caching, and Apple Pay UX
- [ ] "Hard Path" script defined, proving complex financial logic (Tax API routing, Idempotency keys)
- [ ] "Admin Path" script defined, demonstrating operational safety (Automated refund proration, Feature Flags)
- [ ] Local database seeded with realistic test data (Orders, Products, Users) to avoid live-typing errors
- [ ] Hardcoded backup videos recorded for all API-dependent flows (Stripe/Tax) in case of live internet failure
