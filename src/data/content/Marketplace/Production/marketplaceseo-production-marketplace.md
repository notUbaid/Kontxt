---
title: SEO
slug: seo
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# SEO (Search Engine Optimization)

## The Marketplace SEO Advantage

Most SaaS companies have to pay for users (Facebook/Google Ads) or spend months writing blog posts to generate organic traffic. A marketplace has a structural SEO advantage: **User-Generated Content (UGC)**. 

If you have 10,000 sellers uploading listings, you have 10,000 unique, highly-specific product pages that Google can index. If a buyer searches for *"Used 2021 Macbook Pro 16-inch M1 Silver"*, your listing page should rank #1. This is how you acquire buyers for $0 CAC (Customer Acquisition Cost).

---

## Server-Side Rendering (Mandatory)

If your marketplace is a standard React Single Page Application (SPA), it sends a blank `<div id="root"></div>` to the browser, and JavaScript fetches the data. Googlebot *can* execute JavaScript, but it is slow, unreliable, and heavily penalized in ranking.

**The Production Standard:**
You must use **Server-Side Rendering (SSR)** or **Incremental Static Regeneration (ISR)** via frameworks like Next.js or Nuxt.
The HTML response from your server must contain the full Listing Title, Description, and Price. When Googlebot crawls the page, it sees the text instantly.

---

## Programmatic SEO (pSEO)

You cannot manually create category pages for every possible search combination. You must generate them programmatically.

**The Strategy:**
Combine `[Category]` + `[Attribute/Location]` to generate thousands of highly targeted landing pages dynamically.
* Example URL: `/category/laptops/condition/used/location/new-york`
* The Next.js router captures these parameters and queries the database for matching listings.
* It injects dynamic `<h1>` tags: *"Used Laptops in New York"* and dynamically generates `<meta>` tags.
* This allows you to capture "Long-Tail" search traffic (highly specific searches with high purchase intent).

---

## Structured Data (JSON-LD)

You want your listings to stand out on the Google Search Results page with stars, prices, and "In Stock" badges (Rich Snippets).

**The Implementation:**
You must inject Schema.org `Product` JSON-LD into the `<head>` of every listing page.
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Used 2021 Macbook Pro 16-inch",
  "offers": {
    "@type": "Offer",
    "price": "1200.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "15"
  }
}
```

---

## Core Web Vitals (CWV)

Google ranks pages based on how fast they feel (Core Web Vitals). If your listing page is slow, you will be penalized.

* **LCP (Largest Contentful Paint):** The main product image must load instantly. Use `<Image priority>` in Next.js to preload the Hero image above the fold.
* **CLS (Cumulative Layout Shift):** If your page jumps around as fonts and images load, buyers will rage-click. Always set explicit `width` and `height` attributes on all `<img />` tags to reserve the space before the image loads.

---

## Dynamic XML Sitemaps

If you have 50,000 listings, Google will not find them all by clicking links. You must provide a map.

**The Production Rule:**
Create a dynamic `sitemap.xml` endpoint that queries your database for all active listings and outputs standard XML. Submit this URL to **Google Search Console**. As sellers add new listings, the sitemap updates automatically, and Google crawls them within hours.

---

## Do's and Don'ts of Production SEO

- **DO handle 404s correctly.** When an item is sold or deleted, do not leave a broken page. Either return a `410 Gone` status code so Google drops it from the index, or show a "This item sold, but here are similar items" page returning a `200 OK`.
- **DON'T duplicate content.** If the same listing is accessible at `/laptops/123` and `/electronics/123`, Google will penalize you for duplicate content. Use canonical tags (`<link rel="canonical" href="..." />`) to declare the "master" URL.
- **DO optimize URL slugs.** Use human-readable URLs (`/listings/macbook-pro-m1`) instead of UUIDs (`/listings/a1b2c3d4-e5f6...`). Search engines parse URL keywords.
- **DON'T try to manipulate keyword density.** Writing "Buy laptops, cheap laptops, best laptops in New York" will trigger a Google spam penalty. Write for humans; let the dynamic data handle the keywords.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Next.js Dynamic Sitemap:**

````prompt
Act as an SEO Specialist. Write a Next.js App Router `sitemap.ts` file that dynamically generates an XML sitemap. It should connect to Prisma, fetch all `Categories` and the latest 10,000 active `Listings`, and map them to the correct XML format with `changeFrequency` and `priority` attributes based on the page type. Ensure the database query is optimized.
````

> [!TIP]
> **Prompt 2 — Programmatic SEO Metadata:**

````prompt
Write a Next.js `generateMetadata` function for a dynamic category page route (`/category/[categorySlug]/[locationSlug]`). It must fetch the category and location names, and generate an SEO-optimized `<title>`, `<meta name="description">`, and OpenGraph (`og:image`) tags targeting the long-tail keyword combination (e.g., "Find the best [Category] in [Location]").
````

---

## Validating What AI Generates

- **Check for Client-Side Rendering:** If AI gives you a React `useEffect` hook to dynamically set the `<title>` or inject JSON-LD, reject it. SEO tags must be generated on the server (`generateMetadata` in Next.js).
- **Verify sitemap sizing:** If AI generates a sitemap script that attempts to return 1,000,000 rows in a single XML file, it will crash your server and Google will reject it. Sitemaps must be paginated (Sitemap Indexes) if they exceed 50,000 URLs.

---

## Implementation Checklist

- [ ] Transitioned listing and search pages to Server-Side Rendering (SSR) or Static Generation (SSG) for instant indexing.
- [ ] Implemented a Programmatic SEO URL structure (`/category/[slug]/location/[slug]`) to capture long-tail search traffic.
- [ ] Injected accurate Schema.org `Product` JSON-LD into all listing pages to enable Rich Snippets in Google Search.
- [ ] Optimized Core Web Vitals by preloading above-the-fold images and reserving layout space to prevent Cumulative Layout Shift (CLS).
- [ ] Deployed dynamic, paginated XML sitemaps and connected them to Google Search Console.

---

## What's Next

Next: **Legal Documents** — We have covered the Privacy Policy and ToS, but operating a marketplace requires corporate structuring. We will discuss forming an LLC/C-Corp (Stripe Atlas), registering trademarks, and handling contractor agreements.
