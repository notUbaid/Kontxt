---
title: Cookie Policy
slug: cookie-policy
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 15-20 min
---

# Cookie Policy

A Cookie Policy is the smallest of your three legal documents, but it's the one most directly tied to actual code — specifically, the cookie consent banner your users see (or don't) when they land on your site.

This is also the area where founders most commonly confuse "I added a cookie banner" with "I'm compliant." The banner is a UI component. Compliance is about what your code does *before and after* the user makes a choice on that banner.

> **️ Important boundary**
> Kontxt is not a lawyer. Cookie consent requirements vary significantly by jurisdiction — GDPR's ePrivacy rules (EU/UK) are stricter than US requirements in most states. This module covers the engineering implementation correctly; have a professional confirm the legal text and your specific obligations for your user base.

---

## The Core Idea: Consent Has to Happen Before Tracking, Not After

This is the single most common implementation bug, and it's a compliance failure, not a cosmetic one.

**Wrong pattern:** Your analytics script, ad pixel, and session recording tool all load on page load. A cookie banner appears at the bottom asking for consent. The user hasn't clicked anything yet, but tracking has already started the moment the page loaded.

**Correct pattern:** Non-essential scripts (analytics, ads, session recording) do not load until the user explicitly consents. Only strictly necessary cookies (session tokens, CSRF protection, login state) are allowed to load before consent.

> **️ Warning**
> If your cookie banner library only *hides the banner* on dismiss but your analytics script tag is sitting unconditionally in your page `<head>`, you are not compliant under GDPR/ePrivacy — you're tracking before consent and just hiding the evidence visually. This is one of the most common and most checked violations.

---

## Step 1: Categorize Your Cookies

Before writing any consent logic, classify what you actually use.

**Decision Card — Cookie Categories**

| Category | Examples | Requires Consent? |
|---|---|---|
| Strictly necessary | Session token, auth cookie, CSRF token, load balancer cookie | No — required for the site to function |
| Functional | Language preference, UI theme setting | Often no, but varies by jurisdiction — check local guidance |
| Analytics | Google Analytics, PostHog, Mixpanel cookies | Yes, under GDPR/ePrivacy |
| Advertising/marketing | Ad pixels, retargeting cookies, third-party ad cookies | Yes, almost always |

Go through your actual third-party scripts and sort each one into a category. This list becomes both your policy content and your consent-gating logic.

---

## Step 2: Implementation Pattern

The engineering task is: **don't load non-essential scripts until consent is granted**, and **respect the user's choice on every subsequent visit**.

**Best Practice Card — Conditional Script Loading**

```javascript
//  WRONG — script loads unconditionally, before any consent check
<script src="https://analytics-provider.com/script.js"></script>

//  CORRECT — script only loads after consent is checked/granted
function loadAnalytics() {
  const script = document.createElement('script');
  script.src = 'https://analytics-provider.com/script.js';
  document.head.appendChild(script);
}

if (getCookieConsent() === 'granted') {
  loadAnalytics();
}

// When user clicks "Accept" on the banner:
function onConsentAccepted() {
  setCookieConsentCookie('granted');
  loadAnalytics();
}
```

The exact implementation depends on your tooling — most cookie consent libraries (e.g., CookieYes, Osano, or a custom solution built on the [Google Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent) spec if you use Google products) handle the gating logic for you. The principle stays the same regardless of library: **gate the script tag, not just the banner visibility.**

---

## Step 3: Persist and Respect the Choice

- [ ] Consent choice is stored (cookie or localStorage) so the banner doesn't reappear every page load
- [ ] If the user rejects non-essential cookies, those scripts genuinely don't load on the next page view either — not just the current one
- [ ] Users can change their mind later — a "Cookie Settings" link in your footer reopens the preference panel, it doesn't require clearing browser data manually

> ** Tip**
> Geotargeting your banner (showing the strict opt-in version only to EU/UK visitors, and a lighter version elsewhere) is common practice and reduces friction for visitors in regions with looser requirements. But verify your actual obligations for non-EU regions — some US states (like California, under CCPA) have their own opt-out requirements, just structured differently than GDPR's opt-in model.

---

## Using AI for This Module

This is one of the more mechanical legal-adjacent tasks AI handles well, because the output is largely a direct mapping from your cookie inventory to policy text and consent categories.

**Prompt: Cookie Policy and Consent Categories**

```
I'm building a cookie consent system for a SaaS product. Here is my
actual list of cookies/scripts in use:

[paste your categorized cookie list from Step 1]

My primary user base is located in: [regions]

1. Draft a Cookie Policy document based only on the list above.
2. Suggest the consent categories I should implement in my banner
   (e.g., Necessary, Analytics, Marketing) based on what's actually
   in my list — don't include a category I have nothing in.
3. Flag, in brackets, any cookie in my list where you're uncertain
   which category it belongs in, so I can verify it directly with
   the tool's documentation.
```

> ** Why this prompt works**
> Restricting the draft to your actual cookie inventory avoids generating a policy that lists tracking technologies you don't use (which is its own kind of inaccuracy) or omits ones you do. Asking for category suggestions tied only to what's actually present keeps your consent banner from showing an empty "Marketing cookies" toggle that does nothing — a small but noticeable trust signal to attentive users.

**Token efficiency note:** This is a small, self-contained task — one prompt with your full cookie inventory should produce a usable draft. There's rarely a need for a multi-turn conversation here unless you're adding a genuinely new tracking tool later, in which case update the inventory and re-run rather than patching the policy by hand.

---

## Validating the Output

- [ ] Every third-party script in your actual codebase is gated behind the appropriate consent category — verify this in the browser's network tab with consent rejected, confirming the script genuinely doesn't fire
- [ ] The policy text only lists cookies you actually use — not a generic template's assumed list
- [ ] Rejecting cookies doesn't break core functionality (login, checkout) — only non-essential features should be affected
- [ ] The consent choice persists across page navigations and return visits, not just within a single session

> ** Note**
> The network tab test above is the only way to be sure. Reading your own banner's UI text tells you nothing about whether the underlying script actually respects the choice — that's a behavior you have to observe directly, with consent rejected, watching what requests fire.

---

## What's Next

With your legal documents grounded in actual product behavior, move to **Legal Documents** to round out anything jurisdiction- or industry-specific that Privacy Policy, Terms of Service, and Cookie Policy don't individually cover.
