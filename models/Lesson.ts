import mongoose from "mongoose"

const LessonSchema = new mongoose.Schema({
  voertuig: { type: String, enum: ["auto", "motor", "scooter"], required: true },
  categorie: { type: String, required: true },
  titel: { type: String, required: true },
  inhoud: [
    {
      type: { type: String, enum: ["paragraaf", "afbeelding", "lijst"], required: true },
      tekst: String,
      bron: String,
      bijschrift: String,
      items: [String],
    }
  ],
  volgorde: { type: Number, default: 0 },
  tags: [String],
}, {
  timestamps: true,
  collection: "leerstof"
})

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema)