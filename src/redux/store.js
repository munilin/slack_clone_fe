import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import chatReducer from './modules/chatSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

export default store;
