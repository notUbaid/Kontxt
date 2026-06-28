---
title: Performance
slug: performance
phase: Phase 4
mode: personal
projectType: web-app
estimatedTime: 30–40 min
---

# Performance

Performance is not an optimisation phase. It's a series of decisions you make throughout development that compound by the time you ship.

The good news: most personal web apps are slow for the same five reasons. Fix those and you're done. You don't need to profile 200 components or chase milliseconds.

---

## What Actually Matters

Users notice three things:

| What They Feel | What Causes It | What to Fix |
|---|---|---|
| Page takes forever to load | Large JS bundles, no caching, slow server | Bundle size, server response time |
| App feels sluggish after loading | Unnecessary re-renders, main thread blocking | React optimisation, heavy computations |
| Images are slow / jump around | Unoptimised images, missing dimensions | Image optimisation, layout shift |

Measure before optimising. Don't guess.

---

## Measure First

**Lighthouse** — built into Chrome DevTools. Run it on your production build, not localhost.

```bash
# Build and preview locally before measuring
npm run build && npm run start
```

Open Chrome → DevTools → Lighthouse → Generate report.

**Core Web Vitals to care about:**

| Metric | What It Measures | Good Score |
|---|---|---|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s |
| **CLS** (Cumulative Layout Shift) | How much the page jumps around | < 0.1 |
| **INP** (Interaction to Next Paint) | How fast the app responds to clicks | < 200ms |
| **FCP** (First Contentful Paint) | When anything appears on screen | < 1.8s |

Fix in this order: LCP → CLS → INP. They have the highest user impact.

---

## Bundle Size

The single most common performance problem in personal projects. You install packages without thinking about what they cost.

**Check your bundle:**

```bash
npm install @next/bundle-analyzer --save-dev
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
```

```bash
ANALYZE=true npm run build
```

This opens a visual treemap of everything in your bundle. Large rectangles are problems.

**Common culprits:**

```typescript
// BAD — imports the entire library
import _ from 'lodash'
const result = _.groupBy(items, 'category')

// GOOD — imports only what you use
import groupBy from 'lodash/groupBy'
const result = groupBy(items, 'category')
```

```typescript
// BAD — moment.js is 67KB gzipped
import moment from 'moment'

// GOOD — date-fns is tree-shakeable
import { format, formatDistance } from 'date-fns'
```

> [!TIP]
> Before installing any package, check its size at [bundlephobia.com](https://bundlephobia.com). A 200KB dependency for a utility function is rarely worth it.

---

## Code Splitting and Lazy Loading

Next.js splits by route automatically. But heavy components loaded on initial render still cost you.

```typescript
// BAD — heavy chart library loaded on page load
import { ComplexChart } from '@/components/complex-chart'

// GOOD — loaded only when the component mounts
import dynamic from 'next/dynamic'

const ComplexChart = dynamic(() => import('@/components/complex-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false  // if it uses browser APIs
})
```

**What to lazy load:**
- Rich text editors
- Chart libraries
- Map components
- Modals and drawers that aren't visible on initial load
- Anything that only appears after user interaction

---

## Image Optimisation

Images are usually the largest assets on any page. Next.js handles most of this for you — if you use the right component.

```typescript
// BAD — raw <img> tag, no optimisation
<img src="/hero.png" alt="Hero" />

// GOOD — Next.js Image, optimised, lazy loaded, sized correctly
import Image from 'next/image'

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={630}
  priority  // add for above-the-fold images only
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

`next/image` automatically:
- Converts to WebP/AVIF
- Serves responsive sizes
- Lazy loads below-the-fold images
- Prevents layout shift when dimensions are set

> [!WARNING]
> Every image without explicit `width` and `height` contributes to CLS (layout shift). The page reflows as images load, which tanks your score and feels broken. Always set dimensions.

---

## React Re-render Optimisation

Most React performance problems come from components re-rendering when they don't need to.

**Find unnecessary re-renders first:**

```bash
npm install --save-dev @welldone-software/why-did-you-render
```

```typescript
// Only in development
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackAllPureComponents: true })
}
```

**memo — skip re-rendering when props haven't changed:**

```typescript
// Without memo — re-renders every time the parent re-renders
function PostCard({ post }: { post: Post }) { ... }

