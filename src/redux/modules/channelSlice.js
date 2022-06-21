// axios
import instance from "../../shared/axios";

// toolkit - Slice
import { createSlice } from "@reduxjs/toolkit";

// API
// import { chatAPI } from '../../shared/api';

// redux Toolkit
const channelSlice = createSlice({
  name: "channel",
  initialState: {
    list: [],
  },
  reducers: {
    loadChannelAction: (state, action) => {
      state.list = action.payload;
    },
    createChannelAction: (state, action) => {
      state.list.push(action.payload);
    },
    deleteChannelAction: (state, action) => {
      console.log("삭제하기");
      const newChannel = state.list.filter(
        (channel) => channel.id !== action.payload
      );
      state.list = newChannel;
    },
  },
});

// 채널 목록 불러오기
export const loadChannel = () => {
  return function (dispatch) {
    instance.get("http://localhost:5001/channel").then((response) => {
      dispatch(loadChannelAction(response.data));
      console.log(response);
    });
  };
};

// 채널 추가하기
export const createChannel = (channel) => {
  return function (dispatch) {
    instance.post("http://localhost:5001/channel", channel).then((response) => {
      dispatch(createChannelAction(response.data));
      console.log(response.data);
    });
  };
};

// 채널 삭제하기
export const deleteChannel = (list) => {
  return function (dispatch) {
    instance
      .delete(`http://localhost:5001/channel/${list.id}`)
      .then((response) => {
        console.log(response.data);
      });
    dispatch(deleteChannelAction(list.id));
  };
};

// 액션, 리듀서 내보내기
export const { createChannelAction, loadChannelAction, deleteChannelAction } =
  channelSlice.actions;
export default channelSlice.reducer;
