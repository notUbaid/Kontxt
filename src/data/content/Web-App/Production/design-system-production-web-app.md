---
title: Design System
slug: design-system
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 45–60 min
---

# Design System

A design system is the contract between your brand and your code. It defines the tokens, components, and patterns that every part of your UI is built from — so that consistency is enforced structurally, not by discipline.

Without a design system, you accumulate UI debt: buttons that are almost the same, spacing that's nearly consistent, colours that are close but not identical. This debt compounds. By the time you notice it, fixing it means touching hundreds of components.

Build the system first. Build components from the system.

---

## What a Production Design System Contains

| Layer | What It Is | Examples |
|---|---|---|
| **Tokens** | The raw values — the atoms | Colours, spacing, radii, shadows, typography |
| **Primitives** | Single-purpose components built from tokens | Button, Input, Badge, Avatar |
| **Composites** | Components built from primitives | Card, Form, Modal, Toast |
| **Patterns** | Reusable layouts built from composites | Page header, Data table, Settings layout |

Build bottom-up. Tokens first, then primitives, then composites. Never build a composite whose parts aren't already in the system.

---

## Layer 1 — Design Tokens

Tokens are named values. They make your codebase refactorable — changing a token propagates everywhere it's used.

### Colour Tokens

```css
/* From your Branding module — defined as CSS custom properties */

/* Brand */
--color-brand-500: #6366f1;
--color-brand-600: #4f46e5;  /* hover state */
--color-brand-100: #e0e7ff;  /* subtle backgrounds */

/* Neutrals */
--color-neutral-50:  #f8fafc;
--color-neutral-100: #f1f5f9;
--color-neutral-200: #e2e8f0;
--color-neutral-400: #94a3b8;
--color-neutral-600: #475569;
--color-neutral-800: #1e293b;
--color-neutral-900: #0f172a;

/* Semantic */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error:   #ef4444;
--color-info:    #3b82f6;

/* Semantic backgrounds */
--color-success-bg: #f0fdf4;
--color-warning-bg: #fffbeb;
--color-error-bg:   #fef2f2;
--color-info-bg:    #eff6ff;
```

### Spacing Tokens

Use a consistent scale. 4px base unit produces a harmonious grid.

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

If you're using Tailwind, this maps directly to `p-1` through `p-16`. Use Tailwind's scale and extend it if needed — don't invent a parallel system.

### Radius Tokens

```css
--radius-sm:   4px;   /* inputs, tags */
--radius-md:   8px;   /* cards, buttons */
--radius-lg:   12px;  /* modals, panels */
--radius-full: 9999px; /* pills, avatars */
```

### Shadow Tokens

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

### Typography Tokens

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */

--leading-tight:  1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## Layer 2 — Primitive Components

### Button

The most-used component in any app. Define every variant before building any feature.

```typescript
// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

// States every button must handle:
// default | hover | focus | active | disabled | loading
```

```
Variant specs:

Primary:
  Background: var(--color-brand-500)
  Text: white
  Hover: var(--color-brand-600)
  Focus: 2px outline var(--color-brand-500) offset 2px
  Disabled: opacity-50, cursor-not-allowed

Secondary:
  Background: transparent
  Border: 1px var(--color-neutral-200)
  Text: var(--color-neutral-800)
  Hover: background var(--color-neutral-50)

Ghost:
  Background: transparent
  Text: var(--color-neutral-600)
  Hover: background var(--color-neutral-100)

Destructive:
  Background: var(--color-error)
  Text: white
  Hover: darkened error colour

Loading state (all variants):
  Show spinner, maintain button width, disable interaction
  Never remove button from layout during loading — causes layout shift
```

### Input

```
States: default | focus | error | disabled | read-only

Default:
  Border: 1px var(--color-neutral-200)
  Background: white
  Radius: var(--radius-sm)
  Padding: var(--space-2) var(--space-3)
  Font: var(--text-sm)

Focus:
  Border: 1px var(--color-brand-500)
  Ring: 0 0 0 3px rgb(99 102 241 / 0.15)

Error:
  Border: 1px var(--color-error)
  Ring: 0 0 0 3px rgb(239 68 68 / 0.15)

Structure (always include):
  <label> — always present, never placeholder-only
  <input>
  <helper text> or <error message> — reserved space to prevent layout shift
```

> [!WARNING]
> Never use placeholder text as a substitute for a label. Placeholders disappear when the user starts typing. Users with cognitive disabilities, and users who return to a half-filled form, need labels to understand what each field contains.

### Badge / Tag

```
Variants: default | success | warning | error | info

Anatomy:
  [Optional icon] [Text label]
  
Sizing: Fixed height (20px sm, 24px md), padding left/right var(--space-2)
Radius: var(--radius-full) for status badges, var(--radius-sm) for category tags
```

### Avatar

```
Sizes: xs(24px) | sm(32px) | md(40px) | lg(48px) | xl(64px)

States:
  Image: show image
  Fallback: show initials (first + last name initial) on brand-coloured background
  Loading: show skeleton pulse

Always include alt text. Always define fallback.
```

---

## Layer 3 — Composite Components

### Card

```
Anatomy:
  Container: white background, var(--radius-md), var(--shadow-sm), border var(--color-neutral-100)
  
  [Optional: Card header — title + optional action]
  [Card body — primary content]
  [Optional: Card footer — actions or metadata]

Variants:
  Default:     subtle border, no shadow
  Elevated:    shadow-md, no border
  Interactive: hover state — shadow-md, border brand colour
  Selected:    brand-coloured border, brand-50 background
```

