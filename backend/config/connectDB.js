import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {

    console.log("Trying to connect...");

    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
    return connection;

  } catch (error) {

    console.error("Mongo Error:", error.message);
    throw error;

  }
};

export default connectDb;
