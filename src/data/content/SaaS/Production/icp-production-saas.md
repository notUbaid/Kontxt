---
title: ICP (Ideal Customer Profile)
slug: icp
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 30–40 min
---

# ICP — Ideal Customer Profile

Your target users are everyone this product could serve. Your ICP is the specific subset you should acquire first.

The distinction is not semantic. It determines where you spend your first marketing dollar, which features ship in v1, how you price, and what your first 10 sales conversations look like.

A vague ICP is indistinguishable from no ICP. "Small to medium businesses" is not an ICP. "Independent UX consultants who bill clients hourly, work solo, and currently use spreadsheets to track project time" is.

---

## What the ICP Is Not

Before defining yours, clear three common confusions.

**ICP is not a persona.**
A persona is a fictional character with a name, a backstory, and a photo. It is useful for UX decisions. An ICP is a set of firmographic and behavioural attributes that define the best customer for your business. It is used for acquisition, pricing, and product prioritisation.

**ICP is not your total addressable market.**
Your TAM is everyone who could theoretically pay for this. Your ICP is the smallest group of people who would most benefit, convert fastest, and stay longest. You expand from ICP outward — not from TAM inward.

**ICP is not permanent.**
Your ICP at launch will not be your ICP at Series A. It narrows as you learn who actually converts and retains, then expands as you build features for adjacent segments. Define it for now, with the expectation that it will evolve.

---

## The Four Dimensions of an ICP

A complete ICP answers four questions.

```
1   WHO THEY ARE        Descriptive attributes
2   WHAT THEY DO        Behavioural attributes  
3   WHY THEY BUY        Motivational attributes
4   WHY THEY STAY       Retention attributes
```

Most ICPs only answer dimension 1. That tells you who to target but not why they will convert or stay — which means your acquisition is efficient but your retention is guesswork.

---

## Dimension 1 — Who They Are

The descriptive profile. What you could learn about them before speaking to them.

For B2C or prosumer SaaS, this includes:
- Job title or role
- Industry or domain
- Company size (if applicable)
- Geography (if relevant)
- Income or budget range
- Stage of career

For B2B SaaS, add:
- Company revenue range
- Team size
- Tech stack (are they already using tools yours integrates with?)
- Buying process (who approves software purchases?)
- Current tools in this category

Be specific enough that you could build a list. "Mid-career freelance designers in the US earning $60–150K annually who use Figma and invoice clients monthly" is a profile you can find. "Creative professionals" is not.

---

## Dimension 2 — What They Do

The behavioural profile. How they currently live with the problem.

- What is their current workaround?
- How frequently do they encounter the problem?
- How much time or money does their workaround cost them?
- What tools are already open in their workflow when the problem occurs?
- Have they previously tried to solve this? What happened?

This dimension is where your pain point research pays off. The users who match your ICP are not just the ones who have the problem — they are the ones who have the problem acutely enough to be actively looking for a solution, or who have already tried and failed to solve it.

Users who have built their own workaround are your best ICP candidates. They have proven the problem is painful enough to invest effort in. Your product needs to be better than their workaround — a lower bar than being better than doing nothing.

---

## Dimension 3 — Why They Buy

The motivational profile. What tips them from awareness to purchase.

This is not about features. It is about the trigger — the moment a person decides to look for a solution, evaluate options, and pay.

Common buying triggers in SaaS:

| Trigger | What It Looks Like |
|---|---|
| **Pain threshold crossed** | A specific bad experience makes the status quo unacceptable |
| **Scale event** | They grew — more clients, more projects, more team members — and their workaround broke |
| **Time pressure** | A deadline or launch made the inefficiency impossible to ignore |
| **Social proof** | Someone they trust recommended a solution |
| **Cost realisation** | They calculated what the problem was costing them in time or money |
| **Tool abandonment** | A tool they relied on was discontinued, changed pricing, or degraded in quality |

Knowing your buyer's trigger tells you what your acquisition copy should say, what your onboarding should acknowledge, and what your pricing page needs to make obvious.

If your ICP buys when a scale event occurs, your acquisition channel should be places people talk about growth. If they buy when a tool abandons them, your SEO should target "[competitor] alternative."

---

## Dimension 4 — Why They Stay

The retention profile. What makes your ideal customer a long-term customer.

This is the most important dimension for SaaS specifically, because recurring revenue depends on retention.

Ask: what would have to be true about this customer for them to still be paying in 12 months?

- They use the product frequently enough that it becomes habitual
- The switching cost grows over time (their data is in your system)
- The product delivers compounding value (the longer they use it, the more useful it becomes)
- The problem it solves does not go away
- They expand usage — more seats, more features, more integrations

