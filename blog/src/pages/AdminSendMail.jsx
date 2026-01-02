import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogs } from "../components/BlogList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminSendMail() {
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
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newsletter_subscribers"));
        const emailList = querySnapshot.docs.map(doc => doc.data().email);
        setEmails(emailList);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
    fetchEmails();
  }, []);

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
      const response = await fetch("https://y.theromeirofernandes.workers.dev/api/mail-blog-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails,
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

  return (
    <div className="dark">
      <Background>
        <div className="mx-auto w-full max-w-4xl px-4 py-8 font-sans flex flex-col min-h-screen">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Send Blog Update Emails</h1>
            <p className="text-muted-foreground">Manage and send updates to {emails.length} subscribers.</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Blog (optional, to pre-fill):</label>
                  <Select onValueChange={handleBlogSelect}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a blog" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogs.map(blog => (
                        <SelectItem key={blog.slug} value={blog.slug}>{blog.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Blog Title:</label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt:</label>
                  <Input
                    type="text"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Enter a short excerpt"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Blog URL:</label>
                  <Input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    placeholder="https://blog.romeirofernandes.tech/blogs/slug"
                    className="w-full"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={togglePreview} variant="outline" className="flex-1">
                    {showPreview ? "Hide Preview" : "Preview Email"}
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={!formData.title || !formData.url || loading}
                    className="flex-1"
                  >
                    {loading ? "Sending..." : "Send Emails"}
                  </Button>
                </div>

                {message && (
                  <p
                    className={`text-sm ${
                      message.toLowerCase().includes("success")
                        ? "text-green-600"
                        : "text-destructive"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </CardContent>
            </Card>

            {showPreview && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Email Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-background text-foreground">
                    <h2 className="text-xl font-bold mb-2">{formData.title || "Blog Title"}</h2>
                    <p className="text-muted-foreground mb-4">{formData.excerpt || "Excerpt here..."}</p>
                    <a href={formData.url} className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                      Read the full post
                    </a>
                    <p className="text-xs text-muted-foreground mt-4">
                      If you wish to unsubscribe, <a href={unsubscribePreviewUrl} className="underline">click here</a>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Background>
    </div>
  );
}