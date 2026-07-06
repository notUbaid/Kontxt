---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
filename: presentation-prep-personal-e-commerce.md
---

# Presentation Prep

You've built a real store. It has real customers, real orders, maybe real referral and email flows running. Nobody outside your own browser tab knows that yet.

This module is about packaging what you built into a story someone else can understand in under two minutes — because the story is what gets you the next opportunity, not the codebase.

---

## Why This Is a Real Engineering Step, Not Fluff

It's tempting to treat "presentation" as a side task — something you throw together the night before you need it. Skip that instinct.

For a solo-built project, your presentation is often the **only artifact** most people will ever evaluate. A recruiter won't clone your repo. A mentor won't read your database schema. They'll watch a 90-second demo or skim a project writeup, and decide in that window whether you know what you're doing.

> **Reframe:** You're not "making slides." You're compressing months of architectural decisions into the smallest package that still proves you made them well.

---

## Decision 1: Who Is This Actually For?

This determines everything else in this module. Don't write one generic version and hope it works everywhere.

| Audience | What they care about | What to emphasize |
|---|---|---|
| Recruiters / hiring managers | Can you ship real, working software | Architecture decisions, tradeoffs, what you'd do differently |
| Mentors / technical reviewers | Engineering judgment | How you handled hard problems (payments, fraud, auth) |
| Friends, family, early users | Is it usable, does it solve something real | The product experience, not the stack |
| Potential collaborators/investors | Is there a real business here | Traction numbers, growth mechanics, what's next |

> **Best Practice:** Pick one primary audience for this module's output. You can always produce a second version later — but a presentation trying to serve everyone usually serves no one. If you genuinely need two versions, run this module twice with different audience assumptions.

---

## Decision 2: Format

| Format | Best for | Effort |
|---|---|---|
| Live demo + talking points | Mentors, technical interviews | Medium — requires a stable demo environment |
| Recorded screen-capture walkthrough (2-3 min) | Portfolio, async sharing, recruiters | Medium, but reusable forever |
| Slide deck | Structured pitches, investor-style conversations | Higher — covered in the next module |
| Written case study (README or blog-style page) | Portfolio sites, GitHub | Low effort, highest searchability |

> **Recommendation for Personal Mode:** A recorded walkthrough plus a written case study covers the most ground for the least ongoing effort. A live demo can fail at the worst moment — a recording never does. Build the deck only if you have a context that specifically calls for one (see the next module).

---

## The Narrative Arc

Every good project presentation — regardless of format — follows the same underlying shape. Skipping a step is the most common reason a technically impressive project still falls flat.

1. **Hook** — one sentence on the problem, stated as a real frustration, not a feature list
2. **Why it matters** — who has this problem and why existing options fall short
3. **What you built** — the product, shown, not described
4. **How it works** — the 2-3 architectural decisions that actually mattered (not a tech-stack list)
5. **Proof it works** — real numbers if you have them: orders processed, uptime, page speed, conversion rate
6. **What's next** — shows you think beyond "done," which separates a project from a portfolio piece

> **Warning:** Do not open with your tech stack. "Built with Next.js, Postgres, and Stripe" is the least interesting sentence you can lead with — it tells the listener nothing about whether you can think. Lead with the problem. Mention the stack once, briefly, in step 4.

---

## What to Actually Highlight for an E-Commerce Project

Generic advice fails here because e-commerce has specific, legible signals of competence that other project types don't:

- **Checkout flow correctness** — payment integration is one of the few areas where "it works" is genuinely hard. Saying you handled failed payments, webhook retries, or idempotency shows real engineering, not just CRUD.
- **A real growth mechanic** — if you implemented referrals, email automation, or retention logic from earlier in this phase, that's a stronger signal than another product listing page. It shows you think about the business, not just the build.
- **One hard tradeoff you made** — e.g. "I used store credit instead of cash refunds for referrals to avoid margin risk." A specific, reasoned tradeoff is worth more than ten generic features.
- **A number, any number** — even something modest like "12 test orders processed end-to-end with zero payment failures" beats a feature list. Numbers signal it's real, not a mockup.

> **Tip:** If you genuinely have no usage numbers yet, don't fabricate them. Say "currently in solo testing, X orders processed" — honesty about stage reads as more credible than vague hype.

---

## Using AI Effectively Here

Use AI to pressure-test your narrative structure, not to write your story for you in someone else's voice — a presentation that doesn't sound like you is easy to spot and undermines exactly the credibility you're trying to build.

** Copy this prompt:**

```
I built a solo e-commerce project: [one-sentence description of what it does and who it's for].

Key technical decisions I made: [list 2-3, e.g. "custom referral fraud guardrails," "Stripe webhook idempotency handling," "chose store credit over cash to protect margin"]

Audience for this presentation: [recruiter / mentor / portfolio / collaborator]
Format: [recorded walkthrough / written case study]

Help me with:
1. A tight hook sentence — the problem, not the product, stated in plain language
2. Which 2-3 of my technical decisions are actually worth highlighting for this audience, and which are noise
3. A walkthrough outline (hook → problem → demo → architecture → proof → next steps) with rough time allocation per section if it's a 2-3 minute recording
4. Push back on anything that sounds like a generic feature list instead of a real decision

Don't write the final script — give me structure and honest feedback, I'll write it in my own voice.
```

This prompt is deliberately structured to keep AI in an editorial role instead of a ghostwriting role. A presentation in your own voice, with AI-sharpened structure, reads as far more credible than one that's clearly AI-authored start to finish.

---

## Validating the Output

Before you record or present anything, check:

- [ ] Does the hook describe a problem, not a product? ("People abandon checkouts when X" not "I built a store with X feature")
- [ ] Could a non-technical person follow the first 30 seconds?
- [ ] Is there at least one specific, reasoned tradeoff — not just a list of technologies?
- [ ] Is there a real number somewhere, even a small one?
- [ ] Does it end with "what's next," not just "it's done"?
- [ ] Did you cut anything that sounds like marketing copy instead of an honest engineering account?

> **Common Mistake:** Walking through every feature in build order ("first I did auth, then products, then cart..."). This narrates your build log, not your judgment. Reorder around what's *interesting*, not what came first chronologically.

---

## Quick Reference: The Two-Minute Structure

| Time | Section | Content |
|---|---|---|
| 0:00–0:15 | Hook | The problem, stated plainly |
| 0:15–0:30 | Context | Who has this problem, why current options fall short |
| 0:30–1:15 | Demo | Show the product doing the thing — checkout, referral, whatever's most legible |
| 1:15–1:45 | Decisions | 1-2 tradeoffs that show judgment, not a stack list |
| 1:45–2:00 | Close | A real number + what's next |

---

## Before You Continue

- [ ] Identified your primary audience for this presentation
- [ ] Chosen a format (recorded walkthrough, written case study, or both)
- [ ] Drafted the hook — problem-first, not feature-first
- [ ] Identified 2-3 real technical decisions worth highlighting, not a feature dump
- [ ] Have at least one real number, even a modest one
- [ ] Walkthrough ends with "what's next," not just "it's done"

**Next up in Growth:** Pitch Deck — if your audience or context calls for a structured slide-based pitch, this is where that gets built on top of the narrative you just defined.
