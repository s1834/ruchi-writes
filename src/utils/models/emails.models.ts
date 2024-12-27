import mongoose from "@/utils/db/mongooseInstance";

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "emails",
  }
);

const Emails = mongoose.models.Emails || mongoose.model("Emails", emailSchema);

export default Emails;
