---
title: Background Jobs
slug: background-jobs
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Background Jobs

If a user has to wait for your API to send an email, resize an image, process a payment webhook, or generate a report — your architecture is wrong.

Background jobs move slow, unreliable, or resource-intensive work off the request/response cycle. They are the difference between a responsive application and one that times out under load.

---

## The Core Principle

```
 HTTP Request → [send email] → [resize image] → [update DB] → Response (8 seconds)

 HTTP Request → [enqueue job] → Response (50ms)
                      ↓
               [Worker picks up job]
               [send email]
               [resize image]
               [update DB]
```

The user gets an instant response. The work happens reliably in the background.

---

## When You Need Background Jobs

| Task | Why It Needs a Job |
|---|---|
| Sending emails / SMS | SMTP is slow, can fail, should retry |
| Processing uploaded files | CPU/memory intensive, blocks request thread |
| Generating reports / exports | Takes seconds to minutes |
| Payment webhook processing | Must be idempotent and retryable |
| Sending notifications | Fan-out to many users shouldn't block |
| Syncing with external APIs | External services are unreliable |
| Scheduled tasks (cron) | Database cleanup, billing cycles, reminders |
| Search index updates | Async after data changes |

---

## Choosing Your Queue Backend

| Backend | Best For | Tradeoff |
|---|---|---|
| **Redis (BullMQ)** | Most production apps | Requires Redis instance |
| **PostgreSQL (pg-boss)** | Already using Postgres, simpler infra | Slightly higher DB load |
| **SQS** | AWS-native apps | Vendor lock-in, more setup |
| **Inngest** | Serverless / edge environments | Managed cost |

**For most production web apps: BullMQ on Redis.**

It's battle-tested, has an excellent dashboard, handles retries/delays/priorities natively, and Redis is already cheap and fast.

---

## Part 1: BullMQ Setup

### Install

```bash
npm install bullmq ioredis
```

### Redis Connection

```typescript
// lib/redis.ts
import { Redis } from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false,
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});
```

---

### Define Your Queues

One queue per domain. Don't throw everything into a single queue.

```typescript
// lib/queues.ts
import { Queue } from 'bullmq';
import { redis } from './redis';

const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 1000, // 1s, 2s, 4s
  },
  removeOnComplete: { count: 100 },  // Keep last 100 completed jobs
  removeOnFail: { count: 500 },      // Keep last 500 failed jobs for debugging
};

export const emailQueue = new Queue('email', {
  connection: redis,
  defaultJobOptions,
});

export const fileQueue = new Queue('file-processing', {
  connection: redis,
  defaultJobOptions,
});

export const notificationQueue = new Queue('notifications', {
  connection: redis,
  defaultJobOptions,
});
```

---

### Define Job Types

Typed payloads prevent silent runtime errors.

```typescript
// types/jobs.ts

export type EmailJobData =
  | { type: 'welcome'; userId: string; email: string }
  | { type: 'password-reset'; userId: string; email: string; token: string }
  | { type: 'invoice'; userId: string; email: string; invoiceId: string };

export type FileJobData =
  | { type: 'image-resize'; fileId: string; userId: string; targetSizes: number[] }
  | { type: 'csv-export'; reportId: string; userId: string; filters: Record<string, unknown> };

export type NotificationJobData = {
  type: 'push' | 'in-app';
  userId: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
};
```

---

### Enqueue Jobs from Your API

```typescript
// services/emailService.ts
import { emailQueue } from '../lib/queues';
import { EmailJobData } from '../types/jobs';

export async function sendWelcomeEmail(userId: string, email: string) {
  await emailQueue.add(
    'welcome',
    { type: 'welcome', userId, email } satisfies EmailJobData,
    {
      // Deduplicate: don't send the same welcome email twice
      jobId: `welcome-${userId}`,
    }
  );
}

export async function sendPasswordReset(userId: string, email: string, token: string) {
  await emailQueue.add(
    'password-reset',
    { type: 'password-reset', userId, email, token } satisfies EmailJobData,
    {
      // Expire token link after 1 hour
      delay: 0,
      jobId: `password-reset-${userId}-${token.slice(0, 8)}`,
    }
  );
}
```

```typescript
// In your route handler
router.post('/auth/register', asyncHandler(async (req, res) => {
  const user = await userService.create(req.body);
  
  // Fire and forget — don't await
  await sendWelcomeEmail(user.id, user.email);
  
  res.status(201).json({ user });
}));
```

---

## Part 2: Workers

