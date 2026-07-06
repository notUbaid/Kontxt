---
title: Loading States
slug: loading-states
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 20–30 min
---

# Loading States

Loading states are the difference between a store that feels fast and one that feels broken. Users tolerate slow — they don't tolerate uncertain. A blank white flash while products load destroys more trust than a 2-second spinner.

This module covers the five loading contexts your e-commerce store will encounter, what each one needs, and exactly how to implement them.

---

## The Five Contexts

| Context | Where It Happens | What Users Expect |
|---|---|---|
| **Page skeleton** | Initial page load, route changes | Instant structure, content fills in |
| **Product images** | Catalog, product pages | Placeholder → sharp image |
| **Add to cart** | Cart button | Button feedback, no double-submit |
| **Checkout** | Payment processing | Clear progress, no freeze |
| **Search / filter** | Catalog filtering, search results | Immediate response, results appear |

---

## Pattern 1 — Skeleton Screens (Use This for Products)

Spinners say "wait." Skeletons say "this is where your content lives."

For product grids and product detail pages, always use skeletons. They communicate structure before content arrives, which feels faster even when it isn't.

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│             │  │             │  │             │
│   [image]   │  │   [image]   │  │   [image]   │
│             │  │             │  │             │
│ ░░░░░░░░░░ │  │ ░░░░░░░░░░ │  │ ░░░░░░░░░░ │
│ ░░░░░░░    │  │ ░░░░░░░    │  │ ░░░░░░░    │
└─────────────┘  └─────────────┘  └─────────────┘
```

The shimmer animation is what makes this feel alive. Without it, a skeleton is just a grey box.

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

> **Tip:** Match skeleton dimensions to real content. A 200px skeleton for a 400px image causes layout shift when content loads — which Google measures and penalizes.

---

## Pattern 2 — Image Loading

Never show a blank space where an image will be. Give it a placeholder immediately.

**Three approaches, ordered by preference:**

| Approach | How It Works | Use When |
|---|---|---|
| **Blur-up** | Load tiny 20px thumbnail first, blur it, swap on load | Product pages, hero images |
| **Dominant color** | Extract primary color from image, fill while loading | Product grids at scale |
| **Skeleton** | Grey placeholder with shimmer | Fast connections, small images |

**Implementation — blur-up:**
```jsx
function ProductImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {!loaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </div>
  );
}
```

> **Warning:** Do not use `loading="lazy"` on above-the-fold product images. It delays loading for the most important visual on the page. Lazy-load below-the-fold images only.

---

## Pattern 3 — Add to Cart Button

The most critical loading state in your store. A user who clicks "Add to Cart" twice submits two orders.

**Required behavior:**
- Disable the button immediately on first click
- Show a spinner or in-button feedback
- Restore the button only after success or failure
- Show confirmation on success

```jsx
function AddToCartButton({ productId }) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function handleClick() {
    setStatus('loading');
    try {
      await addToCart(productId);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
    >
      {status === 'idle' && 'Add to Cart'}
      {status === 'loading' && <Spinner size="sm" />}
      {status === 'success' && ' Added'}
      {status === 'error' && 'Failed — Try Again'}
    </button>
  );
}
```

> **Warning:** Never just disable the button without visual feedback. Users will assume it's broken.

---

## Pattern 4 — Checkout Loading

Checkout is where users are most anxious. The loading state here needs to communicate progress and prevent panic.

**What users fear:**
- Was my payment charged?
- Did my order go through?
- Is the site broken?

**What to show:**

```
┌────────────────────────────────────────┐
│                                        │
│          ◌ Processing payment...       │
│                                        │
│   Please do not refresh this page.    │
│                                        │
└────────────────────────────────────────┘
```

**Rules for checkout loading:**
- Full-screen overlay (not just a button state) — the entire page should be locked
- Explicit "do not refresh" message
- No spinner that could loop forever — add a timeout with fallback message at 15s
- On success, redirect immediately — don't make users click "Continue"

---

## Pattern 5 — Search and Filter

Perceived speed matters more than actual speed. When a user adjusts a filter, they expect instant feedback.

**Two strategies:**

| Strategy | Latency | Complexity |
|---|---|---|
| **Optimistic UI** | Instant | Medium |
| **Debounce + skeleton** | 150–300ms | Low |

For a personal project, debounce + skeleton is the right call.

Debounce delays your API call until the user stops typing/clicking. 300ms is the sweet spot — fast enough to feel instant, slow enough to avoid 10 API calls per filter interaction.

```js
// Debounce utility
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// In your filter component
const debouncedFilters = useDebounce(filters, 300);

