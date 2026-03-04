import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import habitRoutes from "./routes/habits.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/habit-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/habits", habitRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));