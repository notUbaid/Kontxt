---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Launch Checklist

In production e-commerce, launching is not just pointing a DNS record to a new server. It is the coordinated flip of financial, logistical, and technical switches.

If you launch with test API keys in your production code, every order will process successfully in the UI, but your bank account will receive zero dollars, and you will have to manually email every customer asking them to re-enter their credit card.

You must run this checklist 48 hours before the public launch.

---

## 1. The Financial Audit (The Money Path)

The most critical path is the flow of money from the customer to your bank.

- [ ] **Live API Keys:** Verify that Stripe (or your gateway) is using production keys (`sk_live_...` not `sk_test_...`).
- [ ] **Webhook Endpoints:** Ensure Stripe webhooks are pointing to your production URL (`https://api.yourstore.com/webhooks/stripe`), not a local ngrok tunnel.
- [ ] **Tax API Live Mode:** Ensure TaxJar/Avalara is in production mode. If it remains in sandbox mode, you will not collect legally required sales tax.
- [ ] **The Real Money Test:** Buy a product on the production site using your actual, personal credit card. Do not skip this.
- [ ] **The Refund Test:** Refund your real order via the Admin Dashboard. Verify the money returns to your credit card and the database state updates correctly.

---

## 2. The Logistics Audit (The Physical Path)

If an order is placed, it must successfully route to the warehouse.

- [ ] **Shipping API Live Keys:** Ensure Shippo/EasyPost is using production keys to generate real, paid shipping labels.
- [ ] **3PL Webhook Connections:** Verify that your backend can push JSON payloads to your warehouse's WMS, and that you have tested receiving a simulated "Shipped" payload back from them.
- [ ] **Inventory Sync:** Confirm the live database inventory exactly matches the physical warehouse count. (If you launch with "Test Item: 9,999 in stock," you will oversell instantly).

---

## 3. The Infrastructure Audit (The Scalability Path)

If your marketing goes viral, your infrastructure must hold.

- [ ] **Database Connection Pooling:** Verify PgBouncer (or equivalent) is active and configured correctly to prevent connection exhaustion.
- [ ] **Cache Purging:** Clear all staging data from Redis and the CDN Edge cache. Ensure the CDN is configured to cache HTML pages, not just static assets.
- [ ] **Domain & SSL:** Verify the primary domain is resolving perfectly and the SSL certificate is valid and enforcing HTTPS strictly.
- [ ] **Load Testing:** Review the final k6 load test results to confirm the checkout API can handle the expected concurrent user volume.

---

## 4. The Security & Compliance Audit (The Liability Path)

Ensure you are legally protected before exposing the store to the public.

- [ ] **PCI Compliance:** Verify no raw credit card data is ever logged, printed, or saved in the database.
- [ ] **Terms & Privacy Linked:** Ensure the Terms of Service, Privacy Policy, and Refund Policy are visibly linked in the footer and the checkout flow.
- [ ] **Fraud Engine Active:** Ensure Stripe Radar (or equivalent) rules are enabled (e.g., blocking high-risk IP addresses and velocity attacks).
- [ ] **Admin RBAC Verified:** Ensure developers and marketing staff do not have "God Mode" access to the production database; enforce Role-Based Access Control.

---

## 5. The Analytics Audit (The Marketing Path)

If marketing spends $10,000 on launch day, they need to know if it worked.

- [ ] **Server-Side Tracking (CAPI):** Verify the backend is successfully pushing purchase events to the Meta Conversions API.
- [ ] **Consent Mode:** Verify Google Consent Mode v2 is blocking analytics cookies until the user clicks "Accept" on the cookie banner.
- [ ] **Data Layer Check:** Open Chrome DevTools, complete a test purchase, and verify the `window.dataLayer` outputs the correct `purchase` event with the exact monetary value.

---

## 6. The 48-Hour Freeze

**The Final Rule:**
48 hours before launch, you must enact a total **Code Freeze**.
Absolutely zero deployments are allowed to the `main` branch unless they are fixing a critical, show-stopping bug. No CSS tweaks. No typo fixes in the footer. Every deployment carries risk, and you must stabilize the environment before the traffic hits.

---

## AI Prompt — Finalizing the Launch

```prompt
I am executing the final launch protocol for a production e-commerce store.

Tech Stack:
- Infrastructure: [e.g., Vercel / Postgres]
- Integrations: [e.g., Stripe, EasyPost, Klaviyo, Meta CAPI]

Act as a Principal E-commerce Architect:
1. Provide a script or checklist for safely verifying that all 15 third-party API keys in our `.env.production` file are valid live keys and not sandbox keys.
2. Draft the exact execution steps for the "Real Money Test" and the "Refund Test" to validate the entire financial state machine end-to-end.
3. Outline the emergency rollback procedure if we launch and immediately discover a catastrophic bug in the checkout flow.
```
