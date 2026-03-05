import React, { useState } from "react";
import axios from "axios";
import "./HabitForm.css";

function HabitForm({ fetchHabits, habits }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get unique categories and tags from existing habits
  const existingCategories = [...new Set(habits.map(h => h.category).filter(c => c && c !== "other"))];
  const existingTags = [...new Set(habits.flatMap(h => h.tags || []))].sort();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Please enter a habit name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const habitData = { 
        name: name.trim(),
        category: category.trim() || "other",
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };
      await axios.post("http://localhost:5000/api/habits", habitData);
      setName("");
      setCategory("");
      setTags("");
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
      <input
        className="habit-form-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (optional, defaults to 'other')"
        disabled={loading}
        list="category-suggestions"
      />
      <datalist id="category-suggestions">
        {existingCategories.map(cat => (
          <option key={cat} value={cat} />
        ))}
      </datalist>
      <div className="input-container">
        <input
          className="habit-form-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (optional, comma-separated)"
          disabled={loading}
          list="tag-suggestions"
        />
        <datalist id="tag-suggestions">
          {existingTags.map(tag => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </div>
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