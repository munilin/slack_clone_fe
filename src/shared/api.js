import instance from './axios';

export const userApi = {
  // 로그인
  login: function (data) {
    instance.post('http://localhost:5001/login', data);
  },

  // 회원 가입
  signup: function (data) {
    instance.post('http://localhost:5001/user', data);
  },
};

export const chatAPI = {
  loadChat: function () {
    return instance.get('http://localhost:5001/chat');
  },
  postChat: function (chat) {
    return instance.post('http://localhost:5001/chat');
  },
  loadChannel: function () {
    return instance.get('http://localhost:5001/chat');
  },
  createChannel: function (channel) {
    return instance.post('http://localhost:5001/chat');
  },
  deleteChannel: function (channel) {
    return instance.delete('http://localhost:5001/chat');
  },
};
