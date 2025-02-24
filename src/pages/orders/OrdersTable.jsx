import React from "react";
import { Eye, RefreshCcw, DollarSign, Ban } from "lucide-react";
import "./OrdersTable.css";

const OrderTable = ({
  paginatedOrders,
  getStatusBadgeColor,
  setSelectedOrder,
  setShowOrderModal,
  setShowStatusModal,
  setShowRefundModal,
  setShowCancelModal,
  setRefundAmount,
}) => {
  return (
    <div className="order-table-container">
      <div className="order-table-scroll">
        <table className="order-table">
          <thead className="order-table-header">
            <tr>
              <th className="header-cell">Order ID</th>
              <th className="header-cell">Date</th>
              <th className="header-cell">Customer</th>
              <th className="header-cell">Status</th>
              <th className="header-cell">Total</th>
              <th className="header-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="order-table-body">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="order-row">
                <td className="order-cell">{order.id}</td>
                <td className="order-cell">
                  <div>{order.createdAt.toLocaleDateString()}</div>
                  <div className="order-time">
                    {order.createdAt.toLocaleTimeString()}
                  </div>
                </td>
                <td className="order-cell">
                  <div>{order.userId}</div>
                  <div className="order-items">
                    {order.products.length} items
                  </div>
                </td>
                <td className="order-cell">
                  <span
                    className={`status-badge ${getStatusBadgeColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="order-cell">${order.totalAmount.toFixed(2)}</td>
                <td className="order-cell action-buttons">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderModal(true);
                    }}
                    className="action-button"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowStatusModal(true);
                    }}
                    className="action-button"
                    title="Update Status"
                    disabled={order.status === "cancelled"}
                  >
                    <RefreshCcw size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setRefundAmount(order.totalAmount);
                      setShowRefundModal(true);
                    }}
                    className="action-button"
                    title="Process Refund"
                    disabled={order.status === "cancelled"}
                  >
                    <DollarSign size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowCancelModal(true);
                    }}
                    className="action-button cancel-button"
                    title="Cancel Order"
                    disabled={
                      order.status === "cancelled" ||
                      order.status === "delivered"
                    }
                  >
                    <Ban size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
