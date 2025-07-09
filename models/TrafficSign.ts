import mongoose, { Schema, type Document } from "mongoose"

export interface ITrafficSign extends Document {
  name: string
  description: string
  meaning: string
  category: string
  type: "gebod" | "verbod" | "waarschuwing" | "voorrang" | "informatie" | "snelheid" | "rijrichting" | "parkeren"
  shape: "rond" | "driehoek" | "vierkant" | "achthoek" | "ruit"
  color: string
  image: string
  applicableFor: string[]
  examples?: string[]
  createdAt: Date
  updatedAt: Date
}

const TrafficSignSchema = new Schema<ITrafficSign>(
  {
    name: {
      type: String,
      required: [true, "Sign name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    meaning: {
      type: String,
      required: [true, "Meaning is required"],
      trim: true,
      maxlength: [500, "Meaning cannot exceed 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["gebod", "verbod", "waarschuwing", "voorrang", "informatie", "snelheid", "rijrichting", "parkeren"],
        message: "Invalid traffic sign type",
      },
    },
    shape: {
      type: String,
      required: [true, "Shape is required"],
      enum: {
        values: ["rond", "driehoek", "vierkant", "achthoek", "ruit"],
        message: "Invalid shape",
      },
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    applicableFor: {
      type: [String],
      required: [true, "Applicable vehicles are required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Must specify at least one applicable vehicle type",
      },
    },
    examples: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better performance
TrafficSignSchema.index({ type: 1 })
TrafficSignSchema.index({ applicableFor: 1 })
TrafficSignSchema.index({ type: 1, applicableFor: 1 })
TrafficSignSchema.index({ name: "text", description: "text", meaning: "text" })

// Prevent re-compilation during development
export default mongoose.models.TrafficSign || mongoose.model<ITrafficSign>("TrafficSign", TrafficSignSchema)
