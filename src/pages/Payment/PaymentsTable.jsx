import { ArrowUpDown } from 'lucide-react';
import './PaymentsTable.css';

const PaymentsTable = ({
  paginatedPayments,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  getPaymentMethodIcon,
  formatCurrency,
  getStatusBadgeColor,
  setSelectedPayment,
  setShowRefundModal,
  setShowDetailsModal
}) => {
  return (
    <div className="payments-table-container">
      <div className="overflow-x-auto">
        <table className="payments-table">
          <thead className="payments-table-header">
            <tr>
              <th className="payments-table-header-cell">
                <button
                  className="payments-table-sort-btn" 
                  onClick={() => {
                    if (sortBy === 'date') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('date');
                      setSortOrder('desc');
                    }
                  }}
                >
                  Date & Time
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="payments-table-header-cell" >Payment Details</th>
              <th className="payments-table-header-cell"  >Customer</th>
              <th className="payments-table-header-cell"  >
                <button
                  className="payments-table-sort-btn"
                  onClick={() => {
                    if (sortBy === 'amount') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('amount');
                      setSortOrder('desc');
                    }
                  }}
                >
                  Amount
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="payments-table-header-cell">
                <button
                  className="payments-table-sort-btn"
                  onClick={() => {
                    if (sortBy === 'status') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('status');
                      setSortOrder('asc');
                    }
                  }}
                >
                  Status
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="payments-table-header-cell" >Actions</th>
            </tr>
          </thead>
          <tbody className="payments-table-body">
            {paginatedPayments.map((payment) => (
              <tr key={payment.id} className="payments-table-row">
                <td className="payments-table-cell" data-label="Date & Time">
                  <div className="payments-table-text">{payment.date.toLocaleDateString()}</div>
                  <div className="payments-table-text-muted">{payment.date.toLocaleTimeString()}</div>
                </td>
                <td className="payments-table-cell" data-label="Payment Details">
                  <div className="payments-table-flex">
                    <div className="payments-table-icon">{getPaymentMethodIcon(payment.method)}</div>
                    <div>
                      <div className="payments-table-text">{payment.id}</div>
                      <div className="payments-table-text-muted">Order: {payment.orderId}</div>
                    </div>
                  </div>
                </td>
                <td className="payments-table-cell" data-label="Customer">
                  <div className="payments-table-text">{payment.customerName}</div>
                  <div className="payments-table-text-muted">{payment.customerEmail}</div>
                </td>
                <td className="payments-table-cell text-sm font-medium" data-label="Amount">
                  {formatCurrency(payment.amount, payment.currency)}
                </td>
                <td className="payments-table-cell"  data-label="Status">
                  <span className={`payments-table-status ${getStatusBadgeColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="payments-table-cell" data-label="Actions">
                  <div className="payments-table-actions">
                    <button
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowRefundModal(true);
                      }}
                      className="payments-table-action-btn refund-btn"
                      disabled={payment.status !== 'completed'}
                    >
                      Refund
                    </button>
                    <button
                      onClick={() => {
                        console.log('Details clicked:', payment);

                        setSelectedPayment(payment);
                        setShowDetailsModal(true);
                      }}
                      className="payments-table-action-btn details-btn"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;
