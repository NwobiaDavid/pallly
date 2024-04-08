import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let connection: mongoose.Connection | any = null;

async function connectToDB() {
  if (connection) return connection;

  mongoose.set("strictQuery", true);

  try {
    if (MONGO_URI) {
      const options: ConnectOptions = {
        // Additional connection options (optional)
      };
      connection = await mongoose.connect(MONGO_URI, options);
      console.log("Connected to MongoDB!");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process on connection failure
  }

  return connection;
}

export default connectToDB;
