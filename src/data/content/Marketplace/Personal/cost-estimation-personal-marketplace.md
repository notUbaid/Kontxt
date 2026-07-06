---
title: Cost Estimation
slug: cost-estimation
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Cost Estimation

## The Question You Need to Answer Before You Build Further

Not "what will this cost at scale" — you don't have scale. The real question: **what does this cost between now and your first real users, and where does that change as you grow from 10 to 100 to 1,000 users?** Personal-mode projects die from two opposite mistakes: founders who get a surprise bill they can't pay, and founders who over-provision for scale that never arrives and burn budget on infrastructure nobody's using.

This module gives you a cost model tied to the stack you picked in Tech Stack Selection — not a generic "cloud costs" overview.

---

## Map Costs to the Stack You Already Chose

Each layer from your Tech Stack Selection module has a free tier and a point where it stops being free. Know both before you build on it.

| Layer | Free Tier Reality | Where Cost Actually Starts |
|---|---|---|
| Hosting (Vercel/Railway/Render-style) | Generous for personal projects | Custom domains, increased bandwidth, or backend compute beyond hobby limits |
| Managed Postgres | Most providers offer a free or near-free starter instance | Database size or connection limits at meaningful user counts |
| Managed auth | Free up to a monthly active user threshold | Once you cross that user threshold — check the exact number for your provider |
| Object storage (images) | Free tier covers low storage/bandwidth | Storage volume and bandwidth from image-heavy listings |
| Stripe Connect | No platform fee to integrate | Stripe's per-transaction fee, which you'll factor into your Revenue Model |

> ️ **Common mistake:** Assuming "free tier" means free forever. Free tiers are usage-gated, not feature-gated — you don't lose functionality when you cross the line, you start getting billed. Know your specific provider's threshold numbers, not just that a free tier exists.

---

## The Two Costs That Actually Bite Personal-Mode Builders

| Cost Type | Why It's Dangerous | How to Avoid It |
|---|---|---|
| Unbounded AI API usage (if your marketplace uses AI features) | Token costs scale with usage in ways that are easy to lose track of | Set hard usage caps and monitor early, don't wait for a surprise bill |
| Image storage/bandwidth | Listings accumulate photos fast, and bandwidth costs compound with traffic | Compress images on upload, set reasonable size limits per listing |

>  **Tip:** If your marketplace doesn't use AI at runtime (most don't need to — AI is for *you building it*, not necessarily a runtime feature), skip the AI cost row entirely. Don't add AI-powered features just because they're trendy; every runtime AI call is a recurring cost with no flat free tier.

---

## A Realistic Personal-Mode Budget Range

This isn't a guarantee — costs depend on your specific choices — but it sets expectations so you're not flying blind.

| Stage | Typical Monthly Cost | What's Driving It |
|---|---|---|
| Building, no real users | $0–10 | Free tiers across the stack cover this comfortably |
| First 10–50 real users | $0–25 | Still mostly within free tiers; Stripe fees are per-transaction, not flat |
| 50–500 active users | $25–100 | Database/hosting tiers start scaling; image storage grows |

>  **Best practice:** If your estimate for "building, no real users" is already above $10/month, you've likely over-provisioned something — go back to Tech Stack Selection and check whether you picked a paid tier you didn't need yet.

---

## Stripe Fees Aren't Optional Math — Build Them Into Your Model Now

Every transaction through Stripe Connect costs a percentage plus a flat fee. This isn't a hosting cost, it's a cost of doing business that directly affects your Revenue Model decisions from Phase 0.

- Look up your current Stripe Connect fee structure (it varies by transaction type and region)
- Calculate what a typical transaction on your marketplace nets after Stripe's cut
- Revisit your Revenue Model module — does your take rate still make sense once Stripe's fee is subtracted?

> ️ A marketplace charging a 5% platform fee that doesn't account for Stripe also taking ~3% is effectively keeping much less than founders assume. Do this math before you commit to a take rate publicly.

---

## AI Prompt: Building Your Specific Cost Model

```
I'm building a personal-scale marketplace using this stack:
- Hosting: [your choice]
- Database: [your choice]
- Auth provider: [your choice]
- Storage: [your choice]
- Payments: Stripe Connect

Expected scale over the next 6 months: [your rough estimate]
Average listing has [N] photos, average transaction value is [$X]

Build a realistic monthly cost estimate at three stages: pre-launch,
10-50 users, 50-500 users. For each stage:
1. Which costs stay at $0 via free tiers
2. Which costs start appearing and roughly how much
3. Any single line item that could spike unexpectedly, and what
   usage pattern would cause that

Also calculate: after Stripe's transaction fees, what's my actual
net take rate if I charge [your planned %] platform fee?
```

---

## Common Mistake: Over-Provisioning "Just In Case"

> ️ Paying for a production-tier database or premium hosting plan before you have users isn't caution, it's wasted budget. Free and starter tiers exist specifically for this stage. Upgrade when usage data tells you to, not in anticipation of growth that hasn't happened. You can always upgrade in minutes; you can't easily get a refund on months of unused capacity.

---

## What You Should Walk Away With

1. A real cost estimate for your specific stack, at three growth stages
2. Identified free-tier thresholds for each service you're using
3. A confirmed net take rate after Stripe fees, checked against your Revenue Model
4. Zero paid tiers active that you don't currently need

This number isn't just a budgeting exercise — it directly validates whether your Phase 0 Revenue Model is realistic. If your costs at 500 users exceed what your take rate generates at 500 users' worth of transactions, that's a problem to catch now, not after launch.
