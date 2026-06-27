---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Wireframes

Wireframes turn your Information Architecture into actual screens — without committing to colors, fonts, or visual polish yet. The goal here is to validate *layout and flow*, not aesthetics. If you find yourself picking a color palette right now, you're a phase ahead of yourself; that's Branding and Design System, not this.

Skipping wireframes and jumping straight to high-fidelity UI is the most common way production SaaS projects waste weeks — teams polish a screen, then realize the flow itself is wrong, and have to redo the polish too.

---

## Decision 1: Fidelity Level

| Level | What it looks like | Use it when |
|---|---|---|
| Low-fidelity | Boxes, labels, arrows — no real UI | Validating flow and layout before any visual work |
| Mid-fidelity | Grayscale, real components, no brand styling | Confirming component structure before handoff to design system |
| High-fidelity | Final colors, fonts, spacing | After Branding + Design System are decided |

> ✅ **Best Practice**
> Stay at **low-to-mid fidelity** in this phase. Production teams that jump to high-fidelity wireframes end up re-skinning everything once branding decisions land — duplicated work, guaranteed.

---

## Decision 2: What to Wireframe First

Wireframe in this order, not screen-by-screen as features come to mind:

1. **The critical path** — signup → first meaningful action → core value moment. This is the flow that determines if your product works at all.
2. **The core resource's primary screens** — list view, detail view, create/edit view for whatever entity your product revolves around.
3. **Settings screens** — account, workspace, billing (these mirror the separation you made in Information Architecture).
4. Everything else, only if it's in your MVP feature list.

> ⚠️ **Warning**
> If a screen isn't on your MVP feature list from Phase 0, don't wireframe it yet. Wireframing non-MVP screens is scope creep disguised as productivity.

---

## Decision 3: States, Not Just Screens

This is what separates production wireframes from beginner wireframes. Every screen showing data needs **four states**, not one:

> **Decision Card — Required States**
> - **Empty state** — first-time use, zero data. (What does a brand-new workspace's dashboard actually show?)
> - **Loading state** — data is fetching. (Skeleton? Spinner? Matters for perceived performance.)
> - **Populated state** — the "happy path" screen most people only wireframe.
> - **Error state** — request failed, permission denied, or resource not found.

Skipping empty and error states is the single most common wireframing gap. It's also where AI tools default to skipping, because the happy path is the "obvious" answer.

---

## Decision 4: Permission-Based Variants

Cross-check against your Information Architecture decisions: any screen with role-based differences needs a wireframe variant per role. At minimum, wireframe:

- What a **regular member** sees
- What an **admin/owner** sees (extra controls, settings access, billing visibility)

If these are identical, that's worth confirming deliberately — not assuming.

---

## Decision 5: Mobile & Responsive Priority

For most B2B SaaS dashboards, desktop is the primary use case — but you still need a baseline mobile/tablet plan, not an afterthought.

| Approach | When it fits |
|---|---|
| Desktop-first, responsive fallback | Internal tools, data-dense dashboards, admin panels |
| Mobile-first | Consumer-facing SaaS, anything used on the go |
| Desktop-only (explicitly) | Niche B2B tools where mobile use is genuinely rare — state this decision explicitly so engineering doesn't over-invest in responsive CSS unnecessarily |

> 💡 **Tip**
> Decide this explicitly and write it down. "We'll handle responsiveness later" quietly becomes "we never did," and retrofitting responsive layouts onto a desktop-only component structure is far more expensive than designing for it now.

---

## Common AI Mistakes to Watch For

- **Only wireframes the happy path** — no empty, loading, or error states. Always ask explicitly.
- **Wireframes screens outside MVP scope** — politely declined features creeping back in.
- **Sneaks in visual design decisions** — specific colors, custom fonts, shadows. Redirect it; that's a later phase.
- **Ignores your IA route map** — proposes screens that don't match the routes and hierarchy you already decided. Cross-check every wireframe against your Information Architecture output.
- **Treats every role the same** — misses permission-based UI differences entirely unless explicitly prompted.

---

## AI Prompt: Generate Wireframe Descriptions

Reuse your Information Architecture route map here instead of re-explaining your app from scratch.

```
I'm wireframing a production SaaS app at low-to-mid fidelity (layout and structure only — no colors, fonts, or visual styling).

Context:
- Route map: [paste your Information Architecture route map]
- MVP feature list: [paste MVP features]
- Roles in this app: [e.g., member, admin, owner]

For each core screen in the route map, describe:
1. Layout structure (regions: nav, main content, sidebar panels, etc.)
2. Key components present and their rough placement
3. Empty state — what shows for a brand-new workspace
4. Loading state — what indicates data is fetching
5. Error state — what shows on failure or permission denial
6. Any differences for admin/owner vs regular member

Do not suggest colors, fonts, or branding. Do not invent screens outside the route map above. Flag any screen where you're uncertain which role should see which controls.
```

---

## Validate Before You Move On

- [ ] Every wireframed screen traces back to a route in your Information Architecture
- [ ] Empty, loading, and error states exist for every data-driven screen
- [ ] Role-based variants are wireframed wherever permissions differ
- [ ] No screen outside the MVP feature list snuck in
- [ ] No colors, fonts, or branding decisions appear yet
- [ ] Mobile/responsive approach is an explicit decision, not an unstated assumption

> 💡 **Tip**
> Keep this output handy for **Branding** and **Design System** — you'll apply visual styling directly onto this structure rather than starting over.

---

**Next:** Branding — establish the visual identity that will skin these wireframes.
