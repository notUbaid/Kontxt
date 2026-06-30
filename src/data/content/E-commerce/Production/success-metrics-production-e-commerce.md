---
title: Success Metrics
slug: success-metrics
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Success Metrics

Production stores fail silently in one of two ways: either the builder had no idea what success looked like until it was too late to change anything, or they tracked so many metrics that no single number drove action.

You need to define what winning means before you write a single line of code — and build the analytics infrastructure to measure it from day one.

---

## Why This Matters Before Development

Metrics defined after launch are rationalisations. Metrics defined before launch are decisions.

When you know your success criteria upfront:

- You build features that move those numbers, not features that feel interesting
- You know when to stop adding and start shipping
- You know whether your store is working or just existing
- You can justify technical tradeoffs using real data goals
- You have a baseline for every A/B test and optimisation experiment you will run post-launch

---

## The Production Store Framework

At production scale, tracking too few metrics means missing failure signals. Tracking too many means no one takes action on any of them.

The right structure is a small number of North Star metrics — the ones that tell you if the business is healthy — plus a supporting layer of diagnostic metrics that explain *why* the North Star is moving.

> [!NOTE]
> A 20-metric dashboard is noise. A focused dashboard of 5–8 metrics that are causally connected to your business model is enough to make sharp decisions.

Do not track vanity metrics. Track signal metrics.

| Vanity Metric | Signal Metric |
|---|---|
| Total page views | Unique visitors who reached product page |
| Total sessions | Sessions that added to cart |
| Social followers | Returning customers (30/60/90 day) |
| Orders created | Orders completed and paid |
| Email list size | Email open rate + click-to-purchase rate |

---

## The Metric Tiers

### Tier 1 — North Star Metrics

The primary indicators of store health. These get reviewed weekly.

| Metric | What It Tells You | Production Benchmark |
|---|---|---|
| **Conversion Rate** | % of visitors who purchase | 1–3% (category-dependent) |
| **Cart Abandonment Rate** | % who add to cart but do not buy | 65–80% is normal; above 85% is a problem |
| **Average Order Value (AOV)** | Revenue per completed order | Depends on your catalog — set your own baseline |
| **Return Customer Rate** | % of buyers who come back within 90 days | 25–35%+ is healthy at scale |
| **Gross Merchandise Value (GMV)** | Total revenue before returns and refunds | Your primary growth indicator |

### Tier 2 — Funnel Health Metrics

These explain *why* your North Star metrics are at their current levels.

| Metric | What It Tells You |
|---|---|
| **Product Page Conversion Rate** | Are your product pages convincing people to add to cart? |
| **Cart-to-Checkout Rate** | Are people abandoning between cart and checkout? |
| **Checkout Completion Rate** | Are people dropping off during checkout? |
| **Email Capture Rate** | Are visitors opting into your list? |
| **Search Usage + Zero-Result Rate** | Are people searching, finding things, or hitting dead ends? |

### Tier 3 — Business Health Metrics

Track these from launch to understand long-term viability.

| Metric | What It Tells You |
|---|---|
| **Customer Acquisition Cost (CAC)** | What does it cost to get one buyer? |
| **Customer Lifetime Value (LTV)** | What is one customer worth over 12 months? |
| **LTV:CAC Ratio** | Is your acquisition model sustainable? (Target: 3:1 or better) |
| **Month-over-Month GMV Growth** | Is the store growing? |
| **Refund and Return Rate** | Are customers satisfied with what they receive? |
| **Stock-out Rate** | Are you losing sales due to inventory gaps? |

---

## Define Your Targets

Do not copy generic benchmarks. Define targets grounded in your specific store, your catalog economics, and your acquisition model.

Use this framework:

**Minimum Viable** — the floor. If you hit this, the store is working at a basic level.

**Target** — what you are genuinely optimising for in the first 90 days post-launch.

**Stretch Goal** — aspirational but grounded in your market research.

Fill this out before moving to Phase 1:

```
Metric: Conversion Rate
Minimum Viable: _____%
Target: _____%
Stretch: _____%

Metric: Return Customer Rate (90-day)
Minimum Viable: _____%
Target: _____%
Stretch: _____%

Metric: LTV:CAC Ratio (by month 6)
Minimum Viable: 2:1
Target: 3:1
Stretch: 5:1
```

---

## Analytics Infrastructure Decision

Getting this right at launch is far cheaper than retrofitting it later. Choose your stack based on your compliance requirements, technical setup, and reporting needs.

| Tool | Best For | Cost |
|---|---|---|
| **Google Analytics 4** | E-commerce funnel tracking, free, industry standard | Free |
| **Mixpanel** | Event-level tracking, cohort analysis, user-level data | Free tier → $20/mo+ |
| **PostHog** | Self-hosted option, open source, feature flags, session replay | Free (self-hosted) |
| **Plausible** | Simple, privacy-first, GDPR-compliant | ~$9/mo |
| **Segment** | Data pipeline layer — routes events to multiple destinations | Free tier → $120/mo+ |

> [!IMPORTANT]
> For a production store, implement GA4 e-commerce tracking **from day one**. This includes purchase events, add-to-cart events, begin-checkout events, and refund events. Retrofitting full e-commerce event tracking after launch is painful and means losing early-stage data that will never be recoverable.

---

## AI Prompt — Define Your Success Metrics

```prompt
I am building a production e-commerce store selling [product type] targeting [audience].

My store will have approximately [number] products at launch.
My primary traffic sources: [organic search / paid social / email / referral / marketplace]
My acquisition model: [paid-first / organic-first / hybrid]
My target market: [domestic-only / regional / international]

Help me define:
1. The 5 most important metrics I should track for this specific store, with benchmarks
2. Realistic targets for each metric in the first 90 days post-launch
3. The funnel breakpoints I should instrument in my analytics (the events that explain why conversion moves)
4. A LTV model structure appropriate for my product category
5. The one leading indicator metric that would predict conversion rate problems before they become revenue problems

Structure the output as a metrics dashboard spec I can hand to a developer.
```

> [!NOTE]
> Use the output to define your analytics event taxonomy before you build Phase 3. The events your analytics needs to track must be designed into the codebase from the start — they cannot be tacked on afterwards.

---

## What Comes Next

Once your success metrics are defined, every decision in Phase 1 and beyond has a testable hypothesis attached to it.

When you are designing your checkout flow: *this decision should reduce cart abandonment rate*.

When you are choosing a product page layout: *this should improve add-to-cart rate for this category*.

That is the shift from guessing to engineering. At production scale, every major feature decision should be tied to a metric hypothesis and measured against it after shipping.

**Next: Store Fundamentals →**
