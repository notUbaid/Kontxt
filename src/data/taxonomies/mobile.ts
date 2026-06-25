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
    name: 'PHASE 3 – DEVELOPMENT',
    topics: [
      createTopic('State Management', Layers, [], 'mobilestatemanagementimplementation'),
      createTopic('Auth', Key, [], 'mobileauth'),
      createTopic('Database', Database, [], 'mobiledatabaseimplementation'),
      createTopic('Backend', Server, [], 'mobilebackendimplementation'),
      createTopic('Push Notifications', Bell, [], 'mobilepushnotificationsimplementation'),
      createTopic('Frontend (UI)', Box, [], 'mobilefrontendui'),
      createTopic('Navigation', Smartphone, [], 'mobilenavigation'),
      createTopic('APIs', Globe, [], 'mobileapis'),
      createTopic('Payments', CreditCard, [], 'mobilepayments'),
      createTopic('Media Uploads', Cloud, [], 'mobilemediauploads'),
      createTopic('Maps & Location', Map, [], 'mobilemapslocation'),
      createTopic('Device Permissions', Lock, [], 'mobiledevicepermissions'),
      createTopic('Offline Features', Cloud, [], 'mobileofflinefeatures'),
      createTopic('Analytics Events', BarChart, [], 'mobileanalyticsevents'),
      createTopic('Error Handling', AlertCircle, [], 'mobileerrorhandling'),
      createTopic('Testing', CheckSquare, [], 'mobiletesting'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [], 'mobilesecurity'),
      createTopic('Performance Optimization', Zap, [], 'mobileperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [], 'mobilecrashreporting'),
      createTopic('Monitoring', Activity, [], 'mobilemonitoring'),
      createTopic('Logging', FileText, [], 'mobilelogging'),
      createTopic('Rate Limiting', Shield, [], 'mobileratelimiting'),
      createTopic('Backups', Database, [], 'mobilebackups'),
      createTopic('CI/CD', Settings, [], 'mobilecicd'),
      createTopic('Infrastructure', Server, [], 'mobileinfrastructure'),
      createTopic('App Size Optimization', Smartphone, [], 'mobileappsizeoptimization'),
      createTopic('Battery Optimization', Battery, [], 'mobilebatteryoptimization'),
      createTopic('Scalability', BarChart, [], 'mobilescalability'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Play Store Setup', Smartphone, [], 'mobileplaystoresetup'),
      createTopic('App Store Setup', Smartphone, [], 'mobileappstoresetup'),
      createTopic('App Icons', Box, [], 'mobileappicons'),
      createTopic('Screenshots', Smartphone, [], 'mobilescreenshots'),
      createTopic('Feature Graphics', PenTool, [], 'mobilefeaturegraphics'),
      createTopic('Store Listing SEO', Search, [], 'mobilestorelistingseo'),
      createTopic('Privacy Policy', FileText, [], 'mobileprivacypolicy'),
      createTopic('Terms of Service', FileText, [], 'mobiletermsofservice'),
      createTopic('Content Rating', Shield, [], 'mobilecontentrating'),
      createTopic('Test Tracks', Settings, [], 'mobiletesttracks'),
      createTopic('Beta Testing', Users, [], 'mobilebetatesting'),
      createTopic('Release Checklist', CheckSquare, [], 'mobilereleasechecklist'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Users, [], 'mobileretention'),
      createTopic('Analytics', BarChart, [], 'mobileanalytics'),
      createTopic('Notifications Strategy', Bell, [], 'mobilenotificationsstrategy'),
      createTopic('User Feedback', MessageSquare, [], 'mobileuserfeedback'),
      createTopic('Reviews & Ratings', Target, [], 'mobilereviewsratings'),
      createTopic('Referral Programs', Users, [], 'mobilereferralprograms'),
      createTopic('Roadmap', Globe, [], 'mobileroadmap'),
      createTopic('Scaling Strategy', BarChart, [], 'mobilescalingstrategy'),
    ]
  }
];

export const mobileHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket, [], 'mobileideadefinition'),
      createTopic('MVP Features', CheckSquare, [], 'mobilemvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [], 'mobileprd'),
      createTopic('User Flows', Globe, [], 'mobileuserflows'),
      createTopic('Design System', PenTool, [], 'mobiledesignsystem'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2',
    topics: [
      createTopic('Tech Stack', Settings, [], 'mobiletechstack'),
      createTopic('Database', Database, [], 'mobiledatabase'),
      createTopic('Auth (Optional)', Key, [], 'mobileauth'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Backend', Server, [], 'mobilebackend'),
      createTopic('Frontend', Box, [], 'mobilefrontendui'),
      createTopic('Demo Data', Database, [], 'mobiledemodata'),
      createTopic('Play Store Mockups', Smartphone, [], 'mobileplaystoremockups'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation, [], 'mobilepitchdeck'),
      createTopic('Demo Script', FileText, [], 'mobiledemoscript'),
      createTopic('Submission Checklist', CheckSquare, [], 'mobilesubmissionchecklist'),
    ]
  }
];

export const mobilePersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY',
    topics: [
      createTopic('PRD', FileText, [], 'mobileprd'),
      createTopic('User Research', Rocket, [], 'mobileuserresearch'),
      createTopic('Design System', PenTool, [], 'mobiledesignsystem'),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [], 'mobiletechstack'),
      createTopic('Auth', Key, [], 'mobileauth'),
      createTopic('Database', Database, [], 'mobiledatabase'),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Backend', Server, [], 'mobilebackend'),
      createTopic('Push Notifications', Bell, [], 'mobilepushnotificationsimplementation'),
      createTopic('Analytics', BarChart, [], 'mobileanalyticsevents'),
    ]
  },
  {
    id: 'production',
    name: 'PHASE 4 — PRODUCTION',
    topics: [
      createTopic('Security', Shield, [], 'mobilesecurity'),
      createTopic('Performance', Zap, [], 'mobileperformanceoptimization'),
      createTopic('Infrastructure', Cloud, [], 'mobileinfrastructure'),
      createTopic('Play Store Setup', Smartphone, [], 'mobileplaystoresetup'),
      createTopic('Privacy Policy', FileText, [], 'mobileprivacypolicy'),
    ]
  },
  {
    id: 'growth',
    name: 'PHASE 5 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare, [], 'mobilefeedback'),
      createTopic('Roadmap', Globe, [], 'mobileroadmap'),
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
          createTopic('Ads', DollarSign, [], 'mobileads'),
          createTopic('Demo Data', Database, [], 'mobiledemodata'),
          createTopic('Play Store Mockups', Smartphone, [], 'mobileplaystoremockups'),
          createTopic('Multi-language', Globe, [], 'mobilemultilanguage'),
          createTopic('Subscription Billing', DollarSign, [], 'mobilesubscriptionbilling'),
          createTopic('Referral Programs', Users, [], 'mobilereferralprograms'),
          createTopic('Wearables', Watch, [], 'mobilewearables'),
          createTopic('Widgets', Box, [], 'mobilewidgets'),
          createTopic('Background Services', Settings, [], 'mobilebackgroundservices'),
          createTopic('Bluetooth', Bluetooth, [], 'mobilebluetooth'),
          createTopic('NFC', Smartphone, [], 'mobilenfc'),
          createTopic('Camera', Smartphone, [], 'mobilecamera'),
          createTopic('Location Services', Map, [], 'mobilelocationservices'),
          createTopic('Auth', Key, [], 'mobileauth')
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
