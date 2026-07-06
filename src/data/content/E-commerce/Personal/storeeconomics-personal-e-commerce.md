---
title: Store Economics
slug: store-economics
phase: Phase 0
mode: personal
projectType: e-commerce
estimatedTime: 20–25 min
---

# Store Economics

Most personal stores are built before anyone checks if the numbers work. Then, months into development, the builder realizes the margin per order doesn't justify the infrastructure cost, or the platform fee eats half the profit, or free shipping is actually a loss leader they can't afford.

This module makes sure that doesn't happen to you.

---

## The Three Economic Layers

A store's economics operate at three levels. You need to understand all three before choosing your stack, your pricing, or your shipping strategy.

```
Layer 1 — Per-Order Economics
  Revenue per order minus direct costs of fulfilling it

Layer 2 — Platform Economics
  Fixed and variable costs of running the store itself

Layer 3 — Acquisition Economics
  Cost of getting a customer to the store in the first place
```

Personal stores commonly fail at Layer 2 (platform costs exceed revenue at low order volumes) or Layer 3 (no sustainable way to acquire customers without paid ads they can't afford).

---

## Layer 1 — Per-Order Economics

Map a single transaction completely.

### Revenue Side

| Item | Example |
|---|---|
| Product sale price | ₹1,500 |
| Shipping charged to customer | ₹0 (free shipping) or ₹99 |
| **Gross Revenue** | ₹1,500 or ₹1,599 |

### Cost Side

| Cost | Example | Notes |
|---|---|---|
| COGS (materials / wholesale) | ₹400 | What it costs to make or source one unit |
| Packaging | ₹50 | Box, tissue, tape, inserts |
| Shipping cost (you pay) | ₹120 | Actual carrier cost |
| Payment processing fee | ~2–3% of revenue | Razorpay: ~2%, Stripe: 2.9% + fixed fee |
| Returns provision | ~3–5% of revenue | Estimated cost of refunds amortized per order |

### Gross Profit Per Order

```
Gross Profit = Revenue − COGS − Packaging − Shipping − Payment Fee − Returns Provision
```

> ️ **Warning: Free Shipping Math**
>
> Offering free shipping means your shipping cost comes entirely out of margin. For low-AOV stores, free shipping can reduce gross profit by 20–40%. Run the numbers before making it your default.

---

## Layer 2 — Platform Economics

These are your fixed and semi-fixed monthly costs regardless of order volume.

| Cost Category | Common Options | Typical Monthly Cost |
|---|---|---|
| Hosting | Vercel, Railway, Render, DigitalOcean | ₹0–₹2,000 |
| Database | Supabase, PlanetScale, Neon, Railway Postgres | ₹0–₹1,500 |
| Email service | Resend, Postmark, SendGrid | ₹0–₹800 |
| File/image storage | Cloudflare R2, AWS S3, Supabase Storage | ₹0–₹500 |
| Search (if needed) | Algolia, Typesense Cloud | ₹0–₹2,000 |
| Domain | Any registrar | ~₹100/mo amortized |
| **Total** | | **₹100–₹6,800/mo** |

### The Break-Even Calculation

```
Monthly Platform Cost ÷ Gross Profit Per Order = Orders needed to break even on infrastructure
```

**Example:**
- Platform costs: ₹2,000/month
- Gross profit per order: ₹800
- Break-even: 2.5 orders/month

At that level, a personal store can be profitable on very low volume. If your numbers look like this — great. If platform costs are ₹8,000/month and gross profit is ₹200/order, you need 40 orders a month just to cover hosting.

>  **Tip: Start on Free Tiers**
>
> At launch, most personal stores can run entirely on free tiers — Vercel hobby, Supabase free, Resend free, Cloudflare R2 free. Your real platform cost at launch can be ₹0–₹300/month. Plan for scale, but don't pay for it before you need it.

---

## Layer 3 — Acquisition Economics

How do customers find your store? And what does it cost to get one?

| Channel | Cost | Scalability | Reliability |
|---|---|---|---|
| Organic social (Instagram, Pinterest) | Time only | Moderate | Unpredictable |
| SEO / organic search | Time only | High (slow) | High (long-term) |
| Word of mouth / referrals | ₹0 | Low | High |
| Paid social (Meta, Google) | ₹500–₹5,000+/month | High | Predictable but expensive |
| Marketplace (Etsy, Amazon) | 10–15% commission | High | High |
| Email list | Platform cost only | Moderate | Very high |

For a personal store at launch, paid acquisition is almost always the wrong choice unless you have validated margin to support it. Build organic channels first.

### Customer Acquisition Cost (CAC)

```
CAC = Total Marketing Spend ÷ Number of New Customers Acquired
```

Your store is sustainable when: **LTV > CAC × 3**

If a customer is worth ₹1,500 over their lifetime and it costs ₹600 to acquire them — that's a 2.5x ratio. Marginal. If acquisition costs drop to ₹300, it becomes a healthy 5x ratio.

You won't know these numbers at launch. But model the assumptions now so you know what you're aiming for.

---

## Shopify vs. Build-It Economics

Before Phase 2, you need to understand how platform choice affects economics.

| | Shopify Basic | Custom Build |
|---|---|---|
| Monthly platform fee | ~₹1,600–₹2,400/mo | ₹0–₹2,000/mo (infra) |
| Transaction fee (non-Shopify Payments) | 2% per order | 0% (gateway fee only) |
| Dev time to launch | Low | High |
| Customization ceiling | Medium | Unlimited |
| Ongoing maintenance | Low | High |
| Break-even order volume | ~10–15 orders/month | ~2–5 orders/month |

> ️ **The Hidden Shopify Cost**
>
> Shopify's 2% transaction fee (when not using Shopify Payments, which isn't available in India) compounds at scale. At ₹1,00,000/month GMV, that's ₹2,000/month in additional fees on top of the subscription — before payment gateway fees. For Indian stores, this matters.

