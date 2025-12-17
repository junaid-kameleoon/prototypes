# Athena API

## Integration Guide for Kameleoon

Version 1.0 | December 2025

---

## Overview

The Athena API is a behavioral UX diagnostic engine that transforms any webpage into a structured experimentation roadmap. Athena combines cognitive modeling, visual-interface parsing, and interaction-design heuristics to decompose interfaces into discrete components, identify friction patterns that erode conversion, and map those patterns to underlying behavioral mechanisms.

At its core, Athena operates through the **Lever Framework** — a proprietary behavioral taxonomy that categorizes friction into five master levers (Comprehension, Motivation, Trust, Cost, Usability), each subdivided into specific mechanisms and sub-mechanisms. Every diagnosis is grounded in component-anchored UX observations and cross-referenced against a curated **Conversion Best Practices library** of validated behavioral principles.

The output is a multi-layered causal chain: **Hypotheses → Experiments → Variations** — each layer mechanistically grounded, evidence-based, and traceable to observable interface properties. Hypotheses are testable theories of behavioral change anchored to the Lever Framework. Experiments are specific test concepts targeting discrete components, evaluated using prioritization scoring to surface high-leverage opportunities. And variations are wireframe-ready specifications complete with exact copy, placement rules, and responsive behavior.

**What you get:**

- Forensic-level friction analysis across cognitive, perceptual, and behavioral dimensions  
- Hypotheses classified through a validated behavioral science taxonomy  
- Prioritized experiments targeting specific interface components  
- Implementation-ready variation specs — unambiguous enough for design and engineering without clarification

**Integration flow:**

1. Submit a page URL for analysis  
2. Poll for completion (typically 10-15 minutes)  
3. Receive the full diagnostic hierarchy: hypotheses, experiments, and variations  
4. Report back when tests are launched or completed

**Beta Availability:** Endpoints available for testing December 15, 2024\.

**Base URL:** `https://api.gainiq.io`

---

## Authentication

All requests require an API key provided in the `X-API-Key` header.

```
X-API-Key: your_api_key_here
```

API keys are scoped to your organization. All analyses and resources are automatically associated with your organization based on the API key used.

---

## Endpoints

### 1\. Initialize Analysis

Creates a new analysis for the specified page URL. The analysis runs asynchronously — you will receive an immediate response with the analysis ID and `pending` status, then poll for completion.

**Request**

```
POST https://api.gainiq.io/athena/analyses
```

**Headers**

```
X-API-Key: your_api_key_here
Content-Type: application/json
```

**Body**

```json
{
  "page_url": "https://www.example.com/product-page"
}
```

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| page\_url | string | Yes | Full URL of the page to analyze. Must be a valid, publicly accessible URL. |

**Responses**

*Success (202 Accepted)*

```json
{
  "id": 18472,
  "status": "pending"
}
```

*Invalid URL (400 Bad Request)*

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid URL format. Please provide a valid, publicly accessible URL."
}
```

*Invalid API Key (401 Unauthorized)*

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid or missing API key. Ensure the X-API-Key header is present and valid."
}
```

*Page Already Analyzed (429 Too Many Requests)*

```json
{
  "error": "RATE_LIMITED",
  "message": "This page has already been analyzed within the last 30 days. Each page URL can only be analyzed once per 30-day rolling period.",
  "unlock_date": "2025-01-15T00:00:00.000Z"
}
```

*Site Limit Reached (429 Too Many Requests)*

```json
{
  "error": "RATE_LIMITED",
  "message": "Site analysis limit reached. A maximum of 10 unique pages per domain can be analyzed within a 30-day rolling period. Your next analysis slot opens on the date below.",
  "unlock_date": "2025-01-15T00:00:00.000Z"
}
```

---

### 2\. Poll Analysis Status

Retrieves the current status of an analysis. When the status reaches `completed`, the response includes the full analysis payload with the page object containing the hypotheses array.

**Request**

```
GET https://api.gainiq.io/athena/analyses/{analysis_id}
```

**Headers**

```
X-API-Key: your_api_key_here
```

**Path Parameters**

| Parameter | Type | Description |
| :---- | :---- | :---- |
| analysis\_id | string | The analysis ID returned from initialization |

