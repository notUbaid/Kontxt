---
title: Pricing Strategy
slug: pricing-strategy
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Pricing Strategy

**Estimated Time:** 20 Minutes

Pricing at scale is rarely static. It involves regional localization, multi-currency conversion, dynamic tiering, and complex discount logic. Your architecture must handle this without degrading performance or introducing caching nightmares.

## The Caching Dilemma of Dynamic Pricing

If a product costs $100 in the US, £80 in the UK, and has a 10% discount for VIP users, you cannot statically cache the HTML.

You must utilize **Edge Middleware** and **Client-Side Hydration**:
1. **The Static Shell:** The core product page (images, description, layout) is statically cached (ISR) at the edge for blazing-fast TTFB (Time to First Byte).
2. **The Price Injection:** Edge Middleware intercepts the request, reads the user's IP (for region) and cookies (for VIP status), and either injects the correct pricing data into the HTML stream or defers to a highly optimized client-side fetch (SWR) to paint the specific price.

> [!WARNING]
> Never trust client-side pricing. The frontend can display any price it wants, but the final cart validation and checkout mutation must strictly re-calculate the price against the backend database using the atomic product ID and user session.

## Discount and Promotion Engines

Do not hardcode discount logic into the frontend. Promotions (BOGO, Tiered Discounts) create massive combinatorial explosions in logic. Rely on your Commerce Engine's robust Pricing API. When a user adds to cart, pass the cart state to the backend, allow the backend promotion rules engine to evaluate it, and return the final computed cart state.

## Checklist:
- [ ] Architect the Edge Middleware logic to handle regional IP detection for multi-currency display.
- [ ] Ensure the core PDP layout is statically cached while pricing is injected dynamically via Edge or SWR.
- [ ] Enforce strict backend validation for all cart calculations; absolutely zero pricing logic should live in the frontend.
