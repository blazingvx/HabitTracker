import React, { useState } from "react";
import "./NotificationBanner.css";

function NotificationBanner({ habits, completedToday, totalHabits }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const remainingCount = totalHabits - completedToday;

  // Get habits not completed today
  const getRemainingHabits = () => {
    const today = new Date().toDateString();
    return habits.filter(habit => {
      if (!habit.completedDates || habit.completedDates.length === 0) {
        return true;
      }
      const lastCompleted = new Date(habit.completedDates[habit.completedDates.length - 1]);
      return lastCompleted.toDateString() !== today;
    });
  };

  const remainingHabits = getRemainingHabits();

  // Don't show if all habits are done or if dismissed
  if (remainingCount === 0 || isDismissed) {
    return null;
  }

  return (
    <div className="notification-banner">
      <div className="notification-content">
        <div className="notification-main" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="notification-icon">📋</div>
          <div className="notification-text">
            <div className="notification-title">
              {remainingCount} {remainingCount === 1 ? "habit" : "habits"} remaining for today
            </div>
            <div className="notification-subtitle">
              You've completed {completedToday} of {totalHabits} habits
            </div>
          </div>
          <div className="notification-toggle">
            <span className="toggle-arrow">{isExpanded ? "▼" : "▶"}</span>
          </div>
        </div>

        {isExpanded && remainingHabits.length > 0 && (
          <div className="notification-details">
            <div className="remaining-habits-list">
              {remainingHabits.map((habit) => (
                <div key={habit._id} className="remaining-habit-item">
                  <div className="habit-checkbox">☐</div>
                  <div className="habit-info">
                    <div className="habit-name">{habit.name}</div>
                    {habit.category && (
                      <div className="habit-category">{habit.category}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        className="notification-close"
        onClick={() => setIsDismissed(true)}
        title="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

export default NotificationBanner;
