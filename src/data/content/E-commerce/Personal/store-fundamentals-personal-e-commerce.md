---
title: Store Fundamentals
slug: store-fundamentals
phase: Phase 0
mode: personal
projectType: e-commerce
estimatedTime: 15–20 min
---

# Store Fundamentals

Before architecture, before code, before design — you need to understand what an e-commerce store actually is as a system. Not conceptually. Mechanically.

Most beginners think of a store as a product list with a checkout button. Engineers think of it as a set of interconnected state machines.

---

## What a Store Actually Does

Every e-commerce store, regardless of size, performs the same core operations:

```
Customer browses products
       ↓
Customer selects product + variant
       ↓
Customer adds to cart (cart is created)
       ↓
Customer modifies cart (quantity, remove, coupon)
       ↓
Customer initiates checkout
       ↓
Store collects shipping info
       ↓
Store calculates shipping + tax
       ↓
Store collects payment
       ↓
Payment provider confirms or rejects
       ↓
Order is created (inventory decremented)
       ↓
Fulfillment begins (email sent, order tracked)
       ↓
Order ships → delivered → complete
```

Every phase of this flow has its own failure modes, state management requirements, and user experience decisions. You need to be aware of the full chain before you design any individual piece of it.

---

## The Five Core Entities

Every e-commerce system is built around five core data entities. Everything else hangs off these.

### 1. Product

A product is what you sell. It has a name, description, images, and belongs to one or more categories.

A product is **not** a purchasable item by itself — that's a variant.

### 2. Variant

A variant is the specific purchasable version of a product. A t-shirt product has variants: `[Small, Blue]`, `[Large, Red]`, etc.

Every variant has:
- Its own SKU (Stock Keeping Unit)
- Its own price (variants can be priced differently)
- Its own inventory count
- Its own weight/dimensions (for shipping)

> ️ **Warning: The Variant Trap**
>
> Skipping variants because your store starts with "simple products" is a technical debt trap. The moment you add sizes, colors, or bundles, you'll need to retrofit variant support into your entire codebase — products, cart, checkout, inventory, and orders all change. Model variants from day one.

### 3. Cart

A cart is a temporary, session-scoped container holding variant quantities before checkout. It is not an order. It may never become an order.

Cart state is transient. Orders are permanent.

### 4. Order

An order is created the moment payment is confirmed. It is an immutable record of what was purchased, at what price, with what shipping details. Orders should never be edited after creation — only statuses change.

### 5. Customer

A customer is a person who has completed at least one order. Visitors browsing your store are not yet customers.

Customers have order history, saved addresses, and optionally saved payment methods.

---

## The Inventory Problem

Inventory is the hardest part of e-commerce to get right.

The core challenge: **two customers can add the last unit to their carts simultaneously**. If both complete checkout, you've oversold.

There are three standard strategies:

| Strategy | How It Works | Best For |
|---|---|---|
| **Reserve on Add-to-Cart** | Inventory decrements when added to cart, restores if cart expires | High-demand, limited inventory |
| **Reserve on Checkout Start** | Inventory holds when checkout begins (15–30 min window) | Most personal stores |
| **Reserve on Payment** | Inventory decrements only on confirmed payment | Digital goods, print-on-demand |

For a personal store with moderate traffic, **Reserve on Checkout Start** is the pragmatic choice. Simpler than cart-level reservation, safer than payment-level.

---

## Money Is Not a Float

> ️ **Critical**
>
> Never store prices or monetary amounts as floating-point numbers.
>
> `0.1 + 0.2 = 0.30000000000000004` in JavaScript and most languages.
>
> Store all money as **integers in the smallest currency unit** (cents for USD, paise for INR). Display by dividing. Calculate by multiplying.

```
//  Wrong
price: 29.99

//  Correct
price: 2999  // stored as paise/cents, displayed as ₹29.99 / $29.99
```

This is non-negotiable. Getting this wrong causes real financial discrepancies.

---

## Tax and Shipping Are Not Simple

Two things beginners consistently underestimate:

**Tax** is jurisdiction-dependent. The tax rate for an order depends on where the customer is located, what product category it is, and sometimes the seller's location. For a personal store with simple scope, a flat-rate or destination-based approach is acceptable early on. But don't hardcode a rate — externalize it.

**Shipping** is weight + dimensions + origin + destination + carrier. Unless you're using flat-rate or free shipping, real-time carrier rates require API integration (ShipStation, EasyPost, Shippo). Flat-rate shipping is the right default for a personal store at launch.

---

## The Order State Machine

An order moves through states. Never treat order status as a free-text field — it's a state machine with valid transitions.

```
pending_payment
      ↓
   paid
      ↓
processing
      ↓
 shipped
      ↓
 delivered
      ↓
 complete

(At any point before shipped) → cancelled
(After delivered, within window) → refund_requested → refunded
```

Invalid transitions (e.g., jumping from `pending_payment` to `delivered`) should be impossible in your data model, not just in your UI.

---

##  Fundamentals Checklist

Before moving to Phase 1, confirm you understand these:

- [ ] I understand the difference between a product and a variant
- [ ] I know which inventory reservation strategy I will use
- [ ] I will store all prices as integers (cents/paise), not floats
- [ ] I understand that a cart is temporary and an order is permanent
- [ ] I have decided on my shipping strategy for launch (flat-rate / free / real-time)
- [ ] I understand that order status is a state machine, not a free text field
- [ ] I know my tax approach for launch (flat rate / destination-based / tax service)

---

## AI Prompt — Validate Your Store Model

Use this once you've completed the checklist above.

```
I am building a personal e-commerce store with the following characteristics:

- Products: [brief description, e.g. "handmade candles, ~20 SKUs, no size variants"]
- Inventory: [limited / unlimited / print-on-demand / digital]
- Shipping: [domestic only / international / flat-rate / real-time]
- Tax: [single country / multi-region]
- Currency: [INR / USD / other]

Based on this, tell me:
1. Whether I need variant support at launch or can defer it
2. Which inventory reservation strategy fits my use case
3. What order statuses I actually need (remove unnecessary ones)
4. Any complexity I'm likely underestimating for my specific setup

Be direct. Point out the traps.
```

---

## What Comes Next

You now have a mechanical model of what you're building. Every design and architecture decision in the phases ahead maps back to these fundamentals.

In Phase 1, you'll design the customer-facing experience. In Phase 2, you'll architect the system that makes these fundamentals production-ready.

**Next: Business Definition →**
