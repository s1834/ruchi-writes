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
      default:
        "https://images.unsplash.com/photo-1475874619827-b5f0310b6e6f?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
