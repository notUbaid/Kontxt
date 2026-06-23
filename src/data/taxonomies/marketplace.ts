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
      createTopic('Competitor Analysis', BarChart),
      createTopic('Success Metrics', Target),
      createTopic('Marketplace Fundamentals', BookOpen),
      createTopic('Marketplace Type', Target),
      createTopic('Supply Side', Users),
      createTopic('Demand Side', Users),
      createTopic('Marketplace Liquidity', Activity),
      createTopic('Chicken & Egg Strategy', TrendingUp),
      createTopic('Revenue Model', DollarSign),
      createTopic('MVP Scope', Layers),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Network),
      createTopic('Wireframes', Box),
      createTopic('Design System', Settings),
      createTopic('Accessibility', UserCheck),
      createTopic('Empty States', Box),
      createTopic('Error States', AlertCircle),
      createTopic('Loading States', Zap),
      createTopic('Buyer Journey', Layers),
      createTopic('Seller Journey', Layers),
      createTopic('Marketplace Policies', ShieldAlert),
      createTopic('Trust & Safety Planning', Shield),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — MARKETPLACE ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Layers),
      createTopic('Authentication', Lock),
      createTopic('Cost Estimation', DollarSign),
      createTopic('Reviews & Ratings', Star),
      createTopic('Marketplace Fundamentals', BookOpen),
      createTopic('User Architecture', Users),
      createTopic('Authorization', Shield),
      createTopic('Listing System', List),
      createTopic('Search Architecture', Search),
      createTopic('Payments Architecture', CreditCard),
      createTopic('Messaging System', MessageSquare),
      createTopic('Dispute Resolution', FileWarning),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Authentication', Lock),
      createTopic('Database', Database),
      createTopic('Backend', Server),
      createTopic('Frontend', Code),
      createTopic('Payments', CreditCard),
      createTopic('Notifications', Activity),
      createTopic('Search', Search),
      createTopic('Analytics', BarChart),
      createTopic('Admin Panel', Settings),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
      createTopic('Authorization', Shield),
      createTopic('Listings', List),
      createTopic('Messaging', MessageSquare),
      createTopic('Reviews', Star),
      createTopic('Moderation Tools', ShieldAlert),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Performance Optimization', Zap),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Activity),
      createTopic('Caching', Database),
      createTopic('Backups', Cloud),
      createTopic('CI/CD', Rocket),
      createTopic('Fraud Prevention', ShieldAlert),
      createTopic('Scalability Planning', TrendingUp),
      createTopic('Abuse Detection', ShieldAlert),
    ]
  },
  {
    id: 'phase-5-launch',
    name: 'PHASE 5 — LAUNCH',
    topics: [
      createTopic('Privacy Policy', Shield),
      createTopic('Terms of Service', FileText),
      createTopic('Beta Testing', Target),
      createTopic('Seller Onboarding', Users),
      createTopic('Buyer Onboarding', Users),
      createTopic('Analytics Setup', BarChart),
      createTopic('SEO', Search),
      createTopic('Legal Documents', FileText),
      createTopic('Marketplace Policies', HelpCircle),
      createTopic('Refund Policies', CreditCard),
      createTopic('Launch Checklist', ListChecks),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Activity),
      createTopic('Referral Programs', Share2),
      createTopic('Roadmap', Layers),
      createTopic('Scaling Strategy', Globe),
      createTopic('Supply Growth', TrendingUp),
      createTopic('Demand Growth', TrendingUp),
      createTopic('Reviews Optimization', Star),
      createTopic('Marketplace Liquidity', Zap),
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
