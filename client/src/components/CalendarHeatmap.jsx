import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './CalendarHeatmap.css';

function CalendarHeatmap({ habits }) {
  // Prepare data for heatmap - count completions per date
  const getCompletionData = () => {
    const dateCount = {};

    habits.forEach(habit => {
      if (habit.completedDates) {
        habit.completedDates.forEach(date => {
          const dateStr = new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD format
          dateCount[dateStr] = (dateCount[dateStr] || 0) + 1;
        });
      }
    });

    // Convert to array format expected by react-calendar-heatmap
    return Object.entries(dateCount).map(([date, count]) => ({
      date,
      count
    }));
  };

  const data = getCompletionData();

  // Custom class for each day based on completion count
  const getClassForValue = (value) => {
    if (!value || value.count === 0) {
      return 'color-empty';
    }
    if (value.count === 1) {
      return 'color-scale-1';
    }
    if (value.count === 2) {
      return 'color-scale-2';
    }
    if (value.count === 3) {
      return 'color-scale-3';
    }
    return 'color-scale-4'; // 4 or more
  };

  // Get tooltip content
  const getTooltipDataAttrs = (value) => {
    if (!value || !value.date) {
      return {
        'data-tooltip-id': 'heatmap-tooltip',
        'data-tooltip-content': 'No activity'
      };
    }
    return {
      'data-tooltip-id': 'heatmap-tooltip',
      'data-tooltip-content': `${value.date}: ${value.count} habit${value.count !== 1 ? 's' : ''} completed`
    };
  };

  // Calculate start date (1 year ago)
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Calculate end date (today)
  const endDate = new Date();

  return (
    <div className="calendar-heatmap-container">
      <div className="heatmap-header">
        <h3>Habit Completion Heatmap</h3>
        <p>Track your consistency over the past year</p>
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-colors">
          <div className="legend-color color-empty"></div>
          <div className="legend-color color-scale-1"></div>
          <div className="legend-color color-scale-2"></div>
          <div className="legend-color color-scale-3"></div>
          <div className="legend-color color-scale-4"></div>
        </div>
        <span>More</span>
      </div>

      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={getClassForValue}
        tooltipDataAttrs={getTooltipDataAttrs}
        showWeekdayLabels={true}
      />

      <Tooltip id="heatmap-tooltip" />

      <div className="heatmap-stats">
        <div className="stat-item">
          <span className="stat-label">Total Days Active:</span>
          <span className="stat-value">{data.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Most Productive Day:</span>
          <span className="stat-value">
            {data.length > 0 ? Math.max(...data.map(d => d.count)) : 0} habits
          </span>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeatmap;