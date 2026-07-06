---
title: Build vs Buy (Commerce Engine)
slug: build-vs-buy-shopify
phase: Phase 2 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# The Commerce Engine: Build vs. Buy

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

A beginner developer looks at a shopping cart and thinks: *"I can build that in a weekend. I'll just make a PostgreSQL `Orders` table and connect it to Stripe."*

This is the most lethal mistake you can make in e-commerce. 
Building a bespoke commerce engine means you are now legally responsible for PCI compliance, complex state-by-state tax calculations, international DDP duties, inventory race conditions, and GDPR data deletion requests. 

As an AI-Assisted Architect, your job is to write code that makes money, not code that reinvents the wheel. You must instruct your AI to integrate with a massive, enterprise-grade Commerce Engine.

---

## 1. The Buy Mandate (Headless Providers)

You will "Buy" (subscribe to) a headless commerce engine to handle the brutal math of e-commerce. Your Next.js frontend will act as the beautiful "glass" sitting on top of their massive infrastructure.

| Provider | The Production Use Case | Why It Wins |
|---|---|---|
| **Shopify (Storefront API)** | The gold standard for 90% of stores. | Handles global tax compliance (Shopify Markets), inventory, and offers the highest-converting checkout in the world. |
| **Medusa.js** | The open-source alternative. | You own the Node.js backend. Ideal if you need bizarre, highly custom B2B pricing logic that Shopify cannot handle. |
| **Swell / CommerceTools** | Enterprise B2B / Complex Catalogs. | Massive API flexibility for subscriptions and digital/physical hybrid products. |

> [!IMPORTANT]
> If you choose Shopify, you must instruct your AI to use the **Storefront API (GraphQL)**. Do not let the AI use the standard Admin REST API to fetch products for the frontend; the Admin API is rate-limited and will crash your site. The Storefront API is designed for unlimited frontend traffic.

## 2. Decoupling the Checkout

When you build a headless store with a provider like Shopify, you have a critical architectural choice regarding the Checkout flow.

- **Option A (Fully Custom API Checkout):** You use the API to capture the credit card directly on your domain (e.g., via Stripe Elements). This is extremely hard to build, requires PCI compliance audits, and is highly prone to bugs.
- **Option B (The Headless Handoff):** The user browses your lightning-fast Next.js site. When they click "Checkout", the API generates a unique `checkoutUrl`. You redirect the user to a highly optimized, securely hosted Shopify checkout page (`checkout.yourdomain.com`). 

**The Production Solution:** 
Always choose Option B (The Headless Handoff) for V1. Shopify spends billions of dollars optimizing their checkout for conversion. Let them handle the credit card liability while you focus on the frontend discovery experience.

## 3. The GraphQL Imperative

If you use a modern headless engine, their API is likely GraphQL, not REST. 

If you let your AI write raw `fetch` requests with massive, unstructured GraphQL query strings injected directly into your React components, the codebase will become unreadable. 

**The Production Solution:**
You must instruct your AI to use a GraphQL Code Generator (like `graphql-codegen`). This tool automatically reads the Shopify schema and generates strict TypeScript types for every single query. If you misspell a product field, the TypeScript compiler will throw a fatal error before the code even runs.

---

##  Commerce Engine Checklist

- [ ] Accept the "Buy Mandate": Do not attempt to build a custom PostgreSQL commerce backend from scratch.
- [ ] Select your Headless Commerce Engine (Shopify Storefront API is recommended for V1).
- [ ] Commit to the "Headless Handoff" checkout strategy to offload PCI compliance liability.
- [ ] Mandate the use of GraphQL Code Generation for strict TypeScript safety.

---

## AI Prompt — Architect the GraphQL Handoff

Copy this prompt into your AI to have it set up the secure, strictly-typed integration with your chosen Commerce Engine.

````prompt
I am building a headless e-commerce store with Next.js. I need you to act as my Principal Backend Architect. We are integrating our Commerce Engine: [e.g., Shopify Storefront API].

We will use the "Headless Handoff" checkout strategy and strict GraphQL code generation.

**Generate the following integration architecture:**

1. **The GraphQL Codegen Setup:**
Provide the configuration file (`codegen.ts`) required to introspect the Shopify Storefront API schema. Explain exactly how this automatically generates strict TypeScript interfaces for our queries to prevent runtime errors.

2. **The Cart Creation Mutation:**
Write the Next.js server utility function that executes the `cartCreate` GraphQL mutation. Show how it securely passes the `process.env.STOREFRONT_ACCESS_TOKEN`. 

3. **The Checkout Redirect Flow:**
Write the React client-side handler for the "Proceed to Checkout" button. Show how the client requests the `checkoutUrl` from our Next.js API route, and gracefully redirects the user (`window.location.href`) to the secure, hosted Shopify checkout page to complete the transaction, entirely bypassing PCI compliance liability on our Next.js servers.
````

**Next: Tech Stack Selection →**
