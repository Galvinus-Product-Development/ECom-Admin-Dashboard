import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  RefreshCcw,
  Ban,
  DollarSign,
  X,
  AlertTriangle,
} from "lucide-react";
import Filters from "./Filters";
import OrdersTable from "./OrdersTable";
import OrderSummary from "./OrderSummary";
import OrderDetailsModal from "./OrderDetailsModal";
import Pagination from "./Pagination";
import ViewDetailsModal from "./ViewDetailsModal";
import UpdateStatusModal from "./UpdateStatusModal";
import ProcessRefundModal from "./ProcessRefundModal";
import CancelOrderModal from "./CancelOrderModal";
import "./OrderManagement.css";

// Generate more mock orders for pagination
const generateMockOrders = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `ORD-${String(index + 1).padStart(3, "0")}`,
    userId: `USR-${String(Math.floor(Math.random() * 20) + 1).padStart(
      3,
      "0"
    )}`,
    products: [
      {
        productId: String(Math.floor(Math.random() * 5) + 1),
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.floor(Math.random() * 500) + 50,
      },
      {
        productId: String(Math.floor(Math.random() * 5) + 1),
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.floor(Math.random() * 500) + 50,
      },
    ],
    status: ["pending", "shipped", "delivered", "cancelled"][
      Math.floor(Math.random() * 4)
    ],
    totalAmount: 0,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }));
};

const mockOrders = generateMockOrders(50).map((order) => ({
  ...order,
  totalAmount: order.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  ),
}));

const ITEMS_PER_PAGE = 4;

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundReason, setRefundReason] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());

    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const orderDate = new Date(order.createdAt);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = orderDate >= startDate && orderDate <= endDate;
    }

    return matchesFilter && matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "status-badge status-pending";
      case "shipped":
        return "status-badge status-shipped";
      case "delivered":
        return "status-badge status-delivered";
      case "cancelled":
        return "status-badge status-cancelled";
      default:
        return "status-badge status-default";
    }
  };
  

  const handleUpdateStatus = (order, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    setShowStatusModal(false);
    setSelectedOrder(null);
  };

  const handleRefund = () => {
    if (!selectedOrder || !refundAmount || !refundReason) return;
    const updatedOrders = orders.map((o) =>
      o.id === selectedOrder.id ? { ...o, status: "cancelled" } : o
    );
    setOrders(updatedOrders);
    setShowRefundModal(false);
    setSelectedOrder(null);
    setRefundAmount(0);
    setRefundReason("");
  };

  const handleCancelOrder = () => {
    if (!selectedOrder || !cancelReason) return;
    const updatedOrders = orders.map((o) =>
      o.id === selectedOrder.id ? { ...o, status: "cancelled" } : o
    );
    setOrders(updatedOrders);
    setShowCancelModal(false);
    setSelectedOrder(null);
    setCancelReason("");
  };
  return (
    <div className="order-management">
      <h1 className="order-management__title">Order Management</h1>
      <Filters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <OrderSummary orders={filteredOrders} />
      <OrdersTable
        paginatedOrders={paginatedOrders}
        getStatusBadgeColor={getStatusBadgeColor}
        setSelectedOrder={setSelectedOrder}
        setShowOrderModal={setShowOrderModal}
        setShowStatusModal={setShowStatusModal}
        setShowRefundModal={setShowRefundModal}
        setShowCancelModal={setShowCancelModal}
        setRefundAmount={setRefundAmount}
      />
      <Pagination
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        filteredOrders={filteredOrders}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <ViewDetailsModal
        showOrderModal={showOrderModal}
        selectedOrder={selectedOrder}
        setShowOrderModal={setShowOrderModal}
        setSelectedOrder={setSelectedOrder}
        getStatusBadgeColor={getStatusBadgeColor}
      />
      <UpdateStatusModal
        showStatusModal={showStatusModal}
        selectedOrder={selectedOrder}
        setShowStatusModal={setShowStatusModal}
        setSelectedOrder={setSelectedOrder}
        getStatusBadgeColor={getStatusBadgeColor}
        handleUpdateStatus={handleUpdateStatus}
      />

      <ProcessRefundModal
        showRefundModal={showRefundModal}
        selectedOrder={selectedOrder}
        setShowRefundModal={setShowRefundModal}
        setSelectedOrder={setSelectedOrder}
        refundAmount={refundAmount}
        setRefundAmount={setRefundAmount}
        refundReason={refundReason}
        setRefundReason={setRefundReason}
        handleRefund={handleRefund}
      />
      <CancelOrderModal
        showCancelModal={showCancelModal}
        selectedOrder={selectedOrder}
        setShowCancelModal={setShowCancelModal}
        setSelectedOrder={setSelectedOrder}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        handleCancelOrder={handleCancelOrder}
      />
    </div>
  );
};

export default OrderManagement;
