import React from "react";
import "./TableRow.css"; // Import the CSS file
import {
  User as UserIcon,
  Edit,
  History,
  Ban,
  Unlock,
  Shield,
  Delete,
} from "lucide-react";

export const TableRow = ({
  user,
  getRoleBadgeColor,
  getStatusBadgeColor,
  setSelectedUser,
  setShowUserModal,
  setShowRoleModal,
  setShowActivityModal,
  users,
  setUsers,
  handleViewActivity,
}) => (
  <tr className="table-row-hover">
    {" "}
    {/* Apply hover effect class */}
    <td className="table-cell">
      <div className="flex items-center">
        <div className="user-avatar">
          <UserIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="ml-4">
          <div className="user-name">{user.name}</div>
        </div>
      </div>
    </td>
    <td className="table-cell">
      <span className={`badge ${getRoleBadgeColor(user.email)}`}>
        {user.email.charAt(0).toUpperCase() + user.email.slice(1)}
      </span>
    </td>
    <td className="table-cell">
      <span className={`badge ${getRoleBadgeColor(user.role)}`}>
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </span>
    </td>
    <td className="table-cell">
      <span className={`badge ${getStatusBadgeColor(user.status)}`}>
        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
      </span>
    </td>
    <td className="table-cell text-sm text-gray-500">
      {user.lastLogin.toLocaleString()}
    </td>
    <td className="table-cell text-sm text-gray-500">
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            setSelectedUser(user);
            setShowUserModal(true);
          }}
          title="Edit User"
        >
          <Edit size={16} />
        </button>
        <button
          className="button"
          onClick={() => {
            setSelectedUser(user);
            setShowActivityModal(true);
            handleViewActivity(user);
          }}
          title="View Activity"
        >
          <History size={16} />
        </button>
        <button
          className="button"
          onClick={() => {
            const updatedUsers = users.map((u) =>
              u.id === user.id
                ? { ...u, status: u.status === "active" ? "blocked" : "active" }
                : u
            );
            setUsers(updatedUsers);
          }}
          title={user.status === "active" ? "Block User" : "Unblock User"}
        >
          {user.status === "active" ? <Ban size={16} /> : <Unlock size={16} />}
        </button>
        <button
          className="button"
          onClick={() => {
            setSelectedUser(user);
            setShowRoleModal(true);
          }}
          title="Manage Roles"
        >
          <Shield size={16} />
        </button>
        <button className="button" title="Delete">
          <Delete size={16} />
        </button>
      </div>
    </td>
  </tr>
);
