---
title: Security
slug: security
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
filename: security-production-mobile-app.md
---

Mobile apps live on devices you don't control, get decompiled by anyone with a free tool, and talk to your backend over networks you can't trust. Security here isn't a checklist you run once before launch — it's a set of defaults you build with from the start, because retrofitting them into a shipped app is far more expensive.

## The Mobile Threat Model Is Different From Web

A web server is a black box to an attacker. A mobile app is not — it ships to the user's device, which means:

- Your APK/IPA can be decompiled and inspected
- Anything in client-side code (strings, logic, even "hidden" API keys) can be extracted
- The device itself may be rooted/jailbroken, compromised, or running on hostile networks (public Wi-Fi, MITM proxies)
- Local storage is more accessible to a determined attacker than a server-side database

> **Best Practice:** Treat the client as hostile territory. Never put a secret, business rule, or trust decision on the device that you wouldn't be comfortable publishing. If it matters, enforce it on the server.

## Secrets Don't Belong in the App Bundle

This is the single most common mobile security mistake — embedding API keys, secrets, or credentials directly in client code.

| Don't | Do Instead |
|---|---|
| Hardcode API keys in source | Proxy third-party API calls through your backend |
| Embed database credentials | Use scoped, short-lived tokens issued per-user |
| Store secrets in `.env` bundled into the app | Use a secrets manager server-side; client only gets ephemeral tokens |
| Trust client-side feature flags for paywalls | Verify entitlements server-side on every privileged request |

> **Warning:** "Hidden" strings in compiled code are not hidden. Tools like `apktool` or `class-dump` make extracting embedded keys trivial — assume anything shipped in the binary is public within hours of release.

If a third-party SDK requires a client-side key (e.g., Maps, Analytics), check whether it supports restricting that key by bundle ID / package name and app-check attestation, and apply those restrictions.

## Secure Local Storage

Not all on-device storage is equal. Match the storage mechanism to sensitivity.

| Data Type | Where It Goes | Why |
|---|---|---|
| Auth tokens, refresh tokens | Keychain (iOS) / Keystore (Android) | Hardware-backed encryption, isolated from app sandbox dumps |
| PII (email, profile data) | Encrypted local DB (e.g., SQLCipher) if cached at all | Readable in plaintext SQLite otherwise |
| Non-sensitive cache (UI state, preferences) | AsyncStorage / SharedPreferences / UserDefaults | Fine as-is, not sensitive |
| Payment details | Don't store at all | Use tokenization via Stripe/Apple Pay/Google Pay |

Cross-platform frameworks (React Native, Flutter) typically have a dedicated secure-storage package (`react-native-keychain`, `flutter_secure_storage`) that wraps Keychain/Keystore — use it for anything auth-related rather than the default key-value storage.

## Transport Security

- Enforce HTTPS everywhere — no exceptions for "internal" or "debug" endpoints
- Enable certificate pinning for high-value apps (banking, healthcare, anything handling payments) to defeat MITM attacks even on compromised networks — but plan a pin-rotation strategy, since a botched pin update can lock out your entire user base
- Disable cleartext traffic at the OS config level (Android `network_security_config.xml`, iOS App Transport Security) rather than relying on individual request code to remember HTTPS

> **Tip:** Certificate pinning is a tradeoff, not a default. It adds real operational risk (an expired/rotated cert without an app update can brick connectivity). Use it where the threat justifies it, not everywhere by reflex.

## Authentication & Session Security

This builds on the Authentication module from Phase 2 — here the focus is what changes once that auth flow runs on a physical device:

- Short-lived access tokens + refresh tokens, never long-lived tokens stored client-side
- Refresh tokens stored in Keychain/Keystore only, never in plain async storage
- Invalidate sessions server-side on logout, password change, or suspicious activity — don't just clear local state
- Biometric unlock (Face ID / fingerprint) should gate access to an already-issued session, not replace server-side authentication

## App Permissions

Every permission you request is an attack surface and a trust cost with the user.

- [ ] Request permissions only at the moment they're needed, with context explaining why
- [ ] Audit every permission in your manifest/plist — remove anything not actively used
- [ ] Handle permission denial gracefully; never assume it was granted
- [ ] Review SDK-injected permissions — analytics and ad SDKs often request more than your app needs

## Client-Side Hardening

These don't stop a determined attacker but raise the cost meaningfully:

- Enable code obfuscation (ProGuard/R8 for Android, standard stripping for iOS) for release builds
- Detect root/jailbreak for high-risk flows (payments, sensitive data) and degrade gracefully rather than crash
- Disable screenshots/screen recording on screens showing sensitive data (e.g., card numbers, seed phrases) where the platform supports it
- Strip debug logging and verbose error messages from release builds — stack traces and internal error detail are reconnaissance for attackers

## Using AI for Security Review

AI is genuinely useful here because it can systematically check categories a rushed human review skips:

```
Review this [API endpoint / auth flow / storage code] for mobile-specific security issues.

Context: [what this code does, what data it touches]
Stack: [React Native / Flutter / native, backend stack]

Check specifically for:
- Secrets or keys exposed in client-accessible code
- Sensitive data stored outside Keychain/Keystore
- Missing server-side validation of client-supplied data
- Auth/session logic that trusts the client
- Error messages that leak internal implementation detail

Flag anything uncertain rather than assuming it's fine.

[paste code]
```

> **Validation:** AI security reviews are good at pattern-matching known bad practices (hardcoded secrets, missing HTTPS, plaintext storage) but unreliable at reasoning about your specific business logic and trust boundaries. Treat AI review as a fast first pass, not a substitute for understanding your own attack surface.

## Common Mistakes

- Trusting client-side checks (paywalls, role checks, validation) without server-side enforcement
- Shipping API keys or secrets inside the app bundle
- Storing auth tokens in plain AsyncStorage/SharedPreferences instead of Keychain/Keystore
- Verbose error messages or stack traces reaching production builds
- Requesting permissions upfront instead of contextually, hurting both security posture and conversion
- Treating certificate pinning as a default rather than a deliberate tradeoff

## Before You Move On

- [ ] No secrets, keys, or credentials exist in client-accessible code
- [ ] Auth and refresh tokens are stored in Keychain/Keystore, not plain local storage
- [ ] All network traffic is HTTPS-only, enforced at the OS config level
- [ ] Every requested permission is justified and handled gracefully if denied
- [ ] Server-side enforcement exists for every privileged action — the client is never the source of truth

Next: **Rate Limiting** — protecting your backend from the abuse that inevitably finds undefended endpoints.
