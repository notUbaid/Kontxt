---
title: SEO Setup
slug: seo-setup
phase: Phase 5 Store Launch
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Technical SEO & Schema Architecture

**Estimated Time:** 60 Minutes

A beginner believes SEO is just about putting the keyword "Blue T-Shirt" in the title of their page and hoping Google ranks them #1.

When Google's crawler visits a beginner's Next.js Single Page Application, it often sees a blank white screen because the JavaScript hasn't loaded yet. Or, it sees a disorganized jumble of `<div>` tags. Google doesn't know if the page is a blog post, a contact form, or a product.

In a production environment, you must engineer **Semantic HTML Architecture**, **Dynamic XML Sitemaps**, and inject mathematical **JSON-LD Schema Markup** directly into the `<head>` of your document.

---

## 1. JSON-LD Product Schema (The Mathematical SEO)

You must explicitly tell Google what your page is. JSON-LD (JavaScript Object Notation for Linked Data) is the industry standard for this.

When you inject a Product Schema, Google reads it and instantly understands the price, the exact stock level, and the aggregate review score. This allows Google to generate **Rich Snippets** (the shiny product cards with gold stars) directly in the search results.

**The Production Solution:**
You must generate this script dynamically on the server in your Next.js Product Page.

```tsx
// app/product/[slug]/page.tsx
import { Product } from '@/types';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  // 1. The Mathematical Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images[0].url,
    description: product.seoDescription,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Your Awesome Store'
    },
    offers: {
      '@type': 'Offer',
      url: `https://yourstore.com/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      // CRITICAL: Tells Google if they should show "In Stock" in search results
      availability: product.inventoryCount > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock', 
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount,
    }
  };

  return (
    <section>
      {/* 2. Injecting the Schema into the DOM invisibly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 3. The actual visual UI */}
      <h1>{product.name}</h1>
      {/* ... */}
    </section>
  );
}
```

## 2. Dynamic XML Sitemaps

If you have 10,000 products, Google's bot might only discover 500 of them by clicking random links on your homepage. 

**The Production Solution:**
You must build a dynamic XML sitemap that updates instantly every time you add a new product to your database. Next.js App Router makes this mathematically precise with the `sitemap.ts` file.

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true }
  });

  const productUrls = products.map((product) => ({
    url: `https://yourstore.com/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8, // Tells Google products are very important
  }));

  return [
    {
      url: 'https://yourstore.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // Homepage is the most important
    },
    ...productUrls,
  ];
}
```

Every time Google hits `https://yourstore.com/sitemap.xml`, Next.js executes this SQL query and returns a perfectly formatted XML map of your entire database.

## 3. Canonical URLs (Duplicate Content Defense)

If a user navigates to `yourstore.com/product/shirt` and another navigates to `yourstore.com/product/shirt?color=red&ref=twitter`, Google sees two different URLs with the exact same content. 

Google will penalize your site for "Duplicate Content."

**The Production Solution:**
You must inject a **Canonical URL** tag in your Next.js metadata. This tells Google: *"Ignore the ?color=red tracking parameters. The true, mathematical URL of this page is exactly `/product/shirt`."*

```typescript
// Inside generateMetadata()
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://yourstore.com/product/${params.slug}`,
    },
  };
}
```

---

## ✅ SEO Engineering Checklist

- [ ] Inject dynamic JSON-LD `Product` and `Offer` schema into every Product Detail Page (PDP) to unlock Rich Snippets in Google Search.
- [ ] Implement a dynamic `sitemap.ts` file that queries the database to map 100% of your product catalog for search engine crawlers.
- [ ] Enforce strict Canonical URLs via `generateMetadata` to mathematically immunize your store against duplicate content penalties caused by query parameters.
- [ ] Use the AI prompt below to generate the rigorous SEO architecture.

---

## AI Prompt — Engineer Technical SEO

Copy this prompt into your AI to have it generate the mathematical SEO architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal SEO Engineer. We are engineering our Technical SEO and Metadata layer.

I need you to generate the following strict architectural implementations:

**1. The JSON-LD Product Schema Injector:**
Write the `<ProductPage />` Server Component.
- Show how to construct the `@type: 'Product'` JSON object.
- It MUST include `offers` (price, currency, availability) and `aggregateRating` (if reviews exist).
- Show exactly how to inject this into the DOM using a `<script type="application/ld+json">` tag with `dangerouslySetInnerHTML`.

**2. The Dynamic Database Sitemap:**
Write the `app/sitemap.ts` file. 
- Show how it uses Prisma to query all `Products` and `Categories`.
- Show how it constructs the `MetadataRoute.Sitemap` array, defining strict `priority` weights (e.g., Homepage = 1.0, Categories = 0.9, Products = 0.8) to instruct Google's crawler correctly.

**3. The Canonical Metadata Generator:**
Write a robust `generateMetadata` function. 
- Explain why we must hardcode the `alternates.canonical` string using the base URL + the `slug` parameter to mathematically strip out utm_tags or query strings before Google parses the page.
````

**Next: Analytics Setup Engineering →**
