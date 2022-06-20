import axios from 'axios';
import { getToken } from './token';

const instance = axios.create({
  baseURL: '요청 서버 도메인',
  headers: { 'Content-Type': 'application/json' },
});

//토큰값
export const token = getToken();

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
