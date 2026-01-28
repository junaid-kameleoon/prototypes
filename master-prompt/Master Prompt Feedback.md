# Master Prompt Feedback

## **1\. Admin Section – Navigation & Layout**

### **1.1 Access**

* All good: I have no issue with the access itself: accessing the admin section via the top navigation menu works well for me.

### **1.2 Page Structure & Sidebars**

* I am somewhat uncomfortable with the right sidebar, as it is dedicated solely to “What is the master prompt”, while the left side is not exclusively related to the master prompt.

* Although the master prompt is the most prominent element on the left, this asymmetry feels inconsistent.

* Instead, I would have used the right area to quickly switch between projects.

### **1.3 Central Content (Left Area)**

* In the central content, we are losing a significant amount of space with the “Project Name 2” block, which does not add value and duplicates information already available in the dropdown (with the project name).

* My preference would be:

  * Remove the dropdown entirely.

  * Display the list of projects in the right sidebar instead.

  * Completely remove the “Project Name 2” block.

* If needed, this space could be replaced by a collapsible help block (“What is a master prompt”).

### **1.4 Proposed Content Hierarchy**

In the AI Settings central area, I would suggest the following structure:

1. Title: Master Prompt

2. An explanatory subtitle (to be refined)

3. A collapsible section explaining in detail what a master prompt is

* The right sidebar would then only contain:

  * The list of all projects

  * A possible visual indicator showing which projects already have a master prompt defined, which could be useful

Additional clarification: I do not think the “What is a master prompt” help content belongs in the right sidebar because the master prompt is only one option among others within the left-side AI settings content.

## **2\. Help block – “What is a Master Prompt”**

### **2.1 Definition**

* The current opening sentence (“The master prompt is the foundation of your AI experiment…”) is too vague and I even believe it is adding some complexity to understanding the feature.

* I strongly suggest being very explicit and concrete, for example:  
  “A master prompt is a prompt that is automatically attached to every user prompt.  
  It allows you to define global rules and constraints that apply across all campaigns.”

This should be stated very clearly.

### **2.2 Use Case Examples**

* I agree with keeping “Rules and constraints to follow”, and this should be listed first.

* Brand voice and tone and target audience specifics are, in my view, examples of those rules and constraints.

* Therefore:

  * I would remove them as standalone bullet points.

  * They should instead be mentioned as examples within “Rules and constraints to follow”.  
  * I would only keep 2 bullets points, for “Rules and constraints” and for “Any technical constraints”... 

## **3\. Save Behavior & Page Exit**

* The current behavior after clicking Save is not logical to me.  
  Today:  
  * A notification appears.

  * The user remains on the same page.

* Expected behavior:

  * Clicking Save should return the user to the editor.

  * A notification should confirm that the master prompt has been successfully defined and saved.

## **4\. User Experience – Prompt Interaction** 

### **4.1 Master Prompt Attachment Timing**

* It is not clear when the master prompt is displayed or attached:

  * Is it shown as soon as the user focuses on the prompt input?  
    ![][image1]  
  * Is it displayed only after pressing “Enter”?

* While the general mechanism works for me, the timing needs clarification.

Possible approaches:

* The master prompt is already attached by default when the user enters the prompt area.

* Or, the UI remains minimal initially, and the attachment appears only once the user leaves the prompt field.

Both approaches are valid, but this needs to be explicitly defined.

## **5\. User View – Displaying the Master Prompt**

### **5.1 Navigation Back to the Editor**

* While the display mechanism itself is fine, returning to the editor does not feel smooth.

* The “Back to editor” action is not sufficiently visible.

* I would suggest:

  * A prominent close icon to exit the master prompt view.

  * Ensuring that clicking “Hide master prompt” also clearly returns the user to the editor.

### **5.2 Project Context Display**

* As in the admin view, the “Project Name 2” grey block is unnecessary in the user view.

* The master prompt should simply be displayed for the active project.
