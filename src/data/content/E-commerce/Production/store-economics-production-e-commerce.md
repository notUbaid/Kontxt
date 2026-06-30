---
title: Store Economics
slug: store-economics
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Store Economics

Most stores are built before anyone verifies that the numbers work. Then, months into development and operation, the team realizes the margin per order does not justify the infrastructure cost, or the platform fee compounds destructively at scale, or the CAC from paid acquisition is not sustainable given the LTV of the customer they are acquiring.

This module makes sure that does not happen to you — before you write a single line of code.

---

## The Four Economic Layers

A production store's economics operate at four levels. You need to understand all four before choosing your stack, your pricing, your acquisition strategy, or your shipping policy.

```
Layer 1 — Per-Order Economics
  Revenue per order minus direct costs of fulfilling it

Layer 2 — Platform Economics
  Fixed and variable costs of running the store itself

Layer 3 — Acquisition Economics
  Cost of getting a customer to the store in the first place

Layer 4 — Retention Economics
  Revenue from customers who return — the multiplier on all the above
```

Production stores most commonly fail at Layer 3 (CAC exceeds LTV) or Layer 4 (no retention mechanism means every customer must be re-acquired at full cost).

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
| Returns provision | ~3–5% of revenue | Estimated cost of refunds amortised per order |
| Fulfilment labour (if outsourced) | ₹30–₹80 | 3PL pick-and-pack fee, if applicable |

### Gross Profit Per Order

```
Gross Profit = Revenue − COGS − Packaging − Shipping − Payment Fee − Returns − Fulfilment Labour
```

> [!WARNING]
> **Free Shipping Math**: Offering free shipping means your shipping cost comes entirely out of margin. For low-AOV stores, free shipping can reduce gross profit by 20–40%. Run the numbers at your actual average order weight before making it your default. Consider a free shipping threshold (e.g. "free over ₹999") that preserves margin on smaller orders.

---

## Layer 2 — Platform Economics

These are your fixed and semi-fixed monthly costs regardless of order volume.

| Cost Category | Common Options | Typical Monthly Cost |
|---|---|---|
| Hosting | Vercel, Railway, Render, DigitalOcean | ₹0–₹5,000 |
| Database | Supabase, PlanetScale, Neon, Railway Postgres | ₹0–₹3,000 |
| Email service | Resend, Postmark, SendGrid | ₹0–₹2,000 |
| File/image storage | Cloudflare R2, AWS S3, Supabase Storage | ₹0–₹1,500 |
| Search (if needed) | Algolia, Typesense Cloud | ₹0–₹4,000 |
| CDN | Cloudflare, Fastly | ₹0–₹2,000 |
| Monitoring/observability | Sentry, Datadog, Grafana Cloud | ₹0–₹3,000 |
| Domain | Any registrar | ~₹100/mo amortised |
| **Total** | | **₹100–₹20,600/mo** |

### The Break-Even Calculation

```
Monthly Platform Cost ÷ Gross Profit Per Order = Orders needed to break even on infrastructure
```

**Example:**
- Platform costs: ₹8,000/month
- Gross profit per order: ₹800
- Break-even: 10 orders/month

At production scale, infrastructure costs grow with volume. Model how your platform costs scale from 100 to 1,000 to 10,000 orders/month — the inflection points where you move off free tiers or need to upgrade infrastructure are predictable if you plan ahead.

> [!TIP]
> At launch, most production stores can still start on free tiers for most services. Your real platform cost at launch can be ₹0–₹1,000/month. The critical discipline is knowing exactly when you will hit each tier limit and what the next cost level is.

---

## Layer 3 — Acquisition Economics

How do customers find your store? And what does it cost to acquire one who actually purchases?

| Channel | Cost | Scalability | Reliability | Production Fit |
|---|---|---|---|---|
| Organic social (Instagram, Pinterest) | Time only | Moderate | Unpredictable | Good for brand building, not reliable for revenue |
| SEO / organic search | Time only | High (slow) | High (long-term) | Essential at production scale |
| Word of mouth / referrals | ₹0 | Low | High | Amplified by referral programs |
| Paid social (Meta, Google) | ₹5,000–₹50,000+/month | High | Predictable | Primary acquisition channel at scale |
| Marketplace (Etsy, Amazon) | 10–15% commission | High | High | Useful for early validation and volume |
| Email list | Platform cost only | Moderate | Very high | Highest ROAS of any channel at scale |
| Influencer / affiliate | Variable | Moderate | Variable | Important at volume when CAC is validated |

### Customer Acquisition Cost (CAC)

```
CAC = Total Marketing Spend ÷ Number of New Customers Acquired
```

Your store is sustainable when: **LTV > CAC × 3**

