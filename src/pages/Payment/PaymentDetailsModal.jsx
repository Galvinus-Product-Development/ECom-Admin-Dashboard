import { X } from 'lucide-react';
import './PaymentDetailsModal.css';

const PaymentDetailsModal = ({  
  showDetailsModal,  
  selectedPayment,  
  setShowDetailsModal,  
  setSelectedPayment,  
  formatCurrency,  
  getPaymentMethodIcon,  
  getStatusBadgeColor  
}) => {  
  return (  
    showDetailsModal && selectedPayment && (  
      <div className="payment-details-modal-overlay">  
        <div className="payment-details-modal-container">  
          <div className="payment-details-modal-header">  
            <h2 className="payment-details-modal-title">Payment Details</h2>  
            <button  
              onClick={() => {  
                setShowDetailsModal(false);  
                setSelectedPayment(null);  
              }}  
              className="payment-details-modal-close-btn"  
            >  
              <X size={20} />  
            </button>  
          </div>  
          <div className="payment-details-modal-grid">  
            <div>  
              <h3 className="payment-details-modal-label">Payment ID</h3>  
              <p className="payment-details-modal-text">{selectedPayment.id}</p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Order ID</h3>  
              <p className="payment-details-modal-text">{selectedPayment.orderId}</p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Customer Name</h3>  
              <p className="payment-details-modal-text">{selectedPayment.customerName}</p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Customer Email</h3>  
              <p className="payment-details-modal-text">{selectedPayment.customerEmail}</p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Amount</h3>  
              <p className="payment-details-modal-text">{formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Payment Method</h3>  
              <p className="payment-details-modal-method">  
                {getPaymentMethodIcon(selectedPayment.method)}  
                {selectedPayment.method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}  
              </p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Date</h3>  
              <p className="payment-details-modal-text">{selectedPayment.date.toLocaleString()}</p>  
            </div>  
            <div>  
              <h3 className="payment-details-modal-label">Status</h3>  
              <span className={`payment-details-modal-status ${getStatusBadgeColor(selectedPayment.status)}`}>  
                {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}  
              </span>  
            </div>  
            {selectedPayment.refundReason && (  
              <div className="payment-details-modal-refund-reason">  
                <h3 className="payment-details-modal-label">Refund Reason</h3>  
                <p className="payment-details-modal-text">{selectedPayment.refundReason}</p>  
              </div>  
            )}  
            {/* Intentional Error: Accessing a property that may not exist */}  
           {/*  <>  
              <h3 className="payment-details-modal-label">Non-existent Property</h3>  
              <p className="payment-details-modal-text">{selectedPayment.nonExistentProperty}</p> {/* This line introduces the error */}  
            
          </div>  
          <div className="payment-details-modal-footer">  
            <button  
              onClick={() => {  
                setShowDetailsModal(false);  
                setSelectedPayment(null);  
              }}  
              className="payment-details-modal-close-btn-footer"  
            >  
              Close  
            </button>  
          </div>  
        </div>  
      </div>  
    )  
  );  
};  

export default PaymentDetailsModal; 
