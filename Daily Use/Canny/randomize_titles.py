import csv
import random
import os

def randomize_titles(input_file, output_file):
    print(f"Randomizing titles in {input_file}...")
    
    # Safe prefixes that generally work with Noun Phrases
    PREFIXES = [
        "Add ",
        "Add support for ",
        "Enable ",
        "Allow usage of ",
        "Support ",
        "Introduce ",
    ]
    
    randomized_count = 0
    rows = []
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            title = row['Title']
            
            # 15% chance to add a prefix, but only if it doesn't already have one (it shouldn't, we cleaned them)
            # And avoid very long titles getting longer
            if random.random() < 0.15 and len(title) < 50:
                prefix = random.choice(PREFIXES)
                # Ensure we don't double up or make it weird
                # Handle Capitalization: 
                # If "BPCE topics" -> "Enable BPCE topics" (Keep B if P is also upper)
                # If "Traffic reallocation" -> "Enable traffic reallocation" (Lower T if r is lower)
                
                first_char = title[0]
                rest = title[1:]
                
                # Check if it looks like an acronym (2nd char exists and is upper)
                if len(title) > 1 and title[1].isupper():
                    new_first = first_char # Keep original case (BPCE)
                else:
                    new_first = first_char.lower() # Lowercase standard words (Traffic -> traffic)
                
                new_title = prefix + new_first + rest
                row['Title'] = new_title
                randomized_count += 1
            
            rows.append(row)
            
    print(f"Randomized {randomized_count} titles.")
    
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
        
    print(f"Saved randomized data to {output_file}")

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    input_file = os.path.join(base_path, "canny-import-polished.csv")
    output_temp = os.path.join(base_path, "canny-import-varied.csv")
    
    randomize_titles(input_file, output_temp)
    
    # Overwrite original
    os.replace(output_temp, input_file)
