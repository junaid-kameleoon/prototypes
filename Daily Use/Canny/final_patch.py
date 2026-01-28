import csv
import os

def patch_file(input_file, output_file):
    print(f"Patching {input_file}...")
    
    cleaned_rows = []
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            details = row['Details']
            
            # brute force replacements
            patch_map = {
                "## **Feature short": "",
                "## **Feature short description": "",
                "## Feature short": "",
                "**Feature short": "",
                "Feature short ": "", # if residue
                "--- ##": "",
            }
            
            for k, v in patch_map.items():
                details = details.replace(k, v)
                
            row['Details'] = details.strip()
            cleaned_rows.append(row)
            
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(cleaned_rows)
        
    print(f"Patched data saved to {output_file}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    input_file = os.path.join(base_path, "canny-import-polished.csv")
    output_temp = os.path.join(base_path, "canny-import-patched.csv")
    
    patch_file(input_file, output_temp)
    os.replace(output_temp, input_file)
