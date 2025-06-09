import React, { useState } from "react";
import "./PaymentSetting.css";

const PaymentSetting = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openSecondModal = () => setShowSecondModal(true);
  const closeSecondModal = () => setShowSecondModal(false);

  const openThirdModal = () => setShowThirdModal(true);
  const closeThirdModal = () => setShowThirdModal(false);

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
          <button className="primary-button" onClick={openSecondModal}>
            Add Payment Methods
          </button>
        </div>
        {/* <small className="hint">(Depends on selected payment Provider)</small> */}
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

      <div className="section">
        <div className="section-header">
          <span>Manual Payment Methods</span>
          <button className="primary-button" onClick={openThirdModal}>
            Add Payment Methods
          </button>
        </div>
        {/* <small className="hint">
          (Give options like COD, Direct Bank transfer etc.)
        </small> */}

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

      {/* Second modal */}
      {showSecondModal && (
        <div className="payment-modal-overlay">
          <div className="payment-method-modal">
            <h3>Add New Payment Provider</h3>

            <form>
              {/* 1. Payment Provider */}
              <fieldset>
                <legend>1. Payment Provider</legend>
                <label>Provider:</label>
                <select>
                  <option>Stripe</option>
                  <option>PayPal</option>
                </select>
              </fieldset>

              {/* 2. Payment Method Type */}
              <fieldset>
                <legend>2. Payment Method Type</legend>
                <label>Method Type:</label>
                <select>
                  <option>Card (Visa/MasterCard)</option>
                  <option>UPI</option>
                </select>
              </fieldset>

              {/* 3. Method Display */}
              <fieldset>
                <legend>3. Method Display</legend>
                <label>Display Name:</label>
                <input type="text" placeholder="Credit/Debit Card" />

                <label>Description:</label>
                <input type="text" placeholder="Pay securely using cards." />

                <div className="payment-logo">
                  <p>Show Logo/Icon</p>
                  <input type="checkbox" />
                </div>
              </fieldset>

              {/* 4. Payment Rules */}
              <fieldset>
                <legend>4. Payment Rules</legend>
                <label>Processing Fee:</label>
                <input type="text" placeholder="e.g., 2.9% or $0.30" />

                <div className="payment-type">
                  <p>Type:</p>
                  <label className="payment-option">
                    <input type="checkbox" />
                    <span>Percentage</span>
                  </label>
                  <label className="payment-option">
                    <input type="checkbox" />
                    <span>Flat</span>
                  </label>
                </div>

                <div className="payment-amount">
                  <p>• Min Amount: $ [ 5.00 ]</p>
                  <p>• Max Amount: $ [ 1000.00 ]</p>
                </div>
              </fieldset>

              {/* 5. Availability */}
              <fieldset>
                <legend>5. Availability</legend>
                <p>Supported Countries:</p>
                <div className="country-checkboxes-inline">
                  <div>
                    <input type="checkbox" value="India" />
                    <span>India</span>
                  </div>
                  <div>
                    <input type="checkbox" value="USA" />
                    <span>USA</span>
                  </div>
                  <div>
                    <input type="checkbox" value="UK" />
                    <span>UK</span>
                  </div>
                </div>
              </fieldset>

              {/* 6. Status & Options */}
              <fieldset>
                <legend>6. Status & Options</legend>
                <label>Status:</label>
                <select>
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>

                <label>Sort Order:</label>
                <input type="text" placeholder="Pay securely using cards." />

                <div className="testMode">
                  <p>Test Mode (if applicable)</p>
                  <input type="checkbox" />
                </div>
              </fieldset>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button type="button" className="test-button">
                  Test Method
                </button>
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeSecondModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showThirdModal && (
        <div className="manual-modal-overlay">
          <div className="manual-modal-content">
            <h3>Add Manual Payment Method: Cash on Delivery</h3>

            <fieldset>
              <legend>1. Display</legend>
              <input type="text" value="Cash on Delivery" readOnly />
              <input
                type="text"
                value="Pay when your order arrives."
                readOnly
              />
            </fieldset>

            <fieldset>
              <legend>2. Customer Instructions</legend>
              <input
                type="text"
                placeholder="Instructions (thank-you page + email)"
              />
              <small>
                [Your order will be collected in cash by the delivery agent.]
              </small>
            </fieldset>

            <fieldset>
              <legend>3. Processing & Delivery</legend>
              <input type="text" value="[ 2 ] days" readOnly />
              <div className="require-phone">
                <p>Require phone number:</p>
                <input type="checkbox" />
              </div>
            </fieldset>

            <fieldset>
              <legend>4. Eligibility Rules</legend>
              <p>Apply to:</p>
              <div className="eligibility-options">
                <div>
                  <input type="radio" name="apply" />
                  <span>All Products</span>
                </div>
                <div>
                  <input type="radio" name="apply" />
                  <span>Specific Categories </span>
                </div>
              </div>
              <input type="text" value="[ $0.00 ] – [ $250.00 ]" readOnly />
              <input type="text" value="[ $0.00 ] – [ $250.00 ]" readOnly />
              <select>
                <option>Select regions/countries </option>
              </select>
            </fieldset>

            <fieldset>
              <legend>5. Display Options</legend>
              <div className="icon-display">
                <p>Show method icon/logo:</p>
                <input type="checkbox" />
              </div>
              <div className="icon-display">
                <p>Show method icon/logo:</p>
                <input type="text" />
              </div>
            </fieldset>

            <div className="manual-modal-actions">
              <button className="test-button">Test Method</button>
              <button className="save-button">Save</button>
              <button className="cancel-button" onClick={closeThirdModal}>
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
