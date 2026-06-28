---
title: Analytics
slug: analytics
phase: Phase 6
mode: production
projectType: web-app
estimatedTime: 20–30 min
---

# Analytics

Observability tells you when your system is broken. Analytics tells you whether your product is working.

They are not the same thing. A perfectly healthy server can be running a product that nobody uses, nobody understands, and nobody returns to. Analytics is how you find out — and how you make decisions that are grounded in what users actually do, not what you assume they do.

---

## What Analytics Actually Answers

| Question | Type |
|---|---|
| How many users signed up this week? | Acquisition |
| Where do users drop off during onboarding? | Activation |
| Which features do users return for? | Retention |
| What does a power user do differently? | Behavior |
| Which page has the highest exit rate? | UX / Friction |
| Did this deploy change conversion? | Impact |

Define which questions matter to your business before choosing tools. The wrong questions produce data that feels interesting but drives no decisions.

---

## Choosing Your Analytics Stack

| Tool | Best For | Cost |
|---|---|---|
| **PostHog** | Product analytics + feature flags + session replay | Free to 1M events/mo |
| **Mixpanel** | Event-based funnel and retention analysis | Free to 20M events/mo |
| **Amplitude** | Enterprise-grade behavioral analytics | Free tier available |
| **Plausible** | Privacy-first, simple traffic analytics | $9/mo |
| **Google Analytics 4** | Traffic + basic events, free | Free (you are the product) |

**Recommendation for most production web apps:** PostHog. It combines product analytics, session replay, feature flags, and A/B testing in one tool. Self-hostable. Privacy-compliant. The free tier covers most early-stage products.

---

## Part 1: Event Architecture

Before writing a single line of tracking code, define your event taxonomy. Retrofitting this is painful.

### The Verb-Noun Convention

```
[Actor] [verb]_[noun]

user_signed_up
user_logged_in
project_created
project_shared
file_uploaded
subscription_started
subscription_cancelled
payment_failed
onboarding_completed
feature_discovered
```

Rules:
- **Past tense** — events describe things that happened
- **Snake case** — consistent across platforms
- **Specific** — `project_created` not `button_clicked`
- **Actor-implied** — the user is always the actor; omit it from the name

### Event Properties

Every event should carry properties that let you filter and segment later:

```typescript
// Good event with rich properties
analytics.track('project_created', {
  projectId: project.id,
  projectType: project.type,          // template | blank
  teamSize: project.memberCount,
  plan: user.plan,                    // free | pro | enterprise
  daysFromSignup: daysSince(user.createdAt),
  source: req.headers['referer'],     // Where they came from
});

// Bad event — tells you nothing useful
analytics.track('button_clicked', {
  button: 'create',
});
```

### Events to Track on Every App

```
Acquisition:
  user_signed_up          { plan, source, referral }
  user_logged_in          { method: 'email' | 'google' | 'github' }
  user_invited            { role }

Activation:
  onboarding_started      { step: 1 }
  onboarding_step_completed { step, stepName, duration }
  onboarding_completed    { totalDuration, stepsSkipped }
  first_[core_action]     { ... }   ← Your app's key activation moment

Engagement:
  [core_feature]_used     { ... }
  [secondary_feature]_used { ... }
  search_performed        { query, resultCount }

Retention risk:
  user_idle               { daysSinceLastAction }   ← Trigger re-engagement

Revenue:
  subscription_started    { plan, billingCycle, amount }
  subscription_upgraded   { fromPlan, toPlan, amount }
  subscription_cancelled  { plan, reason, daysActive }
  payment_failed          { plan, errorCode }

Churn signals:
  export_initiated        { format }   ← Often precedes cancellation
  account_deletion_requested { reason }
```

---

## Part 2: Backend Implementation

Track server-side for events that must be accurate. Client-side tracking can be blocked by ad blockers, disabled by users, or skipped if JS fails to load. Revenue and conversion events belong on the server.

```bash
npm install posthog-node
```

