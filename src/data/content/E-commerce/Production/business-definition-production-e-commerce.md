---
title: Business Definition
slug: business-definition
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–25 min
---

# Business Definition

You are not just building a store. You are building a business.

A store without a clear business definition is a product catalog with a payment button. It has no positioning, no repeatable sales logic, and no foundation for growth decisions. At production scale, this ambiguity compounds — unclear business definitions lead to unfocused marketing spend, incoherent product roadmaps, and teams building features that serve no defined customer.

This module forces clarity on the four questions that determine whether your store has a real business behind it.

---

## The Four Questions

Every e-commerce business — from a DTC startup to an established brand — can be defined by answers to these four questions:

**1. What do you sell?**
Not a category. A specific, describable thing with a defined scope.

**2. Who buys it?**
Not "everyone." A specific, describable person with a clear purchase motivation.

**3. Why do they buy it from you instead of somewhere else?**
Not "quality" or "passion." A concrete, defensible reason that will remain true as you scale.

**4. How does money flow?**
The unit economics behind a single transaction — and what they imply about sustainability at volume.

If you cannot answer all four clearly, your store is not ready to be architected or funded.

---

## Question 1 — What Do You Sell?

Be specific enough that a stranger could immediately understand your catalog boundaries.

| Too Vague | Specific |
|---|---|
| Handmade goods | Hand-poured soy candles in minimalist vessels, 8 scents |
| Fashion | Unisex streetwear tees, limited runs of 50, screen-printed |
| Digital products | Notion templates for freelance client management |
| Art | A4 risograph prints, 2-color, urban architecture subjects |

Specificity matters for three engineering reasons:

- It determines your variant model (do you need sizes? colors? formats?)
- It determines your inventory approach (limited runs vs. restockable vs. infinite digital)
- It scopes your search, filtering, and catalog management requirements

At production scale, catalog scope also determines your **operational complexity**: how many SKUs you need to track, how frequently you need to reorder, what your warehouse or fulfilment workflow looks like, and whether you need a proper PIM (Product Information Management) system.

---

## Question 2 — Who Buys It?

You need one specific customer archetype, not a demographic range.

A useful archetype answers:
- What problem or desire drives the purchase?
- Where do they currently solve this problem?
- What makes them trust a store enough to pay?
- Are they buying once, or is there a reason to return?

> [!TIP]
> If your target customer is "anyone who likes [category]," you have not defined a customer. You have defined a market. Markets do not buy things — people do.

**Repurchase potential matters for architecture.** A store whose customers have strong reasons to return needs customer accounts, order history, email flows, loyalty mechanics, and retention analytics from day one. A store with primarily one-time buyers needs to focus on first-purchase conversion and referral mechanics.

At production scale, customer lifetime value (LTV) is often more important than conversion rate. A customer who buys once and never returns is worth far less than one who buys five times over two years, even if the first conversion rate is lower.

---

## Question 3 — Why You?

This is your differentiation. Not your aspiration — your actual, present-tense reason a customer would choose your store over an existing alternative. And critically: a reason that will remain defensible as you grow.

Common defensible differentiators for production stores:

| Differentiator | What It Means | Scalability |
|---|---|---|
| **Proprietary product** | You make something others cannot replicate | High |
| **Brand equity** | Trust built over time through quality and consistency | High |
| **Niche depth** | You serve a narrow interest better than generalists | Medium |
| **Community** | Customers are part of something, not just buyers | High |
| **Creator identity** | People buy because of *who* makes it | Medium (personal brands scale differently) |
| **Limited availability** | Scarcity is the value (limited runs, drops) | Deliberate |
| **Customisation** | Buyers get something made for them | Medium (complex to scale operations) |

> [!WARNING]
> "Better quality" and "made with love" are not differentiators. Every seller says this. A differentiator is something that is **structurally true about your business** that competitors cannot easily replicate. At production scale, that structural truth becomes your competitive moat.

Your differentiator also has technical implications. Customisation requires different product architecture. Scarcity drops require timed inventory logic. Community requires content infrastructure and social proof systems. Consider the engineering requirements before committing.

---

## Question 4 — How Does Money Flow?

Map a single transaction completely before you build anything.

```
Customer pays ₹1,200 for one unit
         ↓
Payment gateway fee: ~2% = ₹24
         ↓
Product cost (materials/COGS): ₹350
         ↓
Shipping cost: ₹80
         ↓
Packaging: ₹30
         ↓
Returns provision (3–5% of revenue amortised): ~₹48
──────────────────────
Gross profit per order: ₹668
──────────────────────
Platform/hosting cost (monthly, amortised at target volume): ~₹20/order
Acquisition cost (CAC, amortised per order): ₹150
──────────────────────
Contribution margin per order: ~₹498
```

At production scale, you need to know:

- What does one unit cost you to produce or source?
- What does one order cost to ship, package, and handle returns on?
- What does your platform/hosting cost per month, divided by your target order volume?
- What is your payment processor's fee — and does it change at volume?
- What is your Customer Acquisition Cost, and does your margin support it?
- What is one customer worth over their lifetime (LTV)?

The unit economics that work at 50 orders/month may not work at 5,000 orders/month if your infrastructure costs do not scale proportionally. Model this now.

---

## Business Definition Checklist

- [ ] I can describe what I sell in one specific sentence
- [ ] I have identified one primary customer archetype with a clear purchase motivation and repurchase potential
- [ ] I have identified one concrete differentiator that is structurally defensible and will scale
- [ ] I have calculated gross profit on a single transaction including all cost components
- [ ] My margin is viable after COGS, shipping, packaging, payment fees, and returns provision
- [ ] I have estimated my CAC from my intended acquisition channel and confirmed margin supports it
- [ ] I know whether my customers are likely to repurchase (this affects account, email, and retention architecture)
- [ ] My differentiator has been checked for technical implications I need to plan for

---

## AI Prompt — Stress-Test Your Business Definition

```prompt
I am building a production e-commerce store with the following definition:

- What I sell: [your answer]
- My primary customer: [your answer]
- Why they buy from me: [your answer]
- Target order volume: [e.g. "500 orders/month within 12 months"]
- Unit economics: sells for [price], costs [COGS + shipping + packaging] to fulfil
- Intended acquisition channel: [paid social / organic / marketplace / email]

Stress-test this definition:
1. Is my differentiation actually defensible at production scale, or does it erode as I grow?
2. Are there structural weaknesses in my unit economics at higher volume?
3. Does my customer archetype have genuine repurchase potential, and what would drive it?
4. Does my intended acquisition channel make sense given my margin structure?
5. What is the most likely reason this business stalls in the first 12 months?
6. What one thing should I validate before committing to full development?

Be direct. Do not be encouraging for its own sake.
```

---

## What This Unlocks

A clear business definition is not a business plan document. It is an engineering input.

It tells you:
- Which features are load-bearing (must exist at launch)
- Which features support growth (build after you have revenue)
- What your data model needs to support from day one
- Where to invest design and infrastructure effort
- How your analytics and attribution need to be structured

Every technical decision in Phase 1 and Phase 2 should be traceable back to this definition.

**Next: Brand Vision →**
