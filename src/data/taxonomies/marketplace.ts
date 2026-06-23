import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Share2, Network, Code, Globe, Star, FileWarning, HelpCircle, CreditCard, Server
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const marketplaceProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — MARKETPLACE DISCOVERY',
    topics: [
      createTopic('Marketplace Fundamentals', BookOpen),
      createTopic('Marketplace Type', Target),
      createTopic('Supply Side', Users),
      createTopic('Demand Side', Users),
      createTopic('Marketplace Liquidity', Activity),
      createTopic('Chicken & Egg Strategy', TrendingUp),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Revenue Model', DollarSign),
      createTopic('Success Metrics', Target),
      createTopic('MVP Scope', Layers),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('Buyer Journey', Layers),
      createTopic('Seller Journey', Layers),
      createTopic('User Flows', Network),
      createTopic('Marketplace Policies', ShieldAlert),
      createTopic('Trust & Safety Planning', Shield),
      createTopic('Wireframes', Box),
      createTopic('Design System', Settings),
      createTopic('Accessibility', UserCheck),
      createTopic('Empty States', Box),
      createTopic('Loading States', Zap),
      createTopic('Error States', AlertCircle),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — MARKETPLACE ARCHITECTURE',
    topics: [
      createTopic('Marketplace Fundamentals', BookOpen),
      createTopic('Tech Stack Selection', Layers),
      createTopic('User Architecture', Users),
      createTopic('Authentication', Lock),
      createTopic('Authorization', Shield),
      createTopic('Listing System', List),
      createTopic('Search Architecture', Search),
      createTopic('Payments Architecture', CreditCard),
      createTopic('Messaging System', MessageSquare),
      createTopic('Reviews & Ratings', Star),
      createTopic('Dispute Resolution', FileWarning),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Code),
      createTopic('Backend', Server),
      createTopic('Database', Database),
      createTopic('Authentication', Lock),
      createTopic('Authorization', Shield),
      createTopic('Listings', List),
      createTopic('Search', Search),
      createTopic('Payments', CreditCard),
      createTopic('Messaging', MessageSquare),
      createTopic('Reviews', Star),
      createTopic('Notifications', Activity),
      createTopic('Admin Panel', Settings),
      createTopic('Moderation Tools', ShieldAlert),
      createTopic('Analytics', BarChart),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Fraud Prevention', ShieldAlert),
      createTopic('Rate Limiting', Activity),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Caching', Database),
      createTopic('Backups', Cloud),
      createTopic('CI/CD', Rocket),
      createTopic('Performance Optimization', Zap),
      createTopic('Scalability Planning', TrendingUp),
      createTopic('Abuse Detection', ShieldAlert),
    ]
  },
  {
    id: 'phase-5-launch',
    name: 'PHASE 5 — LAUNCH',
    topics: [
      createTopic('Beta Testing', Target),
      createTopic('Seller Onboarding', Users),
      createTopic('Buyer Onboarding', Users),
      createTopic('Analytics Setup', BarChart),
      createTopic('SEO', Search),
      createTopic('Legal Documents', FileText),
      createTopic('Terms of Service', FileText),
      createTopic('Privacy Policy', Shield),
      createTopic('Marketplace Policies', HelpCircle),
      createTopic('Refund Policies', CreditCard),
      createTopic('Launch Checklist', ListChecks),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Supply Growth', TrendingUp),
      createTopic('Demand Growth', TrendingUp),
      createTopic('Retention', Activity),
      createTopic('Referral Programs', Share2),
      createTopic('Reviews Optimization', Star),
      createTopic('Marketplace Liquidity', Zap),
      createTopic('Roadmap', Layers),
      createTopic('Scaling Strategy', Globe),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return marketplaceProductionTaxonomy.map(cat => {
    return {
      ...cat,
      topics: cat.topics.filter(t => {
        if (hide.includes(t.name)) return false;
        if (keep.length > 0 && !keep.includes(t.name)) return false;
        return true;
      })
    };
  }).filter(cat => cat.topics.length > 0);
};

export const marketplaceHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Marketplace Type', 'MVP Scope', 'PRD', 'Buyer Journey', 'Seller Journey', 
    'Database Schema', 'Listings', 'Search', 'Authentication', 'Demo Transactions', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Mapped aliases
    'Demo Data', 'MVP Features'
  ],
  [
    'Fraud Prevention', 'Dispute Resolution', 'Moderation Systems', 
    'Marketplace Policies', 'Monitoring', 'Scalability Planning', 'Abuse Detection'
  ]
);

export const marketplacePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Moderation', 'Advanced Fraud Detection', 'Large-scale Infrastructure',
    'Abuse Detection', 'Scalability Planning', 'Fraud Prevention'
  ]
);

export const marketplaceCustomTaxonomy = marketplaceProductionTaxonomy;
