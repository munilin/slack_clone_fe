import { configureStorage } from '@reduxjs/toolkit';
import userReducer from './module/userSlice';

const store = configureStorage({
  reducer: {
    user: userReducer,
  },
});

export default store;
