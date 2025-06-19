import PropTypes from 'prop-types';
import { useState } from 'react';
import { addCouponReward } from '../../services/api';
import './FreeShipping.css';

const FreeShippingRewardModal = ({ onClose, couponId, onRewardAdded }) => {
  const [rewardData, setRewardData] = useState({
    reward_type: 'free_shipping',
    free_shipping_enabled: true,
    shipping_countries: [],
    country_input: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRewardData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCountry = () => {
    if (rewardData.country_input && !rewardData.shipping_countries.includes(rewardData.country_input)) {
      setRewardData(prev => ({
        ...prev,
        shipping_countries: [...prev.shipping_countries, prev.country_input],
        country_input: ''
      }));
    }
  };

  const handleRemoveCountry = (country) => {
    setRewardData(prev => ({
      ...prev,
      shipping_countries: prev.shipping_countries.filter(c => c !== country)
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare the data for API call
      const rewardToSubmit = {
        reward_type: rewardData.reward_type,
        free_shipping_enabled: rewardData.free_shipping_enabled,
        shipping_countries: rewardData.shipping_countries.length > 0 
          ? rewardData.shipping_countries 
          : null // Send null if no countries specified (means all countries)
      };

      // Call the API to add the reward
      const response = await addCouponReward(couponId, rewardToSubmit);
      
      // Notify parent component about the new reward
      onRewardAdded(response.data);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Failed to add free shipping reward:', error);
      alert(`Failed to add reward: ${error.message}`);
    }
  };

  return (
    <div className="free-shipping-modal-overlay">
      <div className="free-shipping-modal">
        <h3 className="free-shipping-title">Create Free Shipping Reward</h3>
        <hr className="free-shipping-divider" />

        <div className="free-shipping-form-box">
          <div className="free-shipping-form-group">
            <label className="free-shipping-label">
              <input
                type="checkbox"
                className="free-shipping-checkbox"
                name="free_shipping_enabled"
                checked={rewardData.free_shipping_enabled}
                onChange={handleInputChange}
              />
              Enable Free Shipping
            </label>
          </div>

          {rewardData.free_shipping_enabled && (
            <div className="free-shipping-form-group">
              <label className="free-shipping-label">Applicable Countries:</label>
              <div className="free-shipping-country-input-group">
                <input
                  type="text"
                  className="free-shipping-input"
                  name="country_input"
                  value={rewardData.country_input}
                  onChange={handleInputChange}
                  placeholder="Enter country code (e.g., US, GB)"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCountry()}
                />
                <button 
                  type="button"
                  className="free-shipping-add-country-btn"
                  onClick={handleAddCountry}
                >
                  Add
                </button>
              </div>
              
              {rewardData.shipping_countries.length > 0 && (
                <div className="free-shipping-countries-list">
                  <p>Selected Countries:</p>
                  <ul>
                    {rewardData.shipping_countries.map((country, index) => (
                      <li key={index}>
                        {country}
                        <button 
                          type="button"
                          className="free-shipping-remove-country"
                          onClick={() => handleRemoveCountry(country)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="free-shipping-note">
                    Leave empty for all countries
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="free-shipping-button-group">
          <button 
            className="free-shipping-save-btn"
            onClick={handleSubmit}
            disabled={!rewardData.free_shipping_enabled}
          >
            Save
          </button>
          <button 
            className="free-shipping-cancel-btn" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="free-shipping-delete-btn"
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

FreeShippingRewardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  couponId: PropTypes.string.isRequired,
  onRewardAdded: PropTypes.func.isRequired
};

export default FreeShippingRewardModal;