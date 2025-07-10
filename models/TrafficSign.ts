import mongoose from "mongoose"

const TrafficSignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    meaning: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    shape: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    applicableFor: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.models.TrafficSign || mongoose.model("TrafficSign", TrafficSignSchema)
