---
title: Model Upgrades
slug: model-upgrades
phase: Phase 5
mode: personal
projectType: ai-tool
estimatedTime: 25–35 min
---

# Model Upgrades

AI models improve faster than any other dependency you'll manage. A model that was the best choice at launch may be slower, more expensive, or lower quality than a newer alternative six months later.

Model upgrades are not routine dependency bumps. They change the behaviour of your product. Done carelessly, they introduce regressions you won't catch until users complain. Done well, they're the highest-ROI improvement you can make to an AI tool with zero new code.

---

## When to Evaluate an Upgrade

Don't upgrade on a schedule. Upgrade when a trigger condition is met.

| Trigger | Signal |
|---|---|
| New model released by your provider | Check release notes for capability improvements |
| Thumbs-down rate exceeds threshold | Current model may be under-performing |
| Latency consistently above target | A faster model may exist at similar quality |
| Cost per session growing unsustainably | A cheaper model may meet your quality bar |
| A specific capability gap identified | New model may close it |
| Prompt analytics shows consistent failure mode | New model may handle it better |

> [!WARNING]
> Never upgrade a model because it scored higher on a benchmark. Benchmarks measure general capability, not performance on your specific prompts and user inputs. Always evaluate on your own data.

---

## The Upgrade Decision Framework

Before touching any code, answer these four questions:

```
1. What problem am I trying to solve?
   [ ] Quality (responses are wrong, off-tone, unhelpful)
   [ ] Speed (latency is too high)
   [ ] Cost (spending too much per session)
   [ ] Capability (current model can't do X)

2. What evidence do I have?
   [ ] Prompt analytics data (thumbs down rate, regeneration rate)
   [ ] User feedback (specific complaints)
   [ ] Benchmark data from provider
   [ ] My own manual testing

3. What is the success criterion for the upgrade?
   [Define a specific measurable outcome before upgrading]
   e.g. "Thumbs-down rate drops below 10%" or "p95 latency under 4s"

4. What is my rollback plan if quality regresses?
   [ ] Keep previous model string in an env variable
   [ ] Can switch back in < 5 minutes without a redeploy
```

---

## Model Tiers — Know Your Options

Most providers offer a performance/cost spectrum. Understand the trade-offs.

```
Anthropic (as of knowledge cutoff):

claude-opus-4-8       → Highest capability, highest cost, slower
claude-sonnet-4-6     → Balanced — strong default for most use cases
claude-haiku-4-5      → Fastest, cheapest, lower capability ceiling

Upgrade path: haiku → sonnet → opus
Downgrade path: opus → sonnet → haiku
```

**When to use each tier:**

| Tier | Use For |
|---|---|
| Haiku | Simple classification, short responses, high-volume low-stakes tasks |
| Sonnet | Most production use cases — good quality/cost balance |
| Opus | Complex reasoning, long-form generation, when quality is paramount |

> [!TIP]
> You don't have to use one model for everything. Route simple tasks to Haiku and complex tasks to Sonnet. This is called model routing and can cut costs 40–60% with no quality regression on simple queries.

---

## How to Evaluate a New Model

### Step 1 — Build a Test Set

Pull 50–100 real interactions from your logs. Select for diversity:
- Common queries (most frequent input patterns)
- Known failures (interactions with thumbs-down)
- Edge cases (unusual or complex inputs)
- Boundary conditions (very short inputs, very long inputs)

```typescript
// scripts/export-test-set.ts
import { db } from '../src/lib/db'

async function exportTestSet() {
  const [common, failures, recent] = await Promise.all([
    // Most common prompt patterns
    db.aIInteraction.findMany({
      where: { thumbsDown: null },
      orderBy: { timestamp: 'desc' },
      take: 30,
    }),
    // Known failures
    db.aIInteraction.findMany({
      where: { OR: [{ thumbsDown: true }, { userAction: 'regenerated' }] },
      take: 20,
    }),
    // Recent interactions
    db.aIInteraction.findMany({
      orderBy: { timestamp: 'desc' },
      take: 20,
    }),
  ])

  const testSet = [...new Map(
    [...common, ...failures, ...recent].map(i => [i.id, i])
  ).values()]

  console.log(JSON.stringify(testSet, null, 2))
}
```

