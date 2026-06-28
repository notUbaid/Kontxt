---
title: Target Audience
slug: target-audience
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 30–45 min
---

# Target Audience

Your target audience is not who you hope will download your app. It is the specific person whose behaviour, context, and psychology drive every product decision you make — from navigation patterns to notification timing to App Store screenshots.

Mobile apps that try to serve everyone serve no one. The home screen is precious real estate. Users grant it only to apps that feel made for them.

---

## Why Mobile Audience Definition Is Different

On the web, a wrong assumption about your user costs you a bounce. On mobile, it costs you an uninstall — and uninstalls permanently affect your App Store ranking algorithm. Apple and Google both surface apps with strong retention and penalise apps with high uninstall rates.

Knowing your user precisely means:
- Better onboarding conversion (users recognise themselves immediately)
- Higher Day-1 and Day-7 retention (the app does what they expected)
- Better App Store ratings (less mismatch between expectation and reality)
- More effective ASO (you use their language in your listing)

---

## The Four Layers of Mobile Audience Understanding

### Layer 1 — Behavioural Context

How does your target user actually behave on their phone?

```
Phone usage pattern:
[ ] Heavy user — phone in hand most of the day
[ ] Moderate user — picks up phone with intent, puts it down
[ ] Utility user — reaches for phone only when needed

Session length expectation for your app:
[ ] Micro sessions (< 1 minute) — check something, act, close
[ ] Short sessions (1–5 minutes) — complete a task
[ ] Medium sessions (5–15 minutes) — explore, create, consume
[ ] Long sessions (15+ minutes) — deep engagement

Typical usage environment:
[ ] On the move (commuting, walking)
[ ] Standing (gym, kitchen, retail floor)
[ ] Seated but not at desk (couch, waiting room)
[ ] At desk as a companion to computer work
[ ] Varied — no consistent pattern

One-handed or two-handed use?
[ ] Mostly one-handed → thumb reach zones matter enormously
[ ] Mostly two-handed → more of the screen is reachable
```

These answers directly shape your navigation placement, interaction design, and feature prioritisation. A one-handed, micro-session, on-the-move user needs completely different UI patterns than a two-handed, 15-minute, seated user.

---

### Layer 2 — Device and OS Reality

Your users don't have the latest iPhone. Design and test for reality.

```
Primary platform your users are on:
[ ] iOS (if your audience skews higher income, US/Western markets, creative professionals)
[ ] Android (if your audience skews broader global, emerging markets, wider income range)
[ ] Both roughly equally

Likely device age:
[ ] Cutting edge (1–2 years old) — tech-forward audience
[ ] Mid-range (2–4 years old) — mainstream audience
[ ] Older devices (4+ years) — budget-conscious or non-tech-primary audience

Implication:
Older devices mean lower RAM, slower CPUs, smaller screens, older OS versions.
Design for your user's device, not your development device.
```

> [!WARNING]
> The most common mobile testing mistake is developing on a high-end device and testing on the same. If your target user has a 4-year-old mid-range Android, test on one. Performance problems that are invisible on a Pixel 8 are dealbreakers on a Galaxy A32.

---

### Layer 3 — App Behaviour Patterns

How does your target user interact with apps in your category?

```
Notification tolerance:
[ ] High — expects and wants notifications (fitness, finance, social)
[ ] Moderate — accepts relevant notifications, ignores others
[ ] Low — disables most notifications immediately

Permission granting behaviour:
[ ] Trusting — grants permissions readily
[ ] Cautious — reads permission dialogs, often denies
[ ] Hostile — denies all non-essential permissions on principle

Discovery method:
[ ] App Store search (searching for a solution to a specific problem)
[ ] App Store browse (discovering new categories and featured apps)
[ ] Friend/colleague recommendation
[ ] Social media / content (TikTok review, YouTube video, tweet)
[ ] Press and editorial coverage
[ ] Other app cross-promotion

Review-writing behaviour:
[ ] Writes reviews when delighted or very frustrated
[ ] Never writes reviews
[ ] Reviews when explicitly prompted

Purchase behaviour:
[ ] Comfortable with premium apps (paid upfront)
[ ] Prefers free with in-app purchase
[ ] Subscription-willing if clear value
[ ] Avoids all paid apps
```

---

### Layer 4 — Psychographic Drivers

What does your user care about, fear, and trust? These drive adoption and retention decisions.

