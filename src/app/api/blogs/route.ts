import { NextResponse } from "next/server";
import Blogs from "@/utils/models/blogs.models";
import DBInstance from "@/utils/db/server";

DBInstance();

// GET all blogs
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Fetch all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   content:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   blogViews:
 *                     type: integer
 *                   isFeatured:
 *                     type: boolean
 *                   readingTime:
 *                     type: integer
 *                   metaTitle:
 *                     type: string
 *                   metaDescription:
 *                     type: string
 *                   metaKeywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
export async function GET(req: Request) {
  try {
    const blogs = await Blogs.find();

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: (err as Error).message },
      { status: 500 }
    );
  }
}

// POST new blog
/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               metaKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               date:
 *                 type: string
 *               blogViews:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 content:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 blogViews:
 *                   type: integer
 *                 isFeatured:
 *                   type: boolean
 *                 readingTime:
 *                   type: integer
 *                 metaTitle:
 *                   type: string
 *                 metaDescription:
 *                   type: string
 *                 metaKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: string
 *                 image:
 *                   type: string
 *       400:
 *         description: Failed to create blog
 */
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
/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update an existing blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               metaKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               date:
 *                 type: string
 *               blogViews:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 isFeatured:
 *                   type: boolean
 *                 readingTime:
 *                   type: integer
 *                 metaTitle:
 *                   type: string
 *                 metaDescription:
 *                   type: string
 *                 metaKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                 image:
 *                   type: string
 *                 date:
 *                   type: string
 *                 blogViews:
 *                   type: integer
 *       400:
 *         description: Failed to update blog
 */
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
/**
 * @swagger
 * /api/blogs/{id}:
 *   patch:
 *     summary: Partially update an existing blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               metaKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               date:
 *                 type: string
 *               blogViews:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Blog partially updated successfully and returned with the updated data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 isFeatured:
 *                   type: boolean
 *                 readingTime:
 *                   type: integer
 *                 metaTitle:
 *                   type: string
 *                 metaDescription:
 *                   type: string
 *                 metaKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                 image:
 *                   type: string
 *                 date:
 *                   type: string
 *                 blogViews:
 *                   type: integer
 *       400:
 *         description: Failed to update blog
 */
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
      { message: "Failed to update blog", error: (err as Error).message },
      { status: 500 }
    );
  }
}

// DELETE a blog by ID
/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete an existing blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       500:
 *         description: Failed to delete blog
 */
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
      { status: 500 }
    );
  }
}
