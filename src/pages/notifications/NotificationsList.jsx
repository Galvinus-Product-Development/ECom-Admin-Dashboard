import React from "react";
import { Eye, CheckCircle, Trash2, Bell } from "lucide-react";
import "./NotificationsList.css";

const NotificationList = ({
  paginatedNotifications,
  setSelectedNotification,
  setShowNotificationModal,
  markAsRead,
  deleteNotification,
  getTypeBadgeColor,
  getTypeIcon,
  getCategoryIcon,
  getPriorityBadgeColor,
}) => {
  return (
    <div className="notification-list-contairne">
      <div className="notification-list">
        {paginatedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${
              notification.status === "unread" ? "notification-item-unread" : ""
            }`}
          >
            <div className="notification-item-content">
              <div className="notification-item-header">
                <div className="notification-item-icon">
                  <div
                    className={`badge ${getTypeBadgeColor(notification.type)}`}
                  >
                    {getTypeIcon(notification.type)}
                  </div>
                </div>
                <div>
                  <h3 className="notification-title">{notification.title}</h3>
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-meta">
                    <div className="category-info">
                      {getCategoryIcon(notification.category)}
                      <span>{notification.category}</span>
                    </div>
                    <span
                      className={`priority-badge ${getPriorityBadgeColor(
                        notification.priority
                      )}`}
                    >
                      {notification.priority} priority
                    </span>
                    <span className="notification-time">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="notification-item-actions">
                <button
                  onClick={() => {
                    setSelectedNotification(notification);
                    setShowNotificationModal(true);
                  }}
                  className="action-button view-details"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                {notification.status === "unread" && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="action-button mark-read"
                    title="Mark as Read"
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="action-button delete"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {paginatedNotifications.length === 0 && (
        <div className="empty-state">
          <Bell className="empty-state-icon" />
          <h3 className="empty-state-title">No notifications</h3>
          <p className="empty-state-message">
            No notifications match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
