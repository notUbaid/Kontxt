---
title: Business & Monetization
slug: business-monetization
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 35–50 min
---

# Business & Monetization

Every decision you make about your product is also a business decision. Features, architecture, pricing, and go-to-market are not separate tracks — they're the same track viewed from different angles.

This module is not about building a financial model. It's about making three decisions that will shape your product before you write a line of code: how you charge, how much you charge, and how the business actually sustains itself.

Get these wrong in Phase 0 and you'll be retrofitting a business model onto a product that wasn't designed to support it.

---

## The Three Monetization Decisions

Everything in this module flows from three foundational choices:

1. **Pricing model** — the mechanism by which users pay you
2. **Pricing strategy** — the logic by which you set the amount
3. **Revenue architecture** — how money actually moves through your product

Make these in order. Each constrains the next.

---

## Decision 1 — Pricing Model

Your pricing model is the structure of how you charge. It lives in your product, your database, and your infrastructure — not just on your pricing page. Choose it before you build anything.

<details>
<summary><strong>Per-Seat (User-Based)</strong></summary>

You charge per user account on a recurring basis.

**Works best when:** Value scales with the number of people using the product. Collaboration tools, CRMs, project management tools.

**Advantages:** Predictable revenue. Easy for customers to understand. Scales naturally with customer growth.

**Risks:** Customers resist adding seats to control costs. Teams share logins. Enterprise buyers negotiate hard on seat counts.

**Infrastructure implication:** You need user management, seat limits, and upgrade flows from day one.

**Examples:** Slack, Linear, Notion, Figma

</details>

<details>
<summary><strong>Usage-Based</strong></summary>

You charge based on how much of your product the customer consumes — API calls, rows processed, messages sent, documents generated.

**Works best when:** Value is directly proportional to usage. Infrastructure tools, AI products, communication APIs.

**Advantages:** Aligns price with value delivered. Low barrier to start. Scales with customer success.

**Risks:** Unpredictable revenue. Customers optimize to minimize usage. Hard to forecast for both sides.

**Infrastructure implication:** You need metering, usage tracking, and billing infrastructure from day one. This is non-trivial.

**Examples:** Stripe, Twilio, OpenAI, Cloudflare Workers

</details>

<details>
<summary><strong>Flat-Rate Subscription</strong></summary>

One price, all features, unlimited usage.

**Works best when:** Usage is roughly uniform across customers and value is hard to meter. Productivity tools, content tools, simple SaaS.

**Advantages:** Simplest to build and communicate. No metering infrastructure. Customers love predictability.

**Risks:** Heavy users are subsidized by light users. Hard to move upmarket. Revenue ceiling without plan tiers.

**Infrastructure implication:** Simplest billing model. Stripe subscription with a single price ID.

**Examples:** Basecamp, HEY, many early-stage SaaS products

</details>

<details>
<summary><strong>Tiered Plans</strong></summary>

Multiple plans at different price points, each unlocking more features, seats, or usage.

**Works best when:** You serve multiple customer segments with meaningfully different needs and willingness to pay.

**Advantages:** Captures more value across segments. Creates natural upgrade path. Freemium entry possible.

**Risks:** Too many tiers create decision paralysis. Tiers designed wrong cannibalize each other. More complex to build and maintain.

**Infrastructure implication:** Feature flags, plan enforcement, and upgrade flows needed. More billing complexity.

**Examples:** GitHub, Notion, Linear, most mature SaaS products

</details>

<details>
<summary><strong>Freemium</strong></summary>

A free tier with genuine value, and paid tiers that unlock more.

**Works best when:** You have a strong network effect or viral loop, low marginal cost per free user, and a clear ceiling the free tier hits naturally.

**Risks:** Free users are expensive. Conversion rates are typically 2–5%. Without a strong upgrade trigger, most users stay free forever.

**This is a go-to-market strategy, not a business model.** Freemium only works when the free tier creates demand for the paid tier — not just goodwill.

**Infrastructure implication:** Everything Tiered Plans requires, plus cost controls to prevent free tier abuse.

</details>

---

## Decision 2 — Pricing Strategy

Once you know the model, you set the number. Most founders get this wrong in the same direction: they charge too little.

### Why founders underprice

- They compare their product to the cheapest alternative, not the most valuable one
- They haven't internalized the outcome their product delivers
- They're afraid of rejection and conflate low price with low risk
- They underestimate the operational cost of supporting cheap customers at volume

