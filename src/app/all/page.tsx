"use client";
export const dynamic = "force-dynamic";
import BlogCard from "@/components/pages/blogCard";
import { useEffect, useState } from "react";
import Nav from "@/components/pages/Nav";
import Contact from "@/components/pages/Contact";
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
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(true);
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
    <div className="pt-20 bg-white dark:bg-neutral-950">
      <div className="fixed top-0 left-0 w-full z-[10000000]">
        <Nav />
      </div>
      {/* Hero Section with improved styling */}
      <div className="relative px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-700 dark:text-white leading-tight mb-8">
            <Highlight className="text-black dark:text-white">Blogs</Highlight>
          </div>

          {/* Enhanced Description with glassmorphism */}
          <div className="relative max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-gradient-to-r from-white/20 to-white/10 dark:from-white/10 dark:to-white/5 border border-white/30 dark:border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                  <TextGenerateEffect words={words} />
                </div>
                {/* Decorative elements */}
                <div className="flex justify-center mt-8 space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filter and Sort Section */}
      <div className="p-4 md:p-6">
        {/* Glassmorphism Filter Container */}
        <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Filter Toggle Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              Filter & Sort
            </h1>
            <button
              onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300"
            >
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isFilterCollapsed ? "Show Filters" : "Hide Filters"}
              </span>
              <svg
                className={`w-4 h-4 text-neutral-700 dark:text-neutral-300 transition-transform duration-300 ${
                  isFilterCollapsed ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Collapsible Filter Content */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isFilterCollapsed
                ? "max-h-0 opacity-0"
                : "max-h-[1000px] opacity-100"
            }`}
          >
            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
              {/* Year Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Year
                </label>
                <select
                  value={selectedYear || ""}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/30 dark:hover:bg-white/20"
                >
                  <option
                    value=""
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    All Years
                  </option>
                  {Array.from(
                    new Set(
                      blogContent.map((blog) =>
                        new Date(blog.date).getFullYear()
                      )
                    )
                  )
                    .sort((a, b) => b - a) // Descending order
                    .map((year) => {
                      const count = blogContent.filter((blog) =>
                        blog.date.startsWith(year.toString())
                      ).length;
                      return (
                        <option
                          key={year}
                          value={year}
                          className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                        >
                          {year} ({count})
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* Month Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Month
                </label>
                <select
                  value={selectedMonth || ""}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/30 dark:hover:bg-white/20"
                >
                  <option
                    value=""
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    All Months
                  </option>
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
                        <option
                          key={month}
                          value={month}
                          className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                        >
                          {month} ({count})
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Tags
                </label>
                <select
                  value={selectedTag || ""}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/30 dark:hover:bg-white/20"
                >
                  <option
                    value=""
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    All Tags
                  </option>
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
                      <option
                        key={tag}
                        value={tag}
                        className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                      >
                        {tag} ({count})
                      </option>
                    ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/30 dark:hover:bg-white/20"
                >
                  <option
                    value="latest"
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    Latest
                  </option>
                  <option
                    value="most-viewed"
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    Most Viewed
                  </option>
                  <option
                    value="least-viewed"
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    Least Viewed
                  </option>
                  <option
                    value="most-liked"
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    Most Liked
                  </option>
                  <option
                    value="most-commented"
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    Most Commented
                  </option>
                  <option
                    value="featured"
                    className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white"
                  >
                    Featured
                  </option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedYear || selectedMonth || selectedTag) && (
              <div className="mt-6 pt-4 border-t border-white/20 dark:border-white/10">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Active filters:
                  </span>
                  {selectedYear && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-500/30">
                      Year: {selectedYear}
                    </span>
                  )}
                  {selectedMonth && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium border border-green-500/30">
                      Month: {selectedMonth}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-500/30">
                      Tag: {selectedTag}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedYear("");
                      setSelectedMonth("");
                      setSelectedTag("");
                    }}
                    className="px-3 py-1 bg-red-500/20 text-red-800 dark:text-red-200 rounded-full text-sm font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
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
