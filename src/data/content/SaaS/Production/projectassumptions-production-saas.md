---
title: Project Assumptions
slug: project-assumptions
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Project Assumptions

Every product is built on assumptions. The difference between experienced engineers and beginners is not that experienced engineers make fewer assumptions — it is that they know which ones they are making.

Unnamed assumptions become invisible risks. They surface as architectural rewrites, failed launches, and wasted months spent building for a problem that turned out to be different from the one you thought you were solving.

This module makes your assumptions visible so you can manage them instead of being managed by them.

---

## What an Assumption Is

An assumption is anything your product decisions depend on that you have not yet confirmed.

If it turned out to be false, something you are planning to build would either not work, not be needed, or need to be built differently.

That is the test. Apply it to everything.

---

## The Five Categories of Assumptions

Assumptions cluster into five areas. Work through each one deliberately.

```
1   USER ASSUMPTIONS        What you believe about your users
2   PROBLEM ASSUMPTIONS     What you believe about the problem
3   SOLUTION ASSUMPTIONS    What you believe about your approach
4   MARKET ASSUMPTIONS      What you believe about the landscape
5   TECHNICAL ASSUMPTIONS   What you believe about the build
```

Most founders stress-test user and problem assumptions. Almost no one stress-tests technical assumptions before starting to build. All five matter at production scale.

---

## Category 1 — User Assumptions

These are beliefs about your users' behaviour, context, and motivations that you are treating as facts.

Common user assumptions in SaaS:

- Users will change their existing workflow to adopt this product
- Users will pay for this individually (not expense it through a company)
- Users have the technical sophistication to complete onboarding without help
- Users will invite teammates organically once they see value
- Users will tolerate the limitations of an MVP
- Users check their email and will respond to lifecycle campaigns
- Users on mobile vs desktop behave similarly for this use case

For each assumption, ask: what happens to your product if this is wrong?

**If users will not change their existing workflow:** your product must fit into the workflow they already have, not require them to adopt a new one. This is an architecture decision — where your product sits in their tool stack.

**If users will not pay individually:** you need a B2B sales motion, not a self-serve checkout. This changes your pricing model, your auth model (org accounts), and your go-to-market entirely.

---

## Category 2 — Problem Assumptions

These are beliefs about the nature of the problem itself.

Common problem assumptions:

- The problem occurs as frequently as users told you it does
- The problem is painful enough that users will actively seek a solution
- The problem is consistent across your target segment (not highly contextual)
- Users are aware that the problem exists — they are not habituated to it
- The problem has not already been quietly solved by a competitor you have not found yet
- The problem will still exist in 12 months (not being eliminated by a platform change or regulatory shift)

The last two are the ones most founders skip. Spending six months building a solution to a problem that a well-funded competitor solved last quarter — or that disappears because a platform ships a native feature — is a category of risk that assumption mapping catches early.

---

## Category 3 — Solution Assumptions

These are beliefs about whether your specific approach will work.

Common solution assumptions:

- The mechanism you identified is the right point of intervention
- Your approach is technically feasible within your constraints
- The solution is simple enough that users will understand it without training
- The solution will produce the outcome users expect (not a different outcome they did not ask for)
- Users will trust your product with the data it requires to work

The trust assumption is particularly important for SaaS. Products that require sensitive data — financial records, health information, customer data, calendar access — face adoption friction that is not about features. It is about trust. If your solution requires data users are reluctant to share, that is a constraint your architecture and onboarding must address from day one.

---

## Category 4 — Market Assumptions

These are beliefs about the landscape your product enters.

Common market assumptions:

- The market is large enough to sustain a business
- There is no incumbent with sufficient distribution to copy this feature before you gain traction
- Users are actively searching for a solution (pull market) rather than needing to be convinced a problem exists (push market)
- The pricing you have in mind is within the range users are willing to pay
- Your acquisition channel assumptions are valid (SEO will work, communities will share, referral will spread)

The pull vs push distinction is especially important. A pull market means users already know they have the problem and are looking for solutions — your job is to be found and convert. A push market means users do not yet recognise the problem — your job is education before conversion. These require completely different go-to-market strategies and different timelines to revenue.

---

## Category 5 — Technical Assumptions

These are beliefs about your build that you are treating as settled when they may not be.

Common technical assumptions:

- The third-party APIs you depend on are reliable, affordable at scale, and will not deprecate critical functionality
- Your chosen stack can handle the performance requirements of your use case
- The data you need is accessible (not locked inside platforms that do not offer export or API access)
- AI components (if applicable) will produce outputs reliable enough for production use
- Your infrastructure costs will remain manageable as you scale
- The integrations users expect are technically feasible with the APIs those platforms expose

