---
title: Performance
slug: performance
phase: Phase 4
mode: personal
projectType: saas
estimatedTime: 20–30 min
---

# Performance

Performance is not an optimization pass you do later.

The decisions you made in Phase 2 and 3 already determined 80% of your app's performance. This module covers how to verify those decisions held, fix the most common regressions, and establish a baseline before users arrive.

---

## Where Performance Actually Comes From

Most beginners optimize the wrong layer.

| Layer | Impact | What goes wrong |
|---|---|---|
| **Database queries** | Highest | N+1 queries, missing indexes, unfiltered scans |
| **Network / API** | High | Overfetching, waterfall requests, no caching |
| **Server rendering** | Medium | Blocking data fetches, no streaming |
| **Frontend bundle** | Medium | Uncode-split routes, unused libraries |
| **Images / fonts** | Medium | Wrong format, no lazy load, layout shift |
| **Micro-optimizations** | Low | Memoization, virtual lists — rarely the bottleneck |

Fix in that order. A memoized component in front of a slow query is still slow.

---

## Database Performance

### Find Slow Queries First

Don't guess. Measure.

**Prisma query logging** — add to `lib/db.ts`:

```typescript
export const db = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
  ],
})

db.$on("query", (e) => {
  if (e.duration > 100) {  // log queries slower than 100ms
    console.warn(`Slow query (${e.duration}ms):`, e.query)
  }
})
```

**PostgreSQL slow query log** — enable in Supabase/Neon dashboard under database settings. Any query over 500ms should be investigated.

---

### Fix N+1 Queries

The most common database performance bug. Revisit this from the Backend module.

```typescript
// ❌ N+1: 1 query for list + 1 per item
const workspaces = await db.workspace.findMany({ where: { ownerId: userId } })
for (const ws of workspaces) {
  ws.memberCount = await db.workspaceMember.count({ where: { workspaceId: ws.id } })
}

// ✅ Single query with aggregation
const workspaces = await db.workspace.findMany({
  where: { ownerId: userId },
  include: {
    _count: { select: { members: true } }
  }
})
```

---

### Verify Indexes Exist

Open your Prisma schema and confirm:

- [ ] Every foreign key column has `@@index`
- [ ] Every column used in `where:` filters has an index
- [ ] Every column used in `orderBy:` has an index

```prisma
model Post {
  id          String   @id @default(cuid())
  userId      String
  workspaceId String
  status      String
  createdAt   DateTime @default(now())

  @@index([userId])          // ← filter by owner
  @@index([workspaceId])     // ← filter by workspace
  @@index([status])          // ← filter by status
  @@index([createdAt])       // ← sort by date
}
```

Missing an index on a filtered column means your database scans every row. Fine at 100 records. Catastrophic at 100,000.

---

### Paginate Everything

Never return unbounded lists.

```typescript
// ❌ Returns all records — terrifying at scale
const posts = await db.post.findMany({ where: { workspaceId } })

// ✅ Cursor-based pagination
const posts = await db.post.findMany({
  where: { workspaceId },
  take: 20,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: "desc" },
})
```

Cursor-based pagination is more efficient than offset (`skip: page * limit`) at large page numbers. Use it by default.

---

## API and Network Performance

### Stop Overfetching

Every field you select is bytes on the wire and memory in Node.js.

```typescript
// ❌ Selects every column, including ones you don't use
const users = await db.user.findMany()

// ✅ Select only what the UI needs
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    avatarUrl: true,
    // email, createdAt, clerkId — not needed here
  }
})
```

This also prevents accidentally exposing sensitive columns in API responses.

---

### Parallel Requests

Avoid sequential awaits when requests are independent.

```typescript
// ❌ Sequential: total time = A + B + C
const workspace = await fetchWorkspace(id)
const members = await fetchMembers(id)
const activity = await fetchActivity(id)

// ✅ Parallel: total time = max(A, B, C)
const [workspace, members, activity] = await Promise.all([
  fetchWorkspace(id),
  fetchMembers(id),
  fetchActivity(id),
])
```

One line change. Often 2–3× faster on pages with multiple independent data sources.

---

### HTTP Caching

Add cache headers to routes that serve data that doesn't change per-request.

```typescript
// Public, rarely-changing data (pricing page, feature list)
return Response.json(data, {
  headers: {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
  }
})

// User-specific data — never cache publicly
return Response.json(data, {
  headers: {
    "Cache-Control": "private, no-store"
  }
})
```

Don't cache authenticated, user-specific responses publicly. Ever.

---

## Frontend Performance

### Core Web Vitals

These are what Google measures and what users feel. Target these before launch:

| Metric | What it measures | Target |
|---|---|---|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s |
| **CLS** (Cumulative Layout Shift) | How much the page jumps around | < 0.1 |
| **INP** (Interaction to Next Paint) | How fast the UI responds to clicks | < 200ms |

Measure with Vercel's Speed Insights or [pagespeed.web.dev](https://pagespeed.web.dev).

---

### Eliminate Layout Shift (CLS)

Layout shift happens when elements load and push content around. Causes:

**Images without dimensions:**

