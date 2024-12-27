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
    },
    content: {
      type: String,
      required: [true, "A comment must have content"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reply: [
      {
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
      },
    ],
    commentLikeCount: {
      type: Number,
      default: 0,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    collection: "comments",
  }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);

export default Comments;
