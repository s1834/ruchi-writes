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
      // If no 'id' is provided, fetch all blogs
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

// Create a new blog
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
    const readingTime = Math.ceil(
      content.length / (averageWordLength * wordsPerMinute)
    );

    // Create the new blog with optional date and blogViews
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

// Update an existing blog (PUT)
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

// Partially update an existing blog (PATCH)
export async function PATCH(req: Request) {
  try {
    const { id } = req.url.match(/\/([a-fA-F0-9]{24})$/)!.groups!;
    const body = await req.json();

    // Increment blogViews if not manually set
    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      {
        $set: body, // Only update the fields provided in the body
        $inc: { blogViews: body.blogViews === undefined ? 1 : 0 }, // Increment blogViews by 1 if not manually set
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
