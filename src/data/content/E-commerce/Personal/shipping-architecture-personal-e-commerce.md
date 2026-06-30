---
title: Shipping Architecture
slug: shipping-architecture
phase: Phase 2
mode: personal
projectType: e-commerce
estimatedTime: 20–30 min
---

# Shipping Architecture

Shipping is where most first-time store builders underestimate complexity. It looks like a simple number — "charge ₹99 for shipping" — until you have international customers, heavy products, multiple carriers, and orders that need to be split across warehouses.

Start simple. Design to extend.

---

## The Spectrum of Shipping Complexity

Before designing anything, locate yourself on this spectrum:

```
Simple ────────────────────────────────────── Complex

Flat rate     Zone-based     Weight-based     Carrier API
everywhere    pricing        pricing          real-time rates

↑                                                    ↑
Start here                              Only if needed
for personal                            at significant
projects                                order volume
```

**For a personal project: flat rate or zone-based pricing covers 90% of use cases.** Carrier API integration (Shiprocket, Delhivery, Stripe Shipping, EasyPost) adds significant complexity and is only worth it when you need real-time rates or automated label generation at volume.

---

## Shipping Models

### 1. Flat Rate

One rate for everyone. Simple, predictable, easy to reason about.

```
All orders: ₹99 shipping
Orders above ₹999: Free shipping
```

Best for: stores with similar-weight products, single-country shipping, early stage.

### 2. Zone-Based

Different rates for different geographic regions.

```
Zone A (same city):     ₹49
Zone B (same state):    ₹79
Zone C (rest of India): ₹99
Zone D (international): ₹599
```

Best for: stores where location meaningfully affects your actual shipping cost.

### 3. Weight-Based

Rate calculated from total order weight.

```
0–500g:   ₹59
500g–1kg: ₹89
1kg–2kg:  ₹129
2kg+:     ₹129 + ₹40 per additional kg
```

Best for: stores with significant weight variation between products (apparel vs. furniture, for example).

### 4. Carrier API (Real-Time Rates)

Query a carrier's API at checkout with package dimensions and destination, receive live rates.

```
User enters address at checkout
    ↓
Your server sends weight + dimensions + origin + destination to carrier API
    ↓
Carrier returns available services with live rates
    ↓
User selects their preferred service
    ↓
Selected rate stored on order
```

Best for: high-volume stores, when your margins depend on precise carrier pricing, when offering carrier choice matters to customers.

---

## Data Model

Design your shipping schema to support your chosen model without over-engineering.

```
ShippingZone
├── id
├── name (e.g. "India - Standard", "International")
├── countries (array of ISO country codes)
├── states (array, optional — for domestic zone splitting)
└── isActive

ShippingRate
├── id
├── zoneId (foreign key)
├── name (e.g. "Standard Delivery", "Express")
├── carrier (e.g. "Delhivery", "DTDC", "India Post")
├── minWeight (grams, nullable)
├── maxWeight (grams, nullable)
├── minOrderValue (nullable — for free shipping threshold)
├── maxOrderValue (nullable)
├── price (integer — paise/cents)
├── estimatedDaysMin
├── estimatedDaysMax
└── isActive

Order (additions)
├── shippingRateId (foreign key — rate selected at checkout)
├── shippingCost (snapshot — price at time of order)
├── trackingNumber (nullable — added post-fulfilment)
├── trackingUrl (nullable)
├── shippedAt (nullable)
└── deliveredAt (nullable)

Product (additions)
├── weight (grams — required for weight-based shipping)
├── weightUnit (default: g)
```

---

## Shipping Rate Resolution

At checkout, your server must resolve which rates are available for a given order and destination.

```
Customer enters shipping address
    ↓
Server determines zone from country (+ state if applicable)
    ↓
Server filters ShippingRates by:
  - zoneId matches
  - isActive = true
  - weight constraints satisfied (if weight-based)
  - order value constraints satisfied (free shipping threshold)
    ↓
Return available rates to checkout UI
    ↓
Customer selects rate
    ↓
Server validates selected rate is still valid before payment
    ↓
Rate stored on order at confirmed price
```

Always re-validate the selected shipping rate server-side before processing payment. A client can submit any rate ID — verify it actually applies to their order.

---

## Free Shipping Threshold

Free shipping above a minimum order value is one of the highest-converting offers in e-commerce. Design for it from day one.

```
ShippingRate
├── minOrderValue: 99900  (₹999 in paise)
├── price: 0              (free)
├── name: "Free Shipping"
```

Show progress toward free shipping on the cart page:

```
You're ₹234 away from free shipping!
```

