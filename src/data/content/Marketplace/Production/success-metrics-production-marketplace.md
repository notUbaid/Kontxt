---
title: Success Metrics
slug: success-metrics
phase: Phase 0
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Success Metrics

You now know who you're up against. Before you design the database or configure your first server, you must mathematically define what "working" means for your marketplace. 

In a production environment, you cannot rely on "gut feeling" or vanity metrics. Without strict, instrumented success metrics, you will optimize for the wrong behavior, burn capital on empty traffic, and fail to achieve liquidity. 

This module defines the quantitative framework you must architect your data layer to support.

---

## Why Generic Metrics Kill Marketplaces

Most "success metrics" advice is written for SaaS products (e.g., DAU/MAU, time-on-site). A marketplace is fundamentally different. It is an economic engine. A marketplace can have 100,000 registered users and still be completely broken if all the users are buyers and there is no supply.

> [!IMPORTANT]
> Total users, page views, and app downloads are vanity metrics. A marketplace is only healthy if the two sides are actively transacting. You must measure the intersection of supply and demand, not just their isolated existence.

---

## The Core Marketplace KPI Framework

To run a production marketplace, you must measure three distinct funnels. Your backend architecture must be designed to emit events for these specific KPIs:

| Category | Core Metric | What It Actually Measures |
|---|---|---|
| **Liquidity (The Engine)** | Search-to-Fill Rate | The percentage of buyer searches that result in a relevant, available listing. If this is near zero, your marketplace is dead on arrival. |
| **Unit Economics (The Business)** | LTV:CAC Ratio | The Lifetime Value of a user divided by their Customer Acquisition Cost. In production, if this ratio isn't > 3:1, you cannot scale profitably. |
| **Throughput (The Output)** | Gross Merchandise Value (GMV) | The total dollar value of all successful transactions on the platform. Your revenue is a percentage of this (Take Rate). |

A marketplace with 50,000 listings and zero GMV is not a marketplace—it is an un-monetized catalog. The throughput metric (GMV or Successful Matches) is the ultimate proof that the core loop works.

---

## The "Zero to One" Milestone Metrics

Before you worry about LTV:CAC at scale, you must solve the initial cold-start problem. Set realistic, highly-constrained targets for your initial launch node (e.g., one specific city, or one specific niche category):

- **Minimum Viable Supply:** The absolute minimum number of active listings required before a buyer's search yields a satisfactory result. (e.g., 50 verified tutors in a specific zip code).
- **Time-to-First-Match:** How quickly a new supplier gets their first transaction. If supply sits dormant for weeks, they will churn before demand arrives.
- **Repeat Transaction Rate:** The percentage of buyers who return to transact a second time within 30 days. This is the strongest signal of true product-market fit.

> [!WARNING]
> Do not attempt to achieve global liquidity on day one. A marketplace that is 10% saturated across 50 cities will fail. A marketplace that is 90% saturated in one neighborhood will thrive and expand.

---

## Architectural Implications of Metrics

In a production application, you do not track these metrics in a manual spreadsheet. Your architecture must natively support telemetry:

1. **Event Driven Architecture:** Your backend should emit structured events (`listing_viewed`, `transaction_initiated`, `escrow_funded`) to an analytics pipeline (like PostHog, Mixpanel, or BigQuery).
2. **Data Warehousing:** You must store historical states, not just current states. If a listing is deleted, your database must retain the relational history to calculate accurate churn rates.
3. **Cohort Analysis Tracking:** User tables must include precise `created_at` and `activation_date` timestamps so you can measure retention cohorts mathematically.

> [!TIP]
> Instrument your analytics at the API level, not just the client level. If a transaction succeeds via a webhook, your backend must fire the analytics event. Client-side tracking is inherently unreliable due to ad-blockers and network drops.

---

## AI Prompts for Defining Metrics

> [!TIP]
> **Prompt 1 — Define Your Node & Metrics:**

````prompt
I am building a marketplace for [your niche]. The supply side is [who sells], and the demand side is [who buys]. I want to constrain my initial launch to a specific "node" to achieve liquidity quickly. 
Suggest a logical launch node (geographic or categorical). Then, define the exact Minimum Viable Supply metric I need to achieve in that node before turning on demand generation. Finally, define the primary Search-to-Fill metric I should track.
````

> [!TIP]
> **Prompt 2 — Telemetry Architecture:**

````prompt
Based on the marketplace described above, list the 5 most critical backend events I need to instrument for my analytics pipeline (e.g., PostHog/Mixpanel). For each event, list the exact JSON payload properties (metadata) I must include to ensure I can calculate GMV, Liquidity, and User Retention accurately.
````

---

## Validating AI Output

- **Reject generic SaaS events:** If the AI suggests tracking `button_clicked` or `page_viewed` as top-tier metrics, prompt it to focus on transactional marketplace events (e.g., `booking_requested`).
- **Ensure Unit Economics are mathematical:** Verify that any suggested CAC or LTV formulas actually account for your specific take rate, not just gross GMV.

---

## Checklist: Success Metrics & Telemetry

## Checklist:
- [ ] Defined the primary metric for Supply Liquidity (e.g., active listings per category).
- [ ] Defined the primary metric for Demand Liquidity (e.g., search-to-fill rate).
- [ ] Defined the primary Throughput metric (e.g., GMV or Total Matched Transactions).
- [ ] Identified the highly constrained "Node" for the initial launch (geography or category).
- [ ] Documented the core backend events required for telemetry instrumentation.

---

## What's Next

Next: **Marketplace Fundamentals** — Now that we know how to measure success, we will dive into the underlying economic mechanics and network effects that every successful marketplace shares.
