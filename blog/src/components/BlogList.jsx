import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
];

export default function BlogList({ search }) {
	const navigate = useNavigate();
	const [viewCounts, setViewCounts] = useState({});
	const filteredBlogs = [...blogs]
		.filter(
			(blog) =>
				blog.title.toLowerCase().includes(search.toLowerCase()) ||
				blog.description.toLowerCase().includes(search.toLowerCase())
		)
		.reverse(); // newest blogs on top

	useEffect(() => {
		async function fetchAllViews() {
			const counts = {};
			for (const blog of blogs) {
				const ref = doc(db, "blogViews", blog.slug);
				const snap = await getDoc(ref);
				counts[blog.slug] = snap.exists() ? snap.data().views : 0;
			}
			setViewCounts(counts);
		}
		fetchAllViews();
	}, []);

	return (
		<div className="flex flex-col gap-0">
			{filteredBlogs.length === 0 && (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<svg
						width="120"
						height="120"
						viewBox="0 0 120 120"
						fill="none"
						className="mb-4 opacity-60"
					>
						<circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" className="text-zinc-600 light:text-zinc-300" strokeDasharray="4 4" />
						<path d="M45 50 L75 50 M45 60 L70 60 M45 70 L65 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-500 light:text-zinc-400" />
						<circle cx="82" cy="78" r="16" fill="currentColor" className="text-zinc-700 light:text-zinc-200" />
						<path d="M76 78 L88 78 M82 72 L82 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-300 light:text-zinc-600" />
					</svg>
					<p className="text-zinc-500 light:text-zinc-400 text-sm font-mono">
						no such post exists
					</p>
				</div>
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
