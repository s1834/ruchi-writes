"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { calsans } from "@/app/fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { FaShareAlt, FaHeart, FaComment } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
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
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(3);
  const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  useEffect(() => {
    if (blogId) {
      fetch(`http://localhost:3000/api/read?id=${blogId}`)
        .then((response) => response.json())
        .then((data: BlogContent) => setBlogContent(data))
        .catch((error) => console.error("Error fetching blog data:", error));
    }
  }, [blogId]);

  const handleLike = () => setLikeCount((prevCount) => prevCount + 1);

  const handleShare = (platform?: string) => {
    const shareUrl = window.location.href;
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } else if (platform) {
      const socialUrls: { [key: string]: string } = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
      };
      window.open(socialUrls[platform], "_blank");
    }
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
        <div className="max-w-4xl mx-auto antialiased pt-4 relative">
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
              {/* Share Button */}
              <div className="relative">
                <FaShareAlt
                  title="Share"
                  className="text-lg cursor-pointer hover:text-blue-600"
                  onClick={() => setIsShareMenuVisible((prev) => !prev)}
                />
              </div>
            </div>

            {/* Share Menu */}
            {isShareMenuVisible && (
              <div className="relative">
              <div className="absolute bg-white dark:bg-neutral-900 shadow-lg rounded-md p-2 mt-2 z-50 flex flex-col items-stretch justify-end w-48">
                <button
                    onClick={() => handleShare("copy")}
                    className="flex items-center w-full px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FiCopy className="mr-2" /> Copy Link
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="flex items-center w-full px-2 py-1 text-green-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare("telegram")}
                    className="flex items-center w-full px-2 py-1 text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaTelegramPlane className="mr-2" /> Telegram
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center w-full px-2 py-1 text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaXTwitter className="mr-2" /> Twitter
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center w-full px-2 py-1 text-blue-700 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center w-full px-2 py-1 text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaFacebookSquare className="mr-2" /> Facebook
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div>
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
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm font-bold mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-block bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full text-xs">
              {`${blogContent.readingTime} min read`}
            </span>
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

          <div className="flex gap-4 mt-6">
            <div className="flex flex-col items-center">
              <FaHeart
                title="Like"
                className="text-2xl cursor-pointer hover:text-red-600"
                onClick={handleLike}
              />
              <span className="text-gray-500 text-sm mt-1">
                {likeCount} Likes
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FaComment
                title="Comment"
                className="text-2xl cursor-pointer hover:text-gray-600"
                onClick={() => setIsCommentsVisible((prev) => !prev)}
              />
              <span className="text-gray-500 text-sm mt-1">
                {commentCount} Comments
              </span>
            </div>
          </div>

          {isCommentsVisible && blogId && <CommentSection blogId={blogId} />}
        </div>
      </TracingBeam>
      <div>
        <Contact />
      </div>
    </div>
  </div>
);
}