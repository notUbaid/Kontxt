import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, MessageSquare, Presentation, AlertCircle, Map, Bluetooth,
  CreditCard, Bell, Cloud, Smartphone, Battery, Watch, Lock, BookOpen
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const mobileProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Idea Definition', Rocket, [], 'mobileideadefinition'),
      createTopic('Problem Statement', AlertCircle, [], 'mobileproblemstatement'),
      createTopic('Use Cases', Target, [], 'mobileusecases'),
      createTopic('User Journey', Globe, [], 'mobileuserjourney'),
      createTopic('Target Audience', Users, [], 'mobiletargetaudience'),
      createTopic('Personas', Users, [], 'mobilepersonas'),
      createTopic('Solution Statement', CheckSquare, [], 'mobilesolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [], 'mobileelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [], 'mobilecompetitoranalysis'),
      createTopic('Similar Apps', Layers, [], 'mobilesimilarapps'),
      createTopic('Play Store Research', Search),
      createTopic('App Store Research', Search),
      createTopic('Feature Planning', CheckSquare, [], 'mobilefeatureplanning'),
      createTopic('MVP Features', Rocket, [], 'mobilemvpfeatures'),
      createTopic('Future Features', Layers, [], 'mobilefuturefeatures'),
      createTopic('Feature Prioritization', BarChart, [], 'mobilefeatureprioritization'),
      createTopic('Monetization', DollarSign, [], 'mobilemonetization'),
      createTopic('Free', DollarSign, [], 'mobilefree'),
      createTopic('Freemium', DollarSign, [], 'mobilefreemium'),
      createTopic('Subscription', DollarSign, [], 'mobilesubscription'),
      createTopic('Ads', DollarSign, [], 'mobileads'),
      createTopic('One-time Purchase', DollarSign, [], 'mobileonetimepurchase'),
      createTopic('Success Metrics', Activity, [], 'mobilesuccessmetrics'),
      createTopic('Retention', Users, [], 'mobileretention'),
      createTopic('DAU', Users, [], 'mobiledau'),
      createTopic('MAU', Users, [], 'mobilemau'),
      createTopic('Session Duration', Activity, [], 'mobilesessionduration'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'mobileprd'),
      createTopic('User Flows', Globe, [], 'mobileuserflows'),
      createTopic('App Navigation', Smartphone, [], 'appnavigation'),
      createTopic('Wireframes', Box, [], 'mobilewireframes'),
      createTopic('Design System', PenTool, [], 'mobiledesignsystem'),
      createTopic('Branding', Target, [], 'mobilebranding'),
      createTopic('Accessibility', Users, [], 'mobileaccessibility'),
      createTopic('Empty States', Box, [], 'mobileemptystates'),
      createTopic('Error States', AlertCircle, [], 'mobileerrorstates'),
      createTopic('Loading States', Activity, [], 'mobileloadingstates'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — MOBILE ARCHITECTURE',
    topics: [
      createTopic('Platform Strategy', Smartphone, [], 'mobileplatformstrategy'),
      createTopic('Mobile Fundamentals', BookOpen, [], 'mobilefundamentals'),
      createTopic('Tech Stack Selection', Settings, [], 'mobiletechstackselection'),
      createTopic('State Management Architecture', Layers, [], 'mobilestatemanagement'),
      createTopic('API Strategy', Globe, [], 'mobileapistrategy'),
      createTopic('Local Storage Strategy', Database, [], 'mobilelocalstorage'),
      createTopic('Authentication', Key, [], 'mobileauthentication'),
      createTopic('Database Schema', Database, [], 'mobiledatabase'),
      createTopic('Backend Architecture', Server, [], 'mobilebackend'),
      createTopic('Push Notification Strategy', Bell, [], 'mobilepushnotifications'),
      createTopic('Deep Linking', Globe, [], 'mobiledeeplinking'),
      createTopic('File Storage', Cloud, [], 'mobilefilestorage'),
      createTopic('Offline Strategy', Cloud, [], 'mobileofflinestrategy'),
      createTopic('Analytics Strategy', BarChart, [], 'mobileanalyticsstrategy'),
      createTopic('Cost Estimation', DollarSign, [], 'mobilecostestimation'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('State Management', Layers),
      createTopic('Auth', Key),
      createTopic('Database', Database),
      createTopic('Backend', Server),
      createTopic('Push Notifications', Bell),
      createTopic('Frontend (UI)', Box),
      createTopic('Navigation', Smartphone),
      createTopic('APIs', Globe),
      createTopic('Payments', CreditCard),
      createTopic('Media Uploads', Cloud),
      createTopic('Maps & Location', Map),
      createTopic('Device Permissions', Lock),
      createTopic('Offline Features', Cloud),
      createTopic('Analytics Events', BarChart),
      createTopic('Error Handling', AlertCircle),
      createTopic('Testing', CheckSquare),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Performance Optimization', Zap),
      createTopic('Crash Reporting', AlertCircle),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Rate Limiting', Shield),
      createTopic('Backups', Database),
      createTopic('CI/CD', Settings),
      createTopic('Infrastructure', Server),
      createTopic('App Size Optimization', Smartphone),
      createTopic('Battery Optimization', Battery),
      createTopic('Scalability', BarChart),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Play Store Setup', Smartphone),
      createTopic('App Store Setup', Smartphone),
      createTopic('App Icons', Box),
      createTopic('Screenshots', Smartphone),
      createTopic('Feature Graphics', PenTool),
      createTopic('Store Listing SEO', Search),
      createTopic('Privacy Policy', FileText),
      createTopic('Terms of Service', FileText),
      createTopic('Content Rating', Shield),
      createTopic('Test Tracks', Settings),
      createTopic('Beta Testing', Users),
      createTopic('Release Checklist', CheckSquare),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Users),
      createTopic('Analytics', BarChart),
      createTopic('Notifications Strategy', Bell),
      createTopic('User Feedback', MessageSquare),
      createTopic('Reviews & Ratings', Target),
      createTopic('Referral Programs', Users),
      createTopic('Roadmap', Globe),
      createTopic('Scaling Strategy', BarChart),
    ]
  }
];

