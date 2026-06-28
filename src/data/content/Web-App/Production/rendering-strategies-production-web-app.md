---
title: Rendering Strategies
slug: rendering-strategies
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Rendering Strategies

The most consequential frontend decision nobody treats like a decision.

Choose wrong and you're fighting your framework on every page — paying for SSR you don't need, or shipping SPAs to Googlebot that can't be indexed. Choose right and performance, SEO, and developer experience compound in your favor automatically.

---

## The Core Question

> **When does HTML get generated — and where?**

Everything else follows from this.

| Strategy | HTML Generated | When |
|---|---|---|
| **SSG** | Build server | At deploy time |
| **SSR** | Edge / server | At request time |
| **CSR** | User's browser | After JS loads |
| **ISR** | Build + server | On-demand, cached |
| **Streaming SSR** | Server | Progressively, per-request |

None of these is universally best. Each belongs somewhere.

---

## Mental Model: The Rendering Decision Tree

```
Is this page's content the same for all users?
├── YES → Is content static or rarely updated?
│         ├── RARELY UPDATED → SSG (rebuild on change)
│         └── FREQUENTLY UPDATED → ISR or SSR
└── NO → Does the page need to be indexed by search engines?
          ├── YES → SSR or Streaming SSR
          └── NO → CSR (dashboard, app shell, authenticated pages)
```

Use this tree. Don't debate rendering strategies in the abstract — apply it to each route.

---

## Static Site Generation (SSG)

HTML is built once at deploy time. Every user gets the same pre-built file.

**Use when:**
- Marketing pages, landing pages, docs, blogs
- Content doesn't change per user
- You want maximum performance without runtime cost

