---
title: Error States
slug: error-states
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 20–25 min
---

# Error States

Errors are inevitable. How your app handles them determines whether users trust it.

A crash with no message destroys trust instantly. A clear, honest error message with a recovery path keeps it.

Error states are not edge cases. They are part of your product.

---

## The Error Categories You Must Handle

Not all errors are the same. Each has a different cause, a different owner, and a different recovery path.

| Category | Cause | Who's responsible | Example |
|---|---|---|---|
| **Network** | No internet, timeout, server unreachable | Infrastructure / user's connection | "Failed to load — check your connection" |
| **Validation** | User submitted bad data | User | "Email address is invalid" |
| **Authorization** | User doesn't have permission | Product design | "You don't have access to this resource" |
| **Not Found** | Resource doesn't exist | User navigated to a dead link | 404 page |
| **Server** | Unexpected crash on the backend | Engineering | "Something went wrong on our end" |
| **Rate Limit** | User hit an API limit | Product / user | "Too many requests — try again in 60 seconds" |

Design each category differently. A validation error and a server crash need completely different UI and copy.

---

## Error State Anatomy

```
┌──────────────────────────────────────┐
│                                      │
│           [Icon or Illustration]     │  ← Sets tone (warning vs. broken)
│                                      │
│        Something went wrong          │  ← Honest headline
│                                      │
│   We couldn't load your projects.    │  ← Specific: what failed
│   This is on us — not your data.     │  ← Reassurance where relevant
│                                      │
│         [ Try Again ]                │  ← Primary recovery action
│   Contact support if this continues  │  ← Escape hatch
│                                      │
└──────────────────────────────────────┘
```

**Every error state needs:**
- A visual signal appropriate to severity
- An honest headline (don't hide what happened)
- A specific explanation (what failed, not just "error")
- At least one recovery action
- An escape hatch for unrecoverable errors (support link, reload)

---

## Where Errors Live

Errors appear at different scopes. Design all of them.

### Page-Level Errors
The entire page failed to load. Route crashed. Server returned 500.

Show a full-page error component. Include a retry button. Never show a blank screen.

### Section-Level Errors
One part of the page failed (a widget, a sidebar feed, a chart) but the rest loaded fine.

Contain the error to that section. Don't take down the whole page because one API call failed.

```
┌─────────────────────────┐
│   Couldn't load chart  │
│  [ Retry ]              │
└─────────────────────────┘
```

### Inline / Form Errors
A field failed validation or a form submission was rejected.

Show the error directly adjacent to the field. Never show a toast that says "Form has errors" without indicating which fields.

### Toast / Notification Errors
For background operations that fail (an autosave, a sync, a mutation). The user wasn't on the page waiting — they just need to know something silently failed.

Keep these brief. Always include a retry or dismiss.

---

## Form Validation: The Rules

Form errors are the most common error type most users encounter. Get these right.

**Validate at the right time:**

| Trigger | When to use |
|---|---|
| On submit | Simple forms, short forms |
| On blur (field loses focus) | Long forms — catch errors early without interrupting typing |
| On change (as user types) | Only for format-sensitive fields (passwords, usernames) |

Never validate on every keystroke for fields like email. It marks the field as invalid before the user has finished typing, which is annoying and unhelpful.

**Show errors in the right place:**
- Adjacent to the field, below the input
- Never only in a toast or banner for field-level validation
- Use red, but also use an icon — don't rely on color alone (accessibility)

**Write errors as instructions, not accusations:**

| Bad | Good |
|---|---|
| Invalid email | Enter a valid email address (e.g. you@example.com) |
| Required field | Your name is required to continue |
| Password too short | Password must be at least 8 characters |
| Error: 422 | This username is already taken |

The user needs to know what to fix, not that they failed.

---

## HTTP Status Codes → User-Facing Copy

Never show raw HTTP errors to users. Map them.

| Status | Internal meaning | User-facing message |
|---|---|---|
| 400 | Bad request | Check your input and try again |
| 401 | Unauthenticated | Please sign in to continue |
| 403 | Unauthorized | You don't have permission to do this |
| 404 | Not found | This page doesn't exist |
| 408 | Request timeout | The request took too long — try again |
| 429 | Rate limited | Too many requests — wait a moment and try again |
| 500 | Server error | Something went wrong on our end |
| 503 | Service unavailable | We're having trouble right now — try again shortly |

Build a central error mapping utility. Don't scatter these translations across components.

---

## Error Boundaries (React)

In React, unhandled component errors crash the entire UI. Error boundaries prevent this.

Wrap your major layout sections in error boundaries so one broken widget doesn't take down the whole app.

```tsx
// Wrap sections, not every component
<ErrorBoundary fallback={<SectionError onRetry={refetch} />}>
  <DashboardWidget />
</ErrorBoundary>
```

**What your fallback component should do:**
- Show a contained error message for that section
- Provide a retry mechanism
- Log the error to your observability tool (Sentry, Datadog)
- Never show a raw JavaScript error to the user

---

## Retry Logic

Most network errors are transient. A retry often succeeds.

**When to offer retry:**
- Network timeouts
- 500/503 server errors
- Failed mutations (if idempotent)

**When not to offer retry:**
- 400 validation errors (retrying the same bad data won't help)
- 401/403 authorization errors (the user needs to do something different)
- 404 not found (the resource doesn't exist)

For critical background operations, consider automatic retry with exponential backoff before surfacing the error to the user at all.

---

## Implementation Checklist

- [ ] Every async operation has an error state, not just a loading and success state
- [ ] Page-level crashes show a full-page error component, not a blank screen
- [ ] Section-level failures are contained — they don't crash the whole page
- [ ] Form validation errors appear adjacent to the relevant field
- [ ] No raw HTTP status codes or JavaScript error messages are shown to users
- [ ] Error copy tells the user what to do, not just what went wrong
- [ ] Every error state has at least one recovery action
- [ ] Unrecoverable errors link to support or offer a page reload
- [ ] React error boundaries wrap major layout sections
- [ ] Errors are logged to an observability tool, not just shown to users

---

## AI Prompt — Error State Review

Use this to audit error handling across your app before launch:

```prompt
You are a senior frontend engineer performing a pre-launch error handling audit.

My app: [one sentence description]
Stack: [e.g. React, TypeScript, React Query, Supabase]

Review the following user flows and identify:
1. Every point where an async operation could fail
2. Whether each failure has a user-visible error state
3. Whether the error copy is actionable (tells the user what to do)
4. Whether any raw error codes or stack traces could leak to users
5. Any missing error boundaries
6. Any missing retry opportunities for transient failures

User flows:
[list your core flows — e.g. "Login, Create project, Upload file, Invite team member"]

Be specific. Flag every gap. Prioritize by user impact.
```

---

## The One Rule

If something fails, the user must always know:

1. **What** failed (specifically)
2. **Why**, if it's their fault
3. **What to do next**

An error state that answers all three is good engineering. Anything less is an unfinished feature.
