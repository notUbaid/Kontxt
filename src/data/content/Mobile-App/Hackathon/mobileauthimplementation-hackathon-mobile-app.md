---
title: Authentication
slug: authentication
phase: Phase 2
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# Authentication

Authentication is the first thing judges interact with.

If it's broken, confusing, or slow — they're already skeptical before they've seen your actual product.

If it's smooth — they carry that impression into everything else.

You have one goal: get the judge into your app in under 10 seconds, without friction.

---

## Hackathon Auth Priorities

Forget everything you know about enterprise auth. Here is what matters:

1. **It works reliably** — no broken flows during demo
2. **It looks polished** — branded, not boilerplate
3. **It's fast** — one tap preferred, form entry as last resort
4. **It doesn't block the demo** — consider a guest path

That's it. Security depth, MFA, session rotation — none of that matters in 48 hours.

---

## Choose Your Auth Strategy

| Strategy | Setup Time | Demo Experience | When to Use |
|---|---|---|---|
| **Google Sign-In** | ~30 min | One tap, instant | Best default for most apps |
| **Apple Sign-In** | ~45 min | One tap, iOS native | Required if on iOS App Store |
| **Email + Password** | ~20 min | Form entry, slower | When social auth doesn't fit |
| **Magic Link (email)** | ~25 min | Frictionless, no password | Clean, modern feel |
| **Anonymous / Guest** | ~10 min | Zero friction | Best for demos where auth isn't the point |
| **Phone OTP** | ~30 min | Native mobile feel | When phone number is part of your UX |

> **Default recommendation:** Google Sign-In + Anonymous guest access. One tap for judges who want to log in, zero friction for those who don't.

---

## The Demo Problem

Most judges will not create an account.

They will tap your login screen, look for the fastest path in, and if they have to type an email and password they will feel friction before they've seen anything.

**Fix this with one of:**

- A "Continue with Google" button (one tap)
- A "Try as Guest" button (zero taps)
- A pre-filled demo account button

```
// Pre-filled demo credentials approach
<TouchableOpacity onPress={() => signIn('demo@kontxt.app', 'demo1234')}>
  <Text>Use Demo Account</Text>
</TouchableOpacity>
```

>  For your live demo presentation, be signed in before you walk up. Never type credentials in front of judges.

---

## Firebase Auth (Recommended)

Firebase Auth works with Firestore out of the box. If you picked Firestore for your database, Firebase Auth is the obvious pairing.

**What you get free:**
- Google, Apple, GitHub, phone, email/password, anonymous — all built in
- JWT tokens managed automatically
- User object available across the app with one listener
- Works with Firestore security rules natively

### Setup Prompt

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app using Firebase. Set up Firebase Auth with:
- Google Sign-In
- Anonymous guest access
- An AuthContext / provider that exposes: user, loading, signInWithGoogle, signInAsGuest, signOut
- A root-level navigator that shows AuthScreen when signed out and AppNavigator when signed in
- On first Google sign-in, create a user document in Firestore /users/{uid} with: uid, email, displayName, photoURL, createdAt
>
> Keep it clean and minimal. No unnecessary abstraction.

---

## Supabase Auth

If you chose Supabase for your database, use Supabase Auth. Do not mix auth providers.

Supabase Auth supports: email/password, magic link, Google, Apple, GitHub, and phone OTP.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app using Supabase. Set up Supabase Auth with:
- Google OAuth
- Email magic link as fallback
- A useAuth hook that exposes: session, user, loading, signInWithGoogle, signInWithMagicLink, signOut
- Deep link handling for magic link redirect on mobile
- On first sign-in, upsert a row in the public.users table with: id, email, display_name, avatar_url, created_at
>
> Keep it minimal and demo-ready.

---

## Auth Screen Design

Your auth screen is a product screen. Treat it like one.

**Must have:**
- Your app name / logo prominently placed
- One primary CTA (Google Sign-In or your fastest path)
- Guest / demo access below the fold
- Clean background that matches your design system

