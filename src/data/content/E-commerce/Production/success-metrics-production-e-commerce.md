---
title: Success Metrics
slug: success-metrics
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Success Metrics

In production e-commerce, tracking "Revenue" is a dangerous vanity metric. If you make $1,000,000 in revenue but your shipping, returns, and ad costs equal $1,100,000, the business will fold.

Success is defined by the strict mathematical relationship between **Acquisition Cost**, **Order Profitability**, and **Lifetime Value**. Your engineering decisions (like caching, database schema, and payment integrations) must directly optimize these three pillars.

---

## 1. The Core Metrics Hierarchy

Every production team must monitor these metrics on a live dashboard.

**Tier 1: The Survival Metrics (Unit Economics)**
1. **Contribution Margin (CM):** The actual dollar amount left over from a sale after deducting Cost of Goods Sold (COGS), Payment Processing (Stripe), Fulfillment (Pick/Pack), Shipping costs, and a buffer for Returns. (e.g., $100 Order - $70 variable costs = $30 CM).
2. **Customer Acquisition Cost (CAC):** The fully blended cost to acquire a customer. (Total Marketing Spend / Total New Customers).
3. **LTV:CAC Ratio:** Your Lifetime Value compared to your CAC. A ratio of `3:1` means for every $1 you spend on ads, you generate $3 in gross profit over the customer's lifetime. If this ratio drops below `1:1`, the business is bleeding cash.

**Tier 2: The Conversion Metrics (Engineering Impact)**
1. **Conversion Rate (CVR):** The percentage of visitors who complete a purchase. In production, this is heavily influenced by Site Speed (Core Web Vitals) and Frictionless Checkout (Apple Pay).
2. **Average Order Value (AOV):** The average dollar amount spent per checkout. This metric is driven by algorithmic Upsells and Free Shipping thresholds.
3. **Cart Abandonment Rate:** High abandonment usually points to a UI failure, unexpected shipping costs, or a bug in the payment gateway.

---

## 2. Engineering the Analytics Stack

You cannot rely on Google Analytics 4 (GA4) for Tier 1 Survival Metrics. Ad blockers and Apple's Intelligent Tracking Prevention (ITP) will block 20-30% of your data.

**The Production Standard:**
You must build a true "Source of Truth" analytics pipeline using your backend database.
- **Data Warehouse:** Sync your Postgres database, Stripe API data, and Shopify/Commerce API data into a central data warehouse (e.g., Google BigQuery or Snowflake).
- **BI Tools:** Use tools like Metabase or Looker to query this data warehouse directly. This guarantees 100% accuracy for Contribution Margin and LTV calculations because the data comes directly from the payment gateway, bypassing frontend ad blockers completely.

---

## 3. The Negative Metrics (Risk Monitoring)

Success is also defined by minimizing failure.

1. **Return Rate (%):** If this spikes above 15% (depending on the category), it destroys your Contribution Margin. It often indicates a manufacturing defect or wildly inaccurate Product Descriptions.
2. **Chargeback Ratio:** If a customer disputes a charge with their credit card company, you get penalized. If your Chargeback ratio exceeds 1% of total transactions, Stripe will flag your account and potentially freeze your funds.
3. **API Latency (p99):** If the 99th percentile of your Cart API requests takes longer than 500ms, you are actively losing sales.

---

## AI Prompt — Define Your Telemetry

```prompt
I am establishing the core success metrics and telemetry infrastructure for a production e-commerce store.

Tech Stack:
- Database: [e.g., Postgres / BigQuery]
- BI Tool: [e.g., Metabase]

Act as a Principal Data Engineer:
1. Provide the exact SQL logic required to calculate the "Contribution Margin" of a single order, joining the Orders table with the COGS, Shipping, and Payment Fees tables.
2. Explain why frontend analytics (like Google Analytics) are fundamentally flawed for calculating LTV:CAC, and why we must rely on a backend Data Warehouse architecture.
3. Define the alerting thresholds for "Chargeback Ratio" and "Return Rate", and outline the automated alerts we should configure in our BI tool if those thresholds are breached.
```

---

## Success Metrics Checklist

- [ ] Core Unit Economics (Contribution Margin, CAC, LTV:CAC) defined and understood by the engineering team
- [ ] Backend Data Warehouse architecture (e.g., BigQuery + Metabase) established to bypass frontend ad blockers
- [ ] Real-time dashboards configured for Tier 2 Conversion Metrics (CVR, AOV, Cart Abandonment)
- [ ] Negative Risk Metrics (Return Rate, Chargeback Ratio, p99 Latency) actively monitored with automated alerting
