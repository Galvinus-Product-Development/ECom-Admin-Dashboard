import PropTypes from 'prop-types';
import { useState } from 'react';
import { addCouponReward } from '../../services/api';
import './TotalOrderRewardModal.css';

const TotalOrderRewardModal = ({ onClose, couponId, onRewardAdded }) => {
  const [rewardData, setRewardData] = useState({
    reward_type: 'order_discount',
    discount_value_type: 'percentage',
    discount_value: '',
    maximum_discount: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRewardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!rewardData.discount_value) {
        alert('Please enter a discount value');
        return;
      }// Prepare the data for API call
      const rewardToSubmit = {
        reward_type: rewardData.reward_type,
        discount_value_type: rewardData.discount_value_type,
        discount_value: parseFloat(rewardData.discount_value),
        maximum_discount: rewardData.maximum_discount 
          ? parseFloat(rewardData.maximum_discount) 
          : null
      };

      // Call the API to add the reward
      const response = await addCouponReward(couponId, rewardToSubmit);
      
      // Notify parent component about the new reward
      onRewardAdded(response.data);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Failed to add order reward:', error);
      alert(`Failed to add reward: ${error.message}`);
    }
  };

  return (
    <div className="total-order-reward-modal-overlay">
      <div className="total-order-reward-modal">
        <h3 className="total-order-reward-title">Create Conditional rule</h3>
        <hr className="total-order-reward-divider" />

        <div className="total-order-reward-form-box">
          <div className="total-order-reward-form-group">
            <label className="total-order-reward-label">Discount Value :</label>
            <div className="total-order-reward-inline-fields">
            <select
                className="total-order-reward-select"
                name="discount_value_type"
                value={rewardData.discount_value_type}
                onChange={handleInputChange}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              <input
                type="number"
                className="total-order-reward-input"
                name="discount_value"
                value={rewardData.discount_value}
                onChange={handleInputChange}
                min="0"
                step={rewardData.discount_value_type === 'percentage' ? '0.1' : '0.01'}
                placeholder={
                  rewardData.discount_value_type === 'percentage' 
                    ? '0-100%' 
                    : 'Enter amount'
                }
              />
            </div>
          </div>

          <div className="total-order-reward-form-group">
            <label className="total-order-reward-label">
              Maximum Discount :
            </label>
            <input
              type="number"
              className="total-order-reward-input"
              name="maximum_discount"
              value={rewardData.maximum_discount}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="Optional maximum"
            />
          </div>
        </div>

        <div className="total-order-reward-button-group">
          <button 
            className="total-order-reward-save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button 
            className="total-order-reward-cancel-btn" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="total-order-reward-delete-btn"
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

TotalOrderRewardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  couponId: PropTypes.string.isRequired,
  onRewardAdded: PropTypes.func.isRequired
};

export default TotalOrderRewardModal;
