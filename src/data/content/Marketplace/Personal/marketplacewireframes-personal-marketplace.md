---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 30-40 min
filename: wireframes-personal-marketplace.md
---

# Wireframes

Your flows defined the screens and the path between them. Wireframes give each screen a rough shape — what's on it, roughly where, before any real visual design happens. This module deliberately stays low-fidelity. The point isn't to make these look good; it's to validate layout and content decisions cheaply, before the Design System module locks in how things actually look.

A common solo-builder trap is skipping straight from flows to a polished UI. That collapses two different decisions (what goes where, and what it looks like) into one step, making both harder to get right and far more expensive to change.

---

## Why Low-Fidelity, On Purpose

A wireframe with boxes and labels takes minutes to revise. A polished mockup with real colors, fonts, and spacing takes much longer to revise — which means you'll be more reluctant to change it even when you should. Low fidelity keeps the cost of being wrong low, exactly when you're most likely to be wrong (before you've seen it laid out at all).

> **Decision:** Use boxes, labels, and rough proportions only. No real copy unless it's structurally important (e.g., a price needs to look like a price). No colors, no fonts, no polish. If you're choosing a font at this stage, you're doing Design System's job too early.

---

## One Wireframe Per Screen From Your Flows

Go back to your User Flows module and list every distinct screen mentioned. For a typical MVP, that's usually 6-9 screens:

```
1. Sign up / Login
2. Browse / Home (listing grid)
3. Listing Detail
4. Create/Edit Listing (form)
5. Message Thread
6. My Listings (seller's own)
7. Profile (minimal)
```

> **Tip:** If a screen wasn't in your flows, question whether it belongs in MVP at all — going back to MVP Scope, anything not on the core loop's path probably isn't needed yet. Wireframing is a good moment to catch scope creep that snuck past the planning phases.

---

## What Belongs on Each Wireframe

For every screen, identify three things before drawing anything:

- **Primary content**: the one thing this screen exists to show or collect (a listing's details, a form's fields)
- **Primary action**: the one button/action this screen is built around (submit, message, browse)
- **Navigation**: how someone gets here, and where the obvious next steps lead

> **Decision:** Every screen should have one clear primary action. If a wireframe has three equally-weighted buttons competing for attention, that's a sign the screen is trying to do too much — split it or simplify before moving to Design System.

---

## Marketplace-Specific Wireframe Considerations

### Listing Grid / Browse Screen
This is usually your highest-traffic screen and deserves the most thought. At minimum: image, title, price visible per listing card without clicking in. A search/filter bar above the grid, simple — category dropdown and a text search box is enough for MVP.

### Listing Detail Screen
Needs: full description, all images, price, seller info (name, maybe a join date — nothing elaborate at MVP), and the primary action (message seller, or book, depending on your marketplace type). Resist adding a sidebar of "related listings" or other secondary content at MVP — that's a fast-follow feature, not core.

### Create/Edit Listing Form
The single most important UX decision: how many fields, and in what order. Cross-reference your Supply Side module's "low listing friction" need — if that was a top priority, your form should be short enough to wireframe on one screen, no multi-step wizard.

### Message Thread
At MVP, a simple chronological list of messages with a text input at the bottom is enough. Don't wireframe read receipts, typing indicators, or attachments unless your marketplace type genuinely requires them.

> **Warning:** It's tempting to wireframe a "complete" version of each screen, including features from Fast Follow or Not Yet in your MVP Scope. Wireframe only what's in MVP scope — anything else creates a visual promise you're not building yet, which makes the gap between wireframe and real MVP feel like a failure later instead of an intentional choice.

---

## Quick Wireframing Format (No Design Tool Required)

For a personal project, a design tool (Figma, Excalidraw) is nice but not required to get value from this step. A simple text or ASCII layout captures the same decisions:

```
[Listing Detail Screen]
┌─────────────────────────────┐
│  [Image]                     │
│  Title                       │
│  $Price                      │
│  Description (a few lines)   │
│  Seller: [name]               │
│  [ Message Seller ]  ← primary action
└─────────────────────────────┘
```

This is enough to validate the layout decision. If you do want a visual tool, Figma or Excalidraw both work well and have free tiers more than sufficient for a personal project.

---

## AI Prompts You Can Use

**Prompt 1 — Generate wireframe content specs from your flows:**

```
Here are my user flows: [paste them]. For each distinct screen, list the
primary content, the single primary action, and how someone navigates
to and from this screen. Format it as a content spec I can use to
wireframe each screen, not full visual design — no colors or fonts.
```

**Prompt 2 — Check for screens trying to do too much:**

```
Here's my wireframe content spec: [paste it]. For each screen, is there
more than one action competing for primary attention? Flag any screen
that should be split into two, or simplified, and explain why.
```

---

## Validating What AI Generates

- **Cross-check every wireframed screen against your MVP Scope feature list** — cut anything (related listings, saved searches, advanced filters) that snuck in but isn't actually in MVP scope
- **Confirm each screen really has one primary action**, not a generated spec that lists three "important" actions without picking one
- **Verify the listing form field list matches what you actually need for your marketplace type** — a generic AI-suggested field list may include fields irrelevant to your specific goods/services (e.g., "condition" doesn't apply to a services marketplace)

---

## Implementation Checklist

- [ ] One wireframe (or content spec) created per screen identified in User Flows
- [ ] Every screen has exactly one identified primary action
- [ ] Listing grid, listing detail, and listing form wireframes reviewed specifically against marketplace-specific considerations above
- [ ] No Fast-Follow or Not-Yet features appear in any MVP wireframe
- [ ] Wireframes kept low-fidelity — no colors, fonts, or real visual polish yet

---

## What's Next

Next: **Design System** — establishing the actual visual language (colors, type, components) that turns these wireframes into a real, polished interface.
