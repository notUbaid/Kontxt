---
title: OpenAPI Specification
slug: openapi-specification
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# OpenAPI Specification

The previous module's endpoint reference tables — request fields, response shapes, error codes — are exactly the information an OpenAPI spec encodes in a machine-readable format. Once you have one accurate spec, it can generate your documentation site's reference pages, a Postman collection, client SDKs, and validation — all from a single source of truth instead of four things you maintain separately and that inevitably drift apart.

---

## The Core Decision: Hand-Write vs Generate From Code

| Approach | Trade-off |
|---|---|
| **Hand-written YAML/JSON spec** | Full control, but a second source of truth that drifts from your actual route code the moment someone changes an endpoint and forgets the spec |
| **Generated from code** (Zod schemas, decorators) | Spec is derived from the same validation logic your API actually enforces — cannot drift, because it's not a separate artifact |

> **Decision card — Recommended for Personal mode**
> Generate the spec from your existing Zod validation schemas (from the Security module) using `zod-to-openapi`. You already write these schemas for every route; this makes them do double duty as the spec source instead of maintaining request/response shapes twice. A hand-written spec is only worth it if your API is stable enough that drift risk is low — for a project still under active development, generation removes an entire category of documentation bugs.

---

## Implementation: Generating From Zod

```typescript
// schemas/order.ts — extend the schema from the Security module
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createOrderSchema = z.object({
  items: z.array(z.object({
    sku: z.string().min(1).max(64).openapi({ example: "ABC123" }),
    quantity: z.number().int().positive().max(1000).openapi({ example: 2 }),
  })).min(1).max(100),
  notes: z.string().max(500).optional(),
}).openapi("CreateOrderRequest");

export const orderResponseSchema = z.object({
  id: z.string().openapi({ example: "ord_8f2a1c3d" }),
  status: z.enum(["pending", "fulfilled", "cancelled"]),
  items: z.array(z.object({ sku: z.string(), quantity: z.number() })),
}).openapi("Order");
```

```typescript
// openapi/registry.ts
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { createOrderSchema, orderResponseSchema } from "../schemas/order";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/orders",
  summary: "Create an order",
  security: [{ apiKeyAuth: [] }],
  request: { body: { content: { "application/json": { schema: createOrderSchema } } } },
  responses: {
    201: { description: "Order created", content: { "application/json": { schema: orderResponseSchema } } },
    400: { description: "Validation failed" },
    401: { description: "Missing or invalid API key" },
    403: { description: "Insufficient scope" },
  },
});

export const openApiDocument = new OpenApiGeneratorV3(registry.definitions).generateDocument({
  openapi: "3.0.0",
  info: { title: "Your API", version: "1.0.0" },
  servers: [{ url: "https://api.example.com/v1" }],
});
```

```typescript
// route: serve the generated spec
router.get("/openapi.json", (req, res) => res.json(openApiDocument));
```

> **Tip — this is the same schema, not a duplicate**
> Notice `createOrderSchema` is imported from the actual `schemas/order.ts` file your route handler validates against — not redefined for documentation purposes. If someone adds a field to the real validation schema, the spec updates automatically the next time it's generated. This is what "cannot drift" means in practice.

---

## Authentication in the Spec

Document your API key auth scheme once, referenced by every protected endpoint:

```typescript
registry.registerComponent("securitySchemes", "apiKeyAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "API Key",
  description: "Use your API key as a bearer token: `Authorization: Bearer sk_live_...`",
});
```

---

## Validating the Spec

An invalid OpenAPI document breaks every tool downstream of it (docs site, Postman import, SDK generation) — validate it before relying on it.

```bash
npx @redocly/cli lint openapi.json
```

> **Warning — validate in CI, not just locally**
> Add a spec validation step to the CI pipeline from the CI/CD module. A spec that passes locally but has a subtle issue (like an unresolved `$ref`) can still break your docs site build silently — catching it in CI means you find out from a failed check, not from your Mintlify build breaking in production.

---

## Versioning the Spec

```yaml
info:
  title: Your API
  version: 1.2.0   # matches your API's own version, not your spec tooling's version
```

> **Decision card**
> Version the spec alongside your API's actual version (from your SDK's semver in the SDK Development module), not independently. When a breaking change ships, the spec version bump should be the same commit as the code change — a spec that says `v1.2.0` describing an API that's actually running `v1.3.0` behavior is exactly the drift this whole approach exists to prevent.

---

## What the Spec Unlocks

Once `openapi.json` is accurate and being served, the next few modules build directly on it:

| Next module | How it uses the spec |
|---|---|
| **Postman Collection** | Postman imports OpenAPI directly — no separate collection to hand-maintain |
| **Interactive Playground** | Most playground tools (Scalar, Swagger UI) render directly from the spec |
| **SDKs** | Optional: generate additional-language SDKs from the spec later, beyond your hand-written TypeScript one |

This is the payoff for generating rather than hand-writing: everything downstream stays in sync automatically as long as the spec generation step runs against current code.

---

## AI Prompt: Generate OpenAPI Registration for a Route

```
Generate zod-to-openapi registration for this route:

[paste route handler, Zod request schema, and response shape]

Requirements:
- Use registry.registerPath with the actual HTTP method and path
- Reference the existing Zod schemas directly — do not redefine the
  shape inline
- Include all real response status codes this route can return
  (check the middleware chain: auth, scope checks, rate limiting,
  validation, not just the happy path)
- Add .openapi({ example: ... }) annotations with realistic example
  values to the request schema fields
- Reference the apiKeyAuth security scheme if this route requires
  authentication
```

---

## Validating AI Output

- **Confirm it imports the real schema rather than inlining a redefinition** — this is the single detail that determines whether you actually get drift protection or just a documentation exercise that looks similar but isn't connected to your real validation.
- **Confirm every real response code is included**, especially ones from middleware rather than the route body itself (401 from auth, 403 from scope checks, 429 from rate limiting) — these are easy to miss when only looking at the handler function.
- **Run the validator** (`@redocly/cli lint`) on any AI-generated spec addition before trusting it — a subtly malformed `$ref` or schema reference won't always be obvious from reading the code.

---

## Common Mistakes

- Redefining request/response shapes inline in the OpenAPI registration instead of importing the actual Zod schema — reintroduces exactly the drift risk this approach was meant to eliminate.
- Documenting only the happy-path response, missing errors that come from shared middleware.
- Never running spec validation, only discovering a broken spec when a downstream tool (docs site, Postman) fails to import it.
- Spec version numbers disconnected from actual API/SDK version numbers.

---

## Validation Checklist

- [ ] Spec is generated from the same Zod schemas your routes actually validate against, not duplicated by hand
- [ ] Every registered path includes all real response codes, including ones from middleware
- [ ] Authentication scheme is documented once and referenced, not repeated per endpoint
- [ ] Spec passes validation (`@redocly/cli lint` or equivalent) in CI, not just locally
- [ ] Spec version tracks your actual API version, updated in the same commit as breaking changes
- [ ] The generated `/openapi.json` endpoint is actually being served and reachable

---

## What's Next

With a validated spec in place, the next module — **Postman Collection** — imports it directly, giving developers a one-click way to explore and test your API without writing any code.
