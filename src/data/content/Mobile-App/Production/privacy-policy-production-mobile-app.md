---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 20–25 min
filename: privacy-policy-production-mobile-app.md
---

A privacy policy isn't boilerplate legal text you generate once and forget — it's a binding declaration of what your app actually does with user data, cross-checked by both stores against your app's real behavior. Get it wrong and you risk listing rejection now and legal exposure later, not just an awkward document.

## This Is Not Optional, and It's Not Generic

Both Play Console's Data Safety section and App Store Connect's Privacy Nutrition Labels (covered in earlier modules in this phase) must match your actual privacy policy. A mismatch between what you declared in-store and what your policy says — or worse, what your app actually does — is a common rejection and removal trigger.

> **Best Practice:** Write your privacy policy after you've fully mapped your data collection (including every third-party SDK), not before. A policy written early in development, before you know your final SDK stack, is almost always inaccurate by launch.

## What a Mobile App Privacy Policy Must Cover

- [ ] What personal data is collected (account info, usage data, device identifiers, location, etc.)
- [ ] What data is collected by third-party SDKs embedded in your app (analytics, crash reporting, ads, payments) — this is the most commonly missed section
- [ ] Why each data type is collected (purpose limitation — vague "to improve our services" language is increasingly scrutinized)
- [ ] How long data is retained
- [ ] Whether and with whom data is shared (third parties, processors, ad networks)
- [ ] How users can access, correct, or delete their data
- [ ] Children's privacy — explicit statement on whether the app is directed at or knowingly collects data from children under 13 (COPPA in the US) or applicable age thresholds elsewhere
- [ ] Contact information for privacy-related inquiries
- [ ] Jurisdiction-specific disclosures if you have users in regulated regions (see below)

## Audit Every Third-Party SDK Before Writing This

This is the step teams skip and regret. Each SDK you've integrated — analytics, crash reporting, push notifications, ads, payments, social login — collects its own data, often more than teams realize when they only think about their own first-party code.

| SDK Type | Typically Collects |
|---|---|
| Analytics (PostHog, Firebase Analytics) | Usage events, device info, sometimes IP-derived location |
| Crash reporting (Sentry, Crashlytics) | Device info, stack traces, sometimes user identifiers if configured |
| Ad networks | Device identifiers, often used for cross-app tracking |
| Push notifications (FCM, APNs) | Device tokens |
| Payment processors | Transaction data, sometimes billing details (rarely card numbers directly, if PCI-compliant tokenization is used) |

> **Warning:** "I didn't know that SDK collected that" is not a defense to regulators or to app store review — you're responsible for declaring everything bundled in your app, regardless of whether you directly use the data it collects.

## Regional Regulatory Considerations

Different jurisdictions impose different requirements. You don't need to be a lawyer, but you need to know which regimes apply to your actual user base:

| Regulation | Applies If | Key Requirement |
|---|---|---|
| GDPR (EU/UK) | Any EU/UK users, regardless of where you're based | Explicit consent for non-essential data collection, right to deletion, data portability |
| CCPA/CPRA (California) | California users above revenue/data thresholds | Right to opt out of data sale/sharing, disclosure requirements |
| COPPA (US) | App directed at or knowingly used by children under 13 | Parental consent requirements, restricted data collection |
| PIPEDA (Canada) | Canadian users | Consent and accountability principles |

> **Tip:** If you have or expect a global user base, default to GDPR-level practices (explicit consent, clear deletion rights) even for users outside the EU — it's simpler to maintain one high standard than to fork behavior by region, and it covers most other regimes' requirements as a side effect.

## Generating a Compliant Policy

You don't need a lawyer to produce a reasonable first draft, but you do need accuracy over generic boilerplate.

- Privacy policy generators (Termly, iubenda, GetTerms) produce a structured starting point based on a questionnaire about your actual data practices
- These are a starting point, not a finished legal document — review the output against your actual SDK audit, don't accept generic boilerplate that doesn't reflect your app's real behavior
- For apps handling sensitive categories (health, financial, children's data) or with significant user volume, actual legal review is worth the cost — the risk profile is meaningfully different from a typical utility app

## Hosting and Linking

- Must be hosted at a publicly accessible URL (not a PDF buried in app assets) — both stores require a live link in your store listing
- Include an in-app link to the same policy, typically in settings or onboarding
- Version and date your policy, and notify users of material changes — silently changing data practices without disclosure undermines the consent you originally obtained

## Using AI Here

```
Help me draft a privacy policy for this mobile app.

App function: [one sentence]
Data collected directly by the app: [list]
Third-party SDKs and what they collect: [list from your SDK audit]
Target markets: [US / EU / global / etc.]
Does the app target or allow children under 13: [yes/no]

Draft a clear, accurate privacy policy covering data collected, purpose, retention,
sharing, user rights, and children's privacy. Flag any section where I should get
actual legal review rather than rely on this draft as final.
```

> **Validation:** Never publish an AI-drafted privacy policy without reviewing it against your actual, current SDK audit — and for anything handling sensitive data categories or significant scale, treat AI output as a first draft for legal review, not a final compliant document.

## Common Mistakes

- Writing the policy before auditing third-party SDK data collection, producing an inaccurate document
- Generic "we may collect information to improve our services" language that doesn't actually disclose what's collected
- Mismatch between the privacy policy and the in-store Data Safety/Privacy Label declarations
- No children's privacy section, even when the app could plausibly be used by minors
- Hosting the policy somewhere inaccessible (broken link, PDF requiring download) instead of a stable public URL
- Never updating the policy as new SDKs or data practices are added later

## Before You Move On

- [ ] Privacy policy reflects an actual audit of all first-party and third-party (SDK) data collection
- [ ] Policy matches exactly what's declared in Play Console Data Safety and App Store Connect Privacy Labels
- [ ] Children's privacy status is explicitly addressed
- [ ] Policy is hosted at a stable, publicly accessible URL and linked both in-app and in store listings
- [ ] Sensitive-data or high-scale apps have had the draft reviewed by an actual lawyer, not just AI-generated

Next: **Terms of Service** — the agreement governing how users can use the app, alongside what you've just established about their data.
