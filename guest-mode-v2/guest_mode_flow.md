# Guest Mode User Flow (Flowchart)

![Guest Mode Flowchart](guest_mode_flow_visual.svg)

This diagram maps the intended user journey for the Guest Mode on the Kameleoon corporate site.

## User Journey Overview

```mermaid
flowchart TD
    %% Nodes
    Start["User Enters Landing Page"]:::dark --> PBX_Init["PBX Assistant Greeting"]:::lime
    PBX_Init --> Input["User Inputs URL + Prompt"]:::lime
    Input --> ExtCheck{Extension Found?}:::dark
    
    %% Extension Path
    ExtCheck -- "No" --> CWS["Redirect to Chrome Store"]:::dark
    CWS --> Install["User Installs Extension"]:::lime
    Install --> AutoRedirect["Automatic Redirection to Target Site"]:::lime
    AutoRedirect --> ExtCheck
    
    %% Usage Path
    ExtCheck -- "Yes" --> TargetSite["Load PBX on Target Site"]:::lime
    TargetSite --> Prompts{< 3 Prompts?}:::dark
    Prompts -- "Yes" --> Process["Analyze & Preview Changes"]:::lime
    Process --> TargetSite
    
    Prompts -- "No" --> ConvModal["Show Branded Conversion Modal"]:::lime
    ConvModal --> Trial["Start Free Trial"]:::dark
    ConvModal --> Later["Maybe Later (View Results)"]:::lime

    %% Styling
    classDef lime fill:#DAE995,stroke:#1D342F,stroke-width:2px,color:#1D342F,font-weight:bold
    classDef dark fill:#1D342F,stroke:#DAE995,stroke-width:2px,color:#DAE995,font-weight:bold
```

---

## The "Extension Mandatory" Policy

Update: Following technical review, Guest Mode now requires the Kameleoon Chrome Extension for all interactions.

### The Onboarding Flow
1. **Interactive Greeting**: Users see the PBX drawer immediately on the landing page.
2. **Context Selection**: The chat asks: *"Which website would you like to optimize today?"*
3. **The Gateway**: Upon sending a prompt, if the extension is missing, the user is redirected to the Chrome Web Store.
4. **Resumption**: After installation, the system detects the extension and automatically launches the target site with the PBX drawer active.

---

## Technical Edge Cases & Questions

1.  **3-Prompt Enforcement**: We will use `localStorage` to track indices of prompts. If a user clears cache or returns on a new device, we let them start over (as per Fred's suggestion).
2.  **Sign-up Timing**: Sign-up is triggered **after** the 3rd prompt (The "Conversion Bridge"). 
3.  **Data Retention**: To save "v1.0" complexity, we may skip historical retention in the account, but we should at least pass the last 3 prompts via URL parameters or SessionStorage to the signup page so the trial starts with those "pre-loaded".
