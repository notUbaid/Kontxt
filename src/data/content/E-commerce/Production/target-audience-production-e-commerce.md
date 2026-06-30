---
title: Target Audience
slug: target-audience
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Target Audience

In production e-commerce, a "Target Audience" is not a qualitative marketing persona (e.g., "Sarah, 35, loves yoga"). It is a deterministic dataset used to train the machine learning models of advertising networks (Meta, Google, TikTok).

If your engineering systems cannot accurately capture, hash, and feed high-quality audience data back into these ad algorithms, your Customer Acquisition Cost (CAC) will spiral out of control, and your business will fail.

---

## 1. The Lookalike Architecture (LALs)

The most powerful audience in e-commerce is a "Lookalike" (LAL) audience. You give Meta a list of your best customers, and Meta's AI finds 2 million people who share their exact purchasing behaviors.

**The Engineering Constraint:**
You cannot simply upload a CSV of emails to Meta once a month.
- **The Production Standard:** You must architect a real-time data pipeline (via Meta Conversions API or Segment).
- When a user purchases a high-margin product (e.g., spending >$150), your backend automatically pushes their hashed data (SHA-256) into a specific "High LTV Value" Custom Audience via API.
- Meta continuously updates the 1% Lookalike model based on this real-time stream, ensuring your ads are always targeting users perfectly aligned with your most profitable demographic.

---

## 2. Demographic Parsing (The Zero-Party Data Strategy)

Relying on Facebook to guess your user's demographic is increasingly flawed due to iOS privacy updates (ATT). You must collect "Zero-Party Data"—data the user explicitly gives you.

**The Implementation:**
Engineer demographic data collection directly into the onboarding or pre-purchase flow.
- Use a "Quiz Funnel" (e.g., "Take the 3-minute quiz to find your perfect skincare routine").
- The React frontend captures their skin type, age, and main concerns.
- **The Backend Action:** This data is saved to your Postgres database and immediately synced as custom properties to your CDP (Klaviyo).
- Now, when a 45-year-old user with "dry skin" completes the quiz but abandons their cart, they receive an automated email specifically addressing dry skin, rather than a generic brand blast.

---

## 3. B2B vs B2C Segmentation (Database Level)

If you serve both retail consumers (B2C) and wholesale buyers (B2B), your database must strictly separate these audiences.

**The Architecture:**
- A B2C user buys a $50 shirt. A B2B user buys 500 shirts for $15,000.
- If your analytics pipeline mixes this data, Meta will think your "average user" spends $7,500 and will train the algorithm to look for millionaires, completely destroying your consumer ad performance.
- **The Fix:** Ensure your User schema includes a strict `account_type` ENUM (`RETAIL`, `WHOLESALE`). Your backend must explicitly filter out `WHOLESALE` events before pushing conversion data to consumer ad networks.

---

## 4. Audience Exclusion APIs (Stopping Wasted Ad Spend)

If a user just bought a $2,000 mattress from you today, you do not want to spend $5 tomorrow showing them an ad for the exact same mattress.

**The Implementation:**
- Your backend must maintain an automated "Recent Purchasers (30 Days)" exclusion list via the Google Ads and Meta APIs.
- The moment the Stripe `payment_intent.succeeded` webhook fires, the user's hashed email is pushed to the exclusion list. 
- The ad networks immediately stop showing them acquisition ads, saving the business massive amounts of wasted budget.

---

## AI Prompt — Architect Your Audience Data Pipeline

```prompt
I am engineering the audience data pipeline for a production e-commerce store to optimize ad spend.

Tech Stack:
- Backend: [e.g., Node.js / Postgres]
- Ad Networks: [e.g., Meta CAPI, Google Ads API]
- CDP: [e.g., Segment / Klaviyo]

Act as a Principal Growth Engineer:
1. Write the backend Node.js logic required to automatically add a user's hashed email to a "Recent Purchasers" exclusion list via the Meta Marketing API immediately after a successful checkout.
2. Design the Postgres database schema required to store "Zero-Party Data" captured from a front-end quiz, and explain how to sync this to Klaviyo for dynamic email segmentation.
3. Outline the architecture required to prevent B2B wholesale transactions from accidentally polluting the B2C machine learning models in our advertising networks.
```

---

## Target Audience Checklist

- [ ] Real-time data pipeline (Meta CAPI) architected to feed high-LTV purchaser data into Lookalike algorithms
- [ ] SHA-256 hashing strictly enforced for all PII data sent to advertising APIs
- [ ] "Zero-Party Data" capture mechanisms (e.g., Quiz Funnels) engineered into the frontend UX
- [ ] Strict database-level segmentation enforced between B2B and B2C accounts to prevent algorithmic pollution
- [ ] Automated API pipelines configured to push recent purchasers into Ad Exclusion lists, saving ad spend
