---
title: Business Definition
slug: business-definition
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-25 min
---

# Business Definition & Logistics Architecture

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 20 Minutes

Defining the business at a production scale is fundamentally an exercise in API integration mapping, legal compliance, and logistics routing. 

Beginners often think of logistics as: *"I will print a label at home and take it to the post office."* Or, *"I'll use a basic dropshipping app."*

In a mass-usage environment, how you source, store, and ship goods dictates your entire technical architecture. If your business definition involves complex supply chains, multi-vendor warehouses, or global shipping, your AI must engineer complex routing algorithms to handle it seamlessly.

---

## 1. Multi-Warehouse Routing Algorithms

If you scale to the point of using multiple 3PLs (Third Party Logistics) across different regions (e.g., a warehouse in New York and one in Los Angeles), your checkout API cannot simply charge a flat, hardcoded $5 shipping rate.

Your checkout API must dynamically query a routing engine the moment the user types their zip code.

**The Routing Logic:**
1. Determine the user's exact zip code.
2. Check real-time inventory levels across both warehouse nodes.
3. Calculate the shortest/cheapest path to fulfill the order.

> [!WARNING]
> **Order Splitting:** This is a notorious trap. If a user orders a Shirt (in NY) and a Hat (in LA), your system must split the single `order_id` into two separate fulfillments. Your database schema must be designed by your AI to handle a "one-to-many" relationship between Orders and Tracking Numbers.

## 2. Global Compliance and DDP (Delivered Duty Paid)

If you decide to sell internationally, you must instruct your AI to architect for **DDP (Delivered Duty Paid)**. 

When a user in Germany buys a $100 jacket from the US, they owe import taxes and VAT. If your website doesn't charge them at checkout (which is called DDU - Delivered Duty Unpaid), the jacket arrives in Germany, the courier demands $40 in taxes at the door, and the customer refuses the package. You lose the product, pay return shipping, and get a chargeback.

**The Production Solution:** 
You must integrate a real-time tax and duty calculation API (like Global-e, FlavorCloud, or Zonos) directly into your headless checkout flow. The frontend must display the fully landed cost before they click "Pay".

## 3. Subscriptions and Recurring Revenue

If your business model involves subscriptions (e.g., coffee beans delivered monthly), you face strict security constraints. 

You cannot store credit card data directly in your database (that violates PCI compliance and invites massive lawsuits). You must instruct your AI to use **Vaulted Tokenization**. You will integrate Stripe Billing or Recharge, store a secure "token" representing the card, and architect secure webhooks to handle failed payment retries (dunning) automatically in the background.

---

## ✅ Business Definition Checklist

- [ ] Map out whether you will use a single warehouse or multi-node 3PLs (determining if you need order-splitting logic).
- [ ] Decide if you will sell internationally. If yes, mandate the integration of a DDP tax calculation API at checkout.
- [ ] Decide if subscriptions are part of your V1 scope. If yes, require strict PCI-compliant tokenization.
- [ ] Use the AI prompt below to generate the database schema and API flow for your logistics model.

---

## AI Prompt — Architect Logistics & Compliance

Copy this prompt into your AI to have it design the complex database schemas and API flows required for your specific business definition.

````prompt
I need you to act as a Principal E-Commerce Architect. We are defining the logistics and compliance architecture for my headless e-commerce store.

Here is my Business Definition:
- Fulfillment Model: [e.g., Single Warehouse / Multi-Node 3PL / Print-on-Demand]
- International Shipping: [Yes/No]
- Subscription Products: [Yes/No]

Based on this definition, I need you to generate the following technical architecture plans:

**1. Database Schema for Order Splitting:**
If using multiple warehouses or dropshippers, provide the exact Prisma or PostgreSQL schema demonstrating how a single `Order` relates to multiple `Fulfillment` and `TrackingNumber` records.

**2. The DDP API Flow (If International):**
Outline the exact API request/response flow during the checkout mutation. How do we query a DDP provider (like Zonos or Global-e) securely to fetch real-time import duties and inject them into the final cart total before capturing the Stripe payment?

**3. Subscription Webhook Architecture (If Subscriptions):**
If we have subscriptions, write the architectural plan for handling Stripe Billing webhooks. Specifically, detail how our backend will listen for `invoice.payment_failed` events and trigger automated dunning emails.

Output this as strict, highly detailed technical documentation.
````

**Next: Brand Vision →**
