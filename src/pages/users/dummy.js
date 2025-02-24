// UserManagement.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./Header";
import { Filters } from "./Filters";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import UserModal from "./UserModal";
import ActivityModal from "./ActivityModal";
import RoleManagementModal from "./RoleManagementModal";
import "./UserManagement.css";
import {
  setFilter,
  setSearch,
  setCurrentPage,
  setShowUserModal,
  setShowActivityModal,
  setShowRoleModal,
  setSelectedUser,
  setUserActivity,
  submitUser,
  toggleUserStatus,
  setNewUser,
} from "../store/userManagementSlice";
import {
  selectFilteredUsers,
  selectTotalPages,
  selectPaginatedUsers,
  selectCurrentPage,
  selectFilter,
  selectSearch,
  selectShowUserModal,
  selectShowActivityModal,
  selectShowRoleModal,
  selectedUser,
  selectUserActivity,
  selectNewUser,
} from "../store/selectors";

const ITEMS_PER_PAGE = 5;

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
  const dispatch = useDispatch();

  const filteredUsers = useSelector(selectFilteredUsers);
  const totalPages = useSelector(selectTotalPages);
  const paginatedUsers = useSelector(selectPaginatedUsers);
  const currentPage = useSelector(selectCurrentPage);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);
  const showUserModal = useSelector(selectShowUserModal);
  const showActivityModal = useSelector(selectShowActivityModal);
  const showRoleModal = useSelector(selectShowRoleModal);
  const selectedUser = useSelector(selectedUser);
  const userActivity = useSelector(selectUserActivity);
  const newUser = useSelector(selectNewUser);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(submitUser());
  };

  const handleViewActivity = (user) => {
    dispatch(setSelectedUser(user));
    const activity = generateMockActivity(user.id);
    dispatch(setUserActivity(activity));
    dispatch(setShowActivityModal(true));
  };

  const handleToggleUserStatus = (user) => {
    dispatch(toggleUserStatus(user.id));
  };

  return (
    <div className="user-management">
      <Header className="header" />
      <Filters
        className="filters"
        filter={filter}
        setFilter={(value) => dispatch(setFilter(value))}
        search={search}
        setSearch={(value) => dispatch(setSearch(value))}
        setShowUserModal={(value) => dispatch(setShowUserModal(value))}
      />
      <UserTable
        className="user-table"
        users={filteredUsers}
        setSelectedUser={(user) => dispatch(setSelectedUser(user))}
        setShowUserModal={(value) => dispatch(setShowUserModal(value))}
        paginatedUsers={paginatedUsers}
        setShowRoleModal={(value) => dispatch(setShowRoleModal(value))}
        setShowActivityModal={(value) => dispatch(setShowActivityModal(value))}
        handleViewActivity={handleViewActivity}
        getRoleBadgeColor={getRoleBadgeColor}
        handleToggleUserStatus={handleToggleUserStatus}
      />
      <Pagination
        className="pagination"
        totalPages={totalPages}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        filteredUsers={filteredUsers}
        handlePageChange={handlePageChange}
      />
      <UserModal
        selectedUser={selectedUser}
        showUserModal={showUserModal}
        setShowUserModal={(value) => dispatch(setShowUserModal(value))}
        handleAddUser={handleAddUser}
        setSelectedUser={(user) => dispatch(setSelectedUser(user))}
        newUser={newUser}
        setNewUser={(user) => dispatch(setNewUser(user))}
      />
      <ActivityModal
        showActivityModal={showActivityModal}
        setShowActivityModal={(value) => dispatch(setShowActivityModal(value))}
        selectedUser={selectedUser}
        userActivity={userActivity}
      />
      <RoleManagementModal
        showRoleModal={showRoleModal}
        setShowRoleModal={(value) => dispatch(setShowRoleModal(value))}
        selectedUser={selectedUser}
        setSelectedUser={(user) => dispatch(setSelectedUser(user))}
        getRoleBadgeColor={getRoleBadgeColor}
      />
    </div>
  );
};

export default UserManagement;