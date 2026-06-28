---
title: SEO
slug: seo
phase: Phase 6
mode: production
projectType: web-app
estimatedTime: 35–50 min
---

# SEO

Search engine optimization is not a checklist you run at launch.

It is a set of engineering decisions — made mostly in Phase 1 through 4 — whose consequences show up in Phase 6.

This module helps you audit what you built, fix what matters, and understand what SEO actually measures in 2025.

---

## What Google Actually Measures

Modern search ranking is built on three signals:

| Signal | What It Means |
|---|---|
| **Relevance** | Does your content match user intent? |
| **Authority** | Do other credible pages link to you? |
| **Experience** | Is your page fast, stable, and trustworthy? |

Authority (backlinks) is the only signal you cannot engineer directly. Focus your effort on relevance and experience — both are fully in your control.

---

## The Two Categories of SEO Work

### Technical SEO
How well search engines can discover, crawl, render, and understand your pages.

### Content SEO
How well your content matches what users actually search for.

Technical SEO unblocks content SEO. Fix technical issues first. Content strategy on a broken foundation produces nothing.

---

## Technical SEO Audit

Work through each area below. Every item you fix removes friction between your app and search engines.

---

### 1. Crawlability

> **Goal:** Search engines can find and index every page that should be indexed.

**`robots.txt`**

Every web app needs a `robots.txt` at the root domain.

