---
title: Interactive Playground
slug: interactive-playground
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 15-25 min
---

# Interactive Playground

Postman gets developers testing your API outside your docs. A playground gets them testing it without ever leaving the page they're reading — paste a key, hit "Try it," see a real response, right next to the documentation that explains it. This removes the last bit of friction between "reading about an endpoint" and "confirming it works."

---

## You Likely Already Have This

> **Decision card**
> If you chose Mintlify for documentation (from the API Documentation module), it renders an interactive "Try it" panel automatically from your OpenAPI spec — no separate integration work required. Check this before building or embedding anything separate. The same applies to Redocly and Readme.com, which both include playground functionality driven by the same spec you already generate.

If you're on a docs tool without a built-in playground, embed **Scalar** or **Swagger UI**, both of which also render directly from an OpenAPI spec:

```html
<!-- Scalar embed -->
<script id="api-reference" data-url="/openapi.json"></script>
<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
```

---

## The Real Design Problem: Live Keys in a Browser

A playground makes real HTTP requests from the developer's browser to your live API, using whatever key they paste in. This introduces a genuine security surface that a static docs page doesn't have.

| Risk | Mitigation |
|---|---|
| Developer pastes a production key into a page they don't fully trust | Recommend and support test-mode keys specifically for playground use |
| Key persists in browser storage/history longer than intended | Never persist keys beyond the session; clear on page reload |
| Playground requests bypass your normal client-side safeguards | Route playground traffic through the same auth/rate-limiting middleware as any other request — no special-cased bypass |

> **Decision card — support test-mode keys**
> Recall the `sk_live_` / `sk_test_` prefix distinction from the API Keys Management module. Recommend developers use a `sk_test_` key in the playground specifically, and make clear in the playground UI that test-mode keys operate against non-production data. This gives developers a way to explore freely without the (real) risk of pasting a live credential into a browser tab.

---

## CORS: Required for a Browser-Based Playground to Work at All

The playground runs in the developer's browser, meaning requests originate from your docs site's origin, not a server. Without correctly configured CORS (from the Security module), these requests will fail entirely.

```typescript
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ["https://docs.yourapi.com", "https://yourapi.com"];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
}));
```

> **Warning — don't loosen CORS globally just to make the playground work**
> It's tempting to set `origin: "*"` to unblock the playground quickly. Instead, add your specific docs domain to the existing allow-list from the Security module. A wildcarded CORS policy on an API that accepts credentials reopens exactly the cross-origin risk that module warned against — the playground doesn't need a global exception, just one more allowed origin.

---

## Rate Limiting Playground Traffic

Playground requests should go through your real rate limiter (from the Rate Limiting module) — not a separate, unlimited path. This is both a consistency principle (the playground should reflect real API behavior) and a practical safeguard (an unlimited playground endpoint is an easy abuse target).

> **Tip — this is also good developer education**
> A developer who hits a 429 in the playground while testing learns firsthand how your rate limiting behaves, headers and all — a more effective lesson than reading about it in a docs paragraph.

---

## What NOT to Expose in the Playground

| Don't include | Why |
|---|---|
| Any endpoint requiring admin/internal scopes | The playground is public-facing; internal endpoints shouldn't be discoverable or testable by arbitrary visitors |
| Destructive operations without clear warnings | A developer casually clicking "Try it" on `DELETE /orders/:id` with a real ID from a copied example could genuinely delete something |
| Endpoints not yet stable/released | If it's not in your public OpenAPI spec, it shouldn't be testable — keep the spec as the single gate for what's playground-visible, consistent with the OpenAPI Specification module |

> **Warning — pre-filled example values in destructive requests are a real footgun**
> If your playground auto-fills a `DELETE` request with an example ID (common default behavior), a developer might paste in a real ID from their own account without reading closely, and it will genuinely execute. Consider confirming this explicitly, or using obviously-fake placeholder IDs (`{id}` unresolved, forcing intentional input) for destructive operations specifically.

---

## AI Prompt: Verify Playground Configuration

```
I'm setting up an interactive API playground using [Mintlify /
Scalar / Swagger UI] pointed at my OpenAPI spec.

Review my setup for:
1. Does the playground route requests through my real rate limiting
   and authorization middleware, or does it bypass them somehow?
2. Is CORS scoped specifically to my docs domain, or is it wildcarded?
3. Are any admin-only or unreleased endpoints visible in the spec
   the playground reads from?
4. For destructive operations (DELETE, and PUT/PATCH that overwrite
   data), does the playground pre-fill example values that could be
   accidentally submitted against a developer's real data?

[paste OpenAPI spec excerpt and CORS config]
```

---

## Validating AI Output

- **Confirm playground traffic isn't special-cased to skip your real middleware** — verify by checking the actual request path, not by trusting a claim that "it uses the same API."
- **Confirm the CORS allow-list change is additive**, not a replacement that accidentally widens access for other origins already on the list.
- **Manually check the OpenAPI spec for any endpoint that shouldn't be publicly testable** — don't rely solely on an AI review to catch this, since it depends on judgment about what counts as "internal" that only you have full context on.

---

## Common Mistakes

- Wildcarding CORS to unblock the playground instead of adding a specific allowed origin.
- Exposing admin or internal endpoints in the same OpenAPI spec the public playground reads from.
- No guidance nudging developers toward test-mode keys, leaving live-key usage as the unstated default.
- Destructive operations pre-filled with real-looking example IDs that invite accidental execution.

---

## Validation Checklist

- [ ] Playground is generated from your existing OpenAPI spec, not a separately maintained tool
- [ ] CORS allow-list includes your specific docs domain, not a wildcard
- [ ] Playground requests flow through the same auth, scope, and rate-limiting middleware as any other request
- [ ] Documentation nudges developers toward test-mode API keys for playground use
- [ ] No admin-only or unreleased endpoints are visible in the spec the playground reads from
- [ ] Destructive operations don't pre-fill values that invite accidental execution against real data

---

## What's Next

The next module — **SDKs** — covers publishing and documenting the client library from the earlier SDK Development module as part of your public developer experience, including install instructions and usage examples alongside the playground and reference docs.
