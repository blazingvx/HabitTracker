import React, { useState } from "react";
import axios from "axios";
import "./HabitForm.css";

function HabitForm({ fetchHabits }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Please enter a habit name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post("http://localhost:5000/api/habits", { name: name.trim() });
      setName("");
      fetchHabits();
    } catch (err) {
      setError("Failed to add habit. Please try again.");
      console.error("Error adding habit:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        className="habit-form-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        placeholder="Add a new habit..."
        disabled={loading}
      />
      <button 
        className="habit-form-submit" 
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p style={{ color: "#FF6B6B", marginTop: "10px" }}>{error}</p>}
    </form>
  );
}

export default HabitForm;