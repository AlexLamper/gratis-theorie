import mongoose from "mongoose"

const schemaName = "TrafficSign"

const TrafficSignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    meaning: { type: String, required: true },
    category: [{ type: String, required: true }],
    type: { type: String, required: true },
    shape: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    applicableFor: [{ type: String, required: true }],
  },
  {
    timestamps: true,
    collection: "trafficsigns",
  }
)

export default mongoose.models[schemaName] || mongoose.model(schemaName, TrafficSignSchema)
