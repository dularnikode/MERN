import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: process.env.DATABASE_NAME,
    })
    .then(() => {
      console.log("DB connected successFully");
    })
    .catch((error) => {
      console.log("Error Occured", error);
    });
};

export default connectDB;
