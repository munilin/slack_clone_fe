// axios
// import instance from "../../shared/axios";

// toolkit - Slice
import { createSlice } from "@reduxjs/toolkit";

// API
import { chatAPI } from "../../shared/api";

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
export const loadChannel = () => async (dispatch) => {
  try {
    const res = await chatAPI.loadChannel();
    dispatch(loadChannelAction(res.data));
  } catch (error) {
    console.log(error);
  }
};

// 채널 추가하기
export const createChannel = (channel) => async (dispatch) => {
  try {
    const res = await chatAPI.createChannel(channel);
    dispatch(createChannelAction(res.data));
  } catch (error) {
    console.log(error);
  }
};

// 채널 삭제하기
export const deleteChannel = (list) => async (dispatch) => {
  try {
    const res = await chatAPI.deleteChannel(list);
    console.log(list);
    dispatch(deleteChannelAction(list.id));
  } catch (error) {
    console.log(error);
  }
};

// 액션, 리듀서 내보내기
export const { createChannelAction, loadChannelAction, deleteChannelAction } =
  channelSlice.actions;
export default channelSlice.reducer;
