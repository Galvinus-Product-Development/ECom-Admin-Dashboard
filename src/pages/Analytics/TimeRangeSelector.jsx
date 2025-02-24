import React from "react";
import { Activity } from "lucide-react";
import "./TimeRangeSelector.css"

function TimeRangeSelector({
  timeRange,
  setTimeRange,
  compareMode,
  setCompareMode,
}) {
  return (
    <div className="time-range-selector">
      <div className="time-range-selector__left">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="select-time-range"
        >
          <option value="7d">Last 7 days</option>
          <option value="1m">Last month</option>
          <option value="3m">Last 3 months</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last year</option>
        </select>
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`compare-button ${compareMode ? "active" : ""}`}
        >
          Compare
        </button>
      </div>
      <button className="generate-report-button">
        <Activity size={20} />
        Generate Report
      </button>
    </div>
  );
}

export default TimeRangeSelector;
