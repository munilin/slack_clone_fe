import instance from "./axios";

export const userApi = {
  // 로그인
  login: function (data) {
    instance.post("/user/login", data);
  },

  // 회원 가입
  signup: function (data) {
    instance.post("/user/signup", data);
  },
};

export const chatAPI = {
  loadChat: function () {
    return instance.get("/chat",);
  },
  postChat: function (chat) {
    return instance.post("/chat", chat);
  },
  loadChannel: function () {
    return instance.get("/channels");
  },
  createChannel: function (channel) {
    return instance.post("/channel", channel);
  },
  deleteChannel: function (list) {
    return instance.delete(`/${list.id}`);
  },
};
