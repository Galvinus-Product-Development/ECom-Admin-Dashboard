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
  <h3 className="status-update-title">Update Status Per Product</h3>
  {selectedOrder.products.map((product, index) => (
    <div key={index} className="product-status-section">
      <p className="product-id">Product ID: {product.productId}</p>
      <span className={`status-badge ${getStatusBadgeColor(product.status)}`}>
        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
      </span>
      <div className="status-buttons">
        {["pending", "shipped", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => handleUpdateStatus(selectedOrder.id, product.productId, status)}
            disabled={status === product.status}
            className={`status-button ${
              status === product.status ? "disabled-button" : "hover-button"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  ))}
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
