---
title: Authentication
slug: authentication
phase: Phase 2
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# Authentication

Auth is one of the most over-built parts of a typical hackathon project relative to how much it actually matters to judges. Nobody scores you on password complexity rules or session security. They score you on whether the demo flows smoothly — and auth's only job here is to not get in the way of that.

---

## The Core Idea: Auth Is Infrastructure for Your Demo, Not a Feature to Show Off

Unless your idea's wow moment is literally about authentication (it almost never is), auth is pure plumbing. The right amount of time to spend on it is the minimum that makes your demo flow work — not a moment more.

> **⚠️ Warning**
> Building a full email/password system with verification emails, password reset flows, and account settings is a classic hackathon time sink. None of that will be seen or judged. Every hour spent here is an hour not spent on your wow moment.

---

## Decision Card: Pick the Fastest Option That Still Works

| Approach | Setup Time | When to Use |
|---|---|---|
| Social login only (Google/GitHub OAuth via your platform's built-in support) | Minutes, if your platform (Supabase/Firebase/etc.) has it pre-built | Default choice for most hackathon projects — fast, looks professional, no password management |
| Magic link (email-only, no password) | Minutes, same pre-built support | Good alternative if social login setup hits friction for any reason |
| Anonymous/guest sessions (no real login at all) | Near-zero | If your demo doesn't actually need to distinguish between users, skip auth entirely |
| Full email/password with verification | Hours | Almost never justified — avoid unless your idea is specifically about an auth-related feature |

For the vast majority of hackathon projects, **social login through your platform's built-in auth (Supabase Auth, Firebase Auth, NextAuth, Clerk) is the right call.** It's fast to set up, looks polished in the demo, and you don't write any of the actual security-sensitive code yourself.

---

## Step 1: Ask Whether You Need Real Auth At All

Before building anything, check this against your actual user flow: does your demo *require* distinguishing between different logged-in users, or does it just need *some* gate so the app feels like a real product?

> **💡 Tip**
> If your demo only ever shows one user's session, live, on one laptop, you may not need real persistent accounts at all — a single hardcoded "demo user" session can be entirely sufficient, freeing up real auth-building time for your actual feature. Be honest about whether this is true for your specific flow before defaulting to building real auth out of habit.

---

## Step 2: Use Your Platform's Built-In Auth, Don't Roll Your Own

If you do need real auth, use whatever your chosen backend platform provides out of the box (see the Tech Stack module). Building your own password hashing, session management, or token handling from scratch is both slower and a meaningfully larger security risk — for zero hackathon benefit, since nobody's evaluating your auth security.

**Best Practice Card — What "Use Built-In Auth" Looks Like**

```
✅ Supabase: supabase.auth.signInWithOAuth({ provider: 'google' })
✅ Firebase: signInWithPopup(auth, googleProvider)
✅ NextAuth/Clerk: pre-built sign-in components, drop into your app

❌ Writing your own JWT generation, password hashing, or session
   cookie management from scratch — this is real engineering work
   that doesn't need to happen for a hackathon project
```

---

## Step 3: Test the Auth Flow Live, Early, Not the Night Before

Auth has a specific failure mode worth guarding against: it often works perfectly on your local machine and then breaks once deployed, because OAuth redirect URIs need to match your production URL exactly. Test the full login flow on your actual deployed demo URL as soon as you have one — not for the first time during your dress rehearsal.

> **⚠️ Warning**
> The single most common "it worked yesterday" hackathon bug is an OAuth redirect URI configured for `localhost` that silently breaks once you deploy to your actual demo URL. Add the production URL to your OAuth provider's allowed redirects the moment you have a deployed URL, not the night before submission.

---

## Using AI to Wire Up Auth Fast

This is a highly mechanical, well-documented integration task — exactly where AI saves real time with low risk, since auth provider SDKs are heavily represented in training data and the failure modes are well known.

**Prompt: Fast Auth Setup**

```
I'm using [Supabase/Firebase/NextAuth/Clerk] with [your framework]
for a hackathon project. I need the fastest possible working
[social login / magic link] flow.

Give me:
1. The minimum code to add sign-in, get the current user, and sign out
2. What I need to configure in the provider's dashboard (OAuth app
   setup, redirect URIs) — flag the production-URL redirect URI
   issue explicitly so I don't forget it
3. Skip anything related to password reset, email verification, or
   account settings — I don't need any of that
```

> **🔍 Why this prompt works**
> Explicitly excluding password reset, verification, and account settings prevents the model from generating a complete, production-style auth system when you only need a working sign-in button — without that constraint, you'd get far more code and setup than your actual demo requires. Asking it to flag the redirect URI issue directly addresses Step 3's most common failure mode before you hit it yourself.

**Token efficiency note:** This is a quick, single-purpose integration. Get the working code, configure the dashboard, test it once on your deployed URL, and move on — don't spend a long conversation refining auth UX details nobody will notice in a 3-minute demo.

---

## Validating Auth Before Moving On

- [ ] Sign-in works on your actual deployed URL, not just locally
- [ ] You've confirmed whether you even need multi-user distinction, or whether a single demo session would suffice
- [ ] No time was spent on password reset, email verification, or account settings unless your idea specifically requires them
- [ ] The OAuth redirect URI is configured for your production domain, tested at least once before the night of submission

---

## What's Next

With Phase 2 — Architecture complete, move to **Phase 3 — Speed Building**, starting with **Backend Engineering** — where your schema and auth setup become the foundation for the actual feature logic your demo depends on.
