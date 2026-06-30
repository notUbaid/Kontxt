---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# MVP Scope

In production e-commerce, the Minimum Viable Product (MVP) is notoriously misunderstood. 

An MVP is not a broken, buggy storefront. If your checkout crashes, you do not get "user feedback"—you just lose the sale and permanently burn that customer's trust. In commerce, the MVP must be a **Minimum Viable Transaction Engine**. It must be mathematically and financially flawless, even if it lacks advanced marketing features.

---

## 1. What Stays IN the MVP (The Critical Path)

The MVP must guarantee that a customer can give you money, and the warehouse knows where to ship the product.

**Mandatory Scope:**
1. **The Product Detail Page (PDP):** Must have accurate, real-time inventory counts and high-resolution images.
2. **The Cart & Checkout:** Must support at least one digital wallet (Apple Pay/Google Pay) and accurately calculate standard shipping and basic sales tax.
3. **The Webhook Pipeline:** The Stripe `payment_intent.succeeded` webhook must flawlessly trigger the order insertion into your Postgres database and simultaneously push the payload to the 3PL fulfillment API.
4. **Basic Analytics:** Server-side tracking (Meta CAPI) for the `purchase` event is mandatory to train ad algorithms from Day 1.

---

## 2. What gets CUT from the MVP (The Scope Creep)

Features that do not immediately block a transaction must be ruthlessly cut from the v1.0 launch to preserve engineering velocity.

**Cut the Following:**
1. **User Accounts (Passwords):** Do not build a complex authentication system yet. 90% of your first users want to checkout as Guests. Focus on a flawless Guest Checkout flow first.
2. **Complex Loyalty Programs:** Earning points and VIP tiers take weeks to engineer securely. Cut it. Offer a simple 10% discount code for email signups instead.
3. **Advanced Product Bundling:** If your inventory schema isn't ready for Composite Products, do not fake it. Sell single SKUs first to ensure the logistics pipeline is stable.
4. **Multi-Currency / Internationalization:** Start with your home country and a single currency. Cross-border taxes (DDP) and translations are Phase 2 problems.

---

## 3. The "Manual Fallback" Strategy

If a feature is too complex to code for the MVP, rely on a "Wizard of Oz" manual process on the backend.

**The Implementation:**
- Instead of building a complex, automated "Returns Portal" UI where users print their own labels, just put a text block on the policy page: "Email support@store.com for a return label."
- When they email you, manually generate the label in Shippo and email it back.
- This saves 2 weeks of engineering time. You only automate it when the manual volume becomes painful (e.g., >10 returns a day).

---

## AI Prompt — Ruthlessly Scope Your MVP

```prompt
I am defining the strict MVP (Minimum Viable Product) scope for a production e-commerce launch.

Business Context:
- Launch Timeline: [e.g., 6 Weeks]
- Engineering Resources: [e.g., 2 Full-Stack Developers]

Act as a Principal Product Manager:
1. Define the absolute "Critical Path" for a transaction. What specific database writes and third-party API calls must succeed for an order to be considered legally valid and ready for fulfillment?
2. List 3 common e-commerce features (e.g., Wishlists, Complex Reviews) that we must aggressively cut from the v1.0 scope, explaining the technical debt they introduce if built too early.
3. Outline a "Manual Fallback" strategy for handling customer returns and subscription cancellations during the MVP phase to save engineering hours.
```

---

## MVP Scope Checklist

- [ ] Critical Path defined (ensuring the fundamental transaction and fulfillment pipeline is flawless)
- [ ] User Accounts, complex Loyalty Programs, and Internationalization formally moved to the v2.0 backlog
- [ ] Manual "Wizard of Oz" fallbacks established for low-volume operational tasks (like returns)
- [ ] Team alignment secured: The MVP must be financially secure and fast, but feature-light
