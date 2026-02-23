# Guest Mode: The Complete User Journey

![Complete Guest Mode Journey](guest_mode_journey_complete.svg)

This document maps the end-to-end lifecycle of a Guest Mode user, from initial marketing discovery to final platform conversion.

---

## 1. High-Level Flow (5-Lane Journey)
The diagram above details how we bridge the gap between anonymous browsing and authenticated usage:

1.  **Kameleoon Website**: The entry point where users initiate the "Try it" experience.
2.  **Chrome Webstore**: A temporary detour if the required PBX extension is missing.
3.  **PBX Extension (Client Side)**: The persistent engine that maintains the user's `installId` and local environment.
4.  **Server Side (Gravitee / API)**: The security layer that manages IP rate-limits, issues temporary tokens, and tracks the 3-prompt quota.
5.  **Kameleoon Platform**: The final destination where the trial work is "handover" to a permanent free account.

---

## Architecture Overview

To prevent trivial bypasses (incognito, clearing cache), the system uses a multi-layered identification approach:

1.  **Client-Side (PBX Extension)**: Generates a persistent `installId` stored in `chrome.storage.local`.
2.  **Edge Layer (Gravitee)**: Enforces IP-based rate limiting (1-3 trial tokens per IP per month).
3.  **Token Layer (JWT)**: Issues temporary trial tokens where `sub = installId`, allowing the backend to track prompt usage accurately.

---

## Technical Flow

1.  **Extension Logic**: On first launch, the extension checks for an `installId`. If missing, it generates a `crypto.randomUUID()`.
2.  **Token Request**: The extension requests a free token from `/issue-free-token`, passing the `installId`.
3.  **Gravitee Verification**:
    -   **IP Check**: Verifies the request IP hasn't exceeded the monthly trial limit.
    -   **Auth Check**: Confirms the user isn't already authenticated.
4.  **JWT Issuance**: Gravitee issues a JWT with the `sub` claim set to the `installId`.
5.  **Prompt Submission**: All `POST /generate` requests are validated against the JWT.
6.  **Quota Enforcement**: Gravitee allows a maximum of **3 prompts per 12 months** linked to that specific `installId`.

---

## Error Handling & UX

-   **IP Limit Reached**: If the IP quota is exceeded, the user receives a "Too many trials from this network" message and is prompted to register.
-   **Prompt Limit Reached**: After the 3rd prompt, the PBX drawer displays the "Step 2: Sign up for 15 more credits" conversion bridge.
-   **Incognito Mode**: The extension detects incognito state. Since `chrome.storage.local` is cleared on exit, Guest Mode is restricted or blocked to prevent infinite loops.
