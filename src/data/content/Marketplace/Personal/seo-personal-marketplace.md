---
title: SEO
slug: seo
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# SEO

A marketplace has a structural SEO advantage most apps don't: every listing is a unique, indexable page that matches something someone might actually search for. "Vintage leather jacket size M" is a real search query, and if your listing page is built correctly, it can show up for it. This module is about not wasting that advantage.

This isn't general SEO theory — it's the specific patterns that matter for a marketplace's listing pages, search pages, and category pages.

---

## Why Marketplace SEO Is Different

> ** Core rule:** most SEO advice is written for blogs and marketing sites with a handful of pages you write by hand. A marketplace has potentially thousands of pages, generated automatically from user content (listings) that you don't fully control the quality of. The technical foundation matters more here than content strategy.

| Page type | SEO opportunity |
|---|---|
| Individual listing pages | Long-tail searches for specific items — your highest-volume opportunity |
| Category/search result pages | Broader searches ("used furniture near me") |
| Seller profile pages | Lower priority, but can rank for seller name searches |
| Homepage | Brand searches only — won't drive significant new traffic alone |

---

## The Foundation: Server-Side Rendering or Static Generation

> **️ Warning:** If your listing pages are rendered entirely client-side (a React app that fetches data after the page loads with no content in the initial HTML), search engines may index an empty or incomplete page. This is the single most common SEO mistake in marketplace projects built with modern JS frameworks, and it silently undermines every other SEO effort in this module.

> ** Validation Checklist**
> - [ ] Does viewing your listing page's source HTML (not the rendered DOM, the actual response) show the listing title, description, and price — or just an empty `<div id="root">`?
> - [ ] If using React, are you using a framework with server-side rendering or static generation (Next.js, Remix) for listing pages specifically, even if other parts of the app are client-rendered?
> - [ ] Test this directly: `curl` your own listing page URL and check whether the content is actually present in the response

```bash
# Quick test — does the raw HTML contain your listing content?
curl -s https://yourapp.com/listings/some-listing-id | grep -i "listing title text"
```

---

## Decision: Rendering Strategy for Listing Pages

> ** Decision Card — Rendering Approach**
>
> **Option A: Full client-side rendering (CSR)**
> Simplest to build if you're already deep into a client-rendered SPA, but genuinely risks poor indexing — don't choose this if SEO matters to your launch strategy.
>
> **Option B: Server-side rendering (SSR) for listing/search pages specifically**
> Listing content is in the initial HTML response, reliably indexable, requires a framework that supports it (Next.js, Remix, SvelteKit) or a meta-framework migration if you're not already using one.
>
> **Option C: Static generation with periodic regeneration (ISR)**
> Best performance (pre-built pages), works well for listings that don't change every second — appropriate middle ground for most marketplace listing pages.
>
> **For Personal Mode: use Option B or C if your framework supports it.** If you built your frontend as a plain client-rendered SPA without an SSR-capable framework, this is worth addressing before public launch specifically because of the SEO impact — not purely a performance preference.

---

## Structured Data: Tell Search Engines What a Listing Is

