---
title: Play Store Setup
slug: play-store-setup
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
filename: play-store-setup-production-mobile-app.md
---

Google Play's review process is more forgiving than Apple's in some ways and stricter in others — automated policy scanning catches violations Apple's human reviewers might let slide on a first pass, while approval itself is often faster. Getting your Play Console setup right the first time avoids the slow back-and-forth of policy rejections eating into your launch timeline.

## Play Console Account Setup

- A Google Play Developer account costs a one-time $25 fee — far cheaper than Apple's recurring $99/year, but don't let the low barrier make you sloppy about account security
- Use a dedicated organizational Google account for this, not a personal one — account recovery and team access become painful if it's tied to one person's personal login
- Enable 2-step verification on the account immediately; a compromised developer account can be used to push malicious updates to your entire user base

> **Warning:** Google has been tightening identity verification requirements for new developer accounts, including phone verification and sometimes a D-U-N-S number for organizations. Start this process early — verification delays are a common, avoidable launch blocker.

## App Identity Essentials

| Field | Notes |
|---|---|
| Package name | Reverse domain format (`com.yourcompany.appname`) — **cannot be changed after first publish**, choose carefully |
| App name | Max 30 characters, shown on the store listing and home screen |
| Default language | Affects fallback behavior for unsupported locales |
| App or game category | Affects discoverability — choose the closest accurate match, not the most flattering one |

> **Best Practice:** Treat your package name as permanent the moment you publish, because it effectively is. Triple-check it against your actual bundle identifier in the app build config before your first release, not after.

## Required Store Listing Assets

- [ ] App icon (512×512px, 32-bit PNG with alpha)
- [ ] Feature graphic (1024×500px) — shown prominently in store search and category browsing
- [ ] Screenshots — minimum 2, recommended 4–8, per supported device type (phone, tablet if applicable)
- [ ] Short description (80 characters) — this is what shows before "read more," make it count
- [ ] Full description (4000 characters max)
- [ ] Privacy policy URL — **mandatory**, your listing won't go live without one

This module covers the technical setup; full Screenshots and Feature Graphics design guidance is its own module next in this phase.

## Data Safety Section

This is the part teams most often underestimate. Google requires a detailed declaration of what data your app collects, why, and how it's used — and it's cross-checked against your app's actual runtime behavior, including third-party SDKs you've bundled.

- [ ] List every data type collected (location, contacts, personal info, financial info, etc.) — including data collected by SDKs (analytics, ads, crash reporting), not just your own code
- [ ] Specify the purpose for each data type (app functionality, analytics, advertising, etc.)
- [ ] Declare whether data is shared with third parties and whether it's encrypted in transit
- [ ] Match this declaration to your actual privacy policy — mismatches between the two are a common rejection reason

> **Validation:** Audit every third-party SDK in your app (analytics, crash reporting, ad networks, payment providers) for what data it actually collects before filling this out. Most rejections in this section come from teams declaring only their own first-party data collection and missing what bundled SDKs collect on their behalf.

## Content Rating Questionnaire

Completed through IARC (International Age Rating Coalition) inside Play Console. Answer accurately — misrepresenting content to get a lower age rating is a policy violation that can get your app removed, not just re-rated.

## App Signing

- Google Play App Signing is the modern standard: Google manages your app's final signing key, you keep an upload key to sign builds you submit
- This protects you if your local upload key is ever compromised — Google can help you rotate it, which isn't possible if you're self-managing the final signing key entirely
- Enable this during initial setup; migrating an existing app to Google Play App Signing later is possible but more involved

## Release Tracks

Use Play Console's testing tracks before going to full production — this is the same gradual-rollout principle from the Feature Flags module, applied to your binary itself.

| Track | Purpose |
|---|---|
| Internal testing | Your team, instant availability, no review wait |
| Closed testing | Invited testers, limited review |
| Open testing | Public beta, anyone can opt in |
| Production | Full release, staged rollout percentage available |

Even at launch, use production's staged rollout feature (e.g., 10% → 50% → 100%) rather than pushing to 100% of users immediately — it gives you a chance to catch a bad release before it reaches everyone, mirroring the percentage-rollout pattern from feature flags but applied to the binary itself.

## Common Rejection Reasons

- Missing or inaccurate Data Safety section, especially around bundled SDK data collection
- Broken core functionality discovered during Google's automated and manual review
- Permissions requested without clear, justified in-app usage (tie back to the App Permissions Strategy module)
- Misleading metadata — screenshots or descriptions that don't reflect actual app functionality
- Policy violations around ads, in particular intrusive or misleading ad placements

## Using AI Here

```
Help me prepare the Play Console Data Safety section for this app.

App functionality: [brief description]
Third-party SDKs used: [list — analytics, crash reporting, ads, payments, etc.]
Data my own code collects: [list]

For each SDK, identify what data it likely collects based on its standard behavior,
and help me draft accurate Data Safety declarations that match what my privacy policy needs to cover.
Flag anything I should verify directly in the SDK's own documentation rather than assume.
```

> **Validation:** AI can help you think through what a given SDK *typically* collects, but verify against that SDK's actual current documentation before submitting — SDK data collection behavior changes between versions, and an inaccurate declaration is a policy violation, not just a rejection.

## Before You Move On

- [ ] Package name is finalized and matches your build config exactly
- [ ] Data Safety section accounts for all first-party and third-party (SDK) data collection
- [ ] Privacy policy URL is live and matches the Data Safety declaration
- [ ] Google Play App Signing is enabled
- [ ] Internal testing track is set up and used before any public release track

Next: **App Store Setup** — the same groundwork, with Apple's distinct requirements and review process.
