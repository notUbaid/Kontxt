---
title: Problem Statement
slug: problem-statement
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 30–40 min
---

# Problem Statement

The problem statement is the foundation every product decision is tested against. A weak problem statement produces a product that solves the wrong thing well. A strong problem statement is the difference between building something people need and something people download once.

In mobile, this matters more than in any other medium. Users delete apps that don't immediately solve a felt need. The average app loses 77% of its daily active users within the first three days of install.

Your problem statement must describe a problem real enough, painful enough, and mobile-specific enough that users will give your app a permanent place on their home screen.

---

## What a Strong Problem Statement Contains

A production-grade problem statement is not one sentence. It is a structured argument with five components:

| Component | What It Proves |
|---|---|
| **The user** | The problem affects a real, identifiable person |
| **The situation** | The problem occurs in a specific, describable context |
| **The pain** | The problem causes a concrete, measurable negative outcome |
| **The current behaviour** | People are actively trying to solve this — and failing |
| **The frequency** | This happens often enough to warrant a dedicated app |

All five must be present. Missing any one of them weakens the entire foundation.

---

## Building Your Problem Statement

### Component 1 — The User

Not a demographic. A person in a situation.

```
WEAK: "People who exercise"
WEAK: "Busy professionals"
STRONG: "Freelance personal trainers who manage 10–20 clients across multiple gyms"
STRONG: "Parents of children with Type 1 diabetes who monitor glucose levels throughout the day"
```

Write your user in one sentence. If your description applies to more than a few million people without further qualification, narrow it.

---

### Component 2 — The Situation

The specific context in which the problem occurs. This is where the mobile angle lives.

```
Template:

When [specific activity or moment],
[user] needs to [action or information]
but [obstacle or friction that exists].
```

```
Example:
When a personal trainer is mid-session with a client on the gym floor,
they need to log workout sets and reps in real time
but their current tools (paper, Notes app) lose data and can't track progress across sessions.
```

The situation reveals whether mobile is the right medium. If the situation occurs at a desk with full attention, mobile is a weak fit. If it occurs in motion, with one hand, under time pressure, or away from a computer — mobile is the right fit.

---

### Component 3 — The Pain

Quantify it where possible. Qualify it where not.

```
Pain categories (use the most severe that honestly applies):

Financial:    "Loses $X per [period] because..."
Time:         "Wastes X hours per [period] on..."
Emotional:    "Experiences anxiety/frustration/embarrassment because..."
Risk:         "Risks [consequence] because..."
Opportunity:  "Misses [outcome] because..."
```

```
Example:
The trainer loses ~2 hours per week manually reconstructing workout logs
after sessions and risks losing client history if they switch devices or apps.
```

> [!WARNING]
> "It's annoying" is not a pain. Annoyance produces one-star reviews, not loyal users. If the strongest honest pain description is mild inconvenience, reconsider whether the problem is painful enough to sustain an app.

---

### Component 4 — The Current Behaviour

What are users doing right now? This is your real competition.

Document at least three current behaviours:

```
Current behaviour A (most common): [what they actually do]
  Why it fails: [specific limitation]

Current behaviour B (workaround): [what some do instead]
  Why it fails: [specific limitation]

Current behaviour C (tool): [app or product they've tried]
  Why it fails: [specific limitation — if they abandoned it, why?]
```

The current behaviour is your competitive intelligence and your differentiation brief in one. If nobody is currently trying to solve this problem, that's a signal — either the problem isn't painful enough, or you've found a genuine gap. Figure out which.

---

### Component 5 — The Frequency

How often does this problem occur? Frequency determines whether an app earns a home screen slot.

```
[ ] Multiple times per day → Home screen candidate, high DAU potential
[ ] Daily → Home screen candidate, strong habit-forming opportunity
[ ] Weekly → App drawer, risk of being forgotten between uses
[ ] Monthly → Very hard to build retention around
[ ] Occasionally / situationally → Better as a feature in another app
```

