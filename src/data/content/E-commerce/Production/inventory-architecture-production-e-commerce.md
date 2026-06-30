---
title: Inventory Architecture
slug: inventory-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Inventory Architecture

In a side project, inventory is a single integer in a database column (`qty = 5`). 
In a production system, inventory is a complex, distributed calculation known as **Available to Promise (ATP)**.

When you operate at scale, a single integer cannot represent the reality of physical goods moving across multiple warehouses, sitting in customer carts, processing through payment gateways, and returning via reverse logistics.

If your inventory architecture is flawed, you will oversell products. Overselling leads to forced refunds, payment processor penalties, customer churn, and operational chaos.

---

## The "Available to Promise" (ATP) Formula

At production scale, you never display your raw physical inventory count to the frontend. You display the ATP.

**ATP = (On Hand) - (Allocated) - (Safety Stock) + (Incoming expected)**

### 1. On Hand (Physical Count)
The actual number of units sitting on a shelf in a warehouse. This number is updated by your WMS (Warehouse Management System) or 3PL. It is rarely 100% accurate due to shrinkage, damage, or audit delays.

### 2. Allocated (Reserved)
Units that exist physically but are already promised to customers. 
- *Soft Allocation:* Units in an active checkout session.
- *Hard Allocation:* Units attached to a paid order that has not yet shipped. (Once shipped, the unit is deducted from both On Hand and Allocated).

### 3. Safety Stock (Buffer)
A buffer (e.g., 5 units) that you artificially subtract from the total. If you have 5 physical units left, you tell the storefront you have 0. This absorbs warehouse counting errors, damaged goods, and millisecond race conditions, ensuring you never oversell.

---

## Multi-Location Routing

If you have multiple fulfillment centers (e.g., a warehouse in New York, a warehouse in California, and two retail stores), inventory becomes a multi-dimensional matrix.

When a customer in Texas adds an item to their cart, the system must decide:
1. Which location has the ATP to fulfill this?
2. If multiple locations have it, which is the cheapest/fastest to ship from?
3. If no single location has the full order, do we split the shipment (increasing logistics costs) or hold the order until stock is consolidated?

**Architecture Rule:** The Commerce Engine (Shopify/Medusa) must aggregate the total ATP across valid locations for the storefront to display, but the Order Management System (OMS) handles the complex routing logic *after* the order is placed.

---

## The Concurrency Problem (Overselling)

The most difficult technical challenge in e-commerce is the flash sale. 

Imagine 5,000 people simultaneously trying to buy 100 limited-edition sneakers. If your frontend reads `ATP = 10` and allows 5,000 people to reach the payment screen, 4,990 of them will fail at the last second, or worse, your database will allow 5,000 successful payments.

### Mitigating Concurrency at Scale
1. **Never read from a read-replica for checkout.** Product pages can read from cached replicas. Checkout and payment must query the primary database to check real-time stock.
2. **Atomic Decrements:** In Postgres, use `SELECT ... FOR UPDATE` to lock the row.
3. **Redis Reservation Queues:** For massive drops (ticket sales, sneaker drops), route traffic through a Redis queue. Users are issued a temporary "reservation token" with a strict 3-minute TTL. Only users with valid tokens can hit the payment gateway. If the token expires, the inventory is released back to the pool.

---

## Backorders and Pre-Orders

Selling inventory you do not physically have requires explicit architectural support.

- **Pre-orders:** You are capturing payment for items with a future release date. Your payment gateway *must* support delayed capture if the ship date is far in the future, otherwise you violate merchant agreements.
- **Backorders:** Selling past 0 ATP because a purchase order (PO) is in transit to the warehouse. 

**Data requirement:** If an item is bought on backorder, that specific order line item must be flagged as `is_backordered: true`. If you mix in-stock and backordered items in the same cart, your OMS must know whether to split the shipment or hold the entire order until the backordered item arrives.

---

## AI Prompt — Architect Your Inventory System

```prompt
I am designing the inventory architecture for a production e-commerce store.

Fulfillment Profile:
- Business Model: [e.g., DTC / Dropshipping / Omnichannel Retail]
- Number of Fulfillment Locations: [e.g., 1 central warehouse + 3 retail stores]
- Traffic Pattern: [e.g., Steady daily sales / Massive flash sale spikes]
- Order Volume: [e.g., 10,000 orders/month]

Act as a Principal Solutions Architect. Provide a detailed technical design for my inventory system:
1. Provide the exact mathematical formula I should use for Available to Promise (ATP) given my fulfillment profile, including recommended Safety Stock logic.
2. Detail the exact database mechanism (or Shopify API pattern) I must use to prevent race conditions during a high-concurrency flash sale.
3. If a customer orders 3 items, and they are split across 2 of my warehouses, outline the Order Routing logic the system should execute.
4. How should the system handle inventory reservations during the checkout flow (Hard allocation vs Soft allocation)?
5. What are the edge cases where my digital ATP will fall out of sync with my physical warehouse count, and how do I automatically reconcile them?
```

---

## Inventory Architecture Checklist

- [ ] ATP (Available to Promise) logic explicitly defined, separating physical stock from allocated stock
- [ ] Safety stock buffers implemented to absorb warehouse inaccuracies and race conditions
- [ ] Database concurrency strategy implemented (row-level locking or Redis queues) to prevent overselling
- [ ] Multi-location routing logic defined (if using more than one fulfillment center)
- [ ] Backorder and pre-order state handling defined at the line-item level (not just order level)
- [ ] Strategy in place for syncing physical 3PL/WMS counts with digital ATP periodically
