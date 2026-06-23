import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Share2, Network, Code, Globe, Star, HelpCircle, CreditCard, Server, ShoppingCart, Tag, Package, Truck, Gift, RefreshCcw, Heart, PieChart, Layout, MonitorSmartphone
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const ecommerceProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — BUSINESS & STORE STRATEGY',
    topics: [
      createTopic('Store Fundamentals', BookOpen),
      createTopic('Business Definition', Target),
      createTopic('Brand Vision', Star),
      createTopic('Target Audience', Users),
      createTopic('Value Proposition', Gift),
      createTopic('Product Catalog Planning', List),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Store Economics', PieChart),
      createTopic('Pricing Strategy', DollarSign),
      createTopic('Success Metrics', TrendingUp),
      createTopic('MVP Scope', Layers),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — STORE DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('Customer Journey', Layers),
      createTopic('Store Architecture', Network),
      createTopic('Information Architecture', Box),
      createTopic('Product Page Design', Layout),
      createTopic('Checkout Flow', CreditCard),
      createTopic('Wireframes', Box),
      createTopic('Branding', Star),
      createTopic('Design System', Settings),
      createTopic('Accessibility', UserCheck),
      createTopic('Mobile Responsiveness', MonitorSmartphone),
      createTopic('Empty States', Box),
      createTopic('Loading States', Zap),
      createTopic('Error States', AlertCircle),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — E-COMMERCE ARCHITECTURE',
    topics: [
      createTopic('E-commerce Fundamentals', BookOpen),
      createTopic('Build vs Buy (Shopify)', HelpCircle),
      createTopic('Tech Stack Selection', Layers),
      createTopic('Product Architecture', Package),
      createTopic('Inventory Architecture', Database),
      createTopic('Cart Architecture', ShoppingCart),
      createTopic('Checkout Architecture', CreditCard),
      createTopic('Payment Architecture', DollarSign),
      createTopic('Customer Accounts', Users),
      createTopic('Shipping Architecture', Truck),
      createTopic('Search Architecture', Search),
      createTopic('Analytics Architecture', BarChart),
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
      createTopic('Products', Package),
      createTopic('Inventory', List),
      createTopic('Cart', ShoppingCart),
      createTopic('Checkout', CreditCard),
      createTopic('Payments', DollarSign),
      createTopic('Orders', Box),
      createTopic('Customer Accounts', Users),
      createTopic('Shipping', Truck),
      createTopic('Search', Search),
      createTopic('Wishlist', Heart),
      createTopic('Emails', MessageSquare),
      createTopic('Notifications', Activity),
      createTopic('Analytics', BarChart),
      createTopic('Admin Dashboard', Settings),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Payment Security', Lock),
      createTopic('Fraud Prevention', ShieldAlert),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Activity),
      createTopic('Caching', Database),
      createTopic('Backups', Cloud),
      createTopic('CI/CD', Rocket),
      createTopic('Performance Optimization', Zap),
      createTopic('Scalability Planning', TrendingUp),
    ]
  },
  {
    id: 'phase-5-launch',
    name: 'PHASE 5 — STORE LAUNCH',
    topics: [
      createTopic('Product Photography', Star),
      createTopic('Product Descriptions', FileText),
      createTopic('SEO Setup', Search),
      createTopic('Analytics Setup', BarChart),
      createTopic('Google Merchant Center', Globe),
      createTopic('Shipping Setup', Truck),
      createTopic('Taxes Setup', DollarSign),
      createTopic('Legal Documents', FileText),
      createTopic('Privacy Policy', Shield),
      createTopic('Terms of Service', FileText),
      createTopic('Refund Policy', CreditCard),
      createTopic('Return Policy', RefreshCcw),
      createTopic('Launch Checklist', ListChecks),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Conversion Optimization', TrendingUp),
      createTopic('Upsells', Tag),
      createTopic('Cross-Sells', Tag),
      createTopic('Email Marketing', MessageSquare),
      createTopic('Retention', Activity),
      createTopic('Loyalty Programs', Heart),
      createTopic('Referrals', Share2),
      createTopic('Analytics', BarChart),
      createTopic('Roadmap', Layers),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return ecommerceProductionTaxonomy.map(cat => {
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

export const ecommerceHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Store Concept', 'Product Catalog Planning', 'PRD', 'Customer Journey', 'Product Page Design', 
    'Cart', 'Checkout', 'Payments', 'Demo Products', 'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Mapped Aliases
    'Store Fundamentals'
  ],
  [
    'Inventory Architecture', 'Inventory', 'Fraud Prevention', 'SEO Setup', 'Shipping Architecture', 
    'Shipping Setup', 'Monitoring', 'Scalability Planning', 'Legal Documents'
  ]
);

export const ecommercePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Fraud Detection', 'Advanced Monitoring', 'Multi-region Infrastructure',
    'Fraud Prevention', 'Scalability Planning', 'Google Merchant Center'
  ]
);

export const ecommerceCustomTaxonomy = ecommerceProductionTaxonomy;
