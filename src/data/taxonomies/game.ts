import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, ShieldAlert,
  Target, Users, BarChart, DollarSign, ListChecks,
  MessageSquare, TrendingUp, AlertCircle, Network, Globe, Server, 
  Gamepad2, Music, Cpu, HardDrive, PlayCircle, Trophy, Crown, Play,
  Monitor, Archive, LayoutTemplate, Palette, RefreshCcw, LayoutDashboard, Film, Clock, Smartphone, Camera
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const gameProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — GAME DISCOVERY',
    topics: [
      createTopic('Target Audience', Users),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Monetization', DollarSign),
      createTopic('Game Concept', Target),
      createTopic('Genre', Gamepad2),
      createTopic('Target Platform', Monitor),
      createTopic('Scope Reality Check', AlertCircle),
      createTopic('Core Gameplay Loop', PlayCircle),
      createTopic('Scope Planning', Layers),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — GAME DESIGN',
    topics: [
      createTopic('Game Design Document (GDD)', FileText),
      createTopic('Core Mechanics', Settings),
      createTopic('Game Rules', ListChecks),
      createTopic('Player Progression', TrendingUp),
      createTopic('Economy Design', DollarSign),
      createTopic('Level Design', Box),
      createTopic('Characters', Users),
      createTopic('Story', BookOpen),
      createTopic('Quests', Target),
      createTopic('Achievements', Trophy),
      createTopic('Inventory System', Archive),
      createTopic('Balancing', Activity),
      createTopic('UI/UX Design', LayoutTemplate),
      createTopic('Art Direction', Palette),
      createTopic('Sound Design', Music),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — GAME ARCHITECTURE',
    topics: [
      createTopic('Backend Architecture', Server),
      createTopic('Cost Estimation', DollarSign),
      createTopic('Engine Selection', Cpu),
      createTopic('Architecture Fundamentals', Layers),
      createTopic('Game Loop', RefreshCcw),
      createTopic('Game States', Activity),
      createTopic('Scene Management', Box),
      createTopic('Event Systems', Zap),
      createTopic('Save Systems', HardDrive),
      createTopic('Input Systems', Gamepad2),
      createTopic('Data Architecture', Database),
      createTopic('Cloud Saves', Cloud),
      createTopic('Multiplayer Architecture', Network),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Backend', Server),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
      createTopic('Core Gameplay', Play),
      createTopic('UI Systems', LayoutDashboard),
      createTopic('Save System', HardDrive),
      createTopic('Audio', Music),
      createTopic('Animation', Film),
      createTopic('Physics', Activity),
      createTopic('AI Systems', Cpu),
      createTopic('Inventory', Archive),
      createTopic('Economy', DollarSign),
      createTopic('Levels', Box),
      createTopic('Multiplayer', Users),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Analytics', BarChart),
      createTopic('Security', Shield),
      createTopic('Performance Optimization', Zap),
      createTopic('Crash Reporting', AlertCircle),
      createTopic('Monitoring', Monitor),
      createTopic('CI/CD', Rocket),
      createTopic('FPS Optimization', Activity),
      createTopic('Memory Optimization', Cpu),
      createTopic('Loading Optimization', Clock),
      createTopic('Anti-Cheat', ShieldAlert),
      createTopic('Cloud Infrastructure', Cloud),
    ]
  },
  {
    id: 'phase-5-release',
    name: 'PHASE 5 — RELEASE',
    topics: [
      createTopic('App Store Setup', Smartphone),
      createTopic('Screenshots', Camera),
      createTopic('Beta Testing', Target),
      createTopic('Release Checklist', ListChecks),
      createTopic('Store Assets', Camera),
      createTopic('Steam Setup', Globe),
      createTopic('Trailers', Film),
      createTopic('Community Testing', Users),
    ]
  },
  {
    id: 'phase-6-live-operations',
    name: 'PHASE 6 — LIVE OPERATIONS',
    topics: [
      createTopic('Retention', TrendingUp),
      createTopic('Roadmap', Layers),
      createTopic('Player Feedback', MessageSquare),
      createTopic('Balancing', Activity),
      createTopic('Updates', RefreshCcw),
      createTopic('Seasonal Content', Crown),
      createTopic('Community Management', Users),
      createTopic('Monetization Optimization', DollarSign),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return gameProductionTaxonomy.map(cat => {
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

export const gameHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Game Concept', 'Core Gameplay Loop', 'Game Design Document (GDD)', 'Core Mechanics', 
    'Engine Selection', 'Core Gameplay', 'UI Systems', 'Demo Assets', 'Pitch Deck', 
    'Demo Script', 'Submission Checklist',
    // Mapped aliases
    'Demo Data', 'UI/UX Design', 'Gameplay'
  ],
  [
    'Multiplayer Architecture', 'Multiplayer', 'Analytics', 'Live Operations', 'Anti-Cheat', 
    'Cloud Infrastructure', 'Steam Setup', 'App Store Setup'
  ]
);

export const gamePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Multiplayer Infrastructure', 'Advanced Analytics', 'Live Service Complexity',
    'Multiplayer Architecture', 'Multiplayer', 'Anti-Cheat', 'Cloud Infrastructure', 'Live Operations'
  ]
);

export const gameCustomTaxonomy = gameProductionTaxonomy;
