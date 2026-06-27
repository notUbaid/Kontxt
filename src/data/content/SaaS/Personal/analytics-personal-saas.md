---
title: Analytics
slug: analytics
phase: Phase 3
mode: personal
projectType: saas
estimatedTime: 20–25 min
---

# Analytics

Most founders instrument everything and learn nothing.

They add analytics on day one, watch numbers go up and down, and never change a single decision because of it. That's not analytics — that's dashboards as comfort.

Analytics is useful only when you know what question you're trying to answer before you look at the data.

---

## Two Types of Analytics

| Type | What it answers | Tool |
|---|---|---|
| **Product analytics** | What are users doing inside the app? | PostHog, Mixpanel, Amplitude |
| **Web analytics** | Where is traffic coming from? How many visitors? | Plausible, Fathom, Google Analytics |

For a personal SaaS, you likely need both — but they serve different questions. Don't conflate them.

---

## Provider Choice

### Product Analytics

| Provider | Free tier | Best for |
|---|---|---|
| **PostHog** | 1M events/month free | Best all-in-one: events, funnels, session replay, feature flags |
| **Mixpanel** | 20M events/month free | Strong funnel and cohort analysis |
| **Amplitude** | 50K MTUs free | Enterprise-grade, complex to set up |

> **Recommendation: PostHog.** Generous free tier, self-hostable, ships with session replay, feature flags, A/B testing, and funnel analysis. One tool replacing five.

### Web Analytics

| Provider | Free tier | Best for |
|---|---|---|
| **Plausible** | Paid only ($9/mo) | Privacy-first, GDPR-compliant, beautiful UI |
| **Fathom** | Paid only ($14/mo) | Simpler than Plausible, fast |
| **Google Analytics 4** | Free | Most powerful, most complex, privacy concerns |
| **PostHog** | Included | Web analytics built in if already using PostHog |

> If you're using PostHog for product analytics, enable its web analytics — no second tool needed.

---

## What to Track

Define your questions before your events. Work backwards.

**Start with your activation funnel:**

```
Visitor lands on marketing page
         ↓
Signs up
         ↓
Completes onboarding
         ↓
Creates first [core object]     ← the moment they get value
         ↓
Returns within 7 days           ← retained
```

Every event you track should connect to one stage in this funnel. If an event doesn't help you understand or improve a stage, don't track it yet.

---

## The Events Your SaaS Needs

Start with these. Add more only when a specific question requires it.

| Event | When it fires | Properties |
|---|---|---|
| `user_signed_up` | On signup completion | `method` (email/google/github) |
| `onboarding_completed` | User finishes onboarding flow | `steps_completed`, `time_taken_seconds` |
| `[core_object]_created` | First value moment | `workspace_id`, `source` |
| `[core_object]_deleted` | Deletion (churn signal) | `workspace_id`, `age_days` |
| `subscription_started` | Payment succeeded | `plan`, `billing_interval` |
| `subscription_cancelled` | User cancels | `plan`, `reason` (if you ask) |
| `feature_used` | Key feature interactions | `feature_name`, `workspace_id` |

Replace `[core_object]` with your actual entity — `project_created`, `report_generated`, `document_published`.

> Track the **moments that matter**, not every click. Click tracking without context produces noise.

---

## Setup: PostHog

```bash
npm install posthog-js posthog-node
```

**Client-side (browser):**

```tsx
// app/providers.tsx
"use client"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { useEffect } from "react"

export function Analytics({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

**Server-side (Node.js/backend events):**

```typescript
// lib/analytics.ts
import { PostHog } from "posthog-node"

export const analytics = new PostHog(process.env.POSTHOG_KEY!, {
  host: process.env.POSTHOG_HOST ?? "https://app.posthog.com",
  flushAt: 1,         // send immediately in serverless environments
  flushInterval: 0,
})
```

---

## Identifying Users

Anonymous events are mostly useless. Identify users as soon as they log in.

```tsx
// Call this once after login/session start
"use client"
import { usePostHog } from "posthog-js/react"
import { useEffect } from "react"

export function IdentifyUser({ user }: { user: User }) {
  const posthog = usePostHog()

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
        plan: user.subscription?.plan ?? "free",
        created_at: user.createdAt,
      })
    }
  }, [user.id])

  return null
}
```

Once identified, all past anonymous events from that session get merged with the user's profile.

---

## Tracking Events

**Client-side events** — UI interactions:

```tsx
"use client"
import { usePostHog } from "posthog-js/react"

export function CreateWorkspaceButton() {
  const posthog = usePostHog()

  function handleClick() {
    posthog.capture("workspace_creation_started", {
      source: "dashboard_empty_state",
    })
    router.push("/workspaces/new")
  }

  return <Button onClick={handleClick}>Create workspace</Button>
}
```

**Server-side events** — actions triggered by business logic:

```typescript
// services/workspace.service.ts
import { analytics } from "@/lib/analytics"

