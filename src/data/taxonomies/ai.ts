import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Cpu, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, PenTool, Lock,
  UserCheck, MessageSquare, TrendingUp, Presentation, AlertCircle, List, Cpu as Bot, Workflow, Lightbulb, Link, Headphones, Eye
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const aiProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-ai-discovery',
    name: 'PHASE 0 — AI PRODUCT DISCOVERY',
    topics: [
      createTopic('Use Cases', CheckSquare, [{name:'OpenAI Cookbook',url:'https://cookbook.openai.com/'}], 'aiusecases'),
      createTopic('Competitor Analysis', BarChart, [{name:'Similarweb',url:'https://www.similarweb.com/'},{name:'G2 Software Reviews',url:'https://www.g2.com/'}], 'aicompetitoranalysis'),
      createTopic('Feature Prioritization', List, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'aifeatureprioritization'),
      createTopic('Success Metrics', Target, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aisuccessmetrics'),
      createTopic('Problem Definition', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'aiproblemdefinition'),
      createTopic('AI Justification', Lightbulb, [{name:'When to NOT use AI',url:'https://hbr.org/2023/07/when-not-to-use-ai'}], 'aiaijustification'),
      createTopic('User Personas', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiuserpersonas'),
      createTopic('Cost Expectations', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aicostexpectations'),
    ]
  },
  {
    id: 'phase-1-ai-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'aiprd'),
      createTopic('User Flows', Workflow, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiuserflows'),
      createTopic('Design System', PenTool, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'aidesignsystem'),
      createTopic('Empty States', Box, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'aiemptystates'),
      createTopic('Error States', AlertCircle, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'aierrorstates'),
      createTopic('AI Interaction Flows', Bot, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiaiinteractionflows'),
      createTopic('Prompt Flows', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aipromptflows'),
      createTopic('Conversation Design', MessageSquare, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiconversationdesign'),
      createTopic('UX for AI Products', Layers, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'aiuxforaiproducts'),
      createTopic('AI Failure States', ShieldAlert, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'aiaifailurestates'),
    ]
  },
  {
    id: 'phase-2-ai-arch',
    name: 'PHASE 2 — AI ARCHITECTURE',
    topics: [
      createTopic('APIs', Link, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'aiapis'),
      createTopic('AI Fundamentals', BookOpen, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiaifundamentals'),
      createTopic('Model Selection', Cpu, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aimodelselection'),
      createTopic('AI Architecture', Server, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'aiaiarchitecture'),
      createTopic('Prompt Architecture', MessageSquare, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'aipromptarchitecture'),
      createTopic('System Prompts', Key, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aisystemprompts'),
      createTopic('User Prompts', UserCheck, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiuserprompts'),
      createTopic('Guardrails', Shield, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiguardrails'),
      createTopic('Output Formatting', FileText, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'aioutputformatting'),
      createTopic('Prompt Templates', FileText, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiprompttemplates'),
      createTopic('Context Architecture', Database, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'aicontextarchitecture'),
      createTopic('Knowledge Base', BookOpen, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiknowledgebase'),
      createTopic('RAG Design', Search, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'airagdesign'),
      createTopic('Chunking Strategy', Layers, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aichunkingstrategy'),
      createTopic('Retrieval Strategy', Search, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'airetrievalstrategy'),
      createTopic('Re-ranking', TrendingUp, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aireranking'),
      createTopic('Embeddings', Database, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiembeddings'),
      createTopic('Tool Calling', Link, [{name:'OpenAI Function Calling',url:'https://platform.openai.com/docs/guides/function-calling'},{name:'Anthropic Tool Use',url:'https://docs.anthropic.com/en/docs/build-with-claude/tool-use'}], 'aitoolcalling'),
      createTopic('MCP', Link, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aimcp'),
      createTopic('Agents', Bot, [{name:'LangGraph',url:'https://langchain-ai.github.io/langgraph/'},{name:'OpenAI Assistants API',url:'https://platform.openai.com/docs/assistants/overview'}], 'aiagents'),
      createTopic('Multi-Agent', Users, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aimultiagent'),
      createTopic('Workflow Automation', Workflow, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiworkflowautomation'),
      createTopic('Voice', Headphones, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aivoice'),
      createTopic('Vision', Eye, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aivision'),
      createTopic('OCR', FileText, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiocr'),
      createTopic('Fine-Tuning', Settings, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifinetuning'),
      createTopic('Databases', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aidatabases'),
      createTopic('Calculators', Activity, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aicalculators'),
      createTopic('Custom Tools', Box, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aicustomtools'),
      createTopic('AI Cost Estimation', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aiaicostestimation'),
    ]
  },
  {
    id: 'phase-3-ai-dev',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Lock, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'aiauth'),
      createTopic('Database', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aidatabase'),
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'aibackend'),
      createTopic('Frontend', Box, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifrontend'),
      createTopic('Search', Search, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aisearch'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aianalytics'),
      createTopic('Testing', CheckSquare, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'aitesting'),
      createTopic('AI Integration', Bot, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiaiintegration'),
      createTopic('Prompt Engineering', MessageSquare, [{name:'Anthropic Prompt Engineering',url:'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'},{name:'Prompting Guide',url:'https://www.promptingguide.ai/'}], 'aipromptengineering'),
      createTopic('RAG Implementation', Search, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'airagimplementation'),
      createTopic('Vector Database', Database, [{name:'Pinecone',url:'https://docs.pinecone.io/'},{name:'Supabase pgvector',url:'https://supabase.com/docs/guides/ai/vector-columns'}], 'aivectordatabase'),
      createTopic('Streaming Responses', Zap, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aistreamingresponses'),
      createTopic('File Processing', FileText, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifileprocessing'),
      createTopic('File Uploads', Cloud, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aifileuploads'),
      createTopic('Human Review', UserCheck, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aihumanreview'),
    ]
  },
  {
    id: 'phase-4-ai-prod',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'aisecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'aiperformanceoptimization'),
      createTopic('Monitoring', Activity, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'aimonitoring'),
      createTopic('Logging', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'ailogging'),
      createTopic('Error Tracking', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'aierrortracking'),
      createTopic('Rate Limiting', Activity, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/sdks/ratelimit-ts/overview'}], 'airatelimiting'),
      createTopic('Caching', Database, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aicaching'),
      createTopic('CI/CD', Rocket, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'aicicd'),
      createTopic('Prompt Injection Protection', ShieldAlert, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aipromptinjectionprotection'),
      createTopic('Jailbreak Prevention', ShieldAlert, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aijailbreakprevention'),
      createTopic('Cost Controls', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aicostcontrols'),
      createTopic('Usage Limits', Activity, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiusagelimits'),
      createTopic('AI Evaluation', Target, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiaievaluation'),
      createTopic('Hallucination Testing', ShieldAlert, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'aihallucinationtesting'),
    ]
  },
  {
    id: 'phase-5-ai-deploy',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aianalytics'),
      createTopic('Documentation', BookOpen, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aidocumentation'),
      createTopic('Privacy Policy', Shield, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiprivacypolicy'),
      createTopic('User Feedback', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'aiuserfeedback'),
      createTopic('Hosting', Cloud, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'aihosting'),
      createTopic('Domain Setup', Globe, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aidomainsetup'),
      createTopic('Launch Checklist', CheckSquare, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'ailaunchchecklist'),
      createTopic('Legal Pages', FileText, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'ailegalpages'),
      createTopic('AI Disclosure', Shield, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiaidisclosure'),
    ]
  },
  {
    id: 'phase-6-ai-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Target, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'airetention'),
      createTopic('Scaling Strategy', TrendingUp, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aiscalingstrategy'),
      createTopic('Usage Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'aiusageanalytics'),
      createTopic('Prompt Optimization', MessageSquare, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aipromptoptimization'),
      createTopic('Cost Optimization', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'aicostoptimization'),
      createTopic('Model Upgrades', Cpu, [{name:'OpenAI API Docs',url:'https://platform.openai.com/docs/introduction'},{name:'HuggingFace',url:'https://huggingface.co/docs'}], 'aimodelupgrades'),
      createTopic('Feature Roadmap', Presentation, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'aifeatureroadmap'),
    ]
  }
];

// Helper to filter taxonomy
const filterTaxonomy = (keep: string[], hide: string[]) => {
  return aiProductionTaxonomy.map(cat => {
    return {
      ...cat,
      topics: cat.topics.filter(t => {
        // If explicit hide list is provided, filter out
        if (hide.includes(t.name)) return false;
        // If explicit keep list is provided, only keep those
        if (keep.length > 0 && !keep.includes(t.name)) return false;
        return true;
      })
    };
  }).filter(cat => cat.topics.length > 0);
};

// Hackathon: Impressive AI demo.
export const aiHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Problem Definition', 'MVP Features', 'PRD', 'User Flows', 'Model Selection', 
    'Prompt Architecture', 'AI Integration', 'Frontend', 'Backend', 'Demo Dataset', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Mapping requested terms to taxonomy items
    'Idea Definition', 'Feature Planning', 'System Prompts', 'User Prompts'
  ],
  [
    'RAG Optimization', 'Monitoring', 'AI Evaluation', 'Cost Forecasting', 
    'Security Hardening', 'Advanced Tool Calling', 'RAG Design', 'Re-ranking',
    'AI Cost Estimation', 'Security', 'CI/CD'
  ]
);

// Personal: Build useful AI app without burning money.
export const aiPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Security', 'Multi-Agent Systems', 'Advanced Observability',
    'Multi-Agent', 'Monitoring', 'Rate Limiting', 'CI/CD', 'Scaling Strategy',
    'Jailbreak Prevention', 'Prompt Injection Protection'
  ]
);

export const aiCustomTaxonomy = aiProductionTaxonomy;
