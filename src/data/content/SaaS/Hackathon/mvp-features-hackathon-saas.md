# MVP Features

🕒 **Estimated Time:** 15 Minutes

---

Here is the thing nobody tells you at hackathons.

You are not building a product. You are building a demo that implies a product.

That distinction changes every decision you make about features. A product needs to handle edge cases, bad inputs, empty states, and users who do the unexpected. A demo needs to show one thing working beautifully and make judges believe the rest exists.

The teams that win do not build more. They build less, more deliberately, and spend the time they saved making the core experience feel real.

---

## Find the Core Loop First

Every SaaS has one action at its heart. The moment when the user does the thing the product actually exists to do. Call it the core loop.

For a scheduling tool, the core loop is: manager creates a shift schedule and publishes it.  
For an invoice tool, the core loop is: user creates an invoice and sends it to a client.  
For a feedback collector, the core loop is: user embeds the widget and sees a response come in.

Everything else is infrastructure that supports this loop. The core loop must work. Everything outside it is negotiable.

If you cannot name your core loop in one sentence, stop here and name it before continuing. You cannot prioritize features without knowing what the centre of the product is.

> **Your core loop:**
>
> A user [does this specific action] and [this specific result happens].

Write it down. It becomes the filter for every feature decision that follows.

---

## The Four Buckets

Every feature you are considering belongs in exactly one of these buckets. Not two. One.

<!-- UI: render as four cards in a 2x2 or horizontal strip, each with a distinct color/label -->

| Bucket | What it means | What you do |
|---|---|---|
| **Must Demo** | The core value is invisible without this working | Build it. Polish it. |
| **Must Work** | The demo path depends on this functioning | Build it. Rough is fine. |
| **Can Fake** | Provides context but not core value | Hardcode it or simulate it. |
| **Cut** | Not in the demo path at all | Do not touch it. |

This is not a moral judgment about what matters in a real product. In production, auth matters, error states matter, empty screens matter. In a hackathon demo, they are optional.

**What "Can Fake" actually looks like in practice:**

- The user's profile photo? Use a hardcoded avatar.
- Email notifications? Log to the console. Show a "Sent" toast.
- Payment flow? Build the UI. Don't wire up Stripe. Add a "Upgrade" button that goes nowhere.
- Analytics dashboard? Use seeded static data. Make it look full.
- Search? Filter a hardcoded list of 10 items.
- Multi-user collaboration? Log in as two accounts you created. Switch tabs.
- Settings page? A placeholder with your app name is fine.

Nobody will notice if the settings page is empty during a 90-second demo. They will notice if the core action fails.

---

## Feature Triage

Take every feature you are considering and run it through this checklist. Be honest. The point is to find reasons to cut, not reasons to keep.

<!-- UI: render as a reusable checklist component that the user can apply to each feature they list. Each checkbox should be tappable. -->

**For each feature, ask:**

- [ ] Is this feature visible during the 90-second demo path?
- [ ] Does the core value of the product exist without this feature?
- [ ] Will building this take more than three hours?
- [ ] Can this be faked with hardcoded data or a static UI?
- [ ] If this breaks during the demo, does the demo fail?

**Reading the results:**

If it is not on the demo path → Cut.  
If the core value exists without it → Can Fake or Cut.  
If it would take more than three hours → Seriously consider faking it.  
If faking works → Fake it.  
If the demo fails without it working → Must Work or Must Demo.

Most features that feel essential will not survive this filter. That is the point. Three working features will always beat eight half-finished ones in a demo.

---

## Features That Almost Always Waste Hackathon Time

These are not bad features. They are features that consistently consume time disproportionate to their demo value. Treat this as a default cut list and justify any exception consciously.

<!-- UI: render as a scannable checklist, pre-checked, that the user actively unchecks if they think an exception is justified — with a note field when they uncheck -->

- [ ] Authentication built from scratch (use a library or skip login entirely)
- [ ] Email sending of any kind
- [ ] Password reset flow
- [ ] Payment processing wired to a real provider
- [ ] Admin panel or dashboard for yourself
- [ ] User settings and preferences page
- [ ] Account deletion
- [ ] Mobile layout (unless the product only makes sense on mobile)
- [ ] Complex animations or transitions
- [ ] Real-time features using WebSockets (unless this is the core feature)
- [ ] Error handling beyond a basic try/catch and toast
- [ ] Any form of automated testing

If you find yourself about to build any of these, ask: does removing this break the 90-second demo? If no — it is not in scope.

---

## Time Is The Real Constraint

Most developers underestimate feature time by two to three times in normal conditions. At a hackathon, where you are working in an unfamiliar stack, integrating APIs you have not used before, and making decisions under pressure, assume 2.5x and add a buffer on top.

