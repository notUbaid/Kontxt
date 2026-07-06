---
title: App Store Setup
slug: app-store-setup
phase: Phase 4
mode: personal
projectType: mobile-app
estimatedTime: 25–35 min
---

# App Store Setup

Apple's submission process is stricter and pricier than Google's — an annual fee instead of one-time, and a review process with well-known, specific rejection reasons. This module covers what to get right the first time.

---

## Decision 1: Apple Developer Program

> [!WARNING]
> The Apple Developer Program costs **$99/year**, recurring — not a one-time fee like Google Play's $25. Budget for this as an ongoing cost of having an app live on iOS, not a one-time setup expense.

Register as an individual account unless you have a specific reason to register as an organization.

---

## Decision 2: App Store Connect Listing

> **Decision Card — What You Need**
- App name, subtitle, description, keywords
- Screenshots for required device sizes (Apple requires specific sizes for different iPhone display classes — check current requirements, as required sizes have changed as new device sizes launched)
- App icon at exactly 1024×1024, no alpha channel/transparency
- A support URL and (as covered next) a privacy policy URL

---

## Decision 3: App Privacy Details — Be Accurate

> [!WARNING]
> Apple's **App Privacy** section (the "nutrition label" shown on your store listing) requires accurate disclosure of what data your app and its third-party SDKs collect — directly tied to the SDK review from Security. Like Google's Data Safety section, **inaccurate** disclosures are a real rejection/removal risk, not just a missing-field issue. Go through your actual SDK list, don't fill this in from memory or a generic template.

---

## Decision 4: Sign in with Apple Reminder

Re-confirm the requirement from Authentication: if your app offers Google or any other third-party social login, **Sign in with Apple must also be offered**. This is one of the more commonly cited App Store rejection reasons for apps with social login — verify it's actually implemented before submitting, not just planned.

---

## Decision 5: Common Rejection Reasons to Check For

| Issue | What to verify |
|---|---|
| Placeholder/test content visible | Remove any "Lorem ipsum," test data, or debug UI before submitting |
| Broken or missing links | Support URL, privacy policy URL — verify they actually load |
| Crashes during review | Test the exact build you're submitting, not an older one |
| Vague permission usage strings | Re-check the specific, feature-tied descriptions from App Permissions Strategy |
| Missing Sign in with Apple | Confirmed above — check explicitly if you offer other social logins |
| Misleading screenshots/metadata | Screenshots should reflect the actual current app, not an outdated or aspirational version |

---

## Decision 6: TestFlight Before Public Release

>  **Best Practice**
> Use **TestFlight** before a public release — internal testing (up to 100 people, no review wait) for your friends/family beta from Testing, and external testing (a larger group, requires a brief Apple review) if you want wider feedback before the full App Store submission. This catches real issues with zero risk to your actual store listing.

---

## Decision 7: Build Process

If using Expo, EAS Build handles producing your iOS build and can submit it via EAS Submit. If using native Xcode tooling directly, you'll archive and upload through Xcode or Transporter. Either way, make sure the build you submit is the one you actually tested — re-verify after any last-minute change, however small.

---

## Decision 8: Review Timeline

Typically 24-48 hours, though it can vary — first-time submissions and apps with sensitive permissions sometimes take longer. Don't plan a launch date assuming the fastest-case timeline.

---

## Common Mistakes

- **Doesn't budget for the recurring $99/year fee** — plan this as an ongoing cost, not a one-time setup expense.
- **App Privacy details that don't match actual SDK behavior** — review against your real SDK list, same discipline as Play Store's Data Safety section.
- **Offers social login without Sign in with Apple** — check this explicitly, it's a well-known, specific rejection reason.
- **Submits with placeholder content or debug UI still visible** — do a final clean pass before submission.
- **Skips TestFlight** and goes straight to public submission — use internal testing first regardless of how confident you feel.

---

## AI Prompt: Prepare Your App Store Submission

```prompt
Help me prepare an App Store Connect submission for a personal mobile app.

App: [one-sentence description]
Auth methods used: [list them — flag explicitly if Sign in with Apple is required given any other social login in use]
Third-party SDKs in use: [list them]

Generate:
1. App name, subtitle, and description drafts within Apple's current character limits
2. An App Privacy details draft: for each SDK listed above, the data category it typically collects, so I can verify and adjust based on my actual implementation
3. A pre-submission checklist covering: privacy policy URL, support URL, Sign in with Apple (if required), current required screenshot sizes, and removal of any placeholder/test content

Confirm explicitly whether Sign in with Apple is required for my auth setup, and recommend I test via TestFlight before public submission.
```

---

## Validate Before You Move On

- [ ] App Privacy details accurately reflect every SDK actually used
- [ ] Sign in with Apple is implemented if any other social login is offered
- [ ] Privacy policy and support URLs are live and load correctly
- [ ] No placeholder/test content or debug UI remains in the submitted build
- [ ] Permission usage strings are specific and feature-tied, re-verified from App Permissions Strategy
- [ ] The app has been tested via TestFlight before public submission
- [ ] You've budgeted for the $99/year recurring developer fee

> [!TIP]
> Do one final full run-through of the exact build you're about to submit — not an earlier build, not "the same code, basically" — review rejections for crashes are often traceable to testing a slightly different build than what was actually uploaded.

---

**Next:** Privacy Policy — create the policy both stores require before you can publish.
