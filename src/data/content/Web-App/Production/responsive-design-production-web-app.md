---
title: Responsive Design
slug: responsive-design
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 35–45 min
---

# Responsive Design

Responsive design is not making your desktop layout shrink to fit a phone. It is designing each breakpoint as a deliberate experience for the user and device at that size.

A production app ships responsive. Not as a post-launch improvement. Not as a mobile-specific build. As a single codebase that works well at every viewport width from the start.

---

## The Breakpoint Strategy

Define your breakpoints once, at the system level, and use them everywhere.

```typescript
// tailwind.config.ts — extend or use defaults
screens: {
  sm:  '640px',   // Large phones, landscape
  md:  '768px',   // Tablets, small laptops
  lg:  '1024px',  // Laptops, desktops
  xl:  '1280px',  // Large desktops
  '2xl': '1536px' // Wide monitors
}
```

**For most production web apps, three breakpoints drive 95% of decisions:**

| Breakpoint | Viewport | Primary Device |
|---|---|---|
| **Mobile** | < 768px | Phones |
| **Tablet** | 768px – 1023px | Tablets, small laptops |
| **Desktop** | ≥ 1024px | Laptops, desktops |

Tailwind is mobile-first. Unprefixed classes apply at all sizes. Prefixed classes apply at that breakpoint and above.

```tsx
// Mobile: stacked, Tablet: 2 cols, Desktop: 3 cols
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## Mobile-First vs Desktop-First

**Choose mobile-first.** Always.

```tsx
// Mobile-first (correct)
<div className="p-4 md:p-6 lg:p-8">         // padding grows up
<div className="text-sm md:text-base">       // text grows up
<div className="flex-col md:flex-row">       // stacks then rows

// Desktop-first (avoid)
<div className="p-8 md:p-6 sm:p-4">         // works but fights Tailwind's model
```

Mobile-first produces smaller base CSS — the mobile stylesheet is loaded by everyone, the larger breakpoint styles are additive. Desktop-first forces mobile to undo desktop styles, which is both harder to maintain and less efficient.

---

## Layout Transformation Patterns

Every layout in your app needs an explicit decision for each breakpoint. These are the patterns that cover most cases.

### Sidebar → Bottom Nav / Hamburger

The most common layout transformation in web apps.

```tsx
// Sidebar: hidden on mobile, visible on desktop
<aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
  <SidebarContent />
</aside>

// Mobile: sheet/drawer triggered by hamburger
<Sheet>
  <SheetTrigger asChild>
    <button className="lg:hidden">
      <MenuIcon />
    </button>
  </SheetTrigger>
  <SheetContent side="left">
    <SidebarContent />
  </SheetContent>
</Sheet>

// Mobile bottom tab bar (alternative to hamburger — better for 3–5 primary destinations)
<nav className="fixed bottom-0 left-0 right-0 flex lg:hidden border-t bg-white">
  {primaryNavItems.map(item => <BottomTabItem key={item.href} {...item} />)}
</nav>
```

### Multi-Column → Stacked

```tsx
// Detail view: sidebar metadata on desktop, below content on mobile
<div className="flex flex-col lg:flex-row gap-6">
  <main className="flex-1 min-w-0">       {/* min-w-0 prevents overflow */}
    <PrimaryContent />
  </main>
  <aside className="w-full lg:w-80 shrink-0">
    <MetadataPanel />
  </aside>
</div>
```

### Data Table → Card List

Tables scroll horizontally on mobile — a poor experience. Convert to stacked cards below the table breakpoint.

```tsx
// Desktop: table
<div className="hidden md:block">
  <DataTable columns={columns} data={data} />
</div>

// Mobile: card list
<div className="md:hidden space-y-3">
  {data.map(item => (
    <MobileCard key={item.id} item={item} />
  ))}
</div>
```

### Form Layout

```tsx
// Single column on mobile, two columns on tablet+ where appropriate
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <FormField name="firstName" label="First name" />
  <FormField name="lastName" label="Last name" />
  <div className="md:col-span-2">          {/* full-width field */}
    <FormField name="email" label="Email" />
  </div>
</div>
```

---

## Touch Targets

Mobile users interact with fingers, not cursors. This has hard requirements.

**Minimum touch target size: 44×44px** (Apple HIG and WCAG 2.5.5)

```tsx
// BAD — visually small button with no tap area
<button className="p-1 text-xs">Delete</button>

// GOOD — minimum 44px hit area
<button className="min-h-[44px] min-w-[44px] px-3 text-xs">Delete</button>

// Pattern for icon-only buttons on mobile
<button className="relative h-6 w-6">
  <span className="absolute inset-[-10px]" />  {/* invisible tap expansion */}
  <TrashIcon className="h-4 w-4" />
</button>
```

**Spacing between interactive elements on mobile:** minimum 8px between tap targets to prevent accidental taps.

---

## Typography at Breakpoints

Type scales should adapt. What reads well at 1280px often feels oversized at 375px.

```tsx
// Scale headings down on mobile
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  {title}
</h1>

