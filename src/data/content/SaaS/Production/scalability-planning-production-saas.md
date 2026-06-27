---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Scalability Planning

Scalability is not a feature you add when you need it. By the time you need it, you're already in trouble — traffic is spiking, pages are timing out, and you're making architectural decisions under pressure with real users affected.

The goal of scalability planning is not to build for massive scale on day one. That's overengineering. The goal is to understand your system's current limits, know which components will break first, and have a clear plan for what to do when they do.

---

## The Right Mindset

Premature optimisation is a trap. So is wilful ignorance.

```
Wrong approach #1 — Premature scaling:
  "We might get a million users so let's build Kubernetes now."
  Result: 6 months of infrastructure work, zero users.

Wrong approach #2 — Ignoring scale entirely:
  "We'll figure it out when we get there."
  Result: Architecture decisions at launch that cost 10x to fix later.

Right approach — Deliberate incrementalism:
  Know your current limits.
  Know what breaks first.
  Have a one-step-ahead plan for each bottleneck.
  Execute only when metrics demand it.
```

---

## Understanding Your Bottlenecks

Every system has a constraint — the component that limits throughput first. You cannot scale a system without knowing where its ceiling is.

### The Common Bottleneck Stack (in order of frequency)

```
1. Database connections        → Most SaaS hits this first
2. Database query performance  → Slow queries under load
3. Database write throughput   → Single primary write bottleneck
4. API server CPU / memory     → Stateless servers are easy to scale
5. Background job queue        → Jobs back up under sustained load
6. External API rate limits    → Stripe, OpenAI, SendGrid limits
7. Cache invalidation storms   → Cache miss cascades under load
8. File storage throughput     → Large file handling at scale
```

Your architecture determines which of these you hit first and in what order.

---

## Database — The Usual Suspect

The database is the stateful component that cannot be horizontally scaled as easily as stateless application servers. It is almost always the first bottleneck.

### Connection Limits

Every database has a maximum connection count. A serverless deployment can open hundreds of connections simultaneously — far more than a Postgres instance can handle.

```
PostgreSQL defaults:
  max_connections = 100 (shared among all clients)

A serverless function invoked 200 times simultaneously:
  Each opens 1 connection = 200 connections
  Database refuses connections above limit
  Users see 500 errors
```

**Solution: Connection pooling**

```typescript
// Without pooling — each serverless function opens a raw connection
const db = new PrismaClient()  // Creates a new connection pool per instance

// With pooling (PgBouncer / Supabase pooler / Prisma Accelerate)
// All connections go through a pooler that reuses a smaller set
DATABASE_URL="postgresql://user:pass@db-pooler.supabase.com:6543/db?pgbouncer=true"
```

| Pooling Solution | Best For |
|---|---|
| **Supabase Connection Pooler** | Already on Supabase, zero config |
| **Prisma Accelerate** | Prisma ORM, global edge caching |
| **PgBouncer** | Self-managed Postgres |
| **Neon** | Serverless Postgres with built-in pooling |

Enable connection pooling before you need it. It is not a scale-only concern — serverless deployments need it from day one.

### Read Replicas

When read traffic dominates (common in SaaS dashboards and reporting), a read replica offloads queries from your primary.

```typescript
// Route reads to replica, writes to primary
const primaryDb = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_PRIMARY_URL } }
})

const replicaDb = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_REPLICA_URL } }
})

// Use replica for expensive reads
async function getDashboardData(userId: string) {
  return replicaDb.analyticsEvent.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 1000
  })
}

// Use primary for all writes
async function createRecord(data: CreateInput) {
  return primaryDb.record.create({ data })
}
```

Replication lag is real — replica data can be milliseconds to seconds behind the primary. Never read from a replica immediately after writing and expecting to see your own write.

### Indexes — Your Most Impactful Scaling Action

A query that takes 2ms with 1,000 rows takes 8 seconds with 10,000,000 rows without an index. Adding the right index takes it back to 2ms.

```sql
-- Find slow queries (PostgreSQL)
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Find missing indexes (tables with sequential scans)
SELECT schemaname, tablename, seq_scan, seq_tup_read,
       idx_scan, seq_tup_read / seq_scan AS avg_seq_read
FROM pg_stat_user_tables
WHERE seq_scan > 0
ORDER BY seq_tup_read DESC;
```

```typescript
// Prisma — add indexes to your schema
model AuditLog {
  id        String   @id
  userId    String
  action    String
  createdAt DateTime @default(now())

  @@index([userId])                    // Filter by user
  @@index([createdAt])                 // Range queries by date
  @@index([userId, createdAt])         // Combined filter + sort
}
```

**Add indexes before problems, not after.** Every foreign key should have an index. Every column used in a WHERE clause on large tables should have an index. Every ORDER BY on large result sets should have an index.

---

## Application Layer Scaling

Stateless application servers are easy to scale — add more of them. The challenge is making sure your application is actually stateless.

### Are You Stateless?