Customers who score high on retention attributes are worth more than customers who convert easily but churn quickly. An ICP built purely on acquisition signals optimises for the wrong thing.

---

## Negative ICP

As important as defining who you want is defining who you do not.

A negative ICP is a profile of customers who seem like a fit but are not — they convert but churn, or they require disproportionate support, or they pull your roadmap in a direction that does not serve your core segment.

Common negative ICP patterns:

- **The enterprise who found you by accident** — wants SLAs, custom contracts, and security reviews you cannot provide
- **The one-time user** — has a single use case, gets value once, has no reason to return
- **The feature demander** — converts, then immediately requests features that serve only their workflow
- **The price-sensitive user** — churns the moment a cheaper alternative appears, never becomes a champion
- **The wrong vertical** — uses your product for a job it was not designed for, experiences friction, blames the product

Name at least two negative ICP profiles for your product. Then decide: will you actively screen these users out (pricing, positioning, onboarding gates) or simply deprioritise them?

---

## AI Prompt: ICP Definition

```
I am defining the Ideal Customer Profile for a production SaaS product.

Product: [one sentence]
Target users I have identified: [summary from Target Users module]
Core pain points I am solving: [top 3 from User Pain Points module]
Pricing model I am planning: [describe]

Help me define a precise ICP across all four dimensions:

1. WHO THEY ARE — descriptive attributes specific enough to build a prospect list from
2. WHAT THEY DO — behavioural attributes that signal they have the problem acutely
3. WHY THEY BUY — the most likely buying trigger for this profile
4. WHY THEY STAY — retention attributes that make them a long-term customer

Then:
5. Define two negative ICP profiles — customers who look like a fit but are not
6. Write a single paragraph ICP summary that could be handed to a marketer or salesperson to immediately understand who to target
7. Suggest three acquisition channels where this ICP is most likely to be found and reachable

Flag any dimension where my inputs are too vague to produce a specific ICP — I would rather know now than have a false sense of clarity.
```

---

## ICP to Product Decisions

Your ICP should immediately constrain product decisions. If it does not, it is a document, not a tool.

| ICP Attribute | Product Decision |
|---|---|
| Non-technical user, solo operator | No team features in v1, no API documentation in v1 |
| Buys when a scale event occurs | Onboarding must handle "I have existing data to migrate" |
| Currently uses spreadsheets as workaround | Import from CSV is a day-one feature, not a backlog item |
| Stays because data accumulates in the product | Data export must exist and be prominent — trust signal |
| Negative ICP: enterprise buyers | No custom contract flow, no SSO in v1, pricing page self-serve only |
| Buying trigger: cost realisation | Pricing page must include an ROI calculator or time-saved framing |

Run your ICP against your current feature list and ask: does every v1 feature serve this ICP directly? If a feature serves a user outside your ICP, it is either a nice-to-have or a scope creep risk.

---

## Validating Your ICP

An ICP written without validation is a hypothesis. Treat it as one.

**The conversion test:** Of the users you have spoken to in discovery, which ones responded most strongly? Which ones said "I need this now"? Those people are your ICP. Work backwards from their attributes.

**The referral test:** Ask your best early users who else they know who has this problem. The people they name are almost always in the same ICP. If their referrals are very different from your current ICP definition, your definition needs updating.

**The retention prediction test:** For each user you have, score them against your retention attributes. Do the users who score highest actually engage more? If not, your retention attributes are wrong.

---

## Checklist: ICP Complete

**Definition**
- [ ] All four dimensions are defined with specificity
- [ ] WHO is specific enough to build a prospect list from
- [ ] WHAT DO includes at least one behavioural signal (workaround, prior attempt, frequency)
- [ ] WHY THEY BUY names a specific trigger, not just "they have the problem"
- [ ] WHY THEY STAY includes at least one compounding retention mechanism

**Negative ICP**
- [ ] At least two negative ICP profiles are named
- [ ] A decision is made on how to handle each (screen out or deprioritise)

**Product mapping**
- [ ] At least five ICP attributes have been mapped to product decisions
- [ ] v1 feature list has been reviewed against the ICP — no feature serves only a negative ICP profile

**Validation**
- [ ] ICP is grounded in at least some real user signal, not entirely assumed
- [ ] A plan exists to validate or refine the ICP after first 10 customers

---

## What Comes Next

Personas translate your ICP and target user definitions into the human-centred models that design and UX decisions will reference — giving your ICP a face, a workflow, and a set of goals that make product decisions feel concrete rather than abstract.
