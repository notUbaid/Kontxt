---
title: UI Polish
slug: ui-polish
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 20–35 min
---

# UI Polish

Judges form an opinion in the first ten seconds. You cannot control what they know about your tech stack. You can control what they see.

This module is about spending the right polish time in the right places — not making your app beautiful, but making it look like a product someone would actually pay for.

---

## The Asymmetry of Polish

> **⚠️ Warning**
> A technically impressive app with a rough UI loses to a simpler app with a clean UI almost every time. Judges are human. First impressions are real. Polish is not vanity — it's strategy.

But polish time is limited. You cannot fix everything. The goal is identifying the **highest-leverage visual improvements** and executing only those.

---

## Where Judges Look First

**Decision Card — Impact by Screen Zone**

| Zone | Judge Attention | Time Investment |
|---|---|---|
| Landing / first screen they see | Extremely high | Spend here first |
| Navigation and layout structure | High — signals professionalism | Fix early |
| Core feature interaction | High — this is the demo moment | Must work perfectly |
| Loading / empty / error states | Medium — noticed if broken | Fix the demo path only |
| Typography and spacing | Medium — felt more than noticed | High ROI, fast fix |
| Color palette and contrast | Medium | One pass is enough |
| Mobile responsiveness | Low (unless judged on mobile) | Skip unless required |
| Settings, edge-case pages | Very low | Ignore completely |

---

## The Five-Minute Audit

Before writing a single line of CSS, do this:

Open your app. Pretend you are a judge seeing it for the first time.

- [ ] Does the first screen instantly communicate what this product does?
- [ ] Is there a clear visual hierarchy? Do you know where to look first?
- [ ] Does anything look obviously broken — misaligned, overflowing, wrong size?
- [ ] Is the typography readable and consistent?
- [ ] Does the color scheme feel intentional or random?
- [ ] Does the core CTA (button, form, action) stand out?

Anything that fails this audit gets fixed. Everything else is optional.

---

## The Highest-ROI Polish Moves

### 1. Consistent Spacing

Nothing reads as "unfinished" faster than inconsistent spacing. You don't need a design system. You need one rule: **pick a base unit (8px) and use multiples of it everywhere.**

```css
/* Never mix arbitrary values */
/* Bad: margin: 13px, padding: 7px, gap: 22px */

/* Good: everything is 8, 16, 24, 32, 48, 64 */
.card { padding: 24px; }
.section { padding: 48px 0; }
.button { padding: 12px 24px; }
```

> **💡 Tip**
> If you're using Tailwind, this is already handled. Just stop using arbitrary values like `p-[13px]`. Stick to the default scale.

---

### 2. Typography Hierarchy

Your app needs exactly three text sizes that are visually distinct from each other. If your headings and body text look similar in size, nothing feels organized.

```css
/* Minimum viable type scale */
.heading-lg  { font-size: 2rem;    font-weight: 700; line-height: 1.2; }
.heading-sm  { font-size: 1.25rem; font-weight: 600; line-height: 1.3; }
.body        { font-size: 1rem;    font-weight: 400; line-height: 1.6; }
.label       { font-size: 0.875rem; font-weight: 500; color: #6b7280; }
```

If you're not using a custom font, add one. It takes three minutes and meaningfully upgrades the perceived quality:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### 3. One Accent Color, Used Consistently

Pick one color. Use it only for: primary buttons, active states, key highlights, links.

Every other interactive element should be neutral. The moment you use three different button colors, the app looks undesigned.

> **💡 Tip**
> If you're unsure what color to use, pick a blue. `#2563EB` (Tailwind's `blue-600`) is readable, professional, accessible, and completely inoffensive. Ship the demo. Change it later if you have time.

---

### 4. Card and Container Borders

Flat backgrounds with no visual separation look unfinished. Cards and containers need either:
- A subtle border: `border: 1px solid #e5e7eb`
- A subtle shadow: `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`

Pick one. Apply it everywhere. Don't mix both.

---

### 5. Button States

Every button must have a visible hover state. Nothing signals "built in a rush" like buttons that don't respond visually to the cursor.

```css
.btn-primary {
  background: #2563EB;
  transition: background 150ms ease;
}
.btn-primary:hover { background: #1d4ed8; }
.btn-primary:active { background: #1e40af; }
.btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }
```

---

## Loading States

Your demo will have a moment where data is fetching. If you show a blank screen during this, it looks broken.

Minimum viable loading state:

```tsx
// A skeleton card is better than nothing and takes 5 minutes
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
    </div>
  )
}
```

> **⚠️ Warning**
> For your demo path specifically, make sure loading states are fast. If your API call takes 2 seconds and you're showing a blank screen, pre-fetch on page load or mock the data locally. A judge's attention does not survive a 2-second blank screen gracefully.

---

## The "Feels Like a Product" Checklist

These are the details that separate "built this weekend" from "this could be real":

- [ ] App has a favicon (even just an emoji favicon)
- [ ] Page `<title>` is your product name, not "Vite App" or "React App"
- [ ] No visible `console.error` warnings in the browser during the demo
- [ ] No broken image placeholders
- [ ] All buttons have hover states
- [ ] No text overflows its container
- [ ] Empty states have a message (not a blank space)
- [ ] At least one page has a proper heading structure (h1 → h2)
- [ ] Color contrast is readable (dark text on light backgrounds, or vice versa)
- [ ] Forms show validation feedback, not silent failures

---

## Using AI for Polish

**Copy Prompt — CSS Audit**

```
Here is my current CSS / component code: [paste component]

I'm building a hackathon demo. I need it to look professional and polished, not production-ready.

Identify the 3 highest-impact visual improvements I can make in under 10 minutes each.

For each one:
- Name the specific problem
- Show the exact CSS or code change
- Explain why it improves the visual quality

Do not suggest design system changes, component library migrations, or anything requiring more than 10 minutes.
```

**Copy Prompt — First Screen Review**

```
Here is a screenshot / description of my app's first screen: [describe or attach]

Pretend you are a hackathon judge seeing this for the first time. You have 30 seconds.

Tell me:
1. What is your first impression?
2. Do you understand immediately what this product does?
3. What looks unfinished or unprofessional?
4. What is the single highest-impact change to make right now?
```

---

## What to Skip

Explicitly not worth your time in hackathon mode:

- Dark mode
- Mobile responsiveness (unless the demo is on mobile)
- Animations and transitions beyond simple hover states
- Custom illustrations or icons beyond a free set
- Pixel-perfect spacing across every breakpoint
- Accessibility (important in production; not judged here)
- Redesigning any page that won't appear in your demo

> **💡 Tip**
> Polish only the screens in your demo path. A beautiful settings page nobody sees is worth zero points. A slightly rough but functional dashboard that you actually demo is worth something.

---

## What's Next

Move to **Demo Prep** — your app looks like a product. Now you need to make sure the moment you present it, it performs like one.
