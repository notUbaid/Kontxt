---
title: Submission Checklist
slug: submission-checklist
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 10–20 min
---

# Submission Checklist

At the end of a production build, the "Submission Checklist" serves as the final, immutable record of engineering sign-off. 

This is not a casual review; this is a formal declaration that the system is secure, compliant, and ready to handle real customers and real money. If a catastrophic failure occurs post-launch, this checklist acts as the audit trail to prove that standard engineering and operational protocols were followed.

---

## 1. Financial & Security Audit

The highest priority is protecting the customer's data and the company's revenue.

- [ ] **Live Keys Validated:** Confirmed that Stripe, TaxJar, and Shippo `.env` variables are strictly using Production keys, and Sandbox keys have been removed from the live environment.
- [ ] **Idempotency Verified:** Tested the checkout flow to ensure network stutters or double-clicks do not result in double-charges.
- [ ] **PCI Compliance Confirmed:** Verified that the database schema does not store raw credit card numbers or CVV codes under any circumstance.
- [ ] **RBAC (Role-Based Access) Enforced:** Verified that marketing and support staff accounts in the Admin Dashboard do not have write-access to the core user database or developer feature flags.

---

## 2. Infrastructure & Scale Audit

The system must be proven to handle the anticipated launch traffic without collapsing.

- [ ] **Connection Pooling Active:** Verified PgBouncer (or equivalent) is actively managing Postgres connections to prevent exhaustion during traffic spikes.
- [ ] **Edge Caching Confirmed:** Verified that the CDN is correctly caching static HTML/assets and bypassing the cache for dynamic cart API routes.
- [ ] **Load Test Passed:** Final k6 load test results reviewed; API maintained sub-200ms response times at the target concurrent user volume.
- [ ] **Error Tracking Active:** Verified Sentry (or DataDog) is receiving exceptions from both the Next.js frontend and the Node.js backend in the production environment.

---

## 3. Operational & Logistics Audit

If an order is placed, it must be successfully fulfilled and accounted for.

- [ ] **3PL Webhook Live:** Verified that the backend successfully pushes a real JSON payload to the warehouse management system when an order is paid.
- [ ] **Inventory Parity:** Confirmed the digital inventory in the database exactly matches the physical inventory count provided by the warehouse.
- [ ] **Taxes & Shipping Configured:** Verified that the checkout applies accurate Sales Tax (based on Nexus rules) and calculates dynamic Shipping costs (or Free Shipping thresholds) flawlessly.
- [ ] **Refund Proration Tested:** Verified that a partial refund of a discounted order mathematically returns the correct fractional amount to the customer.

---

## 4. Growth & Analytics Audit

Marketing cannot spend money if they cannot track the results accurately.

- [ ] **Meta CAPI Live:** Verified the server-side backend is successfully pushing hashed `purchase` events to the Meta Conversions API.
- [ ] **Consent Mode Verified:** Confirmed that Google Analytics tracking is strictly blocked until the user accepts the GDPR/CCPA cookie consent banner.
- [ ] **Email Marketing Synced:** Verified that the `Added_to_Cart` and `Placed_Order` events are successfully reaching Klaviyo to trigger Abandoned Cart and Post-Purchase flows.
- [ ] **SEO Basics Applied:** Verified Dynamic Sitemaps are generating, Canonical tags are present on faceted navigation, and `robots.txt` is not blocking Googlebot.

---

## AI Prompt — Finalize Your Audit

```prompt
I am completing the final Production Submission Checklist for an e-commerce platform before public launch.

Tech Stack:
- Infrastructure: [e.g., Vercel / Postgres]
- Analytics: [e.g., Meta CAPI / Klaviyo]
- Operations: [e.g., ShipStation / Stripe]

Act as a Principal Site Reliability Engineer (SRE):
1. Draft the exact incident response protocol if the Sentry error tracking system reports a spike in "Stripe Card Declined" errors 10 minutes after launch.
2. Provide a script or checklist for safely verifying that all 15 third-party API keys in our `.env.production` file are valid live keys and not sandbox keys.
3. Outline the emergency rollback procedure if we launch and immediately discover a catastrophic bug in the tax calculation API.
```

---

## Final Sign-Off

By completing this checklist, the engineering team certifies that the application meets all production-grade standards for financial security, operational logistics, and scalable infrastructure.

- [ ] **Final Code Freeze Enacted (No deployments 48 hours prior to launch).**
- [ ] **Engineering Lead Sign-off.**
- [ ] **Operations Lead Sign-off.**
