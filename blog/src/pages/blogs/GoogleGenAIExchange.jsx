import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@hugeicons/core-free-icons";
import Background from "../../components/Background";
import GradualBlur from "../../components/GradualBlur";
import ProgressiveBlur from "../../components/ProgressiveBlur";
import ImageModal from "../../components/ImageModal";
import TldrCard from "../../components/TldrCard";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { blogs } from "../../components/BlogList";
import { RainbowTextEffect } from "../../components/ui/rainbow-text-effect";
import VideoPlayer from "../../components/VideoPlayer";
import ScrollProgress from "../../components/ScrollProgress";
import { SmoothScroll } from "../../components/motion/smooth-scroll";

const BLOG_ID = "genai-hackathon-25";

function getNextBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx >= 0 && idx < blogs.length - 1 ? blogs[idx + 1] : null;
}

function getPreviousBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx > 0 ? blogs[idx - 1] : null;
}

export default function GoogleGenAIExchange() {
  const [views, setViews] = useState(0);
  const navigate = useNavigate();
  const currentSlug = "genai-hackathon-25";
  const nextBlog = getNextBlog(currentSlug);
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

  const galleryImages = [
    { src: "/google-gen-ai-exchange/email-ss.webp", alt: "Qualification email", caption: "the email that changed everything" },
    { src: "/google-gen-ai-exchange/cute-tax.webp", alt: "Cute tax on flight tickets", caption: "the price of being cute" },
    { src: "/google-gen-ai-exchange/leela1.webp", alt: "Leela Palace Bangalore", caption: "decorated entrance" },
    { src: "/google-gen-ai-exchange/leela2.webp", alt: "Leela Palace Bangalore", caption: "leela palace lobby" },
    { src: "/google-gen-ai-exchange/presentation-schedule.webp", alt: "Presentation schedule", caption: "the schedule" },
    { src: "/google-gen-ai-exchange/cheque1.webp", alt: "Team T-Rex with cheque at Leela Palace", caption: "at leela palace" },
    { src: "/google-gen-ai-exchange/stage.webp", alt: "On stage at Leela Palace", caption: "on stage at leela palace" },
    { src: "/google-gen-ai-exchange/reactflow.webp", alt: "Reactflow pipeline", caption: "the reactflow pipeline" },
    { src: "/google-gen-ai-exchange/cheque2.webp", alt: "Team T-Rex with cheque at CRCE", caption: "yeah we signed it" },
    { src: "/google-gen-ai-exchange/crce.webp", alt: "CRCE college", caption: "back at crce" },
    { src: "/google-gen-ai-exchange/certificate.webp", alt: "Winner certificate", caption: "the certificate" },
  ];

  const sections = [
    { id: "the-qualification", label: "the qualification" },
    { id: "convincing-the-college", label: "convincing the college" },
    { id: "the-class-gc-incident", label: "the class gc incident" },
    { id: "bangalore", label: "bangalore" },
    { id: "breakfast-and-presentation", label: "breakfast and presentation" },
    { id: "the-results", label: "the results" },
  ];

  const handleNav = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  return (
  <SmoothScroll root={false} className="h-dvh w-full overflow-y-auto blog-scroll-area">
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

        <h1 className="text-white light:text-zinc-900">Google GenAI Hackathon &apos;25</h1>
        <div className="text-neutral-300 light:text-neutral-600 mb-4">
          published: <span className="italic">7-06-2026</span> &middot; {views}{" "}
          views &middot; 10-min read
        </div>
        <hr className="border-t border-[#232323] light:border-zinc-300 my-6" />

        <section className="mb-8">
          <TldrCard>
            <p className="text-neutral-300 light:text-neutral-600">
              tldr; qualified for google genai exchange 2025 finals during end sems, somehow got exams postponed, fought my entire class gc, flew to bangalore half dead and won. still don&apos;t know how.
            </p>
          </TldrCard>
        </section>

        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            lets not talk about how long it has been since my last blog but a lot has happened ever since. let&apos;s start with the google genai hackathon.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            this is going to be a long one so get your snacks and drinks and sit tight because you&apos;re going to get some lore too.
          </p>
        </section>

        <h2 id="the-qualification" className="text-neutral-300 light:text-neutral-600 mb-4">the qualification</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we had our end sem exams from 24th nov to 29th nov. no breaks and 2 exams on 29th itself (for people who had taken honors, so me too). i took part in this hackathon in like june or something, i don&apos;t even remember honestly but i am fairly certain it was before the sunhacks one.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            since it was like 4 months long, i didn&apos;t expect to reach the finals at all as it was one of the biggest hackathons with around 270000+ participants and sponsored by google. so naturally, i was just chilling while the other members had made the ppts and initial prototype.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i still remember that i had made only 2 slides till the finals. those were literally my only contributions to this hackathon till then.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            and then on 18th november we got the mail that our team had qualified for the finals.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            in the middle of our end sem exam prep.
          </p>
          <ImageModal
            src="/google-gen-ai-exchange/email-ss.webp"
            alt="Qualification email from Google GenAI Exchange"
            caption="the email that changed everything"
            gallery={galleryImages}
            galleryIndex={0}
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the finals were on 29th november, the last day of exams.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i thought there was absolutely no chance we were going because it was in bangalore (literally 24 hours by train) and we had 2 exams that day. i still remember my chat with aliqyaan while the girls were looking for flights. me and aliqyaan have been to hackathons before together and both know the risks when we go to one.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            there were more than a few reasons why i felt like we didn&apos;t have much of a chance at winning this hackathon -
          </p>
          <ol className="text-neutral-300 light:text-neutral-600 list-decimal pl-6 mb-4 space-y-2">
            <li>we had 2 exams on the day of the hackathon.</li>
            <li>it was in bangalore.</li>
            <li>national level finals i.e students from IITs, NITs, BITS, IIITs, etc were participating.</li>
            <li>i hadn&apos;t contributed much to the project till then and the project itself felt pretty simple relative to some of the things i had worked on before.</li>
            <li>completely new team except aliqyaan, so i didn&apos;t know how we would perform together in a hackathon.</li>
          </ol>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            more reasons got added later but we&apos;ll come to that.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i also got to know on the same day that this project had been submitted to another big hackathon in mumbai itself. wanna guess which hackathon it was…
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">3…</p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">2…</p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">1…</p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">MUMBAIHACKS 2025.</p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            they had registered without me for that one which honestly was fair because i hadn&apos;t really contributed much to the project at that point. now the project qualified for mumbaihacks too, so i was trying to convince everyone that they should just go for the mumbai one instead because no travelling, no exam drama, nothing.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            but they were adamant on going to bangalore.
          </p>
        </section>

        <h2 id="convincing-the-college" className="text-neutral-300 light:text-neutral-600 mb-4">convincing the college</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            so we came to the conclusion that we&apos;ll go for it and then started convincing teachers to allow us to go. we all got pointed in the same direction i.e the principal&apos;s office.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            so we went to her with a letter containing the list of all the students who had qualified for MumbaiHacks (a lot of teams surprisingly) and GenAI (only us) so that we all could participate.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            again, i had zero hopes of getting 2 exams postponed for a hackathon but some miracle season was going on because we got permission to give the exams later.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            our previous principal, dr. surendra singh rathod, had left the college only a few days ago and the new principal, dr. sapna prabhu, was in charge. i can bet everything that i own (not much to be honest but you all get the point) that if SSR was still around, we would not have gotten permission to go to bangalore and give the exams later.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            now that we had the permissions, the next step was booking flights which took longer than it should&apos;ve. but once that was done, i left whatever i was pretending to study and booted up my laptop.
          </p>
          <ImageModal
            src="/google-gen-ai-exchange/cute-tax.webp"
            alt="A weird cute tax added to the flight tickets"
            caption="the price of being cute"
            className="max-h-60 w-auto object-cover"
            gallery={galleryImages}
            galleryIndex={1}
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            made a few features:
          </p>
          <ul className="text-neutral-300 light:text-neutral-600 list-disc pl-6 mb-4 space-y-1">
            <li>browser extension</li>
            <li>reactflow pipeline visualization</li>
            <li>some ui improvements</li>
          </ul>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            aliqyaan also started making the video misinformation detection.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            then we stopped working on it again and went back to preparing for exams.
          </p>
        </section>

        <h2 id="the-class-gc-incident" className="text-neutral-300 light:text-neutral-600 mb-4">the class gc incident</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            all the exams went properly except the second last day. now this is where the final reason comes in for why i thought we wouldn&apos;t win the hackathon.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            a few days before the finals, some confusion started around the postponed exams.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            what we had discussed with the principal was pretty straightforward. only the students participating in hackathons would give their exams later.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            somewhere along the way, a notice got circulated saying that the last exam had been postponed for everyone because some students were going for a hackathon.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            when i saw that message, i was equally surprised because that wasn&apos;t what had been discussed at all.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            and as you can probably imagine, people were not happy.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            trips had been planned, tickets had been booked and everyone wanted exams to end on time. within a few hours, the class gc had completely exploded. questions started flying around about which hackathons were involved, who was responsible and why the schedule had suddenly changed.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            our team somehow ended up taking most of the blame for it.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            eventually another clarification came out saying that the postponement only applied to the students who were actually participating in hackathons. but by then the damage had already been done.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            what should have been a few quiet days before a national finals turned into complete chaos.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            so yeah, between the exams, the travelling and whatever was happening in the class gc, i was convinced this hackathon wasn&apos;t ending well.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            but the flights were booked, so we went.
          </p>
        </section>

        <h2 id="bangalore" className="text-neutral-300 light:text-neutral-600 mb-4">bangalore</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we landed in bangalore at around 3:30 and got out around 4:15 in the morning.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i built one of my favorite features that same day i.e whatsapp integration which was basically a full multimodal setup of our platform directly into whatsapp. so photos, videos, messages, audio and even voice notes could be checked for misinformation.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            (sidelining: we then milked that feature in multiple hackathons after this and still haven&apos;t won anything with it. heartbreaking honestly. russel even figured out how to add auth to it with otp verification.)
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            and with this we stopped working on the project.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the bangalore weather was very cold for us from mumbai. 19C itself feels cold to us and it was around 14C there. so we booked an early cab and then came the age old challenge of conversing with people there.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the cab driver spoke only kannada but since i understand a little bit of it, we somehow found our way to him. i cannot speak it for shit though.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we reached the venue and our jaws were genuinely on the floor.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            it was a literal palace.
          </p>

          <div className="flex gap-3">
            <ImageModal
              src="/google-gen-ai-exchange/leela1.webp"
              alt="Leela Palace Bangalore"
              className="mb-0 h-full object-cover"
              containerClassName="mb-0 flex-1 min-w-0 flex flex-col"
              caption=""
              gallery={galleryImages}
              galleryIndex={2}
            />
            <ImageModal
              src="/google-gen-ai-exchange/leela2.webp"
              alt="Leela Palace Bangalore"
              className="mb-0 h-full object-cover"
              containerClassName="mb-0 flex-1 min-w-0 flex flex-col"
              caption=""
              gallery={galleryImages}
              galleryIndex={3}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-1 mb-8 text-center italic">leela palace bangalore</p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the decor was still being set up because we had reached too early. we freshened up a bit and started preparing our pitch. the only problem was that there were barely any sockets to plug our laptop chargers into.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we got our goodies and the presentation schedule.
          </p>
          <ImageModal
            src="/google-gen-ai-exchange/presentation-schedule.webp"
            alt="Presentation schedule for the hackathon"
            caption="the schedule"
            gallery={galleryImages}
            galleryIndex={4}
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we were the last team before lunch.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            the event was filled with industry experts from massive companies. i genuinely don&apos;t think there was a single panel of judges without a CEO or CTO from some big company.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            all the inauguration speeches were done and then the presentations started.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i still remember unplugging a tv that was broadcasting the event in the hall just so we could charge our laptops and phones. it was hilarious watching people roam around the venue searching for charging ports.
          </p>
        </section>

        <h2 id="breakfast-and-presentation" className="text-neutral-300 light:text-neutral-600 mb-4">breakfast and presentation</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we had some time so we went for the breakfast buffet and my god how do i explain this…
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            it was the most banging breakfast i&apos;ve ever had in a hackathon.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            medu vadas, idlis, eggs, cereal, bagels, cakes. literally everything.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            this distracted me for a while even though i usually lose my appetite during hackathons.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            after that we went to the waiting room where we were refining the pitch and preparing for questions. we didn&apos;t want to be the last team before lunch because we thought the judges would just be tired of presentations by then.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            and yet again somehow luck came through because we got shifted to become the first presentation after lunch.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we went in and had already decided that all of us would speak because there could be points for contribution and teamwork.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            arshdeep started us off and then aliqyaan directly took over with the demo because our time was running out much faster than expected.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i then started doing adlibs over his explanations (what i do best with aliqyaan honestly) and then the judges asked us to input something live.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i had absolutely no faith that it would work.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            thankfully aliqyaan had tested it before.
          </p>
          <VideoPlayer
            src="/google-gen-ai-exchange/misintelfinall.mp4"
            caption="demo video - watch at 2x :)"
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            it worked.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            barely.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            and with that we finished the presentation.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            it went okay honestly. i didn&apos;t walk out thinking we had won or anything. so i changed back into my normal clothes because formals are super uncomfortable and i thought we had no chance anyway.
          </p>
        </section>

        <h2 id="the-results" className="text-neutral-300 light:text-neutral-600 mb-4">the results</h2>
        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            then we waited for the results which, as usual, were announced after a shit ton of speeches and random things. i slept during some of them.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            eventually they started with the professional tracks — 5 domains, 4 winners each. that itself took forever. then finally they started with the student tracks.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            first track: GenAI for Youth Mental Wellness. 4 winners announced.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            second track: AI Powered Marketplace Assistant for local artisans. 4 winners announced. now here my heart started pounding because i thought our domain was next but it still wasn&apos;t.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            third track: GenAI for demystifying legal documents. 4 winners announced.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            and finally our track. AI Powered Tool for Combating Misinformation.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            they started from the 3rd runner up. Team Coders from IIIT Bangalore. i was okay with that because i thought we could maybe get 2nd runner up at max.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            then heart pounding out of my chest. 2nd runner up: Team Veyra. and here is where i gave up for the last time because i thought there was absolutely no way we were top 2 in the country for this domain.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            1st runner up:
          </p>
          <div className="flex justify-start mt-10 mb-32 -ml-6">
            <RainbowTextEffect fontSize={8} text="Team T-Rex" />
          </div>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i genuinely couldn&apos;t believe it. arshdeep was sitting on the aisle side and she had already started walking out before my brain even processed what happened. i just had my head in my hands for a few seconds and then got up and started walking towards the stage. i genuinely couldn&apos;t see anything properly.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we went up, got the cheque and trophy, clicked pictures and got back. the first thing i did was dap aliqyaan up. the second thing i did was call russel — yeah, before my mum i called him. then i called my mum, thanked her for her prayers and finally relaxed.
          </p>
          <ImageModal
            src="/google-gen-ai-exchange/cheque1.webp"
            alt="Team T-Rex with the cheque at Leela Palace"
            caption=""
            gallery={galleryImages}
            galleryIndex={5}
          />
          <ImageModal
            src="/google-gen-ai-exchange/stage.webp"
            alt="On stage at Leela Palace"
            caption="on stage at leela palace"
            gallery={galleryImages}
            galleryIndex={6}
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            one of the judges later told aliqyaan something pretty funny. almost every team had done multimodal verification along with whatsapp, telegram, extensions and other integrations. the only thing that stood out about us was the reactflow pipeline which i had made in literally 1 prompt just so that it looked fancy. sometimes it&apos;s genuinely the smallest things that matter in the end.
          </p>
          <ImageModal
            src="/google-gen-ai-exchange/reactflow.webp"
            alt="Reactflow pipeline visualization"
            caption="the reactflow pipeline"
            gallery={galleryImages}
            galleryIndex={7}
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            against all odds, we had somehow done it. and to top it off, nobody from our college won anything at MumbaiHacks. so we were the only team coming back with something.
          </p>
          <div className="flex gap-3">
            <ImageModal
              src="/google-gen-ai-exchange/cheque2.webp"
              alt="Team T-Rex with the cheque at CRCE"
              className="mb-0 h-full object-cover"
              containerClassName="mb-0 flex-1 min-w-0 flex flex-col"
              caption=""
              gallery={galleryImages}
              galleryIndex={6}
            />
            <ImageModal
              src="/google-gen-ai-exchange/crce.webp"
              alt="CRCE"
              className="mb-0 h-full object-cover"
              containerClassName="mb-0 flex-[2] min-w-0 flex flex-col"
              caption=""
              gallery={galleryImages}
              galleryIndex={9}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-1 mb-8 text-center italic">back at crce</p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            we got back to mumbai hiding the cheque upside down so that the amount doesn&apos;t get eyed. i am not very superstitious but after this hackathon i was genuinely ready to do whatever. we landed back home early in the morning and finally slept.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            i think this was probably the peak of my hackathon journey and maybe i should&apos;ve ended it there but i still want to do more. i&apos;ve lost 4 or 5 hackathons since then. i&apos;ve genuinely lost count at this point.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            this whole journey of google genai exchange 2025 really goes to show the role that luck, god, prayers and timing play in hackathons. there were so many things that lined up perfectly for us winning this thing that it&apos;s genuinely mind boggling.
          </p>
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            a very big thank you to everyone who prayed for us :)
          </p>
          <ImageModal
            src="/google-gen-ai-exchange/certificate.webp"
            alt="Winner certificate from Google GenAI Exchange"
            caption="the certificate"
            gallery={galleryImages}
            galleryIndex={10}
          />
          <p className="text-neutral-300 light:text-neutral-600 mb-4">
            see you in the next one where i&apos;ll probably discuss how i got my new internship after this hackathon.
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
  </SmoothScroll>
  );
}
