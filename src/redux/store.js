import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