// With memo — only re-renders when `post` actually changes
const PostCard = memo(function PostCard({ post }: { post: Post }) { ... })
```

Use `memo` on components that: are rendered in a list, receive the same props frequently, or are expensive to render.

**useMemo — cache expensive computations:**

```typescript
// BAD — recalculates on every render
const sortedPosts = posts.sort((a, b) => b.likes - a.likes)

// GOOD — only recalculates when posts changes
const sortedPosts = useMemo(
  () => [...posts].sort((a, b) => b.likes - a.likes),
  [posts]
)
```

**useCallback — stable function references:**

```typescript
// BAD — new function reference on every render, breaks memo on children
const handleDelete = (id: string) => { deletePost(id) }

// GOOD — stable reference, memo on child components works correctly
const handleDelete = useCallback((id: string) => {
  deletePost(id)
}, [deletePost])
```

> [!WARNING]
> Don't add `memo`, `useMemo`, and `useCallback` everywhere by default. They have overhead too. Profile first, optimise the bottlenecks.

---

## Database Query Performance

Slow pages are often slow queries, not slow React. Check your database before optimising your components.

**Log slow queries in development:**

```typescript
// lib/db.ts
export const db = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
  ],
})

db.$on('query', (e) => {
  if (e.duration > 100) {  // log queries slower than 100ms
    console.warn(`Slow query (${e.duration}ms):`, e.query)
  }
})
```

**The most common slow query patterns:**

Missing index on a frequently queried field:
```prisma
// schema.prisma — add indexes on fields you filter/sort by
model Post {
  id       String @id
  authorId String
  status   String
  createdAt DateTime

  @@index([authorId])           // filtered by author constantly
  @@index([status, createdAt])  // filtered by status, sorted by date
}
```

Fetching more data than you need:
```typescript
// BAD — fetches all fields including large content blobs
const posts = await db.post.findMany({ where: { authorId } })

// GOOD — fetches only what the list view renders
const posts = await db.post.findMany({
  where: { authorId },
  select: { id: true, title: true, createdAt: true, _count: { select: { likes: true } } }
})
```

---

## Caching

For a personal project, two caching layers matter.

**Next.js fetch caching** — for data that doesn't change per-user:

```typescript
// Cache for 1 hour, revalidate in background
const posts = await fetch('/api/featured-posts', {
  next: { revalidate: 3600 }
})

// Never cache — always fresh
const user = await fetch('/api/me', {
  cache: 'no-store'
})
```

**React cache** — deduplicate identical requests within a single render:

```typescript
import { cache } from 'react'
import { db } from '@/lib/db'

// Called 5 times in one render? Hits the database once.
export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})
```

---

## Quick Wins Checklist

Run through this before shipping:

- [ ] Lighthouse score measured on a production build (not localhost)
- [ ] All images use `next/image` with explicit width and height
- [ ] Above-the-fold images have `priority` prop
- [ ] Heavy components are lazy loaded with `dynamic()`
- [ ] No unused large packages (check with bundle analyzer)
- [ ] Lodash, moment, or other large libraries replaced with lighter alternatives
- [ ] Database queries use `select` to avoid over-fetching
- [ ] Frequently filtered/sorted columns have `@@index` in schema
- [ ] No `console.log` calls left in production code

---

## Prompt: Performance Audit

```
Copy Prompt
```

```
I'm building a personal web app with Next.js App Router, Prisma, and TanStack Query.

Here is a component / page that feels slow:
[paste the component or page code]

Here are the database queries it triggers:
[paste the service functions or Prisma queries]

Audit this for performance issues and provide specific fixes for:
1. Unnecessary re-renders (missing memo, useMemo, useCallback)
2. Over-fetching from the database (missing select, missing indexes)
3. Bundle size issues (heavy imports, missing lazy loading)
4. Caching opportunities (Next.js fetch cache, React cache)

For each issue found:
- Explain why it's a problem
- Show the fixed code
- Estimate the impact (high / medium / low)

Do not suggest premature optimisations. Only flag real, measurable problems.
```

---

## What Comes Next

With performance addressed:

- **Deployment** — putting your app on a real URL with a real domain
- **Security Basics** — the minimum security layer every shipped app needs

A fast app that nobody can reach isn't done. Deployment is next.
