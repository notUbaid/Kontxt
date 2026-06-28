---
title: Target Audience
slug: target-audience
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 30–45 min
---

# Target Audience

Knowing your user is not a marketing exercise. It's an engineering input.

The decisions you make about your tech stack, API response times, mobile-first vs desktop-first design, onboarding flow, error message language, and pricing model are all downstream of who you're building for.

Build for the wrong person and every one of those decisions is wrong too.

---

## Beyond Demographics

Demographics tell you surface facts. Age, location, job title. They're useful but insufficient.

What actually drives product decisions is behaviour — how your user currently solves the problem, what they tolerate, what they won't tolerate, and where they spend attention and money.

You need three layers of understanding:

| Layer | What It Covers | Why It Matters |
|---|---|---|
| **Context** | When and where they hit the problem | Shapes your UX and performance requirements |
| **Behaviour** | How they currently solve it | Defines your real competition |
| **Psychology** | What they care about, fear, and trust | Drives adoption, retention, and pricing |

---

## Build Your User Profile

Work through each section for your primary user. Be specific. Generalisations produce generic products.

---

### Context

```
Where are they when they hit this problem?
  [ ] At a desk, focused work session
  [ ] On a mobile device, on the go
  [ ] In a meeting or collaborative setting
  [ ] Switching between multiple tools

What triggers the problem?
  Describe the specific moment or event that makes them need a solution.

How often does this happen?
  [ ] Multiple times per day
  [ ] Daily
  [ ] Weekly
  [ ] Monthly / project-based

How much time do they lose to it each occurrence?
```

---

### Current Behaviour

This is your actual competition. Not other apps — the behaviour your user currently uses instead of your product.

```
What do they do today to solve this problem?

Option A (most common): ________________________________
Option B (workaround): _________________________________
Option C (ignore it): __________________________________

What do they hate about their current approach?

What do they like about their current approach?
  (This is what you must not remove when replacing it.)

What would have to be true for them to switch to something new?
```

> [!TIP]
> "They'd switch if it was easier" is not a real answer. "They'd switch if it took under 60 seconds to set up and didn't require importing a CSV" is. The specificity of your switching criteria predicts whether your onboarding will work.

---

### Psychology

```
What does success look like to them?
  Not in your product — in their work or life.

What do they fear most about adopting a new tool?
  [ ] Losing existing data
  [ ] Learning curve / time investment
  [ ] Cost
  [ ] Tool going away or changing
  [ ] Sharing data with a third party
  [ ] Looking bad to their team or clients

What signals trust for them?
  [ ] Brand recognition
  [ ] Peer recommendation
  [ ] Free trial, no credit card
  [ ] Case studies from people like them
  [ ] Transparent pricing
  [ ] Active community / changelog

How do they discover new tools?
  [ ] Search (Google, YouTube)
  [ ] Community (Reddit, Slack groups, Discord)
  [ ] Newsletter or blog
  [ ] Colleague recommendation
  [ ] Social media
  [ ] Product directories (Product Hunt, G2, Capterra)
```

---

## The Secondary User Problem

Many products have more than one type of user. A project management tool has individual contributors and managers. An invoicing tool has freelancers and their accountants.

Define your primary user clearly, then acknowledge secondary users without designing for them yet.

```
Primary user:   [who you're designing every decision around]
Secondary user: [who also touches the product but isn't the design centre]

What does the secondary user need that the primary user doesn't?
What would break for the secondary user if you optimised only for the primary?
```

V1 is designed for the primary user. The secondary user is accommodated but not prioritised.

---

## User Interviews

The most valuable thing you can do before writing a line of code is talk to five people who match your user profile.

Not to validate your idea. To understand their problem better than they can articulate it.

**Five questions that consistently produce insight:**

1. "Tell me about the last time you dealt with [problem area]. Walk me through exactly what happened."
2. "What did you do? How long did it take?"
3. "What was the most frustrating part?"
4. "Have you tried any tools for this? What happened?"
5. "If this problem disappeared tomorrow, what would that change for you?"

> [!WARNING]
> Do not pitch your solution during user interviews. The moment you describe what you're building, the conversation shifts from discovery to validation — and people will tell you what they think you want to hear.

**What to listen for:**

- Specific language they use to describe the problem (use this exact language in your UI and marketing)
- Workarounds they've built themselves (these reveal the highest-pain moments)
- Tools they've tried and abandoned (and why — this is your biggest competitive intelligence)
- Emotional intensity (frustration, embarrassment, resignation signal real pain; mild annoyance doesn't)

---

## Prompt: Synthesise User Research

Use this after conducting user interviews or after writing out your user profile in detail.

```
Copy Prompt
```

```
I'm building a production web app for [target user description].

Here is what I know about them from research / interviews:

Context: [paste your context section]
Current behaviour: [paste your behaviour section]
Psychology: [paste your psychology section]

Raw notes from user interviews (if any):
[paste interview notes or key quotes]

Help me synthesise this into:

1. A one-paragraph user profile I can share with collaborators and reference when making product decisions

2. The top 3 insights that should directly influence my product decisions — specific, actionable, non-obvious

3. The single biggest risk in my current understanding of this user — what am I most likely wrong about?

4. Three questions I should answer before I start building that I don't yet know the answer to

Be direct. Don't pad the response.
```

---

## Engineering Implications

Your user profile directly affects technical decisions. Make these connections explicit now.

| User Characteristic | Technical Implication |
|---|---|
| Uses product on mobile, on the go | Mobile-first responsive design, offline capability, fast load on 4G |
| Non-technical, low tolerance for friction | Aggressive onboarding, forgiving error messages, no jargon |
| Uses product during focused work sessions | Keyboard shortcuts, minimal interruptions, performance at p99 not just p50 |
| Manages team access | Multi-tenancy, role-based access control from day one |
| In a regulated industry (finance, health, legal) | Data residency, audit logs, SOC 2 considerations |
| International users | i18n, timezone handling, localised date/number formats |
| High-volume power users | Bulk operations, pagination, rate limit headroom |

Write down the three to five technical implications of your specific user profile. These become constraints for Phase 2.

---

## Target Audience Checklist

- [ ] Primary user is defined specifically enough that you could find 10 real people who match the description
- [ ] Current behaviour (how they solve the problem today) is documented in detail
- [ ] Switching criteria are specific — not "if it's easier" but what specifically would make them switch
- [ ] Trust signals are identified — you know what makes this user trust a new tool
- [ ] Discovery channels are identified — you know where this user finds new tools
- [ ] At least 3 technical implications of your user profile are written down
- [ ] Secondary users (if any) are acknowledged but not conflated with the primary user
- [ ] At least 3 user conversations have been had (or a plan exists to have them before building)

---

## What Comes Next

**Competitor Analysis** — mapping the landscape of existing solutions, what they do well, what they don't, and where the gap you're filling actually sits.

Your user profile is the lens through which you'll evaluate every competitor. A tool your user has already tried and abandoned is more important competitive intelligence than a tool they've never heard of.