### The right starting point: outcome-based pricing

Price relative to the value you deliver, not the cost of building what you built.

Ask: **what is the outcome worth to the user?**

If your product saves an operations manager 5 hours per week, and their time is worth $50/hour, that's $250/week or $1,000/month in recovered value. Charging $49/month is not bold pricing — it's a 95% discount on the value delivered.

A simple framework:

```
Outcome value per month  ×  Capture rate  =  Target price

$1,000/month             ×  10–20%        =  $100–200/month
```

The capture rate (what percentage of value you charge for) typically ranges from 10–30% for SaaS. Below 10% and you're leaving money on the table. Above 30% and you're making it hard to justify the ROI.

### Anchoring to alternatives

If outcome value is hard to quantify, anchor to the cost of the alternative:

- If users are replacing a manual process: price relative to the time saved
- If users are replacing a more expensive tool: price at a meaningful discount to that tool
- If users are replacing a human hire: price as a fraction of that hire's monthly cost

### The three-tier default

If you're launching with tiered pricing and don't have strong data yet, a proven starting structure for B2B SaaS:

| Tier | Target | Price Range | Purpose |
|---|---|---|---|
| **Starter** | Individual / solo | $29–$79/mo | Low-friction entry. Converts trials. |
| **Growth** | Small teams | $99–$299/mo | Your primary revenue tier. Most customers land here. |
| **Pro / Business** | Larger teams | $299–$999/mo | Captures high-value customers. Anchors the middle. |

The middle tier is your real product. The bottom tier converts trials. The top tier makes the middle look reasonable.

---

## Decision 3 — Revenue Architecture

This is how money actually flows through your product technically and operationally.

### Payment infrastructure

For most SaaS products, **Stripe** is the default choice. It handles subscriptions, invoicing, metering, trials, upgrades, downgrades, refunds, tax, and compliance in most markets.

