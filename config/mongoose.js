import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(".env");

const url = process.env.DB_URL;
// console.log(url);

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
};