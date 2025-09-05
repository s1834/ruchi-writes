"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState, Suspense } from "react";
import { FC, SVGProps } from "react";
import { useSearchParams } from "next/navigation";
import { calsans } from "../fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import CommentSection from "../comment/CommentSection";
import Nav from "@/app/navbar/page";
import Contact from "../contact/page";
import type { BlogContent } from "@/types/shared";

// --- SVG Icon Components (Replaces react-icons) ---
const FaHeart = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
  const { title, ...rest } = props;
  return (
    <svg
      {...rest}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
    </svg>
  );
};

const FaComment = (
  props: React.SVGProps<SVGSVGElement> & { title?: string }
) => {
  const { title, ...rest } = props;
  return (
    <svg
      {...rest}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
    </svg>
  );
};

const FaShareAlt = (
  props: React.SVGProps<SVGSVGElement> & { title?: string }
) => {
  const { title, ...rest } = props;
  return (
    <svg
      {...rest}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.682l102.486-64.054C308.613 184.181 329.392 192 352 192c53.02 0 96-42.98 96-96S405.02 0 352 0s-96 42.98-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.02 0-96 42.98-96 96s42.98 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.302 96.302 0 0 0 256 416c0 53.02 42.98 96 96 96s96-42.98 96-96-42.98-96-96-96z"></path>
    </svg>
  );
};

const FiCopy: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const FaWhatsapp: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7-4.1-72.5 19.1L48 358.3l-4.4-7.3c-18.5-30.6-28.2-65.7-28.2-101.7 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
  </svg>
);
const FaTelegramPlane: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 496 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M470.1 27.2C463.4 17 451.2 16 440.5 22.4L16.2 288.7c-11.4 6.9-11.1 22.8 1 29.2L125 382.2l203.4-152.9c3.2-2.4 6.2-2.3 8.3 0.3s1.7 5.8-1.4 8.2L173.3 392l-2.4 105.1c0 10.3 11.2 17.5 20.5 13.4L288.9 448l114.9 85.3c11.6 8.6 28.1 2.9 33.1-10.8l50.2-192.4c4.1-15.8-5.2-31.5-20-33.1z"></path>
  </svg>
);
const FaXTwitter: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
  </svg>
);
const FaLinkedin: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
  </svg>
);
const FaFacebookSquare: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.75l-11 71.69h-57.75V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
  </svg>
);

function ReadPageComponent() {
  const [blogContent, setBlogContent] = useState<BlogContent | null>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  useEffect(() => {
    if (blogId) {
      fetch(`/api/read?id=${blogId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Blog post not found");
          return response.json();
        })
        .then((data: BlogContent) => setBlogContent(data))
        .catch((error) => console.error("Error fetching blog data:", error));
    }
  }, [blogId]);

  const handleLike = () => setLikeCount((prevCount) => prevCount + 1);

  const handleShare = (platform?: string) => {
    const shareUrl = window.location.href;
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl).then(() => alert("Link copied!"));
    } else if (platform) {
      const socialUrls: { [key: string]: string } = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(blogContent?.title || "")}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(
          blogContent?.title || ""
        )}%20${encodeURIComponent(shareUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(blogContent?.title || "")}`,
      };
      window.open(socialUrls[platform], "_blank");
    }
    setIsShareMenuVisible(false);
  };

  if (!blogContent) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400">
          Loading blog content...
        </p>
      </div>
    );
  }

  return (
    <TracingBeam className="px-6">
      <div className="max-w-4xl mx-auto antialiased pt-4 relative">
        <div className="mb-10">
          <div className="flex items-start justify-between mb-2">
            <h1
              className={twMerge(
                calsans.className,
                "text-4xl font-bold text-gray-900 dark:text-gray-100"
              )}
            >
              {blogContent.title}
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsShareMenuVisible(!isShareMenuVisible)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <FaShareAlt
                  title="Share"
                  className="text-lg text-gray-600 dark:text-gray-400"
                />
              </button>
              {isShareMenuVisible && (
                <div className="absolute right-0 bg-white dark:bg-neutral-900 shadow-lg rounded-md p-2 mt-2 z-50 w-40">
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
                    className="flex items-center w-full px-2 py-1 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaXTwitter className="mr-2" /> X
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
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div>
              <span>
                {new Date(blogContent.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="mx-2">•</span>
              <span>{`${blogContent.readingTime} min read`}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {blogContent.image && (
            <Image
              src={blogContent.image}
              alt={blogContent.title}
              height={1000}
              width={1000}
              className="rounded-lg mb-10 object-cover w-full"
              priority
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: blogContent.content.replace(/\n/g, "<br />"),
            }}
          />
        </div>

        <div className="flex gap-4 mt-8 border-t dark:border-neutral-700 pt-4">
          <button
            onClick={handleLike}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
          >
            <FaHeart title="Like" className="text-2xl" />
            <span className="text-sm mt-1">{likeCount} Likes</span>
          </button>
          <button
            onClick={() => setIsCommentsVisible(!isCommentsVisible)}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            <FaComment title="Comment" className="text-2xl" />
            <span className="text-sm mt-1">Comment</span>
          </button>
        </div>

        {isCommentsVisible && blogId && <CommentSection blogId={blogId} />}
      </div>
    </TracingBeam>
  );
}

export default function Read() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <Nav />
      <div className="pt-24">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh] text-gray-500 dark:text-gray-400">
              Loading Blog...
            </div>
          }
        >
          <ReadPageComponent />
        </Suspense>
      </div>
      <Contact />
    </div>
  );
}

