import mongoose from "mongoose";

const connectDb = async () => {
  try {

    console.log("Trying to connect...");

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB connected");

  } catch (error) {

    console.log("Mongo Error:", error.message);

  }
};

export default connectDb;