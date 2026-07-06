---
title: Business Definition
slug: business-definition
phase: Phase 0
mode: personal
projectType: e-commerce
estimatedTime: 20–25 min
---

# Business Definition

You are not just building a store. You are building a business.

A store without a clear business definition is a product catalog with a payment button. It has no positioning, no repeatable sales logic, and no foundation for growth decisions.

This module forces clarity on the four questions that determine whether your store has a real business behind it.

---

## The Four Questions

Every e-commerce business — from a solo Etsy competitor to a funded DTC brand — can be defined by answers to these four questions:

**1. What do you sell?**
Not a category. A specific, describable thing.

**2. Who buys it?**
Not "everyone." A specific, describable person.

**3. Why do they buy it from you instead of somewhere else?**
Not "quality" or "passion." A concrete, defensible reason.

**4. How does money flow?**
The unit economics behind a single transaction.

If you cannot answer all four clearly, your store is not ready to be architected.

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
- It scopes your search and filtering requirements

---

## Question 2 — Who Buys It?

You need one specific customer archetype, not a demographic range.

A useful archetype answers:
- What problem or desire drives the purchase?
- Where do they currently solve this problem?
- What makes them trust a store enough to pay?
- Are they buying once, or is there a reason to return?

> [!TIP]
> >
> If your target customer is "anyone who likes [category]," you have not defined a customer. You have defined a market. Markets don't buy things — people do.

**Repurchase potential matters for architecture.** A store whose customers have strong reasons to return needs customer accounts, order history, and email flows from day one. A store with primarily one-time buyers can defer those features safely.

---

## Question 3 — Why You?

This is your differentiation. Not your aspiration — your actual, present-tense reason a customer would choose your store over an existing alternative.

Common defensible differentiators for personal stores:

| Differentiator | What It Means |
|---|---|
| **Creator identity** | People buy because of *who* makes it |
| **Niche depth** | You serve a narrow interest better than generalists |
| **Aesthetic point of view** | Your design sensibility is the product |
| **Limited availability** | Scarcity is the value (limited runs, drops) |
| **Local/regional** | Geographic proximity or cultural specificity |
| **Customization** | Buyers get something made for them |

> ️ **Warning**
>
> "Better quality" and "made with love" are not differentiators. Every seller says this. A differentiator is something that is **structurally true about your business** that competitors cannot easily replicate.

Your differentiator also has technical implications. Customization requires different product architecture. Scarcity drops require timed inventory logic. Creator identity requires content and social integration.

---

## Question 4 — How Does Money Flow?

Map a single transaction before you build anything.

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
──────────────────────
Gross profit per order: ₹716
──────────────────────
Platform/hosting cost (monthly, amortized): ~₹20/order
──────────────────────
Net per order: ~₹696
```

You do not need a spreadsheet. You need to know:

- What does one unit cost you to produce or source?
- What does one order cost to ship and package?
- What does your platform/hosting cost per month, divided by expected order volume?
- What is your payment processor's fee?
- What margin remains?

If the margin doesn't support the business, this is the cheapest possible moment to discover that.

---

##  Business Definition Checklist

- [ ] I can describe what I sell in one specific sentence
- [ ] I have identified one primary customer archetype with a clear purchase motivation
- [ ] I know whether my customers are likely to repurchase (this affects account and email architecture)
- [ ] I have identified one concrete differentiator that is structurally true today
- [ ] I have calculated gross profit on a single transaction
- [ ] My margin is viable after COGS, shipping, packaging, and payment fees
- [ ] My differentiator has been checked for technical implications I need to plan for

---

## AI Prompt — Stress-Test Your Business Definition

```
I am building a personal e-commerce store with the following definition:

- What I sell: [your answer]
- My primary customer: [your answer]
- Why they buy from me: [your answer]
- Unit economics: sells for [price], costs [COGS + shipping + packaging] to fulfill

Stress-test this definition:
1. Is my differentiation actually defensible or just aspirational?
2. Are there structural weaknesses in my unit economics I might be missing?
3. Does my customer archetype have genuine repurchase potential?
4. What is the most likely reason this store fails in the first 6 months?
5. What one thing should I validate before investing in full development?

Be direct. Do not be encouraging for its own sake.
```

---

## What This Unlocks

A clear business definition is not a business plan document. It is an engineering input.

It tells you:
- Which features are load-bearing (must exist at launch)
- Which features are speculative (build after you have customers)
- What your data model needs to support from day one
- Where to invest design effort

Every technical decision in Phase 1 and Phase 2 should be traceable back to this definition.

**Next: Brand Vision →**
