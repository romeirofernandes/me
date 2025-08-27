import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Background from "../../components/Background";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

const BLOG_ID = "5x-hackathon-winner";

export default function FiveXHackathonWinner() {
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
          5x hackathon winner
        </h1>
        <div className="text-zinc-500 mb-4">
          published: <span className="italic">24-08-2025</span> &middot; {views}{" "}
          views &middot; 5-min read
        </div>
        <hr className="border-t border-[#232323] my-6" />

        <section className="mb-8">
          <p className="text-zinc-400 mb-6">
            <strong>tldr;</strong> we got the domain winner/consolation prize
            (10k INR + award thing) - basically we were in the top 8 teams, at
            the SUNHACKS 2025 hackathon where over 550 teams were present on
            sandip university's campus, nashik.
          </p>

          <p className="text-zinc-400 mb-6">
            i did not expect to get a win in this hackathon. i wasn't interested
            in this hackathon because of three reasons -
          </p>

          <ol className="list-decimal list-inside text-zinc-400 mb-6">
            <li>
              the number of participants (a lot more got filtered out too to
              make into the top 600 teams)
            </li>
            <li>location (it was in another city, longer travel than usual)</li>
            <li>36 hours (3 days tbh)</li>
          </ol>

          <p className="text-zinc-400 mb-6">
            but i still went for it because half my class had been selected and
            we all decided to go together, it was more of a trip than a
            hackathon to begin with.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            the experience
          </h2>

          <p className="text-zinc-400 mb-6">
            everything that could've gone wrong with the management of an
            hackathon, went wrong. we reached there at around 1930 IST (after
            around 9 hours of travel) and then were registered in and given
            rooms and zones.
          </p>

          <p className="text-zinc-400 mb-6">
            the rooms were packed and there were people everywhere, even on the
            ground floor in the open area where it was raining right beside them
            with nashik winds. we somehow got settled in a room up and sat to
            pick a problem statement from 8 that they had given.
          </p>

          <p className="text-zinc-400 mb-6">
            here comes the main problem of the hackathon in my opinion -{" "}
            <strong>THERE WAS NO PROPER WIFI CONNECTION.</strong>
          </p>

          <p className="text-zinc-400 mb-6">
            the committee members were adamant that it will be fixed in 30 mins
            but im already home now and we had to buy unlimited data packs for
            the 2 nights. we weren't even getting proper connection in the room
            we were in.
          </p>

          <p className="text-zinc-400 mb-6">
            now this literally sent me spiraling, 2 chums came in randomly at
            around 12 am on the first day and said that no using chatgpt and
            github. it was then when i realized that there are no hopes of help
            from the volunteers.
          </p>

          <p className="text-zinc-400 mb-6">
            food queues were pretty long (there were great places nearby to buy
            food from so that saved us) but i guess this should've been obvious
            considering there were around 2000 people on campus.
          </p>

          <p className="text-zinc-400 mb-6">
            the best thing about this hackathon was, <strong>THE CAMPUS</strong>
            . it was top notch from the outside but on the inside, washroom
            doors were broken (2/3 in all floor washrooms, in the building which
            i was in at least) and classes and other things were alright at
            best.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            the project
          </h2>

          <p className="text-zinc-400 mb-6">
            now the project, we had 3 judging rounds and 1 final round. from the
            21 zones that were there present, 2 were selected for the finals. we
            took StudyGenie as our problem statement because we had made
            something similar for another hackathon.
          </p>

          {/* Problem Statement Image */}
          <div className="mb-6">
            <img
              src="/sunhacks_ps.png"
              alt="SUNHACKS Problem Statement"
              className="w-full rounded-lg border border-[#232323]"
            />
            <p className="text-xs text-zinc-500 mt-2 text-center italic">
              The problem statement we chose at SUNHACKS 2025
            </p>
          </div>

          <p className="text-zinc-400 mb-6">
            we took a feature idea from that and started building upon it. we
            had loads of features and presented decently throughout the rounds i
            guess. check out our project:{" "}
            <a
              href="https://studyaid-sunhacks.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] underline"
            >
              studyaid-sunhacks.vercel.app
            </a>{" "}
            (hosted using vercel and render, wait 50 secs for the server to wake up).
          </p>

          <p className="text-zinc-400 mb-6">
            i enjoyed this entire hackathon only because of my friends who were
            also there. in all, 3 teams from our college won -
          </p>

          <ul className="list-disc list-inside text-zinc-400 mb-6">
            <li>1st Place, Team 4i - very cracked, same year as us</li>
            <li>Team PONY - me, aliqyaan, reniyas, dylan</li>
            <li>
              Domain Winners/Consolation, Team EnigmaTrio - seniors from be
            </li>
          </ul>

          {/* Team Photo */}
          <div className="mb-6">
            <img
              src="/team_pony.jpeg"
              alt="Team PONY with award at SUNHACKS 2025"
              className="w-full rounded-lg border border-[#232323]"
            />
            <p className="text-xs text-zinc-500 mt-2 text-center italic">
              Team PONY with our domain winner award at SUNHACKS 2025
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            lessons learned
          </h2>

          <p className="text-zinc-400 mb-6">
            every hackathon teaches me something new, below is the list of
            things ive learnt from all the hackathons ive participated in -
          </p>

          <ol className="list-decimal list-inside text-zinc-400 mb-6 space-y-1">
            <li>have a good team.</li>
            <li>get a phone with unlimited data.</li>
            <li>carry hoodies/anything else to save yourselves from cold.</li>
            <li>use things only if you've worked with them before.</li>
            <li>don't fix if not broken, you've heard it before.</li>
            <li>
              it works if you convince them, read the room, know your judge.
            </li>
            <li>
              make the flow and schemas of the entire thing without chatgpt.
            </li>
            <li>take breaks often and walk around.</li>
            <li>
              might seem counter intuitive but don't sleep unless the project is
              complete.
            </li>
            <li>
              prepare the exact words to say to the judges when they come, and
              the language too sometimes.
            </li>
            <li>
              build many features, doesn't matter even if half of them are
              unnecessary.
            </li>
            <li>
              first impression matters, don't take judging round 1 lightly.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <p className="text-zinc-400 mb-6">
            planning to add a page like resources for all the hackathons ive
            been a part of and the results of the same.
          </p>

          <p className="text-zinc-400 mb-6">
            anyways, see y'all in the next blog (yeah there's gonna be more of
            these, i hope).
          </p>
        </section>

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
