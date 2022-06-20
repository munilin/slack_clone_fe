import instance from '../../shared/axios';
import { createSlice } from '@reduxjs/toolkit';
import { chatAPI } from '../../shared/api';

//redux Toolkit
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    list: [],
  },
  reducers: {
    loadChatAction: (state, action) => {
      state.list = action.payload;
    },
    postChatAction: (state, action) => {
      state.list = action.payload;
    },
    loadChannelAction: (state, action) => {
      state.list = action.payload;
    },
    createChannelAction: (state, action) => {
      state.list = [...action.payload, action.payload];
    },
    deleteChannelAction: (state, action) => {
      console.log('삭제하기');
      const newChannel = state.list.filter(channel => channel.id !== action.payload);
      state.list = newChannel;
    },
  },
});

// 채널 목록 불러오기
export const loadChannel = () => {
  return function (dispatch) {
    console.log('채널 목록 불러오기');
    instance.get('http://localhost:5001/channel').then(response => {
      dispatch(loadChannelAction(response.data));
      console.log(response);
    });
  };
};

// 채널 추가하기
export const createChannel = channel => {
  return function (dispatch) {
    console.log('채널 추가하기');
    instance.post('http://localhost:5001/channel', channel).then(response => {
      console.log(response.data);
    });
    dispatch(createChannelAction());
  };
};

// axios 삭제하기
export const deleteChannel = list => {
  return function (dispatch) {
    instance.delete(`http://localhost:5001/channel/${list.id}`).then(response => {
      console.log(response.data);
    });
    dispatch(deleteChannelAction(list.id));
  };
};

// axios 가져오기
export const loadChat = () => {
  return function (dispatch) {
    instance.get('http://localhost:5001/chat').then(response => {
      dispatch(loadChatAction(response.data));
      console.log(response);
    });
  };
};
// axios 추가하기
export const postChat = chat => {
  return function (dispatch) {
    instance.post('http://localhost:5001/chat', chat).then(response => {
      console.log(response.data);
    });
    dispatch(postChatAction());
  };
};

export const { loadChatAction, postChatAction, createChannelAction, loadChannelAction, deleteChannelAction } = chatSlice.actions;
export default chatSlice.reducer;
