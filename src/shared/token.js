const getToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return token;
  } else {
    return null;
  }
};

const setToken = token => {
  if (!token) {
    return false;
  }
  localStorage.setItem('token', token);
};

const clearToken = () => {
  localStorage.removeItem('token');
};

export { getToken, setToken, clearToken };
