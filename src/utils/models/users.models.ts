import mongoose from "@/utils/db/mongooseInstance";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      default: "Guest",
    },
    email: {
      type: String,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "default-avatar.png",
    },
    gender: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
