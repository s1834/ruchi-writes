"use client";
import React, { useState } from "react";
import { calsans } from "@/app/fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { FaShareAlt, FaHeart, FaComment } from "react-icons/fa"; 
import CommentSection from "@/app/comment/page"; 
import Nav from "@/app/navbar/page";

export default function Read() {
  const [showComments, setShowComments] = useState(false);

  const dummyContent = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      date: "December 5, 2024",
      labels: ["Nature", "Travel", "Photography"],
      description: (
        <>
          <p>
            Sit duis est minim proident non nisi velit non consectetur. Esse
            adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
            Lorem ut aliqua anim do.
          </p>
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // {
    //   title: "Lorem Ipsum Dolor Sit Amet",
    //   date: "December 5, 2024",
    //   labels: ["Nature", "Travel", "Photography"],
    //   description: (
    //     <>
    //       <p>
    //         Sit duis est minim proident non nisi velit non consectetur. Esse
    //         adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
    //         Lorem ut aliqua anim do.
    //       </p>
    //     </>
    //   ),
    //   image:
    //     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
    // {
    //   title: "Lorem Ipsum Dolor Sit Amet",
    //   date: "December 5, 2024",
    //   labels: ["Nature", "Travel", "Photography"],
    //   description: (
    //     <>
    //       <p>
    //         Sit duis est minim proident non nisi velit non consectetur. Esse
    //         adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
    //         Lorem ut aliqua anim do.
    //       </p>
    //     </>
    //   ),
    //   image:
    //     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
    // {
    //   title: "Lorem Ipsum Dolor Sit Amet",
    //   date: "December 5, 2024",
    //   labels: ["Nature", "Travel", "Photography"],
    //   description: (
    //     <>
    //       <p>
    //         Sit duis est minim proident non nisi velit non consectetur. Esse
    //         adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
    //         Lorem ut aliqua anim do.
    //       </p>
    //     </>
    //   ),
    //   image:
    //     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
  ];

  const toggleComments = () => setShowComments((prev) => !prev);

  return (
    <div className="py-100">
        <Nav />
      <TracingBeam className="px-6 ">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative ">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              {/* Title and Share Icon */}
              <div className="flex items-center justify-between mb-2">
                <p className={twMerge(calsans.className, "text-2xl font-bold")}>
                  {item.title}
                </p>
                <FaShareAlt
                  title="Share"
                  className="text-lg cursor-pointer hover:text-blue-600"
                />
              </div>

              {/* Date and Labels */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{item.date}</span>
                <span className="mx-2">•</span>
                {item.labels.map((label, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs mr-2"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Image and Description */}
              <div className="text-sm prose prose-sm dark:prose-invert">
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {item.description}
              </div>

              {/* Action Icons */}
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-6">
                  <FaHeart
                    title="Like"
                    className="text-lg cursor-pointer hover:text-red-600"
                  />
                  <FaComment
                    title="Comment"
                    className="text-lg cursor-pointer hover:text-gray-600"
                    onClick={toggleComments}
                  />
                </div>
              </div>

              {/* Comment Section */}
              {showComments && <CommentSection />}
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
