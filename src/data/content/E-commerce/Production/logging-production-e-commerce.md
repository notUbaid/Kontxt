---
title: Logging Implementation
slug: logging
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Logging Implementation

At a small scale, `console.log()` is how you debug. At production scale, `console.log()` in a serverless function vanishes into the void the moment the function shuts down. 

When a customer complains that they were charged but never received a receipt, or when the finance team asks why Stripe payouts are $5,000 short of the database revenue, logs are the only way to reconstruct the past.

---

## 1. Structured Logging (JSON)

Never write text strings to your logs.

**The Anti-Pattern:**
`console.log("Order 12345 completed for user test@example.com at $50.00")`
If you need to query your logs to find all orders over $40 that failed today, you cannot easily parse this string.

**The Production Pattern: Structured JSON Logs**
Use a logging library like **Pino** or **Winston** to write logs as strictly structured JSON objects.
```javascript
logger.info({
  event: 'order_completed',
  orderId: '12345',
  userId: 'usr_999',
  amountCents: 5000,
  latencyMs: 340
}, 'Order successfully processed');
```
Because the log is JSON, your log aggregator (Datadog, Axiom, AWS CloudWatch) can instantly index every field. You can write a query like: `SEARCH event="order_completed" AND amountCents > 4000`.

---

## 2. Centralized Log Aggregation

In modern e-commerce architectures, you have multiple systems generating logs:
- Vercel (Frontend Next.js logs)
- AWS/Supabase (Database logs)
- Stripe (Payment webhook logs)
- Inngest/Queue (Background worker logs)

If an order fails, you cannot manually check 4 different dashboards. 
**Implementation:** You must pipe all logs into a centralized aggregator (e.g., **Axiom**, **Datadog**, or **Elastic/ELK**).
Assign a `trace_id` (a unique UUID) at the very edge when the request hits your server. Pass that `trace_id` to every subsequent function and background job. This allows you to pull up the trace ID in Datadog and see the entire lifecycle of a specific request across all microservices.

---

## 3. PII & PCI Redaction (The Compliance Risk)

Logging can accidentally create massive security liabilities.

If a developer adds `logger.error({ payload: req.body })` to debug a failed checkout, they might accidentally log raw credit card numbers or plain-text passwords into your Datadog instance. This immediately violates PCI compliance and breaches GDPR.

**The Implementation:**
Configure your logger (e.g., Pino) with strict redaction rules before it ever writes to standard output.
```javascript
const pino = require('pino')({
  redact: {
    paths: ['password', 'card_number', 'cvv', 'req.headers.authorization', 'user.ssn'],
    censor: '[REDACTED]'
  }
});
```

---

## 4. Audit Logging (For Finance & Support)

System logs are for engineers. Audit logs are for the business.

When an order status changes from `PAID` to `REFUNDED`, you must record an immutable audit log in your primary database (not just in Datadog, which deletes logs after 30 days).

**Implementation:**
Create an `OrderAuditLog` table.
Whenever a status changes, write a row:
`timestamp | order_id | actor_id (who did it) | previous_state | new_state | reason`

If a customer support agent maliciously issues refunds to their friends, this audit log is the only way the business will discover it.

---

## AI Prompt — Architect Your Logging Strategy

```prompt
I am implementing the logging infrastructure for a production e-commerce store.

Tech Stack:
- Framework: [e.g., Next.js Node.js]
- Log Aggregator: [e.g., Axiom / Datadog / CloudWatch]
- Central DB: [e.g., Postgres]

Act as a Principal Software Engineer:
1. Provide the exact Pino logger configuration required to format logs as structured JSON and redact sensitive PCI/PII data before writing.
2. Explain how to generate and propagate a `trace_id` across a Next.js API route and into a background job (e.g., Inngest or BullMQ) to ensure logs can be correlated across services.
3. Write the Prisma schema for an `OrderAuditLog` table, and demonstrate how to write to it inside a database transaction alongside an order status update.
```

---

## Logging Implementation Checklist

- [ ] Structured JSON logging (e.g., Pino) implemented across all backend services
- [ ] Centralized log aggregator (Axiom, Datadog) configured to ingest logs from all hosts
- [ ] Strict PII and PCI redaction rules configured at the logger level to prevent sensitive data leaks
- [ ] Trace IDs implemented to correlate logs across disparate microservices and background queues
- [ ] Immutable Audit Logs (stored in the primary database) implemented for all financial and order-state mutations
- [ ] Log retention policies verified (e.g., 30 days for system logs, 7 years for financial audit logs)
