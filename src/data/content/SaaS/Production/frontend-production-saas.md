---
title: Frontend
slug: frontend
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 30–40 min
---

# Frontend

Everything planned in Phase 1 and Phase 2 — wireframes, design system, state management boundaries, API contracts — gets implemented here. The risk at this stage isn't lack of a plan; it's drifting from the plan under the pressure of "just get it working." This module is about implementing without losing the decisions you already made.

---

## Decision 1: Build Vertically, Per Feature

Mirror the approach from Backend: build one feature's complete UI — list view, detail view, create/edit, **and all four states from Wireframes** — before moving to the next feature.

> ️ **Warning**
> Empty, loading, and error states are the most commonly skipped part of frontend implementation, even when they were correctly planned in Wireframes. It's easy to build the populated/happy-path view, ship it, and quietly never circle back to the empty and error states. Build all four states as part of the same task, not as a follow-up.

---

## Decision 2: Connect to the API Consistently

>  **Best Practice**
> Use your chosen data-fetching library (from State Management) for every API call — no inconsistent mixing of raw `fetch` in some components and the library in others. If your backend exposes an OpenAPI spec (from API Design), generate typed API client functions from it rather than hand-writing fetch calls and request/response types — this keeps frontend types automatically in sync with backend changes.

---

## Decision 3: Implement Every State Defined in Wireframes

For every data-driven screen, verify all of these actually exist in the implementation, not just the design:

- [ ] Empty state (new workspace, zero data)
- [ ] Loading state (skeleton or spinner, consistent with your Design System)
- [ ] Populated state
- [ ] Error state (failed request, not just a blank screen)
- [ ] Role-based variants, where Wireframes specified them

---

## Decision 4: Forms

> **Decision Card**
> Implement every form with React Hook Form + the same Zod schema your backend validates against (from Backend's validation-at-the-boundary decision). This means a validation rule defined once is enforced identically on both sides — no case where the frontend allows something the backend rejects, or vice versa, leading to a confusing user experience.

- [ ] Field-level errors display inline, near the field, not just as a generic banner
- [ ] Submit buttons show a loading state during submission and are disabled to prevent duplicate submits
- [ ] Server-side validation errors (which can catch things client-side validation can't, like "email already in use") are mapped back to the correct field, not shown as a generic error

---

## Decision 5: Use the Design System, Don't Recreate It

> ️ **Warning**
> Building a one-off styled button or input instead of using the established Design System component is how visual inconsistency creeps in feature by feature. If a component you need doesn't exist yet, that's a signal to add it to the design system properly (with all its states), not to write inline styles for just this one screen.

---

## Decision 6: Accessibility, Actually Implemented

Accessibility (Phase 1) defined the requirements. Verify they're actually present in the built UI, not just planned:

- [ ] Keyboard navigation works end-to-end on every new screen — test it yourself, don't assume
- [ ] Icon-only buttons have `aria-label`s
- [ ] Focus-visible styles are present (from your Design System component states)
- [ ] New modals/dropdowns trap focus and support Escape to close

---

## Decision 7: Performance Basics

- [ ] Heavy/rarely-used routes are code-split, not bundled into the initial page load
- [ ] Images are served in a modern format and properly sized, not full-resolution originals shrunk via CSS
- [ ] Re-renders are reasonable — a component re-rendering on every keystroke of an unrelated input is worth investigating, not ignoring

---

## Common AI Mistakes to Watch For

- **Builds only the populated/happy-path state** unless explicitly asked for all four states — always specify this requirement.
- **Recreates components ad-hoc** instead of using existing Design System components — point AI at the existing component library explicitly.
- **Skips server-side error mapping in forms** — only handles client-side validation, missing the case where the backend rejects something the client allowed.
- **Forgets accessibility details** (aria-labels, focus traps) unless explicitly required — these are easy to omit silently.
- **Generates UI that doesn't match the planned IA/wireframe structure** — if output drifts from your route map or wireframes, flag it and realign rather than accepting the deviation.

---

## AI Prompt: Build a Feature's Complete Frontend

```
Implement the frontend for the [feature name] feature in a production SaaS, using:
- [Your data-fetching library] for all API calls — no raw fetch calls
- React Hook Form + this Zod schema for the form: [paste schema, same one used server-side]
- Existing Design System components: [list relevant ones, e.g., Button, Input, Card] — do not create new ad-hoc styled elements
- Wireframe reference: [paste relevant wireframe description/states for this screen]

Implement ALL of these states, not just the populated one:
1. Empty state
2. Loading state
3. Populated state
4. Error state (failed API call)
[Add: role-based variant for admin vs member, if applicable]

Ensure: keyboard navigation works, icon-only buttons have aria-labels, focus-visible styles are present, and server-side validation errors map to the correct form field.
```

---

## Validate Before You Move On

- [ ] All four states (empty/loading/populated/error) are implemented for every data-driven screen — not just designed
- [ ] Every API call goes through your chosen data-fetching library, consistently
- [ ] Forms share validation schemas with the backend and map server errors to the correct field
- [ ] No ad-hoc styled components exist where a Design System component should have been used
- [ ] Keyboard navigation and aria-labels are verified by actually testing, not assumed from the plan
- [ ] Heavy routes are code-split; images aren't oversized

> [!TIP]
> If you find yourself building the same loading-skeleton or error-banner pattern repeatedly with small variations, that's a sign to add it to your Design System as a shared component now, rather than letting five slightly different versions accumulate across features.

---

**Next:** Payments — implement the billing flow your product depends on.