If a customer is worth ₹4,500 over their lifetime and it costs ₹1,000 to acquire them — that is a 4.5x ratio. Healthy. If acquisition costs rise to ₹2,500 and LTV stays flat, the unit economics of growth collapse.

At production scale, you will need to track CAC by channel and optimise your spend mix. The channel with the lowest CAC should receive the most budget until it saturates.

---

## Layer 4 — Retention Economics

This is the multiplier that production stores depend on that lean stores often ignore.

```
Revenue without retention:
  Year 1 = N customers × AOV × purchase frequency
  Year 2 = N new customers × AOV × purchase frequency (same cost)

Revenue with retention:
  Year 1 = N customers × AOV × purchase frequency
  Year 2 = N new customers × AOV + (retained_customers × repeat_AOV × repeat_frequency)
         → Year 2 revenue grows without proportional marketing cost increase
```

Retention mechanics that production stores need:
- Email lifecycle flows (welcome, post-purchase, win-back, loyalty)
- Abandoned cart recovery
- Customer accounts with order history
- Loyalty or rewards programs (at scale)
- Personalised recommendations based on purchase history

Model your expected repurchase rate at 30, 60, and 90 days. Every 10 percentage points of improvement in 90-day return rate has a compounding effect on LTV that typically exceeds what you can achieve by optimising CAC.

---

## Platform Choice and Economics

Your platform choice has direct economic implications at production scale.

| | Shopify Basic | Shopify Plus | Custom Build |
|---|---|---|---|
| Monthly platform fee | ~₹1,600–₹2,400/mo | ~₹65,000–₹80,000/mo | ₹0–₹10,000/mo (infra) |
| Transaction fee (non-Shopify Payments) | 2% per order | 0.15–0.25% per order | 0% (gateway fee only) |
| Dev time to launch | Low | Low–Medium | High |
| Customisation ceiling | Medium | High | Unlimited |
| Ongoing maintenance | Low | Low–Medium | High |
| Break-even order volume | ~10–15 orders/month | Only viable at significant GMV | ~3–5 orders/month |

> [!WARNING]
> **The Shopify Transaction Fee Trap**: Shopify's 2% transaction fee (for non-Shopify Payments markets, including India) compounds at scale. At ₹10,00,000/month GMV, that is ₹20,000/month in additional fees on top of the subscription — before payment gateway fees. This is covered in depth in Phase 2's Build vs. Buy module. Factor the transaction fee into your per-order economics model now.

---

## Store Economics Checklist

- [ ] I have calculated gross profit per order including COGS, packaging, shipping, payment fees, and returns provision
- [ ] I know my gross margin percentage and it is sustainable at my target volume
- [ ] I have listed my monthly platform costs and modelled how they scale at 100, 1,000, and 10,000 orders/month
- [ ] I have calculated my break-even order volume
- [ ] I have identified my primary customer acquisition channel and estimated CAC from it
- [ ] I have modelled my LTV:CAC ratio at target volume
- [ ] I have estimated my 90-day repurchase rate and its impact on LTV
- [ ] I have factored platform transaction fees into my per-order economics

---

## AI Prompt — Model Your Store Economics

```prompt
I am building a production e-commerce store. Help me model the full economics.

Per-order inputs:
- Product sale price: [amount + currency]
- COGS (cost to make/source one unit): [amount]
- Packaging cost: [amount]
- Shipping cost I pay per order: [amount]
- Shipping I charge the customer: [amount or "free"]
- Payment processor: [Razorpay / Stripe / other] at approximately [rate]%
- Returns rate estimate: [%]
- Fulfilment labour (if outsourced): [amount or "none"]

Platform inputs (monthly):
- Hosting: [service + estimated cost]
- Database: [service + estimated cost]
- Email: [service + estimated cost]
- Other: [list any others]
- Platform transaction fee: [Shopify 2% / none / other]

Acquisition and retention:
- Primary acquisition channel: [organic / paid social / marketplace / SEO]
- Estimated monthly acquisition spend: [amount or "₹0"]
- Target customer LTV: [how many purchases over how long?]

Calculate:
1. Gross profit per order and gross margin %
2. Monthly orders needed to cover platform costs
3. Break-even analysis at 50, 500, and 5,000 orders/month
4. LTV:CAC ratio at my stated acquisition spend and LTV estimate
5. What my blended margin looks like if I offer free shipping above [threshold amount]
6. The single biggest economic risk I should address before launch
```

---

## What Comes Next

With your economics modelled at multiple volume levels, you can make informed decisions in Phase 2 about platform choice, payment provider, and shipping strategy — not based on what is popular, but based on what your numbers support at scale.

**Next: Pricing Strategy →**
