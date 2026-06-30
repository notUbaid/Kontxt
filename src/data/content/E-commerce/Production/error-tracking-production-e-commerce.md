---
title: Error Tracking
slug: error-tracking
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Error Tracking

You already have Sentry catching exceptions, from the Monitoring module. This module is about something more specific: making sure errors are classified correctly, surfaced with the right urgency, and — critically — handled gracefully on the customer-facing side so a backend error doesn't turn into a broken checkout experience.

---

## The Gap This Module Closes

Monitoring told you *that* an error happened. Logging gave you the trail to investigate it. What's still missing: **what does the customer see when an error occurs**, and **does every error get treated with the same urgency, or are you triaging correctly?**

> **Reframe:** Error tracking isn't just about your visibility into errors — it's equally about controlling what happens on the other side of that error, in front of a real customer who's trying to give you money.

---

## Severity Classification: Not All Errors Are Equal

A useful habit: tag errors by what's actually at stake, so your attention goes to the right place first.

<table>
<tr><th>Severity</th><th>Example</th><th>Response time</th></tr>
<tr><td><strong>Critical</strong></td><td>Payment succeeded but order creation failed; checkout completely broken</td><td>Immediate — this is losing money or trust right now</td></tr>
<tr><td><strong>High</strong></td><td>Confirmation email failed to send; search is broken</td><td>Same day</td></tr>
<tr><td><strong>Medium</strong></td><td>A non-critical UI component throws an error; admin dashboard glitch</td><td>This week</td></tr>
<tr><td><strong>Low</strong></td><td>Console warning, deprecation notice, cosmetic issue</td><td>Whenever, batched</td></tr>
</table>

```javascript
// Tag errors with severity so Sentry's dashboard reflects actual priority, 
// not just chronological order
Sentry.captureException(error, {
  level: 'fatal', // critical — Sentry's 'fatal' level
  tags: { area: 'checkout', critical: true },
});

Sentry.captureException(error, {
  level: 'warning', // medium — won't trigger the same alert urgency
  tags: { area: 'admin-dashboard' },
});
```

> **Why this matters:** Without explicit severity tagging, your error dashboard treats a typo in an admin-only tooltip the same as a failed payment. Over time, that flattens your sense of urgency — you stop checking the dashboard carefully because most of what's there doesn't actually matter. Tagging by severity keeps the signal-to-noise ratio high enough that you trust and act on what you see.

---

## Error Boundaries: Containing Failures on the Frontend

A React error in one component shouldn't take down your entire page. This is what Error Boundaries are for — and they're particularly important around third-party or complex UI (payment forms, image galleries, anything with more moving parts).

```javascript
'use client';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorFallback />;
    }
    return this.props.children;
  }
}

// Usage — isolate specific sections so a failure doesn't take down the whole page
<ErrorBoundary fallback={<ProductGalleryFallback />}>
  <ProductImageGallery images={product.images} />
</ErrorBoundary>
```

> **Where to actually place these:** Wrap sections that are complex or somewhat independent of the rest of the page — a product image carousel, a reviews widget if you add one later, anything embedding third-party scripts. Don't wrap your entire app in a single boundary at the root only; that just means the *whole page* goes blank on any error, which is barely better than no boundary at all. Isolate failures to the smallest reasonable section.

---

## Graceful Degradation for Checkout Specifically

This is the most important application of error tracking in your entire store — because checkout failures are the ones that cost you directly.

```javascript
async function handleCheckout() {
  setLoading(true);
  try {
    const response = await fetch('/api/checkout', { 
      method: 'POST', 
      body: JSON.stringify({ items: cartItems }) 
    });
    
    if (!response.ok) {
      const error = await response.json();
      
      if (error.error === 'stock_unavailable') {
        // Specific, actionable error — tell the customer exactly what's wrong
        setError(`Some items in your cart are no longer available: ${error.issues.map(i => i.productId).join(', ')}`);
        return;
      }
      
      throw new Error('Checkout failed');
    }

    const { url } = await response.json();
    window.location.href = url; // redirect to Stripe
  } catch (err) {
    Sentry.captureException(err, { tags: { area: 'checkout', critical: true } });
    setError('Something went wrong starting checkout. Please try again, or contact us if this persists.');
  } finally {
    setLoading(false);
  }
}
```

