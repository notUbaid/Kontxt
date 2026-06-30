---
title: Branding
slug: branding
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 20–25 min
---

# Branding

Your design system defines the rules. Branding defines the personality those rules express.

Branding is the part of your store that a customer cannot describe but immediately feels. It is what makes one store feel like a premium independent label and another feel like a WooCommerce template from 2019 — even when the products are identical.

This module takes your Brand Vision from Phase 0 and makes it tangible: a logo, a wordmark, a favicon, and a set of brand assets that work across your store, your emails, and your packaging.

---

## The Scope of Branding for a Personal Store

You do not need a full brand identity system. You need:

| Asset | Required at Launch | Notes |
|---|---|---|
| Wordmark or logo | ✅ Yes | What appears in your nav and emails |
| Favicon | ✅ Yes | 32×32px, often just an icon or initial |
| Open Graph image | ✅ Yes | 1200×630px, appears in social link previews |
| Brand mark / icon | Optional | Useful for favicon and app icon if distinct from wordmark |
| Brand pattern or texture | Optional | Background detail, packaging, email header |
| Product photography style guide | ✅ Yes | Not a graphic asset — a set of rules for consistency |

Nothing else is required for a personal store launch.

---

## Logo vs. Wordmark vs. Brand Mark

These are different things. Understand what you're building.

| Term | What It Is | Example |
|---|---|---|
| **Wordmark** | Store name in a specific typeface/treatment | Glossier, Everlane |
| **Brand mark** | A symbol or icon without text | Apple logo, Nike swoosh |
| **Logo** | Wordmark + brand mark combined | Most consumer brands |
| **Monogram** | Initials in a specific treatment | LV, YSL |

For a personal store at launch: **a wordmark is enough**. Brand marks require significant design effort to work at all sizes and look intentional. A well-set wordmark in your display typeface, with thoughtful letter-spacing and weight, is clean, professional, and takes an hour to produce.

> 💡 **Tip**
>
> If your store name is long (4+ words), consider a short-form version for the favicon and small-format use. "The Small Batch Candle Co." becomes "SBCC" or just "S" at 32×32px.

---

## Wordmark Design Principles

A wordmark is a typographic decision, not an illustration decision. Get these right:

**Weight** — Match your brand personality. Thin weights feel minimal and premium. Medium weights feel approachable. Bold weights feel confident. Extra-bold feels streetwear or youth-oriented.

**Letter-spacing (tracking)** — All-caps with wide tracking feels luxury and editorial. Mixed case with tight tracking feels modern and direct. Loose tracking on lowercase feels relaxed.

**Case** — All lowercase feels informal, accessible, approachable. Title case feels standard. All caps feels elevated or authoritative.

**Color in context** — Your wordmark needs to work in three states: full color, black, white. On dark backgrounds (footer, email header), you need the white version. On light backgrounds, black. Reserve full color for marketing assets.

```
Full color:  Used in brand/marketing contexts
Black:       Standard use on light backgrounds
White:       Use on dark backgrounds, overlaid on images
```

---

## Favicon

The favicon appears in browser tabs, bookmarks, and mobile home screens.

**Required sizes:**
- `favicon.ico` — 16×16 and 32×32 (multi-size ICO)
- `apple-touch-icon.png` — 180×180 (iOS home screen)
- `android-chrome-192x192.png` — Android home screen
- `android-chrome-512x512.png` — Android splash screen

**Design rules for favicons:**
- Use a single symbol, initial, or simplified brand mark — never the full wordmark
- Test it at 16×16 before finalizing — most detail is invisible at that size
- Use your primary brand color as the background if the symbol is light, or leave transparent if the symbol reads clearly without it

> ⚠️ **Don't Skip the Favicon**
>
> A missing favicon sends a professional signal failure. Every browser tab without one shows a blank grey square. It takes 15 minutes to produce and implement. Do it before launch.

---

## Open Graph Image

When someone shares your store URL on Twitter, WhatsApp, iMessage, or LinkedIn, the platform fetches a preview image. This is your OG image.

**Specifications:**
```
Dimensions: 1200 × 630px
Format: PNG or JPG
Max size: 8MB (keep under 1MB for fast loading)
Safe zone: Keep all important content 100px from each edge
```