**Responses**

*Pending (200 OK)*

```json
{
  "id": 18472,
  "status": "pending"
}
```

*Processing (200 OK)*

```json
{
  "id": 18472,
  "status": "processing"
}
```

*Completed (200 OK)*

See [Completed Analysis Response](#completed-analysis-response-example) for the full payload structure.

*Failed (200 OK)*

```json
{
  "id": 18472,
  "status": "failed",
  "error_message": "Unable to load page content. The URL may be inaccessible or protected."
}
```

*Not Found (404 Not Found)*

```json
{
  "error": "NOT_FOUND",
  "message": "Analysis not found. The analysis ID may be invalid or belong to a different organization."
}
```

**Recommended Polling Strategy**

Poll every 1-2 minutes. Most analyses complete within 10-15 minutes depending on page complexity.

**Retrying Failed Analyses**

If an analysis fails, you may resubmit the same URL for re-analysis. Failed analyses do not count against the 30-day page limit. However, there is a maximum of 3 retry attempts per page per day to prevent abuse.

---

### 3\. Update Variation

Report the status of a variation that was launched as a test in Kameleoon. This endpoint accepts two distinct status updates:

- **launched** — When a variation is deployed as an A/B test. Requires the CSS and JS injection scripts.  
- **completed** — When a test has concluded. Requires the results payload.

**Status Lifecycle:** Variations start with a `null` status. Once updated to `launched`, the status can only transition to `completed`. Status transitions are one-way and cannot be reverted.

**Request**

```
PUT https://api.gainiq.io/athena/variations/{variation_id}
```

**Headers**

```
X-API-Key: your_api_key_here
Content-Type: application/json
```

**Path Parameters**

| Parameter | Type | Description |
| :---- | :---- | :---- |
| variation\_id | string | The variation ID from the analysis |

**Body — When Launching a Test**

```json
{
  "status": "launched",
  "css": ".hero-headline { font-size: 2.5rem; font-weight: 700; }",
  "js": "document.querySelector('.hero-headline').textContent = 'Performance running shoes for faster miles.';"
}
```

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| status | string | Yes | Must be `launched` |
| css | string | Yes | CSS modifications injected as part of the A/B test DOM manipulation |
| js | string | Yes | JavaScript modifications injected as part of the A/B test DOM manipulation |

**Body — When Completing a Test**

```json
{
  "status": "completed",
  "results": { }
}
```

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| status | string | Yes | Must be `completed` |
| results | object | Yes | Test results data (schema TBD) |

**Note:** The detailed schema for `results` is being finalized and will be documented in a future revision.

**Responses**

*Success (200 OK)*

```json
{
  "id": 58291,
  "status": "launched",
  "updated_at": "2024-12-15T14:30:00.000Z"
}
```

*Validation Error (400 Bad Request)*

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Missing required field: css. When status is 'launched', both css and js fields are required."
}
```

*Not Found (404 Not Found)*

```json
{
  "error": "NOT_FOUND",
  "message": "Variation not found. The variation ID may be invalid or belong to a different organization."
}
```

---

## Completed Analysis Response Example {#completed-analysis-response-example}

When an analysis reaches `completed` status, the response includes the page object with nested hypotheses. The analysis hierarchy flows from hypotheses down through experiments to variations, providing actionable optimization opportunities grounded in behavioral evidence. This example includes just one hypothesis for brevity, but an analysis will typically include several.

```json
{
  "id": 18472,
  "status": "completed",

  "page": {
    "id": 41893,
    "url": "https://www.acmerun.com/",
    "type": "Homepage",
    "title": "Acme Run | Performance Running Shoes",
    "desktop_screenshot_url": "https://cdn.example.com/screenshots/acmerun-home-desktop.png",

    "hypotheses": [
      {
        "id": 29847,
        "master_lever": "Comprehension",
        "lever": "Product Understanding",
        "sub_lever": "Clarity",
        "name": "Clarify hero value prop",
        "description": "If we clarify what Acme Run sells and why it matters, then new visitors will more quickly understand the offering, increasing their likelihood of exploring products.",

        "evidence": {
          "insight": "When the hero copy clearly communicates the product and value proposition, users understand the page faster and are more likely to continue exploring.",
          "ux_observations": [
            {
              "id": 67234,
              "name": "Vague hero headline",
              "description": "The hero headline 'Run Beyond Limits' does not state that Acme Run sells performance running shoes or why they are different.",
              "component": {
                "id": 15782,
                "name": "Hero Section",
                "description": "The primary above-the-fold hero banner containing headline, subtext, imagery, and the main call-to-action for the homepage, representing the first impression of the brand and offer.",
                "query_selector": "#hero-section",
                "x": 0,
                "y": 0.9,
                "width": 100,
                "height": 8.75
              }
            },
            {
              "id": 67235,
              "name": "CTA lacks benefit",
              "description": "The main CTA text 'Shop Now' is generic and not paired with any benefit such as free shipping or easy returns.",
              "component": {
                "id": 15782,
                "name": "Hero Section",
                "description": "The primary above-the-fold hero banner containing headline, subtext, imagery, and the main call-to-action for the homepage, representing the first impression of the brand and offer.",
                "query_selector": "#hero-section",
                "x": 0,
                "y": 0.9,
                "width": 100,
                "height": 8.75
              }
            }
          ],
          "best_practices": [
            {
              "source": "Conversion Best Practice",
              "name": "Lead with clear offer",
              "description": "Users should be able to understand what the product or service is and who it is for within seconds of landing on the page."
            },
            {
              "source": "Conversion Best Practice",
              "name": "Pair CTAs with benefits",
              "description": "Primary calls-to-action perform better when paired with a concrete benefit such as free shipping, free returns, or a risk-free trial."
            }
          ]
        },

        "experiments": [
          {
            "id": 38291,
            "name": "Strengthen hero messaging",
            "description": "Rework the hero headline and supporting copy to clearly state that Acme Run sells performance running shoes and why they are worth choosing.",
            "component": {
              "id": 15782,
              "name": "Hero Section",
              "description": "The primary above-the-fold hero banner containing headline, subtext, imagery, and the main call-to-action for the homepage, representing the first impression of the brand and offer.",
              "query_selector": "#hero-section",
              "x": 0,
              "y": 0.9,
              "width": 100,
              "height": 8.75
            },
            "score": 8.1,

            "evidence": {
              "insight": "When the hero communicates a clear product and value message, users understand the brand faster.",
              "ux_observations": [
                {
                  "id": 67234,
                  "name": "Vague hero headline",
                  "description": "The hero headline 'Run Beyond Limits' does not state that Acme Run sells performance running shoes or why they are different.",
                  "component": {
                    "id": 15782,
                    "name": "Hero Section",
                    "description": "The primary above-the-fold hero banner containing headline, subtext, imagery, and the main call-to-action for the homepage, representing the first impression of the brand and offer.",
                    "query_selector": "#hero-section",
                    "x": 0,
                    "y": 0.9,
                    "width": 100,
                    "height": 8.75
                  }
                }
              ],
              "best_practices": [
                {
                  "source": "Conversion Best Practice",
                  "name": "Lead with clear offer",
                  "description": "Users should be able to understand what the product or service is and who it is for within seconds of landing on the page."
                }
              ]
            },

            "variations": [
              {
                "id": 58291,
                "name": "Direct product headline",
                "description": "Replace the abstract hero headline with a direct product-focused statement.",
                "specification": "Replace the current hero headline with: 'Performance running shoes for faster, more comfortable miles.' Keep the headline as a single bold line at the top of the hero text column, left-aligned, and visually dominant over all supporting copy. Maintain the existing typographic hierarchy so the headline remains the largest text element in the hero. Preserve current spacing between headline and subcopy and ensure the new copy does not exceed two lines on standard desktop widths. On tablet and mobile, allow natural wrapping but keep the headline as the first text element in the hero under the navigation."
              },
              {
                "id": 58292,
                "name": "Headline plus subcopy",
                "description": "Introduce a concise hero headline paired with a clarifying subheading.",
                "specification": "Change the hero headline to: 'Run better with evidence.' Directly beneath it, add a subheading that reads: 'Performance running shoes engineered from testing and customer insights, with free shipping and free returns on every order.' The headline must retain its primary display style and remain the largest text element. The subheading must use a smaller, regular-weight style and stay as a single paragraph block. Place one line-height of vertical space between the headline and subheading. Keep the primary CTA directly below the subheading with at least one line-height of spacing. On mobile, allow the subheading to wrap to a maximum of three lines and ensure it remains above the primary CTA."
              }
            ]
          },
          {
            "id": 38292,
            "name": "Add benefit to CTA",
            "description": "Adjust the primary hero CTA to communicate a concrete benefit and reduce perceived purchase risk.",
            "component": {
              "id": 15782,
              "name": "Hero Section",
              "description": "The primary above-the-fold hero banner containing headline, subtext, imagery, and the main call-to-action for the homepage, representing the first impression of the brand and offer.",
              "query_selector": "#hero-section",
              "x": 0,
              "y": 0.9,
              "width": 100,
              "height": 8.75
            },
            "score": 8.7,

            "evidence": {
              "insight": "Benefit-oriented CTAs reduce friction and increase early engagement.",
              "ux_observations": [
                {
                  "id": 67235,
                  "name": "CTA lacks benefit",
                  "description": "The main CTA text 'Shop Now' is generic and not paired with any benefit such as free shipping or easy returns.",
                  "component": {
                    "id": 15782,
                    "name": "Hero Section",
                    "description": "The primary above-the-fold hero banner containing headline, subtext, imagery, and the main call-to-action for the homepage, representing the first impression of the brand and offer.",
                    "query_selector": "#hero-section",
                    "x": 0,
                    "y": 0.9,
                    "width": 100,
                    "height": 8.75
                  }
                }
              ],
              "best_practices": [
                {
                  "source": "Conversion Best Practice",
                  "name": "Pair CTAs with benefits",
                  "description": "Primary calls-to-action perform better when paired with a concrete benefit such as free shipping, free returns, or a risk-free trial."
                }
              ]
            },

            "variations": [
              {
                "id": 58293,
                "name": "Benefit in CTA label",
                "description": "Update the CTA label so the benefit is directly embedded into the button text.",
                "specification": "Replace the hero CTA label text with: 'Shop with free shipping.' Keep the existing button size, style, and position relative to the hero copy. Ensure the label fits on a single line on desktop and tablet widths, and wraps to a maximum of two lines on smaller mobile screens. Do not add additional CTAs in this area. The CTA must remain below the primary hero copy and maintain existing vertical spacing relationships with surrounding text."
              },
              {
                "id": 58294,
                "name": "Add reassurance microcopy",
                "description": "Add a microcopy reassurance line beneath the CTA.",
                "specification": "Keep the hero CTA label as 'Shop now' but add a single microcopy line directly beneath the CTA that reads: 'Free shipping and free returns on every pair.' Use a smaller font size and lighter weight than the CTA label and left-align the microcopy with the button text. Place a small amount of vertical spacing between the CTA and the microcopy so they are visually grouped. Ensure the microcopy stays on a single line on desktop and may wrap to two lines on mobile. The microcopy must remain visually associated with the CTA."
              }
            ]
          }
        ]
      }
    ]
  }
}
```

---

## Schema Definitions

### Page

| Field | Type | Description |
| :---- | :---- | :---- |
| id | number | Unique identifier |
| url | string | The analyzed page URL |
| type | string | Page category (Homepage, PDP, PLP, Landing Page, etc.) |
| title | string | Page title |
| desktop\_screenshot\_url | string | URL to the captured screenshot |
| hypotheses | Hypothesis\[\] | Array of hypotheses for the page |

### Hypothesis

A testable theory of behavioral change, classified through the Lever Framework.

| Field | Type | Description |
| :---- | :---- | :---- |
| id | number | Unique identifier |
| master\_lever | string | Top-level behavioral category |
| lever | string | Specific mechanism within the master lever |
| sub\_lever | string | Granular sub-mechanism |
| name | string | Hypothesis title |
| description | string | If-then statement explaining the expected behavioral improvement |
| evidence | Evidence | Supporting observations and best practices |
| experiments | Experiment\[\] | Testable concepts derived from this hypothesis |

**Master Levers:** Comprehension, Motivation, Trust, Cost, Usability

### Experiment

A testable concept targeting a specific component/section of the page, scored for prioritization.

| Field | Type | Description |
| :---- | :---- | :---- |
| id | number | Unique identifier |
| name | string | Experiment title |
| description | string | What the experiment tests |
| component | Component | Target UI component |
| score | number | Composite score (1-10) for test prioritization |
| evidence | Evidence | Supporting observations and best practices |
| variations | Variation\[\] | Implementation options |

### Variation

A wireframe-ready implementation of an experiment concept.

| Field | Type | Description |
| :---- | :---- | :---- |
| id | number | Unique identifier |
| name | string | Variation title |
| description | string | Summary of the approach |
| specification | string | Detailed implementation instructions including copy, placement, and responsive behavior |

### Component

| Field | Type | Description |
| :---- | :---- | :---- |
| id | number | Unique identifier |
| name | string | Component name |
| description | string | What the component contains and its role on the page |
| query\_selector | string | CSS selector for targeting the element (e.g., `#hero-section`, `.main-cta`) |
| x | number | X position as percentage of screenshot width (0-100) |
| y | number | Y position as percentage of screenshot height (0-100) |
| width | number | Width as percentage of screenshot width |
| height | number | Height as percentage of screenshot height |

