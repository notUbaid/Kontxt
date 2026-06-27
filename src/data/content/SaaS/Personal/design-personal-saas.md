# Design

 **Estimated Time:** 15 Minutes

---

Design is not how your product looks.

It is how your product works — and whether people can use it without thinking too hard.

Visual polish matters. But a beautiful product that confuses users is still a bad product. A plain product that helps people do their job quickly and confidently is a good one.

For a solo personal project, design has one job: reduce friction between your persona and the value your product delivers.

---

## What Solo Design Actually Covers

Three things. In this order.

```
1. Information architecture — what exists and where it lives
2. Interaction design — how users move through the product
3. Visual design — what it looks like
```

Most solo builders jump straight to visual design — colors, fonts, logos. Then they discover the structure doesn't work and they have to redo everything.

Do it in order. Structure first. Visuals last.

---

## Step 1 — Information Architecture

Before you touch any design tool, answer these questions:

**What are the main surfaces of your product?**
A surface is a distinct screen or view a user can be on.

> *Example: Dashboard, Project detail, Invoice list, Invoice detail, Settings*

**What lives on each surface?**
List the data and actions available on each one. Keep it to words — no wireframes yet.

> *Dashboard: Active projects (count + status), Recent invoices, Quick actions (New project, New invoice)*

**What is the primary navigation?**
How does a user move between surfaces? Top nav, sidebar, bottom bar, tabs? Choose one. Be consistent.

This exercise takes 30 minutes and prevents an enormous amount of rework.

---

## Step 2 — Wireframes

Wireframes are not mockups. They are structural decisions made in low fidelity.

Use boxes and labels. No color. No icons. No fonts.

The goal is to decide:
- What goes where on each surface
- What is above the fold vs. below
- What the primary action on each screen is
- What information users need to make that action

> [!TIP]
>
> The fastest wireframing tool is pen and paper. A phone photo of a sketch is enough to guide AI implementation. Don't spend hours in Figma wireframing before you've validated the structure.

**AI Prompt — Generate Wireframe Descriptions**

```prompt
I'm building a personal SaaS product. Help me design the information architecture and wireframe layout for each screen.

**Product:** [one sentence]
**Persona:** [paste persona summary]
**Core features:** [paste Core feature list]
**Surfaces I've identified:** [list your screens]

For each surface:
1. Describe the layout in plain text (header, sidebar, main content, etc.)
2. List what data appears and where
3. Name the primary action on this screen
4. Name any secondary actions
5. Flag any layout decisions that could confuse the persona

Keep it structural. No visual design. Focus on what exists and where it lives.
```


---

## Step 3 — Design System

Before writing a single line of UI code, define your design tokens.

A design token is a named value for a visual property — color, spacing, font — that you use consistently everywhere instead of hardcoding values.

You need four things:

---

### Colors

Pick a minimal palette. For a solo product, you need:

| Token | Purpose | How to choose |
|-------|---------|--------------|
| `--color-bg` | Page background | Near-white or white |
| `--color-surface` | Cards, panels, inputs | Slightly off background |
| `--color-border` | Dividers, outlines | Low contrast, subtle |
| `--color-text-primary` | Body text, headings | High contrast on bg |
| `--color-text-secondary` | Labels, captions, hints | Medium contrast |
| `--color-accent` | Primary buttons, links, active states | Your one brand color |
| `--color-danger` | Errors, destructive actions | Red |
| `--color-success` | Confirmations, completed states | Green |

That's eight tokens. Everything in your UI derives from these.

> [!WARNING]
>
> Do not use more than one accent color. Every additional color is a decision every future component has to make. One accent. Everything else is neutral.

---

### Typography

Pick two typefaces. One is enough if you choose well.

| Role | Typeface type | Used for |
|------|--------------|---------|
| **Display** | Something with character | Page headings, hero text |
| **Body** | Clean, readable, neutral | Everything else |

For a personal project launching quickly: use system fonts or a single Google Font for body. The difference in visual quality between system fonts and a custom font is smaller than the difference between good spacing and bad spacing.

What matters more than font choice:

