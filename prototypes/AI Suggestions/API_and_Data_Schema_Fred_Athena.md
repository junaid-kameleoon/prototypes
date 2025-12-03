**API and Data Schema - Fred and Athena Team-20251201_110301-Meeting
Recording**

1 December 2025, 07:03pm

44m 52s

![](media/qiqf1c5kwxrf1bvgn7cmo.png){width="0.22916666666666666in"
height="0.22916666666666666in"}**\
Drake Som** started transcription

![](media/buiyx9x_vapwydcgjn1sl.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 0:04\
With Jason, so we we have some some quick questions about it. The first
thing is so I understand that there is a page level and then some
hypothesis and then some experiments and some variations.\
Broadly, that\'s how how how I looked at it should we expect, should we
expect more than one hypothesis for a given page or you know?

![](media/gawbchvi8ymk1c8ez8-hi.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 0:29\
Yes, typically most like standard pages will have between 8:00 to 10:00
and each of those hypotheses will have one or more experiments, and each
experiment will have one or more variations.\
Obviously that was just a snippet to convey like the data structure and
data types, but yes, to answer your question, for a given page you\'d
have between 8:00 to 10:00 hypotheses and then layers within that.

![](media/meyfucqkt9zkwdaapgcnb.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 0:58\
OK, OK. And will the change? So let\'s say we call about 10 point
multiple times, will you always, you know provide the same hypothesis
and so on? So what\'s what\'s the rule behind when will that change?

![](media/zk55z5w1umnmyaab7womk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 1:11\
Yeah. So in terms of the cadence a given well, I guess let\'s kind of
take a step back just to the API authentication, so.\
Athena will provide an API key using that API key, you will initialise
an analysis for a given page of a given site. Every site will be able to
run 10 page analysis per month.\
And once you kick off on analysis could take about up to 10 minutes, and
once that\'s complete, then you\'d have the analysis with the
hypothesis, experiments and variations, each with their ID.\
Upon moving forward with a experiment, once that experiment launches, we
could have an endpoint on our side that would be able to ingest the
results of that experiment and then have that inform.\
The future analysis for a given page, so that\'s kind of how you would
expect the output to evolve and be more optimised over time.

![](media/mr9y7x9xbauuhhjj8sqyp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 2:30\
OK. OK. So there there is no point for us to call that endpoint except
if we provide you some some data about you know that experiment was
conclusive or or not.

![](media/fnyoo4spcbp8znlxv04s6.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 2:42\
Yeah. And obviously there there would potentially be like unique ideas
coming back in the second month analysis given that you know models will
improve.\
Prompts will become more optimised and there\'s a good chance that the
fidelity and quality of the ideas coming coming through like each month
will, you know, only progress with time so.\
Yeah.

![](media/kqrthz5osnqqemgns1r0n.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 3:15\
Yeah, but like Bradley, that we\'re thinking like as a matter of design
principle that we don\'t want someone to just be spamming the analysis
button, right. So we want to design the the implementation in a way that
it is not.

![](media/fehuhxiivtshrhznnkvoh.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 3:25\
Yeah.

![](media/ocwbqjtaksobvcultc-db.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 3:31\
A. You don\'t can\'t get to constantly run it over and over again on a
page. So our design solution has to solve for for that limitation.

![](media/vyip6yrchnwrzdckjltog.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 3:44\
OK, that\'s good to know. We were thinking about, you know, coding it
once a day, but if it doesn\'t make any sense, we\'ll you know.\
Try to work around that. OK all right.

![](media/qec81l3b4tz20y7pdbcf5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 3:54\
Yeah, that we\'re putting a lot of thought into the ones that are sent
and you know it\'s one of those things that if you keep refreshing it
like the ideas are just going to get you know, continuously.\
Like similar or worse. And so we think that it\'s more of a quality
question of like we want to put good ideas in front of a customer, not
just a high volume of ideas, but there should be some periodic
refreshing, yeah.

![](media/oihp3l08yfrtsukvnrgrx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 4:11\
Yeah.

![](media/u7vabrjomufbyedhmdm_c.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 4:11\
Right.

![](media/iucbzloeih_uffbq3cel5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 4:13\
Thanks.\
Yeah.\
Yeah. Or maybe.\
OK. Or maybe we can trick it because because you will provide, I don\'t
know, between between 8:00 and 10:00 hypothesis, maybe as much
experiment for each hypothesis and as many relations. So you you could
have a bunch of experiments and in the end you could have like 100 of
experiments.

![](media/1cdxem6ivgmdsh8qzbpul.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 4:25\
Yeah.\
Yeah, it could have multiple like, yeah, yeah.

![](media/kp1r4ijlq12fimffszivo.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 4:38\
Yeah. Yeah, like.

![](media/gjj2n92vqksxk1bf5pcwb.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 4:41\
Exactly.

![](media/svrzpd8lngcjg1ine7phw.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 4:44\
Totally. And the ones that move forward obviously is like the
reinforcement layer, because we\'d be getting the results back once
those tests are complete. And then you know, on the month to month
Cadence that would begin to optimise the backlog that we\'re sending.

![](media/os_d0pbuvfaimzvpgkeir.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 4:44\
Yep.

![](media/lvgvxzthaxwepmlrgmwpa.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 5:00\
OK.

![](media/kbdd7t30t0cbgkmbrodig.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 5:01\
And then maybe like if there\'s any other questions around or if there
isn\'t any other questions around data schema we can kind of talk
through what like the most?\
Applicable like interface would would be for like presenting this data.
I know that within the current Chameleon UI it might make sense to have
an analysis tab in that sidebar and then within that analysis tab you\'d
be able to have basically a history.\
Of all the page analysis that you\'ve run through time and going into
each page analysis, you\'d be able to see similar to the Athena demo.\
A list of hypotheses that you could tunnel in. See the tunnel. In
further see the experiments variations and yeah, open to any any
discussion you wanna have around.

![](media/hfpscntl25j0ldceswzay.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 5:52\
Yeah.

![](media/h2coi73wk8tfueyea2d03.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 5:56\
Yeah.

![](media/z6sg1rz6zm6upidpszjtm.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 6:03\
Yep. OK. Maybe before before we move on. Yeah. Before we move on on the
on the topic because because I think you\'re Janette, we\'re so kind of
present, you know.

![](media/08k-ly46xpurgm1cwcwu2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 6:04\
That interface.

![](media/5xvoqd92ukuddsvtytupg.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 6:14\
Yeah. Sorry, I don\'t know again.

![](media/k8vj1lwajl5wo4fks5yde.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 6:15\
A look up of what we we had in mind, but just just had some questions on
the Jason put here on.\
So we, we\'ve we\'ve seen few things there. So you, you, you, you you
you will provide a score. But I I I don\'t think I have seen the detail
of the score like I think in your in your video where there there was a
score which is global to the to the experiment and then you have the the
the buyer.

![](media/gipup6rqhceddekjevxs2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 6:42\
Experiment.

![](media/kohmx8ubliqop4pw51caz.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 6:44\
The Π scores I haven\'t seen that in your output, so I don\'t know if
it\'s something missing there. Do you see what I mean? There is a free
scores. I think there is a global score and then free scores each each
for potential in pattern is.

![](media/1gl6kxy8qxow5koshapoq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 6:59\
Yes. So the score is a is the aggregate score of the currently the Pi
metrics. One of the reasons why we put it into one field is you know
that scoring framework may evolve.

![](media/pwyuov_-_nhfxwhjpymsp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 7:16\
OK.

![](media/mtt6sihq5wsuzqyav4xg6.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 7:16\
As we go through more iterations, so just wanted to just be a little bit
cautious in like coupling it too closely with the Pi framework because
that scoring like infrastructure is gonna get more robust through time.

![](media/ohuyv1ysskgsa4qzpvclz.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 7:25\
OK.\
Yeah.\
Right, right. Yeah, I see. I see. OK. So we\'ll avoid that in the end.

![](media/mhagdyamrstedd7geu1o2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 7:34\
We\'ve intentionally removed the binary record, yeah.

![](media/dxxdepkzuahdu9qc6_gud.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 7:37\
Yeah. All right. OK. And my my last question was for the experiment
component, will you be able to generate a kind of screenshot that
highlights the the element, but but the changes?

![](media/x2mpyxcs4i7rurtwz7etf.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 7:53\
Yeah. So we\'ll have screenshots for the the page, the components within
the page that are referenced as like the target container for the given
experiment and variation.

![](media/zblxvjkpxo3qchrvgpqp1.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 8:00\
Yeah.

![](media/8_ewwfp333suzbtkfx8-5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 8:08\
And with that, we\'ll be providing the query selector and the bounding
box relative to the screenshot. So with the relative bounding box you
could overlay.\
A A component container on top of the the screenshots. So you\'ll have
all the data that you\'ll need to create that effect. Obviously the Dom
selector will be.

![](media/ctwi9y34rc_uf48jsj8nk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 8:33\
OK.\
OK.

![](media/wsywpe3bshma09vouzpuq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 8:41\
Scoped to that analysis at that point in time like.\
Dom selectors, especially if they\'re coupled to like the build hash ID
of of an element through time like it it, it becomes challenging to like
reliably anchor to that as the website evolves and goes through multiple
deployments and the build.\
Hashes change, so we\'d probably recommend using the bounding boxes.\
Depending on the UI you want to like, I guess this is an important
question like are you envisioning PBX being just an involved interface
where you would have the extension loaded onto the website?\
In that extension, you\'d have the ability to look at the analysis, or
would the analysis section be equally separate?

![](media/ueywk96pdniax70my8yay.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 9:35\
No, it would be outside. Yeah. No, it would be. It would be separate, I
think, yeah.

![](media/lyhfz-y7lwgwhv3ezku0x.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 9:41\
Yeah.

![](media/cfrjtkabeuvssdp7en3nk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 9:43\
Junaid maybe?

![](media/ntmrhycec8xyfucqef0x7.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 9:46\
Sure, if you\'d like, I can throw it on unless you have more questions
for it. Just start one more 111 more question related to the variations
listed inside the Jason.

![](media/unlbaqkq0pecgzak_9zmz.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 9:51\
No, I think we\'re good. Maybe Peter will have later.

![](media/43sjnjadqo5i6er7mm6rp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 10:00\
When I saw the video of Tina, I did not really see any place, and even
when it leads into Chameleon with the prompt already preloaded into
BBXI, don\'t really see a place where it told Chameleon or vice versa.
What are the variations, how they\'re split?\
And just maybe, just maybe, give me a rough idea of how that works
inside your interface. How is that structured alongside experiments?

![](media/t8jf_3asmlkdk-mvi6d01.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 10:27\
Yeah. So one of the advantages of the new schema is it provides what the
old schema didn\'t, which was variations of test concepts. So before
what you guys would have seen in the POC was, here\'s the observation,
here\'s the insight.\
Here\'s the idea, and there\'s obvious limitations to that, because an
idea can be about changing the hero copy, but a variation could be
different implementations of that different copy for the hero. So.\
In in the POC demo there what there was no variations. It was
essentially using the idea to create a single VAR, experiment within
Chameleon.

![](media/mgopumcl_gue7xouoe3mi.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 11:05\
Yeah.\
Got it. OK.\
To be honest, I can\'t see if if my screen is showing or not.

![](media/bxr8cmexaihlvtuz0tf-y.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 11:20\
Yes, yes we can.

![](media/qk2ox8jlgtuov8cgoouqf.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 11:20\
Yeah. Yeah, we can see it.

![](media/c5cfmhgixkmfa45-dkhes.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 11:21\
All right.

![](media/_q7qdcroebg7ylpjp-fnk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 11:21\
It is very small, but yes, yeah.

![](media/kk2_ivzaqclwc3fgyz9br.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 11:25\
Me try and see if I can.\
Is that better?

![](media/qaump98d-cynjd-vsadrk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 11:31\
Yes.

![](media/hfbgvoq0pbo9qeixnysj_.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 11:32\
Right, OK. So just bear in mind this is just a rough mock up prototype
of how we envision the UI and UX of the of this entire end to end chain
could go. We start with blank states for both the suggested campaigns
and the track pages which will be.\
Be sent to conversion can start with just adding a page, for example a
page that contains going off of your example. Let\'s say admin. I can
add certain rules here which would help me track a list of for a group
of pages that I can send all together. So if I just say pages that
have.\
Sales or pages that have Black Friday, et cetera. Everything, are those
all at once. My bad, I just have to reload this because it requires some
permissions, so it\'ll speed through.\
Up.\
I can see here my pages have been added. You can ignore this text that
my suggestions will appear from tomorrow etcetera, but I can see the URL
has been tracked and this here would start a countdown timer, let\'s say
24 hours until first suggestions are available, etcetera. And once
they\'re ready.\
I\'ll be able to see that status accordingly. I can update these pages.
I can delete these pages etcetera.\
Cool. And then I come to when I finally have suggestions available for
my tracked pages, which is essentially these right side cards, similar
to kind of how you do it in Athena, but I can see which page is this
associated with the text, the name? I don\'t know.\
Exactly. This is the hypothesis or the name of the experiment. I think
this was the name of the experiment. The track page, the hypothesis, the
different rationales, and then the different frameworks, the steps that
we can find inside Athena. Right now there\'s placeholder text. I
didn\'t want to make too many changes to break it, but I can for
example.\
Replicate.\
Exactly what we\'ve received in the Jason where we we have the
observation inside and the final recommendation of what the experiment
should be. There\'s also a small side drawer to go and view the
evidence. I don\'t know if this evidence part is dynamic and changes
based on.\
Each experiment\'s content, or if it\'s just pulling from a specific
list of theoretical points which can be a bit more static. In other case
we would be able to see the scores there.\
And then the same create and PBX which would then launch it into another
copilot chat interface where you already have the prompt preloaded and
the experiment ready to go with the different variations perhaps. So
this I did not have insight into how the variations would be.\
Apart, we can have for example here another section for what would be
the different variations of this experiment. All of the artwork system
thrown into ABX.\
You have your experiment running. What not shown here is of course the
management steps. For example, if I have already launched an experiment,
I would be able to philtre and and sort out experiments that are already
launched. Suggestions that are new or fresh.\
Or maybe just archive suggestions which are not relevant or I\'m not
really a fan of, etcetera. So this is again just a quick work in
progress, but curious to hear you guys thoughts on this.

![](media/isnlv8t-rt6dlveklnxoq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 15:10\
Yeah, this is very consistent with what we had in mind as well. It\'s a
great start.

![](media/edwh2gazmwbrcvesxhxhk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 15:15\
OK, cool.

![](media/k9psp4wzjitxm1r1kf1hs.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 15:16\
Yeah. So with the the pages just keeping keeping in mind that a client
will Max out at like 10, yeah, 10 pages per month. So I\'m just.\
Wondering if there would be a way to convey like their top 10 pages that
they\'d want to be running on a monthly cadence.

![](media/yetvdwk3fvmj48ehrcl14.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 15:36\
Yeah.

![](media/tkdo3_5mmoce5rx9g7bfq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 15:40\
And where where we could fit that into the UI here and then the other
thing is just in terms of, yeah.

![](media/1n8it96yixhbaebm5cbwj.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 15:41\
For sure.

![](media/0_-xbsxze9jwje8iiwd7s.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 15:47\
Just just just just one question, why do we put a limit of 10?

![](media/1rpzo_g4csdotiha8saky.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 15:55\
So if we think about a site like Nike, if you were to execute a crawl on
all of their pages, you\'d get back 100,000. So we need to one just for.

![](media/zoebclpwfqne550phtjdw.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 15:56\
Yeah.

![](media/unw_3ryzrr16tsxx9a_a1.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 16:10\
Scalability and to not overload overloading the the user with, you know
2020 ideas per page for hundreds of pages giving a sense of like
achievability and.\
And like each month.\
10 pages worth of or 10 backlogs for for each page would be made
available, and then those could be a different set of 10 pages.\
For the following month, so Fred, perhaps we can explore two things.
First, this list of 10 pages that they care these 10 URLs they care most
about. Perhaps you can explore on a month to month basis they can change
which 10 pages these are.

![](media/g6w3ngjv-lqwfsmqi38_i.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 16:43\
Yeah.

![](media/mn20x508kktzcyehzq3k1.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 16:57\
For example, maybe in the first month they want to see an analysis on
the home page, the next month they don\'t want to see an analysis on the
home page instead want to see on a specific product page. Perhaps they
can change which 10 they\'re getting analysis for on a monthly basis.
Second thing we can possibly explore down the road is changing the
cadence, which they get analysis away from a month.\
What Mike said is is true and what we want to anchor towards, which is
we don\'t want them to be able to, you know, degradate the value of an
analysis by running it constantly and seeing, you know, same thing, but
perhaps at higher tiers. We could higher tiers of payment we can
explore.\
Like a higher frequency, not necessarily every day, but perhaps once
every two weeks. Or perhaps once a week, and allowing them to have more
pages more frequently analysed.

![](media/epgnvqxc1eednz8sotyyh.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 17:40\
Yeah. And I would add that it doesn\'t have to be 10, right? 10 is just
a that that\'s a number that we picked. And I I think it is also because
this, you know, if we\'re being honest, right, this is an evolving
product. We don\'t know what our costs are going to be like, right. So
that that\'s a a component that we\'ll have to learn.

![](media/9oihwfgljsfb1uo_cmymu.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 17:41\
Yep.

![](media/glzb-xbogheazuvszwqmg.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 17:42\
You.

![](media/fl0il-9nuw_ce2ncqaqid.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 17:45\
Yeah.

![](media/3l-aeqibwlvufzznb-9i_.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 17:58\
Like based on usage and what it ends up running at like all in like what
we can, you know, jointly afford to put in here that that makes sense
commercially. And then the other consideration is like.\
A paid like a website typically will have a lot of pages, but a lot of
them will be templatized, right, like a e-commerce site, and so you only
really need to run it like on one PDP. You don\'t need to run it on 100
and so we kind of want to make sure that it\'s makes sense commercially
to restrict it to like your top templates.

![](media/ys499noada1fx2uwbt4fj.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 18:21\
Yeah, exactly. Yeah.\
Yes.

![](media/s7sjo8nmpb5sydptlifcp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 18:35\
And then you\'re running on those templates, but not that it\'s
necessarily doing every page.

![](media/eswm-hwkqskoyy2j23ib_.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 18:40\
Yeah, well, that was the idea. I don\'t think you know someone will put
the 10 Uris of 10 product pages because that will be mostly the same.
Yeah. Yeah, yeah, yeah. We have that in mind as well. So OK.

![](media/ni1kh6aggw_cll6gp422m.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 18:45\
OK.\
You know, we just want to protect against someone being able to do that,
yeah.

![](media/-qqeelycaioqcga5jsnpf.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 18:51\
OK.\
Right, let\'s switch back.

![](media/rfw8vzcnl0fczx7j_f-oa.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 18:59\
Right.

![](media/yfee6vebncvx42wowtzfd.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 19:00\
Yeah. And then the other, the other note, I just wanted to maybe touch
on was given the nesting of you know hypotheses has multiple experiments
experiments of multiple variations.\
In terms of the like, I guess conveying that hierarchy in AUI.\
Have you explored potentially having the lists on the left here be the
hypothesis, and then once they click on one that would, you know, expand
into the different like branches?

![](media/rwo7-mw11wmiv8q3op_go.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 19:26\
Yeah, yeah.\
Exactly I I.\
I decided to do that just after you. Initially, you mentioned that each
hypothesis will have several listed experiments. In my mind it was a one
to one connection, but yeah, we\'ll, we\'ll we\'ll adapt to that
accordingly. So it\'s hypothesis first and then you have a bunch of
experiments associated with that, and each hypothesis linked to a
singular URL.\
Correct.

![](media/yq-u3h_fnc9ibjk2uqf7m.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 19:54\
Yeah.

![](media/6_j4cw-5waszbmjd831yd.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 19:54\
Yeah. And then if they move forward, yeah.

![](media/eutkxrgijsqamnjj4yeqc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 19:55\
OK.

![](media/gdnbelg2hmnntcp_gnvgi.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 19:55\
I think we need page. We need page hypothesis and so on like we like. We
like we said generate before.

![](media/h1dk4dx0mdt-8pozrw4bv.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 19:58\
Experiments and then.\
Sure. Yeah.

![](media/ecfsqxzwxcv1jsckeaqj5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 20:04\
And then if they move forward with like let\'s say a like one hypothesis
has an experiment, that experiment has two variations. They move forward
with one of those variations and then they decide to move forward with
like the next variation. Maybe a day later. Is that being.\
Created as a child as of that parent experiment. Still like. Would you
like when you say create in PBX when you click that button is it always
creating a single variation experiment or?

![](media/bytjpkq1swizko7azrxq7.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 20:32\
Yes.

![](media/8bwpazslvufgexp1ejdct.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 20:34\
OK.

![](media/9-6vyiqozjgeequqyzloc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 20:34\
Yeah. Yeah, because we we didn\'t know, but there could be multiple
variations. So we discovered that basically. So we have to adapt. There
is no technical limitations there. It just that you need I think the
user will have to kind of slide across the relations.

![](media/rr8_otxrtwrlsttsbwvx7.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 20:38\
Got it, got it.

![](media/x9rqcg-mvkxq_ti-aug7e.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 20:49\
And then pick the ones you want to create.

![](media/mby13yallf_juuzvuf-fu.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 20:53\
Mm-hmm.

![](media/d4_kd1cacwyeaibobu64m.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 20:54\
In BBX?

![](media/j6dlngmgqb2mzv7jofhvt.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 20:59\
Yeah, yeah, that makes sense. Any other clarifying questions around
schema API endpoints?

![](media/yksyexd62gzzxbc6lpeux.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 21:10\
Fred, do you mind if I start my block of questions? OK. I would like to
clarify some technical questions. So let\'s start. You have API key,
right? You mentioned it.

![](media/4u4s2iwbvzjccwks1fsyp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 21:11\
Yeah, sure. Go ahead.

![](media/iikyyosocteuicis9tofn.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 21:27\
Yeah.

![](media/dizv68dmhabhyqej9iq9b.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 21:28\
So we will have one API key key for many customers or so. Do you
understand what we mean? We will have a lot of customers and how our
back end should communicate with you like.\
One API key or each API key for every customer? How\'s it going?

![](media/rw_sdkpdu8rqjsbb35pgr.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 21:54\
Yeah. So it\'s a good question for the phase one, especially for our
beta testing, we\'ll just be giving you the one API key and then you\'ll
be using that to send a site analysis URL to. So like you would
provide.\
Nike.com/shoes and we would check that we already have that like
nike.com site internally you know check how many analysis have been run
over the given interval.\
And if it\'s still within those ten over the whatever the cadence is
monthly, then you would get back a A status that that analysis is
currently running and then you\'d have the ability to pull.\
Uh for the analysis progress and once it\'s complete, then you would get
the full data schema that you saw in Slack.

![](media/daw3-qbphbrijpqadricc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 22:57\
OK, OK, I I got it. Just to close this question about the API key. So we
will have API key one API key for Chameleon and we can we can launch
analysis.\
For example, I don\'t know, Fred, what kind of how much request we will
have a day for example.\
So so let\'s let\'s say 30 pages per day behind one API key. So it\'s
it\'s not a problem for you, right? I mean you mentioned telling me
limit like 10 pages per customer.

![](media/v_ohv9cljogmmpnc06iqu.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 23:33\
It\'s pro customer. It\'s pro customer, yeah.

![](media/zv0ykixpdgxuda97nm11j.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 23:36\
For this.

![](media/qefkmht-63x1hdjmhgrq0.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 23:36\
Yeah, yeah, yeah. But for us, we don\'t care, Fred. Like, it\'s in our
back end for us. It\'s not a customer level. Like we will send to this
internal to this service we will send.\
Of pages we don\'t care about, like it\'s a for customer one, it\'s for
customer two, right? I mean, so for us. So your company will consider us
as a very big client with thousands of pages.

![](media/tcvmhedw2kmxgsmlzmi8j.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 23:59\
Yeah, of course.\
I think it\'s a. It\'s a good question. How how will you differentiate
basically €10 per per site you will store at at the site level on your
side. So a site is a customer for you.

![](media/7j97z1dmnodptjx3os_xj.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 24:11\
Yeah. So yeah.\
Yeah. So we\'d be looking at the root domain to determine if we have
that internally mapped as one of the one of the sites in the future. API
keys could potentially evolve.

![](media/2uifdle9v3fwfepawptpx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 24:27\
Yeah.

![](media/7zgix0apya3mgupfm8h43.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 24:27\
Yeah.

![](media/ugt0j2zjy8sjbjxk-szbo.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 24:40\
To be attached to the organisation and having those as children
organisation under the Chameleon.\
API key. So we\'re still gonna iron out that nuance, but for the
purposes of beta testing, we\'ll just be giving you the one API key for
Athena and then?\
Yeah, we\'ll be creating the internal nothings on our side.

![](media/29ejxsr9g6-cvy5ip-lsh.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 25:02\
OK, I I got it. I got it. So so for us it\'s 10 pages per site code
thread. So looks like stuff like this. OK, perfect, good, good. Also I I
think you already mentioned it.

![](media/flenjkqzcqjbvolqh9agu.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 25:09\
Yes.

![](media/y93zwnzxsw9dfvks_iutq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 25:10\
Hmm.

![](media/yda0lc15cobv9zuxrwbfr.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 25:18\
But I would like to ask and clarify. So we send URL and then we need to
pull the progress you said like it\'s a real progress so we can display
like a percentage of a progress or we will just.\
Receive like, wait, Wait, WAIT, wait. Oh, it\'s ready.

![](media/x3qhj4zeay4h2lvkweney.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 25:41\
Yeah, it\'ll be in progress failed or completed for when you when you
first, when you first initialise the analysis, you\'ll be getting the
analysis ID back. You can use that analysis ID to.

![](media/qyuykg2mddccmqnaz7h_a.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 25:44\
Uh-huh.

![](media/rchgolpjf-sjvyss-8omr.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 25:46\
OK.

![](media/t60bvai3jqjdut_ig3p_q.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 25:47\
So OK, so.

![](media/dxxitvpomfheopoad3tzt.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 25:56\
Continue to pull and if it\'s in a complete state then you\'ll get the
full analysis objects representing the schema that you guys have seen.

![](media/nw2ijjo67nro2tzxp3muq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 25:56\
Mm-hmm.\
Oh.\
How often do you recommend to do polling to do poll this like a one, one
per minute or?

![](media/c4rzgyc_vysg0-ezecezw.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 26:13\
Given that it\'s usually between 5 to 10 minutes every minute to two
minutes would be a good interval.

![](media/dj9pnc7q8ijhotyogrobt.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 26:21\
So yeah, looks looks good, looks good.\
OK. Fred, it\'s it\'s OK for us to do one one per minute. Yes, OK. We
will think about particular number. That\'s fine. That\'s fine.

![](media/tbqor6ybgorecwuftwigx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 26:37\
And like over the next week, we\'re going to compile a.

![](media/ofgmsfulavuaimepbhaeq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 26:38\
But huh.

![](media/quiuxu2v3vv8dyaogmye7.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 26:42\
Aapi request like template document of how you\'ll plug in all these,
like how you\'ll plug in the API key and then use the analysis ID to
continue pulling and just all the nuances and.\
Umm.

![](media/x_ede-308na_738fymabm.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 26:59\
Uh-huh.

![](media/7pjpimipfuwflvig_oatw.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 26:59\
Polling intervals that you could expect in that flow. So all that should
be covered in the document. We\'re going to try to get that to you by
Friday. And then yeah, we can kind of go into follow up questions after
that.

![](media/8q10faxgyqc5nibtitfvk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 27:15\
Mm-hmm.\
OK, OK, wait a second.\
Fred, will we discuss about the possibility to launch analysis again
like our customers change the sites and they will launch like about you
understand the question, right?\
For it.

![](media/dxmgbpf5-rpgfuplqpljy.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 27:40\
Yeah.

![](media/uafawoi4duf4b_52gkfyt.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 27:40\
Up.\
Yeah.

![](media/2_okda0egtra6nqxtqbhq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 27:42\
And.

![](media/ftuc0ax229_ukqgcgiu8x.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 27:42\
But analysis will be rerun for that list of 10 URLs every month.

![](media/skcxi9oqwcoiabqaaarxk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 27:42\
Yeah.

![](media/-6wo6wdhomuwm6ejwfivk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 27:50\
Every month.

![](media/jenpzqr8d4p6vplsnjgkq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 27:51\
OK, I automatically automatically.

![](media/jss5qvnmz6nwhx1maj6cz.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 27:52\
Except so if we.

![](media/8tqmevlafpoizimor5ovh.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 27:52\
Yeah.

![](media/hpmr-wagqteb9eihrypu5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 27:55\
And if I remove a URL break. So let\'s say I I have reached the 10
limits but then I don\'t care about URL and I want a new one. We\'ll
have to wait the next month to do to be able to do that or.

![](media/j0surhsuasytczqs5sqq7.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 28:10\
In the status quo? Yes, because it\'s a monthly cadence. If you want one
month, 10 URLs next month, separate 10 URLs, you can change them during
the first month, but it\'ll only be applicable to the analysis when
it\'s run next the next month.

![](media/_l0hwg2dk1kobktsmkygv.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 28:14\
Right.

![](media/frgunr91czwo2kzngbtbt.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 28:24\
Yeah, but there is some flexibility here. I think like we, we obviously
want the user experience to be as good as possible. We just want to make
sure that we\'re not introducing a way that someone could just spam a
new URL every day, right. So I think it doesn\'t have to be that it\'s
on a fixed monthly cadence necessarily.

![](media/2mrmau6wispk-on75ghws.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 28:25\
None.

![](media/4wo0by11d_x-sujm7bhla.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 28:28\
Yeah.

![](media/hy4pejw9ppfevb-bblfxc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 28:42\
She.

![](media/8hzuhynpzn3rsxr9s3tly.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 28:42\
When we\'re thinking about designing a solution, but just that it can\'t
be games to just produce as many as as you want. So we\'re open to
suggestions there. If there\'s another another view, we just felt like
the the simplest way, while we\'re just like this is a brand new
product, right? So it\'s like.\
Just to restrict the usage and then also have it so the user never has
to wait because we\'d run it periodically in the background instead of
have it be user generated. That would cause them to then have to wait in
that moment. So open to suggestions there, but that that\'s like the
principle that we\'re working.\
Behind and for now, and maybe that will change in the future as we start
to learn more about how people use it and what we can do and we can make
it more adaptable and updating in the in the future because I think we
would like to move towards more of a real time type ability. But as
we\'re just in sort of you know this is a initial launch we want to make
sure that it\'s.\
It\'s not able to be broken.

![](media/glxjopes37qxshamjqmz2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 29:40\
Right.

![](media/tkzwfev3zx75mbto0imf4.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 29:40\
Yeah. OK.

![](media/equ0gg_frf4jlan1kwwsb.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 29:42\
I I\'m sorry. Maybe you already told. Maybe you already told, but so
imagine we sent 10 pages this month. We are OK with the limit. Like our
customers say. Fine. Fine then 10 pages.\
So next month you you will launch analysis automatically, right? So if?

![](media/deaoqia_y-fv01t9tjjp2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 30:07\
So yeah, as far as the Athena API is concerned, it\'s just going to be
checking which which pages have been analysed for the given site over
the last monthly interval, and then given that the user within Chameleon
will be updating the page list.

![](media/w2myebawyw8kek50kg5h2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 30:19\
Mm-hmm.

![](media/j-futjwkyl7uvs7w7t-xs.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 30:26\
Uh.

![](media/3wvqypijgx9hzqkr0914w.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 30:29\
OK, OK, I got it. I got it. For example this use case, so a customer
knows about like you automatically launch 10 pages so.

![](media/th7dhz6ed62d0ajvdpab0.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 30:29\
It would be on on on on the chameleon side.

![](media/t5c27zki82i3z3qyck-4l.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 30:43\
I would like to launch analysis on my 10 pages and then I want to
disable some pages. I would say OK OK, no need to launch automatically
so our customers enters those pages. But then for example next week so
our customer decide OK.\
No analysis for this. Is this so dwell low in your API like disabling
some pages.

![](media/bfnrw71shnh7eepj0qb44.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 31:11\
So.

![](media/ylscjduqlml4hbyckla7m.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 31:11\
To stop, to stop, to stop doing analysis automatically.

![](media/utjexs3shajq_xxbfeoyt.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 31:15\
Yeah, I so the the automation will be on the chameleon side. So you\'ll
be looking at which pages are enabled and disabled and then the trigger
will be in a background job from Chameleon hitting the Athena API. And
then on our side we\'re just checking.

![](media/6kgqky_gkqhh8k2wvy9nm.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 31:28\
Yeah.

![](media/svx4el1natjpjt_fffntw.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 31:32\
If it\'s still within the 1010 unique URLs for that site being analysed
in that month and.\
As far as like the enabling and disabling like that, can that can all
happen within the chameleon interface, but the actual triggering of the
analysis will be within the chameleon back end.

![](media/ewwo-vkvrem8bgac8ttkj.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 31:55\
Yes.

![](media/gfbc_rhlhpi9ybjymwlol.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 31:56\
OK, I see. So how to so suppose we have 10 pages like our customer wrote
those two pages. We are in Chameleon store those 210 pages. Our customer
then remove.\
Removes 4 pages, so it now it has 6 pages only and he wants to update
them automatically only 6 pages.\
What should we do at the beginning of the next month before you will
launch this automatically? We should. We should be faster than you. Like
we would say we would.

![](media/ywnum-tynjapr1b47guhc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 32:34\
No. Yeah, I think I think, Peter, it has to be managed on our side. I
don\'t see another way. It has to be explicitly, you know launched.

![](media/cxw4s9s3gwoyaqdmomsvj.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 32:43\
That\'s fine. That\'s fine. That\'s fine. That\'s fine, Fred. Of course
we will manage. We will manage. So if we sent only 6 pages, you will
stop updating those four, right? That\'s that\'s OK for you, right?\
Okay because for example Fred like A use case our customer knows about
this here. So he removes those 4 pages and he knows okay next month I
will see which pages I will add.

![](media/3ocpq_z8r8yb7figjsavd.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 32:59\
Yes.

![](media/u_oueoxlobfkppkezoap2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 32:59\
Yep.

![](media/mnclqgizpncyz-ltr2qfj.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 33:01\
OK.

![](media/5svfamfbi8j9ql1b0l9ca.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 33:14\
You understand? So a customer doesn\'t know right now, but only next
month. So I I I would like to know. So it\'s possible to support this
case, right?

![](media/qipzl8_ks1kns4cfhyln6.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 33:15\
Yeah.\
Yeah, I mean the, the, the CTA to launch the analysis should be disabled
as soon as they\'re reached with 10 pages per month. And then let\'s say
the next month. But CTA is activated again and then the user has to
explicitly launch the analysis under the same URLs or.

![](media/gwg_xupon6vubpt3vwidp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 33:28\
Oh.\
Mm-hmm.

![](media/o_bwtu95k08jkrbkun3eq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 33:46\
Just have to date just has to date the list of yours. He wants the
analysis to be run on.

![](media/s2wldgs8aydii9xh4k8oe.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 33:50\
Mm-hmm.\
Uh-huh.

![](media/acpm_iwvsavsaf9tvzh_r.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 33:53\
Yeah, I think this is an interface problem. I think not really a tick
one, but I think I think we can handle it.

![](media/sec9rs8v6vgwxipbquupx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 33:54\
That\'s what I would do.\
Yeah, exactly. Yeah.\
So it it it means on your side guys, I don\'t think the analysis should
be launched automatically every month because because the customer may
need to change release of URLs and so on.

![](media/ttcxsbqb6gkmlo6_vbqiv.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 34:13\
Yes.

![](media/706iqnhx0t9h_ystgg_u4.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 34:14\
Right. And then so the other other nuance would be once a variation or
an experiment is being moved forward on and like proceeded into PBX by
the Chameleon End user.\
We\'ll also expose an endpoint for you to pass, like the variation ID or
the experiment ID, as well as the the the finalised implementation spec
from PBX because you know the the variation might have went through.\
Some micro adjustments by the Chameleon End user in PBX and once the
test is complete there would be like a results endpoint that could be
fed back into Athena.\
And then we would use that for the future analysis for that that
document page or type of page for that site.

![](media/jcrdbvf-qztd7jgmzzaph.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 35:14\
OK. Just to be sure. So you want you want the list of prompts or the
code?

![](media/hvo8vo5exhbcqrv9c4g4p.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 35:20\
But.

![](media/twt8m7qubozzq7b_fuk8x.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 35:20\
So the code pack the like prompt chat history just so we can deduce any
changes from the original variations back to the final output and then.

![](media/kznanzhbsrfto5ouhik-n.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 35:35\
OK. So we just offer prompts basically.

![](media/2wjieplh5nnrkg6fwjhga.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 35:36\
None.

![](media/xvsn3te3pjylbkolbt4f_.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 35:38\
Yeah.

![](media/0r3i7rjve7vl4buryi35-.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 35:39\
Yeah. And then and then the code pack and then obviously they would have
set up like targeting or goal tracking within the finalisation UI. So
then that would actually be valuable to like.

![](media/vgrjdxypzbygc-xfdr8v9.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 35:39\
Yeah. OK.

![](media/ate5k9ycmtkxmkf4a4fcw.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 35:44\
Yeah.

![](media/9mdw2sp9sfseovmjgmkn_.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 35:56\
Inform like audience metrics on our side and how like the feature
analysis are tailored.

![](media/e7a9ldfl7zuyw1y3hyxw5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 36:03\
Yeah. Which to go back to the the principles on this right is that we
want we would we want to be able to use the outcome of the experiment to
be able to reinforce the suggestions, right, that that\'s the goal. But
the key is that we don\'t know necessarily just \'cause they click this
create in PBX button.

![](media/xc3t1kt_phs1oihnoebxl.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 36:04\
Yeah.

![](media/30tx-rdpjbaoyn6egjrqe.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 36:23\
That what actually gets tested is what we\'ve suggested. And so in order
to tie those back, that\'s the piece that we want to be able to solve
for, which is either to like use the code or the prompts to check
whether or not is what went live. Actually what we are suggesting so
that when there\'s a data point to set back of like did this.

![](media/4kakhrwvgepc0poojbzla.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 36:41\
Yeah.

![](media/utwvo59jhagyvtitdvvrp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 36:42\
To work or not, we are able to connect that reliably without having too
much uncertainty around, you know, incorrectly assigning results to
things that didn\'t actually get tested, right? That\'s the problem that
we want to solve for.

![](media/55uha-bbrbqbpunqf-uot.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 36:58\
I\'m sorry, I\'m sorry.

![](media/18g-lqrk1oqldxqdhyipg.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 36:59\
I\'m fine. I\'m fine with that. Yeah, I\'m fine with the only. My only
concern to to interrupt, but. But my only concern is the risk of data
progressing, especially if we are talking about the targeting and so on.
There may be some sensitive data there.

![](media/trv-jprg5di4qxwh-xt8z.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 37:07\
Yeah.\
Yep, yeah. Which at the the easiest way to handle this? That at least
how we\'re handling it is it\'s just a winner, loser. Inconclusive.
Like, it\'s not doesn\'t have to net.

![](media/ssfrvscfzxe_5ar6ntz_g.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 37:27\
Yeah, exactly. Yeah, I\'m fine with the list of forms and the result.
Yeah, I\'m fine.

![](media/3rchpypjglukai_bbz0l2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 37:30\
Yeah. So let\'s you tell us what you\'re able to share privacy related
wise and we\'ll we\'ll take as much as we can to then reinforce that.
But obviously we are not going to break the law. So we\'ll we\'ll we\'ll
go as as close as we can get.

![](media/psavg8mr47kwnyfapzuly.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 37:41\
Yes.

![](media/cgzi6qipcoz7rfja_lq3w.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 37:46\
To make sure we have accurate data to reinforce the model, yeah.

![](media/7wfcqfmv2z6n0b6jjbymc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 37:47\
Yeah.\
You tell you are you, are you? You, you, you, you are about to say
something.

![](media/tgrqxm0pfnpzidklvnmqu.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 37:53\
None.\
Yes, yes, yes, about technical side of this. So I don\'t care about
legal stuff. So yeah, so you you want us to send like prompts which PBX
is generates like PBS generates prompts.

![](media/gwhspiou5dmcg3e0tac82.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 38:01\
Yeah.

![](media/yftvva_o7ozp_blrc60a2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 38:01\
Yeah.

![](media/j0jwckyhoxfze58hs25c6.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 38:14\
And we need to say to send this content to your API, yes, with variation
ID. Yes, you sent us variation ID and we just need to send to like this
is variation ID. This is the result for you for for independent for
specific URL.\
Right in your EPA, right?

![](media/sy0gccprswd9jb9cjba-u.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 38:36\
We are asking for the code associated with the test. They end up
running, not necessarily the test that we send to you. We know the user
will read the prompt, we\'ll see the output and we\'ll probably change
it. They will want to iterate to find what you know, what they\'re
looking for.

![](media/mqwia7u64qxaqp4o6utkx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 38:45\
Yeah.

![](media/mzloaztmr0tmnearl5lxy.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 38:51\
Hmm.

![](media/c2ti37upren4ihrnuffib.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 38:51\
Uh-huh.

![](media/iqezb5niqnek3mzsq8nl5.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 38:53\
We like that final version that goes to testing. We know it will be
different.

![](media/qskgsei9w4vuaoqlfeyzx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 38:54\
Yeah.\
Yeah, they want to see the delta between what they suggested and what
the user ultimately ran to the model, so.

![](media/7qn0ich6lqhuaqflkshqi.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 39:02\
Yeah. So yeah, so we want the we want the code at the point that it gets
launched, we want to be sent it, not just whatever PBX generates at the
start. So yeah, \'cause, it\'s like it needs to be what actually got run
ideally is what we\'re looking for. So every time they pause and
relaunch, we want to update and overwrite.

![](media/jchr40gzbd-dfhecdvkiq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 39:14\
I I.

![](media/kpsncvbc4efw8vafyd_1k.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 39:21\
That assuming that the most recent launch is the is the actual code.

![](media/sg3sc-hjhtmhodg7mds5t.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 39:29\
I say, but anyway, so you have already this API and because we need to
develop a back end like which can send this delta to you, we won\'t. We
won\'t say, right.\
Because because alternatively we have to gather this information and we
will send it to you with e-mail, you know, to you. So again you you have
endpoint in your API for this, right?

![](media/nf4dgi2cn89mxvjjih_9o.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 39:45\
I think I think we need to end point.

![](media/ppxnr1z68gzpjyf7z5pew.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 39:59\
Yeah. So we\'re gonna be sending you a list of all these endpoints and
and all the details of for Friday.

![](media/bmipra0bl1jx6knjyqg85.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 40:02\
OK, OK. OK, that was my question on Liv. OK, thank you. Yes.

![](media/go5h2g-m-v2tuvtt5atsp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 40:07\
OK.

![](media/kpgiod_bkdvt_kallua5d.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 40:09\
And Peter, we also need the result. So when when when the experiment has
been stopped, they they want to, they want the the status like
inconclusive, you know conclusive mutual and so on.\
We don\'t know what we have basically.

![](media/juu5ldmyufookaq_agqd_.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 40:27\
OK.

![](media/syg2-rjjlvtaxdurtszcx.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 40:27\
They know if it worked it worked or not or not.

![](media/3wn7todwaqm4pdoijrxc1.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 40:27\
Uh.\
I I hope it\'s not a problem because you know our customers launch
experiments and those experiments can be stopped in two months. So if
you regenerate automatically your insights.\
You still store old variations, so like you still have this variation ID
and you are ready to receive feedback about it on your endpoint right
by.

![](media/g_xspdy9ggx09kgwb7nqh.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 40:59\
Yeah. Yeah. So, so think about analysis as like snap, like backlog
snapshots in time. So you\'ll be you\'ll be like anchoring the variation
ID and the experiment ID to whichever experiment or variation that was
from whichever analysis in the past. So even if it finishes two months
later.

![](media/cjqg7wjg5fyf3zokcdmya.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 41:06\
OK, OK. OK, perfect.\
Mm-hmm.

![](media/yv9hllcp_zjyu8gqq6sao.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 41:19\
We still have it historically stored in our database, yeah.

![](media/uezd7eotmbuuujvuqeegc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 41:23\
Yeah, I understand. It\'s a obvious question, but I had to ask, you
know, yeah.\
OK, Fred.

![](media/gnsqy3gbb01mge5oycv49.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 41:33\
Cool, yeah.\
Go ahead.

![](media/sjw_shsuqrumkouzobewp.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 41:39\
Fred. Fred. Fred. Yeah.

![](media/fdt1jaf-f8c600r66ymsf.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 41:40\
Think we are good? Yeah, I\'m good on my side. Any anything we missed?

![](media/u-ab5qfjotxvxhzd4duwg.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 41:40\
Yeah.

![](media/4_fhdowk4b6vgwx3pddqs.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 41:45\
The I just have one more that would be maybe as a point for discussion.
So when we, there\'s one thing of getting results to help tell us what
types of ideas are good or bad from a actual.\
Outcome perspective. But I think we also would still be interested in
learning what is good and bad just at what the users perception of them
is. So like we\'ve been toying with the idea like doesn\'t make sense to
also have like a thumbs up thumbs down system or something that\'s not
necessarily that you\'re going to do it but you\'re like, yeah, this was
a pretty good idea or this was a very bad idea.

![](media/ekir9ddqtgr2ccxg6dhg2.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 42:16\
Yeah.

![](media/mo-q3y31bejk2kkfqfijz.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 42:22\
Idea, because that information might actually be better at at the
perception to the user of the quality of the ideas that are they\'re
given separate from the actual results quality that they run later. So
that\'s just one other piece that we I would like us to consider. Like
if you have a good way or a good suggestion to build that.

![](media/kad5r-ddhvruho3tadgld.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 42:26\
Yeah.

![](media/jyxualhpj82obsmismonc.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 42:41\
That into the system that like they can just rate them like even if
it\'s just thumbs up, thumbs down like something we can get back at that
stage would be helpful as well \'cause that that will provide us a way
higher volume of training data than the actual test results will.

![](media/4wg0xkk8xw68kof5gev4g.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 42:49\
Yeah.\
We have sort of this, just not for the MVP phase, but we have some
situations as similar to this. Yep.

![](media/vaixxwwcxscovc1fupmgm.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 43:01\
OK. Yeah.\
Cool.

![](media/grb0m4ezy-orq3uiw3jkb.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 43:07\
OK.

![](media/jjw4g6vrfe8sdww2oagnn.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 43:10\
But.

![](media/wfgj4tyug29y9bwkj9rqk.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 43:11\
Right.\
I think we are good. Yeah. I don\'t have any other question on my side.

![](media/2my9ybrgtqmjeawmv6-fh.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 43:17\
Yeah, go on my side as well.

![](media/dcfkgrgluasovv-fkvile.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 43:18\
So in terms of next steps, so we we so you, you you said that you will
provide the documentations of all endpoints by end of week or.

![](media/cgplzwgus0wbzlgoi_8ds.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 43:26\
Yeah, aiming for end of day Friday to have that document over.

![](media/4bpq641amnsycbcgelkpv.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 43:29\
OK.\
Wait, OK, good. So we\'ll revise, I think the the mockups you know based
on our discussion today and we can send that to I think \'cause you need
to them.

![](media/-fs9z9y-z3al8zmyg7a66.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 43:44\
Yeah, yeah. We\'ll send over something proper in Figma. This is this
like like in something like in stick but.

![](media/wvkcu2iczcm3kiv8mzd_r.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 43:48\
Uh-huh.

![](media/wcqsflnz5koktrgifvsia.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 43:48\
Yeah.\
Yeah. And it and integrated integrated in our product as well because of
course it will be integrated there.

![](media/gmpeoji_uallkxdue4m_a.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 43:55\
Yeah.

![](media/yfuoct0p8ci9gcloqqqtq.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 43:57\
Yeah. And then Fred, maybe you and I can follow up with that. We just,
we\'d also, this is like the product technical conversation, but we also
would want to advance the commercial conversation and and to talk a
little bit about like the research that we\'ve done on price pointing
and learn what you\'ve.\
Gotten to a price pointing like how we actually package that into, you
know, other parts of Chameleon. I don\'t know who is the right person on
your team to have. If that\'s John Rene or John Noel or John Rene, OK.

![](media/q7xp-75r2c6wjccxztrfy.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 44:25\
I think Johnny. Yeah, I think, Johnny, I think the discussion took
place. I don\'t know when, but it took place. But but to reach reach out
to him. Yeah.

![](media/jwa-iwro5rl6pp3vfpt7l.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 44:35\
Yeah. OK. Sounds good. Good.

![](media/s-vfbxqukrcowllfmjajl.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 44:38\
OK.\
All right. Thank you. Thank you so much.

![](media/vmv06vq9p8h9ndgvcrqf6.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Jackson Stark** 44:41\
Yep. Message us at any time. If anything comes up. Thank you. Alright.
Thanks guys. Thank you.

![](media/serdlr4liz3fvabw3t4kf.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Peter** 44:43\
Thank you. Bye.

![](media/sryi_frqrwb9gdcr7t1of.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Fred (Kameleoon)** 44:44\
Yeah, sure will do. Thanks. Bye. Bye.

![](media/fxdoyqodm6jvzvhv4a4f-.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Mike St Laurent** 44:44\
Thank you. Bye.

![](media/gr4qtljy7exrftfriv6df.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Junaid (PM @ Kameleoon)** 44:47\
Thank you, gents. Bye.

![](media/angxaihic-2zkvjgs3fce.png){width="0.3020833333333333in"
height="0.3020833333333333in"}**\
Omer Jacoby** 44:48\
And so.

![](media/1lipw8icf3ba8gtpmy3id.png){width="0.22916666666666666in"
height="0.22916666666666666in"}**\
Drake Som** stopped transcription
