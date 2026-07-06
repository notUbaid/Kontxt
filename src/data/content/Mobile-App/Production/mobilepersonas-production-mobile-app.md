---
title: Personas
slug: personas
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 30–40 min
---

# Personas

A persona is a named, specific fictional user whose characteristics are grounded in real research. It is not a demographic card. It is a decision-making tool.

When you disagree with yourself or a collaborator about a design decision, a persona answers the question: "What would Maya do?" That specificity — a real name, a real context, a real frustration — makes abstract choices concrete.

For mobile apps, personas are especially valuable because platform conventions differ dramatically between user types. A 22-year-old power user and a 55-year-old first-time smartphone user are both "iOS users." They need completely different apps.

---

## How Many Personas

**One primary persona. One secondary at most.**

More than two personas is a symptom of trying to serve too many users. If you have four personas with equal weight, you don't have a target audience — you have a market research document.

The primary persona is who you design every decision around. The secondary persona is someone who also uses the app but whose needs don't override the primary when they conflict.

---

## What a Production Persona Contains

A useful persona has seven components. Each one serves a specific purpose in product decisions.

| Component | Purpose |
|---|---|
| **Identity** | Makes the persona concrete and memorable |
| **Context** | Where and when they encounter your problem |
| **Goals** | What they're trying to accomplish — in life, not in your app |
| **Frustrations** | What's failing them today — the pain you're solving |
| **Mobile behaviour** | How they actually use their phone |
| **Trust and decision factors** | What makes them download and keep an app |
| **Quote** | Their voice — one sentence that captures their worldview |

---

## Primary Persona Template

```
## [First Name], [Age] — [Role or Identity]

"[A quote that captures their frustration or goal in their own words]"

---

IDENTITY
Location:        [City, Country]
Occupation:      [Job or life role]
Income:          [Approximate — relevant to monetization decisions]
Tech comfort:    [1–5, where 1 = struggles with smartphones, 5 = power user]
Device:          [Specific device model and age — ground this in reality]
OS version:      [Approximate — affects feature availability]

---

CONTEXT
When they hit the problem:
[Describe the specific situation — time of day, activity, location, 
what they're in the middle of doing]

How often: [Daily / several times a week / weekly]

What triggers reaching for their phone:
[The specific moment they think "I need to deal with this"]

---

GOALS
Life goals (what they want beyond your app):
- [Goal 1]
- [Goal 2]

App goals (what they want from a solution):
- [Goal 1]
- [Goal 2]

Definition of success with your app:
[One sentence — what does "this works" mean to them]

---

FRUSTRATIONS
With current solution:
- [Specific frustration 1]
- [Specific frustration 2]
- [Specific frustration 3]

What they've tried and abandoned:
[App or method, and specifically why it didn't work]

Biggest daily friction point:
[The moment that generates the most frustration]

---

MOBILE BEHAVIOUR
Daily screen time:        [hours]
Phone position:           [always in pocket / bag / desk]
Typical session type:     [micro / short / medium / long]
One or two-handed:        [which and why]
Notification behaviour:   [dismisses all / checks selectively / checks everything]
App download frequency:   [downloads often / rarely / only when desperate]
Pays for apps:            [yes / sometimes / never — and why]
Permission behaviour:     [grants readily / reads carefully / denies by default]

---

TRUST & DECISION FACTORS
What makes them download a new app:
- [Factor 1 — e.g. friend recommendation, high rating, featured]
- [Factor 2]

What makes them delete an app within a week:
- [Factor 1 — e.g. confusing, crashed, notification spam]
- [Factor 2]

What makes them pay / subscribe:
[Specific condition — "if I use it more than 3x a week I'll pay"]

Privacy concerns:
[High / medium / low — and what specifically they worry about]
```

---

## Example Primary Persona

