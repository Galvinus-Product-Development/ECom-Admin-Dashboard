import { X } from 'lucide-react';
import './ViewDetailsModal.css';

const ViewDetailsModal = ({ showOrderModal, selectedOrder, setShowOrderModal, setSelectedOrder, getStatusBadgeColor }) => {
  if (!showOrderModal || !selectedOrder) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Order Details - {selectedOrder.id}</h2>
          <button
            onClick={() => {
              setShowOrderModal(false);
              setSelectedOrder(null);
            }}
            className="modal-close-button"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="order-info-grid">
            <div>
              <p className="label">Customer ID</p>
              <p className="value">{selectedOrder.userId}</p>
            </div>
            <div>
              <p className="label">Order Date</p>
              <p className="value">{selectedOrder.createdAt.toLocaleString()}</p>
            </div>
            {/* <div>
              <p className="label">Status</p>
              <span className={`status-badge ${getStatusBadgeColor(selectedOrder.status)}`}>
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </span>
            </div> */}
            <div>
              <p className="label">Total Amount</p>
              <p className="value">${selectedOrder.totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <h3 className="order-items-title">Order Items</h3>
            <div className="order-items-container">
              {selectedOrder.products.map((product, index) => (
                <div key={index} className="order-item">
                  <div>
                    <p className="order-item-id">Product ID: {product.productId}</p>
                    <p className="order-item-quantity">Quantity: {product.quantity}</p>
                    <span className={`status-badge ${getStatusBadgeColor(product.status)}`}>
        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
      </span>
                  </div>
                  <p className="order-item-price">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              setShowOrderModal(false);
              setSelectedOrder(null);
            }}
            className="modal-close-button-footer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
