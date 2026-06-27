---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Performance Optimization

Performance is a feature. Users notice slow software. They abandon it. They write about it. They churn.

The temptation is to optimize everything. The discipline is to measure first, then fix only what actually matters. Premature optimization is one of the most expensive mistakes in software — it consumes engineering time on problems that may not exist at your current scale.

This module teaches you how to find real performance problems and fix them in the right order.

---

## Measure First. Always.

You cannot optimize what you haven't measured. Before touching any code:

```
Define your performance baseline:
  ├── API p50 / p95 / p99 latency (median, 95th percentile, 99th percentile)
  ├── Page load time (First Contentful Paint, Time to Interactive)
  ├── Database query times (slowest queries)
  ├── Time to First Byte (TTFB)
  └── Core Web Vitals (LCP, INP, CLS)
```

A p50 of 120ms and a p99 of 4,200ms tells you something important: most users are fine, but a meaningful percentage of requests are suffering. You need the percentiles, not just the average.

**Tools to establish your baseline:**

| What to measure | Tool |
|---|---|
| API latency percentiles | Datadog, Grafana, or your own logging |
| Frontend performance | Chrome DevTools, Lighthouse, WebPageTest |
| Core Web Vitals (real users) | Google Search Console, Vercel Analytics |
| Database slow queries | `pg_stat_statements` in Postgres |
| Bundle size | `bundlephobia.com`, `next build` output, `vite-bundle-visualizer` |

Run your baseline before making any changes. Every optimization should be validated against it.

---

## The Performance Priority Stack

Fix problems in this order. Lower layers have more leverage.

```
1. Database queries        ← Highest leverage. One bad query kills everything.
2. Network / API design    ← Fewer round trips, smaller payloads.
3. Caching                 ← Stop computing the same thing twice.
4. Frontend rendering      ← Only matters after the above are addressed.
5. Infrastructure scaling  ← Last resort. Costs money. Doesn't fix bad code.
```

Most performance problems in early SaaS products are at layer 1 or 2. Adding a CDN (layer 5) on top of slow database queries makes your slow queries slightly less slow.

---

## Database Performance

### Find Your Slow Queries

```sql
-- Enable pg_stat_statements if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find the slowest queries by total execution time
SELECT
  query,
  calls,
  round(total_exec_time::numeric, 2) AS total_ms,
  round(mean_exec_time::numeric, 2) AS avg_ms,
  round(stddev_exec_time::numeric, 2) AS stddev_ms,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;
```

Also enable slow query logging in your Postgres config:

```sql
-- Log queries that take longer than 200ms
ALTER SYSTEM SET log_min_duration_statement = '200';
SELECT pg_reload_conf();
```

### Indexing

Missing indexes are the most common performance issue in production databases.

```sql
-- Find tables with sequential scans on large tables (often means missing index)
SELECT
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  idx_tup_fetch
FROM pg_stat_user_tables
WHERE seq_scan > 0
ORDER BY seq_tup_read DESC
LIMIT 20;
```

```sql
-- EXPLAIN ANALYZE to understand a specific query
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM documents
WHERE organization_id = 'org_123'
  AND status = 'published'
ORDER BY created_at DESC
LIMIT 20;

-- Look for: "Seq Scan" on large tables = missing index
-- You want: "Index Scan" or "Bitmap Index Scan"
```

```sql
-- Add the missing index
CREATE INDEX CONCURRENTLY idx_documents_org_status_created
  ON documents(organization_id, status, created_at DESC);

-- CONCURRENTLY means the index builds without locking the table
-- Always use CONCURRENTLY in production
```

**Index strategy for multi-tenant SaaS:**

Every table that stores tenant data should have an index on `(organization_id, ...)`. Your most common query pattern is "give me records for this organization, filtered by X, sorted by Y" — build composite indexes to match.

### N+1 Queries

The N+1 problem: you fetch 20 documents, then run 20 separate queries to get each document's author. That's 21 queries where 2 would do.

```typescript
//  N+1 — fetches 1 document list + N author queries
const documents = await db.document.findMany({ where: { organizationId } });
for (const doc of documents) {
  doc.author = await db.user.findUnique({ where: { id: doc.authorId } }); // N queries
}

//  Single query with join
const documents = await db.document.findMany({
  where: { organizationId },
  include: { author: { select: { id: true, name: true, avatarUrl: true } } },
});
```

Enable Prisma's query logging in development to catch N+1 before it reaches production:

```typescript
const db = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
});
```

### Pagination

Never return unbounded result sets. Always paginate.