```
User-agent: *
Disallow: /api/
Disallow: /admin/
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

Block routes that should never appear in search results: API endpoints, admin panels, auth flows, internal dashboards.

**`sitemap.xml`**

Static pages: generate at build time.
Dynamic pages (user profiles, blog posts, products): generate dynamically or via a cron job.

For Next.js:
```ts
// app/sitemap.ts
export default async function sitemap() {
  const posts = await fetchAllPublishedPosts()

  return [
    { url: 'https://yourdomain.com', lastModified: new Date() },
    { url: 'https://yourdomain.com/pricing', lastModified: new Date() },
    ...posts.map(post => ({
      url: `https://yourdomain.com/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }))
  ]
}
```

Submit your sitemap in [Google Search Console](https://search.google.com/search-console).

> ⚠️ **Warning:** Never include URLs that return 404, redirect, or require authentication. Google penalises sitemaps that claim pages it cannot access.

---

### 2. Rendering Strategy

> **Goal:** The content Google sees matches the content users see.

Client-side rendering (CSR) is the most common SEO mistake in modern web apps.

If your page renders content via JavaScript after load, Google may or may not execute that JavaScript. You cannot rely on it.

| Rendering Strategy | SEO Suitability |
|---|---|
| SSG (Static Site Generation) | ✅ Best — content in raw HTML |
| SSR (Server-Side Rendering) | ✅ Excellent — content in HTML at request time |
| ISR (Incremental Static Regen) | ✅ Good — cached HTML, revalidated |
| CSR (Client-Side Rendering) | ⚠️ Risky — depends on JS execution |

**Action:** Open any marketing or content page in your browser with JavaScript disabled. If the content disappears, you have an SEO rendering problem.

---

### 3. Metadata

> **Goal:** Every page has accurate, unique, well-formed metadata.

The minimum required for each indexable page:

```html
<title>Product Name — Short Page Description</title>
<meta name="description" content="One to two sentences. Be specific. Include your primary keyword naturally." />
<link rel="canonical" href="https://yourdomain.com/page" />

<!-- Open Graph (controls appearance in social shares and some search previews) -->
<meta property="og:title" content="Product Name — Page Description" />
<meta property="og:description" content="Same as meta description or a slight variation." />
<meta property="og:image" content="https://yourdomain.com/og/page.png" />
<meta property="og:url" content="https://yourdomain.com/page" />
<meta property="og:type" content="website" />
```

**Rules:**

- Every page needs a unique `<title>` and `<meta name="description">`.
- Title length: 50–60 characters. Longer titles get truncated in results.
- Description length: 140–160 characters. It does not directly affect ranking but affects click-through rate.
- Canonical URLs prevent duplicate content penalties (especially important for paginated lists, filtered views, or pages accessible via multiple URLs).

> ⚠️ **Warning:** If your app dynamically renders the same content at multiple URLs (`/products?sort=asc` and `/products?sort=desc`), both URLs need a canonical pointing to the canonical version.

---

### 4. URL Structure

> **Goal:** URLs are clean, permanent, and semantically meaningful.

**Good:**
```
yourdomain.com/blog/how-to-set-up-ci-cd
yourdomain.com/pricing
yourdomain.com/features/analytics
```

**Problematic:**
```
yourdomain.com/post?id=1492
yourdomain.com/p/a9f7bc
yourdomain.com/features#analytics
```

Rules:
- Use hyphens, not underscores.
- Keep URLs lowercase.
- Avoid query parameters for content that should be indexed.
- Never change a URL for a page with existing traffic without a permanent (301) redirect.

---

### 5. Core Web Vitals

> **Goal:** Your pages meet Google's performance thresholds for ranking consideration.

Google uses three metrics from real user data to evaluate page experience:

| Metric | What It Measures | Target |
|---|---|---|
| **LCP** (Largest Contentful Paint) | When the main content loads | < 2.5s |
| **INP** (Interaction to Next Paint) | Responsiveness to user input | < 200ms |
| **CLS** (Cumulative Layout Shift) | Visual stability during load | < 0.1 |

**Measure first:**

- [PageSpeed Insights](https://pagespeed.web.dev/) — field data from real Chrome users
- [Chrome DevTools → Lighthouse] — lab data, useful for debugging
- Google Search Console → Core Web Vitals report — aggregate field data for your domain

**Common causes and fixes:**

**LCP too slow:**
- Large images without `loading="lazy"` or without modern formats (WebP, AVIF)
- No CDN for static assets
- Slow server response (TTFB > 800ms)
- Render-blocking CSS or fonts

**CLS too high:**
- Images without explicit `width` and `height` attributes
- Fonts loading and shifting text
- Dynamically injected banners or consent modals

**INP too high:**
- Heavy JavaScript on the main thread
- Unoptimized event handlers
- Third-party scripts (analytics, chat widgets, A/B testing)

---

### 6. Structured Data

> **Goal:** Help Google understand your content type and display rich results.

Structured data (JSON-LD) enables rich snippets in search results — star ratings, FAQs, breadcrumbs, article metadata.

For a SaaS or web app, the most useful schemas are:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Your App Name",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "Web"
}
</script>
```

For a blog:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2025-01-01",
  "dateModified": "2025-06-01"
}
</script>
```

Validate your structured data at [Rich Results Test](https://search.google.com/test/rich-results).

---

### 7. HTTPS and Security Signals

Google uses HTTPS as a ranking signal. Every page must be served over HTTPS.

If you are not already:
- Most hosting providers (Vercel, Railway, Fly.io, Netlify) handle TLS automatically.
- Verify that HTTP automatically redirects to HTTPS.
- Verify that `www` redirects to your canonical domain (or vice versa, consistently).

---

## Content SEO

Technical SEO makes your pages indexable. Content SEO makes them rank.

You do not need to master content SEO at launch. But you need to understand how it works so you build with it in mind.

---

### Keyword Intent

Every search query has an intent. Match your content to the intent, not just the words.

| Intent | Example Query | Right Content Type |
|---|---|---|
| **Informational** | "how does CI/CD work" | Blog post, guide |
| **Navigational** | "Linear app login" | Your login page |
| **Commercial** | "best project management tools" | Comparison page, feature page |
| **Transactional** | "buy Notion subscription" | Pricing page, signup page |

Common mistake: writing blog posts targeting transactional queries, or building landing pages for informational queries. Neither ranks well because neither matches what the searcher needs.

---

### Page Focus

One page. One topic. One primary keyword.

Do not try to rank one page for five different topics. Search engines reward topical depth, not breadth.

---

### Internal Linking

Internal links:

1. Pass authority from high-traffic pages to lower-traffic pages.
2. Help search engines discover and understand your content hierarchy.
3. Keep users on your site longer.

Every blog post should link to at least 2–3 related pages. Your highest-authority pages (homepage, pricing) should link to the content you most want to rank.

---

## AI Prompt — SEO Audit

Use this when you want a structured review of your current SEO state.

```
You are a senior SEO engineer conducting a technical audit.

My web app:
- URL: [your domain]
- Tech stack: [e.g. Next.js 14, deployed on Vercel]
- Rendering: [SSR / SSG / ISR / CSR per page type]
- Key pages I want to rank: [list 3–5 pages with their purpose]

Audit the following areas and give specific, actionable findings for each:

1. Crawlability — robots.txt, sitemap, blocked routes
2. Rendering strategy — is my content indexable as-is?
3. Metadata — title tags, descriptions, canonical URLs, Open Graph
4. URL structure — are URLs clean and permanent?
5. Core Web Vitals — likely issues based on my stack
6. Structured data — what schemas should I implement?
7. Internal linking — how should I structure links between my pages?

For each finding, tell me:
- Current risk level (critical / moderate / low)
- What specifically to fix
- Why it matters

Do not explain SEO basics. I want a triage list ordered by impact.
```

> **After receiving the output:** Cross-check every "critical" finding manually. AI hallucinations in SEO audits are common — especially invented ranking rules, fabricated Google algorithm details, or overstated impact claims.

---

## AI Prompt — Metadata Generation

Use this to generate metadata for every public page.

```
Generate SEO metadata for the following pages of my web app.

App name: [name]
App description: [one sentence]
Target audience: [who uses this]

Pages:
1. Homepage — [what it shows/does]
2. Pricing — [what it shows/does]
3. [Feature page] — [what it shows/does]
4. Blog index — [what it shows/does]

For each page, generate:
- <title> tag (50–60 characters, include app name)
- <meta name="description"> (140–160 characters, specific, no filler)
- og:title
- og:description

Constraints:
- No marketing language ("powerful", "amazing", "robust")
- Be specific about what the page does
- Include the primary keyword naturally — do not keyword-stuff
- Every page must have unique title and description
```

---

## Validation Checklist

Complete this before considering SEO done for launch.

**Technical Foundation**
- [ ] `robots.txt` exists and blocks non-public routes
- [ ] `sitemap.xml` exists, is submitted to Google Search Console, and contains only accessible URLs
- [ ] All public pages render content in HTML (verify with JS disabled)
- [ ] All public pages have unique `<title>` and `<meta name="description">`
- [ ] All public pages have a `<link rel="canonical">` tag
- [ ] Open Graph tags are present and correct on all key pages
- [ ] HTTPS is enforced and HTTP redirects automatically
- [ ] `www` and non-`www` redirect consistently to one canonical version
- [ ] No broken internal links (run a crawler: [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) free tier covers 500 URLs)

**Performance**
- [ ] LCP < 2.5s on mobile (measured in PageSpeed Insights)
- [ ] CLS < 0.1 on mobile
- [ ] INP < 200ms
- [ ] All images have explicit `width` and `height` attributes
- [ ] Hero images use `loading="eager"` — all others use `loading="lazy"`
- [ ] Fonts use `font-display: swap` or `optional`

**Content**
- [ ] Each key page targets a clear, specific keyword intent
- [ ] Key pages have at least 300 words of substantive content (thin content does not rank)
- [ ] Structured data implemented for the most relevant page types
- [ ] Internal links connect related content

**Google Search Console**
- [ ] Domain verified in Search Console
- [ ] Sitemap submitted
- [ ] No coverage errors on key pages
- [ ] Core Web Vitals report reviewed

---

## Common Mistakes at Launch

**Shipping with `<meta name="robots" content="noindex">` left in from development.**
This is more common than you think. A single noindex tag on a page template can silently deindex your entire site. Verify every page.

**Building the entire frontend in CSR and discovering it at launch.**
If you are using React without Next.js or a similar SSR framework, your marketing pages are almost certainly not indexable. Fixing this after launch requires rearchitecting the rendering layer — expensive and time-consuming.

**Changing URL slugs without 301 redirects.**
Every URL change without a redirect destroys any ranking that URL had accumulated. Treat your URLs as permanent once indexed.

**Ignoring mobile.**
Google uses mobile-first indexing. Your mobile experience is your SEO experience. If your desktop score is 90 and your mobile score is 40, Google uses 40.

**Expecting results in days.**
New domains typically take 3–6 months for Google to develop trust and rank content meaningfully. Technical SEO fixes show faster results. Content SEO results take longer.

---

## What to Do After Launch

SEO is ongoing, not a one-time task. Post-launch, the highest-leverage activities are:

1. **Monitor Search Console weekly** — Catch crawl errors, coverage drops, and Core Web Vitals regressions early.
2. **Publish content consistently** — Consistency signals to Google that your site is actively maintained.
3. **Build backlinks intentionally** — Guest posts, product directories ([Product Hunt](https://www.producthunt.com/), [SaaSHub](https://www.saashub.com/)), open source, public APIs, or tools that naturally attract links.
4. **Improve underperforming pages** — Pages ranking on page 2 (positions 11–20) are often the highest ROI content investment. Small improvements push them to page 1.

---

## Quick Reference

| Tool | Purpose |
|---|---|
| [Google Search Console](https://search.google.com/search-console) | Index coverage, performance data, Core Web Vitals |
| [PageSpeed Insights](https://pagespeed.web.dev/) | Real-world LCP, INP, CLS with field data |
| [Rich Results Test](https://search.google.com/test/rich-results) | Validate structured data |
| [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) | Crawl your site for broken links, missing metadata |
| [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) | Free backlink profile and site audit |
| [schema.org](https://schema.org/) | Structured data type reference |
