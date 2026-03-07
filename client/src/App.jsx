import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "./context/ThemeContext.jsx";
import HabitForm from "./components/HabitForm.jsx";
import HabitList from "./components/HabitList.jsx";
import CalendarHeatmap from "./components/CalendarHeatmap.jsx";
import ExportMenu from "./components/ExportMenu.jsx";
import NotificationBanner from "./components/NotificationBanner.jsx";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/habits`);
      setHabits(res.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => 
    h.completedDates?.length > 0 && 
    new Date(h.completedDates[h.completedDates.length - 1]).toDateString() === new Date().toDateString()
  ).length;
  const totalCompletions = habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0);

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-content">
          <h1>🎯 Habit Tracker</h1>
          <p>Build better habits, one day at a time</p>
        </div>
        <div className="header-actions">
          <ExportMenu habits={habits} />
          <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? "Light mode" : "Dark mode"}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{totalHabits}</div>
          <div className="stat-label">Active Habits</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedToday}</div>
          <div className="stat-label">Completed Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalCompletions}</div>
          <div className="stat-label">Total Completions</div>
        </div>
      </div>

      <NotificationBanner 
        habits={habits}
        completedToday={completedToday}
        totalHabits={totalHabits}
      />

      <CalendarHeatmap habits={habits} />

      <div className="habits-section">
        <h2 className="section-title">Your Habits</h2>
        <HabitForm fetchHabits={fetchHabits} habits={habits} />
        {loading ? (
          <div className="empty-state">
            <p>Loading habits...</p>
          </div>
        ) : totalHabits === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p className="empty-state p">No habits yet!</p>
            <p>Add your first habit above to get started.</p>
          </div>
        ) : (
          <HabitList habits={habits} fetchHabits={fetchHabits} />
        )}
      </div>
    </div>
  );
}

export default App;