import React, { useState } from "react";
import {
  Bell,
  Search,
  Filter,
  Trash2,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  MessageSquare,
  Settings,
  Mail,
} from "lucide-react";
import SummaryCards from "./SummaryCards";
import FiltersAndSearch from "./FiltersAndSearch";
import NotificationsList from "./NotificationsList";
import Pagination from "./Pagination";
import NotificationDetailsModal from "./NotificationDetailsModal";
import "./NotificationManagement.css";

// Generate more mock notifications for pagination
const generateMockNotifications = (count) => {
  const types = ["info", "success", "warning", "error"];
  const categories = ["system", "order", "user", "security"];
  const priorities = ["low", "medium", "high"];

  return Array.from({ length: count }, (_, index) => ({
    id: `notif-${index + 1}`,
    title: `Notification ${index + 1}`,
    message: `This is a sample notification message ${index + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: Math.random() > 0.5 ? "read" : "unread",
    recipient: Math.random() > 0.7 ? "admin@example.com" : "all",
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    category: categories[Math.floor(Math.random() * categories.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  }));
};

const ITEMS_PER_PAGE = 5;
const mockNotifications = generateMockNotifications(50);

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const getFilteredNotifications = () => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.message.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filter === "all" || notification.status === filter;
      const matchesCategory =
        categoryFilter === "all" || notification.category === categoryFilter;
      const matchesPriority =
        priorityFilter === "all" || notification.priority === priorityFilter;

      return (
        matchesSearch && matchesStatus && matchesCategory && matchesPriority
      );
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "info":
        return <Info size={16} className="text-blue-500" />;
      case "success":
        return <CheckCircle size={16} className="text-green-500" />;
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case "error":
        return <X size={16} className="text-red-500" />;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "info":
        return "badge type-info";
      case "success":
        return "badge type-success";
      case "warning":
        return "badge type-warning";
      case "error":
        return "badge type-error";
      default:
        return "badge";
    }
  };
  
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "low":
        return "p-badge priority-low";
      case "medium":
        return "p-badge priority-medium";
      case "high":
        return "p-badge priority-high";
      default:
        return "p-badge";
    }
  };
  

  const getCategoryIcon = (category) => {
    switch (category) {
      case "system":
        return <Settings size={16} />;
      case "order":
        return <MessageSquare size={16} />;
      case "user":
        return <Mail size={16} />;
      case "security":
        return <AlertTriangle size={16} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const filteredNotifications = getFilteredNotifications();
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h1 className="notification-title">Notification Management</h1>
        <p className="notification-description">
          Manage and monitor system notifications
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards notifications={notifications} unreadCount={unreadCount} />

      {/* Filters and Search */}
      <FiltersAndSearch
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Notifications List */}
      <NotificationsList
        paginatedNotifications={paginatedNotifications}
        setSelectedNotification={setSelectedNotification}
        setShowNotificationModal={setShowNotificationModal}
        markAsRead={markAsRead}
        deleteNotification={deleteNotification}
        getTypeBadgeColor={getTypeBadgeColor}
        getTypeIcon={getTypeIcon}
        getCategoryIcon={getCategoryIcon}
        getPriorityBadgeColor={getPriorityBadgeColor}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        filteredNotifications={filteredNotifications}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        handlePageChange={handlePageChange}
      />

      <NotificationDetailsModal
        showNotificationModal={showNotificationModal}
        selectedNotification={selectedNotification}
        setShowNotificationModal={setShowNotificationModal} 
        setSelectedNotification={setSelectedNotification}
        getTypeBadgeColor={getTypeBadgeColor}
        getTypeIcon={getTypeIcon}
        getCategoryIcon={getCategoryIcon} 
        getPriorityBadgeColor={getPriorityBadgeColor} 
        markAsRead={markAsRead}
      />
    </div>
  );
};

export default NotificationManagement;
