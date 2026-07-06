---
title: Pricing Strategy
slug: pricing-strategy
phase: Phase 0
mode: personal
projectType: e-commerce
estimatedTime: 15–20 min
---

# Pricing Strategy

Price is not a number you pick after everything else is decided. It is a signal your store sends before a customer reads a single word of your product description.

Price communicates quality, positioning, and trust. Set it wrong and no amount of great design or copy recovers it.

---

## The Four Pricing Failure Modes

Personal store builders consistently fall into one of these:

| Failure Mode | What It Looks Like | The Real Problem |
|---|---|---|
| **Race to the bottom** | Pricing below market to compete on cost | Destroys margin, attracts the wrong customer, impossible to sustain |
| **Cost-plus underpricing** | COGS × 2 = price | Ignores perceived value, leaves significant margin on the table |
| **Aspirational overpricing** | Premium price without premium signals | High bounce rate, low conversion, no trust earned yet |
| **Inconsistent pricing** | Random price points across catalog | Confuses customers, undermines catalog coherence |

The goal is not the lowest price or the highest price. It is the price that is consistent with your brand positioning and sustainable given your economics.

---

## The Three Pricing Anchors

Every price you set should be grounded in at least two of these three anchors.

### Anchor 1 — Cost Floor

The minimum price at which you make money.

```
Cost Floor = COGS + Packaging + Shipping + Payment Fee + Platform Amortization
```

This is not your price. This is the floor below which you cannot go without losing money per order. Knowing this number prevents you from accidentally underpricing.

### Anchor 2 — Market Rate

What comparable products sell for, from sellers with comparable positioning.

Not Amazon. Not Alibaba. The comparable: same product category, similar quality tier, similar brand positioning.

> [!TIP]
> >
> Market rate research is not about matching competitors. It is about understanding the price range your customer already has in their head before they visit your store. Your price needs to feel consistent with that range — or you need a clear reason why it doesn't.

### Anchor 3 — Perceived Value

What the customer believes they are getting, independent of what it cost you.

Perceived value is increased by:
- Strong product photography
- Specific, credible product descriptions (not generic superlatives)
- Packaging and unboxing experience
- Brand coherence across all touchpoints
- Social proof (reviews, user content, press)
- Scarcity signals (limited runs, made-to-order)

Perceived value allows you to price above market rate without friction — if you've earned it.

---

## Pricing Models for Personal Stores

| Model | How It Works | Best For |
|---|---|---|
| **Fixed pricing** | One price per variant | Most stores. Simple, predictable. |
| **Tiered pricing** | Price varies by quantity (e.g. buy 3, save 15%) | Consumables, gift bundles |
| **Bundle pricing** | Discounted price for a defined set of products | Increasing AOV on small catalogs |
| **Drop pricing** | Limited-run items priced at a premium for exclusivity | Creator stores, limited editions |
| **Made-to-order** | Price set per configuration | Customization-heavy stores |

> ️ **Warning: Discount-First Stores**
>
> If your launch strategy depends on discounts — "20% off everything this week" — you are starting a race you cannot win. Discounts train customers to wait. Reserve discounts for deliberate, time-bounded campaigns, not as a permanent conversion crutch.

---

## Price Architecture Across Your Catalog

When you have multiple products, prices need to be internally consistent.

**Entry product** — your lowest-priced item. Reduces purchase friction. Gets first-time buyers in the door.

**Core products** — mid-range. Your bread and butter. Where most revenue comes from.

**Premium product** — your highest-priced item. Anchors the catalog. Makes core products feel reasonable by comparison. Even if it sells rarely, it affects how customers perceive everything else.

This is called price anchoring. It is not manipulation — it is how human perception of value works. Use it intentionally.

```
Entry:    ₹299 — small candle, single scent
Core:     ₹799 — standard candle, full collection
Premium:  ₹1,899 — gift set, custom vessel, limited scent
```

The premium price makes ₹799 feel like a considered, reasonable purchase.

---

## Discounts, Coupons, and Sales — The Technical Side

Every discount mechanism you offer requires schema and logic. Don't promise features your architecture doesn't support.

| Feature | Technical Requirement |
|---|---|
| Percentage discount | Coupon code → discount calculation at checkout |
| Fixed amount off | Same, different calculation |
| Free shipping threshold | Cart total check before shipping rate applied |
| Buy X get Y | Product-level promotion logic |
| Tiered quantity discount | Variant-level pricing rules |
| Flash sale pricing | Time-bounded price overrides on variants |

For a personal store at launch: support one coupon code mechanism. That's enough. Build complexity when you have data showing customers want it.

---

## Price Changes After Launch

Prices will change. Your architecture needs to handle this cleanly.

- **Never change the price on an existing order.** Orders are immutable records. The price on an order is the price the customer paid.
- **Variant price changes apply to future orders only.**
- **If you run a sale, consider a `compare_at_price` field** — the original price shown as struck-through. This requires a schema field, not just a UI hack.

```
Variant fields:
  price:            799   ← current selling price
  compare_at_price: 999   ← shown as original/crossed-out price (nullable)
```

---

##  Pricing Strategy Checklist

- [ ] I have calculated my cost floor per product (minimum viable price)
- [ ] I have researched market rate for comparable products at my positioning level
- [ ] I have set prices that are internally consistent across my catalog
- [ ] I have an entry product, core products, and at least one premium anchor
- [ ] I have decided whether I will support discount codes at launch
- [ ] I have decided on my free shipping threshold (if any)
- [ ] I have added `compare_at_price` to my variant schema if I plan to run sales

---

## AI Prompt — Validate and Refine Your Pricing

```
I am building a personal e-commerce store. Help me validate my pricing strategy.

My store:
- Product type: [description]
- Brand positioning: [premium / mid-market / accessible]
- Target customer: [brief description]

My current pricing:
[List your products and planned prices]

My cost floor per product:
[List COGS + fulfillment cost per product]

My questions:
1. Is my pricing internally consistent or does anything feel out of place?
2. Does my pricing match my stated brand positioning?
3. What is my implied gross margin and is it sustainable for a personal store?
4. Should I adjust any prices based on perceived value vs. cost-floor analysis?
5. What free shipping threshold (if any) makes sense given my AOV and shipping costs?

Be direct. If a price is wrong, say so and explain why.
```

---

## What Comes Next

With pricing defined, you have everything needed to close out Phase 0. The final module ties your business definition, economics, and pricing into a scoped, buildable MVP.

**Next: MVP Scope →**
