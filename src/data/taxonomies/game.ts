import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, ShieldAlert,
  Target, Users, BarChart, DollarSign, ListChecks,
  MessageSquare, TrendingUp, AlertCircle, Network, Globe, Server, 
  Gamepad2, Music, Cpu, HardDrive, PlayCircle, Trophy, Crown, Play,
  Monitor, Archive, LayoutTemplate, Palette, RefreshCcw, LayoutDashboard, Film, Clock, Smartphone, Camera
, Presentation , HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const gameProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — GAME DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Target Audience', Users, [{name:'Bartle Taxonomy of Player Types',url:'https://en.wikipedia.org/wiki/Bartle_taxonomy_of_player_types'}], 'gametargetaudience'),
      createTopic('Competitor Analysis', BarChart, [{name:'GameDiscoverCo',url:'https://gamediscover.co/'}], 'gamecompetitoranalysis'),
      createTopic('Monetization', DollarSign, [{name:'Steam Pricing Guide',url:'https://partner.steamgames.com/doc/store/pricing'}], 'gamemonetization'),
      createTopic('Game Concept', Target, [{name:'GDC: 30 Things I Hate About Your Game Pitch',url:'https://www.youtube.com/watch?v=4LTtr45y7P0'}], 'gamegameconcept'),
      createTopic('Genre', Gamepad2, [{name:'SteamDB',url:'https://steamdb.info/'}], 'gamegenre'),
      createTopic('Target Platform', Monitor, [{name:'Unity Platform Guidelines',url:'https://docs.unity3d.com/Manual/PlatformSpecific.html'}], 'gametargetplatform'),
      createTopic('Scope Reality Check', AlertCircle, [{name:'Your First Game Should Be A Joke',url:'https://www.youtube.com/watch?v=z06QR-tz1_o'}], 'gamescoperealitycheck'),
      createTopic('Core Gameplay Loop', PlayCircle, [{name:'Game Feel (Juice it or lose it)',url:'https://www.youtube.com/watch?v=Fy0aCDmgnxg'}], 'gamecoregameplayloop'),
      createTopic('Scope Planning', Layers, [{name:'The Door Problem',url:'https://lizengland.com/blog/2014/04/the-door-problem/'}], 'gamescopeplanning'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — GAME DESIGN',
    topics: [
      createTopic('Game Design Document (GDD)', FileText, [{name:'GDD Template (Notion)',url:'https://www.notion.so/templates/game-design-document-gdd'}], 'gamegamedesigndocumentgdd'),
      createTopic('Core Mechanics', Settings, [{name:'MDA Framework',url:'https://users.cs.northwestern.edu/~hunicke/MDA.pdf'}], 'gamecoremechanics'),
      createTopic('Game Rules', ListChecks, [{name:'GDC: Rules of Play',url:'https://gdcvault.com/'}], 'gamegamerules'),
      createTopic('Player Progression', TrendingUp, [{name:'Machinations: Game Economies',url:'https://machinations.io/'}], 'gameplayerprogression'),
      createTopic('Economy Design', DollarSign, [{name:'Designing Virtual Economies',url:'https://www.amazon.com/Virtual-Economies-Design-Analysis/dp/0262027259'}], 'gameeconomydesign'),
      createTopic('Level Design', Box, [{name:'Super Mario 3D World Level Design',url:'https://www.youtube.com/watch?v=dBmIkEvEBtA'}], 'gameleveldesign'),
      createTopic('Characters', Users, [{name:'Silhouette Design',url:'https://www.ctrlpaint.com/videos/silhouettes'}], 'gamecharacters'),
      createTopic('Story', BookOpen, [{name:'Ink (Narrative Scripting)',url:'https://www.inklestudios.com/ink/'}], 'gamestory'),
      createTopic('Quests', Target, [{name:'Witcher 3 Quest Design',url:'https://www.youtube.com/watch?v=S3nB32_3jBw'}], 'gamequests'),
      createTopic('Achievements', Trophy, [{name:'Steamworks Achievements',url:'https://partner.steamgames.com/doc/features/achievements'}], 'gameachievements'),
      createTopic('Inventory System', Archive, [{name:'Scriptable Objects Inventory',url:'https://learn.unity.com/tutorial/introduction-to-scriptable-objects'}], 'gameinventorysystem'),
      createTopic('Balancing', Activity, [{name:'Spreadsheet Balancing',url:'https://www.gamedeveloper.com/design/spreadsheet-driven-game-design'}], 'gamebalancing'),
      createTopic('UI/UX Design', LayoutTemplate, [{name:'Game UI Database',url:'https://www.gameuidatabase.com/'}], 'gameuiuxdesign'),
      createTopic('Art Direction', Palette, [{name:'Guilty Gear Xrd Art Style',url:'https://www.youtube.com/watch?v=yhGjCzxJV3E'}], 'gameartdirection'),
      createTopic('Sound Design', Music, [{name:'FMOD Middleware',url:'https://www.fmod.com/'}], 'gamesounddesign'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — GAME ARCHITECTURE',
    topics: [
      createTopic('Backend Architecture', Server, [{name:'Agones (Game Servers on K8s)',url:'https://agones.dev/'}], 'gamebackendarchitecture'),
      createTopic('Cost Estimation', DollarSign, [{name:'AWS GameLift Pricing',url:'https://aws.amazon.com/gamelift/pricing/'}], 'gamecostestimation'),
      createTopic('Engine Selection', Cpu, [{name:'Godot Engine Docs',url:'https://docs.godotengine.org/'}], 'gameengineselection'),
      createTopic('Architecture Fundamentals', Layers, [{name:'Game Programming Patterns',url:'https://gameprogrammingpatterns.com/'}], 'gamearchitecturefundamentals'),
      createTopic('Game Loop', RefreshCcw, [{name:'Fix Your Timestep!',url:'https://gafferongames.com/post/fix_your_timestep/'}], 'gamegameloop'),
      createTopic('Game States', Activity, [{name:'Finite State Machines',url:'https://gameprogrammingpatterns.com/state.html'}], 'gamegamestates'),
      createTopic('Scene Management', Box, [{name:'Unreal World Partition',url:'https://docs.unrealengine.com/5.0/en-US/world-partition-in-unreal-engine/'}], 'gamescenemanagement'),
      createTopic('Event Systems', Zap, [{name:'Observer Pattern',url:'https://gameprogrammingpatterns.com/observer.html'}], 'gameeventsystems'),
      createTopic('Save Systems', HardDrive, [{name:'MessagePack serialization',url:'https://msgpack.org/'}], 'gamesavesystems'),
      createTopic('Input Systems', Gamepad2, [{name:'Unity New Input System',url:'https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/index.html'}], 'gameinputsystems'),
      createTopic('Data Architecture', Database, [{name:'Entity Component System (ECS)',url:'https://en.wikipedia.org/wiki/Entity_component_system'}], 'gamedataarchitecture'),
      createTopic('Cloud Saves', Cloud, [{name:'Steam Cloud',url:'https://partner.steamgames.com/doc/features/cloud'}], 'gamecloudsaves'),
      createTopic('Multiplayer Architecture', Network, [{name:'Source Multiplayer Networking',url:'https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking'}], 'gamemultiplayerarchitecture'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Backend', Server, [{name:'Epic Online Services',url:'https://dev.epicgames.com/en-US/services'}], 'gamebackend'),
      createTopic('Testing', CheckSquare, [{name:'Unity Test Framework',url:'https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/index.html'}], 'gametesting'),
      createTopic('Documentation', BookOpen, [{name:'Doxygen',url:'https://doxygen.nl/'}], 'gamedocumentation'),
      createTopic('Core Gameplay', Play, [{name:'Unreal Gameplay Ability System',url:'https://docs.unrealengine.com/5.0/en-US/gameplay-ability-system-for-unreal-engine/'}], 'gamecoregameplay'),
      createTopic('UI Systems', LayoutDashboard, [{name:'Unreal UMG',url:'https://docs.unrealengine.com/5.0/en-US/umg-ui-designer-for-unreal-engine/'}], 'gameuisystems'),
      createTopic('Save System', HardDrive, [{name:'Serialization in C++',url:'https://isocpp.org/wiki/faq/serialization'}], 'gamesavesystem'),
      createTopic('Audio', Music, [{name:'Wwise',url:'https://www.audiokinetic.com/en/products/wwise/'}], 'gameaudio'),
      createTopic('Animation', Film, [{name:'Animation Blend Trees',url:'https://docs.unity3d.com/Manual/class-BlendTree.html'}], 'gameanimation'),
      createTopic('Physics', Activity, [{name:'Jolt Physics',url:'https://github.com/jrouwe/JoltPhysics'}], 'gamephysics'),
      createTopic('AI Systems', Cpu, [{name:'Behavior Trees',url:'https://www.gamedeveloper.com/programming/behavior-trees-for-ai-how-they-work'}], 'gameaisystems'),
      createTopic('Inventory', Archive, [{name:'Diablo Inventory Math',url:'https://www.gamedeveloper.com/design/diablo-s-inventory-design'}], 'gameinventory'),
      createTopic('Economy', DollarSign, [{name:'Virtual Economy Dynamics',url:'https://gdcvault.com/'}], 'gameeconomy'),
      createTopic('Levels', Box, [{name:'Wave Function Collapse',url:'https://github.com/mxgmn/WaveFunctionCollapse'}], 'gamelevels'),
      createTopic('Multiplayer', Users, [{name:'GGPO (Rollback Netcode)',url:'https://www.ggpo.net/'}], 'gamemultiplayer'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Analytics', BarChart, [{name:'Unity Analytics',url:'https://unity.com/products/unity-analytics'}], 'gameanalytics'),
      createTopic('Security', Shield, [{name:'Dotfuscator',url:'https://www.preemptive.com/products/dotfuscator/overview'}], 'gamesecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Draw Call Batching',url:'https://docs.unity3d.com/Manual/DrawCallBatching.html'}], 'gameperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [{name:'Backtrace',url:'https://backtrace.io/'}], 'gamecrashreporting'),
      createTopic('Monitoring', Monitor, [{name:'Datadog for Gaming',url:'https://www.datadoghq.com/solutions/gaming/'}], 'gamemonitoring'),
      createTopic('CI/CD', Rocket, [{name:'Unity Cloud Build',url:'https://unity.com/products/cloud-build'}], 'gamecicd'),
      createTopic('FPS Optimization', Activity, [{name:'Object Pooling',url:'https://learn.unity.com/tutorial/object-pooling'}], 'gamefpsoptimization'),
      createTopic('Memory Optimization', Cpu, [{name:'Texture Compression (ASTC/ETC2)',url:'https://docs.unity3d.com/Manual/class-TextureImporterOverride.html'}], 'gamememoryoptimization'),
      createTopic('Loading Optimization', Clock, [{name:'Addressables',url:'https://docs.unity3d.com/Manual/com.unity.addressables.html'}], 'gameloadingoptimization'),
      createTopic('Anti-Cheat', ShieldAlert, [{name:'Easy Anti-Cheat',url:'https://www.easy.ac/en-us/'}], 'gameanticheat'),
      createTopic('Cloud Infrastructure', Cloud, [{name:'Google Cloud Game Servers',url:'https://cloud.google.com/game-servers'}], 'gamecloudinfrastructure'),
    ]
  },
  {
    id: 'phase-5-release',
    name: 'PHASE 5 — RELEASE',
    topics: [
      createTopic('App Store Setup', Smartphone, [{name:'App Store Guidelines',url:'https://developer.apple.com/app-store/review/guidelines/'}], 'gameappstoresetup'),
      createTopic('Screenshots', Camera, [{name:'Capsule Art Best Practices',url:'https://howtomarketagame.com/'}], 'gamescreenshots'),
      createTopic('Beta Testing', Target, [{name:'Steam Playtest',url:'https://partner.steamgames.com/doc/features/playtest'}], 'gamebetatesting'),
      createTopic('Release Checklist', ListChecks, [{name:'Steam Release Checklist',url:'https://partner.steamgames.com/doc/store/review_process'}], 'gamereleasechecklist'),
      createTopic('Store Assets', Camera, [{name:'Steam Graphical Assets',url:'https://partner.steamgames.com/doc/store/assets'}], 'gamestoreassets'),
      createTopic('Steam Setup', Globe, [{name:'Steamworks SDK',url:'https://partner.steamgames.com/'}], 'gamesteamsetup'),
      createTopic('Trailers', Film, [{name:'Derek Lieu Trailer Tips',url:'https://www.derek-lieu.com/'}], 'gametrailers'),
      createTopic('Community Testing', Users, [{name:'Discord for Game Devs',url:'https://discord.com/game-developers'}], 'gamecommunitytesting'),
    ]
  },
  {
    id: 'phase-6-live-operations',
    name: 'PHASE 6 — LIVE OPERATIONS',
    topics: [
      createTopic('Retention', TrendingUp, [{name:'Game Retention Metrics',url:'https://gameanalytics.com/blog/retention-metrics/'}], 'gameretention'),
      createTopic('Roadmap', Layers, [{name:'Public Roadmaps',url:'https://trello.com/b/roadmap'}], 'gameroadmap'),
      createTopic('Player Feedback', MessageSquare, [{name:'Handling Player Toxicity',url:'https://www.gdcvault.com/'}], 'gameplayerfeedback'),
      createTopic('Balancing', Activity, [{name:'Live Ops A/B Testing',url:'https://unity.com/products/game-growth'}], 'gamebalancing'),
      createTopic('Updates', RefreshCcw, [{name:'Steam Update Events',url:'https://partner.steamgames.com/doc/marketing/tools/events'}], 'gameupdates'),
      createTopic('Seasonal Content', Crown, [{name:'Live Ops Strategies',url:'https://www.gamesindustry.biz/'}], 'gameseasonalcontent'),
      createTopic('Community Management', Users, [{name:'Community Management Playbook',url:'https://www.gamedeveloper.com/'}], 'gamecommunitymanagement'),
      createTopic('Monetization Optimization', DollarSign, [{name:'Whale Conversion',url:'https://deltadna.com/blog/'}], 'gamemonetizationoptimization'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
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
    'Welcome',
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