Third-party API assumptions are the most dangerous in production SaaS. Building a core feature on an undocumented API, a free tier with no SLA, or a platform that treats third-party developers as a secondary concern is a business risk, not just a technical one.

Before committing to any external dependency, ask: what happens to my product if this API raises prices by 10x, introduces rate limits, or shuts down?

---

## Ranking Your Assumptions

Not all assumptions carry equal risk. Rank yours across two dimensions.

```
                    HIGH IMPACT
                    (if wrong, major rework)
                         │
     Validate first      │      Most dangerous
     (quick to check)    │      (validate urgently)
                         │
LOW EFFORT ──────────────┼──────────────── HIGH EFFORT
to validate              │                 to validate
                         │
     Accept or           │      Monitor
     document            │      (hard to validate early)
                         │
                    LOW IMPACT
                    (if wrong, minor adjustment)
```

**Most dangerous quadrant** — high impact if wrong, hard to validate — these are your existential risks. Treat them as open questions until you have evidence, not assumptions. Flag them explicitly in every phase document that depends on them.

**Validate first quadrant** — high impact if wrong, easy to check — these should be validated before you write a line of code. Most of them can be tested with a conversation, a landing page, or a quick technical spike.

---

## AI Prompt: Assumption Mapping

```
I am building a production SaaS product. Here is my current understanding:

Product: [one sentence description]
Target user: [your definition from the Target Users module]
Problem: [your problem statement summary]
Solution mechanism: [your HOW from Idea Definition]
Tech stack I am planning: [list]
Acquisition channel I am planning: [describe]
Pricing model I am planning: [describe]

Generate a comprehensive assumption map across all five categories:
1. User assumptions
2. Problem assumptions
3. Solution assumptions
4. Market assumptions
5. Technical assumptions

For each assumption:
- State it explicitly as an assumption ("We assume that...")
- Rate the impact if wrong: Critical / High / Medium / Low
- Rate the effort to validate: Easy / Medium / Hard
- Suggest the fastest way to validate or invalidate it

Then identify the three most dangerous assumptions — high impact, hard to validate — and suggest how I should manage them if I cannot validate them before building.
```

---

## Documenting Assumptions Formally

Once mapped, assumptions should live in a document that the whole project references — not just in your head.

**Format for each assumption:**

```
ASSUMPTION: [State it clearly]
CATEGORY: User / Problem / Solution / Market / Technical
IMPACT IF WRONG: Critical / High / Medium / Low
VALIDATION STATUS: Unvalidated / In progress / Validated / Invalidated
VALIDATION METHOD: [How you will or did test it]
LAST REVIEWED: [Date]
NOTES: [Evidence, counter-evidence, or dependencies]
```

This document should be updated as you learn. An assumption that was unvalidated in Phase 0 might be validated by Phase 3 user interviews — or invalidated, triggering a product decision change.

Treat it as a living risk register, not a one-time exercise.

---

## What to Do With Invalidated Assumptions

When an assumption turns out to be false, you have three options.

**Pivot the assumption:** Change the product decision that depended on the assumption. This is the right move when the validated reality suggests a better path.

**Accept the constraint:** Acknowledge that the assumption is false and design around it explicitly. If users will not change their workflow, build for the workflow they have.

**Kill the idea:** Some invalidated assumptions reveal that the product does not have a viable path. This is painful but less painful than building for a year on a false foundation.

The worst option — the one most builders choose — is to know an assumption is invalidated and continue anyway, hoping it will not matter. It always matters.

---

## Checklist: Project Assumptions Complete

**Coverage**
- [ ] At least three assumptions identified in each of the five categories
- [ ] Every major product decision can be traced to at least one assumption
- [ ] Technical API and infrastructure assumptions are explicitly listed

**Prioritisation**
- [ ] Every assumption is rated for impact and validation effort
- [ ] The three most dangerous assumptions are named
- [ ] At least one validation method is identified for every high-impact assumption

**Documentation**
- [ ] Assumptions are recorded in a persistent document, not just in this module
- [ ] Each assumption has a validation status
- [ ] A review cadence is set (at minimum: review at the start of each new phase)

**Honesty**
- [ ] No assumption is listed as "validated" without actual evidence
- [ ] At least one assumption has been stress-tested by someone who disagrees with it

---

## What Comes Next

ICP defines the precise slice of your target users your business should acquire first — the people most likely to convert, retain, and generate signal that shapes the rest of your product.
