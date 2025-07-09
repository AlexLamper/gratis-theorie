import mongoose from "mongoose"

const connectMongoDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      const mongoURI = process.env.MONGODB_URI
      if (!mongoURI) {
        throw new Error("MongoDB URI is not defined in environment variables.")
      }
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any)
      console.log("MongoDB connected successfully")
    } else {
      console.log("MongoDB is already connected")
    }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export default connectMongoDB