import React from 'react';
import { Edit, Trash2, Users, Shield } from 'lucide-react';
import './RolesGrid.css';

const RolesGrid = ({ filteredRoles, setSelectedRole, setShowRoleModal, setShowDeleteModal, getPermissionIcon }) => {
  return (
    <div className="roles-list-container">
      {filteredRoles.map((role) => (
        <div key={role.id} className="roles-list-item">
          <div className="roles-list-item-content">
            <div className="roles-list-header">
              <h3 className="roles-list-title">{role.name}</h3>
              <div className="roles-list-actions">
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowRoleModal(true);
                  }}
                  className="roles-list-edit-btn"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowDeleteModal(true);
                  }}
                  className="roles-list-delete-btn"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="roles-list-description">{role.description}</p>
            
            {/* Role Stats */}
            <div className="roles-list-stats">
              <div className="roles-list-stat">
                <Users size={16} className="roles-list-stat-icon" />
                <span>{role.users} users</span>
              </div>
              <div className="roles-list-stat">
                <Shield size={16} className="roles-list-stat-icon" />
                <span>{role.permissions.length} permissions</span>
              </div>
            </div>

            {/* Permissions List */}
            <div className="roles-list-permissions">
              <h4 className="roles-list-permissions-title">Permissions</h4>
              {role.permissions.map((permission) => (
                <div key={permission.id} className="roles-list-permission">
                  <div className="roles-list-permission-header">
                    <span className="roles-list-permission-name">{permission.name}</span>
                    <span className="roles-list-permission-module">
                      {permission.module}
                    </span>
                  </div>
                  <div className="roles-list-permission-actions">
                    {permission.actions.map((action) => (
                      <div key={action} className="roles-list-permission-action">
                        {getPermissionIcon(action)}
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Last Updated */}
            <div className="roles-list-last-updated">
              Last updated {role.updatedAt.toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesGrid;
