---
title: Error Handling
slug: error-handling
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-25 min
---

# Error Handling

You designed error *states* in Phase 1 (what the UI looks like) and a normalized `ApiError` shape in Backend Integration. This module is where error handling becomes a consistent system across the whole app — so a network failure, a validation error, and an unexpected crash each get handled the way they actually deserve, instead of all collapsing into the same generic "Something went wrong" toast.

---

## Decision 1 — Error Categories Require Different Handling

> ⚠️ Treating all errors identically is the most common error-handling mistake — a generic try/catch that shows the same alert for everything throws away information the user actually needs. A validation error needs inline field feedback. A network error needs a retry action. A server error needs an apology and a fallback. An unexpected crash needs to not happen again silently.

| Category | User-Facing Treatment | Logged? |
|---|---|---|
| **Validation error** | Inline, field-level (your `ApiError.fieldErrors`) | No — expected, not a bug |
| **Network/offline** | Retry affordance, possibly your Offline Features queue | No — expected, common |
| **Auth/expired session** | Silent refresh if possible; otherwise redirect to login | Maybe — only if refresh itself fails unexpectedly |
| **Server error (5xx)** | Apologetic message, retry option, fallback content if available | Yes — this indicates a real backend problem |
| **Unexpected/unhandled exception** | Generic fallback UI, never a blank/frozen screen | Yes — always, with full context |

---

## Decision 2 — Error Boundaries

React error boundaries catch rendering errors that would otherwise crash the whole app to a blank white/black screen — a real, visible failure mode if missing.

```typescript
class ScreenErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    errorReporting.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackScreen onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
```

> 💡 **Place boundaries at the screen level, not just one global boundary at the app root.** A single root-level boundary means any rendering error anywhere takes down the entire app to a fallback screen. Per-screen boundaries contain the failure — one broken screen shows its own fallback while the rest of the app (navigation, tab bar) keeps working, which is a meaningfully better experience and easier to recover from.

---

## Decision 3 — Async Error Handling Consistency

Connects directly to the `AsyncBoundary` pattern from your Frontend module — that component is where most async errors should surface, consistently, rather than each screen handling its own try/catch with custom UI.

```typescript
<AsyncBoundary
  loading={isLoading}
  error={error}
  errorFallback={(err) => <ErrorState type={err.type} onRetry={refetch} />}
>
  <ScreenContent data={data} />
</AsyncBoundary>
```

> ⚠️ Don't let individual screens silently swallow errors (`catch (e) { console.log(e) }` with no user-facing feedback) — a failed action that gives the user no signal reads as the app being broken or unresponsive, which is often worse than an explicit error message.

---

## Decision 4 — Crash & Exception Reporting

This module sets up the reporting; full observability architecture is Phase 4's *Observability* module — but capturing exceptions from day one of Phase 3 development, not added later, means you have real data by the time you reach that module.

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.2, // tune based on volume/cost
  beforeSend: (event) => {
    // strip PII before sending — see Decision 5
    return scrubPII(event);
  },
});
```

> ⚠️ Wire this in now rather than deferring to Phase 4. The most valuable crash data is what happens during real early testing and beta distribution — if reporting isn't in place yet, you lose visibility into exactly the period where bugs are most common and cheapest to fix.

---

## Decision 5 — Don't Leak Sensitive Data Into Error Reports

> ⚠️ Crash reports and error logs commonly capture local variable state, request payloads, and stack traces — any of which can contain PII, auth tokens, or payment details if you're not deliberate about scrubbing. Configure your error reporting tool's `beforeSend` (or equivalent) hook to strip known-sensitive fields before anything leaves the device, rather than trusting that sensitive data simply won't end up in an error context.

```typescript
function scrubPII(event: Sentry.Event): Sentry.Event {
  if (event.request?.data) {
    delete event.request.data.password;
    delete event.request.data.token;
    delete event.request.data.cardNumber;
  }
  return event;
}
```

---

## Decision 6 — User-Facing Error Messages

- **Be specific where specificity helps, generic where it doesn't.** "Your card was declined" is actionable; exposing a raw backend stack trace or internal error code to the user is not — and can leak implementation details. Map backend error types to user-appropriate messages explicitly, don't surface raw error strings directly in the UI.
- **Always provide a next action**, not just a statement of failure — retry, contact support, go back. A dead-end error message with no path forward is a common source of app abandonment at exactly the moment a user hit friction.

---

## AI Prompts

### Prompt 1 — Error Handling System

```
Implement error handling for a production [React Native] app.

Implement: per-screen React error boundaries (not just one root-level
boundary) that report to [Sentry/your tool] with PII scrubbing in the
beforeSend hook, an AsyncBoundary error UI mapped from the ApiError type
defined in our Backend Integration module, and user-facing error message
mapping that never exposes raw backend error strings or stack traces to
the user.
```

### Prompt 2 — Error Handling Review

```
Review this error handling code:

[paste relevant try/catch, error boundary, and error UI code]

Check for: errors silently swallowed without user feedback, a single
app-wide error boundary instead of per-screen boundaries, raw backend
error messages or stack traces shown directly to users, and crash
reporting that isn't scrubbing PII before sending.
```

---

## Validating AI Output

- [ ] Error boundaries exist per-screen, not only as a single app-root catch-all
- [ ] Async errors surface through the consistent `AsyncBoundary`/error-state pattern, not ad hoc per-screen handling
- [ ] No error is silently swallowed without some user-facing feedback
- [ ] Crash/exception reporting is wired in now, not deferred, with PII scrubbing configured before any data leaves the device
- [ ] User-facing error messages are mapped from backend error types, never raw stack traces or internal error strings
- [ ] Every error state gives the user a next action (retry, support, back), not a dead end

---

## What's Next

- **Testing** (next in this phase) should explicitly exercise error paths — network failures, server errors, malformed responses — not just happy-path flows.
- **Observability** (Phase 4) builds on the crash reporting wired here into a full system-wide monitoring and alerting setup.
- **Security** (Phase 4) will revisit the PII-scrubbing discipline established here at a system-wide level.