**Must not have:**
- Placeholder text as your only branding
- Raw Firebase UI components unstyled
- Three different auth options at equal visual weight (pick a primary)
- A "Sign Up" and "Sign In" split before the user has seen the app

```
Copy Prompt ↓
```

> Design a React Native / Flutter authentication screen for my app called [App Name]. The design system uses [your colors and fonts]. The screen should have:
- App logo/wordmark at top
- Tagline: [your one-line description]
- Primary CTA: "Continue with Google" button with Google icon
- Secondary: "Continue as Guest" text button
- Clean, minimal layout — nothing that looks like a boilerplate auth screen
>
> Use StyleSheet.create / Flutter widgets. No third-party UI libraries.

---

## Validate the Generated Auth Flow

AI-generated auth code has consistent failure modes. Check these before moving on:

| Issue | What to Check |
|---|---|
| No loading state during sign-in | Button should disable and show spinner while auth resolves |
| No error handling | What happens if Google sign-in is cancelled? If network fails? |
| Auth state flickers on load | Should show a splash/loading screen while auth state initialises |
| User document not created on first sign-in | Firestore/Supabase user record missing after OAuth |
| Deep links not configured | Magic links and OAuth redirects silently fail on mobile without proper scheme setup |
| signOut doesn't clear local state | User appears logged in after signing out |

---

## Auth State Management

The auth listener should live at the root of your app. Everything else subscribes to it.

**React Native pattern:**
```
App
 └─ AuthProvider (holds user, loading)
     └─ RootNavigator
         ├─ AuthStack (if !user)
         │   └─ LoginScreen
         └─ AppStack (if user)
             └─ HomeScreen, ProfileScreen, ...
```

**Flutter pattern:**
```
MaterialApp
 └─ StreamBuilder<User?>(stream: FirebaseAuth.instance.authStateChanges())
     ├─ LoadingScreen (while waiting)
     ├─ LoginScreen (if null)
     └─ HomeScreen (if user)
```

> Never gate screens with manual boolean flags. Use the auth state stream directly. Flags get out of sync. Streams don't.

---

## Anonymous Auth for Demo Polish

Anonymous auth is underused in hackathons. It is powerful.

Users tap "Try as Guest," get a real anonymous Firebase UID, can use the full app, and can optionally upgrade to a real account later.

Their data persists until they sign out. For a demo, this is perfect — judges can explore without commitment.

```js
// React Native
import { getAuth, signInAnonymously } from 'firebase/auth';
await signInAnonymously(getAuth());
```

```dart
// Flutter
await FirebaseAuth.instance.signInAnonymously();
```

That's it. Your Firestore security rules already work with anonymous UIDs.

---

## Implementation Checklist

- [ ] Auth provider chosen and SDK installed
- [ ] Google Sign-In working on physical device
- [ ] Guest / anonymous path working
- [ ] Auth screen matches design system (not default boilerplate)
- [ ] Loading state shown during sign-in
- [ ] Error states handled (cancelled, network failure)
- [ ] User document created in DB on first sign-in
- [ ] Auth state listener at app root — no manual flags
- [ ] signOut clears state and returns to auth screen
- [ ] Deep links configured if using magic link or OAuth redirect
- [ ] Demo account or pre-signed-in state ready for live presentation

---

## What Breaks Demos

| Mistake | Consequence |
|---|---|
| Typing credentials live | Looks unpolished, typo risk |
| No guest path | Judges bounce at login |
| OAuth not configured for release build | Works in dev, breaks in demo APK/IPA |
| Auth screen looks like template | First impression is "this is unfinished" |
| Missing loading state | Auth feels broken during the ~2s Google flow |
| SHA-1 fingerprint missing (Android + Firebase) | Google Sign-In silently fails on device |

>  Android + Firebase + Google Sign-In requires your debug SHA-1 fingerprint registered in the Firebase console. This is the single most common reason Google Sign-In works in Expo Go but fails in a standalone build. Do this now, not at 3am.

---

## Next Step

Authentication is done when a judge can go from your auth screen to your home screen in under 10 seconds without typing anything.

Move to **Backend** (Phase 3) next.
