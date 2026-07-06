---
title: SEO Setup
slug: seo-setup
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# SEO Setup

Good photos and descriptions only help once someone finds the page. This module is the technical and structural layer that makes your store discoverable — by search engines, and increasingly, by AI shopping assistants that read structured product data directly.

---

## Where This Fits

This is mostly configuration on top of pages and content you've already built — product pages, category pages, descriptions. You're not writing new content here; you're making the content you have legible to search engines.

---

## Why This Matters for a Store Specifically

A new store has zero accumulated search authority. Without correct technical SEO, you're invisible from day one, and the gap between "live" and "findable" can be the difference between zero organic traffic and a slow, real trickle of it.

> ** Tip:** SEO for a new personal store is mostly about not blocking discovery, not about competing for #1 rankings on competitive terms. Get the fundamentals correct and let time and content do the rest — don't expect immediate ranking wins.

---

## What You're Building Today

- Unique, accurate page titles and meta descriptions for every product and category page
- Structured data (schema.org Product markup) so search engines understand price, availability, and reviews directly
- A submitted, correct sitemap and confirmed indexing in Google Search Console
- Clean, descriptive URLs
- Image alt text already done in the Photography module, now confirmed it's actually rendering

You're **not** doing keyword research at an agency level, building backlink campaigns, or chasing competitive head terms. That's Phase 6 growth territory, once you have a baseline to optimize from.

---

## The Technical Checklist

| Element | What It Should Look Like | Why |
|---|---|---|
| Page title | `Navy Canvas Tote Bag — [Store Name]` | Unique per page, includes product name, not generic |
| Meta description | One sentence, specific, under ~155 characters | Shown in search results, drives click-through |
| URL | `/products/navy-canvas-tote` | Descriptive, not `/products/sku-48213` |
| Structured data | `Product` schema with price, availability, image | Lets Google show price/stock directly in results |
| Sitemap | Auto-generated, submitted to Search Console | Ensures pages are actually discovered and crawled |
| Canonical tags | Set correctly on variant/duplicate pages | Prevents near-duplicate pages from competing with each other |

> **️ Warning:** Auto-generated SKU-based URLs or default framework-generated titles ("Product - MyStore") are the most common technical SEO gap in beginner-built stores. If you haven't explicitly set page titles and URLs, check now — frameworks often default to something unhelpful.

---

## Structured Data: The Highest-Leverage Item Here

`Product` schema markup is what lets search engines (and AI assistants pulling shopping results) understand your price, availability, and ratings without guessing from page text. This is the single highest-leverage SEO item for a store specifically, more than general content SEO advice.

**Copy Prompt:**

```
Add schema.org Product structured data (JSON-LD) to my product pages,
built with [your framework].

Include: product name, description, image, price, currency, availability
(in stock / out of stock), and brand — pulled dynamically from the
actual product data, not hardcoded.

Show me how to verify this renders correctly using Google's Rich
Results Test, and confirm it updates automatically when a product's
price or stock status changes — it should never go stale relative to
what's shown on the page itself.
```

> **️ Warning:** Structured data must match what's actually displayed on the page. If your schema markup says a product is in stock while the page shows "Sold Out," that mismatch can get the page penalized or your rich results suppressed entirely — don't hardcode static schema values.

---

## Sitemap & Indexing

**Copy Prompt:**

```
Set up an automatically generated XML sitemap for my e-commerce store
built with [your framework], covering all product and category pages,
and excluding cart/checkout/account pages.

Then walk me through submitting it to Google Search Console and
confirming pages are actually being indexed, not just submitted.
```

> ** Tip:** Submitting a sitemap doesn't guarantee indexing — check Search Console's coverage report a few days later to confirm pages are actually indexed, not just crawled. New stores sometimes have pages crawled but excluded for thin-content or duplicate-content reasons worth catching early.

---

## Titles & Meta Descriptions

**Copy Prompt:**

```
Generate unique page titles and meta descriptions for these products:

[list product names + one key fact about each]

Title format: [Product Name] — [Store Name], under 60 characters.
Meta description: one specific, accurate sentence under 155 characters
that reflects something real about the product — not generic
boilerplate repeated across products.
```

---

## Common Mistakes

- Leaving framework-default page titles unset across the entire catalog
- Hardcoding "in stock" in structured data regardless of actual inventory, causing search engines to show stale availability
- Duplicate or near-duplicate content across product variant pages with no canonical tag set, splitting search relevance between them
- Submitting a sitemap once and never checking whether pages are actually getting indexed
- SKU-based or auto-generated URLs that give search engines and customers no information about the page's content

---

## Validation Checklist

- [ ] Spot-check 5 product pages — titles and meta descriptions are unique, specific, not framework defaults
- [ ] Run Google's Rich Results Test on a product page and confirm Product schema is detected and valid
- [ ] Change a product's stock status and confirm the structured data updates accordingly, not just the visible page text
- [ ] Sitemap is submitted in Search Console and shows as successfully processed
- [ ] Search Console's coverage report, checked a few days after launch, shows pages actually indexed, not excluded

---

## AI Review Prompt

```
Review the SEO setup for my e-commerce store. Check:

1. Are page titles and meta descriptions unique per product, or using
   a framework default/template with no real content?
2. Does Product structured data stay in sync with actual price/stock,
   or could it go stale?
3. Are URLs descriptive, or auto-generated SKU/ID based?
4. Is there any risk of duplicate content across variant or near-
   identical product pages without canonical tags?
```

---

## What Comes Next

Your store is discoverable. Next: **Analytics Setup** — measuring what happens once people actually arrive.
