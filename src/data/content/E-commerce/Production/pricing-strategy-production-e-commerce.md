---
title: Pricing Strategy
slug: pricing-strategy
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Pricing Strategy

Price is not a number you pick after everything else is decided. It is a signal your store sends before a customer reads a single word of your product description.

Price communicates quality, positioning, and trust. Set it wrong and no amount of great design or copy recovers it. At production scale, pricing decisions also directly affect your LTV:CAC ratio, your margin at volume, and your ability to run profitable promotional campaigns without destroying the baseline.

---

## The Four Pricing Failure Modes

E-commerce builders consistently fall into one of these:

| Failure Mode | What It Looks Like | The Real Problem |
|---|---|---|
| **Race to the bottom** | Pricing below market to compete on cost | Destroys margin, attracts price-sensitive customers who never pay full price, impossible to sustain at scale |
| **Cost-plus underpricing** | COGS × 2 = price | Ignores perceived value, leaves significant margin on the table, cannot support CAC from paid acquisition |
| **Aspirational overpricing** | Premium price without premium signals | High bounce rate, low conversion, no social proof or brand equity to justify it yet |
| **Inconsistent pricing** | Random price points across catalog | Confuses customers, undermines catalog coherence, makes upselling logic impossible |

The goal is not the lowest price or the highest price. It is the price that is consistent with your brand positioning, sustainable given your economics, and supportable by your margins at your target CAC.

---

## The Three Pricing Anchors

Every price you set should be grounded in at least two of these three anchors.

### Anchor 1 — Cost Floor

The minimum price at which you make money per order.

```
Cost Floor = COGS + Packaging + Shipping + Payment Fee + Platform Amortisation + Fulfilment Labour
```

This is not your price. This is the floor below which you cannot go without losing money per order. At production scale, your cost floor also needs to account for your CAC — you need margin above the cost floor to support customer acquisition.

### Anchor 2 — Market Rate

What comparable products sell for, from sellers with comparable positioning.

Not Amazon. Not Alibaba. The comparable: same product category, similar quality tier, similar brand positioning, similar channel mix.

> [!TIP]
> Market rate research is not about matching competitors. It is about understanding the price range your customer already has in their head before they visit your store. Your price needs to feel consistent with that range — or you need a clear, demonstrable reason why it does not.

### Anchor 3 — Perceived Value

What the customer believes they are getting, independent of what it cost you.

Perceived value is increased by:
- Strong product photography and content
- Specific, credible product descriptions (not generic superlatives)
- Packaging and unboxing experience
- Brand coherence across all touchpoints
- Social proof (reviews, user content, press coverage)
- Scarcity signals (limited runs, made-to-order)
- Endorsements and influencer validation

At production scale, brand equity compounds over time, increasing perceived value for the same product without requiring changes to the product itself. This is the mechanism behind premium pricing — and why brand investment is a pricing strategy, not just a marketing tactic.

---

## Pricing Models for Production Stores

| Model | How It Works | Best For |
|---|---|---|
| **Fixed pricing** | One price per variant | Most stores. Simple, predictable. |
| **Tiered pricing** | Price varies by quantity (e.g. buy 3, save 15%) | Consumables, gift bundles, B2B |
| **Bundle pricing** | Discounted price for a defined set of products | Increasing AOV on small catalogs |
| **Drop pricing** | Limited-run items priced at a premium for exclusivity | Creator stores, limited editions |
| **Made-to-order** | Price set per configuration | Customisation-heavy stores |
| **Subscription** | Recurring billing at a fixed or variable rate | Consumables, curated boxes |
| **Wholesale / trade** | Different price tiers for different customer types | B2B channel alongside DTC |

> [!WARNING]
> **Discount-First Stores**: If your launch strategy depends on discounts — "20% off everything this week" — you are starting a race you cannot win. Discounts train customers to wait. At production scale, a habit of aggressive discounting erodes margin faster than almost any other single decision. Reserve discounts for deliberate, time-bounded campaigns with clear objectives (clear excess inventory, new customer acquisition, reactivation of lapsed customers) — not as a permanent conversion lever.

---

## Price Architecture Across Your Catalog

When you have multiple products, prices need to be internally consistent.

**Entry product** — your lowest-priced item. Reduces purchase friction. Gets first-time buyers in the door at minimal risk. Converts into the data you need to build a returning customer base.

