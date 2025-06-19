import PropTypes from 'prop-types';
import { useState } from "react";
import { addCouponRule } from "../../services/api";
import "./ConditionalRuleModal.css";

const ConditionalRuleModal = ({ onClose, couponId, onRuleAdded }) => {

  const [ruleData, setRuleData] = useState({
    rule_type: "minimum_order_value",
    minimum_order_value: "",
    minimum_quantity: "",
    productIds: [],
    categoryIds: []
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
        rule_type: ruleData.rule_type,
        minimum_order_value: ruleData.minimum_order_value ? parseFloat(ruleData.minimum_order_value) : null,
        minimum_quantity: ruleData.minimum_quantity ? parseInt(ruleData.minimum_quantity) : null,
        productIds: ruleData.productIds,
        categoryIds: ruleData.categoryIds
      };

      // Call the API to add the rule
      const response = await addCouponRule(couponId, ruleToSubmit);
      
      // Notify parent component about the new rule
      onRuleAdded(response.data);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Failed to add rule:', error);
      alert(`Failed to add rule: ${error.message}`);
    }
  };

  return (
    <div className="conditional-rule-modal-overlay">
      <div className="conditional-rule-modal-box">
        <h2 className="conditional-rule-title">Create Conditional Rule</h2>
        <hr className="conditional-rule-divider" />

        <div className="conditional-rule-form-section">
          <label className="conditional-rule-label">Minimum Order Value:</label>
          <input
            type="number"
            className="conditional-rule-input"
            name="minimum_order_value"
            value={ruleData.minimum_order_value}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            placeholder="0.00"
          />

          <label className="conditional-rule-label">
            Minimum Unit Required:
          </label>
          <input
            type="number"
            className="conditional-rule-input"
            name="minimum_quantity"
            value={ruleData.minimum_quantity}
            onChange={handleInputChange}
            min="1"
            placeholder="0"
          />
        </div>

        <h3 className="conditional-rule-subheading">Applicable to:</h3>
        <div className="conditional-rule-form-section">
          <label className="conditional-rule-label">Product:</label>
          <input
            className="conditional-rule-input"
            placeholder="Coming soon - product selector"
            disabled
          />

          <label className="conditional-rule-label">Product Categories:</label>
          <input
            className="conditional-rule-input"
            placeholder="Coming soon - category selector"
            disabled
          />
        </div>

        <div className="conditional-rule-form-actions">
        <button 
            className="conditional-rule-save-button"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button 
            className="conditional-rule-cancel-button" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="conditional-rule-delete-button"
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

ConditionalRuleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  couponId: PropTypes.string.isRequired,
  onRuleAdded: PropTypes.func.isRequired
};

export default ConditionalRuleModal;
