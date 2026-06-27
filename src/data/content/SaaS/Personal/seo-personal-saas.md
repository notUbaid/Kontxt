---
title: SEO
slug: seo
phase: Phase 5
mode: personal
projectType: saas
estimatedTime: 30–45 min
---

# SEO

SEO for a personal SaaS is not about ranking for "project management software." You will not beat Notion or Asana.

It is about owning the specific, narrow problem you solve — and being the first result when someone searches for exactly that.

Done right, SEO is the only growth channel that compounds without ongoing spend. Done wrong, it is weeks of work that produces nothing because you targeted the wrong keywords or built pages that Google never trusted.

This module teaches you how experienced growth engineers think about SEO — and what actually moves the needle at your stage.

---

## What Stage You're Actually At

Before touching anything, be honest about where you are.

| Stage | Reality | SEO Priority |
|---|---|---|
| Pre-launch, 0 users | No domain authority, no content | Set foundations only |
| Launched, <100 users | Low authority, limited content | Target long-tail, fix technicals |
| 100–500 users | Some authority building | Content strategy + link building |
| 500+ users | Real data, real signal | Scale what works |

At the personal SaaS stage, you almost certainly fall in the first two rows. The right move is **foundations + long-tail targeting**, not trying to rank for broad competitive terms.

---

## The Three Levers

Every SEO outcome is a function of three things.

```
Technical SEO          Content               Authority
──────────────         ──────────            ──────────
Can Google find        Do you have           Do other sites
and understand         pages that match      link to yours?
your pages?            real searches?

Fix this first.        Build this second.    Earn this third.
Can't skip.            Most of your effort.  Takes months.
```

Most beginners go straight to content. Without fixing technical SEO first, that content may never get indexed or ranked.

---

## Technical SEO: What You Must Fix First

These are binary — either done or not. Fix them before writing a single SEO-focused page.

### Crawlability

- [ ] Your site is publicly accessible (not behind a login wall for pages you want ranked)
- [ ] `robots.txt` exists and does not accidentally block Google
- [ ] An XML sitemap exists and is submitted to Google Search Console
- [ ] No broken internal links on key pages

