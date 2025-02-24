import React from "react";
import { X } from "lucide-react";
import "./ProcessRefundModal.css";

const ProcessRefundModal = ({
  showRefundModal,
  selectedOrder,
  setShowRefundModal,
  setSelectedOrder,
  refundAmount,
  setRefundAmount,
  refundReason,
  setRefundReason,
  handleRefund,
}) => {
  return (
    showRefundModal && selectedOrder && (
      <div className="refund-modal-overlay">
        <div className="refund-modal-content">
          <div className="refund-modal-header">
            <h2 className="refund-modal-title">Process Refund</h2>
            <button
              onClick={() => {
                setShowRefundModal(false);
                setSelectedOrder(null);
                setRefundAmount(0);
                setRefundReason('');
              }}
              className="close-button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="refund-modal-body">
            <div className="refund-amount-container">
              <label className="refund-label">Refund Amount</label>
              <div className="input-container">
                <div className="currency-sign">
                  <span className="currency-symbol">$</span>
                </div>
                <input
                  type="number"
                  max={selectedOrder.totalAmount}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  className="refund-input"
                />
              </div>
            </div>
            <div className="refund-reason-container">
              <label className="refund-label">Reason for Refund</label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
                className="refund-textarea"
                placeholder="Enter reason for refund..."
              />
            </div>
          </div>
          <div className="refund-modal-footer">
            <button
              onClick={() => {
                setShowRefundModal(false);
                setSelectedOrder(null);
                setRefundAmount(0);
                setRefundReason('');
              }}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={handleRefund}
              disabled={!refundAmount || !refundReason}
              className="process-refund-button"
            >
              Process Refund
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProcessRefundModal;
