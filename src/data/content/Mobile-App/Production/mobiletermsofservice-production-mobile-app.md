---
title: Terms of Service
slug: terms-of-service
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
filename: terms-of-service-production-mobile-app.md
---

Your Terms of Service is the contract that protects you, not just a formality alongside your privacy policy. Where the privacy policy governs *what you do with data*, the ToS governs *how users are allowed to use your app* and what happens when something goes wrong — disputes, account termination, liability, payment issues.

## What the Privacy Policy Doesn't Cover

These are separate documents serving separate legal functions, and conflating them leaves real gaps:

| Privacy Policy | Terms of Service |
|---|---|
| What data is collected and why | Rules for using the app |
| How data is shared/stored | Account termination conditions |
| User data rights | Liability limitations |
| | Intellectual property ownership |
| | Dispute resolution process |
| | Subscription/payment terms |

> **Best Practice:** Both documents are required, separately, and store reviewers and users alike expect to find both. Don't merge them into one document hoping to save effort — it reads as less professional and can miss required elements either should cover independently.

## Core Sections Your ToS Needs

- [ ] **Acceptance of terms** — using the app constitutes agreement; specify the age requirement to use the service
- [ ] **Account responsibilities** — what users are responsible for (account security, accurate information, acceptable use)
- [ ] **Prohibited conduct** — what gets an account suspended or terminated (abuse, fraud, illegal use, circumventing security)
- [ ] **Intellectual property** — who owns the app's content/code versus user-generated content, and what license you need from users for content they create in your app
- [ ] **Subscription and payment terms**, if applicable — billing cycle, cancellation policy, refund policy, auto-renewal disclosure
- [ ] **Disclaimers and limitation of liability** — standard "as is" service disclaimers, capped liability
- [ ] **Termination** — your right to suspend/terminate accounts, and what happens to user data when that happens
- [ ] **Governing law and dispute resolution** — which jurisdiction's law applies, and whether disputes go through arbitration or courts
- [ ] **Changes to terms** — how you'll notify users of material changes

## Subscription and In-App Purchase Terms

If your app has any paid component, both Apple and Google impose specific requirements beyond general ToS practice:

- Clearly disclose price, billing frequency, and auto-renewal terms before purchase, not buried in the ToS alone
- Explain how to cancel — and critically, that cancellation goes through the platform (App Store/Play Store subscription management), not through your app or support email
- State your refund policy explicitly — note that on iOS, Apple controls the actual refund process and you cannot override it from your app or backend
- If you offer a free trial, clearly state what happens at trial end (auto-converts to paid, requires action, etc.)

> **Warning:** Apple and Google both require subscription terms to be clear and prominent at the point of purchase, not just present somewhere in a long ToS document users won't read before tapping "subscribe." Vague or hidden auto-renewal terms are a common rejection reason and a regulatory risk (several jurisdictions now specifically regulate "dark patterns" in subscription disclosure).

## User-Generated Content Considerations

If your app lets users post, upload, or create content (reviews, photos, posts, comments), your ToS needs to address this directly:

- A license grant from the user to you, scoped to what you actually need (typically: a license to host, display, and distribute their content within the app — not broad ownership transfer unless genuinely intended)
- A content moderation policy outlining what's prohibited and how violations are handled
- A DMCA/copyright takedown process if hosting user content in the US, since this is both a legal requirement and a practical necessity once content scales

## Liability Limitations

This section is where generic templates matter least and specificity matters most — it should reflect your app's actual risk profile.

- An app handling financial transactions, health data, or safety-relevant functionality (navigation, fitness tracking with health implications) needs more careful liability language than a simple utility or entertainment app
- "As is" and "as available" disclaimers are standard, but don't let boilerplate substitute for genuinely thinking through what could go wrong with your specific app and whether the liability language actually covers it

## Generating and Reviewing a ToS

Similar to the privacy policy: generators (Termly, iubenda, GetTerms) produce a reasonable structured starting point, but the output needs to reflect your app's actual functionality, not generic boilerplate.

- For apps with subscriptions, user-generated content, or any safety/financial/health relevance, actual legal review is worth the investment — the cost of a bad liability clause discovered after a dispute far exceeds the cost of review now
- A simple utility app with no payments or user content carries much lower risk and a careful generic template may be sufficient

## Using AI Here

```
Help me draft Terms of Service for this mobile app.

App function: [one sentence]
Does it have subscriptions/in-app purchases: [yes/no, describe the model]
Does it allow user-generated content: [yes/no, describe what kind]
Risk profile: [e.g., simple utility / handles payments / health-adjacent / social platform]

Draft ToS covering acceptance, account responsibilities, prohibited conduct, IP/content
licensing, subscription terms (if applicable), liability limitations, and termination.
Flag any section where my risk profile suggests I should get actual legal review
rather than rely on this draft as final.
```

> **Validation:** Treat AI-drafted ToS the same as the privacy policy — a structured starting point, not a finished legal document, especially where subscriptions, user content, or any safety/financial dimension is involved.

## Common Mistakes

- Merging Terms of Service and Privacy Policy into one document, missing required elements of either
- Vague or buried subscription/auto-renewal terms that violate store requirements around purchase clarity
- No user-generated content license or moderation policy, leaving you exposed once content scales
- Generic liability language that doesn't actually address your app's real risk profile
- Never updating the ToS as the app's features (especially payment models) evolve
- Skipping legal review entirely for an app with real financial, health, or safety exposure

## Before You Move On

- [ ] ToS exists as a separate document from the privacy policy, covering distinct required elements
- [ ] Subscription/payment terms are clear, prominent, and accurately describe platform-controlled cancellation/refund flows
- [ ] User-generated content (if applicable) has an explicit license grant and moderation policy
- [ ] Liability and disclaimer language reflects the app's actual risk profile, not generic boilerplate
- [ ] Higher-risk apps (payments, health, safety, social platforms) have had the draft reviewed by an actual lawyer

Next: **Content Rating** — formally classifying your app's content for both stores.