```
Stateless (easy to scale horizontally):
  ✓ No in-memory session storage
  ✓ No in-memory rate limit counters
  ✓ No in-memory cache (use Redis instead)
  ✓ No local file writes during request handling
  ✓ No sticky sessions required

Not stateless (must fix before scaling):
  ✗ Sessions stored in server memory
  ✗ Rate limiting using local memory
  ✗ WebSocket connections that require sticky routing
  ✗ File uploads written to local disk
```

If you've followed the recommendations in previous modules (Redis for caching and rate limiting, S3 for file storage), your application is likely already stateless.

### Horizontal Scaling

Once stateless, scaling is straightforward:

```
Vercel / serverless:  Scales automatically, no configuration needed
Railway / Render:     Increase instance count in dashboard
AWS ECS / Fargate:    Update desired task count or enable auto-scaling
Kubernetes:           HorizontalPodAutoscaler manages this
```

Set up auto-scaling based on CPU utilisation (scale up at 70%, scale down at 30%) or request rate.

---

## Background Jobs at Scale

A job queue that processes 100 jobs/minute hits a wall at 10,000 jobs/minute. Plan for this.

```
Early stage:
  1 worker process
  Jobs processed sequentially
  Fine up to ~10,000 jobs/day

Growth stage:
  Multiple worker processes
  Parallel job processing
  Prioritised queues (critical jobs before bulk jobs)

Scale:
  Worker auto-scaling based on queue depth
  Separate queues per job type
  Dead letter queue for failed jobs
  Job deduplication to prevent duplicate processing
```

```typescript
// BullMQ — prioritised queues at scale
import { Queue, Worker } from "bullmq"

// High priority: payment and auth jobs
const criticalQueue = new Queue("critical", {
  defaultJobOptions: { priority: 1, attempts: 5 }
})

// Low priority: emails, analytics, cleanup
const bulkQueue = new Queue("bulk", {
  defaultJobOptions: { priority: 10, attempts: 3 }
})

// Scale workers independently
const criticalWorker = new Worker("critical", processCriticalJob, {
  concurrency: 10  // 10 parallel critical jobs
})

const bulkWorker = new Worker("bulk", processBulkJob, {
  concurrency: 50  // 50 parallel bulk jobs
})
```

---

## Caching as a Scale Strategy

Caching is covered in depth in the Caching module. The scalability framing:

```
Without cache:  Every request → database query
With cache:     95% of requests → Redis (microseconds)
                5% of requests → database (milliseconds)

Effect on database:
  10,000 req/min without cache = 10,000 DB queries/min
  10,000 req/min with 95% hit rate = 500 DB queries/min

Same database handles 20x the traffic.
```

Identify your most frequent read queries. Cache them. This is often the highest-leverage scaling action available.

---

## External API Rate Limits

Your scale is constrained by the rate limits of every external service you depend on.

```
Stripe:       100 read requests/second, 100 write requests/second
OpenAI:       Varies by tier — often 3,500 RPM on standard
SendGrid:     100 emails/second on standard plans
Twilio:       Varies by account type
GitHub API:   5,000 requests/hour authenticated
```

**Design around rate limits from the start:**

```typescript
// Queue AI requests instead of calling directly
// Prevents hitting OpenAI rate limits under concurrent load
await aiQueue.add("generate", {
  userId,
  prompt,
  model: "gpt-4o"
}, {
  // Rate limit: max 50 AI jobs per minute across all workers
  rateLimiter: {
    max: 50,
    duration: 60000
  }
})
```

```typescript
// Exponential backoff on rate limit responses
async function callWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (err.status === 429 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000  // 1s, 2s, 4s
        await new Promise(r => setTimeout(r, delay))
        continue
      }
      throw err
    }
  }
  throw new Error("Max retries exceeded")
}
```

---

## Observability for Scale

You cannot scale what you cannot measure. Before any scaling action, establish baseline metrics.

### Metrics to Track

```
Database:
  → Query latency (p50, p95, p99)
  → Active connections (vs max_connections)
  → Slow query count (queries > 100ms)
  → Index hit rate (target: >99%)
  → Disk I/O utilisation

Application:
  → Request latency (p50, p95, p99)
  → Requests per second
  → Error rate (target: <0.1%)
  → CPU and memory utilisation

Queue:
  → Queue depth (jobs waiting)
  → Job processing latency
  → Failed job rate
  → Worker utilisation

Cache:
  → Hit rate (target: >80% for stable data)
  → Redis memory usage
  → Eviction rate
```

Set alerts before hitting limits, not after:

```
Alert at 70% of database connection limit
Alert when p99 latency exceeds 2 seconds
Alert when queue depth exceeds 1,000 jobs
Alert when cache hit rate drops below 70%
```

---

## The Scaling Roadmap

Rather than a generic plan, map your specific architecture to its scaling steps.

```
Current state → First bottleneck → Fix → Next bottleneck → Fix → ...
```

A practical example for a typical Next.js SaaS:

