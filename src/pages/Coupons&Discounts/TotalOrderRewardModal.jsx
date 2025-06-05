import React from "react";
import "./TotalOrderRewardModal.css";

const TotalOrderRewardModal = ({ onClose }) => {
  return (
    <div className="total-order-reward-modal-overlay">
      <div className="total-order-reward-modal">
        <h3 className="total-order-reward-title">Create Conditional rule</h3>
        <hr className="total-order-reward-divider" />

        <div className="total-order-reward-form-box">
          <div className="total-order-reward-form-group">
            <label className="total-order-reward-label">Discount Value :</label>
            <div className="total-order-reward-inline-fields">
              <select className="total-order-reward-select">
                <option>Fixed or %</option>
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </select>
              <input
                type="number"
                className="total-order-reward-input"
                placeholder="Enter value"
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
              placeholder="Enter max discount"
            />
          </div>
        </div>

        <div className="total-order-reward-button-group">
          <button className="total-order-reward-save-btn">Save</button>
          <button className="total-order-reward-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="total-order-reward-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TotalOrderRewardModal;
