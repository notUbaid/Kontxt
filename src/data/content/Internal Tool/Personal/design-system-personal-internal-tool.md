---
title: Design System
slug: design-system
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Design System

Your wireframes have shape. This module gives them a consistent visual language — a small, deliberate set of colors, type, and spacing rules — so every screen feels like one tool, not a collection of separately-styled pages.

For a personal project, this should take minutes, not days. The goal is consistency, not a brand identity.

---

## Why This Still Matters for a Tool Only You Use

It's tempting to skip this entirely — "it's just for me, who cares what it looks like." But an inconsistent tool is genuinely harder to use quickly, because your eyes have to re-learn what a warning looks like on every screen. A minimal, consistent system is a usability decision, not a vanity one.

> **Rule of thumb**
> You need just enough design system to make "overdue" look the same everywhere it appears. That's the actual bar — not polish, just consistency.

---

## The Minimum Viable Design System

For a personal internal tool, four decisions cover almost everything you'll need:

```
1. A neutral color (text, backgrounds, borders)
2. A warning/urgent color (used ONLY for things needing action)
3. A success/positive color (used for confirmations, "done" states)
4. A type scale (2-3 sizes: heading, body, small/meta text)
```

**Worked example:**

| Purpose | Value | Used for |
|---|---|---|
| Neutral | Dark grey text, light grey borders | Body content, structure |
| Warning | Red | Overdue badges, error messages |
| Success | Green | "Paid," "Saved," confirmations |
| Heading | 20px, semibold | Screen titles |
| Body | 15px, regular | Row content, form labels |
| Meta | 13px, muted grey | Timestamps, secondary info |

That's the entire system. Resist the urge to add a fifth color "just in case" — every additional color dilutes the meaning of the ones that matter.

---

## Color Should Carry Meaning, Not Decoration

The single highest-value design rule for an internal tool: **a color should always mean the same thing, everywhere it appears.** If red means "overdue" on the list view, it can't also mean "this button is important" on another screen — that breaks the signal you're relying on to scan quickly.

> **Example**
> If red = overdue/urgent, don't also use red for your "+  Add Invoice" button just because it looks bold. Use your neutral color for standard actions, and reserve the warning color exclusively for things that actually need attention.

---

## Spacing Consistency Beats Spacing Cleverness

Pick one spacing unit (e.g., 8px) and use multiples of it everywhere — 8, 16, 24, 32. This single decision eliminates most of the "why does this screen feel slightly off" problems that come from inconsistent, eyeballed spacing.

> **Tip callout**
> If you're building with a framework that includes a default spacing scale (most component libraries do), use it as-is rather than inventing your own. Consistency you get for free is better than consistency you have to enforce by hand.

---

## Don't Design a System for Screens You Haven't Built

It's easy to over-invest here — defining hover states, dark mode, animation timing — for a tool that's still an MVP with three screens. Build the system your actual wireframes need, and expand it only when a new screen genuinely requires something the current system doesn't cover.

- Does every wireframed screen use only the colors and type sizes already defined?
- Is there anything in the system that isn't used anywhere yet? Cut it.

---

## Reuse, Don't Reinvent

For a personal project, the highest-leverage move is usually to adopt an existing component library's default design tokens rather than defining your own from scratch. This gives you a coherent, accessible baseline for free, and you only override what your specific rules (like the overdue/success color meaning) require.

> **Best practice**
> Check what design tokens your chosen frontend stack already ships with before inventing new values. Overriding two or three tokens to match your business rules' color meanings is much less work than building a system from zero.

---

## Using AI to Assemble the System From Your Wireframes

> **Copy this prompt**
> ```
> Here are my wireframes and the states they need to represent:
>
> Screens: [list your screens]
> States needing visual distinction: [e.g. overdue, paid, upcoming]
>
> Help me define a minimal design system:
> 1. Propose a neutral, warning, and success color — with warning
>    reserved exclusively for the state(s) that need urgent attention.
> 2. Propose a 3-tier type scale (heading, body, meta) sized for a
>    [phone/desktop] screen.
> 3. Suggest a single spacing unit and its common multiples.
> 4. Flag if I'm defining anything that isn't actually used by any
>    of my current screens.
> ```

---

## What You Should Have Now

- One neutral, one warning, and one success color — each with a single, consistent meaning
- A 2-3 size type scale covering headings, body, and meta text
- A single spacing unit used consistently across all screens
- Confirmation that nothing in the system is unused by your actual wireframes

With a consistent visual language defined, the next module — Accessibility — makes sure this system (and the tool as a whole) remains usable, including for you on a bad-lighting day or a small phone screen.