**Note:** Percentage values are relative to the `desktop_screenshot_url` image dimensions. Use these coordinates to render component overlays on the screenshot.

### Evidence

| Field | Type | Description |
| :---- | :---- | :---- |
| insight | string | Summary of why this matters |
| ux\_observations | UxObservation\[\] | Observations from the page supporting the claim |
| best\_practices | BestPractice\[\] | Validated principles supporting the claim |

### UxObservation

| Field | Type | Description |
| :---- | :---- | :---- |
| id | number | Unique identifier |
| name | string | Observation label |
| description | string | What was observed on the interface |
| component | Component | The component this observation relates to |

### BestPractice

| Field | Type | Description |
| :---- | :---- | :---- |
| source | string | Conversion Best Practice |
| name | string | Principle name |
| description | string | The behavioral principle |

---

## Status Reference

| Status | Description |
| :---- | :---- |
| pending | Analysis created and queued for processing |
| processing | Analysis is actively running |
| completed | Analysis finished successfully with results available |
| failed | Analysis encountered an error during processing |

---

## Rate Limiting

To ensure high-quality analysis and fair usage, the following limits apply:

**Page Limit**

Each URL can only be analyzed once within a 30-day rolling period. Attempting to re-analyze a page before the window expires returns a 429 response with the `unlock_date` indicating when the page becomes available for re-analysis.

