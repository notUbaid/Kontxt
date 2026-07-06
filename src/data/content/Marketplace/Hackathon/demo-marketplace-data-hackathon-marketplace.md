---
title: Demo Marketplace Data
slug: demo-marketplace-data
phase: Phase 2
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: demo-marketplace-data-hackathon-marketplace.md
---

# Demo Marketplace Data

You learned in Welcome why an empty marketplace loses before you've said a word, and in Marketplace Fundamentals why this connects to the cold-start problem every real marketplace faces. This module is where that principle becomes actual work: building a dataset that makes your marketplace look like it's already been running for months.

---

## The Goal: Simulate a Marketplace Past Its Cold Start

> **Reframe:** You're not adding "sample data" to test with. You're constructing evidence of a marketplace that already has real supply and real demand — the version of the product that's actually worth demoing, because a marketplace at zero listings doesn't yet demonstrate what your product is.

This is a content and craft task as much as a technical one. Bad seed data (generic, repetitive, obviously fake) actively hurts your demo more than no data at all, because it signals carelessness.

---

## Decision 1: How Much Data Is Enough

| Listing count | Effect | When to use |
|---|---|---|
| 3-5 | Feels sparse, like a test environment | Avoid — this is the most common under-seeding mistake |
| 8-15 | Feels like a real, active category | Default target for most hackathon marketplaces |
| 30+ | Feels established, but costs significant content-creation time | Only if your discovery/search feature specifically needs volume to demonstrate |

> **Best Practice:** 8-15 well-crafted listings almost always beats 30 generic ones. Quality and specificity of each listing matters more than raw count — a judge evaluates what's in front of them on screen, not your total row count.

---

## What Makes a Listing Feel Real vs. Obviously Fake

This is the actual craft of this module. The difference is in the specificity.

| Fake-feeling | Real-feeling |
|---|---|
| "Product 1," "Test Item," "Sample Listing" | A specific, plausible name a real person would write |
| Generic stock description | A description with a small, specific, slightly imperfect detail |
| Round, suspicious prices ($10, $20, $30 for everything) | Varied, realistic prices ($14.50, $27, $8) |
| Identical posting "dates" or no date shown | Varied relative timestamps ("Posted 2 days ago," "Posted 3 weeks ago") |
| No images, or the same placeholder image repeated | Distinct images per listing, even if simple |

**Example — Campus Textbook Marketplace:**

Weak: *"Textbook 1 — $20 — Good condition"*

Strong: *"Intro to Microeconomics, 9th Edition — $35 — Some highlighting in chapters 3-5, otherwise great condition. Posted 4 days ago."*

> **Tip:** The strong example works because it includes a small, specific imperfection ("some highlighting"). Real listings have small honest flaws — perfectly generic descriptions read as obviously synthetic, even to someone not looking closely.

---

## Building Variety Deliberately

A convincing dataset has intentional variation, not just volume. Plan for variety across:

- **Price range** — some cheap, some expensive, matching what's realistic for your category
- **Recency** — mix of "just posted" and "posted weeks ago," not all identical
- **Seller identity** — multiple distinct seller names/profiles, not everything from one fake account
- **Listing quality** — a couple of slightly less polished listings alongside your best ones; uniform perfection reads as synthetic

> **Common Mistake:** Generating all listings from a single AI prompt in one batch with no variety instruction, producing a dataset where every listing has suspiciously similar sentence structure and tone. Judges who browse more than two or three listings notice this pattern quickly.

---

## Decision 2: Trust Signals to Include

Building on Marketplace Fundamentals — decide which fake-but-plausible trust signals belong in your seed data:

- Seller ratings (e.g. "4.8 , 23 reviews") — static, not a real review system
- "Verified" or "Top Seller" badges on a subset of listings, not all
- Response time indicators ("Usually responds within an hour")
- A small number of listings marked "Sold" or "Reserved" — proves the marketplace has real transaction history, not just standing inventory

> **Best Practice:** Include a few sold/reserved listings in your seed data, not just active ones. A marketplace where every single listing is available makes the activity feel suspiciously frozen — a few completed transactions in the history communicates "this has been running for a while" more efficiently than almost anything else.

---

## Where This Data Should Live

| Approach | Use when |
|---|---|
| Database seed script, run once at setup | Default — clean, repeatable, easy to reset before final demo |
| Hardcoded in a seed file checked into the repo | Fine for a hackathon, keeps it simple |
| Generated fresh each server start | Avoid — risks inconsistent state between rehearsal and live demo |

> **Warning:** Run your seed script once, confirm the data looks right, and don't regenerate it again right before your demo unless you're deliberately re-testing. A last-minute reseed that introduces a bug or empties your database minutes before judging is an entirely avoidable risk.

---

## Using AI Effectively Here

Use AI to generate a varied, specific dataset — but give it explicit instructions to avoid the genericness failure mode described above.

** Copy this prompt:**

```
Generate seed data for a hackathon marketplace: [one-sentence definition from MVP Scope]

I need 10-12 listings with:
- Specific, plausible titles (not "Item 1," "Product A")
- Descriptions that include one small, realistic, slightly imperfect detail each (not uniformly polished marketing copy)
- Varied, realistic prices — not round numbers across the board
- Varied relative post dates (mix of recent and a few weeks old)
- At least 3 different seller names, not all from one account
- 2-3 listings marked as already sold/reserved, the rest active

Also generate:
- Seller profiles with a star rating (varied, mostly 4-5 stars but not identical) and review count
- A couple of "Verified Seller" badges applied to only some sellers, not all

Format as [JSON / SQL insert statements / your actual schema format] matching this structure: [paste your schema]

Vary sentence structure and tone across listings — avoid making them all sound like they were written by the same template.
```

This prompt works because it explicitly names the failure mode (uniform, templated-sounding output) and asks AI to counter it directly — without that instruction, AI's default output tends toward exactly the repetitive pattern that gives synthetic data away.

---

## Validating the Output

- Do listing titles and descriptions read as specific and plausible, not generic or templated?
- Is pricing varied and realistic, not suspiciously round?
- Are there multiple distinct sellers represented, not one account posting everything?
- Does the dataset include a few sold/reserved listings, not only active ones?
- Read 4-5 listings back to back — do they sound distinct from each other, or does the pattern repeat noticeably?

> **Tip:** Have a teammate who didn't write the seed data browse it cold and tell you honestly whether it feels real. You're too close to your own data to judge this objectively — a fresh pair of eyes catches synthetic-feeling patterns faster than re-reading your own output.

---

## Before You Continue

- 8-15 listings seeded, each specific and varied, not generic or templated
- Multiple distinct sellers represented
- A few listings marked sold/reserved alongside active ones
- Trust signals (ratings, badges) included on a realistic subset, not uniformly applied
- Seed data confirmed stable and not regenerated right before the live demo

**Next up:** Fake Messaging — applying this same "convincingly real, deliberately simulated" approach to buyer-seller communication.