**Don't use when:**
- Content changes frequently (you'll be rebuilding constantly)
- Content is personalized per user

**Next.js:**
```typescript
// app/about/page.tsx — automatically SSG if no dynamic data
export default function AboutPage() {
  return <div>...</div>
}

// With static data fetching
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(p => ({ slug: p.slug }))
}
```

**Cost:** Near-zero at runtime. Build time increases with page count.

---

## Server-Side Rendering (SSR)

HTML is generated fresh on every request, on your server or edge.

**Use when:**
- Content is personalized (user-specific data)
- Content must be fresh (stock prices, live inventory)
- SEO matters and content changes frequently

**Don't use when:**
- Content is static (wasted compute)
- You need sub-100ms response times without caching strategy (cold SSR is slow)

**Next.js:**
```typescript
// app/dashboard/page.tsx
// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getSession() // per-request
  const data = await getUserData(session.userId)
  return <Dashboard data={data} />
}
```

**Cost:** Server compute on every request. Cache aggressively where possible.

---

## Client-Side Rendering (CSR)

Server sends an empty shell. Browser fetches data and renders everything.

**Use when:**
- Authenticated pages (dashboards, settings, app interiors)
- SEO is irrelevant (behind login)
- Highly interactive interfaces (real-time, drag-and-drop)

**Don't use when:**
- Public pages that need SEO
- Users have slow connections (blank screen until JS loads)
- First-contentful paint matters

**Pattern:**
```typescript
'use client'

export default function AnalyticsPage() {
  const { data, isLoading } = useSWR('/api/analytics', fetcher)

  if (isLoading) return <Skeleton />
  return <Chart data={data} />
}
```

**Cost:** Shifts compute to the client. Free for you, paid in UX on slow devices.

---

## Incremental Static Regeneration (ISR)

SSG + background regeneration. Serve stale HTML, regenerate in background.

**Use when:**
- Content updates periodically but not constantly (e-commerce, news, docs)
- You want SSG performance with near-fresh content

**The tradeoff:** First user after revalidation window gets stale content. Second user gets fresh. This is acceptable in most cases.

**Next.js:**
```typescript
// app/products/[id]/page.tsx
export const revalidate = 60 // seconds

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  return <Product data={product} />
}
```

**Cost:** Occasional background recompute. Effectively SSG cost in practice.

---

## Streaming SSR

Send HTML progressively. Shell arrives first, data-dependent sections stream in.

**Use when:**
- SSR page has slow data dependencies (database, third-party APIs)
- You want to unblock first paint while waiting for data

**This is what React Suspense was designed for.**

```tsx
// app/feed/page.tsx
import { Suspense } from 'react'

export default function FeedPage() {
  return (
    <main>
      <Header /> {/* renders immediately */}
      <Suspense fallback={<FeedSkeleton />}>
        <Feed /> {/* streams in when data is ready */}
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar /> {/* streams independently */}
      </Suspense>
    </main>
  )
}
```

**Cost:** Same as SSR, but better perceived performance. Use this over plain SSR by default.

---

## Route-Level Strategy Map

This is how production apps actually mix strategies.

| Route | Strategy | Why |
|---|---|---|
| `/` (Landing) | SSG | Static marketing content |
| `/blog/[slug]` | SSG + ISR | Mostly static, occasional updates |
| `/pricing` | SSG | Rarely changes |
| `/app/dashboard` | SSR or CSR | User-specific, behind auth |
| `/app/feed` | Streaming SSR | Social/dynamic, needs SEO? No → CSR |
| `/app/settings` | CSR | No SEO, highly interactive |
| `/app/reports/[id]` | SSR | Fresh data, user-specific |
| `/docs/[slug]` | SSG | Pure static |

**Map your own routes before writing a line of frontend code.**

---

## Interactive Route Planner

Work through each of your app's routes:

- [ ] List every distinct route in your app
- [ ] For each route: does it need SEO?
- [ ] For each route: is content personalized per user?
- [ ] For each route: how frequently does content change?
- [ ] Assign a rendering strategy to each route
- [ ] Verify your framework supports that strategy on that route

---

## The Hydration Problem

SSR and SSG ship HTML from the server, then React "hydrates" it — attaching event listeners and making it interactive. During hydration, the page looks interactive but isn't.

**Common bugs:**
- Hydration mismatch (server HTML ≠ client render) → React error
- Heavy JS bundle → slow hydration → UI unresponsive on load
- `localStorage`, `window` accessed during SSR → crash

**Fixes:**
```typescript
//  Crashes during SSR
const theme = localStorage.getItem('theme')

//  Safe
const [theme, setTheme] = useState<string | null>(null)
useEffect(() => {
  setTheme(localStorage.getItem('theme'))
}, [])
```

```typescript
//  Hydration mismatch (Date renders differently server vs client)
<span>{new Date().toLocaleTimeString()}</span>

//  Client-only render
'use client'
export function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
    const i = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(i)
  }, [])
  return <span>{time}</span>
}
```

---

## Caching Layer

Rendering strategy and caching are inseparable in production.

```
SSG  → CDN cache (Vercel Edge, Cloudflare)
SSR  → No automatic cache — you must add it
ISR  → CDN cache with TTL + background revalidation
CSR  → Browser cache (SWR / React Query handle this)
```

**For SSR: always cache at the data layer.**

```typescript
// Next.js fetch cache
const data = await fetch('/api/data', {
  next: { revalidate: 30 } // cache for 30s
})

// Or cache the data source directly
import { unstable_cache } from 'next/cache'

const getCachedUser = unstable_cache(
  async (id: string) => db.user.findUnique({ where: { id } }),
  ['user'],
  { revalidate: 60 }
)
```

>  **Warning:** SSR without caching means a database hit on every page view. This kills performance and budget at scale.

---

## AI Prompt: Route Rendering Audit

Use this after you've drafted your route map.

```prompt
You are a senior frontend engineer reviewing a Next.js 14 application's rendering strategy.

Project type: [your project type]
Framework: Next.js 14 App Router

Here are my routes and their current rendering assignments:
[paste your route list with strategies]

Review each route and:
1. Confirm or correct the rendering strategy
2. Identify any routes where I'm using SSR when CSR or SSG would suffice
3. Identify any routes where CSR will hurt SEO or performance
4. Flag any caching gaps (SSR without cache strategy)
5. Suggest specific Next.js cache configurations for data-heavy routes

Output a corrected route table with a brief justification for each change.
```

---

## Validation Checklist

After implementing rendering strategies:

- [ ] Every public page (SEO-critical) uses SSG, ISR, or SSR — not CSR
- [ ] Every authenticated page is protected before data fetches run
- [ ] No `localStorage` / `window` accessed outside `useEffect` or `'use client'` components
- [ ] SSR routes have a caching strategy (not hitting DB raw on every request)
- [ ] Slow data dependencies are wrapped in `<Suspense>` with skeletons
- [ ] Hydration errors checked in browser console (zero tolerance in production)
- [ ] ISR revalidation windows match how frequently content actually changes
- [ ] Large client components use dynamic imports to avoid SSR bundle bloat

---

## Common Mistakes

**Putting everything in CSR because it's easier.**
You lose SEO on pages that need it and ship blank screens to users on slow connections. Map your routes. Apply strategies intentionally.

**Using SSR for static content.**
You're paying for server compute on every request when a CDN-cached HTML file would serve thousands of users for free. If the content doesn't change per user, SSG or ISR is almost always correct.

**Forgetting hydration cost.**
A page can render server-side in 50ms and then take 3 seconds to hydrate because of a 400KB JS bundle. Rendering strategy and bundle size are linked. Use `next/dynamic` to lazy-load heavy components.

**No Suspense boundaries.**
Without Suspense, a slow database query blocks the entire page render. One slow query makes the whole page slow. Wrap independent data-fetching components in Suspense.

---

## Quick Reference

```
Need SEO + static content?         → SSG
Need SEO + fresh/personalized?     → SSR (+ Streaming)
Don't need SEO + authenticated?    → CSR
Need SSG but content updates?      → ISR
SSR with slow data dependencies?   → Streaming SSR + Suspense
```

---

## What's Next

**Core Layouts** — your rendering choices set the boundaries. Build layouts that respect server vs client component boundaries from the start, or you'll be refactoring when a `'use client'` component contaminates your server component tree.