```tsx
// ❌ No dimensions — browser doesn't reserve space
<img src={avatar} />

// ✅ Dimensions reserved — no shift
<Image src={avatar} width={40} height={40} alt={name} />
```

**Fonts loading late:**

```tsx
// ❌ Google Fonts via <link> — loads after page render
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />

// ✅ next/font — inlined, zero layout shift
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"], display: "swap" })
```

**Dynamic content pushing layout:**

Reserve space with skeleton components that match the dimensions of the real content.

---

### Bundle Size

A large JavaScript bundle means users wait before anything is interactive.

Audit your bundle:

```bash
# Next.js built-in bundle analyzer
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
module.exports = withBundleAnalyzer({})
```

```bash
ANALYZE=true npm run build
```

Look for:
- Libraries imported but barely used (lodash — import specific functions, not the whole library)
- Large dependencies with smaller alternatives
- Third-party scripts bloating the client bundle

**Common fixes:**

```typescript
// ❌ Imports entire lodash (70KB+)
import _ from "lodash"
const sorted = _.sortBy(items, "name")

// ✅ Import only what you need (< 1KB)
import sortBy from "lodash/sortBy"

// Or just use native JS
const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name))
```

---

### Lazy Load Heavy Components

Don't ship code for components the user hasn't navigated to yet.

```tsx
import dynamic from "next/dynamic"

// Heavy chart library — only load when needed
const RevenueChart = dynamic(() => import("@/components/RevenueChart"), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false,  // charts often don't need SSR
})

// Rich text editor — large bundle
const Editor = dynamic(() => import("@/components/Editor"), {
  loading: () => <Skeleton className="h-48 w-full" />,
})
```

---

## Image Performance

Images are typically the largest assets on any page.

```tsx
// ✅ Always use next/image for user-uploaded and static images
import Image from "next/image"

<Image
  src={post.coverImage}
  alt={post.title}
  width={800}
  height={400}
  priority={isAboveTheFold}   // ← preload hero images
  placeholder="blur"           // ← show blur while loading
  blurDataURL={post.blurHash}  // ← tiny base64 placeholder
/>
```

Rules:
- `priority` on the largest above-the-fold image (improves LCP)
- `loading="lazy"` is the default for everything else
- Never use `<img>` for content images in a Next.js app

---

## Caching Strategy

| What | Strategy | Tool |
|---|---|---|
| Static pages | Full-page cache at CDN edge | Vercel/Cloudflare automatically |
| Dynamic pages | ISR — revalidate on interval | `revalidate` in Next.js |
| API responses | Short TTL cache | `Cache-Control` headers |
| Database queries | Cache expensive reads | Upstash Redis |
| User sessions | Never cache | — |

For most personal SaaS apps, Vercel's edge cache handles static pages automatically. You rarely need Redis on day one.

---

## Performance Measurement

Before launch, measure these. After launch, track trends.

**Tools:**

| Tool | What it measures | When to use |
|---|---|---|
| **Vercel Speed Insights** | Real user Core Web Vitals | After deployment |
| **PageSpeed Insights** | Lab-based CWV score | During development |
| **PostHog** | Custom performance events | Runtime monitoring |
| **Prisma logs** | Slow queries | Development |

**Minimum pre-launch checks:**

```
✅ PageSpeed score > 80 on mobile
✅ LCP < 2.5s on a simulated slow 4G connection
✅ CLS < 0.1
✅ No query taking > 200ms on the happy path
✅ Bundle size < 200KB initial JS (gzipped)
```

---

## Performance Prompt

```prompt
You are a senior engineer reviewing my SaaS for performance issues before launch.
My stack: [Next.js / React / Prisma / PostgreSQL / Vercel]
Here are my slowest pages and what they fetch:
[describe each page and its data requirements]
Here is my Prisma schema for the relevant models:
[paste schema]
Please:
1. Identify the most likely N+1 query risks in my data fetching pattern
2. Suggest which queries need indexes I may have missed
3. Identify which pages should use server components vs client components for best performance
4. Flag any likely CLS issues based on my page structure
5. Suggest which routes benefit from caching and what TTL to use
6. Identify any bundle size risks based on my dependencies
```

---

## Validation Checklist

Before moving to backups:

- [ ] Slow query logging enabled in development
- [ ] No queries taking > 200ms on happy paths
- [ ] All foreign keys indexed in Prisma schema
- [ ] All list endpoints paginated (no unbounded queries)
- [ ] Independent fetches use `Promise.all`
- [ ] `select` used to limit returned columns
- [ ] All images use `next/image` with explicit dimensions
- [ ] Fonts loaded via `next/font` (no `<link>` to Google Fonts)
- [ ] Bundle analyzed — no surprise large dependencies
- [ ] Heavy components lazy loaded with `dynamic()`
- [ ] PageSpeed score > 80 on mobile
- [ ] LCP < 2.5s, CLS < 0.1 verified

---

## What to Build Next

Performance baseline established. Your app loads fast, queries are efficient, and you have measurement in place to catch regressions.

Next: **Backups** — making sure you can recover when something goes wrong, because something will.
