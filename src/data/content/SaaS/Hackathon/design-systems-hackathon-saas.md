# Design System

🕒 **Estimated Time:** 15 Minutes

---

Open any five hackathon projects from last year. They all look the same. Default blue buttons. Random font sizes. Cards that are slightly different shades of gray on different screens. A sidebar that uses 16px padding and a modal that uses 24px padding for no reason.

None of this is intentional. It happened because each screen was built separately, styled in isolation, with no shared decisions. The product looks assembled, not designed.

A design system is not about being a designer. It is about making five decisions once, then never making them again. Every screen that gets built after — by you, by your teammate, by an AI — pulls from those decisions automatically. The result looks consistent. Consistent looks professional. Professional wins demos.

You have 30 minutes to do this. That is all it should take.

---

## The Strategy: Library First, Customize Second

Do not build UI components from scratch at a hackathon. Do not write custom CSS for buttons, inputs, modals, or dropdowns. Someone already did that work. Use it.

Pick one component library. Override five values to make it feel like your product. Build every screen using components from that library. Never deviate.

That is the entire strategy.

**Component library comparison for React hackathons:**

<!-- UI: render as comparison cards with a recommended badge on shadcn/ui -->

| Library | Setup time | Customization | Best for |
|---|---|---|---|
| **shadcn/ui** | Medium | Very high — you own the code | Teams using Tailwind who want full control |
| **Mantine** | Fast | High — theming system built in | Teams who want great defaults fast |
| **Chakra UI** | Fast | Medium — theme object overrides | Beginners who need a gentle learning curve |
| **Radix UI** | Slow | Total — headless, bring your own styles | Not recommended for hackathons |
| **Material UI** | Fast | Low — fights you when you customize | Acceptable if your team already knows it |

**The recommendation:** shadcn/ui if you are using Tailwind. Mantine if you want to move faster with less configuration. Either is correct. What is never correct is mixing two libraries on the same project, or starting with one and switching mid-hackathon.

Once you pick, that choice is final. Document it in your PRD if you have not already.

---

## The Five Decisions

A hackathon design system is exactly five decisions. Make them now, write them down, and never revisit them during the build.

---

### Decision 1: Mode

Light or dark. Not both.

Building both modes takes time you do not have. More importantly, toggling between them mid-demo looks unfinished. Pick the one that matches your product's personality and commit completely.

**Dark mode** reads as technical, focused, developer-adjacent. Works well for dashboards, dev tools, productivity apps, anything that competes with Linear or Vercel.

**Light mode** reads as approachable, consumer-facing, clean. Works well for anything targeting non-technical users, anything health or finance adjacent, anything that competes with Notion or Stripe.

If you are building a café scheduling tool, light mode. If you are building a code review tool, dark mode. When genuinely unsure, dark mode tends to photograph better in demo screenshots and hide rough edges better under harsh lighting.

---

### Decision 2: Brand Color

One color. Your primary. This is used for: primary buttons, active states, links, focus rings, badges, and any accent element.

Do not use default blue (`#3b82f6`). Every default Tailwind project uses it. Judges have seen it hundreds of times. It signals "I did not make a decision here."

Pick something specific. Use one of these tools to find a color that works and generates a full usable scale:

- **Radix Colors** (radix-ui.com/colors) — production-ready palettes, dark and light variants, pre-tested for contrast
- **Coolors** (coolors.co) — generate and lock colors until something clicks
- **Tailwind Color Palette** — if you need to stay in Tailwind, pick a non-blue color (violet, emerald, rose, orange) and use the 500 value as your primary

Write down: your primary color hex, and the lighter/darker variants you will use for hover states and backgrounds.

```
Primary:        #[your hex]   ← buttons, active states, links
Primary hover:  #[darker]     ← button hover state  
Primary subtle: #[very light] ← badges, highlighted rows, focus rings
```

---

### Decision 3: Neutral Palette

Four values. These cover everything that is not your brand color.

```
Background:     #[page background]      ← the base layer everything sits on
Surface:        #[card/panel bg]        ← elevated surfaces, cards, modals, sidebars  
Text primary:   #[main text color]      ← headings, labels, body copy
Text muted:     #[secondary text]       ← placeholders, captions, metadata
```

**Rules that save you from common mistakes:**

Never use pure black (`#000000`) for text. It is harsh against any background. Use a very dark neutral — `#0f172a`, `#111827`, or `#1a1a1a` depending on warmth.

