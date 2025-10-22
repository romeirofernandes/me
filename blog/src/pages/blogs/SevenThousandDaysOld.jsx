import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Background from "../../components/Background";
import ImageModal from "../../components/ImageModal";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { blogs } from "../../components/BlogList";

const currentSlug = "7305-days-old-now";
const nextBlog = blogs[blogs.findIndex((b) => b.slug === currentSlug) + 1] || null;

const BLOG_ID = "7305-days-old-now";

export default function SevenThousandDaysOld() {
  const [views, setViews] = useState(0);
  const navigate = useNavigate();

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
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-[#38bdf8] mb-6 transition"
        >
          <FaChevronLeft />
          <span className="font-medium">back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold mb-4 text-white">
          7305 days old now :)
        </h1>
        <div className="text-zinc-500 mb-4">
          published: <span className="italic">22-10-2025</span> &middot; {views}{" "}
          views &middot; 5-min read
        </div>
        <hr className="border-t border-[#232323] my-6" />

        <section className="mb-8">
          <p className="text-zinc-400 mb-6">
            tldr; turned 20, qualified for bnb 25 finals, lost bnb 25 but got 2nd
            in college — (the 1st place team from college got 3rd place overall),
            on a hunt for the next internship and exploring web3.
          </p>
          <p className="text-zinc-400 mb-6">
            call this blog lazarus because it has risen from the dead. a whole
            month later, here i am with hackathon lore — it’s the only action in
            my life atp :(
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            bit n build 2025
          </h2>

          <p className="text-zinc-400 mb-6">
            i’ll start with the only bad thing about bnb — the internal rounds.
            it’s a hackathon to get into the final hackathon. it was pretty
            tiring, but it was all worth it when i saw that 3 teams (team cotton —
            us, team pony, and team allstar xi) qualified for the finals together
            because, coincidentally, the finals were on my birthday.
          </p>

          <ImageModal
            src="/finalists.png"
            alt="BNB 2025 Finalists"
            caption="The gc made it to the finals :)"
          />

          <p className="text-zinc-400 mb-6">
            the problem statements of bnb 2025 were arguably the hardest and
            weirdest ones i’ve seen in a hackathon so far. only one problem
            statement was readable and doable from the web and aiml domain
            (blockchain idk, i’m just dumb — maybe the ps were readable).
          </p>

          <ImageModal
            src="/webps1.png"
            alt="The problem statement we chose"
            caption="The problem statement that we chose."
          />

          <p className="text-zinc-400 mb-6">
            we honestly went with this one because we knew that there wouldn’t be
            many who would go for it (there was no prize ps-wise, but we figured
            that everyone would take the same ps — i.e., the web/app one — and
            the judges would be tired of seeing the same thing).
          </p>

          <ImageModal
            src="/webps3.png"
            alt="The most chosen problem statement"
            caption="The most chosen ps in the hackathon — team pony and team allstar xi both took this one along with 13 other teams out of 60."
          />

          <p className="text-zinc-400 mb-6">
            the hackathon started at 16:00 sharp, and let’s just say we didn’t
            have the best start. i still thank god for no early judging rounds;
            otherwise, we would’ve been cooked. i was writing the entire idea down
            till 17:30, and my teammates were working on the landing page and
            auth.
          </p>

          <p className="text-zinc-400 mb-6">
            we were very confused about what exactly the ps meant for a while. we
            tried searching for multiple libraries and tools we could use but
            didn’t find anything decent. i still remember, i tried locking in for
            an hour straight, and nothing was working. we almost gave up.
          </p>

          <p className="text-zinc-400 mb-6">
            we were fooling around with our seniors (team bluecore — who won 3rd
            place overall and 1st in college) who were sitting behind us. they
            chose aiml ps 1, which had something to do with recognizing parkinson’s
            from an audio clip (yeah, i still don’t know what sorcery they did
            considering russel was part of the training data).
          </p>

          <ImageModal
            src="/aimlps1.png"
            alt="AIML Problem Statement"
            caption="The AIML problem statement Team Bluecore chose"
          />

          <p className="text-zinc-400 mb-6">
            we picked up our broken project at night and somehow got everything
            done by 09:00 — i.e., the first judging round. we explained our
            project to the judge, and it went pretty well.
          </p>

          <p className="text-zinc-400 mb-6">
            for round 2, we just added more features, and i made a smart contract
            (fully ai-generated) for both users taking part in the experiments and
            the researchers. basically, it was an incentive for users and a system
            to show the researchers’ experiments on top if they paid a certain
            amount.
          </p>

          <p className="text-zinc-400 mb-6">
            we thought that would be enough — judging round 2 went 10x better than
            round 1. the judge asked us to get an ip for it and whatnot. we lost.
          </p>

          <p className="text-zinc-400 mb-6">
            congratulations to team bluecore — they made the night bearable.
          </p>

          <p className="text-zinc-400 mb-6">
            top 4 teams from college were also chosen for crescendo points —
          </p>

          <ul className="list-disc list-inside text-zinc-400 mb-6">
            <li>team bluecore + team cotton (300 points)</li>
            <li>team pony + team 4i (180 points)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            what next?
          </h2>

          <p className="text-zinc-400 mb-6">
            looking for an internship, so if any of the readers want to hire me
            :) please reach out via mail. there was an internship expo by tedx in
            our college, but the companies there were just not good. adding the
            drive link below with the job descriptions and stipends.
          </p>

          <p className="text-zinc-400 mb-6">
            i’m exploring web3 a bit because why not — there are 4 days left for
            my diwali vacation to end. let’s just hope i learn/build something
            decent during that time.
          </p>

          <p className="text-zinc-400 mb-6">
            updated the hackathons page with the loss :(
          </p>

          <p className="text-zinc-400 mb-6">at a 35% win rate now lol.</p>

          <p className="text-zinc-400 mb-6">
            that’s it for this one — a very happy diwali to each one of you :)
          </p>
        </section>

         {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-[#38bdf8] transition"
          >
            <FaChevronLeft />
            <span className="font-medium">Previous</span>
          </button>
          {nextBlog && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-zinc-400 hover:text-[#38bdf8] transition"
            >
              <span className="font-medium">Next</span>
              <FaChevronRight />
            </button>
          )}
        </div>

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