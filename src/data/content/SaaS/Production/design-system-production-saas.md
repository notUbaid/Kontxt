---
title: Design System
slug: design-system
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Design System

A design system turns your brand decisions into reusable, consistent components — buttons, inputs, cards, modals — defined once and used everywhere. Skip this and every engineer (or every AI session) reinvents button padding slightly differently, and your app slowly turns into a patchwork of near-identical components that all behave a little differently.

The goal in production mode isn't to build a design system from scratch. It's to choose proven primitives and define your tokens on top of them.

---

## Decision 1: Component Foundation

> **Decision Card**
> Building your own component library from raw HTML/CSS is rarely worth it in 2026. Proven, accessible primitives exist — use them.

| Foundation | What it gives you | Tradeoff |
|---|---|---|
| shadcn/ui (Radix + Tailwind) | Copy-paste components you own and modify, built on accessible Radix primitives | You maintain the code, but full control |
| Headless UI / Radix directly | Accessible behavior only, you style everything | More setup work, maximum design flexibility |
| Full component library (e.g., Chakra, Mantine) | Fastest to start, less custom styling work | Harder to make it not look like "every other app built on it" |

>  **Best Practice**
> For a production SaaS where you want a distinctive, on-brand UI without reinventing accessibility behavior (focus traps, keyboard nav, ARIA), **shadcn/ui-style copy-owned components on Radix primitives** is the current industry-standard tradeoff — you get accessibility for free and full styling control.

---

## Decision 2: Design Tokens

Tokens are the single source of truth that connects your Branding decisions to actual code. Define these as variables, not hardcoded values scattered through components:

- [ ] **Color tokens** — primary, neutral scale, semantic colors (from Branding)
- [ ] **Spacing scale** — a fixed set (e.g., 4/8/12/16/24/32/48px), never arbitrary pixel values in components
- [ ] **Typography tokens** — font family, size scale, weight scale, line-height pairs
- [ ] **Radius scale** — 2–4 options (e.g., sm/md/lg), not a different border-radius per component
- [ ] **Shadow/elevation scale** — 2–3 levels, used consistently for cards, modals, dropdowns

> ️ **Warning**
> If a component needs a value not in your token scale, that's a signal to either extend the scale deliberately or reconsider the design — not to hardcode a one-off value. One-off values are how design systems silently die.

---

## Decision 3: Component States

Every interactive component needs defined states — this is the component-level equivalent of the screen states you defined in Wireframes:

> **Decision Card — Required States Per Component**
> Default · Hover · Focus (visible, accessible) · Active/Pressed · Disabled · Loading (for buttons triggering async actions) · Error (for inputs)

Missing focus states is the most common accessibility gap in beginner-built SaaS products — and it's invisible until someone navigates by keyboard.

---

## Decision 4: Documentation Approach

| Approach | Best for |
|---|---|
| Storybook | Teams, or solo builders who want isolated component testing and visual regression checks |
| Simple markdown component reference | Solo builders moving fast; document props and usage examples in plain text |
| No documentation | Never, even solo — future-you (and every AI session) needs a reference instead of re-reading component source every time |

> [!TIP]
> At minimum, keep one reference file listing every component, its props, and a usage example. This becomes the context you paste into AI prompts during the Frontend development phase instead of pasting entire component files.

---

## Common AI Mistakes to Watch For

- **Builds custom components instead of using accessible primitives** — re-implementing a dropdown's keyboard behavior from scratch when Radix already solved it correctly.
- **Hardcodes pixel values** instead of referencing your token scale — check every generated component against your spacing/color tokens.
- **Skips focus and disabled states** unless explicitly asked — always specify all required states in your prompt.
- **Over-abstracts too early** — building a generic `<DataDisplay>` component before you've built two real screens that need it. Abstract after the second repetition, not before the first.
- **Inconsistent naming** — `primary-color` in one file, `colorPrimary` in another. Lock naming convention before generating multiple components.

---

## AI Prompt: Generate Your Token File & Core Components

```
I'm setting up a design system for a production SaaS app using [shadcn/ui on Tailwind / Radix primitives — state your choice].

Context:
- Color tokens: [paste hex values from Branding]
- Type scale: [paste font + size scale from Branding]
- Spacing scale: 4/8/12/16/24/32/48px
- Radius scale: sm (4px) / md (8px) / lg (12px)

Generate:
1. A design tokens file (CSS variables or Tailwind config — state your preference) using exactly the values above, no invented colors or sizes.
2. Button and Input components built on [your chosen primitive], covering default, hover, focus-visible, active, disabled, and loading states.
3. Confirm which states are missing if I forgot to specify any required ones.

Do not introduce new color or spacing values outside the scales above. Flag anything that needed a value not in my token list.
```

---

## Validate Before You Move On

- [ ] Every color, spacing, and font value used in components traces back to a defined token — no hardcoded one-offs
- [ ] Components are built on accessible primitives, not reimplemented from scratch
- [ ] Every interactive component has default, hover, focus-visible, disabled, and (where relevant) loading/error states
- [ ] Naming convention for tokens is consistent and documented
- [ ] A reference file exists listing components and usage — even a simple one

> [!TIP]
> Keep your token file and component reference handy — you'll paste them directly into Frontend Architecture and Frontend development prompts instead of re-describing your design system each time.

---

**Next:** Accessibility — make sure this system holds up for every user, not just the common case.