Beyond having content in the HTML, structured data (Schema.org markup) tells search engines specifically "this is a product, here's its price, here's its availability" — which can unlock rich results (price, rating stars) directly in search listings.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Vintage Leather Jacket - Size M",
  "description": "...",
  "offers": {
    "@type": "Offer",
    "price": "45.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12"
  }
}
</script>
```

> ** Validation Checklist**
> - [ ] Does each listing page include `Product` structured data with name, price, and availability?
> - [ ] Does `availability` correctly reflect your listing status (`InStock` for active, `OutOfStock` or removed entirely once `sold`)? A sold listing showing `InStock` in structured data is misleading and can hurt trust with search engines over time
> - [ ] Is `aggregateRating` populated from your actual Reviews aggregate calculation, not hardcoded or omitted entirely when a seller has reviews?

---

## URL Structure and Metadata

> ** Validation Checklist**
> - [ ] Are listing URLs human-readable and descriptive (`/listings/vintage-leather-jacket-m-a1b2c3`), not just a raw ID (`/listings/a1b2c3d4e5f6`)? Descriptive slugs help both users and search engines understand the page before clicking
> - [ ] Does each listing page have a unique `<title>` and meta description generated from the actual listing content, not a generic site-wide title repeated on every page?
> - [ ] Do removed/sold listings either redirect cleanly or return a proper 404/410 status, rather than staying indexed and frustrating searchers who click through to a dead listing?

```js
// Title and meta description generated per-listing, not static
<title>{listing.title} - ${listing.price} | YourMarketplace</title>
<meta name="description" content={listing.description.slice(0, 155)} />
```

---

## Sitemaps: Help Search Engines Find Everything

With potentially thousands of listing pages, you can't rely on search engines discovering them all through link-crawling alone — especially newly published listings.

> ** Validation Checklist**
> - [ ] Is there a dynamically generated `sitemap.xml` that includes all active listing URLs, regenerated as listings are created/removed?
> - [ ] Does `robots.txt` correctly allow crawling of listing/search pages while excluding anything that shouldn't be indexed (user dashboards, message threads, checkout flows)?

```js
// Dynamically generated sitemap — not a static file you maintain by hand
router.get("/sitemap.xml", async (req, res) => {
  const listings = await db.listing.findMany({
    where: { status: "active" },
    select: { id: true, slug: true, updatedAt: true },
  });

  const urls = listings
    .map((l) => `<url><loc>https://yourapp.com/listings/${l.slug}</loc><lastmod>${l.updatedAt.toISOString()}</lastmod></url>`)
    .join("");

  res.set("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
});
```

---

## What to Deliberately Skip

> ** Common Hallucination:** AI SEO advice often recommends content marketing strategies (blog posts, link building campaigns) appropriate for marketing sites but largely irrelevant to a personal marketplace's actual SEO opportunity, which is overwhelmingly about technical indexability of your listing pages. Don't let blog-post suggestions distract from the rendering and structured-data fundamentals above — they're the actual leverage point.

---

## AI Prompt: Audit and Fix Listing Page SEO

> ** Copy Prompt**
>
> ```
> Audit my marketplace listing page for SEO issues, focused on technical indexability,
> not content strategy. Stack: [YOUR STACK — e.g. React/Next.js].
>
> Specifically check:
> 1. Is listing content (title, description, price) present in the initial server
>    response, or only rendered client-side after JS loads?
> 2. Is Product structured data (Schema.org JSON-LD) present, with accurate price
>    and availability matching the listing's actual status?
> 3. Are page title and meta description generated per-listing, not static/repeated?
> 4. Do removed/sold listings return proper 404/410 status or redirect, rather than
>    staying indexed?
> 5. Is there a dynamically generated sitemap.xml covering active listings?
>
> Existing listing page code and routing:
> [PASTE YOUR LISTING PAGE COMPONENT AND ROUTE]
> ```
>
> **Why this prompt works:** ordering the checks from "is content even indexable" down to "is metadata optimized" mirrors the actual priority — fixing structured data on a page that isn't server-rendered at all does nothing, so the prompt forces AI to check the foundational issue first rather than jumping straight to polish.

---

## Token Efficiency Tip

The rendering-strategy question (Option B/C decision above) is the one piece of this module that might require real architectural work, not just code review — resolve that first in its own focused conversation if it requires a framework change, separate from the smaller structured-data and metadata fixes that can be handled together afterward.

---

## What You've Decided

By the end of this module you should have:

- Confirmed listing content is actually present in server-rendered HTML, not client-only
- Product structured data accurately reflecting real price, availability, and rating
- Per-listing page titles and meta descriptions
- Proper status codes for removed/sold listings instead of stale indexed pages
- A dynamically generated sitemap covering all active listings

**Next:** Legal Documents — rounding out the remaining legal groundwork before launch.
