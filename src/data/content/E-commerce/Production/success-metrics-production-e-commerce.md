---
title: Success Metrics
slug: success-metrics
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-25 min
---

# Engineering Success Metrics

**Estimated Time:** 20 Minutes

In mass-production environments, relying on front-end analytics dashboards (like standard Google Analytics or Shopify Analytics) is fundamentally flawed. Ad blockers, Intelligent Tracking Prevention (ITP), and cookie consent banners ensure that up to 30% of your client-side data is missing, distorted, or wrongly attributed. 

Your success metrics must be calculated at the database and data warehouse level. You must architect for **absolute truth**, not probabilistic client-side pings.

## Core Engineering Metrics

Beyond standard business KPIs, an architect must track hardcore engineering metrics that directly impact revenue. These must be monitored via robust APM (Application Performance Monitoring) tools like Datadog, Sentry, or New Relic.

### 1. P95 Core Web Vitals (Specifically LCP)
Do not look at average loading times; averages hide catastrophic failures. Look at the 95th percentile (P95). If your P95 LCP (Largest Contentful Paint) is over 2.5 seconds, your architecture is failing your most critical, highest-latency users (often those on mobile networks who rely on impulse purchases).

### 2. Checkout API Latency & Mutation Time
The time it takes from a user clicking "Pay" to the database committing the transaction and returning a success state. If this takes longer than 2 seconds, users will double-click the button, causing race conditions, failed payment intents, and support tickets. This requires optimizing the exact database locks and third-party API webhooks within the checkout mutation.

### 3. Edge Cache Hit Ratio (CHR)
For a high-traffic storefront, your edge cache hit ratio (how often a user is served a cached page from the CDN vs hitting your origin server) should remain above 85%. If it drops, your origin servers will overload and scale costs will skyrocket during traffic spikes.

## The Business Data Pipeline (ETL)

> [!WARNING]
> Do not rely on Google Analytics to tell you your True Contribution Margin or Customer Acquisition Cost (CAC). Client-side analytics cannot accurately account for post-purchase refunds, shipping discrepancies, or infrastructure costs.

You must build an ETL (Extract, Transform, Load) pipeline pulling data from:
1. **Your Commerce API:** (Shopify/Commercetools) for exact order values and refunds.
2. **Your Ads APIs:** (Meta, Google Ads) for daily spend.
3. **Your Shipping/3PL API:** (ShipBob, EasyPost) for exact fulfillment costs per order.
4. **Your Infrastructure Billing:** (Vercel, AWS) for server costs per session.

Sync this raw data into a central Data Warehouse (BigQuery, Snowflake). Only there can you calculate the exact **True Contribution Margin**:

`Gross Revenue - (COGS + Shipping + Payment Gateway Fees + Server/Infrastructure Cost per Session + Blended CAC)`

## Checklist:
- [ ] Implement an APM (e.g., Datadog, Sentry) to monitor exact API latency and database transaction times for the critical path.
- [ ] Define strict P95 Core Web Vitals targets for all core routes (Home, PLP, PDP, Checkout) and enforce them in CI/CD.
- [ ] Architect the ETL pipeline to sync raw transactional, ad spend, and fulfillment data directly to a Data Warehouse.
- [ ] Build BI (Business Intelligence) dashboards (e.g., Looker, Metabase) running directly off the Data Warehouse to display True Contribution Margin.