---

### Step 2 — Run Side-by-Side Comparison

Send each test case to both your current model and the candidate model. Log both responses.

```typescript
// scripts/model-comparison.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

async function compareModels(
  testCases: Array<{ input: string; conversationHistory: any[] }>,
  currentModel: string,
  candidateModel: string
) {
  const results = []

  for (const testCase of testCases) {
    const [current, candidate] = await Promise.all([
      client.messages.create({
        model: currentModel,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [...testCase.conversationHistory,
          { role: 'user', content: testCase.input }],
      }),
      client.messages.create({
        model: candidateModel,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [...testCase.conversationHistory,
          { role: 'user', content: testCase.input }],
      }),
    ])

    results.push({
      input: testCase.input,
      currentResponse: current.content[0].text,
      currentTokens: current.usage.input_tokens + current.usage.output_tokens,
      currentLatencyMs: 0, // measure separately with timing wrapper
      candidateResponse: candidate.content[0].text,
      candidateTokens: candidate.usage.input_tokens + candidate.usage.output_tokens,
    })
  }

  return results
}
```

---

### Step 3 — Score the Results

Review the comparison results and score each response pair. Be systematic.

```
Scoring rubric (per test case):

                Current    Candidate
Correctness:    [ 1-5 ]    [ 1-5 ]
Tone/style:     [ 1-5 ]    [ 1-5 ]
Conciseness:    [ 1-5 ]    [ 1-5 ]
Format:         [ 1-5 ]    [ 1-5 ]

Overall winner: [ current / candidate / tie ]
Notes: [anything notable — hallucination, refusal, unexpected behaviour]
```

After scoring all test cases, aggregate:

```
Candidate wins:  X / N cases (Y%)
Current wins:    X / N cases (Y%)
Ties:            X / N cases (Y%)

Average token count: current X, candidate Y (Δ Z%)
Cost implication: current $X per 1000 requests, candidate $Y
Latency: current p50 Xms, candidate p50 Yms
```

If candidate wins > 60% of cases and cost/latency are acceptable: upgrade.
If candidate wins < 40% of cases: don't upgrade yet.
If 40–60%: look at which cases the candidate wins. Is it winning on the interactions that matter most?

---

### Step 4 — Test Your System Prompt Compatibility

New models may interpret your system prompt differently. Always re-test:

```
Prompt compatibility checklist for new model:

[ ] Tone and persona are preserved
[ ] Output format instructions are followed (JSON, markdown, length)
[ ] Edge case instructions are respected (what to refuse, how to handle ambiguity)
[ ] The model doesn't over-refuse or under-refuse
[ ] Structured output format is maintained (if applicable)
[ ] Known failure cases from old model are improved (or at least not worse)
```

Sometimes upgrading a model requires updating your system prompt. That's acceptable — but document it. A model upgrade that also requires a prompt change is two changes in one deployment. Consider staging them separately.

---

## Model Routing

Instead of one model for everything, route different request types to different models.

```typescript
// lib/model-router.ts

type RequestComplexity = 'simple' | 'standard' | 'complex'

function classifyRequest(messages: Message[]): RequestComplexity {
  const lastMessage = messages.at(-1)?.content ?? ''
  const wordCount = lastMessage.split(' ').length

  // Simple heuristics — improve over time with your data
  if (wordCount < 15 && messages.length === 1) return 'simple'
  if (messages.length > 6 || wordCount > 100) return 'complex'
  return 'standard'
}

export function selectModel(messages: Message[]): string {
  const complexity = classifyRequest(messages)

  const modelMap: Record<RequestComplexity, string> = {
    simple:   'claude-haiku-4-5-20251001',
    standard: 'claude-sonnet-4-6',
    complex:  'claude-sonnet-4-6',  // upgrade to opus if quality warrants
  }

  return modelMap[complexity]
}
```

