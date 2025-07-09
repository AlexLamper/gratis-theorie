import mongoose from "mongoose"

interface ConnectionState {
  isConnected?: number
}

const connection: ConnectionState = {}

export const connectDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection.")
      return
    }

    const mongoURI = process.env.MONGODB_URI
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables.")
    }

    const dbConnection = await mongoose.connect(mongoURI)
    connection.isConnected = dbConnection.connections[0].readyState
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error((error as Error).message)
  }
}