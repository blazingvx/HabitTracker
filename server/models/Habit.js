import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completedDates: { type: [Date], default: [] }
}, { timestamps: true });

export default mongoose.model("Habit", habitSchema);