---
title: Supply Side
slug: supply-side
phase: Phase 0
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Supply Side (The Providers)

You have defined your structural blueprint. Now you must define the lifeblood of your marketplace: the Supply Side. 

In a production environment, acquiring supply is not about asking a few friends to list items. It is a systematic, scalable acquisition engine. Supply-side clarity directly dictates your database schema for user roles, your seller onboarding architecture (Phase 1), and your eventual Go-To-Market strategy.

---

## "Sellers" Is Not an Architectural Persona

If you define your supply side simply as "people who sell things," your database and UI will be too generic to solve their actual problems. You must define a rigid, highly specific persona.

**Weak:** "People who want to sell custom furniture."

**Production-Grade:** "Mid-sized independent woodworking studios (3-10 employees) who currently rely on fragmented Shopify stores and Instagram DMs, generating $100k-$500k ARR, but lack a unified channel for high-intent corporate buyers."

The specific version tells you exactly what infrastructure to build: they need bulk inventory uploads, multi-user admin accounts, and API integrations for their existing Shopify stores.

---

## The Two Profiles of Scale: Whales vs. Long-Tail

In production, you must classify your supply side into one of two scalable cohorts. This dictates your entire onboarding flow.

- **Power Sellers (The Whales):** B2B or professional entities (e.g., property managers, established agencies, massive retailers). They will endure high friction during onboarding (KYC, tax forms, API setup) if it guarantees volume. They require SaaS-like dashboards, analytics, and bulk-management tools.
- **Casual Sellers (The Long-Tail):** Individuals or gig-workers (e.g., casual dog walkers, people selling a used couch). They will abandon onboarding if it takes more than 3 minutes. They require aggressive mobile optimization, zero-friction signups, and immediate gratification.

> [!DECISION]
> Your v1 MVP cannot serve both Whales and the Long-Tail equally. Pick one. If you target Whales, build a complex web dashboard. If you target the Long-Tail, build a frictionless mobile-first flow. 

---

## What the Supply Side Actually Demands

Supply does not join your platform for fun. They join to make money. To acquire them at scale, your architecture must solve these core operational needs:

| Supply Need | Architectural Implication |
|---|---|
| **Inventory Liquidity** | Can they list 1,000 items at once? (Requires CSV upload or API integration). |
| **Trust & Payment Guarantee** | Do you hold funds in escrow? Are payouts automated? (Requires deep Stripe Connect integration). |
| **Workflow Utility** | Even if they don't get sales immediately, does the platform offer them a useful tool? (e.g., a CRM or scheduling calendar they can use for their off-platform clients). |
| **Operational Control** | Can they set dynamic pricing, block out dates, and manage their own refund policies? |

> [!TIP]
> **The SaaS Wedge:** The most reliable way to bootstrap supply is to build a "Single-Player Mode." Give the supply side a SaaS tool (like a free booking calendar) that is genuinely useful even if your marketplace has zero buyers. Once they use your tool to run their business, you own the supply.

---

## Defining Your Supply Acquisition Channel

You cannot rely on organic SEO to bootstrap supply. You must identify a scalable acquisition channel. 

- **Scraping & Outbound:** Can you programmatically scrape Yelp, Instagram, or Craigslist and automate cold outreach?
- **Partnerships:** Can you partner with an existing trade association or software provider to onboard 1,000 sellers at once?
- **Community Hijacking:** Are they concentrated in a massive, un-monetized subreddit or Discord server that you can systematically infiltrate?

> [!WARNING]
> If your supply acquisition strategy relies entirely on paid ads (Facebook/Google) before you have achieved liquidity, you will burn your capital. Paid acquisition only works when the marketplace is already highly liquid and converting predictably.

---

## Writing Your Supply-Side Specification

Before writing any user stories or PRDs, formalize your supply side in this exact format:

```text
Target Persona: [Highly specific description of the entity]
Current Workaround: [The inefficient tool they currently use]
Primary Friction Point: [Why the current workaround fails them at scale]
Scale Profile: [Whales / Long-Tail]
SaaS Wedge (Optional but recommended): [What free tool can we give them to hook them?]
Acquisition Channel: [How we will acquire the first 500 nodes programmatically]
```

---

## AI Prompts for Supply-Side Engineering

> [!TIP]
> **Prompt 1 — Define the SaaS Wedge:**

````prompt
My marketplace targets [Target Persona] on the supply side. Currently, they use [Current Workaround] to manage their business. I need to build a "Single-Player Mode" SaaS wedge—a free utility tool they can use immediately, even before my marketplace has any buyers. Suggest 3 highly technical, high-value tools I could build into their dashboard that solves a major operational headache for them.
````

> [!TIP]
> **Prompt 2 — API & Data Portability Strategy:**

````prompt
My supply side consists of [Target Persona]. They likely already have their inventory/data trapped in platforms like [e.g., Shopify, Mindbody, Airbnb]. Outline the technical requirements for an onboarding flow that allows them to instantly sync their existing inventory into my database via API or CSV, reducing their setup time to zero.
````

---

## Validating AI Output

- **Ensure technical depth:** If the AI suggests a "SaaS Wedge" that is just a basic notepad or generic calendar, reject it. It must be a workflow-specific tool (e.g., "A specialized tax-calculation tool for freelance graphic designers").
- **Verify API constraints:** If the AI suggests pulling data from a competitor, manually verify if that competitor actually offers a public API, or if you will be forced to rely on brittle web scraping.

---

## Checklist: Supply-Side Architecture

## Checklist:
- [ ] Explicitly defined the Target Persona beyond generic "sellers."
- [ ] Categorized the initial target as either Whales (B2B/Power users) or the Long-Tail (Casual/Gig).
- [ ] Documented the specific API or bulk-upload requirements needed to remove onboarding friction.
- [ ] Designed a "Single-Player" SaaS wedge to attract supply before demand exists.
- [ ] Identified a programmatic or scalable channel to acquire the first 500 supply nodes.

---

## What's Next

Next: **Demand Side** — The other half of the equation. We will define exactly who is buying, what their absolute baseline for trust is, and how you will engineer a conversion funnel that turns cold traffic into high-LTV transacting users.
