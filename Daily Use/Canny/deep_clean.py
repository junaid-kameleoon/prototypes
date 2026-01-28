import csv
import re
import os

# Client-specific prefixes to strip or handle specially
CLIENT_PREFIXES = [
    "Feature Request Voting - vote for ",
    "Feature Request Voting - new idea - ",
    "Feature Request Voting ",
    "Internal Product Portal - vote for ",
    "Internal Product Portal - new idea - ",
    "Internal Product Portal ",
    "Feature request Portal - new idea - ",
    "New portal idea - ",
    "Important", "Critical", "Nice to have", "Unknown"
]

# Common "Action" verbs to remove from start of titles to make them Noun Phrases
ACTION_VERBS = [
    "Add support for", "Add support", "Add option to", "Add ability to", "Add",
    "Allow users to", "Allow", "Enable", "Integrate", "Support", "Create", 
    "Implement", "Provide", "Make it possible to", "Make", "Permit", "Introducing", 
    "Ability to", "Option to", "Update", "Change", "Remove", "Fix"
]

VOCAB_MAP = {
    r'\bBO\b': "Back-office",
    r'\bCD\b': "Custom Data",
    # PBX and RWEP are kept as is
}

def clean_title(title):
    if not title: return "Feature Request"
    
    clean = title.strip()
    
    # 1. Remove prefixes
    for prefix in CLIENT_PREFIXES:
        if clean.lower().startswith(prefix.lower()):
            clean = clean[len(prefix):].strip()
    
    # 2. Remove standard Action Verbs to get Noun Phrases
    # Sort verbs by length desc to catch longest matches first ("Add support for" before "Add")
    sorted_verbs = sorted(ACTION_VERBS, key=len, reverse=True)
    for verb in sorted_verbs:
        if clean.lower().startswith(verb.lower() + " "):
            clean = clean[len(verb):].strip()
            # Capitalize the new first letter
            clean = clean[0].upper() + clean[1:] if clean else ""
            break
            
    # 3. Clean special chars at start/end
    clean = clean.strip(" -:;,")
    
    return clean if clean else "Feature Request"

def clean_details(text):
    if not text: return ""
    
    # 1. Remove "User Feedback" and "Included Features" markers entirely or merge them smoothly?
    # User asked for "single, smooth text block". 
    # We should probably remove the headers but keep the content, maybe separated by a period.
    
    text = re.sub(r'\*\*User Feedback:\*\*', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'Included Features:', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'User Perspectives:', ' ', text, flags=re.IGNORECASE)
    
    # 2. Vocabulary Mapping
    for pattern, replacement in VOCAB_MAP.items():
        text = re.sub(pattern, replacement, text)
        
    # 3. Remove Markdown list items characters
    text = re.sub(r'^\s*[-*•]\s+', '', text, flags=re.MULTILINE)
    
    # 4. Remove Emojis (basic range)
    text = re.sub(r'[^\w\s,.;:?!@#$%^&*()_+\-=\[\]{}|\\\'"<>/]', '', text)
    
    # 5. Collapse whitespace and newlines into a single space for "smooth block"
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def clean_details_advanced(text):
    if not text: return ""
    
    # 0. Unescape characters commonly seen in Productboard exports
    text = text.replace(r'\-', '-').replace(r'\#', '#').replace(r'\.', '.')
    
    # 1. Strip known "Footer" sections - cut off everything after these headers
    # "## Attached documents", "Attached documents", "## Measuring Success"
    footer_markers = [
        r'##\s*[*_]*Attached documents',
        r'Attached documents\s*-', 
        r'##\s*[*_]*Measuring Success',
        r'^[*_]*Attached documents', # Start of line
    ]
    for marker in footer_markers:
        # regex search to find the start index
        match = re.search(marker, text, flags=re.IGNORECASE|re.MULTILINE)
        if match:
            text = text[:match.start()] # Cut everything after
            
    # 2. Aggressive Markdown Header Stripping
    # Remove meta-headers entirely (headers that just say "Description", "Context", etc)
    meta_headers = [
        r'#+\s*[*_]*(Problem|Context|Description|Solution|Feature short|User story|Internal US|Workaround|Justification)[*_/\s]*(.*?)(?=\n|$)', 
        r'[*_]+\s*(Suggestion|Problem|Workaround|Key benefits|Target Persona)\s*[*_]*[:]*',
    ]
    for pat in meta_headers:
        # We replace specific meta headers with empty string
        text = re.sub(pat, ' ', text, flags=re.IGNORECASE)

    # Now strip generic markdown symbols but keep text
    # Remove leading hashes ##
    text = re.sub(r'#+\s*', ' ', text)
    # Remove bolding around keys **Text:** -> Text:
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text) 
    
    # 3. Aggressive Unescaping
    text = text.replace(r'\/', '/').replace(r'\(', '(').replace(r'\)', ')')

    # 3. Call the base cleaner for standard formatting
    return clean_details(text)


def is_valid_row(title, details):
    # Garbage titles list provided by user (and variations)
    TRASH_TITLES = {
        "hhh", "ggg", "admin & engine", "admin bo", "login & sign up", 
        "others", "users & teams", "engine", "access management", "projects",
        "feature experimentation", "data & rp", "common integrations", 
        "technical / infrastructure", "classic personalization", "audiences",
        "product recommendation", "ia", "autopromo personalization", "widgets",
        "targeting", "graphic editor", "developer editor", "simulation panel",
        "sdks", "api", "other", "communication", "internal product"
    }
    
    t_lower = title.lower().strip()
    d_lower = details.lower().strip()
    
    # 1. Check explicit trash list
    if t_lower in TRASH_TITLES:
        return False
        
    # 2. Check for nonsensical repetitions where Title ~= Details and length is very short
    # e.g. "hhh", "hhh" or "Admin", "Admin"
    if t_lower == d_lower and len(t_lower) < 20: 
        return False
        
    # 3. Very short content generally (unless it looks like a real specific feature name?)
    # "New SDKs" is short but valid. "hhh" is not.
    if len(t_lower) < 4:
        return False

    return True

def deep_clean_process(input_file, output_file):
    print(f"Deep cleaning {input_file}...")
    
    cleaned_rows = []
    dropped_count = 0
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            # Title Refinement
            original_title = row['Title']
            new_title = clean_title(original_title)
            
            # Details Deep Clean
            original_details = row['Details']
            new_details = clean_details_advanced(original_details)
            
            # If details are empty/too short, maybe use title? User said standard placeholder before, 
            # but usually for Canny we want some description.
            if len(new_details) < 10:
               new_details = new_title 
            
            # Filtering Step
            if not is_valid_row(new_title, new_details):
                dropped_count += 1
                continue

            # Create new row
            new_row = row.copy()
            new_row['Title'] = new_title
            new_row['Details'] = new_details
            
            cleaned_rows.append(new_row)
            
    print(f"Processed {len(cleaned_rows)} valid rows. Dropped {dropped_count} garbage rows.")
    
    # Save
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(cleaned_rows)
        
    print(f"Saved polished data to {output_file}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    input_file = os.path.join(base_path, "canny-import-aggregated.csv")
    output_file = os.path.join(base_path, "canny-import-polished.csv")
    
    deep_clean_process(input_file, output_file)
