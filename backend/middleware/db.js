import mongoose from "mongoose";
import { NextResponse } from "next/server";
require("dotenv").config();
// const MONGO_URI = "mongodb+srv://mkashifx6:testing123@cluster0.62oep.mongodb.net/?retryWrites=true&w=majority"
const MONGO_URI = "mongodb+srv://sherazmoiz9:FMGxSK0XXAOR42S0@cluster0.l6qfsrz.mongodb.net/new"
const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGO_URI || MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(
        process.env.MONGO_URI || MONGO_URI,
        "Failed to connect to MongoDB:",
        error
      );
      return NextResponse.json(
        {
          message: "Failed to connect to MongoDB",
        },
        {
          status: 500,
        }
      );
    }
  }

  return handler(req, res);
};

export default connectDb;