---
title: Analytics
slug: analytics
phase: Phase 5
mode: personal
projectType: mobile-app
estimatedTime: 15–25 min
---

# Analytics

Analytics for a personal project should answer one question well: are people actually using the thing you built, and where do they get stuck? It shouldn't become a second project of its own. This module is about tracking the minimum that's genuinely useful — and not forgetting the bug-reporting half of this equation, which matters more for a solo dev than product analytics does.

---

## Decision 1: Tool Choice

| Option | Best for |
|---|---|
| PostHog | Generous free tier, privacy-conscious options, good default for personal projects |
| Firebase Analytics | If you're already using Firebase — no extra integration needed |
| Mixpanel (free tier) | Solid free tier, good event-based analytics if you want more advanced funnels later |

> [!TIP]
> If you're already using Firebase as your BaaS, Firebase Analytics is the path of least resistance — no new SDK, no new dashboard to learn. Don't add a second analytics tool unless the first genuinely doesn't fit your needs.

---

## Decision 2: Track a Short List, Not Everything

> [!WARNING]
> Instrumenting every tap and screen view feels thorough but mostly adds noise, development time, and a growing list of things you have to keep your privacy disclosures (App Privacy / Data Safety) in sync with. Pick a **short list of key events** that actually answer "is this app working for people":

> **Decision Card — Minimum Useful Events**
- Signup/account creation completed
- The single core action your app exists for (e.g., "task created," "entry logged") — completed
- App opened (basic retention signal — are people coming back?)
- Any specific drop-off point you suspect is a problem, once you have a hypothesis to test

---

## Decision 3: Crash Reporting — More Valuable Than Product Analytics, Solo

>  **Best Practice**
> Set up crash reporting (Sentry, Firebase Crashlytics) before — or alongside — product analytics. As a solo developer without a support team monitoring reviews constantly, crash reporting is how you find out something is actually broken in the field, often before a user bothers leaving a review about it. This is arguably higher-value than usage analytics for a personal project.

---

## Decision 4: Keep It Privacy-Respecting and Disclosed

> [!WARNING]
> Every analytics event and property you track needs to be reflected accurately in your Privacy Policy and store privacy disclosures (Data Safety / App Privacy) — this isn't a one-time task from Phase 4, it's ongoing. If you add a new tracked event or property after launch, update those disclosures too. Avoid collecting more than you need — track the event, not unnecessary personal details alongside it.

---

## Decision 5: Avoid Vanity Metrics

> [!TIP]
> Download/install count feels exciting but tells you almost nothing about whether the app is actually useful. Pay more attention to **retention** (do people come back after day 1, day 7?) and **activation** (do new users actually reach your core action, or drop off before it?) — these are the signals that tell you whether to keep building or to rethink something.

---

## Common Mistakes (Including AI's)

- **Instruments dozens of events** by default — push back and ask for the short, deliberate list instead.
- **Skips crash reporting entirely** in favor of product analytics — set up crash reporting first; it's the more urgent signal for a solo developer.
- **Adds new tracked events without updating privacy disclosures** — treat this as part of the same change, not a separate forgotten task.
- **Focuses on download counts** as the primary success metric instead of retention/activation signals.

---

## AI Prompt: Set Up Minimal, Useful Analytics

```
Set up analytics and crash reporting for a personal mobile app using [your stack].

Requirements:
- Crash reporting via [Sentry / Firebase Crashlytics] — set this up first
- Product analytics via [PostHog / Firebase Analytics / Mixpanel] tracking only these events: signup completed, [your core action] completed, app opened
- Don't add additional events beyond this list unless I specify a particular drop-off point I want to investigate
- List exactly what data each event captures, so I can cross-check it against my existing Privacy Policy and store privacy disclosures

Flag if any event captures more personal data than necessary for what it's meant to measure.
```

---

## Validate Before You Move On

- [ ] Crash reporting is set up and you've verified it actually captures a test crash
- [ ] Product analytics tracks a short, deliberate list of events — not everything
- [ ] Every tracked event/property matches what's disclosed in your Privacy Policy and store privacy sections
- [ ] You're paying attention to retention/activation, not just download counts
- [ ] You have a specific question in mind for any analytics event you add — not tracking "just in case"

> [!TIP]
> Revisit your event list every few weeks early on. It's normal to realize an event you added isn't actually answering a question you care about — remove it rather than letting unused tracking accumulate.

---

**Next:** Feedback — build a lightweight way to hear from real users directly.
