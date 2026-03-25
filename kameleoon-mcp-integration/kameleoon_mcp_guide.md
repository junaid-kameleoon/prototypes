# Kameleoon MCP Server: Setup & Integration Guide

The Kameleoon MCP (Model Context Protocol) server connects your AI coding tools directly to your Kameleoon project, enabling agentic workflows for feature flags and experiments. This guide covers everything you need to get connected and start automating.

---

## What This Enables

Once connected, your AI agent can interact with Kameleoon to:

- Search, retrieve, toggle, and manage feature flag configurations
- Analyze experiment winners and retrieve statistical summaries
- Pull raw variation code (JS/CSS) directly from experiments
- Automate the full implementation lifecycle — from flag creation to rollout

### Available Tools

| Tool | Purpose | Example Prompt |
|---|---|---|
| `feature_flag_list` | List all flags for a site | "List all feature flags for site `d1alzzxd7k`." |
| `feature_flag_get` | Get detailed flag config | "Show configuration for flag `snake_game`." |
| `feature_flag_enable` | Toggle a flag ON | "Enable the `new_search` flag in production." |
| `feature_flag_create` | Create a new basic flag | "Create a flag `ui_refresh` for site `d1alzzxd7k`." |
| `experiment_list` | List active experiments | "List all active experiments." |
| `experiment_results_get` | Get results & winner data | "Show winner summary for experiment `149640`." |
| `experiment_code_get` | Extract JS/CSS variation code | "Pull variation code for experiment `149640`." |

---

## Integration: Antigravity

Antigravity is a local AI pair programmer that manages MCP servers via a central JSON configuration file.

### Quick Setup (Self-Starter Prompt)

Paste the following directly into your Antigravity chat to get connected automatically:

> "Please connect to the Kameleoon MCP production server. The endpoint is `https://mcp.kameleoon.com/mcp`, using `mcp-remote@0.1.37` on port `35535` with the `openid` scope. Authenticate by running the npx mcp-remote command to trigger my browser, then verify the connection."

### Manual Configuration

Edit the config file at `~/.gemini/antigravity/mcp_config.json` and add:

```json
"kameleoon": {
  "command": "npx",
  "args": [
    "-y",
    "mcp-remote@0.1.37",
    "https://mcp.kameleoon.com/mcp",
    "35535",
    "--static-oauth-client-metadata",
    "{ \"scope\": \"openid\" }"
  ]
}
```

---

## Integration: Codex

The Codex desktop app and CLI provide deep repository analysis and automation capabilities.

### Quick Setup (Self-Starter Prompt)

Paste the following into your Codex chat:

> "Configure the Kameleoon MCP server at `https://mcp.kameleoon.com/mcp`. Use port `35535` for callback. Once configured, run the login command to trigger my browser and then list my feature flags."

### Manual Configuration

Add the following to `~/.codex/config.toml` (create it if it doesn't exist):

```toml
[mcp_servers.kameleoon]
command = "npx"
args = ["-y", "mcp-remote@0.1.37", "https://mcp.kameleoon.com/mcp",
        "35535", "--static-oauth-client-metadata",
        "{ \"scope\": \"openid\" }"]
```

### One-Time Authentication

The Kameleoon MCP server uses OAuth. Run the following in your terminal to start the authorization flow:

```bash
npx -y mcp-remote@0.1.37 https://mcp.kameleoon.com/mcp 35535 \
  --static-oauth-client-metadata '{ "scope": "openid" }'
```

**What to expect:**

- A browser window opens automatically
- Click **Authorize** on the Kameleoon login page
- The local callback completes on port `35535`
- Your terminal confirms the proxy connected successfully

A successful connection shows output similar to:

```
Connected to remote server using StreamableHTTPClientTransport
Local STDIO server running
Proxy established successfully between local STDIO and remote StreamableHTTPClientTransport
```

### Verifying the Connection

After authentication, run these checks to confirm everything is working:

**1. List available tools**

Confirm that `tools/list` succeeds and returns Kameleoon tools. You should see all tools listed in the table above, including `experiment_code_get`, `feature_flag_list`, and `feature_flag_create`.

**2. Retrieve feature flags**

```
feature_flag_list(siteCode = "d1alzzxd7k")
```

A successful response returns a list of feature flags for the site. In a validated test, this returned 8 flags including `snake_game`, `new_search`, and `stale_flag`.

**3. Retrieve experiment results**

```
experiment_results_get(experimentId = 149640)
```

A successful response includes the experiment name, site code, type, and status. In a validated test, this returned experiment "Test 1" with type `CLASSIC` and status `draft`.

---

## Integration: Cursor

Cursor integrates MCP tools directly into the IDE Chat sidebar, making them available while you code.

### Setup

1. Open Cursor Settings (`Cmd + Shift + J` on Mac, `Ctrl + Shift + J` on Windows/Linux).
2. Navigate to **Features** > **MCP Servers** > **+ Add New MCP Server**.
3. Set **Name** to `kameleoon` and **Type** to `command`.
4. Enter the following as the **Command**:

```bash
npx -y mcp-remote@0.1.37 https://mcp.kameleoon.com/mcp 35535 \
  --static-oauth-client-metadata '{ "scope": "openid" }'
```

5. Save the configuration. On first use, a browser window will open for OAuth authorization.

---

## Tool Parameters Reference

Use the exact tool names and parameter names returned by `tools/list`. The live MCP schema confirms the following:

| Tool | Required Parameters | Optional Parameters |
|---|---|---|
| `feature_flag_list` | `siteCode` | — |
| `feature_flag_get` | `featureKey`, `siteCode` | `environmentKey` |
| `feature_flag_enable` | `featureKey`, `siteCode` | `environmentKey` |
| `feature_flag_create` | `featureKey`, `siteCode` | — |
| `experiment_results_get` | `experimentId` | — |
| `experiment_code_get` | `experimentId`, `variationId` | — |

> **Tip:** For environment-specific reads, pass `environmentKey = "production"` or `environmentKey = "staging"` where supported.

---

## Troubleshooting

### Port 35535 Already In Use

If authentication fails with `EADDRINUSE`, another process is already listening on the OAuth callback port.

- **Cause:** A stale `mcp-remote` process from a previous authentication attempt.
- **Fix:** Stop the stale process using port `35535`, then rerun the OAuth command.

### MCP Server Not Appearing in Codex Chat

Codex may not hot-reload newly added MCP servers into an already-running thread.

- **Fix:** Refresh Codex or start a new session after updating `config.toml`.

### Browser Flow Does Not Complete

If the OAuth browser window opens but authorization doesn't finish:

- Confirm you clicked the **Authorize** button on the Kameleoon login page.
- Check that localhost callbacks are not being blocked by your browser or system settings.
- Try opening the callback URL manually if your browser didn't open automatically.

### Headless / Remote Agents (No Browser Access)

Remote or headless agents (such as cloud-hosted Codex) cannot complete the browser-based Authorize step.

- **Fix:** Use a Service Token instead of OAuth. Pass the token via the `--header` flag in your configuration.

### npx Not Found

If the command fails with a "not found" error, ensure `npx` is available on your system path. It is bundled with Node.js v5.2+.

---

*Validated endpoint: `https://mcp.kameleoon.com/mcp` · Proxy: `mcp-remote@0.1.37` · OAuth scope: `openid` · Callback port: `35535`*
