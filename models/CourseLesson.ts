import mongoose, { Schema, type Document, Types } from "mongoose"

export interface CourseLessonDocument extends Document {
  categoryId: Types.ObjectId
  slug: string
  title: string
  content: string
  image?: string
  order?: number
}

const CourseLessonSchema = new Schema<CourseLessonDocument>({
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  order: { type: Number, default: 0 },
})

CourseLessonSchema.index({ categoryId: 1 })

export default mongoose.models.CourseLesson || mongoose.model<CourseLessonDocument>("CourseLesson", CourseLessonSchema)