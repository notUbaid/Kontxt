---
title: Retrieval Pipeline
slug: retrieval-pipeline
phase: Phase 2
mode: personal
projectType: ai-tool
estimatedTime: 30–45 min
---

# Retrieval Pipeline

Language models know a lot — but they don't know your data. They don't know your documents, your notes, your codebase, your knowledge base, or anything that wasn't in their training set.

Retrieval-Augmented Generation (RAG) is how you fix this. Instead of relying on the model's memory, you retrieve relevant information at query time and inject it into the context. The model reasons over your data, not its training data.

This module covers when you actually need RAG, and how to build a retrieval pipeline that works.

---

## Do You Actually Need RAG?

RAG adds real complexity. Don't build it unless your tool genuinely requires it.

```
You need RAG if:
  ├── Users ask questions about documents they upload
  ├── Your tool answers from a private knowledge base
  ├── The information your tool needs exceeds the context window
  ├── The information changes frequently (training data is stale)
  └── You need to cite sources for the answers you give

You don't need RAG if:
  ├── The context fits entirely in one API call (< 150k tokens)
  ├── You're using publicly available knowledge the model already has
  ├── Your tool generates content rather than answering from documents
  └── A well-crafted system prompt with static context is sufficient
```

**The simplest RAG is no RAG.** If the document fits in the context window, just send the whole document. Kontxt's 200k token window fits roughly 150,000 words — most documents, most knowledge bases at personal project scale.

Only build a retrieval pipeline when context-stuffing breaks down.

---

## The RAG Pipeline

```
User query
    ↓
[1. Embed the query]          → Convert query to a vector
    ↓
[2. Search the index]         → Find semantically similar chunks
    ↓
[3. Retrieve top-K chunks]    → Pull the most relevant passages
    ↓
[4. Build the prompt]         → Inject retrieved chunks + query
    ↓
[5. Generate]                 → Model answers using retrieved context
    ↓
Response (with citations)
```

Each step is a distinct engineering concern. Failures at any step degrade the final answer.

---

## Step 1: Chunking

Before you can retrieve anything, you need to split your documents into chunks — segments small enough to embed meaningfully, large enough to contain useful context.

```typescript
interface Chunk {
  id: string;
  documentId: string;
  content: string;
  metadata: {
    source: string;
    pageNumber?: number;
    sectionTitle?: string;
    chunkIndex: number;
  };
}

function chunkDocument(text: string, documentId: string, source: string): Chunk[] {
  const CHUNK_SIZE = 500;        // tokens (~375 words)
  const CHUNK_OVERLAP = 100;     // overlap between chunks to preserve context across boundaries

  const chunks: Chunk[] = [];
  const words = text.split(/\s+/);

  // Approximate tokens: 1 token ≈ 0.75 words
  const wordsPerChunk = Math.floor(CHUNK_SIZE * 0.75);
  const wordsOverlap = Math.floor(CHUNK_OVERLAP * 0.75);

  let i = 0;
  let chunkIndex = 0;

  while (i < words.length) {
    const chunkWords = words.slice(i, i + wordsPerChunk);
    chunks.push({
      id: `${documentId}-chunk-${chunkIndex}`,
      documentId,
      content: chunkWords.join(' '),
      metadata: { source, chunkIndex },
    });
    i += wordsPerChunk - wordsOverlap; // step forward with overlap
    chunkIndex++;
  }

  return chunks;
}
```

**Chunking strategy matters more than most tutorials suggest:**

| Strategy | When to use |
|---|---|
| **Fixed-size with overlap** | General documents, prose, articles |
| **Sentence-based** | When sentences are meaningful units |
| **Paragraph-based** | When paragraphs are self-contained |
| **Section-based** | Documentation, structured content with headers |
| **Semantic chunking** | High quality needed, willing to add complexity |

Overlap between chunks is important. Without it, a key sentence that falls at the boundary of two chunks may be missed in retrieval.

---

## Step 2: Embedding

Embeddings are numerical representations of text that capture semantic meaning. Similar texts have similar embedding vectors.

```typescript
// Using OpenAI's embedding model (best general-purpose option)
import OpenAI from 'openai';

const openai = new OpenAI();

async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',   // 1536 dimensions, $0.02/1M tokens
    input: text,
  });
  return response.data[0].embedding;
}

// Embed all chunks when indexing a document
async function indexDocument(chunks: Chunk[]): Promise<void> {
  const embeddings = await Promise.all(
    chunks.map(chunk => embedText(chunk.content))
  );

  // Store chunks + their embeddings
  await Promise.all(
    chunks.map((chunk, i) =>
      db.chunk.create({
        data: {
          id: chunk.id,
          documentId: chunk.documentId,
          content: chunk.content,
          metadata: chunk.metadata,
          embedding: embeddings[i], // stored as vector
        },
      })
    )
  );
}
```

**Embedding model options:**

