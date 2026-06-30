---
title: Cost Estimation
slug: cost-estimation
phase: Phase 2
mode: personal
projectType: e-commerce
estimatedTime: 20–30 min
---

# Cost Estimation

Most solo developers underestimate running costs until the first billing cycle hits. Then they scramble to cut services they've already built around.

Cost estimation is not accounting. It's architecture. Knowing what things cost before you build them determines which services you choose, which features you defer, and how you price your products.

This module breaks down every cost layer of a personal e-commerce store — from zero sales to sustainable operation.

---

## Cost Categories

```
Infrastructure   →  Hosting, database, storage, CDN
Payments         →  Transaction fees (unavoidable)
Services         →  Email, search, monitoring
Domain           →  Annual fixed cost
```

Payments are the only cost that scales directly with revenue. Everything else should be near-zero until you have meaningful traffic.

---

## Infrastructure Costs

### Recommended Stack — Free Tier Limits

| Service | Free Tier | Paid Starts At | When You'll Hit the Limit |
|---|---|---|---|
| **Vercel** | 100GB bandwidth, hobby projects | $20/month (Pro) | When you need team features or >100GB/month |
| **Supabase** | 500MB DB, 1GB storage, 50k MAU | $25/month (Pro) | ~500 products with images, or 50k active users |
| **Resend** | 3,000 emails/month | $20/month | ~3,000 orders/month |
| **Cloudflare** (optional CDN) | Unlimited bandwidth | Free for most use cases | Almost never for a personal store |

**Realistic monthly cost at launch: $0**

**Realistic monthly cost at 100 orders/month: $0–5**

**Realistic monthly cost at 1,000 orders/month: $25–50**

---

### Storage Cost Breakdown

Product images are your biggest storage consumer.

```
Average product image (WebP, optimized): ~150KB
10 images per product × 50 products = 500 images
500 × 150KB = ~75MB
```

Supabase free tier includes 1GB storage. You have room for ~6,600 optimized product images before hitting the limit. For a personal store, the free tier lasts indefinitely.

---

## Payment Processing Costs

Stripe pricing (as of 2025):

| Transaction Type | Fee |
|---|---|
| Card (domestic) | 2.9% + $0.30 |
| Card (international) | 3.9% + $0.30 |
| Apple Pay / Google Pay | Same as card |

**This fee is unavoidable.** Every payment processor charges it. Stripe is competitive — don't switch to save 0.1%.

**What it means for your pricing:**

| Product Price | Stripe Fee | You Receive |
|---|---|---|
| $25.00 | $1.03 | $23.97 |
| $50.00 | $1.75 | $48.25 |
| $100.00 | $3.20 | $96.80 |
| $200.00 | $6.10 | $193.90 |

> **Tip:** Factor Stripe fees into your pricing before launch. If your margin is tight at $25 and you forgot the $1.03 fee, you may be losing money on every sale. Most merchants round up prices to clean numbers that absorb the fee comfortably.

**Refunds:** Stripe does not return the transaction fee on refunds. A $50 refund costs you $1.75 — the fee is gone. This is industry standard. Build your return policy around it.

---

## Domain Cost

| Registrar | .com Price | Notes |
|---|---|---|
| Cloudflare Registrar | ~$10/year | At-cost pricing, no markup |
| Namecheap | ~$9–14/year | Competitive, good management UI |
| Google Domains (now Squarespace) | ~$12/year | Simple, reliable |

Buy through Cloudflare Registrar if possible — they charge wholesale price with no markup. Avoid GoDaddy's headline prices; renewal rates are significantly higher.

**Tip:** Buy for 2–3 years upfront. Renewing annually risks forgetting and losing your domain.

---

## Optional Services and Their Costs

These are not needed at launch. Add them when the problem they solve is real.

| Service | Purpose | Cost | Add When |
|---|---|---|---|
| **Algolia** | Fast product search | Free up to 10k records | 50+ products with search demand |
| **Sentry** | Error tracking | Free up to 5k errors/month | Before any real traffic |
| **PostHog** | Analytics + session replay | Free up to 1M events | When you want conversion insights |
| **Loops / Klaviyo** | Marketing email | Free tiers available | When building email list |
| **Shippo / EasyPost** | Shipping rate calculation | Per-label fees | When comparing carrier rates matters |
| **TaxJar / Avalara** | Tax calculation | $19–99/month | Multi-state/country tax compliance |

