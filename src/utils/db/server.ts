import mongoose from "@/utils/db/mongooseInstance";

if (!process.env.DATABASE_URI || !process.env.DATABASE_PASSWORD) {
  throw new Error("DATABASE_URI and DATABASE_PASSWORD must be defined");
}

const MONGO_URI = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const DBInstance = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("Connected to MongoDB ✅✅");
  } catch (err) {
    console.error(
      `Could not connect to MongoDB ❌❌\n`,
      (err as Error).message
    );
  }
};

export default DBInstance;