```typescript
// Cursor-based pagination — more efficient than OFFSET for large datasets
async function getDocuments(organizationId: string, cursor?: string, limit = 20) {
  const documents = await db.document.findMany({
    where: { organizationId },
    take: limit + 1,           // fetch one extra to determine if there's a next page
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  const hasNextPage = documents.length > limit;
  if (hasNextPage) documents.pop(); // remove the extra item

  return {
    documents,
    nextCursor: hasNextPage ? documents[documents.length - 1].id : null,
  };
}
```

**Offset pagination (`LIMIT 20 OFFSET 10000`) degrades linearly with page number.** Postgres must scan and discard 10,000 rows before returning your 20. Cursor-based pagination is O(1) regardless of page depth.

---

## API Performance

### Reduce Round Trips

Each HTTP request carries fixed overhead: DNS lookup, TCP handshake, TLS negotiation, headers. Minimize the number of requests your frontend makes on page load.

```typescript
//  Three separate requests on dashboard load
const user = await fetch('/api/user');
const documents = await fetch('/api/documents');
const notifications = await fetch('/api/notifications');

//  One request for everything needed on load
const dashboardData = await fetch('/api/dashboard');
// Returns: { user, recentDocuments, unreadNotifications }
```

Build aggregated endpoints for your most common page loads. The tradeoff is slightly less RESTful purity for meaningfully faster initial loads.

### Response Compression

```typescript
import compression from 'compression';

// Enable gzip/brotli compression for all responses
app.use(compression({
  level: 6,        // compression level 1–9; 6 is a good balance
  threshold: 1024, // only compress responses > 1KB
}));
```

JSON APIs typically compress 60–80%. A 200KB response becomes 40KB. Enable compression before optimizing anything else — it's one line and the gains are immediate.

### Payload Size

Only return fields the client actually needs.

```typescript
//  Returning full document including body for a list view
const documents = await db.document.findMany({ where: { organizationId } });

//  Select only what the list view renders
const documents = await db.document.findMany({
  where: { organizationId },
  select: {
    id: true,
    title: true,
    status: true,
    createdAt: true,
    author: { select: { name: true, avatarUrl: true } },
    // body is omitted — not shown in list view
  },
});
```

---

## Frontend Performance

### Core Web Vitals

Google uses these for search ranking. Users experience them as "is this app fast?"

| Metric | What it measures | Good threshold |
|---|---|---|
| **LCP** (Largest Contentful Paint) | When the main content loads | < 2.5s |
| **INP** (Interaction to Next Paint) | Response time to user input | < 200ms |
| **CLS** (Cumulative Layout Shift) | Visual stability during load | < 0.1 |

**Improve LCP:**
- Server-side render or statically generate your landing page and marketing pages
- Preload your hero image: `<link rel="preload" as="image" href="/hero.webp">`
- Use `next/image` or equivalent — automatic WebP, lazy loading, size hints

**Improve INP:**
- Avoid long JavaScript tasks (>50ms) on the main thread
- Defer non-critical JS: analytics, chat widgets, third-party scripts
- Use `useTransition` in React for non-urgent state updates

**Improve CLS:**
- Set explicit width/height on images
- Reserve space for async content (skeleton loaders)
- Avoid injecting content above existing content

### Bundle Size

Large JavaScript bundles block rendering. Every KB of JS must be parsed and executed before the page is interactive.

```bash
# Analyze your bundle
npx next build && npx next analyze   # Next.js
npx vite-bundle-visualizer           # Vite

# Check individual package costs before adding them
# npx bundlephobia <package-name>
```

**Common bundle killers and their fixes:**

| Problem | Fix |
|---|---|
| Importing entire lodash | `import debounce from 'lodash/debounce'` (tree-shaking) |
| Moment.js (>200KB) | Replace with `date-fns` or `dayjs` |
| Large icon library fully imported | Import icons individually |
| Chart libraries on every page | Dynamic import on the page that uses them |

```typescript
// Dynamic import — only load when needed
const ChartComponent = dynamic(() => import('./Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

---

## Caching

Cache expensive computations and frequently-read data that changes rarely.

### What to Cache

```
Cache these:
  ├── User session / auth token validation
  ├── Organization settings and plan info
  ├── Aggregated stats (user count, document count, usage metrics)
  ├── External API responses (weather, exchange rates, public data)
  └── Expensive database aggregation queries

Don't cache these:
  ├── Data that must be real-time (live notifications, prices)
  ├── User-specific frequently changing data
  └── Data where staleness causes bugs (payment status, permissions)
```

### Redis for API-Level Caching

```typescript
import { Redis } from '@upstash/redis'; // serverless-compatible Redis

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

