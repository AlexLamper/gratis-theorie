import mongoose, { Schema, type Document } from "mongoose"

export interface VehicleDocument extends Document {
  name: string
  displayName: string
  icon?: string
}

const VehicleSchema = new Schema<VehicleDocument>({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  icon: String,
})

export default mongoose.models.Vehicle || mongoose.model<VehicleDocument>("Vehicle", VehicleSchema)