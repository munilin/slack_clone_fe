import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import chatReducer from './modules/chatSlice';
import channelReducer from './modules/channelSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    channel: channelReducer,
  },
});

export default store;
