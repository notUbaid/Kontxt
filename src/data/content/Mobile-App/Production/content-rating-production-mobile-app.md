---
title: Content Rating
slug: content-rating
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 10–15 min
filename: content-rating-production-mobile-app.md
---

Content rating determines who your app is shown to, what advertising can run against it, and whether it's discoverable at all in certain markets or for certain age groups. It's a short questionnaire process on both platforms, but answering it inaccurately — even unintentionally — is a policy violation, not just a re-ratable mistake.

## Why This Isn't Just a Formality

- Misrepresenting content to obtain a lower (more permissive) age rating is treated by both stores as a policy violation that can result in app removal, not just a corrected rating
- Rating affects ad serving — apps rated for children have stricter restrictions on what ad networks and tracking can run, which has real monetization implications if you're ad-supported
- Some enterprise/education device management systems filter by content rating, affecting your discoverability in those contexts entirely

> **Best Practice:** Answer the questionnaire based on what your app actually contains and could plausibly contain in future content (especially relevant for apps with user-generated content), not based on what rating you'd prefer to receive.

## iOS: App Store Age Ratings

Apple uses a self-reported questionnaire in App Store Connect covering content categories, mapped to age ratings (4+, 9+, 12+, 17+).

| Category Assessed | Examples |
|---|---|
| Violence | Cartoon, fantasy, realistic |
| Sexual content/nudity | Suggestive themes, graphic content |
| Profanity/crude humor | Mild to frequent |
| Substance references | Alcohol, drugs, tobacco |
| Gambling | Simulated or real-money |
| Horror/fear themes | Mild to intense |
| User-generated content | Unmoderated chat, unrestricted content sharing |
| Unrestricted web access | In-app browser with no content filtering |

> **Warning:** Apps with unmoderated user-generated content or unrestricted in-app web browsing are pushed toward higher age ratings by default, regardless of your core app content — if you have UGC, your moderation policy (covered in the Terms of Service module) directly affects what rating you can accurately claim.

## Android: IARC Rating

Google Play uses the International Age Rating Coalition (IARC) system — a single questionnaire that generates ratings appropriate for multiple regional systems simultaneously (ESRB-style in the US, PEGI in Europe, and others), so you complete it once rather than per-region.

Covers similar categories to Apple's system: violence, sexual content, language, controlled substances, gambling, and data collection/sharing practices (which overlaps with your Data Safety declaration from the Play Store Setup module).

## Answering the Questionnaire Accurately

- [ ] Audit actual app content, not just your intended design — if there's any chance of edge-case content (user uploads, in-app browser, embedded ads with mature content), account for it
- [ ] If your app has user-generated content, rate based on the most permissive realistic content your moderation allows, not the best-case scenario
- [ ] If you display third-party ads, check what content categories your ad network can serve — ad content factors into the realistic content profile even if you don't directly control it
- [ ] Re-run the questionnaire if app content changes meaningfully in a future update (new UGC features, embedded browser, etc.) — this isn't a one-time setup

## Apps Directed at Children

If your app is designed for or primarily used by children, this triggers additional, stricter requirements on both platforms beyond the standard rating questionnaire:

- **iOS**: Apps in the Kids Category have specific restrictions — no third-party analytics/advertising without COPPA-compliant configuration, no external links without parental gate
- **Android**: Apps eligible for the "Designed for Families" program face similar restrictions, plus stricter Data Safety requirements

> **Tip:** If you're unsure whether your app counts as "directed at children," check actual usage data and design intent honestly — an app that happens to be popular with kids but wasn't designed for them is a different regulatory category than one explicitly marketed to children, and misclassifying either way creates compliance risk.

## Using AI Here

```
Help me determine the appropriate content rating questionnaire answers for this app.

App description: [what it does]
Content types present: [violence, language, user-generated content, ads, in-app browser, etc. — be thorough]
Is the app designed for or marketed toward children: [yes/no]
Moderation policy for any user-generated content: [describe]

Walk through each standard rating category (violence, sexual content, language, substances,
gambling, UGC, web access) and suggest accurate answers based on what I've described,
erring toward accuracy over the most permissive answer.
```

> **Validation:** Don't let AI (or your own instinct) optimize answers toward the most permissive rating — both platforms cross-check rating declarations against actual app behavior, and the consequence of misrepresentation is app removal, not just a rating correction.

## Before You Move On

- [ ] Content rating questionnaire reflects actual app content, including realistic UGC and ad-content scenarios
- [ ] If the app has user-generated content, rating accounts for the most permissive content your moderation policy allows
- [ ] Children's category eligibility (or non-eligibility) has been deliberately assessed, not assumed
- [ ] A process exists to re-run the questionnaire when app content changes meaningfully in future updates

Next: **Beta Testing** — validating everything built so far with real users before your full production release.
