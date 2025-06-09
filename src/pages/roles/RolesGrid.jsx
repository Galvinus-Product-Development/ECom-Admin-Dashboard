import { Edit, Eye, Shield, Trash2, Users } from 'lucide-react';
import './RolesGrid.css';

const RolesGrid = ({ 
  filteredRoles, 
  setSelectedRole, 
  setShowRoleModal, 
  setShowDeleteModal, 
  setShowRoleView,
  mockPermissions // Added to check if role has all permissions
}) => {
  return (
    <div className="roles-grid-container">
      {filteredRoles.map((role) => {
        const hasAllPermissions = role.permissions?.length === mockPermissions.length;
        
        return (
          <div key={role.id} className="role-card">
            {/* Card Header */}
            <div className="card-header">
              <h3 className="role-title">{role.name}</h3>
              <div className="card-actions">
              <button 
  className="action-btn view-btn"
  onClick={() => {
    setSelectedRole(role);
    setShowRoleView(true); // ✅ show RoleView component
  }}
>
  <Eye size={16} />
</button>

                <button
                  className="action-btn edit-btn"
                  onClick={() => {
                    setSelectedRole(role);
                    setShowRoleModal(true);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => {
                    setSelectedRole(role);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <p className="role-description">{role.description}</p>
              
              {/* Stats Row */}
              <div className="stats-row">
                <div className="stat-item">
                  <Users size={16} className="stat-icon" />
                  <span>{role.users} users</span>
                </div>
                <div className="stat-item">
                  <Shield size={16} className="stat-icon" />
                  <span>{hasAllPermissions ? 'Full' : `${role.permissions?.length || 0} permissions`}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="card-footer">
              <span className="last-updated">Last updated {role.updatedAt.toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RolesGrid;
// import { Edit, Shield, Trash2, Users } from 'lucide-react';
// import './RolesGrid.css';

// const RolesGrid = ({ filteredRoles, setSelectedRole, setShowRoleModal, setShowDeleteModal, getPermissionIcon }) => {
//   return (
//     <div className="roles-list-container">
//       {filteredRoles.map((role) => (
//         <div key={role.id} className="roles-list-item">
//           <div className="roles-list-item-content">
//             <div className="roles-list-header">
//               <h3 className="roles-list-title">{role.name}</h3>
//               <div className="roles-list-actions">
//                 <button
//                   onClick={() => {
//                     setSelectedRole(role);
//                     setShowRoleModal(true);
//                   }}
//                   className="roles-list-edit-btn"
//                 >
//                   <Edit size={16} />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedRole(role);
//                     setShowDeleteModal(true);
//                   }}
//                   className="roles-list-delete-btn"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//             <p className="roles-list-description">{role.description}</p>
            
//             {/* Role Stats */}
//             <div className="roles-list-stats">
//               <div className="roles-list-stat">
//                 <Users size={16} className="roles-list-stat-icon" />
//                 <span>{role.users} users</span>
//               </div>
//               <div className="roles-list-stat">
//                 <Shield size={16} className="roles-list-stat-icon" />
//                 <span>{role.permissions.length} permissions</span>
//               </div>
//             </div>

//             {/* Permissions List */}
//           {/* Permissions List */}
// <div className="roles-list-permissions">
//   <h4 className="roles-list-permissions-title">Permissions</h4>
//   {role.permissions?.map((permission) => (
//     <div key={permission.id} className="roles-list-permission">
//       <div className="roles-list-permission-header">
//         <span className="roles-list-permission-module">
//           {permission.module}
//         </span>
//       </div>
//       <div className="roles-list-permission-actions">
//         <div className="roles-list-permission-action">
//           {getPermissionIcon(permission.action.toLowerCase())}
//           <span>{permission.action}</span>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//             {/* Last Updated */}
//             <div className="roles-list-last-updated">
//               Last updated {role.updatedAt.toLocaleDateString()}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RolesGrid;
