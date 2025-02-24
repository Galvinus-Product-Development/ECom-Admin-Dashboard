// selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectUsers = (state) => state.userManagement.users;
export const selectedUser = (state) => state.userManagement.selectedUser;
export const selectShowUserModal = (state) => state.userManagement.showUserModal;
export const selectShowActivityModal = (state) => state.userManagement.showActivityModal;
export const selectShowRoleModal = (state) => state.userManagement.showRoleModal;
export const selectFilter = (state) => state.userManagement.filter;
export const selectSearch = (state) => state.userManagement.search;
export const selectCurrentPage = (state) => state.userManagement.currentPage;
export const selectUserActivity = (state) => state.userManagement.userActivity;
export const selectNewUser = (state) => state.userManagement.newUser;
const ITEMS_PER_PAGE=5;
export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter, selectSearch],
  (users, filter, search) =>
    users.filter((user) => {
      const matchesFilter = filter === "all" || user.role === filter;
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    })
);

export const selectPaginatedUsers = createSelector(
  [selectFilteredUsers, selectCurrentPage],
  (filteredUsers, currentPage) =>
    filteredUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    )
);

export const selectTotalPages = createSelector(
  [selectFilteredUsers],
  (filteredUsers) => Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
);