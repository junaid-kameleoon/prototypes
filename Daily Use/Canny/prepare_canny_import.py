import csv
import re
import os

STATUS_MAPPING = {
    "Released": "Complete",
    "Development in progress": "In Progress",
    "Design in progress": "In Progress",
    "Ready for deployment": "In Progress",
    "Deployment in progress": "In Progress",
    "In progress (deprecated)": "In Progress",
    "Planned": "Planned",
    "Candidate": "Planned",
    "New idea": "Under Review",
    "Rejected": "Closed"
}

def clean_html(raw_html):
    if not raw_html:
        return ""
    # Remove HTML tags
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    # Remove extra whitespace
    cleantext = re.sub(r'\s+', ' ', cleantext).strip()
    return cleantext

def load_notes(notes_file):
    print(f"Loading notes from {notes_file}...")
    notes_map = {} # feature_id -> list of notes
    try:
        with open(notes_file, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                fid = row['feature_id']
                text = clean_html(row['note_text'] or "")
                if fid not in notes_map:
                    notes_map[fid] = []
                if text and text not in notes_map[fid]: # Avoid exact duplicate notes
                    notes_map[fid].append(text)
    except Exception as e:
        print(f"Error loading notes: {e}")
    return notes_map

def process_features(input_file, notes_file, output_file):
    print(f"Reading {input_file}...")
    
    notes_map = load_notes(notes_file)
    unique_features = {} # name -> row
    
    with open(input_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            name = row['name'].strip()
            description = row['description']
            
            if name not in unique_features:
                unique_features[name] = row
            else:
                existing_desc = unique_features[name]['description'] or ""
                if len(description or "") > len(existing_desc):
                    unique_features[name] = row

    print(f"Found {len(unique_features)} unique features.")
    
    processed_data = []
    for name, row in unique_features.items():
        pb_status = row['state_name']
        canny_status = STATUS_MAPPING.get(pb_status, "Under Review")
        
        raw_desc = row['description'] or ""
        clean_desc = clean_html(raw_desc)
        
        # Get notes for this feature
        fid = row['id']
        feature_notes = notes_map.get(fid, [])
        notes_summary = "\n\n---\n**User Feedback:**\n- " + "\n- ".join(feature_notes) if feature_notes else ""
        
        # We'll mark features for enrichment if the core description is too short
        needs_enrichment = len(clean_desc) < 100
        
        processed_data.append({
            "Title": name,
            "Description": clean_desc,
            "User_Notes": notes_summary,
            "Status": canny_status,
            "Original_PB_Status": pb_status,
            "PB_ID": fid,
            "Needs_Enrichment": "Yes" if needs_enrichment else "No"
        })

    # Write prepared file
    fieldnames = ["Title", "Description", "User_Notes", "Status", "Original_PB_Status", "PB_ID", "Needs_Enrichment"]
    with open(output_file, mode='w', encoding='utf-8', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(processed_data)
        
    print(f"Prepared file saved to {output_file}")

if __name__ == "__main__":
    input_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/features-export.csv"
    notes_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/notes-export.csv"
    output_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/canny-import-prepared.csv"
    process_features(input_path, notes_path, output_path)
