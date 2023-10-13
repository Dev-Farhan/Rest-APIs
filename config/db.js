import mongoose from "mongoose";

// A function to establish a connection to the MongoDB database.
export const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URL from the environment variable (process.env.MONGO_URL).
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // If the connection is successful, log a message indicating the successful connection and the host of the database.
    console.log(`Connected To MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    // If there's an error during the connection attempt, log an error message with details about the error.
    console.log(`Error in MongoDB ${error}`);
  }
};