// "use client";
// import React, { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { calsans } from "@/app/fonts/calsans";
// import Image from "next/image";
// import { twMerge } from "tailwind-merge";
// import { TracingBeam } from "@/components/ui/tracing-beam";
// import { FaShareAlt, FaHeart, FaComment } from "react-icons/fa";
// import { FiCopy } from "react-icons/fi";
// import {
//   FaTelegramPlane,
//   FaWhatsapp,
//   FaFacebookSquare,
//   FaLinkedin,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import CommentSection from "@/app/comment/CommentSection"; // Corrected import path
// import Nav from "@/app/navbar/page"; // Assuming Nav is here
// import Contact from "../contact/page";

// interface BlogContent {
//   _id: string;
//   title: string;
//   date: string;
//   content: string;
//   slug: string;
//   tags?: string[];
//   blogViews?: number;
//   isFeatured?: boolean;
//   readingTime?: number;
//   image?: string;
// }

// function ReadPageComponent() {
//   const [blogContent, setBlogContent] = useState<BlogContent | null>(null);
//   const [isCommentsVisible, setIsCommentsVisible] = useState(false);
//   const [likeCount, setLikeCount] = useState(0); // This is local state, not saved
//   const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
//   const searchParams = useSearchParams();
//   const blogId = searchParams.get("id");

//   useEffect(() => {
//     if (blogId) {
//       // Assuming your API is at /api/read
//       fetch(`/api/read?id=${blogId}`)
//         .then((response) => {
//           if (!response.ok) throw new Error("Blog post not found");
//           return response.json();
//         })
//         .then((data: BlogContent) => setBlogContent(data))
//         .catch((error) => console.error("Error fetching blog data:", error));
//     }
//   }, [blogId]);

//   const handleLike = () => setLikeCount((prevCount) => prevCount + 1);

//   const handleShare = (platform?: string) => {
//     const shareUrl = window.location.href;
//     if (platform === "copy") {
//       navigator.clipboard.writeText(shareUrl).then(() => alert("Link copied!"));
//     } else if (platform) {
//       const socialUrls: { [key: string]: string } = {
//         twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//           shareUrl
//         )}&text=${encodeURIComponent(blogContent?.title || "")}`,
//         linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//           shareUrl
//         )}`,
//         facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//           shareUrl
//         )}`,
//         whatsapp: `https://wa.me/?text=${encodeURIComponent(
//           blogContent?.title || ""
//         )}%20${encodeURIComponent(shareUrl)}`,
//         telegram: `https://t.me/share/url?url=${encodeURIComponent(
//           shareUrl
//         )}&text=${encodeURIComponent(blogContent?.title || "")}`,
//       };
//       window.open(socialUrls[platform], "_blank");
//     }
//     setIsShareMenuVisible(false);
//   };

//   if (!blogId) {
//     return (
//       <div className="py-100 dark:bg-neutral-950 pt-32 text-center">
//         <p>No blog specified.</p>
//       </div>
//     );
//   }

