// src/app/api/read/route.ts
export const dynamic = "force-dynamic"; // << add this

import { NextResponse } from "next/server";
import Blogs from "@/utils/models/blogs.models";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");

    if (blogId) {
      const blog = await Blogs.findById(blogId);

      if (!blog) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(blog, { status: 200 });
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: (err as Error).message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import Blogs from "@/utils/models/blogs.models";

// // Handle GET request to fetch either all blogs or a specific blog by ID
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const blogId = searchParams.get("id");

//     if (blogId) {
//       // If an 'id' query parameter is present, fetch the specific blog by ID
//       const blog = await Blogs.findById(blogId);

//       if (!blog) {
//         return NextResponse.json(
//           { message: "Blog not found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(blog, { status: 200 });
//     } else {
//       // Fetch top 7 blogs with most views and mark them as featured
//       //   const topBlogs = await Blogs.find()
//       //     .sort({ blogViews: -1 }) // Sort blogs by most viewed (descending)
//       //     .limit(7); // Limit to top 7 blogs

//       //   // Update top blogs to be featured
//       //   const featuredBlogs = await Promise.all(
//       //     topBlogs.map((blog) => {
//       //       return Blogs.findByIdAndUpdate(
//       //         blog._id,
//       //         { isFeatured: true },
//       //         { new: true }
//       //       );
//       // })
//       //   );

//       // Fetch all blogs
//       //   const blogs = await Blogs.find();

//       //   return NextResponse.json(blogs, { status: 200 });

//       return NextResponse.json({ message: "Blog not found" }, { status: 404 });
//     }
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Failed to fetch blogs", error: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }
