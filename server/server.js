import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import habitRoutes from "./routes/habits.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/habit-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));