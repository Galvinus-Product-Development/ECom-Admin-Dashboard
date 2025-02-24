import React from 'react';
import { X } from 'lucide-react';
import './NotificationDetailsModal.css';

const NotificationDetailsModal = ({ 
  showNotificationModal, 
  selectedNotification, 
  setShowNotificationModal, 
  setSelectedNotification, 
  getTypeBadgeColor, 
  getTypeIcon, 
  getCategoryIcon, 
  getPriorityBadgeColor, 
  markAsRead 
}) => {
  return (
    showNotificationModal && selectedNotification && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">Notification Details</h2>
            <button
              onClick={() => {
                setShowNotificationModal(false);
                setSelectedNotification(null);
              }}
              className="modal-close-button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="modal-content">
            <div className="notification-info">
              <div className={`notification-icon ${getTypeBadgeColor(selectedNotification.type)}`}>
                {getTypeIcon(selectedNotification.type)}
              </div>
              <div>
                <h3 className="notification-title">{selectedNotification.title}</h3>
                <p className="notification-message">{selectedNotification.message}</p>
              </div>
            </div>
            <div className="notification-details">
              <div>
                <p className="detail-title">Category</p>
                <div className="detail-content">
                  {getCategoryIcon(selectedNotification.category)}
                  <span className="capitalize">{selectedNotification.category}</span>
                </div>
              </div>
              <div>
                <p className="detail-title">Priority</p>
                <span className={`priority-badge ${getPriorityBadgeColor(selectedNotification.priority)}`}>
                  {selectedNotification.priority} priority
                </span>
              </div>
              <div>
                <p className="detail-title">Status</p>
                <span className={`status-badge ${
                  selectedNotification.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedNotification.status}
                </span>
              </div>
              <div>
                <p className="detail-title">Created At</p>
                <p className="detail-content">{selectedNotification.createdAt.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="detail-title">Recipient</p>
                <p className="detail-content">{selectedNotification.recipient}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {selectedNotification.status === 'unread' && (
              <button
                onClick={() => {
                  markAsRead(selectedNotification.id);
                  setShowNotificationModal(false);
                  setSelectedNotification(null);
                }}
                className="mark-read-button"
              >
                Mark as Read
              </button>
            )}
            <button
              onClick={() => {
                setShowNotificationModal(false);
                setSelectedNotification(null);
              }}
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationDetailsModal;
