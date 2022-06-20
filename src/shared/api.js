import instance from './axios';

export const authApi = {
  // e.g) 로그인
  login: (useremail, password) =>
    instance.get('user/login/', {
      useremail,
      password,
    }),

  // e.g) 회원 가입
  signup: (useremail, password, username) =>
    instance.post('/user/signup', {
      useremail,
      password,
      username,
    }),

  // // e.g) 유저 프로필 변경
  // editUserProfile: someData =>
  //   instance.put(`api/user/${userId}`, {
  //     someData: someData,
  //     someOtherData: someOtherData,
  //   }),
};
