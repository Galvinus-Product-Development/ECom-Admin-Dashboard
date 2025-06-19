import PropTypes from 'prop-types';
import { useState } from 'react';
import { addCouponRule } from '../../services/api';
import './TotalOrderDiscount.css';

const TotalOrderDiscountModal = ({ onClose, couponId, onRuleAdded }) => {

  const [ruleData, setRuleData] = useState({
    rule_type: 'minimum_order_value',
    minimum_order_value: '',
    minimum_quantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRuleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate at least one condition is set
      if (!ruleData.minimum_order_value && !ruleData.minimum_quantity) {
        alert('Please set at least one condition (minimum order value or quantity)');
        return;
      }

      // Prepare the data for API call
      const ruleToSubmit = {
        rule_type: 'total_order', // Specific type for total order rules
        minimum_order_value: ruleData.minimum_order_value 
          ? parseFloat(ruleData.minimum_order_value) 
          : null,
        minimum_quantity: ruleData.minimum_quantity 
          ? parseInt(ruleData.minimum_quantity) 
          : null
      };

      // Call the API to add the rule
      const response = await addCouponRule(couponId, ruleToSubmit);
      // Notify parent component about the new rule
      onRuleAdded(response.data);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Failed to add total order rule:', error);
      alert(`Failed to add rule: ${error.message}`);
    }
  };
      

  return (
    <div className="total-order-modal-overlay">
      <div className="total-order-modal-box">
        <h2 className="total-order-title">Create Conditional Rule</h2>
        <hr className="total-order-divider" />

        <div className="total-order-form-section">
          <label className="total-order-label">Minimum Order Value:</label>
          <input
            type="number"
            className="total-order-input"
            name="minimum_order_value"
            value={ruleData.minimum_order_value}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            placeholder="0.00"
          />

          <label className="total-order-label">Minimum Unit Required:</label>
          <input
            type="number"
            className="total-order-input"
            name="minimum_quantity"
            value={ruleData.minimum_quantity}
            onChange={handleInputChange}
            min="1"
            placeholder="0"
          />
        </div>

        <div className="total-order-form-actions">
        <button 
            className="total-order-save-button"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button 
            className="total-order-cancel-button" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="total-order-delete-button"
            disabled
            title="Delete will be available after creation"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

TotalOrderDiscountModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  couponId: PropTypes.string.isRequired,
  onRuleAdded: PropTypes.func.isRequired
};

export default TotalOrderDiscountModal;
