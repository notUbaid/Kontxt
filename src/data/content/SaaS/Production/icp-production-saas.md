---
title: ICP (Ideal Customer Profile)
slug: icp
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 20-30 min
---

# ICP (Ideal Customer Profile)

Most SaaS products don't fail because the code is bad. They fail because they were built for "everyone," which in practice means built for no one. Every feature, pricing decision, and onboarding flow you design after this module will either fit your ICP or fight it.

Your ICP is not a vibe. It's a specific, falsifiable description of the customer you're building for — specific enough that you can look at a real company or person and say yes or no, not "kind of."

This module produces one artifact: a written ICP you'll reference in every future planning module. Skipping it doesn't save time — it just moves the cost to every feature decision downstream, where it's more expensive to fix.

---

## Why This Comes Before Architecture

> **️ Common Mistake**
> Building the data model and auth system before deciding who the customer is. Teams-based permissions, seat-based billing, single-tenant vs multi-tenant data isolation, SSO requirements — these are architectural decisions, not features you bolt on later. Getting the ICP wrong doesn't cost you a UI tweak. It can cost you a database migration.

If your ICP is "solo freelancers," you don't need org hierarchies, roles, or SSO on day one. If your ICP is "mid-market operations teams," you need all three before your first paying customer, or you'll fail their security review.

---

## The Two Axes That Matter

Most ICP definitions fail because they only describe demographics ("marketing managers at B2B companies") without describing the situation that makes your product necessary right now. Define both.

| Axis | Question it answers | Example |
|---|---|---|
| **Who** | What role, company size, and industry? | "Ops lead at a 20-100 person logistics company" |
| **Why now** | What triggered the need, today, specifically? | "Just outgrew spreadsheets after hiring their 3rd dispatcher" |

A "who" without a "why now" describes a demographic, not a buyer. Plenty of ops leads at 20-100 person companies are perfectly happy with spreadsheets. You need the trigger event that moves someone from "this is fine" to "I need a tool."

---

## Building Your ICP

Answer these in order. Each answer constrains the next one — don't jump around.

**1. Company profile**
- Size (employee count or revenue range — pick whichever correlates with your product's value)
- Industry or vertical (or explicitly "industry-agnostic" if true)
- Growth stage (early startup, scaling, established)

**2. Buyer and user**
- Who evaluates and buys? (Often not who uses it daily — a manager buys, a team uses it)
- Who uses it day-to-day, and how often?
- If buyer ≠ user, your onboarding and pricing both need to satisfy two different people.

**3. The trigger**
- What specific event makes someone start looking for a product like yours?
- What were they doing before (spreadsheet, competitor, nothing, manual process)?

**4. The disqualifiers**
- Who looks like your ICP but isn't? Be explicit — this prevents scope creep later.

> [!TIP]
> Disqualifiers are the most skipped part of an ICP and the most valuable. "We're not for solo freelancers" or "we're not for enterprises needing custom contracts" tells you exactly which feature requests to say no to for the next year.

---

## Decision Card: Narrow vs Broad ICP

| | Narrow ICP | Broad ICP |
|---|---|---|
| **Onboarding** | Can be opinionated, prescriptive | Must be flexible, more configuration |
| **Pricing** | Simple — one clear value metric | Complex — needs tiers for different segments |
| **Marketing** | Cheap, specific channels (niche communities, direct outreach) | Expensive, generic channels (broad ads) |
| **Risk** | Miss adjacent revenue | Build a product that's mediocre for everyone |

**For a production SaaS built by a small team, narrow wins.** You have limited engineering hours; a narrow ICP lets every one of them go toward solving one group's problem deeply instead of spreading thin across many shallow use cases. You can broaden later — broadening a focused product is much easier than narrowing an unfocused one.

---

## How ICP Shapes Concrete Product Decisions

This isn't an abstract exercise — your ICP answers directly determine things you'll build in the next few modules:

| ICP factor | Downstream decision it drives |
|---|---|
| Team size at buyer companies | Single-user vs multi-tenant data model, roles/permissions need |
| Technical sophistication of users | Onboarding complexity, need for in-app guidance vs self-serve docs |
| Buying process (self-serve vs sales-assisted) | Whether you need a pricing page with instant checkout, or a "book a demo" flow |
| Compliance needs (healthcare, finance, enterprise) | SOC 2 timeline, data residency, audit logging requirements |
| Where they currently solve this problem | Your onboarding's core job: migrating them off that thing |

> ** Best Practice**
> Write one sentence connecting your ICP directly to a database or architecture decision you're about to make: "Because our ICP buys as a team of 3-8 and needs shared visibility, we need multi-tenant orgs with roles, not per-user accounts." If you can't write that sentence yet, your ICP isn't specific enough to build from.

---

## AI Prompts

**1. ICP stress-test prompt** — use after you've drafted your own ICP, to pressure-test it:

```
Here is my draft ICP for a B2B SaaS product:

[paste your who / why-now / buyer-vs-user / disqualifiers]

Product: [one-sentence description of what the product does]

Challenge this ICP:
1. Is the "why now" trigger specific enough to write targeted
   marketing copy against, or is it generic enough to apply to
   almost any company?
2. Are there two distinct sub-segments hiding inside this one ICP
   that would actually need different onboarding or pricing?
3. Given this ICP, what's the single most important architectural
   decision (multi-tenancy, SSO, permissions, compliance) I should
   NOT skip in early development?

Be direct about weaknesses. Don't validate a vague ICP just because
I wrote it confidently.
```

> [!TIP]
> Don't ask AI to invent your ICP from scratch based on your product idea alone — it will produce something generic and demographically plausible but untested. Use AI to stress-test an ICP you've already reasoned through from a real observed problem (yours, a friend's, or research you've done), not to originate it.

---

## Validation Checklist

- [ ] ICP includes a specific trigger event ("why now"), not just a demographic
- [ ] Buyer and user are identified separately, even if they're the same person
- [ ] At least one explicit disqualifier is written down
- [ ] You can state one sentence connecting the ICP to a concrete architecture decision (multi-tenancy, SSO, permissions, etc.)
- [ ] The ICP is narrow enough that you could name 5 real companies or people who fit it
- [ ] You've decided narrow vs broad deliberately, not by default

---

## What's Next

With your ICP defined, the next module covers **AI Architecture** — deciding where and how AI capabilities fit into your product's core value, not just as a bolted-on feature.
