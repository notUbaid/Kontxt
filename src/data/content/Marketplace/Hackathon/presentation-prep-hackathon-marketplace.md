---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: hackathon
projectType: marketplace
estimatedTime: 20-30 min
filename: presentation-prep-hackathon-marketplace.md
---

# Presentation Prep

Your marketplace works. Auth, database, search, listings — all wired together and demoable. None of that matters if the next ten minutes of prep don't happen, because judges score what they see in three minutes, not what you built in two days.

This module is about closing the gap between "the app works" and "the app reads as impressive to someone who's never seen it before." That gap is almost entirely about framing, not code.

---

## The Judge's Reality

Judges typically see your project once, for a few minutes, after seeing several others that day. They are not debugging your code. They are pattern-matching against a small number of signals:

- Does this solve a real problem, stated clearly, in the first 15 seconds?
- Does the demo work without the presenter apologizing for anything?
- Is there a moment that's visually or conceptually memorable?
- Could I explain this project to someone else in one sentence after watching?

> **Decision:** Optimize your remaining prep time for these four things, not for adding one more feature. A team that polishes presentation usually outscores a team that adds a half-working feature in the same hour.

---

## The One-Sentence Test

Before writing anything else, write a single sentence describing your marketplace. If it takes more than one sentence, your pitch will too — and judges will lose the thread.

```
[Marketplace name] is a [marketplace type] where [buyer type]
can [core action] from [seller type], solving [specific problem].
```

Example: *"ReClaim is a marketplace where college students can buy and sell dorm furniture from each other, solving the end-of-semester waste problem when students dump usable furniture instead of selling it."*

> **Tip:** If your team can't agree on this sentence, that's a real signal — it means the demo script will wander. Settle it before building the script.

---

## Structuring the Demo Path

Don't demo your app by clicking around live and narrating. Script a specific path through specific screens, using specific seed data you control. Improvised demos are where bugs surface.

**The standard path that works for marketplaces:**

1. **Problem framing** (15-20 sec) — state the one-sentence pitch, then one stat or story that makes it concrete
2. **Buyer side** (45-60 sec) — search/filter for something, view a listing, message the seller
3. **Seller side** (45-60 sec) — create a listing live (pre-fill most fields to save time), show it appear in search
4. **The "wow" moment** (15-20 sec) — whatever is most polished or surprising about your build
5. **Close** (10-15 sec) — restate the problem, state what's next (Phase 6 territory, not code)

Total: under 3 minutes. Practice with a timer — teams consistently run long on the problem framing and short on the actual demo, which is backwards.

> **Warning:** Don't demo authentication (sign-up/login flow) live unless it's genuinely impressive. It's the least interesting part of your app and burns 20-30 seconds judges don't owe you. Start the demo already logged in as a seeded user.

---

## Seed Data Is Part of Your Presentation, Not Just Your Database

Go back to the seed data from the Database module and make sure it's pitch-ready, not just functional:

- Listing titles and images should look like real products, not "Test Item 1"
- At least one listing should be specific to your stated niche (not generic) — this is what makes the demo feel real instead of templated
- Pick and memorize the exact listing you'll search for and the exact listing you'll create live — don't discover mid-demo that your search term returns nothing

> **Best Practice:** Create a dedicated "demo seller" and "demo buyer" account distinct from your real test accounts. Test accounts accumulate junk data during development that looks bad on screen.

---

## Visual Polish That's Worth the Last Hour

Not all visual polish has equal return. Spend your remaining time on the items judges actually notice, not on the ones that took the most effort to build.

| Polish item | Judge-visible impact | Time cost |
|---|---|---|
| Consistent spacing/alignment across pages | High — sloppy spacing reads as "unfinished" instantly | Low |
| Loading states (skeletons, not blank screens) | High — prevents "is it broken?" moments | Low |
| A real logo and color scheme (not default Tailwind blue) | Medium-high — signals intentionality | Low |
| Empty states with helpful text, not blank lists | Medium — small thing that avoids a confused pause | Low |
| Animations/transitions | Low — nice but rarely decisive | Medium-high |
| Mobile responsiveness | Low unless you're demoing on mobile | Medium |

> **Decision:** If you have one hour left, spend it on spacing consistency and loading states before anything else on this list. They're the cheapest fixes with the most visible payoff.

---

## Common Demo-Killing Mistakes

- **Demoing on localhost with dev tools visible** — close the console, use a clean browser window, consider a deployed URL even if rough, so judges see something that looks shippable
- **Narrating code instead of the product** — judges came to see what it does, not how it's built; save architecture talk for Q&A if asked
- **No fallback if Wi-Fi fails** — have a screen-recorded backup video of the working demo ready on your laptop, not depending on conference Wi-Fi
- **Too many people talking** — assign one presenter, one demo-driver (can be the same person); a pitch where four people each grab the mic loses momentum fast

---

## AI Prompts You Can Use

**Prompt 1 — Tighten your one-sentence pitch:**

```
Here's my marketplace idea: [describe it in a paragraph]. Turn this into
one sentence following the pattern: "[Name] is a marketplace where
[buyer] can [action] from [seller], solving [problem]." Give me 3
versions at different specificity levels and tell me which is strongest
for a 3-minute hackathon pitch and why.
```

**Prompt 2 — Pressure-test your demo script:**

```
Here's my demo script: [paste your step-by-step script]. Judging this as
a hackathon judge who sees 15 projects today, where will attention drop?
What's the weakest 15 seconds? Suggest cuts to get this under 3 minutes
without losing the core value proposition.
```

---

## Validating What AI Generates

- **The suggested pitch sentence actually matches what your app does** — AI sometimes makes the pitch sound more ambitious than the build supports, which backfires in Q&A
- **Suggested cuts don't remove the part that makes your marketplace specific** — generic "buy and sell stuff" framing loses to a clearly-scoped niche every time
- **Any suggested stat or claim is one you can actually defend if asked** — don't repeat an AI-generated statistic you can't source

---

## Implementation Checklist

- [ ] One-sentence pitch written and the whole team agrees on it
- [ ] Demo script written step-by-step, timed under 3 minutes
- [ ] Seed data reviewed specifically for pitch-readiness, not just functionality
- [ ] Backup screen recording of a full successful demo saved locally
- [ ] One presenter and one demo-driver assigned
- [ ] Spacing and loading states checked on every screen in the demo path

---

## What's Next

Your demo is scripted and your app is polished where it counts. Next: **Pitch Deck** — the slides that frame the demo before the judges see a single screen.
