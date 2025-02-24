import React from 'react';
import { X } from 'lucide-react';
import './AddEditRoleModal.css';

const AddEditRoleModal = ({
  showRoleModal,
  setShowRoleModal,
  selectedRole,
  setSelectedRole,
  newRole,
  setNewRole,
  modules,
  mockPermissions,
  handleAddRole,
  getPermissionIcon
}) => {
  return (
    showRoleModal && (
      <div className="role-modal-overlay">
        <div className="role-modal-container">
          <div className="role-modal-header">
            <h2 className="role-modal-title">
              {selectedRole ? 'Edit Role' : 'Create New Role'}
            </h2>
            <button
              onClick={() => {
                setShowRoleModal(false);
                setSelectedRole(null);
                setNewRole({
                  name: '',
                  description: '',
                  permissions: [],
                  users: 0,
                });
              }}
              className="role-modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleAddRole} className="role-modal-form">
            <div>
              <label className="role-modal-label">Role Name</label>
              <input
                type="text"
                value={selectedRole ? selectedRole.name : newRole.name}
                onChange={(e) => selectedRole
                  ? setSelectedRole({ ...selectedRole, name: e.target.value })
                  : setNewRole({ ...newRole, name: e.target.value })
                }
                className="role-modal-input"
                required
              />
            </div>
            <div>
              <label className="role-modal-label">Description</label>
              <textarea
                value={selectedRole ? selectedRole.description : newRole.description}
                onChange={(e) => selectedRole
                  ? setSelectedRole({ ...selectedRole, description: e.target.value })
                  : setNewRole({ ...newRole, description: e.target.value })
                }
                rows={3}
                className="role-modal-textarea"
                required
              />
            </div>
            <div>
              <label className="role-modal-label mb-2">Permissions</label>
              <div className="role-modal-permissions">
                {modules.map(module => (
                  <div key={module} className="role-modal-permission-group">
                    <h3 className="role-modal-permission-title">{module}</h3>
                    <div className="role-modal-permission-list">
                      {mockPermissions
                        .filter(permission => permission.module === module)
                        .map(permission => (
                          <div key={permission.id} className="role-modal-permission-item">
                            <input
                              type="checkbox"
                              id={permission.id}
                              checked={selectedRole
                                ? selectedRole.permissions.some(p => p.id === permission.id)
                                : newRole.permissions.some(p => p.id === permission.id)
                              }
                              onChange={(e) => {
                                const permissions = e.target.checked
                                  ? [...(selectedRole ? selectedRole.permissions : newRole.permissions), permission]
                                  : (selectedRole ? selectedRole.permissions : newRole.permissions)
                                      .filter(p => p.id !== permission.id);
                                
                                selectedRole
                                  ? setSelectedRole({ ...selectedRole, permissions })
                                  : setNewRole({ ...newRole, permissions });
                              }}
                              className="role-modal-permission-checkbox"
                            />
                            <label htmlFor={permission.id} className="role-modal-permission-label">
                              <div className="role-modal-permission-name">{permission.name}</div>
                              <div className="role-modal-permission-description">{permission.description}</div>
                              <div className="role-modal-permission-actions">
                                {permission.actions.map(action => (
                                  <span
                                    key={action}
                                    className="role-modal-permission-action"
                                  >
                                    {getPermissionIcon(action)}
                                    <span>{action}</span>
                                  </span>
                                ))}
                              </div>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="role-modal-footer">
              <button
                type="button"
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedRole(null);
                  setNewRole({
                    name: '',
                    description: '',
                    permissions: [],
                    users: 0,
                  });
                }}
                className="role-modal-cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="role-modal-submit-btn"
              >
                {selectedRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEditRoleModal;
