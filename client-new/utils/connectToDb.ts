import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ethMumbai");
    console.log("Connected to the database");
  } catch (err) {
    console.log("Error connecting to the database:", err);
  }
};
export default connectToDb;