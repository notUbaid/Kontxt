---
title: Analytics
slug: analytics
phase: Phase 5
mode: personal
projectType: web-app
estimatedTime: 20–30 min
---

# Analytics

Analytics answer one question: is anyone using this, and are they doing what you built it for?

Without data, you're guessing. With too much data, you're drowning in dashboards instead of building. For a personal project, you need just enough signal to make good decisions.

---

## What You Actually Need to Know

Before picking a tool, decide what questions matter.

| Question | What It Tells You |
|---|---|
| How many people visit? | Whether your launch worked |
| Which pages do they visit? | What they care about |
| Where do they drop off? | Where the experience breaks |
| Where do they come from? | Which channels work |
| Do they come back? | Whether the core value is there |

You don't need heatmaps, session recordings, or funnel visualisations yet. You need page views, sources, and retention. Everything else is noise until you have users.

---

## Pick Your Tool

| Tool | Best For | Privacy | Free Tier | Setup |
|---|---|---|---|---|
| **Vercel Analytics** | Next.js, zero config | Good | Generous | 2 minutes |
| **Plausible** | Privacy-first, clean UI | Excellent | Paid ($9/mo) | 5 minutes |
| **Umami** | Self-hosted, full control | Excellent | Free (self-host) | 30 minutes |
| **PostHog** | Product analytics + events | Good | Generous | 15 minutes |
| **Google Analytics 4** | Detailed, widely used | Poor | Free | 20 minutes |

**Recommendation for a personal project:**

Start with **Vercel Analytics**. It's already in your infrastructure, takes two minutes to enable, and gives you the core metrics without any privacy concerns or cookie banners.

Add **PostHog** if you need custom events (button clicks, feature usage, conversion tracking). Its free tier is generous and it's the best product analytics tool that isn't GA4.

Avoid GA4 for personal projects unless you specifically need it. It's complex, privacy-invasive, and requires cookie consent banners in most jurisdictions.

---

## Vercel Analytics Setup

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

Enable in Vercel dashboard → Project → Analytics → Enable.

That's it. You now have page views, unique visitors, top pages, and traffic sources. No cookies. No consent banner needed.

---

## Custom Event Tracking with PostHog

Page views tell you where people go. Events tell you what they do.

```bash
npm install posthog-js
```

```typescript
// lib/posthog.ts
import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window === 'undefined') return

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: false,  // we'll handle this manually with Next.js router
    persistence: 'localStorage',
  })
}

export { posthog }
```

```typescript
// app/providers.tsx
'use client'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initPostHog, posthog } from '@/lib/posthog'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    if (pathname) {
      posthog.capture('$pageview', { $current_url: window.location.href })
    }
  }, [pathname, searchParams])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  )
}
```

**Tracking events:**

```typescript
import { posthog } from '@/lib/posthog'

// Track a meaningful action
function handleCreatePost() {
  posthog.capture('post_created', {
    has_image: !!imageUrl,
    word_count: content.split(' ').length,
  })
  await createPost(data)
}

// Track a conversion
function handleUpgrade() {
  posthog.capture('upgrade_clicked', { plan: 'pro', source: 'dashboard_banner' })
}
```

---

## What Events to Track

Less is more. Track events that answer real questions, not everything that moves.

**Track these:**

```
sign_up_completed        → Is acquisition working?
onboarding_finished      → Are users getting to the core value?
[core_action]_created    → Are they using the main feature?
[core_action]_shared     → Are they getting value from it?
upgrade_clicked          → Conversion intent (if monetised)
error_encountered        → Where are users hitting walls?
```

**Don't track these yet:**
- Every button click
- Every page scroll
- Every hover
- Internal admin actions

> [!TIP]
> Name events as `noun_verb` in past tense: `post_created`, `comment_deleted`, `profile_updated`. Consistent naming makes your analytics dashboard readable six months later.

---

## Identifying Users

Link analytics events to actual users so you can understand behaviour at the individual level.

```typescript
// After sign in — identify the user in PostHog
import { posthog } from '@/lib/posthog'

async function handleSignIn(user: User) {
  posthog.identify(user.id, {
    email: user.email,
    name: user.name,
    created_at: user.createdAt,
    plan: user.plan,
  })
}

// After sign out — reset the session
function handleSignOut() {
  posthog.reset()
}
```

> [!WARNING]
> Only send properties you genuinely need for analysis. Don't send sensitive fields like passwords, payment details, or private content. PostHog's data is stored on their servers.

---

## Privacy Considerations

Even for a personal project, respecting user privacy is the right call — and increasingly a legal requirement.

**Minimum requirements:**

If you use Vercel Analytics or Plausible: no cookie banner needed, no consent required. These tools are cookieless and don't track individuals.

If you use PostHog or GA4: you need a privacy policy and, depending on your users' location, cookie consent. GDPR (EU), CCPA (California), and PIPEDA (Canada) all apply if you have users from those regions.

**A practical approach:**

```typescript
// Only initialise PostHog after the user has accepted analytics
// OR use PostHog's cookieless mode
posthog.init(key, {
  persistence: 'memory',  // cookieless — loses identity between sessions
  // OR
  opt_out_capturing_by_default: true,  // opt-in model
})

// Opt in after consent
posthog.opt_in_capturing()
```

For most personal projects: use Vercel Analytics for page views (no consent needed) and be thoughtful about what you put in PostHog.

---

## Reading Your Data

Data is only useful if you look at it. Don't set up dashboards and never open them.

**Weekly, look at:**
- Unique visitors this week vs last week
- Top pages — are people finding what you built?
- Traffic sources — what's driving visitors?
- Drop-off points — where are people leaving?

**After shipping a feature, look at:**
- Did the event fire? (Confirms the tracking works)
- How many users triggered it in the first week?
- Did it change retention or engagement?

**Questions to ask when numbers are flat:**
- Are people finding the app? (source data)
- Are they reaching the core feature? (funnel)
- Are they coming back? (retention)

The answer to each question points to a different fix.

---

## Analytics Setup Checklist

- [ ] Page view tracking active (Vercel Analytics or equivalent)
- [ ] Core user actions tracked as named events
- [ ] Users identified after sign-in (if using PostHog)
- [ ] Session reset on sign-out
- [ ] Privacy policy exists if using cookie-based analytics
- [ ] No sensitive data sent to analytics providers
- [ ] Event names follow consistent `noun_verb` convention
- [ ] Analytics confirmed working in production (check dashboard after a real visit)

---

## What Comes Next

With analytics running you can make data-driven decisions instead of guessing.

**Launch Checklist** is next — the final gate before you share your app with the world.
