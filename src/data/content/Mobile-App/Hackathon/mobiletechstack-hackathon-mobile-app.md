---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: hackathon
projectType: mobile-app
estimatedTime: 15–20 min
---

# Tech Stack

The best hackathon stack is the one your team already knows.

This is not the time to learn a new framework, try an unfamiliar language, or experiment with an architecture you read about last week. Novelty in your stack costs hours you do not have. Use what your team can move fast in.

That said — fast choices made without thinking are how teams end up debugging a React Native environment setup at hour 6 instead of building features. Make this decision deliberately, then lock it.

---

## The Decision Framework

Answer these three questions before picking anything:

**1. What does your team know?**
Not "could learn quickly." Actually knows. Can debug at 2am without Stack Overflow.

**2. Does your app need a real native device experience?**
Camera, biometrics, Bluetooth, background location, NFC, AR — these require native access. If your wow moment depends on any of these, your stack choice is constrained.

**3. What is your demo format?**
Are judges watching on a real phone? A simulator? A screen share? The answer affects how much the native feel of your UI actually matters.

---

## Mobile Stack Options

### Option A — Expo (React Native)
**Best for:** Teams with React experience. The fastest path to a real mobile app.

```
Framework:  Expo SDK (managed workflow)
Language:   TypeScript
Styling:    NativeWind (Tailwind for React Native)
Navigation: Expo Router
State:      Zustand or React Context
```

**Why Expo in a hackathon:**
- Zero native build toolchain setup
- Instant QR code preview on real devices
- Huge component ecosystem
- EAS Build for APK if needed for submission

**Limitations:**
- Some deep native APIs require ejecting (but most hackathon features do not)
- UI is not pixel-identical to native iOS/Android

---

### Option B — Flutter
**Best for:** Teams with Dart/Flutter experience. Produces the most visually polished native-feeling UI.

```
Framework:  Flutter
Language:   Dart
Styling:    Flutter theming + custom widgets
Navigation: go_router
State:      Riverpod or Bloc
```

**Why Flutter in a hackathon:**
- Beautiful UI out of the box — competitive advantage in visual demos
- Hot reload is fast
- Single codebase for iOS and Android
- Strong animation support for wow moments

**Limitations:**
- Dart knowledge required — do not pick this if your team does not already know it
- Larger initial setup time than Expo

---

### Option C — Web App (PWA / Responsive)
**Best for:** Teams with strong web skills and a demo that does not require native device features.

```
Framework:  Next.js or Vite + React
Styling:    Tailwind CSS
Deployment: Vercel (instant, free)
```

**Why this works in a hackathon:**
- Zero mobile build complexity
- Instant deployment — shareable link in minutes
- Judges can interact on any device via browser
- Full web API access (camera via browser, geolocation, etc.)

**When to pick this:**
- Your demo works in a browser
- Your team is stronger in web than mobile
- You need to deploy fast and reliably

> **Honest take:** Many "mobile app" hackathon winners are responsive web apps running in a mobile browser. If your core experience works in a browser and your team is a web team — this is often the fastest path to a polished demo.

---

### Option D — Native (Swift / Kotlin)
**Best for:** Teams with dedicated iOS or Android engineers who know the platform deeply.

Do not pick native if your team does not have at least one strong platform-specific engineer. The build toolchain, debugging, and deployment complexity will consume your hackathon.

---

## Backend Options

Your backend choice should match the complexity of your app's server-side needs.

| Need | Recommendation |
|---|---|
| Simple CRUD + auth | Supabase or Firebase — zero backend code |
| AI features (LLM calls) | FastAPI (Python) — fastest for AI integrations |
| Custom logic + REST API | Express (Node.js) or Hono — fast to write, easy to deploy |
| No backend needed | Store state client-side or use a BaaS entirely |

### BaaS (Backend as a Service) — recommended for most hackathons

**Supabase**
- PostgreSQL database + auto-generated REST and realtime APIs
- Auth built in (email, OAuth)
- Storage built in
- Free tier is sufficient for any hackathon

**Firebase**
- Firestore (NoSQL) + Realtime Database
- Auth built in
- Fast to integrate with Expo
- Free tier is sufficient

**When to write your own backend:**
Only if your core feature requires custom server logic that a BaaS cannot handle — most commonly AI processing, complex algorithms, or webhook handling.

---

## AI Integration

If your app has an AI feature, the fastest integration path:

```
Provider:   OpenAI (GPT-4o) or Anthropic (Kontxt)
Access:     REST API — no SDK required for basic use
Pattern:    Backend calls the AI API, never the frontend directly
```

>  **Critical:** Never call an AI API directly from your mobile frontend. Your API key will be exposed. Always route AI calls through a backend endpoint — even a single serverless function.

```
Mobile App → Your Backend → AI Provider API
```

For hackathons, a single `/api/generate` endpoint that proxies your AI call is sufficient. Do not over-engineer this.

**Serverless options for a thin AI backend:**
- Vercel Functions (if web-based)
- Supabase Edge Functions
- FastAPI on Railway or Render (free tier)

---

## Deployment & Demo

**Where will judges see your app?**

| Demo Format | Best Approach |
|---|---|
| Judges use their own phone | QR code via Expo Go or TestFlight |
| Screen share / projector | Simulator on your laptop or a video recording |
| Judges access a link | PWA / web app deployed on Vercel |
| Physical device handed to judge | APK via EAS Build or sideloading |

Plan this before you start building. The worst time to discover your demo format is 30 minutes before presentation.

---

## Stack Decision Checklist

- [ ] Frontend framework chosen based on team's existing skills
- [ ] Every team member has the dev environment running locally before building
- [ ] Backend approach decided: BaaS, custom, or none
- [ ] AI API access confirmed: API keys obtained and tested
- [ ] AI calls route through backend — never directly from the client
- [ ] Demo format confirmed: how will judges interact with the app?
- [ ] Deployment target confirmed: where does the app live during the demo?
- [ ] One team member owns the deployment — not everyone, not no one

---

## The One Rule

Whatever stack you pick — **get it running with a hello world before you build anything else.**

Every team member's environment must be functional. The database must be connected. The API must return a response. Do not start building features on a foundation you have not verified works.

This takes 30–60 minutes at the start. It saves 3–4 hours of "it works on my machine" debugging mid-hackathon.

---

## What Comes Next

Stack is locked. Now you design your data model.

Next module: **Database** — the tables, fields, and relationships your app needs, designed for speed and demo-readiness.
