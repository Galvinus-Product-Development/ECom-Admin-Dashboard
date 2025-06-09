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
  handleAddRole
}) => {
  const resetModal = () => {
    setShowRoleModal(false);
    setSelectedRole(null);
    setNewRole({
      name: '',
      description: '',
      permissions: [],
      users: 0,
    });
  };

  const handleChange = (field, value) => {
    selectedRole
      ? setSelectedRole({ ...selectedRole, [field]: value })
      : setNewRole({ ...newRole, [field]: value });
  };

  const currentData = selectedRole || newRole;

  const handleCheckboxChange = (module, action, checked) => {
    const updatedPermissions = [...currentData.permissions];
    const permissionId = `${module.toLowerCase()}-${action.toLowerCase()}`;

    if (checked) {
      updatedPermissions.push({ id: permissionId, module, action });
    } else {
      const index = updatedPermissions.findIndex(
        (p) => p.id === permissionId
      );
      if (index !== -1) updatedPermissions.splice(index, 1);
    }

    selectedRole
      ? setSelectedRole({ ...selectedRole, permissions: updatedPermissions })
      : setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  const isChecked = (module, action) => {
    const permissionId = `${module.toLowerCase()}-${action.toLowerCase()}`;
    return currentData.permissions.some((p) => p.id === permissionId);
  };

  return (
    showRoleModal && (
      <div className="role-modal-overlay">
        <div className="role-modal-box">
          <h2 className="role-modal-header">Create/ Edit Role</h2>

          <form className="role-modal-form" onSubmit={handleAddRole}>
            {/* Role Name */}
            <label>Role Name:</label>
            <input
              type="text"
              value={currentData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

            {/* Description */}
            <label>Description:</label>
            <textarea
              rows="3"
              value={currentData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
            />

            {/* Permissions Table */}
            <label>Assign Permissions (Per Module)</label>
            <div className="permission-table-container">
              <table className="permission-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Create</th>
                    <th>Read</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => (
                    <tr key={module}>
                      <td>{module}</td>
                      {['Create', 'Read', 'Update', 'Delete'].map((action) => (
                        <td key={action}>
                          <input
                            type="checkbox"
                            checked={isChecked(module, action)}
                            onChange={(e) =>
                              handleCheckboxChange(module, action, e.target.checked)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            <div className="role-modal-buttons">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" className="btn-cancel" onClick={resetModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEditRoleModal;
