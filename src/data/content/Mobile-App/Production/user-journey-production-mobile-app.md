---
title: User Journey
slug: user-journey
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 35–50 min
---

# User Journey

A user journey maps the complete arc of your primary persona's experience — from the moment they first feel the problem through discovering your app, downloading it, using it for the first time, becoming a habit, and either churning or becoming a loyal user.

Most product teams map only the in-app experience. That's a fraction of the journey. The decisions that determine whether your app succeeds — App Store listing quality, onboarding completion, Day-7 retention — all live outside the core product flow.

---

## Why the Full Journey Matters

Every stage of the journey has a drop-off rate. Understanding where drop-off is highest tells you where to invest.

```
Awareness       → Discovery       → Download
  ↓                   ↓                ↓
[Lost here =    [Lost here =     [Lost here =
 marketing       ASO / listing    store page
 problem]        problem]         problem]

Onboarding      → First Value    → Habit
  ↓                   ↓                ↓
[Lost here =    [Lost here =     [Lost here =
 UX problem]     core feature     retention
                 problem]         problem]
```

A great app that nobody finds fails. A found app with broken onboarding fails. An onboarded app that doesn't deliver value in session one fails. Map all of it.

---

## The Six Journey Stages

### Stage 1 — Awareness

The persona becomes aware they have a problem worth solving.

```
STAGE 1: AWARENESS

Trigger event:
[What specific thing happens that makes the problem undeniable?]
e.g. "Sarah loses her third client's session data in a month"

Emotional state: [frustrated / embarrassed / overwhelmed / resigned]

What they do next:
[Do they search immediately? Ask someone? Ignore it for now?]

Where your app could appear at this stage:
[ ] Google search for the problem
[ ] Reddit / community recommendation
[ ] Friend or colleague mentions it
[ ] Social media post or video
[ ] Not findable here — awareness comes later
```

---

### Stage 2 — Discovery

The persona learns your app exists.

```
STAGE 2: DISCOVERY

How they find you (primary channel):
[App Store search / word of mouth / social / content / press]

What they search for:
[Exact search terms they would use — this feeds directly into ASO keywords]

What they see first:
[App icon + name / search result snippet / friend's screenshot / review]

First impression formed in < 3 seconds:
"This looks like it's for [who] — [relevant or not]"

Questions they have at this moment:
- Does this solve [specific aspect of my problem]?
- Is this trustworthy?
- Is this worth the space on my phone?

What would make them keep reading: [specific element]
What would make them immediately move on: [specific element]
```

---

### Stage 3 — App Store Evaluation

The persona is on your App Store or Play Store listing page. This is the conversion moment.

```
STAGE 3: STORE EVALUATION

Time spent evaluating: [< 30 seconds for most users]

What they look at (in order):
1. Rating and review count — does it pass the trust threshold?
2. Screenshots — does it look like what I imagined?
3. Description first line — does it say exactly what it does?
4. Reviews — do people like me use this and find it useful?

Objections at this stage:
- "Is this [free / worth the price]?"
- "Will this actually [solve my specific problem]?"
- "Is my data safe with these people?"

What tips them into downloading:
[Specific element — 4.8 stars / a review from someone exactly like them / 
a screenshot showing the exact feature they need]

What makes them leave without downloading:
[Low reviews / screenshots that look generic / confusing description]
```

---

### Stage 4 — Onboarding

The persona opens the app for the first time.

```
STAGE 4: ONBOARDING

Context of first open:
[Where are they? What else are they doing? How much time do they have?]
e.g. "Sarah opens it between clients, has 3 minutes before the next session"

Patience level at first open: [very low / moderate]
  — Most users give new apps < 60 seconds before forming a judgment

What they expect to happen:
[Based on what they saw in the store listing]

The onboarding goal:
Get [persona name] to [core value moment] within [X taps / X minutes]

Critical onboarding decisions:
[ ] Sign up required before any value? (friction — justify it or remove it)
[ ] Permissions requested upfront or deferred? (defer unless essential)
[ ] Tutorial shown or value-first? (value-first is almost always better)
[ ] Data required to show value? (offer example/demo data if yes)

Where they most likely abandon:
[Specific step — long sign-up form / confusing permission request / 
unclear next step / didn't reach value before giving up]

Emotional state if onboarding succeeds:
"[Specific reaction — 'Oh, this is exactly what I needed']"

Emotional state if onboarding fails:
"[Specific reaction — 'I don't get it, deleting this']"
```

> [!WARNING]
> Every screen added to onboarding reduces completion rate by ~10–20%. If your onboarding is 5 screens, you've lost half your downloads before they've seen the product. The question is not "what should we teach users?" — it is "what is the absolute minimum they need to experience the core value?"

---

### Stage 5 — First Week (Habit Formation)

