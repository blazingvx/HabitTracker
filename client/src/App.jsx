import React, { useEffect, useState } from "react";
import axios from "axios";
import HabitForm from "./components/HabitForm.jsx";
import HabitList from "./components/HabitList.jsx";

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const res = await axios.get("http://localhost:5000/api/habits");
    setHabits(res.data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Habit Tracker</h1>
      <HabitForm fetchHabits={fetchHabits} />
      <HabitList habits={habits} fetchHabits={fetchHabits} />
    </div>
  );
}

export default App;