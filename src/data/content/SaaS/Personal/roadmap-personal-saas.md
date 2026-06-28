# Roadmap

**Estimated Time:** 25–35 min

---

You shipped. That's real. Most projects never get here.

Now the question changes from *"how do I build this?"* to *"what should I build next, and why?"*

A roadmap is not a promise. It is a thinking tool. It helps you prioritise, say no with confidence, and communicate intent without committing to deadlines you cannot keep.

This module teaches you how experienced PMs and engineers think about roadmaps — and gives you a lightweight system that won't collapse the moment users give you real feedback.

---

## Why Most Solo Roadmaps Fail

Before building yours, understand the failure patterns.

| Failure Mode | What It Looks Like | Why It Happens |
|---|---|---|
| **Wish list** | 40 ideas, no order, nothing ships | No forcing function to prioritise |
| **Commitment trap** | Public dates you miss | Confusing a roadmap with a release schedule |
| **No signal** | Features built from guesses | Never talking to users |
| **Scope creep** | v1 tries to do everything | No definition of "done" for each cycle |
| **Abandoned** | Roadmap exists, never updated | Treated as a document, not a living tool |

> **The fix:** Treat your roadmap as a *decision log*, not a feature list.

---

## The Right Mental Model

Think in three horizons.

```
NOW          NEXT          LATER
─────────    ──────────    ──────────────
Committed    Probable      Possible
1–4 weeks    1–3 months    3+ months
High detail  Some detail   Just ideas
```

**NOW** is what you are actively building. One or two things maximum. If it is not in progress, it does not belong here.

**NEXT** is what you have decided is important based on feedback and data. Not ideas — decisions. These have been reasoned about.

**LATER** is a holding area. Capture ideas here before they clutter NOW and NEXT. Revisit monthly.

---

## What Goes on a Roadmap

Not everything deserves to be a roadmap item.

A roadmap item must pass this test:

- [ ] It solves a real user problem (not just a nice-to-have)
- [ ] It moves a metric you actually care about (retention, activation, revenue)
- [ ] You have a rough sense of the effort involved
- [ ] It is scoped to something shippable

If it fails any of these, it goes in a backlog or gets dropped.

---

## Prioritisation Framework

Use this matrix when deciding what moves into NEXT.

```
                HIGH IMPACT
                    │
     Build now      │      Build soon
     (quick wins)   │      (strategic)
                    │
LOW EFFORT ─────────┼───────── HIGH EFFORT
                    │
     Reconsider     │      Deprioritise
     later          │      (or cut)
                    │
                LOW IMPACT
```

Be honest about effort. Most solo builders underestimate effort by 3–5x.

> [!TIP]** When in doubt, cut. Shipping fewer things done well beats shipping many things done poorly.

---

## Your Roadmap Structure

Use this format. Keep it in a single file (`ROADMAP.md`) committed to your repo.

```
# Roadmap

Last updated: [date]

## Now
- [ ] [Feature or fix] — [why it matters]
- [ ] [Feature or fix] — [why it matters]

## Next
- [ ] [Item] — [signal: where this idea came from]
- [ ] [Item] — [signal: where this idea came from]

## Later / Backlog
- [Idea]
- [Idea]
- [Idea]

## Recently Shipped
-  [Feature] — [date]
-  [Feature] — [date]
```

The `signal` field is the most important part of NEXT. It forces you to justify why something is on the roadmap.

Valid signals:
- "3 users asked for this in the past week"
- "Churn interview: users drop off at this step"
- "Blocks monetisation"
- "Recurring support request"

Not valid signals:
- "Seems cool"
- "Would be nice"
- "I want to build it"

---

## AI Prompt: Roadmap Prioritisation

Use this after you have collected feedback or have a list of ideas you are trying to order.

```
I am building a [brief description] SaaS as a solo developer.

My current user base: [number or "pre-launch"]
My core metric I care most about: [activation / retention / revenue / all three]

Here is my current list of potential roadmap items:
[paste your list]

For each item, help me:
1. Identify the user problem it actually solves
2. Estimate effort: Low / Medium / High (assuming solo dev)
3. Estimate impact on my core metric: Low / Medium / High
4. Flag any items that are likely premature or over-engineered for my current stage

Then give me a recommended NOW / NEXT / LATER split with your reasoning.

Be direct. If something should be cut entirely, say so.
```

