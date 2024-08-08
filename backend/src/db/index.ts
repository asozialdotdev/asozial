import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI!)
  .then((x) => {
    console.log(`Connected to: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
