import React, { useState } from "react";
import { Header } from "./Header";
import { Filters } from "./Filters";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import UserModal from "./UserModal";
import ActivityModal from "./ActivityModel";
import RoleManagementModal from "./RoleManagementModal";
import "./UserManagement.css"; // Import the CSS file

const mockUsers = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index === 0 ? "admin" : index < 5 ? "seller" : "customer",
  status: index % 10 === 0 ? "blocked" : "active",
  lastLogin: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
}));

const ITEMS_PER_PAGE = 5;

// Mock user activity data
const generateMockActivity = (userId) => {
  return Array.from({ length: 5 }, (_, index) => ({
    id: `${userId}-activity-${index}`,
    action: [
      "Login",
      "Profile Update",
      "Password Change",
      "Order Placed",
      "Settings Changed",
    ][index],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    details: `Details for activity ${index + 1}`,
  }));
};


const getRoleBadgeColor = (role) => {
  switch (role) {
    case 'admin':
      return 'u-badge badge-admin';
    case 'seller':
      return 'u-badge badge-seller';
    case 'customer':
      return 'u-badge badge-customer';
    default:
      return 'u-badge badge-default';
  }
};

const getStatusBadgeColor = (status) => {
  return status === 'active' ? 'u-badge badge-active' : 'u-badge badge-inactive';
};

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userActivity, setUserActivity] = useState([]);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "customer",
    status: "active",
  });

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "all" || user.role === filter;
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: selectedUser.name,
              email: selectedUser.email,
              role: selectedUser.role,
              status: selectedUser.status,
            }
          : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUserId = (
        Math.max(...users.map((u) => parseInt(u.id))) + 1
      ).toString();
      const userToAdd = {
        id: newUserId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        lastLogin: new Date(),
      };
      setUsers([...users, userToAdd]);
    }

    setShowUserModal(false);
    setSelectedUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "customer",
      status: "active",
    });
  };

  const handleViewActivity = (user) => {
    setSelectedUser(user);
    setUserActivity(generateMockActivity(user.id));
    setShowActivityModal(true);
  };

  const handleToggleUserStatus = (user) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? { ...u, status: u.status === "active" ? "blocked" : "active" }
        : u
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="user-management">
      {" "}
      {/* Apply class for styling */}
      <Header className="header" />
      <Filters
        className="filters"
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        setShowUserModal={setShowUserModal}
      />
      <UserTable
        className="user-table"
        users={filteredUsers}
        setSelectedUser={setSelectedUser}
        setShowUserModal={setShowUserModal}
        paginatedUsers={paginatedUsers}
        setShowRoleModal={setShowRoleModal}
        setShowActivityModal={setShowActivityModal}
        setUsers={setUsers}
        handleViewActivity={handleViewActivity}
        getRoleBadgeColor={getRoleBadgeColor}
      />
      {/* totalPages ,currentPage,ITEMS_PER_PAGE,filteredUsers handlePageChange */}
      <Pagination
        className="pagination"
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        filteredUsers={filteredUsers}
        handlePageChange={handlePageChange}
      />
      <UserModal
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
        handleAddUser={handleAddUser}
      />
      <ActivityModal
        showActivityModal={showActivityModal}
        setShowActivityModal={setShowActivityModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        userActivity={userActivity}
        handleViewActivity={handleViewActivity}
      />
      <RoleManagementModal 
        showRoleModal={showRoleModal}
        setShowRoleModal={setShowRoleModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
        setUsers={setUsers}
        getRoleBadgeColor={getRoleBadgeColor}
      />
    </div>
  );
};

export default UserManagement;