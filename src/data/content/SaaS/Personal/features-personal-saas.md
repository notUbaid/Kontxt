# Features

 **Estimated Time:** 15 Minutes

---

Features are where ideas go to get complicated.

You start with a sharp idea. Then you add "just one more thing." Then another. Then a few edge cases. Then the thing you saw in a competitor. Three months later you're still building and nothing ships.

This module is about deciding what to build before you start — and making those decisions in a way that actually holds when you're deep in development.

---

## The Real Job of This Module

You're not listing features.

You're making a series of bets about what your persona needs most, in what order, to experience the core value of your product.

Every feature you include is a bet that it earns its development time. Every feature you exclude is a bet that it's not what makes or breaks the product.

Most first-time solo builders include too many features in v1. The product takes three times as long to ship. By the time it's done, they're tired, the motivation is gone, and they've built features nobody asked for.

The discipline is subtraction.

---

## Core vs. Supporting vs. Later

Every feature in your head belongs in one of three buckets.

| Bucket | Definition | Question to ask |
|--------|-----------|----------------|
| **Core** | Without this, the product doesn't solve the problem | "Does removing this break the core value?" |
| **Supporting** | Makes the core better but isn't the reason someone switches | "Does this make Core features work better?" |
| **Later** | Nice to have. Requested eventually. Not v1. | "Could users live without this at launch?" |

Your v1 should be **Core only** — with the minimum Supporting features needed to make Core usable.

Nothing from the Later bucket ships until real users have validated the Core.

---

## How to Categorize Your Features

Take every feature idea you have and run it through this sequence:

```
Does your persona need this to experience the core value?
├── Yes → Core
└── No → Does it make the core significantly better?
           ├── Yes → Supporting
           └── No → Later
```

Do this for every feature. Be honest. "Significantly better" is doing a lot of work — most features belong in Later.

---

## The One-Feature Test

You identified the one-feature version of your product in the Idea module.

Now ask: if you shipped only that one feature, could a user experience the core value of the product?

If yes — that's your Core. Everything else is Supporting or Later.

If no — your Core needs more features to be useful. Add the minimum required. Stop there.

> [!WARNING]
>
> "The minimum required" is not the same as "everything that would be nice."
> It means: what is the smallest set of features where a user can actually accomplish the thing they came to do?
> Draw that line. Defend it.

---

## Feature Creep Happens in Advance

The most dangerous features are the ones you add before you start building.

They feel necessary. They seem obvious. They're often things you saw in competitors or thought of in the shower.

Before adding any feature to Core or Supporting, ask:

- Has my persona explicitly asked for this, or am I assuming?
- Does this exist because it solves a real problem, or because it would be cool to build?
- If I removed this, would a user fail to accomplish their goal?

If the answers are "assumed," "cool to build," and "no" — it's a Later feature.

---

## What Belongs in V1

A useful v1 has exactly this shape:

```
The thing that proves your core idea works
  + The minimum scaffolding to make it usable
  + Nothing else
```

For most personal SaaS products that means:

- The core action (the thing your product uniquely does)
- Authentication (users need to log in and have their own data)
- Basic navigation (users can find the core action)
- Error states (things can fail without breaking the user's work)

That's it.

Not: settings pages, notifications, integrations, export functions, analytics dashboards, team features, admin panels, API access, dark mode.

All of those are real. None of them are v1.

---

## The Feature List Format

Write your features in this format. It forces clarity.

```
Feature name
As [persona], I need to [action] so that [outcome].
Core / Supporting / Later
```

**Example:**

```
Invoice auto-send
As a freelance designer, I need to automatically send an invoice
when I mark a project milestone as complete, so that I don't
forget to bill clients and they receive it immediately.
Core

Invoice history
As a freelance designer, I need to view a list of all invoices
sent and their payment status, so that I know what's been paid
and what's outstanding.
Supporting

Invoice PDF customization
As a freelance designer, I need to customize the look of my
invoice with my logo and colors, so that it matches my brand.
Later
```

Notice: the Core and Supporting features let the product do its job. The Later feature makes it nicer. Nicer is not v1.

---

## AI Prompt — Prioritize Your Feature List

Use this after you've listed your features.

```prompt
I'm building a personal SaaS product. Help me prioritize my feature list for v1.

**My persona:**
[paste persona summary]

**Core product idea:**
[one sentence]

**My feature list:**
[paste all features you're considering]

Do the following:
1. Categorize each feature as Core, Supporting, or Later — with a one-line reason
2. Identify any features I'm missing that are actually required for the Core to work
3. Flag any features I've listed as Core that are actually Supporting or Later
4. Tell me what the v1 scope should be — the minimum that delivers real value
5. Name the single feature most likely to cause scope creep if I'm not careful

Be ruthless. The goal is to ship something real, not build everything I can imagine.
```


---

## Scope as a Product Decision

Cutting features from v1 is not failure. It is strategy.

Shipping a focused product that does one thing extremely well is more valuable than shipping a broad product that does many things adequately.

Users who find a product that solves their specific problem completely will tell others. Users who find a product that half-solves many problems will churn.

Your v1 scope is your first product decision. Make it deliberately.

---

## What To Do With Later Features

Don't throw them away. Put them somewhere you'll find them.

A simple list, a Notion page, a GitHub issue — whatever you'll actually use.

These become your v2 roadmap. More importantly, they tell you what to watch for when real users give you feedback. If a Later feature gets requested by three different users independently — that's a signal to move it up.

You're not ignoring Later features. You're deferring them until you have evidence they're needed.

---

## Features Checklist

- [ ] Every feature idea categorized as Core, Supporting, or Later
- [ ] Core features pass the one-feature test (they exist because removing them breaks the product)
- [ ] V1 scope defined: Core + minimum Supporting only
- [ ] No features added because they're interesting to build
- [ ] No features added because competitors have them
- [ ] Each Core feature written in "As [persona], I need to... so that..." format
- [ ] Later features saved somewhere for v2 reference
- [ ] AI prioritization prompt run and scope validated

---

## Next

**PRD →** Your features are defined. Now turn them into a document that guides every technical decision from here.
