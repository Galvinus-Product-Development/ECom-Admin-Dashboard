import React, { useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import "./TicketDropdownMenu.css";
import ViewTicketModal from "./ViewTicketModal";
import AssignStaffModal from "./AssignStaffModal";

const TicketDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const menuRef = useRef();
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleAssign = (staffName) => {
    console.log("Assigned to:", staffName);
    // Add your assign logic here
  };

  const handleViewClick = () => {
    setIsOpen(false);
    setShowViewModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="ticket-dropdown-container" ref={menuRef}>
      <FiMenu className="ticket-menu-icon" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="ticket-dropdown-menu">
          <div className="ticket-dropdown-item" onClick={handleViewClick}>
            View <span>+</span>
          </div>
          <div className="ticket-dropdown-item" onClick={handleViewClick}>
            Reply <span>+</span>
          </div>
          <div
            className="ticket-dropdown-item"
            onClick={() => setShowAssignModal(true)}
          >
            Assign <span>+</span>
          </div>
          <div
            className="ticket-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            Close <span>+</span>
          </div>
        </div>
      )}
      {showViewModal && (
        <ViewTicketModal onClose={() => setShowViewModal(false)} />
      )}

      {showAssignModal && (
        <AssignStaffModal
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default TicketDropdownMenu;
