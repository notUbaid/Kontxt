---
title: Design System
slug: design-system
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 35–45 min
---

# Design System

A design system is not a style guide. It is not a component library. It is not a Figma file.

A design system is a shared language between designers and engineers. When it works, everyone builds with the same pieces, in the same way, producing consistent results without constant coordination. When it doesn't exist, every screen is invented from scratch and every inconsistency requires a meeting to resolve.

Build yours before you build any screens.

---

## What Goes in a Design System

```
Tokens          → The atomic values: colors, spacing, typography, radius, shadows
Components      → Reusable UI pieces built from tokens: Button, Input, Card, Badge
Patterns        → Recurring compositions of components: Forms, Lists, Navigation
Documentation   → Rules for when and how to use each piece
```

Every layer depends on the one below it. Change a token, every component that uses it updates automatically. That's the point.

---

## Design Tokens

Tokens are named values. They replace hardcoded values everywhere in your design and code.

### Color Tokens

```
Primitive tokens (raw values — never used directly in UI):
  color-blue-500:    #3B82F6
  color-blue-600:    #2563EB
  color-zinc-50:     #FAFAFA
  color-zinc-900:    #18181B

Semantic tokens (what the color means — used everywhere):
  color-primary:          color-blue-600
  color-primary-hover:    color-blue-700
  color-background:       color-zinc-50      (light) / color-zinc-950  (dark)
  color-surface:          #FFFFFF            (light) / color-zinc-900  (dark)
  color-border:           color-zinc-200     (light) / color-zinc-800  (dark)
  color-text-primary:     color-zinc-900     (light) / color-zinc-50   (dark)
  color-text-muted:       color-zinc-500     (light) / color-zinc-400  (dark)
  color-success:          #22C55E
  color-warning:          #F59E0B
  color-error:            #EF4444
```

Engineers implement semantic tokens as constants or theme variables. Designers use them as Figma styles. When dark mode changes `color-background`, it changes everywhere simultaneously.

### Spacing Tokens

Use a base-4 or base-8 scale. Never use arbitrary values.

```
spacing-1:    4pt
spacing-2:    8pt
spacing-3:    12pt
spacing-4:    16pt    ← default padding
spacing-5:    20pt
spacing-6:    24pt
spacing-8:    32pt
spacing-10:   40pt
spacing-12:   48pt
spacing-16:   64pt
```

Everything in your layout comes from this scale. Padding, margins, gaps, icon sizes, component heights — all tokens.

### Border Radius Tokens

```
radius-sm:    4pt     Small chips, tags
radius-md:    8pt     Inputs, small cards
radius-lg:    12pt    Cards, sheets
radius-xl:    16pt    Large cards, modals
radius-full:  9999pt  Pills, avatars, badges
```

### Typography Tokens

```
font-family-base:     System default (SF Pro / Roboto)
font-family-display:  [custom font if used]

font-size-xs:    12pt
font-size-sm:    14pt
font-size-base:  16pt
font-size-lg:    18pt
font-size-xl:    20pt
font-size-2xl:   24pt
font-size-3xl:   30pt

font-weight-regular:    400
font-weight-medium:     500
font-weight-semibold:   600
font-weight-bold:       700

line-height-tight:    1.2    Headings
line-height-normal:   1.5    Body text
line-height-relaxed:  1.75   Long-form reading
```

### Shadow / Elevation Tokens

```
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)       Subtle cards
shadow-md:   0 4px 6px rgba(0,0,0,0.07)       Cards, dropdowns
shadow-lg:   0 10px 15px rgba(0,0,0,0.10)     Modals, sheets
shadow-xl:   0 20px 25px rgba(0,0,0,0.12)     Popovers
```

---

## Core Components

Every mobile app needs these components. Build them once. Use them everywhere.

### Button

```
Variants:
  Primary    → Filled, brand color — the main action
  Secondary  → Outlined or tinted — supporting action
  Ghost      → No background — tertiary action
  Destructive → Red filled — irreversible actions

Sizes:
  sm    → height: 36pt, font-size-sm, padding-x: spacing-3
  md    → height: 44pt, font-size-base, padding-x: spacing-4  (default)
  lg    → height: 52pt, font-size-lg, padding-x: spacing-6

States:
  Default → base styles
  Pressed → 10% darker background, scale 0.97
  Disabled → 40% opacity, no interaction
  Loading → spinner replaces label, disabled interaction

Rules:
  → Min width: touch target (44pt)
  → Full width on mobile forms
  → Never more than 1 Primary per screen section
  → Loading state prevents double-tap submission
```

### Input

