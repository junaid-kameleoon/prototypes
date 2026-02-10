# Guest Mode User Flow (Flowchart)

This diagram maps the intended user journey for the Guest Mode on the Kameleoon corporate site.

## User Journey Overview

```mermaid
swimlane
    title Guest Mode: PBX Experimentation Flow
    
    lane User
        Start["Enter Site"]
        InputPrompt["Types Prompt (e.g. 'Change button to Lime')"]
        ClickSend["Clicks Send"]
        DecideExtension["Decides on Extension"]
        UsePrompts["Uses 2nd/3rd Prompt"]
        ReachLimit["Reaches 3-Prompt Limit"]
        ClickSignup["Clicks 'Save Work / Sign Up'"]

    lane Site (Frontend)
        ShowDrawer["Opens PBX Drawer"]
        DetectExt["Check for Extension"]
        ShowExtPrompt["Show 'Extension Required' Modal"]
        ShowMockResult["Show Mocked Result (Option A)"]
        ApplyLive["Apply Change Live via Extension"]
        CheckLimit["Check Prompt Counter (LocalStorage)"]
        ShowConversion["Show Conversion Modal (Trial Bridge)"]

    lane Extension
        Interception["Intercept Commands"]
        DOMManipulation["Execute DOM Changes"]

    lane Backend
        GenerateLogic["KAI Logic Engine"]
        CreateTrial["Create Trial Account"]

    Start -> ShowDrawer
    ShowDrawer -> InputPrompt
    InputPrompt -> ClickSend
    ClickSend -> DetectExt
    
    DetectExt -- "No Extension" --> ShowExtPrompt
    ShowExtPrompt -- "User Skips" --> ShowMockResult
    ShowExtPrompt -- "User Installs" --> ApplyLive
    
    ShowMockResult -> UsePrompts
    ApplyLive -> UsePrompts
    
    UsePrompts -> CheckLimit
    CheckLimit -- "Count < 3" --> InputPrompt
    CheckLimit -- "Count == 3" --> ShowConversion
    
    ShowConversion -> ClickSignup
    ClickSignup -> CreateTrial
```

---

## Addressing the "No Extension" Caveat

If a user cannot or will not install the Chrome extension, we have three primary strategies to preserve the "Aha" moment:

### Option A: The "Mocked" Sandbox (Safety Net)
- **Mechanic**: Instead of modifying the live site, the PBX assistant provides a code/visual breakdown and a **simulated preview** within the drawer itself.
*   **Pros**: Zero friction, works instantly.
*   **Cons**: Lacks the true "Magic" of seeing the live site change.

### Option B: Pre-Instrumented Demo Page (Best "Aha")
- **Mechanic**: Redirect the user to `kameleoon.com/sandbox` where the Kameleoon script is **already hard-coded**.
- **Pros**: PBX works perfectly without any extension for this specific URL.
- **Cons**: User can't test it on *their* specific choice of page (e.g., their own company site) unless they install the extension.

### Option C: The "Apply Pending" Flow
- **Mechanic**: Let the user chat and "build" the experiment. KAI confirms: *"Variation 1 is ready! I've optimized your headline. Install the extension to toggle this change live."*
- **Pros**: Builds anticipation and value before requiring the friction of installation.

---

## Technical Edge Cases & Questions

1.  **3-Prompt Enforcement**: We will use `localStorage` to track indices of prompts. If a user clears cache or returns on a new device, we let them start over (as per Fred's suggestion).
2.  **Sign-up Timing**: Sign-up is triggered **after** the 3rd prompt (The "Conversion Bridge"). 
3.  **Data Retention**: To save "v1.0" complexity, we may skip historical retention in the account, but we should at least pass the last 3 prompts via URL parameters or SessionStorage to the signup page so the trial starts with those "pre-loaded".
