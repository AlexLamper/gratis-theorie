import mongoose, { Schema, Types } from "mongoose"

const schemaName = "Exam"

const ExamSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
    timeLimit: { type: Number, default: 30 },
    passRate: { type: Number, default: 70 },
  },
  {
    timestamps: true,
    collection: "exams",
  }
)

export default mongoose.models[schemaName] || mongoose.model(schemaName, ExamSchema)