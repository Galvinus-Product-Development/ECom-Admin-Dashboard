import React, { useState } from "react";
import "./ViewTicketModal.css";
import AssignStaffModal from "./AssignStaffModal";

const ViewTicketModal = ({ onClose }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleAssign = (staffName) => {
    console.log("Assigned to:", staffName);
    // Add your assign logic here
  };
  return (
    <div className="view-ticket-overlay">
      <div className="view-ticket-modal">
        <div className="ticket-details">
          <div>
            <strong>Ticket:</strong> #10001
          </div>
          <div>
            <strong>Subject:</strong> Delayed Delivery
          </div>
          <div>
            <strong>Customer:</strong> XYZ (xyz123@gmail.com)
          </div>
          <div>
            <strong>Order ID:</strong> #101
          </div>
          <div>
            <strong>Category:</strong> Order
          </div>
          <div>
            <strong>Status:</strong> Open
          </div>
          <div>
            <strong>Created At:</strong> 04-06-2025 14:22
          </div>
        </div>

        <div className="customer-message">
          <strong>Customer Message :</strong>
          <span>
            Hi, I haven't received my order placed 5 days ago. Please check.
          </span>
        </div>

        <div className="reply-section">
          <label>Reply:</label>
          <textarea placeholder="Type your message" />
          <button className="ticket-send-button">send</button>
        </div>

        <div className="action-buttons">
          <button
            className="assign-btn"
            onClick={() => setShowAssignModal(true)}
          >
            Assign to Staff
          </button>
          <button className="inprogress-btn">Mark In Progress</button>
          <button className="ticket-close-btn" onClick={onClose}>
            Close Ticket
          </button>
        </div>
      </div>

      {showAssignModal && (
        <AssignStaffModal
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default ViewTicketModal;
