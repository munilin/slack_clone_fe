import instance from './axios';

export const userApi = {
  // 로그인
  login: function (userData) {
    instance.post('user/login', { useremail: userData.useremail, password: userData.password });
  },

  // 회원 가입
  signup: function (userData) {
    instance.post('user/signup', {
      useremail: userData.useremail,
      password: userData.password,
      nickname: userData.nickname,
    });
  },
};

export const chatAPI = {
  loadChat: function () {
    return instance.get('/chat');
  },
  postChat: function (chat) {
    return instance.post('/chat', chat);
  },
  loadChannel: function () {
    return instance.get('/chat');
  },
  createChannel: function (channel) {
    return instance.post('chat', channel);
  },
  deleteChannel: function (list) {
    return instance.delete(`/channel/${list.id}`);
  },
};
