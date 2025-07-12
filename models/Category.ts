import mongoose, { Schema, type Document, Types } from "mongoose"

export interface CategoryDocument extends Document {
  vehicleId: Types.ObjectId
  slug: string
  title: string
  icon?: string
  order?: number
}

const CategorySchema = new Schema<CategoryDocument>({
  vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true, index: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  icon: String,
  order: { type: Number, default: 0 },
})

CategorySchema.index({ vehicleId: 1 })

export default mongoose.models.Category || mongoose.model<CategoryDocument>("Category", CategorySchema)