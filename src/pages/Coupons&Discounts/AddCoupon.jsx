import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import {
  createCoupon,
  fetchCouponById,
  getDiscountTypes,
  getUsageLimitTypes
} from '../../services/api';
import "./AddCoupon.css";

// Modals for Rule
import ProductDiscountModal from "./ConditionalRuleModal";
import TotalOrderDiscountModal from "./TotalOrderDiscountModal";

// Modals for Reward
import { useNavigate, useParams } from "react-router-dom";
import BuyYGetXRewardModal from "./BuyYGetXRewardModal";
import FreeShippingRewardModal from "./FreeShippingRewardModal";
import ProductRewardModal from "./ProductRewardModal";
import TotalOrderRewardModal from "./TotalOrderRewardModal";

const AddCoupon = ({ mode = "create" }) => {
  const [formData, setFormData] = useState({
    discount_name: '',
    discount_code: '',
    discount_type: '',
    currency: 'USD',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    usage_limit_type: '',
    usage_limit_value: null
  });
  const { couponId } = useParams();
  const [discountTypes, setDiscountTypes] = useState([]);
  const [usageLimitTypes, setUsageLimitTypes] = useState([]);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState(null);
  const [rules, setRules] = useState([]); 
  const [rewards, setRewards] = useState([]); 
  const navigate = useNavigate();
  const headingMap = {
    edit: "Edit Coupon",
    view: "View Coupon",
    duplicate: "Duplicate Coupon",
    create: "Create New Coupon",
  };
  
  <h2>{headingMap[mode]}</h2>
  

  // Load dropdown options on component mount
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [discountTypesRes, usageLimitTypesRes] = await Promise.all([
          getDiscountTypes(),
          getUsageLimitTypes()
        ]);
        setDiscountTypes(discountTypesRes);
        setUsageLimitTypes(usageLimitTypesRes);
      } catch (error) {
        console.error('Failed to load options:', error);
        // Add error notification here
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    const fetchCoupon = async () => {
      if (mode !== "create" && couponId) {
        try {
          const res = await fetchCouponById(couponId); 
          const data = res.data;
  
          setFormData({
            discount_name: data.discount_name,
            discount_code: mode === "duplicate" ? `${data.discount_code}_copy` : data.discount_code,
            discount_type: data.discount_type,
            currency: data.currency,
            start_date: data.start_date?.split("T")[0],
            start_time: data.start_date?.split("T")[1]?.slice(0, 5),
            end_date: data.end_date?.split("T")[0],
            end_time: data.end_date?.split("T")[1]?.slice(0, 5),
            usage_limit_type: data.usage_limit_type,
            usage_limit_value: data.usage_limit_value
          });
  
          setCurrentCouponId(data.id); // for rule/reward modals
        } catch (err) {
          console.error("Failed to load coupon:", err);
        }
      }
    };
  
    fetchCoupon();
  }, [mode, couponId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({
      ...prev,
      usage_limit_type: e.target.value,
      usage_limit_value: e.target.value === 'total' ? 1 : null
    }));
  };

  const handleSaveCoupon = async () => {
    try {
      // Validate required fields
      if (!formData.discount_name || !formData.discount_code || !formData.discount_type) {
        alert('Please fill in all required fields');
        return;
      }

      // Combine date and time fields into ISO strings
      const startDateTime = `${formData.start_date}T${formData.start_time}:00Z`;
      const endDateTime = `${formData.end_date}T${formData.end_time}:00Z`;
      
      const couponData = {
        discount_name: formData.discount_name,
        discount_code: formData.discount_code,
        discount_type: formData.discount_type,
        currency: formData.currency,
        start_date: startDateTime,
        end_date: endDateTime,
        usage_limit_type: formData.usage_limit_type,
        usage_limit_value: formData.usage_limit_value,
        status: 'active'
      };

      const response = await createCoupon(couponData);
      console.log('Coupon created:', response.data);
      
      // Store coupon ID for adding rules/rewards later
      setCurrentCouponId(response.data.coupon_id);
      
      // Navigate to coupons list or stay to add rules/rewards
      navigate('/coupons&discounts');
    } catch (error) {
      console.error('Failed to create coupon:', error);
      alert(`Failed to create coupon: ${error.message}`);
    }
  };

  const closeModals = () => {
    setShowRuleModal(false);
    setShowRewardModal(false);
  };

  return (
    <div className="coupon-container">
      <h2>{headingMap[mode]}</h2>
      <div className="coupon-body">
        {/* Left Form */}
        <div className="coupon-form">
          <div className="form-group">
            <label>Discount Name :</label>
            <input 
              type="text" 
              name="discount_name"
              value={formData.discount_name}
              onChange={handleInputChange}
              required
              disabled={mode === "view"}
            />
          </div>
          <div className="form-group">
            <label>Discount Code :</label>
            <input 
              type="text" 
              name="discount_code"
              value={formData.discount_code}
              onChange={handleInputChange}
              required
              disabled={mode === "view"}
            />
          </div>
          <div className="form-group">
            <label>Discount Type :</label>
            <select 
              name="discount_type"
              value={formData.discount_type}
              onChange={handleInputChange}
              required
              disabled={mode === "view"}
            >
              <option value="">Select Discount Type</option>
              {discountTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <p className="currency">
            Currency : <span> USD</span>
          </p>

          <div className="datetime-group">
            <div>
              <label>Start Date : </label>
              <input 
                type="date" 
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                required
                disabled={mode === "view"}
              />
            </div>
            <div>
              <label>Start Time : </label>
              <input 
                type="time" 
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                required
                disabled={mode === "view"}
              />
            </div>
          </div>

          <div className="datetime-group">
            <div>
              <label>End Date : </label>
              <input 
                type="date" 
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                required
                disabled={mode === "view"}
              />
            </div>
            <div>
              <label>End Time : </label>
              <input 
                type="time" 
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                required
                disabled={mode === "view"}
              />
            </div>
          </div>

          <div className="form-group">
            <div>Total Usage Limit</div>
            <div className="radio-group">
              {usageLimitTypes.map(limitType => (
                <div key={limitType.value}>
                  <input 
                    type="radio" 
                    name="usage" 
                    className="usage-radio"
                    value={limitType.value}
                    checked={formData.usage_limit_type === limitType.value}
                    onChange={handleRadioChange}
                    disabled={mode === "view"}
                  />
                  <label className="usage-label">
                    {limitType.label}
                  </label>
                </div>
              ))}
            </div>
            {formData.usage_limit_type === 'total' && (
              <input
                type="number"
                name="usage_limit_value"
                value={formData.usage_limit_value || ''}
                onChange={handleInputChange}
                min="1"
                placeholder="Enter limit"
                disabled={mode === "view"}
              />
            )}
          </div>

          <div className="form-actions">
          {mode !== "view" && (
            <button className="save-button" onClick={handleSaveCoupon}>Save</button>
          )}
            <button
              className="cancel-button"
              onClick={() => navigate("/coupons&discounts")}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right Sidebar - Temporarily disabled until coupon is created */}
        {formData.discount_type && (
          <div className="rules-sidebar">
            <button className="rules-header">Rules & Rewards</button>
            <div className="rules-box">
              <h4>Conditional rules</h4>
              <p>No rules added yet</p>
              <button 
                className="add-rule-button" 
                onClick={() => setShowRuleModal(true)}
                disabled={!formData.discount_type}
              >
                Add a rule
              </button>
            </div>
            <div className="rules-box">
              <h4>Rewards</h4>
              <p>No rewards added yet</p>
              <button 
                className="add-rule-button" 
                onClick={() => setShowRewardModal(true)}
                disabled={!formData.discount_type}
              >
                Add a reward
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conditional Modals */}
      {showRuleModal === "product" && (
        <ProductDiscountModal 
          onClose={closeModals}
          couponId={currentCouponId}
          onRuleAdded={(newRule) => {
            setRules(prev => [...prev, newRule]);
            // Optional: Show success message
          }}
        />
      )}

    {/* For total order rules */}
      {showRuleModal === "total" && (
        <TotalOrderDiscountModal 
          onClose={closeModals}
          couponId={currentCouponId}
          onRuleAdded={(newRule) => {
            setRules(prev => [...prev, newRule]);
            // Optional: Show success message
          }}
        />
      )}

      {showRewardModal === "product" && (
        <ProductRewardModal 
          onClose={closeModals}
          couponId={currentCouponId}
          onRewardAdded={(newReward) => {
            setRewards(prev => [...prev, newReward]);
          }}
        />
      )}

      {showRewardModal === "total" && (
      <TotalOrderRewardModal 
        onClose={closeModals}
        couponId={currentCouponId}
        onRewardAdded={(newReward) => {
          setRewards(prev => [...prev, newReward]);
        }}
      />
    )}
      {showRewardModal === "buyx" && (
      <BuyYGetXRewardModal 
        onClose={closeModals}
        couponId={currentCouponId}
        onRewardAdded={(newReward) => {
          setRewards(prev => [...prev, newReward]);
        }}
      />
      )}
      {showRewardModal === "shipping" && (
        <FreeShippingRewardModal 
          onClose={closeModals}
          couponId={currentCouponId}
          onRewardAdded={(newReward) => {
            setRewards(prev => [...prev, newReward]);
          }}
        />
      )}
    </div>
  );
};


AddCoupon.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit', 'view', 'duplicate'])
};

export default AddCoupon;
