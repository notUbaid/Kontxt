---
title: Background Jobs
slug: background-jobs
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# Background Jobs

Every request your API handles has a client waiting on the other end. If that request also has to send an email, call a third-party API, or process a file before responding, you've tied your response time — and your reliability — to the slowest, least predictable part of the operation.

Background jobs move that work out of the request/response cycle. The API responds fast and reliably; the slow or unreliable part happens after, with its own retry logic.

This module covers *when* to reach for background jobs and *how to design them safely*. The next module, **Queues**, covers the infrastructure that runs them at scale — this one gets the concept and a working implementation in place first.

---

## Identifying What Belongs in the Background

Ask one question per operation: **does the client need the result of this step to get a valid response?**

| Operation | Blocks the response? | Belongs in background |
|---|---|---|
| Validate and save the core resource | Yes | No — this stays synchronous |
| Send a confirmation email | No | Yes |
| Call a third-party API (e.g., payment provider webhook, enrichment service) | Depends | Usually yes, unless the result must be in the response |
| Generate a thumbnail/derived file | No | Yes |
| Write an audit log entry | No | Yes |

> **Decision card**
> If removing a step from the request entirely wouldn't change what the client needs to see in the response, move it to the background. If the client's response *depends on the outcome* (e.g., "here's your generated report"), it either stays synchronous or the response becomes "processing — check back at this URL" (see **Async Response Pattern** below).

---

## The Idempotency Rule

> **Every background job must be safe to run more than once.**

This is the single most important design constraint, and it's the one AI-generated job code most often skips. Jobs get retried — because of crashes, timeouts, or deploys — and a job that isn't idempotent will double-send emails, double-charge a webhook consumer, or create duplicate records on retry.

**How to make a job idempotent:**

```typescript
// NOT idempotent — running twice creates two records
async function processOrder(orderId: string) {
  await db.shipment.create({ data: { orderId, status: "queued" } });
}

// Idempotent — safe to run any number of times
async function processOrder(orderId: string) {
  await db.shipment.upsert({
    where: { orderId },
    create: { orderId, status: "queued" },
    update: {}, // already exists, no-op
  });
}
```

For jobs that call external services (charge a card, send an email), use an **idempotency key** — a unique ID for that specific operation attempt, passed to the third-party API so it recognizes and deduplicates retries on its end too. Most payment and email providers support this natively.

---

## Async Response Pattern

When the client genuinely needs a result that takes too long to produce synchronously, don't make them hold a connection open. Return immediately with a way to check status.

```typescript
// POST /reports  → kicks off the job, responds immediately
router.post("/reports", authenticate, async (req, res) => {
  const job = await db.reportJob.create({
    data: { userId: req.user.id, status: "pending" },
  });
  await enqueueJob("generateReport", { jobId: job.id });

  res.status(202).json({
    jobId: job.id,
    status: "pending",
    statusUrl: `/reports/${job.id}`,
  });
});

// GET /reports/:id → client polls this
router.get("/reports/:id", authenticate, async (req, res) => {
  const job = await db.reportJob.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!job) return res.status(404).json({ error: "Not found" });
  res.json({ status: job.status, result: job.result ?? null });
});
```

> **Tip — status code**
> `202 Accepted` is the correct status for "request accepted, processing not complete" — not `200`. It tells API consumers explicitly that they need to poll or listen for completion rather than treating the response body as the final result.

---

## Simplest Implementation for Personal Scale

You don't need a message broker to get the core benefits of background processing. Start with an in-process job runner — it removes the blocking behavior with zero added infrastructure, and gives you a clean interface to swap in a real queue (covered next) later without touching your route handlers.

```typescript
// lib/jobs.ts
type JobHandler = (payload: any) => Promise<void>;
const handlers: Record<string, JobHandler> = {};

export function registerJob(name: string, handler: JobHandler) {
  handlers[name] = handler;
}

export async function enqueueJob(name: string, payload: any) {
  // Fire-and-forget, but caught and logged — never let a background
  // failure throw inside a request handler
  setImmediate(async () => {
    try {
      await handlers[name](payload);
    } catch (err) {
      console.error(`Job "${name}" failed:`, err);
      // record failure — see monitoring section below
      await db.jobFailure.create({
        data: { jobName: name, payload, error: String(err) },
      });
    }
  });
}
```

```typescript
// jobs/send-welcome-email.ts
registerJob("sendWelcomeEmail", async ({ userId }) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  await emailProvider.send({ to: user.email, template: "welcome" });
});
```

> **Warning — this is a starting point, not the end state**
> `setImmediate` runs in the same process as your API. If the server restarts before the job finishes, the job is lost — there's no persistence or automatic retry. This is an acceptable trade-off for low-stakes jobs (welcome emails) on a personal project. It is **not** acceptable for anything involving money, contractual obligations, or data you can't afford to lose. Those need the durable queue covered in the next module.

---

## Monitoring Failures

Even at small scale, silently swallowed job failures are how "the confirmation email never sent" bugs go unnoticed for weeks. The minimum viable version: log failures to a table you can query, and alert yourself when they happen.

```typescript
// After several failures logged, you'd query:
const recentFailures = await db.jobFailure.findMany({
  where: { createdAt: { gte: oneDayAgo } },
  orderBy: { createdAt: "desc" },
});
```

At personal-project scale, a daily email digest of `jobFailure` rows or a simple check-in script is enough. Don't build a full observability stack for this yet.

---

## AI Prompt: Implement a Background Job

```
I'm adding a background job to a [framework] API.

The job: [describe — e.g., "send a welcome email after user signup"]

Requirements:
- The job must be idempotent — safe to run more than once for the
  same input without duplicate side effects
- If the job fails, log the failure (job name, payload, error) to a
  database table rather than losing it silently
- The job must not block or throw inside the request handler that
  triggers it
- Use [in-process runner / describe your actual setup] — do not
  introduce a new queue library for this

Show the job handler, the failure logging, and how it's triggered
from a route.
```

---

## Validating AI Output

- **Check idempotency explicitly.** AI-generated job handlers default to "create" operations. Ask directly: "what happens if this job runs twice with the same payload?" If the answer is "a duplicate record," it needs an upsert or an idempotency key.
- **Check that failures are caught, not thrown.** A job handler that throws uncaught inside a fire-and-forget call can crash the process depending on your runtime — verify errors are caught at the call site, not just inside the handler.
- **Check the job doesn't silently do nothing on failure.** "Catch and log to console" is not sufficient — verify failures are persisted somewhere queryable.

---

## Validation Checklist

- [ ] Every background job can run more than once for the same input without bad side effects
- [ ] Jobs that call paid or rate-limited third-party APIs use an idempotency key
- [ ] Job failures are persisted (not just console-logged) and reviewable
- [ ] Long-running jobs the client needs results from use the async response pattern (`202` + status URL), not a held-open request
- [ ] You've identified which jobs are low-stakes (fine to lose on a crash) vs high-stakes (need durable queuing — flagged for the next module)

---

## What's Next

The next module — **Queues** — replaces the in-process runner with a durable, persisted queue for the jobs you've flagged as high-stakes: automatic retries with backoff, dead-letter handling for jobs that fail repeatedly, and survival across server restarts.
