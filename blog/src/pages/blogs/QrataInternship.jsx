import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@hugeicons/core-free-icons";
import {
  Database,
  GitBranch,
  Zap,
  MessageSquare,
  Lock,
  BarChart3,
  FileImage,
  Upload,
  FileText,
  Cpu,
  Send,
  Link as LinkIcon,
  Bell,
  Calendar,
  Mail,
  Shield,
  Search,
  FileEdit,
} from "lucide-react";
import Background from "../../components/Background";
import GradualBlur from "../../components/GradualBlur";
import ProgressiveBlur from "../../components/ProgressiveBlur";
import TldrCard from "../../components/TldrCard";
import ImageModal from "../../components/ImageModal";
import { BouncyAccordion } from "../../components/motion/bouncy-accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/motion/tabs";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { blogs } from "../../components/BlogList";
import ScrollProgress from "../../components/ScrollProgress";

const BLOG_ID = "qrata-internship";

function getNextBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx >= 0 && idx < blogs.length - 1 ? blogs[idx + 1] : null;
}

function getPreviousBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx > 0 ? blogs[idx - 1] : null;
}

export default function QrataInternship() {
  const [views, setViews] = useState(0);
  const navigate = useNavigate();
  const currentSlug = "qrata-internship";
  const nextBlog = getNextBlog(currentSlug);

  const features = [
    { id: "1", title: "account ops dashboard", description: "a few tweaks to existing apis to send back the correct data faster.", icon: <Database className="h-4 w-4" /> },
    { id: "2", title: "timeline", description: "the timeline of every talent, right from when they joined to getting hired/rejected.", icon: <GitBranch className="h-4 w-4" /> },
    { id: "3", title: "gpt to gemini migration", description: "when i joined, the platform was still using gpt 3.5 turbo for ai powered features. personally, i wasn't a fan because it was already quite old and gemini 2.5 flash lite delivered better outputs while costing less. it was a no brainer to migrate. so every new feature i built, along with the older ai powered ones, eventually got migrated over to gemini.", icon: <Zap className="h-4 w-4" /> },
    { id: "4", title: "slack integration", description: "before this, users could only share profiles via email and whatsapp. i added slack as another sharing option so our talent partners could directly share candidates with our clients' recruitment team because it was the main communication channel between them.", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "5", title: "encryption (resume url)", description: "this was a hotfix (highest priority bug) which i picked up to basically encrypt the resume url that was being shown in the api responses.", icon: <Lock className="h-4 w-4" /> },
    { id: "6", title: "market intel", description: "these pages were used to get new clients or give a sample list of candidates showing what kind of market research qrata can offer. the entire page was being filled in with detailed prompts to generate accurate numbers and data.", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "7", title: "resume watermark", description: "adding our logo on every resume that is uploaded on our platform.", icon: <FileImage className="h-4 w-4" /> },
    { id: "8", title: "bulk upload", description: "earlier, recruiters could only upload one candidate at a time by uploading a resume and letting the llm extract the information before prefilling the form. the entire flow took roughly a minute per candidate. to improve this, i built a concurrent bulk upload pipeline where recruiters could upload multiple resume pdfs together or simply upload a spreadsheet containing candidate details along with drive links to resumes. i benchmarked it afterwards and the new flow ended up being roughly 95% faster than the original process.", icon: <Upload className="h-4 w-4" /> },
    { id: "9", title: "stage narrative", description: "", icon: <FileText className="h-4 w-4" /> },
    { id: "10", title: "embeddings", description: "created vector embeddings for candidates whenever they were created or updated, and matched them against job description embeddings to generate a fit score.", icon: <Cpu className="h-4 w-4" /> },
    { id: "11", title: "submit profile", description: "added another ui for the email that is used to submit profiles of various candidates to the clients.", icon: <Send className="h-4 w-4" /> },
    { id: "12", title: "copy sheet link", description: "a way to get all the activity and candidates in a job directly to a google spreadsheet to be shared with clients directly for cleaner access.", icon: <LinkIcon className="h-4 w-4" /> },
    { id: "13", title: "awaiting feedback", description: "an option to send a reminder message via (email, whatsapp or slack) containing the candidates in a pending feedback stage in their job.", icon: <Bell className="h-4 w-4" /> },
    { id: "14", title: "weekly hiring report", description: "created account wise weekly reports for clients to show the progress made in each of their active jobs on our platform in the last week.", icon: <Calendar className="h-4 w-4" /> },
    { id: "15", title: "google email verification", description: "the platform already had an email sharing feature but every email across the platform was sent through a single account, which eventually started getting flagged as spam. to solve that, i built an oauth connector so every talent partner could connect their own gmail account and send emails through our platform. this also meant recording demo videos and communicating with google support to obtain approval for one of gmail's sensitive api scopes.", icon: <Mail className="h-4 w-4" /> },
    { id: "16", title: "user security", description: "created the schema, the middleware, the documentation for KT, so that different users on our platform have their respective permissions.", icon: <Shield className="h-4 w-4" /> },
    {
      id: "17",
      title: "talent pool search",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div>
          <p className="mb-2">
            we at qrata had a decently sized talent pool of around 66k candidates (at the time i was working there). to query it, we already had filters and other search options in place, but we needed something faster. i updated the existing search bar to perform a hybrid query by combining direct mongodb filters with semantic similarity matching using talent embeddings. this allowed recruiters to search for candidates in natural language.
          </p>
          <div className="text-neutral-400 light:text-neutral-500 italic text-sm">
            for example: "find me product managers from bangalore with 8 years of experience"
          </div>
        </div>
      ),
    },
    { id: "18", title: "role brief", description: "this feature went through four different iterations and was probably one of the heavier ones from both a backend and frontend perspective. the idea was to create a page where clients could interact with us and guide us in defining the job requirements more accurately.", icon: <FileEdit className="h-4 w-4" /> },
  ];

  const favoriteIds = ["3", "4", "8", "15"];
  const favoriteFeatures = features.filter((f) => favoriteIds.includes(f.id));
  const previousBlog = getPreviousBlog(currentSlug);

  useEffect(() => {
    async function updateViews() {
      const ref = doc(db, "blogViews", BLOG_ID);
      const snap = await getDoc(ref);

      const localKey = `viewed_${BLOG_ID}`;
      if (!localStorage.getItem(localKey)) {
        if (snap.exists()) {
          await updateDoc(ref, { views: increment(1) });
          const updated = await getDoc(ref);
          setViews(updated.data().views);
        } else {
          await setDoc(ref, { views: 1 });
          setViews(1);
        }
        localStorage.setItem(localKey, "true");
      } else {
        setViews(snap.exists() ? snap.data().views : 0);
      }
    }
    updateViews();
  }, []);

  const sections = [
    { id: "the-call", label: "the call" },
    { id: "the-interview", label: "the interview" },
    { id: "joining-qrata", label: "joining qrata" },
    { id: "life-at-the-office", label: "life at the office" },
    { id: "learning-the-codebase", label: "learning the codebase" },
    { id: "building-features", label: "building features" },
    { id: "the-things-thatll-stick-with-me", label: "the things that'll stick" },
    { id: "what-seven-months-taught-me", label: "what seven months taught me" },
    { id: "why-i-left", label: "why i left" },
    { id: "looking-back", label: "looking back" },
  ];

  const handleNav = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  return (
    <Background>
      <ScrollProgress sections={sections} />
      <div className="blog-article relative mx-auto w-full max-w-3xl px-4 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        <GradualBlur strength={1.5} divCount={2} opacity={1} />
        <ProgressiveBlur position="top" offset={150} />
        <ProgressiveBlur position="bottom" />

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} size={18} />
            <span className="font-medium">back</span>
          </button>
        </div>

        <h1 className="text-white light:text-zinc-900">Backend Intern @Qrata</h1>
        <div className="text-neutral-300 light:text-neutral-600 mb-4">
          published: <span className="italic">16-07-2026</span> &middot; {views}{" "}
          views &middot; 14-min read
        </div>
        <hr className="border-t border-[#232323] light:border-zinc-300 my-6" />

        <section className="mb-8">
          <TldrCard>
            <p className="text-neutral-300 light:text-neutral-600">
              tldr; a random internshala application. a two hour interview. one argument about why syntax is cheap. seven months at qrata. eighteen shipped features. a lot of stories.
            </p>
          </TldrCard>
        </section>

        <h2 id="the-call" className="text-neutral-300 light:text-neutral-600 mb-4">the call</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i got a call in late november 2025, just a few days before my sem 5 end sem exams. it was from devanshi (then product designer/manager at qrata). she asked if i was interested in working as a backend intern at qrata and whether i'd be willing to pick up some ai/ml stuff on the job. i agreed.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            honestly, i was wondering how i got approached by a company in the first place. turns out it was one of my applications via internshala that i'd completely forgotten about.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            after a small briefing call, she asked when i could come in for the face to face interview. if you've read my{" "}
            <Link to="/blogs/genai-hackathon-25" className="text-sky-400 hover:text-sky-300 underline">previous blog</Link>
            , you'd know what my plate looked like back then. i told her i had my end sem exams and a hackathon coming up, so i could only come in around december 3rd.
          </p>
        </section>

        <h2 id="the-interview" className="text-neutral-300 light:text-neutral-600 mb-4">the interview</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            exams happened, google genai hackathon won and i went in for the interview.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i was taken to a glass cabin where the lights were on (i'll come back to this funny detail) and my interview started. they asked me the usuals; tell me about yourself, what did you do in the last internship, what is this project about, etc. i had a really good point to start off on because i had literally won a google hackathon just a few days back.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i explained the project we built there but then they circled back to my previous internship. after that came backend related questions like what are middlewares, what should an api look like, what is the difference between authentication and authorization (i messed this one up), and eventually some schema design questions around comments and connections in facebook. by now we were around the one and a half hour mark, and they gave me a machine coding round where i had to build a webpage that could take in a resume and use an llm api to generate three strengths and three weaknesses of the candidate. the catch was that i had to finish it in thirty minutes without ai assistance.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            if anyone reading this knows me personally, they already know exactly what went through my mind when they said "no ai". i respected the condition and tried doing it with just google and stack overflow, but i couldn't get it done. so i called the interviewer over and asked if i could use ai instead. he said yes, but i reminded him that devanshi had specifically mentioned no ai, so he asked me to wait. after a while, both of them walked back into the room.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            at that point i knew this was practically over for me if i couldn't convince them, so i threw in one final hail mary. i told them that nowadays we all use ai for writing syntax because architectural decisions are what actually matter. syntax is cheap. i've become accustomed to ai assisted coding and if they'd allowed me to use ai from the beginning, i would've finished the task in five minutes. somehow... it worked. i still couldn't believe it. it was literally two copilot prompts away after that, and i finished the task.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            then devanshi asked me to wait outside for a while. we were almost at the two hour mark now. after some time she came back and casually asked if i was getting late for somewhere. this was another one of those moments where things could've gone horribly wrong. i replied, "yeah, i have plans with friends." you lot wanna guess who they were? mr. pole and{" "}
            <a href="https://aliqyaan-mahimwala.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">aliqyaan</a>
            .{" "}
            (go read{" "}
            <a href="https://blog.russeldanielpaul.tech" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">russel's blog</a>
            {" "}as well. man's too busy flexing his arch linux setup everywhere.)
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            devanshi later told me that she was actually about to reject me because of that answer. to her, it came across as if i wasn't interested in working there and didn't have time for them. the funny thing is that i've always tried treating interviews like conversations. people become incredibly robotic in interviews and portray an ideal version of themselves just to get hired, whereas i've always felt that portraying yourself as you are matters much more. of course, that doesn't mean being overly casual. there's definitely a balance to maintain and looking back, i probably pushed it a little too far that day.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            nevertheless, i got the internship.
          </p>
        </section>

        <h2 id="joining-qrata" className="text-neutral-300 light:text-neutral-600 mb-4">joining qrata</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the internship started with one month onsite and then shifted to hybrid because of college. when i joined, there was one thing that annoyed me far more than i expected. i couldn't get my github contributions anymore because the codebase was hosted on bitbucket instead of github. eventually i made peace with it, but to this day i still have no idea why we were using bitbucket.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            now coming to the tech team:
          </p>
          <ol className="text-neutral-300 light:text-neutral-600 list-decimal pl-6 mb-4 space-y-1">
            <li>devanshi (product designer/manager)</li>
            <li>vidhish (senior backend developer)</li>
            <li>kaushik (devops)</li>
            <li>pramod (senior frontend developer)</li>
            <li>sachin (senior frontend developer)</li>
            <li>garv (full stack intern who joined a month after me and has now converted to a full time engineer)</li>
            <li>evelyn (qa tester/product designer, joined a few months after garv)</li>
            <li>prachi (product designer who had previously interned at qrata and joined back in my last month)</li>
            <li>rusheel (aiml intern, joined in my last month)</li>
          </ol>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i'll go on a tangent here, but i think this is needed. my mum told me this story and i even remember bits and pieces of it myself. on the very first day of school, i went in normally and came out normally. but on the second day, i absolutely wrecked havoc. i was fighting all the teachers and crying to go back to my mum.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the start at qrata wasn't this dramatic, but it did make me realise that i have a bit of a hard time settling into new places. i never really ate lunch with everyone during the first few weeks. instead, i used to go on a call with my mum every day during the lunch break until i finished eating, and i'd usually walk around outside while doing so. but yeah, it took me a few weeks before i settled in properly. or maybe all of this happened because it was my first onsite internship (which later became hybrid).
          </p>
        </section>

        <h2 id="life-at-the-office" className="text-neutral-300 light:text-neutral-600 mb-4">life at the office</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            let's start with the office timings. it was 10:00 am to 7:00 pm with a lunch break from 2:00 pm to 3:00 pm. so, me being me, i tried to see if there's any buffer to come in late or leave early XD and i found out that we could come by 10:15 am in the morning but leave only after 7:00 pm (some days this was hilarious because i used to watch others pack things up and wait for it to be 7:00 to punch out at the right time).
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            my routine during the fully onsite time at qrata looked something like this -
          </p>
          <div className="text-neutral-300 light:text-neutral-600 mb-4 font-mono text-sm leading-relaxed whitespace-pre-line">
            8:00 AM - waking up
            9:00 AM - leaving the house
            10:15 AM - reach the office
            10:30 AM - the morning call
            10:45 AM - work work work
            2:00 PM - lunch break
            3:00 PM - work work work
            5:30 PM - evening stroll (this varied from like 4 to 6:30)
            6:50 PM - the evening call
            7:00 PM - leaving the office
            8:30 PM - reaching home
            9:00 PM - dinner
            10:00 PM - chilling
            12:00 AM - sleep
          </div>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            this was the only time the schedule looked healthy because when college started, the entire routine just went out of the window.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the morning and evening calls were something new to me and i didn't really like them at the start but then later i realized its importance. in the morning call, we discussed tasks/issues that each member will be working on and in the evening call, we discussed what was completed/worked on during the day. the reason i didn't like it was it felt like being judged publicly but then as time went on i realized that its very easy to get tunnel visioned and go down the wrong rabbit hole when working so if i couldn't complete the work, i would be questioned on what went wrong and other approaches would be discussed so that it could be completed the next day or soon. this had two benefits - first, we would know who is working on what in the team and that everyone is contributing every day and second, prevented the tunnel vision problem. i later found out that it was sir who used to take the calls by gathering everyone on floor and discuss all the teams together (technical and non technical teams) but as the number grew it was broken down into teams and team leads.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we'll discuss work in the later sections. coming to the lunch break. if you didn't skip the above section, then you'll know what i normally did for the starting weeks. i then got forced by kaushik and vidhish to play games with them during the break. we used to play carrom and uno (boy did kaushik cheated in uno, man used to pull out ten draw 4's every game hahahaha which rattled most of them). it was then where my calls during lunch slowly reduced and i got more comfortable with the team.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            one thing i can say for sure is that working at qrata hardly felt like working. most of the tech team had only recently graduated from college, so the environment genuinely felt like an extension of college itself. another thing i'll never forget is that they asked me what they should call me because apparently "romeiro" was too difficult to pronounce. i told them people sometimes call me rom, and from that day onwards i was simply "rom" around the office.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the first month, however, was excruciating for a completely different reason. i always thought the worst part about having a job would be overworking, micromanagement or something similar, but i found a much stronger contender, travelling. my daily commute took almost three hours in total. initially i travelled by bus because it was more comfortable, but later switched to trains and realised it was simply a tradeoff. slower but comfortable, or faster but significantly less comfortable. i eventually chose the latter. kaushik bhai also helped a lot with this because he left me at santacruz on his bike almost every time i came in for work.
          </p>
        </section>

        <h2 id="learning-the-codebase" className="text-neutral-300 light:text-neutral-600 mb-4">learning the codebase</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i started contributing from day one. i went through the codebase, picked up bugs from the backlog and if i remember correctly, even fixed one on my first day. i also had to maintain a spreadsheet where i logged everything i worked on each day (it stopped after they trusted me enough to deliver full blown features instead of just bug fixes).
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the first month was mostly about understanding the product and the codebase rather than building major features. i worked on bug fixes, api documentation, schema changes, endpoint optimisations, query improvements and prompt updates. the only sizeable thing i worked on during that period was designing the schema for a rbac system, but that eventually got put on hold because other features became more important. the branch just sat there for months and it's only recently that they're building on top of it.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            another thing worth mentioning here is the check ins with monish sir (ceo) who always did his best in helping us understand the real intent behind every feature that we were working on. he used to ask us for our inputs (even me as an intern) till we all had a shared understanding of what is supposed to be done and what exactly is feasible. another not so important fact is that sir used a vertical mouse (logitech mx vertical or a logitech lift vertical one of them, if i remember correctly) which distracted me (like, i can't understand how that is more comfortable than the normal ones) sometimes when i went for discussions with others.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            by the end of the first month, i finally felt like i knew my way around the codebase and was ready to start building actual features.
          </p>
        </section>

        <h2 id="building-features" className="text-neutral-300 light:text-neutral-600 mb-4">building features</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            from the second month onwards, i had become comfortable with the codebase and was finally ready to contribute actual features. over the next few months i worked on the following:
          </p>
          <Tabs defaultValue="all" variant="pill" className="mb-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">all</TabsTrigger>
                <TabsTrigger value="favorites">favorites</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <BouncyAccordion items={features} />
            </TabsContent>
            <TabsContent value="favorites">
              <BouncyAccordion items={favoriteFeatures} />
            </TabsContent>
          </Tabs>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i genuinely enjoyed working on all of these because i could actually see people using what i was building and give feedback on it. i also ended up learning a lot about ux because not everyone using the platform was tech savvy.
          </p>
        </section>

        <h2 id="the-things-thatll-stick-with-me" className="text-neutral-300 light:text-neutral-600 mb-4">the things that'll stick with me</h2>
        <section className="mb-8">
          <ol className="text-neutral-300 light:text-neutral-600 list-decimal pl-6 mb-4 space-y-4">
            <li>
              remember how i mentioned the interview room with the lights switched on? over the seven months that i worked there, i can probably count on one hand the number of times those lights were turned on again. turns out i experienced one of the rarest events in the office on my very first day.
            </li>
            <li>
              one of the nicest moments during my internship happened around christmas. it was secret santa season and i had absolutely no idea because i had joined recently. instead of leaving me out, everyone pooled in together and got me a gift, a pair of boat headphones. i genuinely loved those.
            </li>
            <li>
              cycling with the tech team. before this, i didn't even know that you could rent cycles. it was a really fun day but god, the cycle seats don't go easy on your bum. we cycled for around 3 hours.
            </li>
            <li>
              evening walks. we used to go out for a 15 min walk every day and discuss the most random things while at it.
            </li>
            <li>
              devanshi's last day. she had worked at qrata for almost 3 years and literally the entire office came in (normally the teams are divided into two halves and work in hybrid). it was a bittersweet day.
            </li>
            <li>
              getting the win of the week. i think the photo below is pretty self explanatory.
            </li>
            <li>
              my last day. the best of them all. i got a bunch of gifts from them - a gojo caricature and a sword keychain from garv, a gym bag, deadlifting belt and wrist straps from everyone combined (i would've joined the gym but the july rains are moving mad, i will join soon). they also got a brownie ice cream tub instead of a cake, which was a banger. we later went out for dinner. got drenched while going back with kaushik on his bike, but this was hands down the best day.
            </li>
          </ol>
        </section>

        <h2 id="what-seven-months-taught-me" className="text-neutral-300 light:text-neutral-600 mb-4">what seven months taught me</h2>
        <section className="mb-8">
          <ol className="text-neutral-300 light:text-neutral-600 list-decimal pl-6 mb-4 space-y-6">
            <li>
              <strong>praying before pushing to prod works.</strong>
              <br />you miss 100% of the prayers you don't make. i'm happy that prod didn't go down too often while i was there, but whenever it did, it was a pretty big event because the platform was in use at all times (by our on floor members and indian clients during the day and by our US clients at night).
            </li>
            <li>
              <strong>hybrid &gt; remote &gt; onsite</strong>
              <br />this is just a personal revelation because i used to be a huge advocate for remote jobs. i watched a lot of videos about working remotely and earning a lot while doing so. now that i've kinda done all three (my first internship was remote, the first month at qrata was onsite and the rest was hybrid), i can safely say that hybrid is the best. working remotely is just too lonely for me, even though i probably do my best work there. onsite is just too tiring and rigid. hybrid gives me the best of both worlds. i get to come into the office, meet everyone on some days and work peacefully from home on the others. i feel like this depends on a lot more things, but for now, this is where i stand.
            </li>
            <li>
              <strong>2 hours of focused work &gt; 10 hours of multitasking</strong>
              <br />this came from my experience with the market intel feature, where i was working in hybrid while juggling college submissions, tests and everything else. i was literally working till 2 am, waking up at 5 am to continue working and then leaving for college at 7:30 am. i think that was the only time i ended up holding a production deployment. when i finally went into the office (the one day in a week), i wrapped the whole thing up in 2 hours.
            </li>
            <li>
              <strong>ask more questions than necessary.</strong>
              <br />this mainly came from my conversations with devanshi. she used to give me feature briefs as my manager and i've made the mistake of starting work with only half an understanding of what needed to be built (this instantly turns into russian roulette with 5 bullets loaded instead of 1). ever since then, i've probably nagged her enough to make sure i completely understand what i'm about to build before i even open my editor.
            </li>
            <li>
              <strong>working with stress vs working without stress, pays the same.</strong>
              <br />seems intuitive but it's very easy to forget. when the task starts becoming bigger than everything around you, taking a break genuinely helps.
            </li>
            <li>
              <strong>fundamentals help when tools give out.</strong>
              <br />github copilot was the only ai agent i used for 2 years because my friend (yeah russel again) introduced me to the free education plan. it was neat because of its request based pricing model, but it all went downhill when they changed it recently. i switched to opencode with free models and picked up on new ways to generate better code with them. it might sound like i simply switched tools, but i had to read a lot more code now than before because i was always skeptical of what these new free models generated.
            </li>
            <li>
              <strong>behzinga is not the way.</strong>
              <br />maybe it's too early for me to say this, but i don't think i can ever just be colleagues with the people i spend most of my day with. i've always blurred that line a little. i end up considering them friends or elder brothers instead, and i genuinely think that's one of the reasons i enjoyed working. obviously this depends on the people and the environment, but i'm glad qrata turned out to be that kind of place for me.
            </li>
          </ol>
        </section>

        <h2 id="why-i-left" className="text-neutral-300 light:text-neutral-600 mb-4">why i left</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the main reason i left was because i felt like i was becoming stagnant as a developer and i genuinely believe that's one of the worst positions a young developer can be in. i had reached a point where i was mostly applying things i already knew instead of learning new concepts from the team or pushing myself technically. with college placements around the corner, i also wanted to dedicate more time towards dsa and system design, even though i've still not started properly :p
          </p>
        </section>

        <h2 id="looking-back" className="text-neutral-300 light:text-neutral-600 mb-4">looking back</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i'm really grateful to everyone at qrata, especially the tech team and monish sir. funny how an application i didn't even remember applying for ended up giving me seven months i'll never forget.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i got to work with some genuinely amazing people, had a lot of fun while doing it and walked away with stories i'll probably be telling for years. i'm glad that i could leave behind a small impact on the product as the youngest person on the floor.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            to everyone at qrata, thank you for making my first proper software engineering internship one i'll always remember. i wish nothing but the best for the entire team.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            see y'all in the next one, cheers :)
          </p>
        </section>

        <div className="flex items-center justify-between mt-8">
          {previousBlog ? (
            <button
              onClick={() => handleNav(previousBlog.slug)}
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition"
            >
              <HugeiconsIcon icon={ArrowLeftIcon} size={18} />
              <span className="font-medium">previous</span>
            </button>
          ) : (
            <div />
          )}
          {nextBlog && (
            <button
              onClick={() => handleNav(nextBlog.slug)}
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition"
            >
              <span className="font-medium">next</span>
              <HugeiconsIcon icon={ArrowRightIcon} size={18} />
            </button>
          )}
        </div>

        <hr className="border-t border-[#232323] light:border-zinc-300 my-6" />

        <section className="mb-8">
          <h2 className="text-white light:text-zinc-900">links</h2>
          <ul className="list-none text-neutral-300 light:text-neutral-600">
            <li className="mb-2">
              twitter:{" "}
              <a href="https://twitter.com/whotookromeiro" target="_blank" rel="noopener noreferrer"
                 className="text-[#38bdf8] light:text-[#0369a1] underline">@whotookromeiro</a>
            </li>
            <li className="mb-2">
              linkedin:{" "}
              <a href="https://linkedin.com/in/romeirofernandes" target="_blank" rel="noopener noreferrer"
                 className="text-[#38bdf8] light:text-[#0369a1] underline">romeirofernandes</a>
            </li>
            <li className="mb-2">
              github:{" "}
              <a href="https://github.com/romeirofernandes" target="_blank" rel="noopener noreferrer"
                 className="text-[#38bdf8] light:text-[#0369a1] underline">romeirofernandes</a>
            </li>
            <li className="mb-2">
              portfolio:{" "}
              <a href="https://romeiro.dev" target="_blank" rel="noopener noreferrer"
                 className="text-[#38bdf8] light:text-[#0369a1] underline">romeiro.dev</a>
            </li>
          </ul>
        </section>
      </div>
    </Background>
  );
}
