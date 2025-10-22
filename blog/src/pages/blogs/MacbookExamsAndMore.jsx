import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Background from "../../components/Background";
import ImageModal from "../../components/ImageModal";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { blogs } from "../../components/BlogList"; // adjust path if needed

const BLOG_ID = "macbook-exams-and-more";

function getNextBlog(currentSlug) {
  const idx = blogs.findIndex((b) => b.slug === currentSlug);
  return idx >= 0 && idx < blogs.length - 1 ? blogs[idx + 1] : null;
}

export default function MacbookExamsAndMore() {
  const [views, setViews] = useState(0);
  const navigate = useNavigate();
  const currentSlug = "macbook-exams-and-more";
  const nextBlog = getNextBlog(currentSlug);

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

  const handleNext = () => {
    if (nextBlog) navigate(`/blogs/${nextBlog.slug}`);
  };

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-[#38bdf8] transition"
          >
            <FaChevronLeft />
            <span className="font-medium">back</span>
          </button>
        </div>

        <h1 className="font-serif text-3xl font-bold mb-4 text-white">
          macbook, exams and more…
        </h1>
        <div className="text-zinc-500 mb-4">
          published: <span className="italic">21-09-2025</span> &middot; {views}{" "}
          views &middot; 6-min read
        </div>
        <hr className="border-t border-[#232323] my-6" />

        <section className="mb-8">
          <p className="text-zinc-400 mb-6">
            <strong>tldr;</strong> got the new macbook m4, mid sem exams done
            with decent marks, didn't qualify internal round of sih and my
            internship's ending in a week. added the hackathons page too at{" "}
            <a
              href="https://blog.romeirofernandes.tech/hackathons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] underline"
            >
              blog.romeirofernandes.tech/hackathons
            </a>
          </p>

          <p className="text-zinc-400 mb-6">
            well this blog hasn't been sacked off yet. it has been around a
            month since the last blog. the main reason was the mid sem exams.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            the macbook
          </h2>

          <p className="text-zinc-400 mb-6">
            i got the new macbook m4 base variant (16gb ram, 256 gb ssd) with
            apple care plus (3 years of warranty for physical and liquid
            damages). now the 3 people who im going to forward this link are
            going to have a laugh because they think it was a dumb decision to
            buy the apple care (around 20k INR ~ 240 USD), i hope its not.
          </p>

          <p className="text-zinc-400 mb-6">
            the main differences that i have felt while using the mac are -
          </p>

          <ol className="list-decimal list-inside text-zinc-400 mb-6">
            <li>godly display</li>
            <li>unreal battery backup</li>
            <li>dia browser</li>
          </ol>

          <p className="text-zinc-400 mb-6">
            the display and battery backup is understandable but the dia browser
            might sound like an odd point in the lot. my primary browser on the
            previous laptop (Lenovo S340) was firefox for a very long time until
            i started switching between zen and brave like a madman.
          </p>

          <p className="text-zinc-400 mb-6">
            i got the dia browser invite from keshav from twitter and didn't know
            that it only works on macOS. i never thought i would get to use it
            on my macbook, yet here i am.
          </p>

          <ImageModal
            src="/dia-browser.jpeg"
            alt="Dia Browser on macOS"
            caption="The dia browser interface on macOS"
          />

          <p className="text-zinc-400 mb-6">
            the dia browser is hands down the best browser ive ever used - for
            context, i have only used firefox, chrome, brave and zen. its just a
            personal preference. for windows, zen is the best alternative.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            the exams
          </h2>

          <p className="text-zinc-400 mb-6">
            a week full of exams, no breaks - hence, the break in blog and
            coding streak on github.
          </p>

          <div className="mb-6">
            <ImageModal
              src="/github-contri.png"
              alt="GitHub contributions graph showing break during exams"
              caption="A whole week of no contributions because of exams :("
            />
          </div>

          <p className="text-zinc-400 mb-6">
            the marks were alright (relative to my close friends). i have
            applied for grievances in a few papers. the college got autonomy 2
            years ago and since then the papers have changed. we are supposed to
            write our names on the papers. im 100% sure the papers were checked
            according to the names. in my opinion, this needs to change.
          </p>

          <p className="text-zinc-400 mb-6">
            it felt like the longest week of my life, but now that its done, im
            bored.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            the hackathon
          </h2>

          <p className="text-zinc-400 mb-6">
            first of all, if anyone who is reading this has been selected in the
            internal round - congratulations &lt;3 good luck for the next
            rounds.
          </p>

          <p className="text-zinc-400 mb-6">
            i can't believe that i forgot to mention this in the last blog which
            had a section for hackathon tips. any guesses????
          </p>

          <p className="text-zinc-400 mb-6">drum roll please ….. </p>

          <p className="text-zinc-400 mb-6">IT IS, ….. </p>

          <p className="text-zinc-400 mb-6">
            <strong>LUCK.</strong>
          </p>

          <p className="text-zinc-400 mb-6">
            believe it or not, luck does exist. some call it divine
            intervention, i call it odds stacked in your favour. luck can tip
            the outcome in your favor. i know this sounds like such a cliché and
            so philosophical.
          </p>

          <p className="text-zinc-400 mb-6">
            smart india hackathon 2025 can be summed up in one word,
            "disappointing".
          </p>

          <p className="text-zinc-400 mb-6">
            we chose the ps where we basically had to recreate the chalo app
            (widely used app for bus tracking in mumbai and other places in
            maharashtra).
          </p>

          <p className="text-zinc-400 mb-6">
            we made most of it too, for the "prototype". when we went in for our
            presentation, everything went downhill. some of the most bs questions
            were being asked. the judge was googling things during our
            presentation.
          </p>

          <p className="text-zinc-400 mb-6">
            i think the most basic etiquette that we as humans should have is
            that of listening to the speaker in a conversation. since im a part
            of codestorm, i was also in-charge of managing a room. i saw other
            judges listening to the entire presentation and the prototype that
            the students had prepared and then giving their opinions at the end.
          </p>

          <p className="text-zinc-400 mb-6">
            at the end of the day, we didn't get selected so it's not worth
            wasting more time on it
          </p>

          <p className="text-zinc-400 mb-6">
            prototype link:{" "}
            <a
              href="https://bus-beige.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] underline"
            >
              bus-beige.vercel.app
            </a>{" "}
            - backend's on render so give it a min to spin up :)
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            things i learnt
          </h2>

          <p className="text-zinc-400 mb-6">
            regardless of the outcome in the sih internal round, i think its safe
            to say we hadn't been able to convey our ideas to them clearly.
          </p>

          <ol className="list-decimal list-inside text-zinc-400 mb-6">
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
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            what next
          </h2>

          <p className="text-zinc-400 mb-6">
            two more hackathons are coming up, and my internship is ending in a
            week. i want to do another internship before sem 5 ends so need to
            prepare for that and start the mass application drive :)
          </p>

          <p className="text-zinc-400 mb-6">
            ive been playing around with n8n recently, i hope to use it in a
            hackathon.
          </p>

          <p className="text-zinc-400 mb-6">
            now that i have switched to the macbook, im planning to run arch
            linux on the previous laptop (Lenovo S340). also need to buy a type
            c hub and ssd for the macbook.
          </p>

          <p className="text-zinc-400 mb-6">
            i made the hackathons page as mentioned in the last blog, it looks a
            bit ugly but will iterate the design over time. changing the heading
            font to instrument serif because it's prettier.
          </p>

          <p className="text-zinc-400 mb-6">
            that's it for this blog, looks long enough. see the 4 of y'all in
            the next one &lt;3
          </p>
        </section>


        {/* Bottom Navigation */}
        {nextBlog && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-zinc-400 hover:text-[#38bdf8] transition"
            >
              <span className="font-medium">next</span>
              <FaChevronRight />
            </button>
          </div>
        )}

        <hr className="border-t border-[#232323] my-6" />

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            links
          </h2>
          <ul className="list-none text-zinc-400">
            <li className="mb-2">
              twitter:{" "}
              <a
                href="https://twitter.com/whotookromeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38bdf8] underline"
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
                className="text-[#38bdf8] underline"
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
                className="text-[#38bdf8] underline"
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
                className="text-[#38bdf8] underline"
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