Never use pure white (`#ffffff`) as your surface in dark mode. Use `#18181b`, `#1e1e2e`, or `#0d1117`. Pure white on dark background creates a jarring contrast that reads as unstyled.

Your background and surface should be visually distinguishable. If they look the same, cards disappear into the background and the layout feels flat. The difference can be subtle — two or three steps apart on a gray scale — but it must exist.

---

### Decision 4: Border Radius

One value. Applied everywhere.

This single decision does more for visual consistency than almost anything else. Border radius defines the personality of the product. Sharp corners feel technical and dense. Round corners feel friendly and modern.

```
None (0px)      → institutional, data-heavy, very technical  
Subtle (4px)    → professional, clean, enterprise-adjacent
Medium (8px)    → modern SaaS default, works for most products
Round (12–16px) → friendly, consumer-facing, app-like
Full pill        → use only for tags and badges, not for cards or inputs
```

Pick one value. Apply it to every card, every input, every button, every modal. If your component library uses a radius token, override it to your value globally. Never mix sharp cards with round buttons on the same screen.

---

### Decision 5: Typography

Two roles. One or two font families. A scale of four sizes.

**The roles:**

- **Display / Headings** — page titles, section headers, card titles
- **Body** — all other text: labels, paragraphs, table data, captions

**The practical approach:**

One font family for everything is the fastest option and often the best. A geometric sans-serif like Inter, Plus Jakarta Sans, or DM Sans handles both roles well at different weights.

A paired approach (different display and body fonts) looks more designed but requires more judgment to execute. If you are not a designer, use one family at multiple weights. The risk of a bad pairing outweighs the upside of a good one at a hackathon.

**Recommended single fonts that work for SaaS:**
- **Inter** — industry standard for a reason, highly readable at all sizes
- **Plus Jakarta Sans** — slightly warmer than Inter, more personality
- **DM Sans** — approachable, modern, works at large and small sizes

**The scale:**

```
xs:   12px  — captions, timestamps, metadata
sm:   14px  — secondary labels, table data, placeholder text
base: 16px  — body copy, form labels, nav items  
lg:   18px  — card titles, section subheadings
xl:   24px  — page section headings
2xl:  32px  — page titles, hero headlines
```

You will not use every size on every screen. But having the scale defined means you pull from it consistently instead of typing arbitrary pixel values.

---

## Turning Decisions Into Code

Your five decisions become a single reference block that lives in your codebase and in your AI prompts.

**For Tailwind projects (tailwind.config.js extension):**

```js
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: '#[your primary]',
        hover:   '#[your hover]',
        subtle:  '#[your subtle]',
      },
      surface: {
        page:  '#[background]',
        card:  '#[surface]',
      },
      text: {
        primary: '#[text primary]',
        muted:   '#[text muted]',
      }
    },
    borderRadius: {
      DEFAULT: '[your radius]',
    },
    fontFamily: {
      sans: ['[Your Font]', 'system-ui', 'sans-serif'],
    }
  }
}
```

**For shadcn/ui projects, also update your CSS variables in globals.css:**

```css
:root {
  --background:    [hsl of your page bg];
  --card:          [hsl of your surface];
  --primary:       [hsl of your brand color];
  --foreground:    [hsl of your text primary];
  --muted:         [hsl of your text muted];
  --radius:        [your border radius];
}
```

Do this before building any screens. Every component you generate after this point will use these values automatically.

---

## AI Prompts

<!-- UI: copy-to-clipboard button on each prompt block -->

**Generate your design token decisions**

Use this if you have your product type and mood but have not picked specific values yet.

```
I am building a SaaS hackathon project. Here is the product:

[Paste your PRD Product Overview]
[Paste your Target User section]

Mode: [light / dark — your decision]

Help me define a design system with these five decisions:
1. Brand color — one primary hex with hover and subtle variants
2. Neutral palette — background, surface, text primary, text muted (as hex values)
3. Border radius — one value in px with a one-line justification
4. Font family — one or two Google Fonts with a one-line justification
5. Typography scale — xs through 2xl in px

Output these as:
(a) A plain decision summary I can reference while building
(b) A Tailwind config theme.extend block I can paste directly
(c) A set of CSS variable declarations for shadcn/ui globals.css

Do not suggest gradients, shadows, or animations. Only the five decisions above.
```

---

**Generate a UI component with your design system applied**

