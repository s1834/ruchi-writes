import { NextResponse } from "next/server";
import Blogs from "@/utils/models/blogs.models";

// Handle GET request to fetch either all blogs or a specific blog by ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");

    if (blogId) {
      // If an 'id' query parameter is present, fetch the specific blog by ID
      const blog = await Blogs.findById(blogId);

      if (!blog) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(blog, { status: 200 });
    } else {
      // Fetch top 7 blogs with most views and mark them as featured
      const topBlogs = await Blogs.find()
        .sort({ blogViews: -1 }) // Sort blogs by most viewed (descending)
        .limit(7); // Limit to top 7 blogs

      // Update top blogs to be featured
      const featuredBlogs = await Promise.all(
        topBlogs.map((blog) => {
          return Blogs.findByIdAndUpdate(
            blog._id,
            { isFeatured: true },
            { new: true }
          );
        })
      );

      // Fetch all blogs
      const blogs = await Blogs.find();

      return NextResponse.json(blogs, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: (err as Error).message },
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      content,
      tags = [],
      isFeatured = false,
      metaTitle,
      metaDescription,
      metaKeywords = [],
      image,
      date = new Date(),
      blogViews = 0,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = content.substring(0, 500);

    // Calculate reading time
    const wordsPerMinute = 200;
    const averageWordLength = 5;
    const readingTime =
      Math.ceil(content.length / (averageWordLength * wordsPerMinute)) + 5;

    const newBlog = await Blogs.create({
      title,
      slug,
      content,
      tags,
      blogViews,
      isFeatured,
      readingTime,
      metaTitle,
      metaDescription,
      metaKeywords,
      image,
      date,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create blog", error: (err as Error).message },
      { status: 400 }
    );
  }
}

// PUT/Update an existing blog
export async function PUT(req: Request) {
  try {
    const { id } = req.url.match(/\/([a-fA-F0-9]{24})$/)!.groups!;
    const body = await req.json();

    const {
      title,
      content,
      tags,
      isFeatured,
      metaTitle,
      metaDescription,
      metaKeywords,
      image,
      date,
      blogViews,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    // Calculate reading time
    const wordsPerMinute = 200;
    const averageWordLength = 5;
    const readingTime = Math.ceil(
      content.length / (averageWordLength * wordsPerMinute)
    );

    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      {
        title,
        content,
        tags,
        isFeatured,
        readingTime,
        metaTitle,
        metaDescription,
        metaKeywords,
        image,
        date,
        blogViews: blogViews !== undefined ? blogViews : undefined,
        $inc: { blogViews: blogViews === undefined ? 1 : 0 },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update blog", error: (err as Error).message },
      { status: 400 }
    );
  }
}

// PATCH Partially update an existing blog
export async function PATCH(req: Request) {
  try {
    const { id } = req.url.match(/\/([a-fA-F0-9]{24})$/)!.groups!;
    const body = await req.json();

    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      {
        $set: body,
        $inc: { blogViews: body.blogViews === undefined ? 1 : 0 },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to patch blog", error: (err as Error).message },
      { status: 400 }
    );
  }
}

// Delete a blog by ID
export async function DELETE(req: Request) {
  try {
    const { id } = req.url.match(/\/([a-fA-F0-9]{24})$/)!.groups!;

    const deletedBlog = await Blogs.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to delete blog", error: (err as Error).message },
      { status: 400 }
    );
  }
}
