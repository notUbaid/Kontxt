---
title: SDKs
slug: sdks
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 20–25 min
---

# SDKs

An SDK is the difference between a developer copy-pasting `fetch` calls from your docs and a developer running `npm install your-api` and getting autocomplete. It's the single highest-leverage developer experience investment you can make — but it's also the easiest thing to over-build as a solo dev. This module is about getting a typed, publishable client with almost none of the maintenance burden a hand-written SDK usually creates.

You should already have an OpenAPI specification from the previous module. Everything here builds directly on top of it — if you don't have one yet, generate that first.

---

## The Decision: Do You Need One?

Not every API needs an SDK on day one. Build one when at least one of these is true:

- Your API has more than ~5 endpoints and non-trivial request/response shapes
- You expect developers to integrate in JavaScript/TypeScript or Python specifically
- Authentication involves anything beyond a static header (token refresh, signing, pagination cursors)
- You want to reduce support questions caused by malformed requests

If your API is small and your users are comfortable with raw HTTP, a great "Example Requests" section (next module) may be enough for now. Don't build an SDK to feel legitimate — build one because it removes real friction.

---

## Hand-Written vs Generated

This is the decision that determines whether SDKs become a fun feature or a part-time job.

| | Hand-Written | Generated from OpenAPI |
|---|---|---|
| Initial effort | High | Low |
| Stays in sync with API changes | Manual, easy to forget | Automatic on regeneration |
| Type safety | Depends on discipline | Guaranteed (derived from spec) |
| Multi-language support | Expensive per language | Cheap, same spec drives all |
| Solo maintainability | Poor — becomes a second codebase | Good — spec is the source of truth |
| Custom ergonomics (retries, pagination helpers) | Full control | Needs a thin wrapper layer |

> ** Best Practice:** As a solo developer, never hand-write the request/response layer of an SDK. Generate it from your OpenAPI spec and hand-write only the thin ergonomic layer on top (auth, retries, pagination). This gives you 90% of a hand-crafted SDK's feel for 10% of the maintenance cost.

---

## Tool Comparison

| Tool | Best For | Cost | Notes |
|---|---|---|---|
| `openapi-typescript` + `openapi-fetch` | TypeScript/JS, zero server dependency | Free | Generates types only, no codegen server — fastest to adopt, tiny runtime |
| `openapi-generator-cli` | Multi-language (Python, Go, Java, etc.) | Free | Heavier, generates full client classes, output quality varies by language |
| Speakeasy | Polished multi-language SDKs with minimal setup | Generous free tier for solo/small projects | Best output quality, handles retries/pagination/auth out of the box |
| Stainless / Fern | Production-grade SDKs (Stripe/OpenAI-style) | Paid, enterprise-focused | Overkill for a personal project — revisit if you monetize seriously |

---

## Recommended Stack (Personal Mode, TS-first)

For a solo API product: **`openapi-typescript` + `openapi-fetch`**, with a small hand-written wrapper for auth and pagination.

Why this over the alternatives:
- No codegen server or Docker step — just a CLI that reads your spec and outputs a `.d.ts` file
- Fully tree-shakable, works in Node and the browser
- Types update automatically every time you regenerate from the spec, so your SDK can never drift silently from your actual API

If you plan to support Python users too, add `openapi-python-client` later — same spec, same principle, don't hand-maintain a second implementation.

---

## Workflow: From Spec to Package

```bash
# 1. Generate types directly from your OpenAPI spec
npx openapi-typescript ./openapi.yaml -o ./sdk/src/types.ts

# 2. Install the lightweight typed fetch client
npm install openapi-fetch --prefix ./sdk
```

```ts
// sdk/src/client.ts
import createClient from "openapi-fetch";
import type { paths } from "./types";

export function createApiClient(apiKey: string, baseUrl = "https://api.yourproduct.com/v1") {
  return createClient<paths>({
    baseUrl,
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}
```

That's a fully typed client in under 20 lines — every endpoint, param, and response shape is inferred from your spec, not hand-typed.

---

## Wrapping the Generated Client

Raw generated clients are correct but bare. This is the part worth hand-writing, because it's small, stable, and where real DX lives.

