---
title: Loading States
slug: loading-states
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 20–30 min
---

# Loading States

Loading states are not a visual formality. They are a contract with the user: *something is happening, and we haven't forgotten about you.*

The difference between a polished app and an unfinished one often comes down to whether loading states exist, and whether they're the right kind.

---

## Why This Matters More Than You Think

Every network request, every async operation, every transition has three possible states:

| State | What the user sees |
|---|---|
| **Loading** | Something is in progress |
| **Success** | The content has arrived |
| **Error** | Something went wrong |

Most beginners build the success state first, add an error state eventually, and treat loading as an afterthought. Production apps design all three from the start.

> **Skipping loading states causes:** layout shifts, blank screens, confusing double-clicks, duplicate form submissions, and users who leave because they think the app is broken.

---

## The Four Loading Patterns

There is no universal loading solution. Choose based on context.

### 1. Skeleton Screens
**Use when:** Loading content that has a known shape (cards, lists, profiles, dashboards).

Skeleton screens show the layout before the data arrives. They reduce perceived wait time because the user's brain starts parsing the structure.

```
┌─────────────────────────────────────┐
│  ████████████████████  ████        │  ← title placeholder
│  ████████████████████████████████  │  ← body placeholder
│  ████████████████                  │  ← secondary line
└─────────────────────────────────────┘
```

**When to use:** Card grids, feed items, profile pages, any repeated list.

**When not to use:** Unknown content shape, very fast operations (<300ms), single values.

---

### 2. Spinner / Indicator
**Use when:** An action is in progress, but you can't predict the output shape.

Spinners are correct for:
- Form submissions
- File uploads
- Operations with an unknown result type
- Background syncing

Spinners are overused for page loads where a skeleton would be significantly better.

---

### 3. Progress Bar
**Use when:** You have real progress information (file upload %, step 2 of 4, etc.).

Don't fake progress bars. A fake progress bar that stalls at 90% is worse than no progress bar. Only use this pattern when you have real progress data.

---

### 4. Inline Loading
**Use when:** A small part of the page is updating, not the whole thing.

Examples: a button showing a spinner while a mutation runs, a count refreshing, a single field being validated.

This is often the best pattern for mutations (delete, save, update) — disable the button and show a spinner in place of the label.

---

## Decision Guide

> **"What loading pattern should I use here?"**

```
Is this a page-level load?
├── Yes → Does the content have a known shape?
│         ├── Yes → Skeleton Screen
│         └── No  → Centered Spinner + optional message
│
└── No → Is this triggered by a user action (button, form)?
          ├── Yes → Inline Loading on the trigger element
          └── No  → Is progress trackable?
                    ├── Yes → Progress Bar
                    └── No  → Subtle Indicator (top bar or small spinner)
```

---

## Implementation Standards

### Minimum Delay Threshold
Operations under **150ms** should not show a loading state at all. A flash of a loading indicator for an instant operation is jarring, not helpful.

```ts
// Apply a minimum display duration to avoid flashes
const [isLoading, setIsLoading] = useState(false);

async function fetchData() {
  const [data] = await Promise.all([
    api.fetchSomething(),
    new Promise(r => setTimeout(r, 300)) // minimum display time
  ]);
  return data;
}
```

Use this pattern when a loading state flash would be worse than no loading state.

---

### Button Loading State (Required for All Mutations)

Every button that triggers an async operation must:

1. Be disabled while loading (prevents duplicate submissions)
2. Show a visual indicator (prevents confusion)
3. Restore to original state on success or failure

```tsx
<button
  disabled={isSubmitting}
  onClick={handleSubmit}
>
  {isSubmitting ? (
    <>
      <Spinner size="sm" />
      Saving...
    </>
  ) : (
    'Save Changes'
  )}
</button>
```

>  **Missing this causes duplicate API calls.** A user who clicks "Submit" twice on a slow connection will submit the form twice. Always disable the trigger during async operations.

---

### Skeleton Screen Best Practices

- Match the skeleton shape to the real content as closely as possible
- Use a shimmer animation (moving gradient) rather than a pulsing opacity — it reads as "in progress" more clearly
- Show the same number of skeleton items as expected results when known
- Remove skeletons all at once, not one-by-one as items load (avoids layout thrashing)

```css
/* Shimmer animation */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

---

## Streaming & Partial Loading

For AI-powered features or large data responses, consider streaming over waiting for a full response.

Instead of: wait → show everything at once

Use: show partial results as they arrive → continue filling in

This is what ChatGPT, Kontxt, and Copilot all do. Streaming dramatically improves perceived performance for slow responses.

If you're using an API that supports streaming (OpenAI, Anthropic, Supabase Realtime), prefer it over polling.

---

## What Experienced Engineers Check

Before shipping any feature, verify:

- [ ] Every async operation has a loading state
- [ ] Every button that triggers a mutation is disabled during that mutation
- [ ] No loading state flashes for operations under 150ms
- [ ] Skeletons match the real content shape
- [ ] Progress bars only exist where real progress data exists
- [ ] Loading states are tested on throttled connections (Chrome DevTools → Network → Slow 3G)
- [ ] No layout shift occurs when loading resolves to content

---

## AI Prompt — Loading States Audit

Use this after building a feature to catch gaps:

```prompt
You are a senior frontend engineer reviewing a React web application for loading state quality.

I am going to describe the user flows in my app. For each async operation I mention, identify:
1. Whether a loading state is needed
2. Which loading pattern is most appropriate (skeleton, spinner, inline, progress)
3. Any risk of duplicate submissions or layout shift
4. Whether the current implementation matches production standards

My application: [describe your app in 2-3 sentences]

User flows to review:
[list each user flow, e.g. "User clicks Login → form submits → redirected to dashboard"]

Be direct. Flag every gap. Do not compliment the implementation.
```

---

## Testing Loading States

Never test loading states only on your local machine. Your localhost is not a real network.

**How to test:**

1. Open Chrome DevTools → Network tab
2. Set throttling to **Slow 3G**
3. Trigger each async operation and watch what the user actually sees
4. Look for: blank screens, missing indicators, layout shifts, broken buttons

This five-minute test exposes more loading state bugs than any code review.

---

## Common Mistakes

**Using a global full-screen spinner for everything**
This blocks the entire UI unnecessarily. Use the most local loading indicator possible.

**Forgetting to clear loading state on error**
If your fetch throws and you don't set `isLoading = false`, the button stays disabled forever.

**Using loading state as a substitute for optimistic updates**
For fast, high-confidence operations (toggling a like, reordering a list), consider optimistic UI instead of showing a loading state at all.

**Skeleton that looks nothing like the content**
A skeleton shaped like a list that resolves to a grid causes a jarring shift. Match the shape.
