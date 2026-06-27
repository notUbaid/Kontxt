---
title: SEO
slug: seo
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 20-30 min
---

# SEO

Most SaaS founders treat SEO as a marketing task to outsource later. That's backwards. The technical foundation has to be built into the product now — by the time you hire someone to "do SEO," you'll either have a site that's already crawlable and fast, or one that needs an engineering sprint just to become eligible to rank.

This module covers the engineering side of SEO: the part that's your job, not your marketer's.

---

## The Core Idea: SEO Has Two Layers

**Technical SEO** — can search engines crawl, render, and understand your site at all? This is engineering work.

**Content SEO** — does your content match what people are searching for? This is marketing/content work, and largely out of scope here.

If technical SEO is broken, content SEO can't save you. A brilliant blog post on a page that returns a 404 to Googlebot, or that takes 8 seconds to render its content, will never rank — no matter how well written it is.

> ** Tip**
> If your product is gated entirely behind a login (most B2B SaaS dashboards are), your SEO surface is really just your marketing site and public docs — not the app itself. Scope your effort there first.

---

## Technical Foundation Checklist

### Crawlability

- [ ] `robots.txt` exists and doesn't accidentally block pages you want indexed
- [ ] `sitemap.xml` generated and submitted to Google Search Console
- [ ] No important pages are accidentally behind `noindex` left over from staging
- [ ] Authenticated app routes (dashboard, settings) are excluded from the sitemap — they shouldn't be indexed anyway

### Rendering

- [ ] Public marketing pages are server-rendered or statically generated, not client-side-only React that requires JS execution to show content
- [ ] Test this directly: view page source (not dev tools) and confirm your actual content appears in the raw HTML, not just a `<div id="root"></div>`

### Metadata

- [ ] Every public page has a unique `<title>` and meta description — not the same template repeated on every URL
- [ ] Open Graph tags set for social sharing previews (`og:title`, `og:description`, `og:image`)
- [ ] Canonical URLs set correctly to avoid duplicate-content penalties from URL variations (trailing slashes, query params)

### Performance

- [ ] Core Web Vitals checked via PageSpeed Insights for your homepage and top landing pages
- [ ] Largest Contentful Paint (LCP) under 2.5s
- [ ] Cumulative Layout Shift (CLS) under 0.1 — no content jumping around as it loads

### Structure

- [ ] One `<h1>` per page, used for the actual page topic — not your logo or a generic header
- [ ] Heading hierarchy (`h1` → `h2` → `h3`) reflects real content structure, not arbitrary font sizing

---

> **️ Warning — The Most Common SaaS SEO Mistake**
> Building the marketing site as a client-side-rendered React SPA with no server rendering. Search engines have improved at executing JavaScript, but rendering is inconsistent, delayed, and resource-limited compared to indexing static HTML directly. If your framework supports SSR or static generation (Next.js, Astro, Remix, SvelteKit), use it for public pages — even if your authenticated app stays a pure SPA.

---

## Decision Card: Rendering Strategy by Page Type

| Page Type | Recommended Approach | Reasoning |
|---|---|---|
| Marketing homepage, pricing, landing pages | Static generation (SSG) | Content rarely changes, fastest possible load, perfectly crawlable |
| Blog / docs | SSG or server-side rendering (SSR) | Content updates but doesn't need per-request computation |
| Authenticated dashboard | Client-side rendering (CSR) is fine | Not meant to be indexed; SEO doesn't apply |
| Dynamic public pages (e.g., public user profiles) | SSR | Needs fresh data per request but still must be crawlable |

---

## Structured Data: Help Search Engines Understand Context

Adding Schema.org structured data (JSON-LD) doesn't directly boost rankings, but it does improve how your pages appear in search results — rich snippets, star ratings, FAQ dropdowns — which improves click-through rate even at the same ranking position.

For a SaaS, the most relevant schema types are:

- `Organization` — on your homepage, for brand recognition
- `SoftwareApplication` — describes your product for search engines
- `FAQPage` — if you have a public FAQ section, this can produce expandable result snippets

> ** Note**
> Structured data is a "nice to have," not a launch blocker. Prioritize crawlability, rendering, and Core Web Vitals first — those affect whether you rank at all. Structured data affects how attractive your listing looks once you do.

---

## Using AI for SEO Work

AI is genuinely useful for SEO audits because it can scan markup systematically — but it cannot tell you whether your content actually satisfies search intent. That requires real keyword research and human judgment about your market.

**Prompt: Technical SEO Audit**

```prompt
Act as a technical SEO engineer reviewing a SaaS marketing site.

Review the following page's HTML output for these issues only:
- Missing or duplicate title/meta description
- Missing or incorrect canonical tag
- Heading hierarchy problems (multiple h1s, skipped levels)
- Missing Open Graph tags
- Any content that appears to require JavaScript execution to render

Do not suggest content or copywriting changes. Only flag structural
and technical issues.

[paste the rendered HTML source, not the React component code]
```

> ** Why this prompt works**
> It explicitly excludes content/copywriting feedback, which keeps the review focused on what's actually fixable by an engineer in one sitting. Pasting the *rendered* HTML (view-source output) rather than your component code is critical — the model needs to see what a crawler actually sees, not your JSX.

**Token efficiency note:** Run this audit page-by-page for your 3-5 most important pages (home, pricing, and your top one or two landing pages) rather than dumping your entire site. Technical issues tend to repeat across templates, so fixing the pattern on one page usually fixes it everywhere that template is reused.

---

## Validating AI's SEO Suggestions

- **Don't blindly trust keyword suggestions.** AI's training data lags real search trends; current search volume and intent require an actual keyword research tool (Ahrefs, Semrush, Google Keyword Planner), not a model's guess.
- **Verify structured data syntax.** JSON-LD has a strict schema — validate generated markup with Google's Rich Results Test before shipping it, since a single malformed property can invalidate the entire block silently.
- **Watch for keyword stuffing suggestions.** Older SEO advice (and some AI output) still recommends repeating keywords unnaturally. Modern search engines penalize this; write for humans first.

---

## Quick Reference: Minimum Viable SEO for Launch

1. Server-render or statically generate all public marketing pages
2. Unique title + meta description per page
3. Sitemap submitted to Google Search Console
4. Core Web Vitals pass on homepage
5. One clear `<h1>` per page

Everything beyond this — structured data, content strategy, backlinks — can be layered on after launch, once you have real search console data showing what's actually being searched and clicked.

---

## What's Next

With your public pages crawlable and fast, move to **Privacy Policy** — a legal requirement that, done right, also reinforces the trust signals that keep both users and search engines confident in your product.
