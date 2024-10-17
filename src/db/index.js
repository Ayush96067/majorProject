import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
dotenv.config({ path: "./env" });
const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (err) {
    console.log("MONGODB connection error", err);
    process.exit(1);
  }
};

export default connectDB;