---

## Cost at Scale — Three Scenarios

### Scenario A — Side Project (0–50 orders/month)
```
Infrastructure:   $0   (all free tiers)
Domain:           $0.83/month ($10/year)
Stripe fees:      ~$45–100 on $1,500–3,000 revenue
─────────────────────────────────────────
Total fixed:      ~$1/month
```

### Scenario B — Growing Store (50–500 orders/month)
```
Vercel Pro:       $20/month
Supabase Pro:     $25/month
Resend:           $0 (within free tier)
Domain:           $0.83/month
Stripe fees:      ~$450–800 on $15k–25k revenue
─────────────────────────────────────────
Total fixed:      ~$46/month
```

### Scenario C — Established Store (500–2,000 orders/month)
```
Vercel Pro:       $20/month
Supabase Pro:     $25/month
Resend paid:      $20/month
Sentry:           $0 (free tier)
PostHog:          $0 (free tier)
Domain:           $0.83/month
Stripe fees:      ~$2,000–4,000 on $60k–120k revenue
─────────────────────────────────────────
Total fixed:      ~$66/month
```

At Scenario C scale, infrastructure is less than 0.1% of revenue. Stripe fees are your real cost of doing business.

---

## Hidden Costs Most People Miss

> **Chargeback fees.** Stripe charges $15 per dispute, win or lose. One fraudulent order can erase profit from 5–10 legitimate orders. Implement Stripe Radar (free) and review large orders manually.

> **Return shipping.** If you offer free returns, you're absorbing return shipping costs. Build this into your margin or cap it ("free returns on orders over $X").

> **Photography.** Product photos are not free. Budget for either professional photography or equipment if doing it yourself. Poor photos directly reduce conversion — this is not optional.

> **Your time.** Order fulfillment, customer support, inventory management, and content creation are ongoing labor costs. If you're doing everything yourself, calculate the hourly time cost honestly.

---

## Pricing Your Products to Cover Costs

Work backwards from your costs:

```
Target margin after all costs:    40%
Product cost (COGS):              $20
Stripe fee (on $50 sale):         $1.75
Shipping (if absorbed):           $5
─────────────────────────────────
Total cost:                       $26.75
Required revenue for 40% margin:  $26.75 / 0.60 = $44.58
Round to clean price:             $45.00
```

> **Warning:** "I'll figure out pricing later" is how stores lose money on every sale. Run this calculation for every product before launch.

---

## AI Prompt — Build Your Cost Model

<copy-prompt>
I'm building a personal e-commerce store and need a complete cost model before I start development.

My store details:
- Products: [what you sell, COGS per item]
- Expected catalog size: [number of products]
- Average product price: [your price range]
- Shipping: [who absorbs shipping cost — you or customer?]
- Return policy: [free returns / customer pays / no returns]
- Expected monthly orders at launch: [your estimate]
- Stack: Next.js + Supabase + Stripe + Vercel + Resend

Build me a cost model that includes:
1. Monthly infrastructure cost at 0, 50, 200, and 500 orders/month
2. Stripe fee calculation at each volume level
3. Break-even analysis — how many orders/month do I need to cover all costs?
4. Product pricing recommendation that accounts for all fees and achieves [X]% margin
5. Hidden costs I'm likely to miss for my specific product type
6. When I should upgrade from free tiers to paid plans (based on specific thresholds, not vague guidance)

Output as a structured cost table I can refer back to.
</copy-prompt>

---

## Cost Estimation Checklist

- [ ] Infrastructure cost estimated at 0, 100, and 500 orders/month
- [ ] Stripe fee calculated for your average order value
- [ ] Stripe refund fee policy understood (fees not returned on refunds)
- [ ] Domain purchased for 2–3 years upfront
- [ ] Chargeback risk acknowledged — Stripe Radar enabled
- [ ] Product pricing recalculated to include Stripe fees, COGS, and shipping
- [ ] Free tier limits documented — know when each service requires upgrade
- [ ] Photography cost budgeted
- [ ] Return shipping cost decided and reflected in pricing or policy
