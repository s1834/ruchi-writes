import { NextRequest, NextResponse } from "next/server";
import DBInstance from "@/utils/db/server";
import Comment from "@/utils/models/comments.models";
import { IComment } from "@/types/shared";
import mongoose from "mongoose";

DBInstance();

const buildCommentTree = (comments: IComment[]): IComment[] => {
  const commentMap: { [key: string]: IComment & { replies: IComment[] } } = {};
  const commentTree: (IComment & { replies: IComment[] })[] = [];

  comments.forEach((comment) => {
    const id = comment._id.toString();
    commentMap[id] = { ...comment.toObject(), replies: [] };
  });

  comments.forEach((comment) => {
    const parentId = comment.parentComment?.toString();
    if (parentId && commentMap[parentId]) {
      commentMap[parentId].replies.push(commentMap[comment._id.toString()]);
    } else {
      commentTree.push(commentMap[comment._id.toString()]);
    }
  });

  return commentTree;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");

  if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
    return NextResponse.json(
      { message: "A valid blogId is required" },
      { status: 400 }
    );
  }

  try {
    const allComments: IComment[] = await Comment.find({ blogId }).sort({
      createdAt: "asc",
    });
    const nestedComments = buildCommentTree(allComments);
    return NextResponse.json(nestedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { blogId, content, parentComment } = body;

    if (!blogId || !content) {
      return NextResponse.json(
        { message: "blogId and content are required" },
        { status: 400 }
      );
    }

    const newComment = new Comment({
      blogId,
      content,
      parentComment: parentComment || null,
      name: "Guest User",
      email: "guest@example.com",
    });

    await newComment.save();

    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $push: { replies: newComment._id },
      });
    }

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "Failed to create comment", error: errorMessage },
      { status: 400 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import DBInstance from "@/utils/db/server";
// import Comment, { IComment } from "@/utils/models/comments.models";
// import mongoose from "mongoose";

// // Establish database connection
// DBInstance();

// // Helper function to build a nested comment tree from a flat array
// const buildCommentTree = (comments: IComment[]): IComment[] => {
//   const commentMap: { [key: string]: IComment & { replies: IComment[] } } = {};
//   const commentTree: (IComment & { replies: IComment[] })[] = [];

//   // Create a map of comments for easy lookup
//   comments.forEach((comment) => {
//     const id = comment._id.toString();
//     commentMap[id] = { ...comment.toObject(), replies: [] };
//   });

//   // Link replies to their parents
//   comments.forEach((comment) => {
//     const parentId = comment.parentComment?.toString();
//     if (parentId && commentMap[parentId]) {
//       commentMap[parentId].replies.push(commentMap[comment._id.toString()]);
//     } else {
//       // This is a top-level comment
//       commentTree.push(commentMap[comment._id.toString()]);
//     }
//   });

//   return commentTree;
// };

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const blogId = searchParams.get("blogId");

//   if (!blogId) {
//     return NextResponse.json(
//       { message: "blogId is required" },
//       { status: 400 }
//     );
//   }

//   // Validate that the blogId is a valid MongoDB ObjectId
//   if (!mongoose.Types.ObjectId.isValid(blogId)) {
//     return NextResponse.json(
//       { message: "Invalid blogId format" },
//       { status: 400 }
//     );
//   }

//   try {
//     const allComments = await Comment.find({ blogId }).sort({
//       createdAt: "asc",
//     });
//     const nestedComments = buildCommentTree(allComments);
//     return NextResponse.json(nestedComments);
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { blogId, content, parentComment } = body;

//     if (!blogId || !content) {
//       return NextResponse.json(
//         { message: "blogId and content are required" },
//         { status: 400 }
//       );
//     }

//     const newComment = new Comment({
//       blogId,
//       content,
//       parentComment: parentComment || null,
//       // In a real application, you would get user details from a session
//       name: "Guest User",
//       email: "guest@example.com",
//     });

//     await newComment.save();

//     // If it's a reply, update the parent comment to include this new reply's ID
//     if (parentComment) {
//       await Comment.findByIdAndUpdate(parentComment, {
//         $push: { replies: newComment._id },
//       });
//     }

//     return NextResponse.json(newComment, { status: 201 });
//   } catch (error) {
//     console.error("Error creating comment:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return NextResponse.json(
//       { message: "Failed to create comment", error: errorMessage },
//       { status: 400 }
//     );
//   }
// }
