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
      createTopic('Competitor Analysis', BarChart, [], 'aicompetitoranalysis'),
      createTopic('Feature Prioritization', List, [], 'aifeatureprioritization'),
      createTopic('Success Metrics', Target, [], 'aisuccessmetrics'),
      createTopic('Problem Definition', AlertCircle, [], 'aiproblemdefinition'),
      createTopic('AI Justification', Lightbulb, [{name:'When to NOT use AI',url:'https://hbr.org/2023/07/when-not-to-use-ai'}], 'aiaijustification'),
      createTopic('User Personas', Users, [], 'aiuserpersonas'),
      createTopic('Cost Expectations', DollarSign, [], 'aicostexpectations'),
    ]
  },
  {
    id: 'phase-1-ai-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'aiprd'),
      createTopic('User Flows', Workflow, [], 'aiuserflows'),
      createTopic('Design System', PenTool, [], 'aidesignsystem'),
      createTopic('Empty States', Box, [], 'aiemptystates'),
      createTopic('Error States', AlertCircle, [], 'aierrorstates'),
      createTopic('AI Interaction Flows', Bot, [], 'aiaiinteractionflows'),
      createTopic('Prompt Flows', MessageSquare, [], 'aipromptflows'),
      createTopic('Conversation Design', MessageSquare, [], 'aiconversationdesign'),
      createTopic('UX for AI Products', Layers, [], 'aiuxforaiproducts'),
      createTopic('AI Failure States', ShieldAlert, [], 'aiaifailurestates'),
    ]
  },
  {
    id: 'phase-2-ai-arch',
    name: 'PHASE 2 — AI ARCHITECTURE',
    topics: [
      createTopic('APIs', Link, [], 'aiapis'),
      createTopic('AI Fundamentals', BookOpen, [], 'aiaifundamentals'),
      createTopic('Model Selection', Cpu, [], 'aimodelselection'),
      createTopic('AI Architecture', Server, [], 'aiaiarchitecture'),
      createTopic('Prompt Architecture', MessageSquare, [], 'aipromptarchitecture'),
      createTopic('System Prompts', Key, [], 'aisystemprompts'),
      createTopic('User Prompts', UserCheck, [], 'aiuserprompts'),
      createTopic('Guardrails', Shield, [], 'aiguardrails'),
      createTopic('Output Formatting', FileText, [], 'aioutputformatting'),
      createTopic('Prompt Templates', FileText, [], 'aiprompttemplates'),
      createTopic('Context Architecture', Database, [], 'aicontextarchitecture'),
      createTopic('Knowledge Base', BookOpen, [], 'aiknowledgebase'),
      createTopic('RAG Design', Search, [], 'airagdesign'),
      createTopic('Chunking Strategy', Layers, [], 'aichunkingstrategy'),
      createTopic('Retrieval Strategy', Search, [], 'airetrievalstrategy'),
      createTopic('Re-ranking', TrendingUp, [], 'aireranking'),
      createTopic('Embeddings', Database, [], 'aiembeddings'),
      createTopic('Tool Calling', Link, [{name:'OpenAI Function Calling',url:'https://platform.openai.com/docs/guides/function-calling'},{name:'Anthropic Tool Use',url:'https://docs.anthropic.com/en/docs/build-with-claude/tool-use'}], 'aitoolcalling'),
      createTopic('MCP', Link, [], 'aimcp'),
      createTopic('Agents', Bot, [{name:'LangGraph',url:'https://langchain-ai.github.io/langgraph/'},{name:'OpenAI Assistants API',url:'https://platform.openai.com/docs/assistants/overview'}], 'aiagents'),
      createTopic('Multi-Agent', Users, [], 'aimultiagent'),
      createTopic('Workflow Automation', Workflow, [], 'aiworkflowautomation'),
      createTopic('Voice', Headphones, [], 'aivoice'),
      createTopic('Vision', Eye, [], 'aivision'),
      createTopic('OCR', FileText, [], 'aiocr'),
      createTopic('Fine-Tuning', Settings, [], 'aifinetuning'),
      createTopic('Databases', Database, [], 'aidatabases'),
      createTopic('Calculators', Activity, [], 'aicalculators'),
      createTopic('Custom Tools', Box, [], 'aicustomtools'),
      createTopic('AI Cost Estimation', DollarSign, [], 'aiaicostestimation'),
    ]
  },
  {
    id: 'phase-3-ai-dev',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Lock, [], 'aiauth'),
      createTopic('Database', Database, [], 'aidatabase'),
      createTopic('Backend', Server, [], 'aibackend'),
      createTopic('Frontend', Box, [], 'aifrontend'),
      createTopic('Search', Search, [], 'aisearch'),
      createTopic('Analytics', BarChart, [], 'aianalytics'),
      createTopic('Testing', CheckSquare, [], 'aitesting'),
      createTopic('AI Integration', Bot, [], 'aiaiintegration'),
      createTopic('Prompt Engineering', MessageSquare, [{name:'Anthropic Prompt Engineering',url:'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'},{name:'Prompting Guide',url:'https://www.promptingguide.ai/'}], 'aipromptengineering'),
      createTopic('RAG Implementation', Search, [], 'airagimplementation'),
      createTopic('Vector Database', Database, [{name:'Pinecone',url:'https://docs.pinecone.io/'},{name:'Supabase pgvector',url:'https://supabase.com/docs/guides/ai/vector-columns'}], 'aivectordatabase'),
      createTopic('Streaming Responses', Zap, [], 'aistreamingresponses'),
      createTopic('File Processing', FileText, [], 'aifileprocessing'),
      createTopic('File Uploads', Cloud, [], 'aifileuploads'),
      createTopic('Human Review', UserCheck, [], 'aihumanreview'),
    ]
  },
  {
    id: 'phase-4-ai-prod',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [], 'aisecurity'),
      createTopic('Performance Optimization', Zap, [], 'aiperformanceoptimization'),
      createTopic('Monitoring', Activity, [], 'aimonitoring'),
      createTopic('Logging', FileText, [], 'ailogging'),
      createTopic('Error Tracking', AlertCircle, [], 'aierrortracking'),
      createTopic('Rate Limiting', Activity, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/sdks/ratelimit-ts/overview'}], 'airatelimiting'),
      createTopic('Caching', Database, [], 'aicaching'),
      createTopic('CI/CD', Rocket, [], 'aicicd'),
      createTopic('Prompt Injection Protection', ShieldAlert, [], 'aipromptinjectionprotection'),
      createTopic('Jailbreak Prevention', ShieldAlert, [], 'aijailbreakprevention'),
      createTopic('Cost Controls', DollarSign, [], 'aicostcontrols'),
      createTopic('Usage Limits', Activity, [], 'aiusagelimits'),
      createTopic('AI Evaluation', Target, [], 'aiaievaluation'),
      createTopic('Hallucination Testing', ShieldAlert, [], 'aihallucinationtesting'),
    ]
  },
  {
    id: 'phase-5-ai-deploy',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Analytics', BarChart, [], 'aianalytics'),
      createTopic('Documentation', BookOpen, [], 'aidocumentation'),
      createTopic('Privacy Policy', Shield, [], 'aiprivacypolicy'),
      createTopic('User Feedback', MessageSquare, [], 'aiuserfeedback'),
      createTopic('Hosting', Cloud, [], 'aihosting'),
      createTopic('Domain Setup', Globe, [], 'aidomainsetup'),
      createTopic('Launch Checklist', CheckSquare, [], 'ailaunchchecklist'),
      createTopic('Legal Pages', FileText, [], 'ailegalpages'),
      createTopic('AI Disclosure', Shield, [], 'aiaidisclosure'),
    ]
  },
  {
    id: 'phase-6-ai-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Target, [], 'airetention'),
      createTopic('Scaling Strategy', TrendingUp, [], 'aiscalingstrategy'),
      createTopic('Usage Analytics', BarChart, [], 'aiusageanalytics'),
      createTopic('Prompt Optimization', MessageSquare, [], 'aipromptoptimization'),
      createTopic('Cost Optimization', DollarSign, [], 'aicostoptimization'),
      createTopic('Model Upgrades', Cpu, [], 'aimodelupgrades'),
      createTopic('Feature Roadmap', Presentation, [], 'aifeatureroadmap'),
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
