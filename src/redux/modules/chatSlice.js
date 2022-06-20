import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

//redux Toolkit
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    list: [
      { name: "dabin", message: "초기값 입니다" },
      { name: "heerin", message: "이건 init 초기값" },
    ],
  },
  reducers: {
    loadChatAction: (state, action) => {
      state.data = action.payload;
    },
    postChatAction: (state, action) => {
      state.data = action.payload;
    },
  },
});

// axios 가져오기
export const loadChat = () => {
  return function (dispatch) { // 왜 한개씩만 넘어와 데이터가
    instance.get("http://localhost:5001/data").then((response) => {
      dispatch(loadChatAction(response.data));
      console.log(response);
    });
  };
};

// axios 추가하기
export const postChat = (chat) => {
  return function (dispatch) {
    instance.post("http://localhost:5001/data", chat).then((response) => {
      console.log(response.data);
    });
    dispatch(postChatAction());
  };
};

export const { loadChatAction, postChatAction } = chatSlice.actions;
export default chatSlice.reducer;