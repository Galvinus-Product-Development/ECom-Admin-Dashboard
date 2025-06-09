import { CreditCard, DollarSign, Receipt } from "lucide-react";
import { useState } from "react";
import FiltersAndSearch from "./FiltersAndSearch";
import Pagination from "./Pagination";
import PaymentDetailsModal from "./PaymentDetailsModal";
import "./PaymentManagement.css";
import PaymentsTable from "./PaymentsTable";
import PaymentSummaryCards from "./PaymentSummaryCards";
import RefundModal from "./RefundModal";

const generateMockPayments = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `PAY-${String(index + 1).padStart(3, "0")}`,
    orderId: `ORD-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
    amount: Math.floor(Math.random() * 1000) + 100,
    status: ["completed", "pending", "failed", "refunded"][
      Math.floor(Math.random() * 4)
    ],
    method: ["credit_card", "debit_card", "bank_transfer", "wallet"][
      Math.floor(Math.random() * 4)
    ],
    customerName: `Customer ${index + 1}`,
    customerEmail: `customer${index + 1}@example.com`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    currency: "USD",
  }));
};

const mockPayments = generateMockPayments(200);
console.log("Generated mockPayments count:", mockPayments.length);

const ITEMS_PER_PAGE = 5;

const PaymentManagement = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundReason, setRefundReason] = useState("");
  console.log("Payments state count:", payments.length);


  const getFilteredAndSortedPayments = () => {
    let filtered = payments.filter((payment) => {
      const matchesFilter = filter === "all" || payment.status === filter;
      const matchesSearch =
        payment.customerName.toLowerCase().includes(search.toLowerCase()) ||
        payment.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(search.toLowerCase());

      let matchesDate = true;
      if (dateRange.start && dateRange.end) {
        const paymentDate = new Date(payment.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        matchesDate = paymentDate >= startDate && paymentDate <= endDate;
      }
      return matchesFilter && matchesSearch && matchesDate;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = a.date.getTime() - b.date.getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const handleRefund = () => {
    if (!selectedPayment || !refundAmount || !refundReason) return;

    const updatedPayments = payments.map((payment) =>
      payment.id === selectedPayment.id
        ? {
            ...payment,
            status: "refunded",
            refundReason,
            amount: payment.amount - refundAmount,
          }
        : payment
    );

    setPayments(updatedPayments);
    setShowRefundModal(false);
    setSelectedPayment(null);
    setRefundAmount(0);
    setRefundReason("");
  };

  const filteredPayments = getFilteredAndSortedPayments();
  console.log("Filtered Payments count:", filteredPayments.length);

  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  console.log("Total pages:", totalPages);

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  console.log("Paginated Payments (this page):", paginatedPayments.length);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "status-badge status-completed";
      case "pending":
        return "status-badge status-pending";
      case "failed":
        return "status-badge status-failed";
      case "refunded":
        return "status-badge status-refunded";
      default:
        return "status-badge status-default";
    }
  };
  

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return <CreditCard size={16} />;
      case "bank_transfer":
        return <Receipt size={16} />;
      case "wallet":
        return <DollarSign size={16} />;
      default:
        return <DollarSign size={16} />;
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalRefunds = payments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payment-management">
      {/* <Header /> */}
      <div className=".payment-header">
        <h1 className="payment-title">Payment Management</h1>
        <p className="payment-subtitle">
          Track and manage payment transactions
        </p>
      </div>
      <PaymentSummaryCards
        totalRevenue={totalRevenue}
        pendingAmount={pendingAmount}
        totalRefunds={totalRefunds}
        payments={payments}
        formatCurrency={formatCurrency}
      />
      <FiltersAndSearch
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <PaymentsTable
        paginatedPayments={paginatedPayments}
        filteredPayments={filteredPayments}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        setSelectedPayment={setSelectedPayment}
        setShowRefundModal={setShowRefundModal}
        formatCurrency={formatCurrency}
        getPaymentMethodIcon={getPaymentMethodIcon}
        getStatusBadgeColor={getStatusBadgeColor}
        setRefundAmount={setRefundAmount}
        setShowDetailsModal={setShowDetailsModal}
      />
      <Pagination
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        filteredPayments={filteredPayments}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <RefundModal
        showRefundModal={showRefundModal}
        selectedPayment={selectedPayment}
        setShowRefundModal={setShowRefundModal}
        setSelectedPayment={setSelectedPayment}
        refundAmount={refundAmount}
        setRefundAmount={setRefundAmount}
        refundReason={refundReason}
        setRefundReason={setRefundReason}
        handleRefund={handleRefund}
      />
      <PaymentDetailsModal
        showDetailsModal={showDetailsModal}
        selectedPayment={selectedPayment}
        setShowDetailsModal={setShowDetailsModal}
        setSelectedPayment={setSelectedPayment}
        formatCurrency={formatCurrency}
        getPaymentMethodIcon={getPaymentMethodIcon}
        getStatusBadgeColor={getStatusBadgeColor}
      />
    </div>
  );
};

export default PaymentManagement;
