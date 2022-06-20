import { createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/axios';
import { setToken } from '../../shared/token';
import { authApi } from '../../shared/api';

export const loginDB = ({ useremail, password }) => {
  return async function (navigate) {
    try {
      const response = await authApi.login(useremail, password);
      console.log(response.token);
      setToken(response.token);
      localStorage.setItem(response.username);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };
};

export const createUserDB = ({ useremail, password, username }) => {
  return async function (navigate) {
    try {
      const response = await authApi.signup(useremail, password, username);
      alert(response);
      navigate('/login');
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
    createUser: (state, action) => {
      state.list.push(...state, action.payload);
    },
    updateUser: (state, action) => {
      // 내용 채우기
    },
  },
});

export const { loadUser, createUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
