---
title: Pitch Deck
slug: pitch-deck
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Pitch Deck

If you are pitching a production e-commerce business to investors, they are evaluating you on two criteria: **Traction** and **Unit Economics**.

They are not investing in your React codebase; they are investing in your ability to acquire customers profitably and scale operations without the infrastructure collapsing. Your deck must translate complex engineering achievements into business leverage.

---

## 1. The Core Narrative (The Flywheel)

Your deck must demonstrate a self-sustaining growth flywheel.

**The Narrative Arc:**
1. **The Problem:** The current market suffers from X (e.g., poor UX, fragmented supply chain, lack of personalization).
2. **The Solution:** Our vertically integrated e-commerce platform solves this.
3. **The Engineering Edge (The Moat):** Because we built a custom headless architecture, our page loads are 2x faster than competitors on Shopify, resulting in a 35% higher conversion rate.
4. **The Economics:** This higher conversion rate lowers our CAC, allowing us to out-spend competitors on Facebook Ads while maintaining a 3:1 LTV:CAC ratio.

---

## 2. Slide Breakdown (Engineering & Operations)

While standard pitch decks include Team and Market Size, the technical slides are where you prove operational maturity.

**Slide: The Tech Stack (Simplified)**
Do not list every npm package you use. Show a high-level architecture diagram.
- *Visual:* Next.js (Edge) -> Node.js (Stateless API) -> Postgres (Primary) + Redis (Cache).
- *Talking Point:* "Our architecture is 100% serverless and stateless, meaning we can scale from 100 users to 100,000 users instantly during a flash sale without manual DevOps intervention."

**Slide: Unit Economics (The Math)**
Show the exact path to profitability on a per-order basis.
- *Visual:* A waterfall chart showing: AOV ($100) -> COGS ($30) -> Shipping/Fulfillment ($15) -> Blended CAC ($25) = Net Contribution Margin ($30).
- *Talking Point:* "Because we engineered custom Box Packing algorithms and multi-carrier rate shopping, we've reduced shipping costs by 15%, dropping our contribution margin straight to the bottom line."

---

## 3. The "Use of Funds" Slide

Investors want to know exactly what their money will buy. Be specific about engineering and operational investments.

**Weak Example:** "50% Marketing, 50% Engineering."
**Production Example:** 
- "40% Performance Marketing (Scaling Meta CAPI integration)."
- "30% Engineering (Building an automated Returns processing pipeline to lower reverse logistics overhead)."
- "30% Inventory/Supply Chain (Pre-funding inventory to unlock Tier 2 Volume Pricing from manufacturers)."

---

## AI Prompt — Generate Your Pitch Deck Outline

```prompt
I am building a Pitch Deck for a Seed-stage e-commerce startup to present to venture capitalists.

Business Context:
- Niche: [e.g., Direct-to-Consumer Skincare / Hardware]
- Current Traction: [e.g., $10k MRR / Pre-revenue MVP]
- The "Moat": [e.g., Custom AI recommendation engine / Proprietary supply chain]

Act as a Tier-1 Venture Capital Partner:
1. Outline a 10-slide pitch deck structure, specifically highlighting where to insert our "Engineering Edge" to prove we have a lower Customer Acquisition Cost (CAC) than competitors.
2. Draft the exact text for the "Unit Economics" slide, demonstrating a healthy Contribution Margin after factoring in COGS, shipping, payment processing, and CAC.
3. Formulate the "Use of Funds" slide for a $1M Seed round, categorizing the spend into specific operational and engineering milestones (e.g., automating reverse logistics).
```

---

## Pitch Deck Checklist

- [ ] Narrative arc established linking Technical Architecture directly to Business Metrics (e.g., Speed = Higher CVR = Lower CAC)
- [ ] High-level architecture diagram created (simplifying complex infra for a non-technical audience)
- [ ] Unit Economics waterfall chart built (proving profitability on a per-order basis)
- [ ] "Use of Funds" explicitly tied to scaling operations and reducing technical debt
- [ ] Appendix slides prepared containing deep-dives on Data Security (PCI) and Infrastructure scaling for technical due diligence
