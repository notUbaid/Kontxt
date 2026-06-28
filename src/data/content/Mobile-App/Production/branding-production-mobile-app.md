---
title: Branding
slug: branding
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 30–40 min
---

# Branding

Branding is not decoration. It's the first thing users judge and the last thing they remember.

On mobile, users decide within seconds whether an app feels trustworthy, polished, and worth their attention. That judgment happens before they read a single word. It happens through color, typography, shape, and motion — all of which are branding decisions.

This module covers how to build a brand foundation that holds up across every screen, every state, and every platform.

---

## Brand Before Design

Branding answers three questions. Answer them before picking a single color.

**1. Who is this for?**
Not demographics. Psychographics. How does your user think about themselves? What do they care about? What do they distrust?

**2. What does this app make the user feel?**
Pick two or three words. Not "modern" or "clean" — those are table stakes. Go specific: *confident, effortless, playful, focused, trustworthy, bold, calm, premium*.

**3. What does this app stand for?**
One sentence. The belief behind the product. Not what it does — what it believes. "We believe [group] deserves [thing] without [friction]."

These answers drive every visual decision that follows.

---

## Color

### The Three-Role System

Every app needs exactly three color roles. More creates inconsistency. Fewer creates monotony.

```
Primary     → Brand color. CTAs, key UI elements, active states.
             Used sparingly — high contrast, maximum impact.

Neutral     → Backgrounds, surfaces, text, borders.
             80% of your UI. Should feel invisible.

Semantic    → System feedback. Always the same.
             Success (#22C55E green family)
             Warning (#F59E0B amber family)
             Error   (#EF4444 red family)
             Info    (#3B82F6 blue family)
```

### Choosing Your Primary Color

```
What you want to convey → Color direction

Trust, reliability, calm      → Blue (#2563EB, #0EA5E9)
Energy, urgency, passion      → Red / Orange (#EF4444, #F97316)
Growth, health, nature        → Green (#16A34A, #10B981)
Creativity, luxury, wisdom    → Purple (#7C3AED, #A855F7)
Optimism, warmth, attention   → Yellow / Amber (#F59E0B, #EAB308)
Premium, editorial, power     → Black / Near-black (#09090B, #18181B)
Friendly, playful, social     → Pink / Coral (#EC4899, #F43F5E)
```

### Dark Mode from Day One

Production mobile apps support dark mode. Design for both from the start — retrofitting is expensive.

```
Light Mode                    Dark Mode
──────────────────────────    ──────────────────────────
Background:    #FFFFFF        Background:    #09090B
Surface:       #F4F4F5        Surface:       #18181B
Border:        #E4E4E7        Border:        #27272A
Text primary:  #09090B        Text primary:  #FAFAFA
Text muted:    #71717A        Text muted:    #A1A1AA
Primary:       [your color]   Primary:       [lighter variant]
```