Workers are separate processes that consume jobs from the queue.

```typescript
// workers/emailWorker.ts
import { Worker, Job } from 'bullmq';
import { redis } from '../lib/redis';
import { EmailJobData } from '../types/jobs';
import { sendEmail } from '../lib/mailer';
import { logger } from '../lib/logger';

const emailWorker = new Worker<EmailJobData>(
  'email',
  async (job: Job<EmailJobData>) => {
    logger.info({ jobId: job.id, type: job.data.type, userId: job.data.userId }, 'Processing email job');

    switch (job.data.type) {
      case 'welcome':
        await sendEmail({
          to: job.data.email,
          template: 'welcome',
          variables: { userId: job.data.userId },
        });
        break;

      case 'password-reset':
        await sendEmail({
          to: job.data.email,
          template: 'password-reset',
          variables: { token: job.data.token },
        });
        break;

      case 'invoice':
        await sendEmail({
          to: job.data.email,
          template: 'invoice',
          variables: { invoiceId: job.data.invoiceId },
        });
        break;

      default:
        throw new Error(`Unknown email job type`);
    }
  },
  {
    connection: redis,
    concurrency: 5, // Process 5 emails simultaneously
  }
);

emailWorker.on('completed', (job) => {
  logger.info({ jobId: job.id, type: job.data.type }, 'Email job completed');
});

emailWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, type: job?.data.type, error: err.message }, 'Email job failed');
});

export { emailWorker };
```

---

### Worker Entry Point

```typescript
// workers/index.ts
import { emailWorker } from './emailWorker';
import { fileWorker } from './fileWorker';
import { notificationWorker } from './notificationWorker';
import { logger } from '../lib/logger';

logger.info('Workers started');

// Graceful shutdown
async function shutdown() {
  logger.info('Shutting down workers...');
  await Promise.all([
    emailWorker.close(),
    fileWorker.close(),
    notificationWorker.close(),
  ]);
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

Run workers as a separate process:

```json
// package.json
{
  "scripts": {
    "start": "node dist/server.js",
    "workers": "node dist/workers/index.js"
  }
}
```

> **Why separate processes?** Workers and your API server have different scaling needs. A traffic spike needs more API instances. A job backlog needs more workers. Separate processes let you scale them independently.

---

## Part 3: Scheduled Jobs (Cron)

BullMQ supports repeatable jobs natively.

```typescript
// lib/scheduledJobs.ts
import { emailQueue } from './queues';

export async function registerScheduledJobs() {
  // Daily digest email — runs at 8am UTC
  await emailQueue.add(
    'daily-digest',
    { type: 'daily-digest' },
    {
      repeat: { pattern: '0 8 * * *' },
      jobId: 'daily-digest-cron', // Stable ID prevents duplicate registration
    }
  );

  // Weekly billing check — runs every Monday at midnight
  await emailQueue.add(
    'billing-check',
    { type: 'billing-check' },
    {
      repeat: { pattern: '0 0 * * 1' },
      jobId: 'billing-check-cron',
    }
  );
}
```

Call `registerScheduledJobs()` once on worker startup. BullMQ deduplicates by `jobId`, so restarting workers doesn't create duplicate cron jobs.

---

## Part 4: Job Progress & Status

For long-running jobs (exports, reports), expose progress to the frontend.

```typescript
// In your worker
const fileWorker = new Worker<FileJobData>('file-processing', async (job) => {
  const { fileId, targetSizes } = job.data;

  for (let i = 0; i < targetSizes.length; i++) {
    await resizeImage(fileId, targetSizes[i]);
    
    // Update progress: 0–100
    await job.updateProgress(Math.round(((i + 1) / targetSizes.length) * 100));
  }
});
```

```typescript
// API endpoint to check job status
router.get('/jobs/:jobId/status', asyncHandler(async (req, res) => {
  const job = await fileQueue.getJob(req.params.jobId);

  if (!job) throw new NotFoundError('Job');

  const state = await job.getState();

  res.json({
    jobId: job.id,
    state,                    // 'waiting' | 'active' | 'completed' | 'failed'
    progress: job.progress,
    result: state === 'completed' ? job.returnvalue : undefined,
    failedReason: state === 'failed' ? job.failedReason : undefined,
  });
}));
```

Poll this from the frontend, or pair it with a WebSocket for real-time updates.

---

## Part 5: Idempotency

Jobs can run more than once. Network glitches, worker crashes, and retries all cause reprocessing. Your jobs must handle this safely.

```typescript
//  Not idempotent — charges customer twice on retry
async function processPayment(job: Job) {
  await stripe.paymentIntents.create({ amount: job.data.amount });
}

