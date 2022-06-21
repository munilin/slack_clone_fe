// axios
import instance from "../../shared/axios";

// toolkit - Slice
import { createSlice } from "@reduxjs/toolkit";

// API
// import { chatAPI } from '../../shared/api';

// redux Toolkit
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    list: [],
  },
  reducers: {
    loadChatAction: (state, action) => {
      state.list = action.payload;
    },
    postChatAction: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

// 채팅 목록 불러오기
export const loadChat = () => {
  return function (dispatch) {
    instance.get("http://localhost:5001/chat").then((response) => {
      dispatch(loadChatAction(response.data));
      console.log(response);
    });
  };
};

// 채팅 추가하기
export const postChat = (chat) => {
  return function (dispatch) {
    instance.post("http://localhost:5001/chat", chat).then((response) => {
      dispatch(postChatAction(response.data));
      console.log(response);
    });
  };
};

// 액션,리듀서 내보내기
export const {
  loadChatAction,
  postChatAction,
} = chatSlice.actions;
export default chatSlice.reducer;
