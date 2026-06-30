---
title: Demand Side
slug: demand-side
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
filename: demand-side-personal-marketplace.md
---

# Demand Side

You've defined who's supplying. Now define who's buying — with the same precision, not less. It's tempting to think of demand as "everyone who wants this thing," but a vague demand side leads to a generic homepage, generic search, and a marketplace that doesn't feel built for anyone in particular.

The same rigor from Supply Side applies here, with one added wrinkle: buyers usually have lower tolerance for a new, unproven platform than sellers do.

---

## "Buyers" Is Not a Real Answer (Same Rule as Supply Side)

**Weak:** "People who need pet sitting."

**Specific:** "Pet owners who travel 2-4 times a year and currently rely on asking a neighbor or paying for an expensive kennel, who'd prefer a vetted local sitter at a lower cost."

The specific version tells you what they're currently doing instead (neighbor favor, kennel), what's wrong with it (inconvenient, expensive), and what would make your platform appealing (cheaper, more convenient, still trustworthy).

---

## What Buyers Actually Need From a Marketplace

| Need | What it means for your design |
|---|---|
| **Confidence in quality before committing** | Photos, descriptions, reviews — enough information to decide without seeing it in person |
| **Trust in the seller/platform** | Especially true for services or higher-value goods; a brand-new platform starts at zero trust |
| **Easy comparison** | Can they evaluate multiple options quickly, or is every listing a research project? |
| **A clear path to actually transacting** | Obvious next step — message, book, buy — not a maze |
| **Recourse if something goes wrong** | Even informal recourse (a review system, a way to flag issues) reduces perceived risk |

> **Decision:** For an MVP, "confidence in quality" and "a clear path to transacting" matter more than advanced comparison tools (side-by-side comparisons, saved searches, wishlists). Buyers need to trust what they're looking at and know what to do next — everything else is a later optimization.

---

## Buyers Are More Risk-Averse Than Sellers, Early On

A seller listing something has little to lose — worst case, nobody buys it. A buyer paying money or booking a service from a stranger on a brand-new platform is taking a real risk. This asymmetry matters:

> **Warning:** Don't assume that because sellers signed up, buyers will follow at the same rate. Demand-side trust usually needs more explicit signals — visible reviews (even a few), a clear refund/dispute policy, or simply you personally vouching for early sellers in a small community. Skipping this is a common reason early marketplaces get supply but not demand.

---

## First-Time Buyer vs. Repeat Buyer

Same distinction as supply side, mirrored:

- **First-time buyers** need maximum reassurance and the lowest-friction first transaction — this is where most of your early trust-building effort goes
- **Repeat buyers** already trust the platform from a good first experience; they need efficiency (fast re-search, maybe saved preferences) more than reassurance

> **Tip:** Every design decision in Phase 1 for the buyer journey should bias toward making the *first* transaction feel safe and easy. A platform optimized for power users before it has any repeat users is solving a problem you don't have yet.

---

## Where Demand Actually Comes From for a Solo-Built Marketplace

Unlike supply (which you can recruit by direct outreach to specific sellers), demand for a brand-new marketplace is harder to manufacture — buyers don't show up just because you asked nicely. Be realistic about where your first buyers come from:

- The same community where you found your first sellers — often the same people are both, depending on your niche
- Personal network: people who know you and are willing to try something new as a favor or out of curiosity
- A specific, narrow local or online community where the problem you solve is acutely felt

> **Decision:** For a personal project, plan for your first 10-20 buyers to come from direct, personal effort — not from the product being discoverable on its own. If your demand-side plan depends on people finding your marketplace organically before you have any reviews or reputation, that plan needs revisiting.

---

## The Trust Gap Between You and Established Competitors

Whatever competitor research you did earlier in Phase 0, those competitors likely have reviews, history, and brand recognition your new marketplace doesn't. Name this gap honestly:

```
What an established competitor offers a buyer that I currently can't:
[e.g., "thousands of reviews," "buyer protection guarantee," "name recognition"]

What I can offer instead, at small scale, that partially compensates:
[e.g., "personal vetting of every early seller," "a tighter, more relevant niche,"
 "direct access to me if anything goes wrong"]
```

This isn't about matching a competitor's scale — it's about having an honest answer for why a buyer would still try you despite the trust gap.

---

## Writing Your Demand Side Definition

```
My demand side is: [specific description, not "buyers"]
They currently solve this problem by: [their current alternative]
What they need most to trust a new platform: [top 1-2 needs from above]
Where I can find the first 10-20 of them: [specific community/channel/people]
```

---

## AI Prompts You Can Use

**Prompt 1 — Sharpen a vague demand side description:**

```
My marketplace's demand side is currently described as: "[your current
description]." Help make this more specific — who exactly are they,
what's their current alternative, and what's the biggest trust barrier
they'd have trying a brand-new, unproven platform? Ask clarifying
questions if needed instead of guessing.
```

**Prompt 2 — Identify the trust gap honestly:**

```
My marketplace competes loosely with [competitor(s) from your research].
What trust signals do they have that I won't have at launch (reviews,
history, scale, guarantees)? What's realistic for me to offer instead
as a solo-built platform with a handful of early users?
```

---

## Validating What AI Generates

- [ ] **Don't accept a demand-side description that's just the inverse of your supply side without independent thought** — buyers often have meaningfully different motivations than "the people who'd also sell," even in the same niche
- [ ] **Check that suggested trust-gap mitigations are things you can actually do as one person** — "build a buyer protection program" is not realistic at this stage; personal vetting and transparency usually are
- [ ] **Verify any claimed buyer behavior pattern** ("buyers in this niche typically...") against your own competitor research from earlier, rather than taking it as given

---

## Implementation Checklist

- [ ] Demand side described specifically — not "buyers," but a precise type of person
- [ ] Classified by what first-time buyers need most (reassurance) vs. what repeat buyers need (efficiency)
- [ ] Current alternative (what they do without your platform) identified
- [ ] At least one real community or 10-20 real people identified as potential first buyers
- [ ] Honest trust-gap statement written: what competitors offer that you can't yet, and what you can offer instead

---

## What's Next

Next: **Marketplace Liquidity** — defining what "enough" supply and demand actually looks like for your specific marketplace to feel alive.
