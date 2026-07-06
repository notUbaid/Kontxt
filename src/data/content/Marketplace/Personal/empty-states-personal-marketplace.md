---
title: Empty States
slug: empty-states
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
filename: empty-states-personal-marketplace.md
---

# Empty States

Every screen you wireframed assumed data exists — listings to browse, messages to read. But a brand-new marketplace spends its early life mostly empty, and a real user's first session is often a first-time-user session with nothing in it yet. This module designs for that reality, which connects directly back to the liquidity problem from Phase 0: a thin marketplace that *looks* broken loses users faster than one that's honest about being new.

This is a short module by design — empty states are a small amount of design work with outsized impact on whether your early, thin marketplace feels intentional or broken.

---

## Why Empty States Matter More for Marketplaces Specifically

A blank list in most apps just means "you haven't added anything yet." In a marketplace, a blank browse page can mean several different things — no listings exist anywhere yet, your search/filter returned nothing, or something's actually broken — and a user can't tell which without help. An undesigned empty state collapses all three into the same confusing blank screen.

> **Decision:** Every empty state needs to communicate which situation it is, and what to do next. "No results" alone isn't enough — distinguish between "nothing exists yet" and "your filters found nothing."

---

## The Marketplace Empty States You Actually Need

| Screen | Empty scenario | What it should communicate |
|---|---|---|
| Browse/Home | No listings exist yet at all | Platform is new, here's how to be the first (e.g., "Be the first to list something") |
| Browse, filtered | Search/filter returned nothing | Filters too narrow, suggest broadening or clearing |
| My Listings | Seller has no listings yet | Clear call to action: create your first listing |
| Message Thread | No messages yet (just opened) | Prompt to start the conversation, not a blank void |
| Listing Detail comments/reviews (if in MVP) | No reviews yet | Honest, not awkward — "No reviews yet" rather than implying something's missing |

> **Tip:** "No listings exist yet" and "your search found nothing" need visibly different messaging, even though both result in an empty list. Conflating them is the most common empty-state mistake.

---

## Writing Empty State Copy That Doesn't Feel Apologetic

A weak empty state apologizes ("Sorry, nothing here") or states the obvious without helping ("No results"). A strong one acknowledges the state and gives a clear next action.

**Weak:** "No listings found."

**Stronger:** "No listings match your search. Try a broader search or browse all categories."

**For a genuinely new marketplace:** "Be the first to list something here — it only takes a minute."

> **Decision:** For your very first empty browse page (before you have any real listings), be honest that the platform is new rather than pretending otherwise. A confident "be the first" framing reads better to an early visitor than a generic "no results" that implies something's broken.

---

## Empty States Aren't Just Text — They're Also a Design Decision

A well-designed empty state usually includes: a brief message, a clear primary action (button), and optionally a simple illustration or icon — not a complex graphic, just enough to signal "this is intentional, not broken."

> **Warning:** Don't over-invest in custom illustrations for empty states at MVP stage — a simple icon from an existing icon library is enough. This is exactly the kind of polish that's nice but not worth real time for a personal project's first version; revisit if it matters more once you have real users.

---

## Connecting Empty States to Your Liquidity Plan

Recall your Marketplace Liquidity module's target — the number of listings needed before a browse page feels "alive." Until you hit that number, your real users will likely see the "few or no listings" version of this state, not the ideal full-grid version.

> **Decision:** Don't design your browse page only for the post-liquidity, fully-populated state. Explicitly design (or at least mentally walk through) what it looks like with 0, 3, and 10 listings — these are the states your actual early users will see most, per your Chicken & Egg Strategy plan.

---

## AI Prompts You Can Use

**Prompt 1 — Write empty state copy for each screen:**

```
Here are the screens in my marketplace MVP: [list from your Wireframes
module]. For each, write empty state copy distinguishing "nothing exists
yet" (new platform) from "your search/filter found nothing" where
applicable. Keep each message under 20 words, with one clear suggested
next action.
```

**Prompt 2 — Generate the empty state component:**

```
Using this design system [paste your tokens from Design System], build
a reusable empty state component: icon/illustration slot, message text,
and an optional primary action button. Should work for both the
"no listings yet" and "no search results" cases with different props.
```

---

## Validating What AI Generates

- **Confirm copy distinguishes "nothing exists" from "no results found"** — AI sometimes generates one generic message reused everywhere, which loses the distinction that matters most here
- **Check tone matches your marketplace's actual voice** — generated copy can default to overly cheerful or generic startup language; adjust to fit how you'd actually talk to your specific niche's users
- **Verify the component actually uses your design tokens**, not new colors or spacing introduced during generation — same check as the Design System module, worth repeating here

---

## Implementation Checklist

- [ ] Empty state designed for browse page with zero listings (new platform messaging)
- [ ] Separate empty state designed for filtered search with no results
- [ ] "My Listings" empty state includes a clear create-listing call to action
- [ ] Message thread empty state prompts starting a conversation, not a blank void
- [ ] Mentally walked through browse page at 0, 3, and 10 listings — not just the fully-populated ideal

---

## What's Next

Next: **Error States** — designing what happens when something goes wrong, the second of the three non-happy-path modules in this phase.
