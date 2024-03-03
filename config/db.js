import mongoose from "mongoose";

// Connect With MongoDB
const connectWithMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDB Connected Successful".bgYellow.black);
  } catch (error) {
    console.log(`${error.message}`);
  }
};

// Export
export default connectWithMongoDb;
