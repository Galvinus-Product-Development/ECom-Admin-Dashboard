import React from "react";
import "./OrderDetailsModal.css";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Order Details</h2>
        <ul className="modal-details">
          <li><strong>Order ID:</strong> {order.id}</li>
          <li><strong>Date:</strong> {order.createdAt.toLocaleDateString()}</li>
          <li><strong>Status:</strong> {order.status}</li>
          <li><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</li>
          <li>
            <strong>Products:</strong>
            <ul className="modal-products">
              {order.products.map((product, index) => (
                <li key={index} className="modal-product">
                  Product ID: {product.productId}, Quantity: {product.quantity}, Price: ${product.price}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
