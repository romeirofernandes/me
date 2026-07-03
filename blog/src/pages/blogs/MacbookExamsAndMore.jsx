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
import ScrollProgress from "../../components/ScrollProgress";

const BLOG_ID = "macbook-exams-and-more";

function getNextBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx >= 0 && idx < blogs.length - 1 ? blogs[idx + 1] : null;
}

function getPreviousBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx > 0 ? blogs[idx - 1] : null;
}

export default function MacbookExamsAndMore() {
  const [views, setViews] = useState(0);
  const navigate = useNavigate();
  const currentSlug = "macbook-exams-and-more";
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

  const handleNav = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  const sections = [
    { id: "the-macbook", label: "the macbook" },
    { id: "the-exams", label: "the exams" },
    { id: "the-hackathon", label: "the hackathon" },
    { id: "things-i-learnt", label: "things i learnt" },
    { id: "what-next-macbook", label: "what next" },
  ];

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

        <h1 className="text-white light:text-zinc-900">
          macbook, exams and more…
        </h1>
        <div className="text-neutral-300 light:text-neutral-600 mb-4">
          published: <span className="italic">21-09-2025</span> &middot; {views}{" "}
          views &middot; 6-min read
        </div>
        <hr className="border-t border-[#232323] light:border-zinc-300 my-6" />

        <section className="mb-8">
          <TldrCard>
            <p className="text-neutral-300 light:text-neutral-600">
              <strong>tldr;</strong> got the new macbook m4, mid sem exams done
              with decent marks, didn't qualify internal round of sih and my
              internship's ending in a week. added the hackathons page too at{" "}
              <a
                href="https://blog.romeirofernandes.tech/hackathons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] light:text-[#0369a1] underline"
              >
                blog.romeirofernandes.tech/hackathons
              </a>
            </p>
          </TldrCard>
        </section>

        <section className="mb-8">
          <p className="text-neutral-300 light:text-neutral-600">
              well this blog hasn't been sacked off yet. it has been around a
              month since the last blog. the main reason was the mid sem exams.
          </p>
          <h2 id="the-macbook" className="text-white light:text-zinc-900">
            the macbook
          </h2>

          <p className="text-neutral-300 light:text-neutral-600">
            i got the new macbook m4 base variant (16gb ram, 256 gb ssd) with
            apple care plus (3 years of warranty for physical and liquid
            damages). now the 3 people who im going to forward this link are
            going to have a laugh because they think it was a dumb decision to
            buy the apple care (around 20k INR ~ 240 USD), i hope its not.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            the main differences that i have felt while using the mac are -
          </p>

          <ol className="list-decimal list-inside text-neutral-300 light:text-neutral-600">
            <li>godly display</li>
            <li>unreal battery backup</li>
            <li>dia browser</li>
          </ol>

          <p className="text-neutral-300 light:text-neutral-600">
            the display and battery backup is understandable but the dia browser
            might sound like an odd point in the lot. my primary browser on the
            previous laptop (Lenovo S340) was firefox for a very long time until
            i started switching between zen and brave like a madman.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            i got the dia browser invite from keshav from twitter and didn't know
            that it only works on macOS. i never thought i would get to use it
            on my macbook, yet here i am.
          </p>

          <ImageModal
            src="/macbook-exams-and-more/dia-browser.jpeg"
            alt="Dia Browser on macOS"
            caption="The dia browser interface on macOS"
          />

          <p className="text-neutral-300 light:text-neutral-600">
            the dia browser is hands down the best browser ive ever used - for
            context, i have only used firefox, chrome, brave and zen. its just a
            personal preference. for windows, zen is the best alternative.
          </p>
        </section>

        <section className="mb-8">
          <h2 id="the-exams" className="text-white light:text-zinc-900">
            the exams
          </h2>

          <p className="text-neutral-300 light:text-neutral-600">
            a week full of exams, no breaks - hence, the break in blog and
            coding streak on github.
          </p>

          <div className="mb-8">
            <ImageModal
              src="/macbook-exams-and-more/github-contri.png"
              alt="GitHub contributions graph showing break during exams"
              caption="A whole week of no contributions because of exams :("
            />
          </div>

          <p className="text-neutral-300 light:text-neutral-600">
            the marks were alright (relative to my close friends). i have
            applied for grievances in a few papers. the college got autonomy 2
            years ago and since then the papers have changed. we are supposed to
            write our names on the papers. im 100% sure the papers were checked
            according to the names. in my opinion, this needs to change.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            it felt like the longest week of my life, but now that its done, im
            bored.
          </p>
        </section>

        <section className="mb-8">
          <h2 id="the-hackathon" className="text-white light:text-zinc-900">
            the hackathon
          </h2>

          <p className="text-neutral-300 light:text-neutral-600">
            first of all, if anyone who is reading this has been selected in the
            internal round - congratulations &lt;3 good luck for the next
            rounds.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            i can't believe that i forgot to mention this in the last blog which
            had a section for hackathon tips. any guesses????
          </p>

          <p className="text-neutral-300 light:text-neutral-600">drum roll please ….. </p>

          <p className="text-neutral-300 light:text-neutral-600">IT IS, ….. </p>

          <p className="text-neutral-300 light:text-neutral-600">
            <strong>LUCK.</strong>
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            believe it or not, luck does exist. some call it divine
            intervention, i call it odds stacked in your favour. luck can tip
            the outcome in your favor. i know this sounds like such a cliché and
            so philosophical.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            smart india hackathon 2025 can be summed up in one word,
            "disappointing".
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            we chose the ps where we basically had to recreate the chalo app
            (widely used app for bus tracking in mumbai and other places in
            maharashtra).
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            we made most of it too, for the "prototype". when we went in for our
            presentation, everything went downhill. some of the most bs questions
            were being asked. the judge was googling things during our
            presentation.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            i think the most basic etiquette that we as humans should have is
            that of listening to the speaker in a conversation. since im a part
            of codestorm, i was also in-charge of managing a room. i saw other
            judges listening to the entire presentation and the prototype that
            the students had prepared and then giving their opinions at the end.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            at the end of the day, we didn't get selected so it's not worth
            wasting more time on it
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            prototype link:{" "}
            <a
              href="https://bus-beige.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] light:text-[#0369a1] underline"
            >
              bus-beige.vercel.app
            </a>{" "}
            - backend's on render so give it a min to spin up :)
          </p>
        </section>

        <section className="mb-8">
          <h2 id="things-i-learnt" className="text-white light:text-zinc-900">
            things i learnt
          </h2>

          <p className="text-neutral-300 light:text-neutral-600">
            regardless of the outcome in the sih internal round, i think its safe
            to say we hadn't been able to convey our ideas to them clearly.
          </p>

          <ol className="list-decimal list-inside text-neutral-300 light:text-neutral-600">
            <li>
              be lucky - (if this is there, the remaining 3 don't even matter)
            </li>
            <li>dry run the pitch (need to do this for every hackathon now)</li>
            <li>
              whatever the judges say is gospel (almost had an argument with the
              judge lmao)
            </li>
            <li>
              get better at ideating (yeah can't chatgpt this, technically you
              can but its just bad most of the times)
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 id="what-next-macbook" className="text-white light:text-zinc-900">
            what next
          </h2>

          <p className="text-neutral-300 light:text-neutral-600">
            two more hackathons are coming up, and my internship is ending in a
            week. i want to do another internship before sem 5 ends so need to
            prepare for that and start the mass application drive :)
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            ive been playing around with n8n recently, i hope to use it in a
            hackathon.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            now that i have switched to the macbook, im planning to run arch
            linux on the previous laptop (Lenovo S340). also need to buy a type
            c hub and ssd for the macbook.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            i made the hackathons page as mentioned in the last blog, it looks a
            bit ugly but will iterate the design over time. changing the heading
            font to instrument serif because it's prettier.
          </p>

          <p className="text-neutral-300 light:text-neutral-600">
            that's it for this blog, looks long enough. see the 4 of y'all in
            the next one &lt;3
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
          <h2 className="text-white light:text-zinc-900">
            links
          </h2>
          <ul className="list-none text-neutral-300 light:text-neutral-600">
            <li className="mb-2">
              twitter:{" "}
              <a
                href="https://twitter.com/whotookromeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] light:text-[#0369a1] underline"
              >
                @whotookromeiro
              </a>
            </li>
            <li className="mb-2">
              linkedin:{" "}
              <a
                href="https://linkedin.com/in/romeirofernandes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] light:text-[#0369a1] underline"
              >
                romeirofernandes
              </a>
            </li>
            <li className="mb-2">
              github:{" "}
              <a
                href="https://github.com/romeirofernandes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] light:text-[#0369a1] underline"
              >
                romeirofernandes
              </a>
            </li>
            <li className="mb-2">
              portfolio:{" "}
              <a
                href="https://romeirofernandes.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] light:text-[#0369a1] underline"
              >
                romeirofernandes.tech
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Background>
  );
}
