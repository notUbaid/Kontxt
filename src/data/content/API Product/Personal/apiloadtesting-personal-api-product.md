---
title: Load Testing
slug: load-testing
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# Load Testing

Every module so far has been about correctness under normal conditions. Load testing answers a different question: **what happens when many requests arrive at once, and where does it actually break?** For a solo-built API, this is the difference between finding your breaking point on your own terms versus finding it during a traffic spike you didn't see coming.

This doesn't need to be elaborate. A focused test against your highest-risk endpoints tells you almost everything you need to know.

---

## What to Load Test

Don't try to load test everything equally. Prioritize by what would hurt most if it broke under load:

| Endpoint/system | Why it matters under load |
|---|---|
| Authentication/API key verification | Runs on every request — if it's slow, everything is slow |
| Rate limiter itself | Needs to correctly reject excess traffic without becoming the bottleneck |
| Your most-called core endpoint | Represents realistic sustained traffic |
| Background job throughput | Confirms workers keep up with queue growth under burst load |

> **Decision card**
> Load test your authentication middleware and one or two core endpoints first. These are shared by nearly every request — if they degrade under load, everything downstream degrades with them, regardless of how well any individual feature endpoint performs.

---

## Tooling

| Tool | Fits when |
|---|---|
| **k6** | Scriptable scenarios (ramping load, realistic user flows), best free option |
| **autocannon** | Fast, zero-config, good for a quick single-endpoint check |

> **Decision card — Recommended for Personal mode**
> Use **k6** for anything beyond a single quick check. It's free, scriptable in JavaScript, and produces the percentile breakdowns (p95, p99) that actually matter — an average response time hides the slow outliers that real users experience.

---

## Implementation: A Basic k6 Script

```javascript
// load-tests/orders-read.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },  // ramp to 20 concurrent users
    { duration: "1m", target: 20 },   // hold at 20 for a minute
    { duration: "30s", target: 0 },   // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests under 500ms
    http_req_failed: ["rate<0.01"],   // less than 1% error rate
  },
};

export default function () {
  const res = http.get("https://staging.yourapi.com/orders", {
    headers: { Authorization: `Bearer ${__ENV.TEST_API_KEY}` },
  });
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
```

```bash
k6 run -e TEST_API_KEY=sk_test_... load-tests/orders-read.js
```

> **Warning — never load test production without a plan**
> Running this against your live production API can trigger real rate limits, real background jobs, real third-party API calls (and real charges if any are billed per-call), and can genuinely degrade service for real users mid-test. Test against a staging environment, or run production tests at low intensity during a planned, announced window — not casually.

---

## Testing the Rate Limiter Specifically

You want to confirm two things: legitimate traffic under the limit succeeds smoothly, and traffic over the limit gets rejected correctly rather than slipping through or crashing the server.

```javascript
// load-tests/rate-limit-check.js
import http from "k6/http";
import { check } from "k6";

export const options = { vus: 50, duration: "10s" }; // deliberately exceed your configured limit

export default function () {
  const res = http.get("https://staging.yourapi.com/orders", {
    headers: { Authorization: `Bearer ${__ENV.TEST_API_KEY}` },
  });
  check(res, {
    "either succeeds or correctly rate limited": (r) => r.status === 200 || r.status === 429,
    "rate limited responses include Retry-After": (r) =>
      r.status !== 429 || r.headers["Retry-After"] !== undefined,
  });
}
```

> **Tip — this test should intentionally exceed your limits**
> The point isn't to see everything succeed — it's to confirm the rejections happen cleanly (`429` with proper headers) rather than the server slowing to a crawl, crashing, or letting excess traffic through unbounced once the limiter itself gets overwhelmed.

---

## Testing Background Job Throughput

Queue depth growing faster than your workers can drain it is invisible until someone notices delayed emails or stale webhook deliveries. Simulate a burst and watch queue depth over time.

```javascript
// load-tests/enqueue-burst.js
import http from "k6/http";

export const options = { vus: 30, iterations: 300 };

export default function () {
  http.post(
    "https://staging.yourapi.com/orders",
    JSON.stringify({ items: [{ sku: "TEST", quantity: 1 }] }),
    { headers: { Authorization: `Bearer ${__ENV.TEST_API_KEY}`, "Content-Type": "application/json" } }
  );
}
```

While this runs, watch your queue's dashboard (BullMQ has a UI — Bull Board) or query pending job count directly:

```typescript
const waiting = await jobQueue.getWaitingCount();
console.log(`Queue depth: ${waiting}`);
```

If queue depth climbs and doesn't come back down after the burst ends, your worker concurrency (set in the Queues module) needs to increase, or the job itself needs optimizing.

---

## Interpreting Results

| Signal | What it tells you |
|---|---|
| p95/p99 latency rising sharply before p50 does | A subset of requests are hitting a bottleneck (lock contention, connection pool exhaustion) that average latency hides |
| Error rate climbing with load | You've found your actual capacity ceiling |
| Latency flat, then a cliff | Likely a hard resource limit (connection pool size, memory) — not a gradual degradation |
| Queue depth not returning to baseline after burst | Worker throughput is lower than sustained enqueue rate |

> **Warning — don't just look at the average**
> Average latency can look perfectly healthy while 5% of your users experience multi-second delays. Always check p95/p99, not just the mean — that's where real user-facing pain lives, and it's exactly what the k6 threshold config above is designed to catch.

---

## AI Prompt: Generate a Load Test Scenario

```
Write a k6 load test script for this endpoint:

[paste route handler and describe expected realistic traffic —
e.g., "typically 10-20 requests/second, occasional bursts to 100"]

Requirements:
- Ramping load: warm up, hold at realistic peak, ramp down
- Thresholds: p95 latency under [X]ms, error rate under 1%
- Include Authorization header using an environment variable for the
  test API key (never hardcode a real key)
- Add a second scenario that deliberately exceeds my configured rate
  limit of [X requests/minute] and asserts responses are either 200
  or 429 with proper Retry-After headers — never anything else
```

---

## Validating AI Output

- **Confirm the script uses an environment variable for the API key**, not a hardcoded one that could get committed to the repo.
- **Confirm thresholds match your actual SLO expectations**, not arbitrary generated numbers — adjust the p95 target based on what you determined in the Performance Optimization module, not whatever the AI defaulted to.
- **Confirm the rate-limit test asserts on both success and 429 cases**, not just checking for a 200 — a script that only checks "did it succeed" won't catch a rate limiter that's silently not enforcing limits at all.

---

## Common Mistakes

- Load testing production without warning, during business hours, against a real payment provider's test-mode-lacking endpoint.
- Only checking average latency, missing p95/p99 degradation.
- Never actually running the test again after the first pass — load testing is most valuable as a repeated check before major releases, not a one-time box to check.
- Testing with unrealistic traffic patterns (e.g., all requests hitting the cheapest endpoint) that don't reflect real usage.

---

## Validation Checklist

- [ ] Load tests run against staging, not production, by default
- [ ] Authentication/rate-limiter middleware is included in the tested path, not bypassed
- [ ] Thresholds check p95/p99 latency, not just average
- [ ] A dedicated test confirms the rate limiter correctly rejects excess traffic with proper headers
- [ ] Background job/queue throughput has been checked under a simulated burst
- [ ] Test API keys are used, never real production credentials, and never hardcoded in the script

---

## What's Next

With performance validated under load, the next module — **CI/CD** — automates running your tests (including these load tests, optionally) on every change, so regressions are caught before they reach production.