```typescript
// lib/analytics.ts
import { PostHog } from 'posthog-node';

let client: PostHog | null = null;

export function getAnalytics(): PostHog {
  if (!client) {
    client = new PostHog(process.env.POSTHOG_API_KEY!, {
      host: process.env.POSTHOG_HOST ?? 'https://app.posthog.com',
      flushAt: 20,      // Batch events before sending
      flushInterval: 5000, // Or send every 5 seconds
    });
  }
  return client;
}

export async function shutdownAnalytics(): Promise<void> {
  await client?.shutdown(); // Flush remaining events on process exit
}

// Typed event tracking
type AnalyticsEvent =
  | { event: 'user_signed_up'; properties: { plan: string; source?: string } }
  | { event: 'subscription_started'; properties: { plan: string; amount: number; billingCycle: string } }
  | { event: 'subscription_cancelled'; properties: { plan: string; reason?: string; daysActive: number } }
  | { event: 'payment_failed'; properties: { plan: string; errorCode: string } }
  | { event: 'project_created'; properties: { projectType: string; daysFromSignup: number } }
  | { event: 'onboarding_completed'; properties: { totalDuration: number } };

export function track(userId: string, payload: AnalyticsEvent): void {
  getAnalytics().capture({
    distinctId: userId,
    event: payload.event,
    properties: {
      ...payload.properties,
      $timestamp: new Date().toISOString(),
    },
  });
}

export function identify(userId: string, traits: Record<string, unknown>): void {
  getAnalytics().identify({
    distinctId: userId,
    properties: {
      ...traits,
      updatedAt: new Date().toISOString(),
    },
  });
}
```

```typescript
// Usage in service layer
import { track, identify } from '../lib/analytics';

export async function createUser(data: CreateUserInput) {
  const user = await prisma.user.create({ data });

  // Identify sets persistent user properties
  identify(user.id, {
    email: user.email,   // PostHog — stored server-side, not in browser
    name: user.name,
    plan: user.plan,
    createdAt: user.createdAt,
  });

  // Track the event
  track(user.id, {
    event: 'user_signed_up',
    properties: { plan: user.plan, source: data.referralSource },
  });

  return user;
}

export async function cancelSubscription(userId: string, reason?: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { subscription: true },
  });

  await stripeService.cancelSubscription(user.subscription.stripeId);
  await prisma.subscription.update({ where: { userId }, data: { status: 'cancelled' } });

  track(userId, {
    event: 'subscription_cancelled',
    properties: {
      plan: user.subscription.plan,
      reason,
      daysActive: daysSince(user.subscription.startedAt),
    },
  });
}
```

---

## Part 3: Frontend Implementation

Client-side tracking complements server-side. Use it for UI interactions that don't have backend counterparts.

```bash
npm install posthog-js
```

```typescript
// lib/analytics.client.ts
import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false,       // Disable — noisy and low-signal
    session_recording: {
      maskAllInputs: true,    // Never record what users type
      maskInputOptions: {
        password: true,
        email: true,
      },
    },
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') {
        ph.opt_out_capturing(); // Don't pollute prod data with dev events
      }
    },
  });
}

export function trackClient(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}

export function identifyClient(userId: string, traits?: Record<string, unknown>) {
  posthog.identify(userId, traits);
}

export function resetAnalyticsUser() {
  posthog.reset(); // Call on logout
}
```

```typescript
// In your auth provider — after login
identifyClient(user.id, { plan: user.plan, role: user.role });

// In your logout handler
resetAnalyticsUser();
```

> **`autocapture: false`** — PostHog's autocapture records every click, form submission, and page change automatically. It generates massive volume of low-signal events and can accidentally capture PII from form inputs. Define your events explicitly.

---

## Part 4: Privacy & Compliance

Analytics and privacy are in tension. Handle this deliberately.

### What Not to Track

```typescript
// ❌ Never track PII in event properties
track(userId, {
  event: 'user_signed_up',
  properties: {
    email: user.email,        // PII — use identify() instead
    ipAddress: req.ip,        // PII
    creditCard: '4242...',    // Obvious
  },
});

// ✅ Use identify() for persistent user attributes
identify(userId, { plan: user.plan, role: user.role });

// ✅ Use anonymous IDs for pre-auth flows
posthog.capture('signup_flow_started', {
  anonymousId: posthog.get_distinct_id(), // PostHog generates this
});
```