//  Idempotent — Stripe deduplicates via idempotencyKey
async function processPayment(job: Job) {
  await stripe.paymentIntents.create(
    { amount: job.data.amount, currency: 'usd' },
    { idempotencyKey: `payment-${job.data.orderId}` }
  );
}
```

Rules for idempotent jobs:
- Use stable, deterministic IDs for external API calls
- Check if the operation already completed before performing it
- Use database upserts instead of inserts where possible
- Use BullMQ's `jobId` option to prevent duplicate enqueuing

---

## Part 6: Dead Letter Handling

When a job exhausts all retries, it moves to the failed state. Don't let it disappear silently.

```typescript
// workers/emailWorker.ts
import { QueueEvents } from 'bullmq';

const emailQueueEvents = new QueueEvents('email', { connection: redis });

emailQueueEvents.on('failed', async ({ jobId, failedReason }) => {
  logger.error({ jobId, failedReason }, 'Email job permanently failed');

  // Alert your team
  await alertingService.send({
    severity: 'high',
    title: `Email job ${jobId} failed permanently`,
    message: failedReason,
  });

  // Optionally: move to a dead-letter queue for manual inspection
  const job = await emailQueue.getJob(jobId);
  if (job) {
    await deadLetterQueue.add('failed-email', {
      originalJob: job.data,
      failedReason,
      failedAt: new Date().toISOString(),
    });
  }
});
```

---

## Part 7: Bull Board (Dashboard)

Visibility into your queues is non-negotiable in production.

```bash
npm install @bull-board/express @bull-board/api
```

```typescript
// lib/bullBoard.ts
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { emailQueue, fileQueue, notificationQueue } from './queues';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(fileQueue),
    new BullMQAdapter(notificationQueue),
  ],
  serverAdapter,
});

export { serverAdapter };
```

```typescript
// server.ts
import { serverAdapter } from './lib/bullBoard';

// Protect with admin auth middleware
app.use('/admin/queues', requireAdminAuth, serverAdapter.getRouter());
```

>  **Never expose the queue dashboard publicly.** It shows job payloads which may contain user data, and allows manual job retries and deletions.

---

## Implementation Checklist

- [ ] Redis connection configured with `maxRetriesPerRequest: null`
- [ ] Separate queues defined per domain (email, files, notifications)
- [ ] Job payloads are typed interfaces
- [ ] Workers run as a separate process from the API
- [ ] Graceful shutdown implemented in workers (`SIGTERM`, `SIGINT`)
- [ ] Job concurrency set appropriately per queue
- [ ] Retry with exponential backoff configured
- [ ] Scheduled jobs registered with stable `jobId` to prevent duplicates
- [ ] All jobs are idempotent (safe to run twice)
- [ ] Failed job alerting in place
- [ ] Bull Board dashboard protected behind admin auth
- [ ] `removeOnComplete` and `removeOnFail` set to prevent Redis memory bloat

---

## AI Prompt: Job Design Review

```prompt
You are a senior backend engineer reviewing background job design for a production Node.js application.

Here is my job architecture:

Queues: [list your queues]
Job types: [paste your job type definitions]
Worker logic: [paste one worker implementation]

Review for:
1. Jobs that are not idempotent and could cause duplicate side effects on retry
2. Missing error handling inside job processors
3. Jobs that should be split into smaller sub-jobs
4. Payloads that contain unnecessary data (keep payloads minimal — store IDs, not full objects)
5. Missing concurrency limits that could overwhelm external services

Return specific findings only.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Storing full objects in job payload | Redis memory bloat, stale data | Store IDs only, fetch fresh data in worker |
| Not setting `maxRetriesPerRequest: null` | BullMQ connection errors | Required config for BullMQ |
| Running workers in the same process as API | One crash kills everything | Separate process |
| No retry configuration | Transient failures become permanent failures | Exponential backoff, 3+ attempts |
| Non-idempotent jobs | Duplicate emails, double charges | Design for at-least-once delivery |
| Registering cron jobs without stable `jobId` | Duplicate jobs on every restart | Always set `jobId` for repeatable jobs |
| Exposing Bull Board without auth | Queue payloads leaked publicly | Admin auth middleware required |

---

## Next: Caching →

With jobs processing data asynchronously, caching becomes your primary tool for serving that data fast.
