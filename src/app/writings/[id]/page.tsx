"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WritingComments from "@/components/WritingComments";
import { convertGoogleDriveUrl } from "@/lib/utils";

interface BlogContent {
  _id: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
  metaDescription?: string;
}

export default function WritingPage() {
  const params = useParams();
  const id = params.id as string;
  const [writing, setWriting] = useState<BlogContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    async function fetchWriting() {
      try {
        const response = await fetch(`/api/read?id=${id}`);
        if (!response.ok) throw new Error("Not found");
        const data = await response.json();
        setWriting(data);
      } catch (error) {
        console.error("Error fetching writing:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWriting();

    // Track view
    fetch("/api/analytics", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId: id, views: 1 }),
    }).catch(() => {});

    // Fetch analytics for like count
    fetch(`/api/analytics?blogId=${id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.likes) setLikeCount(data.likes); })
      .catch(() => {});

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
    if (likedBlogs.includes(id)) {
      setLiked(true);
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
    if (liked) {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs.filter((b: string) => b !== id)));
      fetch("/api/analytics", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ blogId: id, likes: -1 }) }).catch(() => {});
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      likedBlogs.push(id);
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
      fetch("/api/analytics", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ blogId: id, likes: 1 }) }).catch(() => {});
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    fetch("/api/analytics", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ blogId: id, shares: 1 }) }).catch(() => {});
    if (navigator.share) {
      try { await navigator.share({ title: writing?.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      const el = document.getElementById("share-btn");
      if (el) { el.textContent = "Copied!"; setTimeout(() => { el.textContent = "Share"; }, 2000); }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!writing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <Navigation />
        <p className="text-muted-foreground mb-4">This piece could not be found.</p>
        <Link href="/writings" className="text-sm text-primary hover:underline">Back to writings</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: writing.title,
    datePublished: writing.date,
    author: { "@type": "Person", name: "Ruchi Shah" },
    publisher: { "@type": "Person", name: "Ruchi Shah" },
    description: writing.metaDescription || writing.content.replace(/<[^>]*>/g, "").slice(0, 160),
    inLanguage: "hi",
    ...(writing.image && { image: convertGoogleDriveUrl(writing.image) }),
    ...(writing.tags && { keywords: writing.tags.join(", ") }),
  };

  return (
    <div className="min-h-screen grain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div className="h-full bg-primary transition-all duration-75" style={{ width: `${readingProgress}%` }} />
      </div>

      <Navigation />

      <article className="pt-20 md:pt-24">
        {/* Header */}
        <header className="px-5 md:px-10 pb-6 md:pb-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/writings" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Writings
            </Link>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <time dateTime={writing.date}>
                  {new Date(writing.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                {writing.readingTime && (
                  <>
                    <span>·</span>
                    <span>{writing.readingTime} min read</span>
                  </>
                )}
              </div>

              <h1 className="font-hindi text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug mb-4">
                {writing.title}
              </h1>

              {/* All tags */}
              {writing.tags && writing.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {writing.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </header>

        {/* Image — full width, larger */}
        {writing.image && (
          <div className="px-5 md:px-10 pb-10 md:pb-14">
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-[2/1] md:aspect-[21/9] rounded-xl overflow-hidden">
                <Image
                  src={convertGoogleDriveUrl(writing.image)}
                  alt={writing.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1100px"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-5 md:px-10 pb-12 md:pb-16"
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="poem-body text-foreground/90"
              dangerouslySetInnerHTML={{ __html: writing.content.replace(/\n/g, "<br />") }}
            />
          </div>
        </motion.div>

        {/* Actions — Like, Share, Comments */}
        <div className="px-5 md:px-10 pb-16 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="border-t border-border pt-6 flex items-center gap-5">
              {/* Like button */}
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-2 text-sm transition-colors ${
                  liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {likeCount > 0 && <span>{likeCount}</span>}
                {!likeCount && <span>Like</span>}
              </button>

              <span className="text-border">|</span>

              <button
                onClick={handleShare}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span id="share-btn">Share</span>
              </button>

              <span className="text-border">|</span>

              <button
                onClick={() => setShowComments(!showComments)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {showComments ? "Hide Comments" : "Comments"}
              </button>
            </div>

            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-border">
                    <WritingComments blogId={id} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
