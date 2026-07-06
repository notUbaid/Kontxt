---
title: Seller Onboarding
slug: seller-onboarding
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Seller Onboarding

Every marketplace has a chicken-and-egg problem, and seller onboarding is where you actually solve the "supply" half of it. A buyer who arrives to an empty or low-quality catalog leaves immediately and rarely comes back. Getting sellers to list well, fast, is the highest-leverage thing you can do at launch.

This module is narrower than it sounds: not a general "improve your UX" exercise, but specifically the path from "I signed up" to "I have a live, good-quality listing."

---

## Why Seller Onboarding Is Disproportionately Important

> ** Core rule:** in a marketplace, buyer experience is downstream of seller experience. A confusing buyer flow loses one buyer. A confusing seller flow loses the listings that every future buyer would have seen. Fix friction on the supply side first — it compounds.

This connects directly back to your Phase 0 decisions about supply-side strategy and Chicken & Egg Strategy — onboarding is where that strategy either works or quietly fails.

---

## The Real Drop-Off Points

Beta testing (previous module) likely already surfaced some of these directly — use that data here rather than guessing blind.

| Stage | Common drop-off cause |
|---|---|
| Signup | Too many required fields before any value is shown |
| First listing creation | Unclear what makes a "good" listing — empty-state guidance missing |
| Photo upload | Friction in the upload flow, or no clear sense of how many photos are expected |
| Pricing | Uncertainty about what to charge — no reference point provided |
| Publishing | Listing goes live but seller doesn't know what happens next |

> ** Validation Checklist**
- [ ] Does your signup ask for only what's needed to get a seller to their first listing, deferring optional profile details to later?
- [ ] Is there a single, obvious next action after signup — not a dashboard with five equally-weighted options?
- [ ] Does the listing creation form give in-context guidance (not a separate help doc) on what makes a listing effective?

---

## Decision: Guided vs. Self-Serve Onboarding

> ** Decision Card — Onboarding Style**
>
> **Option A: Fully self-serve** — sign up, land on a form, figure it out
> Fastest to build, works fine for sellers who are already comfortable with similar platforms, but loses less-experienced sellers at the first ambiguous moment.
>
> **Option B: Lightly guided** — a short checklist or progressive flow (account → first listing → payout setup), with contextual tips at each step
> More setup, meaningfully reduces drop-off for sellers unfamiliar with online marketplaces.
>
> **Option C: Fully guided wizard** — multi-step modal flow, can't proceed without completing each step in order
> Highest hand-holding, but can feel slow and patronizing to sellers who just want to list something quickly.
>
> **For Personal Mode: use Option B.** A simple checklist ("Set up payouts → Create your first listing → You're live") gives structure without forcing a rigid sequence, and is cheap to build compared to a full wizard.

---

## The First-Listing Moment Matters Most

This is the single highest-leverage screen in your entire onboarding flow — get a seller through their first successful listing, and most of the rest of the relationship takes care of itself.

> ** Validation Checklist**
- [ ] Does the listing form show a live preview of how the listing will actually appear to buyers? (Removes the "what will this actually look like" uncertainty)
- [ ] Is there a minimum viable example shown — a sample title/description — so sellers aren't staring at a blank field with no reference point?
- [ ] Does the form validate and give feedback inline (per your Listings module's validation rules), rather than only on submit — catching issues before the seller has invested effort filling out the whole form?
- [ ] After publishing, is there an immediate, clear confirmation of what happens next (e.g. "Your listing is live — you'll get a notification when someone messages you")?

---

## Payout Setup: Don't Bury It, Don't Front-Load It

Connecting a payout method (via your payment processor, from the Payments module) is necessary before a seller can actually get paid — but forcing it before they've even created a listing adds friction before any value has been demonstrated.

> ** Rule of thumb:** let sellers create and preview a listing before requiring payout setup, but require it before the listing can actually go *live* and be visible to buyers. This sequencing shows value first, then asks for the slightly more sensitive step (bank/payout details).

```
Sign up → Create listing (draft) → Preview → Connect payout → Listing goes live
```

This sequencing decision should reflect back into your Listing status flow from the Listings module — `draft` status is exactly what allows this sequencing to work cleanly.

---

## Quality Guidance Without Being Annoying

You want good listings without making sellers feel graded or judged on their first attempt.

> ** Validation Checklist**
- [ ] Are quality tips presented as helpful suggestions ("Listings with 3+ photos sell faster") rather than blocking requirements?
- [ ] Is there a clear minimum bar that *is* enforced (per your Listings validation rules — title/description length, at least one photo) vs. soft suggestions that aren't?
- [ ] Does the guidance come from real signal if you have any (e.g. "Listings with photos get more views" — only claim this if you can actually back it once you have data; don't fabricate a stat)?

---

## AI Prompt: Design the Onboarding Checklist Flow

> ** Copy Prompt**
>
> ```
> Design a seller onboarding flow for my personal marketplace project.
> Stack: [YOUR STACK].
>
> Requirements:
> 1. A lightweight progress checklist (not a blocking wizard): Connect payout →
>    Create first listing → Publish. Sellers can complete steps in a flexible order
>    except that publishing requires payout setup first.
> 2. Listing creation form should show a live preview pane alongside the input fields
> 3. Inline validation matching my existing listing validation rules — show errors
>    as the seller types, not just on submit
> 4. After first listing is published, show a clear confirmation with next steps
>    (what notifications to expect, how messaging works)
> 5. Reuse my existing Listing draft → active status flow — don't invent a new status
>
> Existing Listing schema and status flow:
> [PASTE YOUR LISTING SCHEMA/STATUS FLOW FROM THE LISTINGS MODULE]
> ```
>
> **Why this prompt works:** explicitly requiring reuse of your existing draft → active status flow prevents AI from inventing a parallel onboarding-specific status system that would conflict with the listing lifecycle you already carefully designed in an earlier module.

---

## Validating Against Beta Testing Data

> ** Common Hallucination:** AI will design onboarding flows based on generic marketplace best practices, which may not match what your *actual* beta testers struggled with. If your Beta Testing module surfaced a specific drop-off point (e.g. testers got confused at photo upload, not pricing), prioritize fixing that specific friction over implementing generic onboarding patterns AI suggests by default.

> ** Validation Checklist**
- [ ] Does the onboarding flow specifically address the drop-off points your beta testers actually hit?
- [ ] Did AI's suggested checklist order match your actual payout-before-publish sequencing, or did it default to a different order that doesn't match your decision above?

---

## Token Efficiency Tip

This module benefits from referencing your Beta Testing notes directly rather than re-describing your app generically — paste the specific friction points testers hit, and ask AI to design onboarding improvements targeted at those, rather than a generic onboarding flow from scratch.

---

## What You've Decided

By the end of this module you should have:

- A lightweight, checklist-based onboarding flow rather than a blocking wizard
- Payout setup sequenced after initial listing creation but before publishing
- A first-listing experience with live preview and inline validation
- Quality guidance presented as suggestions, with only your real validation rules actually enforced
- Onboarding improvements targeted at real friction points from beta testing, not generic assumptions

**Next:** Buyer Onboarding — the mirror-image flow for the demand side of your marketplace.
