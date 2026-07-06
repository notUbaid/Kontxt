---
title: Frontend Engineering
slug: frontend-engineering
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 15-20 min
---

# Frontend Engineering

This is the part of your project a judge actually looks at for the entire duration of your demo. Backend logic is invisible infrastructure; frontend is the whole visible surface of your product. That asymmetry should directly shape how you spend your remaining hours.

---

## The Core Idea: The Frontend Is What Gets Judged, Full Stop

A judge never sees your database schema, your API design, or your code quality. They see screens, transitions, and whether interacting with your app feels smooth or janky. This isn't a reason to neglect the backend — your demo still needs to actually work — but it is the reason frontend polish deserves disproportionate time relative to its actual engineering complexity.

> [!WARNING]
> Teams often allocate time evenly across backend and frontend because that feels balanced. It isn't the right allocation for a hackathon. If you're running low on time, cut backend scope before cutting frontend polish — a slightly simpler backend that's invisible either way costs you nothing in judging; a rough, unfinished-looking UI costs you visibly, on every screen, for the entire demo.

---

## Step 1: Build Screen by Screen, in Demo Order, Same as Backend

Same discipline as the Backend Engineering module, applied to the frontend: build the screens in the order a judge will see them, wiring each one to its real backend endpoint as you go — not building every screen with placeholder data and connecting them all at the end.

> [!TIP]
> Connecting screens early, even roughly, surfaces integration mismatches (a field name that doesn't match, a response shape that's different than expected) while you still have time to fix them. Discovering a frontend/backend mismatch during your final demo rehearsal is one of the worst-timed bugs to find.

---

## Step 2: Use a Component Library to Avoid Building UI Primitives From Scratch

Don't hand-roll buttons, modals, dropdowns, or form inputs from raw HTML/CSS under time pressure. A component library (shadcn/ui, Material UI, Chakra, or whatever your team already knows) gives you working, reasonably good-looking primitives instantly — letting your actual design time go toward your wow moment's specific UI, not toward reinventing a dropdown menu.

**Decision Card — Build vs. Use a Library**

| UI Element | Hackathon Approach |
|---|---|
| Buttons, inputs, modals, dropdowns, toasts | Use a component library — never hand-build these under time pressure |
| Your wow moment's specific visual (a unique result display, a custom visualization) | Worth custom-building — this is where your differentiated effort belongs |
| Navigation, layout shell | Use library primitives, customize with your design tokens (see Design System module) |

---

## Step 3: Handle Loading and Empty States — They Will Be Visible

Every screen has a moment before data exists (loading) and a state where there's nothing yet (empty). These are not edge cases in a demo — they're guaranteed to be visible, because your demo necessarily starts from an empty/loading state every single time you run it live.

> [!WARNING]
> A screen that looks broken or blank during the 2-3 seconds before data loads is one of the most common "this looks unfinished" signals to a judge — and unlike a rare edge case, this state is *guaranteed* to appear in every single demo run, including the live one in front of judges. Treat it as a Must-Have, not a Nice-to-Have. The UI Polish module covers how to make this state actually feel intentional rather than just "less broken."

---

## Step 4: Test on the Actual Device/Screen You'll Demo On

Frontend bugs are often resolution-specific or device-specific — something that looks fine on your laptop screen might overflow or misalign on the projector or screen-share resolution you'll actually present on. Test on the real setup before the day of, not for the first time minutes before your slot.

---

## Using AI to Build Screens Fast

AI is strong at generating working UI components quickly from a clear description — the same value as backend code generation, with the added benefit that visual results are easy for you to verify immediately just by looking at them.

**Prompt: Screen Implementation Against Your Flow**

```
Building [framework] frontend, using [component library, e.g.,
shadcn/ui] for a hackathon project.

Screen: [name, from your user flow]
Shows: [what's displayed]
User can do: [interactions]
Calls this endpoint: [paste relevant API shape from backend]
Design tokens: [colors, font, spacing scale from Design System module]

Build this screen using the component library above for all
standard UI elements (buttons, inputs, etc.). Include a loading
state and an empty state — both will be visible during a live demo,
so don't skip them. Use my design tokens, don't introduce new
colors or fonts.
```

> ** Why this prompt works**
> Explicitly requiring loading and empty states in every screen prompt enforces Step 3's discipline automatically, rather than relying on you to remember to ask for it separately each time — these states are easy to forget when focused on the "main" content of a screen. Pointing the model at your actual design tokens keeps every generated screen visually consistent with the rest of your app, directly extending the Design System module's consistency goal into your build process.

**Token efficiency note:** Generate and visually verify one screen at a time, same as the backend's one-endpoint-at-a-time discipline. A frontend bug is usually immediately visible once you look at the rendered screen — verify by looking, don't batch several screens together and try to debug them all at once when something looks off.

---

## Validating Generated Frontend Code

- **Look at it rendered, immediately** — frontend bugs are visual and usually obvious at a glance; don't just read the code and assume it's correct.
- **Confirm it actually calls your real backend endpoint**, not a placeholder or mock the model might have generated by default if your prompt didn't make the real endpoint explicit.
- **Check loading and empty states render correctly**, not just the "happy path with data" state — trigger them deliberately by slowing down or temporarily breaking the data fetch.
- **Verify your design tokens were actually used** — AI sometimes reverts to its own default styling choices (often a generic blue) if your prompt's token instructions weren't specific enough; compare against your Design System module decisions directly.

---

## Quick Reference: Frontend Priorities for a Hackathon

1. Build in demo order, connected to real backend data early
2. Use a component library for every standard UI element
3. Loading and empty states are Must-Have, not Nice-to-Have — they're guaranteed to appear
4. Test on your actual demo device/screen before the day of presentation

---

## What's Next

Move to **UI Polish** — taking your now-functional screens and adding the specific visual details that make the difference between "it works" and "it impresses."