### Cookie Consent

If you have EU users, you need explicit consent before setting analytics cookies.

```typescript
// lib/consent.ts
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('analytics_consent') === 'granted';
}

export function grantConsent() {
  localStorage.setItem('analytics_consent', 'granted');
  posthog.opt_in_capturing();
}

export function revokeConsent() {
  localStorage.setItem('analytics_consent', 'denied');
  posthog.opt_out_capturing();
  posthog.clear_opt_in_out_capturing();
}
```

```tsx
// components/CookieBanner.tsx
export function CookieBanner() {
  const [visible, setVisible] = useState(!hasAnalyticsConsent());

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent">
      <p>We use analytics to improve the product.</p>
      <button onClick={() => { grantConsent(); setVisible(false); }}>Accept</button>
      <button onClick={() => { revokeConsent(); setVisible(false); }}>Decline</button>
    </div>
  );
}
```

---

## Part 5: The Metrics That Matter

Define three to five core metrics before launch. More than five and nothing gets actioned.

### North Star Metric

One number that best captures whether your product is delivering value.

```
SaaS tool:       Weekly Active Users who complete [core action]
Marketplace:     Successful transactions per week
Content app:     Articles read per user per week
Collaboration:   Teams with 2+ active members
```

### Supporting Metrics

```
Acquisition:  Signups per week
Activation:   % of signups who complete onboarding within 7 days
Retention:    % of users active in week 4 who were active in week 1
Revenue:      MRR, churn rate
```

### What to Ignore Early On

```
❌ Pageviews           — vanity metric, low signal
❌ Time on site        — ambiguous (engaged or confused?)
❌ Social shares       — rarely correlated with revenue
❌ App store rating    — lagging indicator
```

---

## Implementation Checklist

- [ ] Event taxonomy defined before writing tracking code
- [ ] Event names follow verb-noun convention in past tense
- [ ] Server-side tracking in place for revenue and conversion events
- [ ] Client-side tracking initialized with `autocapture: false`
- [ ] Session recording masks all input fields
- [ ] `identify()` called after login with non-PII user traits
- [ ] `reset()` called on logout
- [ ] Development environment opted out of capturing
- [ ] Analytics shut down gracefully on process exit (flushes buffer)
- [ ] Cookie consent banner implemented for EU compliance
- [ ] North star metric and 3–5 supporting metrics defined
- [ ] No PII (email, IP, card data) in event properties

---

## AI Prompt: Event Plan

```
You are a senior product analyst helping design an analytics event plan for a production web application.

Application type: [describe your app in 2-3 sentences]
Core user action: [the one thing users come back to do]
Business model: [subscription | transactional | freemium | etc.]

Generate:
1. A list of 15–20 events I should track, using verb_noun past-tense convention
2. For each event: the 3–5 most useful properties to capture
3. The single north star metric for this application
4. Three retention signals — behaviors that predict whether a user will still be active in 30 days
5. Three churn signals — behaviors that predict cancellation within 14 days

Be specific to this application type. No generic advice.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Tracking everything from day one | Data overload, analysis paralysis | Define 15–20 core events only |
| Only client-side tracking | Ad blockers lose revenue events | Server-side for all conversion events |
| PII in event properties | GDPR violation | Use `identify()` for user attributes |
| `autocapture: true` | Noisy data, accidental PII capture | Disable, track explicitly |
| No consent mechanism | GDPR/PECR non-compliance for EU users | Implement cookie banner |
| Tracking in development | Pollutes production data | Opt out in dev environment |
| Not calling `reset()` on logout | Events attributed to wrong user | Always reset on logout |
| Vanity metrics as north star | Optimizing for the wrong thing | Tie north star to value delivery |

---

## Next: SEO →

With analytics in place to measure growth, SEO determines whether users can find you organically in the first place.
