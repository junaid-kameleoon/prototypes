import csv
import re
import os
import random

# Common prefixes to Add if missing
PROFESSIONAL_PREFIXES = ["Add ", "Enable ", "Support ", "Ability to ", "Implement "]

# Strings/Regex to strip from Details
NARRATIVE_PATTERNS = [
    r'(?i)My client.*?(says|wants|requested)',
    r'(?i)Client.*?(says|wants|requested)',
    r'(?i)User story\s*#?\d+',
    r'(?i)Pain Point:',
    r'(?i)Problem/Context',
    r'(?i)Project justification',
    r'(?i)Existing workaround',
    r'(?i)Workaround description',
    r'(?i)Solution:',
    r'(?i)Asked by.*?(?=\n|$)',
    r'(?i)Request by.*?(?=\n|$)',
    r'(?i)Request from.*?(?=\n|$)',
    r'(?i)Description:',
    r'(?i)^description:\s*', # residue
    r'---',
    r'https?://[^\s]+', # Remove raw links if they are just hanging there? Maybe keep specific docs? User said "remove garbage". Let's be careful.
    # Actually, keep links but maybe remove "Link:" prefix
]

def clean_narrative(text):
    if not text: return ""
    
    # 1. Remove specific narrative headers/introductions
    for pat in NARRATIVE_PATTERNS:
        text = re.sub(pat, ' ', text, flags=re.IGNORECASE)
        
    # 2. Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    # 3. Capitalize first letter
    if text:
        text = text[0].upper() + text[1:]
        
    return text

def professionalize_title(title):
    if not title: return "Feature Request"
    
    # If title is all lowercase, title case it
    if title.islower():
        title = title.title()
        
    # Check if it already has a verb
    has_verb = False
    # Simple check for existing prefixes
    existing_prefixes = ["Add", "Enable", "Support", "Allow", "Create", "Update", "Remove", "Fix", "Implement", "Integrate", "Ability"]
    for prefix in existing_prefixes:
        if title.lower().startswith(prefix.lower()):
            has_verb = True
            break
            
    if not has_verb:
        # Add a random professional prefix
        prefix = random.choice(PROFESSIONAL_PREFIXES)
        # Handle "Integration" -> "Add Slack Integration" (Good)
        # Handle "Dashboard" -> "Enable Dashboard" (Maybe "Add Dashboard"?)
        # Let's try to be smart.
        if "integration" in title.lower():
            return "Add " + title
        elif "support" in title.lower():
            return "Enable " + title
        else:
            return prefix + title
            
    return title

def process_file(input_file, output_file):
    print(f"Polishing {input_file}...")
    rows = []
    fieldnames = []
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            # PURE CLEANING
            
            # Title
            row['Title'] = professionalize_title(row['Title'])
            
            # Details
            row['Details'] = clean_narrative(row['Details'])
            
            # Fallback if details became empty
            if not row['Details'] or len(row['Details']) < 10:
                row['Details'] = f"Implement {row['Title']} to enhance platform capabilities and address user needs."
            
            rows.append(row)
            
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
        
    print(f"Saved professionalized data to {output_file}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    input_file = os.path.join(base_path, "canny-import-polished.csv") # Input is the result of previous step
    # Overwrite it or create new? Let's overwrite to keep "polished" as the final name, 
    # but maybe use a temp file first to be safe.
    temp_file = os.path.join(base_path, "canny-import-final-polish.csv")
    
    process_file(input_file, temp_file)
    
    # Replace polished with final polish
    os.replace(temp_file, input_file)
