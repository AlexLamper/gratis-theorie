import mongoose, { Schema, type Document } from "mongoose"

export interface IQuestion extends Document {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "auto" | "scooter" | "motor"
  difficulty: "easy" | "medium" | "hard"
  topic?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
      maxlength: [500, "Question cannot exceed 500 characters"],
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: (v: string[]) => v.length >= 2 && v.length <= 6,
        message: "Must have between 2 and 6 options",
      },
    },
    correctAnswer: {
      type: Number,
      required: [true, "Correct answer index is required"],
      min: [0, "Correct answer index must be 0 or greater"],
      validate: {
        validator: function (this: IQuestion, v: number) {
          return v < this.options.length
        },
        message: "Correct answer index must be within options range",
      },
    },
    explanation: {
      type: String,
      required: [true, "Explanation is required"],
      trim: true,
      maxlength: [1000, "Explanation cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["auto", "scooter", "motor"],
        message: "Category must be auto, scooter, or motor",
      },
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Difficulty must be easy, medium, or hard",
      },
    },
    topic: {
      type: String,
      trim: true,
      maxlength: [100, "Topic cannot exceed 100 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better performance
QuestionSchema.index({ category: 1 })
QuestionSchema.index({ difficulty: 1 })
QuestionSchema.index({ category: 1, difficulty: 1 })
QuestionSchema.index({ topic: 1 })
QuestionSchema.index({ createdAt: -1 })

// Prevent re-compilation during development
export default mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema)
