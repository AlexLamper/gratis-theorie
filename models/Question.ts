import mongoose from "mongoose"

const schemaName = "Question"

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "questions",
  }
)

export default mongoose.models[schemaName] || mongoose.model(schemaName, QuestionSchema)