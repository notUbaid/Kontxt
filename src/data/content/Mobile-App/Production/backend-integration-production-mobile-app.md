---
title: Backend Integration
slug: backend-integration
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# Backend Integration

You designed your API strategy in Phase 2 and your server-state layer in the previous module. This module is the connective layer between them: a single, well-structured API client that every screen calls through — instead of `fetch()` calls scattered across components with inconsistent error handling, auth headers, and retry logic.

---

## Why a Centralized API Client, Not Scattered Fetch Calls

> ⚠️ Scattered `fetch()`/`axios` calls inside components is the most common production liability in apps built quickly with AI assistance. Each call site tends to handle auth headers, errors, and retries slightly differently — because each was generated independently, in a separate conversation, with no shared contract. The fix isn't discipline going forward; it's removing the possibility by routing everything through one client.

```
screens/components
        ↓
React Query hooks (from State Management Impl)
        ↓
API client (this module)
        ↓
your backend
```

Every network call passes through the same client. That's the entire point — one place to add an auth header, one place to handle a 401, one place to log failures.

---

## Decision 1 — API Client Structure

```typescript
// api/client.ts
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await handleTokenRefresh();
    }
    return Promise.reject(normalizeApiError(error));
  }
);
```

Then, per feature, a thin typed wrapper — not raw `apiClient.get()` calls inline in components:

```typescript
// features/products/api.ts
export const productsApi = {
  getProduct: (id: string) => apiClient.get<Product>(`/products/${id}`).then(r => r.data),
  listProducts: (params: ProductFilters) => apiClient.get<Product[]>('/products', { params }).then(r => r.data),
};
```

This is what your React Query hooks call into — `queryFn: () => productsApi.getProduct(id)` — keeping the network layer and the caching layer cleanly separated.

---

## Decision 2 — Error Normalization

Your backend, your auth provider, and the raw network layer (timeout, no connection) all produce errors in different shapes. Normalize them once, at the client boundary, so every screen handles one consistent error type instead of three.

```typescript
interface ApiError {
  type: 'network' | 'unauthorized' | 'validation' | 'server' | 'unknown';
  message: string;
  fieldErrors?: Record<string, string>;
}
```

> 💡 This is what makes your error states (Phase 1) implementable consistently — a single `ApiError.type` is what your `AsyncBoundary` component (Frontend module) can switch on to show the right UI: a retry button for `network`, a redirect-to-login for `unauthorized`, inline field errors for `validation`.

---

## Decision 3 — Auth Token Handling

This connects directly to your Authentication module from Phase 2 — implementation specifics belong there, but the integration point lives here:

- **Token attachment happens in the request interceptor**, once, automatically — no screen or hook should manually attach an auth header.
- **Token refresh on 401 happens in the response interceptor**, transparently — the original failed request should be retried automatically after a successful refresh, so calling code doesn't need to handle "might need to retry" logic itself.
- **Concurrent request handling during refresh:** if five requests fail with 401 simultaneously (common after a token expires while several queries are in flight), don't trigger five separate refresh attempts — queue the refresh as a single in-flight promise that all five await.

> ⚠️ Missing the concurrent-refresh case is a subtle but common production bug: multiple simultaneous refresh calls can race, sometimes invalidating a token that a different request just received, causing a logout loop under normal multi-query usage (e.g. a screen that fires three queries on mount, all hitting 401 at once).

---

## Decision 4 — Retry Strategy

Decide retry behavior deliberately, not by leaving library defaults unexamined:

| Failure Type | Retry? |
|---|---|
| Network timeout/no connection | Yes — with backoff, since connectivity often recovers within seconds on mobile |
| 5xx server error | Yes — limited attempts, with backoff |
| 4xx client error (bad request, validation) | No — retrying an invalid request just repeats the failure |
| 401 unauthorized | No direct retry — goes through the token refresh flow above instead |

> 💡 React Query's default retry behavior is reasonable for queries but **should generally be disabled or tightly limited for mutations** — silently retrying a "create order" call after an ambiguous failure risks creating a duplicate order if the original request actually succeeded server-side but the response was lost. Pair any retryable mutation with idempotency keys on the backend if duplicate submission risk is real for that action.

---

## Decision 5 — Request Cancellation

Screens unmount while requests are in flight (user navigates away mid-fetch). Decide this isn't ignored:

- React Query handles this automatically for queries tied to a mounted component — confirm your setup isn't bypassing it with manual fetch calls outside the query system.
- For anything outside that system (e.g. a long-running upload), wire actual cancellation (`AbortController`) tied to the component lifecycle or an explicit user-initiated cancel action — don't let an upload silently continue consuming bandwidth for a screen the user already left.

---

## Offline Awareness at the Integration Layer

Your Offline Strategy was decided in Phase 2 (and gets implemented in *Offline Features*, later in this phase) — but the API client needs to surface connectivity state now, since every other piece depends on knowing whether a request is even worth attempting:

```typescript
const { isConnected } = useNetworkStatus();
```

Expose this from the integration layer so React Query's `networkMode` config and your UI's error states can react to it consistently, rather than each screen independently trying to detect connectivity.

---

## AI Prompts

### Prompt 1 — API Client Scaffold

```
Build the API integration layer for a production [React Native] app.

Backend: [your backend framework/API style — REST/GraphQL]
Auth: [your auth provider/token strategy from Phase 2]

Generate: a centralized API client with request/response interceptors for
auth header attachment and token refresh-on-401 (including safe handling of
concurrent 401s from multiple in-flight requests), a normalized ApiError
shape, and a feature-scoped typed wrapper pattern (e.g. productsApi) that
React Query hooks call into.
```

### Prompt 2 — Integration Layer Review

```
Review this API client/integration code:

[paste your client + interceptor code]

Check for: scattered raw fetch/axios calls outside the centralized client,
unsafe concurrent token refresh handling, retry logic applied to mutations
without idempotency protection, and whether errors are normalized into a
single consistent shape before reaching UI code.
```

---

## Validating AI Output

- [ ] All network calls route through one centralized client — no raw `fetch`/`axios` calls inside components
- [ ] Auth headers are attached automatically via interceptor, never manually per call site
- [ ] Concurrent 401s during token expiry trigger one shared refresh, not parallel refresh attempts
- [ ] Errors are normalized into a single consistent shape before reaching UI/error-state code
- [ ] Mutations don't retry blindly without considering duplicate-submission risk
- [ ] Connectivity state is exposed centrally, not independently detected per screen

---

## What's Next

- **APIs** (next in this phase) covers the per-endpoint implementation details and request/response contracts this client calls into.
- **Database Setup** and **Auth Implementation** fill in the backend and token logic this integration layer assumes exists.
- **Error Handling** (later in this phase) builds the UI-facing consumption of the normalized `ApiError` shape defined here.