```typescript
// In your API route
const model = selectModel(messages)
const response = await anthropic.messages.create({ model, ... })

// Log the model used — essential for analytics
logAIInteraction({ model, ... })
```

> [!WARNING]
> Model routing adds complexity. Only implement it if you have clear evidence that a single model is either too slow for simple queries or insufficient for complex ones. Premature routing optimises for cost but adds a classification layer that can mis-route and produce worse results.

---

## Safe Deployment Pattern

Never upgrade models with a big-bang deployment. Use a gradual rollout.

```typescript
// lib/model-config.ts

// Control via environment variables — no code change needed to adjust
const CANDIDATE_MODEL_ROLLOUT_PCT = 
  parseInt(process.env.CANDIDATE_MODEL_ROLLOUT_PCT ?? '0')

const CURRENT_MODEL = process.env.CURRENT_MODEL ?? 'claude-sonnet-4-6'
const CANDIDATE_MODEL = process.env.CANDIDATE_MODEL ?? 'claude-sonnet-4-6'

export function getModel(userId?: string): string {
  if (CANDIDATE_MODEL_ROLLOUT_PCT === 0) return CURRENT_MODEL
  if (CANDIDATE_MODEL_ROLLOUT_PCT === 100) return CANDIDATE_MODEL

  // Deterministic by userId — same user always gets same model
  // Avoids inconsistent experience within a session
  if (userId) {
    const hash = userId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    return (hash % 100) < CANDIDATE_MODEL_ROLLOUT_PCT
      ? CANDIDATE_MODEL
      : CURRENT_MODEL
  }

  return Math.random() * 100 < CANDIDATE_MODEL_ROLLOUT_PCT
    ? CANDIDATE_MODEL
    : CURRENT_MODEL
}
```

**Rollout stages:**

```
Stage 1: CANDIDATE_MODEL_ROLLOUT_PCT=5   → Monitor for 48h
Stage 2: CANDIDATE_MODEL_ROLLOUT_PCT=25  → Monitor for 48h
Stage 3: CANDIDATE_MODEL_ROLLOUT_PCT=50  → Monitor for 48h
Stage 4: CANDIDATE_MODEL_ROLLOUT_PCT=100 → Full rollout
```

At each stage, compare thumbs-down rate, regeneration rate, and latency between the two model groups using your prompt analytics data.

---

## Rollback

If a rollout goes wrong, rollback must be fast.

```bash
# Rollback in under 60 seconds — no redeploy needed
vercel env set CANDIDATE_MODEL_ROLLOUT_PCT 0 --environment=production
vercel env set CURRENT_MODEL claude-sonnet-4-6 --environment=production
```

Store your current production model string in an environment variable, never hardcoded. This is the difference between a 60-second rollback and a 10-minute redeploy.

---

## Model Upgrade Checklist

**Before upgrading**
- [ ] Clear problem statement — what is the upgrade solving?
- [ ] Test set of 50+ real interactions exported from logs
- [ ] Success criterion defined before evaluation begins

**During evaluation**
- [ ] Side-by-side comparison run on full test set
- [ ] Each response pair scored on correctness, tone, format
- [ ] Token count and cost implications calculated
- [ ] System prompt compatibility verified on new model
- [ ] Known failure cases re-tested

**Deployment**
- [ ] Model string in environment variable (not hardcoded)
- [ ] Gradual rollout configured (start at 5%)
- [ ] Prompt analytics monitoring active during rollout
- [ ] Rollback procedure tested and documented

**Post-upgrade**
- [ ] Thumbs-down rate compared: before vs after
- [ ] Regeneration rate compared: before vs after
- [ ] Cost per session compared: before vs after
- [ ] Prompt version bumped to document the model change
- [ ] Rollout percentage increased based on stable metrics

---

## Phase 5 Complete

With analytics and model upgrade processes in place, your AI tool has a feedback loop.

You can now:
- Measure whether your AI is working
- Identify where it's failing
- Test improvements before shipping them
- Upgrade models confidently with data, not guesswork

The tools that last are the ones that get systematically better. You've built the infrastructure to do that.
