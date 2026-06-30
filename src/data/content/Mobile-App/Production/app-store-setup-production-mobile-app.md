---
title: App Store Setup
slug: app-store-setup
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
filename: app-store-setup-production-mobile-app.md
---

Apple's review process is stricter and slower than Google's, with human reviewers who test actual app behavior — not just automated policy scanning. A rejection here costs you a multi-day resubmission cycle, so getting App Store Connect set up correctly the first time matters more than it does on Android.

## Apple Developer Account Setup

- The Apple Developer Program costs $99/year (recurring, unlike Google's one-time fee) — budget for renewal, not just initial signup
- For an organization, you'll need a D-U-N-S number, which can take 1–2 weeks to obtain if you don't already have one — start this well before you plan to submit
- Enable two-factor authentication immediately; a compromised account can push malicious updates or get your app removed entirely
- Decide account structure upfront: Individual accounts can't easily transfer apps to a company later, so register as an Organization from the start if there's any chance of needing that flexibility

> **Warning:** The D-U-N-S number requirement is the most common avoidable launch delay for organizations. Apply as soon as you know you're building a production app, not when you're ready to submit.

## App Identity Essentials

| Field | Notes |
|---|---|
| Bundle ID | Reverse domain format (`com.yourcompany.appname`) — must match your Xcode project exactly, **cannot be changed after first submission** |
| App name | Max 30 characters, must be unique across the entire App Store |
| Primary category / secondary category | Affects discoverability and which charts you can appear in |
| SKU | Internal identifier, not shown publicly — any unique string works |

> **Best Practice:** Search the exact app name you want before committing to it — App Store name uniqueness is enforced, and discovering a conflict after building marketing assets around a name is an avoidable waste of time.

## Required Store Listing Assets

- [ ] App icon (1024×1024px, no alpha channel, no rounded corners — Apple applies the mask)
- [ ] Screenshots for each supported device size (at minimum, 6.7" and 6.5" iPhone; iPad if universal)
- [ ] App preview video (optional but increases conversion meaningfully)
- [ ] Subtitle (30 characters) — appears under the app name in search results
- [ ] Promotional text (170 characters, editable without a new build — useful for timely messaging)
- [ ] Description (4000 characters)
- [ ] Keywords (100 characters, comma-separated, not visible to users but drives search)
- [ ] Privacy policy URL — **mandatory**

Full visual asset design guidance is covered in the upcoming App Icons and Screenshots modules in this phase.

## App Privacy Details (Nutrition Labels)

Apple's equivalent of Google's Data Safety section, completed in App Store Connect. This gets cross-referenced against actual app behavior during review more rigorously than most teams expect.

- [ ] Declare every data type collected — including by third-party SDKs (analytics, crash reporting, ads), not just first-party code
- [ ] Specify whether each data type is linked to user identity or anonymous
- [ ] Specify whether data is used for tracking (this also determines whether you need an App Tracking Transparency prompt)
- [ ] Match declarations exactly to actual SDK behavior — audit each bundled SDK's current data collection documentation, since this changes between SDK versions

> **Validation:** Inaccurate privacy labels are one of Apple's most common rejection and removal reasons, and they're checked against actual runtime network behavior, not just your stated answers. If your app calls an analytics SDK that collects device identifiers, that needs to be declared even if you never directly touch that data yourself.

## App Tracking Transparency (ATT)

If your app tracks users across other companies' apps/websites for advertising purposes (common with ad SDKs), you must show Apple's ATT permission prompt before doing so.

- Most apps using third-party ad networks or cross-app analytics need this — check each SDK's documentation specifically, don't assume
- Design your tracking-dependent features to degrade gracefully when permission is denied; a large share of users decline this prompt
- This prompt has specific required wording and cannot be bypassed by asking again outside Apple's system dialog

## TestFlight Before Production

Apple's beta testing system, and the standard path to catching review-blocking issues before a real submission.

| Tier | Capacity | Review Required |
|---|---|---|
| Internal testers | Up to 100, must be on your team | No |
| External testers | Up to 10,000 | Yes, lightweight beta review |

Run at least one external TestFlight round before your first production submission — Apple's actual review reviewers sometimes flag issues that internal testing on familiar devices misses, like edge cases on older hardware or specific iOS versions.

## App Review Guidelines: Common Rejection Triggers

- Crashes or broken core functionality during review — Apple's reviewers actually use the app, not just scan metadata
- Placeholder content, "Lorem ipsum" text, or obviously unfinished features
- Login-gated apps with no reviewer demo account provided — always include working test credentials in your submission notes
- Misleading screenshots that don't reflect actual functionality
- Apps that exist primarily as a thin wrapper around a website with no native value (Apple actively rejects these)
- Missing or inaccurate privacy nutrition labels

> **Tip:** Always include reviewer notes with a working demo account and a one-paragraph explanation of any non-obvious functionality (e.g., "this feature requires location permission to demonstrate — please grant when prompted"). A reviewer who can't get past your login screen will reject on that basis alone.

## Using AI Here

```
Help me prepare App Store privacy nutrition labels for this app.

App functionality: [brief description]
Third-party SDKs used: [list — analytics, crash reporting, ads, payments, etc.]
Data my own code collects: [list]
Does the app use any third-party tracking/advertising SDKs: [yes/no, which ones]

For each SDK, identify what data it likely collects and whether it constitutes "tracking"
under Apple's definition, requiring an ATT prompt. Flag anything I should verify directly
in that SDK's current documentation rather than assume.
```

> **Validation:** Treat AI's SDK data-collection guesses as a starting point, not a final answer — verify against each SDK's actual current documentation, since both SDK behavior and Apple's policy interpretations change over time.

## Before You Move On

- [ ] Bundle ID is finalized and matches the Xcode project exactly
- [ ] D-U-N-S number obtained (if registering as an Organization) with enough lead time
- [ ] App Privacy nutrition labels account for all first-party and third-party (SDK) data collection
- [ ] ATT prompt implemented if any SDK performs cross-app tracking
- [ ] At least one external TestFlight round completed with real testers before first submission
- [ ] Reviewer notes include working demo credentials if the app requires login

Next: **App Icons** — the first visual impression across both stores.
