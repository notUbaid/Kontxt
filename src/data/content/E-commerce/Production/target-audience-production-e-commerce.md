---
title: Target Audience
slug: target-audience
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Target Audience

Every store is built for someone. The more precisely you define that person, the better every downstream decision becomes — what to sell, how to price it, what the store looks like, what copy resonates, which marketing channels to use, and how to segment your analytics.

Vague audiences produce vague stores. A vague store competes on price and loses.

---

## Why This Comes Before Everything Else

Most builders skip audience definition and go straight to building. They end up with a store that is a solution looking for a problem — technically functional but commercially inert.

In a production context, audience definition is even more critical. It drives not just marketing strategy, but your personalisation architecture, your email segmentation strategy, your analytics event taxonomy, and your product roadmap. Spend real time here.

---

## The Three Layers of Audience Definition

### Layer 1: Demographics (Who They Are)

Surface-level but necessary. Establish the basics:

- Age range
- Geographic distribution (domestic-only, regional, international)
- Employment or life stage (student, professional, parent, retiree)
- Income bracket (budget-conscious, mid-range, willing to spend on things they care about)

> [!WARNING]
> Demographics alone are useless for positioning. "Women aged 25–40" is not an audience. It is a census category.

---

### Layer 2: Psychographics (How They Think)

This is where useful audience definition lives.

- What do they care about deeply?
- What frustrates them about existing solutions?
- What do they aspire to?
- What are they willing to pay a premium for?
- What do they read, watch, follow?
- Where do they discover new products?

**Example:**
> Not just "developers" — but developers who are particular about their physical workspace, believe their environment affects their output, follow minimal design accounts, and will spend $150 on a desk accessory without hesitation if the quality is obvious.

The psychographic portrait tells you what language to use, what the store should feel like, what they will pay, and how to target your paid acquisition later.

---

### Layer 3: Behavioral (What They Do)

- How do they currently solve the problem your store addresses?
- Where do they shop now (Amazon, Etsy, brand DTC sites)?
- How do they discover new products (Instagram, Reddit, newsletters, word of mouth)?
- How often do they buy in this category?
- What triggers a purchase decision?

Behavioral data tells you where to reach them, what buying process to design for, and which channels your paid marketing budget should prioritise.

---

## Build Your Audience Portrait

Fill this out. Write in sentences, not fragments.

```
Primary Customer Portrait

Name (fictional): 
Age:
Location / market:
Life stage:
Income level:

What they care about most:

What frustrates them about existing options:

What they are willing to pay a premium for:

Where they discover products like yours:

What triggers them to buy:

Estimated annual spend in this category:

One sentence that captures this person:
```

> The one-sentence capture is the most important output. Example:
> *"A 28-year-old remote engineer in a mid-sized city who optimises their home office like a professional studio and trusts brands that show craft over brands that shout discount."*

---

## Primary vs Secondary Audiences

Most stores have one primary audience and one or two secondary audiences.

Design for your primary. Do not compromise the primary experience to accommodate secondary audiences.

**Example:**
- Primary: Home-office developers who buy for themselves
- Secondary: Colleagues purchasing gifts for developers

The store is designed for the primary. The secondary benefits through specific features (gift wrapping, gifting copy, gift receipt support) — not through a fundamentally different store architecture.

> [!TIP]
> If you find yourself designing for two equally important audiences with fundamentally different needs, you have two stores, not one. Pick one for the current build.

---

## Audience Segmentation for Production Stores

At production scale, a single audience definition is a starting point, not an ending point. Plan ahead for segmentation:

- **Acquisition segments**: Where different customer cohorts come from (paid search, organic, referral, email)
- **Behavioral segments**: First-time buyers vs. returning customers vs. VIP customers
- **Product segments**: Customers who buy different product categories behave differently

Your initial audience definition should identify which of these segments you expect to be most valuable — your analytics architecture in Phase 6 will track them properly.

---

## Validate Your Audience Assumption

Before committing, pressure-test the audience you've defined.

**Three validation questions:**

1. **Can I find them?** Are there communities, forums, subreddits, newsletters, or social accounts where this exact person congregates? If you cannot find where they gather, you will struggle to reach them at any scale.

2. **Do they currently spend money in this category?** Enthusiasm is not the same as purchasing behaviour. Find evidence that people like your target customer actually buy products like yours.

3. **Is the audience large enough to sustain a business at scale?** A production store requires a market large enough to support consistent volume. Verify the total addressable market before over-engineering for scale.

---

## Use AI to Sharpen Your Audience Portrait

```prompt
I am building a production e-commerce store. Here is my initial audience definition:

[Describe your audience as specifically as you can right now]

And here's what I plan to sell:

[Describe your product category]

Help me sharpen this audience definition by:
1. Identifying the most specific, believable version of this customer
2. Describing their psychographic profile in 3–5 sentences
3. Naming 3 places online where this exact person spends time
4. Identifying the single most important thing they want that existing stores do not give them
5. Estimating the rough market size and whether it supports a scalable business
6. Flagging any assumptions I am making that could be wrong

Be direct. If my audience definition is too broad, tell me exactly how to narrow it.
```

> [!IMPORTANT]
> Evaluate the output critically:
> - Does the psychographic portrait feel like a real person, not a marketing persona?
> - Are the online communities ones you can actually find and verify?
> - Is the "thing existing stores don't give them" something your store could credibly deliver?
> - Is the market size estimate realistic given your category?

---

## A Note on Audience Evolution

Your first audience definition is a hypothesis, not a fact.

You will learn more about your real customer in the first 90 days after launch than in all the planning beforehand. Build your audience definition with enough precision to make architectural and marketing decisions, but instrument your analytics to let real data sharpen it over time.

Document your current assumptions. Build dashboards to measure them. Revisit after your first 100 orders.

---

## Validate Before You Move On

- [ ] Primary customer portrait written out in full
- [ ] One-sentence customer capture written
- [ ] Secondary audience identified (or consciously ruled out)
- [ ] At least 2 online communities where this customer gathers — verified, not assumed
- [ ] Evidence that this customer actually spends money in your category
- [ ] Audience is specific enough that you could write a 3-line ad targeting exactly them
- [ ] Rough market size estimate confirms this can support a scalable production business

---

> **Next module:** Value Proposition →
>
> With your customer defined, you will articulate exactly why they should buy from your store instead of every other option available to them.