> **Critical concept — distinguish expected failures from unexpected ones.** A stock-unavailable response isn't a bug — it's expected behavior your code already validated for, per the Cart and Checkout modules. Show the customer something specific and actionable for it. A genuinely unexpected error (network failure, an unhandled exception) gets a generic but reassuring message, plus a Sentry capture so *you* know about it even though the customer doesn't see the technical details. Never show a customer a raw error message or stack trace — but never leave them with silence either.

---

## What the Customer Should Never See

- Raw error messages or stack traces
- Database error details ("duplicate key violation on orders_pkey")
- A blank white screen with no explanation
- A spinner that never resolves with no timeout or fallback

**What they should see instead:**
- A clear, human statement that something went wrong
- What to do next (try again, contact you, check back later)
- Reassurance that they haven't been charged, if that's true and verifiable

```javascript
function DefaultErrorFallback() {
  return (
    <div className="error-state">
      <p>Something went wrong loading this section.</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
}
```

---

## AI Prompt: Add Error Handling and Boundaries

```
I'm improving error handling for a personal e-commerce store's frontend, 
built with Next.js/React.

Requirements:
1. A reusable ErrorBoundary component that captures errors to Sentry with 
   contextual tags and renders a graceful fallback UI
2. Apply it around these specific sections (not the entire app root): 
   [list your complex/risky components — e.g., product image gallery, 
   any third-party embeds]
3. Improve my checkout handler to distinguish expected errors (stock 
   unavailable — show a specific actionable message) from unexpected 
   errors (generic reassuring message + Sentry capture with critical tag)
4. Ensure no raw error messages, stack traces, or database error details 
   are ever shown to the customer

My current checkout handler: [paste actual code]

Flag any place in this code where a raw error or technical detail could 
currently leak through to the UI.
```

> **Token efficiency tip:** Asking AI to specifically flag places where raw errors could leak through targets the exact failure mode this module is about, rather than getting generic error-handling boilerplate that may not address your actual gaps.

---

## Validating AI-Generated Error Handling

- [ ] Are Error Boundaries placed around specific risky sections, not just wrapped once around the entire app?
- [ ] Does the checkout error handler distinguish expected validation errors (stock issues) from unexpected exceptions, with different messaging for each?
- [ ] Is there any code path where a raw error message, stack trace, or database error detail could reach the customer-facing UI?
- [ ] Are errors tagged with severity/area so your Sentry dashboard reflects actual priority?
- [ ] Does the fallback UI give the customer a clear next action (retry, contact), not just an apology with no path forward?

> **Common AI mistake:** AI sometimes generates a catch block that does `setError(err.message)`, directly surfacing the raw JavaScript or database error message to the UI. This looks like it's "handling" the error because something is displayed, but it's actually leaking implementation details to the customer. Always require a translation step between the technical error and what's shown.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Automated error-triage/ticketing system integration
- Custom error tracking dashboards beyond Sentry's built-in views
- Error budgets / SLO tracking
- Synthetic error injection testing frameworks

---

## Implementation Checklist

- [ ] Errors tagged with severity (critical/high/medium/low) and area, not left at default Sentry classification
- [ ] Error Boundaries added around specific risky/complex frontend sections
- [ ] Checkout error handling distinguishes expected validation errors from unexpected exceptions
- [ ] No raw error messages, stack traces, or database details reach the customer UI anywhere in the app
- [ ] Fallback UI always gives the customer a clear next action
- [ ] Critical-path errors (checkout, webhook) verified to be tagged distinctly so they stand out in your Sentry dashboard
- [ ] Manually tested: force a checkout error and confirm the customer sees a clear, non-technical message

---

## What's Next

With errors handled gracefully and tracked with the right priority, it's time to protect your endpoints from abuse — that's **Rate Limiting**, next in this phase.
