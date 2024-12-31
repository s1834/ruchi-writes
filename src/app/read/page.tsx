"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { calsans } from "@/app/fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { FaShareAlt, FaHeart, FaComment } from "react-icons/fa";
import CommentSection from "@/app/comment/page";
import Nav from "@/app/navbar/page";
import Contact from "../contact/page";

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

export default function Read() {
  const [blogContent, setBlogContent] = useState<BlogContent | null>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track like count
  const searchParams = useSearchParams();

  const blogId = searchParams.get("id");

  useEffect(() => {
    if (blogId) {
      // Fetch blog data for the specific blogId
      fetch(`http://localhost:3000/api/read?id=${blogId}`)
        .then((response) => response.json())
        .then((data: BlogContent) => setBlogContent(data))
        .catch((error) => console.error("Error fetching blog data:", error));
    }
  }, [blogId]);

  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1); // Increment like count
  };

  if (!blogContent) {
    return (
      <div className="py-100">
        <Nav />
        <div className="relative bg-white dark:bg-neutral-950 pt-32">
          <p className="text-center text-gray-500">Loading blog content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-100">
      <Nav />
      <div className="relative bg-white dark:bg-neutral-950 pt-32">
        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <p
                  className={twMerge(
                    calsans.className,
                    "text-4xl font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-300 hover:to-purple-300 hover:dark:from-indigo-500 hover:dark:to-purple-500"
                  )}
                >
                  {blogContent.title}
                </p>
                <FaShareAlt
                  title="Share"
                  className="text-lg cursor-pointer hover:text-blue-600"
                />
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>
                  {new Date(blogContent.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="mx-2">•</span>
                {blogContent.tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm font-bold mr-2 "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm prose prose-sm dark:prose-invert">
                {blogContent.image && (
                  <Image
                    src={blogContent.image}
                    alt="blog thumbnail"
                    height={1000}
                    width={1000}
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                <p className="text-2xl leading-relaxed">
                  {blogContent.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>

              {/* Like and Comment Buttons */}
              <div className="flex justify-start items-center mt-6">
                <div className="flex items-center gap-6">
                  <FaHeart
                    title="Like"
                    className="text-lg cursor-pointer hover:text-red-600"
                    onClick={handleLike}
                  />
                  <FaComment
                    title="Comment"
                    className="text-lg cursor-pointer hover:text-gray-600"
                    onClick={() => setIsCommentsVisible((prev) => !prev)}
                  />
                </div>
              </div>

              {/* Like Count Display */}
              {likeCount > 0 && (
                <div className="text-sm text-gray-500 mt-2">
                  {likeCount === 1 ? "1 like" : `${likeCount} likes`}
                </div>
              )}

              {/* Comment Section */}
              {isCommentsVisible && blogId && (
                <CommentSection blogId={blogId} />
              )}
            </div>
          </div>
        </TracingBeam>
        <div>
          <Contact />
        </div>
      </div>
    </div>
  );
}
