import os
import re

def parse_taxonomy(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modes = {
        'Production': [],
        'Personal': [],
        'Hackathon': []
    }
    
    import json
    
    production_topics = re.findall(r"createTopic\('([^']+)'", content)
    
    hackathon_match = re.search(r'export const mobileHackathonTaxonomy.*?(?:filterTaxonomy\s*\(\s*\[(.*?)\]\s*,\s*\[(.*?)\]\s*\))', content, re.DOTALL)
    personal_match = re.search(r'export const mobilePersonalTaxonomy.*?(?:filterTaxonomy\s*\(\s*\[(.*?)\]\s*,\s*\[(.*?)\]\s*\))', content, re.DOTALL)

    def extract_list(s):
        if not s: return []
        items = re.findall(r"'([^']+)'", s)
        return items
    
    modes['Production'] = production_topics
    
    if hackathon_match:
        keep = extract_list(hackathon_match.group(1))
        hide = extract_list(hackathon_match.group(2))
        modes['Hackathon'] = [t for t in production_topics if t not in hide and (not keep or t in keep)]
    
    if personal_match:
        keep = extract_list(personal_match.group(1))
        hide = extract_list(personal_match.group(2))
        modes['Personal'] = [t for t in production_topics if t not in hide and (not keep or t in keep)]
        
    return modes

taxonomy = parse_taxonomy('src/data/taxonomies/mobile.ts')
print("Taxonomy topics count:")
print("Production:", len(taxonomy['Production']))
print("Personal:", len(taxonomy['Personal']))
print("Hackathon:", len(taxonomy['Hackathon']))

base_dir = 'src/data/content/Mobile-App'

def to_slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

for mode, topics in taxonomy.items():
    print(f"\nChecking mode: {mode}")
    expected_files = set()
    for topic in topics:
        slug = to_slug(topic)
        filename = f"{slug}-{mode.lower()}-mobile-app.md"
        expected_files.add(filename)
    
    mode_dir = os.path.join(base_dir, mode)
    actual_files = set()
    if os.path.exists(mode_dir):
        actual_files = set(f for f in os.listdir(mode_dir) if f.endswith('.md'))
    else:
        print(f"Directory {mode_dir} does not exist!")
    
    missing = expected_files - actual_files
    extra = actual_files - expected_files
    
    print(f"Expected files: {len(expected_files)}")
    print(f"Actual files: {len(actual_files)}")
    if missing:
        print(f"Missing ({len(missing)}):")
        for f in sorted(list(missing)):
            print("  ", f)
    if extra:
        print(f"Extra ({len(extra)}):")
        for f in sorted(list(extra)):
            print("  ", f)