| Model | Dimensions | Cost | Quality |
|---|---|---|---|
| `text-embedding-3-small` | 1536 | $0.02/1M tokens | Good — use this by default |
| `text-embedding-3-large` | 3072 | $0.13/1M tokens | Better — use for high-precision needs |
| `voyage-3-lite` (Anthropic) | 512 | $0.02/1M tokens | Good for Kontxt-based systems |
| `nomic-embed-text` | 768 | Free (Ollama) | Good for private/local setups |

**Use the same embedding model for indexing and querying.** Mixing models produces meaningless similarity scores.

---

## Step 3: Vector Storage

You need somewhere to store and query your vectors efficiently.

### For Personal Projects: pgvector

If you're already using Postgres, add the `pgvector` extension. No new infrastructure, no new service, no new bill.

```sql
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to chunks table
ALTER TABLE chunks ADD COLUMN embedding vector(1536);

-- Create an index for fast similarity search
CREATE INDEX idx_chunks_embedding ON chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);  -- tune based on row count
```

```typescript
// Query: find top-5 most similar chunks to the user's query
async function searchChunks(
  queryEmbedding: number[],
  documentId: string,
  topK: number = 5
): Promise<Chunk[]> {
  const results = await db.$queryRaw<Chunk[]>`
    SELECT id, content, metadata,
           1 - (embedding <=> ${queryEmbedding}::vector) AS similarity
    FROM chunks
    WHERE document_id = ${documentId}
    ORDER BY embedding <=> ${queryEmbedding}::vector
    LIMIT ${topK}
  `;
  return results;
}
```

### Dedicated Vector Databases (When You Outgrow pgvector)

| Database | Best for | Free tier |
|---|---|---|
| **Pinecone** | Managed, no infra, scales instantly | 2GB free |
| **Weaviate** | Open source, self-hostable, rich filtering | Self-host is free |
| **Qdrant** | Fast, open source, good Rust performance | Self-host is free |
| **Chroma** | Local development, simplest setup | Open source |

For a personal project, pgvector is almost always the right answer. Migrate to a dedicated vector database only when query latency degrades or you need features pgvector doesn't support (hybrid search, multi-tenancy at scale).

---

## Step 4: Building the Retrieval Prompt

Retrieved chunks are only useful if injected well. Poor injection leads to the model ignoring context or hallucinating despite having the right information in front of it.

```typescript
async function generateWithRAG(userQuery: string, documentId: string): Promise<string> {
  // 1. Embed the query
  const queryEmbedding = await embedText(userQuery);

  // 2. Retrieve relevant chunks
  const relevantChunks = await searchChunks(queryEmbedding, documentId, 5);

  if (relevantChunks.length === 0) {
    return "I couldn't find relevant information in your document to answer this question.";
  }

  // 3. Build the context block
  const context = relevantChunks
    .map((chunk, i) => `[Source ${i + 1}]\n${chunk.content}`)
    .join('\n\n---\n\n');

  // 4. Build the prompt
  const systemPrompt = `
You are a document assistant. Answer questions using only the provided context.

Rules:
- Only use information from the provided context
- If the context doesn't contain the answer, say so clearly — do not guess
- Cite which source(s) you used (e.g. "According to Source 2...")
- Be concise and direct
  `.trim();

  const userMessage = `
Context from the document:

${context}

---

Question: ${userQuery}
  `.trim();

  // 5. Generate
  const response = await anthropic.messages.create({
    model: MODEL,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 1024,
  });

  return response.content[0].text;
}
```

**Key prompt rules for RAG:**
- Explicitly tell the model to use only provided context
- Tell it what to do when the answer isn't in the context ("say so — do not guess")
- Ask for source citations — it forces the model to stay grounded
- Delimit context clearly (`[Source 1]`, `---`) so the model knows where context ends and the question begins

---

## Improving Retrieval Quality

### Hybrid Search

Pure vector search misses exact keyword matches. Keyword search misses semantic similarity. Hybrid search combines both.

```sql
-- Hybrid: vector similarity + full-text search weighted together
SELECT
  id, content, metadata,
  (
    0.7 * (1 - (embedding <=> ${queryEmbedding}::vector)) +  -- semantic score
    0.3 * ts_rank(search_vector, to_tsquery('english', ${keywordQuery}))  -- keyword score
  ) AS combined_score
FROM chunks
WHERE document_id = ${documentId}
ORDER BY combined_score DESC
LIMIT 5;
```

Hybrid search meaningfully improves retrieval quality for technical content, proper nouns, and acronyms that semantic similarity handles poorly.

### Re-ranking

Retrieve more candidates than you need, then re-rank them with a cross-encoder model before injecting into the prompt.

```typescript
// Retrieve top-20, re-rank, keep top-5
const candidates = await searchChunks(queryEmbedding, documentId, 20);
const reranked = await rerankWithCrossEncoder(userQuery, candidates);
const topChunks = reranked.slice(0, 5);
```

Re-ranking is a quality boost for when retrieval precision matters most. It adds latency (a second model call) and is usually overkill for personal projects. Add it when users report irrelevant retrieved passages.

