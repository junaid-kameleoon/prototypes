import csv
import os

def deduplicate(input_file, output_file):
    print(f"Deduplicating {input_file}...")
    
    seen_titles = set()
    unique_rows = []
    duplicates_removed = 0
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            title = row['Title'].strip()
            title_lower = title.lower()
            
            if title_lower in seen_titles:
                duplicates_removed += 1
                continue
            
            seen_titles.add(title_lower)
            unique_rows.append(row)
            
    print(f"Removed {duplicates_removed} duplicates. Final count: {len(unique_rows)}")
    
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(unique_rows)
        
    print(f"Saved deduplicated data to {output_file}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    input_file = os.path.join(base_path, "canny-import-polished.csv")
    output_temp = os.path.join(base_path, "canny-import-deduped.csv")
    
    deduplicate(input_file, output_temp)
    
    # Overwrite original
    os.replace(output_temp, input_file)
