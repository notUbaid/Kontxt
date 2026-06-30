---
title: Loading States
slug: loading-states
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
filename: loading-states-personal-marketplace.md
---

# Loading States

Empty states cover "nothing here yet," error states cover "something went wrong." Loading states cover the gap in between — what a user sees while waiting. This is the last of the three non-happy-path modules in Phase 1, and the shortest, but it directly determines whether your marketplace feels fast or feels broken, independent of how fast it actually is.

A blank screen during a network request is indistinguishable from a frozen or crashed app. This module fixes that distinction cheaply.

---

## Why Perceived Speed Matters More Than Actual Speed

A request that takes 800ms with no loading indicator feels broken — the user doesn't know if anything is happening. The same 800ms with a clear loading state feels responsive, because the user has confirmation the system is working. For a solo-built marketplace running on budget infrastructure, this perception gap is a free win you don't need better infrastructure to achieve.

> **Decision:** Every action that takes more than roughly 200-300ms needs a loading indicator. Below that threshold, a loading state can actually feel like added flicker; above it, the absence of one feels like a bug.

---

## Where Marketplaces Specifically Need Loading States

| Action | Why it needs one |
|---|---|
| Browse/search results loading | Most frequent action in the app — first impression of responsiveness |
| Listing image upload | Can genuinely take a few seconds; silence here reads as a stuck upload |
| Form submission (create listing, send message) | User needs confirmation their action is being processed, not lost |
| Listing detail page load | Especially if fetching seller info or related data separately |

> **Tip:** Prioritize the browse/search loading state above the others if you have to choose where to spend time first — it's the screen a user sees most often, so inconsistent or missing loading feedback there is the most frequently noticed.

---

## Skeleton Screens vs. Spinners: Use Skeletons for Content, Spinners for Actions

**Skeleton screens** (gray placeholder shapes matching the eventual content's layout) work best for content that's loading into a known layout — like a listing grid or detail page, where you already know roughly what shape the content will take.

**Spinners** work best for actions with no predictable content shape — submitting a form, sending a message, uploading an image.

> **Decision:** Use skeleton screens for your browse/listing grid and listing detail page. Use a simple spinner (often just on the button itself, e.g., "Creating..." with a small spinner) for form submissions and uploads. Don't use a full-page spinner for content loading — it has a higher perceived-wait-time than a skeleton, even at identical actual load times.

---

## A Simple Skeleton for the Listing Grid

```tsx
function ListingCardSkeleton() {
  return (
    <div className="border rounded-lg p-3 animate-pulse">
      <div className="bg-gray-200 h-40 rounded mb-2" />
      <div className="bg-gray-200 h-4 w-3/4 rounded mb-1" />
      <div className="bg-gray-200 h-4 w-1/4 rounded" />
    </div>
  )
}

// Render 6-8 of these while the real grid is loading
```

This matches the rough shape of a real listing card (image, title, price) so the transition from loading to loaded doesn't visually jump.

---

## Button Loading States: Disable, Don't Just Spin

When a user submits a form, the submit button should both show a loading indicator *and* disable itself. Without disabling, an impatient user clicking "Submit" multiple times can trigger duplicate listings, duplicate messages, or duplicate transactions — a real bug, not just a UX nicety.

```tsx
<button disabled={isSubmitting}>
  {isSubmitting ? 'Creating...' : 'Create Listing'}
</button>
```

> **Warning:** This is a common gap in quickly-generated AI form code — the loading text appears, but the button remains clickable. Double-submission from an un-disabled button is a real source of duplicate-data bugs in marketplace apps specifically, since duplicate listings or duplicate messages are visibly confusing to users.

---

## Don't Over-Engineer This for MVP

Loading states are one of the few areas where the simple, fast-to-build version is also the correct version for a personal project. Resist:

- Progress percentage bars for actions that don't have a meaningfully measurable progress (most form submissions don't)
- Elaborate custom loading animations — a simple, consistent spinner or skeleton pattern reused everywhere is more valuable than a unique, polished one per screen
- Optimistic UI updates (showing the result before the server confirms) — genuinely useful at scale, but adds real complexity around handling failure-after-optimistic-update that isn't worth it for a first build

---

## AI Prompts You Can Use

**Prompt 1 — Generate skeleton and spinner components:**

```
Using this design system [paste your tokens from Design System], create
a skeleton loading component for a listing card (image, title, price
shapes) and a simple spinner component for button loading states. Match
my existing design tokens, don't introduce new colors or spacing.
```

**Prompt 2 — Audit existing code for missing loading states:**

```
Here's my [browse page / listing form] component: [paste it]. Identify
every async action (data fetch, form submission, image upload) and tell
me whether it currently has a loading state. For form submissions,
confirm the submit button is actually disabled during submission, not
just showing different text.
```

---

## Validating What AI Generates

- [ ] **Confirm buttons are actually disabled during loading**, not just relabeled — this is the single most common gap, explicitly check it rather than assuming the generated code handles it
- [ ] **Verify skeleton shapes roughly match the real content layout** — a skeleton that doesn't resemble the eventual content (wrong proportions, wrong count) creates a jarring transition rather than a smooth one
- [ ] **Test loading states on a throttled connection**, not just locally where requests resolve instantly — most browser devtools have a network throttling option; a loading state that's never actually visible during normal local development is one you haven't really verified

---

## Implementation Checklist

- [ ] Skeleton screens implemented for browse/listing grid and listing detail page
- [ ] Spinners implemented for form submissions and image uploads
- [ ] All submit buttons disable themselves during the loading state, not just relabel
- [ ] Loading states tested on a throttled network connection, not just fast local development
- [ ] No full-page blocking spinners used for content that could use a skeleton instead

---

## What's Next

Phase 1's "states" trio is complete — empty, error, and loading are all designed. Next: **Buyer Journey** — stepping back to map the buyer's complete experience across all these states, end to end.