**Site Limit**

A maximum of 10 unique pages per domain can be analyzed within a 30-day rolling period. The 11th page request returns a 429 response with the `unlock_date` indicating when the oldest analysis expires and a new slot opens.

---

## Error Codes

| HTTP Code | Error | Description |
| :---- | :---- | :---- |
| 400 | VALIDATION\_ERROR | Invalid request parameters or missing required fields |
| 401 | UNAUTHORIZED | Missing or invalid API key |
| 404 | NOT\_FOUND | Resource does not exist or belongs to different organization |
| 429 | RATE\_LIMITED | Rate limit exceeded — includes unlock\_date |
| 500 | INTERNAL\_ERROR | Server error |

---

## Additional Notes

**URL Normalization**

URLs are normalized for rate limiting purposes. Trailing slashes, query parameters, and fragments are stripped before comparison. For example, `https://example.com/page/`, `https://example.com/page?ref=123`, and `https://example.com/page#section` are all treated as the same URL (`https://example.com/page`) when enforcing the 30-day page limit.

**Analysis Scope**

Each analysis evaluates a single page. Submit separate requests for each page you want analyzed.

**Supported Page Types**

Athena analyzes the initial render of publicly accessible pages. The following are currently not yet supported:

- **Single-page applications (SPAs)** — Pages that require client-side JavaScript navigation after initial load  
- **Login-gated content** — Pages behind authentication walls  
- **Session-dependent pages** — Pages that render differently based on user state or cookies (eg. Order confirmation).

For best results, submit URLs that render complete content on first load without required authentication or session context.

