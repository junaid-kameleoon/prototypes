# Kameleoon MCP Server: Lot 0 (MVP) Test Plan

This test plan outlines a structured approach to validating the Kameleoon MCP Server's Lot 0 (MVP) capabilities. 
The goal is to ensure the server handles requests safely, accurately, and robustly when interacting directly from an AI Host (like Antigravity or Cursor).

## 1. Connectivity & Authentication
*   **TC01: Connection Handshake:** Verify the server accepts connections on `mcp-remote` with the required `X-Kameleoon-Auth` headers. (Status: *Verified in initial report*)
*   **TC02: Invalid Authentication:** Attempt an initial connection with missing or incorrect `X-Kameleoon-Auth` headers to ensure unauthorized access is properly blocked with a 401/403.
*   **TC03: Session Management:** Reproduce the "Session ID missing" error by batching rapid initialize and `tools/list` requests. Work with the MCP team to test potential fixes or establish retry logic.

## 2. Feature Flag Operations (Read)
*   **TC04: Feature Flag List:** Execute `feature_flag_list`. 
    *   Verify the response returns a valid array of items. 
    *   Test optional pagination (e.g., limit to 5 results).
    *   Test simple keyword filtering.
*   **TC05: Feature Flag Get:** Execute `feature_flag_get` with a known `featureKey` and `siteCode`. 
    *   Verify the return payload contains precise configuration details.
    *   Test with a non-existent `featureKey` to verify correct 404/Error handling.
*   **TC06: Activity Logs:** Execute `feature_flag_activity_logs_get`. 
    *   Verify audit logs are returned correctly (who/what/when) since it's marked "in progress".

## 3. Feature Flag Operations (Write / Mutations)
*   **TC07: Feature Flag Create:** Execute `feature_flag_create`.
    *   Create a minimal flag with OFF/ON variations.
    *   Document the "moody" aspects mentioned in the specs to identify exactly what can be improved.
*   **TC08: Feature Flag Enable/Disable:** Execute `feature_flag_enable` and `feature_flag_disable`.
    *   Verify the targeted flag correctly toggles state for a given environment key.
*   **TC09: Feature Flag Duplicate:** Execute `feature_flag_duplicate`.
    *   Verify the new flag configuration correctly matches the origin flag.
*   **TC10: Feature Flag Delete:** Execute `feature_flag_delete`.
    *   Delete the flags generated in TC07 and TC09. Verify the cleanup ensures no orphaned data.

## 4. Experiment Operations
*   **TC11: Experiment List:** Execute `experiment_list`.
    *   Test search capabilities (name/id) and verify pagination/sorting.
*   **TC12: Experiment Get:** Execute `experiment_get`.
    *   Retrieve the setup details of an active experiment.
*   **TC13: Experiment Results:** Execute `experiment_results_get` and `feature_flag_experiment_results_get`.
    *   Verify statistical payload and winner summary is readable by the AI.
*   **TC14: Experiment Code:** Execute `experiment_code_get`.
    *   Retrieve the varying code payload. This is fundamental for the "Last Mile" developer workflow integration.

## 5. End-to-End AI Workflow Tests
*   **TC15: The "What's Running?" Prompt:** Ask the AI: *"List all active feature flags on site d1alzzxd7k and tell me if any were changed today."* (Uses lists + activity log).
*   **TC16: The "Deploy" Prompt:** Ask the AI: *"Create a new feature flag called 'test-mcp-agent', enable it, and generate the TypeScript code snippet for me to use it in React."* (Uses create, enable, and AI coding abilities).
*   **TC17: Rollback / Safety Prompt:** Ask the AI: *"Wait, disable 'test-mcp-agent' and delete it."* (Tests the safety and cleanup).

---
## Test Execution Log
| Test Case | Status | Notes / Errors Discovered | Date |
| :--- | :---: | :--- | :--- |
| TC01 | ✅ Pass | Initial connection verified | 2026-03-07 |
| TC04 | ✅ Pass | Verified `feature_flag_list` returns active project flags including `snake_game` and `new_search` | 2026-03-11 |
| TC02 | | | |
| TC03 | | | |
| (Add more rows as testing progresses) | | | |
