---
title: Performance
slug: performance
phase: Phase 6
mode: production
projectType: web-app
estimatedTime: 40–55 min
---

# Performance

Performance is not an optimisation pass you do before launch.

It is the accumulated result of every architectural decision you made in Phases 1 through 5.

This module teaches you how to measure accurately, identify what actually matters, and fix the right things — without wasting time on micro-optimisations that move no real metric.

---

## The Measurement Trap

Most engineers optimise before measuring. They compress images, add memoization, and tune bundle sizes — then find their page still feels slow to users.

The reason: **lab data and field data are different things.**

| Type | Source | What It Tells You |
|---|---|---|
| **Lab data** | Lighthouse, DevTools | Reproducible controlled test — useful for debugging |
| **Field data** | Real users in Chrome | Actual experience on real devices and networks |

Google ranks your page based on field data. Lab data is a debugging tool, not a goal.

**Measure field data first. Then use lab data to find the cause.**

---

## The Right Measurement Stack

### 1. Google Search Console — Core Web Vitals Report
Your most important dashboard. Field data aggregated from real Chrome users on your domain. Look at this weekly.

### 2. PageSpeed Insights
Field data (if available) + lab data for any URL. Start here for diagnosing specific pages.
→ [pagespeed.web.dev](https://pagespeed.web.dev/)

### 3. Chrome DevTools — Performance Panel
For deep investigation: flame charts, long tasks, layout thrashing, main thread blocking.

### 4. Web Vitals JS Library
Collect Core Web Vitals from your own users and send to your analytics or monitoring service.

```ts
import { onLCP, onINP, onCLS } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
  })
}

onLCP(sendToAnalytics)
onINP(sendToAnalytics)
onCLS(sendToAnalytics)
```

This gives you segmented data: which pages are slow, on which devices, from which regions.

---

## The Three Metrics That Matter

Everything else is secondary.

| Metric | Measures | Target |
|---|---|---|
| **LCP** — Largest Contentful Paint | When the main content loads | < 2.5s |
| **INP** — Interaction to Next Paint | Responsiveness to any interaction | < 200ms |
| **CLS** — Cumulative Layout Shift | Visual stability | < 0.1 |

Each metric has different causes and different fixes. Treat them separately.

---

## LCP — Making the Main Content Load Fast

LCP measures when the largest visible element renders. Usually: a hero image, a heading, or a large text block.

### Diagnose first

Open PageSpeed Insights on your homepage. Find the LCP element in the report. Everything else is secondary to fixing that one element.

### Fix order (highest impact first)

**1. Server response time (TTFB)**

If your server takes > 600ms to respond, every other optimisation is fighting an uphill battle.

- Check your hosting region — are your servers close to your users?
- Check database queries triggered on first render
- Check if you are missing HTTP caching headers for static responses

```ts
// Example: Cache a Next.js route for 60 seconds, revalidate in background
export const revalidate = 60
```

**2. Render-blocking resources**

CSS and synchronous JavaScript block the browser from rendering.

```html
<!-- Bad: blocks rendering -->
<link rel="stylesheet" href="/heavy-styles.css" />
<script src="/analytics.js"></script>

<!-- Better: preload critical CSS, defer non-critical JS -->
<link rel="preload" href="/critical.css" as="style" />
<script src="/analytics.js" defer></script>
```

**3. LCP image optimisation**

If your LCP element is an image:

```html
<!-- Give the browser early notice -->
<link rel="preload" as="image" href="/hero.webp" />

<!-- Use modern formats, correct sizing, no lazy loading on LCP -->
<img
  src="/hero.webp"
  width="1200"
  height="600"
  loading="eager"
  fetchpriority="high"
  alt="Hero image"
/>
```

Never use `loading="lazy"` on your LCP image. It guarantees a poor LCP score.

**4. CDN for static assets**

If your images, fonts, and JS bundles are served from your origin server without a CDN, you are leaving significant performance on the table.

Vercel, Cloudflare, and Netlify include CDNs by default. If you are on a VPS, put Cloudflare in front of it — the free tier is sufficient for most apps.

---

## CLS — Eliminating Layout Shift

CLS measures how much the page visually jumps during load. A score above 0.1 means users are clicking the wrong thing because content moved under their cursor.

### Most common causes

**Images and media without dimensions**

```html
<!-- Bad: browser doesn't know how much space to reserve -->
<img src="/product.png" />

<!-- Good: browser reserves exact space immediately -->
<img src="/product.png" width="400" height="300" />
```

**Web fonts causing text shift**

When a system font renders first, then a web font loads, text reflows.

```css
/* Reduce shift with font-display: optional (no swap at all) */
/* or font-display: swap (accepts brief invisible text) */
@font-face {
  font-family: 'Inter';
  font-display: optional;
}
```

Preload your most important font file:
```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
```

**Dynamically injected content**

Banners, cookie consent modals, and chat widgets that appear after load push content down.

- Reserve space for banners in CSS before they appear.
- Render consent banners as `position: fixed` overlays, not inline elements.
- Use `min-height` on containers that load dynamic content.

---

## INP — Keeping Interactions Fast

INP replaced FID in 2024. It measures the worst interaction a user has with your page — not just the first one.

> A click, tap, or keypress that takes > 200ms to visually respond fails INP.

### Diagnose

In Chrome DevTools → Performance panel, record while interacting. Look for long tasks (tasks > 50ms on the main thread). Long tasks are the cause of poor INP.

### Fix order

**1. Reduce main thread work**

Third-party scripts are the most common offender.

```ts
// Delay non-critical third-party scripts
// Load analytics, chat widgets, etc. only after the page is interactive
window.addEventListener('load', () => {
  const script = document.createElement('script')
  script.src = 'https://cdn.thirdparty.com/widget.js'
  document.head.appendChild(script)
})
```

**2. Break up long tasks**

Any synchronous block of JS > 50ms delays user interactions.

```ts
// Bad: blocks the main thread
function processLargeList(items) {
  return items.map(expensiveOperation)
}

// Better: yield to the browser between chunks
async function processLargeList(items) {
  const results = []
  for (const item of items) {
    results.push(expensiveOperation(item))
    await scheduler.yield() // yield control back to browser
  }
  return results
}
```

**3. Avoid synchronous layout reads inside event handlers**

```ts
// Bad: forces synchronous layout (causes "layout thrashing")
button.addEventListener('click', () => {
  const height = element.offsetHeight  // forces layout
  element.style.height = height + 10 + 'px'  // triggers another layout
})

// Better: batch reads before writes
button.addEventListener('click', () => {
  const height = element.offsetHeight  // read
  requestAnimationFrame(() => {
    element.style.height = height + 10 + 'px'  // write in next frame
  })
})
```

---

## Bundle Size and JavaScript

JavaScript is the most expensive resource on the web. Byte for byte, JS costs more than images — it must be downloaded, parsed, and executed.

### Measure your bundle

```bash
# Next.js
npx next build
# Check the output table — focus on First Load JS

# Vite
npx vite build --mode production
# Check the dist/ output sizes
```

**Warning thresholds:**
- First Load JS > 300KB: investigate
- Any single chunk > 500KB: likely a problem
- Total JS > 1MB: serious problem

### Fix order

**1. Code splitting**

Never load the entire application on the first page render. Split by route.

```ts
// Next.js does this automatically per route
// For React Router or manual setups:
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))
```

**2. Lazy load heavy components**

Rich text editors, date pickers, chart libraries, and maps are often enormous. Do not load them until needed.

```ts
const RichEditor = dynamic(() => import('./RichEditor'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

**3. Audit your dependencies**

```bash
npx bundlephobia-cli lodash
# Or check https://bundlephobia.com
```

Common dependency traps:
- `moment.js` — 67KB gzipped. Replace with `date-fns` (tree-shakeable) or `dayjs`.
- `lodash` — Import functions directly: `import debounce from 'lodash/debounce'`
- Icon libraries — Import individual icons, not entire icon sets.

**4. Analyse what is actually in your bundle**

```bash
# Next.js
npx @next/bundle-analyzer

# Vite
npx rollup-plugin-visualizer
```

These generate a visual treemap of your bundle. Large unexpected packages are immediately obvious.

---

## Image Optimisation

Images are typically the largest bytes on any page. Get this right and LCP improvements follow.

### Format

| Format | Use Case |
|---|---|
| **WebP** | Photos, complex images. ~30% smaller than JPEG. |
| **AVIF** | Same as WebP but better compression. Slightly less browser support. |
| **SVG** | Icons, logos, illustrations. Infinitely scalable. |
| **PNG** | Only when you need transparency and SVG is not suitable. |

### Sizing

Never serve a 2400px image in a 400px container.

```html
<!-- Serve different sizes for different screen sizes -->
<img
  srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  src="/hero-1200.webp"
  alt="Hero"
/>
```

Next.js `<Image />`, Nuxt `<NuxtImg />`, and similar framework components handle this automatically.

### Lazy loading

```html
<!-- All images below the fold -->
<img src="/product.webp" loading="lazy" width="400" height="300" alt="Product" />

<!-- Hero / LCP image — never lazy load -->
<img src="/hero.webp" loading="eager" fetchpriority="high" width="1200" height="600" alt="Hero" />
```

---

## Caching Strategy

A fast app that re-fetches everything on every visit is still slow.

### HTTP caching headers

```ts
// Static assets (hashed filenames — can cache forever)
Cache-Control: public, max-age=31536000, immutable

// HTML pages (should revalidate — content changes)
Cache-Control: public, max-age=0, must-revalidate

// API responses (depends on how often data changes)
Cache-Control: public, s-maxage=60, stale-while-revalidate=300
```

### CDN caching

If you are on Vercel, Cloudflare, or Netlify, their CDN caches your static assets and SSR responses at edge nodes globally. Configure cache rules to maximise CDN hits and minimise origin requests.

### Client-side data caching

Do not re-fetch data the user already has.

```ts
// React Query / TanStack Query
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000,      // Consider fresh for 5 minutes
  gcTime: 30 * 60 * 1000,        // Keep in memory for 30 minutes
})
```

---

## AI Prompt — Performance Diagnosis

Use this when you have specific PageSpeed Insights findings you need to act on.

```
You are a senior performance engineer.

