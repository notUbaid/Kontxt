---
title: SEO Setup
slug: seo-setup
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# SEO Setup

In e-commerce, SEO is not about writing blog posts. It is a technical engineering discipline. 

If Google cannot crawl your 50,000 product pages, or if you create infinite spider traps via your filtering faceted navigation, your organic traffic will flatline. At production scale, Technical SEO is the foundation of customer acquisition.

---

## 1. Dynamic Sitemaps (Scale Problem)

A static `sitemap.xml` file is useless when your inventory changes daily.

**The Implementation:**
Your backend must dynamically generate the sitemap. 
- If you have over 50,000 URLs (the Google limit for a single sitemap), you must implement a **Sitemap Index**.
- `sitemap-index.xml` links to `sitemap-products-1.xml`, `sitemap-products-2.xml`, and `sitemap-categories.xml`.
- **Performance:** Do not query Postgres to generate the sitemap on every bot request. Generate the XML files during the nightly CI/CD build, or cache the dynamically generated route heavily at the Edge.

---

## 2. Faceted Navigation (Spider Traps)

This is the #1 SEO killer for custom e-commerce stores. 

If you have a category page for "Shirts", and users can filter by Color (10), Size (5), and Brand (20), you just created 1,000 unique URLs (e.g., `/shirts?color=red&size=m&brand=nike`). If Google crawls all combinations, it wastes your "Crawl Budget," and Google will stop indexing your actual product pages.

**The Implementation:**
1. **Canonical Tags:** Ensure every filtered URL has a `<link rel="canonical" href="/shirts" />` pointing back to the root category. This tells Google to ignore the filter variations.
2. **Robots.txt:** Explicitly block query parameters that do not add SEO value.
   ```text
   User-agent: *
   Disallow: /*?sort_by=*
   Disallow: /*?price_min=*
   ```

---

## 3. Structured Data (JSON-LD)

Getting on page 1 of Google is good. Getting the "Rich Snippet" (showing the price, rating, and green "In Stock" badge directly in the search results) increases Click-Through Rate (CTR) by 30%.

**The Implementation:**
You must dynamically inject `Product` schema into the `<head>` of every Product Detail Page.
- The schema MUST update when the price changes. If your schema says $50, but the page says $60, Google will penalize you for mismatched data.
- Ensure you include the `AggregateRating` schema if you have a reviews integration (like Yotpo or Okendo).

---

## 4. Internationalization (hreflang)

If you sell in the US, UK, and Canada, you likely have three URLs for the same product (e.g., `/en-us/shirt`, `/en-uk/shirt`, `/en-ca/shirt`).

Without intervention, Google views this as duplicate content and penalizes all three.

**The Implementation:**
Inject `hreflang` tags to explicitly define the geographic targeting.
```html
<link rel="alternate" hreflang="en-US" href="https://store.com/en-us/shirt" />
<link rel="alternate" hreflang="en-GB" href="https://store.com/en-uk/shirt" />
<link rel="alternate" hreflang="x-default" href="https://store.com/en-us/shirt" />
```

---

## AI Prompt — Architect Your Technical SEO

```prompt
I am implementing the Technical SEO architecture for a production e-commerce store with 100,000 SKUs.

Tech Stack:
- Framework: [e.g., Next.js App Router]
- Database: [e.g., Postgres]

Act as a Principal SEO Engineer:
1. Write the Next.js `route.ts` code required to dynamically generate a Sitemap Index and paginate through 100,000 product URLs efficiently.
2. Provide a strict `robots.txt` configuration that prevents Googlebot from falling into an infinite spider trap caused by faceted URL filtering (e.g., blocking `?color=` and `?size=`).
3. Generate the exact JSON-LD `Product` schema snippet required to earn Google Rich Results, including nested `Offer` and `AggregateRating` structures.
4. Explain how to implement `hreflang` tags correctly across a Next.js application that supports US, UK, and Canadian markets to prevent duplicate content penalties.
```

---

## SEO Setup Checklist

- [ ] Dynamic Sitemap Index implemented to handle large catalogs (>50,000 URLs) without timing out
- [ ] Canonical tags strictly implemented on all faceted navigation (filter) URLs to consolidate page authority
- [ ] `robots.txt` configured to block crawl-wasting parameters (e.g., sorting, pricing filters)
- [ ] JSON-LD `Product` and `AggregateRating` schemas dynamically injected into every PDP
- [ ] `hreflang` tags implemented (if operating internationally) to resolve duplicate content issues
- [ ] Meta Title and Description generation automated to include dynamic variables (e.g., "Buy [Product Name] for $[Price]")
