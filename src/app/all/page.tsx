"use client";
import BlogCard from "@/components/pages/blogCard";
import { useEffect, useState } from "react";
import Nav from "@/app/navbar/page";
import Contact from "@/app/contact/page";
import { Highlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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
  const [filteredBlogs, setFilteredBlogs] =
    useState<BlogContent[]>(blogContent);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("latest");
  const words = `Some incidents which I see in daily life provoke my heart, mind and thoughtfulness to indulge in writing on these issues with a hopefulness of bringing some change in society as people read my blogs.`;

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch("/api/blogs");
        const blogs = await response.json();

        if (Array.isArray(blogs)) {
          setBlogContent(blogs);
          setFilteredBlogs(blogs);
        }
      } catch (error) {
        console.error("Error fetching blog data", error);
      }
    }

    fetchBlog();
  }, []);

  // Sorting function
  const sortBlogs = (blogs: BlogContent[]) => {
    switch (sortBy) {
      case "most-viewed":
        return blogs.sort((a, b) => (b.blogViews ?? 0) - (a.blogViews ?? 0));
      case "least-viewed":
        return blogs.sort((a, b) => (a.blogViews ?? 0) - (b.blogViews ?? 0));
      case "most-liked":
        return blogs.sort(
          (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
        );
      case "most-commented":
        return blogs.sort(
          (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
        );
      case "featured":
        return blogs
          .filter((blog) => blog.isFeatured)
          .concat(blogs.filter((blog) => !blog.isFeatured));
      case "latest":
      default:
        return blogs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  };

  // Filter function
  const filterBlogs = () => {
    let filtered = [...blogContent];

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter((blog) => blog.date.startsWith(selectedYear));
    }

    // Month filter
    if (selectedMonth) {
      filtered = filtered.filter(
        (blog) =>
          new Date(blog.date).toLocaleString("default", { month: "long" }) ===
          selectedMonth
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((blog) => blog.tags?.includes(selectedTag));
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterBlogs();
    const sorted = sortBlogs(filtered);
    setFilteredBlogs(sorted);
  }, [selectedYear, selectedMonth, selectedTag, sortBy, blogContent]);

  return (
    <div className="bg-white dark:bg-neutral-950">
      <Nav />
      <div className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mt-20">
        <Highlight className="text-black dark:text-white">Blogs</Highlight>
        <TextGenerateEffect words={words} />
      </div>
      {/* Filter and Sort Section */}
      <div className="p-4">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
          {/* Filter and Sort Heading */}
          <h1 className="text-2xl font-semibold mb-4 sm:mb-0 sm:mr-4 text-center sm:text-left">
            Filter and Sort:
          </h1>

          {/* Filter and Sort Options */}
          <div className="flex flex-wrap justify-center gap-4 text-black w-full sm:w-auto">
            {/* Year Filter */}
            <select
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            >
              <option value="">Select Year</option>
              {Array.from(
                new Set(
                  blogContent.map((blog) => new Date(blog.date).getFullYear())
                )
              )
                .sort((a, b) => b - a) // Descending order
                .map((year) => {
                  const count = blogContent.filter((blog) =>
                    blog.date.startsWith(year.toString())
                  ).length;
                  return (
                    <option key={year} value={year}>
                      {year} ({count})
                    </option>
                  );
                })}
            </select>

            {/* Month Filter */}
            <select
              value={selectedMonth || ""}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            >
              <option value="">Select Month</option>
              {Array.from(
                new Set(
                  blogContent.map((blog) =>
                    new Date(blog.date).toLocaleString("default", {
                      month: "long",
                    })
                  )
                )
              )
                .sort()
                .map((month) => {
                  const count = blogContent.filter(
                    (blog) =>
                      new Date(blog.date).toLocaleString("default", {
                        month: "long",
                      }) === month
                  ).length;
                  return (
                    <option key={month} value={month}>
                      {month} ({count})
                    </option>
                  );
                })}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag || ""}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            >
              <option value="">Select Tag</option>
              {Array.from(
                new Set(blogContent.flatMap((blog) => blog.tags ?? []))
              )
                .map((tag) => {
                  const count = blogContent.filter((blog) =>
                    blog.tags?.includes(tag)
                  ).length;
                  return { tag, count };
                })
                .sort((a, b) => b.count - a.count) // Descending order by count
                .map(({ tag, count }) => (
                  <option key={tag} value={tag}>
                    {tag} ({count})
                  </option>
                ))}
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            >
              <option value="latest">Latest</option>
              <option value="most-viewed">Most Viewed</option>
              <option value="least-viewed">Least Viewed</option>
              <option value="most-liked">Most Liked</option>
              <option value="most-commented">Most Commented</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <Contact />
    </div>
  );
}
