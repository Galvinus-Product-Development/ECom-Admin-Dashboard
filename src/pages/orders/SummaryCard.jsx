import React from "react";
import "./SummaryCard.css"; // Importing the CSS file

const SummaryCard = ({ title, value, color }) => (
  <div className="summary-card-container">
    <div className="summary-card-title">{title}</div>
    <div className={`summary-card-value ${color}`}>{value}</div>
  </div>
);

export default SummaryCard;
