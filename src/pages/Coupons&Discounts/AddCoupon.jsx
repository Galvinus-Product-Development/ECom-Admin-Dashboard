import React, { useState } from "react";
import "./AddCoupon.css";

// Modals for Rule
import ProductDiscountModal from "./ConditionalRuleModal";
import TotalOrderDiscountModal from "./TotalOrderDiscountModal";

// Modals for Reward
import ProductRewardModal from "./ProductRewardModal";
import TotalOrderRewardModal from "./TotalOrderRewardModal";
import BuyYGetXRewardModal from "./BuyYGetXRewardModal";
import FreeShippingRewardModal from "./FreeShippingRewardModal ";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [discountType, setDiscountType] = useState("");
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const navigate = useNavigate();

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  const openRuleModal = () => {
    if (discountType === "ProductDiscount" || discountType === "BuyYAndGetX") {
      setShowRuleModal("product");
    } else if (
      discountType === "TotalOrderDiscount" ||
      discountType === "FreeShipping"
    ) {
      setShowRuleModal("total");
    }
  };

  const openRewardModal = () => {
    switch (discountType) {
      case "ProductDiscount":
        setShowRewardModal("product");
        break;
      case "TotalOrderDiscount":
        setShowRewardModal("total");
        break;
      case "BuyYAndGetX":
        setShowRewardModal("buyx");
        break;
      case "FreeShipping":
        setShowRewardModal("shipping");
        break;
      default:
        setShowRewardModal(false);
    }
  };

  const closeModals = () => {
    setShowRuleModal(false);
    setShowRewardModal(false);
  };

  return (
    <div className="coupon-container">
      <h2>Coupons & Discounts</h2>
      <div className="coupon-body">
        {/* Left Form */}
        <div className="coupon-form">
          <div className="form-group">
            <label>Discount Name :</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Discount Code :</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Discount Type :</label>
            <select value={discountType} onChange={handleDiscountTypeChange}>
              <option value="">Select Discount Type</option>
              <option value="ProductDiscount">Product Discount</option>
              <option value="TotalOrderDiscount">Total Order Discount</option>
              <option value="BuyYAndGetX">Buy Y and Get X</option>
              <option value="FreeShipping">Free Shipping</option>
            </select>
          </div>

          <p className="currency">
            Currency : <span> USD</span>
          </p>

          <div className="datetime-group">
            <div>
              <label>Start Date : </label>
              <input type="date" />
            </div>
            <div>
              <label>Start Time : </label>
              <input type="time" />
            </div>
          </div>

          <div className="datetime-group">
            <div>
              <label>End Date : </label>
              <input type="date" />
            </div>
            <div>
              <label>End Time : </label>
              <input type="time" />
            </div>
          </div>

          <div className="form-group">
            <div>Total Usage Limit</div>
            <div className="radio-group">
              <div>
                <input type="radio" name="usage" className="usage-radio" />
                <label className="usage-label">
                  Limit overall uses of this discount code
                </label>
              </div>
              <div>
                <input type="radio" name="usage" className="usage-radio" />
                <label className="usage-label">One time use per user</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="save-button">Save</button>
            <button
              className="cancel-button"
              onClick={() => navigate("/coupons&discounts")}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="rules-sidebar">
          <button className="rules-header">Rules & Rewards</button>

          <div className="rules-box">
            <h4>Conditional rules</h4>
            <p>Discount code PROMO_CODE_One4 if minimum $50.00 spent</p>
            <button className="add-rule-button" onClick={openRuleModal}>
              Add a rule
            </button>
          </div>

          <div className="rules-box">
            <h4>Rewards</h4>
            <p>
              10.00% discount
              <br />
              Applied for [CON_0003] Whiteboard Pen
            </p>
            <button className="add-rule-button" onClick={openRewardModal}>
              Add a reward
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Modals */}
      {showRuleModal === "product" && (
        <ProductDiscountModal onClose={closeModals} />
      )}
      {showRuleModal === "total" && (
        <TotalOrderDiscountModal onClose={closeModals} />
      )}

      {showRewardModal === "product" && (
        <ProductRewardModal onClose={closeModals} />
      )}
      {showRewardModal === "total" && (
        <TotalOrderRewardModal onClose={closeModals} />
      )}
      {showRewardModal === "buyx" && (
        <BuyYGetXRewardModal onClose={closeModals} />
      )}
      {showRewardModal === "shipping" && (
        <FreeShippingRewardModal onClose={closeModals} />
      )}
    </div>
  );
};

export default AddCoupon;
