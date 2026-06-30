---
title: Shipping Implementation
slug: shipping
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Shipping Implementation

Shipping at production scale is the bridge between digital state and physical logistics. 

A poorly implemented shipping API integration will cause your checkout to time out, your customers to abandon their carts, or your business to hemorrhage margin due to incorrect Dimensional (DIM) weight calculations.

---

## 1. The Shipping API Integration (Checkout Phase)

When a user enters an address at checkout, you must calculate the shipping rate dynamically based on the total dimensions and weight of the cart.

**The Implementation:**
1. **Address Validation:** Call an API like Lob or Google Places to ensure the address is real before proceeding.
2. **The Box Packing Algorithm:** You cannot simply sum the weights of 5 items. You must algorithmically determine how many standard boxes are required to fit those items, and calculate the DIM weight of those boxes.
3. **The Rate Call:** Send the validated address and the optimized box dimensions to a Shipping Broker API (e.g., Shippo, EasyPost, ShipEngine).
4. **The UI Response:** The API returns carrier options (e.g., FedEx Ground: $8.50, UPS Next Day: $25.00).

**Graceful Degradation (Critical):**
Shipping APIs go down frequently during Q4 spikes. Your backend must enforce a strict `3000ms` timeout on the API call. If the API fails to respond in 3 seconds, catch the error and return a static array of fallback rates (e.g., `[{ id: 'fallback', name: 'Standard Shipping', rate: 500 }]`). This ensures the checkout never crashes just because FedEx's servers are slow.

---

## 2. Order Management System (OMS) Routing

If you fulfill from multiple warehouses (e.g., East Coast and West Coast), your backend must route the order logically.

**The Routing Logic (Post-Payment):**
When the `payment_intent.succeeded` webhook fires, the OMS evaluates the order:
1. Which warehouse has the full inventory?
2. If both do, which one is geographically closer to the customer's ZIP code? (Closer = cheaper shipping labels).
3. If neither has the full inventory, split the order into two `Fulfillments`. Route Item A to the East Coast and Item B to the West Coast.

---

## 3. The 3PL Synchronization Pipeline

If you use a Third-Party Logistics provider (3PL), your database must push orders to them and pull tracking data back from them.

**The Anti-Pattern:** A daily CSV export emailed to the warehouse.
**The Production Standard:** A real-time Event-Driven pipeline.

**The Integration Flow:**
1. **Pushing the Order:** When an order is created and routed, the backend places it in a queue (e.g., AWS SQS). A worker transforms the order into the specific EDI/JSON format required by the 3PL's Warehouse Management System (WMS) and posts it via API.
2. **Pulling the Tracking:** The 3PL's WMS fires a webhook to your backend: `webhook_type: "ORDER_SHIPPED"`.
3. **The State Update:** Your backend receives the webhook, verifies the tracking number, updates the order status to `FULFILLED` in Postgres, and fires the "Order Shipped" email to the customer.

*Robustness:* You must implement Exponential Backoff retries on the Order Push queue. If the 3PL API is down for maintenance, the queue must retry 5 minutes later, then 15 minutes, until successful.

---

## 4. Reverse Logistics (Returns Implementation)

Handling returns manually via email creates a massive customer support bottleneck.

**The Implementation:**
Integrate a Returns API (like Loop Returns or AfterShip).
1. The customer initiates a return in a self-serve portal on your site.
2. The API generates a return shipping label (deducting the label cost from their final refund if per your policy).
3. The API monitors the carrier scan events.
4. **Security Hook:** Do not issue the refund automatically when the label is scanned at the post office. Fraudsters will mail you an empty box. Wait until the warehouse scans the barcode upon receipt, confirms the item condition, and triggers a webhook to your backend to execute the Stripe refund.

---

## AI Prompt — Architect Your Shipping Pipeline

```prompt
I am implementing the shipping and fulfillment integrations for a production e-commerce store.

Tech Stack:
- Backend: [e.g., Node.js / Serverless]
- Shipping Broker API: [e.g., Shippo / EasyPost]
- Fulfillment Model: [e.g., Multi-node 3PL]

Act as a Principal Logistics Engineer:
1. Write the precise TypeScript implementation for fetching dynamic shipping rates at checkout. Include a `Promise.race` timeout that defaults to a hardcoded flat rate if the carrier API exceeds 3000ms.
2. Draft the exact JSON payload format I must send to my 3PL's API to push a newly paid order for fulfillment.
3. Design the webhook handler architecture that receives tracking numbers from the 3PL, updates the database, and triggers the customer email.
4. Explain the security architecture for processing Returns: How do I ensure refunds are only issued after the warehouse physically verifies the item?
```

---

## Shipping Implementation Checklist

- [ ] Box packing algorithm and DIM weight calculations applied before fetching carrier rates
- [ ] Strict 3-second timeout and fallback rates implemented on all checkout shipping API calls
- [ ] OMS routing logic implemented for multi-location inventory (to optimize shipping costs)
- [ ] Automated Order Push pipeline integrated with 3PL/WMS via queueing system with Exponential Backoff
- [ ] Tracking number webhook ingestion implemented to automatically transition orders to `FULFILLED`
- [ ] Self-serve Returns API integrated with refunds tied strictly to warehouse receipt scans