Use this as the template for every UI generation prompt during Phase 3. The design token block at the top is the key — it anchors every generated component to your system.

```
I am building a React component using Tailwind CSS and shadcn/ui.

My design system:
- Mode: [light/dark]
- Brand color: [hex] (Tailwind token: brand)
- Background: [hex] (token: surface-page)
- Card surface: [hex] (token: surface-card)  
- Text primary: [hex] (token: text-primary)
- Text muted: [hex] (token: text-muted)
- Border radius: [value] (applied globally)
- Font: [font name]

Build this component: [describe the component]

Rules:
- Use only shadcn/ui components — do not build custom inputs, buttons, or modals from scratch
- Use only Tailwind utility classes — no inline styles, no custom CSS
- Use my design token names (brand, surface-page, surface-card, text-primary, text-muted) for all color references
- Do not add animations or transitions unless I explicitly ask
- Do not add features beyond what I described
```

---

**Audit your UI for visual consistency**

Run this before submission on your most important screens.

```
I am going to describe the visual state of my product's UI. Identify every inconsistency against my design system.

My design system:
[paste your five decisions as a block]

Here are the screens I have built so far:
[describe each screen briefly — what components are visible, what colors and sizes are in use, anything that looks different from screen to screen]

Identify:
1. Any color that does not match my defined palette
2. Any border radius that appears inconsistent with my chosen value
3. Any font size that falls outside my defined scale
4. Any component that appears on one screen but not others despite serving the same function
5. The three highest-priority fixes before the demo

Do not suggest adding new design elements. Only flag inconsistencies with what I already defined.
```

---

## Reviewing AI Output

**It added gradients and shadows.** AI loves visual complexity. It defaults to `bg-gradient-to-r`, `shadow-lg`, and `ring` effects. These are not design decisions — they are decorations that vary from component to component and create inconsistency. Remove them or explicitly forbid them in your prompt.

**It used hardcoded hex values instead of your tokens.** AI will sometimes write `text-gray-500` or `bg-blue-600` instead of your custom token names. Find and replace these before accepting the output, or they will diverge from your design system immediately.

**It built a custom component from scratch instead of using your library.** A handwritten dropdown instead of the shadcn/ui Select. A custom modal instead of Dialog. These look slightly different and are harder to maintain. Push back: "Rewrite this using the shadcn/ui [component name] instead."

**The component looks right but the spacing is inconsistent.** AI picks arbitrary padding values. Your Tailwind spacing scale (`p-4`, `p-6`, `p-8`) is your friend — ask AI to stick to Tailwind's default spacing values rather than arbitrary ones.

---

## Pre-Build Checklist

Complete this before writing any screen code.

<!-- UI: interactive checklist, progress indicator showing X/7 complete -->

- [ ] Component library chosen and installed
- [ ] Brand color defined with hover and subtle variants
- [ ] Neutral palette defined (background, surface, text primary, text muted)
- [ ] Border radius chosen and applied globally in config
- [ ] Font chosen, imported via Google Fonts or next/font, applied as default sans
- [ ] Tailwind config updated with custom tokens
- [ ] CSS variables updated in globals.css (if using shadcn/ui)
- [ ] One test component built using the system to verify everything applies correctly

That last item matters. Build one card or one button before you start building real screens. Confirm the tokens resolve. Confirm the font loads. Confirm the border radius applies. Discovering a misconfiguration on screen eight of twelve is significantly more painful than discovering it on a test component.

---

## Your Deliverable: The Design Token Card

This is a compact reference block. Write it once. Paste it at the top of every UI generation prompt during Phase 3.

<!-- UI: render as a compact reference card with a "Copy Token Card" button — formatted, styled, ready to paste -->

```
DESIGN SYSTEM — [Product Name]
Mode: [light / dark]

Colors:
  Brand:          [hex]
  Brand hover:    [hex]
  Brand subtle:   [hex]
  Background:     [hex]
  Surface:        [hex]
  Text primary:   [hex]
  Text muted:     [hex]

Border radius:    [value]
Font:             [name]

Component library: [shadcn/ui / Mantine / Chakra]
Styling:           Tailwind CSS

Do not use: gradients, box shadows, inline styles, hardcoded hex values, or components from any library other than [chosen library].
```

Fill this in. Store it at the top of your project notes alongside the PRD. Every UI prompt starts with it.

The next topic is Tech Stack Selection — the actual technologies you will build on, chosen deliberately for hackathon constraints rather than because they happened to be trending.
