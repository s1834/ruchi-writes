import mongoose from "@/utils/db/mongooseInstance";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: [true, "A blog must have content"],
    },
    tags: [
      {
        type: String,
      },
    ],
    blogViews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    readingTime: {
      type: Number,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    image: {
      type: String,
    },
  },
  {
    collection: "blogs",
  }
);

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blogs;
