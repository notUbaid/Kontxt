---
title: App Icons
slug: app-icons
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
filename: app-icons-production-mobile-app.md
---

Your app icon is the smallest piece of design real estate you own, and the one users see most often — every home screen, every search result, every notification. It has to read clearly at 60 pixels on a crowded home screen, not just look good at the 1024px size you designed it at.

## What Makes a Production-Quality Icon

- **One clear focal element**, not a cluttered scene — at small sizes, detail disappears and only bold shapes survive
- **Strong contrast** against typical home screen backgrounds (which vary by user wallpaper, so don't rely on a specific background color reading well)
- **Distinctive at a glance** — among a screen of 20+ other icons, yours should be identifiable by shape and color alone, not by reading text
- **No text in the icon itself**, beyond perhaps a single letter/symbol — actual words become illegible at small sizes and look unprofessional

> **Best Practice:** Design at the smallest size first (the actual home screen size, roughly 60×60pt), confirm it reads clearly, then scale up — not the reverse. An icon that looks great at 1024px and illegible at 60px has failed its actual job.

## Platform-Specific Technical Requirements

| Platform | Size | Format | Notes |
|---|---|---|---|
| iOS (App Store) | 1024×1024px | PNG, no alpha channel | Apple applies the rounded-corner mask automatically — submit a full square |
| iOS (device) | Multiple sizes generated from 1024px master | PNG | Xcode/asset catalog generates these from the master |
| Android (Play Store) | 512×512px | 32-bit PNG, with alpha | |
| Android (adaptive icon) | Foreground + background layers, 108×108dp safe zone | PNG/vector | Must work correctly when the OS applies circle, squircle, or other mask shapes |

> **Warning:** Android's adaptive icon system means your icon gets cropped into different shapes (circle, rounded square, squircle) depending on the device manufacturer's launcher. Keep your essential content within the safe zone — content near the edges of the foreground layer gets clipped on some shapes.

## Design Process

1. **Sketch concepts at small scale first** — if it doesn't read as a thumbnail sketch, it won't read as an icon
2. **Pick one strong visual metaphor** tied to your app's core function or brand, not a literal illustration of every feature
3. **Test against real home screens** — place your icon next to popular apps in your category to check it doesn't get visually lost or look like a knockoff of an existing app
4. **Check at actual device sizes**, not just on your design tool's canvas — what looks balanced at 1024px can look cramped or sparse at 60px

## Common Icon Mistakes

- Photographic or screenshot-based icons that lose all detail at small sizes
- Text-heavy icons that are illegible below 100px
- Too many colors or gradients, creating visual noise instead of a clean silhouette
- Designing only for iOS's square-with-rounded-corners and ignoring how Android's adaptive masks will crop it
- Generic icon styles (gradient circles, abstract blob shapes) that don't differentiate from dozens of similar apps in your category
- Icon doesn't match in-app branding, creating a disconnect between what users tap and what they see inside

## Using AI for Icon Concepts

AI image generation tools can produce concept directions quickly, but the actual production file needs vector precision and platform-specific safe zones that generated images won't have natively.

```
Generate 4 distinct app icon concepts for [app name/description].

App purpose: [one sentence]
Brand personality: [e.g., playful, professional, minimal, bold]
Category context: [what kind of icons currently dominate this app category, so I can differentiate]

Requirements:
- Single clear focal element, no text
- Must read clearly as a 60px thumbnail
- Strong silhouette/contrast that works on light and dark backgrounds
- Avoid generic gradient-circle styles common in [category]
```

Treat AI-generated concepts as direction-setting, not final assets — recreate the chosen direction as a clean vector in a design tool (Figma, Illustrator) so you have a true 1024px master with precise control over the safe zones each platform requires.

> **Validation:** Before finalizing, place your icon mockup next to your 5 closest competitors' icons at actual home-screen size. If you can't pick yours out in two seconds, it needs more contrast or a more distinctive shape.

## Quick Reference: Icon Checklist

- [ ] Single, clear focal element with no embedded text
- [ ] Reads clearly at 60×60pt, not just at 1024px
- [ ] Strong contrast that works regardless of wallpaper background
- [ ] 1024×1024px master with no alpha channel (iOS requirement)
- [ ] Adaptive icon foreground respects Android's safe zone for circle/squircle masking
- [ ] Distinct from close competitors when viewed at actual home-screen size
- [ ] Visually consistent with in-app branding and splash screen

Next: **Screenshots** — showing what the app actually does, to the people deciding whether to download it.
