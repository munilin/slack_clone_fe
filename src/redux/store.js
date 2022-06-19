import { configureStore } from '@reduxjs/toolkit';
import userReducer from './module/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
