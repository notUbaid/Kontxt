import re

with open('src/data/taxonomies/mobile.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to completely rewrite the bottom part of mobile.ts

new_bottom = """
export const mobileCustomTaxonomy: Category[] = [
  ...mobileProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Ads', DollarSign, [{name:'Google AdMob',url:'https://admob.google.com/'}], 'mobileads'),
          createTopic('Demo Data', Database, [{name:'Falso (Mock Data)',url:'https://ngneat.github.io/falso/'}], 'mobiledemodata'),
          createTopic('Play Store Mockups', Smartphone, [{name:'Figma Store Templates',url:'https://www.figma.com/community/tag/app-store'}], 'mobileplaystoremockups'),
          createTopic('Multi-language', Globe, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilemultilanguage'),
          createTopic('Subscription Billing', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesubscriptionbilling'),
          createTopic('Wearables', Watch, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewearables'),
          createTopic('Widgets', Box, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewidgets'),
          createTopic('Background Services', Settings, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackgroundservices'),
          createTopic('Bluetooth', Bluetooth, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebluetooth'),
          createTopic('NFC', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilenfc'),
          createTopic('Camera', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilecamera'),
          createTopic('Location Services', Map, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilelocationservices'),
          createTopic('UI Polish', PenTool, [], 'mobileuipolish'),
          createTopic('Animations', Zap, [], 'mobileanimations'),
          createTopic('Microinteractions', Activity, [], 'mobilemicrointeractions'),
          createTopic('Native Device Features', Smartphone, [], 'mobilenativedevicefeatures')
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
          createTopic('Submission Checklist', CheckSquare),
          createTopic('Presentation Prep', Presentation)
        ]
      };
    }
    return cat;
  })
];

export const mobileHackathonTaxonomy: Category[] = filterTaxonomy(mobileCustomTaxonomy, ['Welcome', 'Idea Definition', 'MVP', 'PRD', 'Design System', 'UI Polish', 'Animations', 'Loading States', 'Microinteractions', 'Tech Stack', 'Database Setup', 'Auth Implementation', 'Backend Integration', 'Frontend', 'Native Device Features', 'App Permissions Strategy', 'Demo Data', 'Play Store Mockups', 'Pitch Deck', 'Demo Script', 'Submission Checklist', 'Presentation Prep'], []);

export const mobilePersonalTaxonomy: Category[] = filterTaxonomy(mobileCustomTaxonomy, ['Welcome', 'Idea Definition', 'PRD', 'Platform Guidelines', 'Design System', 'Responsive Layouts', 'App Navigation', 'Tech Stack', 'State Management Impl', 'Database', 'Authentication', 'Offline Strategy', 'Frontend', 'App Lifecycle', 'Backend', 'App Permissions Strategy', 'Push Notifications', 'Testing', 'Security', 'Performance Optimization', 'Play Store Setup', 'App Store Setup', 'Privacy Policy', 'Analytics', 'User Feedback', 'Roadmap', 'Presentation Prep', 'Pitch Deck', 'Demo Script', 'Submission Checklist'], []);
"""

# Replace everything from `export const mobileHackathonTaxonomy` to the end of the file.
new_content = re.sub(r'export const mobileHackathonTaxonomy.*', new_bottom, content, flags=re.DOTALL)

with open('src/data/taxonomies/mobile.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