```
Anatomy:
  Label (above, always visible — never placeholder-only)
  Input field (height: 44pt minimum)
  Helper text (optional, below field)
  Error message (below field, color-error, icon prefix)

States:
  Default  → border: color-border
  Focused  → border: color-primary, 2pt width
  Filled   → border: color-border (returns to default)
  Error    → border: color-error, error message visible
  Disabled → background: color-surface, 50% opacity

Rules:
  → Label always visible (not hidden as placeholder)
  → Placeholder shows example, not instruction
  → Error replaces helper text in same slot
  → Keyboard type matches input (email, numeric, phone, url)
  → autocomplete / textContentType set for password managers
```

### Card

```
Variants:
  Default    → Surface background, shadow-sm, radius-lg
  Outlined   → Transparent background, border, radius-lg
  Interactive → Default + pressed state (scale 0.98, shadow none)

Anatomy:
  Optional image (top, full-width)
  Content area (padding: spacing-4)
  Optional footer (border-top, actions)

Rules:
  → Never nest interactive cards inside interactive cards
  → Full card should be tappable (not just a small button inside)
  → Minimum height: 64pt
```

### Avatar

```
Sizes:
  xs:   24pt    In lists, alongside names
  sm:   32pt    Comments, compact contexts
  md:   40pt    Standard — nav bars, list items
  lg:   56pt    Profile previews
  xl:   80pt    Profile screen header
  2xl:  120pt   Full profile view

States:
  Image loaded    → circular image
  Loading         → skeleton pulse animation
  Fallback        → initials on colored background
  Online status   → colored dot, bottom-right, border from surface

Rules:
  → Always circular (radius-full)
  → Always provide text fallback (initials)
  → Border matches surface color (appears to float above background)
```

### Badge / Chip

```
Badge (notification count):
  → Filled circle, color-error background
  → Max "99+" — never show actual count above 99
  → Positioned top-right of parent element

Chip (filter / tag):
  Variants:
    Default    → Outlined, neutral
    Selected   → Filled, primary color
    Removable  → Selected + close icon

  Sizes: height 28pt (sm) / 32pt (md)
  Border radius: radius-full (pill shape)
```

### Bottom Sheet

```
Types:
  Standard   → Fixed height, scrollable content
  Dynamic    → Height determined by content
  Full       → Near full-screen, complex tasks

Anatomy:
  Drag handle (4×24pt pill, centered, spacing-2 from top)
  Optional header (title + close button)
  Content area
  Optional sticky footer (actions)

Behavior:
  → Tap outside or drag down to dismiss
  → Keyboard-aware (shifts up with keyboard)
  → Background overlay: rgba(0,0,0,0.5)
  → Animation: 300ms ease-out upward slide

Rules:
  → Never use for primary navigation
  → Use for focused tasks that don't deserve a full screen
  → Always provide explicit close option (don't rely on drag-only)
```

### Toast / Snackbar

```
Position:   Bottom, above tab bar, spacing-4 from edge
Duration:   Success: 3s / Error: 5s / Action: persistent until acted on

Variants:
  Success  → color-success icon + message
  Error    → color-error icon + message
  Info     → color-primary icon + message
  Action   → message + text button (e.g., "Undo")

Rules:
  → One toast visible at a time (queue, don't stack)
  → Never use for critical errors (use inline error instead)
  → Keep messages under 60 characters
  → Accessible: screen readers announce on appear
```

---

## Navigation Components

### Tab Bar

```
Items: 3–5 tabs (never more)
Icon size: 24–28pt
Label size: font-size-xs (10pt on iOS)
Height: 49pt (iOS) / 56dp (Android) + safe area inset

States per tab:
  Default  → Muted icon + muted label
  Active   → Primary color icon + primary label
  Badge    → Notification badge top-right of icon

Rules:
  → Active state must be immediately obvious
  → Labels always visible (don't hide on inactive)
  → Icons meaningful without labels
  → Haptic feedback on tab change (iOS)
```

### Navigation Bar (Top)

```
Standard:
  Left:   Back button (← text on iOS, ← icon on Android) or menu
  Center: Screen title (font-size-lg, font-weight-semibold)
  Right:  0–2 action icons (24pt, 44pt touch target)

Large title (iOS):
  Collapses to standard on scroll
  Use for top-level screens only

Rules:
  → Never more than 2 right actions
  → Destructive actions (delete, leave) never in nav bar
  → Title describes current screen, not app name
```

---

## Figma Setup

Structure your Figma file to match the system you're building.

```
Figma File Structure:

 _Foundations
  → Colors (all tokens as styles)
  → Typography (all text styles)
  → Spacing (reference frame)
  → Icons (master icon components)

 Components
  → Button (all variants + states)
  → Input (all variants + states)
  → Card (all variants)
  → Avatar (all sizes + states)
  → Badge / Chip
  → Bottom Sheet
  → Toast
  → Navigation Bar
  → Tab Bar

 Patterns
  → Forms (sign in, sign up, profile edit)
  → Lists (with image, without, with action)
  → Empty States
  → Error States
  → Loading States

 Screens
  → [one frame per screen, uses only components above]
```

