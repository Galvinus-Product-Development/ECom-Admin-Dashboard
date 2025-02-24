import React from "react";
import { Bell, AlertTriangle, Settings } from "lucide-react";
import "./summaryCards.css";

function SummaryCards({ notifications, unreadCount }) {
  return (
    <div className="summary-cards-container">
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">Total Notifications</p>
            <p className="summary-card-value" style={{ color: '#1f2937' }}>
              {notifications.length}
            </p>
          </div>
          <Bell className="summary-card-icon" size={24} style={{ color: '#3B82F6' }}/>
        </div>
      </div>
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">Unread</p>
            <p className="summary-card-value" style={{ color: '#F59E0B' }}>{unreadCount}</p>
          </div>
          <AlertTriangle className="summary-card-icon" style={{ color: '#FACC15' }} size={24} />
        </div>
      </div>
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">High Priority</p>
            <p className="summary-card-value" style={{ color: '#DC2626' }}>
              {notifications.filter((n) => n.priority === "high").length}
            </p>
          </div>
          <AlertTriangle className="summary-card-icon" style={{ color: '#F87171' }} size={24} />
        </div>
      </div>
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">System Alerts</p>
            <p className="summary-card-value" style={{ color: '#6B21A8' }}>
              {notifications.filter((n) => n.category === "system").length}
            </p>
          </div>
          <Settings className="summary-card-icon" style={{ color: '#8B5CF6' }} size={24} />
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
