---
title: Mobile Responsiveness
slug: mobile-responsiveness
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 15–25 min
---

# Mobile Responsiveness

In production e-commerce, desktop design is for your QA team; mobile design is for your customers. Upwards of 80% of paid social traffic (Meta, TikTok) will hit your site via an in-app mobile browser. 

If your UI requires a user to pinch-to-zoom to read a product description or precisely tap a 12-pixel checkbox to accept the Terms of Service, your conversion rate will plummet. Mobile responsiveness is about physics and touch-targets, not just CSS media queries.

---

## 1. The Thumb Zone (Touch Targets)

A mouse cursor is a 1-pixel precision instrument. A human thumb is a blunt 44-pixel instrument.

**The Implementation Constraints:**
- **Apple HIG (Human Interface Guidelines):** Apple explicitly mandates a minimum touch target size of **44x44 points** (roughly 44x44 CSS pixels) for all interactive elements.
- **The Audit:** Your Variant Selectors (Size/Color swatches), Add to Cart buttons, and X (Close) icons on modals must be at least 44px wide/tall. If you design a minimalist 24x24px close icon for a mobile Cart Drawer, users will miss it, click the background overlay, and accidentally close the entire page.

---

## 2. Preventing Auto-Zoom (The Input Fix)

When a user taps an `<input>` field on iOS Safari (e.g., entering their email in checkout), if the font size of that input is less than 16px, iOS will automatically zoom the entire webpage in to make it readable.

**The Catastrophe:**
The user types their email, but now the webpage is permanently zoomed in by 120%. They have to manually pinch to zoom back out to find the "Next" button. 50% of users will just abandon the cart.

**The Fix:**
You must enforce a strict CSS rule:
```css
input[type="text"],
input[type="email"],
input[type="number"],
input[type="tel"] {
  font-size: 16px; /* Minimum required to prevent iOS auto-zoom */
}
```

---

## 3. The 100vh Problem (Mobile Safebounds)

CSS `100vh` (100% viewport height) is notoriously broken on mobile browsers (especially Safari) because the bottom URL/nav bar expands and collapses as the user scrolls, covering the bottom 10% of your UI.

**The Implementation:**
If you build a full-screen Mobile Menu or a Cart Drawer and set its height to `100vh`, the "Checkout" button pinned to the bottom will be physically hidden behind Safari's native navigation bar.
- **The Modern Fix:** Use the new CSS viewport units: `100dvh` (Dynamic Viewport Height). 
- `height: 100dvh;` mathematically recalculates the height in real-time as the browser's native UI expands and shrinks, ensuring your primary conversion buttons are always perfectly visible above the system notch.

---

## AI Prompt — Engineer for Mobile Physics

```prompt
I am auditing the mobile responsiveness of a production e-commerce site to maximize conversion rates from paid social traffic.

Tech Stack:
- Styling: [e.g., Tailwind CSS]
- Target Browsers: [iOS Safari, Android Chrome, Meta In-App Browser]

Act as a Principal Mobile UX Engineer:
1. Explain the strict CSS rules required to prevent iOS Safari from aggressively auto-zooming the viewport when a user clicks on the checkout `<input>` fields.
2. Outline the Apple HIG (Human Interface Guidelines) 44x44px touch target rule, and provide a Tailwind CSS configuration strategy to enforce minimum tap areas for all icons and variant swatches.
3. Define the technical difference between CSS `100vh` and `100dvh`, and explain why using `100dvh` is mandatory for full-screen Cart Drawers to prevent the "Checkout" button from being hidden behind the Safari system navigation bar.
```

---

## Mobile Responsiveness Checklist

- [ ] All interactive elements (Buttons, Swatches, Close Icons) audited to ensure a minimum 44x44px touch target size
- [ ] Strict 16px minimum font size enforced on all `<input>` elements to prevent the iOS Safari auto-zoom bug
- [ ] `100dvh` (Dynamic Viewport Height) utilized for all full-screen modals/menus to account for collapsing mobile browser UI
- [ ] Mobile navigation and Cart Drawers rigorously tested within the Meta/TikTok in-app browsers, not just native Chrome/Safari
