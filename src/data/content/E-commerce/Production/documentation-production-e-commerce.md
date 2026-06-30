---
title: Documentation Implementation
slug: documentation
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Documentation Implementation

At production scale, undocumented code is a financial liability. 
When your store goes down at 2 AM on Black Friday, the on-call engineer needs to know exactly how the payment webhooks are routed, where the database connection pool is configured, and how to safely trigger a manual fulfillment sync.

If this information is trapped in the head of the lead developer, recovery will take hours instead of minutes.

---

## 1. System Architecture Documentation

You must maintain a living document that explains *how* the systems talk to each other.

**What to Include:**
- **The Data Flow Diagram:** A visual map (e.g., Mermaid.js or Excalidraw) showing the flow from the Frontend → BFF → Commerce Engine → Payment Gateway → OMS (Order Management System).
- **The Source of Truth Matrix:** Explicitly state which system owns which data. 
  - *Example:* "Product Titles live in Akeneo (PIM). Prices live in Shopify. Customer Emails live in Auth0."
- **Webhook Map:** A comprehensive table of every webhook you consume (Stripe, Shippo, Klaviyo), the exact endpoint it hits, what it triggers, and how idempotency is handled.

*Where to store this:* In your repository as a `ARCHITECTURE.md` file, or in a centralized engineering wiki (Notion/Confluence).

---

## 2. API Documentation (OpenAPI / Swagger)

If you are building a custom backend or a BFF (Backend for Frontend), your frontend engineers and mobile app developers need strict API contracts.

**The Implementation:**
Do not write API docs manually in a Google Doc. They will be outdated in a week.
- Use a framework that generates documentation from your code (e.g., tRPC, Swagger/OpenAPI, or GraphQL introspection).
- If building REST APIs, use tools like Swagger UI or Stoplight to expose an interactive playground where engineers can test the endpoints.

---

## 3. Runbooks (Disaster Recovery)

A Runbook is a step-by-step guide on what to do when something breaks.

**Critical Runbooks Required for E-Commerce:**
1. **The Database is Locked / Max Connections:** Exactly which dashboard to open (Vercel/AWS) and the exact command to kill hanging connections or scale the pooler.
2. **Payment Gateway is Down:** Instructions on how to flip the feature flag to disable the broken APM (e.g., Klarna) while keeping primary credit cards active.
3. **The 3PL Sync Failed:** The exact manual curl command or admin button to press to replay stuck orders to the warehouse.
4. **Card Testing Attack:** How to immediately tighten the rate limit parameters in Cloudflare/Upstash.

*Rule:* Runbooks must be written for an engineer who has never seen this specific code before, because the person on-call might not be the person who wrote the feature.

---

## 4. Operational Playbooks (For Merchandising/Support)

Documentation is not just for engineers. Non-technical teams will destroy your database if you do not give them safe operating procedures.

- **Merchandising:** Document exactly how to launch a flash sale (e.g., "Do not update 50,000 prices via CSV at 9 AM, the database will lock. Use the bulk API script located at `scripts/bulk-price.ts`").
- **Customer Support:** Document the exact procedure for issuing a partial refund without breaking the tax calculations in the ERP.

---

## AI Prompt — Generate Your Technical Documentation

```prompt
I need to generate the technical documentation for my production e-commerce store.

Tech Stack:
- Commerce Engine: [e.g., Headless Shopify / Medusa]
- Third Parties: [e.g., Stripe, Algolia, SendGrid, TaxJar]
- Hosting: [e.g., Vercel + Supabase]

Act as a Principal Staff Engineer:
1. Generate the markdown for a comprehensive `ARCHITECTURE.md` file, including a Mermaid.js diagram showing the data flow of a successful checkout.
2. Provide a "Source of Truth" matrix for my Tech Stack, defining exactly which system owns Inventory, Pricing, Content, and Identity.
3. Write a high-stress Runbook for resolving a "Stripe Webhook Processing Delay" where orders have been paid for but are stuck in a pending state in the database.
4. Outline a 5-step playbook for the Merchandising team on how to safely execute a Black Friday catalog update without taking the site offline.
```

---

## Documentation Implementation Checklist

- [ ] `ARCHITECTURE.md` created, detailing the data flow and Source of Truth for all systems
- [ ] Webhook routing map documented (endpoints, payloads, idempotency keys)
- [ ] API contracts generated automatically (via OpenAPI, tRPC, or GraphQL)
- [ ] Disaster Recovery Runbooks written for Database Exhaustion, Payment Outages, and Card Testing Attacks
- [ ] Operational Playbooks provided to Merchandising and Customer Support teams