Never use pure black (#000000) as a background in dark mode — it creates harsh contrast and looks artificial. Use near-black (#09090B or #0A0A0A).

### Accessibility: Contrast Ratios

```
Normal text (< 18pt):   minimum 4.5:1 contrast ratio (WCAG AA)
Large text (≥ 18pt):    minimum 3:1 contrast ratio
Interactive elements:   minimum 3:1 against adjacent colors

Tools to check:
→ Figma: Contrast plugin
→ Web: webaim.org/resources/contrastchecker
→ iOS: Accessibility Inspector
```

>  **Warning:** Light gray text on white background is the most common accessibility failure in mobile apps. Check every text color combination before finalizing.

---

## Typography

### The Two-Font Rule

Mobile apps use two typefaces maximum. One for display/headings, one for body. Often the same family covers both.

```
Option A — Single family (simplest, most cohesive)
  All text: Inter, SF Pro, or Roboto
  Differentiate through weight and size only

Option B — Paired families (more expressive)
  Display: Serif or distinctive sans for headings
  Body: Neutral sans for reading

Never:
  More than 2 typefaces
  Decorative fonts for body text
  Script fonts at small sizes
```

### Type Scale

Establish a fixed scale. Never use arbitrary sizes.

```
Mobile Type Scale (pt / sp)

xs:   12    Caption, metadata, badges
sm:   14    Secondary text, labels
base: 16    Body text (default)
lg:   18    Emphasized body, subheadings
xl:   20    Section headers
2xl:  24    Screen titles
3xl:  30    Display, hero text
4xl:  36    Large display
```

### Platform Defaults

```
iOS default system font:     SF Pro (automatic when using .systemFont)
Android default system font: Roboto (automatic with Material)

Using system fonts:
 Renders at native quality
 Respects user accessibility settings (Dynamic Type / Font Scale)
 Zero bundle size
 Less distinctive branding

Custom fonts require:
→ Font files bundled in app (adds size)
→ Dynamic Type / Font Scale support wired manually
→ Testing across all text size settings
```

For most production apps: use the system font with custom weights and sizing. Only bundle a custom font if it's central to your brand identity.

---

## Iconography

### System Icons vs Custom Icons

```
System icons (SF Symbols / Material Icons):
 Free, extensive library
 Automatically match platform conventions
 Scale perfectly, support all weights
 Support accessibility features
 Generic — don't differentiate your brand

Custom icons:
 Distinctive, ownable
 Can match your brand personality exactly
 Must design every icon
 Must maintain as app grows
 Must test across sizes and colors
```

**Recommended:** Use system icons for standard UI functions (back, close, search, settings, share). Use custom icons only for your core feature actions — the things that make your app unique.

### Icon Sizing

```
Tab bar icons:      24–28pt
Navigation icons:   22–24pt
In-content icons:   16–20pt
Large feature icons: 32–48pt
App icon:           1024×1024px (exported at all required sizes)
```

---

## Logo and App Icon

### App Icon Design Rules

The app icon is the most visible piece of branding your app has. It appears on the home screen, App Store, search results, and notifications.

```
iOS App Icon:
→ 1024×1024px source file
→ No transparency (iOS clips to rounded rect automatically)
→ No text (unreadable at small sizes)
→ Works on both light and dark wallpapers
→ Simple enough to read at 60×60pt
→ Avoid gradients that look muddy at small sizes

Android Adaptive Icon:
→ Foreground layer: 108×108dp (safe zone: 72×72dp center)
→ Background layer: solid color or simple pattern
→ Foreground must work on any background shape
→ Google Play rounds, clips, and reshapes — design defensively
```

### Icon Design Principles

```
 One focal element — not multiple competing shapes
 High contrast between icon and background
 Recognizable at 60×60pt (home screen size)
 Unique enough to distinguish from similar apps
 Consistent with your overall color palette

 Text or wordmarks (unreadable small)
 Screenshots of the app
 Overly complex illustrations
 Thin lines (disappear at small sizes)
 Near-identical to a well-known app's icon
```

---

## Voice and Tone

Brand isn't only visual. The words your app uses are part of the brand.

### Define Your Voice Attributes

```
Pick 3 from this list — then define what each means for your app:

Friendly     Confident     Playful      Direct
Empathetic   Authoritative Encouraging  Witty
Calm         Energetic     Precise      Warm
```

### Tone Application

```
Scenario              Tone shift example
──────────────────    ──────────────────────────────────────────
Error messages:       Friendly, never blaming → "Couldn't load. Try again."
Empty states:         Encouraging → "No results yet — be the first."
Success moments:      Warm, brief → "Done!" or "You're all set."
Onboarding:           Confident, benefit-first → "Track anything. Instantly."
Destructive actions:  Direct, clear consequence → "Delete post? This can't be undone."
```

> **Rule:** Error messages are the most important copy in your app. Users read them when something is wrong. They should be calm, clear, and never blame the user.

---

## Brand in Motion

Animation is part of branding. Consistent motion makes an app feel designed, not assembled.

```
Establish 3 values:

Duration:
  Micro (feedback):      100–150ms   Button press, toggle
  Standard (transition): 200–300ms   Screen transition, modal
  Emphasis (reveal):     400–500ms   Onboarding, celebration

Easing:
  Enter (decelerate):    ease-out    Elements appearing
  Exit (accelerate):     ease-in     Elements leaving
  Position change:       ease-in-out Moving between states

Principle:
  Never animate for decoration
  Always animate to communicate state change
  Reduce motion respected (accessibility)
```

---

## Brand Document

Before moving to Design System, produce a one-page brand reference. Every collaborator uses the same source of truth.

Include:
- Brand name and tagline
- 3 brand personality words
- Primary color + hex
- Neutral palette (5–7 shades)
- Semantic colors
- Primary typeface + scale
- Icon style (system / custom)
- Voice attributes (3 words)
- Do / Don't examples (2 each)

This document is the answer to "does this feel on-brand?" It converts subjective taste into objective criteria.

---

## AI Prompt: Brand Identity Generation

```
You are a senior brand designer and UX strategist helping define the visual identity for a mobile app.

App name: [name]
App type: [what it does in one sentence]
Target users: [who uses it, their mindset]
Brand personality words: [3 words from your earlier decision]
Competitors: [2–3 apps in the same space]

Generate:
1. Primary color recommendation with hex value and rationale
2. Full neutral palette (background, surface, border, text-primary, text-muted) for both light and dark mode
3. Typography recommendation — system font or custom, with rationale
4. Type scale (6 sizes: xs through 2xl) in pt values
5. Icon style recommendation (SF Symbols / Material / custom) with rationale
6. 3 voice attributes with one example sentence each showing how the tone applies
7. 2 brand "do" and 2 brand "don't" guidelines specific to this app

Format each section clearly. Be opinionated — give one recommendation per decision, not a list of options.
```

---

## Implementation Checklist

- [ ] 3 brand personality words defined and agreed on
- [ ] Primary color chosen with light and dark variants
- [ ] Full neutral palette defined for light and dark mode
- [ ] Semantic colors defined (success, warning, error, info)
- [ ] All color combinations checked for WCAG AA contrast
- [ ] Typography choice made (system or custom)
- [ ] Type scale defined (6–8 sizes, named consistently)
- [ ] Icon strategy decided (system / custom / hybrid)
- [ ] App icon concept designed and tested at 60×60pt
- [ ] Voice attributes defined (3 words)
- [ ] Error and empty state copy written in brand voice
- [ ] Animation duration and easing values defined
- [ ] One-page brand reference document created

---

## Common Mistakes

**Choosing colors for aesthetics, not contrast.**
A soft lavender on white looks beautiful in Figma at 100% zoom. At 14pt on a phone screen in sunlight, it's illegible. Test every text color at actual device size before committing.

**Skipping dark mode.**
Designing light mode first and "adding dark mode later" results in either a rushed implementation or a permanently broken dark mode. Define both palettes simultaneously. They inform each other.

**Too many typeface weights.**
Using Light, Regular, Medium, SemiBold, Bold, and ExtraBold in the same app creates visual noise. Use three weights maximum: Regular for body, Medium for emphasis, SemiBold or Bold for headings.

**App icon that only works large.**
Your icon looks great at 1024×1024. At 60×60 on a cluttered home screen, the detail disappears and it reads as an indistinct blob. Test the icon at actual size, surrounded by other app icons, before finalizing.

**Inconsistent voice.**
Button labels are terse. Error messages are verbose. Onboarding is warm. Notifications are cold and corporate. Users feel the inconsistency even if they can't name it. Write all copy through the same voice filter.

---

## Quick Reference

```
Color roles?             → Primary, Neutral, Semantic (3 only)
Dark mode backgrounds?   → Near-black (#09090B), not pure black
Contrast minimum?        → 4.5:1 for body text (WCAG AA)
Typefaces max?           → 2
Font weights max?        → 3
Type scale sizes?        → 6–8 named steps
Icon sizing (tab bar)?   → 24–28pt
App icon source size?    → 1024×1024px
Animation standard?      → 200–300ms ease-out (enter) / ease-in (exit)
Brand personality?       → 3 words, defined before any visual decisions
```

---

## What's Next

**Design System** — your brand decisions become reusable components. The next module covers how to build a design system in Figma: tokens, components, variants, and the handoff structure that lets you and your team build new screens in minutes instead of hours.
