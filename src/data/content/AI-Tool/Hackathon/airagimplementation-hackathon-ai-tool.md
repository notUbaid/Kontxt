---
title: RAG
slug: rag
phase: Phase 2
mode: hackathon
projectType: ai tool
estimatedTime: 20-25 min
---

# RAG

RAG (Retrieval-Augmented Generation) is the right answer to a specific problem: your model needs to ground its output in information it doesn't already know — your own documents, a specific knowledge base, current data, or anything beyond its training. This module exists separately because RAG is also one of the most commonly *over-built* pieces of an AI hackathon project, adding real complexity that often isn't needed for what the demo actually requires.

---

## The Core Idea: Confirm You Actually Need RAG Before Building It

Many hackathon teams reach for RAG because it sounds technically impressive, not because their actual demo requires retrieving from an external knowledge source. If your AI feature only needs to process the input the user directly gives it in that moment (a document they upload, a transcript they provide), you don't need RAG — you just need to pass that input directly into your prompt. RAG specifically matters when the relevant knowledge *isn't* in the user's immediate input and needs to be fetched from somewhere else.

> [!WARNING]
> Building a vector database, embedding pipeline, and retrieval layer for a hackathon project that could have just included the relevant document directly in the prompt is a significant, avoidable time sink. Check your actual context window limits first — many hackathon-scale use cases fit entirely within a single prompt's context without retrieval at all.

---

## Decision Card: Do You Actually Need RAG?

| Your Situation | Need RAG? | Alternative |
|---|---|---|
| User uploads one document, app processes just that document | No | Include the document directly in the prompt context |
| App needs to search across many documents/a large knowledge base | Yes | This is the core RAG use case |
| App needs current/real-time information beyond training cutoff | Maybe | Consider a model with built-in web search/tool use instead of building your own retrieval pipeline, if available and sufficient |
| App needs to answer questions grounded in a specific, large corpus (e.g., a company's full documentation) | Yes | This is exactly what RAG solves well |

If you land in the "No" row, skip this module's implementation and move directly to the next phase — you've saved yourself real hackathon hours.

---

## Step 1: If You Do Need RAG, Keep the Pipeline Minimal

A hackathon RAG implementation needs exactly three components, no more: a way to chunk and store your knowledge source, a way to retrieve relevant chunks for a given query, and a way to inject those chunks into your prompt. Resist adding anything beyond this minimal pipeline.

**Best Practice Card — Minimum Viable RAG Pipeline**

```
1. Chunking: Split your source documents into reasonably-sized
   pieces (a few hundred words each is a safe hackathon default —
   don't over-engineer chunk-size tuning)
2. Storage + retrieval: Use a managed vector store with a simple
   API (many current backend platforms, including some you may
   already be using for auth/database, offer this built in) —
   avoid standing up your own vector database infrastructure from
   scratch under time pressure
3. Injection: Take the top few most relevant chunks for the user's
   query, paste them directly into your prompt's context, then call
   the model as normal

Skip: re-ranking layers, hybrid search, fine-tuned embedding models,
multi-step retrieval chains — these are real techniques for serious
production RAG systems, not hackathon-scale necessities.
```

> [!TIP]
> Check whether your chosen backend platform (from the Tech Stack module) already offers vector search built in — many do. Using a feature you've already got access to is far faster than introducing an entirely new specialized service just for retrieval.

---

## Step 2: Test Retrieval Quality Separately From Generation Quality

A RAG pipeline has two places it can fail independently: retrieval might fetch irrelevant chunks, or generation might produce a bad answer even with good chunks. Test these separately so you know which layer to fix if something's wrong.

**Decision Card — Diagnosing RAG Failures**

| Symptom | Likely Cause | Where to Look |
|---|---|---|
| Output is confidently wrong, doesn't match your source documents | Retrieval problem — wrong/irrelevant chunks were fetched | Check what chunks were actually retrieved for that query, before blaming the prompt |
| Retrieved chunks look correct, but output is still poor | Generation problem — the prompt isn't using the chunks well | Revisit your prompt's instructions for how to use the provided context (Prompt Engineering module) |
| Output says "I don't have enough information" when the answer is clearly in your source | Retrieval problem — relevant chunk wasn't fetched | Check chunk size and retrieval count; may need to retrieve more chunks or rethink chunking |

> [!NOTE]
> Always check what was actually retrieved before assuming the model's reasoning is at fault. A model given the wrong context will produce a wrong-looking answer even with a perfect prompt — that's a retrieval bug wearing a generation bug's symptoms.

---

## Using AI to Build the Minimal Pipeline Fast

This is a well-documented, mechanical implementation task once you've confirmed you actually need it — a good fit for AI-assisted code generation, with the same provider-specifics caveat as Structured Outputs.

**Prompt: Minimal RAG Implementation**

```
Building a hackathon project using [your backend platform] with
[your chosen model]. I need a minimal RAG pipeline for: [describe
your knowledge source — e.g., "a set of uploaded PDF documents" or
"a fixed FAQ knowledge base"]

1. Show me the simplest chunking + storage approach using
   [platform]'s built-in vector search if available — check current
   docs rather than assuming syntax, since this varies by platform
   and version.
2. Show retrieval: given a user query, fetch the top few most
   relevant chunks.
3. Show how to inject those chunks into my existing prompt from
   [paste your current prompt].

Keep this minimal — no re-ranking, no hybrid search, no fine-tuning.
This needs to work reliably for a hackathon demo, not scale to a
production knowledge base.
```

> ** Why this prompt works**
> Explicitly excluding re-ranking, hybrid search, and fine-tuning prevents the model from generating a more sophisticated, production-grade RAG architecture than your hackathon timeline can support — without that constraint, you'd likely get a far more complex implementation than you need or have time to debug. Asking it to check current docs for platform-specific syntax addresses the same provider-drift risk noted in the Structured Outputs module.

**Token efficiency note:** Build and test the full minimal pipeline once, then debug retrieval and generation separately using the diagnosis table above — rather than re-generating the whole pipeline from scratch each time something looks wrong. Most RAG issues are fixable by adjusting one layer (chunk size, retrieval count, or prompt instructions), not by rebuilding the entire system.

---

## Validating the RAG Pipeline Before Moving On

- [ ] You confirmed RAG was actually necessary for this task, not used by default because it sounded impressive
- [ ] The pipeline is genuinely minimal — chunking, retrieval, injection, nothing more
- [ ] Retrieval quality has been checked directly (looking at what chunks were actually fetched), separate from generation quality
- [ ] Tested against your real test inputs from Target Users, with attention to whether the right source material is actually being retrieved for varied phrasings of similar questions

---

## What's Next

With Phase 2 complete, move to **Phase 3**, starting with **Backend** — implementing the actual server-side logic that ties your model calls, structured outputs, and (if applicable) retrieval pipeline into a working application.
