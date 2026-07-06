---
title: Deep Linking
slug: deep-linking
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# Deep Linking

In the Push Notifications module, you designed a payload shape with a `type` and `entityId`. This module decides what happens next: how a URL — from a notification tap, an email, a QR code, or a share link — routes a user to the right screen inside your app, even if they don't have it installed yet.

> ️ **Before you research this topic elsewhere:** Firebase Dynamic Links was fully shut down on August 25, 2025. If any tutorial, AI output, or Stack Overflow answer you encounter recommends it, that's stale information — the service returns 404 on every link now. Don't build on it.

---

## The Three Kinds of "Deep Link"

These get used interchangeably in casual conversation but are architecturally different. Know which one you're building.

| Type | What It Does | Requires App Installed? |
|---|---|---|
| **Basic deep link** (custom URI scheme, e.g. `myapp://product/123`) | Opens a specific screen | Yes — fails silently or errors if not installed |
| **Universal Link (iOS) / App Link (Android)** | A real `https://` URL that opens your app if installed, falls back to a web page if not | No — degrades gracefully |
| **Deferred deep link** | Same as above, but if the app *wasn't* installed, it remembers the intended destination through the App Store/Play Store install and routes there on first open | No — and survives the install gap |

>  **Decision shortcut:** if your product has any acquisition flow where someone might click a link before installing the app (marketing emails, referral links, social shares, ads), you need deferred deep linking. If every link you'll ever generate assumes the app is already installed (in-app notifications, authenticated user-to-user shares), Universal/App Links alone are enough — and they're free.

---

## Decision 1 — Native Links vs a Linking Platform

| Approach | Setup Cost | Deferred Linking | Analytics/Attribution | Cost |
|---|---|---|---|---|
| **Universal Links + App Links (DIY)** | Medium — domain verification, `apple-app-site-association` + `assetlinks.json` files, hosting |  Not supported natively | None built-in | Free |
| **Branch** | Low — SDK handles both platforms + deferred linking |  |  Strong | Free tier, then usage-based |
| **AppsFlyer OneLink** | Low |  |  Strong, leans marketing/attribution-heavy | Free tier, then usage-based |
| **Adjust** | Low |  |  | Usage-based |

> **Recommendation:** If you only need links to route within an already-installed app (the common case for transactional/notification-driven links), implement **Universal Links + App Links directly** — it's free, you own the infrastructure, and there's no third-party SDK or data-sharing tradeoff.
>
> If you need deferred deep linking for growth/marketing flows, don't try to DIY it — the install-then-route handoff is genuinely fiddly across both app stores. Use **Branch** or **AppsFlyer**; both replaced the Firebase Dynamic Links use case and are the current industry default.

You can combine both: native links for in-app/notification routing, a platform like Branch layered on top only for the specific campaigns that need deferred behavior.

---

## Decision 2 — URL Structure

Design this before implementation, not during. Treat it like an API contract — because it is one; it's a contract with every external surface that can produce a link into your app (emails, push payloads, social shares, support docs).

```
https://yourapp.com/product/8841
https://yourapp.com/profile/u_223
https://yourapp.com/invite/abc123
```

> ️ **Common mistake:** using custom URI schemes (`myapp://...`) as your only link format and putting them directly in emails or SMS. Custom schemes aren't clickable in most email clients and look untrustworthy to users. Always use real `https://` URLs as the outward-facing format — they degrade gracefully to a web page if the app isn't installed, and they're clickable everywhere.

Keep the URL structure flat and resource-based. Map it to entities you already have IDs for (the same `entityId` from your push payload) — don't invent a second ID scheme just for links.

---

## Decision 3 — Routing Architecture

This is the part most teams skip until it breaks: **what does your app actually do with the link once received?**

```
Link received → parse path/params → check auth state → resolve route → navigate
```

Two states you must design for explicitly:

- **Cold start** (app wasn't running): the link arrives before your navigation stack, auth check, and initial data fetch have completed. You need a "pending deep link" holding pattern — store the intended destination, let normal app boot finish, then navigate once the user is authenticated and your router is mounted.
- **Warm start** (app already running): the link can navigate immediately, but you still need to handle "user is mid-flow doing something else" — don't yank them out of an unsaved form to honor a link.

>  **Tip:** Keep deep link resolution as a single, testable function — `resolveDeepLink(url) → { route, params } | null`. This is the function you'll unit test, and it's the function any AI tool should generate when you ask for deep link handling, not scattered `if` checks across your navigation code.

---

## Decision 4 — Auth-Gated Destinations

Decide this now, because it changes your routing logic:

- **Public content** (e.g. a shared product page): link should work even if the user isn't logged in — show the content, prompt login only for the action (e.g. "Sign in to add to cart").
- **Private content** (e.g. a specific order, a DM thread): the link should redirect through your login flow first, then resume to the original destination after auth succeeds.

> ️ A surprisingly common production bug: a deep link to private content silently fails or dumps the user on a generic home screen when they're not logged in, instead of completing the redirect after login. If you're testing deep links, explicitly test the logged-out path for every private route, not just the happy path.

---

## Security Considerations

- **Validate, don't trust, link parameters.** A deep link is user-controllable input — treat `entityId` and any params the same as a query parameter from an untrusted client. Don't let a crafted link bypass authorization checks just because it "came from a notification."
- **Don't leak private data through fallback web pages.** If your Universal Link falls back to a web preview when the app isn't installed, make sure that preview respects the same access controls as the in-app destination — a public preview of supposedly-private content is a real leak vector.
- **Domain verification files (`apple-app-site-association`, `assetlinks.json`) must be served over HTTPS with no redirects** — both platforms refuse to trust them otherwise. This trips people up during setup more than any other step.

---

## AI Prompts

### Prompt 1 — Routing Architecture Design

```
I'm designing deep link routing for a production [React Native / Flutter / native] app.

Entities that need link-addressable screens: [list them, e.g. product, profile, order]
Auth model: [how auth works in your app]

Design a resolveDeepLink(url) function and the cold-start/warm-start handling
strategy. Specifically address:
- how pending links are held during app boot before the router/auth state is ready
- how auth-gated destinations resume after login
- how malformed or unknown links are handled (don't let it crash or silently no-op)
```

### Prompt 2 — Universal Link / App Link Setup Review

```
Review my Universal Links (iOS) and App Links (Android) configuration:

[paste your apple-app-site-association and assetlinks.json]

Check for: correct content-type and hosting requirements, missing app IDs,
team ID mismatches, and anything that would cause iOS/Android to silently
fall back to the browser instead of opening the app.
```

---

## Validating AI Output

- [ ] No reliance on Firebase Dynamic Links anywhere in generated code or setup instructions
- [ ] Outward-facing links are `https://` URLs, not raw custom URI schemes
- [ ] Cold-start handling exists — a pending link isn't dropped if the app wasn't already running
- [ ] Auth-gated routes redirect through login and resume afterward, rather than failing silently
- [ ] Link parameters are validated server-side before being used to fetch/authorize data
- [ ] Domain association files are confirmed to be served correctly (HTTPS, correct content-type, no redirects)

---

## What's Next

- **File Storage** (next in this phase) covers how media referenced by these links — e.g. a shared image or document — gets stored and served.
- **Push Notifications Impl** (Phase 3) is where the `data.entityId` payload you designed earlier gets wired directly into `resolveDeepLink()`.
- **Analytics Strategy** will track which links convert into opens and downstream actions — your URL structure from Decision 2 is what you'll group those events by, so keep it consistent.
