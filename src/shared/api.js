import instance from "./axios";

export const authApi = {
  // e.g) 로그인
  login: (useremail, password) =>
    instance.get("user/login/", {
      useremail,
      password,
    }),

  // e.g) 회원 가입
  signup: (useremail, password, username) =>
    instance.post("/user/signup", {
      useremail,
      password,
      username,
    }),
};

export const chatAPI = {
  loadChat: function () {
    return instance.get("http://localhost:5001/chat");
  },
  postChat: function (chat) {
    return instance.post("http://localhost:5001/chat");
  },
  loadChannel: function () {
    return instance.get("http://localhost:5001/chat");
  },
  createChannel: function (channel) {
    return instance.post("http://localhost:5001/chat");
  },
  deleteChannel: function (channel) {
    return instance.delete("http://localhost:5001/chat");
  },
};