- Consistent type scale (H1, H2, H3, body, caption — pick sizes and stick to them)
- Line height (1.5 for body text is almost always right)
- Font weight contrast (bold headings, regular body — don't use medium for both)

---

### Spacing

Pick a base unit and use multiples of it everywhere.

Base unit of `4px` works for most products:

```
4px   — tight spacing (between label and input)
8px   — small spacing (icon to text, inline elements)
16px  — default spacing (component padding, stacked items)
24px  — medium spacing (between sections within a card)
32px  — large spacing (between cards, major sections)
48px  — section spacing (between major page sections)
```

If everything in your UI is spaced using multiples of 4, it will feel consistent without effort. If you freehand spacing, it will feel loose and unfinished even if the visual design is good.

---

### Component Defaults

Decide these once. Use them everywhere.

| Property | Decision | Example |
|----------|----------|---------|
| Border radius | Slight or none | `4px` or `8px` for cards, `4px` for inputs |
| Button height | Fixed | `36px` default, `40px` primary CTA |
| Input height | Fixed | `36px` |
| Shadow | One level or none | Subtle box-shadow for cards only |
| Icon set | One library | Lucide, Heroicons, or Phosphor |

Decide these once. Never vary them without a reason.

---

## The Fastest Path to Good Visual Design

If design is not your strength, don't try to design from scratch.

**Use a component library.**

Shadcn/ui, Radix, or Tailwind UI give you accessible, well-designed components with no visual design decisions required. Your job becomes: pick the right components, lay them out correctly, and choose one accent color.

The result will look professional. Not distinctive — but professional. For v1 of a personal project, professional is the right bar.

> [!TIP]
>
> If you want your product to look distinctive without hiring a designer: find a SaaS product whose visual style you respect, identify the three decisions that make it feel that way (usually: typography, color density, and border treatment), and make the same decisions intentionally in your own product.
>
> This is not copying. It is learning from evidence of what works.

---

## What AI Can Do Here

AI is genuinely useful for design — with the right constraints.

**Good AI design tasks:**
- Generating component code from a description ("a card showing invoice status with amount, client name, and a send button")
- Implementing a layout from your wireframe description
- Applying your design tokens consistently across components
- Generating color palette suggestions from an accent color
- Writing CSS variables for your design system

**Bad AI design tasks:**
- "Design my app" (too open — produces generic output)
- "Make it look good" (no criteria — produces average output)
- "What should my color palette be?" (AI doesn't know your persona or brand intent)

The more specific the constraint, the better the output. Give AI your design tokens and a wireframe description. Ask for implementation. Don't ask for creative direction.

---

## AI Prompt — Generate Your Design System

```prompt
I'm building a personal SaaS product. Generate a complete CSS design system as custom properties.

**Accent color:** [your chosen accent — a hex value]
**Overall feel:** [e.g., "clean and minimal", "warm and approachable", "sharp and professional"]
**Component library:** [e.g., Shadcn/ui, Tailwind, or vanilla CSS]

Generate:
1. Color tokens (bg, surface, border, text-primary, text-secondary, accent, danger, success — light and dark variants)
2. Typography scale (font sizes for display, h1, h2, h3, body, caption, label)
3. Spacing scale (base 4px, named tokens from xs to 2xl)
4. Border radius tokens
5. Shadow tokens

Format as CSS custom properties on :root.
Include a short comment on each token explaining when to use it.
```


---

## Validation: Is Your Design Ready?

Before moving to Flows:

- [ ] All main surfaces identified and named
- [ ] Content and actions listed for each surface
- [ ] Primary navigation pattern decided (sidebar / top nav / tabs)
- [ ] Wireframes sketched or described for each surface
- [ ] Color tokens defined (8 tokens minimum)
- [ ] Type scale defined — sizes and weights for each role
- [ ] Spacing scale defined — base unit chosen and named
- [ ] Component defaults decided (radius, height, shadow, icon set)
- [ ] Component library chosen (or decision to go without)
- [ ] Design system generated as CSS custom properties

---

## Next

**Flows →** Your surfaces are designed. Now map exactly how users move between them — every entry point, every transition, every dead end to avoid.
