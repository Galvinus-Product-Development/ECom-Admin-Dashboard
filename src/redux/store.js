// store.js
import { configureStore } from '@reduxjs/toolkit';
import userManagementReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    userManagement: userManagementReducer,
  },
});