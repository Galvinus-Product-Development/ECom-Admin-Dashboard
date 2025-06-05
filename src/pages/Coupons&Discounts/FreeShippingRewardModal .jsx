import React from "react";
import "./FreeShipping.css";

const FreeShippingRewardModal = ({ onClose }) => {
  console.log("Hiiii");
  return (
    <div className="free-shipping-modal-overlay">
      <div className="free-shipping-modal">
        <h3 className="free-shipping-title">Create Conditional rule</h3>
        <hr className="free-shipping-divider" />

        <div className="free-shipping-form-box">
          <div className="free-shipping-form-group">
            <label className="free-shipping-label">
              Free Shipping :
              <input type="checkbox" className="free-shipping-checkbox" />
            </label>
          </div>

          <div className="free-shipping-form-group">
            <label className="free-shipping-label">Country :</label>
            <input
              type="text"
              className="free-shipping-input"
              placeholder="Enter country"
            />
          </div>
        </div>

        <div className="free-shipping-button-group">
          <button className="free-shipping-save-btn">Save</button>
          <button className="free-shipping-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="free-shipping-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default FreeShippingRewardModal;
