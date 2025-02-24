import React from "react";
import { X } from "lucide-react";
import "./ActivityModel.css";

const ActivityModal = ({ showActivityModal, setShowActivityModal, selectedUser, setSelectedUser, userActivity ,handleViewActivity}) => {
  if (!showActivityModal || !selectedUser) return null;

  const handleClose = () => {
    setShowActivityModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="activity-modal-overlay">
      <div className="activity-modal-container">
        <div className="activity-modal-header">
          <h2 className="activity-modal-title">User Activity - {selectedUser.name}</h2>
          <button className="activity-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="activity-list">
          {userActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-content">
                <div>
                  <h3 className="activity-action">{activity.action}</h3>
                  <p className="activity-details">{activity.details}</p>
                </div>
                <span className="activity-timestamp">{activity.timestamp.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="activity-modal-footer">
          <button className="activity-close-btn-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
