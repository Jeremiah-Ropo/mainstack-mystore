import mongoose from "mongoose";
import "dotenv/config";
import { MONGO_URI } from "../config";

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
