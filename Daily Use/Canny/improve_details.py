import csv
import re
import os

def improve_copy(input_file, output_file):
    print(f"Improving copy in {input_file}...")
    
    improved_rows = []
    fixed_count = 0
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            title = row['Title'].strip()
            details = row['Details'].strip()
            
            # Identify if needs improvement: Title == Details OR Details is very short (< 30 chars)
            # But exclude if details actually has robust content (check word count maybe?)
            
            needs_fix = (title.lower() == details.lower()) or (len(details) < 30 and " " not in details.strip())
            
            if needs_fix:
                new_details = generate_professional_copy(title)
                if new_details != details:
                     row['Details'] = new_details
                     fixed_count += 1
            
            # Also clean "Redmine #" from titles/details if missed
            row['Title'] = clean_trackers(row['Title'])
            row['Details'] = clean_trackers(row['Details'])
            
            improved_rows.append(row)
            
    print(f"Improved {fixed_count} descriptions.")
    
    with open(output_file, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(improved_rows)
        
    print(f"Saved optimized copy to {output_file}")

def clean_trackers(text):
    # Remove Redmine #1234, Jira-123, etc at end of string
    text = re.sub(r'[:\s-]*Redmine\s*#?\d+', '', text, flags=re.IGNORECASE)
    text = re.sub(r'[:\s-]*Jira\s*#?\d+', '', text, flags=re.IGNORECASE)
    return text.strip()

def generate_professional_copy(title):
    # Heuristics to generate better copy based on keywords in Title
    t_lower = title.lower()
    
    # Pre-processing for "Migrate" to "Migration of"
    # If the title starts with "Migrate ", it reads better as "Migration of " inside a sentence
    display_title = title
    if t_lower.startswith("migrate "):
        display_title = "Migration of " + title[8:]

    # 1. Integrations (segment removed to avoid false positives with 'audience segments')
    if "integration" in t_lower or "connector" in t_lower or "plugin" in t_lower or "zapier" in t_lower or "segment.io" in t_lower or " api" in t_lower:
        return f"Provide seamless integration capabilities for '{title}', allowing users to synchronize data and streamline workflows."
        
    # 2. SDKs / Tech
    if "sdk" in t_lower or "library" in t_lower:
        return f"Develop and support the '{title}' to enable developers to easily implement experiments and feature flags."

    # 3. Analytics / Dashboard
    if "dashboard" in t_lower or "chart" in t_lower or "kpi" in t_lower or "analytics" in t_lower or "report" in t_lower or "view" in t_lower:
        return f"Enhance platform visibility by implementing '{title}', providing users with deeper insights and actionable data."

    # 4. Editors / UI
    if "editor" in t_lower or "ui" in t_lower or "interface" in t_lower or "design" in t_lower:
        return f"Improve the user experience with '{title}', making it more intuitive and efficient for users to configure their campaigns."
        
    # 5. Migration
    if "migrate" in t_lower or "migration" in t_lower:
        return f"Execute the '{display_title}' to ensure system stability, performance improvements, and access to new architecture."
        
    # 6. Specific Actions (Enable, Allow - often removed from title but might be implied)
    if any(x in t_lower for x in ["upload", "export", "import", "download", "filter", "search", "sort"]):
        return f"Enable users to perform {title}, improving data management and operational efficiency."

    # 7. Bug/Issue sounding (heuristic)
    if "error" in t_lower or "fix" in t_lower or "issue" in t_lower or "bug" in t_lower:
        return f"Resolve the issue regarding '{title}' to ensure a stable and bug-free user experience."

    # 8. Generic "New Feature" fallback
    # Try to make it sound like a robust roadmap item
    return f"We are exploring the addition of '{title}' to our roadmap. This initiative aims to address specific user needs and expand the platform's core capabilities."

if __name__ == "__main__":
    base_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/Canny"
    input_file = os.path.join(base_path, "canny-import-polished.csv") # Read from polished
    output_temp = os.path.join(base_path, "canny-import-temp.csv") # Temp
    
    improve_copy(input_file, output_temp)
    
    # Overwrite original to allow chaining
    os.replace(output_temp, input_file)
