---
title: MVP Features
slug: mvp-features
phase: Phase 0
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# MVP Features

You have your one-sentence idea and your wow moment. Now you need the actual feature list — the minimum set of things that have to work for the demo to land, and nothing else. This list is what protects you from the single biggest hackathon killer: building things that feel productive but don't move you toward the demo.

---

## The Core Idea: "MVP" in a Hackathon Means Something Stricter Than Usual

In a real startup, MVP means "the smallest thing real users would actually find valuable." In a hackathon, it means something tighter: **the smallest thing that makes your wow moment demonstrable to a judge in under 3 minutes.** That's a more brutal cut than startup MVP thinking, because you're not trying to retain a real user — you're trying to land one specific moment, once, live.

> ** Warning**
> "It would be cool if it also did X" is the most expensive sentence in a hackathon. Every feature you add beyond the core demo path is hours not spent polishing the path that actually gets judged — and is also one more thing that can break live, in front of the judges, at the worst possible moment.

---

## Step 1: Separate Three Tiers, Ruthlessly

**Decision Card — The Three-Tier Cut**

| Tier | Definition | Treatment |
|---|---|---|
| Must-Have | Without this, the demo literally cannot happen | Build first, polish thoroughly |
| Nice-to-Have | Makes the demo better, but the demo still works without it | Build only after Must-Have is fully working and polished |
| Cut | Sounds good in planning, doesn't serve the wow moment | Don't build — say it out loud as cut so nobody quietly works on it anyway |

The discipline here isn't identifying Must-Have features — that's usually obvious. It's the Cut tier that takes real discipline, because cut features often sound reasonable individually. They're only obviously wrong in aggregate, once you notice how much total time they'd consume relative to the actual demo path.

---

## Step 2: Write the Feature List as User Actions, Not Technical Tasks

A feature list written as technical tasks ("set up database," "build API") doesn't tell you whether the *demo* will work — it just tells you whether code exists. Write your Must-Have list as the literal sequence of actions a judge will watch happen.

**Best Practice Card — Demo-Path Feature List**

```
 Technical task list:
   - Set up auth
   - Build upload endpoint
   - Create dashboard
   - Add export feature

 Demo-path action list:
   1. User signs in (1 click, no friction)
   2. User uploads a [file type]
   3. App processes it and shows [the wow moment] within [N] seconds
   4. User sees the result, can [one follow-up action]

   Anything not in this sequence isn't Must-Have.
```

This reframing alone tends to cut 30-50% of an initial feature brainstorm, because most "must-have" technical tasks turn out to support steps the demo path doesn't actually need.

---

## Step 3: Plan for Demo Data Now, Not Later

Decide right now whether your demo will use live, real-time generated data or pre-seeded demo data — this decision affects what you build and how much you can trust it on stage.

> ** Tip**
> Live generation is more impressive when it works, but it's also a live risk: API timeouts, rate limits, or a flaky network can sink your demo in front of judges. A hybrid approach — primarily live, with a pre-seeded fallback path you can switch to instantly if something breaks — is usually the safer Must-Have decision. This connects directly to the **Demo Data** module later in this curriculum; decide the strategy now so the rest of your build supports it.

---

## Using AI to Cut the List Honestly

AI is useful here specifically because it has no emotional attachment to any feature your team brainstormed — it can apply the Must-Have/Nice-to-Have/Cut framework without the bias of "but I already started building this."

**Prompt: Ruthless MVP Cut**

```
My hackathon idea: [your one-sentence idea]
My wow moment: [describe the specific moment judges should see]
Time remaining: [hours]
Team size/skill: [describe]

Here's my full feature brainstorm list:
[paste everything your team has discussed, unfiltered]

1. Sort every item into Must-Have, Nice-to-Have, or Cut, based ONLY
   on whether it's required to demonstrate the wow moment above.
2. For Must-Have items, write them as a literal sequence of user
   actions a judge would watch, not technical tasks.
3. Estimate total build time for the Must-Have list only, given my
   stated time and team skill — flag if it still looks too large
   even after the cut.
```

> ** Why this prompt works**
> Anchoring every classification decision to the wow moment, rather than general usefulness, keeps the model from defaulting to "well, this feature is generally good practice" reasoning — the same trap a team falls into when they're personally attached to an idea. Asking it to re-estimate even the cut list's build time catches the case where your "ruthless" cut still isn't ruthless enough for your actual remaining hours.

**Token efficiency note:** Paste your team's full, messy brainstorm in one prompt rather than pre-filtering it yourself first — pre-filtering reintroduces your own bias before the model gets a chance to apply the framework cleanly. Let the cut happen in this conversation, not before it.

---

## Validating the Final List

- [ ] Every Must-Have item appears somewhere in the literal step-by-step demo sequence
- [ ] The list was cut by someone (or some process) without emotional attachment to any single feature
- [ ] Total estimated build time for Must-Have alone leaves real buffer before your deadline — not an exact fit, since debugging always takes longer than building
- [ ] A clear decision exists for live vs. seeded demo data, made now rather than discovered as a crisis the night before submission
- [ ] Nice-to-Have items are written down somewhere visible, so nobody quietly works on one instead of polishing Must-Have

> ** Note**
> If your Must-Have list still feels ambitious after this exercise, that's useful information now — not a problem to discover six hours before submission. Go back to Idea Definition and cut the idea itself, not just the feature list around it.

---

## What's Next

With Phase 0 planning locked in, move to **Phase 1 — Design**, starting with the **PRD** — turning this scoped feature list into a clear enough spec that your whole team builds the same product.
