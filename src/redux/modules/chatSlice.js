import instance from "../../shared/axios";
import { createSlice } from "@reduxjs/toolkit";
import { chatAPI } from "../../shared/api";

//redux Toolkit
const chatSlice = createSlice({
  name: "chat",
  initialState: {},
  reducers: {
    loadChatAction: (state, action) => {
      state.data = action.payload;
    },
    postChatAction: (state, action) => {
      state.data = action.payload;
    },
    loadChannelAction: (state, action) => {
      state.data = action.payload;
    },
    createChannelAction: (state, action) => {
      state.data = action.payload;
    },
    deleteChannelAction: (state, action) => {
      state.data = action.payload;
    },
  },
});

// axios 가져오기
export const loadChannel = () => {
  return function (dispatch) {
    instance.get("http://localhost:5001/channel").then((response) => {
      dispatch(loadChannelAction(response.data));

      console.log(response);
    });
  };
};

// axios 추가하기
export const createChannel = (channel) => {
  return function (dispatch) {
    instance.post("http://localhost:5001/channel", channel).then((response) => {
      console.log(response.data);
    });
    dispatch(createChannelAction());
  };
};

// axios 삭제하기
export const deleteChannel = (list) => {
  return function (dispatch) {
    instance.delete(`http://localhost:5001/channel/${list.id}`).then((response) => {
      console.log(response.data);
    });
    dispatch(deleteChannelAction());
  };
};

// axios 가져오기
export const loadChat = () => {
  return function (dispatch) {
    instance.get("http://localhost:5001/chat").then((response) => {
      dispatch(loadChatAction(response.data));
      console.log(response);
    });
  };
};
// axios 추가하기
export const postChat = (chat) => {
  return function (dispatch) {
    instance.post("http://localhost:5001/chat", chat).then((response) => {

      console.log(response.data);
    });
    dispatch(postChatAction());
  };
};

export const {
  loadChatAction,
  postChatAction,
  createChannelAction,
  loadChannelAction,
  deleteChannelAction,
} = chatSlice.actions;
export default chatSlice.reducer;