```
Stage 1 (0–1,000 users):
  Architecture: Vercel + Supabase + Redis (Upstash)
  Likely limit: None. Everything scales automatically.
  Action: Instrument everything. Establish baselines.

Stage 2 (1,000–10,000 users):
  Likely bottleneck: Slow queries on growing tables
  Action: Add missing indexes. Enable query analysis.
  Likely bottleneck: Connection limits on Supabase free tier
  Action: Enable Supabase connection pooler. Upgrade plan.

Stage 3 (10,000–100,000 users):
  Likely bottleneck: Database read load
  Action: Add read replica. Route dashboard/report queries to replica.
  Likely bottleneck: Background job throughput
  Action: Add worker instances. Implement prioritised queues.

Stage 4 (100,000+ users):
  Likely bottleneck: Database write throughput
  Action: Evaluate PlanetScale (horizontal sharding) or CockroachDB.
  Likely bottleneck: Cache invalidation complexity
  Action: Implement event-driven cache invalidation.
  Likely bottleneck: Multi-region latency for global users
  Action: Evaluate multi-region database strategy.
```

Each stage's solutions create the next stage's problems. Plan one step ahead, not ten.

---

## Load Testing

Don't discover your limits in production. Test them deliberately.

```typescript
// k6 load test — simulates 500 concurrent users for 5 minutes
import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
  stages: [
    { duration: "1m", target: 100 },   // Ramp up to 100 users
    { duration: "3m", target: 500 },   // Hold at 500 users
    { duration: "1m", target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],  // 95% of requests under 2s
    http_req_failed: ["rate<0.01"],     // Error rate under 1%
  }
}

export default function () {
  const res = http.get("https://staging.yourdomain.com/api/dashboard")
  check(res, { "status 200": (r) => r.status === 200 })
  sleep(1)
}
```

Run load tests against staging, not production. Your staging environment should mirror production closely enough that staging results predict production behaviour.

---

## AI Prompt — Scalability Review

<copy-prompt>
You are a Staff Engineer reviewing the scalability of a production SaaS application.

My current architecture:
- Frontend: [FRAMEWORK + HOSTING]
- Backend: [FRAMEWORK + HOSTING]
- Database: [DATABASE + PROVIDER]
- Cache: [REDIS PROVIDER]
- Queue: [JOB QUEUE IF ANY]
- File storage: [S3 / GCS / OTHER]
- Current users: [NUMBER]
- Peak requests per minute: [NUMBER IF KNOWN]
- Most expensive operations: [LIST YOUR HEAVIEST QUERIES / OPERATIONS]
- Known slow queries or pain points: [ANY CURRENT ISSUES]

Analyse my scalability and provide:
1. What is my most likely first bottleneck and at what approximate user count?
2. What indexes am I likely missing for my data access patterns?
3. Is my application stateless? What would prevent horizontal scaling?
4. How should I structure my background jobs for scale?
5. What external API rate limits will I hit first and how should I handle them?
6. What metrics should I be tracking today to detect bottlenecks early?
7. A concrete 3-stage scaling roadmap for 10x, 100x, and 1000x current scale.

Be specific to my architecture. Prioritise practical actions over theoretical ones.
</copy-prompt>

---

## Scalability Planning Checklist

- [ ] Connection pooling enabled (critical for serverless deployments)
- [ ] Foreign key columns have indexes
- [ ] All columns used in WHERE clauses on large tables have indexes
- [ ] Slow query logging enabled (identify queries >100ms)
- [ ] pg_stat_statements or equivalent enabled for query analysis
- [ ] Application is stateless (no in-memory sessions, rate limits, or cache)
- [ ] Background jobs processed by a queue (not in the HTTP request cycle)
- [ ] External API calls wrapped with retry and exponential backoff
- [ ] External API rate limits documented for each provider
- [ ] Key metrics instrumented: DB connections, query latency, error rate, queue depth
- [ ] Alerts configured at 70% of known limits
- [ ] Cache hit rate being monitored
- [ ] Load test run against staging environment
- [ ] First bottleneck identified and a resolution plan documented
- [ ] Scaling roadmap written for 10x current traffic
- [ ] Database upgrade path identified (when to add read replica, when to shard)

---

## Common Mistakes

> **Mistake: Assuming the database scales like the application**
> Adding more application servers is easy. Adding more database primaries is not. Design your data access patterns for a single-primary database and optimise aggressively before considering alternatives.

> **Mistake: Not enabling connection pooling on serverless**
> A Lambda or Vercel function spins up a new process per invocation. Without pooling, each holds a database connection. 200 concurrent functions = 200 connections = database refuses traffic. This is a day-one concern, not a scale concern.

> **Mistake: Scaling before measuring**
> Adding a read replica to solve a problem that's actually caused by a missing index is expensive and ineffective. Measure first. The bottleneck is almost never where you assume.

> **Mistake: No load testing before a major launch or marketing push**
> "We can handle it" is not a load test. Run k6, Locust, or Artillery against staging before any event that could drive a traffic spike.

> **Mistake: Blocking HTTP request handlers with expensive operations**
> AI generation, PDF creation, email sending, report generation — none of these belong in a synchronous HTTP handler. Move them to a queue. Return a job ID. Poll or use webhooks for completion.

> **Mistake: Building multi-region before it's needed**
> Multi-region databases, global replication, and distributed consistency are genuinely hard engineering problems. They are justified at significant scale. Before that, they add complexity with no meaningful benefit to users.
