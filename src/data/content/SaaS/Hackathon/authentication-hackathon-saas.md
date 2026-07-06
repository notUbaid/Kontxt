---
title: Authentication
slug: authentication
phase: Phase 2
mode: hackathon
projectType: saas
estimatedTime: 15-20 min
---

# Authentication

Judges will never inspect your token refresh logic. They will notice, in the first ten seconds, whether login works smoothly or whether it's visibly held together with duct tape. In a hackathon, auth is a means to a demo, not a feature to perfect.

Your job here is to get a real, working, reasonably secure login flow shipped in under an hour — using tools that do the hard parts for you — so the rest of your build time goes into the feature that actually wins.

---

## The One Decision That Matters

> **Decision Framework**

| Option | Time cost | Verdict |
|---|---|---|
| **Supabase Auth / Clerk / Firebase Auth** | ~20-30 min to working login |  Use this |
| **Roll your own (bcrypt, JWT, sessions)** | Hours, and you'll still miss edge cases |  Never in a hackathon |
| **Skip auth, hardcode a demo user** | 5 min | ️ Only if the judged flow genuinely never touches multi-user behavior |

> **️ Common Mistake**
> Building custom auth "because it's not that hard." It's not hard to build something that looks like it works. It's hard to build something that handles password resets, session expiry, and edge cases without a bug surfacing mid-demo. Every hour spent here is an hour not spent on your core feature — and judges score the core feature, not your JWT implementation.

**For this build: use Supabase Auth.** It's already your backend if you followed the earlier stack decision, it supports email/password and OAuth (Google) out of the box, and it gets you a working, demoable login in one sitting.

---

## What You're Actually Building

A hackathon auth flow needs exactly three things — nothing more:

1. **Sign up / log in** — email+password or "Continue with Google," pick one, don't build both
2. **A logged-in state the rest of your app can check** — "is there a user, yes or no"
3. **Logout** — judges do try this, and a broken logout button is an easy point to lose for zero benefit

That's it. No password reset flow, no email verification enforcement, no multi-factor auth, no "remember me" — none of it moves your demo forward.

> [!TIP]
> Pick Google OAuth over email/password if your demo audience is judges, not real end users. It's faster to build (no form validation, no error states to handle) and faster to demo (one click instead of typing credentials on stage).

---

## Implementation Path

**1. Enable auth in Supabase**
Turn on the providers you need (Email, or Google) in your Supabase project's Auth settings. Google OAuth needs a client ID from Google Cloud Console — budget 10 extra minutes for this if you haven't done it before.

**2. Wire up the client**

```
// One-time setup
supabase.auth.signInWithOAuth({ provider: 'google' })

// or, for email/password
supabase.auth.signUp({ email, password })
supabase.auth.signInWithPassword({ email, password })
```

**3. Gate your app on session state**

```
const { data: { session } } = await supabase.auth.getSession()
// session ? show app : show login screen
```

Wrap this in whatever your app's top-level routing is — don't build a custom auth context from scratch if your framework's starter already gives you a pattern for it.

**4. Logout**

```
supabase.auth.signOut()
```

That's the entire flow. Resist the urge to add anything else.

---

## Common Hackathon Auth Failures

> **️ Warning**
> These are the specific ways auth breaks live on stage — check for all of them before you present.

- **OAuth redirect URL mismatch** — Google/Supabase redirect URLs must exactly match what's configured, including `localhost` vs your deployed URL. Test on the actual deployed link you'll demo from, not just localhost.
- **Session not persisting on refresh** — if a judge refreshes the page and gets logged out, it looks broken even if it "technically" isn't a bug you care about. Confirm session persistence before demo day.
- **No loading state while checking session** — a flash of the login screen before redirecting to the logged-in app reads as a bug. A one-line loading spinner fixes this.

---

## What to Skip (On Purpose)

Every one of these is a legitimate production concern and a waste of hackathon time:

- Password strength requirements and validation UX
- Email verification enforcement
- Rate limiting on login attempts
- Multi-factor authentication
- "Forgot password" flow
- Custom session refresh logic (Supabase's SDK handles this for you already)

If a judge asks why these aren't built, "out of scope for a 24-hour build, here's how I'd add it" is a stronger answer than having silently burned three hours on a password reset email template nobody will see.

---

## AI Prompt

Use this once you've picked your provider (Google OAuth or email/password) to get working code fast, scoped to exactly what you need:

```
Set up Supabase Auth in a [React/Next.js] app for a hackathon demo.

I need exactly:
1. [Google OAuth sign-in / email+password sign-up and sign-in]
2. A way to check if a user is logged in and gate the main app
   behind it
3. A logout button

Do not include: password reset, email verification enforcement,
rate limiting, or MFA — this is a time-boxed hackathon build and
those are explicitly out of scope.

Give me the minimal working code, not a production-grade auth
system.
```

> [!TIP]
> Explicitly telling AI what to skip is as important as telling it what to build. Without the exclusion list, most models default to "production-grade" scaffolding that costs you time you don't have.

---

## Validation Checklist

- [ ] Login works on the actual deployed URL, not just localhost
- [ ] Session persists across a page refresh
- [ ] Logout actually clears the session and returns to the login screen
- [ ] A logged-out user can't see logged-in-only screens by directly navigating to them
- [ ] There's a loading state during session check, not a flash of the wrong screen

---

## What's Next

With login working, move on to the module for your core demoed feature — auth is infrastructure, not the thing judges are here to see.
