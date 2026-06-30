---
title: Shipping Setup
slug: shipping-setup
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Shipping Setup

If your checkout logic handles shipping rates incorrectly, you will either abandon carts (because rates are too high) or bleed margin (because you undercharged and must cover the difference).

At production scale, shipping requires exact volumetric math, carrier rate-shopping APIs, and integration with physical warehouse hardware (printers and scanners).

---

## 1. Volumetric (Dimensional) Weight

Carriers (FedEx, UPS) do not charge purely by physical weight. They charge by Dimensional (DIM) weight—how much space the box takes up on an airplane.

If you sell a large foam pillow that weighs 2 lbs, but requires a 24x24x24 box, the carrier will charge you for a 100 lb box. If your checkout only looks at the 2 lb physical weight, you will charge the customer $8 for shipping, and FedEx will bill you $150.

**The Implementation:**
Your database must store `length`, `width`, `height`, and `weight` for every single SKU.
During checkout, your backend must run a **Box Packing Algorithm** (e.g., integrating with EasyPost or Shippo APIs) to virtually pack the cart's items into standard box sizes to calculate the exact DIM weight before returning a shipping price to the user.

---

## 2. Rate Shopping (Multi-Carrier Strategy)

Relying on a single carrier (e.g., exclusively USPS) is a catastrophic risk. If USPS has a regional meltdown during December, your business grinds to a halt.

**The Production Standard:**
You must implement a Multi-Carrier API broker (like ShipStation, Shippo, or EasyPost).
- When a user enters their address, the API queries USPS, FedEx, and UPS simultaneously.
- **Business Logic:** The API executes rules (e.g., "If the package is under 1 lb, default to USPS Ground Advantage. If over 1 lb, rate-shop FedEx vs UPS and return the cheapest option to the UI").

---

## 3. Warehouse Hardware Integration

A beautifully coded Next.js storefront means nothing if the warehouse staff spends 10 minutes manually typing addresses into a label printer.

**The Implementation:**
- Ensure your shipping software (e.g., ShipStation) is hardwired to thermal label printers (like Rollo or Zebra).
- When the `Order.PAID` webhook hits ShipStation, the barcode and shipping label should be available to print with a single click (or automatically batch-printed).
- The warehouse worker scans the barcode on the packing slip, which automatically validates that the correct SKUs are in the box, and triggers the `Order.SHIPPED` webhook back to your Node.js backend.

---

## 4. International Shipping (DDP vs DDU)

Shipping across borders introduces tariffs, duties, and customs holds.

- **DDU (Delivered Duty Unpaid):** You charge the customer $20 for shipping. The package arrives in London, and the UK government holds it hostage until the customer pays a $30 import tax. The customer is furious and refuses the package.
- **DDP (Delivered Duty Paid):** (The Production Standard). You use an API like Global-e or Zonos at checkout. The API calculates the exact UK import duties, adds the $30 to the checkout total, and your carrier handles the customs clearance seamlessly.

---

## AI Prompt — Architect Your Shipping Operations

```prompt
I am configuring the shipping and fulfillment operations for a production e-commerce store.

Tech Stack:
- Fulfillment API: [e.g., Shippo / EasyPost]
- WMS: [e.g., ShipStation / Custom 3PL]
- Target Markets: [e.g., US, Canada, EU]

Act as a Principal Logistics Engineer:
1. Explain how to implement a Box Packing Algorithm to accurately calculate Dimensional (DIM) weight for an order containing 3 items of varying sizes, preventing margin loss.
2. Draft the business logic required to dynamically rate-shop between USPS and FedEx based on package weight and destination zones.
3. Detail the hardware and software integration required for a warehouse worker to scan a packing slip barcode and automatically trigger an `Order.SHIPPED` webhook.
4. Compare the technical integrations required to support DDP (Delivered Duty Paid) vs DDU for international orders, and why DDP is mandatory for conversion rates.
```

---

## Shipping Setup Checklist

- [ ] L, W, H, and Weight dimensions strictly required in the database for all sellable SKUs
- [ ] Box Packing Algorithm / DIM weight math implemented at checkout to prevent undercharging
- [ ] Multi-carrier API (Shippo/EasyPost) integrated to dynamically rate-shop based on weight and zone
- [ ] Warehouse barcode scanning workflow integrated to automatically trigger fulfillment webhooks
- [ ] DDP (Delivered Duty Paid) software integrated (Global-e/Zonos) for seamless international checkout
- [ ] Thermal printer (Zebra/Rollo) batch-printing workflows configured for the fulfillment team
