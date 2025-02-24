import React from "react";
import { X, AlertTriangle } from "lucide-react";
import "./CancelOrderModal.css"
const CancelOrderModal = ({
  showCancelModal,
  selectedOrder,
  setShowCancelModal,
  setSelectedOrder,
  cancelReason,
  setCancelReason,
  handleCancelOrder,
}) => {
  return (
    showCancelModal && selectedOrder && (
      <div className="cancel-modal-overlay">
        <div className="cancel-modal-content">
          <div className="cancel-modal-header">
            <h2 className="cancel-modal-title">Cancel Order</h2>
            <button
              onClick={() => {
                setShowCancelModal(false);
                setSelectedOrder(null);
                setCancelReason('');
              }}
              className="close-button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="cancel-modal-body">
            <div className="alert-container">
              <AlertTriangle size={20} />
              <p className="alert-text">This action cannot be undone.</p>
            </div>
            <div className="cancel-reason-container">
              <label className="cancel-reason-label">Reason for Cancellation</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="cancel-reason-textarea"
                placeholder="Enter reason for cancellation..."
              />
            </div>
          </div>
          <div className="cancel-modal-footer">
            <button
              onClick={() => {
                setShowCancelModal(false);
                setSelectedOrder(null);
                setCancelReason('');
              }}
              className="go-back-button"
            >
              Go Back
            </button>
            <button
              onClick={handleCancelOrder}
              disabled={!cancelReason}
              className="cancel-order-button"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CancelOrderModal;
