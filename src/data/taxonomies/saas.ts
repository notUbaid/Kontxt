import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Cpu, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, PenTool, Lock,
  Bell, HelpCircle, UserCheck, MessageSquare, TrendingUp, Presentation, Play, AlertCircle, Mail, List
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const saasProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket),
      createTopic('Problem Statement', AlertCircle),
      createTopic('User Pain Points', AlertCircle),
      createTopic('Target Users', Users),
      createTopic('Project Assumptions', AlertCircle),
      createTopic('ICP (Ideal Customer Profile)', UserCheck),
      createTopic('Personas', Users),
      createTopic('Solution Statement', CheckSquare),
      createTopic('Elevator Pitch', Presentation),
      createTopic('Value Proposition', Target),
      createTopic('Market Research', Globe),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Existing Alternatives', Layers),
      createTopic('Market Positioning', Target),
      createTopic('Feature Brainstorm', CheckSquare),
      createTopic('Feature Prioritization', List),
      createTopic('MVP Features', Rocket),
      createTopic('Future Features', Play),
      createTopic('Business & Monetization', DollarSign, [], 'businessmonetization'),
      createTopic('Metrics & KPIs', BarChart, [], 'metricskpis'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Globe),
      createTopic('Information Architecture', Layers),
      createTopic('Wireframes', Box),
      createTopic('Branding', Target),
      createTopic('Design System', PenTool),
      createTopic('Accessibility', UserCheck),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Settings),
      createTopic('System Architecture Diagram', Globe),
      createTopic('Frontend Architecture', Box),
      createTopic('State Management', Layers),
      createTopic('Backend Architecture', Server),
      createTopic('Database Schema', Database),
      createTopic('API Design', Globe),
      createTopic('Authentication', Key),
      createTopic('Authorization & Roles', Shield),
      createTopic('File Storage', Cloud),
      createTopic('Third Party Integrations', Layers),
      createTopic('AI Architecture (optional)', Cpu),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Database', Database),
      createTopic('Auth', Key),
      createTopic('Backend', Server),
      createTopic('Frontend', Box),
      createTopic('Payments', DollarSign),
      createTopic('Emails', Mail),
      createTopic('Notifications', Bell),
      createTopic('Search', Search),
      createTopic('Analytics', BarChart),
      createTopic('Admin Panel', Shield),
      createTopic('File Uploads', Cloud),
      createTopic('Integrations', Layers),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', ShieldAlert),
      createTopic('Performance Optimization', Zap),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Activity),
      createTopic('Caching', Zap),
      createTopic('Backups', Database),
      createTopic('CI/CD', Layers),
      createTopic('Infrastructure', Server),
      createTopic('Disaster Recovery', ShieldAlert),
      createTopic('Scalability Planning', TrendingUp),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — LAUNCH',
    topics: [
      createTopic('Beta Testing', CheckSquare),
      createTopic('Launch Checklist', CheckSquare),
      createTopic('Analytics Setup', BarChart),
      createTopic('SEO', Search),
      createTopic('Privacy Policy', Lock),
      createTopic('Terms of Service', FileText),
      createTopic('Cookie Policy', FileText),
      createTopic('Legal Documents', FileText),
      createTopic('Customer Support', HelpCircle),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Product Analytics', BarChart),
      createTopic('Retention', Users),
      createTopic('User Feedback', MessageSquare),
      createTopic('Scaling Strategy', TrendingUp),
      createTopic('Marketing', Globe),
      createTopic('Referral Systems', Users),
      createTopic('Feature Roadmap', Globe),
      createTopic('Technical Debt', AlertCircle),
    ]
  }
];

export const saasHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket),
      createTopic('MVP Features', CheckSquare),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Globe),
      createTopic('Design System', PenTool),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2',
    topics: [
      createTopic('Tech Stack Selection', Settings),
      createTopic('Database Schema', Database),
      createTopic('Auth (Optional)', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'auth'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Database', Database),
      createTopic('Backend', Server),
      createTopic('Frontend', Box),
      createTopic('Demo Data', Database),
      createTopic('Presentation Prep', Presentation),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — SUBMISSION',
    topics: [
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

export const saasPersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Personas', Users),
      createTopic('Idea', Rocket, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'ideadefinition'),
      createTopic('Features', CheckSquare, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mvpfeatures'),
    ]
  },
  {
    id: 'product',
    name: 'PHASE 1 — PRODUCT',
    topics: [
      createTopic('PRD', FileText),
      createTopic('Design', PenTool, [{name:'Stripe Atlas',url:'https://stripe.com/atlas'},{name:'YC Startup Library',url:'https://www.ycombinator.com/library'}], 'designsystem'),
      createTopic('Flows', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'userflows'),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{name:'Stripe Atlas',url:'https://stripe.com/atlas'},{name:'YC Startup Library',url:'https://www.ycombinator.com/library'}], 'techstackselection'),
      createTopic('Auth', Key),
      createTopic('Database', Database),
      createTopic('APIs', Globe, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'apidesign'),
      createTopic('Storage', Cloud, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'filestorage'),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Database', Database),
      createTopic('Backend', Server),
      createTopic('Frontend', Box),
      createTopic('Emails', Mail),
      createTopic('Analytics', BarChart),
    ]
  },
  {
    id: 'production-lite',
    name: 'PHASE 4 — PRODUCTION LITE',
    topics: [
      createTopic('Performance', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'performanceoptimization'),
      createTopic('Backups', Database),
      createTopic('Deployment', Cloud, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'infrastructure'),
      createTopic('Security Basics', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'security'),
    ]
  },
  {
    id: 'growth-lite',
    name: 'PHASE 5 — GROWTH LITE',
    topics: [
      createTopic('Feedback', MessageSquare, [{name:'Stripe Atlas',url:'https://stripe.com/atlas'},{name:'YC Startup Library',url:'https://www.ycombinator.com/library'}], 'userfeedback'),
      createTopic('Roadmap', Globe, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'featureroadmap'),
      createTopic('SEO', Search),
    ]
  }
];

export const saasCustomTaxonomy: Category[] = [
  ...saasProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Demo Data', Database),
          createTopic('Presentation Prep', Presentation)
    ]
      };
    }
    if (cat.id === 'phase-6') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Pitch Deck', Presentation),
          createTopic('Demo Script', FileText),
          createTopic('Submission Checklist', CheckSquare)
    ]
      };
    }
    return cat;
  })
];
