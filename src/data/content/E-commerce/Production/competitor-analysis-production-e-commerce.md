---
title: Competitor Analysis
slug: competitor-analysis
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Competitor Analysis

In production e-commerce, Competitor Analysis is a technical and financial teardown, not a subjective review of their logo and brand colors. 

You must reverse-engineer your competitors' tech stacks, supply chains, and acquisition funnels to uncover their vulnerabilities and mathematically define how you will out-compete them.

---

## 1. Technical Reverse Engineering

You can discover exactly what software powers a competitor's business by inspecting their network traffic and source code.

**The Implementation:**
1. **The Tech Stack:** Use tools like Wappalyzer or BuiltWith. Are they on a monolithic Shopify build? If so, you have a massive advantage if you build a Headless Next.js architecture (faster LCP, better SEO).
2. **The JavaScript Payload:** Open Chrome DevTools -> Network Tab. Look at their third-party scripts. Are they using Klaviyo for email? Yotpo for reviews? Algolia for search? This tells you exactly what enterprise features they deemed critical enough to pay for.
3. **The Webhooks:** If you add an item to their cart, look at the XHR requests. Are they querying an external API for real-time inventory, or is it hardcoded? This reveals the sophistication of their supply chain.

---

## 2. The Acquisition Funnel Teardown

To compete, you must know exactly how they are acquiring customers and how much they are willing to spend.

**The Implementation:**
1. **Ad Transparency:** Use the Meta Ads Library. Search for their brand. If they have 50 active ads running, they are scaling aggressively. If they have 0 active ads, their business is relying purely on organic search or email.
2. **The Landing Page:** Click their active ads. Where do they send traffic? If they send traffic to the homepage, they are amateurs. If they send traffic to highly optimized, single-product landing pages (Advertorials), they are a production-grade operation.
3. **SEO Footprint:** Use tools like Ahrefs or Semrush. Which organic keywords are driving 80% of their traffic? If their Domain Authority is 90, do not try to outrank them on day one. Find the "Long Tail" keywords they ignored.

---

## 3. The Supply Chain and Margin Teardown

If a competitor is selling a product for $40, you must estimate their gross margin to determine if you can survive in a price war.

**The Implementation:**
1. **The Origin:** Are they manufacturing in China or the US? Check their shipping times. If shipping takes 14 days, they are likely dropshipping directly from Asia (low overhead, terrible customer experience). If shipping is 2 days, they are using a domestic 3PL (high overhead, excellent customer experience).
2. **The AOV Hacks:** Go through their checkout flow. Do they offer Free Shipping at $75? Do they have a Post-Purchase One-Click Upsell? If they are aggressively cross-selling, it means their base CAC is high, and they *must* increase AOV to survive.

---

## AI Prompt — Execute the Technical Teardown

```prompt
I am executing a technical and financial competitor analysis for a production e-commerce brand.

Business Context:
- Primary Competitor URL: [e.g., https://competitor.com]
- Our Niche: [e.g., Premium Athletic Wear]

Act as a Principal Growth Engineer:
1. Walk me through the exact Chrome DevTools process to identify if this competitor is using a monolithic commerce platform or a headless architecture, and how to identify their primary analytics and marketing APIs.
2. Based on their Meta Ads Library footprint, how can I reverse-engineer their highest-converting ad creatives and the specific landing page architecture they use to convert that traffic?
3. Detail the methodology for estimating a competitor's gross margin by analyzing their pricing, shipping thresholds, and aggressive upselling tactics.
```

---

## Competitor Analysis Checklist

- [ ] Competitor tech stacks reverse-engineered via Wappalyzer/DevTools (identifying Headless vs Monolith and third-party APIs)
- [ ] Acquisition funnels analyzed via Meta Ads Library and SEO tools (Ahrefs/Semrush)
- [ ] Supply chain speed and logistics origin estimated by auditing their shipping policies and delivery times
- [ ] Average Order Value (AOV) mechanics documented (identifying Free Shipping thresholds and Post-Purchase Upsell flows)
