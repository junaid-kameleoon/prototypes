# Kameleoon Test Ideation

Kameleoon’s AI-powered Test Ideation analyzes your website’s interface to identify friction points and automatically generate optimization hypotheses. It transforms raw interface observations into implementation-ready experiments, allowing you to launch tests faster and with higher confidence.

# Overview

Designed in partnership with [Conversion](https://conversion.com/) by Gain, a leading experimentation agency, the Kameleoon Test Ideation engine uses a hierarchical diagnostic structure to analyze your web pages. It mimics the reasoning of a CRO expert by scanning your site’s visual hierarchy, content, and layout.

Based on this analysis, the feature provides:

* **Friction identification:** Pinpoints specific usability or motivational barriers.  
* **Root cause analysis:** Explains *why* a problem exists using behavioral psychology principles.  
* **Experiment suggestions:** Proposes concrete A/B test ideas to improve performance.  
* **Wireframe variations:** Generates specific design changes (copy, layout, styling) ready for implementation.

# How it works

The analysis happens in the background using a five-layer reasoning model, which ensures every suggestion is grounded in behavioral data rather than random guessing.

## Analysis and problem detection

The system takes a snapshot of your page and maps every component (button, headers, text blocks). It then clusters observations to identify problems—high-level friction that negatively impacts user behavior.

## Root cause diagnosis

For every problem, the system identifies a root cause, which explains the psychological mechanism behind the friction. It classifies issues using the [Lever Framework](https://conversion.com/framework/the-lever-framework/) developed by Conversion. This framework organizes friction into five master levers::

* **Comprehension:** Does the user understand the offer?  
* **Motivation:** Does the user want to take action?  
* **Trust:** Does the user believe the offer is legitimate?  
* **Cost:** Is the perceived effort or price too high?  
* **Usability:** Can the user interact with the interface easily?

## Hypothesis generation

The system generates a hypothesis—a theory of change that articulates how fixing the root cause will improve the user outcome.

## Experiments and variations

For each page you analyze, the system generates one or more hypotheses. Each hypothesis includes specific test ideas that are ready to be implemented directly in the PBX interface.

To help you decide which tests to launch first, every idea is assigned an **Impact Score**. Powered by [Confidence AI](https://conversion.com/blog/confidence-ai/) the likelihood of the test producing a meaningful conversion lift, allowing you to focus on high-impact opportunities.

Each experiment suggests concrete variations—specific changes to text, layout, or styling—so you can start testing immediately without needing to design from scratch.

# Scanned pages

To generate test ideas, you must add specific URLs to the **Scanned pages** tab.

1. Click **Add pages**. The **Add pages to scan** pop-up opens.  
2. Select the project for the page.  
3. Enter the page URL.  
4. Click the **\+** icon \> **Add pages**.

You can have a maximum of 10 scanned pages per project. To check the status of your pages across all projects, click **View details**.

**Note:** Test idea generation is not instant. You must wait for the analysis to complete approximately 10-15 minutes after you scan a page.

# View and manage test ideas

You can access AI-generated test ideas directly within Kameleoon.

## Select pages for analysis

1. Log in to Kameleoon and navigate to **Insights** \> **Test Ideas**.  
2. Use the dropdown menu to select the website you want to analyze.  
3. Add the specific URLs you wish to analyze.

**Note:** The AI analysis process is thorough and may take up to **15 minutes** to complete.

## Analysis quotas and strategy

You can analyze a maximum of 10 pages per project within a 30-day period. Once a page is analyzed, you cannot request a new analysis for that specific URL until the 30-day period expires.

Because of this limit, you should select page categories rather than multiple similar pages.

* **Recommendation:** Analyze one representative URL for a category (for example, one product detail page) rather than adding 10 different product pages.  
* **Logic:** Usability friction identified on one product page is likely present on all similar pages.  
* **Targeting:** Although the analysis is performed on a single URL, you can apply the resulting experiment to *all* pages in that category (for example, targeting all product pages) using standard targeting conditions in PBX.

## Review suggestions

When you unfold a page, you will see the generated hypotheses. For each hypothesis, the system lists specific, actionable test ideas.

Each idea card displays:

* **Test name:** A concise title for the experiment.  
* **Impact Score:** A predictive score (0-10) estimating the likelihood of this test producing a conversion lift. This score is derived from analyzing thousands of historical test results to identify factors that predict success:  
  * **8-10 (High confidence):** Strong evidence, proven patterns, and clear mechanisms.  
  * **5-7 (Moderate confidence):** Reasonable hypothesis with partially supported patterns.  
  * **1-4 (Low confidence):** Speculative mechanism or unsupported patterns.

## Analyze details

To understand the logic behind a suggestion:

1. Click the **three-dots menu** next to a specific test idea.  
2. Select **See details**.

A pop-up panel displays details about the test. 

### Hypothesis

Under the **Hypothesis** dropdown, you can see:

* **Insight:** Provides a logical synthesis of why the change should work.  
* **UX Observations:** Lists specific elements on your page that triggered the recommendation.  
* **Best Practices:** Cites behavioral principles derived from academic research and successful test outcomes, ensuring recommendations are grounded in real-world performance data.  
  * Example Best Practices are:  
    * **Attention Follows Visual Weight:** Universal perceptual law validated across hundreds of tests.  
    * **Explicitly Framing Reduces Interpretation Effort:** Mechanism-aligned pattern from clarity testing.  
    * **Primary CTAs Require Dominant Contrast:** Design heuristic with consistent positive results.

### Test Idea

Use the **Test Idea** dropdown to see the specific variations proposed for that test idea. These variations represent concrete ways to implement the test idea (for example, changing the checkout flow to a single-page layout.

# Launch an experiment

Once you identify a promising idea, you can move directly to the implementation phase.

1. In the sidebar, identify the variation you want to test.  
2. Click **Create in PBX**.

## How experiments are created

* **First variation:** The first time you click **Create in PBX** for a test idea, Kameleoon creates a new experiment containing the selected variation.  
* **Additional variations:** To test multiple variations against each other (for example, Variation A versus Variation B), select a second variation from the list and click **Create in PBX** again. The system automatically adds this new variation to the experiment created in the previous step.

The PBX interface opens with the targeted element and suggested changes ready for review. You can then finalize the design and launch the experiment.