useEffect(() => {
  fetchProducts(debouncedFilters);
}, [debouncedFilters]);
```

While waiting: replace the product grid with skeletons immediately on filter change. Don't wait for the API response to start the skeleton — start it the moment the filter changes.

---

## Common Mistakes

> **Don't use spinners for page-level loading.** A spinner on a blank page is the worst UX. Users don't know if anything is happening or if the page is broken. Skeletons show structure. Spinners show nothing.

> **Don't use generic "Loading..." text.** "Loading products..." is better than "Loading...". Give users context.

> **Don't forget slow connections.** Your store works on your WiFi. Test on 3G. DevTools → Network → Slow 3G. You'll find loading states you missed.

> **Don't animate loading states that resolve in under 100ms.** Showing a loading animation that immediately disappears is jarring. Add a minimum display duration of 200ms or suppress the animation entirely for fast responses.

---

## Implementation Checklist

- [ ] Product grid has skeleton loader (not spinner)
- [ ] Product images have placeholder while loading
- [ ] Above-the-fold images are not lazy-loaded
- [ ] Add to Cart button disables on click, shows feedback, prevents double-submit
- [ ] Checkout has full-page overlay with "do not refresh" message
- [ ] Filter/search changes trigger immediate skeleton, not blank state
- [ ] Loading states tested on throttled network (DevTools → Slow 3G)
- [ ] All loading states have a timeout fallback (no infinite spinners)
- [ ] Skeleton dimensions match final content dimensions (no layout shift)

---

## AI Prompt — Generate Your Loading Components

<copy-prompt>
I'm building a personal e-commerce store. Generate reusable React + TypeScript loading state components for these five scenarios:

1. Product grid skeleton (3-column, matches a ProductCard with image, title, price)
2. ProductImage component with blur-up loading and fallback skeleton
3. AddToCart button with idle / loading / success / error states, disabled during loading
4. Checkout overlay that locks the page during payment processing with "do not refresh" text
5. useDebounce hook for search/filter with 300ms delay

Requirements:
- Use Tailwind CSS for styling
- Use CSS keyframe animation for shimmer (not a library)
- All components should be accessible (aria-busy, aria-label where relevant)
- No external animation libraries

Output each component as a separate file with its filename as a comment at the top.
</copy-prompt>

---

## Validating AI Output

When reviewing the generated components, check for:

- **Skeleton dimensions:** Do they match the actual component they replace? Mismatched sizes cause layout shift (CLS), which hurts Core Web Vitals.
- **Double-submit protection:** The Add to Cart button must be `disabled` during loading. Check that the `disabled` attribute is actually applied, not just the visual style.
- **Aria attributes:** Skeletons should have `aria-hidden="true"`. Buttons in loading state should have `aria-busy="true"`.
- **Shimmer animation:** Confirm `background-size: 200%` or similar — without this the gradient doesn't move.
- **Missing states:** Ask: what happens if the API call never resolves? Does the button stay disabled forever? Add a timeout.

---

## Quick Reference

| Loading Context | Pattern | Never Use |
|---|---|---|
| Product grid | Skeleton | Spinner, blank page |
| Product images | Blur-up or skeleton | Empty `<img>` |
| Add to Cart | In-button state | Alert, page reload |
| Checkout | Full-page overlay | Button spinner only |
| Search/filter | Debounce + skeleton | Instant re-render, spinner |
