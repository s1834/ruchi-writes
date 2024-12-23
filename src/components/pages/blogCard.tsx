// 'use client'
// import Image from "next/image";
// import { FollowerPointerCard } from "@/components/ui/following-pointer";
// import { useRouter } from "next/navigation";

// export default function BlogCard() {
//   const router = useRouter();

//   const handleReadMore = () => {
//     router.push("/read"); // Navigates to the Read page
//   };

//   return (
//     <div className="w-80 mx-auto">
//       <FollowerPointerCard
//         title={
//           <TitleComponent
//             title={blogContent.author}
//             avatar={blogContent.authorAvatar}
//           />
//         }
//       >
//         <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
//           <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
//             <Image
//               src={blogContent.image}
//               alt="thumbnail"
//               layout="fill"
//               objectFit="cover"
//               className="group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200"
//             />
//           </div>
//           <div className="p-4">
//             <h2 className="font-bold my-4 text-lg text-zinc-700">
//               {blogContent.title}
//             </h2>
//             <h2 className="font-normal my-4 text-sm text-zinc-500">
//               {blogContent.description}
//             </h2>
//             <div className="flex flex-row justify-between items-center mt-10">
//               <span className="text-sm text-gray-500">{blogContent.date}</span>
//               <div
//                 onClick={handleReadMore}
//                 className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs hover:cursor-pointer"
//               >
//                 Read More
//               </div>
//             </div>
//           </div>
//         </div>
//       </FollowerPointerCard>
//     </div>
//   );
// }




'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogCard() {
  const router = useRouter();

  const handleReadMore = () => {
    router.push("/read"); 
  };

  return (
    
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Image Section */}
      <div className="relative w-full h-40">
        <Image
          src={blogContent.image}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h2 className="font-semibold text-lg text-gray-800">
          {blogContent.title}
        </h2>
        <p className="text-gray-600 text-sm mt-3">
          {blogContent.description}
        </p>
        <div className="flex items-center justify-between mt-5">
          <span className="text-sm text-gray-500">{blogContent.date}</span>
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

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcss grid and React.",
  image: "/image/blog.jpeg",
  authorAvatar: "/image/blogs.jpeg",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
