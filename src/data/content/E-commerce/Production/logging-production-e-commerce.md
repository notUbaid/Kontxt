---
title: Logging
slug: logging
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Centralized Telemetry & Logging

**Estimated Time:** 60 Minutes

A beginner uses `console.log("Stripe Webhook Failed")` in their Next.js API route. When the serverless function spins down 10 seconds later, that log is permanently deleted from existence. When the beginner tries to figure out why an order wasn't processed three days later, they have absolutely zero forensic data.

In a production environment, you must assume your Next.js Edge servers are highly volatile. They are created and destroyed thousands of times a day.

In Phase 4, you must engineer a **Centralized Logging Aggregator** (like Datadog, Axiom, or Vercel Logs) and implement **Structured JSON Logging**.

---

## 1. Structured JSON Logging (The Forensic Standard)

If you log plain text strings (`console.log("User 123 failed to checkout because of card decline")`), it is impossible to search your logs effectively. You cannot write a query that says: *"Show me all card declines in the last hour."*

**The Production Solution:**
You must use a Structured Logging library like **Pino** or **Winston**. Every single log must be formatted as a strict JSON object.

```typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  // Redact sensitive PCI/PII data automatically before it leaves the server
  redact: ['user.email', 'payment.cardNumber', 'payment.cvc', 'headers.authorization'],
});
```

When a webhook fails, you log a structured object:

```typescript
// app/api/webhooks/stripe/route.ts
import { logger } from '@/lib/logger';

try {
  // ... stripe verification
} catch (error) {
  // STRUCTURED LOGGING
  logger.error({
    event: 'STRIPE_WEBHOOK_VERIFICATION_FAILED',
    error: error.message,
    webhookId: req.headers.get('stripe-signature'),
    ipAddress: req.headers.get('x-forwarded-for'),
  }, "A malicious webhook attempt was blocked.");
  
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

Now, in your Datadog or Axiom dashboard, you can simply type: `event:STRIPE_WEBHOOK_VERIFICATION_FAILED` and instantly see a graph of every attack attempt over the last 30 days.

## 2. Log Aggregation (Axiom / Datadog)

Because Next.js runs on Vercel, the stdout (terminal logs) are automatically captured by Vercel. However, Vercel only stores logs for a few days (depending on your plan).

**The Production Solution:**
You must install a Log Drain. Vercel allows you to pipe 100% of your structured JSON logs directly into a specialized storage engine like **Axiom** in real-time.

Axiom stores your logs indefinitely and allows you to run complex SQL-like queries against them. 

```mermaid
graph LR
    A[Next.js Serverless Edge] -->|console.log(JSON)| B(Vercel Log Drain)
    B -->|Real-Time Stream| C[(Axiom / Datadog)]
    C -->|Alerting| D[Slack: 50 Errors in 5 mins]
```

## 3. PII Redaction (Legal Compliance)

If your database throws an error, the error object might contain the user's raw email address or physical shipping address. If you blindly log that error object (`logger.error(err)`), that PII (Personally Identifiable Information) is sent to Axiom.

Under GDPR and CCPA, storing PII in unprotected log files is a massive legal liability. If Axiom is breached, your users' data is leaked.

**The Production Solution:**
As seen in the Pino configuration above, you must configure a **Redaction Array**. 
The logging library will mathematically scan the JSON payload before it prints it to the console. If it sees a key named `email` or `password`, it will overwrite the value with `[REDACTED]` before sending it to the log aggregator.

---

## ✅ Logging Engineering Checklist

- [ ] Ban text-based `console.log`. Mandate Structured JSON logging via `pino` or `winston`.
- [ ] Configure a Log Drain (e.g., Axiom) to pull logs out of the ephemeral serverless environment and into permanent storage.
- [ ] Enforce automated PII and PCI redaction within the logger configuration to protect user data from leaking into Datadog.
- [ ] Use the AI prompt below to generate the forensic logging architecture.

---

## AI Prompt — Engineer the Telemetry System

Copy this prompt into your AI to have it generate the mathematical logging standard.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal DevOps Engineer. We are engineering our Centralized Structured Logging architecture.

I need you to generate the following strict forensic implementations:

**1. The Pino Structured Logger:**
Write the `lib/logger.ts` file using the `pino` library.
- Configure it to output strict JSON.
- Implement a robust `redact` array. Show exactly which paths (e.g., `req.headers.authorization`, `email`, `creditCard`, `password`) must be scrubbed to prevent PII/PCI leaks.
- Ensure the log level is configurable via environment variables (`process.env.LOG_LEVEL`).

**2. The Webhook Audit Log Implementation:**
Write a mock Stripe Webhook route (`/api/webhooks/stripe`). 
- Show how to import the Pino logger.
- Write the exact `logger.info()` and `logger.error()` calls inside the `try/catch` block.
- Demonstrate passing a structured JSON object containing `webhookEventId`, `orderId`, and `latencyMs` as the first argument to the logger, rather than string concatenation.

**3. Vercel Log Drain Explanation:**
Write a brief markdown explanation documenting the steps required to connect Vercel to Axiom (or Datadog) via Log Drains, explaining why ephemeral serverless architecture mandates external log storage.
````

**Next: Error Tracking Engineering →**
