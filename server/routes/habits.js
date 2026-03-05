import express from "express";
import Habit from "../models/Habit.js";

const router = express.Router();

// Get all habits
router.get("/", async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// Create habit
router.post("/", async (req, res) => {
  const habit = new Habit({ 
    name: req.body.name,
    category: req.body.category || "other",
    tags: req.body.tags || []
  });
  await habit.save();
  res.json(habit);
});

// Mark habit complete for today
router.put("/:id/complete", async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  habit.completedDates.push(new Date());
  await habit.save();
  res.json(habit);
});

// Delete habit
router.delete("/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Habit deleted" });
});

export default router;