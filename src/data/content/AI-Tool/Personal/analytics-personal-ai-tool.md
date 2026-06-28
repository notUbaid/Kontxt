---
title: Analytics
slug: analytics
phase: Phase 5
mode: personal
projectType: ai-tool
estimatedTime: 15–20 min
---

# Analytics

You shipped your AI tool. People are using it. Now the most important question is not "does it work?" — you know it works. The question is "is it working for people?"

Analytics is how you answer that without asking every user individually. It tells you who's coming back, who's dropping off, which features get used, and where the experience breaks down. For a personal project, you don't need a sophisticated data stack. You need a few well-chosen signals that tell you whether the tool is delivering value.

---

## What You Actually Need to Know

Start with the questions, not the tools.

```
Retention:     Are people coming back after the first session?
Activation:    Do new users reach the moment where the tool feels useful?
Usage depth:   Are people using it superficially or getting real value?
Drop-off:      Where do people stop using it — and why?
Errors:        What's breaking and how often?
```

Every metric you track should answer one of these questions. Metrics that don't answer a question you're actually asking are noise.

---

## The Minimal Analytics Stack

For a personal AI tool, two tools cover everything you need.

```
PostHog (free tier)     → User behaviour, events, session recordings, funnels
Sentry (free tier)      → Errors and crashes (covered in AI Failure States module)
```

PostHog is the right choice for personal projects: generous free tier (1M events/month), open-source, self-hostable if needed, and combines product analytics, session replay, and feature flags in one tool. You do not need Mixpanel, Amplitude, or Google Analytics alongside it.

---

## Setting Up PostHog

```bash
npm install posthog-js posthog-node
```

```typescript
// lib/posthog.ts — client-side instance
import posthog from "posthog-js"

export function initPostHog() {
  if (typeof window === "undefined") return
  if (process.env.NODE_ENV !== "production") return  // Don't track in dev

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,     // GDPR: mask all input text
      maskTextSelector: ".sensitive"  // Additional masking
    }
  })
}

// Identify the user once they're authenticated
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  posthog.identify(userId, properties)
}

// Track a custom event
export function track(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties)
}
```

```tsx
// app/layout.tsx — initialise once at the root
"use client"
import { useEffect } from "react"
import { initPostHog } from "@/lib/posthog"

export default function RootLayout({ children }) {
  useEffect(() => {
    initPostHog()
  }, [])

  return <html><body>{children}</body></html>
}
```

---

## What Events to Track

Track behaviour, not just page views. Page views tell you people visited. Events tell you what they did.

### Core Events for an AI Tool

```typescript
// These five events answer most of the questions you'll have

// 1. User sent a message
track("message_sent", {
  messageLength: message.length,
  conversationLength: messages.length,
  isFirstMessage: messages.length === 1
})

// 2. User received a response (and it was useful)
track("response_received", {
  responseLength: response.length,
  latencyMs: Date.now() - requestStart,
  model: "claude-sonnet-4-6"
})

// 3. User started a new conversation
track("conversation_started", {
  source: "new_chat_button" | "keyboard_shortcut" | "auto"
})

// 4. User copied a response (strong signal of value)
track("response_copied", {
  responseLength: response.length,
  conversationTurn: messages.length
})

// 5. AI error occurred
track("ai_error", {
  errorType: "timeout" | "rate_limit" | "refusal" | "unknown",
  conversationLength: messages.length
})
```

### What Each Event Tells You

```
message_sent:
  → Daily/weekly active users (users who sent at least one message)
  → Average conversation length (engagement depth)
  → isFirstMessage=true → new user activation rate

response_received + latencyMs:
  → Performance from the user's perspective
  → Latency spikes that correlate with churn

response_copied:
  → Strongest signal of perceived value
  → If users rarely copy responses, they may not find them useful

conversation_started:
  → Session frequency per user
  → Which entry point (button vs shortcut) gets used

ai_error:
  → Error rate trends
  → Which error types are most common
```

---

## Retention — The Most Important Metric

Retention answers: are people coming back?

A tool that users try once and never return to is not delivering value, regardless of how technically impressive it is.

```
Day 1 retention:  Did the user come back the next day?
Day 7 retention:  Did the user come back within a week?
Day 30 retention: Did the user come back within a month?

Healthy personal tool benchmarks:
  Day 1:  >20%
  Day 7:  >10%
  Day 30: >5%

Below these numbers: users are not finding lasting value.
```

PostHog calculates this automatically from your identified users. No additional tracking code needed — just make sure you're calling `identifyUser()` on login.

---

## Activation — Did They Get It?

Activation is the moment when a new user first experiences the core value of your tool.

Define your activation event specifically:

```typescript
// Example activation events — pick the one that represents
// "this user got it"

// For a document Q&A tool:
// → User asked a question about an uploaded document

// For a writing assistant:
// → User accepted or copied a suggested edit

// For a meeting summariser:
// → User completed their first summary and copied it

// Track it explicitly
track("user_activated", {
  activationEvent: "first_document_question",
  timeToActivationMs: Date.now() - session.createdAt
})
```

Your activation rate = % of new users who reach this event within their first session.

If activation rate is low, users are not reaching the "aha moment." Look at session recordings of non-activated users — where do they stop?

---

## Session Recordings

PostHog session recordings let you watch exactly what real users did — where they clicked, where they hesitated, where they left.

