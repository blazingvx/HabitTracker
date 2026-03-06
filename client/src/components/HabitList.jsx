import React, { useState } from "react";
import axios from "axios";
import "./HabitList.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function HabitList({ habits, fetchHabits }) {
  const [loading, setLoading] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const completeHabit = async (id) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      await axios.put(`${API_BASE}/api/habits/${id}/complete`);
      fetchHabits();
    } catch (error) {
      console.error("Error completing habit:", error);
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const deleteHabit = async (id) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      await axios.delete(`${API_BASE}/api/habits/${id}`);
      setDeleteConfirm(null);
      fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const isCompletedToday = (habit) => {
    if (!habit.completedDates || habit.completedDates.length === 0) return false;
    const lastCompleted = new Date(habit.completedDates[habit.completedDates.length - 1]);
    return lastCompleted.toDateString() === new Date().toDateString();
  };

  const getStreak = (habit) => {
    if (!habit.completedDates || habit.completedDates.length === 0) return 0;
    
    let streak = 0;
    const dates = habit.completedDates
      .map(d => new Date(d))
      .sort((a, b) => b - a);
    
    const today = new Date();
    let currentDate = new Date(today);
    
    for (let date of dates) {
      const dateStr = date.toDateString();
      const currentStr = currentDate.toDateString();
      
      if (dateStr === currentStr) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (currentDate > date) {
        break;
      }
    }
    
    return streak;
  };

  const calculateProgress = (habit) => {
    const completedDates = habit.completedDates ? habit.completedDates.length : 0;
    const maxDays = 30;
    return Math.min((completedDates / maxDays) * 100, 100);
  };

  // Group habits by category
  const groupedHabits = habits.reduce((groups, habit) => {
    const category = habit.category || "other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(habit);
    return groups;
  }, {});

  return (
    <>
      {Object.keys(groupedHabits).map(category => (
        <div key={category} className="habit-category">
          <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <div className="habit-list">
            {groupedHabits[category].map(habit => (
          <div key={habit._id} className="habit-item">
            <div className="habit-header">
              <div>
                <h3 className="habit-name">
                  {habit.name}
                  {isCompletedToday(habit) && <span className="completed-today">✓ Done Today</span>}
                </h3>
                {habit.tags && habit.tags.length > 0 && (
                  <div className="habit-tags">
                    {habit.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="habit-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${calculateProgress(habit)}%` }}
                />
              </div>
              <div className="progress-text">{habit.completedDates?.length || 0}x</div>
            </div>

            <div className="habit-stats">
              <div className="habit-stat">
                <div className="stat-label">Total Times</div>
                <div className="stat-value">{habit.completedDates?.length || 0}</div>
              </div>
              <div className="habit-stat">
                <div className="stat-label">Current Streak</div>
                <div className="stat-value">🔥 {getStreak(habit)}</div>
              </div>
            </div>

            <div className="habit-actions">
              <button 
                className={`btn btn-complete ${isCompletedToday(habit) ? 'completed' : ''}`}
                onClick={() => completeHabit(habit._id)}
                disabled={loading[habit._id] || isCompletedToday(habit)}
              >
                {isCompletedToday(habit) ? '✓ Completed' : 'Mark Complete'}
              </button>
              <button 
                className="btn btn-delete"
                onClick={() => setDeleteConfirm(habit._id)}
                disabled={loading[habit._id]}
              >
                Delete
              </button>
            </div>
          </div>
            ))}
          </div>
        </div>
      ))}

      {deleteConfirm && (
        <div className="delete-confirmation">
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this habit? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button 
                className="confirm-yes"
                onClick={() => deleteHabit(deleteConfirm)}
                disabled={loading[deleteConfirm]}
              >
                Delete
              </button>
              <button 
                className="confirm-no"
                onClick={() => setDeleteConfirm(null)}
                disabled={loading[deleteConfirm]}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HabitList;