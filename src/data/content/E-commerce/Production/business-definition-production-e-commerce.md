---
title: Business Definition
slug: business-definition
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Business Definition (The Logistics Moat)

In production e-commerce, your "Business Definition" is not a mission statement. It is a strict logistical blueprint that defines how atoms (physical products) move from the factory to the consumer's front door. 

If your backend code is pristine, but your logistics model relies on shipping single units from China via ePacket (taking 21 days), your customer retention will be 0%, and your Stripe account will be shut down due to chargebacks. 

---

## 1. 3PL vs Dropshipping vs In-House

You must define the exact physical location and ownership of your inventory before writing a single line of API code.

**1. Dropshipping (The High-Risk Model):**
You never touch the product. The factory ships directly to the consumer.
- *Pros:* Zero capital required for inventory.
- *Cons:* 14-30 day shipping times. Massive quality control risk. High chargeback rates.
- *Tech Constraint:* Your backend must parse supplier CSVs daily to keep inventory accurate, otherwise you will sell products the supplier no longer has.

**2. 3PL / Third-Party Logistics (The Production Standard):**
You buy inventory in bulk. A professional warehouse (like ShipBob or Deliverr) stores it and ships it in 2 days.
- *Pros:* 2-day shipping. Scalable to 10,000 orders/day without hiring staff.
- *Cons:* High upfront capital for inventory and storage fees.
- *Tech Constraint:* Your backend MUST have a robust, bidirectional Webhook integration with the 3PL's API to sync order statuses (`SHIPPED`) and tracking numbers in real-time.

**3. In-House Fulfillment (The Bootstrap Model):**
You buy inventory and store it in your garage or own warehouse.
- *Pros:* Complete control over unboxing experience.
- *Cons:* Breaks instantly when you scale past 100 orders/day.
- *Tech Constraint:* You must integrate hardware (thermal printers, barcode scanners) directly with your shipping software (e.g., ShipStation).

---

## 2. Global vs Domestic Nexus

Selling internationally introduces massive engineering complexity regarding taxes, duties, and currency conversion.

**The Implementation:**
If you define your business as "Global from Day 1," you must architect for **DDP (Delivered Duty Paid)**.
- If you ship a $100 jacket to London, and do not charge duties at checkout, the package will be held at UK customs until the customer pays a surprise $30 tax. They will refuse the package.
- Your checkout API must integrate a landed-cost engine (like Global-e or Zonos) to calculate exact global duties in real-time and charge them upfront.

---

## 3. Subscription (Recurring) vs One-Off

The financial model of your business dictates your payment gateway architecture.

**The Implementation:**
- **One-Off Business:** You just need a standard Stripe Payment Intent integration.
- **Subscription Business (e.g., Coffee, Skincare):** You must implement Stripe Billing (or Recharge). This requires storing payment tokens securely, handling automated Dunning (retrying failed cards over 7 days), and building a secure Customer Portal for users to cancel or pause their subscriptions without emailing support.

---

## AI Prompt — Define Your Logistics Architecture

```prompt
I am defining the core logistical and financial operations for a production e-commerce business.

Business Context:
- Fulfillment Model: [e.g., 3PL / In-House / Dropshipping]
- Target Markets: [e.g., US Only / Global]
- Revenue Model: [e.g., One-Off / Subscribe & Save]

Act as a Principal Operations Architect:
1. Based on our 3PL fulfillment model, outline the exact Webhook architecture required to keep our primary Postgres database synchronized with the warehouse's physical inventory count in real-time.
2. If we are shipping globally, explain the technical and financial difference between DDP (Delivered Duty Paid) and DDU, and why DDP is mandatory for conversion rates.
3. If we are implementing a Subscription model, define the database schema required to track subscription statuses and the logic needed to handle failed recurring credit card payments (Dunning).
```

---

## Business Definition Checklist

- [ ] Fulfillment model explicitly chosen (3PL, In-House, or Dropshipping) and API integration constraints documented
- [ ] Tax and Duty architecture defined (DDP vs DDU) based on target geographic markets
- [ ] Revenue model finalized (One-Off vs Subscription), dictating the complexity of the payment gateway integration
- [ ] Bidirectional webhook requirements documented for keeping the database synced with physical warehouse operations
