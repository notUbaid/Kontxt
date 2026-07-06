---
title: Growth Analytics
slug: growth-analytics
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Cohort Analysis & Data Warehousing

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

A beginner looks at their Shopify dashboard, sees they made $10,000 this month, and celebrates.
But what if $9,000 of that came from users who registered three years ago, and only $1,000 came from new users acquired this month? The business is actually dying, but the gross revenue metric is lying to them.

In Phase 6, you must stop looking at gross revenue. You must engineer **Cohort Analysis**, **Customer Acquisition Cost (CAC) vs. LTV Tracking**, and integrate a **Data Warehouse** (like BigQuery or Snowflake).

---

## 1. The Metric that Matters: LTV : CAC

You must calculate your **LTV : CAC Ratio**.
- **LTV (Lifetime Value):** The total gross profit a customer generates before they churn.
- **CAC (Customer Acquisition Cost):** The total marketing spend divided by the number of new customers acquired.

If your CAC is $50, and your LTV is $150, your ratio is **3:1**. (This is the industry gold standard).
If your CAC is $100, and your LTV is $80, your ratio is **0.8:1**. Your business is burning cash and will mathematically go bankrupt.

**The Production Solution:**
Your Next.js database cannot calculate LTV efficiently. Running complex aggregate sums across 500,000 orders will crash your PostgreSQL database. 

You must export your data to a Data Warehouse (e.g., Google BigQuery or Snowflake).

## 2. The ETL Pipeline (Extract, Transform, Load)

You must engineer an ETL pipeline to stream your live PostgreSQL data into BigQuery.

**The Production Solution:**
Instead of running heavy cron jobs, you use a tool like **Fivetran** or configure **PostgreSQL Logical Replication** directly to BigQuery.

Once your `Users` and `Orders` tables are replicated in BigQuery, you can run massive analytical SQL queries in milliseconds without affecting your live Next.js checkout performance.

```sql
-- BigQuery SQL: Calculate LTV per User Cohort (Registration Month)
WITH UserCohorts AS (
  SELECT 
    id AS user_id, 
    DATE_TRUNC(created_at, MONTH) AS cohort_month 
  FROM \`ecommerce.Users\`
),
OrderRevenues AS (
  SELECT 
    user_id, 
    SUM(total_amount) AS total_revenue 
  FROM \`ecommerce.Orders\` 
  WHERE status = 'DELIVERED'
  GROUP BY user_id
)

SELECT 
  u.cohort_month,
  COUNT(DISTINCT u.user_id) AS total_users,
  SUM(o.total_revenue) / COUNT(DISTINCT u.user_id) AS average_ltv
FROM UserCohorts u
LEFT JOIN OrderRevenues o ON u.user_id = o.user_id
GROUP BY u.cohort_month
ORDER BY u.cohort_month DESC;
```

This query tells you exactly how much money a user who signed up in "January 2023" is worth today. 

## 3. Mixpanel (Event-Based Analytics)

BigQuery handles financial data. But how do you track *behavioral* data? 

If a user clicks "Add to Cart", views the Checkout, but abandons the cart... that event isn't in your PostgreSQL database because the order was never finalized.

**The Production Solution:**
You must implement an Event-Based Analytics tool like **Mixpanel** or **Amplitude**.

```typescript
// components/CheckoutButton.tsx
'use client';
import mixpanel from 'mixpanel-browser';

export function CheckoutButton({ cartTotal, itemCount }) {
  const handleCheckout = () => {
    // 1. Track the behavioral intent mathematically
    mixpanel.track('Checkout Initiated', {
      cart_value: cartTotal,
      item_count: itemCount,
      is_mobile: window.innerWidth < 768
    });
    
    // 2. Proceed to actual checkout route
    window.location.href = '/checkout';
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
```

In the Mixpanel dashboard, you can instantly generate a **Funnel Report**:
1. 10,000 users fired `Product Viewed`
2. 2,000 users fired `Added to Cart` (20% conversion)
3. 500 users fired `Checkout Initiated` (25% conversion)
4. 100 users fired `Purchase Completed` (20% conversion)

You can instantly see that your biggest drop-off is between "Added to Cart" and "Checkout Initiated." You know exactly where to focus your engineering efforts.

---

##  Growth Analytics Engineering Checklist

- [ ] Mathematically isolate your live Transactional Database (PostgreSQL) from analytical queries by replicating data to a Data Warehouse (BigQuery/Snowflake) via Fivetran.
- [ ] Write SQL models to calculate LTV : CAC ratios and perform Cohort Analysis based on registration month.
- [ ] Integrate Mixpanel (or Amplitude) to track behavioral funnel events (`Product Viewed` -> `Added to Cart` -> `Purchase`) to identify exact UI bottlenecks.
- [ ] Use the AI prompt below to generate the rigorous analytical architecture.

---

## AI Prompt — Engineer the Analytics Pipeline

Copy this prompt into your AI to have it generate the mathematical data warehouse queries.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Data Engineer. We are engineering our Data Warehousing and Cohort Analysis pipeline.

I need you to generate the following strict analytical implementations:

**1. The BigQuery LTV Model:**
Write a highly optimized Standard SQL query intended for Google BigQuery.
- Assume our raw data from Fivetran is in `ecommerce.users` and `ecommerce.orders`.
- The query must calculate the Average LTV (Lifetime Value) of users, grouped by the Month they registered (Cohort Analysis).
- Explain in Markdown why executing this `SUM` and `GROUP BY` query on our live Vercel PostgreSQL database would cause a catastrophic CPU spike and potentially take the checkout API offline.

**2. The Mixpanel Funnel Tracking:**
Write a React Client Component (`<CartDrawer />`).
- Show how to initialize `mixpanel-browser`.
- Inject a `mixpanel.track('Cart Opened', { totalValue, itemCount })` event when the drawer mounts.
- Explain how tracking this specific behavioral event helps us build a mathematical conversion funnel in the Mixpanel dashboard to measure drop-off rates.
````

**Next: Product Roadmap Engineering →**
