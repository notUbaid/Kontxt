---
title: Play Store Setup
slug: play-store-setup
phase: Phase 4
mode: personal
projectType: mobile-app
estimatedTime: 25–35 min
---

# Play Store Setup

This module is mostly a checklist — Google Play's submission process has several specific, easy-to-get-wrong requirements. Getting them right the first time avoids review delays, which matter when you're excited to ship.

---

## Decision 1: Developer Account

A Google Play developer account costs a one-time $25 registration fee. For a personal project, register as an individual account unless you have a specific reason to register as an organization.

---

## Decision 2: Store Listing Requirements

> **Decision Card — What You Need**
- App title and short description (concise, keyword-relevant — this affects search visibility)
- Full description
- Screenshots for required device sizes (phone at minimum; tablet if you support it)
- A feature graphic (1024×500) and app icon meeting Google's exact size specifications
- A content rating, completed via Google's rating questionnaire

> [!TIP]
> Take your screenshots from your actual built app on a real device or accurate emulator, not mockups that don't reflect the real UI — Google reviews for this, and more importantly, mismatched screenshots set the wrong expectation for real users.

---

## Decision 3: Data Safety Section — Be Accurate

> [!WARNING]
> The **Data Safety section** requires you to accurately disclose what data your app collects and why — this directly depends on the third-party SDK review you did in Security. Google has suspended or rejected apps for **inaccurate** Data Safety disclosures, not just missing ones. Go through every SDK in your app (analytics, crash reporting, ad networks, your BaaS) and disclose what each one actually collects — don't guess or copy a generic template that doesn't match your app.

---

## Decision 4: Target API Level

> [!WARNING]
> Google enforces a **minimum target SDK (API level) requirement** that updates periodically — apps targeting an outdated API level are rejected. Check Google Play's current requirement before submitting (this changes over time, so verify the current number rather than relying on a remembered value) and confirm your build configuration meets it.

---

## Decision 5: App Signing

>  **Best Practice**
> Use **Play App Signing**, where Google manages your app's signing key, rather than managing the signing key yourself. This is Google's recommended default for new apps and protects you from a real, unrecoverable problem: losing your own signing key, which would make it impossible to publish updates to the same app listing ever again.

---

## Decision 6: Testing Tracks Before Production

> **Decision Card — Rollout Order**
> 1. **Internal testing track** — a small group (your friends/family beta from Testing) installs via a direct link, no review wait
> 2. **Closed/open testing track** (optional) — wider testing if you want more feedback before full release
> 3. **Production**, ideally with a **staged rollout** (e.g., starting at 10-20% of users) rather than 100% immediately — this limits exposure if a bug slips through, and you can halt the rollout before it reaches everyone

Don't submit directly to 100% production as your first release step — the staged options exist specifically to catch problems cheaply.

---

## Decision 7: Privacy Policy URL Is Required

A live, hosted Privacy Policy URL is a hard requirement for submission — not optional, even for a simple personal app. This is covered in the Privacy Policy module; flag it as a dependency now if you haven't completed it yet, since you can't submit without it.

---

## Decision 8: Review Timeline

Review can take anywhere from a few hours to a few days — new developer accounts and apps requesting sensitive permissions sometimes see longer review times. Don't plan a hard launch date assuming instant approval.

---

## Common Mistakes

- **Data Safety disclosures that don't match actual SDK behavior** — go through your SDK list deliberately, don't copy a generic template.
- **Missing privacy policy URL** — submission is blocked without it; have it ready before you start the submission flow.
- **Screenshots not meeting required dimensions** for each device type you're submitting for.
- **Outdated target SDK/API level** — verify the current requirement, don't assume last year's number still applies.
- **Skipping testing tracks and going straight to 100% production** — use internal testing and staged rollout instead.

---

## AI Prompt: Prepare Your Play Store Submission

```prompt
Help me prepare a Google Play Store submission for a personal mobile app.

App: [one-sentence description]
Third-party SDKs in use: [list them, e.g., Expo, Supabase, [analytics tool]]

Generate:
1. A concise app title and short description (under the character limits Google currently requires — note the limits)
2. A Data Safety section draft: for each SDK listed above, what data category it typically collects and why, so I can verify and adjust based on my actual implementation
3. A pre-submission checklist covering: privacy policy URL, current minimum target API level requirement, screenshot dimensions needed, and Play App Signing setup

Confirm explicitly that I should use Play App Signing rather than managing my own signing key, and that I should release via internal testing before any production rollout.
```

---

## Validate Before You Move On

- [ ] Data Safety disclosures accurately reflect every SDK actually used in the app
- [ ] A live privacy policy URL is ready and accessible
- [ ] Target API level meets Google's current minimum requirement
- [ ] Screenshots match required dimensions and reflect the actual app, not mockups
- [ ] Play App Signing is set up, not manual key management
- [ ] You've released to internal testing first, with a plan for staged rollout to production

> [!TIP]
> Submit to internal testing as early as possible, even before the app feels "done" — it has no review wait and lets you confirm your build, signing, and listing setup work correctly well before you're racing a launch date.

---

**Next:** App Store Setup — prepare the equivalent submission for iOS.
