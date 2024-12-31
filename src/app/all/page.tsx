"use client";
import BlogCard from "@/components/pages/blogCard";
import { useEffect, useState } from "react";
import Nav from "@/app/navbar/page";
import Contact from "@/app/contact/page";

interface BlogContent {
  _id: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  tags?: string[];
  blogViews?: number;
  isFeatured?: boolean;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  comments?: string[];
  image?: string;
}

export default function All() {
  const [blogContent, setBlogContent] = useState<BlogContent[]>([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch("/api/blogs");
        const blogs = await response.json();

        if (Array.isArray(blogs)) {
          setBlogContent(blogs);
        }
      } catch (error) {
        console.error("Error fetching blog data", error);
      }
    }

    fetchBlog();
  }, []);

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {blogContent.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <Contact />
    </div>
  );
}
