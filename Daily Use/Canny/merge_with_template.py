import csv
import re
import os

def clean_html(raw_html):
    if not raw_html: return ""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    cleantext = re.sub(r'\s+', ' ', cleantext).strip()
    return cleantext

def merge_with_template(features_file, processed_file, template_file, output_file):
    print(f"Loading feature metadata from {features_file}...")
    
    # 1. Load original feature metadata for tags/squads
    feature_metadata = {}
    with open(features_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            feature_metadata[row['id']] = row
            
    # 2. Extract column names from template but don't load rows
    with open(template_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        template_fieldnames = reader.fieldnames
    
    # 3. Load my processed features and reformat them
    all_rows = []
    processed_count = 0
    with open(processed_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            pb_id = row['PB_ID']
            meta = feature_metadata.get(pb_id, {})
            
            # Construct Tags
            tag_list = []
            if meta.get('Squad'): tag_list.append(meta['Squad'])
            if meta.get('teams'): tag_list.append(meta['teams'])
            if meta.get('tags'): tag_list.append(meta['tags'])
            if meta.get('Strategic objective'): tag_list.append(meta['Strategic objective'])
            
            tags_str = ", ".join(filter(None, tag_list))
            
            all_rows.append({
                "Title": row['Title'],
                "Details": row['Description'],
                "Status": row['Status'],
                "Tags": tags_str,
                "Category": "Roadmap",
                "StateTag": "Feature"
            })
            processed_count += 1

    print(f"Added {processed_count} roadmap features to the list (Template rows excluded).")

    # 4. Save the final merged file with EXACT headings
    final_fieldnames = ["Title", "Details", "Status", "Tags", "Category", "StateTag"]
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=final_fieldnames)
        writer.writeheader()
        for row in all_rows:
            output_row = {k: row.get(k, "") for k in final_fieldnames}
            writer.writerow(output_row)
            
    print(f"Final merged file saved to {output_file}. Total rows: {len(all_rows)}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    features_file = os.path.join(base_path, "features-export.csv")
    processed_file = os.path.join(base_path, "canny-import-final.csv")
    template_file = os.path.join(base_path, "ProductBoard ➞ Canny (with state tags).csv")
    output_file = os.path.join(base_path, "canny-import-merged.csv")
    
    merge_with_template(features_file, processed_file, template_file, output_file)
