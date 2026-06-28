---
title: Privacy Policy
slug: privacy-policy
phase: Phase 4
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Privacy Policy

Both app stores require a live privacy policy URL to submit your app — but this isn't just a submission checkbox. If you collect any real user data, you likely have actual legal obligations to disclose how, regardless of how small or personal the project is. This module isn't legal advice; it's a practical guide to building an accurate policy from the work you've already done, and knowing when to get real legal input.

> This module provides general, practical information, not legal advice. For anything beyond a simple personal app — especially if you'll have a meaningful user base or handle sensitive data — consider having a professional review your policy and data practices.

---

## Decision 1: Why This Matters Beyond the Store Requirement

> [!WARNING]
> "It's just a personal project" doesn't exempt you from privacy law if real people's data is involved. Depending on who uses your app, you may have obligations under **GDPR** (EU users), **CCPA** (California users), or **COPPA** (if children under 13 could use your app) — these apply based on your users' location and age, not your app's size or your intent.

---

## Decision 2: What Your Policy Needs to Cover

Build this directly from the SDK review you already did in Security and the Data Safety/App Privacy sections from Play Store Setup and App Store Setup — by now you should have an accurate list, not a guess:

> **Decision Card — Required Content**
- What data you collect (account info, usage analytics, device identifiers, crash reports, anything else)
- Why you collect it (tie each category to an actual feature or purpose)
- Which third parties data is shared with (your BaaS provider, analytics tool, crash reporting service, ad network if any)
- How long data is retained, and how a user can request deletion of their data
- A real contact method (email is sufficient for a personal app)

---

## Decision 3: It Must Be Live and Publicly Accessible

> [!WARNING]
> A privacy policy document sitting in your project folder doesn't satisfy the requirement — both app stores need a **live, publicly accessible URL**. For a personal project, this doesn't need to be elaborate: a simple static page works fine. Free options include GitHub Pages, a public Notion page, or a single HTML file on basic free hosting.

---

## Decision 4: Children's Privacy (COPPA)

- [ ] If your app isn't intentionally designed for or targeted at children under 13, state this explicitly in your policy
- [ ] If there's a real possibility children under 13 will use your app (e.g., it's a general-audience game or creative tool), look into COPPA's specific requirements before launch — this is a case where getting actual legal guidance is worth the cost, since the requirements (parental consent flows, restricted data collection) are substantive, not just disclosure

---

## Decision 5: Generated Policies Need Review Against Reality

> [!WARNING]
> A generic template or AI-generated privacy policy is only as accurate as the input you give it. If you generate a policy without listing your actual SDKs and data practices, it will likely describe a generic app, not yours — and an inaccurate policy can be worse than a barebones-but-correct one, since both app stores check for consistency between your disclosed practices and your actual policy. Always review the generated text against your real SDK list before publishing it.

---

## Decision 6: Keep It Updated

Your privacy policy isn't a one-time document. Any time you add a new SDK, a new data collection point, or change what you do with existing data, update the policy — and update your store privacy disclosures (Data Safety / App Privacy) to match. Treat this as part of your routine when adding any new third-party dependency, not a separate, easily-forgotten task.

---

## Common Mistakes

- **Uses a generic template without customizing it** to actual data practices — review every section against your real SDK list.
- **Has a policy document that isn't actually hosted anywhere public** — verify the URL works in an incognito browser, not just locally.
- **Forgets to update the policy** after adding a new SDK or feature that changes data collection.
- **Doesn't address children's privacy at all**, even with a simple statement, when it's a one-line addition for most apps that aren't targeted at children.
- **Treats this as purely a store-submission checkbox** rather than an actual legal obligation tied to real users' data.

---

## AI Prompt: Draft Your Privacy Policy

```prompt
Help me draft a privacy policy for a personal mobile app.

App: [one-sentence description]
Data collected: [list from your Security/Data Safety/App Privacy review — be specific]
Third-party SDKs and what they collect: [list them, e.g., "Supabase: account email, app data"; "[Analytics tool]: anonymized usage events"]
Target audience: [general audience / explicitly not intended for children under 13]

Draft a clear, plain-language privacy policy covering: what's collected, why, who it's shared with, retention/deletion process, a contact email, and an explicit statement about whether the app is intended for children under 13.

Flag anything in this draft where you're guessing or templating rather than reflecting the specific data list I gave you — I want to verify accuracy, not just get generic boilerplate.
```

---

## Validate Before You Move On

- [ ] Every data category and third party listed reflects your actual app, not a generic template
- [ ] The policy is hosted at a real, live, publicly accessible URL — verified by opening it in a private/incognito browser
- [ ] Children's privacy is addressed explicitly, even if just to state the app isn't targeted at children under 13
- [ ] A real contact method is included
- [ ] The policy matches what you disclosed in Play Store's Data Safety and App Store's App Privacy sections — no inconsistency between them

> [!TIP]
> If your app handles anything sensitive (health data, financial data, anything beyond basic account/usage info) or you expect meaningful real-world usage, this is a reasonable place to spend a small amount on an actual legal consultation rather than relying solely on a generated policy — the cost is usually modest relative to the risk.

---

**Phase 4 complete.** Next: Phase 5 — Growth. Time to learn from real users.
