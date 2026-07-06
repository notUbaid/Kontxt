---
title: Security
slug: security
phase: Phase 4
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Security

Before shipping, this module is a focused review pass — confirming the security decisions made throughout Phase 2 and 3 are actually in place, not just planned. For a personal project, you don't need enterprise-grade security infrastructure, but a handful of specific checks genuinely matter regardless of project size.

---

## Decision 1: Re-Verify Data Access Rules

> [!WARNING]
> Go back and actually re-test your RLS policies or Firestore security rules (from Database) as a second user, right now, before shipping — not just confirm they're configured. A policy that looks correct and a policy that's actually been verified to block cross-user access are not the same thing, and this is the highest-leverage check in this entire module.

---

## Decision 2: Confirm No Secrets Are in the Client

- [ ] Search your codebase for any API key, secret, or credential that might have been hardcoded during development and never moved to a server function (Backend)
- [ ] Check your git history specifically — a secret committed and later removed is still present in history and should be treated as compromised; rotate it if you find one
- [ ] Confirm your `.env` file (if used for local development) is in `.gitignore` and was never committed

---

## Decision 3: Confirm Secure Storage Is Actually Used

Re-verify the decision from State Management: open your code and confirm auth tokens and any credential are stored via SecureStore/Keychain, not AsyncStorage. This is easy to get right in the plan and accidentally skip in a rushed implementation pass — check the actual code, not just your memory of the decision.

---

## Decision 4: Don't Rely on Obfuscation as a Security Boundary

> [!WARNING]
> Code obfuscation/minification makes your app's compiled code harder to read, but it does not make secrets safe to embed, and a motivated person can still extract strings and logic from an obfuscated build. Treat obfuscation as a minor speed bump, not a security control — the real protection is never putting secrets in the client in the first place (Backend's core principle).

---

## Decision 5: Validate Deep Link Input

> [!WARNING]
> A deep link can be constructed and sent by anyone, not just your own app's emails — including a malicious actor trying to navigate your app to an unintended state or pass unexpected data. Validate and sanitize any parameters extracted from a deep link before acting on them (e.g., don't trust a deep-linked ID to belong to the current user without the same authorization check you'd apply anywhere else).

---

## Decision 6: Review Third-Party SDKs

> [!TIP]
> List every third-party SDK in your app (analytics, crash reporting, ad networks, etc.) and what data each one actually collects. This isn't just a security concern — it directly feeds into your Privacy Policy and the privacy disclosures both app stores require (Apple's App Privacy details, Google's Data Safety section). Knowing this now saves a scramble later.

---

## Decision 7: Network Security

- [ ] All network requests use HTTPS — confirm no insecure HTTP endpoints are allowed, especially for anything carrying auth tokens or user data
- [ ] If your platform config allows arbitrary insecure connections by default during development, confirm this is locked down for your release build

---

## Common Mistakes (Including AI's)

- **Assumes RLS/security rules work because they were written**, without actually testing cross-user access before shipping.
- **Leaves a secret in git history** even after removing it from the current code — treat any historically-committed secret as compromised and rotate it.
- **Treats obfuscation as real security** — push back on any plan that relies on "the code is minified so it's fine" reasoning for handling a secret.
- **Doesn't validate deep link parameters** before using them to fetch or display data — apply the same authorization checks as any other entry point.
- **Doesn't know what its own third-party SDKs collect**, leading to inaccurate privacy disclosures later.

---

## AI Prompt: Run a Pre-Launch Security Review

```
I'm about to ship a personal mobile app using [your stack]. Run a security review pass.

Check for:
1. Any hardcoded API key, secret, or credential in the codebase
2. Confirm auth tokens are stored via SecureStore/Keychain, not AsyncStorage — show me the exact code path
3. Confirm all network requests use HTTPS, not insecure HTTP
4. Review my deep link handling for [list your deep link types] — confirm parameters are validated/authorized before use, not trusted blindly
5. List every third-party SDK in my dependencies and what category of data each typically collects (analytics, crash logs, ad identifiers, etc.)

Flag anything that relies on code obfuscation as a security measure rather than an actual server-side protection.
```

---

## Validate Before You Move On

- [ ] You've personally tested RLS/security rules as a second user and confirmed cross-user access is actually blocked
- [ ] No secrets exist in current code or git history (rotate any found in history)
- [ ] Secure storage is confirmed in the actual code for tokens/credentials
- [ ] Deep link parameters are validated and authorization-checked before use
- [ ] All network traffic uses HTTPS
- [ ] You have a complete list of third-party SDKs and what data each collects

> [!TIP]
> This review is worth repeating any time you add a new third-party SDK or a new feature involving user data — it's a quick pass, not a one-time gate.

---

**Next:** Performance Optimization — make sure the app feels fast before real users arrive.
