---
title: UI Polish
slug: ui-polish
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 15-20 min
---

# UI Polish

Your screens work. This module is about the difference between "functional" and "impressive" — the layer of detail that takes a working app and makes it feel like a real, considered product in the few minutes a judge spends with it. This is disproportionately high-leverage time in a hackathon: small, fast changes here often move your perceived quality more than additional hours of backend work would.

---

## The Core Idea: Judges Feel Polish Before They Evaluate Logic

In the first few seconds of seeing your app, a judge forms an impression almost entirely from visual and motion cues — not from your feature list. That first impression colors how generously they interpret everything that follows. A few specific, well-placed details account for most of that impression.

> [!TIP]
> If you have one hour left and have to choose between adding a Nice-to-Have feature or polishing your existing screens, polish. An extra feature is one more thing to explain; polish improves every single second a judge spends looking at what you already built.

---

## The High-Leverage Polish Checklist

Not all polish is equal. These specific items consistently move perceived quality the most, for the least time invested.

**Decision Card — Polish Priority Order**

| Polish Item | Effort | Impact | Priority |
|---|---|---|---|
| Smooth loading states (skeleton screens, not blank/spinner) | Low | High | Do first |
| Micro-interactions (button hover/press feedback, smooth transitions) | Low | High | Do first |
| Consistent spacing and alignment (no slightly-off margins) | Low | High | Do first |
| One genuinely well-designed "hero" moment (your wow screen specifically) | Medium | Very high | Do second, with the most time |
| Subtle animation on key state changes (result appearing, not just popping in) | Low-medium | Medium-high | Do if time allows |
| Custom illustrations or icons | High | Medium | Usually skip — use icon libraries instead |
| Dark mode support | Medium-high | Low | Skip — rarely seen in a live demo, not worth the time |

---

## Step 1: Fix Loading States First

A loading state is visible in every single demo run, guaranteed — covered in Frontend Engineering as a Must-Have. This module's addition: make it feel *designed*, not just present.

**Best Practice Card — Loading State Upgrade**

```
 Generic spinner with no context
 Skeleton screen that mimics the actual content's layout (gray
   blocks where text/images will appear) — makes the wait feel
   shorter and the app feel more considered
 If your process genuinely takes several seconds (e.g., an AI
   generation step), show a brief, specific status message ("Analyzing
   your document...") instead of a generic spinner — this reframes
   a wait as "the app is doing something smart" rather than "the
   app is stuck"
```

> [!WARNING]
> Don't fake a fast result with no loading state if your actual process takes several real seconds. A result that appears instantly when it shouldn't (because you're secretly using cached/seeded data) can look suspicious to an attentive judge, and a result that's genuinely slow with no loading feedback looks broken. Match the loading state honestly to your real processing time.

---

## Step 2: Add Micro-Interactions Where They're Cheap

Most component libraries (see Frontend Engineering) include hover states, transition utilities, and basic animation primitives by default — using them costs almost nothing extra and significantly increases the feeling of a "real" product.

- Buttons should visibly respond to hover and click (most libraries do this by default — don't override it away)
- Page/state transitions should fade or slide rather than hard-cut, where your framework makes this easy (e.g., a simple CSS transition class)
- Form inputs should show clear focus states

> [!NOTE]
> These are typically near-zero additional engineering effort if you're using a real component library rather than raw unstyled HTML — which is itself a reason to follow the Frontend Engineering module's recommendation to use one.

---

## Step 3: Give Your Wow Moment the Most Design Attention, Specifically

Every other screen can be clean and consistent. Your wow-moment screen — identified back in the User Flows module — should be the one screen where you spend extra deliberate design time: larger, more confident visual treatment of the actual result, more careful layout, maybe a small celebratory animation when it appears.

> [!WARNING]
> Don't spread polish evenly across every screen if you're short on time. A login screen that's slightly plain is forgettable. A wow-moment screen that's slightly plain is a missed opportunity at the exact moment you had the judge's full attention.

---

## Using AI for Fast, Targeted Polish

AI is genuinely strong here — turning a working-but-plain screen into a more polished one is a well-scoped, visually verifiable task perfectly suited to quick iteration.

**Prompt: Polish Pass on an Existing Screen**

```
Here's my current [screen name] component:
[paste code]

This uses [component library] and these design tokens: [colors,
font, spacing from Design System module].

Apply polish specifically in these areas only:
1. Replace any generic spinner/blank loading state with a skeleton
   screen matching this screen's actual layout
2. Add hover/transition micro-interactions to interactive elements,
   using utilities already available in [component library] — don't
   introduce a new animation library
3. Fix any inconsistent spacing against my spacing scale

Do not change the underlying functionality or add new features —
this is a visual polish pass only.
```

> ** Why this prompt works**
> Scoping the request explicitly to visual polish, with a clear "do not change functionality" boundary, prevents the model from refactoring working logic while you only wanted appearance changes — a real risk when a broad "improve this" prompt invites scope creep into code that already works. Restricting to utilities already in your existing component library avoids introducing a new dependency this late in the build, which would add setup risk for marginal visual gain.

**Token efficiency note:** Run this polish pass per-screen, after each screen's core functionality is already verified working — polishing a screen before its logic is confirmed correct means redoing visual work if the underlying structure changes. Save this step for after Frontend Engineering's verification step on that screen.

---

## Validating the Polish

- [ ] Loading states are skeleton screens or specific status messages, not generic spinners, and match your actual processing time honestly
- [ ] Interactive elements show visible hover/click feedback
- [ ] Spacing and alignment are consistent across screens — check by looking, not by assuming the library handled it
- [ ] Your wow-moment screen specifically has received more design attention than the others
- [ ] No new functionality was accidentally introduced or changed during a polish pass — verify the screen still does exactly what it did before

---

## What's Next

Move to **Hosting** — getting your polished app deployed to a real, stable URL you can demo from with confidence.
