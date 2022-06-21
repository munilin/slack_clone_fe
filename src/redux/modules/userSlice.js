import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../../shared/token';
import { userApi } from '../../shared/api';

export const loginDB = userData => {
  return async function () {
    try {
      const response = await userApi.login(userData);
      console.log(response.token);
      setToken(response.token);
      localStorage.setItem(response.username);
    } catch (error) {
      alert(error);
    }
  };
};

export const createUser = userData => {
  return async function () {
    try {
      await userApi.signup(userData);
      alert('success');
    } catch (error) {
      alert(error);
    }
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
  },

  reducers: {
    loadUser: (state, action) => {
      state.list = [...action.payload];
    },
    updateUser: (state, action) => {
      // 내용 채우기
    },
  },
});

export const { loadUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
