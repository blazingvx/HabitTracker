import React from "react";
import axios from "axios";

function HabitList({ habits, fetchHabits }) {

  const completeHabit = async (id) => {
    await axios.put(`http://localhost:5000/api/habits/${id}/complete`);
    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await axios.delete(`http://localhost:5000/api/habits/${id}`);
    fetchHabits();
  };

  return (
    <div>
      {habits.map(habit => (
        <div key={habit._id} style={{ marginTop: "10px" }}>
          <strong>{habit.name}</strong>
          <p>Completed: {habit.completedDates.length} times</p>
          <button onClick={() => completeHabit(habit._id)}>Complete</button>
          <button onClick={() => deleteHabit(habit._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default HabitList;