// Line length (measure) — 60–75 characters is optimal for readability
// Constrain prose content width on wide screens
<article className="prose max-w-prose mx-auto px-4">
  {content}
</article>
```

---

## Images and Media

```tsx
// Always use Next.js Image with responsive sizes
<Image
  src={src}
  alt={alt}
  fill                              // fills container
  sizes="(max-width: 768px) 100vw,  // mobile: full width
         (max-width: 1200px) 50vw,  // tablet: half width
         33vw"                       // desktop: third width
  className="object-cover"
/>

// Responsive aspect ratios
<div className="aspect-video md:aspect-[4/3] lg:aspect-video">
  <Image fill ... />
</div>
```

---

## Modals on Mobile

Full-screen modals on desktop become bottom sheets on mobile. This is the correct pattern — full-screen overlays on mobile feel native; centred desktop-style modals at mobile size feel wrong.

```tsx
// Use shadcn/ui Sheet for mobile, Dialog for desktop
function ResponsiveModal({ children, title }: ModalProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (isMobile) {
    return (
      <Sheet>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
          <SheetHeader><SheetTitle>{title}</SheetTitle></SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

---

## The `useMediaQuery` Hook

For layout decisions that can't be made in CSS alone.

```typescript
// hooks/use-media-query.ts
'use client'
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Usage
const isMobile = useMediaQuery('(max-width: 767px)')
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
```

> [!WARNING]
> `useMediaQuery` returns `false` on the server (SSR). Components that render differently based on this hook will produce a hydration mismatch if not handled. Use CSS breakpoints wherever possible — they're SSR-safe. Reserve `useMediaQuery` for genuinely JS-driven layout decisions.

---

## Responsive Testing Protocol

Test at these specific widths before shipping any feature:

| Width | Represents |
|---|---|
| 375px | iPhone SE / small Android |
| 390px | iPhone 14 Pro |
| 430px | iPhone 14 Pro Max |
| 768px | iPad portrait / breakpoint boundary |
| 1024px | iPad landscape / small laptop |
| 1280px | Standard laptop |
| 1536px | Large desktop |

**Test these specifically on mobile:**
- Touch targets are large enough to tap accurately
- Keyboard doesn't obscure form fields when open
- Horizontal scroll doesn't appear anywhere unintentionally
- Text is not smaller than 16px (below 16px triggers zoom on iOS Safari)
- No content is clipped by notch or dynamic island

---

## Common Responsive Bugs

**Horizontal overflow:** A single element wider than the viewport breaks mobile layout. Debug with:
```css
* { outline: 1px solid red; }  /* temporarily in dev only */
```

Or:
```javascript
// Find the element causing horizontal scroll
document.querySelectorAll('*').forEach(el => {
  if (el.offsetWidth > document.documentElement.offsetWidth) {
    console.log(el)
  }
})
```

**iOS input zoom:** Any input with `font-size` below 16px triggers automatic zoom on iOS Safari. Fix:
```css
input, select, textarea {
  font-size: 16px;  /* minimum — iOS Safari won't zoom */
}
```

**Fixed elements and virtual keyboard:** On mobile, a fixed bottom bar shifts when the virtual keyboard opens. Use `dvh` (dynamic viewport height) instead of `vh`:
```css
height: 100dvh;  /* accounts for browser chrome and virtual keyboard */
```

---

## Responsive Design Checklist

**Layout**
- [ ] Sidebar collapses to hamburger or bottom nav on mobile
- [ ] All multi-column layouts stack correctly on mobile
- [ ] Data tables transform to card lists below md breakpoint
- [ ] No horizontal scroll on any screen below 375px

**Touch**
- [ ] All interactive elements meet 44×44px minimum touch target
- [ ] Minimum 8px spacing between adjacent interactive elements on mobile
- [ ] No hover-only interactions (hover doesn't exist on touch)

**Typography**
- [ ] No text smaller than 16px on mobile (prevents iOS zoom)
- [ ] Headings scale down appropriately at mobile widths
- [ ] Line lengths are readable at all widths

**Forms**
- [ ] Form fields are full-width on mobile
- [ ] Virtual keyboard doesn't obscure active input
- [ ] Labels always visible (not placeholder-only)

**Media**
- [ ] All images use `sizes` attribute for responsive loading
- [ ] Modals become bottom sheets on mobile
- [ ] Images don't cause layout shift

**Testing**
- [ ] Tested at 375px, 768px, 1024px, 1280px
- [ ] Tested on real iOS Safari (not just Chrome DevTools emulation)
- [ ] Tested with virtual keyboard open on mobile

---

## What Comes Next

**Accessibility** — ensuring that every design system component and responsive layout works not just on different screen sizes, but for users with different abilities, assistive technologies, and preferences.

Responsive and accessible are complementary, not separate. Many accessibility requirements (keyboard navigation, touch targets, text size) overlap directly with responsive design decisions you've already made.
