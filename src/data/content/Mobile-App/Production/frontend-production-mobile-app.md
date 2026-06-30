---
title: Frontend
slug: frontend
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25-35 min
---

# Frontend

Phase 2 decided your tech stack, state management approach, and design system. This module is where that turns into a real, organized codebase — the folder structure, component conventions, and styling approach you'll live with for the rest of the build. Get the structure right now; it's far cheaper than restructuring 200 components later.

This module covers structure and conventions. Navigation, lifecycle handling, and state implementation each get their own module next — don't try to solve those here.

---

## Why Structure Gets Decided Before Code

> ⚠️ AI coding tools are excellent at generating individual components and genuinely bad at maintaining a consistent project structure across a long session. Without an explicit convention, you'll end up with three different folder patterns by the time you're 20 screens in — because each AI conversation invents its own structure if you don't supply one. Decide the structure once, write it down, and paste it into every AI conversation for the rest of this phase.

---

## Decision 1 — Folder Structure

Two dominant patterns for mobile codebases. Pick one — don't mix them.

| Pattern | Structure | Best For |
|---|---|---|
| **Type-based** | `/components`, `/screens`, `/hooks`, `/utils` — grouped by what kind of file it is | Smaller apps, teams of 1-3, simpler domain |
| **Feature-based** | `/features/auth`, `/features/profile`, `/features/checkout` — each feature owns its components, hooks, and logic | Larger apps, multiple contributors, complex domains |

> **Recommendation:** for a production mobile app expected to grow past an MVP, use **feature-based structure** from the start. Type-based structure feels organized early on, but as the app grows, navigating between a screen, its hooks, and its API calls scattered across three top-level folders gets genuinely painful. Feature-based keeps everything related to "checkout" in one place, which also maps cleanly to how you'll eventually split work across contributors or AI sessions — one feature folder is a self-contained unit of context.

```
src/
  features/
    auth/
      components/
      hooks/
      api.ts
      types.ts
    profile/
      components/
      hooks/
      api.ts
      types.ts
  shared/
    components/        ← truly cross-feature UI (Button, Card, Input)
    hooks/              ← truly cross-feature hooks
    api/                ← API client setup, shared request logic
    utils/
  navigation/
  app/                  ← app entry, providers, root config
```

> 💡 **The test for "does this belong in `shared/`":** would at least two unrelated features need it unchanged? If a component is only used by `profile` and `settings`, it's not shared yet — leave it in whichever feature owns it until a third feature genuinely needs it. Premature sharing creates tightly-coupled "shared" components that secretly assume one feature's behavior.

---

## Decision 2 — Component Conventions

Lock these in before generating components, not after:

- **One component per file**, file name matches component name (`ProductCard.tsx` exports `ProductCard`).
- **Co-locate styles with components** rather than a separate global stylesheet directory — easier to find, easier to delete cleanly when a component is removed.
- **Props interfaces are explicit and exported**, not inferred or `any`. This is the single highest-leverage convention for working with AI tools: an explicit `ProductCardProps` interface is what lets AI generate correct usages of your component elsewhere without re-reading the implementation.

```typescript
interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, onPress, variant = 'default' }: ProductCardProps) {
  // ...
}
```

> ⚠️ **Common mistake:** letting components grow past ~150-200 lines by accumulating conditional rendering branches. When a component needs more than 2-3 layout variants, split it into separate components composed by a parent, rather than branching internally on a `variant` prop with deeply nested conditionals. AI tools will happily keep extending a large component instead of suggesting a split — you have to make that call.

---

## Decision 3 — Styling Approach

| Approach | Tradeoff |
|---|---|
| **StyleSheet (React Native built-in)** | Zero dependencies, but no design tokens out of the box — you enforce consistency manually |
| **NativeWind (Tailwind for RN)** | Fast to write, enforces consistency via constrained utility classes, strong AI tool familiarity (most AI coding tools know Tailwind syntax well) | 
| **Tamagui / Restyle** | Strong type-safety and theming, better performance for complex apps, steeper learning curve |

> **Recommendation:** if you defined a design system in Phase 1 with tokens (spacing scale, color palette, typography scale), **NativeWind** is the most efficient way to enforce those tokens in code — configure your Tailwind theme to match your design tokens exactly, and every component naturally inherits them. It also means AI-generated UI code is highly likely to already follow your design system without extra prompting, since Tailwind conventions are well-represented in how AI tools were trained.

