import BlogCard from "@/components/pages/blogCard";

export default function Blogs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <BlogCard key={index} />
      ))}
    </div>
  );
}