export async function createWorkspace(userId: string, data: CreateWorkspaceInput) {
  const workspace = await db.workspace.create({ data: { ...data, ownerId: userId } })

  // Track after successful creation
  analytics.capture({
    distinctId: userId,
    event: "workspace_created",
    properties: {
      workspace_id: workspace.id,
      workspace_name: workspace.name,
    },
  })

  return workspace
}
```

> Server-side events are more reliable than client-side. Ad blockers, browser extensions, and network issues can drop client events. Track critical business events (subscriptions, creations, deletions) server-side.

---

## The Metrics That Actually Matter

For a personal SaaS in early stages, track these. Nothing else.

| Metric | What it tells you | How to measure |
|---|---|---|
| **Activation rate** | % of signups who reach first value | `onboarding_completed` / `user_signed_up` |
| **Day 7 retention** | % of users who return after a week | Cohort retention in PostHog |
| **Feature adoption** | Which features get used | `feature_used` event breakdown |
| **Churn events** | Where users drop off | Funnel analysis |
| **MRR** | Revenue | Stripe dashboard (not PostHog) |

Vanity metrics to ignore early: total pageviews, total signups (without activation), social shares, time on site.

---

## Privacy and Compliance

Analytics that violate user privacy are a legal and trust liability.

**What PostHog collects by default:**
- IP address (can be anonymized)
- Browser and OS
- Referrer
- Pages visited
- Events you explicitly track

**What you must do:**
- Disclose analytics in your privacy policy
- Offer opt-out if operating in the EU (GDPR)
- Do not track sensitive data (health info, payment details, passwords)
- Do not send PII as event properties unless necessary

```typescript
// Anonymize IP addresses in PostHog
posthog.init(key, {
  // ...
  ip: false,  // don't capture IP
})
```

> If any users are in the EU, you technically need cookie consent for client-side analytics. PostHog offers a cookieless mode: `persistence: "memory"`. Use it if GDPR compliance matters to you.

---

## Session Replay

PostHog includes session replay — video-like recordings of user sessions showing exactly what they clicked, scrolled, and typed.

Enable it:

```typescript
posthog.init(key, {
  session_recording: {
    maskAllInputs: true,      // hide everything typed in inputs
    maskInputOptions: {
      password: true,         // always mask passwords
    },
  },
})
```

Session replay is one of the most valuable tools for a solo founder. When a user drops off during onboarding, you watch exactly where they got confused — no guessing.

> ⚠️ `maskAllInputs: true` is mandatory. Recording unmasked form inputs captures passwords, credit card numbers, and personal data. Never ship session replay without it.

---

## Feature Flags

PostHog includes feature flags — ship code to a percentage of users before rolling out fully.

```typescript
// Server-side flag check
const isEnabled = await analytics.isFeatureEnabled("new-dashboard", userId)

if (isEnabled) {
  // show new experience
}
```

For a personal SaaS, use flags to:
- Roll out new features to yourself first
- A/B test onboarding flows
- Give early access to specific users

---

## Analytics Prompt

```prompt
You are a senior product engineer helping me define an analytics instrumentation plan for my SaaS.
My SaaS: [what your app does]
Analytics tool: PostHog
Core user journey: [describe the steps from signup to getting value]
My key questions:
1. Where do users drop off before activating?
2. Which features drive retention?
3. What does a churned user look like vs a retained one?
Please generate:
1. A complete event taxonomy (event name, when it fires, required properties)
2. The activation funnel definition (which events mark each stage)
3. The 3–5 metrics I should review weekly and what each tells me
4. Which events must be server-side vs client-side and why
5. Any privacy considerations for my specific use case
```

---

## Validating Your Analytics Setup

Before going live:

- [ ] PostHog project created and keys added to `.env`
- [ ] `Analytics` provider wrapping app layout
- [ ] `IdentifyUser` called on every authenticated page load
- [ ] Core events tracked: signup, activation, core object creation, subscription
- [ ] Server-side events in service layer for critical business actions
- [ ] Session replay enabled with `maskAllInputs: true`
- [ ] Privacy policy updated to mention analytics
- [ ] IP anonymization enabled if serving EU users
- [ ] Test: fire events in dev, verify they appear in PostHog Live Events view
- [ ] Activation funnel configured in PostHog dashboard

---

## Implementation Checklist

- [ ] PostHog account created
- [ ] `posthog-js` and `posthog-node` installed
- [ ] Client-side provider configured in `app/providers.tsx`
- [ ] Server-side client in `lib/analytics.ts`
- [ ] User identification on login
- [ ] Event taxonomy documented (even a simple table is enough)
- [ ] All critical events tracked server-side
- [ ] Session replay enabled and input masking confirmed
- [ ] Weekly metrics defined — know what you'll look at and why

---

## What to Build Next

Analytics running. You can now see what users do, where they drop off, and which features get used.

Phase 3 Development is complete. Next is **Phase 4 — Production Lite**: performance, backups, deployment, and the security basics that make your SaaS safe to ship to real users.
