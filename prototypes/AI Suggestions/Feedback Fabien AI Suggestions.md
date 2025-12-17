# Feedback related to AI Suggestions mocks

## **1\. AI Suggestion Dashboard**

### **1.1 Add a descriptive subtitle**

Under the main title *AI Suggestion*, I recommend adding a small subtitle that briefly explains the purpose of the page and what the user can expect to find there. This could be complemented with a small tooltip for additional clarification.

### **1.2 Clean up the tabs area**

On the line with the **Suggested Experiments / Tracked Pages** tabs:

* Remove the icons on the far right; they don’t bring meaningful value for now.

* Review the tags (**All, New, Launch**, etc.) to make sure they align with the actual lifecycle/status of suggestions. I suggest : New suggestion / Draft (or crafting / crafting experiment) / Launched (experiment)

* Remove the sentence *"Suggested experiments will be updated in approximately 6 hours"*, which I find unnecessary.

### **1.3 Improve the hierarchy and structure**

As mentioned during the meeting, the hierarchy should clearly reflect:

1. A list of **pages**,

2. Each page containing several **hypotheses**,

3. Each hypothesis containing one or more **suggested experiments**.

The prototype you shared felt clearer in that sense, so it may help as a reference.

### **1.4 Improve badges and labels**

* Status badges should be much more visible and color-coded (e.g., *Launch* in green).

* Replace the New badge with New Suggestion for clarity.

* Remove the Create in PBX CTA from the experiment cards.

* Add the label Impact Score next to the score so the user clearly understands what the number represents.  
* Add a tooltip next to the Impact Score that explains how its computed.

* Clicking anywhere on an experiment card should open the right sidebar.

**1.5 Add discard action**

* Allow users to remove / discard suggestions when they judge it irrelevant

## **2\. Right Sidebar**

### **2.1 Increase the width**

The current width feels too narrow. I suggest increasing it by at least one-third.

### **2.2 Consolidate versions 1 and 2 into a single sidebar**

My proposal is to have one unified sidebar, where different sections expand depending on what the user clicks on.

The sidebar would include **three main sections by default**:

1. **Hypothesis**

2. **Diagnosis**

3. **Suggested Experiment**

#### **How each section would work:**

* **Hypothesis:** identical to today’s block.

* **Diagnosis:** the same content as in option 2 of your prototype.

* **Suggested Experiment:**

  * Displays, for each suggestion, the image, the experience name, the impact score.  
  * Each suggestion can be expanded.  
  * Clicking on one expands the full suggested experiment details.  
  * Inside each suggestion block, we also need to display the date when the suggestion was made — something like “Suggested X days ago.”

Alternative to also investigate: 

* Only have 2 sections: “Hypothesis” (or diagnostics / assessments)  and “Suggested experiments”. In this case, the first section will be composed of different parts: Hypothesis / Evidence / UX Observations

### **2.3 Make experiment status immediately visible**

At a glance, users should clearly see whether the suggestion is:

* A New Suggestion,

* A Draft Experiment,

* A Launched Experiment, etc.

If the experiment is already launched, there should be a direct link to its results page.

### **2.4 Dashboard → Sidebar behaviour**

When clicking an experiment from the dashboard:

* It should open the right sidebar.

* It should automatically expand the relevant experiment section.

Additionally, for convenience, keep a small link “View diagnostics” in the hypothesis line (as in option 2\)  that allows users to open both Hypothesis and Diagnosis at once (a good balance between options 1 and 2).

\-\> In other words, we have just a unique right sidebar composed of different sections. Depending on where we click in the AI suggestion dashboard (either on the “View diagnostics” link or on a suggestion), it expands only the relevant section.

### **2.5 CTAs within the sidebar**

At the bottom, keep the Close CTA.  
 For experiment creation, the Create in PBX CTA should appear within each expanded experiment sub-block, not at the top level.

## **3\. Tracked Pages**

In the Tracked Pages tab, it is essential to add the ability to assign a custom name to each Page URL.  
 This name should then appear by default in the Suggested Experiments tab instead of the raw URL, improving readability.

**4\. To be done for a lot 2**

We should also plan to add further capabilities as soon as possible, even if they’re not necessary for the MVP.

### **4.1 Lot 2 \- Add a few KPIs above the search bar** 

Without taking too much space, adding a small KPI section could help reinforce the analytical dimension of the page and improve overall comprehension. Suggested KPIs:

* Number of analyzed projects

* Number of analyzed pages

* Number of generated suggestions

* (Optional) A ratio showing the number of suggestions actually used (i.e., linked to a live or draft experiment)

**4.2 Lot 2 \- Add a filter sidebar**

* Add filters so that users could easily find a suggestion

**4.3 Lot 2 \- Ability to tag suggestions**

* Allow users to attribute tags to suggestion