If your problem occurs weekly or less, your retention strategy needs to compensate. Push notifications, widgets, and lock screen integrations become critical. Be honest about this now.

---

## The Assembled Problem Statement

Combine all five components into a single structured statement:

```
[User description] struggle with [specific problem]
when [specific situation].

Currently, they [current behaviour A], which [why it fails].
Some [current behaviour B], but [why that fails too].

This happens [frequency] and costs them [specific pain — time, money, risk, emotion].

There is no existing solution that [specific gap your solution addresses].
```

Write this out completely. Read it aloud. If any part sounds vague or hypothetical, rewrite it with more specificity.

---

## Validation Methods

A problem statement is a hypothesis. Before building, gather evidence.

**User interviews (highest signal):**

Five conversations with people who match your user description. Ask:
1. "Walk me through the last time you dealt with [problem area]."
2. "What did you do? How long did it take?"
3. "What was the most frustrating part?"
4. "Have you tried any apps for this? What happened?"
5. "How often does this come up?"

Do not describe your solution. Listen for the language they use. That language belongs in your App Store listing.

**Behavioural evidence (strong signal):**
- Reddit threads where users complain about this exact problem
- App Store reviews of competitor apps that mention unmet needs
- Forum posts asking for tool recommendations that don't get a good answer
- Facebook groups or communities built around the problem

**Search evidence (supporting signal):**
- Google search volume for the problem description
- App Store search volume (App Store Connect provides keyword data post-launch; pre-launch, use tools like Sensor Tower or AppFollow)

---

## Mobile-Specific Validation Questions

Beyond the standard problem validation, answer these for mobile:

```
1. Does this problem occur in a context where users have their phone?
   Evidence: [what you observed or heard]

2. Do users currently use their phone as part of their workaround?
   Evidence: [yes/no + what they do]

3. Would users tolerate the friction of downloading an app to solve this?
   Evidence: [what they said when asked directly]

4. Is there a hardware capability (camera, GPS, NFC, notifications) 
   that makes mobile significantly better than web for this?
   Capability: [what it is + why it matters]
```

---

## Prompt: Validate and Sharpen Your Problem Statement

```
Copy Prompt
```

```
I'm building a production mobile app. Review and sharpen my problem statement.

My draft problem statement:
[paste your assembled statement]

Evidence I have gathered:
- User interviews: [what you heard, key quotes if any]
- Behavioural evidence: [Reddit threads, reviews, forums]
- Search evidence: [any data]

Mobile validation:
- Problem context: [when/where it occurs]
- Current phone usage in workaround: [yes/no, how]
- Hardware advantage: [camera/GPS/notifications/none]

Evaluate my problem statement:

1. Rate the specificity of each component (user, situation, pain, 
   current behaviour, frequency) on a scale of 1–5, with reasoning.

2. Identify the weakest component and rewrite it with more specificity.

3. Assess the mobile fit — is this genuinely a mobile-first problem,
   or would a web app serve it adequately?

4. What is the single most important thing I should validate before 
   building anything?

5. Rewrite the full problem statement in its sharpest possible form
   based on everything I've provided.
```

---

## Problem Statement Checklist

- [ ] User description is specific enough to find 10 real people who match it
- [ ] Situation describes when and where the problem occurs — mobile context is clear
- [ ] Pain is concrete — financial, time, emotional, or risk — not just "annoying"
- [ ] At least 3 current behaviours documented with specific failure reasons
- [ ] Frequency assessed honestly — app type implications understood
- [ ] Full assembled problem statement written and read aloud
- [ ] At least 3 sources of evidence gathered (interviews, reviews, forums, search)
- [ ] Mobile-specific validation questions answered
- [ ] Problem statement reviewed and sharpened

---

## What Comes Next

**Target Audience** — moving from problem to person. Who specifically experiences this problem, how they think about it, what they trust, and how they discover new apps. Every design and distribution decision follows from a precise audience definition.
