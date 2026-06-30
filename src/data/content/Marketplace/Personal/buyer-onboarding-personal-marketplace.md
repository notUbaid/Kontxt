---
title: Buyer Onboarding
slug: buyer-onboarding
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Buyer Onboarding

Seller onboarding gets a person from signup to a published listing. Buyer onboarding gets a person from arrival to a completed purchase — and it's a fundamentally different shape of problem, because buyers don't need to be taught how to use your tools. They need to be convinced, fast, that what they're looking at is worth their trust and their money.

---

## Why Buyer Onboarding Looks Different From Seller Onboarding

> **🔑 Core rule:** sellers need *capability* (how do I create a good listing). Buyers need *confidence* (is this listing, this seller, this platform trustworthy enough to pay). Don't reuse seller onboarding patterns here — a checklist or wizard is the wrong shape for a buyer who just wants to browse and decide quickly.

| | Seller onboarding | Buyer onboarding |
|---|---|---|
| Primary need | Guidance on how to do something | Trust signals to make a fast decision |
| Friction tolerance | Will tolerate a few steps for future earning potential | Very low — will bounce at the first confusing moment |
| Success looks like | A completed, published listing | A completed purchase, or a saved/messaged listing |

---

## The Trust Problem, Specifically

A new buyer has no relationship with your platform yet. Every signal that reduces uncertainty matters more here than feature completeness.

> **✅ Validation Checklist — Trust signals worth surfacing early**
> - [ ] Seller rating and review count visible directly on listing cards, not buried on a separate seller profile page (uses the aggregate rating you built in Reviews)
> - [ ] Clear indication of how disputes/non-delivery are handled, even just a short line ("Payment is held until you confirm delivery") — references your Fraud Prevention order confirmation flow
> - [ ] Recognizable, consistent listing quality (photos, descriptions) — a direct payoff of the seller-side quality guidance from the previous module
> - [ ] No requirement to create an account just to *browse* — account creation should happen at the point of actual commitment (messaging a seller or buying), not before

> **⚠️ Warning:** Forcing signup before allowing any browsing is one of the most common buyer-side drop-off causes in early-stage marketplaces. Let people see real listings, real reviews, real prices first — that's what builds the confidence that makes signup feel worth it, not a gate before any of that is visible.

---

## Decision: When to Require an Account

> **🧩 Decision Card — Account Creation Timing**
>
> **Option A: Require signup before any browsing**
> Maximizes data capture, minimizes actual usage — most visitors leave before ever seeing your catalog's quality.
>
> **Option B: Allow full browsing, require signup only to message a seller or purchase**
> Lets the catalog itself do the convincing before asking for commitment.
>
> **Option C: Allow browsing and even messaging as a guest, with a lightweight signup only at actual payment**
> Lowest friction, but adds complexity (guest message threads need to be claimed by an account later) and isn't necessary at personal-project scale.
>
> **For Personal Mode: use Option B.** It captures the trust-building benefit of open browsing without the engineering complexity of guest-to-account migration that Option C requires.

---

## First Search Experience

For most buyers, their first real interaction with your marketplace is a search or browse result — not a homepage. This needs to work well immediately, with no learning curve.

> **✅ Validation Checklist**
> - [ ] Does an empty search result show something useful (related categories, popular listings) rather than a dead end?
> - [ ] Are filters (category, price range — from your Search Architecture module) visible and usable without explanation?
> - [ ] Does the listing card show enough information (price, photo, rating) to make a decision without clicking in, reducing wasted clicks?

---

## From Browsing to First Action

The goal of buyer onboarding isn't account creation — it's getting a buyer to take their first real action: messaging a seller or starting a purchase. Account creation is a means to that, not the goal itself.

> **🔑 Rule of thumb:** design the signup prompt to appear at the moment of genuine intent ("Message this seller" → "Sign up to send a message"), not as an interruption before intent has formed. This reduces both friction and the sense that you're gatekeeping value.

```
Browse listings (no account needed)
        ↓
Click "Message Seller" or "Buy Now"
        ↓
Lightweight signup (email + password, or OAuth) — minimal fields
        ↓
Return directly to the action they were taking (message sent, checkout resumed)
```

> **✅ Validation Checklist**
> - [ ] After signup triggered by an action (message/buy), does the user land back at that exact action — not a generic dashboard they have to navigate from again?
> - [ ] Is the signup form itself minimal — email and password (or a single OAuth click), not a full profile form? (Defer profile completion to after the action succeeds)

---

## What Happens After a Buyer's First Purchase

Onboarding doesn't end at signup — the first purchase experience determines whether a buyer becomes a repeat user or a one-time visitor.

> **✅ Validation Checklist**
> - [ ] Does the buyer get a clear confirmation of what happens next (when they'll hear from the seller, how delivery/pickup works, when to confirm receipt)?
> - [ ] Is there a gentle, well-timed prompt to leave a review after the order completes (per your Reviews module's completed-order requirement) — not so early it's annoying, not so late it's forgotten?
> - [ ] Does the buyer know how to message the seller again or report an issue if something goes wrong?

---

## AI Prompt: Design the Buyer Flow

> **📋 Copy Prompt**
>
> ```
> Design a buyer onboarding and first-purchase flow for my personal marketplace project.
> Stack: [YOUR STACK].
>
> Requirements:
> 1. Full browsing and search available without requiring an account
> 2. Account signup triggered only at "Message Seller" or "Buy Now" — minimal fields
>    (email + password or OAuth), no full profile form upfront
> 3. After signup, the user returns directly to the action that triggered it (message
>    composer pre-filled, or checkout resumed) — not a generic dashboard
> 4. Listing cards in search results show seller rating, review count, price, and photo
>    — reuse my existing aggregate rating calculation from the Reviews module
> 5. After order completion, show clear next-step messaging and a well-timed review prompt
>
> Existing search/listing endpoints and Review aggregate function:
> [PASTE RELEVANT CODE]
> ```
>
> **Why this prompt works:** specifying that signup must return the user to their original action — not a dashboard — addresses a specific, common buyer-side drop-off point that's easy for AI to skip if not explicitly required, since "redirect to dashboard after signup" is the more common generic pattern.

---

## Validating Against Beta Testing

> **🚩 Common Hallucination:** AI-designed onboarding flows sometimes default to requiring account creation immediately, mirroring common SaaS patterns where every visitor is expected to sign up — this is the wrong default for a marketplace's buyer side. If your Beta Testing module showed testers hesitating at an early signup wall, that's direct evidence to weight this decision correctly rather than relying on AI's generic default.

---

## Token Efficiency Tip

Buyer and Seller onboarding share underlying account/auth infrastructure but solve different UX problems — keep them as separate, focused prompts rather than asking AI to design "onboarding" generically in one pass, which tends to produce a flow that's mediocre for both rather than well-tuned for either.

---

## What You've Decided

By the end of this module you should have:

- Full browsing access without requiring signup
- Account creation triggered at genuine intent (messaging or buying), not as an upfront gate
- Trust signals (ratings, dispute handling, listing quality) surfaced early in the buyer journey
- A signup flow that returns buyers to their original action, not a generic dashboard
- A clear post-purchase experience with next steps and a well-timed review prompt

**Next:** Analytics Setup — measuring whether these onboarding flows are actually working once real users arrive.
