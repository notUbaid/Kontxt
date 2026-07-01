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

Pricing in a production environment is rarely static. You will likely need regional localization (showing Euros in Germany and Dollars in the US), multi-currency conversions, or VIP discount logic.

When a beginner encounters dynamic pricing, they usually tell their AI to fetch the price directly from the database every single time the page loads. 
This is a fatal error. It destroys edge caching, drastically slows down the site, and inflates server costs. 

As an AI-Assisted Architect, you must guide your AI to handle complex pricing variables without ruining the speed of the statically cached HTML.

---

## 1. The Caching Dilemma of Dynamic Pricing

If a product costs $100 in the US and £80 in the UK, you cannot simply statically cache the HTML page as "$100". If you do, a user in the UK will see the US price until the page finishes loading and corrects itself (which causes a jarring layout shift).

**The Production Solution:**
You must utilize **Edge Middleware**. 

1. **The Static Shell:** Instruct your AI to statically cache the core product page (images, description, layout, reviews) using ISR for blazing-fast load times.
2. **The Price Injection:** Instruct your AI to write Edge Middleware (a tiny function that runs on the CDN before the page even reaches the user). The Middleware intercepts the request, reads the user's IP address (to detect their geographic region), and seamlessly injects the correct localized pricing data into the HTML stream instantly.

## 2. Discount and Promotion Engines

Do not let your AI hardcode discount logic into the frontend React code (e.g., `if (cartTotal > 100) applyDiscount()`). 

If you put the math on the frontend, malicious users can open Chrome DevTools, change the JavaScript, and give themselves a 99% discount. 

**The Production Solution:**
Rely entirely on your Commerce Backend's Promotion API. 
When a user adds an item to their cart, the frontend sends the payload to the backend. The backend evaluates all discount rules, calculates the final price securely, and returns the final math to the frontend. The frontend must act as a "dumb terminal" that only displays what the backend tells it to.

---

## ✅ Pricing Strategy Checklist

- [ ] Commit to using Edge Middleware for IP detection and currency injection to protect your static caching layer.
- [ ] Enforce strict backend validation for all cart calculations; never allow the AI to write discount logic directly in the React frontend.
- [ ] Use the AI prompt below to generate the highly complex Edge Middleware routing.

---

## AI Prompt — Architect Edge Middleware Pricing

Copy this prompt into your AI to have it generate the complex Edge routing required for fast, localized pricing.

````prompt
I am building a Headless E-commerce store using Next.js (App Router). I need you to act as my Principal Architect. We must solve the dynamic pricing caching dilemma.

We need to serve statically cached Product Detail Pages (PDPs) for maximum speed, but we must display localized currency (e.g., USD for the US, EUR for Germany) based on the user's IP address without causing layout shifts.

**Generate the `middleware.ts` architecture:**
Write the Next.js Edge Middleware function that intercepts incoming requests to product pages. 
1. It must read the `x-vercel-ip-country` header (or standard geolocation headers).
2. It must determine the correct currency code.
3. Explain exactly how the Middleware should pass this currency code to the statically generated page (e.g., via URL rewrites, cookies, or headers) so the React component knows which price variant to render instantly without breaking the ISR cache.

Output the code and a strict rule prohibiting frontend-only discount calculations.
````

**Next: MVP Scope →**
