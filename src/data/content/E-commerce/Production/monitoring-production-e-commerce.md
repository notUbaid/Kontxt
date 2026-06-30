---
title: Monitoring Implementation
slug: monitoring
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Monitoring

In a personal project, you know the site is down when you open it in your browser and it fails to load. In a production e-commerce store, if you wait for a customer (or your CEO) to tell you the checkout is broken, you have already lost thousands of dollars.

Monitoring is the practice of knowing your system is failing *before* the financial impact becomes catastrophic.

---

## 1. Uptime & Ping Monitoring (The Basics)

The absolute minimum requirement is knowing if the server is responding to requests.
- **Implementation:** Use a tool like Better Uptime, Datadog, or Pingdom.
- Set them to ping your API health endpoint (`GET /api/health`) every 1 minute from multiple global locations.
- If it returns a 500, trigger a PagerDuty alert to the on-call engineer.

**The E-Commerce Trap:** A 200 OK status code does not mean the store is working. If the API returns 200 but the Stripe integration is silently failing in the background, you are still losing money. Ping monitoring is insufficient on its own.

---

## 2. Synthetic Monitoring (Testing the Critical Path)

Synthetic Monitoring is an automated robot that shops on your site 24/7.

**The Architecture:**
Use tools like **Checkly** or **Datadog Synthetics**.
- Write a Playwright script that visits the homepage, searches for a product, adds it to the cart, and navigates to the checkout.
- Schedule this script to run against your production environment every 5 minutes.
- If the Add to Cart button fails, or the search API times out, the script fails and alerts your team immediately.

This guarantees that the actual user flow is functioning, verifying the database, the frontend, and third-party APIs all at once.

---

## 3. APM (Application Performance Monitoring)

APM tools (like Datadog APM, New Relic, or Sentry Performance) sit inside your application code and measure how long every function takes to execute.

**Why E-Commerce Needs APM:**
If your `POST /api/checkout` endpoint normally takes 800ms, and suddenly it takes 4,000ms, users will assume the site is broken and abandon their carts. APM tools will alert you to this latency degradation before it results in total downtime.

APM provides a "Distributed Trace". If checkout is slow, the trace will show you exactly why:
- *BFF Layer: 50ms*
- *Postgres DB: 30ms*
- *Stripe API: 150ms*
- *TaxJar API: 3,770ms (The Culprit)*

---

## 4. Business Metric Monitoring (The Ultimate Truth)

The most robust way to monitor an e-commerce store is to monitor the money.

If your systems are highly distributed, technical metrics might look green while the business fails (e.g., a CSS bug is hiding the checkout button, so no API errors are thrown, but zero orders are placed).

**The Implementation:**
Set up anomaly detection on your core business metrics.
- Track "Orders Per Minute" or "Payment Intents Created Per Minute" in Datadog or Mixpanel.
- If the historical average for a Tuesday at 2 PM is 50 orders per minute, and it suddenly drops to 0 for five minutes, fire a massive alert. The technical reason doesn't matter yet; the business is bleeding.

---

## AI Prompt — Architect Your Monitoring Infrastructure

```prompt
I am setting up the production monitoring stack for an e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js Vercel]
- Backend: [e.g., Node.js / Postgres]
- Monitoring Budget: [e.g., Startup / Enterprise]

Act as a Principal Site Reliability Engineer (SRE):
1. Write a Checkly (Playwright) Synthetic Monitoring script that navigates from the Homepage to the Cart.
2. Outline the alerting matrix. Which specific metric failures should page the on-call engineer at 2 AM (High Severity) vs. send a quiet Slack message (Low Severity)?
3. Explain how to set up an APM distributed trace between a Next.js frontend, a Node.js backend, and a Postgres database so I can visualize slow queries.
4. Detail how to construct a "Business Metric Alert" that triggers if order volume drops 80% below the historical baseline for that specific hour of the week.
```

---

## Monitoring Checklist

- [ ] Global ping monitoring configured for the `/health` endpoint
- [ ] Synthetic Monitoring (automated browser testing) deployed to run the critical checkout path every 5-10 minutes
- [ ] APM (Application Performance Monitoring) installed to track API latency and database query speeds
- [ ] Distributed tracing configured to follow requests across microservices and third-party APIs
- [ ] Business metric anomaly detection (e.g., sudden drop in Orders Per Minute) configured
- [ ] PagerDuty (or equivalent) escalation policies defined for critical alerts