**What to put on it:**
- Your wordmark (prominently)
- A strong product image or brand visual
- Optionally: a short tagline

**What not to put on it:**
- Pricing (changes)
- Time-sensitive offers
- Dense text (illegible at small preview sizes)

You need at minimum:
- One default OG image for the homepage and generic pages
- One OG image per product page (your product photo + wordmark)

Product-specific OG images can be generated dynamically using a service like `@vercel/og` or Cloudinary's URL-based transformations — a worthwhile investment for SEO and social sharing.

---

## Product Photography Style Guide

This is the most important brand asset a personal store can produce. Product photography is your primary trust signal.

Define these rules before shooting (or before reviewing AI-generated product mockups):

### Background
Pick one. Apply it to all products.
- Pure white (`#FFFFFF`) — clinical, marketplace-standard, easy to edit
- Off-white / warm white (`#F5F3EF`) — warmer, more editorial
- Contextual / lifestyle — on-surface shots, natural environments
- Brand color — bold, requires strong art direction

### Lighting
- Natural side light: soft, warm, handmade feel
- Studio diffused light: consistent, clean, product-first
- Hard light with shadows: editorial, high-contrast, fashion-forward

### Composition
- Centered product on background: clean, browsable
- Flat lay: works well for small objects, prints, textiles
- Lifestyle / in-use: builds desire, harder to produce consistently
- Close-up detail: materials, texture, craftsmanship — use as secondary shots

### Required shots per product
At minimum:
1. Hero shot (the main image shown in the grid and at top of PDP)
2. Detail shot (texture, material, craftsmanship close-up)
3. Scale reference (product next to a familiar object or in-use)
4. Variant shots (if color or material variants exist, one per variant)

> ⚠️ **Inconsistent Photography Destroys Brand Perception**
>
> A grid with five products shot in five different lighting conditions, backgrounds, and zoom levels looks like a marketplace aggregator, not a store. Shoot everything in one session under the same conditions. If you cannot reshoot, edit to match. This is not optional.

---

## Brand Asset File Structure

Organize your brand assets so they're usable across the store and email templates.

```
/public
  /brand
    logo.svg              ← Wordmark, full color (SVG preferred)
    logo-black.svg        ← Wordmark, black
    logo-white.svg        ← Wordmark, white
    icon.svg              ← Brand mark or initial (if exists)
    favicon.ico
    apple-touch-icon.png
    og-default.jpg        ← Default OG image
  /products
    [slug]/
      hero.jpg
      detail-1.jpg
      variant-[name].jpg
```

---

## ✅ Branding Checklist

- [ ] Wordmark designed in three versions: full color, black, white
- [ ] Wordmark tested at nav size (approx. 120–160px wide) and email header size
- [ ] Favicon set complete (ico, apple-touch-icon, android sizes)
- [ ] Default OG image produced (1200×630px)
- [ ] Product photography style guide written (background, lighting, composition, required shots)
- [ ] All products photographed or scheduled to be photographed under consistent conditions
- [ ] Brand assets organized in `/public/brand/` with clear naming
- [ ] Wordmark SVG exported (not PNG) for crisp rendering at all sizes

---

## AI Prompt — Generate Your Brand Asset Checklist and OG Image Brief

```
I am building a personal e-commerce store with this brand:

- Store name: [name]
- Brand personality: [3 adjectives]
- Visual direction: [your paragraph]
- Display typeface: [if decided]
- Primary color: [hex]

Generate:
1. A wordmark design brief — specific enough for a designer or AI image tool to execute (typeface treatment, weight, case, tracking, color)
2. A favicon concept — what should appear at 32×32px and why
3. An Open Graph image brief — layout description, what goes where, color and type treatment
4. A product photography style guide for [your product type] — background, lighting, composition, required shots per product, common mistakes to avoid

Be specific. Generic briefs produce generic outputs.
```

---

## What Comes Next

With branding defined and assets in place, your store has a visual identity. The next module ensures that identity is accessible — that every customer, regardless of ability or device, can use it without friction.

**Next: Accessibility →**