My web app:
- Stack: [e.g. Next.js 14, React, PostgreSQL, deployed on Vercel]
- Framework rendering: [SSR / SSG / ISR / CSR]

My current PageSpeed Insights scores (mobile):
- LCP: [value]
- INP: [value]
- CLS: [value]
- Performance score: [value]

The top opportunities PageSpeed is flagging:
[paste the list from PageSpeed Insights]

For each flagged opportunity:
1. Explain exactly what is causing it in a Next.js app
2. Give me the specific code change to fix it
3. Tell me the expected impact on the metric

Prioritise by actual metric impact. Skip theoretical micro-optimisations.
```

> **Review the output critically:** AI commonly suggests fixes that are correct in principle but wrong for your specific setup. Always verify that the suggested fix applies to your framework version and rendering strategy before implementing.

---

## Validation Checklist

**Measurement**
- [ ] Core Web Vitals field data reviewed in Google Search Console
- [ ] PageSpeed Insights run on homepage, key landing page, and dashboard (if applicable)
- [ ] Web Vitals library installed and sending data to analytics or monitoring

**LCP**
- [ ] LCP element identified via PageSpeed Insights
- [ ] LCP image (if applicable) uses `loading="eager"` and `fetchpriority="high"`
- [ ] LCP image preloaded with `<link rel="preload">`
- [ ] TTFB < 600ms (check in PageSpeed Insights → Server response times)
- [ ] Static assets served via CDN

**CLS**
- [ ] All images have explicit `width` and `height` attributes
- [ ] Web fonts use `font-display: optional` or `font-display: swap`
- [ ] Critical fonts preloaded
- [ ] Cookie / consent banners do not push content (use `position: fixed`)

**INP**
- [ ] No third-party scripts loaded synchronously in `<head>`
- [ ] Non-critical third-party scripts deferred until after load
- [ ] No long tasks (> 50ms) on event handlers (verified via DevTools Performance panel)

**JavaScript**
- [ ] First Load JS < 300KB (checked via build output)
- [ ] No single chunk > 500KB
- [ ] Heavy routes/components are code-split and lazy loaded
- [ ] Bundle analysed — no unexpected large dependencies

**Images**
- [ ] All images use WebP or AVIF format
- [ ] Images are correctly sized for their container
- [ ] `srcset` used for responsive images (or framework image component handles it)
- [ ] Images below the fold use `loading="lazy"`

**Caching**
- [ ] Static assets have `immutable` cache headers
- [ ] HTML responses have `must-revalidate` or appropriate CDN TTL
- [ ] Client-side data fetching uses stale-while-revalidate or equivalent

---

## Common Mistakes

**Optimising in Lighthouse while users are on 4G mobile.**
Lighthouse runs in a controlled environment. Your users are on real networks on real devices. Always check field data in PageSpeed Insights before celebrating a Lighthouse score.

**Adding `loading="lazy"` to every image.**
Lazy loading your LCP image guarantees a poor LCP score. Only lazy load images that are below the fold on initial render.

**Installing a massive library to solve a small problem.**
`moment.js` for date formatting. `lodash` imported wholesale. An icon library loaded in full for three icons. Audit your dependencies before assuming you need them.

**Optimising before identifying the bottleneck.**
Compress images, inline critical CSS, add memoization — then discover the problem was a slow database query causing a 2-second TTFB. Measure first. Fix second.

**Ignoring mobile performance.**
A Lighthouse score of 95 on desktop with a score of 42 on mobile means your performance score is 42. Google uses mobile-first. Your users are mostly mobile. Start your testing on a simulated slow mobile connection.

---

## Quick Reference

| Tool | Purpose |
|---|---|
| [PageSpeed Insights](https://pagespeed.web.dev/) | Field + lab data for any URL |
| [Google Search Console](https://search.google.com/search-console) | Aggregate field data for your domain |
| [Bundlephobia](https://bundlephobia.com/) | Check npm package sizes before installing |
| [Squoosh](https://squoosh.app/) | Manually optimise and convert images |
| [web-vitals npm](https://www.npmjs.com/package/web-vitals) | Collect Core Web Vitals from real users |
| Chrome DevTools → Performance | Flame charts, long tasks, layout thrashing |
