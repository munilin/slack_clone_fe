import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";
import { useNavigate } from "react-router-dom";

export const createUserDB = userData => {
  const navigate = useNavigate();
  return async function () {
    try {
      const response = await instance.post('/user/signup', userData)
      alert(response);
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
  },

  reducers: {
    loadUser: (state, action) => {
      state.list = [...action.payload];
    },
    createUser: (state, action) => {
      state.list.push(action.payload),
    },
    updateUser: (state, action) => {
      // 내용 채우기
    },
  }
});

export const { loadUser, createUser, updateUser};
export default userSlice.reducer;