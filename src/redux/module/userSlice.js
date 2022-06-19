import { createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/axios';

export const loginDB = ({ useremail, password }) => {
  return async function (navigate) {};
};

export const createUserDB = ({ useremail, password, username }) => {
  return async function (navigate) {
    alert(username);
    try {
      const response = await instance.post('/user/signup', (useremail, password, username));
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
      state.list.push(action.payload);
    },
    updateUser: (state, action) => {
      // 내용 채우기
    },
  },
});

export const { loadUser, createUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