### Query Expansion

Short, ambiguous user queries often retrieve poorly. Expand the query before embedding.

```typescript
async function expandQuery(userQuery: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'kontxt-haiku-4-5',
    system: 'Rewrite the following question to be more detailed and self-contained, adding relevant synonyms and context that would help find the right information in a document. Return only the expanded query.',
    messages: [{ role: 'user', content: userQuery }],
    max_tokens: 100,
  });
  return response.content[0].text;
}

// Use expanded query for embedding, original query in the prompt
const expandedQuery = await expandQuery(userQuery);
const queryEmbedding = await embedText(expandedQuery);
const chunks = await searchChunks(queryEmbedding, documentId, 5);
```

---

## Evaluating Retrieval Quality

You can't improve what you don't measure. Before calling your pipeline "done," test it.

```
Retrieval evaluation:

For each test question:
  1. Run the retrieval
  2. Check: did the correct chunk appear in top-5?
  3. Check: did the model answer correctly based on what was retrieved?
  4. Check: did the model stay grounded (no hallucinations)?

Track:
  - Recall@5: % of questions where correct chunk is in top-5
  - Answer accuracy: % of questions answered correctly
  - Hallucination rate: % of answers containing invented information
```

Build a small test set of 15–20 question/answer pairs over your target documents. Run your pipeline against them. This is the only reliable way to know if your retrieval is working.

---

## AI Prompt — Retrieval Pipeline Design

```prompt
You are a senior AI engineer helping design a RAG pipeline for a personal AI tool.

My tool:
[Describe what your AI tool does and what documents/data it retrieves from]

Document characteristics:
  - Average document length: [X words / pages]
  - Document types: [PDFs / markdown / plain text / etc.]
  - Total corpus size: [X documents / X MB]
  - Update frequency: [static / updated daily / user uploads]

User query characteristics:
[Describe what kinds of questions users ask — short/long, specific/broad, keyword vs. semantic]

My current infrastructure:
[Postgres? Redis? Hosting platform?]

Please:
1. Tell me whether I actually need a vector database or if context-stuffing is sufficient
2. Recommend a chunk size and overlap strategy for my document type
3. Identify the weakest point in my retrieval pipeline given my use case
4. Tell me whether hybrid search is worth the complexity for my query patterns
5. Suggest 5 test question/answer pairs I should use to evaluate my pipeline

Be specific to my documents and query patterns.
```

---

## Implementation Checklist

### Chunking

- [ ] Chunk size chosen based on document type (300–600 tokens is typical)
- [ ] Overlap between chunks implemented (50–100 tokens)
- [ ] Metadata stored with each chunk (source, document ID, position)
- [ ] Chunking tested on representative documents

### Embedding and Storage

- [ ] Embedding model chosen and consistent (same model for index and query)
- [ ] Vector storage set up (pgvector or dedicated DB)
- [ ] Similarity index created (IVFFlat or HNSW for pgvector)
- [ ] Embedding pipeline tested end-to-end on a real document

### Retrieval

- [ ] Top-K value chosen (start with 5, tune based on context window budget)
- [ ] Chunks scoped to the correct document / user / tenant
- [ ] Retrieved chunks injected with clear delimiters in the prompt
- [ ] Prompt instructs model to stay grounded and cite sources
- [ ] "No relevant context found" case handled gracefully

### Quality

- [ ] Test set of 15+ questions built over representative documents
- [ ] Recall@5 measured and acceptable
- [ ] Hallucination checked across test set
- [ ] Retrieval latency measured (target: < 300ms for embedding + search)

---

## Common Mistakes

> ** Building RAG when context-stuffing works**
> If your document fits in the context window, send the whole thing. RAG adds chunking errors, retrieval misses, and embedding costs. Use the simplest approach that works.

> ** Chunks that are too small**
> 100-token chunks often lack enough context to be useful in isolation. A chunk that says "this clause applies unless the other party gives 30 days notice" without knowing what "this clause" refers to is useless. Aim for 400–600 tokens minimum.

> ** No overlap between chunks**
> A sentence that spans a chunk boundary gets split. Both halves lose meaning. Always overlap chunks by 10–20% of the chunk size.

> ** Different embedding models for indexing and querying**
> Cosine similarity between vectors from different models is meaningless. Pick one model and use it for everything. If you switch models, re-embed your entire corpus.

> ** Not telling the model what to do when context is insufficient**
> Without explicit instruction, the model will try to be helpful by drawing on its training data instead of admitting the answer isn't in the retrieved context. This is the primary source of RAG hallucinations. Instruct it explicitly to say "I don't know" when the context doesn't contain the answer.

---

## What's Next

Your retrieval pipeline is designed and tested against representative documents. Before moving on:

- Indexing at least one real document end-to-end
- 15 test questions achieving acceptable Recall@5
- "No relevant context" case shown gracefully in the UI
- Retrieval latency measured and within acceptable range

Next up: **Phase 3 — Development**  
Starting with: **Frontend**
