import React from 'react';
import { X } from 'lucide-react';
import './RefundModal.css';

const RefundModal = ({ showRefundModal, selectedPayment, setShowRefundModal, setSelectedPayment, refundAmount, setRefundAmount, refundReason, setRefundReason, handleRefund }) => {
  return (
    showRefundModal && selectedPayment && (
      <div className="refund-modal-overlay">
        <div className="refund-modal-container">
          <div className="refund-modal-header">
            <h2 className="refund-modal-title">Process Refund</h2>
            <button
              onClick={() => {
                setShowRefundModal(false);
                setSelectedPayment(null);
                setRefundAmount(0);
                setRefundReason('');
              }}
              className="refund-modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
          <div className="refund-modal-content">
            <div>
              <label className="refund-modal-label">Refund Amount</label>
              <div className="refund-modal-input-wrapper">
                <div className="refund-modal-input-prefix">
                  <span className="refund-modal-currency">$</span>
                </div>
                <input
                  type="number"
                  max={selectedPayment.amount}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  className="refund-modal-input"
                />
              </div>
            </div>
            <div>
              <label className="refund-modal-label">Reason for Refund</label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
                className="refund-modal-textarea"
                placeholder="Enter reason for refund..."
              />
            </div>
          </div>
          <div className="refund-modal-footer">
            <button
              onClick={() => {
                setShowRefundModal(false);
                setSelectedPayment(null);
                setRefundAmount(0);
                setRefundReason('');
              }}
              className="refund-modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleRefund}
              disabled={!refundAmount || !refundReason}
              className="refund-modal-process-btn"
            >
              Process Refund
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RefundModal;
