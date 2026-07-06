---
title: Observability
slug: observability
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
filename: observability-production-mobile-app.md
---

You can't attach a debugger to a phone in someone's pocket. When a mobile app breaks in production, your only window into what happened is whatever you instrumented ahead of time. Observability is how you replace "a user emailed support saying it's broken" with "I saw the crash spike, found the cause, and shipped a fix before most users noticed."

## Observability Isn't Just Crash Reporting

Crash reporting tells you the app died. It doesn't tell you the app was technically "up" but unusable — stuck on a loading spinner, silently failing a network call, or rendering a broken state. Production mobile observability covers three distinct layers:

| Layer | Answers | Tooling |
|---|---|---|
| Crash reporting | Did the app crash, and why? | Sentry, Firebase Crashlytics |
| Error tracking | What's failing that *isn't* a crash? | Sentry, Bugsnag |
| Performance monitoring | Is the app slow, where, and for whom? | Sentry Performance, Firebase Performance |

A healthy setup needs all three. A crash-free rate of 99.9% means nothing if half your users are stuck on a silent network error that never crashes but never completes either.

## What to Actually Track

Don't instrument everything — that creates noise that buries real signal. Prioritize:

- **Crashes**, obviously, with full stack traces and device/OS context
- **Unhandled errors** in async code (network failures, parsing errors) — these often don't crash the app but silently break the experience
- **Critical flow completion rates** — did the user actually finish login, checkout, onboarding? A drop here often means a bug, not just bad UX
- **App start time** and **time-to-interactive** — slow starts are a top reason for uninstalls
- **API latency from the client's perspective** — your backend might report fast response times while mobile users on real networks see something much worse

> **Best Practice:** Track the user's actual experience, not just server-side metrics. A request that's "fast" by backend logs can still feel slow to a user on a degraded cellular connection — client-side timing is what matters for UX decisions.

## Crash Reporting Setup

Sentry (or Crashlytics, if you're already in the Firebase ecosystem) should be wired in before your first production release, not added reactively after the first wave of bad reviews.

Essentials for a useful setup:

- [ ] Symbolicated stack traces (upload `dSYM`/`mapping.txt` so crashes show real function names, not memory addresses)
- [ ] Release/version tagging on every event, so you know exactly which build introduced a regression
- [ ] User context attached (without PII — see Privacy below) so you can gauge how many *people*, not just events, are affected
- [ ] Breadcrumbs enabled — the sequence of actions leading to a crash is often more useful than the crash itself

> **Warning:** An unsymbolicated crash report is close to useless — you'll see a memory address instead of a function name and have no idea where to even start. This is the single most common mobile observability mistake: shipping a release without uploading symbol files for that exact build.

## Error Tracking Beyond Crashes

Most production bugs in mobile apps are silent failures, not crashes — a failed API call that gets swallowed, a parsing error that falls back to an empty state, a retry that never succeeds. Wrap these explicitly:

- Catch and report errors at API boundaries, not just let them disappear into a generic catch block
- Tag errors with enough context to reproduce: endpoint, payload shape (not the payload itself if sensitive), user action that triggered it
- Set up alerting thresholds — a single error isn't urgent, a 10x spike in the same error within an hour is

## Performance Monitoring

Three numbers matter most for mobile specifically:

| Metric | Why It Matters |
|---|---|
| Cold start time | Directly affects first impression and abandonment |
| Time-to-interactive on key screens | Slow screens drive users away mid-session |
| Network request duration (client-measured) | Reveals real-world conditions your backend metrics can't see |

Set rough budgets early — e.g., cold start under 2 seconds, key screens interactive under 1 second on a mid-tier device — and treat regressions against that budget as bugs, not acceptable drift.

## Privacy in Observability

Crash and error reports can accidentally become a PII leak if you're not deliberate.

- Never log raw user input, tokens, or payment details into breadcrumbs or error context
- Scrub PII from URLs and request payloads before they're sent to your error tracker (most tools support this via beforeSend hooks)
- Be explicit in your privacy policy that crash/diagnostic data is collected — this is a store review and legal requirement, not optional

## Alerting: Signal Over Noise

An observability setup nobody looks at is wasted effort, and one that pages you for everything trains you to ignore it.

- Alert on crash-free rate dropping below a threshold for a given release, not on individual crashes
- Alert on error rate spikes (percentage-based, not absolute count) so a 10-error spike on a low-traffic day still triggers
- Route alerts to where you'll actually see them quickly — Slack/Discord webhook, not just an email that goes unread

## Using AI Here

```
Help me set up [Sentry / Crashlytics] for this [React Native / Flutter / native] app.

Requirements:
- Symbolication configured for release builds (dSYM / mapping.txt upload in CI)
- Release/version tagging on every event
- Breadcrumbs for navigation and key user actions
- PII scrubbing on error payloads — scrub [list any sensitive fields specific to your app]
- Alert rule for crash-free rate dropping below 99% per release

Also flag anything in my current setup that would leak PII into error reports.
```

> **Validation:** Don't trust an AI-generated observability setup blindly — actually trigger a test crash/error after setup and confirm it appears symbolicated, tagged, and PII-free in your dashboard before relying on it.

## Common Mistakes

- Shipping a release without uploading symbol files, making crash reports unreadable
- Treating crash-free rate as the only health metric and missing silent, non-crashing failures
- Logging PII into breadcrumbs or error context without realizing it
- No release tagging, making it impossible to tell which version introduced a regression
- Alert fatigue from un-tuned thresholds, leading the team to ignore the dashboard entirely
- Adding observability reactively after a bad release instead of before the first one

## Before You Move On

- [ ] Crash reporting is live with symbolicated stack traces for the current release
- [ ] Non-crashing errors at API boundaries are captured, not silently swallowed
- [ ] Release/version tagging is attached to every event
- [ ] PII is scrubbed from all error and crash payloads
- [ ] At least one alert rule exists and routes somewhere the team actually monitors

Next: **Performance Optimization** — using the data this module just gave you visibility into.
