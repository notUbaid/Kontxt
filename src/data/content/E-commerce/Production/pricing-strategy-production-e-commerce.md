---
title: Pricing Strategy
slug: pricing-strategy
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Algorithmic Pricing Strategy

**Estimated Time:** 20 Minutes

Pricing at an enterprise scale is rarely static. It involves regional localization, multi-currency conversion, dynamic tiering (B2B vs B2C), and complex discount logic. Your architecture must handle these extreme variables without degrading performance or introducing caching nightmares.

## The Caching Dilemma of Dynamic Pricing

If a product costs $100 in the US, £80 in the UK, and has a 10% discount for authenticated VIP users, you cannot simply statically cache the HTML. If you do, the UK user will see the US price until the page reloads.

To solve this, you must utilize **Edge Middleware** combined with **Client-Side Hydration**:

1. **The Static Shell:** The core product page (images, description, layout, reviews) is statically cached (ISR) at the edge for blazing-fast TTFB (Time to First Byte).
2. **The Price Injection:** Edge Middleware intercepts the request, reads the user's IP (for geographic region) and secure cookies (for VIP/Authentication status). It can then either inject the correct pricing data into the HTML stream before it reaches the browser, or defer to a highly optimized client-side fetch (SWR - Stale-While-Revalidate) to paint the specific price immediately after the static shell loads.

> [!WARNING]
> Never trust client-side pricing. The frontend can display any price it wants (and malicious users can alter the DOM), but the final cart validation and checkout mutation must strictly re-calculate the price against the backend database using the atomic product ID and secure user session.

## Discount and Promotion Engines

Do not hardcode discount logic into the frontend UI. Promotions (BOGO, Tiered Discounts, "Buy X Get Y Free") create massive combinatorial explosions in logic. 

Rely entirely on your Commerce Engine's robust Pricing/Promotions API. When a user adds an item to their cart, pass the cart state to the backend, allow the backend promotion rules engine to evaluate it, and return the final computed cart state. The frontend should only be a dumb terminal that renders the final math provided by the backend.

## Checklist:
- [ ] Architect the Edge Middleware logic to handle regional IP detection for multi-currency display without blocking the main thread.
- [ ] Ensure the core PDP layout is statically cached while pricing is injected dynamically via Edge Middleware or SWR.
- [ ] Enforce strict backend validation for all cart calculations; absolutely zero pricing or discount logic should execute natively in the frontend.
