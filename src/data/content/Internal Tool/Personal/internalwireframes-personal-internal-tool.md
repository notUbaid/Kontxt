---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Wireframes

You know your screens, your flow, your business rules, and your dashboard hierarchy. This module turns that into rough layouts — where things actually sit on the screen, before any real visual design happens.

Wireframes are deliberately ugly. That's the point: you're deciding placement and priority, not colors or fonts.

---

## Why Wireframe Before Designing

Skipping straight to a polished design (or worse, straight to AI-generated UI code) tends to produce screens shaped by whatever the tool or template made easy, not by your actual information hierarchy from the Dashboard Strategy module. Wireframing first keeps the decisions in your hands.

> **Rule of thumb**
> If you can't sketch a screen with boxes and labels in under two minutes, you don't understand its layout well enough to design or build it yet.

---

## Boxes, Not Pixels

A wireframe for a personal tool needs exactly three kinds of marks: rectangles for content blocks, labels for what goes inside them, and rough size/position to show hierarchy. No colors, no fonts, no icons yet.

**Worked example — Invoice List screen:**

```
┌─────────────────────────────┐
│  Invoice Tracker      [+]   │  ← header + add button
├─────────────────────────────┤
│   OVERDUE (2)               │  ← primary tier, top position
│  ┌─────────────────────┐    │
│  │ Acme Co.   $1,200    │    │
│  │ due 8 days ago        │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ Beta LLC   $800       │    │
│  │ due 12 days ago       │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│  Upcoming (3)                │  ← secondary tier, below
│  [collapsed list]            │
└─────────────────────────────┘
```

This single rough sketch already encodes real decisions: overdue items get their own labeled section at the top, upcoming items are visually de-prioritized (collapsed), and the primary action ("+") is always reachable from the header.

---

## Wireframe Every Screen From Your User Flow

Go through your numbered screen list from the User Flows module and produce one rough layout per screen. Don't skip the "boring" ones — the Add Invoice Form deserves the same five minutes as the main dashboard.

- Invoice List (primary view)
- Invoice Detail
- Add Invoice Form
- Any empty/first-use state flagged earlier

> **Tip callout**
> Wireframe on paper or in a plain text editor before touching any design tool. The friction of a polished tool tempts you to make styling decisions prematurely — exactly what wireframing is meant to prevent.

---

## Let Your Dashboard Tiers Drive Layout Directly

Remember the Primary / Secondary / Tertiary tiers from Dashboard Strategy? They translate directly into wireframe position:

| Tier | Wireframe placement |
|---|---|
| Primary | Top of screen, largest, no scrolling required to see |
| Secondary | Below the fold, or in a clearly separate section |
| Tertiary | Collapsed, in a settings area, or omitted from this screen entirely |

If your wireframe doesn't reflect this ordering, go back and check — did the layout drift because something looked good, rather than because it matched your actual priorities?

---

## Design for the Device You'll Actually Use

Your PRD constraints likely specified a device (phone, laptop, both). Wireframe for that reality, not an idealized desktop layout you'll rarely use.

> **Example**
> If your invoice tracker's real use case is a 10-second glance on your phone between meetings, wireframe a single-column, thumb-reachable layout — not a three-column dashboard that only makes sense on a wide monitor.

---

## Keep Interaction Notes Next to the Boxes

A wireframe that's just static boxes misses what happens when you tap something. Add short notes for interactions directly on the sketch.

> **Example note**
> "Tap invoice card → goes to Invoice Detail" / "Tap [+] → opens Add Invoice Form as a modal, not a new screen"

These notes remove ambiguity before you reach Phase 3, where "modal vs. new screen" becomes an actual implementation decision that's much cheaper to make now, in a sketch, than to redo in code later.

---

## Using AI to Turn Rough Notes Into a Wireframe Description

If sketching by hand isn't practical, describe the layout in words and let AI help structure it — then verify it matches your actual priorities.

> **Copy this prompt**
> ```
> Here's my dashboard hierarchy and screen list:
>
> Core question: [paste]
> Primary / Secondary / Tertiary data: [paste]
> Screens from user flow: [paste]
>
> For each screen, describe a rough layout in words: what's at the
> top, what's below, what's collapsed or hidden by default. Follow
> my tier priorities exactly — primary content must be visible
> without scrolling.
>
> Also note, for each interactive element, what it does when tapped
> or clicked.
> ```

> **Watch out for premature polish**
> If AI or a design tool starts suggesting specific colors, fonts, or icon choices at this stage, set that aside. That's the Design System module's job — mixing it in now makes it harder to evaluate whether the layout itself actually works.

---

## What You Should Have Now

- A rough layout for every screen in your user flow, including the "boring" ones
- Layouts that visibly reflect your Primary / Secondary / Tertiary priorities
- Interaction notes on what each tappable element does
- Layouts sized realistically for the device you'll actually use

With rough layouts in place, the next module — Forms Design — goes deep on your Add Invoice Form and any other data-entry screens, since those deserve more specific attention than a general wireframe pass gives them.
