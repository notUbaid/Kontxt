---
title: Design System
slug: design-system
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 25-35 min
---

# Design System

Your wireframes locked in the Information Architecture. Now, you must define the strict visual language that will render those wireframes into a production application. 

In a production environment, a Design System is not just a Figma file or a PDF style guide. It is a unified set of code variables (Design Tokens) and React components that guarantee consistency across thousands of pages. If your engineering team is manually typing `#FF0000` or `px-4 py-2` into individual files, your architecture has already failed.

---

## Why Production Fails Without a Design System

If you allow developers to write custom CSS or arbitrary utility classes per component, you will accumulate UI debt instantly. 

- **The Redundancy Tax:** A marketplace has 50 different buttons. If you need to change the border radius to match a rebrand, you must hunt down and update 50 files instead of changing one variable.
- **The Context Window Problem:** AI coding assistants thrive on constraints. If you give an AI a strict Design System token list, it will write perfectly branded code. If you do not, it will hallucinate 14 different shades of gray.

> [!DECISION]
> Do not invent a custom component library from scratch. For production marketplaces, use a headless, highly accessible foundational library like **Radix UI**, **Shadcn UI**, or **Mantine**, and theme it via strict Design Tokens.

---

## Defining Semantic Design Tokens

A Design Token is a semantic variable that replaces a hard-coded value. You do not name a token after what it *is*; you name it after what it *does*.

**Bad (Literal):** `color-blue-500: #2563EB`
**Production-Grade (Semantic):** `color-primary: #2563EB`
**Production-Grade (Stateful):** `color-primary-hover: #1D4ED8`

Your frontend architecture must define these tokens in a single root file (e.g., `globals.css` or `theme.ts`):

| Token Category | Production Requirement |
|---|---|
| **Brand Colors** | `Primary`, `Secondary`, `Background`, `Surface` |
| **Semantic States** | `Success` (Green), `Destructive` (Red), `Warning` (Yellow) |
| **Typography Scale** | `Heading-1` (32px), `Body` (16px), `Caption` (12px) |
| **Spacing Scale** | Strict multiples of 4px (e.g., `spacing-4`, `spacing-8`) |
| **Z-Index Scale** | `z-dropdown`, `z-modal`, `z-toast` |

> [!WARNING]
> The Z-Index scale is often ignored until a modal renders *behind* a sticky header. Define a strict, 5-tier Z-Index scale globally and ban the use of arbitrary `z-50` classes in your components.

---

## Component States (The 4th Dimension)

A button is not just a colored rectangle. In a production marketplace, every interactive component exists in multiple dimensions (states). Your Design System must explicitly design:

1. **Default:** The standard resting state.
2. **Hover:** The cursor is over the element.
3. **Focus:** The element is selected via keyboard navigation (Requires a high-contrast focus ring for accessibility).
4. **Active/Pressed:** The moment the element is clicked.
5. **Disabled:** The action is currently invalid (e.g., submitting an incomplete form).
6. **Loading:** An asynchronous action is pending (e.g., a spinner inside the button).

If you hand an engineer a design that only shows the "Default" state, they will guess the other five, leading to a disjointed, cheap-feeling platform.

---

## Documenting the System for AI Agents

To ensure AI coding tools write consistent UI code, you must create a "Design System Manifest." This is a plain-text document you will paste into your AI prompts.

```text
## Design System Manifest (Tailwind + Shadcn)

**Colors:**
- Primary: bg-primary / text-primary-foreground (Tailwind config)
- Surface: bg-card / text-card-foreground
- Destructive: bg-destructive / text-destructive-foreground

**Typography:**
- Font: Inter
- H1: text-4xl font-extrabold tracking-tight
- Body: text-base leading-7

**Core Rules:**
1. NEVER use custom hex codes. Only use semantic Tailwind classes.
2. ALL buttons must use the `<Button>` component from `@/components/ui/button`.
3. ALL inputs must have a visible `focus-visible:ring` state.
```

---

## AI Prompts for Design System Architecture

> [!TIP]
> **Prompt 1 — Generating the Semantic Theme:**

````prompt
I am building a [Your Niche] marketplace using Tailwind CSS. Generate a complete, semantic CSS variable theme (for `globals.css`) that includes Primary, Secondary, Destructive, Muted, and Card colors. Ensure the palette is heavily optimized for a "Premium B2B" aesthetic. Also, generate the corresponding Dark Mode variables.
````

> [!TIP]
> **Prompt 2 — Component State Auditing:**

````prompt
Act as a Senior Design Systems Engineer. I need to build a complex `<ListingCard>` component that will be used hundreds of times across my marketplace. List the exact props this React component should accept, and explicitly define the Hover, Focus, and Loading states that must be coded into the component to ensure it feels responsive and accessible.
````

---

## Validating AI Output

- **Reject hard-coded values:** If AI generates code like `style={{ color: '#ff0000' }}`, reject it immediately. Force it to use your defined Design Tokens.
- **Check contrast ratios:** If an AI generates a color palette, run the primary color against the background color in an online contrast checker. It must pass WCAG AA standards (4.5:1 ratio).

---

## Checklist: Design System Architecture

## Checklist:
- [ ] Selected a foundational headless UI library (e.g., Shadcn UI, Radix).
- [ ] Defined semantic color tokens (Primary, Background, Destructive).
- [ ] Defined a strict Typography and Spacing scale (multiples of 4px).
- [ ] Mapped all 6 interactive states (Default, Hover, Focus, Active, Disabled, Loading) for core components.
- [ ] Drafted a plain-text Design System Manifest to feed into AI coding assistants.

---

## What's Next

Next: **Accessibility** — A beautiful design system is useless if a portion of your users cannot legally or physically use it. We will now ensure your system passes stringent production accessibility standards.
