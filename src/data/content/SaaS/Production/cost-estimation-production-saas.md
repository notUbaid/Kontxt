---
title: Cost Estimation
slug: cost-estimation
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Cost Estimation

Every architecture decision you've made in this phase has a cost attached to it. This module isn't about building a finance model — it's about making sure your infrastructure costs don't surprise you, and that your unit economics make sense before you scale, not after.

---

## Decision 1: Map Every Cost Source

Go through your System Architecture Diagram and Third Party Integrations and list every line item:

> **Decision Card — Cost Categories**
- **Hosting/compute** (your app server)
- **Database** (managed Postgres instance, scales with storage and connections)
- **Object storage + bandwidth** (file storage, plus egress costs — often the most underestimated line item)
- **Third-party services** (auth provider, email provider, payment processor fees, AI provider if applicable)
- **Monitoring/observability tools** (often free at low volume, cost scales with log/event volume)

> ️ **Warning**
> **Bandwidth/egress costs are the most commonly underestimated line item.** A service that looks cheap based on compute pricing alone can become expensive once you account for data transfer out — especially for file-heavy SaaS products. Check egress pricing explicitly for every service that stores or serves files.

---

## Decision 2: Estimate at Multiple Scale Points

Don't estimate cost for "launch" alone — estimate at a few milestones so you can see where costs grow linearly vs. where they jump:

| Scale | What to check |
|---|---|
| Early (dozens of users) | Are you within free tiers everywhere? What's your cost if you're not? |
| Growth (hundreds–low thousands of users) | Where does a service's pricing tier require an upgrade? Is that jump gradual or a cliff? |
| Scale (tens of thousands+) | Which costs scale per-user (predictable) vs. per-resource-consumed (less predictable, e.g., AI tokens, storage, email volume)? |

> ️ **Warning**
> **Free tiers create cost cliffs, not gradual increases.** Many providers charge nothing up to a threshold and then a meaningfully higher rate immediately after. Know where those thresholds are for every service you depend on, so a usage spike doesn't produce a surprise bill.

---

## Decision 3: Unit Economics Sanity Check

> **Decision Card**
> Calculate your estimated infrastructure cost **per customer**, and compare it to your planned price per customer. If your cheapest pricing tier costs you more to serve than it earns, that's worth knowing now — not after you have a hundred customers on that tier.

This is especially important for any feature with variable, usage-based cost (AI features, file storage, email volume) — a flat subscription price against an unbounded variable cost is how unprofitable customers happen.

---

## Decision 4: Cost Monitoring

- [ ] Billing alerts set on every provider that has variable, usage-based pricing
- [ ] A single place (dashboard or recurring check) where you can see total spend across providers, not five separate billing pages you have to remember to check
- [ ] Alert thresholds set meaningfully below "this is now a problem" — early warning, not just confirmation of an overrun that already happened

> [!TIP]
> The usage limits you defined in AI Architecture and Third Party Integrations (rate limits per user/workspace) are also cost-control mechanisms — they're not just abuse prevention, they're what keeps a single misbehaving account from generating a runaway bill.

---

## Common Mistakes (Including AI's)

- **Estimates only compute/hosting cost**, ignoring bandwidth, third-party API fees, and storage — get a full picture, not just the most visible line item.
- **No billing alerts configured anywhere** — costs are discovered via the invoice, not in advance.
- **Pricing tiers don't reflect actual cost-to-serve** — a generous "unlimited" feature on a low-cost plan with no usage cap is a common way margin disappears.
- **Ignores free-tier cliffs** — assumes costs scale smoothly when many providers jump sharply at a threshold.
- **AI assumes infinite/free usage when estimating** — always ask for actual current pricing for the specific services involved, not rough or outdated figures, since pricing changes frequently.

---

## AI Prompt: Build a Cost Estimate

```prompt
Help me estimate infrastructure costs for a production SaaS at three scale points: 50 users, 1,000 users, 10,000 users.

Services in use: [list your actual chosen providers from Tech Stack Selection and Third Party Integrations — hosting, database, storage, auth, email, payments, AI if applicable]

For each service:
1. State its current pricing model (search for current pricing rather than assuming — pricing changes).
2. Estimate cost at each of the three scale points above, based on realistic usage assumptions for [briefly describe your product].
3. Flag any free-tier threshold where cost jumps sharply rather than scaling smoothly.

Then calculate estimated cost-to-serve per customer at the 1,000-user scale point, and compare it against my planned price of [your price] per customer per month.
```

> [!TIP]
> Since pricing for cloud and AI services changes frequently, have your AI tool search for current pricing rather than relying on its training data — provider pricing pages change often enough that even recent model knowledge can be stale.

---

## Validate Before You Move On

- [ ] Every cost source from your architecture is accounted for — including bandwidth/egress, not just compute
- [ ] Costs are estimated at more than one scale point, not just launch-day volume
- [ ] You know where each provider's free-tier cliffs are
- [ ] Cost-to-serve per customer has been compared against your planned pricing
- [ ] Billing alerts exist on every variable-cost provider
- [ ] Usage limits from earlier modules are confirmed to double as cost controls, not just abuse prevention

> [!TIP]
> Revisit this estimate after Phase 3 development, once real usage patterns exist — early estimates are directional, not final, and should be checked against actual measured usage before you scale marketing spend or onboard large customers.

---

**Phase 2 complete.** Next: Phase 3 — Development. Time to build what you've architected.
