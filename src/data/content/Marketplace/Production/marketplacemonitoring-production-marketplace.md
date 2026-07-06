---
title: Monitoring
slug: monitoring
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Monitoring (Observability & Alerting)

## From Reactive to Proactive

In a personal project, you find out the checkout flow is broken when a user emails you. In a production marketplace, if checkout breaks on a Friday night and you find out on Monday morning, you have lost tens of thousands of dollars in Gross Merchandise Volume (GMV).

Production monitoring is not just about logging errors; it is about **Observability** (understanding exactly why a complex distributed system failed) and **Proactive Alerting** (waking up the right engineer before the customer notices).

---

## Distributed Tracing (APM)

Marketplaces are inherently distributed. A buyer clicks "Checkout", which hits your Next.js API, which talks to Postgres, which calls the Stripe API, which hits the Inngest queue to send an email. 
If that request takes 9 seconds, standard logs will not tell you *which* step was slow.

**The Production Standard:**
You must implement an **Application Performance Monitoring (APM)** tool (e.g., Datadog, Sentry, New Relic) utilizing **OpenTelemetry**.
This injects a `trace_id` at the edge and passes it through every microservice and database query. When a transaction fails or stalls, you can look at a visual Waterfall chart showing exactly where the latency occurred.

---

## Synthetic Monitoring (The Golden Path)

Uptime checkers (like UptimeRobot) that ping `GET /health` every minute are insufficient. A `/health` endpoint will return `200 OK` even if your Stripe integration is completely broken and checkout is impossible.

**The Production Defense:** Implement **Synthetic Monitoring**.
1. Write a Playwright E2E script that signs in as a test buyer, searches for a listing, adds it to the cart, and clicks Checkout.
2. Configure a service like Datadog Synthetics or Checkly to run this script against your production environment every 5 minutes.
3. If the script fails, it means the core business logic is broken, regardless of what the `/health` endpoint says.

---

## Alert Routing and PagerDuty

If you send every warning log to a Slack channel, your engineering team will experience **Alert Fatigue** and start ignoring the channel. When a real outage happens, no one will notice.

**The Production Alerting Workflow:**
1. **Low Severity (Warnings / 404s):** Log to Elasticsearch/Datadog. No notifications.
2. **Medium Severity (Spike in 500 errors):** Send a message to a `#dev-alerts` Slack channel during business hours.
3. **High Severity (Checkout down / Stripe Webhook failures):** Trigger an incident in **PagerDuty** or **Opsgenie**. This bypasses phone "Do Not Disturb" modes and physically wakes up the on-call engineer at 3:00 AM. If they don't acknowledge within 5 minutes, it escalates to the CTO.

---

## Do's and Don'ts of Production Monitoring

- **DO sanitize logs.** Never log PII (Personally Identifiable Information). If a user's password, credit card token, or full email address ends up in Datadog, you have committed a major compliance violation.
- **DON'T alert on individual errors.** Alert on **Error Rates** and **SLO Burn Rates** (e.g., "Error rate > 5% for 5 minutes"). A single failed database connection should not trigger a PagerDuty incident.
- **DO use structured logging.** Always log in JSON format (`{"level":"info", "event":"order_created", "user_id":"123"}`) so your APM tool can index and query the fields.
- **DON'T forget Business Metrics.** Monitor GMV, active listings, and successful checkouts per hour. If GMV drops to $0 for an hour but no errors are firing, something is still fundamentally broken (e.g., a CSS bug hiding the "Buy" button).

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — OpenTelemetry Setup:**

````prompt
Act as a Site Reliability Engineer (SRE). Write the Node.js initialization code to configure `@opentelemetry/sdk-node` for a backend API. It must automatically instrument the `express`, `http`, and `@prisma/instrumentation` libraries. Configure it to export traces to a standard OTLP endpoint (like Datadog or Sentry) and include logic to ensure the `trace_id` is automatically attached to all JSON log outputs.
````

> [!TIP]
> **Prompt 2 — Synthetic Monitoring Script:**

````prompt
Write a Checkly/Playwright synthetic monitoring script. It should navigate to `https://production-marketplace.com`, search for a specific test listing, click "Buy Now", and verify that the Stripe Checkout UI renders successfully. Use standard Playwright assertions. Do not actually complete the purchase, just verify the checkout session was created successfully.
````

---

## Validating What AI Generates

- **Check for PII leaks in logging:** If AI generates an error handler that does `console.error(JSON.stringify(req.body))`, reject it immediately. Request bodies often contain passwords or sensitive data. Demand a sanitizer function.
- **Verify Alerting Thresholds:** If AI generates a Datadog monitor configuration that triggers an alert on `count(error) > 1`, correct it. Alerts must be threshold-based (e.g., rate or percentage over a rolling 5-minute window) to prevent noise.

---

## Implementation Checklist

- [ ] Configured OpenTelemetry / APM (Datadog, Sentry) for distributed tracing across the backend and database.
- [ ] Deployed Synthetic Monitoring (Checkly/Playwright) to continuously test the "Golden Path" (Search -> Checkout) in production.
- [ ] Integrated PagerDuty/Opsgenie for High-Severity incident escalation to on-call engineers.
- [ ] Implemented strict PII sanitization in the logging middleware.
- [ ] Created dashboards for both Engineering Metrics (Latency, Error Rates) and Business Metrics (GMV, Checkout Completion).

---

## What's Next

Next: **Logging** — Observability requires pristine data. We will establish structured logging standards, implement log aggregation pipelines (ELK/Axiom), and configure log retention policies for compliance and auditing.
