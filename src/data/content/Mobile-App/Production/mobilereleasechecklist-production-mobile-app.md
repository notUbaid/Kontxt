---
title: Release Checklist
slug: release-checklist
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
filename: release-checklist-production-mobile-app.md
---

Everything in this phase has built toward this moment — but the gap between "ready to submit" and "actually ready" is where avoidable launch-day problems live. This module is a final verification pass, not new material: it pulls together the critical checks from every module in Phase 4 and Phase 5 into one sequence you run immediately before submitting.

## Why a Final Pass Matters

Individually, every piece (signing, store listing, privacy declarations, monitoring) got set up correctly in its own module. The risk at launch isn't usually a single missing piece — it's an interaction between pieces that nobody checked together: a privacy label that doesn't match the final build's actual SDK behavior, a kill switch that was never tested with the flag actually off, a backend that was sized for beta traffic, not launch-day traffic.

> **Best Practice:** Run this checklist against your actual release build — the one going to the store — not against a dev build or an assumption that "it should be the same." Differences between debug and release builds are a common source of last-minute surprises.

## Technical Readiness

- [ ] Release build is signed correctly (Android keystore / iOS distribution certificate verified, not assumed)
- [ ] Build number/version incremented correctly and won't collide with a previous submission
- [ ] Crash reporting is live and confirmed working on the actual release build (trigger a test event, verify it's symbolicated and appears in your dashboard)
- [ ] All feature flags for risky/new features are confirmed working with both states (on and off) tested, not just "on" during development
- [ ] Environment configuration points to production backend, not staging — verify this explicitly, it's an easy copy-paste miss
- [ ] Rate limiting is active on production endpoints, not left in a permissive dev configuration

## Store Listing Completeness

- [ ] App icon, screenshots, and feature graphic (Android) are final, device-accurate, and match current app functionality
- [ ] App name, subtitle/short description, and keywords reflect your finalized ASO strategy
- [ ] Privacy policy URL is live, matches actual data collection (including all third-party SDKs), and matches the in-store Data Safety/Privacy Label declarations exactly
- [ ] Terms of Service is live and linked, especially if the app has subscriptions or user-generated content
- [ ] Content rating questionnaire reflects actual final app content
- [ ] Reviewer notes (iOS especially) include working demo credentials if login is required

> **Warning:** A mismatch between your privacy policy/store declarations and your actual final build's behavior is one of the most common rejection reasons at this stage — and the one most likely to slip through if these were set up early in development and never re-verified against the final build.

## Backend and Infrastructure Readiness

- [ ] Database backups are confirmed running and have been test-restored at least once
- [ ] Infrastructure is sized appropriately for expected launch traffic, not just beta-level traffic — this is genuinely different if you have any marketing push planned around launch
- [ ] Billing alerts are configured on all managed services before real-world traffic hits
- [ ] Push notification infrastructure (APNs/FCM credentials) is configured for production, not just sandbox/development certificates
- [ ] A rollback plan exists if the release introduces a critical issue — staged rollout percentage (covered in Play Store Setup) is the primary lever here

## Monitoring Readiness for Launch Day

- [ ] Alert thresholds are tuned and routed somewhere actively monitored (not an inbox nobody checks) for the first 24-48 hours specifically
- [ ] Someone is assigned to actively watch crash-free rate and error rates immediately post-launch, not just passively available if paged
- [ ] Staged rollout percentage is set conservatively for the first release (e.g., start at 10-20%, not 100%) so a critical issue affects a small fraction before you catch it

## Team Readiness

- [ ] Everyone involved knows the rollback/kill-switch procedure if something goes wrong post-launch
- [ ] Support channels (email, in-app feedback) are monitored and someone is assigned to respond during the launch window
- [ ] App Store/Play Console review status is being actively watched, not just submitted and forgotten — both platforms can request additional information mid-review, and slow responses extend your timeline

## Using AI for a Final Review

```
Review my mobile app release readiness against this checklist.

Paste your actual configuration/status for each:
- Build signing and versioning: [status]
- Privacy policy / store privacy declarations: [status, any known gaps]
- Crash reporting / monitoring setup: [status]
- Backend scaling readiness: [expected launch traffic vs current infra]
- Rollback plan: [describe, or note if none exists]

Identify any gaps, inconsistencies between sections (e.g., privacy policy vs actual SDK behavior),
or risks I haven't accounted for before I submit to the stores.
```

> **Validation:** Use AI to catch inconsistencies and gaps in your own description of readiness, but the actual verification — does the build run correctly, is the privacy policy genuinely accurate, does the rollback procedure actually work — has to be done by physically checking each system, not just describing it.

## Common Launch-Day Mistakes

- Submitting a build pointed at staging infrastructure instead of production
- Privacy/store declarations that were accurate when set up early in development but drifted from the final build's actual behavior
- Releasing to 100% rollout immediately instead of a staged percentage
- No one actively monitoring crash rates or support channels in the first 24-48 hours
- Infrastructure sized for beta-level traffic suddenly under real launch load, especially if there's a coordinated marketing push
- Discovering the rollback procedure has never actually been tested, right when you need it

## Final Pre-Submission Checklist

- [ ] Release build signed, versioned, and verified against production environment config
- [ ] Store listing, privacy policy, and content rating all verified against the actual final build
- [ ] Backend infrastructure confirmed sized for expected launch traffic, with backups and billing alerts active
- [ ] Monitoring and alerting confirmed live and routed to someone who'll actually respond
- [ ] Staged rollout percentage set conservatively, with a tested rollback/kill-switch plan
- [ ] Team roles assigned for launch-window monitoring and support response

This closes out Phase 5. Next: **Phase 6 — Growth**, starting with **Analytics** — understanding how real users actually behave now that the app is live.
