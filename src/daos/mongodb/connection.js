import mongoose from "mongoose";
import { DB_USER, DB_PASSWORD } from "../../config.js";

// export const connectionString = "mongodb://localhost:27017/ecommerce";

if (!DB_USER || !DB_PASSWORD) {
  throw new Error("Please specify DB_USER and DB_PASSWORD in .env");
}

export const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fqacb1a.mongodb.net/ecommerce?retryWrites=true&w=majority`;

try {
  await mongoose.connect(connectionString);
  console.log("Connection to MongoDB successful");
} catch (error) {
  console.log(error);
}
