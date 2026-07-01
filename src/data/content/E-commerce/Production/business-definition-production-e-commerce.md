---
title: Business Definition
slug: business-definition
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 15-25 min
---

# Business Definition

**Estimated Time:** 20 Minutes

Defining the business at a production scale is an exercise in logistics, legal compliance, and API integration mapping. How you source, store, and ship goods dictates your technical architecture.

If your business definition involves complex supply chains, multi-vendor dropshipping, or global warehousing, your architecture must elegantly handle routing algorithms and localized compliance.

## Multi-Warehouse Routing

If you utilize multiple 3PLs (Third Party Logistics) across the country, your checkout API cannot simply charge a flat shipping rate. It must dynamically query:
1. The user's shipping zip code.
2. The inventory levels across all warehouse nodes.
3. The algorithmic shortest/cheapest path to fulfill the order (potentially splitting the order into multiple shipments).

> [!IMPORTANT]
> Order splitting logic is notoriously difficult. If an order is split, your system must track multiple tracking numbers for a single `order_id` and ensure payment capture rules align with partial fulfillments (especially required by Stripe/Shopify compliance).

## Global Compliance and DDP

If you sell internationally, you must architect for DDP (Delivered Duty Paid). Your frontend must display the fully landed cost (including localized VAT and import duties) at checkout. This requires real-time API integrations with services like Global-e or FlavorCloud. 

Failing to architect for DDP means your customers will receive surprise customs bills at the border, resulting in refused packages, chargebacks, and destroyed inventory.

## Checklist:
- [ ] Map out the exact API flow for order routing and multi-warehouse fulfillment.
- [ ] Architect database schemas capable of handling split shipments (one-to-many relationship between orders and fulfillments).
- [ ] Integrate a real-time tax and duty calculation API (DDP) for all international traffic.
