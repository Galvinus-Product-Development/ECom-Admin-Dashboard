import { ArrowUpCircle, ArrowDownCircle, CreditCard, AlertCircle } from 'lucide-react';
import './PaymentSummaryCards.css';

const PaymentSummaryCards = ({ totalRevenue, pendingAmount, totalRefunds, payments, formatCurrency }) => (
  <div className="grid md:grid-cols-4 gap-4 mb-6">
    {/* Total Revenue */}
    <div className="card card-total-revenue">
      <div className="card-header">
        <div>
          <p className="title">Total Revenue</p>
          <p className="value">{formatCurrency(totalRevenue, 'USD')}</p>
        </div>
        <ArrowUpCircle className="icon text-green-500" />
      </div>
    </div>

    {/* Pending Payments */}
    <div className="card card-pending-payments">
      <div className="card-header">
        <div>
          <p className="title">Pending Payments</p>
          <p className="value">{formatCurrency(pendingAmount, 'USD')}</p>
        </div>
        <AlertCircle className="icon text-yellow-500" />
      </div>
    </div>

    {/* Total Refunds */}
    <div className="card card-total-refunds">
      <div className="card-header">
        <div>
          <p className="title">Total Refunds</p>
          <p className="value">{formatCurrency(totalRefunds, 'USD')}</p>
        </div>
        <ArrowDownCircle className="icon text-red-500" />
      </div>
    </div>

    {/* Success Rate */}
    <div className="card card-success-rate">
      <div className="card-header">
        <div>
          <p className="title">Success Rate</p>
          <p className="value">
            {Math.round((payments.filter(p => p.status === 'completed').length / payments.length) * 100)}%
          </p>
        </div>
        <CreditCard className="icon text-blue-500" />
      </div>
    </div>
  </div>
);

export default PaymentSummaryCards;
