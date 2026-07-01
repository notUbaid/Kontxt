---
title: Store Economics
slug: store-economics
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Engineering Store Economics

**Estimated Time:** 20 Minutes

In a production environment, engineering directly impacts unit economics. If your headless infrastructure is bloated and relies on heavy server compute for every request, your Server Cost per Order will destroy your margins. If your checkout requires too many API calls, latency will increase cart abandonment, severely inflating your Customer Acquisition Cost (CAC).

You must architect the system to algorithmically protect and expand the **Contribution Margin**.

## Engineering the Shipping Threshold

Do not hardcode shipping thresholds or rely on simple frontend banners. You must build middleware logic that dynamically calculates the distance to the free shipping threshold based on the user's localized currency and real-time cart state.

By engineering this calculation globally (accessible across the Cart Drawer, PDPs, and Checkout via state management like Zustand or Redux), you can dynamically inject prompts (e.g., "Add $12 more to unlock Free Next-Day Shipping!"). This reliable, instant feedback loop can increase the Average Order Value (AOV) by upwards of 15%, fundamentally altering the LTV:CAC ratio.

## The Infrastructure Cost Matrix

> [!IMPORTANT]
> Headless architectures are highly expensive if not engineered correctly. If you rely on Server-Side Rendering (SSR) for every page load instead of Incremental Static Regeneration (ISR), your Vercel, AWS Lambda, or Cloudflare compute costs will scale linearly with traffic.

You must calculate and minimize your exact infrastructure economics:

1. **Bandwidth Costs (Egress):** Media (images, videos, 3D models) constitutes 90% of your payload. Offload all heavy media to a dedicated, highly optimized CDN (Cloudflare, Fastly). Do not serve raw images through your application servers. Utilize Next.js Image Optimization or Cloudinary to serve modern formats (WebP/AVIF).
2. **Compute Costs:** Maximize Edge caching. Only hit serverless backend functions when mutating state (Add to Cart, Login, Checkout). Serving a cached PDP should cost virtually zero compute.
3. **Database Reads:** Utilize Redis or global edge configuration files for frequently accessed, non-mutating data (like global navigation menus, footer links, or generic store policies) to prevent expensive database read operations on every page load.

## Checklist:
- [ ] Implement global state logic to dynamically calculate and display "distance to free shipping" to maximize AOV.
- [ ] Verify that all heavy media assets are strictly routed through an optimized CDN to minimize expensive egress costs.
- [ ] Audit the rendering strategy to ensure maximum usage of ISR/Static caching, strictly minimizing expensive serverless compute cycles.