The persona has completed onboarding. Now comes the hardest part: getting them to return.

```
STAGE 5: FIRST WEEK

Day 1 — After first session:
Do they get a moment of value before closing? [yes / no / depends]
What brings them back tomorrow? [push notification / intrinsic motivation / habit cue]

Day 2–3 — The critical window:
What is the habit cue that triggers opening your app?
[Environmental — "whenever I [specific trigger]" / 
 notification — "when they remind me" /
 intrinsic — "when I feel [emotion]"]

Retention risks in days 2–7:
- [Risk 1 — e.g. "doesn't establish a routine with the app"]
- [Risk 2 — e.g. "gets a notification and disables them immediately"]
- [Risk 3 — e.g. "hits a feature limitation before getting hooked"]

What would make them tell someone about it in the first week:
[Specific moment — "she shows a client their progress chart for the first time"]

Day 7 benchmark:
If [persona] is still using the app on Day 7, what does that mean they've done?
[Specific behaviour that predicts long-term retention]
```

---

### Stage 6 — Long-Term (Loyalty or Churn)

The persona either becomes a loyal user or churns. Map both paths.

```
STAGE 6: LONG-TERM

Loyal user path:
What does the app look like in their life after 3 months?
[How often? What core action? What would they miss if it disappeared?]

What converts them from free to paid (if applicable):
[Specific moment — "she hits the 5-client limit and has 6 clients"]

What makes them recommend it to others:
[Specific trigger — delight moment / achievement / visible result]

Churn path:
Most likely churn reason: [specific — not generic]
When in the lifecycle does churn typically happen: [day 3 / week 2 / month 2]
Is churn recoverable? [winback notification / email / feature improvement]

The question that determines loyalty:
"Does [persona name] feel like [app name] understands [their specific situation]?"
```

---

## The Journey Map Document

Assemble the six stages into a single reference document.

```
## User Journey — [App Name]
Persona: [Primary persona name]

STAGE         TOUCHPOINT      EMOTION      OPPORTUNITY / RISK
─────────────────────────────────────────────────────────────
Awareness     [trigger]       [emotion]    [what you can control]
Discovery     [channel]       [emotion]    [ASO, content, word of mouth]
Store eval.   [listing page]  [emotion]    [screenshots, rating, copy]
Onboarding    [first open]    [emotion]    [time to value, drop-off risk]
First week    [days 1–7]      [emotion]    [habit cue, retention mechanic]
Long-term     [month 1+]      [emotion]    [loyalty driver or churn risk]

Key drop-off risks:
1. [Stage] → [specific reason] → [mitigation]
2. [Stage] → [specific reason] → [mitigation]
3. [Stage] → [specific reason] → [mitigation]

Highest leverage opportunities:
1. [Stage] → [specific action that would most improve outcomes]
2. [Stage] → [specific action]
```

---

## Prompt: Map Your User Journey

```
Copy Prompt
```

```
I'm building a production mobile app. Map the complete user journey for 
my primary persona.

Primary persona: [paste full persona from previous module]
Problem statement: [paste]
App solution: [paste]
Primary discovery channel: [how users will find the app]
Monetization model: [free / freemium / paid / subscription]

Map all six journey stages:
1. Awareness — what triggers them to seek a solution
2. Discovery — how they find the app, what they search for
3. Store evaluation — what they look at, what tips them to download or leave
4. Onboarding — context of first open, critical path to core value, 
   most likely abandonment point
5. First week — habit formation mechanics, Day-1 and Day-7 retention risks
6. Long-term — loyalty drivers, churn reasons, conversion to paid moment

For each stage include:
- The persona's emotional state
- Their specific questions or objections
- The single highest-leverage thing I can do at this stage
- The specific drop-off risk and how to mitigate it

End with a prioritised list of the three journey stages that most need 
design attention for this specific app.
```

---

## User Journey Checklist

- [ ] All six stages mapped for primary persona
- [ ] Awareness trigger is specific — not "they search for an app"
- [ ] Discovery channel identified with specific search terms documented
- [ ] Store evaluation drop-off risks named with specific mitigations
- [ ] Onboarding critical path defined — taps and minutes to core value stated
- [ ] Day 1, Day 3, and Day 7 retention risks identified
- [ ] Habit cue described — what brings them back without a push notification
- [ ] Loyalty driver described — what makes them recommend the app
- [ ] Churn path mapped — specific reason, timing, recoverability
- [ ] Journey map document assembled and accessible
- [ ] Three highest-leverage journey improvements identified and prioritised

---

## What Comes Next

**Competitor Analysis** — mapping the apps and alternatives your persona has already tried or will consider. The journey you've mapped tells you where users arrive from; competitor analysis tells you what they're comparing you to when they get to the store page.
