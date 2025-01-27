import mongoose from "@/utils/db/mongooseInstance";

const homeSchema = new mongoose.Schema(
  {
    visitors: {
      type: Number,
    },
  },
  {
    collection: "home",
  }
);

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);
export default Home;
