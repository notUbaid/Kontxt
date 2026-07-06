---
title: Demand Side
slug: demand-side
phase: Phase 0
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Demand Side (The Buyers)

You have defined your Supply. Now you must define your Demand with identical precision. In a production marketplace, the demand side brings the capital. If you fail to architect a conversion funnel tailored specifically to their risk profile and purchasing habits, your supply will churn from lack of sales.

A vague demand side leads to a generic homepage, unoptimized search indexing, and fundamentally broken unit economics.

---

## "Buyers" Is Not an Architectural Persona

Just like the supply side, "people who want to buy things" is an unacceptable persona in production. You must define a high-intent, measurable cohort.

**Weak:** "People who want to hire a pet sitter."

**Production-Grade:** "DINK (Dual Income, No Kids) professionals in Tier 1 cities who travel 4+ times a year for work, currently spending $1,500/year on corporate kennels, who will pay a 20% premium for vetted, in-home care."

This level of precision tells you exactly what to build: your UI must emphasize premium trust signals (insurance, background checks), and your pricing model can support higher take rates due to their high willingness to pay.

---

## The Trust Asymmetry

In a marketplace, the risk profiles of supply and demand are wildly asymmetric. 

A seller listing a service risks very little—at worst, nobody books them. A buyer, however, is risking actual capital (and sometimes their safety) by transacting with a stranger on an unproven platform. 

> [!WARNING]
> Do not assume that because sellers signed up, buyers will organically follow. The burden of manufactured trust falls entirely on your product architecture. If your platform does not objectively reduce the buyer's risk compared to their current alternative, they will not convert.

### Trust Engineering at Scale

You cannot rely on "personally vouching" for sellers at production scale. You must build systemic trust:

| Trust Vector | Architectural Implementation |
|---|---|
| **Identity Risk** | Mandatory KYC via Stripe Identity or Persona for all sellers before listing. |
| **Financial Risk** | Delayed payouts (Escrow). Funds are captured but not routed to the seller until the buyer confirms fulfillment. |
| **Quality Risk** | A mathematically robust, double-blind review system that prevents retaliatory reviews. |
| **Platform Risk** | A clear, automated dispute resolution workflow embedded in the app. |

---

## The Two Profiles of Demand: LTV vs. Volume

Just as with supply, you must classify your demand side to optimize your Customer Acquisition Cost (CAC):

- **High-LTV Power Buyers:** (e.g., Office managers booking weekly catering). They require heavy upfront sales effort (B2B sales motion) but will generate massive recurring GMV. Your product must feature invoicing, team accounts, and bulk re-ordering.
- **Low-LTV Transactional Buyers:** (e.g., A user buying a used bicycle once). They will not return for years. Your product must capture them immediately via SEO or paid ads, and the checkout flow must be absolutely frictionless (Guest Checkout, Apple Pay).

> [!DECISION]
> Determine if your business model relies on high-retention (repeat) buyers or high-volume (one-off) buyers. If your model requires repeat buyers but your category is naturally one-off (e.g., wedding dresses), your unit economics will collapse under the weight of continuous customer acquisition.

---

## Defining Your Demand Acquisition Channel

How are you going to acquire the first 1,000 buyers? "Launching on Product Hunt" is not a scalable demand generation strategy. 

- **Programmatic SEO:** Auto-generating thousands of landing pages for specific inventory combinations (e.g., "Vintage Rolex in Seattle").
- **Supply-Driven Growth (The Holy Grail):** Providing sellers with embeddable widgets or profile links so they bring their own existing customers onto your platform to process payments.
- **Paid Acquisition (Arbitrage):** Can you acquire a buyer on Google Ads for $20 if their LTV on your platform is $100? 

> [!IMPORTANT]
> If your only plan for demand generation is paid ads, you must mathematically prove your LTV:CAC ratio before writing code. If a buyer costs $50 to acquire, and your take rate is $10 per transaction, that buyer must transact 5 times just for you to break even.

---

## Writing Your Demand-Side Specification

Format your demand side mandate to guide your Phase 1 UI design:

```text
Target Persona: [Highly specific description of the buyer]
Current Alternative: [The exact competitor or workaround they use today]
Primary Trust Barrier: [The main reason they are afraid to use a new platform]
Scale Profile: [High-LTV / Transactional]
Acquisition Channel: [The scalable engine that brings them to the site]
Trust Engine Requirement: [The technical feature we must build to overcome their fear]
```

---

## AI Prompts for Demand-Side Engineering

> [!TIP]
> **Prompt 1 — Uncovering the Trust Barrier:**

````prompt
My production marketplace targets [Target Persona] on the demand side. They currently use [Current Alternative]. Act as a deeply skeptical buyer from this demographic. Tell me the top 3 reasons you would refuse to enter your credit card on my unproven platform. What specific UI elements, guarantees, or technical features must I build to completely neutralize your skepticism?
````

> [!TIP]
> **Prompt 2 — Acquisition Economics:**

````prompt
My demand side consists of [Target Persona]. The average transaction size is $[X] and my take rate is [Y]%. Estimate a realistic Customer Acquisition Cost (CAC) for this demographic using [SEO / Google Ads / Social]. Based on that CAC, how many repeat transactions must this user make for my unit economics to be viable? If the math fails, suggest a structural pivot to increase their LTV.
````

---

## Validating AI Output

- **Reject generic acquisition advice:** If AI suggests "social media marketing" without calculating the implied CAC and comparing it to your take rate, force it to do the math.
- **Ensure trust mechanisms are scalable:** If AI suggests "curating every listing manually," reject it. Ask for systemic, automated trust features (e.g., algorithmic fraud scoring).

---

## Checklist: Demand-Side Architecture

## Checklist:
- [ ] Explicitly defined the Target Persona beyond generic "buyers."
- [ ] Documented their primary Trust Barrier and the specific feature required to solve it (e.g., Escrow, KYC).
- [ ] Categorized demand as either High-LTV (recurring) or Transactional (one-off) to inform the UI.
- [ ] Identified a scalable Demand Acquisition Channel (e.g., Programmatic SEO, Supply-driven loops).
- [ ] Performed a basic LTV:CAC sanity check to ensure acquiring this demand is economically viable.

---

## What's Next

Next: **Marketplace Liquidity** — Defining what "enough" supply and demand actually looks like, and how you measure the tipping point where your marketplace becomes self-sustaining.