**Where to check:** [Google Search Console](https://search.google.com/search-console) → Coverage report

### Indexability

- [ ] No `noindex` tags on pages you want ranked
- [ ] Canonical tags are set correctly (especially if you have duplicate or similar pages)
- [ ] Your domain is verified in Google Search Console

### Performance

Google uses Core Web Vitals as a ranking signal. These matter.

| Metric | What It Measures | Target |
|---|---|---|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s |
| **INP** (Interaction to Next Paint) | How fast the page responds to input | < 200ms |
| **CLS** (Cumulative Layout Shift) | Does content jump around while loading? | < 0.1 |

**Where to check:** [PageSpeed Insights](https://pagespeed.web.dev) — paste your homepage URL.

Common fixes at this stage:
- Add `width` and `height` to all images (prevents CLS)
- Use `loading="lazy"` on below-fold images
- Serve images as WebP
- Move non-critical JS to `defer` or `async`

### Metadata

Every public page needs:
- A unique `<title>` tag (50–60 characters)
- A unique `<meta name="description">` (120–155 characters)
- One `<h1>` that matches the page's primary topic

> **Warning:** Do not auto-generate identical titles and descriptions across pages. Duplicate metadata actively hurts rankings.

---

## Keyword Strategy for a Personal SaaS

You cannot compete on head terms. This is not pessimism — it is resource allocation.

**Head term (avoid):** `time tracking software` — 74,000 searches/month, DA 70+ competitors

**Long-tail (target):** `time tracking for freelance designers` — 200 searches/month, winnable

The math works in your favour: 20 long-tail pages each ranking #1 for 200-search queries beats one page struggling at position 40 for a high-volume term.

### Finding Your Long-Tail Keywords

**Method 1: Google autocomplete**  
Type your core problem into Google. Note every suggestion. These are real searches.

**Method 2: "People also ask" boxes**  
Search your core term. The questions in the PAA box are keyword gold — they are already formatted as content questions.

**Method 3: Reddit and community forums**  
Search `site:reddit.com [your problem]`. The exact language people use in threads is how they also search. Mine this aggressively.

**Method 4: Your own users**  
Ask 5 users: "Before you found us, what did you search for?" Their answers are your best keywords. You cannot get this from a tool.

### Evaluating Keywords

For each candidate keyword, you need to know:

- **Search intent** — what does someone searching this actually want? (informational / navigational / commercial / transactional)
- **Competition** — can a new site realistically rank here?
- **Relevance** — would someone searching this convert?

> **Intent mismatch is the most common SEO mistake.** A keyword with perfect volume and low competition means nothing if the searchers want a blog post and you have a product page, or vice versa.

---

## AI Prompt: Keyword Research

Use this to expand a seed keyword into a prioritised long-tail list.

```
I am building a SaaS called [name] that helps [specific user] do [specific job].

My homepage describes it as: [paste your value proposition]

Seed keywords I'm considering: [list 3–5 terms]

For each seed keyword:
1. Generate 8–10 long-tail variants that have realistic commercial or informational intent
2. Classify each by intent: informational / commercial / transactional
3. Flag which ones a new site with low domain authority could realistically rank for
4. Suggest which 3–5 I should target first given I am a solo developer with limited content bandwidth

Assume I am competing against established SaaS products and need to find gaps, not go head-to-head.
```

**What to do with the output:**
- Treat it as a starting list, not a final answer
- Validate top candidates in Google Search Console or a free tool like Ahrefs Webmaster Tools
- Discard anything that doesn't feel like your actual user's language

---

## Content Strategy: What to Actually Build

At your stage, you have three content types worth building.

### 1. Landing Pages (Highest Priority)

These convert. Build them first.

One landing page per meaningful use case or audience segment.

**Structure that works:**
```
/[use-case] or /for/[audience]

Example:
/time-tracking-for-freelancers
/project-management-for-solo-consultants
```

Each page should:
- Target one specific keyword phrase
- Open with a headline that mirrors the search query
- Explain why your product solves this specific variant of the problem
- Include social proof relevant to this audience
- Have a clear CTA

> These pages serve double duty: SEO traffic **and** conversion. A well-written use-case page that ranks for nothing still closes users who arrive via other channels.

### 2. Comparison Pages (Medium Priority)

Someone searching `[competitor] alternative` or `[competitor] vs [you]` is ready to switch. Capture them.

```
/alternatives/[competitor-name]
/vs/[competitor-name]
```

Be fair, be specific, be honest about tradeoffs. These pages rank surprisingly well and convert even better.

### 3. Informational Content (Lower Priority at This Stage)

Blog posts and guides build authority over time but rarely produce direct conversions from organic traffic. Do not invest heavily here until you have landing pages and comparison pages working.

If you write informational content, target questions your ideal users are actively asking — not topics you find interesting.

---

## On-Page SEO: The Actual Checklist

For every page you want ranked:

**Title tag**
- [ ] Contains the target keyword
- [ ] Is under 60 characters
- [ ] Is unique across your site
- [ ] Does not start with your brand name (unless you are already well-known)

**Headings**
- [ ] One `<h1>` per page, contains the keyword
- [ ] `<h2>` and `<h3>` headings used to structure content logically
- [ ] Headings are not keyword-stuffed

**Body copy**
- [ ] Target keyword appears naturally in the first 100 words
- [ ] Related terms used throughout (Google understands semantic context)
- [ ] No keyword stuffing (reads like a human wrote it for humans)

**Images**
- [ ] Alt text on every image (descriptive, not "image1.jpg")
- [ ] File names are descriptive (`freelancer-dashboard.webp`, not `screenshot-3.png`)

**Internal links**
- [ ] At least one internal link from an existing page pointing to each new page
- [ ] Anchor text is descriptive (not "click here")

**URL**
- [ ] Clean, lowercase, hyphenated
- [ ] Contains the keyword
- [ ] No query strings or unnecessary parameters

---

## AI Prompt: On-Page SEO Review

Run this after writing a landing page or blog post.

```
Review the following page content for on-page SEO. 

Target keyword: [keyword]
Target audience: [who they are and what they want]

Page content:
[paste full page text]

Check for:
1. Does the title tag and H1 naturally contain the target keyword?
2. Is the keyword used in the first 100 words without feeling forced?
3. Are there semantic/related terms missing that Google would expect to see?
4. Is there any keyword stuffing that would hurt rather than help?
5. Does the content match the intent of someone searching this keyword?
6. Is there a clear next action (CTA) for someone who landed here from search?

Give specific rewrites for any issues found, not just flags.
```

---

## Validating AI SEO Output

AI is useful for SEO research and copy. It is unreliable for predicting rankings.

**Do not trust AI when it:**
- Gives you keyword volume numbers (it does not have live search data)
- Claims a piece of content "will rank" for something
- Suggests optimisation tactics from pre-2022 SEO guides (Google has changed significantly)
- Recommends exact keyword density percentages (this is not how modern Google works)

**Do trust AI when it:**
- Helps you rewrite a title tag to be more click-worthy
- Suggests related terms you might have missed
- Reviews your content for readability and clarity
- Helps you structure a landing page

---

## Link Building at This Stage

Backlinks (other sites linking to yours) are the hardest part of SEO and the most impactful.

At your stage, focus only on links you can earn without a budget:

**High-value, low-effort:**
- Submit to directories relevant to your niche (Product Hunt, Indie Hackers, specific SaaS directories)
- Write genuine answers on Reddit and Quora that reference your product where relevant
- Guest posts on newsletters or blogs your target users actually read
- Get listed in "tools for [your audience]" roundup posts

**Not worth your time yet:**
- Cold outreach for link exchanges (low response rate, Google devalues reciprocal links)
- Paying for links (against Google's guidelines, and expensive)
- Building links to blog posts (build links to your money pages first)

> **One high-quality, relevant backlink beats 100 low-quality directory submissions.** Prioritise relevance over volume.

---

## Measuring What Matters

Install these and do not ignore them.

| Tool | What It Tells You | Cost |
|---|---|---|
| Google Search Console | Impressions, clicks, keyword rankings, indexing issues | Free |
| Google Analytics 4 | Which organic pages convert, user behavior | Free |
| Ahrefs Webmaster Tools | Backlink profile, technical issues | Free (limited) |

**The only metrics worth checking weekly at your stage:**

- Total impressions (are more people seeing you?)
- Average position for your target keywords (are you moving up?)
- Pages indexed (is Google actually crawling your new content?)

Do not obsess over traffic numbers yet. Impressions and ranking movement are leading indicators — they tell you if SEO is working before traffic shows up.

---

## Realistic Timeline

Set expectations correctly before starting.

```
Month 1    Fix technical SEO, set up Search Console, 
           submit sitemap, identify target keywords

Month 2    Publish first 2–3 landing pages,
           get indexed, watch impressions appear

Month 3    First keyword movements visible,
           add comparison pages, earn first links

Month 4–6  Rankings stabilise and improve,
           long-tail terms start generating real traffic

Month 6+   Compounding — older content gains authority,
           new content ranks faster
```

SEO is a 6-month investment before meaningful traffic. Anyone promising faster results is selling you something.

---

## Checklist: SEO Foundation Complete

**Technical**
- [ ] Google Search Console set up and verified
- [ ] Sitemap submitted
- [ ] Core Web Vitals passing (check PageSpeed Insights)
- [ ] No critical crawl errors in Search Console
- [ ] `robots.txt` not blocking important pages

**Keyword strategy**
- [ ] 5–10 long-tail target keywords identified
- [ ] Each keyword mapped to a specific page (or a planned page)
- [ ] Search intent confirmed for each keyword

**Content**
- [ ] Homepage title and meta description optimised for primary keyword
- [ ] At least one use-case landing page published
- [ ] Every page has unique title and description

**Measurement**
- [ ] Google Analytics 4 installed
- [ ] Search Console showing impressions data
- [ ] Baseline ranking position noted for target keywords

---

## What Comes Next

With SEO foundations in place, your remaining Phase 5 modules complete the picture:

- **Presentation Prep** — use your Search Console data to show traction, even early keyword impressions signal market validation
- **Pitch Deck** — SEO strategy is a credible answer to "how will you acquire users?" without requiring paid spend