### Modal / Dialog

```
Structure:
  Overlay: black at 50% opacity, blurs background
  Panel: white, var(--radius-lg), var(--shadow-lg)
         max-width: 480px (default) | 640px (large) | 90vw (responsive)
  
  [Header: Title + optional close button]
  [Body: scrollable if content exceeds viewport]
  [Footer: actions — primary right, secondary left or cancel]

Behaviour:
  Opens: fade in + scale up (150ms)
  Closes: on Escape key, on overlay click (for non-destructive modals), on close button
  Focus: traps focus inside modal while open
  Scroll: body scroll locked while modal is open
  
Accessibility:
  role="dialog", aria-modal="true", aria-labelledby pointing to title
  Focus moves to first interactive element on open
  Returns focus to trigger element on close
```

### Toast / Notification

```
Position: bottom-right (desktop) | bottom center (mobile)
Width: 360px max
Stack: newest on top, max 3 visible, older auto-dismiss

Variants: success | error | warning | info

Anatomy:
  [Icon] [Title] [Optional description]
  [Optional action link]
  [Dismiss button]

Timing:
  Success: auto-dismiss 4s
  Info:    auto-dismiss 6s
  Warning: persist until dismissed
  Error:   persist until dismissed (errors need user acknowledgement)
```

---

## Layer 4 — Patterns

### Page Header Pattern

```
<PageHeader>
  <Breadcrumb />           ← always present on detail pages
  <h1>{Page title}</h1>
  <p>{Optional description}</p>
  <div class="actions">
    {Secondary actions}    ← ghost or secondary button
    {Primary action}       ← primary button
  </div>
</PageHeader>
```

### Data Table Pattern

```
<DataTable>
  <TableToolbar>
    <Search />
    <Filters />
    <BulkActions />    ← visible only when rows selected
    <ColumnToggle />   ← optional
  </TableToolbar>
  
  <Table>
    <TableHeader>      ← sortable columns have sort indicator
    <TableBody>
      IF loading:  <SkeletonRows count={5} />
      IF empty:    <EmptyState />
      IF error:    <ErrorState />
      IF data:     {rows}
    </TableBody>
  </Table>
  
  <TableFooter>
    <RowCount />
    <Pagination />
  </TableFooter>
</DataTable>
```

---

## Shadcn/ui and Component Libraries

For a production app, building every primitive from scratch is rarely the right call. Use a well-maintained component library as your foundation and extend it with your tokens.

**Recommended: shadcn/ui**

```bash
npx shadcn@latest init
```

shadcn/ui gives you production-quality accessible components that you own — the source lives in your codebase and you customise it directly. It uses Tailwind CSS and Radix UI primitives.

Key components to install immediately:

```bash
npx shadcn@latest add button input label textarea select
npx shadcn@latest add dialog drawer sheet popover dropdown-menu
npx shadcn@latest add toast sonner card badge avatar
npx shadcn@latest add table form
```

Apply your brand tokens by updating `tailwind.config.ts` and `globals.css` with your CSS custom properties.

> [!TIP]
> Don't fight the component library. If shadcn/ui's default pattern for modals is slightly different from your wireframe, adapt the wireframe — not the library. Diverging from library patterns means maintaining the divergence forever.

---

## Prompt: Generate a Component Spec

```
Copy Prompt
```

```
I'm building a production web app using Next.js, Tailwind CSS, and shadcn/ui.

My design tokens:
[paste your CSS custom properties from Branding module]

Generate a complete implementation spec for the [component name] component.

This component needs to:
[list the requirements]

Required variants: [list]
Required states: [list — loading, disabled, error, etc.]
Required sizes: [list]

For each variant and state, specify:
1. Exact Tailwind classes or CSS custom property values
2. Interaction behaviour (hover, focus, click)
3. Accessibility requirements (ARIA attributes, keyboard behaviour)
4. TypeScript prop interface

Then generate the component implementation using:
- shadcn/ui as the base (if applicable)
- Tailwind CSS for styling
- class-variance-authority (cva) for variant management
- TypeScript with explicit prop types

The component must handle all states without layout shift.
```

---

## Design System Checklist

**Tokens**
- [ ] Colour tokens defined as CSS custom properties (light + dark mode)
- [ ] Spacing scale defined and mapped to Tailwind
- [ ] Radius tokens defined
- [ ] Shadow tokens defined
- [ ] Typography tokens defined (font families, scale, weights)

**Primitive Components**
- [ ] Button: all variants (primary, secondary, ghost, destructive), all sizes, loading state
- [ ] Input: all states (default, focus, error, disabled), with label and error message
- [ ] Badge/Tag: all semantic variants
- [ ] Avatar: all sizes, image + initials fallback

**Composite Components**
- [ ] Card: default, elevated, interactive variants
- [ ] Modal/Dialog: with focus trap, keyboard dismiss, accessibility attributes
- [ ] Toast: all severity variants, auto-dismiss behaviour

**Patterns**
- [ ] Page header pattern documented
- [ ] Data table pattern documented (with all states)
- [ ] Form layout pattern documented

**Quality**
- [ ] All interactive components have visible focus styles
- [ ] All colour combinations pass WCAG AA contrast
- [ ] Dark mode tokens applied and tested
- [ ] Components reviewed for layout shift in loading states

---

## What Comes Next

**Responsive Design** — applying your design system across breakpoints. Every component you just defined must be verified at mobile, tablet, and desktop widths, with explicit decisions about how layout changes at each breakpoint.