**Core products** — mid-range. Your bread and butter. Where most revenue comes from. Priced to support your CAC from your primary acquisition channel.

**Premium product** — your highest-priced item. Anchors the catalog. Makes core products feel reasonable by comparison. Signals brand quality even if it sells less frequently.

This is called price anchoring. It is not manipulation — it is how human perception of value works. Use it intentionally.

```
Entry:    ₹299 — small candle, single scent
Core:     ₹799 — standard candle, full collection
Premium:  ₹1,899 — gift set, custom vessel, limited scent
```

The premium price makes ₹799 feel like a considered, reasonable purchase.

### AOV and Pricing Strategy

Average Order Value matters for acquisition economics. If your CAC is ₹500 and your AOV is ₹400, you are losing money on first purchases and dependent entirely on repurchases to become profitable. Design your price architecture and bundle structure to push AOV above the level that supports your CAC.

```
Target AOV = CAC × (1 / Target Gross Margin)

Example: CAC ₹500, target margin 50%
→ Target AOV = ₹500 / 0.5 = ₹1,000
→ You need ₹1,000 average orders to break even on acquisition on first purchase
```

---

## Discounts, Coupons, and Sales — The Technical Side

Every discount mechanism you offer requires schema and logic. Do not promise features your architecture does not support.

| Feature | Technical Requirement |
|---|---|
| Percentage discount | Coupon code → discount calculation at checkout |
| Fixed amount off | Same, different calculation |
| Free shipping threshold | Cart total check before shipping rate applied |
| Buy X get Y | Product-level promotion logic |
| Tiered quantity discount | Variant-level pricing rules |
| Flash sale pricing | Time-bounded price overrides on variants |
| Loyalty point redemption | Points system + redemption calculation at checkout |
| Wholesale pricing | Customer-tier-based pricing, not visible to regular customers |

For a production store at launch: support one coupon code mechanism and a free shipping threshold. Build additional discount complexity when you have data showing specific use cases.

---

## Price Changes After Launch

Prices will change. Your architecture needs to handle this cleanly.

- **Never change the price on an existing order.** Orders are immutable financial records. The price on an order is the price the customer paid — for accounting, tax, and dispute resolution purposes.
- **Variant price changes apply to future orders only.**
- **For sales, use a `compare_at_price` field** — the original price shown as struck-through. This requires a schema field, not just a UI hack.
- **Price change history is useful for analytics** — consider a price history table if you run frequent promotions.

```
Variant fields:
  price:            799   ← current selling price
  compare_at_price: 999   ← shown as original/crossed-out price (nullable)
```

---

## Pricing Strategy Checklist

- [ ] I have calculated my cost floor per product including all cost components and CAC contribution
- [ ] I have researched market rate for comparable products at my positioning level
- [ ] I have set prices that are internally consistent across my catalog
- [ ] I have an entry product, core products, and at least one premium anchor
- [ ] My target AOV supports my CAC from my primary acquisition channel
- [ ] I have decided whether I will support discount codes at launch
- [ ] I have decided on my free shipping threshold (if any) based on actual margin math
- [ ] I have added `compare_at_price` to my variant schema
- [ ] I have not built a discount-dependent launch strategy

---

## AI Prompt — Validate and Refine Your Pricing

```prompt
I am building a production e-commerce store. Help me validate my pricing strategy.

My store:
- Product type: [description]
- Brand positioning: [premium / mid-market / accessible]
- Target customer: [brief description]
- Target order volume: [e.g. "500 orders/month within 12 months"]
- Primary acquisition channel: [paid social / organic / email / marketplace]
- Estimated CAC from that channel: [amount]

My current pricing:
[List your products and planned prices]

My cost floor per product:
[List COGS + all fulfilment costs per product]

My questions:
1. Is my pricing internally consistent or does anything feel out of place?
2. Does my pricing match my stated brand positioning?
3. Does my AOV support my CAC, and if not, how should I adjust?
4. What is my implied gross margin and is it sustainable at production scale?
5. Should I adjust any prices based on perceived value vs. cost-floor analysis?
6. What free shipping threshold makes sense given my AOV and shipping costs?

Be direct. If a price is wrong, say so and explain why.
```

---

## What Comes Next

With pricing defined, you have everything needed to close out Phase 0. The final module ties your business definition, economics, and pricing into a scoped, buildable, and commercially validated MVP.

**Next: MVP Scope →**
