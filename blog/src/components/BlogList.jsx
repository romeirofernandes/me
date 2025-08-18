import React from "react";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    title: "Why am I starting a blog?",
    description: "What this blog is about and what you can expect.",
    date: "2025-08-18",
    slug: "why-start-blog",
    read: 2,
  },
];

function getViewCount(slug) {
  return parseInt(localStorage.getItem(`views_${slug}`) || "0", 10);
}

export default function BlogList({ search }) {
  const navigate = useNavigate();
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-0">
      {filteredBlogs.length === 0 && (
        <div className="text-zinc-500 text-center py-8">No results found.</div>
      )}
      {filteredBlogs.map((blog, idx) => (
        <React.Fragment key={blog.slug}>
          <div
            className="px-1 py-4 mb-0 flex flex-col gap-2 cursor-pointer"
            onClick={() => navigate(`/blogs/${blog.slug}`)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-serif text-lg font-bold text-white">
                {blog.title}
              </h3>
              <div className="flex gap-4 text-xs text-zinc-500 font-mono">
                <span>{blog.date}</span>
                <span>{blog.read}-min read</span>
                <span>{getViewCount(blog.slug)} views</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400">{blog.description}</p>
          </div>
          {idx < filteredBlogs.length - 1 && (
            <hr className="border-t border-[#232323] my-6" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
