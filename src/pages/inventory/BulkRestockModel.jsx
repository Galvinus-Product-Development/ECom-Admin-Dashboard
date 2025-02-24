import React from "react";
import { X } from "lucide-react";
import "./BulkRestockModel.css";

const BulkRestockModal = ({
  showRestockModal,
  setShowRestockModal,
  selectedItems,
  restockQuantity,
  setRestockQuantity,
  handleBulkRestock,
}) => {
  if (!showRestockModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Bulk Restock</h2>
          <button
            onClick={() => {
              setShowRestockModal(false);
              setRestockQuantity(0);
            }}
            className="close-button"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-text">
            Restocking {selectedItems.length} item
            {selectedItems.length > 1 ? "s" : ""}
          </p>
          <label className="modal-label">Restock Quantity</label>
          <input
            type="number"
            min="1"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(parseInt(e.target.value))}
            className="modal-input"
            required
          />
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              setShowRestockModal(false);
              setRestockQuantity(0);
            }}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handleBulkRestock}
            disabled={restockQuantity <= 0}
            className="confirm-button"
          >
            Confirm Restock
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkRestockModal;
