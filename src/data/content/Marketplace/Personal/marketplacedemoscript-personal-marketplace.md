---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
---

# Demo Script

The pitch deck told the story. The demo has to prove it — showing an actual match between a buyer and a seller, live, is the moment that turns "I built a marketplace" from a claim into something someone watched happen in front of them.

## The Decision You're Actually Making

Not "what do we click through." It's: **what's the single sequence that proves the two-sided coordination problem is genuinely solved — not just that buttons work, but that a real match between two independent parties can happen?**

A marketplace demo that only shows one side (just browsing listings, just creating a listing) misses the actual point. The proof is in showing both sides connect.

## The Two-Sided Demo Structure

Unlike a single-user app demo, a marketplace demo benefits from showing both perspectives, even briefly:

1. **Seller side** — show a real listing already live (don't create one live unless it's fast and reliable)
2. **Buyer side** — search or browse and find that exact listing
3. **The connection** — message the seller, or complete a purchase
4. **The trust signal** — point out the review/rating that helped that decision feel safe

> ** Best Practice:** Use a pre-existing real listing rather than creating one live, unless your listing flow is fast and completely reliable. The point of the demo is proving the *match* works, not proving the *form* works — don't spend your limited demo time on the less interesting half of the story.

## Pre-Stage Everything

- Have a real, existing listing ready to search for and find — don't rely on creating one live
- Know the exact search term that will surface it reliably
- Have a second account (buyer) logged in and ready, separate from your seller/admin view
- Test the full sequence against your live, deployed marketplace, not localhost

> **️ Warning:** Switching between two logged-in accounts live is one of the easiest places for a marketplace demo to stumble — a wrong password, a confused browser tab, a session that logged out. Have both accounts already logged in, in separate browser windows or profiles, before you ever start talking.

## The Script

| Action | Say |
|---|---|
| Show the seller's existing listing | "This was listed by a real seller on the platform." |
| Switch to buyer view, search for it | "Now, as a buyer, I search for exactly this." |
| Show it appearing in results with review/rating visible | "Notice the seller's rating right here — that's what makes a stranger trust this listing." |
| Complete or simulate the next step (message/purchase) | "And this is the actual moment two strangers connect through something I built." |

> ** Tip:** Explicitly narrate that these are two separate, real accounts — an audience unfamiliar with marketplaces may not immediately register that you're demonstrating two independent parties, and pointing it out directly makes the coordination-problem story land.

## Have a Fallback

> **️ Warning:** If your marketplace has genuinely low current traffic, a live search might return sparse or awkward-looking results if timed badly (e.g., right after a purchase removed the only demo listing). Have a backup plan — a second seeded listing, or a short screen recording of the flow — in case the live version doesn't cooperate exactly when you need it to.

## Use AI to Tighten the Sequence

**Prompt — Marketplace Demo Script Review**
```
Here's my planned two-sided demo script for a marketplace:
[paste your action/dialogue script]

Review for:
1. Any step that depends on something fragile (live listing creation, 
   account switching) that could fail during a live demo
2. Whether the script actually makes clear these are two separate, 
   real accounts/parties
3. A fallback plan if the live search or match doesn't work as expected
```

> ** Token Efficiency:** Keep this review focused on script mechanics and failure points, not story content — story structure was already handled in Presentation Prep, so this pass should be about execution risk, not narrative.

## Validate Before You Present

- Both accounts are pre-logged-in and tested in advance
- The demo listing you'll search for is confirmed to still exist and be findable right before presenting
- You've rehearsed the account-switch moment specifically, since it's the highest-risk step
- A fallback (backup listing or recording) exists in case live search doesn't cooperate

## Common Mistakes

- Demoing only one side (just browsing, or just listing) without showing an actual match
- Creating a listing live instead of using a pre-staged one, risking a slow or broken flow
- Fumbling account switches between buyer and seller views during the live demo
- No fallback plan if the live environment doesn't behave exactly as rehearsed

## Quick Reference

| Must-have | Nice-to-have | Avoid |
|---|---|---|
| Pre-staged real listing | Fallback recording | Live listing creation as the centerpiece |
| Two pre-logged-in accounts | Explicit narration of "two real parties" | Unrehearsed account switching |
| Tested against live deployed app | Trust signal called out explicitly | Demoing only one side of the marketplace |

## What's Next

With the demo rehearsed, the final module is the Submission Checklist — making sure everything (the app, the deck, the demo, the legal and policy work from earlier phases) is actually ready to be shared or presented.
