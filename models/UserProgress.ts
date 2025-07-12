import mongoose, { Schema, type Document, Types } from "mongoose"

export interface UserProgressDocument extends Document {
  sessionId: string
  lessonId: Types.ObjectId
  completed: boolean
  completedAt?: Date
}

const UserProgressSchema = new Schema<UserProgressDocument>({
  sessionId: { type: String, required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: "CourseLesson", required: true, index: true },
  completed: { type: Boolean, default: false },
  completedAt: Date,
})

UserProgressSchema.index({ sessionId: 1, lessonId: 1 })

export default mongoose.models.UserProgress || mongoose.model<UserProgressDocument>("UserProgress", UserProgressSchema)