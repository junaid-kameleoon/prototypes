import re

text = '## **Feature short The goal is to provide features'
# Regex from line 115 of deep_clean.py
pat = r'##\s*[*_]*Feature short[*_]*'

match = re.search(pat, text, flags=re.IGNORECASE)
print(f"Text: '{text}'")
print(f"Pattern: '{pat}'")
print(f"Match: {match}")
if match:
    print(f"Matched text: '{match.group(0)}'")
    replaced = re.sub(pat, ' ', text, flags=re.IGNORECASE)
    print(f"Replaced: '{replaced}'")
