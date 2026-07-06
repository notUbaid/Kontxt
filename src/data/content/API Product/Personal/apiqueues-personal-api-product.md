---
title: Queues
slug: queues
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# Queues

The in-process job runner from the last module solves "don't block the request." It does not solve "don't lose the job if the server restarts mid-task," "retry automatically if a third-party API times out," or "don't process the same payment webhook twice because two server instances raced to handle it."

A queue is durable, persisted storage for jobs, with a separate worker process pulling from it. This module gets it running for the jobs you flagged as high-stakes — anything involving money, external commitments, or data you can't afford to silently lose.

---

## Choosing Your Queue

| Option | Fits when |
|---|---|
| **In-process runner** (previous module) | Low-stakes jobs, fine to lose on restart |
| **BullMQ + Redis** | Self-hosted, full control, the de facto standard for Node.js queues |
| **Managed queue** (Upstash QStash, AWS SQS) | Want zero infrastructure to manage, willing to pay a small usage fee |

> **Decision card — Recommended for Personal mode**
> Use **BullMQ + Redis**. It's the most widely used Node.js queue library, has excellent documentation, and if you already added Redis for rate limiting in an earlier module, there's no new infrastructure to stand up. If you don't want to run Redis at all, **Upstash QStash** is the pragmatic serverless alternative — HTTP-based, no server to manage, generous free tier.

---

## Core Concepts

| Term | Meaning |
|---|---|
| **Queue** | The durable list of pending jobs |
| **Producer** | Code that adds a job to the queue (your API route) |
| **Worker** | A separate process that pulls jobs off the queue and runs them |
| **Retry/backoff** | Automatic re-attempt on failure, with increasing delay between tries |
| **Dead-letter queue (DLQ)** | Where jobs land after exhausting all retries, for manual review |

The producer and worker are **separate processes**. Your API stays fast because it only ever does the cheap work of adding a job to the queue — the worker does the slow work independently, potentially even on a different machine.

---

## Implementation: Producer

```typescript
// lib/queue.ts
import { Queue } from "bullmq";
import { redisConnection } from "./redis";

export const jobQueue = new Queue("jobs", { connection: redisConnection });
```

```typescript
// route: triggering a durable job
router.post("/orders/:id/fulfill", authenticate, async (req, res) => {
  await jobQueue.add(
    "fulfillOrder",
    { orderId: req.params.id },
    {
      jobId: `fulfill-${req.params.id}`, // idempotency: BullMQ dedupes by jobId
      attempts: 5,
      backoff: { type: "exponential", delay: 2000 }, // 2s, 4s, 8s, 16s, 32s
    }
  );
  res.status(202).json({ status: "queued" });
});
```

> **Tip — `jobId` as an idempotency key**
> Passing a deterministic `jobId` (like `fulfill-${orderId}`) means BullMQ rejects a duplicate add for the same order instead of queuing it twice. This is the queue-level equivalent of the idempotency principle from the Background Jobs module — combine both for defense in depth.

---

## Implementation: Worker

Run this as a **separate process** from your API server (a different entry point, e.g., `worker.ts`, deployed and scaled independently).

```typescript
// worker.ts
import { Worker } from "bullmq";
import { redisConnection } from "./lib/redis";

const worker = new Worker(
  "jobs",
  async (job) => {
    switch (job.name) {
      case "fulfillOrder":
        return fulfillOrder(job.data.orderId);
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  },
  { connection: redisConnection, concurrency: 5 }
);

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed after ${job?.attemptsMade} attempts:`, err);
});
```

> **Warning — don't run the worker inside your API server**
> Importing and starting the `Worker` in the same process as your Express app defeats the purpose: if that process crashes or redeploys, both your API and your job processing go down together, and a slow job can still starve request handling on a shared event loop. Deploy the worker as its own process/service, even if it runs on the same host initially.

---

## Retries and Backoff

| Setting | What it controls |
|---|---|
| `attempts` | Maximum total tries before giving up |
| `backoff.type: "exponential"` | Delay doubles each retry — avoids hammering a struggling third-party API |
| `backoff.type: "fixed"` | Same delay every retry — simpler, less considerate of downstream load |

> **Decision card**
> Use exponential backoff for anything calling a third-party API (payment providers, email services) — it's the respectful default and most providers rate-limit aggressively if you retry too fast. Use fixed backoff only for internal operations where retry cost is negligible.

---

## Dead-Letter Handling

A job that fails all its retry attempts needs a human, not a silent drop.

```typescript
worker.on("failed", async (job, err) => {
  if (job && job.attemptsMade >= (job.opts.attempts ?? 1)) {
    await db.deadLetterJob.create({
      data: {
        jobName: job.name,
        payload: job.data,
        error: String(err),
        failedAt: new Date(),
      },
    });
    // Optional: alert yourself — email, Slack webhook, etc.
  }
});
```

Review this table periodically (or set up a basic alert). Jobs that end up here represent real, unfulfilled work — a payment that didn't get reconciled, an email that never sent.

---

## AI Prompt: Set Up a Durable Queue

```
I'm setting up BullMQ with Redis for background job processing in a
[framework] API.

Requirements:
- A producer that adds jobs with a deterministic jobId for
  idempotency (dedupe identical retries)
- 5 retry attempts with exponential backoff starting at 2 seconds
- A worker running as a SEPARATE process from the API server, with
  concurrency of 5
- On final failure (all attempts exhausted), write the job to a
  dead-letter table with the error and payload for manual review
- Show the queue setup, the worker file, and one example job
  (fulfillOrder) end to end

Do not put the worker in the same file/process as the API server.
```

---

## Validating AI Output

- **Confirm the worker is genuinely separate.** AI assistants often generate the worker in the same file as your Express app "for simplicity." Explicitly check the entry point structure.
- **Confirm `jobId` is deterministic where duplicates matter.** A random or missing `jobId` means retries or duplicate triggers create separate queue entries instead of deduping.
- **Confirm dead-letter jobs are actually written, not just logged to console.** Console logs disappear on redeploy; a database table doesn't.
- **Check Redis connection handling.** Verify the generated code handles Redis disconnects gracefully rather than crashing the worker process.

---

## Common Mistakes

- Running the worker in the same process as the API "temporarily" and never getting around to splitting it out.
- Using random job IDs, which silently defeats the deduplication BullMQ gives you for free.
- No dead-letter review process — jobs fail, get logged, and nobody ever looks.
- Setting `attempts` too low for external API calls (1–2 attempts isn't enough to ride out a transient network blip).

---

## Validation Checklist

- [ ] Worker runs as a separate process/entry point from the API server
- [ ] Jobs use deterministic `jobId`s wherever duplicate triggers are possible
- [ ] Retry `attempts` and exponential `backoff` are configured explicitly, not left at defaults
- [ ] Exhausted-retry jobs are persisted to a dead-letter table, not dropped
- [ ] You have a way (even manual, for now) to periodically check the dead-letter table
- [ ] Worker concurrency is set deliberately, not left unbounded

---

## What's Next

With reliable async processing in place, the next module — **Webhooks** — covers the other direction: notifying *other* services when events happen in your API, including signing payloads and handling delivery failures on the receiving end.
