import csv
import re
import os
from collections import defaultdict

def create_aggressive_merge(features_file, notes_file, output_file):
    print(f"Loading features from {features_file}...")
    
    # 1. Load all features and index by ID
    features_by_id = {}
    subfeatures_map = defaultdict(list)
    
    
    # Date Cutoff: September 1st, 2024
    CUTOFF_DATE = "2024-09-01"
    
    with open(features_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            f_id = row['id']
            created_at = row['created_at'] # "2021-01-25 16:18:13 UTC"
            
            # Simple string comparison works for ISO dates (YYYY-MM-DD)
            # Take first 10 chars "2021-01-25"
            date_str = created_at[:10]
            
            if date_str < CUTOFF_DATE:
                continue

            f_type = row['feature_type']
            parent_id = row['parent_id']
            
            features_by_id[f_id] = row
            
            if f_type == 'subfeature' and parent_id:
                subfeatures_map[parent_id].append(f_id)

    print(f"Found {len(features_by_id)} items created on or after {CUTOFF_DATE}.")
    print(f"Found {len(subfeatures_map)} parents with subfeatures.")

    # 2. Load Notes to append
    notes_map = defaultdict(list)
    notes_meta = defaultdict(lambda: {'emails': set(), 'companies': set()})
    
    if os.path.exists(notes_file):
        with open(notes_file, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                feature_id = row['feature_id']
                note_content = row.get('note_text', '')
                
                # Metadata
                u_email = row.get('user_email', '').strip()
                comp_name = row.get('company_name', '').strip()
                
                if u_email: notes_meta[feature_id]['emails'].add(u_email)
                if comp_name: notes_meta[feature_id]['companies'].add(comp_name)

                # Basic clean of note content
                # Use space ' ' replacement to avoid sticking words together
                clean_note = re.sub(r'<[^>]+>', ' ', note_content).strip()
                if clean_note:
                    notes_map[feature_id].append(clean_note)
        print(f"Loaded notes for {len(notes_map)} features.")

    # 3. Process and Merge
    final_rows = []
    processed_ids = set()

    # Iterate through all items, but skip subfeatures (they get merged into parents)
    for f_id, row in features_by_id.items():
        if row['feature_type'] == 'subfeature':
            continue
            
        # If it's a component or product, we might keep it if it has useful info, 
        # but purely infrastructure components might be skippable. 
        # For now, we assume everything not a subfeature is a valid top-level item.

        title = row['name']
        description = row['description'] if row['description'] else ""
        owner_name = row.get('owner_name', '').strip()
        
        # Init metadata set for this feature
        my_emails = notes_meta[f_id]['emails'].copy()
        my_companies = notes_meta[f_id]['companies'].copy()
        
        # Clean HTML from description
        description = re.sub(r'<[^>]+>', ' ', description)
        
        # Append Subfeatures
        children_ids = subfeatures_map.get(f_id, [])
        if children_ids:
            description += "\n\nIncluded Features:\n"
            for child_id in children_ids:
                child = features_by_id.get(child_id)
                if child:
                    child_desc = re.sub(r'<[^>]+>', ' ', child.get('description', ''))
                    description += f"- {child['name']}: {child_desc}\n"
                    
                    # Also collect notes from children!
                    if child_id in notes_map:
                         notes_map[f_id].extend(notes_map[child_id])
                    
                    # Merge metadata from children
                    if child_id in notes_meta:
                        my_emails.update(notes_meta[child_id]['emails'])
                        my_companies.update(notes_meta[child_id]['companies'])

        # Append Notes
        my_notes = notes_map.get(f_id, [])
        if my_notes:
             description += "\n\nUser Perspectives:\n" + "\n".join(my_notes)

        # Prepare formatting for Canny
        # Map Status
        status_map = {
            "New idea": "Open",
            "Candidate": "Under Review",
            "Planned": "Planned",
            "Development in progress": "In Progress",
            "Released": "Complete",
            "Rejected": "Closed"
        }
        status = status_map.get(row['state_name'], "Open")
        
        # Construct Tags
        tags = []
        if row.get('Squad'): tags.append(row['Squad'])
        if row.get('teams'): tags.append(row['teams'])
        
        # Add Owner tag
        if owner_name:
            tags.append(f"Owner: {owner_name}")
            
        # Add Request by tags
        for email in my_emails:
            tags.append(f"Request by: {email}")
            
        # Add Company tags
        for company in my_companies:
            tags.append(company)
        
        final_rows.append({
            "Title": title,
            "Details": description.strip(),
            "Status": status,
            "Tags": ", ".join(filter(None, tags)),
            "Category": "Roadmap", # Default
            "User Email": ", ".join(my_emails),
            "Company": ", ".join(my_companies),
            "Owner": owner_name
        })

    print(f"Consolidated into {len(final_rows)} top-level features.")

    # 4. Save
    fieldnames = ["Title", "Details", "Status", "Tags", "Category", "User Email", "Company", "Owner"]
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(final_rows)
        
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    features_file = os.path.join(base_path, "features-export.csv")
    notes_file = os.path.join(base_path, "notes-export.csv")
    output_file = os.path.join(base_path, "canny-import-aggregated.csv")
    
    create_aggressive_merge(features_file, notes_file, output_file)