This is a simple subtraction: `freeShippingThreshold - cartSubtotal`. Implement it on the cart page as a banner. Conversion impact is significant.

---

## Order Tracking

Customers want to know where their order is. The minimum viable tracking implementation:

```
Admin adds tracking number + carrier to order
    ↓
System generates tracking URL:
  "https://www.delhivery.com/track/package/{trackingNumber}"
    ↓
Customer receives "Your order has shipped" email with tracking link
    ↓
Tracking page on your store (/orders/:id) shows tracking number + link
```

You do not need to embed a live tracking widget. A direct link to the carrier's tracking page is sufficient for a personal project.

**Common Indian carrier tracking URL patterns:**

| Carrier | Tracking URL pattern |
|---|---|
| Delhivery | `https://www.delhivery.com/track/package/{awb}` |
| Shiprocket | `https://shiprocket.co/tracking/{awb}` |
| DTDC | `https://www.dtdc.in/tracking/tracking_results.asp?Cons_No={awb}` |
| India Post | `https://www.indiapost.gov.in/vas/SitePages/IndiaPostHome.aspx` |
| Blue Dart | `https://www.bluedart.com/tracking` |

Store the carrier name alongside the tracking number so you can construct the correct URL.

---

## International Shipping Considerations

If you ship internationally, these are not optional:

**Customs and duties:** International shipments require a customs declaration — description of contents, value, HS code. Research the HS codes for your product category. Incorrect declarations cause shipments to be held or returned.

**Prohibited items:** Every country has prohibited import lists. Research your destination markets before offering international shipping.

**Displayed pricing:** Be explicit about whether your international prices include or exclude duties. "Duties and taxes may apply at destination" is the minimum disclosure required.

**Currency:** If you sell internationally, decide whether to show prices in local currency or INR. Showing INR to international customers is fine for a personal project — just be clear.

---

## Shipping Zones for India

A practical starting point for domestic Indian shipping zones:

```
Zone A — Local (same city/district):     fastest, lowest cost
Zone B — Regional (same state):          1–3 days
Zone C — National (rest of India):       3–7 days
Zone D — Remote (J&K, Northeast, Islands): 5–10 days, higher cost
```

Most Indian carriers (Delhivery, Shiprocket) use serviceable pincode databases. At scale, you'd query these. For a personal project, zone by state is sufficient.

---

## When to Add Carrier API Integration

Add a carrier API when you need at least one of:

- **Automated label generation** (printing shipping labels without manual data entry)
- **Real-time rate calculation** (carrier pricing varies by exact weight and dimensions)
- **Automated tracking updates** (webhooks from carrier when status changes)
- **Multi-carrier rate comparison** at checkout

For personal projects: defer this until you're processing enough orders that manual label creation becomes a bottleneck. Most indie stores start with flat/zone rates and manually book shipments on the carrier's website.

---

## AI Prompt: Shipping Architecture Review

```
You are a senior backend engineer reviewing a shipping architecture for a personal e-commerce project.

Here is my design:

SHIPPING MODEL: [flat rate / zone-based / weight-based / carrier API]

SCHEMA:
[paste your ShippingZone and ShippingRate table definitions]

RATE RESOLUTION LOGIC:
[describe how you determine available shipping options at checkout]

FREE SHIPPING THRESHOLD: [amount or "not implemented"]

TRACKING STRATEGY:
[describe how you handle tracking numbers and carrier links]

INTERNATIONAL SHIPPING: [yes/no — if yes, describe your approach]

Review for:
1. Missing edge cases (weight overflow, no rates available for a zone, threshold bugs)
2. Schema issues (missing fields, wrong data types)
3. Security issues (client-submitted rate manipulation)
4. Over-engineering for a personal project
5. What a first-time builder would most likely overlook

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] Shipping model chosen and appropriate for product catalogue
- [ ] ShippingZone and ShippingRate schema designed
- [ ] Rate resolution logic written — determines options from address + cart
- [ ] Selected shipping rate re-validated server-side before payment
- [ ] Shipping cost snapshotted on order at time of checkout
- [ ] Free shipping threshold implemented (if applicable)
- [ ] Tracking number and carrier stored on order post-fulfilment
- [ ] Carrier tracking URL constructed per carrier
- [ ] "Order shipped" email includes tracking link
- [ ] International shipping disclosures in place (if applicable)
- [ ] Product weights defined if using weight-based rates

---

## What to Build Next

**Search Architecture** — how customers find products determines how much of your catalogue actually converts. Even a simple personal store benefits from fast, relevant product search, and the architecture decision here has significant implementation consequences.

---

> **Filename:** `shipping-architecture-personal-e-commerce.md`
