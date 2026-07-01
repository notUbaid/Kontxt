---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Core Web Vitals & Edge Performance

**Estimated Time:** 60 Minutes

Google strictly penalizes e-commerce stores with poor "Core Web Vitals." If your Largest Contentful Paint (LCP) takes longer than 2.5 seconds, Google will bury your store on Page 5 of the search results, destroying your organic traffic.

A beginner ruins performance by:
1. Uploading massive 5MB raw images to their homepage.
2. Forcing the Next.js server to fetch data sequentially (Waterfall fetching).
3. Importing heavy NPM libraries (like `moment.js` or `lodash`) into Client Components, bloating the JavaScript bundle to 2MB.

In Phase 4, you must engineer strict **Image Optimization**, eliminate **Render Blocking JavaScript**, and implement **Dynamic Import Splitting**.

---

## 1. The Next/Image Optimization Engine

You must never use a standard HTML `<img>` tag in Next.js. 

If you render `<img src="/hero.jpg" />`, the browser downloads the raw 5MB file, even on a mobile phone with a 4G connection. 

**The Production Solution:**
You must use the `next/image` component. Next.js has a built-in image optimization server. When a mobile phone requests the image, Next.js intercepts it, converts the image to the ultra-efficient `WebP` or `AVIF` format, resizes it mathematically to fit the phone's screen, and serves a 30KB file instead.

```tsx
import Image from 'next/image';

export function HeroBanner() {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        src="https://cdn.shopify.com/s/files/hero.jpg"
        alt="Summer Sale Banner"
        fill
        priority // CRITICAL: Tells the browser to download this FIRST, fixing LCP.
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw" // Prevents the server from sending a 4K image to an iPhone
      />
    </div>
  );
}
```

**The `priority` Flag:** Any image that is "above the fold" (visible on the screen immediately when the page loads) MUST have the `priority` flag. Any image "below the fold" must NOT have it, so the browser lazy-loads it only when the user scrolls down.

## 2. Dynamic Import Splitting (Code Splitting)

If you have a massive, heavy component (like a complex 3D Product Viewer using Three.js, or a heavy Date Picker for scheduling delivery), and you `import` it normally at the top of the file, the user has to download that massive JavaScript library even if they never click the button to open it.

**The Production Solution:**
You must use `next/dynamic` to split the code. 

```tsx
'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// 1. The browser DOES NOT download this component until it is rendered.
const Heavy3DViewer = dynamic(() => import('@/components/Heavy3DViewer'), {
  loading: () => <p>Loading 3D Engine...</p>, // Fallback UI while downloading
  ssr: false, // Do not attempt to render Three.js on the Node server
});

export function ProductGallery() {
  const [show3D, setShow3D] = useState(false);

  return (
    <div>
      <img src="/static-shirt.jpg" alt="Shirt" />
      
      <button onClick={() => setShow3D(true)}>View in 3D</button>
      
      {/* 2. The 2MB library is fetched over the network ONLY when show3D is true */}
      {show3D && <Heavy3DViewer />}
    </div>
  );
}
```

This cuts your initial JavaScript payload by hundreds of kilobytes, drastically improving the Time to Interactive (TTI).

## 3. Bundle Analysis

You cannot optimize what you cannot measure. Before deploying to production, you must mathematically analyze your webpack bundle to see which NPM libraries are secretly destroying your performance.

**The Production Solution:**
You must configure `@next/bundle-analyzer`. When you run `npm run build`, it generates a visual heatmap of your JavaScript chunks. 

If you see `moment.js` taking up 300kb of space, you rip it out and replace it with the native browser `Intl.DateTimeFormat` API (which costs 0kb).

---

## ✅ Performance Engineering Checklist

- [ ] Ban HTML `<img>` tags. Mandate `next/image`.
- [ ] Enforce the `priority` flag on all Above-the-Fold images to fix Largest Contentful Paint (LCP) scores.
- [ ] Utilize `next/dynamic` to lazy-load massive client-side libraries (like 3D viewers or heavy modal forms) only when interacted with.
- [ ] Run `@next/bundle-analyzer` before launch to eliminate toxic NPM packages.
- [ ] Use the AI prompt below to generate the optimization architecture.

---

## AI Prompt — Engineer Core Web Vitals

Copy this prompt into your AI to have it optimize your application for a 100/100 Lighthouse score.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Performance Engineer. We must optimize our Core Web Vitals.

I need you to generate the following strict optimization implementations:

**1. The LCP-Optimized Hero Component:**
Write the `<HomepageHero />` component. 
- You MUST use `next/image`. 
- Explain exactly why the `priority` flag is required here to fix the Largest Contentful Paint (LCP).
- Write the exact `sizes` attribute string that tells the browser to fetch an 800px image for mobile devices, and a 1600px image for desktop devices, saving massive amounts of bandwidth.

**2. The Dynamic Code Splitter:**
Write a `<ProductReviewModal />` component. 
- Assume this modal contains a massive rich-text editor library (like TipTap or Draft.js). 
- Show how the parent `<ProductPage />` component uses `next/dynamic` to ensure the rich-text library is strictly omitted from the initial JavaScript bundle, and is only downloaded over the network when the user clicks the "Write a Review" button.

**3. Next.js Bundle Analyzer Config:**
Write the exact `next.config.js` wrapper code required to implement `@next/bundle-analyzer`, including the cross-env script needed in `package.json` (e.g., `ANALYZE=true npm run build`).
````

**Next: Monitoring Engineering →**
