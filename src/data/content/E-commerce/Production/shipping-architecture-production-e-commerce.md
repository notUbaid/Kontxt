---
title: Shipping Architecture
slug: shipping-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Shipping & Logistics Architecture

At production scale, shipping is not printing labels in a garage. It is an algorithmic orchestration of complex supply chains, third-party logistics (3PL) integrations, and cross-border tax compliance.

If your shipping architecture is naive, you will hemorrhage margin on dimensional weight penalties, create chaos for your warehouse team, and alienate international customers with unexpected duties.

---

## 1. Dimensional Weight (DIM Weight)

If you are shipping physical goods, **weight is a lie.** Carriers charge based on *Dimensional Weight (DIM)*—a calculation of the box's volume. A light but bulky pillow costs more to ship than a heavy but small dense brick.

**Architectural Requirement:** 
Your database must store three dimensions (L, W, H) *and* dead weight for every product variant. 
When calculating shipping rates at checkout, the system must algorithmically "pack" the cart into predefined standard box sizes to get the total dimensional volume.
If your database schema lacks L/W/H fields, you will undercharge customers for shipping and pay the difference out of your own profit margin.

---

## 2. Order Management Systems (OMS) & Routing

At scale, an order does not simply go to "the warehouse."

If you have multiple fulfillment nodes (e.g., a West Coast 3PL, an East Coast 3PL, and a retail store), your backend must employ an **Order Management System (OMS)**.

**The Routing Algorithm:**
When a paid order enters the system, the OMS evaluates it against a rules engine:
1. *Proximity:* Which warehouse is closest to the destination ZIP code? (Reduces transit time and zone pricing).
2. *Inventory Availability:* Does the closest warehouse have all the SKUs? If not, do we split the order (paying two shipping fees) or route the entire order to a farther warehouse that has everything?
3. *Priority:* Is this an expedited order that must skip the standard queue?

This logic must be automated. Do not rely on human intervention to route orders at 10,000+ volume.

---

## 3. Cross-Border Compliance (DDP vs. DDU)

Selling internationally breaks naive shipping setups. You must architect for customs clearance.

**HS Codes (Harmonized System):**
Every product in your database must have a 6-10 digit HS Code assigned. This dictates the tariff rate the destination country will apply.

**DDP (Delivered Duty Paid) vs DDU (Delivered Duty Unpaid):**
- *DDU (The old way):* The customer buys the product, it arrives in their country, and the local post office holds it hostage until they pay a surprise 20% tax bill. *Result: High return rates and angry customers.*
- *DDP (The Production Standard):* Your checkout integrates with a cross-border API (e.g., Global-e, Zonos, or Stripe Tax). The exact duties and taxes are calculated and collected at checkout. The package clears customs instantly because the carrier bills you, not the customer.

---

## 4. Reverse Logistics (Returns)

At scale, returns are not an edge case; they are a core operational flow (often 10-30% of apparel orders).

**The Architecture:**
Do not handle returns manually via email. 
1. Integrate a Returns API (like Loop Returns or Happy Returns).
2. The user initiates the return via a self-serve portal authenticated against their order history.
3. The API generates a return label and tracks the package backwards.
4. **The Critical Hook:** The refund is *not* issued automatically. The refund is held in escrow until the warehouse API scans the returned barcode, verifies the item is undamaged, and fires a webhook to the Commerce Engine to release the funds.

---

## 5. Integrating with a 3PL

When you outsource fulfillment, your database must synchronize tightly with the 3PL's Warehouse Management System (WMS).

**The API Flow:**
1. **Order Push:** A cron job or event stream pushes all `pending_fulfillment` orders to the 3PL's API every 15 minutes.
2. **Status Pull (Webhooks):** The 3PL fires webhooks back to your system when the order is *picked*, *packed*, and *shipped*.
3. **The Tracking Handoff:** The `shipped` webhook contains the carrier tracking number. Your Commerce Engine receives this, updates the order state, and triggers the customer email via Klaviyo.

> [!WARNING]
> Ensure you build a robust retry mechanism (Exponential Backoff) for these API syncs. If the 3PL API is down for an hour, your system must queue the orders and replay them safely when it recovers.

---

## AI Prompt — Architect Your Shipping System

```prompt
I am architecting the shipping and logistics backend for a production e-commerce store.

Business Profile:
- Average Order Value: [$XXX]
- Product Type: [Small & dense / Large & fragile / Varied]
- Fulfillment Model: [In-house / Single 3PL / Multi-node 3PL]
- International Shipping: [Yes / No - Target Markets]

Act as a Principal Logistics Architect:
1. Define the exact database schema fields required on the Variant table to support accurate Dimensional Weight pricing.
2. Write the logical rules engine (pseudocode) for how an order should be routed if my primary warehouse is out of stock of 1 item in a 3-item cart.
3. Detail the exact API integrations required to achieve DDP (Delivered Duty Paid) for my international markets.
4. Outline the API synchronization architecture (Push/Pull, Webhooks, Retry logic) required to keep my Commerce Engine perfectly synced with a 3PL's WMS.
5. Provide the state machine transitions for a Reverse Logistics (Returns) flow, ensuring refunds are only issued upon verified warehouse receipt.
```

---

## Shipping Architecture Checklist

- [ ] L, W, H, and Weight fields mandated in the product schema for DIM weight calculations
- [ ] Order Routing logic explicitly defined for multi-location fulfillment and split shipments
- [ ] HS Codes mapped for all SKUs to support international customs clearance
- [ ] DDP (Delivered Duty Paid) checkout flow architected for international customers
- [ ] 3PL synchronization pipeline (Orders Out, Tracking In) designed with robust retry/queueing mechanisms
- [ ] Reverse logistics state machine defined to protect against refund fraud
