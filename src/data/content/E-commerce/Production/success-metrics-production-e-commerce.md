---
title: Success Metrics
slug: success-metrics
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-25 min
---

# Engineering Success Metrics

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 20 Minutes

When a beginner thinks of success metrics, they immediately install Google Analytics and obsess over "Daily Pageviews" or "Bounce Rate." 

In a Production environment, relying entirely on front-end analytics dashboards is a dangerous mistake. Because of ad blockers and browser privacy features (like Apple's Intelligent Tracking Prevention), up to 30% of your client-side data is completely missing. If you make architectural or business decisions based on a dashboard that is missing a third of its data, you will burn cash.

As an AI-Assisted Architect, you must instruct your AI to engineer for **Absolute Truth**. Your success metrics must be calculated at the database level, not the browser level.

---

## 1. The Core Engineering Metrics (Speed = Revenue)

Beyond standard business metrics (like conversion rate), a Principal Architect tracks hardcore engineering metrics that directly impact revenue. 

You must instruct your AI to monitor these using APM (Application Performance Monitoring) tools like Datadog, Sentry, or New Relic.

| Metric | The Production Standard | Why It Matters |
|---|---|---|
| **P95 LCP** | Under 1.5 seconds | The 95th percentile Largest Contentful Paint. If your slowest 5% of users (P95) on mobile wait longer than 1.5 seconds, they will leave. |
| **Checkout API Latency** | Under 1 second | The time from clicking "Pay" to seeing the success screen. If it takes longer, users panic and double-click the button, causing failed payments. |
| **Edge Cache Hit Ratio** | > 85% | How often a user gets a fast, cached page vs. forcing your server to generate it. High ratios keep server costs near zero. |

## 2. The Business Data Pipeline (ETL)

Do not rely on Google Analytics to tell you your True Contribution Margin or Customer Acquisition Cost (CAC). Client-side analytics cannot see post-purchase refunds, shipping discrepancies, or the AWS server bill you just paid.

Instead, we will instruct the AI to build an **ETL (Extract, Transform, Load) pipeline**. 
This is a script that runs in the background. It pulls data from your Shopify/Swell API (sales), your Meta/Google Ads API (spend), and your Shipping API (logistics costs), and dumps it all into a Data Warehouse (like Google BigQuery). 

Only there can you see the Absolute Truth:
`Gross Revenue - (COGS + Shipping + Payment Gateway Fees + Server Costs + Ad Spend) = True Contribution Margin.`

---

## ✅ Success Metrics Checklist

- [ ] Accept that client-side Google Analytics is flawed and cannot be the single source of truth for your business.
- [ ] Determine which APM tool (e.g., Sentry, Datadog) you will use to track API latency.
- [ ] Understand the concept of an ETL pipeline dumping data into a Data Warehouse (like BigQuery).
- [ ] Use the AI prompt below to generate the code architecture for tracking these metrics.

---

## AI Prompt — Architect the ETL and APM Pipelines

Copy this prompt into your AI assistant. Do not try to build an ETL pipeline by yourself; have the AI write the serverless functions to automate it.

````prompt
I am building a Headless E-Commerce application. I need you to act as my Principal Data Architect. I want to establish absolute truth for my success metrics, and I cannot rely solely on client-side Google Analytics.

We need to design two technical pipelines:

**1. The APM (Application Performance Monitoring) Pipeline:**
- Write the configuration strategy for integrating Sentry or Datadog into our Next.js edge nodes.
- Define exactly how we will track P95 LCP (Largest Contentful Paint) and Checkout Mutation Latency. Give me the code snippets to wrap our checkout API routes in latency trackers.

**2. The ETL (Extract, Transform, Load) Data Pipeline:**
- Architect a serverless cron job (e.g., using Inngest or Vercel Cron) that extracts daily data from our Commerce Backend (Shopify/Medusa) and our Ads APIs (Meta/Google).
- Provide the exact schema required to load this data into Google BigQuery so I can calculate True Contribution Margin.

Provide the architectural diagrams (in text) and the specific Next.js code implementations to begin tracking these metrics today.
````

**Next: Store Fundamentals →**
