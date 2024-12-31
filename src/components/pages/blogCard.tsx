"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function BlogCard({ blog }: { blog: BlogContent }) {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/read?id=${blog._id}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="relative w-full h-40">
        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-gray-800">{blog.title}</h2>
          {blog.readingTime && (
            <span className="inline-block bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full text-xs">
              {`${blog.readingTime} min read`}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mt-3">{blog.slug}.........</p>

        <div className="flex items-center justify-between mt-5">
          <span className="text-sm text-gray-500">
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <button
            onClick={handleReadMore}
            className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
