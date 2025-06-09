import React from "react";
import "./ConditionalRuleModal.css";

const ConditionalRuleModal = ({ onClose, defaultDiscountType }) => {
  return (
    <div className="conditional-rule-modal-overlay">
      <div className="conditional-rule-modal-box">
        <h2 className="conditional-rule-title">Create Conditional Rule</h2>
        <hr className="conditional-rule-divider" />

        <div className="conditional-rule-form-section">
          <label className="conditional-rule-label">Minimum Order Value:</label>
          <input type="number" className="conditional-rule-input" />

          <label className="conditional-rule-label">
            Minimum Unit Required:
          </label>
          <input type="number" className="conditional-rule-input" />
        </div>

        <h3 className="conditional-rule-subheading">Applicable to:</h3>
        <div className="conditional-rule-form-section">
          <label className="conditional-rule-label">Product:</label>
          <input
            className="conditional-rule-input"
            placeholder="Accept Multiple Value"
          />

          <label className="conditional-rule-label">Product Categories:</label>
          <input
            className="conditional-rule-input"
            placeholder="Accept Multiple Value"
          />
        </div>

        <div className="conditional-rule-form-actions">
          <button className="conditional-rule-save-button">Save</button>
          <button className="conditional-rule-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="conditional-rule-delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConditionalRuleModal;
