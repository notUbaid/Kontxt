import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, 
  BookOpen, Layers, Server, Cloud, Cpu, Activity, Zap, Search, ShieldAlert,
  Target, Users, BarChart, DollarSign, PenTool, Lock,
  UserCheck, MessageSquare, TrendingUp, Presentation, AlertCircle, List, Cpu as Bot, Workflow, Lightbulb, Link, Eye, HelpCircle
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const aiProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-ai-discovery',
    name: 'PHASE 0 — AI PRODUCT DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Problem Definition', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'aiproblemdefinition'),
      createTopic('AI Suitability', Lightbulb, [{name:'When to NOT use AI',url:'https://hbr.org/2023/07/when-not-to-use-ai'},{name:'AI vs Rules Engines',url:'https://martinfowler.com/articles/rules-engines.html'}], 'aiaijustification'),
      createTopic('Target Users', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiuserpersonas'),
      createTopic('Use Cases', CheckSquare, [{name:'OpenAI Cookbook',url:'https://cookbook.openai.com/'},{name:'AI Use Case Canvas',url:'https://www.ycombinator.com/library/Jt-how-to-find-ai-use-cases'}], 'aiusecases'),
      createTopic('Competitor Analysis', BarChart, [{name:'TheresAnAIForThat',url:'https://theresanaiforthat.com/'}], 'aicompetitoranalysis'),
      createTopic('Similar AI Products', Layers, [], 'aisimilarproducts'),
      createTopic('Feature Brainstorm', Zap, [], 'aifeaturebrainstorm'),
      createTopic('Feature Prioritization', List, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'aifeatureprioritization'),
      createTopic('Success Criteria', Target, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aisuccessmetrics'),
      createTopic('Cost Expectations', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aicostexpectations'),
    ]
  },
  {
    id: 'phase-1-ai-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'aiprd'),
      createTopic('User Flows', Workflow, [{name:'AI UX Patterns',url:'https://aiux.com/'}], 'aiuserflows'),
      createTopic('Conversation Design', MessageSquare, [{name:'Google Conversation Design',url:'https://pair.withgoogle.com/guidebook/patterns'}], 'aiconversationdesign'),
      createTopic('AI Interaction Flows', Bot, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiaiinteractionflows'),
      createTopic('Conversation Memory', Database, [], 'aiconversationmemory'),
      createTopic('Prompt Flows', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aipromptflows'),
      createTopic('UX for AI Products', Layers, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'aiuxforaiproducts'),
      createTopic('Explainability', Eye, [], 'aiexplainability'),
      createTopic('Trust & Transparency', Shield, [], 'aitrustandtransparency'),
      createTopic('AI Failure States', ShieldAlert, [{name:'Designing for AI Errors',url:'https://www.nngroup.com/articles/ai-error-recovery/'}], 'aiaifailurestates'),
      createTopic('Design System', PenTool, [{name:'Vercel AI SDK UI',url:'https://sdk.vercel.ai/docs/ai-sdk-ui/overview'},{name:'react-markdown',url:'https://github.com/remarkjs/react-markdown'}], 'aidesignsystem'),
      createTopic('Empty States', Box, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'aiemptystates'),
      createTopic('Error States', AlertCircle, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'aierrorstates'),
    ]
  },
  {
    id: 'phase-2-ai-arch',
    name: 'PHASE 2 — AI ARCHITECTURE',
    topics: [
      createTopic('AI Fundamentals', BookOpen, [{name:'Tiktoken (Tokenizer)',url:'https://github.com/openai/tiktoken'},{name:'3Blue1Brown: Transformers',url:'https://www.youtube.com/watch?v=wjZofJX0v4M'}], 'aiaifundamentals'),
      createTopic('Model Selection', Cpu, [{name:'LMSYS Chatbot Arena',url:'https://chat.lmsys.org/'},{name:'Artificial Analysis',url:'https://artificialanalysis.ai/'}], 'aimodelselection'),
      createTopic('Model Routing', Workflow, [], 'aimodelrouting'),
      createTopic('AI Architecture', Server, [{name:'Vercel AI SDK',url:'https://sdk.vercel.ai/docs'},{name:'Inngest (Async Background)',url:'https://www.inngest.com/'}], 'aiaiarchitecture'),
      createTopic('Prompt Engineering', MessageSquare, [{name:'Anthropic Prompt Engineering',url:'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'},{name:'Prompting Guide',url:'https://www.promptingguide.ai/'}], 'aipromptengineering'),
      createTopic('Context Engineering', Database, [], 'aicontextengineering'),
      createTopic('Retrieval Pipeline', Search, [], 'airetrievalpipeline'),
      createTopic('Knowledge Base', BookOpen, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiknowledgebase'),
      createTopic('Tool Ecosystem', Link, [], 'aitoolcosystem'),
      createTopic('Agents', Bot, [{name:'LangGraph',url:'https://langchain-ai.github.io/langgraph/'},{name:'CrewAI',url:'https://www.crewai.com/'}], 'aiagents'),
      createTopic('Multi-Agent', Users, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aimultiagent'),
      createTopic('Workflow Automation', Workflow, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiworkflowautomation'),
      createTopic('Multimodal AI', Eye, [], 'aimultimodalai'),
      createTopic('Fine-Tuning', Settings, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifinetuning'),
      createTopic('Structured Outputs', FileText, [{name:'Zod',url:'https://zod.dev/'},{name:'OpenAI Structured Outputs',url:'https://platform.openai.com/docs/guides/structured-outputs'}], 'aistructuredoutputs'),
      createTopic('Backend & Database', Database, [], 'aibackendanddatabase'),
      createTopic('Cost Estimation', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aiaicostestimation'),
    ]
  },
  {
    id: 'phase-3-ai-dev',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Box, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifrontend'),
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'aibackend'),
      createTopic('Database', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aidatabase'),
      createTopic('Authentication', Lock, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'aiauth'),
      createTopic('AI Integration', Bot, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiaiintegration'),
      createTopic('RAG', Search, [{name:'LlamaIndex',url:'https://www.llamaindex.ai/'}], 'airagimplementation'),
      createTopic('Streaming UX', Zap, [], 'aistreamingux'),
      createTopic('Search', Search, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aisearch'),
      createTopic('File Uploads', Cloud, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifileuploads'),
      createTopic('File Processing', FileText, [{name:'LlamaParse',url:'https://github.com/run-llama/llama_parse'},{name:'Unstructured.io',url:'https://unstructured.io/'}], 'aifileprocessing'),
      createTopic('Human Review', UserCheck, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aihumanreview'),
      createTopic('Analytics', BarChart, [{name:'LangSmith',url:'https://smith.langchain.com/'},{name:'Helicone',url:'https://www.helicone.ai/'}], 'aianalytics'),
      createTopic('Testing', CheckSquare, [{name:'Promptfoo',url:'https://promptfoo.dev/'}], 'aitesting'),
    ]
  },
  {
    id: 'phase-4-ai-prod',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'aisecurity'),
      createTopic('Prompt Injection Protection', ShieldAlert, [{name:'OWASP LLM Top 10',url:'https://genai.owasp.org/llm-top-10/'}], 'aipromptinjectionprotection'),
      createTopic('Jailbreak Prevention', ShieldAlert, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aijailbreakprevention'),
      createTopic('Feature Flags', Zap, [], 'aifeatureflags'),
      createTopic('Model Versioning', Cpu, [], 'aimodelversioning'),
      createTopic('Observability', Activity, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'aimonitoring'),
      createTopic('Cost Controls', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aicostcontrols'),
      createTopic('Usage Limits', Activity, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiusagelimits'),
      createTopic('Evaluation Pipelines', Target, [], 'aievaluationspipelines'),
      createTopic('Hallucination Testing', ShieldAlert, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'aihallucinationtesting'),
    ]
  },
  {
    id: 'phase-5-ai-deploy',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Hosting', Cloud, [{name:'Vercel Edge Functions',url:'https://vercel.com/docs/functions/edge-functions'},{name:'Fly.io (Docker)',url:'https://fly.io/'}], 'aihosting'),
      createTopic('User Documentation', BookOpen, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aidocumentation'),
      createTopic('Privacy Policy', Shield, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiprivacypolicy'),
      createTopic('AI Disclosure', Shield, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiaidisclosure'),
      createTopic('Launch Checklist', CheckSquare, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'ailaunchchecklist'),
      createTopic('Growth Analytics', BarChart, [{name:'LangSmith',url:'https://smith.langchain.com/'},{name:'Helicone',url:'https://www.helicone.ai/'}], 'aianalytics'),
    ]
  },
  {
    id: 'phase-6-ai-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Target, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'airetention'),
      createTopic('Prompt Analytics', BarChart, [], 'aipromptanalytics'),
      createTopic('Cost Optimization', DollarSign, [{name:'Anthropic Prompt Caching',url:'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching'}], 'aicostoptimization'),
      createTopic('Model Benchmarking', Cpu, [], 'aimodelbenchmarking'),
      createTopic('Model Upgrades', Cpu, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aimodelupgrades'),
      createTopic('Roadmap', Presentation, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'aifeatureroadmap'),
      createTopic('Scaling Strategy', TrendingUp, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiscalingstrategy'),
    ]
  }
];

export const aiPersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY & DESIGN',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Problem Definition', AlertCircle, [], 'aiproblemdefinition'),
      createTopic('AI Suitability', Lightbulb, [], 'aiaijustification'),
      createTopic('Conversation Design', MessageSquare, [], 'aiconversationdesign'),
      createTopic('Trust & Transparency', Shield, [], 'aitrustandtransparency'),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Model Selection', Cpu, [], 'aimodelselection'),
      createTopic('Prompt Engineering', MessageSquare, [], 'aipromptengineering'),
      createTopic('Conversation Memory', Database, [], 'aiconversationmemory'),
      createTopic('Structured Outputs', FileText, [], 'aistructuredoutputs'),
      createTopic('Retrieval Pipeline', Search, [], 'airetrievalpipeline'),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Box, [], 'aifrontend'),
      createTopic('Backend', Server, [], 'aibackend'),
      createTopic('AI Integration', Bot, [], 'aiaiintegration'),
      createTopic('Streaming UX', Zap, [], 'aistreamingux'),
      createTopic('AI Failure States', ShieldAlert, [], 'aiaifailurestates'),
    ]
  },
  {
    id: 'production',
    name: 'PHASE 4 — DEPLOYMENT',
    topics: [
      createTopic('Security', Shield, [], 'aisecurity'),
      createTopic('Cost Controls', DollarSign, [], 'aicostcontrols'),
      createTopic('Hosting', Cloud, [], 'aihosting'),
      createTopic('User Documentation', BookOpen, [], 'aidocumentation'),
    ]
  },
  {
    id: 'growth',
    name: 'PHASE 5 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [], 'aianalytics'),
      createTopic('Prompt Analytics', BarChart, [], 'aipromptanalytics'),
      createTopic('Model Upgrades', Cpu, [], 'aimodelupgrades'),
    ]
  }
];

export const aiHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Problem Definition', AlertCircle, [], 'aiproblemdefinition'),
      createTopic('Target Users', Users, [], 'aiuserpersonas'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [], 'aiprd'),
      createTopic('Conversation Design', MessageSquare, [], 'aiconversationdesign'),
      createTopic('AI Interaction Flows', Bot, [], 'aiaiinteractionflows'),
      createTopic('Trust & Transparency', Shield, [], 'aitrustandtransparency'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2',
    topics: [
      createTopic('Model Selection', Cpu, [], 'aimodelselection'),
      createTopic('Prompt Engineering', MessageSquare, [], 'aipromptengineering'),
      createTopic('Structured Outputs', FileText, [], 'aistructuredoutputs'),
      createTopic('RAG', Search, [], 'airagimplementation'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Backend', Server, [], 'aibackend'),
      createTopic('Frontend', Box, [], 'aifrontend'),
      createTopic('AI Integration', Bot, [], 'aiaiintegration'),
      createTopic('Streaming UX', Zap, [], 'aistreamingux'),
      createTopic('AI Failure States', ShieldAlert, [], 'aiaifailurestates'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation, [], 'aipitchdeck'),
      createTopic('Demo Script', FileText, [], 'aidemoscript'),
      createTopic('Submission Checklist', CheckSquare, [], 'aisubmissionchecklist'),
    ]
  }
];

export const aiCustomTaxonomy = aiProductionTaxonomy;
