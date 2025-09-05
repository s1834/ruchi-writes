import mongoose from "mongoose";

// Defines the structure of a single comment document in MongoDB
export interface IComment extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  blogId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  content: string;
  date: Date;
  parentComment?: mongoose.Schema.Types.ObjectId;
  replies: mongoose.Schema.Types.ObjectId[]; // Stores IDs of direct replies
  createdAt: Date;
  updatedAt: Date;
}

// Defines the structure for a comment object once it's been processed into a tree for the frontend
export interface ICommentTree extends IComment {
  replies: ICommentTree[]; // This holds the nested comment objects
}

// Defines the structure of a blog post
export interface BlogContent {
  _id: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
}
