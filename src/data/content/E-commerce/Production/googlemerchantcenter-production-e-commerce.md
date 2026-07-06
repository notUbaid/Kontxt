---
title: Google Merchant Center
slug: google-merchant-center
phase: Phase 5 Store Launch
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Product Feed Engineering (Merchant Center)

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

A beginner launches their store and runs a text-based Google Search ad. It costs them $2.50 per click, and their conversion rate is terrible because the customer didn't know what the product looked like before clicking.

In a production environment, you must dominate **Google Shopping**. To appear in the visual product carousel at the top of Google, you must engineer a mathematical **XML Product Feed** and automatically sync it with **Google Merchant Center**.

---

## 1. The Dynamic XML Feed API

Google Merchant Center requires an XML file containing your entire product catalog. 
If you generate this file manually and a product goes out of stock, the XML file will still say it is in stock. Google will continue showing the ad, you will pay $2 for a click, the customer will arrive at an "Out of Stock" page, and you lose money.

**The Production Solution:**
You must engineer a Next.js Server Route that dynamically queries your PostgreSQL database and generates the XML feed in real-time.

```typescript
// app/api/feed/google/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: 'PUBLISHED' }
  });

  // 1. Construct the Google RSS 2.0 XML Schema
  let xml = `<?xml version="1.0"?>
  <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
      <title>Your Awesome Store</title>
      <link>https://yourstore.com</link>
      <description>Our Product Catalog</description>`;

  products.forEach(p => {
    // 2. Strict Mathematical Mapping
    xml += `
      <item>
        <g:id>${p.id}</g:id>
        <g:title><![CDATA[${p.name}]]></g:title>
        <g:description><![CDATA[${p.seoDescription}]]></g:description>
        <g:link>https://yourstore.com/product/${p.slug}</g:link>
        <g:image_link>${p.mainImage}</g:image_link>
        <g:condition>new</g:condition>
        <g:availability>${p.inventoryCount > 0 ? 'in_stock' : 'out_of_stock'}</g:availability>
        <g:price>${p.price} USD</g:price>
        <g:brand>Your Brand</g:brand>
        <g:gtin>${p.barcode || ''}</g:gtin>
      </item>
    `;
  });

  xml += `</channel></rss>`;

  // 3. Serve as an XML Document, not HTML
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

In Google Merchant Center, you simply provide the URL: `https://yourstore.com/api/feed/google`. You set Google to fetch it every night at 3:00 AM. If a product sells out, the feed mathematically reflects it, and Google automatically pauses your ad spending for that item.

## 2. GTIN / Barcode Mandates

If you try to submit a product to Google Shopping without a `g:gtin` (Global Trade Item Number, i.e., a UPC barcode), Google will severely penalize your product's ranking, or outright reject it.

**The Production Solution:**
If you manufacture your own products, you must legally purchase GS1 Barcodes. 
If you are selling custom, handcrafted goods, you must explicitly inject the mathematical identifier `<g:identifier_exists>no</g:identifier_exists>` into your XML feed, otherwise Google's algorithm will suspend your account for missing data.

## 3. The Content API for Real-Time Sync

Fetching an XML file once a day is acceptable for beginners. But what if you have a massive Black Friday sale, and you sell out of a product at 9:00 AM? You will waste 18 hours of Google Ad spend until the 3:00 AM sync.

**The Production Solution:**
For enterprise scale, you must bypass the XML feed and use the **Google Merchant Center Content API**. 

When a customer buys the last item in your store, your Event Bus (Inngest) intercepts the `inventory.depleted` event and executes an immediate `PATCH` request directly to Google's servers, changing the availability to `out_of_stock` in milliseconds.

---

##  Merchant Center Engineering Checklist

- [ ] Engineer a dynamic `/api/feed/google` Next.js route to generate a real-time RSS 2.0 XML product feed.
- [ ] Enforce strict mapping of required fields: `id`, `title`, `description`, `link`, `image_link`, `price`, `availability`.
- [ ] Mathematically protect Ad spend by instantly mapping `inventoryCount <= 0` to `<g:availability>out_of_stock</g:availability>`.
- [ ] Use the AI prompt below to generate the rigorous feed architecture.

---

## AI Prompt — Engineer the Product Feed

Copy this prompt into your AI to have it generate the mathematical feed engine.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Growth Engineer. We are engineering our Google Merchant Center Product Feed.

I need you to generate the following strict XML implementations:

**1. The Next.js XML Feed Generator:**
Write the Next.js Route Handler (`/api/feed/google/route.ts`).
- Assume we fetch an array of products from Prisma.
- Construct a mathematically perfect RSS 2.0 XML string adhering strictly to the Google Merchant Center specification (`xmlns:g="http://base.google.com/ns/1.0"`).
- Show exactly how to use `<![CDATA[...]]>` tags around the `title` and `description` to prevent HTML characters or ampersands (&) from crashing the XML parser.
- Show the logic to output `<g:identifier_exists>no</g:identifier_exists>` if the product's `barcode` field is null in the database.

**2. The Inngest Content API Worker:**
Write a mock background worker that listens for an `inventory.zero` event. Explain the logic of how we would use the Google Node.js SDK to execute an emergency `PATCH` request to the Merchant Center Content API to instantly delist the product, saving us from wasted ad clicks.
````

**Next: Shipping Operations Setup →**