export const mobileHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
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
      createTopic('Tech Stack', Settings),
      createTopic('Database', Database),
      createTopic('Auth (Optional)', Key),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Backend', Server),
      createTopic('Frontend', Box),
      createTopic('Demo Data', Database),
      createTopic('Play Store Mockups', Smartphone),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

export const mobilePersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY',
    topics: [
      createTopic('PRD', FileText),
      createTopic('Discovery', Rocket),
      createTopic('Design', PenTool),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings),
      createTopic('Auth', Key),
      createTopic('Database', Database),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Backend', Server),
      createTopic('Push Notifications', Bell),
      createTopic('Analytics', BarChart),
    ]
  },
  {
    id: 'production',
    name: 'PHASE 4 — PRODUCTION',
    topics: [
      createTopic('Basic Security', Shield),
      createTopic('Performance', Zap),
      createTopic('Deployment', Cloud),
      createTopic('Play Store Setup', Smartphone),
      createTopic('Privacy Policy', FileText),
    ]
  },
  {
    id: 'growth',
    name: 'PHASE 5 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare),
      createTopic('Roadmap', Globe),
    ]
  }
];

// Combine all possible topics for custom mode
export const mobileCustomTaxonomy: Category[] = [
  ...mobileProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Ads', DollarSign),
          createTopic('Demo Data', Database),
          createTopic('Play Store Mockups', Smartphone),
          createTopic('Multi-language', Globe),
          createTopic('Subscription Billing', DollarSign),
          createTopic('Referral System', Users),
          createTopic('Wearables', Watch),
          createTopic('Widgets', Box),
          createTopic('Background Services', Settings),
          createTopic('Bluetooth', Bluetooth),
          createTopic('NFC', Smartphone),
          createTopic('Camera', Smartphone),
          createTopic('Location Services', Map),
          createTopic('Social Login', Users)
    ]
      };
    }
    if (cat.id === 'phase-5') {
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

// Helper BookOpen since it's missing from import, oh wait I didn't import BookOpen
// Let's ensure BookOpen is in the lucide-react import above!