```ts
// sdk/src/index.ts
import { createApiClient } from "./client";

export class YourApiSDK {
  private client: ReturnType<typeof createApiClient>;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("YourApiSDK requires an API key");
    this.client = createApiClient(apiKey);
  }

  async listItems(params?: { cursor?: string; limit?: number }) {
    const { data, error } = await this.client.GET("/items", { params: { query: params } });
    if (error) throw new ApiError(error);
    return data;
  }
}

class ApiError extends Error {
  constructor(public raw: unknown) {
    super("YourApi request failed");
  }
}
```

Add here, and only here:
- **Auth injection** — key/token handling, never left to the caller
- **Retries** — exponential backoff on 429/5xx, not on 4xx
- **Pagination helpers** — an async iterator over cursor-based endpoints is worth far more to users than raw cursor params
- **Typed errors** — throw a real `ApiError` class instead of leaking raw fetch responses

> **️ Warning:** Don't add caching, request deduplication, or offline queuing to a v1 SDK. These are exactly the kind of "impressive" features that turn a weekend SDK into permanent maintenance debt. Ship the thin wrapper first.

---

## AI Prompts

**Prompt: Generate the ergonomic wrapper layer**

```text
Here is my OpenAPI spec: [paste spec or path to file].

Generate a thin TypeScript wrapper class around an openapi-fetch client for this API.

Requirements:
- Constructor takes an API key and throws if missing
- Wrap every mutating call (POST/PUT/DELETE) with retry-on-5xx logic (max 3 attempts, exponential backoff)
- Convert error responses into a typed ApiError class with `status` and `code` fields
- Add a paginate() async generator for any endpoint that returns a `cursor` field
- Do not add caching, logging, or config beyond what's listed above

Output only the wrapper code, no explanation.
```

**Prompt: Review generated SDK code before publishing**

```text
Review this SDK wrapper code for a public npm package: [paste code].

Check specifically for:
- Any place an API key or secret could leak into logs or error messages
- Missing error handling on network failures (not just non-2xx responses)
- Retry logic that could retry non-idempotent requests it shouldn't
- Exports that would break tree-shaking (default exports of large objects, side effects at module scope)

List issues by severity. Do not rewrite the code, just report findings.
```

> ** Tip:** Don't paste your entire OpenAPI spec into every AI conversation. Upload it once, generate what you need, then reference specific endpoint names ("update the `paginate()` helper for `/orders`") in follow-ups instead of re-pasting the full spec each time.

---

## Versioning & Publishing

- **Tie SDK version to API version**, not to arbitrary semver bumps. If your API is `v1`, your package major version should track it — a breaking API change means a major SDK bump, always.
- **Scope your package** (`@yourhandle/yourapi-sdk`) — avoids name collisions and signals ownership on npm.
- **Ship both ESM and CJS** via the `exports` field so it works in modern bundlers and older Node projects alike:

```json
{
  "name": "@yourhandle/yourapi-sdk",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

- **README first.** The README is the SDK's landing page — a 5-line quick start (install, initialize, one call) matters more than exhaustive API reference, which your docs site already covers.

---

## Validation Checklist

- [ ] Types regenerate cleanly from the current OpenAPI spec with zero manual edits
- [ ] `npm install` + quick-start snippet from the README actually runs against your API
- [ ] API key is never hardcoded in examples — README uses an environment variable
- [ ] Retry logic only triggers on 429/5xx, never on 4xx
- [ ] Errors thrown are typed, not raw fetch `Response` objects
- [ ] Pagination helper terminates correctly on the last page
- [ ] Package works with both `import` and `require`

---

## Common Mistakes

> **️ Warning:** Publishing an SDK once and never regenerating it when the API changes. Add "regenerate SDK types" as a step in your release checklist, not an afterthought — a stale SDK is worse than no SDK, because it fails silently at runtime instead of loudly at compile time.

> **️ Warning:** Building SDKs for three languages before you have users in any of them. Ship TypeScript first, add Python only when someone actually asks — spec-driven generation makes this cheap to defer.

> **️ Warning:** Letting the generated client leak directly to users without a wrapper. Raw generated clients expose implementation details (query param shapes, raw error objects) that you'll want to change later — the wrapper is your API's actual public contract.

---

## What's Next

Next in Phase 5: **Example Requests** — turning this SDK (and your raw HTTP API) into copy-pasteable, runnable examples for your documentation.
