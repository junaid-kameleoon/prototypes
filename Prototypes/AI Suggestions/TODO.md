# Prototype To-Do List (Based on Backend Transcript)

Based on the discussion with the backend partner (Fred & Athena Team), the following functionality gaps and refinements have been identified for the AI Suggestions prototype:

## High Priority
- [ ] **Screenshot Bounding Box Overlay**: 
  - The API provides screenshots with relative bounding boxes and query selectors.
  - **Current**: Placeholder purple box.
  - **Action**: Implement a mock UI that overlays a highlighting box on top of the experiment screenshot to demonstrate how the target element is identified.

- [ ] **Variation Selection**:
  - Users need to be able to select specific variations to move forward with ("pick the ones you want to create").
  - **Current**: Variations are listed, but "Create" is a generic button per variation.
  - **Action**: Add a selection mechanism (checkboxes or "Select" state) and a primary "Create Selected" action, or ensure the individual "Create" buttons clearly imply selecting *that* specific variation.

- [ ] **Analysis Quota & Cadence**:
  - The limit is **10 page analyses per month**, not daily.
  - **Current**: Header says "Daily analysis is scheduled".
  - **Action**: Update the header text to reflect the monthly quota (e.g., "Monthly analysis quota: X/10").

## Medium Priority
- [ ] **Feedback Loop (Reinforcement Layer)**:
  - The system learns from experiment results ("conclusive or not").
  - **Current**: No way to input experiment results.
  - **Action**: Add a status dropdown or buttons for "Mark as Winner", "Inconclusive", or "Failed" to demonstrate the feedback loop.

- [ ] **PBX Handoff Simulation**:
  - Clicking "Create" should launch into the Copilot/PBX interface with the prompt preloaded.
  - **Current**: Button exists but does nothing.
  - **Action**: Create a simple mock modal or toast notification that says "Launching PBX with prompt: [Prompt Text]..." to simulate this handoff.

## Low Priority / Clarification Needed
- [ ] **Page Management**:
  - Users might want to change which 10 pages are tracked month-to-month.
  - **Action**: Ensure the "Tracked Pages" list has "Delete" or "Stop Tracking" options to free up quota.
