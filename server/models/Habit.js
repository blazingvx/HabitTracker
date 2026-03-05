import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "other" },
  tags: { type: [String], default: [] },
  completedDates: { type: [Date], default: [] }
}, { timestamps: true });

export default mongoose.model("Habit", habitSchema);