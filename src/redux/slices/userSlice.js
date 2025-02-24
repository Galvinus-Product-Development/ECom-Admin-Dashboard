// userManagementSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 5;

const mockUsers = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index === 0 ? "admin" : index < 5 ? "seller" : "customer",
  status: index % 10 === 0 ? "blocked" : "active",
  lastLogin: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
}));

const initialState = {
  users: mockUsers,
  selectedUser: null,
  showUserModal: false,
  showActivityModal: false,
  showRoleModal: false,
  filter: "all",
  search: "",
  currentPage: 1,
  userActivity: [],
  newUser: {
    name: "",
    email: "",
    role: "customer",
    status: "active",
  },
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setShowUserModal: (state, action) => {
      state.showUserModal = action.payload;
    },
    setShowActivityModal: (state, action) => {
      state.showActivityModal = action.payload;
    },
    setShowRoleModal: (state, action) => {
      state.showRoleModal = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUserActivity: (state, action) => {
      state.userActivity = action.payload;
    },
    setNewUser: (state, action) => {
      state.newUser = action.payload;
    },
    resetNewUser: (state) => {
      state.newUser = initialState.newUser;
    },
    submitUser: (state) => {
      if (state.selectedUser) {
        // Update existing user
        state.users = state.users.map((user) =>
          user.id === state.selectedUser.id
            ? { ...state.selectedUser, lastLogin: user.lastLogin }
            : user
        );
        state.selectedUser = null;
      } else {
        // Add new user
        const newUserId = Math.max(...state.users.map((u) => parseInt(u.id))) + 1;
        state.users.push({
          id: newUserId.toString(),
          ...state.newUser,
          lastLogin: new Date(),
        });
        state.newUser = initialState.newUser;
      }
      state.showUserModal = false;
    },
    toggleUserStatus: (state, action) => {
      const userId = action.payload;
      state.users = state.users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      );
    },
  },
});

export const {
  setUsers,
  setSelectedUser,
  setShowUserModal,
  setShowActivityModal,
  setShowRoleModal,
  setFilter,
  setSearch,
  setCurrentPage,
  setUserActivity,
  setNewUser,
  resetNewUser,
  submitUser,
  toggleUserStatus,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;