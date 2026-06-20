import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogs } from "../components/BlogList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Border1 from "../components/Border1";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminSendMail() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    url: "",
  });

  useEffect(() => {
    if (!authenticated) return;
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newsletter_subscribers"));
        const emailList = querySnapshot.docs.map(doc => ({ id: doc.id, email: doc.data().email }));
        setEmails(emailList);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
    fetchEmails();
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setPasswordError("");
    } else {
      setPasswordError("wrong password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const handleBlogSelect = (slug) => {
    const blog = blogs.find(b => b.slug === slug);
    if (blog) {
      setSelectedBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.description,
        url: `https://blog.romeirofernandes.tech/blogs/${blog.slug}`,
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSend = async () => {
    if (!formData.title || !formData.url || emails.length === 0) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://y.theromeirofernandes.tech/api/mail-blog-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails: emails.map(e => e.email),
          blog: formData,
        }),
      });
      if (response.status === 200) {
        setMessage("Emails sent successfully!");
      } else {
        setMessage("Failed to send emails.");
      }
    } catch (error) {
      setMessage("Error sending emails.");
    } finally {
      setLoading(false);
    }
  };

  const togglePreview = () => setShowPreview(!showPreview);

  const unsubscribePreviewUrl = "https://blog.romeirofernandes.tech/unsubscribe?email=example@email.com";

  if (!authenticated) {
    return (
      <Background>
        <div className="mx-auto w-full max-w-sm px-4 py-32 font-sans flex flex-col items-center justify-center min-h-screen">
          <form onSubmit={handleLogin} className="w-full">
            <h1 className="text-2xl font-bold text-white light:text-zinc-900 mb-6 text-center">admin</h1>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
              className="w-full rounded-none border-[#232323] light:border-zinc-300 bg-transparent text-white light:text-zinc-900 placeholder:text-zinc-500 mb-4 focus-visible:ring-0"
              autoFocus
            />
            {passwordError && (
              <p className="text-red-400 text-sm mb-4 text-center">{passwordError}</p>
            )}
            <Button type="submit" className="w-full rounded-none">
              enter
            </Button>
          </form>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 font-sans flex flex-col min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white light:text-zinc-900 mb-1">admin</h1>
            <p className="text-zinc-400 light:text-zinc-500 text-sm">{emails.length} subscribers</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="rounded-none border-[#232323] light:border-zinc-300 text-zinc-400 hover:text-white light:hover:text-zinc-900">
            logout
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Border1>
            <div className="bg-[#18181b] light:bg-white border border-[#232323] light:border-zinc-300">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white light:text-zinc-900 mb-4">subscribers</h2>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {emails.map((sub) => (
                    <div key={sub.id} className="text-sm text-zinc-300 light:text-zinc-600 font-mono px-2 py-1 hover:bg-[#232323] light:hover:bg-zinc-100">
                      {sub.email}
                    </div>
                  ))}
                  {emails.length === 0 && (
                    <p className="text-sm text-zinc-500">no subscribers yet</p>
                  )}
                </div>
              </div>
            </div>
          </Border1>

          <Border1>
            <div className="bg-[#18181b] light:bg-white border border-[#232323] light:border-zinc-300">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white light:text-zinc-900 mb-6">compose email</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 light:text-zinc-500 mb-2">Select Blog (optional, to pre-fill):</label>
                    <Select onValueChange={handleBlogSelect}>
                      <SelectTrigger className="w-full rounded-none border-[#232323] light:border-zinc-300 bg-transparent text-white light:text-zinc-900">
                        <SelectValue placeholder="Choose a blog" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#18181b] light:bg-white border-[#232323] light:border-zinc-300">
                        {blogs.map(blog => (
                          <SelectItem key={blog.slug} value={blog.slug} className="text-white light:text-zinc-900 focus:bg-[#232323] light:focus:bg-zinc-100">{blog.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 light:text-zinc-500 mb-2">Blog Title:</label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter blog title"
                      className="w-full rounded-none border-[#232323] light:border-zinc-300 bg-transparent text-white light:text-zinc-900 placeholder:text-zinc-500 light:placeholder:text-zinc-400 focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 light:text-zinc-500 mb-2">Excerpt:</label>
                    <Input
                      type="text"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange("excerpt", e.target.value)}
                      placeholder="Enter a short excerpt"
                      className="w-full rounded-none border-[#232323] light:border-zinc-300 bg-transparent text-white light:text-zinc-900 placeholder:text-zinc-500 light:placeholder:text-zinc-400 focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 light:text-zinc-500 mb-2">Blog URL:</label>
                    <Input
                      type="url"
                      value={formData.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                      placeholder="https://blog.romeirofernandes.tech/blogs/slug"
                      className="w-full rounded-none border-[#232323] light:border-zinc-300 bg-transparent text-white light:text-zinc-900 placeholder:text-zinc-500 light:placeholder:text-zinc-400 focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button onClick={togglePreview} variant="outline" className="flex-1 rounded-none border-[#232323] light:border-zinc-300 text-white light:text-zinc-900 hover:bg-[#232323] light:hover:bg-zinc-100">
                      {showPreview ? "Hide Preview" : "Preview Email"}
                    </Button>
                    <Button
                      onClick={handleSend}
                      disabled={!formData.title || !formData.url || loading}
                      className="flex-1 rounded-none"
                    >
                      {loading ? "Sending..." : "Send Emails"}
                    </Button>
                  </div>

                  {message && (
                    <p className={`text-sm ${message.toLowerCase().includes("success") ? "text-[#38bdf8]" : "text-red-400"}`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Border1>

          {showPreview && (
            <Border1>
              <div className="bg-[#18181b] light:bg-white border border-[#232323] light:border-zinc-300">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-white light:text-zinc-900 mb-6">Email Preview</h2>
                  <div className="border border-[#232323] light:border-zinc-300 p-4">
                    <h3 className="text-lg font-semibold text-white light:text-zinc-900 mb-2">{formData.title || "Blog Title"}</h3>
                    <p className="text-zinc-400 light:text-zinc-500 mb-4 text-sm">{formData.excerpt || "Excerpt here..."}</p>
                    <a href={formData.url} className="inline-block px-4 py-2 bg-[#38bdf8] text-white rounded-none hover:bg-[#38bdf8]/90 text-sm">
                      Read the full post
                    </a>
                    <p className="text-xs text-zinc-500 light:text-zinc-400 mt-4">
                      If you wish to unsubscribe, <a href={unsubscribePreviewUrl} className="underline text-[#38bdf8] light:text-sky-600">click here</a>.
                    </p>
                  </div>
                </div>
              </div>
            </Border1>
          )}
        </div>
      </div>
    </Background>
  );
}
