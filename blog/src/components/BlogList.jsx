import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const noResultsQuotes = [
  { text: "i spent 36 hours at a hackathon with no wifi and still found more than this search.", author: "romeiro, probably" },
  { text: "this blog post doesn't exist. much like my sleep schedule during BNB 25.", author: "romeiro, definitely" },
  { text: "you won't find that here. but you will find a 2nd place trophy from college and a lot of regret.", author: "romeiro, humbly" },
  { text: "searching for something that isn't here? bold of you to assume i write consistently.", author: "romeiro, honestly" },
  { text: "that post doesn't exist. neither does my motivation to write it, apparently.", author: "romeiro, transparently" },
  { text: "i qualified for finals with 550 teams watching. you couldn't find one blog post.", author: "romeiro, competitively" },
  { text: "no results. just like my FPL team every gameweek.", author: "romeiro, painfully" },
  { text: "you searched for nothing and found nothing. at least the wifi at SUNHACKS was honest about being useless.", author: "romeiro, reflectively" },
];

function getRandomQuote() {
  return noResultsQuotes[Math.floor(Math.random() * noResultsQuotes.length)];
}

export const blogs = [
	{
		title: "Why am I starting a blog?",
		description: "What this blog is about and what you can expect.",
		date: "18-08-2025",
		slug: "why-start-blog",
		read: 2,
	},
	{
		title: "5x hackathon winner",
		description:
			"Won domain prize at SUNHACKS 2025 with 550+ teams. Here's what I learned...",
		date: "24-08-2025",
		slug: "5x-hackathon-winner",
		read: 5,
	},
	{
		title: "MacBook, exams and more",
		description:
			"Yeah, I got a MacBook but that’s not all that happened...",
		date: "21-09-2025",
		slug: "macbook-exams-and-more",
		read: 6,
	},
	{
		title: "7305 days old now :)",
		description:
			"Turned 20, qualified for BNB 25 finals, lost but got 2nd in college...",
		date: "22-10-2025",
		slug: "7305-days-old-now",
		read: 5,
	},
	{
    title: "Google GenAI Hackathon '25",
		description:
			"Won Google GenAI Hackathon 2025 finals against all odds.",
		date: "7-06-2026",
		slug: "google-genai-hackathon",
		read: 10,
	},
];

export default function BlogList({ search }) {
	const navigate = useNavigate();
	const [viewCounts, setViewCounts] = useState(() => {
		try {
			const cached = localStorage.getItem("blog-view-counts");
			if (cached) {
				const { data, timestamp } = JSON.parse(cached);
				if (Date.now() - timestamp < 5 * 60 * 1000) {
					return data;
				}
			}
		} catch {}
		return {};
	});

	const filteredBlogs = [...blogs]
		.filter(
			(blog) =>
				blog.title.toLowerCase().includes(search.toLowerCase()) ||
				blog.description.toLowerCase().includes(search.toLowerCase())
		)
		.reverse();

	useEffect(() => {
		let cancelled = false;

		async function fetchAllViews() {
			const counts = {};
			for (const blog of blogs) {
				const ref = doc(db, "blogViews", blog.slug);
				const snap = await getDoc(ref);
				counts[blog.slug] = snap.exists() ? snap.data().views : 0;
			}
			if (!cancelled) {
				setViewCounts(counts);
				localStorage.setItem("blog-view-counts", JSON.stringify({
					data: counts,
					timestamp: Date.now(),
				}));
			}
		}
		fetchAllViews();

		return () => { cancelled = true; };
	}, []);

	return (
		<div className="flex flex-col gap-0">
			{filteredBlogs.length === 0 && search && (
				<NoResultsQuote />
			)}
			{filteredBlogs.map((blog, idx) => (
				<React.Fragment key={blog.slug}>
					<div
						className="px-1 py-4 mb-0 flex flex-col gap-2 cursor-pointer"
						onClick={() => navigate(`/blogs/${blog.slug}`)}
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
							<h3 className="font-serif text-lg text-white light:text-zinc-900">
								{blog.title}
							</h3>
							<div className="flex gap-4 text-xs text-zinc-500 light:text-zinc-400 font-mono">
								<span>{blog.date}</span>
								<span>{blog.read}-min read</span>
								<span>{viewCounts[blog.slug] || 0} views</span>
							</div>
						</div>
						<p className="text-sm text-zinc-400 light:text-zinc-500">{blog.description}</p>
					</div>
					{idx < filteredBlogs.length - 1 && (
						<hr className="border-t border-[#232323] light:border-zinc-300 my-6" />
					)}
				</React.Fragment>
			))}
		</div>
	);
}

function NoResultsQuote() {
  const [quote] = useState(() => getRandomQuote());

  return (
    <div className="py-16 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mx-auto text-zinc-600 light:text-zinc-400">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor" />
          </svg>
        </div>
        <blockquote className="font-serif text-lg text-zinc-300 light:text-zinc-600 italic leading-relaxed mb-4">
          "{quote.text}"
        </blockquote>
        <cite className="text-sm text-zinc-500 light:text-zinc-400 not-italic font-mono">
          — {quote.author}
        </cite>
      </div>
    </div>
  );
}