**A rough time budget for a 24-hour hackathon:**

<!-- UI: render as a visual time budget bar or breakdown card -->

| Block | Time |
|---|---|
| Planning and setup | 1–2 hours |
| Core loop (Must Demo features) | 6–8 hours |
| Supporting features (Must Work) | 3–4 hours |
| Faked features (UI only, no real logic) | 1–2 hours |
| UI polish and demo data | 2–3 hours |
| Deployment and testing | 1–2 hours |
| Demo prep and rehearsal | 2 hours |
| Buffer for things breaking | 2 hours |

That leaves almost no room. Which is the point. If your feature list would require more hours than that core loop budget, cut features until it fits.

A rule that holds: if your team of two cannot name every feature you are building and roughly how long each will take, you have not finished planning.

---

## AI Prompts

<!-- UI: each prompt block should render with a copy-to-clipboard button in the top right corner -->

**Generate a first-pass feature list from your idea**

Use this immediately after Idea Definition. Paste your deliverables and get a starting feature list to triage.

```
I am building a SaaS for a hackathon. Here is my idea:

Idea Statement: [your one sentence]
Context: [your context paragraph]
Demo Moment: [your demo path paragraph]
Hackathon duration: [X hours]
Team size: [X people]

Generate a feature list for this product. For each feature, assign it to one of these four buckets:
- Must Demo: core value is invisible without it
- Must Work: the demo depends on it functioning
- Can Fake: needed for context but can be hardcoded or simulated
- Cut: not in the demo path

Be ruthless. Default to cutting or faking. Flag any feature that will take more than three hours as a risk. Do not add features I did not imply — only extract features from the idea I described.
```

---

**Pressure-test your feature list**

Use this after you have your own list. Paste it in and let AI challenge your decisions.

```
I am building a SaaS hackathon demo. Here is my current feature list with bucket assignments:

[paste your feature list with Must Demo / Must Work / Can Fake / Cut labels]

My core loop is: [one sentence]
My demo path is: [one paragraph]
Time available: [X hours]
Team size: [X people]

Review this list critically:
1. Identify any features I labeled Must Demo or Must Work that could realistically be faked or cut
2. Identify any features I labeled Can Fake that might be harder to fake than I think
3. Flag any features whose combined build time likely exceeds my available hours
4. Tell me what the single riskiest item on this list is and why

Do not validate my decisions. Challenge them.
```

---

**Reality-check a specific feature**

Use this when you are unsure whether a specific feature is worth building.

```
I am building [one-sentence product description] for a hackathon.

I am debating whether to build this feature: [feature description]

My core loop is: [one sentence]
My demo path is: [one paragraph]

Tell me:
1. Does removing this feature break the core demo? Why or why not?
2. Can this be faked convincingly with hardcoded data or static UI? If yes, how?
3. If I build it for real, what is the realistic time cost including integration?
4. Your recommendation: build, fake, or cut — and why.
```

---

## Reviewing AI Output From These Prompts

AI tends to be too generous when reviewing feature lists. Watch for these patterns:

**It kept things it should have cut.** AI respects the effort implied in a feature. It is reluctant to tell you that something you thought of is pointless for the demo. Push back explicitly: "Are you sure this cannot be cut? Make the case for cutting it."

**The time estimates are optimistic.** When AI says something will take "2–3 hours," assume 4–5 hours in a hackathon environment with real distractions, integration issues, and bugs. Adjust accordingly.

**It suggested features you did not ask for.** Ignore these. The goal is to narrow scope, not find reasons to expand it.

**It did not challenge your Must Demo labels.** If everything you labeled Must Demo actually is, your demo is probably too complex. Most products have one or two Must Demo features. More than four is a red flag.

---

## Your Deliverable

Before moving to the PRD, you need a locked feature list. Not a brainstorm. A decision.

<!-- UI: render this as a structured output template the user fills in — possibly a formatted list with dropdowns for bucket assignment -->

Format it exactly like this. Write it somewhere your whole team can see.

---

**Core Loop:**
[One sentence — what the user does and what result happens]

**Feature List:**

| Feature | Bucket | Notes |
|---|---|---|
| [feature] | Must Demo | [why it's core] |
| [feature] | Must Work | [what breaks if it doesn't] |
| [feature] | Can Fake | [how you'll fake it] |
| [feature] | Cut | [why you're cutting it] |

**Estimated build time for Must Demo + Must Work features:**
[X hours total across Y people]

**Riskiest item on the list:**
[Which feature is most likely to blow your time budget, and what is your contingency if it does]

---

Lock this before writing any code. If someone proposes adding a feature after this point, the answer is not "let's see" — the answer is "does this replace something on the list, or are you asking us to cut something else to make room?" Scope is finite. Time is finite. This document is how you enforce both.
