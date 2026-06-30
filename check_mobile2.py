import os
import re

def parse_taxonomy(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the mobileProductionTaxonomy block
    prod_block = re.search(r'export const mobileProductionTaxonomy: Category\[\] = \[(.*?)\];', content, re.DOTALL)
    prod_topics = re.findall(r"createTopic\('([^']+)'", prod_block.group(1)) if prod_block else []

    # Find Hackathon taxonomy
    hackathon_match = re.search(r"export const mobileHackathonTaxonomy.*?\[(.*?)\]", content, re.DOTALL)
    hackathon_topics = []
    if hackathon_match:
        hackathon_topics = re.findall(r"'([^']+)'", hackathon_match.group(1))

    # Find Personal taxonomy
    personal_match = re.search(r"export const mobilePersonalTaxonomy.*?\[(.*?)\]", content, re.DOTALL)
    personal_topics = []
    if personal_match:
        personal_topics = re.findall(r"'([^']+)'", personal_match.group(1))

    # Find Custom taxonomy (which represents Production for Kontxt usually? Actually Kontxt uses mobileCustomTaxonomy as the full production one? Let's check taxonomy registry).
    
    return {
        'Production': prod_topics,
        'Personal': personal_topics,
        'Hackathon': hackathon_topics
    }

taxonomy = parse_taxonomy('src/data/taxonomies/mobile.ts')
print("Taxonomy topics count (parsed):")
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
