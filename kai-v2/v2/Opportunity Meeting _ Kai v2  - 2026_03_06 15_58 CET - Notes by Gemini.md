# 📝 Notes

Mar 6, 2026

## Opportunity Meeting | Kai v2 

Invited [Fred De Todaro](mailto:fdetodaro@kameleoon.com) [Junaid Gulzar Malik](mailto:jgmalik@kameleoon.com) [Justin FRÜH](mailto:jfruh@kameleoon.com) [Angela BRUNET-RODRIGUEZ](mailto:abrunet@kameleoon.com) [Aleksandr KOVALEV](mailto:akovalev@kameleoon.com) [Fabien Dimeglio](mailto:fdimeglio@kameleoon.com) [Erwan SADOUN](mailto:esadoun@kameleoon.com) [Calixthe MATTEI](mailto:cmattei@kameleoon.com) [Luka MACHARADZE](mailto:lmacharadze@kameleoon.com) [Jean-Christophe CARLES](mailto:jccarles@kameleoon.com) [Christian Neri](mailto:cneri@kameleoon.com) [Sukhrob Rakhimov](mailto:srakhimov@kameleoon.com)

Attachments [Opportunity Meeting | Kai v2 ](https://www.google.com/calendar/event?eid=NDl1ZGdhMTlpdnM3Y3F0bmY0Z3BmMXAzaWogamdtYWxpa0BrYW1lbGVvb24uY29t) 

Meeting records [Transcript](?tab=t.142n2p53nfp) 

### Summary

Junaid Gulzar Malik introduced the planned KAI version two initiative to pivot the tool from a passive chat assistant to an active, agentic orchestration layer, targeting enterprise users reliant on LLMs and addressing platform fragmentation, context loss, and the disparity between Kai and internal tools like PBX. The proposal, structured into "Actions," "Chat," and "Insights" branches, includes a prototype demonstrating a co-pilot for tasks like starting A/B tests and generating instant reports, which Erwan SADOUN confirmed could involve generating a SQL query for a new report. Participants, including Justin FRÜH, Jean-Christophe CARLES, Christian Neri, and Calixthe Mattei, discussed competitor analysis (Optimizely Opel and Growth Book), potential naming changes to "PBX Assistant," the ownership of MCP entry points, and feedback on the three-tab structure, with Calixthe Mattei preferring a fully agentic, pure chat interface.

### Details

* **Meeting Introduction and Objectives**: Junaid Gulzar Malik welcomed attendees and introduced the meeting as an opportunity to discuss the planned KAI version two, emphasizing that the session is not for technical validation but for gathering feedback, building upon ideas, and proposing counter-ideas ([00:01:24](#00:01:24)). The objective is to gain buy-in to pivot Kai from a passive chat assistant to an active, agentic orchestration layer integrated directly into product workflows for various users, including experimenters, developers, and marketers ([00:03:30](#00:03:30)).

* **Target Users and LLM Dependency**: The primary target user for the KAI version two initiative includes enterprise users across industries, specifically those utilizing Chameleon, such as Product Managers, developers, and marketing professionals. The solution is intended for users who are AI-savvy or have workflows that rely on Large Language Models (LLMs), such as those using Chameleon alongside tools like ChatGPT or Claude ([00:03:30](#00:03:30)).

* **Problem Statement: Platform Fragmentation and Context Loss**: Junaid Gulzar Malik identified several core issues, including too much friction for "last mile actions" that Kai currently does not facilitate, and a daily fatigue from switching between numerous pages within Chameleon for key actions. The platform's UI is becoming increasingly fragmented, and there is a critical lack of context that persists across different features and pages ([00:04:42](#00:04:42)).

* **Growing Disparity Between Internal Tools**: A significant problem is the growing contrast between the intelligence of PBX and Kai, leading users who are accustomed to PBX's behavior to be disappointed by Kai's current capabilities. Users often have to switch between PBX dashboards, code environments, and other pages to complete daily tasks, while Kai often hallucinates or lacks sufficient context in conversations ([00:05:44](#00:05:44)).

* **Strategic Justification for Addressing the Problem**: Addressing these issues now offers a competitive leap and establishes a strong foundation for future AI tooling. Competitors like Optimizely are implementing agentic flows, and Growth Book is highly competitive in the IDE space with its MCP server ([00:06:46](#00:06:46)). This move is both offensive for differentiating the product and defensive against tools with more advanced MCP toolkits ([00:07:53](#00:07:53)).

* **Competitor Analysis: Optimizely and Growth Book**: Optimizely’s AI assistant, Opel, is currently the closest parallel to an advanced Kai, focusing heavily on content generation and automating marketer campaigns but showing no evidence of IDE support. In contrast, Growth Book has a very strong IDE integration via its MCP for flag management and code generation, which includes pulling historical experiment data, though it offers nothing for non-technical users ([00:08:46](#00:08:46)).

* **Optimizely Opel Capabilities**: Optimizely’s Opel is a powerful standalone tool with excellent surfacing across all stages of the experimentation workflow, effectively completing the experimentation loop. Opel can be used for ideation, audience targeting, and analysis of page performance, and it features canned responses for easy starting points ([00:11:02](#00:11:02)). Erwan SADOUN questioned whether the charts in Opel are generated based on the user's prompt, which Junaid Gulzar Malik confirmed, suggesting it might generate a SQL query to create a new report page with charts ([00:13:07](#00:13:07)).

* **KAI Version 2 Proposal Structure**: The KAI version two proposal is broken down into three branches of enhancements that live under an overarching intelligent layer. These branches are: "Actions" (creating experiments, generating ideas, basic workflows), "Chat" (help docs, context summary, custom analytics), and "Insights" (notifications engine, alerts, opportunity detection) ([00:16:56](#00:16:56)).

* **Prototype Demonstration and Core Functions**: The prototype of Kai shows a co-pilot living on the side of the UI with available actions, such as starting a new A/B test via prompt ([00:18:57](#00:18:57)). Junaid Gulzar Malik proposes that Kai should ideally handle tasks entirely through chat, but a more realistic short-term plan involves an enhanced UI with Calls to Action (CTAs) ([00:18:01](#00:18:01)). The demonstration also included Kai generating instant reports and custom analytics based on prompts, which could be shared or exported immediately ([00:22:04](#00:22:04)).

* **Insights Tab and Alert System Proposal**: The proposed "Insights" tab would be relevant for the Business Unit (BU) and would include top-line summary statistics, such as win rate and conclusive rate, and reporting on new or reinforced learnings ([00:22:04](#00:22:04)). The alerts section would notify users of new test ideas, opportunity detection issues (like broken goals or health checks), and experiments reaching statistical significance ([00:23:03](#00:23:03)). This system could also double as a general notification tray, which the platform currently lacks ([00:25:11](#00:25:11)).

* **Proposed Timeline and Required Alignment**: Junaid Gulzar Malik anticipated needing until the end of March for further discovery, aligning with existing OKRs and roadmaps ([00:26:08](#00:26:08)). Validation and technical alignment are critical next steps, as the proposed scope has significant overlap with Erwan SADOUN's AI analytics initiatives. A combined development effort for the UI restructuring (Lot 1\) could begin after mid-Q2 validation, with the analytics scope starting shortly thereafter ([00:27:38](#00:27:38)).

* **Discussion on Naming and MCP Ownership**: Participants suggested renaming Kai to "PBX Assistant" to integrate it more seamlessly with the core product, noting that customers expect consistency and a singular identity across the product ([00:37:40](#00:37:40)). Justin FRÜH requested a prioritized list of actions and use cases to build the initial agents ([00:39:23](#00:39:23)). The general consensus was that the AI tool squad (Junaid Gulzar Malik's team) would be responsible for building the MCP entry points and providing the data to the front end, while the Analytics squad would handle the display ([00:40:13](#00:40:13)). Jean-Christophe CARLES pointed out that any new capabilities needed in the MCP that are not covered by the current automation API would be owned by the squad in charge of that group ([00:43:09](#00:43:09)).

* **Feedback on Visual Identity and Agentic Approach**: Christian Neri questioned whether the new contextually based Kai UI should share the same visual identity as PBX to improve user experience and reduce distinctness ([00:46:20](#00:46:20)). Calixthe Mattei expressed confusion regarding the tab structure (Actions, Chat, Insights), suggesting that a fully agentic orchestration layer should hide the underlying sub-agents and tools from the user, preferring a pure chat interface similar to Claude or ChatGPT. Junaid Gulzar Malik agreed that the ultimate goal is a chat-only interface but suggested the proposed tabs could serve as essential entry points for basic actions in an intermediate stage ([00:47:16](#00:47:16)) ([00:50:05](#00:50:05)).

### Suggested next steps

- [ ] Junaid Gulzar Malik will complete more discovery on the KAI version 2 proposal by the end of March.  
- [ ] Junaid Gulzar Malik will share a summary of the notes and discussion from the meeting and create a list of action items for the AI tool squad to start working on next.  
- [ ] Erwan SADOUN will prepare a list of problems to solve or user stories for the next opportunity meeting, as a takeaway for the squad.  
- [ ] Calixthe Mattei will send the link to the plug-and-play library called chatkit.  
- [ ] Junaid Gulzar Malik and Erwan SADOUN will sync afterwards to create a list of responsibility matrix for the different user stories and subset of problems that need to be solved.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=dfXx_Y5hrjAu3f_osRsLDxIROAIIigIgABgDCA&detailid=standard)*

# 📖 Transcript

Mar 6, 2026

## Opportunity Meeting | Kai v2  \- Transcript

### 00:00:00

   
**Erwan SADOUN:** Hey.  
**Junaid Gulzar Malik:** Hope you're  
**Erwan SADOUN:** Oh,  
**Junaid Gulzar Malik:** good.  
**Erwan SADOUN:** wait. My earphones don't work. Okay. Can you hear me?  
**Junaid Gulzar Malik:** Yeah. Yeah. Yeah. I hear you. I hear you. Fine.  
**Erwan SADOUN:** Yeah,  
**Junaid Gulzar Malik:** How's it going?  
**Erwan SADOUN:** it's uh going great, but I'm just super allergic. So, it's not the right time right now to  
**Junaid Gulzar Malik:** Allergic to what?  
**Erwan SADOUN:** uh Poland. Is it the same word?  
**Junaid Gulzar Malik:** Oh, okay. Okay. Okay. Oh, yeah. Yeah.  
**Erwan SADOUN:** Yeah.  
**Junaid Gulzar Malik:** It's a It's a bad time for you then. I can imagine.  
**Erwan SADOUN:** Yeah, it's crazy.  
**Junaid Gulzar Malik:** Worst time of the year probably  
**Erwan SADOUN:** Yeah.  
**Junaid Gulzar Malik:** then.  
**Erwan SADOUN:** Yeah.  
**Christian Neri:** Hey everyone.  
**Junaid Gulzar Malik:** Hello.  
**Erwan SADOUN:** Hey.  
**Fred De Todaro:** Hey,  
**Erwan SADOUN:** Hello.  
**Fabien Dimeglio:** Hello.  
**Fred De Todaro:** Hey,  
   
 

### 00:01:24 {#00:01:24}

   
**Justin FRÜH:** Hello. Hello.  
**Fabien Dimeglio:** Hello.  
**Angela BRUNET-RODRIGUEZ:** Don't.  
**Fabien Dimeglio:** Hello.  
**Junaid Gulzar Malik:** Uh, are we at quorum or is let me just see if something might be  
**Fred De Todaro:** heat.  
**Junaid Gulzar Malik:** missing. I think Alex might join. Just wait one more minute. All right, I'll start. Maybe Alex will join in a bit. Won't miss much. Right, everyone, welcome. Uh, thank you for taking this big slot. Ah, you're here. Sorry, I missed you. Um, thank you for taking out the time to hear about uh what we might plan for the KAI version two. It's uh today's opportunity meeting might be a bit different from the uh from the previous ones that I've done because this one is is really not coming from a place of technical validation. Uh this is more of a let's throw something together and see what everyone thinks about it. Uh so I just try to make sure my my ideas and proposals are are researched but I'm really relying on everyone here to either validate them, build upon them, give counter ideas etc. So uh hopefully this is more interactive than other opportunity meetings in in that regard.  
   
 

### 00:03:30 {#00:03:30}

   
**Junaid Gulzar Malik:** uh agenda typical won't spend time here but the objective today is to uh gain everyone's buy in here so that we can pivot Kai from a passive chat assistant which it is today more or less to an active uh agentic orchestration layer which lives directly inside the product and uh is integrated directly into the workflows for experimenters for developers marketers etc. We'll look at examples of uh how we can get there and also examples of what other competitors are doing in the space. Problem statement. This part was the hardest to put together here because it's basically Kai encompasses all of our product. So essentially all segments are targeted here but primarily let's say enterprise users cross industry user segment is anyone who is using chameleon essentially. So PMS, developers, marketing, uh we'll see some use cases for each of those and some specific criteria is basically anyone who is even slightly ex-savvy, AI savvy or has workflows relying on any variety of LLM. So if you're using Chameleon alongside chart GPD or you're using um any claude code anything alongside Chameleon, this might be for you.  
   
 

### 00:04:42 {#00:04:42}

   
**Junaid Gulzar Malik:** Then what is the problem description? We start from firstly what I think is is the core issue is that there is too much friction for last mile actions and kai does not facilitate that at all. Uh there is a daily fatigue of switching between pages within chameleon for all key actions. So just uh taking into account how many different sections we have in the left navigation bar. Now I think it might be um time to consolidate that in in uh in this more simple way. our UI and platform is just increasingly fragmented, becoming increasingly fragmented. Everyone's working in in in more or less a silo and it's I won't say it's hard to navigate around that. That is the point of a SAS solution. But uh where other tools or other um AI powered tools are headed rather I think there's more room for consolidation rather than fragmentation. uh there is a lack of context across features and pages. Whenever I'm at different pages, it forgets where I was at previously.  
   
 

### 00:05:44 {#00:05:44}

   
**Junaid Gulzar Malik:** I cannot reference other pages, other actions while I'm at a different page. Um and in my opinion the most uh most uh irritating one is the growing contrast between the intelligence of PBX and Kai where uh the users who are coming from PBX might come to anticipate the same behavior or same level of response from Kai and and they get completely disappointed. This is the only level of feedback that I have for this. The rest I've built upon on this. So users who are used to nom little brother all right it might get smarter it might get smarter so as a chameleon user when I try to perform my daily tasks in the platform I have to switch between PBX dashboards my code environment results pages and several other pages to maybe achieve the same daily tasks that I uh might be able to do with uh maybe one window of operations secondly as a chameleon user when I try to chat with guy it's often halluc inating or has no context of what I'm talking about.  
   
 

### 00:06:46 {#00:06:46}

   
**Junaid Gulzar Malik:** It's not the case everywhere. Uh Kai does get context from from certain pages. But it's uh again the the the st contrast between uh PBX and KA is just ever growing and I think it's a good time for us to address that and try to bring bridge that gap a bit. Uh why should we address this problem now? Uh this is it in terms of opportunity. I would say this gives us a big competitive leap and also uh gives us a strong foundation for future AI tooling that my squad or any other squad might build on. Our competitors are becoming implementers within their AI powered tooling. So optimizely has agentic flows now. You can build agentic workflows like on a canvas inside optimizely as we'll take a look. Uh growth book completely owns the IDE with their MCP server. There is nothing that compares to it. Um and for us uh in terms of sales or or acquisition, it's an offensive move for differentiating us because we are going in both directions and also defensive move against tools which might be more advanced in their MCP toolkit uh than ours.  
   
 

### 00:07:53 {#00:07:53}

   
**Junaid Gulzar Malik:** So we'll have we'll be able to attack on on both sides in this regard. So um as far as the other point, strong foundation for AI tooling. This deepens integration into daily workflows for users. So future proofs our UI for any feature road map with an overarching layer of of uh an intelligent version of Kai and then also create some leg room for other squads specifically Arwan and AI analytics to plan some future initiatives that might be hosted inside Kai. Uh let me know if I'm going too fast or if you have any questions at any point we can  
**Fred De Todaro:** Yes. So when you say when you say growth book is owning IDE,  
**Junaid Gulzar Malik:** stop.  
**Fred De Todaro:** can you can you share more about  
**Junaid Gulzar Malik:** Sure. I'll I'll have a a small snippet of of a video uh just afterwards,  
**Fred De Todaro:** that?  
**Junaid Gulzar Malik:** but I think you might have already seen uh video of growth books MCP server in action.  
**Fred De Todaro:** Okay.  
   
 

### 00:08:46 {#00:08:46}

   
**Fred De Todaro:** So you're talking about that. Okay. I'm not sure everybody around the table has seen that as well.  
**Junaid Gulzar Malik:** Yeah.  
**Fred De Todaro:** Yeah.  
**Junaid Gulzar Malik:** Competition. So we have essentially these two two competitors in this space. I did not list everyone else who is just providing an MCP uh server with some basic capabilities. So, Optimizely it has an AI assistant which is the closest thing to an advanced version of Kai today. Uh for optimizly one it encapsulates uh some sort of tools or features for all types of users marketers developers experimenters but focuses a lot on content generation and automating the marketer's entire campaign. We'll take a quick look at that. Is it authentic? Yes, very much so. Is there any level of IDE support or or support for developers? No, not at all. Not that I could find. Growth book um strong very very strong IDE integration. When I say IDE, it mean just code environment uh via their MCP for flag management and code generation.  
   
 

### 00:09:47

   
**Junaid Gulzar Malik:** This also pulls data from their uh previous experiments. So, historical data can generate new ideas for experiments. But again this is completely for technical users. I'll as well see agentic I don't know I I feel like it's not they haven't shown enough for me to understand how many different tools it can pull in to do different tasks but ID support it gets full marks for that. Everyone else not really focusing on the agending part. Uh they're really focused on just developing their MCP toolkit and expanding on that. This include launch directly. This excludes uh static as well. I haven't been able to find something parallel to optimize opal for other tools. And then there are uh kai version one was just a passive chat assistant for suggestions and general help. Uh it can give some some code snippets and some basic context of your experiment results etc. But I would say it it doesn't really check both of these boxes. Kai version 2 given that if we can build an active orchestrator which I keep calling it uh would be able to facilitate an ideation implementation analytics and possibly strategy but like we can talk about that later.  
   
 

### 00:11:02 {#00:11:02}

   
**Junaid Gulzar Malik:** It would be agent and it could have ID support depends on if we're able to establish link with the MCP server we're working on. again not technically validated here. So I'm going off kind of a wish list of things and we can check later what's possible deep um deepening into the optimizely workspace here. So this is what Opel looks like. I'm sure you've all seen the uh video we saw last year. Um Opel is a very strong standalone tool but also it has excellent surfacing at all stages of the experimentations workflow. So if you're at the results page, if you're at the ideation stage, it has um some canned uh responses that you can start with, which is very good. It's omniresent at almost every step of your journey and it completes the uh experimentation loop quite well. So even when you're done running your experiment and you can ask it to send you results by email within the email you can even have some CTE there which CDA sorry CTA is there which let you ideulate further on the results that you've received there.  
   
 

### 00:12:06

   
**Junaid Gulzar Malik:** Um so just giving an example of things that we can take some inspiration of where optimize web page we're already doing this with ID8 fight the right audience which might be something like segment size estimator or uh things initiatives R1 is working on and analyze page performance I'll talk about what uh what I propose for this but then it's also subpar very subpar compared to PBX ID8 maybe with uh with a better user experience because you can access it from everywhere but Um, in terms of the quality of ideas, it's quite generic. It seems like it's just putting everything into charge and giving you some uh some basic generic non-ontextualized responses based on that. U but like I mentioned, it has excellent surfacing. You can pull it up everywhere. So, this is a results page. I can ask it to generate, for example, se I don't know if you follow my mouse, but I'm trying to point at the segment results by cohort or this part. compare variation performance by registration funnel.  
   
 

### 00:13:07 {#00:13:07}

   
**Junaid Gulzar Malik:** If you click on that, you can get some graphs. Uh you can get some specified visual reporting that you can then also ask it to send to you by email. Uh you can even ask it to send to you by Slack, etc. So, some nice workflows and everything resides inside the interface here. Yes, sir.  
**Erwan SADOUN:** Yes,  
**Junaid Gulzar Malik:** One  
**Erwan SADOUN:** I just have one question for this specific uh topic. Um, are the charts generated based on the prompt you send?  
**Junaid Gulzar Malik:** Yes, I I've seen a video and here when they enter this part segment results by cohorts then it generates it it generates a new report page with the charts.  
**Erwan SADOUN:** Okay.  
**Junaid Gulzar Malik:** Uh it's not it's sorry  
**Erwan SADOUN:** So it means so it Yeah. No, sorry.  
**Junaid Gulzar Malik:** go  
**Erwan SADOUN:** So it means that before asking the the AI the charts that we're seeing here were not stored anywhere. It just it has just been created based on what the users ask. Right.  
   
 

### 00:14:04

   
**Junaid Gulzar Malik:** I would imagine that's how they sold it in the video that oh you can you can ask it to represent information in in  
**Erwan SADOUN:** Okay. Okay.  
**Junaid Gulzar Malik:** whatever uh manner that you want. If it's present somewhere I don't know I don't have access to get to this  
**Justin FRÜH:** Yeah, I mean it's data warehouse analytics.  
**Junaid Gulzar Malik:** part.  
**Justin FRÜH:** So I guess it just generate a SQL SQL query and generates the report for you.  
**Junaid Gulzar Malik:** Yeah, that's what I figured as well. I did not based on what I tried to see and spy on in the UI that was visible. Uh in either case, there is a couple of videos here linked at the bottom left. You can take a look at those there and and tell me if I missed something, but uh I think yeah, they were not present there before. Uh what else do we have? And uh this is a video that I found from December, I believe. So they also have this agent directory now where you can uh find different agents for different tasks and there's even a canvas now that you can use to build your own workflows using these specific agents as well.  
   
 

### 00:15:04

   
**Junaid Gulzar Malik:** So quite powerful stuff but as you can see it's a lot based on what the marketer works on.  
**Justin FRÜH:** It's for the CMS. In fact, it's mostly for the CMS product and and content.  
**Junaid Gulzar Malik:** Yeah.  
**Justin FRÜH:** So,  
**Junaid Gulzar Malik:** Exactly. Exactly. So content generation is really excellent here. Uh but again it's not it in terms of uh let's say PBX ID8 it does not compare at all uh in that regard and this is just a road map of or rather just a checklist of new functionality that they've released recently. some cool things here to note for us like Figma uh agent Google Analytics Zapier MCP uh here I did not really find anything that's very relevant to us but again they're they're really working on their agents  
**Justin FRÜH:** Well,  
**Junaid Gulzar Malik:** so  
**Justin FRÜH:** the PM the PM that was in charge of the visual editor, he did a post on linkodin five days ago and he mentioned something which sounds like MCP or something connected to the IDE. So,  
   
 

### 00:16:05

   
**Junaid Gulzar Malik:** Okay,  
**Justin FRÜH:** it's going he's a former dev and that's his next project as far as I  
**Junaid Gulzar Malik:** for sure. For sure.  
**Justin FRÜH:** understand.  
**Junaid Gulzar Malik:** I don't have any doubt that they will eventually like creep into this space as well and try to connect Opel to it. Uh based on based on what I can see um and I'll just play a small video. I hope it's not too blurry or too low quality. But as you can see uh growth book has an MCP server where I can just directly select the code ask it to create a feature flag here inside of the chat uh like in claude or cursor. I think they have a very strong cursor integration. I haven't really tested it out myself but uh it's it's quite excellent. I can just interact here completely to okay this feature flag is launched. I can set a targeting for it. I can set a ramp up for it rollout strategy for it and go from there.  
   
 

### 00:16:56 {#00:16:56}

   
**Junaid Gulzar Malik:** uh very strong MCP server uh I'll put a link here I forgot uh to their MCP server toolkit it's quite exhaustive but nothing at all for nontechnical users so you have to have claude integrated with the MCP integrated with the growth book um uh environment to use all of these capabilities in terms of UI there is nothing there that I could find right uh which brings us to what we can propose I've broken down what I want Kai to have in three branches of enhancements. So there's the chameleon UI on top of it lives sky which is an overarching like an umbrella which will uh take care of three things. The actions that you can take inside of Kai. So creating experiments, objects or assets. Sorry, I should have renamed this to assets, being able to generate ideas and being able to create basic workflows. Uh the chat which is the ultimate holy grail. This is where we should aim for. All of what I am supposed to present today should ideally be um doable using just chat.  
   
 

### 00:18:01 {#00:18:01}

   
**Junaid Gulzar Malik:** But right now since I want to propose a plan that is more realistic, we can look at a more enhanced UI which has some CTAs etc to get create like a short-term or medium-term plan ultimately before we get to this chat part. part today. Let's say if we have the chat part, it can help users with the help documents, the developer documentation, a context summary based on whatever page you're on right now, and then some custom analytics and reports like we saw with the optimizely just now. And Arwan is also working on something uh that he will present uh sometime soon which would be uh quite related to this part here. And lastly is the insights which is why the BU unit is here today. So there's uh a lot of missed opportunity. We don't have a notifications engine inside of Chameleon. We struggle a lot because of this because not everything can be went and set an alert for. You need to have something that surfaces automatically.  
   
 

### 00:18:57 {#00:18:57}

   
**Junaid Gulzar Malik:** So you can have alerts, notifications, errors, uh confidence and start sec uh alerts if if an experiment has reached those test idea readiness and opportunity detection. I will I'm wondering if I should switch. All right. And one last is the MCP connection which comes at an overlap of the actions and chat part. But I'm not quite sure how that connects or even if that's possible. But it's it would be something that would be fantastic if we can get there. Uh but I won't spend time on on this right now. Uh what I'll do is I'll just switch to the uh prototype that I have created just uh for everyone's reference to give you a quick sneak peek of what I have in mind and what I've shared with Fred before. I've optimized. You can also follow me around if you want. Uh you can use this link in the chat to play around with it yourself. So basically Kai would be like a copilot that lives on the site.  
   
 

### 00:19:52

   
**Junaid Gulzar Malik:** It's not just the chat part that comes up here. You have a lot of actions available here. So let's say I want to start a new AB test by prompt. I could I could I could do that. either it opens the PBX experiment popup where I can just quickly create a new PBX experiment for example or going down the line I won't even have to do this hopefully I can just describe my experiment and it can fill out these different fields for me if uh if I'm comprehensive enough in my in my initial prompt you can see a small text here which says context dashboard so it knows I'm on the dashboard and can answer questions based on what it sees on the dashboard uh is a small uh tool tip that I left here which says active master prompt. I know master prompt is something specific to PBX that we're working on but it could be something that is more generic like company knowledge being used or some company context uh fed here so that guy is uh not having to figure out what your industry is, what your company is, what you do uh some context about your users, past historical data, takeaways, everything should be uh plugged in by default.  
   
 

### 00:21:02

   
**Junaid Gulzar Malik:** It should be that way out of the box. So generate test ideas. Ideally when I my bad just when I click this one short-term solution could be to just take the user I'm sorry I'm looking for something take the user to this uh popup here which we have inside of the future version of test ideas. Uh so they can just enter a URL here directly. But if I was doing it, let's say, my way, I lost where I was. Just let me just get back to it. If I was doing it my way, I would do it this way where I ask uh where Kai asks me, okay, please enter the URL or describe the page you'd like me to generate ideas for. I could say booking.com, let's say. Enter. And then Kai would respond, okay, I'm generating test ideas for this page. I'll notify you in the alerts tab once they're ready for review. While I'm on this chat page, I also want to just show very quickly what else I would like Kai for Bill to do.  
   
 

### 00:22:04 {#00:22:04}

   
**Junaid Gulzar Malik:** Summarize the last three days of PBX experiments results for the EU segment. And Kai can ignore the text copy here. It's just dummy text here. But I should be able to see some reports generated impromptu instantly. Uh be able to see the details of that report. And then also what would be very helpful is being able to share or export data for those reports that I just generated within Kai instantly. I also have some canned responses here like summarize wins analyze EU traffic active alerts and if I enter this into Kai it should get back to me with some active alerts that it has. And lastly the insights which would be very relevant for the BU business unit. Um I put two tabs here. One would be uh summary. So let's say no if there are any SRM issues that I'm having. Um you can ignore this. This is just an exposure balance of how many control variants versus uh treatments are online.  
   
 

### 00:23:03 {#00:23:03}

   
**Junaid Gulzar Malik:** And then also some SDK pulse statistics here as well which we don't really have today or not very easily accessible if we even have or plan to have those uh win rate conclusive rate uh just very generic stats for annualize lift check which is your top performer today. Uh I proposed something for the AI analytics squad in the OKR review. learnings and hypothesis management. We could have those here as well. Like how many new learnings did you get this week from experiments that you ran? How many reinforced learnings did you get this week from experiments that you ran? U if there are any tests waiting for a decision for human signoff and also how many hypothesis did you validate? So if you remember it was also something that I proposed uh for EI analytics squad and uh Arwan is working on that as well. And when I go to alerts, I see here first the notification that new test ideas are available for the booking.com prompt that I asked it to check for.  
   
 

### 00:24:02

   
**Junaid Gulzar Malik:** What I would like to do is simplify the test ideation to PBX experimentation flow as well. Bring all of that within Kai. We don't really have to go inside one window enter that if the if the user allows it if there are no restrictions or validation checks that it's feeling let's say more than 10 pages etc. The user should be allowed to do that all of all of it inside of Kai. Opportunity detection. We don't have an separate alert system for this as well. Uh if there's a broken goal or if something is not working correctly, uh some health checks, but at a global level, I know we're working on health checks, but a consolidated view of that would be helpful here as well. And then for experiments that might have reached statistical significance, etc. Uh and last thing that I wanted to show is for example right now I'm at the context dashboard but when I go into again a specific experiment or the results page of an experiment I should be able to see clearly this the context switching here so that the user knows uh something has changed or that guy is aware of where I am at the in the product right now.  
   
 

### 00:25:11 {#00:25:11}

   
**Junaid Gulzar Malik:** Um I'll switch back to my presentation here just to uh summarize all of what I presented. So there's three tabs actions which are used for these three uh criterias uh chat help primarily summaries of of the page I'm on and some custom analytics and reports and then lastly insights which can be divided into two section some topline reporting and some health or sanity checks. This would be a very summarized view. Uh I've changed a bit from the since these screenshots, but you get the idea. And then the alert system, which could double as a notification tray because we don't have one today and would really one of the only advanced platforms I think in the space that does not have this. So it would be two birds with one stone if we can get that as well. Uh one more thing I forgot to mention in the uh actions tab. A couple of other things that I also added. So generate test ideas. We looked at this.  
   
 

### 00:26:08 {#00:26:08}

   
**Junaid Gulzar Malik:** create new workflow. So I could do similar to what optimizely does but at maybe at a very basic or primary level. So send email uh when the results for this experiment are ready. Alert me on Slack on this channel if results are ready or something happens. Pause experiment if start experiment if uh or we could think about what could be here. I know that we already have the pause and start conditions inside of the UI and it might overlap with that but there's other things as well we can do here uh just for some collaboration and create new object so create a new segment trigger goal based on again chat with guy that would be helpful as well since we're already building that and lastly this I just added here to convince to push results to snowflake or data warehouse but I don't have any idea about this so I won't really spend time on it and uh yeah that's all on what I wanted to propose and I know that we don't have any validation yet uh so this is just an anticipated timeline of what we could work with here uh so I would probably need till the end of March to complete more discovery on this uh and I think that would be in line with the OKR and the road map that we had as well in mean in paralle I know that R1 is also working specifically on what AI analytics we can bring into Kai and let's say it takes uh since the beginning of  
   
 

### 00:27:38 {#00:27:38}

   
**Junaid Gulzar Malik:** R1 joint until the end of Q2 so that we can do both at the same time and then spend also in parallel this time on some validation checks and technical alignment of what is and is not possible. I know that we're not at that stage yet and I don't want to jump ahead here or or skip skip steps here. But if we get some validation, let's say midway through Q2. So we have still like almost two months two and a half months from midway to Q2. We could start development for lot one at least for the AI tool scope which is restructuring guy into these tabs and uh adding some more tooling inside of it and then whenever Arvan is ready or has validation on the technical scope of his part start maybe beginning of Q2 or end of Q2 or beginning of Q3 on some aspects on his part as well. Again, this is not finalized but just how I think that we will need to work together on this because there's a lot of overlap in scope here and there's a lot of validation that we need to do before before we start development for it.  
   
 

### 00:28:42

   
**Junaid Gulzar Malik:** So this this step validation and technical alignment is is the most important. It might take all of two quarters or or just one quarter. Don't know for the short now. But yeah, um this is my vision of just the first version of uh the iteration of Kai that we can uh we can take in I'll open it up for questions now or if you have uh the link uh with you to play around with if you have specific questions on the on the proposed UI or on the proposed features inside of it, let me know. Yes,  
**Jean-Christophe CARLES:** Yeah.  
**Junaid Gulzar Malik:** Jesse.  
**Jean-Christophe CARLES:** Um I feel like it could be like the main entry point for many many actions. And why uh did did you did you try or not and to do like Opal like you show for Opal to have just the the main entry like the main page which would be the chat.  
**Junaid Gulzar Malik:** Yeah, I've seen I I just wanted something to be uh like similar to Kai so that we don't really cannibalize our own UI because Sky has a standalone page as well.  
   
 

### 00:29:44

   
**Junaid Gulzar Malik:** I don't know if you've seen or maybe I'll try to go back and show yeah so this for example or rather this this this is uh all of it I think lives inside of Kai. All of these uh things that you see here I think are also inside of Kai. is uh no not Kai sorry Opel. So I wasn't really sure what the scope of it could be. So just a smaller entry point inside of the chatbot that we currently have could be nice but it's something that I'll take into note and just look at a bit more deeply. There's only like two or three videos that I could find. So I was not really sure in how many different ways you can access it, but uh seemingly it's a lot. So I'll just not down right any  
**Justin FRÜH:** Could you get back just to the slide with all the screenshots?  
**Junaid Gulzar Malik:** Yes. Yes.  
**Fabien Dimeglio:** Yes.  
**Junaid Gulzar Malik:** again.  
**Fabien Dimeglio:** Uh thanks Janate for for that.  
   
 

### 00:30:55

   
**Fabien Dimeglio:** Uh so I have many feedbacks, many comments. Uh it's interesting to me. The main question I have is that it's very wide what you are presenting. The it's very broad. Uh so it's hard to me to clearly understand uh what you want exactly to resolve here. Uh what are the concrete problems that you want to resolve? What I would like to know because here you are presenting a solution which tend to um to solve maybe a lot of different problems. So what I would like to know uh first is exactly what you want to solve uh know more about each problem or sub problem um and for each see exactly yeah how they are handled by competitors. This is my first reaction. What I find interesting in what you are presenting in the problem description in the print statement uh I agree with some of part that you said not with everything. Uh for example, yes we are very fragmented because we have very diff we are proposing very different solutions because we have very different users.  
   
 

### 00:32:15

   
**Fabien Dimeglio:** So I think in the end it's completely normal.  
**Junaid Gulzar Malik:** I think it's a good thing. I I I don't say that it's a bad thing. It's just uh maybe maybe I phrased it wrong,  
**Fabien Dimeglio:** Yeah.  
**Junaid Gulzar Malik:** but yeah. Yeah. Like increasingly fragmented is a good step because we're we're expanding uh the depth and breadth of our product  
**Fabien Dimeglio:** Yeah.  
**Junaid Gulzar Malik:** line 100%.  
**Fabien Dimeglio:** Also where I half agree is uh you when you say when you are saying that it's a passive chat assistant today it's more than that because you can already for example analyze the result with guy but apart from that what I find very interesting um what is what I see some new in term of capabilities I see three three big things uh the fact that you want to had some actions inside kite. So I think this indeed could be interesting then um what you call insights. So this is one topic on which is was discussed by Lorena to me the warning insights um could be potentially confusing.  
   
 

### 00:33:25

   
**Fabien Dimeglio:** I um I I I tend I I mean I would call it more notifications or even if you have two subtabs with summary and alerts.  
**Junaid Gulzar Malik:** Mhm.  
**Fabien Dimeglio:** Uh but I think it can be indeed an interesting idea to have maybe a subsection uh which uh could be kind of notification center but to me I'm not sure it's completely connected. This is why I was asking you which problem you want to solve. But I think why not? It could be a kind of hub where we have the chat actions and notifications. Uh and also what I what I find interesting in term of capabilities. This is the advanced uh analysis feature that you are adding which is also part of the runap. It was more for for air1.  
**Junaid Gulzar Malik:** Yeah. Yeah.  
**Fabien Dimeglio:** Um so what I just don't get is exactly because this part to me the notification part uh even if it's more than just notification in uh but to me it's not completely for you chat uh is on your side but the analysis part is not so what what I don't get is exactly which problem on your  
   
 

### 00:34:40

   
**Junaid Gulzar Malik:** Yeah.  
**Fabien Dimeglio:** side you would like really to focus on on your scope. I'm not against I mean this UI to me it seems Nice.  
**Junaid Gulzar Malik:** Yeah. Yeah. 100%.  
**Fabien Dimeglio:** Uh  
**Junaid Gulzar Malik:** Like I know I know I'm I'm going step the gun here because Arwan is supposed to present something and I think based on what I've seen on what he's working on. I think it will completely overlap uh a lot of this and uh improve on what I'm presenting. But it was just a general idea more or less right now. I won't say that this is how it should be. is just a general idea of how we can sync the two efforts together where  
**Fabien Dimeglio:** Yeah.  
**Junaid Gulzar Malik:** insights could be a tag inside and then we can have all sorts of different varieties here of of different stats.  
**Fabien Dimeglio:** To me what is really related to your scope?  
**Junaid Gulzar Malik:** So  
**Fabien Dimeglio:** This is all the action part since you are especially working on MCP.  
   
 

### 00:35:32

   
**Fabien Dimeglio:** All this makes a lot of sense.  
**Junaid Gulzar Malik:** yeah.  
**Fabien Dimeglio:** Um so the part  
**Fred De Todaro:** Exactly. Yeah.  
**Fabien Dimeglio:** huh  
**Fred De Todaro:** No, I said I said exactly. I think all that behind the scene,  
**Junaid Gulzar Malik:** Yeah.  
**Fabien Dimeglio:** yeah  
**Fred De Todaro:** you know, it is powered by MCP servers in the end.  
**Junaid Gulzar Malik:** Yes.  
**Fred De Todaro:** So,  
**Fabien Dimeglio:** exactly all this to me it's very relevant for your scope.  
**Fred De Todaro:** um,  
**Fabien Dimeglio:** Uh and then I think it's an interesting idea to to have subtabs. I think it's quite working well. Uh I like the way it's presented. Of course, uh it won't be it's not exactly as a Cameon branding, but I don't care. Uh I think it is working well. So in your scope in your scope I have the feeling that it's just action part which is in your scope but we can maybe reshape  
**Junaid Gulzar Malik:** For sure. For  
**Fabien Dimeglio:** the  
**Fred De Todaro:** But when you said actions actions so who who owns who owns basically the UI  
   
 

### 00:36:25

   
**Junaid Gulzar Malik:** sure.  
**Fred De Todaro:** here?  
**Fabien Dimeglio:** but this is a Cool.  
**Junaid Gulzar Malik:** I think I think it's it's it's our our squad the Kai Kai chatbot I think we own.  
**Fred De Todaro:** Yeah.  
**Junaid Gulzar Malik:** And then uh what I wanted to present is some some place where uh we can host features or uh sub products suggested by Arwan or other squads so that we can we can put figure out a way where everything can fit in. So my idea was just to present something that can be a good foundation for adding more functionality on  
**Fred De Todaro:** It's okay.  
**Junaid Gulzar Malik:** top even if it doesn't belong to our uh our product.  
**Fred De Todaro:** Yeah.  
**Fabien Dimeglio:** Yeah.  
**Junaid Gulzar Malik:** So actions could also have just like add a new integration.  
**Fred De Todaro:** Yeah.  
**Junaid Gulzar Malik:** Let's say I'm just giving an example. I know we have a very new integrations page added here uh being added soon but based on what I saw in optimizely for example the idea for for this presentation was just to give like a a foundation of how we can split uh Kai into different sections so that we can all work on our individual scopes under a common UI uh and I I agree 100% my scope is only inside of the actions part uh and and this part was just to get some more alignment on how it would uh pivot and and evolve over  
   
 

### 00:37:40 {#00:37:40}

   
**Junaid Gulzar Malik:** time.  
**Fabien Dimeglio:** It's a detail. But by the way, I would I think I wouldn't keep Kai. Uh I think we could we could call it PBX assistant or  
**Fred De Todaro:** exactly yeah I was about to say that yeah I think the main issue we have to fix is indeed this one it has to  
**Junaid Gulzar Malik:** I don't  
**Fabien Dimeglio:** Yeah.  
**Junaid Gulzar Malik:** know.  
**Fred De Todaro:** feel integrated everywhere in our product bix so indeed Kai  
**Fabien Dimeglio:** Yeah.  
**Fred De Todaro:** Kai is not the right wording gear and I think that's that's the main problem we have to fix here is that we have AI  
**Fabien Dimeglio:** Come  
**Fred De Todaro:** everywhere and it feels completely disconnected compared to what we can see indeed  
**Junaid Gulzar Malik:** Yeah.  
**Fred De Todaro:** at Opal or maybe other over other over other over other over other over other over other over other over other over other over other over vendors as well.  
**Fabien Dimeglio:** on,  
**Fred De Todaro:** So that's the main thing we have to fix here.  
**Fabien Dimeglio:** go.  
**Fred De Todaro:** Um ju just one one comment here for the the documentation.  
   
 

### 00:38:26

   
**Fred De Todaro:** So you know that there is I'm not sure you you all know here around the table because we are still yeah we we are going there is 90% chance that we are we are going to migrate all our existing documentation system to a tool that that is called Mintify which is a tool being used by you know most of the vendors there entropic cloud stat and so on which is a modern AI documentation system and they do provide MCP servers as well which means We could use that as a replacement of everything what that has been done in KA for documentation purposes. So instead of plugging it to our own MCP for documentation, we plug it directly to Mlify because this is basically our our main job there and it it it won't  
**Junaid Gulzar Malik:** Yeah.  
**Fred De Todaro:** be outdated as it is most of the time the case here with with Kai because we have to manually update that. So that's something you wouldn't have to to manage because we basically plug that to to Mlify. Okay.  
   
 

### 00:39:23 {#00:39:23}

   
**Junaid Gulzar Malik:** Yeah. Cool. Uh all right. I'm not really sure what the next steps here are. Maybe I can I can share a summary of uh the notes that we took from here and then uh maybe division of some scope and then create some action items personally for AI tool squad on what we can start to work on at least uh at least next. Uh I know that a lot of the right part of this would be dependent on what R1 presents in the upcoming opportunity meetings. So I'll not touch that part. Uh this was just to give a general idea of what I had in mind. But let I  
**Fred De Todaro:** Yeah,  
**Justin FRÜH:** a list of list of actions like what would be the top uh agents that you will and use case  
**Fred De Todaro:** exactly.  
**Junaid Gulzar Malik:** let  
**Justin FRÜH:** that you would like to to build. I think that's a good start because each agent is addressing a specific problems.  
   
 

### 00:40:13 {#00:40:13}

   
**Justin FRÜH:** So that's a good way to start thinking about that.  
**Fred De Todaro:** Yeah,  
**Fabien Dimeglio:** Yeah.  
**Fred De Todaro:** I was about to to ask as well. So, let's let's say we want to do uh so I don't I don't know why it is but but the uh yeah the second screen the second screenshot here which is yeah the analysis. So let's say we want to do that.  
**Junaid Gulzar Malik:** Yeah.  
**Fred De Todaro:** So who is going to do the MCP action here? Is it on your side or is it on the analytics squad?  
**Junaid Gulzar Malik:** I think like so here's here's what's tricky and uh maybe Alexander you can help uh if I'm if I'm wrong here. I believe getting the starts to the front end or u providing u an endpoint for the statistics is on our part because it's linked to the MCP and then how it displays  
**Fred De Todaro:** Yeah,  
**Junaid Gulzar Malik:** here would be on one  
**Fred De Todaro:** exactly. Not your It's not your side. Yeah.  
   
 

### 00:41:02

   
**Fred De Todaro:** Yeah, I totally agree. I totally agree. So, it it means that we indeed have to to list basically the actions and I would say everything that you could do through that UI. Uh so, so that we don't lose time indeed, you know, building the MCP entry points there.  
**Justin FRÜH:** Fred we don't have anyone responsible for MCP on the R\&D teams you know kind of MCP chief MCP officer like someone which is building and addressing needs for the product teams everyone come with an agent or with a need for MCP and someone  
**Junaid Gulzar Malik:** It's huge as  
**Justin FRÜH:** is a centralizing that it could be helpful no really bad people  
**Junaid Gulzar Malik:** it's huge as you mean I wish Valerie was done in this this case in all he's on vacation but more or less he's expert here  
**Justin FRÜH:** Who who you said?  
**Fred De Todaro:** Exactly.  
**Junaid Gulzar Malik:** this baler he's is a developer on my team senior developer and he's uh he's the  
**Justin FRÜH:** Okay. Okay. Cool.  
**Junaid Gulzar Malik:** most experienced now when it comes to it uh he's knows more about it than now I know there's somebodyo as well who might be able to offer some  
   
 

### 00:42:10

   
**Justin FRÜH:** Yeah.  
**Fred De Todaro:** Yeah,  
**Junaid Gulzar Malik:** insight  
**Justin FRÜH:** Because MCP I mean it really it's borderless you know it doesn't belong to squad borders or anything so it has to be uh very smooth.  
**Fred De Todaro:** but to me to me this is very I mean everything that I see here you should be you know 90% of that you should be able to do it from a cloud for instance.  
**Justin FRÜH:** Mhm.  
**Fred De Todaro:** So which means that we need the MCP servers and task and so on to be able to do that.  
**Justin FRÜH:** Mhm.  
**Fred De Todaro:** And then this tool here PBX or Kai or whatever basically uses exactly the same the same task there. It's just in our own product instead of no doing that  
**Junaid Gulzar Malik:** Yeah,  
**Fred De Todaro:** included.  
**Junaid Gulzar Malik:** perfectly aligned on  
**Jean-Christophe CARLES:** I have a question.  
**Junaid Gulzar Malik:** this.  
**Jean-Christophe CARLES:** Can can you repeat just what you said on the scope? So for example, the scope of building the MCP which would uh allow so any the tool to access like the the data to do such a breakdown, it would be on um on genite squad.  
   
 

### 00:43:09 {#00:43:09}

   
**Fred De Todaro:** Yes, ex except if there is no uh you know um way to to get the the data. So let's say I don't know we want to have uh the uh average uh uh conversion rate across experiments that that do that and that and that that does not exist today in the product. So there is no way you can do that because behind the scene you use I guess you use the automation API. Val Val has been using the automation API to extract  
**Jean-Christophe CARLES:** Yeah, it's what I'm thinking. So,  
**Fred De Todaro:** data.  
**Jean-Christophe CARLES:** I think the current MCP will have all the capabilities of the automation API, but for example, some things I think here are not in the automation API.  
**Fred De Todaro:** Yes.  
**Jean-Christophe CARLES:** And so, who owns the the new capabilities?  
**Fred De Todaro:** The squad in charge of the group.  
**Jean-Christophe CARLES:** That's quite okay.  
**Fred De Todaro:** Yeah. Yeah. So for instance Yeah. your your squad. In this case  
**Jean-Christophe CARLES:** Okay.  
   
 

### 00:44:05

   
**Erwan SADOUN:** Yes. Uh first thank you Janate for your presentation. Uh it was uh very nice and I love the the slide deck. Um and I think as a takeaway for next time uh for our squads uh it will be interesting to have like uh a list of problems we want to solve or maybe a list of user stories um in order to split it into our uh different scopes. uh and I think also that your presentation is going to highly impact mine on the on the analytic uh capabilities inside K. So yeah um yeah I think uh of course I  
**Junaid Gulzar Malik:** Okay.  
**Erwan SADOUN:** will uh be in charge I mean my my squad will be in charge of the the inside part uh but uh I think I will have some more detailed question question for the rest but uh we can uh deal with that asynchronously.  
**Junaid Gulzar Malik:** Yeah. Uh  
**Fabien Dimeglio:** I can maybe just answer you sorry um on this one.  
**Junaid Gulzar Malik:** and  
**Fabien Dimeglio:** Uh you you would like a list of problems to solve but this is precisely the goal of the opportunity meeting normally.  
   
 

### 00:45:22

   
**Fabien Dimeglio:** So  
**Erwan SADOUN:** of course. Yeah. No,  
**Fabien Dimeglio:** yeah.  
**Erwan SADOUN:** I mean I mean I will of course I I will prepare such such list but I mean I just wanted to be uh sure to to address the right uh issues or the right problems and not to step on Janed's scope. So I I will just uh uh mate the synchronously and and do  
**Junaid Gulzar Malik:** Yeah, I've written written written a note for it here to to create a list of responsibility matrix for the different user  
**Erwan SADOUN:** this.  
**Junaid Gulzar Malik:** stories and uh subset of problems that we need to solve. We'll sync on it afterwards for sure. And I think Chris, you also had something to  
**Christian Neri:** Yep.  
**Junaid Gulzar Malik:** ask.  
**Christian Neri:** Yeah. Thanks, Jade. Uh, well, first obviously love seeing your prototypes every time because it really helps uh illustrate, but I had a question. I guess going back to something that Fred and Fabian mentioned because it was also what stuck out to me about the distinction between this new contextually based Kai UI and PBX.  
   
 

### 00:46:20 {#00:46:20}

   
**Christian Neri:** I guess what I'm wondering is if ultimately we're trying to integrate to make it less distinct from the user perspective from a visual perspective do the visual identities need to be also distinct between when we for example click on the PBX function from your actions list to to create an experiment should we transition to a different visual identity with PBX or do these need to be more clearly aligned if users are going to be able to call and open up this sidebar basically from wherever they are on the platform. I don't know if you see what I mean, but I guess do we should this not follow the same visual identity as PBX?  
**Junaid Gulzar Malik:** Yeah. Yeah. I I agree. I agree. Like I did not have this in mind before Fred said that this should just be called PBX assistant or like I think Fabian  
**Christian Neri:** Yeah.  
**Junaid Gulzar Malik:** pointed it out but like I agree with that approach 100%. In my opinion it should consolidate consolidate as much as we can.  
   
 

### 00:47:16 {#00:47:16}

   
**Fred De Todaro:** Yeah,  
**Junaid Gulzar Malik:** So as as much  
**Fred De Todaro:** my only concern my only concern is that if we do that then customers would expect to be able to do to find actions as well when they are in VPBX editor which wouldn't be which wouldn't be the case but but yeah I think that's most of the I mean comics and so on that's what they expect it's only PBX everywhere there is no Kai anymore and so on if you ask Colleen for instance he would tell you exactly that kill  
**Junaid Gulzar Malik:** Okay.  
**Fred De Todaro:** uh it's Pix  
**Junaid Gulzar Malik:** Noted.  
**Calixthe Mattei:** Yeah.  
**Junaid Gulzar Malik:** Got it.  
**Calixthe Mattei:** And um same for me like when I first saw the actions actually I thought we could do it from the chat interface. Um I was surprised that it's a sort of redirection link or etc. It just reminds me of um cloud separating cloud cloud code and cloud co-work. I just felt a bit confused by these different um tabs personally. the agentic orchestration layer I think it's really nice but I think there's um work on defining the sub agents and what are the tools or actions or plugins I don't know how we call it that each agent do but it should maybe be hidden by the users I don't know the strategy we want to have but for me if it's an assistant that is plugged everywhere I wouldn't want to search my actions maybe I would just want if I know it can analyze my results I just ask and it looks itself.  
   
 

### 00:48:46

   
**Calixthe Mattei:** It's it's a bit um I was especially when I saw the insights tab,  
**Junaid Gulzar Malik:** Yeah.  
**Calixthe Mattei:** this looked more than as a dashboard as a monitoring dashboard to me than as an agent or  
**Junaid Gulzar Malik:** Yeah.  
**Calixthe Mattei:** assistant. It's um the what you suggest looks like maybe the next monitoring dashboards we want to to give with the business unit analyze and I didn't understand why it was part of a agent layer. I think it's nice if the agents can surface this info but that's why I got confused and maybe also when we said we need to find which problem we wants to solve also thinking because chip does it sometimes which shortcuts you see for instance when you open a different page opal you said they had cards that you could suggest depending on the page it could be automated and why I'm thinking of this I'm playing with a lot of tools and you can use a tool called chatkit from OpenAI which lets you uh play around with the chat GBT interface and create your own shortcuts, widgets that takes actions, etc. It's a playground and I played with it just for my personal curiosity and that's when it came to my mind that I was like, "Oh, that's nice. You can personalize depending on the page.  
   
 

### 00:50:05 {#00:50:05}

   
**Calixthe Mattei:** I don't need to understand which agents I'm talking to, etc., etc." Just when seeing this, I personally felt confused even though I know how it works behind.  
**Junaid Gulzar Malik:** Okay.  
**Calixthe Mattei:** So I don't know if the users would not feel confused because now I have expectations that my chat could do  
**Fred De Todaro:** Mhm.  
**Calixthe Mattei:** anything because JGPT can do a lot of things and when you use cloud it just does everything without  
**Junaid Gulzar Malik:** Yeah.  
**Calixthe Mattei:** me thinking about the plugins it use etc. Just just sharing use  
**Junaid Gulzar Malik:** Yeah. I should have maybe uh changed this slide a bit because I completely agree with you.  
**Calixthe Mattei:** cases.  
**Junaid Gulzar Malik:** In the end, my goal is to get to a interface which only interacts using chat but just I think maybe we're not at this stage yet.  
**Calixthe Mattei:** Okay.  
**Junaid Gulzar Malik:** Maybe we're not agentic enough yet. So I just wanted to introduce some entry points into some basic actions that we can build on. But uh 100% agree with you that if the user has some uh daily workflows or shortcuts that they want, they can they can add those.  
   
 

### 00:51:01

   
**Junaid Gulzar Malik:** But uh in the end, the version three, version four of this should just be a chat interface and nothing else in my opinion.  
**Calixthe Mattei:** Okay.  
**Junaid Gulzar Malik:** Andre noted uh you mentioned it's called chatkit.  
**Calixthe Mattei:** Yeah, I can send you.  
**Junaid Gulzar Malik:** Sure.  
**Calixthe Mattei:** It's a It's a plugandplay library that they have.  
**Junaid Gulzar Malik:** Yeah, I'll take a look. I'll take a look.  
**Calixthe Mattei:** Um, it's quite nice.  
**Fabien Dimeglio:** We will talk about it um during our  
**Junaid Gulzar Malik:** Okay.  
**Fabien Dimeglio:** workshop.  
**Calixthe Mattei:** I don't use it for my personal uh phone, but but yeah,  
**Fabien Dimeglio:** Oh,  
**Calixthe Mattei:** you can play with it.  
**Junaid Gulzar Malik:** All right.  
**Fabien Dimeglio:** okay.  
**Junaid Gulzar Malik:** Right. I think I have uh quite a lot of notes and action items taken already.  
**Fred De Todaro:** Yeah.  
**Fabien Dimeglio:** Yeah,  
**Fred De Todaro:** Yes. Thank you.  
**Fabien Dimeglio:** thanks.  
**Fred De Todaro:** Can I can I can I keep you?  
**Fabien Dimeglio:** Really?  
**Fred De Todaro:** Thank you. Bye. Bye.  
   
 

### Transcription ended after 00:52:26

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*