---
title: Success Metrics
slug: success-metrics
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Success Metrics

**Estimated Time:** 20 Minutes

In mass-production environments, front-end analytics (Google Analytics) are fundamentally flawed. Ad blockers, intelligent tracking prevention (ITP), and cookie consent banners ensure that up to 30% of your client-side data is missing or distorted. 

Your success metrics must be calculated at the database and data warehouse level. You must rely on absolute truth, not probabilistic client-side pings.

## The Engineering Metrics

Beyond standard business KPIs, you must track hardcore engineering metrics that directly impact revenue:

1. **LCP (Largest Contentful Paint) at P95:** Do not look at averages. Look at the 95th percentile. If your P95 LCP is over 2.5 seconds, your architecture is failing your highest-latency users.
2. **Checkout API Latency:** The time it takes from a user clicking "Pay" to the database committing the transaction. This must be closely monitored via APM (Application Performance Monitoring) tools like Datadog or Sentry.
3. **Cache Hit Ratio (CHR):** For a high-traffic storefront, your edge cache hit ratio should be above 85%. If it drops, your origin servers will overload during traffic spikes.

## The Business Data Pipeline

> [!WARNING]
> Do not rely on Google Analytics to tell you your True Contribution Margin.

You must build an ETL (Extract, Transform, Load) pipeline pulling from your Commerce API, your Ads APIs, and your Shipping API into a central Data Warehouse (BigQuery/Snowflake). 

Only there can you calculate the exact **True Contribution Margin**:
`Gross Revenue - (COGS + Shipping + Payment Gateway Fees + Server/Infrastructure Cost per Session + CAC)`

## Checklist:
- [ ] Set up an APM (e.g., Datadog, Sentry) to monitor API latency and database transaction times.
- [ ] Define your P95 Core Web Vitals targets for all core routes (Home, PLP, PDP, Checkout).
- [ ] Architect the ETL pipeline to sync raw transaction data directly to a Data Warehouse for accurate unit economics.
