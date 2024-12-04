"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

export default function CreateBlogPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          publicationDate: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        router.push("/blog");
      } else {
        console.error("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary-light to-secondary-light text-transparent bg-clip-text">
          Create New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-transparent focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Content
            </label>
            <QuillEditor value={content} onChange={setContent} />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-transparent focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-primary-light to-secondary-light hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Blog Post
          </button>
        </form>
      </div>
    </Layout>
  );
}
