---
title: Target Audience
slug: target-audience
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Target Audience

**Estimated Time:** 20 Minutes

In mass-production e-commerce, "Target Audience" is not a marketing exercise involving fictional personas. It is a strict engineering requirement that dictates how your data pipelines, caching strategies, and identity resolution layers are architected.

Your audience defines the payload. If you are targeting mobile-first Gen Z users via TikTok ads, your critical rendering path must be sub-200ms on 3G connections. If you are targeting enterprise B2B procurement officers, your authentication and complex pricing matrix queries must be highly secure and cached effectively.

## Identity Resolution and Zero-Party Data

Relying on third-party cookies is a severe architectural flaw. You must design pipelines to capture, store, and utilize first-party and zero-party data.

> [!IMPORTANT]
> Your Customer Data Platform (CDP) like Segment or mParticle must be integrated at the API level, not just as a client-side tag. This ensures that even if ad-blockers strip tracking scripts, server-side events (purchases, cart additions) are routed to your ad networks (via Meta CAPI, Google Server-Side GTM).

## Localization & Edge Routing

Understanding where your audience lives dictates your edge infrastructure:
- **CDN Strategies:** If your audience is global, your assets and Next.js middleware must sit on global edge networks (Vercel Edge, Cloudflare Workers).
- **Currency & Taxation:** IP-based geolocation must dictate the initial currency and regional tax logic without requiring a client-side round trip. This requires Edge Middleware to inject region headers before the application boots.

## Checklist:
- [ ] Define the geographical distribution of your audience to finalize CDN and Edge worker placement.
- [ ] Architect the server-side tracking pipeline (CAPI) to bypass client-side tracking limitations.
- [ ] Establish the performance budget (Lighthouse score limits) based on the lowest-common-denominator device your audience uses.
