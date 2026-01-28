import csv
import re

# Knowledge Base & Templates
TEMPLATES = {
    "SDK": "Kameleoon's {tech} SDK enables developers to implement server-side experimentation and feature flagging with minimal latency and native performance.",
    "Integration": "Connect Kameleoon with {platform} to synchronize audience data, experiment results, and events across your marketing and analytics ecosystem.",
    "AI": "Leverage Kameleoon's AI Assist and predictive capabilities to automate experiment analysis and optimize user experiences in real-time.",
    "Widget": "Enhance your on-site experience with a customizable {name} widget, built for high engagement and easy deployment via the Graphic Editor.",
    "Editor": "Improvements to the {type} Editor to provide deeper customization, better code management, and a more intuitive UI for experiment creation.",
    "Reporting": "Advanced reporting updates for {feature}, providing clearer insights into improvement rates, confidence intervals, and reliability scores.",
    "SSO": "Secure your organization's access with Single Sign-On (SSO) integration, supporting SAML 2.0, OIDC, and major identity providers like Okta and Azure AD.",
}

def generate_description(title):
    t_lower = title.lower()
    
    # SDK Logic
    tech_keywords = ["python", "go", "ruby", "flutter", "js", "android", "ios"]
    if "sdk" in t_lower or any(re.search(rf"\b{tech}\b", t_lower) for tech in tech_keywords):
        tech = "Native"
        for t in ["Python", "Go", "Ruby", "Flutter", "JS", "Android", "iOS"]:
            if re.search(rf"\b{t.lower()}\b", t_lower):
                tech = t
                break
        return TEMPLATES["SDK"].format(tech=tech)
    
    # Integration Logic
    if re.search(r"\bintegration\b", t_lower):
        platform = re.sub(r"\bintegration\b", "", t_lower).strip()
        if not platform: platform = "third-party platforms"
        return TEMPLATES["Integration"].format(platform=platform.capitalize())
    
    # AI Logic
    if re.search(r"\b(ai|kai)\b", t_lower):
        return TEMPLATES["AI"]
    
    # Widget Logic
    if re.search(r"\bwidget\b", t_lower):
        return TEMPLATES["Widget"].format(name=title)
    
    # Editor Logic
    if re.search(r"\beditor\b", t_lower):
        etype = "Graphic" if "graphic" in t_lower else "Code"
        return TEMPLATES["Editor"].format(type=etype)
    
    # SSO Logic
    if re.search(r"\bsso\b", t_lower):
        return TEMPLATES["SSO"]
    
    # Default
    if len(title) > 10:
        return f"This feature focuses on {title}, improving the Kameleoon workflow and providing more granular control for product teams."
    
    return f"Enhancement for {title} to improve performance and user experience within the Kameleoon platform."

def enrich_file(input_file, output_file):
    print(f"Enriching features with AI and merging notes from {input_file}...")
    
    processed_rows = []
    with open(input_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Step 1: Handle AI Enrichment if needed
            if row["Needs_Enrichment"] == "Yes":
                row["Description"] = generate_description(row["Title"])
                row["AI_Enriched"] = "Yes"
            else:
                row["AI_Enriched"] = "No"
            
            # Step 2: Append User Notes if they exist
            if row["User_Notes"].strip():
                row["Description"] = row["Description"] + row["User_Notes"]
                row["Has_Notes"] = "Yes"
            else:
                row["Has_Notes"] = "No"
                
            processed_rows.append(row)

    # Clean up columns for final export
    fieldnames = ["Title", "Description", "Status", "Original_PB_Status", "PB_ID", "AI_Enriched", "Has_Notes"]
    with open(output_file, mode='w', encoding='utf-8', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        # Prepare for writing
        final_rows = []
        for r in processed_rows:
            final_rows.append({k: r[k] for k in fieldnames})
            
        writer.writerows(final_rows)
        
    print(f"Final enriched file saved to {output_file}")

if __name__ == "__main__":
    input_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/canny-import-prepared.csv"
    output_path = "/Users/junaidgulzarmalik/Desktop/Antigrav/canny-import-final.csv"
    enrich_file(input_path, output_path)
