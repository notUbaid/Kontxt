---
title: Analytics Events
slug: analytics-events
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 15-20 min
---

# Analytics Events

The Analytics Strategy module (Phase 2) defined your event taxonomy — names, properties, when each fires. This module is where that taxonomy actually gets instrumented across your codebase, correctly and consistently, instead of drifting into the inconsistent-naming problem that module specifically warned against.

---

## Decision 1 — The Tracking Wrapper

Implement the centralization decided in Phase 2 as actual code, now, before instrumenting your first screen — retrofitting this after 40 scattered `posthog.capture()` calls exist is real, avoidable cleanup work.

```typescript
// analytics/track.ts
const EVENT_SCHEMA = {
  product_viewed: ['productId', 'category', 'price', 'source'] as const,
  order_completed: ['orderId', 'total', 'itemCount', 'paymentMethod'] as const,
  // ...rest of your Phase 2 taxonomy
} satisfies Record<string, readonly string[]>;

function track<E extends keyof typeof EVENT_SCHEMA>(
  event: E,
  properties: Record<(typeof EVENT_SCHEMA)[E][number], string | number | boolean>
) {
  analyticsProvider.capture(event, properties);
}
```

> 💡 Defining your schema as a typed object like this means **mistyped event names and missing required properties become compile-time errors**, not silent gaps discovered months later when someone tries to build a funnel report and finds half the events missing a property. This is the highest-leverage thing you can do to keep the Phase 2 taxonomy intact as the codebase grows.

Every feature module calls `track()`, never the raw provider SDK directly — this is the same centralization principle as your API client and permission handling.

---

## Decision 2 — Where Tracking Calls Live in Component Code

> ⚠️ Don't scatter `track()` calls inline inside JSX event handlers across dozens of components — it works, but it makes events easy to miss when refactoring and hard to audit against your taxonomy. Prefer colocating tracking calls with the action they describe, ideally in the same hook/function that performs the underlying action, so the event fires exactly once, exactly when the real thing happens.

```typescript
// Good: tracking lives next to the actual mutation
function useCompleteOrder() {
  return useMutation({
    mutationFn: api.completeOrder,
    onSuccess: (order) => {
      track('order_completed', {
        orderId: order.id,
        total: order.total,
        itemCount: order.items.length,
        paymentMethod: order.paymentMethod,
      });
    },
  });
}
```

This also solves a subtle correctness problem: tracking on button-press (`onPress={() => { track(...); doThing(); }}`) records intent, not outcome — if `doThing()` fails, you've recorded an event that didn't actually happen. Tracking on the success callback of the actual operation records what really occurred.

---

## Decision 3 — Screen View Tracking

Already wired at the navigator level per your Navigation module — confirm it's actually emitting events that match your taxonomy's naming convention, not the raw route name unmodified (route names are implementation details; event names should be your taxonomy's deliberate vocabulary).

```typescript
onStateChange={(state) => {
  const routeName = getCurrentRouteName(state);
  const eventName = ROUTE_TO_EVENT_MAP[routeName] ?? null;
  if (eventName) track(eventName, { screen: routeName });
}}
```

---

## Decision 4 — Server-Side Events

Per the Phase 2 decision: financially/security-sensitive events fire server-side, not just client-side. Implement this as part of the same business logic that performs the action — e.g. inside your payment webhook handler, not as a separate client-triggered call that could be missed if the client never receives confirmation.

```typescript
// in your webhook handler, server-side
async function handlePaymentSucceeded(event: StripeEvent) {
  await fulfillOrder(event.data.object);
  await serverAnalytics.track('order_completed', { /* ... */ }); // authoritative
}
```

> 💡 If both client and server emit the same event (common for events you also want immediate client-side UX feedback from), make sure your analytics provider can deduplicate, or only treat the server-side event as the source of truth for anything used in revenue reporting.

---

## Decision 5 — Identity Wiring

Implements the anonymous-to-identified transition decided in Phase 2:

```typescript
// on successful signup/login
await analyticsProvider.identify(user.id, {
  // non-PII traits only — see Phase 2's PII discipline
  createdAt: user.createdAt,
  plan: user.plan,
});

// on logout — per your Auth Implementation module's full state-clearing logic
await analyticsProvider.reset();
```

> ⚠️ Confirm `reset()` (or equivalent) is called as part of your logout flow from the Auth Implementation module — a missed reset means the next user on a shared/handed-off device gets attributed events under the previous user's identity, corrupting both users' data.

---

## Validation Pass Before Shipping

Before considering instrumentation complete, do an explicit pass against your Phase 2 taxonomy document:

- Every event defined in the taxonomy actually fires somewhere in the app
- No event fires that *isn't* in the taxonomy (an undocumented event is exactly the drift the taxonomy was meant to prevent)
- No event property contains PII, re-checked against actual implementation, not just the original design

---

## AI Prompts

### Prompt 1 — Instrumentation Pass

```
Instrument analytics tracking for these flows in a production [React Native]
app, following this event taxonomy: [paste your Phase 2 taxonomy]

Flows to instrument: [list screens/actions]

Use a typed track() wrapper validated against the taxonomy schema. Fire
tracking calls from success callbacks of the actual mutation/action, not
from button press handlers directly. Flag any event in these flows that
should be server-side (financial/security-sensitive) rather than client-side.
```

### Prompt 2 — Taxonomy Drift Audit

```
Audit this codebase's analytics calls against our defined taxonomy:

[paste taxonomy] [paste or describe current tracking call sites]

Identify: events fired that aren't in the taxonomy, taxonomy events that
are never fired anywhere, properties sent that don't match the schema,
and any event tracked from a button press handler instead of an action's
success callback.
```

---

## Validating AI Output

- [ ] All tracking calls route through one typed wrapper validated against the taxonomy, not raw provider SDK calls scattered in components
- [ ] Events fire from action success callbacks, not optimistically from button press handlers
- [ ] Financially/security-sensitive events are emitted server-side as the authoritative source
- [ ] `identify()` is called on login/signup and `reset()` is called on logout, without exception
- [ ] No event in the codebase is missing from the taxonomy document, and vice versa
- [ ] No event property contains PII when checked against actual implementation

---

## What's Next

- **Error Handling** (next in this phase) should also track error events — connect failure tracking to the same typed wrapper.
- **Testing** should include verification that key events actually fire during critical user flows, not just that the UI behaves correctly.
- **Analytics** (Phase 6) is where this instrumentation gets used for actual product decisions — the discipline here determines whether that data is trustworthy.
