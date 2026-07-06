---
title: Feature Roadmap
slug: feature-roadmap
phase: Phase 6
mode: production
projectType: saas
estimatedTime: 20-25 min
---

# Feature Roadmap

You now have analytics data, retention curves, user feedback themes, and growth mechanics in motion. A feature roadmap is where all of that converges into an actual decision: what gets built next, and — just as important — what deliberately doesn't.

The failure mode at this stage isn't a lack of ideas. It's the opposite — too many plausible ideas, no consistent way to compare them, and a roadmap that ends up reflecting whoever spoke most recently or most loudly.

---

## The Core Idea: A Roadmap Is a Prioritization Function, Not a Wishlist

Anyone can generate a list of features worth building. The actual skill is having a consistent, defensible way to rank them — one you'd apply the same way regardless of who's asking or how compellingly they argued for their pet feature.

> [!TIP]
> Write your prioritization criteria down *before* you list candidate features, not after. If you pick criteria after seeing the list, you'll unconsciously choose criteria that justify the feature you already wanted to build.

---

## Step 1: Pick a Prioritization Framework — Then Actually Use It Consistently

**Decision Card — Prioritization Frameworks**

| Framework | How It Works | Best For |
|---|---|---|
| RICE (Reach, Impact, Confidence, Effort) | Score each dimension, compute a single comparable number | Comparing many disparate feature ideas objectively |
| Impact vs. Effort matrix | Plot features on a 2x2 grid; prioritize high-impact, low-effort | Quick visual triage when you have limited time |
| Now/Next/Later | Bucket by time horizon rather than precise scoring | Communicating roadmap direction to a team or customers without over-promising exact timing |
| Jobs-to-be-Done alignment | Prioritize whatever most directly advances the core job your product does | Staying focused when feature requests are pulling you toward scope creep |

For a small team, RICE or a simple Impact/Effort matrix is usually enough rigor without becoming its own time-consuming process. The framework matters less than applying it consistently across every candidate feature — inconsistent application is what makes a roadmap feel arbitrary.

---

## Step 2: Feed the Framework With Real Signal, Not Vibes

Each input to your prioritization framework should trace back to actual evidence you've gathered in earlier modules, not gut feeling.

**Best Practice Card — Where Each Input Should Come From**

```
Reach:      How many users does this affect? → Pull from your
            analytics (Product Analytics module) — actual user
            counts hitting the relevant flow, not a guess.

Impact:     How much does this move a real metric (activation,
            retention, conversion)? → Tie to specific funnel data,
            or a clearly articulated hypothesis if you don't have
            data yet — but label it as a hypothesis, not a fact.

Confidence: How sure are you Impact is correctly estimated? → Lower
            this honestly when the request came from one vocal user
            rather than a recurring theme across many (User Feedback
            module).

Effort:     Real engineering estimate, not an optimistic guess made
            before looking at the actual code.
```

> [!WARNING]
> The most common scoring mistake is inflating Confidence because a feature *feels* obviously good. If your only evidence is "a customer asked for this once," your confidence should be genuinely low — not adjusted upward because you personally find the idea compelling.

---

## Step 3: Decide What Doesn't Make the Roadmap

A roadmap that says yes to everything isn't a roadmap — it's a backlog with no decisions in it. Explicitly maintaining a "not now" list, with the reasoning written down, does two things: it protects your team's focus, and it gives you a fast, respectful answer the next time someone asks about that feature.

> [!NOTE]
> "Not now, because X" is a complete, professional answer to a feature request. You don't owe every requester a yes, and a clearly reasoned no (with the door open to revisit later) builds more trust than vague non-committal stalling.

---

## Using AI to Build and Stress-Test the Roadmap

AI is useful for structuring scoring consistently across many candidate features, and for playing devil's advocate against your own assumptions — but it can't supply real Reach or Impact numbers it doesn't have access to, so feed it your actual data.

**Prompt: Score Candidate Features Consistently**

```
Score the following candidate features using RICE (Reach, Impact,
Confidence, Effort), each on a 1-10 scale, based on the data provided
for each. Where data is missing, mark Confidence low rather than
guessing a number.

Features and available data:
1. [Feature name] — [reach data, impact hypothesis, evidence source, effort estimate]
2. [Feature name] — [same structure]
3. [Feature name] — [same structure]

After scoring, rank them by total RICE score. Then separately flag
any feature where you think the Confidence score is doing too much
work to make the total look better than the underlying evidence
actually supports.
```

> ** Why this prompt works**
> Instructing the model to mark low confidence rather than guess prevents it from filling gaps with plausible-sounding numbers that look precise but aren't grounded in anything real. The final instruction — flagging where confidence is propping up a weak case — directly counters the inflation bias described in Step 2, using the model as a check on your own reasoning rather than just a scoring calculator.

**Token efficiency note:** Bring your actual analytics numbers and feedback theme summaries (from the Product Analytics and User Feedback modules) into this conversation rather than re-describing your product from scratch. Reusing the outputs you've already generated keeps this prompt grounded and saves you from re-explaining context the model doesn't need repeated.

---

## Validating the Roadmap Before Committing

- [ ] Every Impact score traces back to either real data or an explicitly labeled hypothesis — not an unstated assumption
- [ ] Confidence scores are lower wherever the evidence is genuinely thin (single user request, no funnel data)
- [ ] Effort estimates came from someone who'd actually have to build it, not an outside guess
- [ ] The "not now" list exists and is written down somewhere you can reference when asked, not just implicit
- [ ] The top-ranked features genuinely connect back to your retention or activation bottlenecks (see Retention module) — not just to whichever feature scored highest on a framework that might itself have weak inputs

> ** Best Practice**
> Revisit the roadmap on a fixed cadence (monthly or quarterly), not continuously. Constantly re-prioritizing based on the latest request or the latest data point produces thrash — give each roadmap version enough time to actually ship something before reassessing.

---

## Quick Reference: Roadmap Discipline

1. Fix your prioritization criteria before looking at the candidate list
2. Ground every score in real evidence, labeling hypotheses as hypotheses
3. Be honest about low confidence — don't let "feels right" inflate the score
4. Maintain an explicit "not now" list with reasoning attached
5. Re-prioritize on a fixed cadence, not every time a new request arrives

---

## What's Next

With a defensible, evidence-grounded roadmap in place, move to **Technical Debt** — the often-invisible cost that competes with every feature on this roadmap for the same engineering time, and needs its own honest accounting.
