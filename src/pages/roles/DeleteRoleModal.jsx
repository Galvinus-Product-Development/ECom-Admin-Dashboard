import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './DeleteRoleModal.css';

const DeleteRoleModal = ({
  showDeleteModal,
  selectedRole,
  setShowDeleteModal,
  setSelectedRole,
  handleDeleteRole
}) => {
  return (
    showDeleteModal && selectedRole && (
      <div className="delete-role-modal-overlay">
        <div className="delete-role-modal-container">
          <div className="delete-role-modal-header">
            <h2 className="delete-role-modal-title">Delete Role</h2>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedRole(null);
              }}
              className="delete-role-modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
          <div className="delete-role-modal-body">
            <div className="delete-role-warning">
              <AlertTriangle size={20} />
              <p className="delete-role-warning-text">This action cannot be undone.</p>
            </div>
            <p className="delete-role-description">
              Are you sure you want to delete the role "{selectedRole.name}"? This will affect {selectedRole.users} users.
            </p>
          </div>
          <div className="delete-role-modal-footer">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedRole(null);
              }}
              className="delete-role-cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteRole}
              className="delete-role-delete-btn"
            >
              Delete Role
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteRoleModal;