This is covered in depth in Phase 2's Build vs. Buy module. For now, factor the platform fee into your economics model.

---

##  Store Economics Checklist

- [ ] I have calculated gross profit per order including COGS, packaging, shipping, and payment fees
- [ ] I know my gross margin percentage
- [ ] I have listed my monthly platform costs and identified which services I can run on free tiers at launch
- [ ] I have calculated how many orders per month I need to cover platform costs
- [ ] I have identified my primary customer acquisition channel at launch
- [ ] I have a rough estimate of what a repeat customer is worth over 12 months
- [ ] I have factored platform transaction fees into my per-order economics

---

## AI Prompt — Model Your Store Economics

```
I am building a personal e-commerce store. Help me model the economics.

Per-order inputs:
- Product sale price: [amount + currency]
- COGS (cost to make/source one unit): [amount]
- Packaging cost: [amount]
- Shipping cost I pay per order: [amount]
- Shipping I charge the customer: [amount or "free"]
- Payment processor: [Razorpay / Stripe / other] at approximately [rate]%

Platform inputs (monthly):
- Hosting: [service + estimated cost]
- Database: [service + estimated cost]
- Email: [service + estimated cost]
- Other: [list any others]

Acquisition:
- Primary channel: [organic social / SEO / referrals / paid / marketplace]
- Estimated monthly marketing spend: [amount or "₹0"]

Calculate:
1. Gross profit per order and gross margin %
2. Monthly orders needed to cover platform costs
3. Break-even analysis at 10, 25, and 50 orders/month
4. What my blended margin looks like if I offer free shipping above [threshold amount]
5. One economic risk I should address before launch
```

---

## What Comes Next

With your economics modeled, you can make informed decisions in Phase 2 about platform choice, payment provider, and shipping strategy — not based on what's popular, but based on what your numbers support.

**Next: Pricing Strategy →**
