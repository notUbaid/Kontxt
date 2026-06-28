---
title: Idea Definition
slug: idea-definition
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 30–45 min
---

# Idea Definition

A production project without a precise idea definition is a construction site without blueprints. You can start pouring concrete, but you will tear it out later.

This module turns a rough concept into a statement precise enough to make architectural decisions, reject feature requests, and evaluate whether you're building the right thing.

---

## The Problem With "I Have an Idea"

Most ideas arrive as solutions, not problems.

```
❌ "I want to build a platform where people can share recipes."
✅ "Home cooks who follow online recipes waste 30 minutes per meal 
    scaling ingredient quantities for different serving sizes. 
    No existing tool handles fractional scaling cleanly."
```

The first statement describes a feature. The second describes a problem worth solving. Only the second can tell you whether your solution is working.

Every production project starts with the problem, not the product.

---

## The Idea Definition Framework

Work through each section in order. Don't move to the next until you can write a complete, specific answer.

---

### 1. The Problem Statement

Describe the problem in one to three sentences. It must be:

- **Specific** — affects a identifiable group of people in a describable situation
- **Painful** — people are currently suffering or losing something because of it
- **Unsolved** — existing solutions are absent, inadequate, or inaccessible

```
Template:

[Specific group of people] struggle with [specific problem] 
when [specific context or trigger]. 
Currently they [describe the workaround or status quo], 
which causes [specific negative outcome: time lost, money lost, 
frustration, risk, missed opportunity].
```

Write yours here before continuing.

---

### 2. The Target User

One primary user. Not three. Not "anyone who."

Production software is designed for someone specific. The more precisely you can describe that person, the better every subsequent decision becomes — from UI copy to database schema to pricing.

```
Template:

Primary user: [job title or role]
Context: [what they're doing when they hit this problem]
Technical comfort: [non-technical / moderate / technical]
Current tools: [what they use today]
Frequency: [how often they hit this problem]
Stakes: [what's at risk when it goes wrong]
```

> [!WARNING]
> "Everyone" is not a target user. Neither is "small businesses" or "developers." If your user definition applies to more than a few million people without further qualification, it's too broad.

---

### 3. The Solution Hypothesis

One sentence. What you're building and why it's better than the status quo.

```
Template:

[Product name] is a [category] that helps [target user] 
[achieve specific outcome] by [core mechanism / differentiating approach], 
unlike [status quo / primary alternative] which [specific limitation].
```

This is your hypothesis. You will test it. It will probably change. Write it anyway — it forces precision.

---

### 4. The Core Value Moment

Every great product has a single moment where the user feels the value. Everything else supports that moment.

Instagram: the moment you see your photo look beautiful with one tap.
Stripe: the moment your first payment goes through with six lines of code.
Notion: the moment you realize one tool replaced five.

What is your moment?

```
The user feels the core value of [product name] when they 
[specific action] and [specific result occurs].

This takes [X seconds / X minutes] from first interaction.
```

If you can't describe this moment clearly, you don't yet understand what you're building.

---

### 5. What You Are Not Building

Scope is a decision, not a limitation. Define what v1 explicitly excludes.

```
V1 does NOT include:
- [Feature that seems related but isn't core]
- [User type that would dilute the focus]
- [Integration that can wait]
- [Platform that isn't the primary one]
```

This list is as important as your feature list. Every item on it is a decision you made deliberately rather than a thing you forgot.

---

### 6. Success Definition

What does a successful v1 look like in 6 months? Be specific enough to measure.

```
At 6 months post-launch, this project is successful if:

Adoption:    [X] active users / [X] paying customers
Engagement:  [X]% of users [core action] at least [X] times per week
Retention:   [X]% of users still active after 30 days
Revenue:     $[X] MRR (if monetised)
Quality:     Uptime ≥ [X]% / p95 response time < [X]ms
```

These numbers don't need to be perfectly calibrated. They need to be specific enough to evaluate whether you're on track or off track.

---

## Prompt: Stress-Test Your Idea

Use this before moving forward. It will surface assumptions you've made without realising it.

```
Copy Prompt
```

```
I'm defining a production web app idea. Here is my current definition:

Problem: [your problem statement]
Target user: [your target user description]
Solution hypothesis: [your one-sentence solution]
Core value moment: [your described moment]
V1 scope: [your feature list]
Out of scope: [your exclusion list]
Success at 6 months: [your metrics]

Act as a skeptical but constructive senior product manager.

Challenge this definition by:
1. Identifying any part of the problem statement that is vague or unverifiable
2. Asking the hardest question about whether this problem is actually painful enough
3. Identifying the riskiest assumption in the solution hypothesis
4. Pointing out any likely scope creep — features that will be requested but aren't in scope
5. Flagging any success metric that is vanity (easy to hit, doesn't indicate real value)

For each issue you find, suggest a more precise alternative.

Do not validate my idea. Challenge it.
```

---

## The Litmus Tests

Before moving to Target Audience, your idea definition should pass all four:

- [ ] The problem statement names a specific person in a specific situation — not a general frustration
- [ ] The solution hypothesis is falsifiable — you could run an experiment to test it
- [ ] The core value moment can be reached by a new user in under 5 minutes
- [ ] The out-of-scope list has at least 5 items — if you can't name 5 things you're not building, your scope is undefined

---

## Common Mistakes at This Stage

**Defining the solution before the problem.** If your problem statement is "there's no good app for X," you've described a gap in the market, not a human problem. Go deeper.

**Conflating user types.** "Freelancers and agencies" sounds like one user. It's two. They have different workflows, different pain levels, different willingness to pay. Pick one for v1.

**Optimistic success metrics.** "10,000 users in 6 months" feels ambitious. "100 users who use it 3 times per week" is a more honest — and more useful — early success definition.

**Skipping the exclusion list.** Every feature you don't exclude is a feature you'll be tempted to build. Temptation costs weeks.

---

## What Comes Next

**Target Audience** — going deeper than a user description into the psychographics, behaviours, and buying patterns of the people you're building for.

The idea definition you've written here will be referenced throughout the curriculum. Keep it accessible. Update it when your understanding changes — but only deliberately, not because something seems easier to build.