async function getOrganizationStats(orgId: string) {
  const cacheKey = `org:${orgId}:stats`;
  const cached = await redis.get(cacheKey);

  if (cached) return cached;

  // Expensive aggregation query
  const stats = await db.$queryRaw`
    SELECT
      COUNT(*) FILTER (WHERE status = 'active') as active_documents,
      COUNT(DISTINCT user_id) as active_users
    FROM documents
    WHERE organization_id = ${orgId}
      AND created_at > NOW() - INTERVAL '30 days'
  `;

  // Cache for 5 minutes — stats don't need to be real-time
  await redis.setex(cacheKey, 300, JSON.stringify(stats));

  return stats;
}
```

### Cache Invalidation

```typescript
// When data changes, invalidate the relevant cache keys
async function updateOrganizationPlan(orgId: string, newPlan: string) {
  await db.organization.update({ where: { id: orgId }, data: { plan: newPlan } });

  // Invalidate all cached data for this org
  await redis.del(`org:${orgId}:stats`);
  await redis.del(`org:${orgId}:settings`);
}
```

Cache invalidation is hard to get right. When in doubt, use short TTLs (60–300 seconds) rather than trying to invalidate perfectly. Acceptable staleness is usually better than complex invalidation logic.

---

## AI Prompt — Performance Audit

Use this when you have real usage data and want to prioritize where to focus.

```prompt
You are a senior performance engineer reviewing a SaaS application.

Product context:
[Describe your product and typical usage patterns]

Current performance baseline:
  API p50 latency: [Xms]
  API p99 latency: [Xms]
  Largest Contentful Paint: [Xs]
  Slowest database queries: [list the top 3]
  Bundle size: [XKB]

Database schema (key tables):
[List your main tables and their approximate row counts]

Most common query patterns:
[e.g. "fetch all documents for an org, sorted by date, paginated"]

Please:
1. Identify which layer (DB, network, frontend, caching) will give the highest performance ROI
2. Write the EXPLAIN ANALYZE query I should run to investigate my slowest endpoint
3. Suggest the specific indexes most likely to help given my query patterns
4. Tell me which Core Web Vital is likely to be my worst given my stack
5. Identify one thing I might be caching that I shouldn't, and one thing I should be caching but probably aren't

Be specific to my context and data volumes.
```

---

## Implementation Checklist

### Measurement

- [ ] p50, p95, p99 API latency baseline established
- [ ] `pg_stat_statements` enabled and slow query log configured
- [ ] Core Web Vitals measured with Lighthouse and real user data
- [ ] Bundle size analyzed and large dependencies identified

### Database

- [ ] `EXPLAIN ANALYZE` run on the 5 slowest queries
- [ ] Indexes added for all common query patterns (especially `organization_id` composites)
- [ ] N+1 queries eliminated in major list endpoints
- [ ] All list endpoints paginated (cursor-based for large datasets)
- [ ] `OFFSET` pagination replaced with cursor pagination on large tables

### API

- [ ] Response compression enabled (gzip/brotli)
- [ ] Aggregated endpoints created for common multi-request page loads
- [ ] List endpoint responses select only needed fields
- [ ] All unbounded queries have `LIMIT` applied

### Frontend

- [ ] LCP < 2.5s on mobile (Lighthouse)
- [ ] CLS < 0.1 (no layout shift on load)
- [ ] Bundle analyzed — no library > 100KB that could be replaced
- [ ] Dynamic imports used for heavy components not needed on initial load
- [ ] Images use next/image or equivalent (WebP, lazy loading, size hints)

### Caching

- [ ] Redis or equivalent in place for API-level caching
- [ ] Expensive aggregation queries cached with appropriate TTL
- [ ] Cache invalidation implemented for cached data that changes
- [ ] Cache hit rate monitored

---

## Common Mistakes

> **️ Optimizing before measuring**
> You will spend days optimizing the wrong thing. Run `pg_stat_statements` and Lighthouse first. The actual bottleneck is almost never where you assume it is.

> **️ Using OFFSET pagination on large tables**
> `OFFSET 10000 LIMIT 20` forces Postgres to read and discard 10,000 rows. At scale this becomes unusably slow. Switch to cursor-based pagination early.

> **️ Fetching full rows for list views**
> A documents list page doesn't need the document body. Selecting only the fields rendered in the UI can reduce query time and payload size by 80%+.

> **️ Adding infrastructure before fixing queries**
> A faster server still runs slow queries slowly. Fix your indexes and N+1 queries before considering horizontal scaling. It's cheaper and usually solves the problem entirely.

> **️ Caching without invalidation**
> A cache that returns stale data when it matters (wrong plan displayed, wrong permissions applied) is worse than no cache. Build the invalidation before you build the cache.

---

## What's Next

Performance is measured and the highest-ROI issues are addressed. Before moving on, confirm:

- Your p99 API latency is below 1 second for all core endpoints
- `EXPLAIN ANALYZE` shows no sequential scans on tables with >10k rows
- Core Web Vitals pass the "Good" threshold on Lighthouse
- Your slowest query has a matching composite index

Next up: **Monitoring**
