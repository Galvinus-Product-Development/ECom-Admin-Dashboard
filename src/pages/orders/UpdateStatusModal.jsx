import React from "react";
import { X } from "lucide-react";
import "./UpdateStatusModal.css";

const UpdateStatusModal = ({
  showStatusModal,
  selectedOrder,
  setShowStatusModal,
  setSelectedOrder,
  getStatusBadgeColor,
  handleUpdateStatus,
}) => {
  return (
    showStatusModal && selectedOrder && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Update Order Status</h2>
            <button
              onClick={() => {
                setShowStatusModal(false);
                setSelectedOrder(null);
              }}
              className="close-button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="current-status">
              <p className="status-label">Current Status</p>
              <span
                className={`status-badge ${getStatusBadgeColor(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status.charAt(0).toUpperCase() +
                  selectedOrder.status.slice(1)}
              </span>
            </div>
            <div className="new-status">
              <p className="status-label">New Status</p>
              <div className="status-buttons">
                {["pending", "shipped", "delivered"].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      handleUpdateStatus(selectedOrder, status)
                    }
                    disabled={status === selectedOrder.status}
                    className={`status-button ${
                      status === selectedOrder.status
                        ? "disabled-button"
                        : "hover-button"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                setShowStatusModal(false);
                setSelectedOrder(null);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateStatusModal;