//   if (!blogContent) {
//     return (
//       <div className="py-100 dark:bg-neutral-950 pt-32 text-center">
//         <p className="text-gray-500">Loading blog content...</p>
//       </div>
//     );
//   }

//   return (
//     <TracingBeam className="px-6">
//       <div className="max-w-4xl mx-auto antialiased pt-4 relative">
//         <div className="mb-10">
//           <div className="flex items-start justify-between mb-2">
//             <h1
//               className={twMerge(
//                 calsans.className,
//                 "text-4xl font-bold text-gray-900 dark:text-gray-100"
//               )}
//             >
//               {blogContent.title}
//             </h1>
//             <div className="relative">
//               <button
//                 onClick={() => setIsShareMenuVisible(!isShareMenuVisible)}
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
//               >
//                 <FaShareAlt
//                   title="Share"
//                   className="text-lg text-gray-600 dark:text-gray-400"
//                 />
//               </button>
//               {isShareMenuVisible && (
//                 <div className="absolute right-0 bg-white dark:bg-neutral-900 shadow-lg rounded-md p-2 mt-2 z-50 w-40">
//                   <button
//                     onClick={() => handleShare("copy")}
//                     className="flex items-center w-full px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                   >
//                     <FiCopy className="mr-2" /> Copy Link
//                   </button>
//                   <button
//                     onClick={() => handleShare("whatsapp")}
//                     className="flex items-center w-full px-2 py-1 text-green-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                   >
//                     <FaWhatsapp className="mr-2" /> WhatsApp
//                   </button>
//                   <button
//                     onClick={() => handleShare("telegram")}
//                     className="flex items-center w-full px-2 py-1 text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                   >
//                     <FaTelegramPlane className="mr-2" /> Telegram
//                   </button>
//                   <button
//                     onClick={() => handleShare("twitter")}
//                     className="flex items-center w-full px-2 py-1 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                   >
//                     <FaXTwitter className="mr-2" /> X
//                   </button>
//                   <button
//                     onClick={() => handleShare("linkedin")}
//                     className="flex items-center w-full px-2 py-1 text-blue-700 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                   >
//                     <FaLinkedin className="mr-2" /> LinkedIn
//                   </button>
//                   <button
//                     onClick={() => handleShare("facebook")}
//                     className="flex items-center w-full px-2 py-1 text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                   >
//                     <FaFacebookSquare className="mr-2" /> Facebook
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//             <div>
//               <span>
//                 {new Date(blogContent.date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//               <span className="mx-2">•</span>
//               <span>{`${blogContent.readingTime} min read`}</span>
//             </div>
//           </div>
//         </div>

//         <div className="prose prose-lg dark:prose-invert max-w-none">
//           {blogContent.image && (
//             <Image
//               src={blogContent.image}
//               alt={blogContent.title}
//               height={1000}
//               width={1000}
//               className="rounded-lg mb-10 object-cover w-full"
//               priority
//             />
//           )}
//           <div
//             dangerouslySetInnerHTML={{
//               __html: blogContent.content.replace(/\n/g, "<br />"),
//             }}
//           />
//         </div>

//         <div className="flex gap-4 mt-8 border-t dark:border-neutral-700 pt-4">
//           <button
//             onClick={handleLike}
//             className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
//           >
//             <FaHeart title="Like" className="text-2xl" />
//             <span className="text-sm mt-1">{likeCount} Likes</span>
//           </button>
//           <button
//             onClick={() => setIsCommentsVisible(!isCommentsVisible)}
//             className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
//           >
//             <FaComment title="Comment" className="text-2xl" />
//             <span className="text-sm mt-1">Comment</span>
//           </button>
//         </div>

//         {isCommentsVisible && <CommentSection blogId={blogId} />}
//       </div>
//     </TracingBeam>
//   );
// }

// // Wrap the component in Suspense as it uses useSearchParams
// export default function Read() {
//   return (
//     <div className="bg-white dark:bg-neutral-950">
//       <Nav />
//       <div className="pt-24">
//         <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
//           <ReadPageComponent />
//         </Suspense>
//       </div>
//       <Contact />
//     </div>
//   );
// }
