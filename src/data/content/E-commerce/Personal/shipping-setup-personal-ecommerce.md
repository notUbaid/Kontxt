---
title: Shipping Setup
slug: shipping-setup
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Shipping Setup

Back in Phase 2 and 3 you architected and built *how* shipping works in your code — rates, zones, the data model. This module is different: it's the real-world, operational side. Actual carrier accounts, actual rates, actual boxes. The part that happens after checkout completes and before a customer gets their order.

---

## Where This Fits

Your Shipping Architecture and implementation already calculate a shipping cost and capture an address at checkout. This module makes sure what happens *after* that — the physical fulfillment — is actually ready, not just simulated in development.

---

## Why This Matters for a Store Specifically

Shipping is where a store's promises become physical commitments. A bug in a product description is embarrassing; a shipping promise you can't actually fulfill (wrong rate charged, no real carrier account, no idea how to pack a fragile item) directly produces angry customers and refund requests on your very first real orders.

> **⚠️ Warning:** Test your shipping setup with a real, physical test shipment before your first live sale if at all possible — not just a code-level test order. The gap between "the checkout calculated $6.50 for shipping" and "the actual carrier charged me $11 to send this box" is a real, recurring cost if your rates aren't grounded in reality.

---

## What You're Building Today

- A real account with at least one shipping carrier
- Verified, accurate shipping rates (not placeholder numbers from development)
- A packaging plan appropriate to what you actually sell
- A label-printing and fulfillment workflow you can repeat for every order
- Confirmation that your checkout's calculated rate matches what you'll actually be charged

You're **not** setting up multi-carrier rate shopping, international customs automation, or warehouse-scale fulfillment software. That's beyond personal-store scope until volume justifies it.

---

## Choosing Your Approach

| Approach | Setup Effort | Best For |
|---|---|---|
| **Carrier's own platform (USPS, UPS, etc., direct account)** | Low | Most personal stores starting out |
| Shipping aggregator (Shippo, EasyPost, Pirate Ship) | Low-Medium | Stores wanting discounted rates and one dashboard across carriers |
| Manual post-office drop-off, no online account | Very low, but slow per-order | Very low order volume, testing the waters |

> **💡 Tip:** A shipping aggregator (Shippo, Pirate Ship, similar) is usually worth the small setup effort even for a personal store — they typically offer discounted commercial rates versus walking into a post office, and centralize label printing and tracking in one place.

---

## Verifying Your Rates Are Real

This is the most important check in this module:

1. Take 3-5 real products you sell, with real weights and dimensions
2. Get an actual quote from your chosen carrier/aggregator for each, to a few different real zones (local, cross-country, if you ship that far)
3. Compare those real numbers against what your checkout currently calculates or charges
4. Adjust your shipping architecture's rate logic to match reality, not the other way around

> **⚠️ Common Mistake:** Development and testing often use round, made-up shipping numbers ("flat $5 shipping") that never get revisited against real carrier rates before launch. If your actual cost is $8.50 and you're charging $5, you're losing money on every order — silently, until it adds up.

---

## Implementation

**Copy Prompt:**

```
Help me verify and finalize shipping configuration for my e-commerce
store before launch.

My products and approximate weights/dimensions: [list a few real
examples]

My current checkout shipping logic calculates: [describe your current
rate logic — flat rate, weight-based, carrier API, etc.]

Help me:
1. Identify what real carrier rates I should check this against, given
   my typical package sizes
2. Flag if my current logic risks under-charging relative to real
   carrier costs
3. Suggest a simple packaging plan (box sizes, materials) appropriate
   for these specific products
```

> **💡 Tip:** If your product line is small (under ~10 SKUs), it's often simpler and more accurate to manually verify rates for each one individually rather than building complex dynamic rate-calculation logic. Don't over-engineer this for a small personal catalog.

---

## Packaging Basics

- Match box/mailer size to the product — oversized boxes cost more in dimensional weight shipping and look unprofessional
- Fragile items need real cushioning, not an afterthought — factor this into both cost and box size decisions
- Reuse appropriately sized shipping materials where possible; it's both cheaper and more sustainable at personal-store volume

---

## The Repeatable Fulfillment Workflow

Once an order comes in, you need a process you don't have to re-figure out each time:

1. Order notification arrives (from your Notifications setup)
2. Pick and pack the product
3. Generate and print the shipping label (via your carrier/aggregator account)
4. Mark the order as shipped in your admin, triggering the customer notification and tracking number
5. Hand off to the carrier (drop-off or pickup)

> **✅ Best Practice:** Write this down, even briefly, even though you're the only one doing it. The first time you're fulfilling 10 orders in a day instead of 1, a written checklist prevents mistakes far better than memory.

---

## Common Mistakes

- Launching with placeholder shipping rates from development, never validated against real carrier costs
- No real carrier or aggregator account set up until the first order is already placed, causing fulfillment delays
- Packaging that doesn't match the product, leading to damage in transit or unnecessarily high dimensional-weight costs
- No defined process for marking orders shipped and notifying customers, so tracking information never reaches them
- Underestimating fragile-item packaging needs, leading to damage claims and refunds on the very products most likely to need them

---

## Validation Checklist

- [ ] Real carrier/aggregator account is set up and verified working
- [ ] At least 3-5 real products have been rate-checked against actual carrier costs, not just development placeholders
- [ ] Checkout's calculated shipping cost matches real costs closely enough to not lose money per order
- [ ] A test label has been successfully generated and printed
- [ ] Packaging materials appropriate to your actual product line are on hand
- [ ] The order-to-shipped workflow has been walked through at least once, start to finish

---

## AI Review Prompt

```
Review my shipping setup before launch. Based on this information:

Products/weights: [list]
Current checkout shipping logic: [describe]
Real carrier rates I've gathered: [list, if available]

Check for:
1. Any gap between calculated checkout shipping cost and real carrier
   cost that could lose money per order
2. Packaging recommendations that don't match my actual products
3. Anything in my fulfillment workflow that's likely to break under
   real order volume, even if it works for one test order
```

---

## What Comes Next

Shipping is ready for real orders. Next: **Taxes Setup** — making sure the numbers at checkout are not just shipping-accurate, but tax-compliant for where you actually sell.
