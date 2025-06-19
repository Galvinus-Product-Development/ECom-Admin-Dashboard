import PropTypes from 'prop-types';
import { useState } from 'react';
import { addCouponReward } from '../../services/api';
import './BuyYGetXRewardModal.css';

const BuyYGetXRewardModal = ({ onClose, couponId, onRewardAdded }) => {

  const [rewardData, setRewardData] = useState({
    reward_type: 'buy_x_get_y',
    required_quantity: 1,
    free_quantity: 1,
    product_id: '',
    category_id: '',
    apply_to: 'same_product' // or 'category_products'
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
      if (!rewardData.required_quantity || !rewardData.free_quantity) {
        alert('Please enter both required and free quantities');
        return;
      }

      if (!rewardData.product_id && !rewardData.category_id) {
        alert('Please select either a product or category');
        return;
      }      // Prepare the data for API call
      const rewardToSubmit = {
        reward_type: rewardData.reward_type,
        required_quantity: parseInt(rewardData.required_quantity),
        free_quantity: parseInt(rewardData.free_quantity),
        product_id: rewardData.product_id || null,
        category_id: rewardData.category_id || null,
        apply_to: rewardData.apply_to
      };

      // Call the API to add the reward
      const response = await addCouponReward(couponId, rewardToSubmit);
      
      // Notify parent component about the new reward
      onRewardAdded(response.data);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Failed to add Buy X Get Y reward:', error);
      alert(`Failed to add reward: ${error.message}`);
    }
  };

  return (
    <div className="buyxgety-reward-modal-overlay">
      <div className="buyxgety-reward-modal">
        <h3 className="buyxgety-reward-title">Create Buy X Get Y Reward</h3>
        <hr className="buyxgety-reward-divider" />

        <div className="buyxgety-reward-form-box">
          <div className="buyxgety-reward-form-group">
            <label className="buyxgety-reward-label">BUY QUANTITY (X):</label>
            <input
              type="number"
              className="buyxgety-reward-input"
              name="required_quantity"
              value={rewardData.required_quantity}
              onChange={handleInputChange}
              min="1"
              placeholder="Enter quantity to buy"
            />
          </div>

          <div className="buyxgety-reward-form-group">
            <label className="buyxgety-reward-label">GET QUANTITY (Y):</label>
            <input
              type="number"
              className="buyxgety-reward-input"
              name="free_quantity"
              value={rewardData.free_quantity}
              onChange={handleInputChange}
              min="1"
              placeholder="Enter free quantity"
            />
          </div>

          <div className="buyxgety-reward-form-group">
            <label className="buyxgety-reward-label">Applicable to:</label>
            <hr className="buyxgety-reward-subdivider" />

            <div className="buyxgety-reward-form-subgroup">
              <label className="buyxgety-reward-sublabel">Product</label>
              <input
                type="text"
                className="buyxgety-reward-input"
                name="product_id"
                value={rewardData.product_id}
                onChange={handleInputChange}
                placeholder="Enter product ID"
              />
            </div>

            <div className="buyxgety-reward-form-subgroup">
              <label className="buyxgety-reward-sublabel">
                Product Category
              </label>
              <input
                type="text"
                className="buyxgety-reward-input"
                name="category_id"
                value={rewardData.category_id}
                onChange={handleInputChange}
                placeholder="Enter category ID"
              />
            </div>

            <div className="buyxgety-reward-form-subgroup">
              <label className="buyxgety-reward-sublabel">Apply to:</label>
              <select
                className="buyxgety-reward-select"
                name="apply_to"
                value={rewardData.apply_to}
                onChange={handleInputChange}
              >
                <option value="same_product">Same Product</option>
                <option value="category_products">Any Product in Category</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buyxgety-reward-button-group">
          <button 
            className="buyxgety-reward-save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button 
            className="buyxgety-reward-cancel-btn" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="buyxgety-reward-delete-btn"
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

BuyYGetXRewardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  couponId: PropTypes.string.isRequired,
  onRewardAdded: PropTypes.func.isRequired
};

export default BuyYGetXRewardModal;
