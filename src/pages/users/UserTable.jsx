import React from "react";
import "./UserTable.css"; // Import the CSS file
import { TableRow } from "./TableRow";

export const UserTable = ({
  users,
  setSelectedUser,
  setShowUserModal,
  paginatedUsers,
  setShowRoleModal,
  setShowActivityModal,
  setUsers,
  handleViewActivity,
  getRoleBadgeColor,
}) => {
  // const getRoleBadgeColor = (role) => {
  //   switch (role) {
  //     case "admin":
  //       return "badge badge-admin";
  //     case "seller":
  //       return "badge badge-seller";
  //     case "customer":
  //       return "badge badge-customer";
  //     default:
  //       return "badge badge-default";
  //   }
  // };

  const getStatusBadgeColor = (status) => {
    return status === "active" ? "badge badge-active" : "badge badge-inactive";
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead className="table-headers">
          <tr>
            <th className="table-header-th">User</th>
            <th className="table-header-th">Email</th>
            <th className="table-header-th">Role</th>
            <th className="table-header-th">Status</th>
            <th className="table-header-th">Last Login</th>
            <th className="table-header-th">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {paginatedUsers.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              getRoleBadgeColor={getRoleBadgeColor}
              getStatusBadgeColor={getStatusBadgeColor}
              setSelectedUser={setSelectedUser}
              setShowUserModal={setShowUserModal}
              setShowRoleModal={setShowRoleModal}
              setShowActivityModal={setShowActivityModal}
              users={users}
              setUsers={setUsers}
              handleViewActivity={handleViewActivity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
