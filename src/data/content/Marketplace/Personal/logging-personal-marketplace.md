---
title: Logging
slug: logging
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Logging

Monitoring told you *that* something happened — a payment failed, a thread was started. Logging is what lets you reconstruct *why*, after the fact, when a user reports something monitoring didn't catch on its own.

This module isn't about adding more logs. It's about the discipline of log **levels**, **structure**, and **retention** — so that when you actually need to debug something at 11pm, you're not scrolling through thousands of identical lines.

---

## Log Levels: Use Them Deliberately

The single biggest logging mistake in personal projects is using `console.log` for everything. Without levels, you can't filter signal from noise when something goes wrong.

| Level | Use for | Example |
|---|---|---|
| `error` | Something failed and needs attention | Payment webhook failed to process |
| `warn` | Unexpected but recoverable | Retry succeeded after first attempt failed |
| `info` | Normal business events (your Monitoring module's `logEvent` calls) | Order completed, listing created |
| `debug` | Detailed internal state, off in production | Full query params, intermediate calculation steps |

```js
import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

logger.info({ orderId, amount }, "order completed");
logger.error({ orderId, error: err.message }, "payment webhook failed");
logger.debug({ filters: req.query }, "search query received");
```

> **🔑 Why this matters:** Setting the production log level to `info` automatically silences `debug` noise without deleting a single line of code — you keep the detail for local development without paying for it (in log volume and readability) in production.

---

## Decision: Where Logs Go

> **🧩 Decision Card — Log Destination**
>
> **Option A: `console.log`, captured by your hosting platform**
> Zero setup — most platforms (Render, Railway, Vercel, Fly.io) capture stdout automatically and give you a basic searchable view.
>
> **Option B: A dedicated logging service** (e.g. Better Stack, Axiom, Datadog)
> Better search, longer retention, structured querying — meaningful upgrade once log volume grows.
>
> **For Personal Mode: start with Option A.** Your hosting platform's built-in log viewer is enough until you've personally hit its limits (usually short retention, weak search). Don't add a logging service before you've felt that pain firsthand.

---

## What to Log vs. What Not To

This is the highest-leverage part of this module, because logging the wrong thing is actively harmful, not just wasteful.

> **✅ Validation Checklist — Safe to log**
> - [ ] User IDs, listing IDs, order IDs (reference data, not secrets)
> - [ ] Error messages and stack traces
> - [ ] Request method, path, status code, duration
> - [ ] Business event names and their associated IDs (from your Monitoring module)

> **🚫 Never log**
> - [ ] Passwords, even hashed ones
> - [ ] Full payment details (card numbers, even partial — your payment provider's webhook payloads often contain more than you need to store)
> - [ ] Session tokens or API keys
> - [ ] Full message bodies between buyers and sellers (this is private correspondence — log that a message was sent, not its content)
> - [ ] Raw `req.body` or `req.headers` without explicit field selection

> **⚠️ Warning:** It's tempting to log `req.body` wholesale "just in case" during debugging, then forget to remove it. Get in the habit of destructuring only the fields you need: `logger.info({ listingId: req.body.listingId })`, never `logger.info({ body: req.body })`.

---

## Structured Logging > String Concatenation

```js
// ❌ Hard to search, hard to parse later
console.log(`Order ${orderId} completed for $${amount} by user ${userId}`);

// ✅ Queryable as data, not just text
logger.info({ orderId, amount, userId }, "order completed");
```

The structured version means that once your logs live anywhere searchable (even your platform's basic log viewer), you can filter by `orderId` directly instead of writing a regex against a sentence. This pays off the very first time you're debugging a specific user's complaint.

---

## Request Logging Middleware

One piece of middleware gives you a baseline trail for every request — invaluable when a user says "it didn't work" with no further detail.

```js
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs: Date.now() - start,
        userId: req.user?.id,
      },
      "request completed"
    );
  });
  next();
}
```

> **✅ Validation Checklist**
> - [ ] Does request logging fire on response `finish`, capturing the actual status code — not logged before the response is known?
> - [ ] Is `userId` included when available, so you can filter "everything this user did" during debugging?
> - [ ] Are health-check pings (`/health`) excluded or logged at `debug` level, so they don't drown out real traffic in your log viewer?

---

## Retention: You Don't Need Forever

> **🔑 Rule of thumb:** for a personal project, 7-14 days of searchable logs is enough to debug almost anything a user reports — most bug reports come in within days, not months. Longer retention costs storage and money for diminishing value at this stage. Most hosting platforms default to something reasonable here; check the setting rather than assuming.

---

## AI Prompt: Add Structured Logging

> **📋 Copy Prompt**
>
> ```
> Add structured logging to my existing marketplace project using [pino/winston/your choice].
> This is a personal project — keep the setup minimal, no external logging service yet.
>
> Requirements:
> 1. Log levels: error, warn, info, debug — info+ in production, debug+ in development
> 2. Request logging middleware: method, path, status code, duration, userId (if authenticated)
>    — exclude /health checks from info-level logs
> 3. Replace any existing console.log calls with appropriately-leveled structured logs
> 4. Audit every log call for sensitive data — flag anywhere passwords, tokens, payment
>    details, or full message bodies might be logged, and fix them to log only IDs/references
>
> Existing code:
> [PASTE YOUR ROUTE FILES]
> ```
>
> **Why this prompt works:** explicitly asking AI to *audit* existing log calls (not just add new ones) catches accumulated debug-era `console.log(req.body)` calls that tend to survive into production undetected — this is usually more valuable than the new logging code itself.

---

## Validating AI Output

> **🚩 Common Hallucination:** AI will often add `logger.info({ req })` or `logger.debug(JSON.stringify(req.body))` as a "helpful" catch-all for debugging, directly reintroducing the sensitive-data risk this module exists to prevent. Treat any log call that includes a whole `req` or `body` object, rather than explicitly named fields, as a finding to fix — not as acceptable debug convenience.

---

## Token Efficiency Tip

Logging changes touch every route file, but the pattern is identical each time. Get AI to generate the `logger` setup and middleware once, then ask it for a short, reusable rule ("replace console.log with logger.info/error, never log full req/body objects") you can paste at the top of future feature-building prompts — cheaper than re-explaining logging conventions every time you build something new.

---

## What You've Decided

By the end of this module you should have:

- Log levels used deliberately, with `debug` silenced in production
- Structured (not string-concatenated) logs that are queryable by ID
- A request-logging middleware giving you a baseline trail for every call
- A clear, enforced boundary on what never gets logged — secrets, tokens, full payment data, private message content
- A retention setting appropriate to a personal project's actual debugging needs

**Next:** Error Tracking — going deeper on capturing, grouping, and triaging exceptions as they happen.
