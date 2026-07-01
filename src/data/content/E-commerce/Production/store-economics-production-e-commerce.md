---
title: Store Economics
slug: store-economics
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Store Economics

**Estimated Time:** 20 Minutes

In production, engineering directly impacts unit economics. If your infrastructure is bloated, your Server Cost per Order destroys your margins. If your checkout requires too many API calls, your latency increases cart abandonment, increasing your Customer Acquisition Cost (CAC).

You must architect the system to algorithmically protect and expand the Contribution Margin.

## Engineering the Shipping Threshold

Do not hardcode shipping thresholds. You must build middleware logic that dynamically calculates the distance to the free shipping threshold and injects it into the global state (e.g., "You are $12 away from Free Shipping!"). 

By engineering this correctly across the Cart Drawer and PDPs, you can reliably increase the Average Order Value (AOV) by 15%, fundamentally altering the LTV:CAC ratio.

## The Infrastructure Cost Matrix

> [!IMPORTANT]
> Headless architectures are expensive if not engineered correctly. If you rely on Server-Side Rendering (SSR) for every page load instead of Incremental Static Regeneration (ISR), your Vercel or AWS Lambda compute costs will scale linearly with traffic. 

You must calculate your exact infrastructure economics:
- **Bandwidth Costs:** Offload all heavy media to a dedicated CDN (Cloudflare) with aggressive caching. Do not serve raw images through your application servers.
- **Compute Costs:** Maximize Edge caching. Only hit serverless functions when mutating state (Add to Cart, Checkout).
- **Database Reads:** Utilize Redis or global edge configuration for frequently accessed, non-mutating data (like navigation menus or footer links) to prevent expensive database reads.

## Checklist:
- [ ] Implement global state logic to dynamically calculate and display "distance to free shipping" to maximize AOV.
- [ ] Verify that all heavy media assets are strictly routed through an optimized CDN to minimize egress costs.
- [ ] Audit the rendering strategy to ensure maximum usage of ISR/Static caching, minimizing expensive serverless compute cycles.
