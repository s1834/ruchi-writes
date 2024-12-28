import mongoose from "@/utils/db/mongooseInstance";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: [true, "A comment must have a name"],
    },
    email: {
      type: String,
    },
    guest: {
      type: Boolean,
      default: true,
    },
    randomPic: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1475874619827-b5f0310b6e6f?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    content: {
      type: String,
      required: [true, "A comment must have content"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    replies: [
      {
        name: {
          type: String,
          required: [true, "A reply must have a name"],
        },
        email: {
          type: String,
        },
        guest: {
          type: Boolean,
          default: true,
        },
        randomPic: {
          type: String,
          default:
            "https://images.unsplash.com/photo-1475874619827-b5f0310b6e6f?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replyLikeCount: {
          type: Number,
          default: 0,
        },
        parentComment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment", // Reference to the parent comment
        },
        // Nested replies
        replies: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment", // Allows recursive referencing of replies
          },
        ],
      },
    ],
    commentLikeCount: {
      type: Number,
      default: 0,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // References a parent comment, if the comment itself is a reply
    },
  },
  {
    collection: "comments",
  }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);

export default Comments;
