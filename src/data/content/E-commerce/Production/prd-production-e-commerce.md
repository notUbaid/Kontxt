---
title: PRD
slug: prd
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 25-35 min
---

# The Engineering PRD (Product Requirements Document)

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 30 Minutes

For beginners, a PRD (Product Requirements Document) is usually a bloated Google Doc filled with vague wishes like, *"Make the checkout fast"* or *"It should look modern."*

When you are building a mass-production headless storefront, a vague PRD is a catastrophic liability. If you feed vague wishes into your AI (like Claude or Antigravity), it will write bad, unoptimized code. 

As an AI-Assisted Architect, your PRD must evolve into a strict **Engineering Contract**. It must explicitly define API boundaries, performance limits, and exactly how the UI behaves when the system inevitably crashes under Black Friday traffic.

---

## 1. Defining the Hard Constraints

Before your AI writes a single line of React code or spins up a database, you must feed it the immutable technical constraints. 

If these are not defined, the AI will invent its own logic, and your server costs will skyrocket.

| Constraint | The Production Rule | Why We Enforce It |
|---|---|---|
| **Performance Limit** | P95 LCP under 1.5 seconds | Any new feature that slows the site down beyond 1.5 seconds will be immediately deleted. Speed is more important than features. |
| **Rendering Rule** | ISR (Incremental Static Regeneration) | We forbid the AI from using heavy SSR (Server-Side Rendering) for catalog pages to prevent massive Vercel/AWS bills. |
| **Accessibility** | WCAG 2.1 AA Compliant | The AI must write semantic HTML. If a user cannot navigate the checkout with a keyboard, the PR is rejected. |

## 2. The Source of Truth Matrix

Headless e-commerce means your data is scattered across multiple systems. If your AI gets confused about where to fetch the price of a t-shirt, it might query the wrong API, resulting in a customer paying the wrong amount.

You must explicitly define the **Source of Truth** for the AI:
- **Product Metadata (Titles, Images, Descriptions):** Owned by the PIM/CMS (e.g., Sanity).
- **Search & Filtering:** Owned by the NoSQL Search Index (e.g., Algolia). The Next.js frontend NEVER queries the main database for category lists.
- **Transactional State (Inventory, Final Price):** Owned strictly by the Commerce Backend (e.g., Shopify/Swell). 

## 3. Graceful Degradation (Failover States)

Enterprise systems fail. What happens when your Search API goes down? Does the entire website crash to a white screen with a 500 Error?

**Graceful Degradation** means planning for failure.
- If Algolia goes down, the AI must code a fallback UI: *"Search is temporarily unavailable. Browse our categories below."*
- If the Personalization API times out after 300ms, the AI must instantly abort the fetch and display a statically cached "Best Sellers" list. 
No infinite loading spinners. Ever.

---

## ✅ PRD Checklist

- [ ] Transition your mindset from "writing features" to "writing technical constraints" for your AI.
- [ ] Understand the Source of Truth Matrix so you know exactly which API owns which data.
- [ ] Define the Graceful Degradation rules for your top 3 most critical APIs.
- [ ] Use the AI prompt below to generate your strict, production-grade PRD.

---

## AI Prompt — Generate the Engineering PRD

Copy this prompt into your AI to have it generate the ultimate architectural contract for your store. This document will serve as the master context for all future coding prompts.

````prompt
I am building a decoupled, headless e-commerce store. You will act as my Principal Architect. We need to write the master Engineering PRD (Product Requirements Document). 

This PRD will serve as the strict contract for all code generation moving forward.

Here is my basic context:
- Commerce Backend: [e.g., Shopify Plus / Medusa]
- Search Index: [e.g., Algolia / Typesense]
- CMS: [e.g., Sanity / Contentful]

Generate a strict Engineering PRD formatted in Markdown. Include the following sections:

**1. The Source of Truth Matrix:**
Map exactly which system owns Product Metadata, Search/Faceted Filtering, and Transactional State (Cart/Checkout). 

**2. Hard Constraints:**
Write strict, unbreakable rules for the frontend rendering strategy (mandating ISR over SSR for catalog pages) and performance (P95 Core Web Vitals limits).

**3. Graceful Degradation SLAs:**
Write out three specific failover scenarios. Explicitly define how the Next.js UI must behave if:
A) The Search Index API returns a 502 error.
B) The primary payment gateway experiences extreme latency.
C) The CMS webhooks fail to update the cache.

Keep the tone authoritative and the rules immutable.
````

**Next: Information Architecture →**
