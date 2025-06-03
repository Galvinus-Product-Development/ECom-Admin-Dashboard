import React, { useState } from "react";
import "./PaymentSetting.css";

const PaymentSetting = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="payment-settings">
      <h2>Payment Settings</h2>

      {/* Payment Providers Section */}
      <div className="section">
        <div className="section-header">
          <span>Payment Providers</span>
          <button className="primary-button" onClick={openModal}>
            Choose provider
          </button>
        </div>

        <div className="provider-list">
          {["Provider 1", "Provider 2", "Provider 3"].map((provider, index) => (
            <div className="provider-item" key={index}>
              <div className="provider-info">
                <div className="logo">Logo</div>
                <span>{provider} (status)</span>
              </div>
              <div className="provider-actions">
                <button className="manage-button">Manage</button>
                <button className="disable-button">Disable</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Sections */}
      <div className="section">
        <div className="section-header">
          <span>Supported Payment Methods</span>
          <button className="primary-button">Add Payment Methods</button>
        </div>
        <small className="hint">(Depends on selected payment Provider)</small>
      </div>

      <div className="section">
        <div className="section-header">
          <span>Manual Payment Methods</span>
          <button className="primary-button">Add Payment Methods</button>
        </div>
        <small className="hint">
          (Give options like COD, Direct Bank transfer etc.)
        </small>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Payment Provider</h3>

            <div className="form-section">
              <label>Provider Name:</label>
              <input type="text" />

              <label>Select a Payment Provider:</label>
              <input type="text" />
            </div>

            <div className="form-section">
              <label>Client ID:</label>
              <input type="text" />

              <label>Secret Key:</label>
              <input type="text" />
            </div>

            <div className="form-section">
              <label>Mode:</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> Test
                </label>
                <label>
                  <input type="checkbox" /> Sandbox
                </label>
              </div>
            </div>

            <div className="form-section">
              <label>Webhook URL:</label>
              <input type="text" />

              <label>Verify Signature:</label>
              <input type="text" />
            </div>

            <div className="modal-actions">
              <button className="test-button">Test Connections</button>
              <button className="save-button">Save</button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSetting;
