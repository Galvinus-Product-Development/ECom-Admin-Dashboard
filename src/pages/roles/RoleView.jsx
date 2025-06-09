import { X } from 'lucide-react';
import './RoleView.css';

const RoleView = ({ selectedRole, setShowRoleView }) => {
  const groupedPermissions = {};

  selectedRole.permissions.forEach(({ module, action }) => {
    if (!groupedPermissions[module]) {
      groupedPermissions[module] = [];
    }
    groupedPermissions[module].push(action);
  });

  return (
    <div className="role-view-modal-overlay">
      <div className="role-view-modal-content">
        <button className="role-view-close-button" onClick={() => setShowRoleView(false)}>
          <X size={20} />
        </button>

        <div className="role-view-header">Role: {selectedRole.name}</div>

        <label className="role-description-label">Description:</label>
        <div className="role-description-box">{selectedRole.description}</div>

        <div className="role-users">
          <span className="role-users-label">User Assigned:</span> {String(selectedRole.users).padStart(2, '0')}
        </div>

        <div className="role-modules-label">Module Assigned:</div>
        <table className="permissions-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedPermissions).map(([module, actions]) => (
              <tr key={module}>
                <td>{module}</td>
                <td>{actions.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleView;
