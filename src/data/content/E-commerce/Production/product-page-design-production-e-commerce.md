---
title: Product Page Design
slug: product-page-design
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Product Detail Page (PDP) Architecture

**Estimated Time:** 25 Minutes

Beginners design a Product Detail Page (PDP) by arranging a big image, a title, a price, and a "Buy" button. 

In a mass-production headless environment, the PDP is the most dangerous page on the site. It is a highly volatile mix of **Static Content** (the description, which rarely changes) and **Dynamic State** (the inventory, the selected variant, the localized price, which change constantly).

If you instruct your AI to render the entire page dynamically on the server on every request (SSR), your site will crash under Black Friday traffic. 
As an AI-Assisted Architect, you must instruct your AI to engineer a **Hybrid Rendering Strategy** that perfectly isolates dynamic state from static HTML.

---

## 1. The Hybrid Rendering Mandate (ISR + SWR)

The core shell of the PDP (the layout, the title, the main product description) must be statically generated using Next.js **ISR (Incremental Static Regeneration)**. 
- When a user clicks a product on Google, Vercel serves the pre-built HTML from the Edge in 50 milliseconds.

However, if you statically cache the *inventory* or the *price*, a user might see "In Stock" when the item sold out 5 seconds ago.

**The Production Solution:**
You must force the AI to use **Client-Side Hydration (SWR/React Query)** for volatile data.
1. The static HTML loads instantly, displaying a Skeleton Loader where the price and inventory should be.
2. The browser silently pings your Commerce API in the background.
3. The real-time price and inventory count replaces the skeleton instantly.

This achieves a 0ms Time to First Byte (TTFB) while guaranteeing mathematically perfect inventory accuracy.

## 2. Managing Variant State Topography

When a user selects "Size Large" and "Color Blue", the browser must recalculate the price, swap the image, and verify the inventory for that specific SKU.

If you let your AI store the selected variant solely in React local state (`useState`), you break the internet. If the user copies the URL and sends it to their friend, the friend will open the link and see the default "Size Small, Red" variant.

**The Production Solution:**
You must mandate that the AI pushes all variant state to the **URL Parameters**.
- When the user clicks "Large", the URL instantly changes to `?size=L&color=blue` (using shallow routing to prevent a page reload).
- The React component listens to the URL to determine which image to show. 
- This makes the exact variant state perfectly shareable and book-markable.

## 3. SEO and Rich Snippets (Schema.org)

If your PDP does not inject valid `Product` schema into the `<head>`, Google will not display your product's price, rating, or stock status directly in the search results (Rich Snippets).

You must explicitly command your AI to write the Next.js `generateMetadata` function to automatically construct `application/ld+json` structured data for every product.

---

## ✅ Product Page Architecture Checklist

- [ ] Enforce the Hybrid Rendering Strategy: Statically generate the shell, dynamically fetch the volatile data (inventory/price).
- [ ] Forbid local state for variant selection; mandate URL Parameter state tracking.
- [ ] Ensure valid Schema.org structured data is generated for every PDP to capture Google Rich Snippets.
- [ ] Use the AI prompt below to generate the exact PDP React architecture.

---

## AI Prompt — Architect the Hybrid PDP

Copy this prompt into your AI to have it generate the highly complex, fault-tolerant rendering strategy for your Product Detail Page.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Architect. We are designing the architectural blueprint for the Product Detail Page (PDP).

Do NOT write a monolithic Server-Side Rendered (SSR) page. We must use a Hybrid Rendering Strategy (ISR + Client Fetching).

**Generate the following architectural implementations:**

1. **The Static Shell (`page.tsx`):**
Write the Next.js Server Component that fetches the static product data (title, description) from our CMS/PIM and uses `generateStaticParams` to build the pages at the Edge. Include the `generateMetadata` function that injects valid `Product` Schema.org `application/ld+json` for Google Rich Snippets.

2. **The Volatile Data Boundary (`<DynamicPriceInventory />`):**
Write the Client Component that sits inside the static shell. It must use SWR (or React Query) to fetch the real-time inventory and localized pricing from our Commerce API (e.g., Shopify) on the client side. Include the Skeleton Loader fallback.

3. **URL-Driven Variant Selection (`<VariantSelector />`):**
Write the Client Component for selecting sizes/colors. You MUST use Next.js `useRouter` and `useSearchParams` (or `nuqs`) to push the selected variant to the URL parameters (e.g., `?size=L`) using shallow routing. The component must derive its active state from the URL, not from `useState`.
````

**Next: Checkout Flow →**
