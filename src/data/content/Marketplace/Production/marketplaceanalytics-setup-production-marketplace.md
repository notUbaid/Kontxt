---
title: Analytics Setup
slug: analytics-setup
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Analytics Setup (Data Infrastructure)

## The Truth About Client-Side Analytics

In a personal project, you paste a Google Analytics script into your `<head>` and call it a day. In a production marketplace, that approach means your data is fundamentally broken.

Ad blockers and browser privacy features (like Apple's Intelligent Tracking Prevention) block up to 30% of client-side tracking scripts. If you rely on client-side analytics to track "Order Completed" events, your analytics dashboard will show $70,000 in GMV, while Stripe shows $100,000. You cannot run a business on data that is 30% wrong.

---

## Server-Side Tracking (The Production Standard)

**You must track critical business events from the Backend, never the Frontend.**

When a user completes a checkout, your Node.js server (which cannot be blocked by an ad blocker) must trigger the `Order Completed` event and push it to your Customer Data Platform (CDP).

**The Production Analytics Stack:**
1. **The CDP (Segment / RudderStack):** You send all backend events (Signup, Order Created, Listing Published) to a single API.
2. **The Product Analytics (Mixpanel / Amplitude / PostHog):** The CDP forwards the data here. This is where you build Funnels and Cohort Retention charts.
3. **The Data Warehouse (Snowflake / BigQuery):** The CDP also dumps the raw event JSON into a data warehouse for complex financial modeling.

---

## Core Marketplace Metrics (What to Track)

You must explicitly measure the health of both the Demand and Supply sides.

### 1. Liquidity Metrics
A marketplace is only valuable if transactions actually happen.
* **Buyer Liquidity:** The percentage of visitors who make a purchase within 30 days.
* **Seller Liquidity:** The percentage of listings that sell within 30 days of being published. (If this drops below 10%, sellers will churn because they aren't making money).

### 2. Unit Economics
* **GMV (Gross Merchandise Value):** Total dollar amount flowing through the platform.
* **Net Revenue (Take Rate):** The GMV multiplied by your commission rate (e.g., $100k GMV * 10% = $10k Net Revenue).
* **CAC vs. LTV:** Customer Acquisition Cost vs. Lifetime Value. (A healthy marketplace targets an LTV/CAC ratio of 3:1).

---

## ETL and Business Intelligence (BI)

Event tracking tells you *what* users did. Your Postgres database holds the *actual state* of the platform.

**The Production Reporting Pipeline:**
You should not run complex analytical `GROUP BY` queries on your production Postgres database. It will lock tables and crash your checkout flow.
1. Use an **ETL Tool** (e.g., Fivetran or Airbyte) to sync your Postgres database to a **Data Warehouse** (BigQuery) every 15 minutes.
2. Connect a **BI Tool** (Metabase, Looker, or Superset) to the Data Warehouse.
3. Build dashboards combining the Postgres data (Total active listings) with the Event data (Total searches).

---

## Do's and Donts of Production Analytics

- **DO establish a Tracking Plan.** Before writing code, create a spreadsheet listing exactly what events you will track (e.g., `listing_created`), what properties they include (`category: "electronics"`), and when they fire. Enforce this strictly.
- **DON'T send PII to analytics tools.** Never send passwords, SSNs, or raw credit card data to Mixpanel. Hash email addresses or use generic `user_id` uuids.
- **DO use Identity Stitching.** Ensure you track anonymous sessions (before a user logs in) and "stitch" them to the user's `user_id` when they finally create an account, so you can track the full acquisition funnel.
- **DON'T build custom dashboards if you don't have to.** Tools like PostHog provide auto-capture and pre-built funnel templates that save weeks of engineering time.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Server-Side Tracking Integration:**

````prompt
Act as a Data Engineer. Write a Node.js utility class using the `@segment/analytics-node` SDK. The class should include strongly-typed methods for core marketplace events: `trackSignup`, `trackListingCreated`, and `trackOrderCompleted`. Ensure the `trackOrderCompleted` method requires specific financial properties (`revenue`, `currency`, `listing_id`, `seller_id`) to enforce data consistency.
````

> [!TIP]
> **Prompt 2 — SQL Liquidity Query:**

````prompt
Write a PostgreSQL query (optimized for a Data Warehouse like BigQuery) that calculates "Seller Liquidity." Specifically, calculate the percentage of listings created in the last 30 days that had their status changed to `SOLD` within 7 days of creation. Group the results by `category` to see which categories have the highest liquidity.
````

---

## Validating What AI Generates

- **Check for Client-Side bias:** If AI suggests putting `mixpanel.track('Payment Successful')` inside a React `onClick` handler for the checkout button, reject it immediately. If the backend payment fails, or if the user closes the tab too early, the analytics will record a fake purchase. Financial events must fire from the server.
- **Verify Naming Conventions:** Ensure AI uses a consistent naming convention (e.g., `Object Action` format like `Listing Published` or `snake_case` like `listing_published`). Inconsistent casing ruins analytics dashboards.

---

## Implementation Checklist

- [ ] Implemented Server-Side tracking via a CDP (Segment/RudderStack) to guarantee 100% accuracy for critical business events.
- [ ] Created a strict Tracking Plan spreadsheet defining core events (`Order Completed`, `Listing Published`).
- [ ] Configured a Product Analytics tool (Mixpanel/Amplitude) to measure Funnel Conversion and Cohort Retention.
- [ ] Set up an ETL pipeline (Fivetran/Airbyte) to safely sync production Postgres data to a Data Warehouse (BigQuery/Snowflake).
- [ ] Built a BI Dashboard (Metabase) to track GMV, Take Rate, and Buyer/Seller Liquidity.

---

## What's Next

Next: **SEO (Search Engine Optimization)** — Now that you can track exactly how users behave when they arrive, it is time to acquire them for free. We will architect Programmatic SEO strategies, Server-Side Rendering (SSR), and dynamic XML Sitemaps to dominate Google rankings.
