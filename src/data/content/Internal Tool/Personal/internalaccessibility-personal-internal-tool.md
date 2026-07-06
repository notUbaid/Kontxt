---
title: Accessibility
slug: accessibility
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Accessibility

Accessibility usually gets framed as a compliance requirement for public products. For a personal tool, reframe it: this is about the tool remaining usable to *you*, in every real condition you'll actually use it — bad lighting, a cracked phone screen, one hand full of groceries, or just a bad day for your eyes.

A handful of low-effort decisions now prevent real friction later.

---

## Why This Belongs in Personal Mode at All

> **The honest case for accessibility here**
> You will use this tool tired, distracted, outdoors in bright sun, or half-looking at your phone while doing something else. Every accessibility principle designed for someone with a permanent visual or motor difference also helps you in these very common temporary situations. This isn't extra work for an imaginary user — it's robustness for the actual conditions you'll use the tool in.

---

## Color Contrast: The Highest-Leverage Fix

Your Design System module picked a warning color for "overdue" and a success color for "paid." If those colors don't have enough contrast against their background, they fail silently — you'll misread status at a glance, which defeats the entire purpose of using color to communicate meaning.

- Does your warning color pass a basic contrast check against its background? (Aim for at least 4.5:1 for text, 3:1 for large elements like badges)
- Would the badge still be distinguishable if viewed in bright sunlight on a phone screen?

> **Tip callout**
> Free contrast-checker tools exist online — paste your two hex colors in and get an instant pass/fail. This takes under a minute and catches a surprisingly common mistake: colors that look fine on a calibrated monitor but wash out on a phone outdoors.

---

## Never Rely on Color Alone

This is the single most important accessibility rule for an internal tool, and it has nothing to do with formal compliance — it's about redundancy. If your only signal for "overdue" is the color red, anyone with any form of color vision difference (roughly 1 in 12 men) sees a normal-looking row.

> **Fix: pair color with a second signal**
> Red badge + the word "Overdue" + an icon. Green + the word "Paid" + a checkmark. If you removed the color entirely, the status should still be obvious from text or icon alone.

Check every place your design system uses color to carry meaning, and confirm it has a non-color backup.

---

## Tap Targets: Small Details, Real Friction

If your tool is used on a phone (check your PRD constraints), every tappable element needs to be genuinely easy to tap without precision — especially for a tool you'll use quickly, one-handed, while doing something else.

> **Rule of thumb**
> Tappable elements should be at least 44×44px, with enough space around them that adjacent taps don't overlap. This one number prevents most "I tapped the wrong invoice" frustration.

---

## Text Size Should Survive a Bad Moment

Don't hardcode tiny meta text just because it looks clean in a mockup. A 11px timestamp might look fine while designing at a desk — it's much harder to read on a phone in motion, or if you're simply tired.

- Is your smallest text size still comfortably readable at arm's length on your actual phone?
- Does your layout still work if text is scaled up (most phones let users increase system font size)?

---

## Keyboard and Focus, If You'll Ever Use This on Desktop

If there's any chance you'll use this tool from a laptop, make sure you can tab through the form fields in a sensible order and see clearly which field is currently focused. This is a five-minute check that saves real annoyance the first time you're filling out a form without touching the mouse.

> **Quick check**
> Open your form, press Tab repeatedly. Does focus move field to field in the order you'd expect? Is it visually obvious which field is currently active?

---

## What Not to Over-Build

For a single-user personal tool, you don't need: full screen-reader optimization, WCAG AAA compliance, or multi-language support — unless you have a specific reason to want that level of rigor as a learning exercise. Apply judgment here the same way you did in MVP Scope: solve for real conditions you'll actually encounter, not a checklist built for a different context.

> **Decision card**
> If you're building this partly to practice production-grade accessibility skills, say so explicitly and treat the fuller checklist as a deliberate learning goal — not because the personal tool strictly requires it.

---

## Using AI to Audit Your Design Decisions

> **Copy this prompt**
> ```
> Here's my design system and how I'm using color to communicate
> status:
>
> Colors: [paste from Design System module]
> States relying on color: [e.g. "overdue = red badge"]
>
> Review this for real-world usability:
> 1. Does each color-coded state also have a non-color signal (text,
>    icon)? Flag any that rely on color alone.
> 2. Are there any contrast concerns given these color pairings?
> 3. If this is used primarily on a phone, are there any tap target
>    or text size issues I should reconsider?
>
> Keep the fixes minimal and proportional to a single-user personal
> tool — don't recommend a full compliance audit.
> ```

---

## What You Should Have Now

- Every color-coded status paired with a non-color signal (text or icon)
- A quick contrast check on your warning and success colors
- Tap targets sized appropriately if the tool will be used on a phone
- Text sizes confirmed readable in realistic, non-ideal conditions

With the tool designed to remain usable in real conditions, the next module — Loading States — covers what the interface should show while data is being fetched or saved, so the tool never feels broken during normal delays.
