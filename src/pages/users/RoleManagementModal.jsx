import React from "react";
import { X, Shield } from "lucide-react";
import "./RoleManagementModal.css";

const RoleManagementModal = ({
  showRoleModal,
  setShowRoleModal,
  selectedUser,
  setSelectedUser,
  users,
  setUsers,
  getRoleBadgeColor
}) => {
  if (!showRoleModal || !selectedUser) return null;

  const handleClose = () => {
    setShowRoleModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="role-modal-overlay">
      <div className="role-modal-container">
        <div className="role-modal-header">
          <h2 className="role-modal-title">Manage Role - {selectedUser.name}</h2>
          <button className="role-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="role-modal-body">
          <div>
            <label className="role-label">Current Role</label>
            <div className={`role-badge ${getRoleBadgeColor(selectedUser.role)}`}>
              {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
            </div>
          </div>

          <div>
            <label className="role-label">Change Role</label>
            <div className="role-grid">
              {["customer", "seller", "admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    const updatedUsers = users.map((u) =>
                      u.id === selectedUser.id ? { ...u, role } : u
                    );
                    setUsers(updatedUsers);
                    setSelectedUser({ ...selectedUser, role });
                  }}
                  className={`role-button ${
                    selectedUser.role === role ? "role-selected" : "role-default"
                  }`}
                >
                  <div className="text-center">
                    <Shield
                      className={`role-icon ${
                        selectedUser.role === role ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`role-text ${
                        selectedUser.role === role ? "text-blue-700" : "text-gray-900"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="role-modal-footer">
          <button className="role-cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="role-save-btn" onClick={handleClose}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementModal;
