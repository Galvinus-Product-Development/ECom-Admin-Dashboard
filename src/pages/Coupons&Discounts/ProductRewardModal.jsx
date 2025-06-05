import React from "react";
import "./ProductRewardModal.css";

const ProductRewardModal = ({ onClose }) => {
  return (
    <div className="product-reward-modal-overlay">
      <div className="product-reward-modal">
        <h3 className="product-reward-title">Create Conditional rule</h3>
        <hr className="product-reward-divider" />

        <div className="product-reward-form-box">
          <div className="product-reward-form-group">
            <label className="product-reward-label">Discount Value :</label>
            <div className="product-reward-inline-fields">
              <select className="product-reward-select">
                <option>Fixed or %</option>
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </select>
              <input
                type="number"
                className="product-reward-input"
                placeholder="Enter value"
              />
            </div>
          </div>

          <div className="product-reward-form-group">
            <label className="product-reward-label">Maximum Discount :</label>
            <input
              type="number"
              className="product-reward-input"
              placeholder="Enter max discount"
            />
          </div>
        </div>

        <div className="product-reward-button-group">
          <button className="product-reward-save-btn">Save</button>
          <button className="product-reward-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="product-reward-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductRewardModal;