```
What does success look like to this user?
(Not in your app — in their actual life or work)

What do they fear about new apps?
[ ] Data privacy — who sees their information
[ ] Complexity — will it take time to learn
[ ] Cost — especially recurring subscriptions
[ ] Commitment — being locked into something
[ ] Looking foolish — if the app is public-facing

What signals trust for a new mobile app?
[ ] High App Store rating (4.5+) with many reviews
[ ] Familiar brand or known developer
[ ] Featured by Apple or Google
[ ] Recommended by someone they know
[ ] Press coverage from trusted sources
[ ] No upfront cost / risk-free trial
[ ] Clear privacy policy and data handling

What would make them delete the app within the first week?
[ ] Confusing onboarding — didn't get to value quickly
[ ] Too many permission requests upfront
[ ] Notification spam
[ ] Crashes or bugs
[ ] Didn't solve the problem they downloaded it for
[ ] Unexpected paid wall blocking core features
```

---

## Secondary Audience

Some apps have more than one user type. Define them without conflating them.

```
Primary user: [who you design every decision around]
  Their primary need: [what they get from the app]

Secondary user (if applicable): [who else touches the app]
  Their primary need: [what they need — different from primary]
  
  What the secondary user needs that primary doesn't:
  What breaks for secondary user if you only optimise for primary:
  Will secondary user ever become primary user at scale?
```

V1 is designed for the primary user. Secondary users are not ignored — but they are not the design centre.

---

## Audience-Driven Engineering Decisions

Your audience profile creates direct engineering constraints. Make these explicit now.

| Audience Characteristic | Engineering Implication |
|---|---|
| Older devices common | Aggressive performance budgets; no heavy animations by default |
| One-handed micro sessions | Bottom navigation; thumb-zone primary actions; minimal modals |
| Notification-tolerant | Invest in rich push notification infrastructure |
| Permission-cautious | Defer permission requests; explain before asking; graceful degradation |
| Low connectivity environments | Offline-first architecture; optimistic UI updates; sync on reconnect |
| International audience | i18n from day one; RTL language support if applicable |
| Low digital literacy | Progressive disclosure; simple onboarding; minimal terminology |
| Privacy-conscious | Minimal data collection; explicit consent; on-device processing where possible |

Write down the three to five engineering implications that apply to your specific audience. These become architectural constraints in Phase 2.

---

## Prompt: Build Your Audience Profile

```
Copy Prompt
```

```
I'm building a production mobile app. Help me build a precise target audience profile.

My problem statement: [paste from previous module]
My solution hypothesis: [paste from Idea Definition]

Initial audience assumptions:
- Who I think uses this: [your description]
- Primary platform: [iOS / Android / both]
- Usage context: [on the go / seated / at desk / varied]
- Session length expectation: [micro / short / medium / long]

Generate a complete audience profile including:

1. Behavioural context — phone usage pattern, session type, environment, 
   one vs two-handed use likely

2. Device and OS reality — what devices they likely use, OS version 
   implications, performance expectations

3. App behaviour patterns — notification tolerance, permission behaviour,
   discovery method, purchase behaviour

4. Psychographic drivers — what success means to them, what they fear 
   about new apps, what signals trust

5. Three to five direct engineering implications of this audience profile

6. The single most important thing I might be wrong about in my 
   audience assumptions — and how to validate it

Be specific to this audience. Avoid generic mobile user descriptions.
```

---

## Target Audience Checklist

- [ ] Primary user described specifically enough to find 10 real people who match
- [ ] Usage context defined — where, when, one or two-handed
- [ ] Session length expectation defined and navigation/UX implications noted
- [ ] Device and OS reality assessed — not assuming latest hardware
- [ ] Notification tolerance assessed — push notification strategy implications noted
- [ ] Permission granting behaviour assessed — permission request strategy implied
- [ ] Discovery method identified — App Store listing and marketing implications noted
- [ ] Purchase behaviour assessed — monetization model implications noted
- [ ] Trust signals identified for this audience
- [ ] Uninstall triggers identified — things to specifically avoid
- [ ] Secondary user (if any) defined without conflating with primary
- [ ] 3–5 engineering implications written down as explicit constraints

---

## What Comes Next

**Personas** — turning your audience profile into named, specific fictional users whose needs, frustrations, and goals make design decisions concrete and debatable.

A persona is not a demographic card. It is a decision-making tool — the person you argue about when choosing between two design directions.
