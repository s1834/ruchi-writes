import { NextResponse } from "next/server";
import Comments from "@/utils/models/comments.models";

// POST: Add a new comment to a blog
export async function POST(req: Request) {
  try {
    const { blogId, name, email, content, guest, randomPic } = await req.json();

    const newComment = await Comments.create({
      blogId,
      name,
      email,
      content,
      guest: guest || true, // default to true if guest not provided
      randomPic: randomPic || "", // default to empty string if randomPic not provided
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to create comment", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to create comment", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// PUT: Update an existing comment
export async function PUT(req: Request) {
  try {
    const { commentId, content } = await req.json();

    const updatedComment = await Comments.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to update comment", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to update comment", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// PATCH: Increment specific comment data (e.g., likes)
export async function PATCH(req: Request) {
  try {
    const { commentId, likes } = await req.json();

    const updatedComment = await Comments.findByIdAndUpdate(
      commentId,
      { $inc: { commentLikeCount: likes } },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to patch comment", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to patch comment", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// DELETE: Delete a comment by ID
export async function DELETE(req: Request) {
  try {
    const { commentId } = await req.json();

    const deletedComment = await Comments.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to delete comment", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to delete comment", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// GET: Fetch comments for a specific blog
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const comments = await Comments.find({ blogId });

    if (comments.length === 0) {
      return NextResponse.json(
        { message: "No comments found for this blog" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to retrieve comments", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to retrieve comments", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}
