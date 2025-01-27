import mongoose from "@/utils/db/mongooseInstance";

const analyticsSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    engagementRate: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "analytics",
  }
);

const Analytics =
  mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);

export default Analytics;
