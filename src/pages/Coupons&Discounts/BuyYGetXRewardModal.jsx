import React from "react";
import "./BuyYGetXRewardModal.css";

const BuyYGetXRewardModal = ({ onClose }) => {
  return (
    <div className="buyxgety-reward-modal-overlay">
      <div className="buyxgety-reward-modal">
        <h3 className="buyxgety-reward-title">Create Conditional rule</h3>
        <hr className="buyxgety-reward-divider" />

        <div className="buyxgety-reward-form-box">
          <div className="buyxgety-reward-form-group">
            <label className="buyxgety-reward-label">QUANTITY</label>
            <input
              type="number"
              className="buyxgety-reward-input"
              placeholder="Enter quantity"
            />
          </div>

          <div className="buyxgety-reward-form-group">
            <label className="buyxgety-reward-label">Applicable to :</label>
            <hr className="buyxgety-reward-subdivider" />

            <div className="buyxgety-reward-form-subgroup">
              <label className="buyxgety-reward-sublabel">Product</label>
              <input
                type="text"
                className="buyxgety-reward-input"
                placeholder="Enter product name or ID"
              />
            </div>

            <div className="buyxgety-reward-form-subgroup">
              <label className="buyxgety-reward-sublabel">
                Product Categories
              </label>
              <input
                type="text"
                className="buyxgety-reward-input"
                placeholder="Enter category"
              />
            </div>
          </div>
        </div>

        <div className="buyxgety-reward-button-group">
          <button className="buyxgety-reward-save-btn">Save</button>
          <button className="buyxgety-reward-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="buyxgety-reward-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BuyYGetXRewardModal;