---

## Decision 4 — Reusable Component Library

Before building screens, build your primitive component set — this is what keeps 50 screens visually consistent instead of having each one reinvent buttons and inputs slightly differently.

**Build these first, screens second:**

- `Button` (with variants: primary, secondary, destructive, disabled states)
- `Input` / `TextField` (with error state, helper text)
- `Card`
- `Avatar`
- Typography components (`Heading`, `Body`, `Caption`) instead of raw `<Text>` with inline styles everywhere

> 💡 Every one of these should be driven by your design tokens from Phase 1, not hardcoded values. If your design system defined a spacing scale of `4, 8, 12, 16, 24, 32`, your components should only ever use those values — never an arbitrary `17px`. This is what makes a UI feel deliberately designed instead of assembled ad hoc.

---

## Decision 5 — Loading, Empty, and Error States

You designed these states in Phase 1 (*Loading States*, *Empty States*, *Error States*). Decide now how they're implemented structurally, not per-screen:

- Build a generic `<AsyncBoundary>` or equivalent wrapper component that handles the loading/error/empty/success branching once, and reuse it — don't reimplement the same `if (loading) ... if (error) ... if (empty) ...` chain in every screen.
- This also makes your screens easier to read: the screen component focuses on the success-state UI, and the wrapper handles the rest.

```typescript
<AsyncBoundary
  loading={isLoading}
  error={error}
  isEmpty={data?.length === 0}
  emptyState={<EmptyProductList />}
>
  <ProductList products={data} />
</AsyncBoundary>
```

---

## Performance Foundations to Set Now

These are cheap to establish early and expensive to retrofit:

- **List rendering:** use `FlatList`/`FlashList` (not `.map()` inside a `ScrollView`) for any list that could grow beyond a screen's worth of items — `ScrollView` renders everything at once and will visibly lag past a few dozen items.
- **Image handling:** use a caching image component (`expo-image` or equivalent) instead of the bare `Image` component — re-fetching and re-decoding images on every re-render is a common, invisible-until-scale performance drain.
- **Memoization discipline:** don't reach for `useMemo`/`useCallback` everywhere reflexively — it has its own cost. Apply it specifically to expensive computations and to props passed into memoized child components, not as a blanket habit.

---

## AI Prompts

### Prompt 1 — Scaffold the Structure

```
Scaffold a feature-based folder structure for a production React Native
[or Flutter] app with these features: [list your core features].

Each feature folder should include: components/, hooks/, api.ts, types.ts.
Include a shared/ directory for cross-feature UI primitives (Button, Input,
Card, Typography) and a navigation/ directory.

Also generate the base primitive components (Button, Input, Card) using
[NativeWind/your styling choice], driven by these design tokens: [paste
your spacing scale, color palette, typography scale from Phase 1].
```

### Prompt 2 — Component Review

```
Review this component for our project conventions:

[paste component]

Check for: explicit exported props interface (no inferred/any types),
hardcoded values that should reference design tokens instead, component
length/complexity (should it be split?), and whether loading/error/empty
states use our AsyncBoundary pattern instead of inline conditionals.
```

---

## Validating AI Output

- [ ] New code follows the chosen folder pattern (feature-based or type-based) consistently — not a third structure invented mid-session
- [ ] Components have explicit, exported props interfaces — no `any`, no inferred prop shapes
- [ ] Styling uses design tokens, not hardcoded spacing/color values
- [ ] Lists use `FlatList`/`FlashList`, not `.map()` inside `ScrollView`, for anything that can grow
- [ ] Loading/error/empty states use the shared boundary pattern, not duplicated inline conditionals per screen
- [ ] No component has silently grown past ~150-200 lines without a suggested split

---

## What's Next

- **Navigation** (next in this phase) defines how screens connect — the folder structure here assumes a `navigation/` directory this next module will fill in.
- **State Management Impl** turns the state management approach decided in Phase 2 into actual providers/stores wired into this structure.
- **Testing** (later in this phase) will rely on the explicit props interfaces and component boundaries you established here — untyped, monolithic components are much harder to test in isolation.
