import instance from './axios';

export const userApi = {
  // 로그인
  login: function (data) {
    instance.post('/user/login', data);
  },

  // 회원 가입
  signup: function (data) {
    instance.post('/user/signup', data);
  },
};

export const chatAPI = {
  loadChat: function (id) {
    return instance.get(`/api/channel/${id}/messages`);
    // return instance.get("http://localhost:5001/chat");
  },
  postChat: function (id, message) {
    //chatroom /pub
    return instance.post(`/api/channel/${id}/messages`, message);
    // return instance.post("http://localhost:5001/chat", chat);
  },
  loadChannel: function () {
    return instance.get('/api/channels');
    // return instance.get("http://localhost:5001/channel");
  },
  createChannel: function (channel) {
    return instance.post('/api/channel', channel);
    // return instance.post("http://localhost:5001/channel", channel);
  },
  deleteChannel: function (list) {
    return instance.delete(`/api/channel/${list.id}`);
    // return instance.delete(`http://localhost:5001/channel/${list.id}`);
  },
};
