import React from "react";
import { XCircle } from "lucide-react";
import "./Modal.css";

function Modal({ selectedRole, showRoleModal, setShowRoleModal }) {
  return (
    <div>
      {showRoleModal && (
        <div className="modal-overlay">
          {/* Modal Content */}
          <div className="modal-content">
            <h2 className="modal-title">
              {selectedRole ? "Edit Role" : "Create Role"}
            </h2>
            <p className="modal-description">
              {selectedRole
                ? "Edit the role details below."
                : "Create a new role by filling out the details below."}
            </p>
            <button
              onClick={() => setShowRoleModal(false)}
              className="modal-close-button"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
