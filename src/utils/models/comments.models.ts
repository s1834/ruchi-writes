import mongoose, { Model, Schema } from "mongoose";
import { IComment } from "@/types/shared";

const commentSchema = new Schema<IComment>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: [true, "A comment must have a name"],
      default: "Guest User",
    },
    email: {
      type: String,
      default: "guest@example.com",
    },
    content: {
      type: String,
      required: [true, "A comment must have content"],
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    collection: "comments",
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Check if the model is already compiled before defining it
const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;

// import mongoose, { Schema, Document, Model } from "mongoose";

// // Interface for our Comment document
// export interface IComment extends Document {
//   blogId: Schema.Types.ObjectId;
//   name: string;
//   email?: string;
//   guest: boolean;
//   randomPic: string;
//   content: string;
//   date: Date;
//   commentLikeCount: number;
//   parentComment?: Schema.Types.ObjectId;
//   replies: Schema.Types.ObjectId[];
// }

// const commentSchema = new Schema<IComment>(
//   {
//     blogId: {
//       type: Schema.Types.ObjectId,
//       ref: "Blog",
//       required: true,
//     },
//     name: {
//       type: String,
//       required: [true, "A comment must have a name"],
//     },
//     email: {
//       type: String,
//     },
//     guest: {
//       type: Boolean,
//       default: true,
//     },
//     randomPic: {
//       type: String,
//       default: "https://source.unsplash.com/random/100x100/?portrait",
//     },
//     content: {
//       type: String,
//       required: [true, "A comment must have content"],
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     commentLikeCount: {
//       type: Number,
//       default: 0,
//     },
//     parentComment: {
//       type: Schema.Types.ObjectId,
//       ref: "Comment",
//     },
//     replies: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],
//   },
//   {
//     collection: "comments",
//     timestamps: true,
//   }
// );

// // Prevent model recompilation in Next.js
// const Comment: Model<IComment> =
//   mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

// export default Comment;