Do not build payment infrastructure yourself. The only reason to consider an alternative to Stripe is geographic coverage (Stripe isn't available everywhere) or specific enterprise requirements.

Key Stripe concepts to understand before building:

- **Customer** — a Stripe object representing a paying account
- **Product + Price** — what you're selling and at what cadence
- **Subscription** — the recurring billing relationship
- **Payment Intent** — a single charge attempt
- **Webhook** — how Stripe notifies your system of payment events

Your backend must listen to Stripe webhooks and keep your own database in sync with subscription state. This is where most payment bugs live.

### Trial strategy

Trials are a product decision, not just a marketing decision. They affect conversion, infrastructure, and support load.

| Trial Type | How It Works | Best For |
|---|---|---|
| **Time-limited free trial** | Full access for 7–14 days, then payment required | Products with fast time-to-value |
| **Usage-limited trial** | Full access until a cap is hit (5 projects, 100 rows) | Products where value compounds over time |
| **Freemium** | Permanent free tier with upgrade triggers | Products with viral or network effects |
| **No trial / demo only** | Sales-led conversion | High-ACV enterprise products |

For most production SaaS targeting SMBs: a **14-day free trial with no credit card required** at signup, transitioning to credit card required at day 7 or at the point of getting real value, is the highest-converting default.

Requiring a credit card at signup reduces trial volume by 40–60% but increases trial-to-paid conversion significantly. Test both. Neither is universally right.

### The billing state machine

Your product must handle every billing state a user can be in. Failing to handle these correctly causes support debt, churn, and revenue loss:

```
Trial → Active → Past Due → Canceled → Reactivated
                          ↘ Paused ↗
```

For each state, define:
- What the user can access
- What the UI shows them
- What emails fire
- What happens after a grace period

Sketch this before you build. Retrofitting it is painful.

---

## Unit Economics: What You Need to Know

You don't need a full financial model in Phase 0. You need to understand three numbers and whether they make sense together.

**CAC — Customer Acquisition Cost**
What it costs to acquire one paying customer. Includes marketing spend, sales time, and tooling. You won't know this accurately until you're acquiring customers, but you should have a hypothesis.

**LTV — Lifetime Value**
Average revenue per customer × average customer lifetime. If customers pay $99/month and stay for 18 months on average, LTV = $1,782.

**LTV:CAC Ratio**
The ratio that determines whether your business is viable.

```
LTV:CAC of 3:1  →  Minimum viable. Borderline.
LTV:CAC of 5:1  →  Healthy. Sustainable growth possible.
LTV:CAC of 10:1 →  Excellent. You're underinvesting in growth.
```

If your pricing produces an LTV that can't support a reasonable CAC at your target margins, your pricing is too low or your customer lifetime is too short. Fix one of these before you build.

**Monthly Recurring Revenue (MRR) Target**
Set a specific, time-bound MRR target for 6 months post-launch. Not a vague goal — a number. "$5,000 MRR within 6 months of launch." This number drives how many customers you need, which drives your go-to-market strategy, which drives your launch decisions.

---

## Common Monetization Mistakes

> [!WARNING]
> **Adding freemium because it sounds safe**
>
> Freemium is a growth strategy that works when free users generate demand for paid tiers through virality, word of mouth, or network effects. If none of those apply to your product, freemium just means giving away value for free and hoping people upgrade. Start paid. Add freemium later if the data supports it.

---

> [!WARNING]
> **Pricing for the customer you wish you had**
>
> Charging $999/month before you have a single customer is optimistic. Charging $9/month because you think that's what people will pay is defeatist. Price for the customer you've actually spoken to, at the value they've actually described.

---

> [!WARNING]
> **Building billing as an afterthought**
>
> Billing is a core feature, not a Phase 4 concern. The billing state machine, Stripe webhook handling, plan enforcement, and upgrade flows need to be architected in Phase 2 and built in Phase 3 alongside the core product. Teams that treat billing as an afterthought spend weeks firefighting payment bugs right before launch.

---

> [!WARNING]
> **Too many pricing tiers**
>
> Three tiers is a ceiling for most early-stage SaaS. Every additional tier adds decision complexity for customers and maintenance complexity for you. If you're considering four or more tiers before you have 50 customers, cut until it hurts.

---

## Use AI to Pressure-Test Your Model

```prompt
I'm building a SaaS product with the following context:

Value Proposition: [paste yours]
Target User: [describe]
Primary Competitor Pricing: [describe how competitors charge]
Existing Alternative Cost: [what users currently spend to solve this]

My planned monetization:
- Pricing model: [per-seat / usage-based / flat / tiered / freemium]
- Price points: [describe your tiers or prices]
- Trial strategy: [describe]

Review this and tell me:

1. Is my pricing model well-matched to my value proposition and
   how value scales with usage?
2. Am I pricing significantly above or below comparable products
   in this category? Is that gap justified?
3. What is the most likely reason a user would not upgrade from
   trial to paid at this price point?
4. Does my trial strategy match my product's time-to-value?
   Will users experience the core value before the trial ends?
5. What would I need to believe to be true for this monetization
   model to produce a sustainable business?

Be specific. Challenge assumptions.
```

---

## Validation Checklist

- [ ] I've chosen a specific pricing model and understand its infrastructure implications
- [ ] My price is set relative to outcome value or alternative cost — not cost to build
- [ ] I have a defined trial strategy with a clear upgrade trigger
- [ ] I've sketched the billing state machine (trial, active, past due, canceled)
- [ ] I've identified Stripe as my payment infrastructure (or documented why not)
- [ ] I have a rough LTV:CAC hypothesis that produces a viable ratio
- [ ] I have a specific 6-month MRR target
- [ ] I've stress-tested my monetization model with the AI prompt

---

## Quick Reference

```
Pricing Models
────────────────────────────────────────────────
Per-seat      →  Charge per user. Scales with team size.
Usage-based   →  Charge per unit consumed. Needs metering.
Flat-rate     →  One price. Simplest to build.
Tiered        →  Multiple plans. Most flexible.
Freemium      →  Free tier + paid upgrade. Needs viral loop.

Pricing Formula
────────────────────────────────────────────────
Outcome value/month × capture rate (10–30%) = target price

Three-Tier Default
────────────────────────────────────────────────
Starter  →  $29–79/mo   Individual entry point
Growth   →  $99–299/mo  Primary revenue tier
Pro      →  $299–999/mo High-value anchor

Unit Economics
────────────────────────────────────────────────
LTV:CAC 3:1   →  Borderline viable
LTV:CAC 5:1   →  Healthy
LTV:CAC 10:1  →  Underinvesting in growth

Billing States to Handle
────────────────────────────────────────────────
Trial → Active → Past Due → Canceled → Reactivated
```
