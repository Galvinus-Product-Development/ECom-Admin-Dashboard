import React from "react";
import "./AdditionalMetrics.css";

function AdditionalMetrics() {
  return (
    <div className="metrics-container">
      <div className="metrics-card">
        <h3>Top Products</h3>
        <div className="space-y-4">
          {[
            "Premium Wireless Headphones",
            "Smart Watch Pro",
            "Ultra HD Camera",
          ].map((product, index) => (
            <div key={index} className="metrics-item">
              <span>{product}</span>
              <span className="sales-count">
                {Math.round(Math.random() * 100)} sales
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="metrics-card">
        <h3>Customer Satisfaction</h3>
        <div className="satisfaction-container">
          <div className="satisfaction-content">
            <p className="rating">4.8</p>
            <p className="rating-description">Average Rating</p>
            <div className="star-rating">
              {"★".repeat(4)}
              {"☆".repeat(1)}
            </div>
          </div>
        </div>
      </div>
      <div className="metrics-card">
        <h3>Recent Activity</h3>
        <div className="activity-container">
          {[
            "New order #1234",
            "Customer feedback received",
            "Product stock updated",
          ].map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-dot"></div>
              <span className="activity-text">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdditionalMetrics;
