---
title: Products
slug: products
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Product Data Engineering & Enrichment

**Estimated Time:** 60 Minutes

In Phase 2, you architected the theory of the Parent-Variant relationship. Now, in Phase 3, you must write the code to securely query, enrich, and render this massive data structure without causing memory leaks or layout shifts.

If a beginner asks an AI to fetch a product, the AI will likely write a REST `fetch` call that downloads the entire product object—including all 50 variants, 100 images, and the entire HTML description—just to render a tiny thumbnail on the Homepage. This over-fetching destroys mobile bandwidth.

As an AI-Assisted Architect, you must engineer strict **GraphQL Data Minimization** and implement a headless **PIM (Product Information Management)** strategy for data enrichment.

---

## 1. GraphQL Data Minimization (The Fragment Pattern)

If you have a `<ProductCard />` component that appears on the Homepage, the Category Page, and the "Related Items" carousel, it needs the exact same data everywhere: `title`, `price`, and `thumbnail_url`.

If you write three different GraphQL queries for those three different pages, you will inevitably misspell a field, causing a fatal crash.

**The Production Solution:**
You must instruct your AI to engineer **GraphQL Fragments**. 

```graphql
# fragments/ProductCardFragment.graphql
fragment ProductCardData on Product {
  id
  title
  handle
  variants(first: 1) {
    edges {
      node {
        price {
          amount
          currencyCode
        }
      }
    }
  }
  images(first: 1) {
    edges {
      node {
        url
        altText
      }
    }
  }
}
```

Now, your Homepage query simply imports that fragment:

```graphql
query GetHomepageProducts {
  products(first: 10) {
    edges {
      node {
        ...ProductCardData
      }
    }
  }
}
```

This guarantees mathematical consistency across your entire application. By requesting exactly `first: 1` image, you guarantee you are downloading the absolute minimum amount of JSON bytes necessary, protecting the user's mobile data plan.

## 2. PIM Enrichment (Sanity CMS)

A standard Commerce Engine (Shopify) is great at math (inventory, prices). It is terrible at rich media content. If you want to add a beautiful, interactive "Materials & Sourcing" section to your product page, Shopify's tiny "Description" WYSIWYG editor cannot handle it.

**The Production Solution:**
You must implement a headless **PIM (Product Information Management) Architecture** using a CMS like Sanity.

1. The transaction data (Price, SKU, Inventory) lives in Shopify.
2. The rich media data (4K Videos, Material breakdowns, Author bios) lives in Sanity CMS.
3. The Next.js Server Component securely queries *both* APIs in parallel using `Promise.all()`.

```typescript
// app/product/[slug]/page.tsx
export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Fetch BOTH the transactional data and the rich media data in parallel
  const [shopifyData, sanityData] = await Promise.all([
    fetchShopifyProduct(params.slug),
    fetchSanityEnrichment(params.slug)
  ]);

  return (
    <div>
      {/* Transactional UI */}
      <h1>{shopifyData.title}</h1>
      <AddToCart price={shopifyData.price} />
      
      {/* Rich CMS UI */}
      <PortableText content={sanityData.richDescription} />
      <MaterialsBreakdown materials={sanityData.materials} />
    </div>
  );
}
```

This allows your marketing team to build gorgeous, Apple-style product pages in Sanity CMS, without ever risking accidental changes to the transactional price data in Shopify.

## 3. SEO Edge Rendering (Canonical URLs)

If a product belongs to two categories ("Men" and "Shoes"), Shopify might generate two URLs: `/collections/men/products/boot` and `/collections/shoes/products/boot`. 
If Google sees the exact same product on two different URLs, it flags your site for "Duplicate Content" and destroys your SEO ranking.

**The Production Solution:**
Your Next.js routing architecture must enforce a single, flat canonical URL structure: `/products/[slug]`. 
Instruct your AI to write the Next.js `generateMetadata` function to explicitly inject a `<link rel="canonical" href="https://yourdomain.com/products/boot" />` tag into the HTML `<head>`, mathematically proving to Google which URL is the true master copy.

---

## ✅ Product Data Engineering Checklist

- [ ] Enforce the use of GraphQL Fragments (`...ProductCardData`) to ensure data consistency and minimize over-fetching.
- [ ] Decouple rich media from transactional data by implementing a parallel fetch to a headless CMS (Sanity).
- [ ] Prevent SEO duplicate content penalties by enforcing flat URL structures and Canonical tags.
- [ ] Use the AI prompt below to generate the exact GraphQL and CMS integration code.

---

## AI Prompt — Engineer Product Data & Enrichment

Copy this prompt into your AI to have it generate the highly optimized, dual-source data fetching architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Data Architect. We are engineering the complex data fetching layer for our Product Detail Page (PDP).

We must fetch transactional data from Shopify (GraphQL) and rich media data from Sanity CMS, simultaneously.

I need you to generate the following engineering implementations:

**1. The GraphQL Data Minimization Fragment:**
Write the exact GraphQL query utilizing a reusable Fragment. Show how the fragment strictly limits the payload (e.g., `images(first: 1)`) for our `<ProductCard />` component to prevent massive JSON payloads from destroying mobile bandwidth.

**2. The Parallel Fetch Architecture:**
Write the Next.js Server Component (`page.tsx`). 
- Show how to execute a `Promise.all()` to fetch the Shopify GraphQL data AND the Sanity GROQ data concurrently.
- Explain how this parallel execution prevents "waterfall" delays, ensuring the server resolves both APIs in the time it takes the slowest one to finish.

**3. The SEO Canonical Injector:**
Write the Next.js `generateMetadata` function for this page. 
- It must dynamically read the `slug` and construct the exact `canonical` URL.
- Show how it outputs the final `Metadata` object to automatically inject the correct `<link rel="canonical">` and OpenGraph (`og:image`) tags into the HTML `<head>`.
````

**Next: Inventory Engineering →**
