import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Background from "../../components/Background";

const BLOG_ID = "why-start-blog";

export default function WhyStartBlog() {
  const [views, setViews] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(`views_${BLOG_ID}`)) {
      localStorage.setItem(`views_${BLOG_ID}`, "1");
      setViews(1);
    } else {
      const current = parseInt(localStorage.getItem(`views_${BLOG_ID}`), 10);
      setViews(current);
    }
  }, []);

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-2 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-[#38bdf8] mb-6 transition"
        >
          <FaChevronLeft />
          <span className="font-medium">Back</span>
        </button>

        <h1 className="font-serif text-3xl font-bold mb-4 text-white">
          Why am I starting a blog?
        </h1>
        <div className="text-zinc-500 mb-4">
          Published: 2025-08-18 &middot; {views} views &middot; 3-min read
        </div>
        <hr className="border-t border-[#232323] my-6" />

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            Motivation
          </h2>
          <p className="text-zinc-400 mb-4">
            I’ve always wanted a space to share my thoughts, document my
            learning, and connect with others. A blog is the perfect platform
            for this journey.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            Goals
          </h2>
          <ul className="list-disc list-inside text-zinc-400 mb-4">
            <li>Document my learning journey</li>
            <li>Share useful resources and ideas</li>
            <li>Connect with like-minded people</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            Tech Stack
          </h2>
          <p className="text-zinc-400 mb-4">
            This blog is built with{" "}
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] underline"
            >
              React
            </a>{" "}
            and deployed on{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] underline"
            >
              Vercel
            </a>
            .
          </p>
        </section>

        <hr className="border-t border-[#232323] my-6" />

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-2 text-white">
            Conclusion
          </h2>
          <p className="text-zinc-400">
            Thanks for reading! I’ll be posting more soon. Feel free to reach
            out or leave a comment.
          </p>
        </section>
      </div>
    </Background>
  );
}
