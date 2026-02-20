
# How to Create a Prototype Gallery 🎨

If you have multiple prototypes in subfolders and want a beautiful landing page to showcase them, use this prompt in Antigravity (Cmd+K / Ctrl+K):

---

**PROMPT:**

> I want to create a central Gallery page for all my prototypes in this repository.
>
> 1. **Scan the repository** for any subfolders that contain an `index.html` file.
> 2. **Build a premium Landing Page** (`gallery.html` or replace `index.html` if it's just a placeholder) that acts as a visual directory.
> 3. **Design Requirements:**
>    - Use **Tailwind CSS** for a modern, clean look (follow the Kameleoon aesthetic: blue/indigo accents, white cards, subtle shadows).
>    - Create a **Grid of Cards**; each card represents one prototype.
>    - Automatically extract the folder names or `<title>` tags to use as card headers.
>    - Add a "Launch" button to each card that opens the prototype.
>    - Include high-quality **lucide-style icons** or emojis to make the gallery feel alive.
> 4. **Navigation:** Ensure there is a small "← Back to Gallery" button added to the top-left of every individual prototype file so I can navigate easily between them.
>
> **Create an implementation plan first.**

---

**Tips for Success:**
- If you add a new prototype folder later, just run this prompt again to "Update the gallery".
- Antigravity is great at "Extracting icons from context" – if your prototype is about "Search", it will likely find a magnifying glass icon for the card automatically.
