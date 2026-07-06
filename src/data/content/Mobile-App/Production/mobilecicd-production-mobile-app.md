---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
filename: ci-cd-production-mobile-app.md
---

Mobile builds are slower, more fragile, and more environment-dependent than web builds — code signing, provisioning profiles, native dependencies, and two separate store pipelines all add failure points that don't exist for a web app. A solid CI/CD setup is what turns "building and releasing is a stressful manual ritual one person knows how to do" into "merge to main, and a release candidate appears automatically."

## What CI/CD Actually Buys You on Mobile

- Every PR is automatically tested before merge — catching the regressions your manual smoke-test pass misses
- Builds are reproducible — not "works on my machine because of a local certificate only I have"
- Release builds are signed and shipped the same way every time, removing the most error-prone manual step
- A new team member (or future you) can ship a release without remembering a multi-step local checklist

> **Best Practice:** If producing a release build requires a specific person's laptop, you don't have a release pipeline — you have a single point of failure.

## The Mobile CI/CD Pipeline Shape

```
Push/PR → Lint + Unit Tests → Integration Tests →
Build (debug) → [on merge to main] → Build (release, signed) →
Upload to TestFlight/Internal Track → [manual or automatic] → Store Submission
```

Most teams don't auto-submit to the stores on every merge — store review adds friction and you want a deliberate release decision. The common pattern is: fully automate up through "signed build available to internal testers," then trigger store submission manually or on a tag/release branch.

## Platform Comparison

| Tool | Best For | Native Mobile Support |
|---|---|---|
| GitHub Actions | Teams already on GitHub, full control | Good, but you assemble signing/build steps yourself |
| Fastlane | Code signing, store submission automation | Excellent — purpose-built for mobile release pipelines |
| Codemagic | RN/Flutter-first teams wanting less setup | Strong, mobile-native out of the box |
| Bitrise | Teams wanting a visual pipeline builder | Strong, mobile-native out of the box |

A common, solid combination: **GitHub Actions for orchestration + Fastlane for the mobile-specific heavy lifting** (signing, screenshots, store upload). GitHub Actions alone can technically do everything, but you'll end up reimplementing what Fastlane already does well.

## Code Signing: The Part That Breaks Pipelines

This is the single biggest source of CI pain that doesn't exist in web deployment.

- **iOS** needs a distribution certificate + provisioning profile, both of which expire and must be renewed
- **Android** needs a signing keystore — if you lose this, you cannot update your app under the same package name, ever
- Store all signing credentials in your CI provider's encrypted secrets, never committed to the repo
- Use `fastlane match` (or equivalent) to manage and sync certificates across machines and CI without manual cert juggling

> **Warning:** Losing your Android signing keystore is unrecoverable — you'd have to publish as a new app and lose all existing reviews, install history, and ASO ranking. Back it up in at least two secure locations (password manager + encrypted cloud storage), not just on one developer's machine.

## What Every PR Should Trigger

- [ ] Lint and type checks
- [ ] Unit and integration test suite (from the Testing module — this is where it gets enforced, not just run locally)
- [ ] A debug build, to catch build-breaking errors before merge
- [ ] Bundle size check, if you're tracking it — a sudden jump often signals an accidentally bundled dependency

Keep PR-triggered checks fast (under ~10 minutes). If your full suite is slower, split into a fast required check and a slower nightly/scheduled run — a CI pipeline developers route around because it's too slow stops protecting anything.

## What Merge to Main Should Trigger

- Full test suite, including any slower integration/E2E tests skipped on PRs
- A signed release build
- Automatic upload to TestFlight (iOS) and an internal/closed testing track (Android)
- Changelog/release notes generation if you're versioning systematically

## Environment & Secrets Management

Mobile apps typically need different API endpoints, keys, and feature flags per environment (dev/staging/production) baked in at build time, not runtime — unlike a web app where the server controls this.

| Environment | Purpose | Common Setup |
|---|---|---|
| Development | Local testing | `.env.development`, debug build config |
| Staging | Pre-release QA | Separate bundle ID/app ID so it can be installed alongside production |
| Production | Store release | Locked-down secrets, release build config |

Use separate bundle IDs (e.g., `com.app.staging` vs `com.app`) for staging vs. production builds so testers can have both installed simultaneously without conflict.

## Versioning Strategy

Mobile has two version concepts that often get confused:

- **Version name** (e.g., `2.4.1`) — what users see, follows semver
- **Build number** (e.g., `147`) — must strictly increment for every store submission, invisible to users

Automate build number increments in CI — manually bumping this is a common source of failed store uploads ("build number already used").

## Using AI to Set This Up

```
Help me set up a CI/CD pipeline for this [React Native / Flutter / native] app.

Requirements:
- GitHub Actions for orchestration, Fastlane for signing/build/upload
- PR checks: lint, unit tests, integration tests, debug build
- Merge to main: full test suite, signed release build, upload to TestFlight + Android internal track
- Separate staging and production environment configs with separate bundle IDs
- Automated build number increment

Explain where I'll need to manually add signing credentials/secrets and why those can't be automated away.
```

> **Validation:** Never let AI generate a workflow that echoes secrets into logs or writes signing credentials into the repo, even temporarily. Review any generated YAML for `echo $SECRET`-style debugging steps before merging — these are an easy way to accidentally leak credentials in build logs.

## Common Mistakes

- Manual release builds from one developer's machine, with no documented or automated process
- Signing certificates and keystores stored only locally, with no backup — catastrophic if lost
- CI pipeline too slow to be useful, so the team starts merging without waiting for it
- No separation between staging and production builds, leading to test data or wrong API endpoints in store builds
- Forgetting to increment build numbers, causing failed store uploads
- Secrets committed to the repo or echoed into CI logs

## Before You Move On

- [ ] A merge to main produces a signed build automatically, with no manual steps
- [ ] Signing certificates/keystores are backed up securely outside of any single developer's machine
- [ ] PR checks run lint, tests, and a build, and are fast enough that the team doesn't route around them
- [ ] Staging and production use separate bundle IDs and environment configs
- [ ] Build numbers increment automatically, not manually

Next: **Infrastructure** — the backend systems your CI/CD pipeline deploys to and your app depends on at runtime.
