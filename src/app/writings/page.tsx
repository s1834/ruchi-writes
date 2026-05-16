"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { convertGoogleDriveUrl } from "@/lib/utils";

interface Blog {
  _id: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
}

export default function WritingsPage() {
  const [writings, setWritings] = useState<Blog[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [sortMode, setSortMode] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTagDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchWritings() {
      try {
        const response = await fetch("/api/blogs");
        const blogs = await response.json();
        if (Array.isArray(blogs)) {
          setWritings(blogs);
          const counts: Record<string, number> = {};
          blogs.forEach((b: Blog) => (b.tags || []).forEach((t: string) => { counts[t] = (counts[t] || 0) + 1; }));
          setTagCounts(counts);
          const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
          setAllTags(tags);
        }
      } catch (error) {
        console.error("Error fetching writings:", error);
      }
    }
    fetchWritings();
  }, []);

  const filteredWritings = useMemo(() => {
    let result = [...writings];
    if (selectedTag) result = result.filter((w) => w.tags?.includes(selectedTag));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((w) =>
        w.title.toLowerCase().includes(q) ||
        w.content.replace(/<[^>]*>/g, "").toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortMode === "newest" ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [writings, selectedTag, searchQuery, sortMode]);

  return (
    <div className="min-h-screen grain">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-6 md:pt-32 md:pb-8 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">All Writings</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Poetry and Social Issues — all poems and reflections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-border/50 px-5 md:px-10 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-3">
            {/* Top row: search + sort + view */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or content..."
                  className="w-full bg-muted/50 rounded-full pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                onClick={() => setSortMode(sortMode === "newest" ? "oldest" : "newest")}
                className="text-xs px-3 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                {sortMode === "newest" ? "↓ Newest" : "↑ Oldest"}
              </button>

              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="text-xs px-3 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0 hidden sm:block"
              >
                {viewMode === "grid" ? "☰ List" : "⊞ Grid"}
              </button>

              <span className="text-xs text-muted-foreground shrink-0 ml-auto hidden sm:block">
                {filteredWritings.length} writings
              </span>
            </div>

            {/* Tags row: top 4 by popularity + custom dropdown for rest */}
            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={() => setSelectedTag("")}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors shrink-0 ${
                  selectedTag === "" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              {allTags.slice(0, 4).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors shrink-0 inline-flex items-center gap-1.5 ${
                    selectedTag === tag ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                  <span className="opacity-60">{tagCounts[tag]}</span>
                </button>
              ))}
              {allTags.length > 4 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors shrink-0 inline-flex items-center gap-1.5 ${
                      selectedTag && !allTags.slice(0, 4).includes(selectedTag)
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {selectedTag && !allTags.slice(0, 4).includes(selectedTag) ? selectedTag : "More"}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${tagDropdownOpen ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {tagDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 max-h-64 overflow-y-auto rounded-xl bg-card border border-border shadow-lg z-50 py-1">
                      {allTags.slice(4).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => { setSelectedTag(selectedTag === tag ? "" : tag); setTagDropdownOpen(false); }}
                          className={`w-full flex items-center justify-between text-xs px-4 py-2 transition-colors ${
                            selectedTag === tag
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{tag}</span>
                          <span className="opacity-50">{tagCounts[tag]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Writings */}
      <section className="px-5 md:px-10 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTag + sortMode + searchQuery + viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                : "space-y-4"
              }
            >
              {filteredWritings.map((writing, i) => (
                <motion.div
                  key={writing._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  {viewMode === "grid" ? (
                    <GridCard writing={writing} />
                  ) : (
                    <ListCard writing={writing} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredWritings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm mb-3">No writings found.</p>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-sm text-primary hover:underline">
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function GridCard({ writing }: { writing: Blog }) {
  return (
    <Link href={`/writings/${writing._id}`} className="group block">
      <article className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        {writing.image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={convertGoogleDriveUrl(writing.image)}
              alt={writing.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="font-hindi text-base font-medium text-card-foreground group-hover:text-primary transition-colors duration-300 leading-snug mb-2">
            {writing.title}
          </h2>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <time>{new Date(writing.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</time>
            {writing.readingTime && <span>{writing.readingTime}m</span>}
          </div>
          {writing.tags && writing.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 max-h-[3.2rem] overflow-hidden">
              {writing.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function ListCard({ writing }: { writing: Blog }) {
  return (
    <Link href={`/writings/${writing._id}`} className="group block">
      <article className="flex gap-4 md:gap-6 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300">
        {writing.image && (
          <div className="relative w-28 md:w-40 aspect-[4/3] rounded-lg overflow-hidden shrink-0">
            <Image
              src={convertGoogleDriveUrl(writing.image)}
              alt={writing.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="160px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 py-1">
          <h2 className="font-hindi text-base md:text-lg font-medium text-card-foreground group-hover:text-primary transition-colors duration-300 leading-snug mb-2">
            {writing.title}
          </h2>
          <p className="font-hindi text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-2">
            {writing.content.replace(/<[^>]*>/g, "").slice(0, 120)}...
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time>{new Date(writing.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</time>
            {writing.readingTime && <span>· {writing.readingTime} min read</span>}
          </div>
          {writing.tags && writing.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 max-h-[3.2rem] overflow-hidden">
              {writing.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
