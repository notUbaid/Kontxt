---
title: Search
slug: search
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 25–40 min
---

# Search

Search is a trust signal. When a user can't find something in three seconds, they question whether your product is worth using. When they find it instantly, they feel in control.

Most SaaS applications need at least two types of search. Knowing which type you actually need — and choosing the simplest implementation that meets that need — is the engineering decision here.

---

## The Three Search Tiers

| Tier | What it does | When to use it | Stack |
|---|---|---|---|
| **Database search** | Queries your existing DB with `LIKE` or `ILIKE` | ≤100k records, simple text matching | Postgres full-text search |
| **Dedicated search engine** | Indexed, ranked, typo-tolerant, faceted | ≥10k records, complex filtering, fast UX | Algolia, Typesense, Meilisearch |
| **Semantic / vector search** | Meaning-based retrieval over embeddings | AI features, knowledge bases, docs | pgvector, Pinecone, Weaviate |

**Start with Postgres.** Most early-stage SaaS products never need to leave it. Add a dedicated engine when Postgres queries exceed ~200ms on realistic data volumes or when you need faceted filtering and ranking.

---

## Decision: What Does Your SaaS Search?

Before writing a line of code, map your search surface.

> **Questions to answer:**
- What entities can users search? (e.g. contacts, documents, orders, projects)
- Does search cross ownership boundaries? (user A should never see user B's results)
- Do users expect typo tolerance?
- Do you need faceted filtering (filter by status, date range, tag)?
- Do you need search *within* documents or file content?
- Does search need to be real-time as a user types?

Your answers here determine whether Postgres is enough or whether you need Algolia/Typesense.

---

## Path A — Postgres Full-Text Search

The right choice for most SaaS products at launch. Zero new infrastructure, no sync complexity, transactionally consistent.

### Setting Up Full-Text Search

```sql
-- Add a search vector column (computed)
ALTER TABLE documents ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(body, '') || ' ' ||
      coalesce(tags::text, '')
    )
  ) STORED;

-- GIN index for fast lookups
CREATE INDEX idx_documents_search ON documents USING GIN(search_vector);
```

### Querying It

```sql
-- Ranked full-text search with tenant isolation
SELECT
  id,
  title,
  ts_rank(search_vector, query) AS rank,
  ts_headline('english', body, query, 'MaxFragments=2,MaxWords=20') AS excerpt
FROM documents, to_tsquery('english', 'contract & renewal') query
WHERE
  organization_id = $1           -- tenant isolation FIRST
  AND search_vector @@ query
ORDER BY rank DESC
LIMIT 20;
```

**Always filter by tenant before searching.** Never let a search query run without the organization/user scoping clause. A missed WHERE clause is a data leak.

### Postgres Search Limits

| What breaks | At what scale |
|---|---|
| Query latency | ~500k–1M rows without careful indexing |
| Typo tolerance | Never — "contarct" won't match "contract" |
| Relevance tuning | Very limited |
| Faceted counts | Expensive aggregation queries |
| Multilingual stemming | Requires manual configuration |

---

## Path B — Typesense (Recommended Dedicated Engine)

Typesense is open-source, self-hostable, and free. It's what you should reach for when Postgres isn't enough. Algolia has the same API shape but charges per search operation — acceptable for high-value SaaS, expensive at scale.

> **Why Typesense over Algolia for most SaaS:**
- Self-hosted = no per-search cost
- Full API compatibility with Algolia client SDKs
- Typo-tolerant by default
- Instant faceted filtering
- Sub-10ms queries on millions of records

### The Sync Problem

A dedicated search engine is a **read replica**. Your database is the source of truth. This means you have a sync problem.

```
PostgreSQL (source of truth)
       ↓
   [sync layer]
       ↓
Typesense (search index)
```

You must handle:
- **Create** → index new document
- **Update** → update indexed document
- **Delete** → remove from index
- **Bulk backfill** → on schema changes or initial setup

### Sync Strategies

**Option 1 — Event-driven (recommended)**

Emit an event after every write and consume it in a background worker.

```typescript
// After saving a document
await db.documents.create({ data: documentData });
await queue.add('index-document', { id: document.id, action: 'upsert' });

// Worker
async function indexDocument({ id, action }) {
  if (action === 'delete') {
    await typesense.collections('documents').documents(id).delete();
    return;
  }
  const doc = await db.documents.findUnique({ where: { id } });
  await typesense.collections('documents').documents().upsert(toSearchDoc(doc));
}
```

**Option 2 — Postgres triggers + CDC**

Use logical replication or a tool like Debezium to watch the WAL and sync changes. Adds infrastructure complexity. Worth it only at significant scale.

**Option 3 — Inline sync (avoid in production)**

Writing to Typesense synchronously in your API handler. If Typesense is unavailable, your write request fails. Don't do this.

### Defining Your Collection Schema

```typescript
const documentsSchema = {
  name: 'documents',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'organization_id', type: 'string', facet: true },
    { name: 'title', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'status', type: 'string', facet: true },
    { name: 'created_at', type: 'int64' },
    { name: 'owner_id', type: 'string', facet: true },
    { name: 'tags', type: 'string[]', facet: true },
  ],
  default_sorting_field: 'created_at',
};
```

### Enforcing Tenant Isolation in Typesense

```typescript
// Always inject the organization filter server-side
// Never trust client-provided organization_id in search params
const searchParameters = {
  q: userQuery,
  query_by: 'title,body',
  filter_by: `organization_id:=${req.user.organizationId}`, // ← from auth token, not request body
  sort_by: '_text_match:desc,created_at:desc',
  per_page: 20,
};

const results = await typesense
  .collections('documents')
  .documents()
  .search(searchParameters);
```

> **Security rule:** The `filter_by` tenant clause must be assembled server-side from the authenticated session. If a client can inject an arbitrary `filter_by`, they can read other tenants' data.

---

## Search API Design

Keep search as a dedicated endpoint. Don't bolt it onto your existing list/filter endpoints.

```
GET /api/search?q=contract+renewal&type=documents&status=active&page=1
```

```typescript
// Response shape
{
  "query": "contract renewal",
  "hits": [
    {
      "id": "doc_abc123",
      "title": "Contract Renewal Policy 2024",
      "excerpt": "...annual <mark>contract renewal</mark> process begins...",
      "type": "document",
      "url": "/documents/doc_abc123"
    }
  ],
  "total": 47,
  "page": 1,
  "per_page": 20,
  "facets": {
    "status": { "active": 34, "archived": 13 },
    "tags": { "legal": 21, "finance": 18 }
  },
  "took_ms": 8
}
```

**Include `took_ms`.** Log slow searches (>500ms). They're either index problems or query problems — and you won't know without measurement.

---

## Frontend Search UX

### Debounce, Don't Throttle

```typescript
// Debounce: wait until user stops typing
const debouncedSearch = useMemo(
  () => debounce(async (query: string) => {
    if (query.length < 2) { setResults([]); return; }
    const data = await searchAPI(query);
    setResults(data.hits);
  }, 200),
  []
);

// Don't fire a request on every keystroke
// 200ms debounce is the standard for search
```

### What Users Expect

| Behaviour | Why it matters |
|---|---|
| Results appear as they type | Feels instant, reduces friction |
| Highlighting matched terms | Confirms why this result appeared |
| "No results" with a suggestion | Prevents dead ends |
| Keyboard navigation (↑↓ Enter) | Power users live here |
| Recent searches | Reduces repeat effort |
| Loading state on first keystroke | Sets expectation, prevents double-clicks |

### Search Scope Toggle

If your app has multiple entity types (documents, contacts, projects), give users a scope toggle:

```
[ All ] [ Documents ] [ Contacts ] [ Projects ]
```

Either run parallel queries per type or use Typesense's multi-search API. Show results grouped by type when "All" is selected.

---

## AI Prompt — Search Architecture Review

Use this after you've sketched your initial search plan.

```prompt
You are a senior backend engineer reviewing a search implementation plan for a SaaS product.

Product context:
[Describe your product in 2–3 sentences]

Entities to be searched:
[List the database tables/entities users will search]

Approximate record counts (current and 12-month projection):
[Your estimates]

My planned search approach:
[Postgres full-text / Typesense / Algolia — and your sync strategy]

My search API design:
[Endpoint shape and response structure]

Please review this plan and:
1. Identify any security risks, especially around tenant data isolation
2. Flag any scaling concerns given the projected data volumes
3. Point out missing UX considerations
4. Suggest one thing I'm overcomplicating
5. Suggest one thing I may be underestimating

Be direct and specific. If the plan is appropriate, say so — don't pad the review.
```

---

## Implementation Checklist

### Before You Write Code

- [ ] Listed every entity type users need to search
- [ ] Estimated record counts at 6 months and 18 months
- [ ] Decided between Postgres FTS and a dedicated engine
- [ ] Confirmed tenant isolation strategy
- [ ] Designed search API endpoint and response shape

### Backend

- [ ] Tenant scoping enforced server-side (not from client)
- [ ] Search query sanitized (prevent injection)
- [ ] Pagination implemented with consistent page size
- [ ] Slow query logging in place (threshold: 500ms)
- [ ] Rate limiting on search endpoint
- [ ] Sync worker handles create, update, delete, backfill
- [ ] Sync failures logged and retried (dead letter queue)

### Frontend

- [ ] 200ms debounce on input
- [ ] Minimum query length enforced (≥ 2 chars)
- [ ] Loading state shown immediately on first keystroke
- [ ] Match highlighting in excerpts
- [ ] Empty state with suggestion or fallback
- [ ] Keyboard navigation (↑ ↓ Enter Escape)
- [ ] Search preserves state on browser back

### Security

- [ ] `organization_id` scoping injected from auth token only
- [ ] Search endpoint rate limited per user
- [ ] No raw user input passed directly to DB queries
- [ ] Search results contain no fields user shouldn't see

---

## Common Mistakes

> **️ Skipping tenant isolation**
> Building search before scoping by organization is how data leaks happen. Add the WHERE clause first, before any query logic.

> **️ Syncing inline**
> Writing to Typesense/Algolia inside your HTTP handler means a search engine outage breaks your writes. Always use a queue.

> **️ Indexing everything**
> Don't index fields users never search. Every indexed field increases index size and sync cost. Be deliberate about what goes into the search document.

> **️ Treating search as a feature**
> Search is infrastructure. Treat it like your database — monitor it, measure query times, test it with realistic data volumes before launch.

> **️ No backfill plan**
> When you add a new field to your search schema, you need to re-index all existing records. Build the backfill job before you need it.

---

## When to Add Semantic Search

Semantic search (vector/embedding-based) answers "what did I mean" instead of "what did I type." It is not a replacement for keyword search — it's a complement.

Add semantic search when:
- Users need to find content by concept, not by exact words
- You're building a knowledge base, internal docs, or support feature
- Users say "I know it exists but I can't find it"

**pgvector** (Postgres extension) is the right starting point. It keeps vectors in your existing database, avoids new infrastructure, and handles millions of vectors at acceptable query speeds.

Only move to a dedicated vector database (Pinecone, Weaviate, Qdrant) when pgvector query latency degrades under load or you need features like hybrid scoring out of the box.

---

## What's Next

Search is built. Before moving to the next module, confirm:

- Your sync layer is tested with create, update, and delete operations
- You've run a load test against realistic data volumes
- Tenant isolation is verified with a test that explicitly checks cross-tenant visibility
- Your search endpoint is behind rate limiting

Next up: **Analytics**
