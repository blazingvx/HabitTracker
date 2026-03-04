import React, { useState } from "react";
import axios from "axios";

function HabitForm({ fetchHabits }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/habits", { name });
    setName("");
    fetchHabits();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default HabitForm;