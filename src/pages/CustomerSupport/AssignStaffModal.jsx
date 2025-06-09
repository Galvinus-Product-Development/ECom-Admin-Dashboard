import React, { useState } from "react";
import "./AssignStaffModal.css";

const AssignStaffModal = ({ onClose, onAssign }) => {
  const [selectedStaff, setSelectedStaff] = useState("");

  const handleAssign = () => {
    onAssign(selectedStaff);
    onClose();
  };

  return (
    <div className="assign-overlay">
      <div className="assign-modal">
        <div className="assign-field">
          <label htmlFor="staff">Assign To</label>
          <select
            id="staff"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            <option value="">-- Select Staff --</option>
            <option value="Pratham">Pratham</option>
            <option value="Aditi">Aditi</option>
            <option value="Raj">Raj</option>
          </select>
        </div>

        <div className="assign-buttons">
          <button className="assign-btn" onClick={handleAssign}>
            Assign
          </button>
          <button className="assign-close-btn" onClick={onClose}>
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;