> **How to use this well:** Run this every 4–6 weeks, not every week. Constant re-prioritisation is its own form of procrastination.

---

## Validating AI Output

When you use AI to help prioritise, review the output critically.

**Common AI mistakes on roadmaps:**

- Inflating the complexity of simple tasks
- Recommending "enterprise" features for a product with 10 users
- Missing context about your actual retention or activation problems
- Treating all user requests as equally weighted

**What to check:**

- [ ] Does the NOW list respect your actual capacity? (1–2 items max if solo)
- [ ] Is each NEXT item tied to a real signal, or did the AI infer one?
- [ ] Did it flag anything as high effort that you actually know is quick?
- [ ] Are there items in LATER that belong in "never"?

Override AI judgment whenever you have better context. You know your users. It does not.

---

## Making Roadmap Decisions Without Enough Data

At the personal project stage, you probably do not have analytics dashboards or hundreds of users. That is fine. Use a lightweight signal hierarchy.

```
Strongest signal
      ↓
1. User directly tells you they cannot do something
2. User asks for same thing twice
3. You observe user confusion in a session / replay
4. User churns and mentions the issue
5. You receive a support request
6. You have a gut instinct based on usage patterns
      ↓
Weakest signal
```

Do not wait for perfect data. Move on the strongest signal available.

---

## Communicating Your Roadmap

If you have users, a public roadmap builds trust and manages expectations.

**Low-effort options:**

| Tool | Best for |
|---|---|
| GitHub Projects | Technical users, open source |
| Notion public page | Clean, shareable, no-code |
| Canny | Collecting + displaying votes |
| Linear (public view) | If you're already using Linear |

**What to share publicly:**

- What you are working on now
- What is coming next (no dates unless you are confident)
- What you recently shipped

**What to keep private:**

- Speculative ideas
- Items that depend on external factors
- Anything you might cut

> **Never publish dates you do not believe in.** A missed public date damages trust more than no date at all.

---

## The Update Ritual

A roadmap you do not maintain is noise.

Keep it alive with a lightweight weekly ritual:

**Weekly (5 minutes):**
- Move any completed NOW items to Recently Shipped
- Add any new signals you collected this week to relevant items

**Monthly (20 minutes):**
- Review NEXT — does the order still make sense?
- Promote 1–2 items from LATER to NEXT if you've completed NOW items
- Archive anything in LATER you haven't thought about in 60 days

**After shipping (immediately):**
- Move item to Recently Shipped
- Write one sentence about what you learned shipping it

---

## Common Mistakes at This Stage

> **"I'll add dates to motivate myself."**  
> Dates without external accountability rarely work and create guilt. Use milestones instead: "before first paying customer" or "before public launch."

> **"I should build what the loudest user asks for."**  
> The loudest user is often the least representative. Weight signals by frequency and user quality.

> **"My roadmap needs to be comprehensive."**  
> Comprehensiveness is the enemy of clarity. Three confident NEXT items beat fifteen uncertain ones.

> **"I'll keep it in my head."**  
> You will forget why you made past decisions. Write it down, even badly.

---

## Checklist: Your Roadmap is Ready

- [ ] NOW has 1–2 items maximum
- [ ] Every NEXT item has a clear signal attached
- [ ] LATER exists and absorbs all unvalidated ideas
- [ ] You have a Recently Shipped section
- [ ] The file lives in your repo or a permanent location
- [ ] You have a plan for when you will update it (weekly or after every ship)
- [ ] You have decided whether to make any of it public

---

## What Comes Next

With a roadmap in place, your next Phase 5 topics build on this foundation:

- **SEO** — the roadmap shapes which features to optimise for search before they exist
- **Presentation Prep** — your roadmap becomes a key slide: "here's where we're going"
- **Pitch Deck** — investors read roadmaps carefully; yours should show strategic thinking, not a wish list
