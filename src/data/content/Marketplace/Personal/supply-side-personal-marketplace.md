---
title: Supply Side
slug: supply-side
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
filename: supply-side-personal-marketplace.md
---

# Supply Side

You've classified what kind of marketplace you're building. Now get specific about one half of it: who is actually going to list goods or services on your platform, and why would they bother. Supply side clarity here directly shapes your seller onboarding flow (Phase 1) and your bootstrapping strategy (Chicken & Egg Strategy, later this phase).

Most personal marketplace projects fail quietly here — not because the idea was bad, but because "sellers" was never defined precisely enough to actually go find any.

---

## "Sellers" Is Not a Real Answer

If you can't describe your supply side more specifically than "people who have things to sell," you don't have a supply side defined yet — you have a placeholder. Get specific enough that you could picture an actual person.

**Weak:** "People who want to sell handmade items."

**Specific:** "Hobbyist woodworkers who currently sell at 1-2 local craft fairs a year and have no good way to sell between fairs."

The specific version tells you where to find them (craft fair organizers, woodworking forums), what they're missing (a way to sell continuously, not just at events), and what would make them try a new platform (low friction, since they're not full-time sellers).

---

## What Sellers Actually Need From a Marketplace

Beyond "a place to list things," real sellers — even casual, non-professional ones — care about a consistent set of things. Map your specific supply side against these:

| Need | What it means for your design |
|---|---|
| **Low listing friction** | Can they create a listing in under 2 minutes, or does it feel like a job application? |
| **Visibility / discoverability** | Will buyers actually find this listing, or does it disappear into a void? |
| **Trust that they'll get paid** | Especially for goods/services with real value — payment protection matters |
| **Control** | Can they edit, pause, or remove a listing easily? |
| **Low cost to participate** | Free to list, or a take rate only on completed sales, removes risk for a first-time seller |

> **Decision:** For a personal project's MVP, prioritize low listing friction and visibility over advanced seller tools (analytics dashboards, promoted listings, bulk upload). A seller who can list in 2 minutes and gets seen is more valuable early than a seller given powerful tools nobody's asked for yet.

---

## Professional Sellers vs. Casual Sellers

This distinction changes almost everything about your supply side design, so name it explicitly for your niche.

- **Professional/repeat sellers** (small businesses, freelancers, regular hobbyist sellers) — will tolerate more setup friction in exchange for better tools, care about repeat visibility, more likely to be early power users
- **Casual/one-off sellers** (someone selling a single used item, a one-time service) — will abandon at the first sign of friction, need the absolute simplest possible flow, unlikely to return often

> **Tip:** Most early-stage marketplaces underestimate how much friction casual sellers will tolerate (almost none) and overbuild for professional sellers who haven't shown up yet. Design your MVP for whichever type you can realistically recruit first.

---

## Finding Your First Real Sellers (Not Hypothetical Ones)

Before building anything, identify where your actual supply side already exists today, even without your platform:

- What Facebook groups, subreddits, or forums do they already use?
- What existing (possibly clunky) tools or channels do they currently use instead?
- Do you personally know 3-5 people who'd fit this description?

> **Decision:** If you can't name at least 3-5 real people or a specific community where your supply side already exists, that's a signal to revisit your niche before building further — not a reason to abandon the idea, but a reason to make sure Phase 0 decisions are grounded in a real, reachable group of people.

---

## What Sellers Need to Trust *You*, Specifically

A brand-new marketplace has zero reputation. Sellers are taking a risk listing on something unproven. Identify, honestly, what would make your specific supply side comfortable trying an unknown platform:

- Personal outreach and relationship (you, personally, recruiting the first sellers) — almost always necessary at this stage for a solo project
- A clear, simple value proposition over their current alternative
- Low or no cost to try (free listings until you have real revenue)
- Visible signs that buyers are actually present, even if just a handful

> **Warning:** Don't expect sellers to find your marketplace organically before you have any buyers. Early supply-side growth for a solo project is almost always manual — you personally reaching out, not the product marketing itself. Plan for this effort, don't assume it away.

---

## Writing Your Supply Side Definition

```
My supply side is: [specific description, not "sellers"]
They currently solve this problem by: [their current alternative]
What they need most from my platform: [top 1-2 needs from the table above]
Where I can find the first 5-10 of them: [specific community/channel/people]
```

Fill this in concretely. It becomes the input for seller onboarding design in Phase 1 and your bootstrapping plan in the Chicken & Egg Strategy module.

---

## AI Prompts You Can Use

**Prompt 1 — Sharpen a vague supply side description:**

```
My marketplace's supply side is currently described as: "[your current,
possibly vague description]." Help me make this more specific — who
exactly are they, what's their current alternative to a dedicated
platform, and are they more likely professional/repeat sellers or
casual/one-off sellers? Ask me clarifying questions if you need more
context rather than guessing.
```

**Prompt 2 — Find realistic recruitment channels:**

```
My marketplace's supply side is [specific description]. Suggest 3-5
realistic places (forums, communities, local groups, existing platforms)
where I could find and personally reach out to the first 10 sellers,
without a marketing budget, as a solo builder.
```

---

## Validating What AI Generates

- **Reject generic recruitment suggestions** like "post on social media" or "run ads" — for a solo project with no budget, you need specific, named communities or channels, not generic marketing advice
- **Confirm any suggested community actually fits your niche** — verify by visiting it yourself before counting on it; AI can suggest a plausible-sounding forum that's actually inactive or off-topic
- **Make sure the professional vs. casual seller classification matches reality you can verify**, not an assumption — if unsure, this is worth asking a few real potential sellers directly

---

## Implementation Checklist

- [ ] Supply side described specifically — not "sellers," but a precise type of person
- [ ] Classified as primarily professional/repeat or casual/one-off sellers
- [ ] Current alternative (what they do without your platform) identified
- [ ] At least one real community or 3-5 real people identified as recruitment targets
- [ ] Top 1-2 seller needs identified to prioritize in later design phases

---

## What's Next

Next: **Demand Side** — the other half of the equation, defining who's buying and what would make them trust a brand-new marketplace enough to try it.