**Component discipline:** Every element on a screen frame must be a component instance — not a copy-pasted frame. When you update a component, every screen updates automatically.

---

## Developer Handoff

Design system value is only realized if engineers implement it consistently.

```
What engineers need from each component:

1. All variants as named specifications (not just one example)
2. All states documented (default, hover, pressed, disabled, loading, error)
3. Token references, not raw values
    "background: #2563EB"
    "background: color-primary"
4. Spacing in pt (iOS) and dp (Android) or as token names
5. Animation specs: duration + easing function
6. Accessibility requirements: aria labels, roles, focus behavior
7. Platform differences: iOS-specific vs Android-specific behavior
```

Create a shared constants file in code that mirrors your tokens exactly. The design token and the code constant must have the same name.

```typescript
// constants/tokens.ts
export const colors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E4E4E7',
  textPrimary: '#09090B',
  textMuted: '#71717A',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const

export const spacing = {
  1: 4, 2: 8, 3: 12, 4: 16,
  5: 20, 6: 24, 8: 32, 10: 40,
} as const

export const radius = {
  sm: 4, md: 8, lg: 12, xl: 16, full: 9999,
} as const
```

---

## AI Prompt: Component Specification

Use for any component that needs full engineering specification.

```
You are a senior mobile design systems engineer writing component specifications for a React Native / [your framework] app.

Design tokens available: [paste your token list]
Platform: [iOS / Android / both]

Component: [component name]

Generate a complete component specification including:
1. All variants with their token-based visual properties
2. All interactive states and their visual changes
3. Animation specs (duration, easing, what animates)
4. Accessibility requirements (accessibilityRole, accessibilityLabel, focus behavior)
5. Platform-specific behavior differences (iOS vs Android)
6. Props interface in TypeScript
7. Usage rules (when to use, when not to use, common mistakes)

Format as engineering documentation, not design documentation.
```

---

## Implementation Checklist

- [ ] All color tokens defined as Figma styles (primitive + semantic)
- [ ] Spacing scale defined and documented
- [ ] Typography scale defined as Figma text styles
- [ ] Border radius and shadow tokens defined
- [ ] Button component: all variants + all states
- [ ] Input component: all variants + all states including error
- [ ] Card component: all variants
- [ ] Avatar component: all sizes + fallback state
- [ ] Badge and Chip components
- [ ] Bottom Sheet component
- [ ] Toast / Snackbar component
- [ ] Tab Bar component with all states
- [ ] Navigation Bar component
- [ ] All components built from tokens (no hardcoded values)
- [ ] Constants file in code mirrors design tokens exactly
- [ ] Empty, Error, Loading patterns documented
- [ ] Figma file structured: Foundations → Components → Patterns → Screens

---

## Common Mistakes

**Building components as frames, not components.**
Copying a button frame to every screen means updating 47 buttons when the design changes. Every reusable piece must be a Figma component with instances. This is non-negotiable.

**Hardcoding values instead of using tokens.**
`color: #2563EB` in a component spec becomes a maintenance liability. When the brand color changes, every hardcoded value needs a manual find-and-replace. Use token names. Always.

**Missing states.**
A button component without a loading state means engineers invent their own loading behavior. A missing error state on Input means inconsistent error UI across forms. Every component needs every state defined before engineers touch code.

**Too many component variants.**
A button with 6 sizes, 8 colors, and 4 shapes is not a component — it's an API. Constrain variants to what you actually need. You can always add more. Removing variants breaks existing usage.

**Skipping the handoff constants file.**
Designers use Figma token names. Engineers use their own variable names. Six weeks later, "primaryBlue" in Figma is `brandColor` in code is `#3A7BD5` in a hardcoded style. The token name must be identical in design and code.

---

## Quick Reference

```
Token types?              → Color, Spacing, Typography, Radius, Shadow
Spacing base unit?        → 4pt (base-4 scale)
Min touch target?         → 44pt (iOS) / 48dp (Android)
Button states?            → Default, Pressed, Disabled, Loading
Input states?             → Default, Focused, Filled, Error, Disabled
Toast duration?           → Success 3s / Error 5s / Action persistent
Tab bar items max?        → 5
Nav bar right actions max? → 2
Figma structure?          → Foundations → Components → Patterns → Screens
```

---

## What's Next

**Responsive Layouts** — your design system defines the pieces. The next module covers how to compose them into layouts that adapt correctly across screen sizes, orientations, and the endless fragmentation of Android device dimensions.
