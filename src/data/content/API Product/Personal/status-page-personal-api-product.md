---
title: Status Page
slug: status-page
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 10–15 min

---

# Status Page

Without a status page, every outage generates the same message from every developer using your API: "is it down or is it me?" Answered individually, that's a support burden. Answered once, publicly, it's a status page. For a solo-built API, this single page also does quiet reputational work — a visible uptime history and a real incident log make a personal project look operationally serious, which matters when someone's deciding whether to build their product on top of yours.

---

## The Decision: Build vs Use a Hosted Tool

| | Build Your Own | Hosted Tool |
|---|---|---|
| Setup time | Hours to days | Minutes |
| Independent of your infra during an outage | Only if you deliberately host it elsewhere | Yes, by default |
| Incident posting UI | You build it | Included |
| Uptime history/charts | You build it | Included |
| Cost | "Free" but costs your time | Free tier covers a personal project |

> ** Best Practice:** Never build a custom status page as a solo developer. It's one of the lowest-ROI things you could spend time on — the entire feature set is a solved problem, and building it yourself means it's hosted on your own infrastructure, which is exactly what fails when you need it most.

---

## Tool Comparison

| Tool | Best For | Cost |
|---|---|---|
| Better Stack | Uptime monitoring + status page in one, clean UI | Generous free tier |
| Instatus | Simple, fast setup, good free tier | Free tier covers personal projects |
| OpenStatus | Open source, self-hostable if you want full control later | Free (self-hosted) |
| UptimeRobot | Monitoring-first, status page is a bonus feature | Free tier available |
| Statuspage (Atlassian) | Large teams, complex incident workflows | Paid, enterprise-focused — skip for now |

**Recommended for a personal-scale API product:** Better Stack or Instatus. Both give you uptime monitoring, a public status page, and incident posting in one free setup — no reason to assemble these from separate tools.

---

## Give It Something Real to Monitor

A status page is only as honest as what it's checking. Add a lightweight health endpoint that verifies your actual critical dependencies, not just "the server process is running":

```ts
// GET /health
app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.status(200).json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "degraded" });
  }
});
```

Point your monitoring tool at `/health`, not at `/` or a static page — checking that the process responds tells you almost nothing if the database behind it is unreachable.

> **️ Warning:** Keep the health check itself cheap. Don't run expensive queries or call third-party services inside it — a slow health check can trip false-positive downtime alerts under normal load.

---

## Incident Communication

When something breaks, speed of acknowledgment matters more than having the root cause figured out.

1. **Acknowledge fast** — post "Investigating elevated error rates on the API" within minutes, even with zero explanation yet. Silence during an outage is worse than an unresolved status.
2. **Update on a cadence** — every 15–30 minutes during an active incident, even if the update is just "still investigating."
3. **Close it out** — post resolution with a one-line cause once known. Full detail isn't required for a personal project; honesty about impact is.
4. **Post-mortem for significant incidents** — anything over ~30 minutes or that affected data integrity deserves a short write-up: what happened, impact, what changed to prevent recurrence.

> ** Tip:** Don't promise a formal uptime SLA at personal-project scale. Show real historical uptime instead — an honest 99.4% with visible incident history builds more trust than an unenforceable "99.99% guaranteed" claim on a project with no support contract behind it.

---

## AI Prompt

**Prompt: Draft an incident post-mortem**

```text
Here's what happened during an incident: [describe: what broke, when detected, when resolved, root cause if known].

Write a short public post-mortem with these sections:
- What happened (2-3 sentences, plain language)
- Impact (who/what was affected, and for how long)
- Root cause (one paragraph, no internal jargon or specific infra names)
- What's changing (1-3 concrete follow-up actions)

Keep it under 200 words. Do not include specific server names, internal tool names, or exact infrastructure details.
```

---

## Validation Checklist

- [ ] Status page is hosted on infrastructure independent of your API's own hosting
- [ ] Monitoring checks a real health endpoint, not just process uptime
- [ ] Health check is cheap enough to not cause false alarms under load
- [ ] Incident update cadence decided in advance (don't figure this out mid-incident)
- [ ] No formal SLA promised beyond what a personal project can realistically back

---

## Common Mistakes

> **️ Warning:** Hosting the status page on the same infrastructure as the API. When your API goes down, your status page needs to still be reachable — that's the entire point of it existing.

> **️ Warning:** Building a custom status page "because it's a fun feature to build." It isn't proportional to the value it adds at personal-project scale — use the hours on your actual product instead.

> **️ Warning:** Going silent during an incident because the cause isn't known yet. An unexplained "investigating" post is far better than no post at all.

---

## Security Note

Never include internal infrastructure details in incident updates — server names, cloud provider specifics, database vendor, or exact error messages from internal logs. Describe impact and resolution in terms developers care about (which endpoints, how long, is data affected), not implementation details that mainly help an attacker.

---

## Implementation Checklist

- [ ] Status page tool selected and connected to a real `/health` endpoint
- [ ] Status page hosted independently of primary API infrastructure
- [ ] Incident communication cadence documented for future-you
- [ ] Status page linked from the quick start guide and API documentation
- [ ] Historical uptime visible publicly, no unbacked SLA claims

---

## What's Next

Phase 5 is complete — your API now has documentation, an SDK, working examples, a quick start, a changelog, and a status page. Next is **Phase 6 — Launch & Growth**, starting with **Beta Program**.
