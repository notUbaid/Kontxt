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
      createTopic('Problem Definition', AlertCircle),
      createTopic('AI Justification', Lightbulb),
      createTopic('User Personas', Users),
      createTopic('Use Cases', CheckSquare),
      createTopic('Success Metrics', Target),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Feature Prioritization', List),
      createTopic('Cost Expectations', DollarSign),
    ]
  },
  {
    id: 'phase-1-ai-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Workflow),
      createTopic('AI Interaction Flows', Bot),
      createTopic('Prompt Flows', MessageSquare),
      createTopic('Conversation Design', MessageSquare),
      createTopic('UX for AI Products', Layers),
      createTopic('Design System', PenTool),
      createTopic('Empty States', Box),
      createTopic('Error States', AlertCircle),
      createTopic('AI Failure States', ShieldAlert),
    ]
  },
  {
    id: 'phase-2-ai-arch',
    name: 'PHASE 2 — AI ARCHITECTURE',
    topics: [
      createTopic('AI Fundamentals', BookOpen),
      createTopic('Model Selection', Cpu),
      createTopic('AI Architecture', Server),
      createTopic('Prompt Architecture', MessageSquare),
      createTopic('System Prompts', Key),
      createTopic('User Prompts', UserCheck),
      createTopic('Guardrails', Shield),
      createTopic('Output Formatting', FileText),
      createTopic('Prompt Templates', FileText),
      createTopic('Context Architecture', Database),
      createTopic('Knowledge Base', BookOpen),
      createTopic('RAG Design', Search),
      createTopic('Chunking Strategy', Layers),
      createTopic('Retrieval Strategy', Search),
      createTopic('Re-ranking', TrendingUp),
      createTopic('Embeddings', Database),
      createTopic('Tool Calling', Link),
      createTopic('MCP', Link),
      createTopic('Agents', Bot),
      createTopic('Multi-Agent', Users),
      createTopic('Workflow Automation', Workflow),
      createTopic('Voice', Headphones),
      createTopic('Vision', Eye),
      createTopic('OCR', FileText),
      createTopic('Fine-Tuning', Settings),
      createTopic('APIs', Link),
      createTopic('Databases', Database),
      createTopic('Calculators', Activity),
      createTopic('Custom Tools', Box),
      createTopic('AI Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3-ai-dev',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Box),
      createTopic('Backend', Server),
      createTopic('Database', Database),
      createTopic('Auth', Lock),
      createTopic('AI Integration', Bot),
      createTopic('Prompt Engineering', MessageSquare),
      createTopic('RAG Implementation', Search),
      createTopic('Vector Database', Database),
      createTopic('Streaming Responses', Zap),
      createTopic('File Processing', FileText),
      createTopic('File Uploads', Cloud),
      createTopic('Search', Search),
      createTopic('Analytics', BarChart),
      createTopic('Testing', CheckSquare),
      createTopic('Human Review', UserCheck),
    ]
  },
  {
    id: 'phase-4-ai-prod',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Rate Limiting', Activity),
      createTopic('Prompt Injection Protection', ShieldAlert),
      createTopic('Jailbreak Prevention', ShieldAlert),
      createTopic('Cost Controls', DollarSign),
      createTopic('Usage Limits', Activity),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('AI Evaluation', Target),
      createTopic('Hallucination Testing', ShieldAlert),
      createTopic('Performance Optimization', Zap),
      createTopic('Caching', Database),
      createTopic('CI/CD', Rocket),
    ]
  },
  {
    id: 'phase-5-ai-deploy',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Hosting', Cloud),
      createTopic('Domain Setup', Globe),
      createTopic('Analytics', BarChart),
      createTopic('Launch Checklist', CheckSquare),
      createTopic('User Feedback', MessageSquare),
      createTopic('Documentation', BookOpen),
      createTopic('Legal Pages', FileText),
      createTopic('AI Disclosure', Shield),
      createTopic('Privacy Policy', Shield),
    ]
  },
  {
    id: 'phase-6-ai-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Usage Analytics', BarChart),
      createTopic('Retention', Target),
      createTopic('Prompt Optimization', MessageSquare),
      createTopic('Cost Optimization', DollarSign),
      createTopic('Model Upgrades', Cpu),
      createTopic('Feature Roadmap', Presentation),
      createTopic('Scaling Strategy', TrendingUp),
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