```typescript
// Already enabled in the PostHog init above
// No additional code needed

// Focus recordings on new users or specific flows
// PostHog dashboard → Session Recordings → Filter by:
//   First time = true
//   Completed event = message_sent (only watch engaged sessions)
//   Duration > 30 seconds (skip people who left immediately)
```

Watch 5–10 recordings of new users per week. This is more valuable than any dashboard metric for understanding where the experience breaks down.

What to look for:
- Rage clicks (clicking something that doesn't respond)
- Long pauses before first action (confusion)
- Returning to the same screen multiple times (lost)
- Leaving immediately after an AI response (response wasn't useful)

---

## A Simple Analytics Dashboard

You don't need a custom dashboard. PostHog's built-in dashboard covers everything for a personal project.

```
Create these insights in PostHog:

1. Weekly Active Users
   Event: message_sent
   Breakdown: by week
   → Are you growing or shrinking?

2. Messages Per User Per Week
   Event: message_sent, aggregated by unique users
   → Is engagement deepening?

3. Activation Funnel
   Step 1: user_signed_up
   Step 2: message_sent (first message)
   Step 3: user_activated
   → Where do new users drop off?

4. Error Rate
   Event: ai_error
   As % of message_sent events
   → Is reliability improving or degrading?

5. Response Copy Rate
   Event: response_copied / response_received
   → Are responses perceived as useful?
```

Review this dashboard once a week. Not daily — there isn't enough signal in a personal project to warrant daily attention.

---

## Privacy and Data Minimisation

Session recordings and event tracking capture real user behaviour. Handle it carefully.

```typescript
// Mask sensitive content in recordings
posthog.init(key, {
  session_recording: {
    maskAllInputs: true,     // Never record what users type to the AI
    maskTextSelector: "[data-sensitive]"
  }
})

// Don't include message content in events
// Wrong:
track("message_sent", {
  content: userMessage  // ← Never do this
})

// Right:
track("message_sent", {
  messageLength: userMessage.length,
  wordCount: userMessage.split(" ").length
})
```

Users' conversations with your AI tool are private. Never send message content to an analytics service. Track metadata (length, timing, counts) not content.

If you have users outside your own usage, add a brief note in your privacy notice that anonymised usage analytics are collected.

---

## When Analytics Isn't Worth the Effort

For a truly personal tool — one that only you use — skip PostHog entirely. Analytics only adds value when there are other users whose behaviour you need to understand.

```
Only you use it:
  → Check your own AI provider dashboard for usage stats
  → Review error logs in Sentry
  → No product analytics needed

2–5 people you know use it:
  → Ask them directly. That conversation is more valuable than any dashboard.
  → Light PostHog setup for retention tracking

More than 5 regular users:
  → Full PostHog setup as described in this module
  → Session recordings essential — you can't talk to everyone
```

---

## AI Prompt — Analytics Plan

<copy-prompt>
You are a product analyst helping design an analytics plan for a personal AI tool.

My tool:
- What it does: [DESCRIBE YOUR TOOL]
- Primary use case: [MAIN THING USERS DO]
- Current users: [NUMBER AND WHO THEY ARE]
- Stack: [NEXT.JS / OTHER]

Help me design a focused analytics plan:
1. What is my activation event — the moment a new user "gets" the tool?
2. What are the 5 most important events to track?
3. What properties should I include on each event?
4. What retention benchmark should I be targeting for this type of tool?
5. What would low retention tell me vs low activation?
6. What should I look for in session recordings of new users?
7. What should I NOT track — what's noise for my use case?

Be specific to my tool and user count. Don't over-engineer for a personal project.
</copy-prompt>

---

## Analytics Checklist

- [ ] PostHog (or equivalent) installed and receiving events in production
- [ ] `identifyUser()` called on login with userId
- [ ] `message_sent` event tracked with conversation length and first-message flag
- [ ] `response_received` event tracked with latency
- [ ] `response_copied` event tracked (value signal)
- [ ] `ai_error` event tracked with error type
- [ ] Activation event defined and tracked
- [ ] Session recordings enabled with all inputs masked
- [ ] Message content never sent to analytics (metadata only)
- [ ] Retention chart set up in PostHog dashboard
- [ ] Activation funnel set up in PostHog dashboard
- [ ] Weekly review of analytics dashboard scheduled
- [ ] At least 5 session recordings watched from new users
- [ ] Privacy notice updated to mention anonymised analytics (if sharing with others)

---

## Common Mistakes

> **Mistake: Tracking page views and calling it analytics**
> Page views tell you people visited. They don't tell you whether the tool delivered value. Track behaviour — what users did, not just where they went.

> **Mistake: Including message content in events**
> Users' AI conversations are private. Sending content to PostHog or any third-party analytics service is a privacy violation. Track lengths, counts, and timing — never the actual text.

> **Mistake: Checking analytics daily before you have enough users**
> Daily fluctuations in a small user base are noise. A single user having an unusual session can move your metrics significantly. Review weekly, act monthly.

> **Mistake: Tracking too many events**
> Fifteen events that you never look at are worse than five events you check weekly. Start with the five core events. Add more only when you have a specific question they would answer.

> **Mistake: Never watching session recordings**
> Dashboards show you what happened. Recordings show you why. A 10-minute session watching a confused new user is worth more than hours of staring at funnel charts.

---

## Next

With analytics telling you how users behave, the next topic is **Prompt Analytics** — understanding how users interact with the AI specifically, what they're asking for, and how your prompts are performing.
