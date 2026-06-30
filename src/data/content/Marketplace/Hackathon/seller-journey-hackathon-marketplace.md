---
title: Seller Journey
slug: seller-journey
phase: Phase 1
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: seller-journey-hackathon-marketplace.md
---

# Seller Journey

You've mapped how a buyer finds and gets something. Now map the other half: how something gets onto the marketplace in the first place. This journey gets less demo time than the buyer side, but it's where your supply actually comes from — get it wrong and the buyer journey has nothing real to show.

---

## Why This Journey Is Shorter, Not Less Important

In your 3-minute demo, you'll likely spend less time on the seller side than the buyer side — that's a reasonable demo-pacing choice. But "less demo time" doesn't mean "less build priority." The seller journey is what produces the listings the buyer journey depends on; if it's broken or unconvincing, the buyer experience has nothing real underneath it.

> **Reframe:** Think of the seller journey as the engine room. Judges spend less time looking at it directly, but everything they do see on the buyer side only works because this part functions.

---

## The Three Moments That Matter

A hackathon seller journey needs far less depth than a buyer journey — most marketplaces don't even demo this live, they show it briefly or describe it. Don't over-build this relative to its actual demo weight.

### 1. Listing Creation
The seller's core action — and the only one almost guaranteed to appear in your live demo. This needs to work cleanly and quickly, because you may show this exact form being filled out on stage.

> **Best Practice:** Keep the listing form to the minimum fields your buyer journey actually displays. If your listing detail page shows title, price, description, and one image, your form needs exactly those four fields — not a comprehensive product schema with fields nothing downstream uses.

### 2. Listing Confirmation
The moment a seller knows their listing is live. This matters for the same reason buyer-side confirmation matters: an action with no visible feedback reads as broken, even when it succeeded.

> **Tip:** The strongest version of this moment, if your time budget allows, is showing the new listing appear immediately in the buyer-facing browse view — directly demonstrating that the loop connects. This single moment can do more demo work than an elaborate seller dashboard.

### 3. Activity Awareness
Does the seller see that something happened — a sale, a message, interest? This is almost always part of your Fake It list (see MVP Scope), not something you build real-time infrastructure for. A static "You have 1 new offer" notification, hardcoded or lightly simulated, accomplishes the same demo goal as a real notification system.

> **Warning:** Don't build real-time notifications (websockets, polling, push) for this unless your concept's core differentiator specifically requires it. This is exactly the kind of feature that's expensive to build correctly and cheap to fake convincingly — it belongs on your Fake It list, not your Must Build list.

---

## What Belongs on the Seller Dashboard (And What Doesn't)

| Include | Exclude |
|---|---|
| List of the seller's own active listings | Analytics, charts, performance metrics |
| Create listing action | Bulk editing, CSV import |
| Basic status per listing (active/sold) | Inventory management beyond a single quantity field |
| One activity indicator (Fake It) | Full messaging inbox (covered in Fake Messaging) |
| Edit/delete on own listing | Payout history, earnings dashboard |

> **Common Mistake:** Building a full seller "dashboard" with metrics, charts, and management tools because it feels like what a real marketplace would have. A judge will spend seconds on this screen, if they see it at all — every hour spent here is an hour not spent making the buyer journey and core loop excellent.

---

## Mapping Your Journey

| Moment | Screen/Component | Connects to |
|---|---|---|
| Listing Creation | [your create-listing form] | Must produce data that renders correctly on the buyer's discovery and detail screens |
| Listing Confirmation | [your post-submit state] | Should visibly match what now appears in buyer-facing browse |
| Activity Awareness | [your seller home/dashboard] | Fake It — static or lightly simulated, not a real notification system |

---

## The Connection Point

This is the single most important thing to verify before moving on: **does a listing created through your seller form actually appear, correctly, in your buyer browse and detail screens?**

> **Best Practice:** Test this connection manually, end to end, as your very first integration check once both journeys have any working code. This is the one place where a marketplace's two-sided nature can quietly fail — each side might work in isolation while the actual connection between them is broken or untested.

---

## Using AI Effectively Here

Use AI to keep your seller-side build minimal and correctly prioritized — the risk here is over-building, not under-specifying.

**📋 Copy this prompt:**

```
Here's my planned seller journey for a hackathon marketplace: [list your actual screens/steps]

My buyer-facing listing detail page shows these fields: [list exactly what fields appear on the buyer side]

Review my seller journey for:
1. Does my listing creation form collect exactly the fields the buyer side displays — no more, no less?
2. Am I planning to build anything (dashboard features, real-time activity, analytics) that belongs on a Fake It or Cut Entirely list instead?
3. Is there a clear, testable connection point where a created listing appears correctly on the buyer side?

Be aggressive about flagging over-building here specifically — the seller journey gets less demo time than the buyer journey and shouldn't receive disproportionate build effort.
```

---

## Validating the Output

- [ ] Does the listing creation form collect exactly the fields your buyer journey displays — no mismatch, no excess?
- [ ] Is there a visible confirmation when a listing is created?
- [ ] Is "activity awareness" planned as a Fake It item, not real-time infrastructure?
- [ ] Have you identified the specific, testable connection point between seller-created listings and buyer-visible listings?
- [ ] Does your seller dashboard avoid analytics, charts, or management features a judge will never see?

---

## Before You Continue

- [ ] Listing creation form fields match buyer-facing display fields exactly
- [ ] Visible confirmation state designed for successful listing creation
- [ ] Activity awareness confirmed as Fake It, not real build scope
- [ ] Connection point between seller and buyer journeys identified as a specific thing to test, not assumed to work

**Next up — Phase 2, Marketplace Architecture:** Authentication — deciding how much of a real auth system this marketplace actually needs.