```
## Sarah, 31 — Freelance Personal Trainer

"I spend more time on admin after sessions than I do actually training clients."

---

IDENTITY
Location:        Austin, TX
Occupation:      Self-employed personal trainer, 14 clients
Income:          $58K/year
Tech comfort:    3/5 — comfortable with standard apps, not a power user
Device:          iPhone 13 (2 years old)
OS version:      iOS 17

---

CONTEXT
When she hits the problem:
Mid-session on a gym floor, client is resting between sets. She needs to log
the set just completed — weight, reps, notes — before they start the next one.
She currently pulls out her iPhone and types into Notes or tries to remember
it for later.

How often: 8–12 times per client session, 4–6 sessions per day

What triggers reaching for her phone:
Client finishes a set and she needs to capture it before the rest period ends

---

GOALS
Life goals:
- Build her client base to 20 clients without burning out on admin
- Differentiate her service by showing clients measurable progress over time

App goals:
- Log sets in under 5 seconds without looking away from her client
- Pull up a client's full history before each session without hunting through notes

Definition of success:
"I never lose a client's data and I can tell every client exactly how far
they've come since day one."

---

FRUSTRATIONS
With current solution (Notes app + memory):
- Loses data when she forgets to log mid-session
- Can't search across clients — has to scroll through months of notes
- No way to show clients their progress — has to describe it verbally

What she tried and abandoned:
TrainerRoad — too athlete-focused, not client-management focused.
A generic CRM — too complex, not designed for gym floor use.

Biggest daily friction:
Spending 45 minutes every Sunday reconstructing the week's session logs
from memory and scrappy notes

---

MOBILE BEHAVIOUR
Daily screen time:        3.5 hours
Phone position:           Always in her gym shorts pocket or on a nearby bench
Typical session type:     Micro (< 30 seconds per log entry) + short (5 min before sessions)
One or two-handed:        One-handed — always has a clipboard or resistance band in the other hand
Notification behaviour:   Checks notifications between clients, dismisses anything non-urgent
App download frequency:   Downloads 1–2 apps per month when someone recommends one
Pays for apps:            Yes, if it saves her more time than it costs — "I pay for Calendly"
Permission behaviour:     Grants readily for fitness apps; cautious about contact access

---

TRUST & DECISION FACTORS
What makes her download a new app:
- A trainer friend recommends it specifically ("I use this for all my clients")
- 4.7+ stars with reviews from other trainers

What makes her delete within a week:
- Took more than 2 minutes to log her first session
- Required setup before she could use it

What makes her pay/subscribe:
"If it saves me the Sunday reconstruction session every week, I'll pay $15/month easily"

Privacy concerns:
Medium — wants to know client data is stored securely, doesn't like apps
that want access to contacts or location without obvious reason
```

---

## Secondary Persona (Abbreviated Format)

If a secondary user exists, keep their persona brief. They are not the design centre.

```
## [Name], [Age] — [Role]

"[Quote]"

Relationship to primary: [How they interact with the same app]
Key difference from primary: [What they need that's different]
When their needs conflict with primary: [How to decide — primary wins]
One design implication: [Specific thing to accommodate without compromising primary UX]
```

---

## Using Personas in Decisions

A persona is only useful if you actually reference it. Here is how.

**When choosing between two navigation patterns:**
"Which one does Sarah complete in one thumb movement while standing?"

**When writing onboarding copy:**
"Would Sarah understand this without a tech background?"

**When deciding on a permission request:**
"Would Sarah grant location permission for this feature, or would she deny it and churn?"

**When setting a notification frequency:**
"How many notifications per day before Sarah disables them entirely?"

**When pricing a subscription:**
"Does this feel worth it to Sarah relative to the time it saves her?"

> [!TIP]
> Print your primary persona and put it where you work. This sounds excessive. It isn't. The number of decisions that get made without referencing the user is the number of decisions that produce the wrong app.

---

## Prompt: Generate Your Primary Persona

```
Copy Prompt
```

```
I'm building a production mobile app. Generate a detailed primary persona
grounded in my audience research.

My problem statement: [paste]
My target audience profile: [paste key points from previous module]
My solution: [paste]

Evidence from research:
- User interviews / conversations: [what you heard]
- Reviews / forums / community: [what you observed]
- Any quantitative data: [if any]

Generate a complete primary persona using this structure:
Identity (name, age, role, location, income, tech comfort, specific device + OS)
Context (when/where/how often they hit the problem, what triggers phone use)
Goals (life goals + app goals + definition of success)
Frustrations (with current solution, what they tried and abandoned, biggest friction)
Mobile behaviour (screen time, session type, one/two-handed, notification and 
permission behaviour, payment willingness)
Trust & decision factors (what drives download, what drives delete, payment trigger, 
privacy concern level)
A closing quote in their voice

Ground every detail in the research I've provided. Where research is thin,
flag the assumption explicitly so I know what to validate.
```

---

## Personas Checklist

- [ ] Primary persona has all seven components completed
- [ ] Persona is grounded in research — not invented from intuition
- [ ] Specific device and OS version named (not "an iPhone")
- [ ] Mobile behaviour is detailed enough to drive UI decisions (session type, one/two-handed)
- [ ] Trust and deletion triggers identified
- [ ] Payment willingness and conditions are explicit
- [ ] Secondary persona exists only if there is a genuinely distinct secondary user
- [ ] Persona is accessible to anyone working on the product
- [ ] At least three product decisions have been tested against the persona

---

## What Comes Next

**User Journey** — mapping the complete experience your primary persona has from first becoming aware of the problem through discovering your app, downloading it, onboarding, using it regularly, and either churning or becoming a loyal user.

The persona is the person. The user journey is their story.
