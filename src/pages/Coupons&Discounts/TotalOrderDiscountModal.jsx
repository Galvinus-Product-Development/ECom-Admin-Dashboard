import "./TotalOrderDiscount.css";

const TotalOrderDiscountModal = ({ onClose }) => {
  return (
    <div className="total-order-modal-overlay">
      <div className="total-order-modal-box">
        <h2 className="total-order-title">Create Conditional Rule</h2>
        <hr className="total-order-divider" />

        <div className="total-order-form-section">
          <label className="total-order-label">Minimum Order Value:</label>
          <input type="number" className="total-order-input" />

          <label className="total-order-label">Minimum Unit Required:</label>
          <input type="number" className="total-order-input" />
        </div>

        <div className="total-order-form-actions">
          <button className="total-order-save-button">Save</button>
          <button className="total-order-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="total-order-delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TotalOrderDiscountModal;
