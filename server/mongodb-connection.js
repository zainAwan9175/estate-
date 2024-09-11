import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongdbconnection = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default mongdbconnection;
