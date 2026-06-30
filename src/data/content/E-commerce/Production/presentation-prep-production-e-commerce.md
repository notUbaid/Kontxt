---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 15–25 min
---

# Presentation Prep

When presenting a production-grade e-commerce architecture to stakeholders, investors, or senior engineering leadership, you cannot simply show them a working shopping cart. They assume the cart works. 

You must present the *engineering rigor* behind the cart. You are presenting risk mitigation, scalability, and unit economics.

---

## 1. Know Your Audience

Different stakeholders care about entirely different metrics. Your presentation must pivot based on who is in the room.

- **The CFO / Finance Team:** They do not care about your Next.js Edge configuration. They care about Margin, LTV:CAC, Idempotency (preventing double-charges), and Tax compliance automation.
- **The CTO / Engineering Leadership:** They care about Single Points of Failure (SPOFs), Database Connection Pooling, API rate limits, and the CI/CD deployment pipeline.
- **The CMO / Marketing Team:** They care about Core Web Vitals (SEO impact), Server-Side Tracking (Meta CAPI), and the ability to launch A/B tests without needing developer tickets.

---

## 2. Anticipate the "Disaster Scenarios"

Investors and senior leaders will stress-test your architecture by asking "What if" questions. You must have the technical answers prepared.

**Common E-Commerce Stress Questions:**
1. *"What happens if a botnet tries to test 10,000 credit cards on our checkout?"*
   - **Answer:** We have rate-limiting at the Edge (Cloudflare/Upstash) restricting checkouts to 5 requests per IP per minute, backed by Stripe Radar for behavioral ML blocking.
2. *"What happens if we get featured on national television and traffic spikes 100x?"*
   - **Answer:** Our frontend is completely static and Edge-cached (CDN). Our Node.js API is stateless and auto-scales. Our Postgres database is protected by PgBouncer to prevent connection exhaustion.
3. *"What happens if our 3PL API goes down and we can't push orders to the warehouse?"*
   - **Answer:** Orders are pushed to an SQS Queue. If the 3PL is down, the queue applies Exponential Backoff and retries automatically until the API comes back online. Zero orders are lost.

---

## 3. The Live Demo Fallback

Never trust live internet during a technical presentation.

If you are demoing the checkout flow, and Stripe's Sandbox API happens to experience a 30-second degradation, your presentation fails.
- **The Rule:** Always have a local screen-recording of the critical path (Add to Cart -> Checkout -> Payment Success) embedded in your slide deck. 
- You can attempt the live demo, but the moment it stalls, seamlessly click "Next Slide" and narrate over the video backup.

---

## AI Prompt — Prepare for the Stakeholder Review

```prompt
I am preparing to present my production e-commerce architecture to a panel of investors and engineering leaders.

Tech Stack:
- Infrastructure: [e.g., Vercel / AWS]
- Database: [e.g., Postgres]
- Integrations: [e.g., Stripe, Klaviyo, Algolia]

Act as a Principal Staff Engineer conducting a Mock Review:
1. Generate 5 aggressive technical questions the engineering leadership will ask regarding our database scaling, single points of failure, and webhook reliability. Provide the optimal answers.
2. Draft a 2-minute "Executive Summary" script for the CFO, translating our technical architecture into financial safety and margin protection (e.g., discussing tax automation and fraud prevention).
3. Identify the 3 highest-risk components of our tech stack that could fail during a live demo, and outline the backup strategy for each.
```

---

## Presentation Prep Checklist

- [ ] Stakeholder matrix mapped (tailoring technical vs financial talking points to the audience)
- [ ] Answers prepared for critical "Disaster Scenario" questions (traffic spikes, bot attacks, API outages)
- [ ] Financial metrics (LTV:CAC, Margin) prepared for the executive summary
- [ ] High-risk live demo components identified (e.g., Payment Gateway, 3PL sync)
- [ ] High-definition video recordings of the critical path embedded in the slide deck as a fail-safe
